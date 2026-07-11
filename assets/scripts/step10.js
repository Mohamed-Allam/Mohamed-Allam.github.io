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
    text: "were we thinking of ourselves most of the time ?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe if needed..."
  },
  {
    text: "Or were we thinking of what we could do for others, of what we could pack into the stream of life?",
    yesLabel: "Yes",
    noLabel: "No",
    enableTextarea: true,
    enableTextHint: true,
    textHint: "Describe your experience today..."
  }
];

window.ReflectionDesign.createQuestionFlow({ questions });
