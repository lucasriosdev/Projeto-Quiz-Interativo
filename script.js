const questions = [
    { type: "multiple", question: "Qual destas não é uma linguagem de programação?", options: ["HTML", "Python", "JavaScript", "C++", "CSS"], answer: "HTML" },
    { type: "split", question: "Qual é mais utilizado para estilização de páginas?", options: ["CSS", "JavaScript"], answer: "CSS" },
    { type: "multiple", question: "Qual destes é um framework JavaScript?", options: ["React", "Django", "Laravel", "Spring", "Flask"], answer: "React" },
    { type: "split", question: "Qual é mais usado para backend?", options: ["Node.js", "CSS"], answer: "Node.js" },
    { type: "multiple", question: "Qual elemento HTML é usado para criar links?", options: ["<a>", "<div>", "<span>", "<p>", "<link>"], answer: "<a>" }
];

const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);
let currentQuestionIndex = 0;
let score = 0;

shuffleArray(questions);

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const optionsContainer = document.getElementById("options");
    optionsContainer.innerHTML = "";
    shuffleArray([...questionData.options]).forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(option) {
    if (option === questions[currentQuestionIndex].answer) {
        score++;
    }
    if (currentQuestionIndex < 4) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    document.getElementById("result-modal").classList.remove("hidden");
    document.getElementById("score").textContent = `Seu Score: ${score}/5`;
    document.getElementById("message").textContent = score > 2 ? "Parabéns!" : "Tente novamente.";
    if (score > 2) {
        document.getElementById("success-sound").play();
    }
    document.getElementById("restart-btn").classList.remove("hidden");
}

document.getElementById("restart-btn").addEventListener("click", restartQuiz);

function restartQuiz() {
    score = 0;
    currentQuestionIndex = 0;
    shuffleArray(questions);
    document.getElementById("result-modal").classList.add("hidden");
    document.getElementById("restart-btn").classList.add("hidden");
    loadQuestion();
}

loadQuestion();
