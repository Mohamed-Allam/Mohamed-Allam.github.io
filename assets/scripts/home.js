const reflectionButtons = [
  { name: "Step 10", page: "step10.html" },
  { name: "Spot Check", page: "spot-check.html" },
  { name: "Allam Step 10", page: "daily-reflection.html" },
  { name: "Weekly Reflection", page: null },
  { name: "New Reflection", page: null }
];

const reflectionNav = document.getElementById("reflectionNav");

reflectionButtons.forEach(({ name, page }, index) => {
  const link = document.createElement(page ? "a" : "button");
  const label = document.createElement("span");
  const arrow = document.createElement("span");

  link.className = "reflection-link";
  link.dataset.buttonName = name;
  link.dataset.page = page || "";
  link.style.setProperty("--item-index", index);

  if (page) {
    link.href = page;
  } else {
    link.type = "button";
    link.disabled = true;
    link.classList.add("is-disabled");
    link.title = "Coming soon";
  }

  label.textContent = name;
  arrow.className = "link-arrow";
  arrow.setAttribute("aria-hidden", "true");
  arrow.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>`;
  link.append(label, arrow);
  reflectionNav.appendChild(link);
});
