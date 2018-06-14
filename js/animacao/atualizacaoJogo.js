var atualizacaoAutomatica = false;
function iniciarAtualizacaoAutomatica(){
  //atualizacaoAutomatica = setInterval(Atualizar, 100);
  if(atualizacaoAutomatica){
    Atualizar();
    requestAnimationFrame(iniciarAtualizacaoAutomatica);
  }
}

function pararAtualizacaoAutomatica(){
  //clearInterval(atualizacaoAutomatica);
  atualizacaoAutomatica = false;
}

function Atualizar(){
  desenharFundo()
  campoMinado.desenharMinas();
  alimentacao.desenharComidas();
  guloso.atualizar();
  guloso.desenhar();
  if(temExplosao){
    var atualizouAexplosao = explosao.atualizar();
    explosao.desenhar();
    if(!atualizouAexplosao){
        if(fase.vidas == 0){
          fase.voltarFase(1);
        }else{
          desbilitarPanelInstrucoes(false);
          removerClassesDeExecucaoDeSetas();
          fase.perderVidas(1);
          var faseAnterior = fase.nivel - 1;
          fase.pontos = fase.pontosPorFase[faseAnterior];
          fase.iniciarFase();
          $("#botaoExecutar").prop("disabled",false);
          setTimeout(pararAtualizacaoAutomatica, 5000);
          //pararAtualizacaoAutomatica();
        }

    }
  }
}
