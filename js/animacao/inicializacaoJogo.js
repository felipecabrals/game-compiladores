var larguraDaGrid = 480;//400;
var alturaDaGrid = 480;//400;
var bordasInternasDaGrid = 0.5;
var quantidadeDeCelulasPorDirecao = 12;
var pontoInicialGrid = 20 - bordasInternasDaGrid * 2;
var tamanhoFonteCoordenadas = ((20-1) - bordasInternasDaGrid * 2)/2;
var tamanhoDaCelula = larguraDaGrid/quantidadeDeCelulasPorDirecao;
var canvas; //= document.getElementById("canvas");
var contexto; //= canvas.getContext("2d");
var guloso;
var alimentacao;
var campoMinado;
var explosao;
var fase;
var jogada;
var somAnimacao = new Audio();
/*somAnimacao.src = 'sons/animacao2.ogg';
somAnimacao.volume = 0.4;
somAnimacao.loop = true;
somAnimacao.autoplay = true;
somAnimacao.load();*/
function inicializarJogo(){
  canvas = document.getElementById("canvas");
  contexto = canvas.getContext("2d");
  var imgGuloso = new Image();
  imgGuloso.src = 'imagens/animacao/spritesheet_guloso.png';
  guloso = new Guloso(imgGuloso, pontoInicialGrid+4, pontoInicialGrid+4);
  alimentacao = new Alimentacao('imagens/animacao/comida_maca_1.png');
  campoMinado = new CampoMinado('imagens/animacao/bomba_mina_terrestre_2.png');
  fase = new Fase(1);
  fase.iniciarFase();
  jogada = new Jogada();
  atualizacaoAutomatica = true;
  iniciarAtualizacaoAutomatica();
  imgGuloso.onload = function(){
    pararAtualizacaoAutomatica();
  }


}
function desenharFundo(){
  contexto.clearRect(0, 0, canvas.width, canvas.height);
  contexto.fillStyle = "PaleGreen";
  contexto.fillRect(0, 0, canvas.width, canvas.height);
  contexto.strokeStyle = "#00FF00";
  contexto.fillStyle = "#009900";
  contexto.lineWidth = (bordasInternasDaGrid);
  //contexto.font = tamanhoFonteCoordenadas+"px";//"28px Georgia";
  for (var x = 0, i = 1; x <= larguraDaGrid; x += tamanhoDaCelula, i++) {

      contexto.moveTo(bordasInternasDaGrid + x + pontoInicialGrid, pontoInicialGrid);
      contexto.lineTo(bordasInternasDaGrid + x + pontoInicialGrid, alturaDaGrid + pontoInicialGrid);
      contexto.fillText(i, bordasInternasDaGrid + x + 20 + pontoInicialGrid, 12);
  }
  for (var x = 0, i= 1; x <= alturaDaGrid; x += tamanhoDaCelula, i++) {

      contexto.moveTo(pontoInicialGrid, bordasInternasDaGrid + x + pontoInicialGrid);
      contexto.lineTo(larguraDaGrid + pontoInicialGrid, bordasInternasDaGrid + x + pontoInicialGrid);
      contexto.fillText(i, 6, bordasInternasDaGrid + x + 20 + pontoInicialGrid);
  }
  contexto.stroke();
  contexto.fill();
}

function qualAPosicaoNaGrid(x, y){
  var posicao = {};
  posicao.x = ((x - pontoInicialGrid) / larguraDaGrid) * quantidadeDeCelulasPorDirecao;
  posicao.x = Math.ceil(posicao.x);
  posicao.y = ((y - pontoInicialGrid) / alturaDaGrid) * quantidadeDeCelulasPorDirecao;
  posicao.y = Math.ceil(posicao.y);
  return posicao;
}

function converterPosicaoNaGridEmPixels(x, y){
  var posicao = {};
  posicao.x = pontoInicialGrid + (x * (larguraDaGrid / quantidadeDeCelulasPorDirecao)) - (larguraDaGrid / quantidadeDeCelulasPorDirecao);
  posicao.y = pontoInicialGrid + (y * (alturaDaGrid / quantidadeDeCelulasPorDirecao)) - (alturaDaGrid / quantidadeDeCelulasPorDirecao);
  return posicao;
}
