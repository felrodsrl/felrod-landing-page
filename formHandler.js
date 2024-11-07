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
  const formSubmtionMessage = document.getElementById("form-submition-message");
  formSubmtionMessage.innerText = "Su mensaje fue enviado correctamente";
  formSubmtionMessage.classList.remove("bg-danger-subtle");
  formSubmtionMessage.classList.add("bg-success-subtle");
  formSubmtionMessage.classList.remove("d-none");
  formSubmtionMessage.scrollIntoView();
}

function handleFailure(error) {
  const formSubmtionMessage = document.getElementById("form-submition-message");
  formSubmtionMessage.innerText =
    "Hubo un error al enviar el formulario, intentelo de nuevo más tarde";
  formSubmtionMessage.classList.remove("bg-success-subtle");
  formSubmtionMessage.classList.add("bg-danger-subtle");
  formSubmtionMessage.classList.remove("d-none");
  formSubmtionMessage.scrollIntoView();
  console.log("FAILED...", error);
}

function clearFormFields() {
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";
  document.getElementById("message").value = "";
}
