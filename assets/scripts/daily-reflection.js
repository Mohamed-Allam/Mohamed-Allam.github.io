const questions = [
  {
    text: "When we retire at night, we constructively review our day. Were we resentful?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe if needed..."
  },
  {
    text: "Were we selfish?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe if needed..."
  },
  {
    text: "Were we dishonest?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe if needed..."
  },
  {
    text: "Were we afraid?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe if needed..."
  },
  {
    text: "Do we owe an apology?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Who do you need to apologize to?"
  },
  {
    text: "Have we kept something to ourselves which should be discussed with another person at once?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe if needed..."
  },
  {
    text: "Were we kind and loving toward all?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: false,
    textHint: ""
  },
  {
    text: "What could we have done better?",
    yesLabel: "I reflected on this",
    noLabel: "Not yet",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Write your reflection..."
  },
  {
    text: "Were you aware that life and everything which is happening is just a temporary phase in your existence and not the final destination?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe if needed..."
  },
  {
    text: "Are you chasing life or walking towards God? Are you inside the movie called life or watching it?",
    yesLabel: "Walking towards God",
    noLabel: "Chasing life",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe your experience today..."
  },
  {
    text: "Are you living a spiritual life by acting according to spiritual principles?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: false,
    textHint: ""
  },
  {
    text: "Did you anchor yourself today through the ACE? When?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "When did you practice it?"
  },
  {
    text: "Did you meditate today?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: false,
    enableTextHint: false,
    textHint: ""
  },
  {
    text: "Were you aware that control is just an illusion today? Where did you practice control?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Control is defined as attachment to Output"
  },
  {
    text: "Did you spend five minutes speaking to God this morning?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: false,
    textHint: ""
  },
  {
    text: "Did you Remember That you can't Challenge God and win even if the odds are in your Favor? Remember Egypt vs Argentina in WC2026 @78 mins 2 - 0 ?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: false,
    textHint: ""
  },
  {
    text: "Did you share your thoughts & Connected with someone today?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "How many cups did you have?"
  },
  {
    text: "Did you drink only two cups of coffee today?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "How many cups did you have?"
  }
];

window.ReflectionDesign.createQuestionFlow({ questions });
