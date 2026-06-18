document.documentElement.classList.add("no-js");

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  document.documentElement.classList.remove("no-js");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

document.querySelectorAll(".project-card, .service-card, .process-card, .work-card, .detail-panel, .wide-panel, .about-panel, .cta-panel, .button, .nav-button").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    item.style.setProperty("--x", `${event.clientX - rect.left}px`);
    item.style.setProperty("--y", `${event.clientY - rect.top}px`);
  });
});

const copyDiscord = document.getElementById("copyDiscord");

if (copyDiscord) {
  copyDiscord.addEventListener("click", async () => {
    const value = copyDiscord.querySelector("strong");
    try {
      await navigator.clipboard.writeText("kp9b");
      value.textContent = "Copied: kp9b";
      setTimeout(() => {
        value.textContent = "kp9b";
      }, 1400);
    } catch {
      value.textContent = "kp9b";
    }
  });
}
