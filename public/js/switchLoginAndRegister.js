var CURRENT_SCREEN = 'REGISTER';

var switchContainer = document.getElementById('switchScreenContainer');
var switchButton = document.querySelector('#switchScreenContainer div');

var signUpForm = document.getElementById('signUpForm');
var signInForm = document.getElementById('signInForm');
var banner = document.getElementById('banner');

function switchScreen() {
    if(CURRENT_SCREEN === 'REGISTER') {
        switchButton.style.left = '25%';
        switchContainer.children[0].classList.remove('activeScreen');
        switchContainer.children[1].classList.add('activeScreen');
        
        signUpForm.classList.add('disabledForm');
        signInForm.classList.remove('disabledForm');
        banner.src = '../assets/img/PalmeirasCampeao2021.png';

        CURRENT_SCREEN = 'LOGIN';
    } else {
        switchButton.style.left = '15%';
        switchContainer.children[1].classList.remove('activeScreen');
        switchContainer.children[0].classList.add('activeScreen');

        signUpForm.classList.remove('disabledForm');
        signInForm.classList.add('disabledForm');
        banner.src = '../assets/img/PalmeirasCampeao2020.png';
        
        CURRENT_SCREEN = 'REGISTER';
    }
}

function removeForm(form) {
    form.style.display = 'none';
}