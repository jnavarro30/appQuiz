const Choices = (_ => {
    const mainChoicesList = document.querySelector('.main__choices'), 
          mainInputEls = document.querySelectorAll('input[name="choice"]');

    const init = _ => {
        listeners();
    };

    const listeners = _ => {
        mainChoicesList.addEventListener('click', event => {
            if(event.target.classList.contains('main__input')) {
                let selectedChoice = event.target.parentElement.parentElement,
                    selectedIcon = selectedChoice.firstElementChild.firstElementChild;
                mainInputEls.forEach(input => {
                    let choice = input.parentElement.parentElement,
                        icon = choice.firstElementChild.firstElementChild;

                    choice.classList.remove('selection');
                    icon.classList.add('fa-circle');
                    icon.classList.remove('fa-check-circle');
                });
                selectedChoice.classList.add('selection');
                selectedIcon.classList.remove('fa-circle');
                selectedIcon.classList.add('fa-check-circle');
            }
        });
    };

    return {
        init
    };
})();

export default Choices;