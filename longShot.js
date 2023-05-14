const path = require("path");
const { chromium } = require("playwright");

// Current Timestamp
const now = new Date();
const timestamp = now.getTime();

// Get the download folder path depending on the OS
let downloadFolder;
if (process.platform === "win32") {
  // On Windows, use USERPROFILE
  downloadFolder = path.join(process.env.USERPROFILE, "Downloads");
} else {
  // On other OSes, use HOME
  downloadFolder = path.join(process.env.HOME, "Downloads");
}

const longShot = async (url) => {
  const browser = await chromium.launch({
    headless: true,
  });

  const page = await browser.newPage();
  await page.goto(url);
  await page.waitForTimeout(3000);

  await page.screenshot({
    path: path.join(downloadFolder, `longShot-${timestamp}.png`),
    fullPage: true,
  });
  await browser.close();
};

module.exports = longShot;
