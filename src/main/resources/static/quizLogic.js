const questions = [
    {
        question: "Who is the prof for surrey cmpt 276?",
        answers: [
            { text: "A. Abdullah Wong", correct: false},
            { text: "B. Bobby Chan", correct: true},
            { text: "C. Chikae Cheung", correct: false},
            { text: "D. Mohammond Smith", correct: false},
        ]   
    },
    {
        question: "Who came on strike in 2024 Jan?",
        answers: [
            { text: "A. Translink", correct: true},
            { text: "B. TSSU", correct: false},
            { text: "C. SFU Staff", correct: false},
            { text: "D. Dining Hall", correct: false},
        ]
    },
    {
        question: "Where does Jacky Chan from?",
        answers: [
            { text: "A. Africa", correct: false},
            { text: "B. North America", correct: false},
            { text: "C. Asia", correct: true},
            { text: "D. Europe", correct: false},
        ]
    },
    {
        question: "Who is the author of this quiz?",
        answers: [
            { text: "A. Sma", correct: false},
            { text: "B. Ams", correct: false},
            { text: "C. Mas", correct: false},
            { text: "D. Sam", correct: true},
        ]
    }
]

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz()
{
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion()
{
    resetState();
    let currQuest = questions[currQuestionIndex];
    let questno = currQuestionIndex + 1;
    questionElement.innerHTML = questno + ". " + currQuest.question;
    currQuest.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct)
        {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState()
{
    nextButton.style.display = "none";
    while(answerButton.firstChild)
    {
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e)
{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => 
        {
            if(button.dataset.correct === "true")
            {
                button.classList.add("correct");
            }
            button.disabled = true;
        });
        nextButton.style.display = "block";
}

function showScore()
{
    resetState();
    questionElement.innerHTML = 'You scored ' + score +  ' out of 4!' + "\n" + 'Correct Answer: B, A, C, D' ;
    nextButton.innerHTML = "Play Again!";
    nextButton.style.display = "block";
}

function handleNextButton()
{
    currQuestionIndex++;
    if(currQuestionIndex < questions.length)
    {
        showQuestion();
    }
    else
    {
        showScore();
    }
}

nextButton.addEventListener("click", ()=>
{
    if(currQuestionIndex < questions.length)
    {
        handleNextButton ();
    }
    else
    {
        startQuiz();
    }
})

startQuiz();