const root = document.documentElement;

window.addEventListener("pointermove", (event) => {
  root.style.setProperty("--mx", `${event.clientX}px`);
  root.style.setProperty("--my", `${event.clientY}px`);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("visible");
  });
}, { threshold: 0.16 });

document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));

document.querySelectorAll(".magnetic").forEach((item) => {
  item.addEventListener("pointermove", (event) => {
    const rect = item.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.1;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.1;
    item.style.transform = `translate(${x}px, ${y}px)`;
  });

  item.addEventListener("pointerleave", () => {
    item.style.transform = "";
  });
});

const copyDiscord = document.getElementById("copyDiscord");

if (copyDiscord) {
  copyDiscord.addEventListener("click", async () => {
    const label = copyDiscord.querySelector("strong");
    try {
      await navigator.clipboard.writeText("kp9b");
      label.textContent = "Copied: kp9b";
      setTimeout(() => {
        label.textContent = "kp9b";
      }, 1400);
    } catch {
      label.textContent = "kp9b";
    }
  });
}
