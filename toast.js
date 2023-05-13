// JavaScript
function showToast(message) {
  // Get the toast element
  var toast = document.getElementById("toast");

  // Set the message
  toast.innerHTML = message;

  // Show the toast
  toast.classList.add("show");

  // Hide the toast after 3 seconds
  setTimeout(function () {
    toast.classList.remove("show");
  }, 3000);
}

module.exports = showToast;
