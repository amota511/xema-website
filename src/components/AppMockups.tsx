import { ReactNode } from "react";

type MockupKind = "home" | "meals" | "scan" | "journey";

const tabCopy: Record<
  MockupKind,
  {
    label: string;
    title: string;
    subtitle: string;
    accent: string;
    screen: ReactNode;
  }
> = {
  home: {
    label: "Home",
    title: "See the whole day without digging around.",
    subtitle:
      "Routine, skin, sleep, meals, products, body areas, weather, history, and trigger clues sit in one swipeable flow.",
    accent: "#8FAEA3",
    screen: <HomeScreenMock />,
  },
  meals: {
    label: "Meals",
    title: "Keep food stress from taking over dinner.",
    subtitle:
      "Save avoidances, get meal ideas that fit them, capture food photos, and keep a simple history of what was eaten.",
    accent: "#D4A574",
    screen: <MealsScreenMock />,
  },
  scan: {
    label: "Scan",
    title: "Check labels before they become regrets.",
    subtitle:
      "Scan products and foods, flag ingredients that matter to you, and compare items when two labels look the same.",
    accent: "#9B8AC4",
    screen: <ScanScreenMock />,
  },
  journey: {
    label: "Journey",
    title: "Bring the story, not a vague memory.",
    subtitle:
      "Investigate home triggers, save notes, learn what to ask, and prep for visits with clearer context.",
    accent: "#6B9AC4",
    screen: <JourneyScreenMock />,
  },
};

export const TAB_MOCKUPS = tabCopy;

export function PhoneFrame({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative mx-auto aspect-[390/844] w-full max-w-[330px] rounded-[38px] border-[9px] border-[#1F2A26] bg-[#1F2A26] shadow-2xl shadow-sage-950/20 ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
      <div className="h-full overflow-hidden rounded-[28px] bg-[#F7F8F5] text-sage-950">
        {children}
      </div>
    </div>
  );
}

export function CurrentTabMockup({
  kind,
  className = "",
}: {
  kind: MockupKind;
  className?: string;
}) {
  return <PhoneFrame className={className}>{tabCopy[kind].screen}</PhoneFrame>;
}

export function HeroPhoneCluster() {
  return (
    <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] items-center justify-center lg:flex">
      <div className="relative h-[660px] w-[560px]">
        <PhoneFrame className="absolute right-24 top-12 w-[330px] rotate-[3deg]">
          <HomeScreenMock />
        </PhoneFrame>

        <div className="absolute right-4 top-40 w-56 rounded-2xl border border-sage-200 bg-white p-4 shadow-xl shadow-sage-950/10">
          <div className="text-xs font-bold uppercase text-sage-500">
            Scan result
          </div>
          <div className="mt-2 text-sm font-bold text-sage-950">
            Fragrance flagged
          </div>
          <div className="mt-3 h-2 rounded-full bg-sage-100">
            <div className="h-2 w-3/4 rounded-full bg-[#C4796E]" />
          </div>
        </div>

        <div className="absolute bottom-24 left-8 w-64 rounded-2xl border border-sage-200 bg-white p-4 shadow-xl shadow-sage-950/10">
          <div className="text-xs font-bold uppercase text-sage-500">
            Today
          </div>
          <div className="mt-2 text-sm font-bold text-sage-950">
            Sleep, weather, and routine are saved together.
          </div>
        </div>
      </div>
    </div>
  );
}

