
var contagemPosicao = 1
var defesaPadrao = `
<div class="defesa">
    <div class="linha goleiro">
        <div id="posicao_escalacao1" class="foto-escalacao"></div>
    </div>
    
    <div class="linha zaga-laterais">
        <div id="posicao_escalacao2" class="foto-escalacao lateral"></div>
        <div id="posicao_escalacao3" class="foto-escalacao zaga"></div>
        <div id="posicao_escalacao4" class="foto-escalacao zaga"></div>
        <div id="posicao_escalacao5" class="foto-escalacao lateral"></div>
    </div>
</div>
`;

var formacao442 = `
<div class="meio-campo">
    <div class="linha volantes-meias-4-2-2">
        <div id="posicao_escalacao6" class="foto-escalacao  meia-4-2-2"></div>
        <div id="posicao_escalacao7" class="foto-escalacao  volante"></div>
        <div id="posicao_escalacao8" class="foto-escalacao  volante"></div>
        <div id="posicao_escalacao9" class="foto-escalacao  meia-4-2-2"></div>
    </div>
</div>

<div class="ataque">
    <div class="linha atacantes-4-2-2">
    <div id="posicao_escalacao10" class="foto-escalacao "></div>
    <div id="posicao_escalacao11" class="foto-escalacao "></div>
</div>
`

var formacao433=`
<div class="meio-campo meio-4-3-3">
    <div class="linha volantes-meias-4-3-3">
        <div id="posicao_escalacao6" class="foto-escalacao  meia-4-3-3"></div>
        <div id="posicao_escalacao7" class="foto-escalacao  volante-4-3-3"></div>
        <div id="posicao_escalacao8" class="foto-escalacao  meia-4-3-3"></div>
    </div>
</div>

<div class="ataque">
    <div class="linha atacantes-4-3-3">
    <div id="posicao_escalacao9" class="foto-escalacao  ponta"></div>
    <div id="posicao_escalacao10" class="foto-escalacao  centroavante"></div>
    <div id="posicao_escalacao11" class="foto-escalacao  ponta"></div>
</div>
`

var formacao451=`
<div class="meio-campo meio-4-5-1">
    <div class="linha volantes-meias-4-5-1">
        <div id="posicao_escalacao6" class="foto-escalacao  meia-4-5-1"></div>
        <div id="posicao_escalacao7" class="foto-escalacao  volante-4-5-1"></div>
        <div id="posicao_escalacao8" class="foto-escalacao  meia-atacante-4-5-1"></div>
        <div id="posicao_escalacao9" class="foto-escalacao  volante-4-5-1"></div>
        <div id="posicao_escalacao10" class="foto-escalacao  meia-4-5-1"></div>
    </div>
</div>
<div class="ataque">
    <div class="linha atacantes-4-5-1">
    <div id="posicao_escalacao11" class="foto-escalacao  centroavante-4-5-1"></div>
    </div>
</div>
`
var ultimaPosicao;
function definirFormacao(escalacao) {
    var escalacaoDiv = document.getElementById("div_escalacao")
    escalacaoDiv.innerHTML = ""
    escalacao = Number(escalacao)
    var formacao = defesaPadrao;
    var formacaoEscolhida;
    if (escalacao > 0) {
        if(escalacao == 1){
            formacaoEscolhida = formacao433
        }else if(escalacao == 2){
            formacaoEscolhida = formacao442
        }else{
            formacaoEscolhida = formacao451
        }
        formacao+=formacaoEscolhida
        escalacaoDiv.innerHTML = formacao
        var posicaoInicial = document.getElementById(`posicao_escalacao1`)
        posicaoInicial.classList.add("escolhido")
        ultimaPosicao = posicaoInicial
        contagemPosicao = 1
        jogadoresEscalados = []
    }
}

async function buscarJogadoresEscalacao() {
    var busca = await  fetch('/jogadores/listar')
    var json = await busca.json()
    listarJogadoresEscalacao(json)
}

