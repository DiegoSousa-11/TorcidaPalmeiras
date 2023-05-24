function register() {
    const { username, userSurname, email, password, confirmPassword, profileImageInput } = document.forms.namedItem('signUpForm');

    const inputsAreValid = checkRegisterInputs(username, userSurname, email, password, confirmPassword);
    
    if(inputsAreValid) {
        const formData = new FormData();

        formData.append('name', username.value);
        formData.append('surname', userSurname.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('profileImage', profileImageInput.files[0])

        fetch('/user/register', {
            method: 'POST',
            body: formData
        }).then((result) => {
            console.log(result);
            
            if(result.ok) {
                alert('Usuário cadastrado com sucesso');
                switchScreen();
            } else {
                throw ("Houve um erro ao tentar realizar o cadastro!")
            }
        }).catch((error) => {
            console.log(error);
            throw ("Houve um erro ao tentar realizar o cadastro!")
        }) 
    }
}

function checkRegisterInputs(username, userSurname, email, password, confirmPassword) {
    const alertsContainer = signUpForm.querySelector('.alerts');

    var allInputsAreValid = true;

    if(!username.value || !userSurname.value || !email.value || !password.value || !confirmPassword.value) {
        alertsContainer.innerHTML = `
            <p style='color: #E7584F'>
                <span class="iconify" data-icon="ic:round-close"></span>
                Todos os campos devem ser preenchidos
            </p>
        `;

        allInputsAreValid = false;
    } else {
        alertsContainer.innerHTML = `
            <p style='color: #00984C'>
                <span class="iconify" data-icon="ic:round-check"></span>
                Todos os campos devem ser preenchidos
            </p>
        `;
    }

    if(password.value.length < 8) {
        alertsContainer.innerHTML += `
            <p style='color: #E7584F'>
                <span class="iconify" data-icon="ic:round-close"></span>
                A senha deve ter pelo menos 8 caracteres
            </p>
        `;

        allInputsAreValid = false;
    } else {
        alertsContainer.innerHTML += `
            <p style='color: #00984C'>
                <span class="iconify" data-icon="ic:round-check"></span>
                A senha deve ter pelo menos 8 caracteres
            </p>
        `;
    }

    if(password.value !== confirmPassword.value) {
        alertsContainer.innerHTML += `
            <p style='color: #E7584F'>
                <span class="iconify" data-icon="ic:round-close"></span>
                As senhas devem coincidir
            </p>
        `;

        allInputsAreValid = false;
    } else {
        alertsContainer.innerHTML += `
            <p style='color: #00984C'>
                <span class="iconify" data-icon="ic:round-check"></span>
                As senhas devem coincidir
            </p>
        `;
    }

    return allInputsAreValid;
}