export function WeeklyCluesMockup() {
  const rows = [
    ["Before a flare", "New body wash + dry air"],
    ["Worth repeating", "Moisturizer twice yesterday"],
    ["Ask next visit", "Patch testing or allergy panel?"],
  ];

  return (
    <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-white p-7 shadow-2xl shadow-black/20">
      <div className="text-xs font-bold uppercase text-sage-500">This week</div>
      <h3 className="mt-3 font-display text-4xl font-bold leading-tight text-sage-950">
        Less guessing. Better questions.
      </h3>
      <div className="mt-7 space-y-3">
        {rows.map(([label, body]) => (
          <div
            key={label}
            className="rounded-xl border border-sage-100 bg-surface p-4"
          >
            <div className="text-xs font-bold uppercase text-sage-500">
              {label}
            </div>
            <div className="mt-1 text-sm font-semibold text-sage-900">
              {body}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AppHeader({
  title,
  subtitle,
  logo = false,
}: {
  title: string;
  subtitle?: string;
  logo?: boolean;
}) {
  return (
    <div className="px-5 pb-3 pt-12">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div
            className={`font-bold ${logo ? "font-display text-[26px] italic text-sage-500" : "text-[26px]"}`}
          >
            {title}
          </div>
          {subtitle && (
            <div className="mt-1 text-[12px] leading-5 text-sage-500">
              {subtitle}
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <CircleButton />
          <CircleButton />
        </div>
      </div>
    </div>
  );
}

function PillRow({ items, active = 0 }: { items: string[]; active?: number }) {
  return (
    <div className="flex gap-2 overflow-hidden px-5 py-2">
      {items.map((item, index) => (
        <div
          key={item}
          className={`shrink-0 rounded-full px-3 py-2 text-[11px] font-bold ${
            index === active
              ? "bg-sage-500/15 text-sage-950 shadow-sm"
              : "text-sage-500"
          }`}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

function HomeScreenMock() {
  return (
    <div className="relative h-full bg-[#F7F8F5]">
      <AppHeader title="eczemate" logo />
      <div className="mx-5 rounded-xl border border-sage-100 bg-white p-4 shadow-sm shadow-sage-950/5">
        <div className="text-xs font-bold uppercase text-sage-500">
          Your plan
        </div>
        <div className="mt-2 text-sm font-bold text-sage-950">
          Start with routine, scan one product, log skin tonight.
        </div>
      </div>
      <PillRow
        active={2}
        items={["History", "Triggers", "Routine", "Skin", "Sleep", "Food"]}
      />
      <div className="px-5 pt-2">
        <div className="rounded-2xl bg-sage-950 p-5 text-white">
          <div className="text-center text-sm text-white/60">Good morning</div>
          <div className="mt-4 flex items-center justify-between">
            <div>
              <div className="text-sm font-bold">Morning routine</div>
              <div className="mt-1 text-xs text-white/55">4 steps</div>
            </div>
            <div className="rounded-full bg-white/12 px-3 py-1 text-xs font-bold">
              Edit
            </div>
          </div>
          <Checklist
            dark
            items={[
              "Lukewarm shower",
              "Pat skin dry",
              "Apply moisturizer",
              "Sunscreen",
            ]}
          />
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <MetricCard label="Skin" value="4/10" tone="red" />
          <MetricCard label="Flare risk" value="Low" tone="green" />
        </div>
      </div>
      <TabBar active="Home" />
    </div>
  );
}

function MealsScreenMock() {
  return (
    <div className="relative h-full bg-[#FAF8F1]">
      <AppHeader
        title="Meals"
        subtitle="Build personalized elimination diet meals"
      />
      <div className="mx-5 rounded-xl border border-[#EADDBE] bg-white p-4 shadow-sm shadow-sage-950/5">
        <div className="text-xs font-bold uppercase text-sage-500">
          Avoiding right now
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Dairy", "Egg", "Tomato", "+ Add"].map((item) => (
            <span
              key={item}
              className="rounded-full bg-[#F3E3BE] px-3 py-1.5 text-xs font-bold text-[#7A5824]"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
      <div className="px-5 pt-4">
        {[
          ["Breakfast", "Safe oatmeal ideas", "3 meals"],
          ["Lunch", "Rice bowls, simple proteins", "5 meals"],
          ["Dinner", "Batchable family meals", "4 meals"],
        ].map(([title, desc, count]) => (
          <div
            key={title}
            className="mb-3 rounded-xl border border-[#F0E6D0] bg-white p-4 shadow-sm shadow-sage-950/5"
          >
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-bold text-sage-950">{title}</div>
                <div className="mt-1 text-[12px] text-sage-500">{desc}</div>
              </div>
              <div className="rounded-full bg-[#F3E3BE] px-3 py-1 text-[11px] font-bold text-[#7A5824]">
                {count}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-20 left-5 right-5 rounded-full bg-sage-950 px-5 py-4 text-sm font-bold text-white shadow-lg">
        Ask Diet Chat for ideas
      </div>
      <TabBar active="Meals" />
    </div>
  );
}

function ScanScreenMock() {
  return (
    <div className="relative h-full bg-[#F7F8F5]">
      <AppHeader
        title="Scan"
        subtitle="Products, food, anything you put in or on skin"
      />
      <div className="mx-5 grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-sage-300 px-4 py-3 text-center text-sm font-bold text-sage-600">
          Compare
        </div>
        <div className="rounded-xl bg-sage-500 px-4 py-3 text-center text-sm font-bold text-white">
          Scan
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 px-5 pt-5">
        {[
          ["Moisturizer", "Fragrance", "#F7D6CE"],
          ["Body wash", "MI/MCI", "#DED2F1"],
          ["Snack bar", "Dairy", "#F3E3BE"],
          ["Sunscreen", "Looks okay", "#D8EADB"],
        ].map(([title, desc, color]) => (
          <div
            key={title}
            className="aspect-square rounded-xl border border-white bg-white p-3 shadow-sm shadow-sage-950/5"
          >
            <div
              className="h-20 rounded-lg"
              style={{ backgroundColor: color }}
            />
            <div className="mt-3 text-sm font-bold text-sage-950">{title}</div>
            <div className="mt-1 text-[11px] font-semibold text-sage-500">
              {desc}
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-24 right-5 rounded-full bg-sage-950 px-5 py-3 text-sm font-bold text-white shadow-xl">
        Add scan
      </div>
      <TabBar active="Scan" />
    </div>
  );
}

function JourneyScreenMock() {
  return (
    <div className="relative h-full bg-[#F7F8F5]">
      <AppHeader title="Journey" subtitle="Investigate, learn, prep, and note" />
      <PillRow
        active={0}
        items={["Investigate", "Learn", "Notes", "Doctor", "Feedback"]}
      />
      <div className="px-5 pt-4">
        <div className="rounded-2xl border border-sage-100 bg-white p-5 shadow-sm shadow-sage-950/5">
          <div className="text-xs font-bold uppercase text-sage-500">
            Lifestyle investigation
          </div>
          <div className="mt-2 text-sm leading-5 text-sage-600">
            Triggers hide in plain sight. Walk through the places they might be
            hiding.
          </div>
          <div className="mt-4 h-2 rounded-full bg-sage-100">
            <div className="h-2 w-2/5 rounded-full bg-sage-500" />
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            ["Laundry", "2 flags"],
            ["Bath time", "3 flags"],
            ["Bedroom", "All clear"],
            ["Doctor", "Questions"],
          ].map(([label, count]) => (
            <div
              key={label}
              className="rounded-xl border border-sage-100 bg-white p-4 shadow-sm shadow-sage-950/5"
            >
              <div className="font-bold text-sage-950">{label}</div>
              <div className="mt-1 text-[12px] font-semibold text-sage-500">
                {count}
              </div>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="Journey" />
    </div>
  );
}

function CircleButton() {
  return <div className="h-9 w-9 rounded-full bg-white shadow-sm shadow-sage-950/5" />;
}

function Checklist({ items, dark = false }: { items: string[]; dark?: boolean }) {
  return (
    <div className="mt-4 space-y-3">
      {items.map((item, index) => (
        <div key={item} className="flex items-center justify-between gap-3">
          <span
            className={`text-sm ${dark ? "text-white/85" : "text-sage-800"}`}
          >
            {item}
          </span>
          <span
            className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${
              index === 0
                ? "border-sage-500 bg-sage-500 text-white"
                : dark
                  ? "border-white/30"
                  : "border-sage-200"
            }`}
          >
            {index === 0 ? "1" : ""}
          </span>
        </div>
      ))}
    </div>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone: "red" | "green";
}) {
  const color = tone === "red" ? "#C4796E" : "#7CB69A";
  return (
    <div className="rounded-xl border border-sage-100 bg-white p-4 shadow-sm shadow-sage-950/5">
      <div className="text-xs font-bold uppercase text-sage-500">{label}</div>
      <div className="mt-2 text-2xl font-bold" style={{ color }}>
        {value}
      </div>
    </div>
  );
}

function TabBar({ active }: { active: string }) {
  const tabs = ["Home", "Meals", "Scan", "Journey"];
  return (
    <div className="absolute bottom-0 left-0 right-0 grid grid-cols-4 gap-1 border-t border-sage-100 bg-white/95 px-3 pb-5 pt-3 text-center text-[11px] text-sage-400">
      {tabs.map((tab) => (
        <div key={tab} className={tab === active ? "font-bold text-sage-600" : ""}>
          <div className="mx-auto mb-1 h-5 w-5 rounded-full bg-current opacity-25" />
          {tab}
        </div>
      ))}
    </div>
  );
}
