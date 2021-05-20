const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3');

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question');

const numberOfQuestion = document.getElementById('number-of-question'),
      numberOfAllQuestions = document.getElementById('number-of-all-questions');

let indexOfQuestion,
    indexOfPage = 0;

const answersTracker = document.getElementById('answers-tracker');

const btnNext = document.getElementById('btn-next');

const modal = document.querySelector('.quiz-over-modal');

let score = 0;
// модальное окно
const correctAnswer = document.getElementById('correct-answer'),
      numberOfAllQuestins2 = document.getElementById('number-of-all-questions-2');
      btnTryAgain = document.getElementById('btn-try-again');

const questions = [
    {
        question: 'С какой станции отправлялся любознательный Паровозик в одноименном мультфильме?',
        options: [
            'Васильково',
            'Ромашково',
            'Колокольчиково',
        ],
        rightAnswer: 1
    },
    {
        question: 'Чему равнялась длина удава, измеренная в слонах в мультике «38 попугаев»?',
        options: [
            'Один',
            'Два',
            'Три',
        ],
        rightAnswer: 1
    },
    {
        question: 'Куда отказывался ехать толстый кот из мультфильма про приключения попугая Кеши?',
        options: [
            'Гаити',
            'Мадагаскар',
            'Таити',
        ],
        rightAnswer: 2
    },
    {
        question: 'Пение какой диковинной птицы мечтал услышать легендарный барон Мюнхгаузен?',
        options: [
            'Павлин',
            'Соловей',
            'Попугай',
        ],
        rightAnswer: 0
    },
    {
        question: 'Зачем мама отправила Крошку Енота к пруду?',
        options: [
            'Набрать воды',
            'Наловить рыбы',
            'Нарвать сладкой осоки',
        ],
        rightAnswer: 2
    }
];

numberOfAllQuestions.innerHTML = questions.length;

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question;

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];

    numberOfQuestion.innerHTML = indexOfPage + 1;
    indexOfPage++;
};

let complitedAnswers = [];

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; //якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver();
    } else {
        if(complitedAnswers.length > 0) {
            complitedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true;
                }
            });
            if(hitDuplicate) {
                randomQuestion();
            } else{
                    indexOfQuestion = randomNumber;
                    load();
                }
            }
            if(complitedAnswers.length == 0) {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        complitedAnswers.push(indexOfQuestion);
    }

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        score++;
        updateAnswerTracker('correct');
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}
for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));

}
const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
};

const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`)
}
const validate = () => {
    if(!optionElements[0].classList.contains('disabled')) {
        alert('Необходимо выбрать один из вариантов ответа');
    }
    else {
        randomQuestion();
        enableOptions();
    }
}
const quizOver = () => {
    modal.classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestins2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener ('click', () => {
    tryAgain();
});
btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
