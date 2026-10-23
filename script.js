/* Small enhancements: accessible mobile navigation and current footer year. */
(() => {
  const toggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector("#nav-links");
  const year = document.querySelector("#current-year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  if (!toggle || !navLinks) return;

  const closeMenu = () => {
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
  };

  toggle.addEventListener("click", () => {
    const isExpanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!isExpanded));
    toggle.setAttribute("aria-label", isExpanded ? "Open navigation menu" : "Close navigation menu");
    navLinks.classList.toggle("is-open", !isExpanded);
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      toggle.focus();
    }
  });

  document.addEventListener("click", (event) => {
    const clickedInsideNav = navLinks.contains(event.target) || toggle.contains(event.target);
    if (!clickedInsideNav) closeMenu();
  });

  window.addEventListener("resize", () => {
    if (window.matchMedia("(min-width: 721px)").matches) closeMenu();
  });
})();
