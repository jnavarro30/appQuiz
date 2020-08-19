const Choices = (_ => {
    const init = _ => {
        listeners();
    };

    const listeners = _ => {
        let mainChoiceList = document.querySelector('.main__choices');

        mainChoiceList.addEventListener('click', event => {
            if (event.target.classList.contains('main__choice')) {
                let icon = event.target.firstElementChild.firstElementChild;
                toggleCheck(icon);
            } 
        });

        mainChoiceList.addEventListener('click', event => {
            if (event.target.classList.contains('main__icon')) {
                let icon = event.target;
                toggleCheck(icon);
            } 
        });

        mainChoiceList.addEventListener('click', event => {
            if (event.target.classList.contains('main__option')) {
                let icon = event.target.parentElement.firstElementChild.firstElementChild;
                toggleCheck(icon);
            } 
        });
    };

    const toggleCheck = item => {
        let mainIcons = document.querySelectorAll('.main__icon');
        mainIcons.forEach(icon => {
            icon.classList.add('fa-circle');
            icon.classList.remove('fa-check-circle');
        });
        item.classList.remove('fa-circle');
        item.classList.add('fa-check-circle');
    };

    return {
        init
    };
})();

Choices.init();

export default Choices;

