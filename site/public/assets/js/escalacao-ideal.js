async function obterEscalacaoIdeal() {
    var query = await fetch(`/escalacoes/listarEscalacaoUsuario/${sessionStorage.ID_USUARIO_ESCOLHIDO}`)
    var json = await query.json()
    var formacao = json[0].formacao
    var nome = json[0].nomeUsuario
    var tatica = json[0].tatica
    var badgeTatica = `<span class="badge-tatica ${tatica}"></span>`
    span_info_usuario.innerHTML = `
    <img class="escudo-info-escalacao" src="../assets/icon/ESCUDO.svg" alt="">
    <p>${nome}</p>`

    span_info_escalacao.innerHTML=`
    <p>${formacao}</p>
    ${badgeTatica}
    `
    montarFormacao(formacao)
    distribuirJogadores(json)
}
function montarFormacao(formacao) {
    var escalacaoDiv = document.getElementById("div_escalacao_tela")
    escalacaoDiv.innerHTML = ""
    var formacaoFinal = defesaPadraoTela;

        if(formacao == "4-3-3"){
            formacaoEscolhida = formacao433Tela
        }else if(formacao == "4-4-2"){
            formacaoEscolhida = formacao442Tela
        }else{
            formacaoEscolhida = formacao451Tela
        }
        formacaoFinal+=formacaoEscolhida
        escalacaoDiv.innerHTML = formacaoFinal
}
function distribuirJogadores(escalacao){
    for (var i = 1; i<=11; i++) {
        var posicaoAtual = document.getElementById(`tela_posicao_escalacao${i}`)
        var jogadorAtual = escalacao[i-1]
        var fotoJogador =  buscarFotoJogador(jogadorAtual.fkJogador, 'rosto')
        posicaoAtual.style.backgroundImage = `url(${fotoJogador})`;
    }
}

var defesaPadraoTela = `
<div class="defesa tela">
    <div class="linha goleiro">
        <div id="tela_posicao_escalacao1" class="foto-escalacao tela"></div>
    </div>
    
    <div class="linha zaga-laterais">
        <div id="tela_posicao_escalacao2" class="foto-escalacao tela lateral"></div>
        <div id="tela_posicao_escalacao3" class="foto-escalacao tela zaga"></div>
        <div id="tela_posicao_escalacao4" class="foto-escalacao tela zaga"></div>
        <div id="tela_posicao_escalacao5" class="foto-escalacao tela lateral"></div>
    </div>
</div>
`;

var formacao442Tela = `
<div class="meio-campo tela ">
    <div class="linha volantes-meias-4-2-2">
        <div id="tela_posicao_escalacao6" class="foto-escalacao tela  meia-4-2-2"></div>
        <div id="tela_posicao_escalacao7" class="foto-escalacao tela  volante"></div>
        <div id="tela_posicao_escalacao8" class="foto-escalacao tela  volante"></div>
        <div id="tela_posicao_escalacao9" class="foto-escalacao tela  meia-4-2-2"></div>
    </div>
</div>

<div class="ataque tela">
    <div class="linha atacantes-4-2-2">
    <div id="tela_posicao_escalacao10" class="foto-escalacao tela "></div>
    <div id="tela_posicao_escalacao11" class="foto-escalacao tela "></div>
</div>
`

var formacao433Tela=`
<div class="meio-campo tela meio-4-3-3">
    <div class="linha volantes-meias-4-3-3">
        <div id="tela_posicao_escalacao6" class="foto-escalacao tela  meia-4-3-3"></div>
        <div id="tela_posicao_escalacao7" class="foto-escalacao tela  volante-4-3-3"></div>
        <div id="tela_posicao_escalacao8" class="foto-escalacao tela  meia-4-3-3"></div>
    </div>
</div>

<div class="ataque tela">
    <div class="linha atacantes-4-3-3">
    <div id="tela_posicao_escalacao9" class="foto-escalacao tela  ponta"></div>
    <div id="tela_posicao_escalacao10" class="foto-escalacao tela  centroavante"></div>
    <div id="tela_posicao_escalacao11" class="foto-escalacao tela  ponta"></div>
</div>
`

var formacao451Tela=`
<div class="meio-campo tela meio-4-5-1">
    <div class="linha volantes-meias-4-5-1">
        <div id="tela_posicao_escalacao6" class="foto-escalacao tela  meia-4-5-1"></div>
        <div id="tela_posicao_escalacao7" class="foto-escalacao tela  volante-4-5-1"></div>
        <div id="tela_posicao_escalacao8" class="foto-escalacao tela  meia-atacante-4-5-1"></div>
        <div id="tela_posicao_escalacao9" class="foto-escalacao tela  volante-4-5-1"></div>
        <div id="tela_posicao_escalacao10" class="foto-escalacao tela  meia-4-5-1"></div>
    </div>
</div>
<div class="ataque tela">
    <div class="linha atacantes-4-5-1">
    <div id="tela_posicao_escalacao11" class="foto-escalacao tela  centroavante-4-5-1"></div>
    </div>
</div>
`

setInterval(()=>{
    obterEscalacaoIdeal()
},500)
