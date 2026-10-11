
/* =========================
   MOBILE NAVIGATION
========================= */

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

navToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");

  navToggle.setAttribute("aria-expanded", String(open));
  navToggle.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation"
  );
});

document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navToggle?.setAttribute("aria-expanded", "false");
    navToggle?.setAttribute("aria-label", "Open navigation");
  });
});


/* =========================
   DARK / LIGHT MODE
========================= */

const themeToggle = document.getElementById("themeToggle");
const themeColor = document.querySelector('meta[name="theme-color"]');

function applyTheme(isLight) {
  document.body.classList.toggle("light", isLight);

  document.documentElement.classList.toggle("light", isLight);

  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(isLight));

    const label = isLight
      ? "Switch to dark mode"
      : "Switch to light mode";

    themeToggle.setAttribute("aria-label", label);
    themeToggle.setAttribute("title", label);
  }

  themeColor?.setAttribute(
    "content",
    isLight ? "#f2f4fb" : "#080d1d"
  );
}

let savedTheme = "dark";

try {
  savedTheme = localStorage.getItem("portfolio-theme") || "dark";
} catch (error) {
  // Use dark mode if browser storage is unavailable.
}

applyTheme(savedTheme === "light");

themeToggle?.addEventListener("click", () => {
  const isCurrentlyLight = document.body.classList.contains("light");
  const switchToLight = !isCurrentlyLight;

  applyTheme(switchToLight);

  try {
    localStorage.setItem(
      "portfolio-theme",
      switchToLight ? "light" : "dark"
    );
  } catch (error) {
    // Theme switching still works without browser storage.
  }
});


/* =========================
   SCROLL REVEAL ANIMATIONS
========================= */

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    observer.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("visible");
  });
}
