import { text, number, flag, list, object, hash, report, unique, safePath, type Lesson, type Input } from "./core";

// A focused local experiment derived from this lesson’s reviewed presentation.
export const lesson: Lesson = {
  number: 33,
  title: "Usage and Session Budgets",
  description: "A session budget helps prevent unlimited new work, but its enforcement boundary matters. The provider checks consumption before issuing model requests.",
  concepts: ["Budget units are cents", "Consumption can cross a request boundary", "Raise only with an explicit host decision"],
  scope: "Builds a bounded budget-raise plan using supplied observations. It never raises or removes a real provider cap. Each run starts from a fresh local seed. The run journal stores results, not production workflow state.",
  cases: [{"id": "0", "label": "Plan an authorized raise", "input": {"consumedCents": 50, "nextCents": 75, "pausedAtBudget": true}, "expected": "passed", "checks": {"nextCents": 75}}, {"id": "1", "label": "Reject a cap below consumption", "input": {"consumedCents": 50, "nextCents": 50, "pausedAtBudget": true}, "expected": "rejected", "checks": {}}, {"id": "2", "label": "Do not raise a running session", "input": {"consumedCents": 20, "nextCents": 75, "pausedAtBudget": false}, "expected": "rejected", "checks": {}}],
  async run(input) {

const consumed=number(input,"consumedCents"),next=number(input,"nextCents");
if(!flag(input,"pausedAtBudget")||!Number.isSafeInteger(next)||next<=consumed||next>500)return report("rejected","Require a budget pause and a whole-cent raise above consumption within the demo host cap",{},["Read current pause and cost evidence","Apply the explicit host spending limit"]);
return report("passed","Prepared an approved budget replacement plan",{consumedCents:consumed,nextCents:next,request:{budget:{type:"limit",max_list_cost:{amount:String(next),currency:"USD"}}},applied:false},["Keep cents distinct from dollars","Do not resume by sending another prompt","Provider revalidates exact consumption at update"]);

  }
};
