const fs = require("node:fs");
const path = require("node:path");
const { spawn } = require("node:child_process");
const root = path.resolve(__dirname, "..");
// Only disposable build output: avoid stale pages from posts switched to draft.
fs.rmSync(path.join(root, "public"), { recursive: true, force: true });
const args = process.argv.slice(2);
if (args.includes("--serve") || args.includes("--watch")) {
  (async () => {
    const { default: Eleventy } = await import("@11ty/eleventy");
    const { adaptWatchTargets } = require("./watch-targets");
    const serve = args.includes("--serve");
    const eleventy = new Eleventy(undefined, undefined, { runMode: serve ? "serve" : "watch" });
    adaptWatchTargets(eleventy);
    await eleventy.init();
    await eleventy.watch();
    if (serve) {
      const portArg = args.find(arg => arg.startsWith("--port="));
      await eleventy.serve(portArg ? Number(portArg.slice(7)) : undefined);
    }
    for (const signal of ["SIGINT", "SIGTERM"]) {
      process.once(signal, async () => { await eleventy.stopWatch(); process.exit(0); });
    }
  })().catch(error => { console.error(error); process.exitCode = 1; });
} else {
  const child = spawn(process.execPath, [path.join(root, "node_modules/.bin/eleventy"), ...args], {
    cwd: root, stdio: "inherit",
  });
  child.on("error", error => { console.error(error); process.exitCode = 1; });
  child.on("exit", (code, signal) => { process.exitCode = code ?? (signal ? 1 : 0); });
}
