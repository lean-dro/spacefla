obterFotosJogadores();
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
var jsonFotos = []
async function obterFotosJogadores() {
    var buscaFoto = await fetch(`/jogadores/fotos`);
    jsonFotos = await buscaFoto.json();
}

function buscarFotoJogador(id, tipo) {
    for(var i = 0; i<jsonFotos.length; i++){
        var fotoAtual = jsonFotos[i];
        if(fotoAtual.idJogador == id){
            if(tipo=="corpo"){
                return "../../assets/img/jogadores/"+fotoAtual.fotoJogador;
            }else{
                var foto = fotoAtual.fotoJogador.replace("png", "svg")
                return "../../assets/img/jogadores/rostos/"+foto;
            }
            
        }
    }
}
