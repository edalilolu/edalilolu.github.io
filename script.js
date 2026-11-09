(function () {
  var body = document.body;
  var toggle = document.getElementById("theme-toggle");
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.getElementById("nav-links");
  var year = document.getElementById("year");
  var storageKey = "theme";

  function applyTheme(theme) {
    var dark = theme === "dark";
    body.classList.toggle("dark-theme", dark);
    if (toggle) {
      toggle.innerHTML = dark
        ? '<span aria-hidden="true">☀️</span>'
        : '<span aria-hidden="true">🌙</span>';
      toggle.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode");
      toggle.setAttribute("title", dark ? "Switch to light mode" : "Switch to dark mode");
    }
  }

  function getPreferredTheme() {
    var saved = localStorage.getItem(storageKey);
    if (saved === "dark" || saved === "light") {
      return saved;
    }
    return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(getPreferredTheme());

  if (toggle) {
    toggle.addEventListener("click", function () {
      var next = body.classList.contains("dark-theme") ? "light" : "dark";
      localStorage.setItem(storageKey, next);
      applyTheme(next);
    });
  }

  if (navToggle && navLinks) {
    navToggle.addEventListener("click", function () {
      var open = navLinks.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    navLinks.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener("click", function () {
        navLinks.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealItems.length) {
    var observer = new IntersectionObserver(
      function (entries, obs) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  } else {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
  }
})();
