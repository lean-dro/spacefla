
async function obterComentarios() {
    var busca = await fetch(`/comentarios/listar/${sessionStorage.ID_USUARIO_ESCOLHIDO}`)
    var json = await busca.json()
    listarComentarios(json)
}
function listarComentarios(comentarios) {
    var listaComentarios = document.getElementById("div_lista_comentarios")
    listaComentarios.innerHTML = ""
    
    for(var i = 0; i < comentarios.length; i++){
        var comentarioAtual = comentarios[i]

        listaComentarios.innerHTML += `
        <div class="comentario">
        <span class="usuario-comentario">@${comentarioAtual.nomeUsuario}</span>
        <span class="conteudo-comentario">${comentarioAtual.textoComentario}</span>
        </div>
        `
    }
}
async function comentar() {
    var texto = document.getElementById("comentario").value
    var textoValido = true

    if(texto.length == 0){
        alert("Insira um comentário antes de comentar!")
    }else{
        for(var i = 0; i<texto.length; i++){
            if(texto[i] == "" || texto[i] == " "){
                textoValido = false
            }else{
                textoValido = true
            }
        }
    
        if(!textoValido){
            alert("Insira um comentário antes de comentar!")
            comentario.value = ""
        }else{
           await fetch("/comentarios/comentar",{
                method:"post",
                headers:{
                    "Content-type": "application/json"
                },
                body:JSON.stringify({
                    fkUsuarioPerfilServer: sessionStorage.ID_USUARIO_ESCOLHIDO,
                    fkUsuarioComentarioServer: sessionStorage.ID_USUARIO,
                    comentarioServer: texto
                })
            }).then(function(resposta) {
                console.log(resposta)
                obterComentarios()
                comentario.value = ""
            })
            
        }
    }
}

