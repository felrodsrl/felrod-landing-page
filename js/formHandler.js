// Initialize EmailJS
(function () {
  const EMAILJS_PUBLIC_KEY = "K9vpFLOoR3eMQByzT";
  emailjs.init({
    publicKey: EMAILJS_PUBLIC_KEY,
  });
})();

// Form submission handler
window.onload = function () {
  setupFormSubmission();
};

function setupFormSubmission() {
  document
    .getElementById("contact-form")
    .addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  setSubmitButtonLoadingState(true);

  assignRandomContactNumber();

  try {
    await sendEmail(this);
    handleSuccess();
  } catch (error) {
    handleFailure(error);
  } finally {
    setSubmitButtonLoadingState(false);
  }
}

function setSubmitButtonLoadingState(isLoading) {
  const submitButton = document.getElementById("submit-button");
  const submitButtonSpinner = document.getElementById(
    "form-submit-button-spinner"
  );
  const submitButtonText = document.getElementById(
    "form-submit-button-inner-text"
  );

  submitButton.disabled = isLoading;
  submitButtonSpinner.classList.toggle("visually-hidden", !isLoading);
  submitButtonText.innerText = isLoading ? "Enviando" : "Enviar";
}

function assignRandomContactNumber() {
  document.getElementById("contact-number").value = generateRandomNumber();
}

function generateRandomNumber() {
  return Math.floor(Math.random() * 1000000);
}

async function sendEmail(form) {
  return await emailjs.sendForm("contact_service", "contact_form", form);
}

function handleSuccess() {
  clearFormFields();
  appendAlert(
    "<i class='bi bi-check-circle-fill'></i> Su mensaje fue enviado correctamente",
    "success"
  );
}

function handleFailure(error) {
  appendAlert(
    "<i class='bi bi-exclamation-triangle-fill'></i> Hubo un error al enviar el formulario, intentelo de nuevo más tarde",
    "danger"
  );
  console.log("FAILED...", error);
}

function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}

const alertPlaceholder = document.getElementById("alertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `  <div>${message}</div>`,
    `  <button`,
    `    type="button"`,
    `    class="btn-close"`,
    `    data-bs-dismiss="alert"`,
    `    aria-label="Close"`,
    `  ></button>`,
    `</div>`,
  ].join("");

  alertPlaceholder.append(wrapper);
  alertPlaceholder.scrollIntoView();
};
