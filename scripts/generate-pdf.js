import { spawn } from "child_process";
import puppeteer from "puppeteer";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function waitForServerReady(url, timeout = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeout) {
    try {
      await new Promise((resolve, reject) => {
        http.get(url, res => (res.statusCode === 200 ? resolve() : reject()));
      });
      return true;
    } catch {
      await new Promise(r => setTimeout(r, 500));
    }
  }
  throw new Error("⏰ Server tidak siap setelah timeout.");
}

(async () => {
  console.log("🏗️  Membangun project...");
  const build = spawn("npm", ["run", "build"], { stdio: "inherit" });
  await new Promise((resolve, reject) => {
    build.on("exit", code => (code === 0 ? resolve() : reject()));
  });

  console.log("🚀 Menjalankan server preview...");
  const preview = spawn("npx", ["vite", "preview"]);

  let serverUrl = null;

  // 🔹 Dengarkan stderr juga karena Vite 5 cetak log ke sana
  const handleOutput = data => {
    const text = data.toString();
    process.stdout.write(text); // tampilkan juga di terminal
    const match = text.match(/http:\/\/localhost:\d+/);
    if (match && !serverUrl) {
      serverUrl = match[0];
    }
  };

  preview.stdout.on("data", handleOutput);
  preview.stderr.on("data", handleOutput);

  // Tunggu sampai URL terdeteksi
  while (!serverUrl) {
    await new Promise(r => setTimeout(r, 300));
  }

  await waitForServerReady(serverUrl);
  console.log("✅ Server siap di", serverUrl);

  console.log("📄 Membuat PDF...");
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto(serverUrl, { waitUntil: "networkidle0" });

  // Delay untuk memastikan Vue selesai render
  await new Promise(r => setTimeout(r, 1500));

  const outputPath = path.join(__dirname, "../cv.pdf");
  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,
    margin: { top: "15mm", bottom: "15mm" },
  });

  await browser.close();
  console.log("✅ PDF berhasil digenerate:", outputPath);

  preview.kill("SIGINT");
  process.exit(0);
})();