function listarJogadoresEscalacao(jogadores) {
    var lista = document.getElementById("div_lista")
    lista.innerHTML = ""
    for(var i = 0; i<jogadores.length; i++){
        var jogadorAtual = jogadores[i]
        var badge = buscarBadge(jogadorAtual.posicaoJogador)

        lista.innerHTML+=`
        <div onclick="escolherJogador(${jogadorAtual.idJogador})" class="item-lista-escalacao">
            <span class="nome-escalacao">${jogadorAtual.nomeJogador}</span>
            <span class="badge ${badge}"></span>
        </div>
        `
    }
}
function buscarBadge(posicao) {
    var badge;
    if(posicao=="Goleiro"){
        badge = "gol"
    }else if(posicao=="Zagueiro"){
        badge = "zag"
    }else if(posicao=="Lateral Direito"){
        badge = "ld"
    }else if(posicao=="Lateral Esquerdo"){
        badge = "le"
    }else if(posicao=="Volante"){
        badge = "vol"
    }else if(posicao=="Meia"){
        badge = "mei"
    }else{
        badge = "ata"
    }
    return badge
}

var contagemPosicao = 1
var jogadoresEscalados = []
function escolherJogador(id) {
    if(verificarJogadorEscalacao(id)){
        alert("Jogador já escalado!")
    }else{
        var formacao = Number(document.getElementById("slFormacao").value) 
        if(formacao > 0){
            ultimaPosicao.classList.remove("escolhido")
            var posicao = document.getElementById(`posicao_escalacao${contagemPosicao}`)
            ultimaPosicao = posicao
            ultimaPosicao.classList.remove("escolhido")
            var fotoJogador =  buscarFotoJogador(id, 'rosto')
            posicao.style.backgroundImage = `url(${fotoJogador})`;
            jogadoresEscalados.push(id)
            if(contagemPosicao < 11){
                contagemPosicao++
                posicao = document.getElementById(`posicao_escalacao${contagemPosicao}`)
                posicao.classList.add("escolhido")
                ultimaPosicao = posicao
            }
        }else{
            alert("Escolha uma formação primeiro!")
        }    
    }
}

function verificarJogadorEscalacao(id) {
    var jogadorEscalado = false
    for(var i = 0; i<jogadoresEscalados.length; i++){
        if(jogadoresEscalados[i] == id){
            jogadorEscalado = true
        }
    }
    return jogadorEscalado
}

var escalacoes = ["4-3-3","4-4-2","4-5-1"]
var taticas = ["Ofensivo","Neutro","Defensivo"]

async function validarEscalacao() {
    var valido = true
    var tatica = Number(document.getElementById("slEstilo").value)
    var formacao = Number(document.getElementById("slFormacao").value) 
    
    if(jogadoresEscalados.length < 11){
        valido = false
        alert("Selecione 11 jogadores!")
    }  
    if(tatica < 1){
        valido = false
        alert("Tática inválida!")
    }
    if(formacao < 1){
        valido = false
        alert("Formação inválida!")
    }
    if(jogadoresEscalados.length > 11){
        valido = false
        alert("Selecione 11 jogadores!")
        toggleModalEscalacao()
    }  
    if(valido){
        var escalacao = escalacoes[formacao-1]
        var tatica = taticas[tatica-1]
        await cadastrar(escalacao, tatica)
        toggleModalEscalacao()
    }
    return valido
}

async function cadastrar(formacao, tatica) {
        await fetch("/escalacoes/cadastrar", {
            method: "post",
            headers:{
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                fkUsuarioServer: sessionStorage.ID_USUARIO,
                jogadoresServer: jogadoresEscalados,
                taticaServer: tatica,
                formacaoServer: formacao
            })
        })
}
function toggleModalEscalacao() {
    var escalacaoDiv = document.getElementById("div_escalacao")

    fundo_modal_escalacao.classList.toggle("show-escalacao")
    contagemPosicao = 1
    jogadoresEscalados = []

    escalacaoDiv.innerHTML = ""
    slEstilo.value = "0"
    slFormacao.value = "0"
}

