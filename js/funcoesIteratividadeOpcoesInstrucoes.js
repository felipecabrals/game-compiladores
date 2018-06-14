var instrucoesDaJogada = [];
$(function(){
    // Arrastar
    $('.setaParaDireita').draggable({
        // Conecta com a função de reordenar
        connectToSortable: '#instrucoes',
        helper: 'clone'
    });
    $('.setaParaEsquerda').draggable({
        // Conecta com a função de reordenar
        connectToSortable: '#instrucoes',
        helper: 'clone'
    });
    $('.setaParaCima').draggable({
        // Conecta com a função de reordenar
        connectToSortable: '#instrucoes',
        helper: 'clone'
    });
    $('.setaParaBaixo').draggable({
        // Conecta com a função de reordenar
        connectToSortable: '#instrucoes',
        helper: 'clone'
    });

    // Soltar e reordenar
    $('#instrucoes').sortable({
        placeholder: 'placeholder',
        activate: function(event, ui){
            //$('#instrucoes p').remove();
        }
    });

    // Lixeira
    $('.lixeira').droppable({
        hoverClass: 'lixeira-ativa',
        drop: function(event, ui) {
            $(ui.draggable).remove();
        }
    });

    // Salvar
    $('#botaoExecutar').click(function(){
        $("#botaoExecutar").prop("disabled",true);
        desbilitarPanelInstrucoes(true);
        var instrucoes = "";
        instrucoesDaJogada = [];
        $('#instrucoes div').each(function(){
          var classe = $(this).attr("class");
          switch (classe) {
            case 'setaParaDireita ui-draggable ui-draggable-handle':
              instrucoes += "mover "+$('input',$(this)).val()+" passo(s) para a direita.";
              break;
            case 'setaParaEsquerda ui-draggable ui-draggable-handle':
              instrucoes += "mover "+$('input',$(this)).val()+" passo(s) para a esquerda.";
              break;
            case 'setaParaCima ui-draggable ui-draggable-handle':
              instrucoes += "mover "+$('input',$(this)).val()+" passo(s) para cima.";
              break;
            case 'setaParaBaixo ui-draggable ui-draggable-handle':
              instrucoes += "mover "+$('input',$(this)).val()+" passo(s) para baixo.";
              break;
            //default:
          }
            //instrucoes.push( $(this).html() );
        });

        // Faça o que preferir com os valores
        interpretar(instrucoes);
        atualizacaoAutomatica = true;
        iniciarAtualizacaoAutomatica();
        var instrucoesDeSetas = $('#instrucoes div');
        jogada.fazerJogada(instrucoesDaJogada, instrucoesDeSetas);
    });

    document.addEventListener("mousedown", precionarSeta);
    /*document.addEventListener("mousedown", function(event) {
        if (event.target.parentNode.id == "instrucoes" || event.target.parentNode.parentNode.id == "instrucoes") {
            document.addEventListener("mousemove", arrastaSeta);
        }
    });*/
});

function arrastaSeta(){
  mostrarLixeira("flex", 100);
  document.addEventListener("mouseup", soltarSeta);
}
function precionarSeta(event){
  if (event.target.parentNode.id == "instrucoes" || event.target.parentNode.parentNode.id == "instrucoes") {
      document.addEventListener("mousemove", arrastaSeta);
  }
}
function soltarSeta(){
  mostrarLixeira("none", -1);
  document.removeEventListener("mousemove", arrastaSeta);
  document.removeEventListener("mouseup", soltarSeta);
}
function removerClassesDeExecucaoDeSetas(){
  $('#instrucoes div').each(function(){
    $(this).removeClass("executando");;
    $(this).removeClass("executada");;
  });
}
function desabilitarInstrucoesDeSetas(valor){
  $('#instrucoes div').each(function(){
    //$(this).draggable({ disabled: valor});
    var inputPassos = $(this).children[0];
    $(inputPassos).prop('disabled', valor);
  });
}
function desbilitarPanelInstrucoes(valor){
  $( "#instrucoes" ).sortable({
    disabled: valor
  });
  desabilitarInstrucoesDeSetas(valor);
  if(valor){
    document.removeEventListener("mousedown", precionarSeta);
  }else{
    document.addEventListener("mousedown", precionarSeta);
  }
}
function mostrarLixeira(valorDisplay, valorZIndex){
  var lixeira = document.getElementById("lixeira");
  lixeira.style.display = valorDisplay;
  lixeira.style.zIndex = valorZIndex;
}

function interpretar(entrada) {
   if (entrada != ''){
       try{
          var resultado = interpretadorGuloso.parse(entrada);
          //$('#saida').html(resultado);
          //alert(resultado);
          //console.log(resultado);
       }catch (e){
          //$('#saida').html(String(e));
          //alert(String(e));
       }
   }
}
