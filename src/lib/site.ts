export const APP_STORE_URL =
  "https://apps.apple.com/us/app/eczemate-eczema-skin-wellness/id6759606605";

export const WEBSITE_EVENT_ENDPOINT =
  process.env.NEXT_PUBLIC_WEBSITE_EVENT_ENDPOINT ??
  "https://us-central1-xema-4435e.cloudfunctions.net/logWebsiteEvent";

export type WebsiteEventType =
  | "android_download_click"
  | "android_waitlist_modal_view"
  | "android_waitlist_modal_dismiss"
  | "android_waitlist_signup";

export type WebsiteEventPlacement =
  | "header"
  | "mobile_menu"
  | "hero"
  | "final_cta";

type WebsiteEventPayload = {
  type: WebsiteEventType;
  placement: WebsiteEventPlacement;
  ctaLabel?: string;
  email?: string;
};

const SESSION_ID_KEY = "eczemate_website_session_id";

function getSessionId() {
  if (typeof window === "undefined") return null;

  try {
    const existing = window.localStorage.getItem(SESSION_ID_KEY);
    if (existing) return existing;

    const next =
      window.crypto?.randomUUID?.() ??
      `web_${Date.now().toString(36)}_${Math.random().toString(36).slice(2)}`;
    window.localStorage.setItem(SESSION_ID_KEY, next);
    return next;
  } catch {
    return null;
  }
}

function getUtmParams() {
  if (typeof window === "undefined") return null;

  const params = new URLSearchParams(window.location.search);
  const utm = {
    source: params.get("utm_source") ?? undefined,
    medium: params.get("utm_medium") ?? undefined,
    campaign: params.get("utm_campaign") ?? undefined,
    content: params.get("utm_content") ?? undefined,
    term: params.get("utm_term") ?? undefined,
  };

  return Object.values(utm).some(Boolean) ? utm : null;
}

function getViewport() {
  if (typeof window === "undefined") return null;
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    pixelRatio: window.devicePixelRatio,
  };
}

export async function logWebsiteEvent(payload: WebsiteEventPayload) {
  const path =
    typeof window === "undefined"
      ? null
      : `${window.location.pathname}${window.location.search}`;
  const referrer = typeof document === "undefined" ? null : document.referrer;
  const locale = typeof navigator === "undefined" ? null : navigator.language;
  const timeZone =
    typeof Intl === "undefined"
      ? null
      : Intl.DateTimeFormat().resolvedOptions().timeZone;

  const response = await fetch(WEBSITE_EVENT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      path,
      referrer,
      sessionId: getSessionId(),
      utm: getUtmParams(),
      locale,
      timeZone,
      viewport: getViewport(),
    }),
    keepalive: payload.type === "android_download_click",
  });

  const data = (await response.json().catch(() => null)) as {
    ok?: boolean;
    error?: string;
  } | null;

  if (!response.ok || data?.ok === false) {
    throw new Error(data?.error ?? "Could not save your request. Please try again.");
  }
}
