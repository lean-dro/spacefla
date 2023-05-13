function validarSessao() {
   
    var email = sessionStorage.EMAIL_USUARIO;
    var nome = sessionStorage.NOME_USUARIO;

   

    if (email != null && nome != null) {
       
    } else {
        window.location = "../login.html";
    }
}

function sair() {
    sessionStorage.clear();
    window.location = "../login.html";
}