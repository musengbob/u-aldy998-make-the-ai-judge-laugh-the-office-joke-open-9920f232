import * as fs from "node:fs";
import * as path from "node:path";

// Competition rule: the entry is a single line of 1-200 code points.
// Why this line should land: it takes the most universal office complaint
// (the meeting that should have been an email) and escalates it — the
// punishment for complaining is getting ALL THREE artifacts at once, and
// the payoff lands on a calendar invite to discuss the other two. First
// person, three specific office details, one clean pass, punchline in the
// last few words. Revised from a flatter draft ("We replaced the Monday
// meeting with an email...") whose payoff — "whether the email was clear
// enough" — was too soft and too passive.
const LINE =
  "I told my boss the meeting could've been an email, so now I get the meeting, the email, and a calendar invite to discuss both.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : path.join(process.cwd(), "output");

fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");

const readBack = fs.readFileSync(outPath, "utf8");
const codePoints = [...readBack].length;

if (readBack !== LINE) {
  console.error("Validation failed: entry.txt is not byte-identical to the line.");
  process.exit(1);
}
if (codePoints < 1 || codePoints > 200) {
  console.error(`Validation failed: ${codePoints} code points, must be 1-200.`);
  process.exit(1);
}
if (readBack.trim().length === 0) {
  console.error("Validation failed: line is only whitespace.");
  process.exit(1);
}

console.log(`Wrote ${codePoints} code points to ${outPath}:`);
console.log(readBack);
console.log("Validation passed: byte-identical, 1-200 code points, not only whitespace.");
