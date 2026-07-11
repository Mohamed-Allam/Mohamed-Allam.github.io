(function attachQuestionComponents(global) {
  const design = global.ReflectionDesign || {};
  global.ReflectionDesign = design;

  const escapeHTML = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const defaultAnswerOptions = (question) => [
    { value: "yes", label: question.yesLabel || "Yes", className: "yes" },
    { value: "no", label: question.noLabel || "No", className: "no" }
  ];

  const renderReflectionInput = ({ question, index }) => {
    if (question.enableTextarea === false) return "";

    const hint = question.enableTextHint !== false
      ? (question.textHint || "Describe if needed...")
      : "";

    return `
      <textarea
        id="reflectionInput"
        class="reflection-input"
        rows="3"
        placeholder="${escapeHTML(hint)}"
        aria-label="Optional reflection for question ${index + 1}"
      ></textarea>
    `;
  };

  const renderChoiceQuestion = ({ question, index }) => {
    const options = question.answerOptions || defaultAnswerOptions(question);

    return `
      <div class="answer-actions">
        ${options.map((option) => `
          <button class="answer-button ${escapeHTML(option.className || option.value)}" type="button" data-answer="${escapeHTML(option.value)}">
            <span>${escapeHTML(option.label)}</span>
          </button>
        `).join("")}
      </div>
      ${renderReflectionInput({ question, index })}
    `;
  };

  const renderTextQuestion = ({ question, index }) => renderReflectionInput({
    question: { ...question, enableTextarea: true, enableTextHint: true },
    index
  });

  const questionRenderers = new Map([
    ["choice", renderChoiceQuestion],
    ["yesNo", renderChoiceQuestion],
    ["text", renderTextQuestion]
  ]);

  const registerQuestionComponent = (type, renderer) => {
    questionRenderers.set(type, renderer);
  };

  const renderQuestionComponent = (context) => {
    const type = context.question.type || "choice";
    const renderer = questionRenderers.get(type);

    if (!renderer) {
      throw new Error(`Unknown question component type: ${type}`);
    }

    return renderer(context);
  };

  const renderQuestionView = ({
    question,
    index,
    total,
    direction = "forward",
    imageSrc = "assets/reflection-companion.png"
  }) => {
    const number = `${index + 1} of ${total}`;

    return `
      <article class="question-view${direction === "back" ? " from-back" : ""}" aria-labelledby="questionText">
        <div class="question-illustration" aria-hidden="true">
          <img src="${escapeHTML(imageSrc)}" alt="">
        </div>
        <div class="question-content">
          <div class="question-number" aria-hidden="true">${number}</div>
          <h1 id="questionText" class="question-text">${escapeHTML(question.text)}</h1>
          ${renderQuestionComponent({ question, index, total })}
        </div>
        <nav class="question-navigation" aria-label="Question navigation">
          <button class="back-button" type="button" ${index === 0 ? "disabled" : ""}>Back</button>
          <button class="next-button" type="button">Next</button>
        </nav>
      </article>
    `;
  };

  const applySelectedAnswer = (root, answer) => {
    root.querySelectorAll("[data-answer]").forEach((button) => {
      const isSelected = button.dataset.answer === answer;
      button.classList.toggle("is-selected", isSelected);
      button.classList.toggle("is-unselected", Boolean(answer) && !isSelected);
    });
  };

  const getReflectionValue = (root) => (
    root.querySelector(".reflection-input")?.value.trim() || ""
  );

  const setReflectionValue = (root, value) => {
    const input = root.querySelector(".reflection-input");
    if (input) input.value = value || "";
  };

  const createTextField = ({
    id,
    label,
    type = "input",
    placeholder = "",
    value = "",
    rows = 4,
    onInput
  }) => {
    const wrapper = document.createElement("div");
    const labelElement = document.createElement("label");
    const control = document.createElement(type === "textarea" ? "textarea" : "input");

    wrapper.className = "form-field";
    labelElement.className = "field-label";
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    control.className = "field-control";
    control.id = id;
    control.name = id;
    control.placeholder = placeholder;
    control.value = value;

    if (type === "textarea") {
      control.rows = rows;
    }

    if (onInput) {
      control.addEventListener("input", () => onInput(control.value));
    }

    wrapper.append(labelElement, control);
    return wrapper;
  };

  const createCheckboxChoice = ({
    label,
    value = label,
    checked = false,
    onChange
  }) => {
    const option = document.createElement("label");
    const text = document.createElement("span");
    const checkbox = document.createElement("input");
    const indicator = document.createElement("span");

    option.className = "affect-option";
    text.textContent = label;
    checkbox.type = "checkbox";
    checkbox.value = value;
    checkbox.checked = checked;
    checkbox.addEventListener("change", () => {
      if (onChange) onChange(checkbox.checked, value);
    });
    indicator.className = "choice-circle";
    indicator.setAttribute("aria-hidden", "true");

    option.append(text, checkbox, indicator);
    return option;
  };

  Object.assign(design, {
    applySelectedAnswer,
    createCheckboxChoice,
    createTextField,
    escapeHTML,
    getReflectionValue,
    registerQuestionComponent,
    renderQuestionComponent,
    renderQuestionView,
    setReflectionValue
  });
})(window);
