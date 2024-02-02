const quizDB = [
    {
      question: "Q1: What does the CSS property margin: 0 auto; do?",
      a: "Adds a margin to the top and bottom",
      b: "Centers an element horizontally",
      c: "Sets all margins to zero",
      d: "Creates a vertical margin",
      ans: "ans2"
    },
    {
      question: "Q2: How can you select an element with the ID example in CSS?",
      a: "example",
      b: ".example",
      c: "#example",
      d: "element:example",
      ans: "ans3"
    },
    {
      question: "Q3:  What is the purpose of the CSS property z-index?",
      a: "Controls the transparency of an element ",
      b: " Sets the background color of an element",
      c: "Defines the stacking order of an element ",
      d: "Adjusts the width of an element",
      ans: "ans3"
    },
    {
      question: "Q4: How can you apply styles to every other row in a table with CSS?",
      a: " tr:nth-child(odd)",
      b: "tr:even",
      c: "tr:nth-child(even)",
      d: "tr:odd",
      ans: "ans3"
    }
    
  ];
  
  const question = document.querySelector('.question');
  const optiona = document.querySelector('#option1');
  const optionb = document.querySelector('#option2');
  const optionc = document.querySelector('#option3');
  const optiond = document.querySelector('#option4');
  const submit = document.querySelector('#submit');
  const previousButton = document.querySelector('#previous-button');
  const questionNumberText = document.querySelector('.question-number');
  const answers = document.querySelectorAll('.answer');
  const newid = document.querySelector('#newid');
  let questionCount = 0;
  let score = 0;
  
  const loadquestion = () => {
    const questionList = quizDB[questionCount];
  
    const questionNumber = questionCount + 1;
    const totalQuestions = quizDB.length;
    questionNumberText.innerText = `Question ${questionNumber} of ${totalQuestions}`;
  
    question.innerText = questionList.question;
    optiona.innerText = questionList.a;
    optionb.innerText = questionList.b;
    optionc.innerText = questionList.c;
    optiond.innerText = questionList.d;
  
    
    answers.forEach((curAnsElem, index) => {
      curAnsElem.checked = localStorage.getItem(`Q${questionCount}_A`) === `ans${index + 1}`;
    });
  };
  
  loadquestion();
  
  previousButton.addEventListener('click', () => {
    if (questionCount > 0) {
      questionCount--;
      loadquestion();
    }
  });
  
  
  
  const deselectAll = () => {
    answers.forEach(curAnsElem => (curAnsElem.checked = false));
  };
  deselectAll();
  
  submit.addEventListener('click', () => {
    const checkedAnswer = getCheckAnswer();
    if (checkedAnswer) {
      localStorage.setItem(`Q${questionCount}_A`, checkedAnswer);
    }
  
    if (checkedAnswer === quizDB[questionCount].ans) {
      score++;
    }
  
    if (questionCount < quizDB.length - 1) {
      questionCount++;
      loadquestion();
      deselectAll();
    } 
  
  
    else {
      newid.innerHTML = `
      <div class="result">
      <h2>You score: ${score}/${quizDB.length} correct answers</h2>
  
      <button id="review-button">Review sheet</button>
      </div>
      `;
      // <p>click here for check your sheet of this test</p>
    
      const reviewButton = document.querySelector('#review-button');
  
      reviewButton.addEventListener('click', () => {
        localStorage.setItem('quizDB', JSON.stringify(quizDB));
        window.location.href = 'resultcss.html';
      });
    }
  
  });
  
  
  
  const getCheckAnswer = () => {
    let answer;
    answers.forEach((curAnsElem, index) => {
      if (curAnsElem.checked) {
        answer = `ans${index + 1}`;
      }
  
    });
    return answer;
    
  };