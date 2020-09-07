import Quiz from './quiz.js';

const Results = (_ => {
    const init = _ => {
        renderEndScreen();
    };

    const state = {
        finalScore: 0,
        numberOfQuestions: 0
    };

    const setState = (score, questions) => {
        state.finalScore = score;
        state.numberOfQuestions = questions;
    };

    const renderEndScreen = _ => {
        const questionEl = document.querySelector('.header__question'),
              trackerEl = document.querySelector('.header__tracker'),
              taglineEl = document.querySelector('.header__tagline'),
              renderHTML = Quiz.renderHTML;
        
        renderHTML(questionEl, 'Quiz Results ');
        renderHTML(trackerEl, `Your Score: ${Math.floor((state.finalScore / state.numberOfQuestions) * 100)}%`);
        renderHTML(taglineEl, 'Complete!');
    };

    return {
        init,
        setState
    };
})();


export default Results;