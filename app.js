const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const scoreText = document.querySelector('#score');

let currentQuestion = {}
let acceptingAnswer = true
let score = 0
let questionCounter = 0
let availableQuestions = []

let questions = [
    {
        question: 'What was the first video game?',
        choice1: 'Tetris',
        choice2: "Asteroids",
        choice3: "Pong",
        choice4: "Donkey Kong",
        answer: 3,
    },
    {
        question: "Who saves the Mushroom Kingdom?",
        choice1: "Link",
        choice2: "Bowser",
        choice3: "Samus",
        choice4: "Mario",
        answer: 4,
    },
    {
        question: "What is MegaMans Original Name?",
        choice1: "MetalMan",
        choice2: "RockMan",
        choice3: "RobotMan",
        choice4: "ToyMan",
        answer: 2,
    },
    {
        question: "Who is the Princess in Legend of Zelda",
        choice1: "Zelda",
        choice2: "Daisy",
        choice3: "Link",
        choice4: "Peach",
        answer: 1,
    },
    {
        question: "What company created Resident Evil?",
        choice1: "Capcom",
        choice2: "Nintendo",
        choice3: "Ubisoft",
        choice4: "Atari",
        answer: 1,
    },
    {
        question: "Which of these games does not let you fish?",
        choice1: "Sonic Adventure",
        choice2: "Legend of Zelda: Ocarina of Time",
        choice3: "Pokemon Blue",
        choice4: "Mario Kart 64",
        answer: 4,
    },
    {
        question: "Which of these is not a real game?",
        choice1: "Katamari Damacy",
        choice2: "Jiggy's Adventure Palace",
        choice3: "Perfect Dark",
        choice4: "Kid Klown in Crazy Chase",
        answer: 2,
    },
    {
        question: "What does Kazooie shoot in Banjo-Tooie?",
        choice1: 'Eggs',
        choice2: 'Bullets',
        choice3: 'Fire',
        choice4: 'Bees',
        answer: 1,
    },
    {
        question: "Who is the main villian in Mega Man",
        choice1: "Dr. Light",
        choice2: "Dr. Oz",
        choice3: "Dr. Eggman",
        choice4: "Dr. Wily",
        answer: 4,
    },
    {
        question: "Which Nintendo Character can copy the ability of anyone they eat?",
        choice1: "Wario",
        choice2: "Yoshi",
        choice3: "Bowser",
        choice4: "Kirby",
        answer: 4,
    },
]

const POINTS_SCORED = 1
const TOTAL_QUESTIONS = 10

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > TOTAL_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('final.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${TOTAL_QUESTIONS}`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswer = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswer) return

        acceptingAnswer = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            addScore(POINTS_SCORED)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

addScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()