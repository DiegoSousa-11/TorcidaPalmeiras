const homeHeader = document.getElementsByTagName('header');
const loginButton = document.getElementById('loginButton');

function verifySession() {
    var name = sessionStorage.USER_NAME;
    var userID = sessionStorage.USER_ID;
    var userProfileImage = sessionStorage.USER_PROFILE_IMAGE;

    if(!name || !userID) {
        homeHeader[0].innerHTML += '<a href="../LoginAndRegister"><button>Login</button></a>';
    } else {
        homeHeader[0].innerHTML += `
            <div class='profile'>
                <img src="../uploads/${userProfileImage}" alt='imagem de perfil'>
                <p>Olá, <strong>${name}</strong></p>
                <button onclick='logout()'><span style='font-size: 1.4rem' class="iconify" data-icon="humbleicons:logout"></span></button>
            </div>`;
    }
}

function logout () {
    sessionStorage.clear();
    window.location.reload();
}
