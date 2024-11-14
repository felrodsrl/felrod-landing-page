// Form submission handler
window.onload = function () {
  setupFormSubmission();
};

function setupFormSubmission() {
  document.getElementById("contact-form").addEventListener("submit", handleFormSubmit);
}

async function handleFormSubmit(event) {
  event.preventDefault();

  setSubmitButtonLoadingState(true);

  assignRandomContactNumber();

  const formData = new FormData(this);

  try {
    const response = await fetch("./../php/sendMail.php", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      handleSuccess();
    } else {
      const errorData = await response.json();
      console.log("Error: ", errorData.message);
      handleFailure();
    }
  } catch (error) {
    console.error("Network error: ", error);
    handleFailure();
  } finally {
    setSubmitButtonLoadingState(false);
  }
}

function setSubmitButtonLoadingState(isLoading) {
  const submitButton = document.getElementById("submit-button");
  const submitButtonSpinner = document.getElementById("form-submit-button-spinner");
  const submitButtonText = document.getElementById("form-submit-button-inner-text");

  submitButton.disabled = isLoading;
  submitButtonSpinner.classList.toggle("visually-hidden", !isLoading);
  submitButtonText.innerText = isLoading ? "Enviando" : "Enviar";
}

function assignRandomContactNumber() {
  document.getElementById("contact-number").value = generateRandomNumber();
}

function generateRandomNumber() {
  // returns a random number between 100000 and 999999, in other words, a number of 6 digits
  return Math.floor(899999 * Math.random() + 100000);
}

function handleSuccess() {
  clearFormFields();
  appendAlert(
    "<i class='bi bi-check-circle-fill'></i> Su mensaje fue enviado correctamente",
    "success"
  );
}

function handleFailure() {
  appendAlert(
    "<i class='bi bi-exclamation-triangle-fill'></i> Hubo un error al enviar el formulario, intentelo de nuevo más tarde",
    "danger"
  );
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
