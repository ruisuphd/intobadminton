import type { Discipline, EquipmentCategory, PlayStyle } from "@/lib/taxonomy";

export const QUIZ_STEP_HELP: Record<number, string> = {
  0: "Level sets how stiff a frame we suggest and how forgiving the string bed should feel.",
  1: "Singles rewards reach and recovery; doubles rewards front-court touch and rear-court power.",
  2: "Style tags bias balance and shaft — you can pick up to two that describe your game.",
  3: "Category switches the whole catalogue — rackets, shoes, strings, grips, bags, or shuttles.",
  4: "Budget and body filters remove gear that is out of range or the wrong fit width.",
};

export const DISCIPLINE_HELP: Record<Discipline, string> = {
  singles: "More court to cover — we lean head-light or even balance for recovery clears.",
  doubles: "Front/rear roles matter — we bias toward manoeuvrable frames and stable shoes.",
  mixed: "Blends singles recovery with doubles rotation — balanced setups usually win.",
};

export const STYLE_HELP: Record<PlayStyle, string> = {
  offensive: "Faster flat drives and net kills — slightly stiffer shafts can work if timing is solid.",
  balanced: "All-court — even balance and medium flex are the safest defaults.",
  defensive: "Control and lift — head-light frames and thinner strings often feel better.",
  front_court: "Net interceptions — lighter heads and quick shoes matter more than raw smash.",
  smash_heavy: "Rear-court power — head-heavy balance and stiffer shafts if you load the shoulder well.",
};

export const CATEGORY_HELP: Record<EquipmentCategory, string> = {
  racket: "Weight class, balance, and flex drive the five-factor fit score.",
  shoes: "Lateral grip and fit width matter more than running-shoe cushioning.",
  string: "Gauge and tension window interact with your contact quality and arm comfort.",
  grip: "Thickness changes perceived head weight — small change, big feel difference.",
  bag: "Thermal sleeves and shoe compartments change daily carry more than raw racket count.",
  shuttle: "Speed grade should match your hall temperature and skill band.",
  accessory: "Small gear add-ons — filters apply once the catalogue row exists.",
};
