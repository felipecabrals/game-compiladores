//var pontos = 0;
//var vidas = 3;
function Fase(nivel){
  this.nivel = nivel;
  this.pontos = 0;
  this.vidas = 3;
  this.pontosPorFase = [0, 0, 0, 0 , 0, 0, 0, 0, 0 , 0, 0];
  this.totalDeNiveis = 10;
  this.menorNumeroDePassosPorFase = [0, 7, 6, 5, 7, 14, 13, 22, 27, 31, 32];
}
Fase.prototype = {
  adicionarPontos: function(pontos){
    this.pontos += pontos;
    $('#pontos').html('Pontos: '+this.pontos);
  },
  perderVidas: function(vida){
    this.vidas -= vida;
    var conteudo = "Vidas: ";
    for(var i = 0; i < this.vidas; i++){
        conteudo +="<img src='imagens/vida_18px.png'>"
    }
    $('#vidas').html(conteudo);
  },
  alterarFase: function(fase){
    this.nivel = fase;
    $('#painel-fases').html("Fase "+fase+"/"+this.totalDeNiveis);
  },
  preencherBordasDaGridComMinas: function(){
    for(var c = 1; c <= quantidadeDeCelulasPorDirecao; c++){
      campoMinado.adicionarMina(1, c);
    }
    for(var l = 1; l <= quantidadeDeCelulasPorDirecao; l++){
      campoMinado.adicionarMina(l, 1);
    }
    for(var c = quantidadeDeCelulasPorDirecao; c >= 1; c--){
      campoMinado.adicionarMina(quantidadeDeCelulasPorDirecao, c);
    }
    for(var l = quantidadeDeCelulasPorDirecao; l >= 1; l--){
      campoMinado.adicionarMina(l, quantidadeDeCelulasPorDirecao);
    }
  },
  desabilitarSetas: function(esquerda, direita, cima, baixo){
    var classeSetaDesabilitada = {true: "desabilitada", false: ""};
    $("#setaParaEsquerda").draggable({ disabled: esquerda });
    $("#setaParaDireita").draggable({ disabled: direita });
    $("#setaParaCima").draggable({ disabled: cima });
    $("#setaParaBaixo").draggable({ disabled: baixo});
    $( "#setaParaEsquerda" ).removeClass("desabilitada").addClass(classeSetaDesabilitada[esquerda]);
    $( "#setaParaDireita" ).removeClass("desabilitada").addClass(classeSetaDesabilitada[direita]);
    $( "#setaParaCima" ).removeClass("desabilitada").addClass(classeSetaDesabilitada[cima]);
    $( "#setaParaBaixo" ).removeClass("desabilitada").addClass(classeSetaDesabilitada[baixo]);
    $("#setaParaEsquerda input").prop('disabled', esquerda);
    $("#setaParaDireita input").prop('disabled', direita);
    $("#setaParaCima input").prop('disabled', cima);
    $("#setaParaBaixo input").prop('disabled', baixo);
  },
  refazerFase: function(){
    atualizacaoAutomatica = true;
    iniciarAtualizacaoAutomatica();
    this.resetarConfiguracoesTelaAplicacao();
    this.pontos = this.pontosPorFase[this.nivel -1];
    this.vidas = 3;
    this.iniciarFase();
    setTimeout(pararAtualizacaoAutomatica, 5000);
  },
  voltarFase: function(fase){
    atualizacaoAutomatica = true;
    iniciarAtualizacaoAutomatica();
    this.resetarConfiguracoesTelaAplicacao();
    this.nivel = fase;
    this.pontos = this.pontosPorFase[this.nivel -1];
    this.vidas = 3;
    this.iniciarFase();
    setTimeout(pararAtualizacaoAutomatica, 5000);
  },
  avancarFase: function(fase){
    this.pontosPorFase[this.nivel] = this.pontos;
    atualizacaoAutomatica = true;
    iniciarAtualizacaoAutomatica();
    this.resetarConfiguracoesTelaAplicacao();
    this.nivel = fase;
    this.vidas = 3;
    this.iniciarFase();
    setTimeout(pararAtualizacaoAutomatica, 5000);
  },
  naoCompletouFase: function(){
    var conteudo = "";
    if(this.nivel > 1){
      conteudo += '<button class="botoes" onclick="fase.voltarFase('+(this.nivel - 1)+')" id="voltar" name="voltar">Voltar</button>';
    }
    conteudo += '<button  class="botoes" onclick="fase.refazerFase()" id="repetir" name="repetir">Repetir</button>';
    $("#opcoesJogo").html(conteudo);
  },
  completouFase: function(){
    var conteudo = "";
    if(this.nivel > 1){
      conteudo += '<button class="botoes" onclick="fase.voltarFase('+(this.nivel - 1)+')" id="voltar" name="voltar">Voltar</button>';
    }
    conteudo += '<button  class="botoes" onclick="fase.refazerFase()" id="repetir" name="repetir">Repetir</button>';
    if(this.nivel < 10){
      conteudo += '<button class="botoes" onclick="fase.avancarFase('+(this.nivel + 1)+')" id="avancar" name="avancar">Avancar</button>';
    }
    $("#opcoesJogo").html(conteudo);
    //console.log("executou");
  },
  resetarConfiguracoesTelaAplicacao: function(){
    desbilitarPanelInstrucoes(false);
    $("#instrucoes").html("");
    $("#botaoExecutar").prop("disabled",false);
    $("#opcoesJogo").html("");
  },
  iniciarFase: function(){
    this.alterarFase(this.nivel);
    this.adicionarPontos(0);
    this.perderVidas(0);
    alimentacao.comidas = [];
    campoMinado.minas = [];
    switch(this.nivel){
      case 1:
        this.desabilitarSetas(true, false, true, true);
        this.preencherBordasDaGridComMinas();
        guloso.posicionarNaGrid(2, 2);
        guloso.parar();
        alimentacao.adicionarComida(5, 2);
        alimentacao.adicionarComida(9, 2);
        break;
      case 2:
        this.desabilitarSetas(true, true, true, false);
        this.preencherBordasDaGridComMinas();
        guloso.posicionarNaGrid(2, 2);
        guloso.parar();
        alimentacao.adicionarComida(2, 4);
        alimentacao.adicionarComida(2, 8);
        break;
      case 3:
        this.desabilitarSetas(false, true, true, true);
        this.preencherBordasDaGridComMinas();
        guloso.posicionarNaGrid(9, 11);
        guloso.parar();
        alimentacao.adicionarComida(4, 11);
        alimentacao.adicionarComida(5, 11);
        alimentacao.adicionarComida(7, 11);
        break;
      case 4:
        this.desabilitarSetas(true, true, false, true);
        this.preencherBordasDaGridComMinas();
        guloso.posicionarNaGrid(7, 9);
        guloso.parar();
        alimentacao.adicionarComida(7, 2);
        alimentacao.adicionarComida(7, 5);
        alimentacao.adicionarComida(7, 6);
        alimentacao.adicionarComida(7, 8);
        break;
      case 5:
          this.desabilitarSetas(true, false, true, false);
          this.preencherBordasDaGridComMinas();
          guloso.posicionarNaGrid(3, 5);
          guloso.parar();
          campoMinado.adicionarMina(6, 6);
          campoMinado.adicionarMina(8, 5);
          campoMinado.adicionarMina(8, 8);
          campoMinado.adicionarMina(9, 9);
          campoMinado.adicionarMina(10, 7);
          campoMinado.adicionarMina(10, 11);
          alimentacao.adicionarComida(6, 5);
          alimentacao.adicionarComida(10, 8);
          //alimentacao.adicionarComida(10, 9);
          alimentacao.adicionarComida(11, 11);
          break;
      case 6:
          this.desabilitarSetas( false, true, false, true);
          this.preencherBordasDaGridComMinas();
          guloso.posicionarNaGrid(9, 10);
          guloso.parar();
          campoMinado.adicionarMina(4, 4);
          campoMinado.adicionarMina(6, 6);
          campoMinado.adicionarMina(7, 9);
          campoMinado.adicionarMina(8, 10);
          campoMinado.adicionarMina(9, 8);
          alimentacao.adicionarComida(3, 3);
          alimentacao.adicionarComida(5, 4);
          alimentacao.adicionarComida(5, 6);
          alimentacao.adicionarComida(6, 8);
          break;
      case 7:
          this.desabilitarSetas( false, false, false, false);
          this.preencherBordasDaGridComMinas();
          guloso.posicionarNaGrid(7, 7);
          guloso.parar();
          campoMinado.adicionarMina(3, 5);
          campoMinado.adicionarMina(4, 3);
          campoMinado.adicionarMina(5, 8);
          campoMinado.adicionarMina(6, 9);
          campoMinado.adicionarMina(7, 4);
          campoMinado.adicionarMina(9, 3);
          campoMinado.adicionarMina(9, 8);
          alimentacao.adicionarComida(3, 3);
          alimentacao.adicionarComida(3, 9);
          alimentacao.adicionarComida(4, 5);
          alimentacao.adicionarComida(5, 9);
          alimentacao.adicionarComida(10, 9);
          break;
      case 8:
          this.desabilitarSetas( false, false, false, false);
          this.preencherBordasDaGridComMinas();
          guloso.posicionarNaGrid(7, 6);
          guloso.parar();
          campoMinado.adicionarMina(3, 4);
          campoMinado.adicionarMina(3, 8);
          campoMinado.adicionarMina(4, 4);
          campoMinado.adicionarMina(4, 8);
          campoMinado.adicionarMina(5, 8);
          campoMinado.adicionarMina(6, 4);
          campoMinado.adicionarMina(6, 8);
          campoMinado.adicionarMina(6, 9);
          campoMinado.adicionarMina(6, 10);
          campoMinado.adicionarMina(7, 4);
          campoMinado.adicionarMina(9, 8);
          campoMinado.adicionarMina(9, 9);
          campoMinado.adicionarMina(10, 8);
          campoMinado.adicionarMina(10, 10);
          campoMinado.adicionarMina(11, 8);
          alimentacao.adicionarComida(3, 3);
          alimentacao.adicionarComida(3, 9);
          alimentacao.adicionarComida(5, 9);
          alimentacao.adicionarComida(11, 9);
          break;
      case 9:
          this.desabilitarSetas( false, false, false, false);
          this.preencherBordasDaGridComMinas();
          guloso.posicionarNaGrid(7, 6);
          guloso.parar();
          campoMinado.adicionarMina(3, 4);
          campoMinado.adicionarMina(5, 4);
          campoMinado.adicionarMina(5, 8);
          campoMinado.adicionarMina(8, 2);
          campoMinado.adicionarMina(8, 7);
          campoMinado.adicionarMina(9, 10);
          alimentacao.adicionarComida(2, 2);
          alimentacao.adicionarComida(2, 9);
          alimentacao.adicionarComida(3, 2);
          alimentacao.adicionarComida(4, 9);
          alimentacao.adicionarComida(7, 2);
          alimentacao.adicionarComida(7, 10);
          alimentacao.adicionarComida(8, 4);
          alimentacao.adicionarComida(9, 8);
          alimentacao.adicionarComida(10, 8);
          alimentacao.adicionarComida(10, 10);
          break;
      case 10:
          this.desabilitarSetas( false, false, false, false);
          this.preencherBordasDaGridComMinas();
          guloso.posicionarNaGrid(11, 6);
          guloso.parar();
          campoMinado.adicionarMina(5, 3);
          campoMinado.adicionarMina(5, 4);
          campoMinado.adicionarMina(5, 5);
          campoMinado.adicionarMina(6, 2);
          campoMinado.adicionarMina(6, 8);
          campoMinado.adicionarMina(7, 4);
          campoMinado.adicionarMina(7, 8);
          campoMinado.adicionarMina(8, 4);
          campoMinado.adicionarMina(8, 8);
          campoMinado.adicionarMina(9, 3);
          campoMinado.adicionarMina(9, 8);
          alimentacao.adicionarComida(3, 3);
          alimentacao.adicionarComida(3, 4);
          alimentacao.adicionarComida(3, 10);
          alimentacao.adicionarComida(4, 3);
          alimentacao.adicionarComida(4, 9);
          alimentacao.adicionarComida(4, 10);
          alimentacao.adicionarComida(6, 3);
          alimentacao.adicionarComida(6, 9);
          alimentacao.adicionarComida(7, 3);
          alimentacao.adicionarComida(7, 10);
          alimentacao.adicionarComida(8, 3);
          alimentacao.adicionarComida(8, 9);
          break;
    }
  }
}
