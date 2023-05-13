const path = require("path");
const { chromium } = require("playwright");

// Current Date
let currentDate = new Date();
let month = currentDate.getMonth() + 1; // getMonth() returns a zero-based value (0-11)
let day = currentDate.getDate();
let year = currentDate.getFullYear().toString().substring(2, 4); // get last two digits of year
const today = `${day}-${month}-${year}`;

// Current Time
let date = new Date();
let hours = date.getHours();
let minutes = date.getMinutes();
let ampm = hours >= 12 ? "PM" : "AM";
hours = hours % 12;
hours = hours ? hours : 12; // the hour '0' should be '12'
minutes = minutes < 10 ? "0" + minutes : minutes;
let nowTime = hours + ":" + minutes + " " + ampm;

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
    path: path.join(downloadFolder, `longShot_${url}_${today}_${nowTime}.png`),
    fullPage: true,
  });
  await browser.close();
};

module.exports = longShot;
