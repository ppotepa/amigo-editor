import { chromium } from "@playwright/test";
import { spawn, spawnSync } from "node:child_process";
import { mkdir } from "node:fs/promises";
import net from "node:net";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = path.join(root, "screenshots");

async function getAvailablePort(preferredPort) {
  return await new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once("error", reject);
    server.listen(preferredPort, "127.0.0.1", () => {
      const address = server.address();
      server.close(() => resolve(typeof address === "object" && address ? address.port : preferredPort));
    });
  });
}

async function waitForServer(url, timeoutMs = 30_000) {
  const startedAt = Date.now();
  while (Date.now() - startedAt < timeoutMs) {
    try {
      const response = await fetch(url);
      if (response.ok) return;
    } catch {
      // Server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Vite server did not respond at ${url}`);
}

function stopServer(server) {
  if (process.platform === "win32" && server.pid) {
    spawnSync("taskkill", ["/pid", String(server.pid), "/T", "/F"], { stdio: "ignore" });
    return;
  }
  server.kill();
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  const port = await getAvailablePort(Number(process.env.AMIGO_SCREENSHOT_PORT ?? 4177)).catch(() => getAvailablePort(0));
  const baseUrl = `http://127.0.0.1:${port}`;
  const views = [
    { id: "splash", url: `${baseUrl}/?screenshot=splash`, width: 1440, height: 900 },
  ];

  const command = process.platform === "win32" ? "cmd.exe" : "npm";
  const args = process.platform === "win32"
    ? ["/d", "/s", "/c", `npm run dev -- --host 127.0.0.1 --port ${port}`]
    : ["run", "dev", "--", "--host", "127.0.0.1", "--port", String(port)];
  const server = spawn(command, args, { cwd: root, stdio: "inherit" });

  try {
    await waitForServer(baseUrl);

    const browser = await chromium.launch();
    try {
      for (const view of views) {
        const page = await browser.newPage({ viewport: { width: view.width, height: view.height }, deviceScaleFactor: 1 });
        await page.goto(view.url, { waitUntil: "networkidle" });
        await page.locator("[data-screenshot-ready='true']").waitFor({ timeout: 10_000 });
        await page.screenshot({ path: path.join(outputDir, `${view.id}.png`), fullPage: true });
        await page.close();
      }
    } finally {
      await browser.close();
    }
  } finally {
    stopServer(server);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
