export const APP_STORE_URL =
  "https://apps.apple.com/us/app/eczemate-eczema-skin-wellness/id6759606605";

export const WEBSITE_EVENT_ENDPOINT =
  process.env.NEXT_PUBLIC_WEBSITE_EVENT_ENDPOINT ??
  "https://us-central1-xema-4435e.cloudfunctions.net/logWebsiteEvent";

export type WebsiteEventType =
  | "android_download_click"
  | "android_waitlist_signup";

export type WebsiteEventPlacement =
  | "header"
  | "mobile_menu"
  | "hero"
  | "final_cta";

type WebsiteEventPayload = {
  type: WebsiteEventType;
  placement: WebsiteEventPlacement;
  email?: string;
};

export async function logWebsiteEvent(payload: WebsiteEventPayload) {
  const path =
    typeof window === "undefined"
      ? null
      : `${window.location.pathname}${window.location.search}`;
  const referrer = typeof document === "undefined" ? null : document.referrer;

  const response = await fetch(WEBSITE_EVENT_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...payload,
      path,
      referrer,
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
