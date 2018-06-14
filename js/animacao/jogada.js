function Jogada(){
  this.temJogadaEmAndamento = false;
  this.instrucoesDaJogada = [];
  this.ultimaIntrucaoExecutada = -1;
  this.totalDePassos = 0;
  this.aconteceuAlgumaJogada = false;
  this.instrucoesDeSetas = [];
}
Jogada.prototype = {
    fazerJogada: function(instrucoes, instrucoesDeSetas){
      this.instrucoesDeSetas = instrucoesDeSetas;
      this.totalDePassos = 0;
      this.instrucoesDaJogada = instrucoes;
      this.ultimaIntrucaoExecutada = -1;
      this.aconteceuAlgumaJogada = true;
      this.temJogadaEmAndamento = true;
    },
    executarProximaIntrucao: function(){
      this.ultimaIntrucaoExecutada += 1;
      var idInstrucao = this.ultimaIntrucaoExecutada;
      if(this.instrucoesDaJogada[idInstrucao].tipoDeAcao == "mover"){
        var passos = parseInt(this.instrucoesDaJogada[idInstrucao].quantidadeDePassos);
        this.totalDePassos += passos;
        guloso.mover(this.instrucoesDaJogada[idInstrucao].direcao, passos);
      }
      if(this.ultimaIntrucaoExecutada == (this.instrucoesDaJogada.length -1)){
        this.temJogadaEmAndamento = false;
        this.instrucoesDaJogada = [];
        //this.ultimaIntrucaoExecutada = -1;
      }
    }
}
