function login() {
    const { email, password } = document.forms.namedItem('signInForm');

    const inputsAreValid = checkLoginInputs(email, password);

    if(inputsAreValid) {
        fetch('/user/authenticate', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email.value,
                password: password.value
            })
        }).then((response) => {
            if(!response.ok) {
                throw ("Houve um erro ao tentar realizar o login!")
            }

            response.json().then(data => {
                if(data.length === 0) {
                    signInForm.querySelector('.alerts').innerHTML = `
                        <p style='color: #E7584F'>
                            <span class="iconify" data-icon="tabler:alert-circle"></span>
                            Email e/ou senha incorretos
                        </p>
                    `;
                } else {
                    const user = data[0];

                    sessionStorage.USER_EMAIL = user.email;
                    sessionStorage.USER_NAME = `${user.name} ${user.surname}`;
                    sessionStorage.USER_ID = user.idUser;
                    
                    window.location = '../index.html';
                }
            })
        }).catch((error) => {
            console.log(error);
            throw ("Houve um erro ao tentar realizar o cadastro!")
        })
    }
}

function checkLoginInputs(email, password) {
    const alertsContainer = signInForm.querySelector('.alerts');

    var allInputsAreValid = true;

    if(!email.value || !password.value) {
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

    return allInputsAreValid;
}