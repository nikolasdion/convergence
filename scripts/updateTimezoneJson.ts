import tzdata from "tzdata";
import fs from "fs";

const timezones = Object.keys(tzdata.zones)
  .filter((t) => t !== null && t !== "null")
  .sort();

fs.writeFileSync(
  "src/lib/timezone.json",
  JSON.stringify({ zones: timezones }, undefined, 2)
);
