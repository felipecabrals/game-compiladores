//var animacaoGuloso;
function Guloso(imagem, x, y) {
  this.gulosoDireita = 2;
  this.gulosoEsquerda = 3;
  this.gulosoCima = 1;
  this.gulosoBaixo = 0;
  this.gulosoParado = 4;
   this.x = x;
   this.y = y;
   this.velocidade = 10;
   this.tamanhoNivel = 40;
   this.tempoDeMovimentacao = 200;
   this.deslocamento = 0;
   this.deslocamentoTotal = 0;
   this.ultimoTempoDoDeslocamento;
   //this.deslocamentoPassoCompleto = 0;
   // Criando a spritesheet a partir da imagem recebida
   this.sheet = new Spritesheet(imagem, 5, 16, 4, 0);
   this.sheet.intervalo = 1;

   // Estado inicial
   this.andando = false;
   //this.direcao = GULOSO_DIREITA;
}
Guloso.prototype = {
    parar: function(){
      this.sheet.linha = this.gulosoParado;
      this.sheet.coluna = 0;
      //pararAtualizacaoAutomatica();
      //iniciarAtualizacaoAutomatica();
    },
    naoMostrar: function(){
      this.sheet.linha = this.gulosoParado;
      this.sheet.coluna = 2;
    },
    limiteDeDeslocamentoAtigido: function(x, y){
      if(x> (canvas.width - 32+4) || x < (pontoInicialGrid+ 4) || y> (canvas.height - 32+4) || y < (pontoInicialGrid+ 4)){
        return true;
      }else{
        return false;
      }
      this.sheet.linha = this.gulosoParado;
      this.sheet.coluna = 0;
    },
    deslocar: function(){
      var x;
      var y;
      this.deslocamentoPassoCompleto += this.velocidade;
      switch (this.sheet.linha) {
        case this.gulosoEsquerda:
          x = this.x - this.velocidade;
          y = this.y;
          break;
        case this.gulosoCima:
          x = this.x;
          y = this.y - this.velocidade;
          break;
        case this.gulosoDireita:
          x = this.x + this.velocidade;
          y = this.y;
          break;
        case this.gulosoBaixo:
          x = this.x;
          y = this.y + this.velocidade;
          break;
      }
      if(this.deslocamento <= this.deslocamentoTotal){
        if(this.limiteDeDeslocamentoAtigido(x, y)){
          this.deslocamento = this.deslocamentoTotal+1;
        }else{
          this.x = x;
          this.y = y;
          //if(this.deslocamentoPassoCompleto == 40){
            //this.deslocamentoPassoCompleto = 0;
          if((this.deslocamento % this.tamanhoNivel) == 0){
            var posicao = qualAPosicaoNaGrid(this.x, this.y)
            //var posicao = qualAPosicaoNaGrid(x, y);
            var possuiMina = campoMinado.essaPossicaoNaGridPossuiMina(posicao.x, posicao.y);
            var possuiComida = alimentacao.essaPossicaoNaGridPossuiComida(posicao.x, posicao.y);
            if(possuiComida){
              somAnimacao.pause();
              somMordida.play();
              alimentacao.removerComida(posicao.x, posicao.y);
              fase.adicionarPontos(1);
              //somAnimacao.play();
            }
            if(possuiMina){
              jogada.aconteceuAlgumaJogada = false;
              jogada.temJogadaEmAndamento = false;
              jogada.instrucoesDaJogada = [];
              somAnimacao.pause();
              this.naoMostrar();
              var imgExplosao = new Image();
              imgExplosao.src = 'imagens/animacao/explosao.png';
              var posicaoExplosao = converterPosicaoNaGridEmPixels(posicao.x, posicao.y);
              explosao = new Explosao(imgExplosao, posicaoExplosao.x - 15, posicaoExplosao.y - 15);
              this.deslocamento = 0;
              this.deslocamentoTotal = 0;
              this.andando = false;

            }
          }
          this.deslocamento += this.velocidade;
        }

      }else{
        this.deslocamento = 0;
        this.deslocamentoTotal = 0;
        this.andando = false;
        if(jogada.temJogadaEmAndamento){

        }else{
          this.parar();
        }

      }

    },
    proximoDeslocamento: function(){
      var agora = new Date().getTime();
      //console.log(agora);
      // Se ainda não tem último tempo medido
      if (! this.ultimoTempoDoDeslocamento) this.ultimoTempoDoDeslocamento = agora;
      // Já é hora de mudar de coluna?
      if (agora - this.ultimoTempoDoDeslocamento < this.tempoDeMovimentacao) return false;

      this.deslocar();
      // Guardar hora da última mudança
      this.ultimoTempoDoDeslocamento = agora;
      return true;
    },
    mover: function(direcao, quantidadeDeNiveis) {
      //this.deslocamentoPassoCompleto = 0;
      switch(direcao){
        case "esquerda": //pra esquerda
          this.sheet.linha = this.gulosoEsquerda;
          this.sheet.coluna = 0;
          this.andando = true;
          this.deslocamentoTotal = this.tamanhoNivel * quantidadeDeNiveis;
          this.deslocamento = this.velocidade;
        break;
        case "cima": //pra cima
          this.sheet.linha = this.gulosoCima;
          this.sheet.coluna = 0;
          this.andando = true;
          this.deslocamentoTotal = this.tamanhoNivel * quantidadeDeNiveis;
          this.deslocamento = this.velocidade;
        break;
        case "direita": //pra direita
          this.sheet.linha = this.gulosoDireita;
          this.sheet.coluna = 0;
          this.andando = true;
           this.deslocamentoTotal = this.tamanhoNivel * quantidadeDeNiveis;
           this.deslocamento = this.velocidade;
        break;
        case "baixo": //pra baixo
          this.sheet.linha = this.gulosoBaixo;
          this.sheet.coluna = 0;
          this.andando = true;
          this.deslocamentoTotal = this.tamanhoNivel * quantidadeDeNiveis;
          this.deslocamento = this.velocidade;
        break;
      }
    },
   atualizar: function() {
     if(this.andando){
       this.sheet.proximoQuadro();
       this.proximoDeslocamento();
     }else if(jogada.temJogadaEmAndamento){

       if(jogada.ultimaIntrucaoExecutada != -1){
         var instrucaoExecutada = jogada.instrucoesDeSetas[jogada.ultimaIntrucaoExecutada];
         $(instrucaoExecutada).removeClass("executando").addClass("executada");
       }
         var proximaInstrucao = jogada.instrucoesDeSetas[jogada.ultimaIntrucaoExecutada+1];
         $('#instrucoes').animate({
          // scrollTop: ($(proximaInstrucao).position().top - 30)
          scrollTop: ($(proximaInstrucao).offset().top - 30)
        }, 500);
         $( proximaInstrucao).addClass("executando");
       jogada.executarProximaIntrucao();
     }else if(jogada.aconteceuAlgumaJogada && !temExplosao){
       var instrucaoExecutada = jogada.instrucoesDeSetas[jogada.ultimaIntrucaoExecutada];
       $(instrucaoExecutada).removeClass("executando").addClass("executada");
       jogada.aconteceuAlgumaJogada = false;
       if(alimentacao.quantidadeDeComidas == 0){
         fase.completouFase();
         if(jogada.totalDePassos <= fase.menorNumeroDePassosPorFase[fase.nivel]){
           var pontosObitidosNaFase = fase.pontos - fase.pontosPorFase[fase.nivel -1];
           fase.adicionarPontos(pontosObitidosNaFase);
         }
       }else{
         fase.naoCompletouFase();
       }
       pararAtualizacaoAutomatica();
     }

   },
   desenhar: function() {
      this.sheet.desenhar(this.x, this.y);
   },
   posicionarNaGrid: function(x, y){
     var posicaoNaGridEmPixels = converterPosicaoNaGridEmPixels(x, y);
     this.x = posicaoNaGridEmPixels.x + 4;
     this.y = posicaoNaGridEmPixels.y + 4;
   }
}
