/**
 * Apply `site.config.json` to the project.
 *
 *   pnpm site:apply
 *
 * `site.config.json` is the one file to edit when setting a project up. The
 * app reads name, description and the seo block from it directly; this script
 * handles everything that cannot import a JSON file:
 *
 *   package.json        name
 *   .cta.json           projectName
 *   public/manifest.json  name, short_name, description
 *   README.md, CLAUDE.md  the first heading
 *
 * Safe to run again: unchanged files are left alone, and every change is
 * printed as `before -> after`. Everything is validated before anything is
 * written.
 */

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const path = (file: string) => resolve(root, file);

const schema = z.object({
	description: z.string().min(1),
	name: z.string().min(1),
	seo: z.object({
		locale: z.string().regex(/^[a-z]{2}_[A-Z]{2}$/, 'like "en_US"'),
		ogImage: z.string().startsWith("/", "a path under public/, e.g. /og-image.png"),
	}),
	slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "kebab-case, e.g. my-project"),
});

const parsed = schema.safeParse(JSON.parse(readFileSync(path("site.config.json"), "utf8")));
if (!parsed.success) {
	console.error("site.config.json is invalid:");
	for (const issue of parsed.error.issues) console.error(`  ${issue.path.join(".")}: ${issue.message}`);
	process.exit(1);
}
const site = parsed.data;

function report(file: string, before: string, after: string) {
	console.log(`${before === after ? "  ok " : "  set"}  ${file}: ${before === after ? after : `${before} -> ${after}`}`);
}

function editJson(file: string, edit: (json: Record<string, unknown>) => Record<string, [unknown, unknown]>) {
	const raw = readFileSync(path(file), "utf8");
	const json = JSON.parse(raw) as Record<string, unknown>;
	const changes = edit(json);
	for (const [key, [before, after]] of Object.entries(changes)) report(`${file} ${key}`, String(before), String(after));
	if (Object.values(changes).some(([before, after]) => before !== after)) {
		const eol = raw.includes("\r\n") ? "\r\n" : "\n";
		writeFileSync(path(file), `${JSON.stringify(json, null, 2).replace(/\n/g, eol)}${eol}`);
	}
}

function set(json: Record<string, unknown>, key: string, value: string): [unknown, unknown] {
	const before = json[key];
	json[key] = value;
	return [before, value];
}

function editHeading(file: string) {
	if (!existsSync(path(file))) return;
	const raw = readFileSync(path(file), "utf8");
	const match = raw.match(/^# .*/);
	if (!match) return;
	const after = `# ${site.name}`;
	report(`${file} heading`, match[0], after);
	if (match[0] !== after) writeFileSync(path(file), raw.replace(/^# .*/, after));
}

console.log("Applying site.config.json");

editJson("package.json", (json) => ({ name: set(json, "name", site.slug) }));
editJson(".cta.json", (json) => ({ projectName: set(json, "projectName", site.slug) }));
editJson("public/manifest.json", (json) => ({
	name: set(json, "name", site.name),
	short_name: set(json, "short_name", site.name),
	description: set(json, "description", site.description),
}));
editHeading("README.md");
editHeading("CLAUDE.md");


console.log("Done. Review with `git diff`.");
