const questions = [
  {
    question:"Which is the largest animal in the world?",
    answers:[
      {text:"Shark", correct:false},
      {text:"Blue whale", correct:false},
      {text:"Elephant", correct:false},
      {text:"Giraffe", correct:false},
    ]
  },
  {
    question:"Which is the longest river in the world?",
    answers:[
      {text:"Nile River", correct:true},
      {text:"Amazon River", correct:false},
      {text:"Mississippi River", correct:false},
      {text:"Congo River", correct:false},
    ]
  },
  {
    question:"Which is the largest bird in the world?",
    answers:[
      {text:"Bald Eagles", correct:false},
      {text:"Penguin", correct:false},
      {text:"Ostrich", correct:true},
      {text:"Sparrow", correct:false},
    ]
  },
  {
    question:"Which is the longest forest in the world?",
    answers:[
      {text:"Congo Basin Rainforest", correct:false},
      {text:"Amazon Rainforest", correct:true},
      {text:"Black Forest", correct:false},
      {text:"Great Bear Rainforest", correct:false},
    ]
  },
  {
    question:"Which is the more  populated country in the world?",
    answers:[
      {text:"India", correct:false},
      {text:"United States", correct:false},
      {text:"Canada", correct:false},
      {text:"China", correct:true},
    ]
  }
];

const questionElement=document.getElementById("question");
const answerButton=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
  currentQuestionIndex=0;
  score=0;
  nextButton.innerHTML="Next";
  showQuestion();
}

function showQuestion(){

  resetState();
  let currentQuestion=questions[currentQuestionIndex];
  let questionNo=currentQuestionIndex + 1;
  questionElement.innerHTML=questionNo + ". "+currentQuestion.question;


  currentQuestion.answers.forEach(answer=>{
    const button=document.createElement("button");
    button.innerHTML=answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);
    if(answer.correct){
      button.dataset.correct=answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display="none";
  while(answerButton.firstChild){
    answerButton.removeChild(answerButton.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn=e.target;
  const isCorrect=selectedBtn.dataset.correct==="true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }
  else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButton.children).forEach(button =>{
    if(button.dataset.correct==="true"){
       button.classList.add("correct");
    }
    button.disabled=true;
  });
  nextButton.style.display="block";
}

function showScore(){
  resetState();
  questionElement.innerHTML=`You scored ${score} out of ${questions.length}`;
  nextButton.innerHTML="Play Again";
  nextButton.style.display="block";
}

function handleNextButton(){
currentQuestionIndex++;
if(currentQuestionIndex<questions.length){
  showQuestion();
}
else {
  showScore();
}
}

nextButton.addEventListener("click",()=>{
if(currentQuestionIndex<questions.length){
  handleNextButton();
}
else {
  startQuiz();
}
});

startQuiz();

