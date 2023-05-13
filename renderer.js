const { ipcRenderer } = require("electron");
const toast = require("./toast");

const input = document.getElementById("url");
const button = document.getElementById("capture");

// A function to check if a string is a valid URL
function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Add a click event listener to the button
button.addEventListener("click", () => {
  const url = input.value;

  // Validate the URL
  if (url && isValidURL(url)) {
    // Send the URL to the main process
    ipcRenderer.send("run-script", url);
  } else {
    // Show an error message
    alert("Please enter a valid URL");
  }
});

// Listen for responses from main process
ipcRenderer.on("script-result", (event, result) => {
  // Do something with the result
  console.log(result);
  // toast("1 longshot saved in the download folder");
});
