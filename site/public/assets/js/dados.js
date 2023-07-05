const ctx = document.getElementById('myChart');
 
       
var maior = 0
var menor = 0

var dados = { 
    labels: [],
    datasets: [{
      label: 'Cornetas por posição',
      data: [],
      borderWidth: 3,
      color: 'white',
      borderRadius: 8,
      backgroundColor: 'rgb(245, 89, 89, 0.5)'
    }]
}
var grafico = new Chart(ctx, {
  type: 'bar',
  data:dados,
  options: {
    plugins:{
        legend:{
          labels:{
            font:{
              size: 16
            }
          }
        }
      },
    scales: {
      y: {
        ticks:{
          stepSize: 1
        },
        beginAtZero: true,
        suggestedMin: menor,
        suggestedMax: maior
      }
    }
  }
});

var atualizar = setInterval(() => {
  buscarPorcentagens()
  buscarQtdPosicao()
}, (6000));

async function buscarPorcentagens() {
  var busca = await fetch("/cornetas/listarPorcentagens")
  var jsonPorcentagens = await busca.json();
  
  fotoPositiva.innerHTML =  `<div style="background-image:url('${buscarFotoJogador(jsonPorcentagens.porcentagemBem[0][0].fkJogador, 'corpo')}')" class="fotoJogadorKpi"></div>`
  porcentagemPositiva.innerHTML = `${jsonPorcentagens.porcentagemBem[0][0].porcentagemBem}%`
  fotoNegativa.innerHTML = `<div style="background-image:url('${buscarFotoJogador(jsonPorcentagens.porcentagemMal[0][0].fkJogador, 'corpo')}')" class="fotoJogadorKpi"></div>`
  porcentagemNegativa.innerHTML = `${jsonPorcentagens.porcentagemMal[0][0].porcentagemMal}%`
}

async function buscarQtdPosicao() {
  dados.labels = []
  dados.datasets[0].data = []

    var busca = await fetch("/cornetas/listarQtdPosicao")
    var jsonQtdPosicao = await busca.json()
    jsonQtdPosicao.forEach(chave => {
        dados.labels.push(chave.posicao)
        dados.datasets[0].data.push(chave.contagem)
       });
       grafico.update()
}

function maiorMenorValor() {
   maior = dados.datasets[0].data[0]
   menor = dados.datasets[0].data[0]
  for (var i = 0; i < dados.datasets[0].data.length; i++) {
    if(maior < dados.datasets[0].data[i]){
      maior = dados.datasets[0].data[i]
    }
    if(menor > dados.datasets[0].data[i]){
      menor = dados.datasets[0].data[i]
    }
    
  }
}


obterMaiorCompeticao()
async function obterMaiorCompeticao() {

    var busca = await fetch("/cornetas/maiorCompeticao")
    var jsonMaiorCompeticao = await busca.json();
    var nomeCompeticao = (jsonMaiorCompeticao[0].competicao).replace(" ", "").replace(" ", "")
        nomeCompeticao.replace(" ", "")
        competicao.innerHTML = `
              <div class="foto-competicao ${nomeCompeticao}"></div>
              <span class="texto-competicao">Competição com mais cornetas</span>
    `
}
