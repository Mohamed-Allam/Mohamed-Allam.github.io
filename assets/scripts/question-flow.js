(function attachQuestionFlow(global) {
  const design = global.ReflectionDesign;
  const {
    applySelectedAnswer,
    getReflectionValue,
    renderQuestionView,
    setReflectionValue
  } = design;

  const wait = (milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds));

  const createQuestionFlow = ({
    questions,
    imageSrc = "assets/reflection-companion.png",
    redirectUrl = "https://www.google.com"
  }) => {
    const questionMount = document.getElementById("questionMount");
    const remainingCount = document.getElementById("remainingCount");
    const progressTrack = document.getElementById("progressTrack");
    const progressValue = document.getElementById("progressValue");
    const completion = document.getElementById("completion");
    const thankYou = document.getElementById("thankYou");
    const answerStatus = document.getElementById("answerStatus");
    const soundToggle = document.getElementById("soundToggle");
    const completionBack = document.getElementById("completionBack");
    const submitButton = document.getElementById("submitBtn");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let currentQuestion = 0;
    let isTransitioning = false;
    let selectedAnswer = null;
    let soundEnabled = true;
    let audioContext;
    const responses = [];

    const initializeProgress = () => {
      remainingCount.textContent = `${questions.length} ${questions.length === 1 ? "question" : "questions"} remaining`;
      progressTrack.setAttribute("aria-valuemax", String(questions.length));
      progressValue.style.setProperty("--question-count", questions.length);
      progressValue.replaceChildren(
        ...questions.map(() => document.createElement("span"))
      );
    };

    const updateProgress = () => {
      const remaining = Math.max(questions.length - currentQuestion, 0);
      const completed = Math.min(currentQuestion, questions.length);
      const visibleProgress = currentQuestion < questions.length ? currentQuestion + 1 : questions.length;

      remainingCount.textContent = `${remaining} ${remaining === 1 ? "question" : "questions"} remaining`;
      progressTrack.setAttribute("aria-valuenow", String(completed));
      [...progressValue.children].forEach((segment, index) => {
        segment.classList.toggle("is-active", index < visibleProgress);
      });
    };

    const playSound = (soundName) => {
      if (!soundEnabled) return;

      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;

      audioContext ??= new AudioContextClass();
      if (audioContext.state === "suspended") {
        void audioContext.resume();
      }

      const sound = {
        yes: { from: 520, to: 660, duration: 0.16 },
        no: { from: 440, to: 392, duration: 0.16 },
        next: { from: 610, to: 760, duration: 0.12 },
        finish: { from: 520, to: 740, duration: 0.18 }
      }[soundName] || { from: 500, to: 620, duration: 0.14 };

      const now = audioContext.currentTime;
      const oscillator = audioContext.createOscillator();
      const gain = audioContext.createGain();

      oscillator.type = "sine";
      oscillator.frequency.setValueAtTime(sound.from, now);
      oscillator.frequency.exponentialRampToValueAtTime(sound.to, now + Math.min(0.11, sound.duration - 0.03));
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.15, now + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + sound.duration);

      oscillator.connect(gain);
      gain.connect(audioContext.destination);
      oscillator.start(now);
      oscillator.stop(now + sound.duration + 0.01);
    };

    const saveCurrentResponse = () => {
      responses[currentQuestion] = {
        answer: selectedAnswer,
        reflection: getReflectionValue(questionMount)
      };
    };

    const chooseAnswer = (answer) => {
      if (isTransitioning) return;

      selectedAnswer = answer;
      saveCurrentResponse();
      applySelectedAnswer(questionMount, selectedAnswer);
      playSound(answer);

      const selected = [...questionMount.querySelectorAll("[data-answer]")]
        .find((button) => button.dataset.answer === answer);
      answerStatus.textContent = `${selected?.textContent.trim() || "Answer"} selected. You can add a comment or choose Next.`;
    };

    const renderQuestion = (direction = "forward") => {
      if (currentQuestion >= questions.length) {
        questionMount.innerHTML = "";
        completion.hidden = false;
        updateProgress();
        completion.querySelector("button").focus({ preventScroll: true });
        return;
      }

      completion.hidden = true;
      const question = questions[currentQuestion];
      const savedResponse = responses[currentQuestion] || {};
      selectedAnswer = savedResponse.answer || null;

      questionMount.innerHTML = renderQuestionView({
        question,
        index: currentQuestion,
        total: questions.length,
        direction,
        imageSrc
      });

      questionMount.querySelectorAll("[data-answer]").forEach((button) => {
        button.addEventListener("click", () => chooseAnswer(button.dataset.answer));
      });
      questionMount.querySelector(".next-button").addEventListener("click", nextQuestion);
      questionMount.querySelector(".back-button").addEventListener("click", previousQuestion);

      setReflectionValue(questionMount, savedResponse.reflection);
      if (selectedAnswer) applySelectedAnswer(questionMount, selectedAnswer);
      updateProgress();
    };

    async function nextQuestion() {
      if (isTransitioning) return;
      isTransitioning = true;

      const view = questionMount.querySelector(".question-view");
      saveCurrentResponse();
      playSound("next");
      questionMount.querySelectorAll(".back-button, .answer-button, textarea, input").forEach((control) => {
        control.disabled = true;
      });
      answerStatus.textContent = selectedAnswer
        ? "Moving to the next question."
        : "Question skipped. Moving to the next question.";

      view.classList.add("is-leaving");
      await wait(reducedMotion.matches ? 20 : 300);

      currentQuestion += 1;
      isTransitioning = false;
      renderQuestion();
    }

    async function previousQuestion() {
      if (currentQuestion === 0 || isTransitioning) return;
      isTransitioning = true;

      saveCurrentResponse();
      const view = questionMount.querySelector(".question-view");
      questionMount.querySelectorAll("button, textarea, input").forEach((control) => {
        control.disabled = true;
      });
      answerStatus.textContent = "Returning to the previous question.";
      view.classList.add("is-going-back");
      await wait(reducedMotion.matches ? 20 : 300);

      currentQuestion -= 1;
      isTransitioning = false;
      renderQuestion("back");
    }

    soundToggle.addEventListener("click", () => {
      soundEnabled = !soundEnabled;
      soundToggle.classList.toggle("is-muted", !soundEnabled);
      soundToggle.setAttribute("aria-pressed", String(!soundEnabled));
      soundToggle.setAttribute("aria-label", soundEnabled ? "Mute answer sounds" : "Turn on answer sounds");
    });

    completionBack.addEventListener("click", () => {
      completion.hidden = true;
      currentQuestion = questions.length - 1;
      renderQuestion("back");
    });

    submitButton.addEventListener("click", () => {
      playSound("finish");
      completion.hidden = true;
      thankYou.hidden = false;

      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 5000);
    });

    initializeProgress();
    renderQuestion();

    return {
      get responses() {
        return responses;
      }
    };
  };

  design.createQuestionFlow = createQuestionFlow;
})(window);
