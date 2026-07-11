const { createCheckboxChoice, createTextField } = window.ReflectionDesign;

const affects = ["Fear", "Self-esteem", "Security", "Personal relationship", "Sex relations", "Pride"];

const spotCheckModes = [
  {
    id: "resentment",
    name: "Resentment",
    fields: [
      { id: "subject", label: "I'm resentful at:", type: "input", placeholder: "Name or situation" },
      { id: "reason", label: "The cause is:", type: "textarea", placeholder: "Describe what happened..." }
    ]
  },
  {
    id: "fear",
    name: "Fear",
    fields: [
      { id: "subject", label: "I'm fearful of:", type: "input", placeholder: "Name the fear" },
      { id: "reason", label: "Why do I have the fear?:", type: "textarea", placeholder: "Describe what is behind this fear..." }
    ]
  },
  {
    id: "harm",
    name: "Harm",
    fields: [
      { id: "subject", label: "Who did I harm?:", type: "input", placeholder: "Name or situation" },
      { id: "reason", label: "What did I do?:", type: "textarea", placeholder: "Describe what happened..." }
    ]
  },
  {
    id: "sex",
    name: "Sex",
    fields: [
      { id: "subject", label: "Who did I harm?:", type: "input", placeholder: "Name or situation" },
      { id: "reason", label: "What did I do?:", type: "textarea", placeholder: "Describe what happened..." }
    ]
  }
];

const createModeState = () => ({ subject: "", reason: "", affects: [], mistakes: "" });
const savedDraft = JSON.parse(localStorage.getItem("spotCheckDraft") || "null");
const responses = Object.fromEntries(
  spotCheckModes.map((mode) => [mode.id, savedDraft?.responses?.[mode.id] || createModeState()])
);

let activeModeId = savedDraft?.activeModeId || "resentment";
let confirmationTimer;

const modeTabs = document.getElementById("modeTabs");
const modePanel = document.getElementById("modePanel");
const saveConfirmation = document.getElementById("saveConfirmation");

const createField = (field, modeState) => createTextField({
  id: `${activeModeId}-${field.id}`,
  label: field.label,
  type: field.type,
  placeholder: field.placeholder,
  value: modeState[field.id] || "",
  rows: 4,
  onInput: (value) => {
    modeState[field.id] = value;
  }
});

const createAffectsSection = (modeState) => {
  const section = document.createElement("section");
  const title = document.createElement("h2");
  const list = document.createElement("div");

  section.className = "affects-section";
  title.className = "section-title";
  title.textContent = "Affects My:";
  list.className = "affect-list";

  affects.forEach((affect) => {
    list.appendChild(createCheckboxChoice({
      label: affect,
      checked: modeState.affects.includes(affect),
      onChange: (checked, value) => {
        modeState.affects = checked
          ? [...new Set([...modeState.affects, value])]
          : modeState.affects.filter((item) => item !== value);
      }
    }));
  });

  section.append(title, list);
  return section;
};

const createMistakesSection = (modeState) => {
  const section = document.createElement("section");
  const field = createTextField({
    id: `${activeModeId}-mistakes`,
    label: "My Mistakes:",
    type: "textarea",
    placeholder: "Where have I been selfish, dishonest, or afraid?",
    value: modeState.mistakes,
    rows: 4,
    onInput: (value) => {
      modeState.mistakes = value;
    }
  });

  section.className = "mistakes-section";
  field.querySelector(".field-label").className = "section-title";
  section.append(...field.childNodes);
  return section;
};

const createSaveButton = () => {
  const button = document.createElement("button");
  button.className = "save-bottom";
  button.type = "button";
  button.dataset.save = "";
  button.textContent = "Save Spot Check";
  button.addEventListener("click", saveDraft);
  return button;
};

const renderPanel = () => {
  const mode = spotCheckModes.find((item) => item.id === activeModeId);
  const modeState = responses[activeModeId];
  const panel = document.createElement("div");

  panel.className = `mode-panel${mode.fields.length ? "" : " sex-empty"}`;
  panel.id = `${mode.id}-panel`;
  panel.role = "tabpanel";
  panel.setAttribute("aria-labelledby", `${mode.id}-tab`);

  if (mode.fields.length) {
    mode.fields.forEach((field) => panel.appendChild(createField(field, modeState)));
    panel.append(createAffectsSection(modeState), createMistakesSection(modeState), createSaveButton());
  }

  modePanel.replaceChildren(panel);
};

const setActiveMode = (modeId) => {
  activeModeId = modeId;
  [...modeTabs.children].forEach((tab) => {
    const isActive = tab.dataset.mode === modeId;
    tab.classList.toggle("is-active", isActive);
    tab.setAttribute("aria-selected", String(isActive));
    tab.tabIndex = isActive ? 0 : -1;
  });
  renderPanel();
};

const renderTabs = () => {
  spotCheckModes.forEach((mode) => {
    const tab = document.createElement("button");
    tab.className = "mode-tab";
    tab.id = `${mode.id}-tab`;
    tab.type = "button";
    tab.role = "tab";
    tab.dataset.mode = mode.id;
    tab.setAttribute("aria-controls", `${mode.id}-panel`);
    tab.textContent = mode.name;
    tab.addEventListener("click", () => setActiveMode(mode.id));
    modeTabs.appendChild(tab);
  });
};

function saveDraft() {
  localStorage.setItem("spotCheckDraft", JSON.stringify({ activeModeId, responses }));
  saveConfirmation.classList.add("is-visible");
  clearTimeout(confirmationTimer);
  confirmationTimer = setTimeout(() => saveConfirmation.classList.remove("is-visible"), 1800);
}

document.querySelector(".save-top").addEventListener("click", saveDraft);
renderTabs();
setActiveMode(activeModeId);
