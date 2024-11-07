document.addEventListener("DOMContentLoaded", () => {
  initializeNavbar();

  initializeWhatsAppButton();
});

const initializeNavbar = () => {
  const navbarTogglerButton = document.querySelector(".navbar-toggler");
  navbarTogglerButton.addEventListener("click", toggleNavbarTogglerIcon);
};

const toggleNavbarTogglerIcon = () => {
  const icon = document.getElementById("navbar-toggler-icon");
  icon.classList.toggle("bi-list");
  icon.classList.toggle("bi-x");
};

const initializeWhatsAppButton = () => {
  const whatsAppButton = document.querySelector(".whatsapp-button");

  // Switch the URL to open the application if on a mobile device
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  if (isMobile) {
    whatsAppButton.href =
      "https://wa.me/5493764711717?text=Hola,%20me%20gustar%C3%ADa%20contactarlos.";
  }

  // Display spinner for a short period of time when clicked
  whatsAppButton.addEventListener("click", displaySpinnerForShortPeriodOfTime);
};

const displaySpinnerForShortPeriodOfTime = () => {
  const whatsAppButtonSpinner = document.getElementById(
    "whatsapp-button-spinner"
  );
  const whatsAppButtonIcon = document.getElementById("whatsapp-button-icon");
  whatsAppButtonSpinner.classList.toggle("visually-hidden");
  whatsAppButtonIcon.classList.toggle("visually-hidden");

  setTimeout(() => {
    whatsAppButtonSpinner.classList.toggle("visually-hidden");
    whatsAppButtonIcon.classList.toggle("visually-hidden");
  }, 3000);
};
