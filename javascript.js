const quizDB = [
    {
      question: "Q1: What is the purpose of the JavaScript typeof operator?",
      a: "Checks if a variable is defined",
      b: " Returns the data type of a variable ",
      c: "Converts a variable to a string",
      d: "Determines if a variable is an object",
      ans: "ans2"
    },
    {
      question: "Q2: How do you declare a variable in JavaScript?",
      a: "variable x;",
      b: " var x;",
      c: "x = variable;",
      d: "declare x;",
      ans: "ans2"
    },
    {
      question: "Q3:  How can you add an event listener to an HTML element in JavaScript?",
      a: "element.addEvent('click', function);",
      b: "element.addEventListener('click', function); ",
      c: "element.on('click', function);",
      d: " element.listen('click', function); ",
      ans: "ans2"
    },
    {
      question: "Q4:  What is the purpose of the JavaScript Array.map() method?",
      a: "Adds elements to an array",
      b: "Removes elements from an array ",
      c: " Concatenates two arrays",
      d: "Iterates through each element of an array and applies a function",
      ans: "ans4"
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
      const reviewButton = document.querySelector('#review-button');
  
      reviewButton.addEventListener('click', () => {
        localStorage.setItem('quizDB', JSON.stringify(quizDB));
        window.location.href = 'resultjs.html';
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