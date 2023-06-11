usuario_perfil.innerHTML = sessionStorage.NOME_USUARIO
var cornetas = [];

var cornetasCurtidas = []
var cornetaTop = {}
var contadorCurtidos;


var atualizar = setInterval(()=>{
          obterCornetasCurtidas()
          obterCornetas()
          gerarCornetas()
          buscarTopJogadores()
          buscarTopCorneta()
          gerarTopCorneta()
}, 60000)
async function buscarTopCorneta() {
await fetch("/cornetas/listar-top",{
  method: "get",
  headers:{
    "Content-type": "application/json"
  }
}).then(function(resposta) {
  if(resposta.ok){
    resposta.json().then((json)=>{
      cornetaTop = json[0]
      gerarTopCorneta()
    })
  }else{
    top_corneta_corpo.innerHTML = "Sem cornetas mais curtidas por enquanto..."
  }
})
}
function gerarTopCorneta() {
var classeTipo;
var classeCurtida = "curtir";
            if (cornetaTop.tipoCorneta == "Jogando bem") {
              classeTipo = "Positiva";
            } else {
              classeTipo = "Negativa";
            }
            for(contadorCurtidos = 0; contadorCurtidos < cornetasCurtidas.length; contadorCurtidos++){
              if(cornetasCurtidas[contadorCurtidos].fkCorneta == cornetaTop.idCorneta){
                classeCurtida = "curtido"
                contadorCurtidos = cornetasCurtidas.length-1
              }else{
                classeCurtida = "curtir"
              }
            }
if(cornetaTop.curtidas > 0){
top_corneta_corpo.innerHTML = `
<div class="usuario-analise-top">
            <div class="usuario-top">@${cornetaTop.nomeUsuario}</div>
            <div class="analise-top">
              ${cornetaTop.comentarioCorneta}  
            </div>
          </div>
          <div class="info-foto-corneta-top">
            <div class="info-corneta-top">
              <img class='icon-competicao' src="../assets/img/competicao/${cornetaTop.competicao}.png" alt="">
              <p class="tipo-corneta ${classeTipo}">${cornetaTop.tipoCorneta}</p>

              <div class="curtir-top">
                <div class="botao-efeito">
                  <div onclick="curtir(this, ${cornetaTop.idCorneta})" id="botao${cornetaTop.idCorneta}" class="botao ${classeCurtida}"></div>
                </div>
                <span id='span_curtidas'>${cornetaTop.curtidas}</span>
              </div>
            </div>
            <div class="foto-corneta-top">
              <div class="fotoJogador j${cornetaTop.fkJogador}"></div>
            </div>
          </div>

`
}else{
top_corneta_corpo.innerHTML = ``
}

}
function buscarTopJogadores() {
lista.innerHTML=""
  fetch("/jogadores/listar-top",{
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  }).then(function(resposta) {
    resposta.json().then(function(json) {
      for (var contadorTopJogadores = 0;contadorTopJogadores < json.length;contadorTopJogadores++) {
        lista.innerHTML += `
          <div class="item-lista">${json[contadorTopJogadores]}</div>
        `
      }
    })
  })
}

async function curtir(x, corneta) {
  
    
  
  if(x.classList.contains("curtido")){
    x.classList.remove("curtido")
    x.classList.add("curtir")
  }else{
    x.classList.remove("curtir")
    x.classList.add("curtido")
  }
  x.classList.toggle("curtido")
  
  console.log(x)
  fetch("/curtidas/verificar",{
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      cornetaServer: corneta,
      usuarioServer: sessionStorage.ID_USUARIO
    })
  }).then(function(resposta) {
      if(resposta.ok){
        resposta.json().then(function(curtidas) {
         
          console.log(curtidas)
          obterCornetasCurtidas()
          obterCornetas()
          gerarCornetas()
          buscarTopCorneta()
          gerarTopCorneta()
        })
      }else{
        console.log("erro")
      }
  })
  
}



async function obterCornetasCurtidas() {
  await fetch("/cornetas/listarCurtidos", {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      usuarioServer: sessionStorage.ID_USUARIO 
    })
  }).then(function(resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        cornetasCurtidas = json
      }).catch(function(erro) {
        console.log(erro)
      });
    }
  })
}
async function obterCornetas() {
  await fetch("/cornetas/listar", {
    method: "get",
    headers: {
      "Content-type": "application/json",
    },
  }).then(function (resposta) {
    if (resposta.ok) {
      resposta.json().then((json) => {
        if (json.length == 0) {
          feed.innerHTML = "Sem cornetas por enquanto...";
        } else {
          cornetas = json
          gerarCornetas()
        }
      }).catch(function(erro) {
        console.log(erro)
      });
    } else {
      feed.innerHTML = "Sem cornetas por enquanto...";
    }
  }).catch(function(erro){
    console.log(erro)
  });
}



function gerarCornetas() {
  
  feed.innerHTML ="";
  for (var contador = 0; contador < cornetas.length; contador++) {
            
            var corneta = cornetas[contador].idCorneta;
            var comentario = cornetas[contador].comentarioCorneta;
            var idJogador = cornetas[contador].fkJogador;
            var usuario = cornetas[contador].nomeUsuario;
            var fkUsuario = cornetas[contador].fkUsuario;
            var competicao = (cornetas[contador].competicao).replace(" ", "").replace(" ", "");
            var tipo = cornetas[contador].tipoCorneta;
            var classeTipo;
            var curtidas = cornetas[contador].curtidas 
            var classeCurtida = "curtir";
            if (tipo == "Jogando bem") {
              classeTipo = "Positiva";
            } else {
              classeTipo = "Negativa";
            }
            for(contadorCurtidos = 0; contadorCurtidos < cornetasCurtidas.length; contadorCurtidos++){
              if(cornetasCurtidas[contadorCurtidos].fkCorneta == corneta){
                classeCurtida = "curtido"
                contadorCurtidos = cornetasCurtidas.length-1
              }else{
                classeCurtida = "curtir"
              }
            }
           
            feed.innerHTML += `
          
                  <div class="corneta">
                        <div class="escopoCorneta">
                          <div class="conteudoCorneta">
                            <div class='infosCorneta'>
                              <p onclick="escolherUsuarioFormacao(${fkUsuario})" class="usuario">@${usuario} </p>
                              <img class='icon-competicao' src="../assets/img/competicao/${competicao}.png" alt="">
                              <p class='tipo-corneta ${classeTipo}'>${tipo}</p>

                              </div>
                            <p class="comentario">${comentario}</p>
                          </div>
                          
                          <div class="cornetaCurtir">
                            <div class="botao-efeito">
                            <div onclick="curtir(this, ${corneta})" id="botao${corneta}" class="botao ${classeCurtida}"></div>
                            </div>
                            <span id='span_curtidas${corneta}'>${curtidas}</span>
                          </div>

                        </div>
                        <div class="fotoJogador j${idJogador}"></div>
                      </div>
                  `;             

          }

}
function escolherUsuarioFormacao(id) {
  sessionStorage.ID_USUARIO_ESCOLHIDO = id
  window.location.href = "escalacao-ideal.html"
}


