var containerInputs = document.querySelectorAll('.formInput');

for(var i = 0; i < containerInputs.length; i++) {
    var input = containerInputs[i].querySelector('input');
    
    input.addEventListener('keyup', (event) => {
        if(event.target.value != '') {
            event.composedPath()[1].style.borderColor = 'var(--green)';
            event.composedPath()[2].querySelector('label').style.color = 'var(--green)';
            event.composedPath()[1].querySelector('.iconify').style.color = 'var(--green)';
        } else {
            event.composedPath()[1].style.borderColor = '#00000020';
            event.composedPath()[2].querySelector('label').style.color = 'var(--black)';
            event.composedPath()[1].querySelector('.iconify').style.color = '#9b9b9b';
        }
    });
}
