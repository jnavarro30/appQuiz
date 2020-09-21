import Results from './results.js';

const Quiz = (_ => {
    const state = {
        numberOfQuestions: 5,
        currentQuestionIndex: 0,
        userScore: 0,
        categoryId: 27,
        difficulty: 'easy'
    };

    let {
        numberOfQuestions,
        currentQuestionIndex,
        userScore, 
        categoryId,
        difficulty
    } = state;

    const init = _ => {
        renderQuiz();
    };

    const renderHTML = (elem, html) => {
        elem.innerHTML = html;
    };

    const renderQuiz = async _ => {
        const triviaURL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&category=${categoryId}&difficulty=${difficulty}&type=multiple`,
            request = await fetch(triviaURL),
            data = await request.json(),
            triviaData = data.results;

        const questionEl = document.querySelector('.header__question'),
            trackerEl = document.querySelector('.header__tracker'),
            progressEl = document.querySelector('.header__bar'),
            taglineEl = document.querySelector('.header__tagline'),
            choiceEls = document.querySelectorAll('.main__choice'),
            optionEls = document.querySelectorAll('.main__option');

        let triviaObj = triviaData[currentQuestionIndex],
            triviaQuestion = triviaObj.question,
            triviaAnswer = triviaObj.correct_answer,
            triviaChoices = [...triviaObj.incorrect_answers, triviaAnswer];

        const shuffleChoices = arr => {
            for (let i = arr.length - 1; i > 0; i--) {
                let j = Math.floor(Math.random() * (i + 1));
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
            return arr;
        };

        const quizDataUpdate = _ => {
            triviaObj = triviaData[currentQuestionIndex];
            triviaQuestion = triviaObj.question;
            triviaAnswer = triviaObj.correct_answer;
            triviaChoices = [...triviaObj.incorrect_answers, triviaAnswer];
            
            let selectedRadio = document.querySelector('input[name="choice"]:checked');
            if(selectedRadio) selectedRadio.checked = false;
            choiceEls.forEach(choice => {
                let icon = choice.firstElementChild.firstElementChild;
                choice.classList.remove('selection');
                icon.classList.add('fa-circle');
                icon.classList.remove('fa-check-circle');
            });
        };

        const renderOptions = _ => {
            shuffleChoices(triviaChoices);
            optionEls.forEach((option, index) => {
                option.textContent = triviaChoices[index];
            });
        };

        const isCorrect = _ => {
            const userAnswer = document.querySelector('input[name="choice"]:checked')
                              .nextElementSibling.textContent;
            if(userAnswer) {
                if(userAnswer == triviaAnswer) userScore++;
            }
        };

        const renderAll = _ => {
            renderHTML(questionEl, triviaQuestion);
            renderHTML(trackerEl, `${currentQuestionIndex + 1} of ${numberOfQuestions}`);
            progressEl.style.width = `${((currentQuestionIndex+1)/numberOfQuestions) * 100}%`;
            renderHTML(taglineEl, 'Choose an Option below');
            renderOptions();
        };

        const listeners = _ => {
            const nextBtnEl = document.querySelector('.footer__next'),
                restartBtnEl = document.querySelector('.footer__restart');

            nextBtnEl.addEventListener('click', _ => {
                if(taglineEl.textContent == 'Complete!') return;
                if (currentQuestionIndex == (numberOfQuestions - 1)) {
                    isCorrect();
                    Results.setState(userScore, numberOfQuestions);
                    Results.init();
                    const mainChoicesEl = document.querySelector('.main__choices');
                    mainChoicesEl.style.display = 'none';
                }
                else {
                    isCorrect();
                    currentQuestionIndex++;
                    quizDataUpdate();
                    renderAll();
                }
            });

            restartBtnEl.addEventListener('click', _ => {
                const mainChoicesEl = document.querySelector('.main__choices');
                mainChoicesEl.style.display = 'grid';
                currentQuestionIndex = 0;
                userScore = 0;
                quizDataUpdate();
                renderAll();
            });
        };

        renderAll();
        listeners();
    };



    return {
        init,
        renderHTML,
        userScore
    };
})();

export default Quiz;


// random Arr assortment