"use strict";

import { fileURLToPath } from "node:url";
import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const filename = resolve(fileURLToPath(import.meta.url), "../index.json");
const config = JSON.parse(await readFile(filename, "utf-8"));

config.rules = Object.fromEntries(
	Object
		.entries(config.rules)
		.sort(([a], [b]) => a < b ? -1 : (a > b ? 1 : 0))
);

await writeFile(filename, JSON.stringify(config, null, "\t") + "\n", "utf-8");
