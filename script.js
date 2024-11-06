document.addEventListener("DOMContentLoaded", () => {
  const navbarTogglerButton = document.querySelector(".navbar-toggler");
  navbarTogglerButton.addEventListener("click", toggleNavbarTogglerIcon);
});

const toggleNavbarTogglerIcon = () => {
  const icon = document.getElementById("navbar-toggler-icon");
  icon.classList.toggle("bi-list");
  icon.classList.toggle("bi-x");
};
