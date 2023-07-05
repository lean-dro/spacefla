usuario_perfil.innerHTML = sessionStorage.NOME_USUARIO;
var cornetas = [];

var cornetasCurtidas = [];
var cornetaTop = {};
var contadorCurtidos;

var tempoReal = setInterval(async () => {
  obterCornetasCurtidas();
  buscarTopJogadores();
  buscarTopCorneta();
  gerarTopCorneta();
}, 8000);



async function buscarTopCorneta() {
  try {
    var busca = await fetch ("/cornetas/listar-top");
    var jsonTopCorneta = await busca.json();
    cornetaTop = jsonTopCorneta[0];
    gerarTopCorneta();
  } catch (error) {
    top_corneta_corpo.innerHTML =
    "Sem cornetas mais curtidas por enquanto...";
  }
}

function gerarTopCorneta() {
  var classeTipo;
  var classeCurtida = "curtir";
  if (cornetaTop.tipoCorneta == "Jogando bem") {
    classeTipo = "Positiva";
  } else {
    classeTipo = "Negativa";
  }
  for (
    contadorCurtidos = 0;
    contadorCurtidos < cornetasCurtidas.length;
    contadorCurtidos++
  ) {
    if (cornetasCurtidas[contadorCurtidos].fkCorneta == cornetaTop.idCorneta) {
      classeCurtida = "curtido";
      contadorCurtidos = cornetasCurtidas.length - 1;
    } else {
      classeCurtida = "curtir";
    }
  }
  if (cornetaTop.curtidas > 0) {
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
              <div style='background-image: url(../../assets/img/jogadores/${cornetaTop.fotoJogador})' class="fotoJogador"></div>
            </div>
          </div>

`;
  } else {
    top_corneta_corpo.innerHTML = ``;
  }
}


async function buscarTopJogadores() {
  
  var busca = await fetch("/jogadores/listar-top");
  var jsonTopJogadores = await busca.json();
  lista.innerHTML = "";
  for (
    var contadorTopJogadores = 0;
    contadorTopJogadores < jsonTopJogadores.length;
    contadorTopJogadores++
  ) {
    lista.innerHTML += `
      <div class="item-lista">${jsonTopJogadores[contadorTopJogadores]}</div>
    `;
  }
}

async function curtir(x, corneta) {
  if (x.classList.contains("curtido")) {
    x.classList.remove("curtido");
    x.classList.add("curtir");
  } else {
    x.classList.remove("curtir");
    x.classList.add("curtido");
  }
  x.classList.toggle("curtido");

  var busca = await fetch(`/curtidas/verificar/${sessionStorage.ID_USUARIO}/${corneta}`);
  if(busca.ok){
    obterCornetasCurtidas();
    obterCornetas();
    buscarTopCorneta();
    gerarTopCorneta();
  }

}

async function obterCornetasCurtidas() {
  var busca = await fetch(`/cornetas/listarCurtidos/${sessionStorage.ID_USUARIO}`)
  var jsonCornetasCurtidas = await busca.json();
  cornetasCurtidas = jsonCornetasCurtidas;
}

async function obterCornetas() {
  var busca = await fetch("/cornetas/listar");
  var jsonCornetas = await busca.json();
  if(jsonCornetas.length == 0){
    feed.innerHTML = "Sem cornetas por enquanto...";
  }else{
    cornetas = jsonCornetas;
    await gerarCornetas();
  }
}

async function gerarCornetas() {
  feed.innerHTML = "";
  for (var contador = 0; contador < cornetas.length; contador++) {
    var corneta = cornetas[contador].idCorneta;
    var comentario = cornetas[contador].comentarioCorneta;
    var idJogador = cornetas[contador].fkJogador;
    var usuario = cornetas[contador].nomeUsuario;
    var fkUsuario = cornetas[contador].fkUsuario;
    var competicao = cornetas[contador].competicao
      .replace(" ", "")
      .replace(" ", "");
    var tipo = cornetas[contador].tipoCorneta;
    var classeTipo;
    var curtidas = cornetas[contador].curtidas;
    var classeCurtida = "curtir";
    if (tipo == "Jogando bem") {
      classeTipo = "Positiva";
    } else {
      classeTipo = "Negativa";
    }
    for (
      contadorCurtidos = 0;
      contadorCurtidos < cornetasCurtidas.length;
      contadorCurtidos++
    ) {
      if (cornetasCurtidas[contadorCurtidos].fkCorneta == corneta) {
        classeCurtida = "curtido";
        contadorCurtidos = cornetasCurtidas.length - 1;
      } else {
        classeCurtida = "curtir";
      }
    }

    var fotoJogador = "../../assets/img/jogadores/"+cornetas[contador].fotoJogador;
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
                        <div style="background-image: url('${fotoJogador}')" class="fotoJogador"></div>
                      </div>
                  `;
  }
}
function escolherUsuarioFormacao(id) {
  sessionStorage.ID_USUARIO_ESCOLHIDO = id;
  window.location.href = "escalacao-ideal.html";
}
