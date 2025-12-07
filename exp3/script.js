const scriptURL = "https://script.google.com/macros/s/AKfycbyCovqq6mx2afT3WJGAzXvYvpC7iLddXekw0Yy3uQWVtke65cVVMK5Tccrd4AngTlQqaA/exec";
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);

  fetch(scriptURL, { method: "POST", body: formData })
    .then((response) => {
      alert("Submitted Successfully!");
      form.reset();
    })
    .catch((error) => {
      alert("Something went wrong. Please try again!");
      console.error("Error!", error.message);
    });
});
