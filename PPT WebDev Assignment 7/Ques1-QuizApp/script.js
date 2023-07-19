const quizQuestions = [
    {
      question: "Who is the father of Computers?",
      options: [
        "James Gosling",
        "Charles Babbage",
        "Dennis Ritchie",
        "Bjarne Stroustrup",
      ],
      correctAnswer: "Charles Babbage",
    },
    {
      question: " Which of the following is the correct abbreviation of COMPUTER?",
      options: [
        "Commonly Occupied Machines Used in Technical and Educational Research",
        "Commonly Operated Machines Used in Technical and Environmental Research",
        "Commonly Oriented Machines Used in Technical and Educational Research",
        "Commonly Operated Machines Used in Technical and Educational Research",
      ],
      correctAnswer: "Commonly Operated Machines Used in Technical and Educational Research",
    },
    {
      question: "What is the full form of CPU?",
      options: [
        "Computer Processing Unit",
        "Computer Principle Unit",
        "Central Processing Unit",
        "Control Processing Unit",
      ],
      correctAnswer: "Central Processing Unit",
    },
    {
      question: "Which of the following language does the computer understand?",
      options: [
        "Computer understands only C Language",
        "Computer understands only Assembly Language",
        "Computer understands only Binary Language",
        "Computer understands only BASIC",
      ],
      correctAnswer: "Computer understands only Binary Language",
    },
    {
      question: "Which of the following computer language is written in binary codes only?",
      options: ["pascal", "machine language", "C", "C#"],
      correctAnswer: "machine language",
    },
    {
      question: "Which of the following is the brain of the computer?",
      options: [
        "Central Processing Unit",
        "Memory",
        "Arithmetic and Logic unit",
        "Control unit",
      ],
      correctAnswer: "Central Processing Unit",
    },
    {
      question:
        " Which of the following is not a characteristic of a computer?",
      options: ["Versatility", "Accuracy", "Diligence", "I.Q."],
      correctAnswer: "I.Q.",
    },
    {
      question: "Which of the following is the smallest unit of data in a computer?",
      options: [
        "Bit",
        "KB",
        "Nibble",
        "Byte",
      ],
      correctAnswer: "Bit",
    },
    {
      question: "Which of the following is not a type of computer code?",
      options: [
        "EDIC",
        "ASCII",
        "BCD",
        "EBCDIC",
      ],
      correctAnswer: "EDIC",
    },
    {
      question: "Which of the following are physical devices of a computer?",
      options: [
        "Hardware",
        "Software",
        "System Software",
        "Package",
      ],
      correctAnswer: "Hardware",
    },
    
  ];
  
  let currentQuestion = 0;
  let score = 0;
  
  const questionElement = document.getElementById("question");
  const optionsElement = document.getElementById("options");
  const submitButton = document.getElementById("submit-btn");
  const feedbackElement = document.getElementById("feedback");
  const leaderboardElement = document.getElementById("leaderboard");
  const resultElement = document.getElementById("result");
  const leaderboardContainer = document.getElementById("leaderboard-container");
  
  const displayQuestion = () => {
    const { question, options } = quizQuestions[currentQuestion];
    questionElement.textContent = `Question ${currentQuestion + 1}: ${question}`;
    optionsElement.innerHTML = "";
  
    // Create a default option
    const defaultOption = document.createElement("option");
    defaultOption.textContent = "--Please choose an option--";
    optionsElement.appendChild(defaultOption);
  
    options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.textContent = option;
      optionsElement.appendChild(optionElement);
    });
  };
  
  const handleOptionSubmit = () => {
    const selectedOption = optionsElement.value;
    const { correctAnswer } = quizQuestions[currentQuestion];
  
    if (selectedOption === "--Please choose an option--") {
      return; // Exit the function if no option is selected
    }
  
    const isCorrect = selectedOption === correctAnswer;
    isCorrect ? score++ : null;
  
    feedbackElement.textContent = isCorrect
      ? "Status: Correct!"
      : "Status: Wrong answer!";
    feedbackElement.classList.add(isCorrect ? "correct" : "incorrect");
    feedbackElement.classList.remove(isCorrect ? "incorrect" : "correct");
  
    if (!isCorrect) {
      feedbackElement.style.background = "red"; // Set background color to red for wrong answer
    } else {
      feedbackElement.style.background = "green";
    }
  
    currentQuestion++;
  
    if (currentQuestion < quizQuestions.length) {
      displayQuestion();
    } else {
      submitButton.style.display = "none";
      leaderboardContainer.style.display = "flex";
      showLeaderboard();
    }
  };
  
  const showLeaderboard = () => {
    leaderboardElement.innerHTML = `
              <th>Total Right Question</th>
              <th>Total Wrong Question</th> 
              <tr>
              <td>${score}</td>
              <td>${quizQuestions.length - score}</td>
          </tr>
      `;
    resultElement.textContent = getResultMessage();
  };
  
  const getResultMessage = () => {
    const percentage = (score / quizQuestions.length) * 100;
  
    if (percentage === 100) {
      return "Congratulations! You got a perfect score!";
    } else if (percentage >= 80) {
      return "Great job! You did really well!";
    } else if (percentage >= 60) {
      return "Good effort! You passed the quiz.";
    } else {
      return "Keep practicing! You can improve.";
    }
  };
  
  submitButton.addEventListener("click", handleOptionSubmit);
  
  displayQuestion();