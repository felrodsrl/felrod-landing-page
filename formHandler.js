// Initialize EmailJS
(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init({
    publicKey: "DYdfmJQD5vqZZQaxg",
  });
})();

// Form submission handler
window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();

      const submitButton = document.getElementById("submit-button");
      const submitButtonSpinner = document.getElementById(
        "form-submit-button-spinner"
      );
      const submitButtonText = document.getElementById(
        "form-submit-button-inner-text"
      );
      submitButton.disabled = true;
      submitButtonSpinner.classList.remove("visually-hidden");
      submitButtonText.innerText = "Enviando";

      document.getElementById("contact-number").value = Math.floor(
        Math.random() * 1000000
      );
      // these IDs from the previous steps
      try {
        await emailjs.sendForm("contact_service", "contact_form", this);
        handleSuccess();
      } catch (error) {
        handleFailure();
      } finally {
        submitButton.disabled = false;
        submitButtonSpinner.classList.add("visually-hidden");
        submitButtonText.innerText = "Enviar";
      }
    });
};

const handleSuccess = () => {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
  console.log("SUCCESS!");
};

const handleFailure = (error) => {
  console.log("FAILED...", error);
};
