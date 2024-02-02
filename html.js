const quizDB = [
    {
      question: "Q1: Which tag is used to create a hyperlink in HTML?",
      a: "<url",
      b: "<link>",
      c: "<a>",
      d: "<href>",
      ans: "ans3"
    },
    {
      question: "Q2: In HTML, what does the acronym HTML stand for?",
      a: "HyperText Markup Language",
      b: "High-Level Text Management Language",
      c: "HyperText Machine Learning",
      d: " HyperText Modern Language",
      ans: "ans1"
    },
    {
      question: "Q3: What is the purpose of the <head> tag in HTML?",
      a: "To define the main content of the document",
      b: "To define a header for a document or a section ",
      c: "To create a line break in the text",
      d: "To insert an image into the document",
      ans: "ans2"
    },
    {
      question: "Q4: Which attribute is used to specify an alternative text for an image in HTML?",
      a: "alt",
      b: "title",
      c: "description",
      d: "img-alt",
      ans: "ans1"
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
        window.location.href = 'result.html';
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