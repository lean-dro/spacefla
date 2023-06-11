var ultimoJogador = ""
var foto = document.getElementById("foto_modal").classList;
function buscarJogadores() {
    select_jogador.innerHTML = ' <option value="0">Escolha um Jogador</option>';
    fetch("/jogadores/listar", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    }).then(function (resposta) {
      if (resposta.ok) {
        resposta.json().then((json) =>{
          for (var contadorJogadores = 0; contadorJogadores < json.length; contadorJogadores++) {
            select_jogador.innerHTML += `<option value='${json[contadorJogadores].idJogador}'>${json[contadorJogadores].nomeJogador}</option>`
          }
        })
      }
    });
  }
  function validarCadastro() {
    var atuacao = select_atuacao.value;
    var competicao = select_competicao.value;
    var jogador =  select_jogador.value;
    var analise = textarea_analise.value;
  
    var entradasInvalidas = 
    (atuacao == 0) ||
    (competicao == 0) ||
    (jogador == 0) ||
    (analise.length == 0)
    
    if(entradasInvalidas){
      if(atuacao == 0){
        span_aviso.innerHTML = "Selecione a atuação!"
      }else if(competicao == 0){
        span_aviso.innerHTML = "Selecione a competição!"
      }else if(jogador == 0){
        span_aviso.innerHTML = "Selecione um jogador!"
      }else{
        span_aviso.innerHTML = "Faça uma análise!"
      }
    }else{
      cadastrarCorneta(atuacao, competicao, jogador, analise)
    }
  
  }
  function cadastrarCorneta(tipo, competicao, jogador, analise) {
    fetch('/cornetas/cadastrar',{
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        tipoServer: tipo,
        competicaoServer: competicao,
        jogadorServer: jogador,
        comentarioServer: analise,
        usuarioServer: sessionStorage.ID_USUARIO
      }),
    }).then(function(resposta) {
      if(resposta.ok){
        setTimeout(() => {
          window.location.href = "home.html"
        }, 500);
      }else{
        alert("ero")
      }
    })
  }
  function toggleModal() {
    fundo_modal.classList.toggle("show");
    select_atuacao.value = 0;
    select_competicao.value = 0;
    select_jogador.value = 0;
    textarea_analise.value = "";
    if(ultimoJogador != ""){
      foto.remove(ultimoJogador)
    }
   
    buscarJogadores();
  }
  function atualizarJogador() {
   
    var idJogador = select_jogador.value;
    var classe
    if(ultimoJogador == ""){
       classe = "j"+idJogador;
       foto.add(classe)
       ultimoJogador = classe;
    }else{
      foto.remove(ultimoJogador);
      classe = "j"+idJogador;
      foto.add(classe)
      ultimoJogador = classe;
    }
   
    
 }