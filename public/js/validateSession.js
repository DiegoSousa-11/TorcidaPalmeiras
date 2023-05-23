const homeHeader = document.getElementsByTagName('header');
const loginButton = document.getElementById('loginButton');

function verifySession() {
    var name = sessionStorage.USER_NAME;
    var userID = sessionStorage.USER_ID;

    if(!name || !userID) {
        homeHeader[0].innerHTML += '<a href="../LoginAndRegister"><button>Login</button></a>';
    } else {
        homeHeader[0].innerHTML += `<p>Olá, <strong>${name}</strong></p>`;
    }
}
