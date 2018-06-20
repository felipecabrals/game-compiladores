function mostrarModal(oQue){
  switch (oQue) {
  	case "manual do usuário":
  		var conteudo = "";
  		var informacoes	= document.getElementById("modal-informacoes");
  		informacoes.innerHTML = "";
  		conteudo += "<center><h4>Regras do Jogo:</h4></center>";
  		conteudo += "<ul type='disc'>";
      conteudo += "<li align='justify'><b>Fase: </b>para concluir uma fase deve-se comer todas as frutas contidas na fase.</li><br/>";
      conteudo += "<li align='justify'><b>Pontos: </b>cada fruta vale um ponto. Se o guloso fazer o menor número de passos para comer todas as frutas em uma fase os pontos obtidos na fase dobram.</li><br/>";
      conteudo += "<li align='justify'><b>Vidas: </b>a cada fase o Guloso terá 3 vidas, pede uma vida se durante o percurso passar por uma mina explosiva. Se passar por uma mina explosiva e não tiver mais vidas o jogo retorna a fase inicial zerando a pontuação.</li><br/>";
      conteudo += "<li align='justify'><b>Movimentação: </b>para movimentar o Guloso deve-se arrastar a seta de direção para o campo de instruções e informar a quantidade de passos que devem ser realizados pelo Guloso. Podem ser arrastadas quantas setas forem necessárias para atingir o objetivo do jogo. Quando finalizar de montar o conjunto de instruções deve-se clicar no botão play abaixo do campo instruções.</li><br/>";
      conteudo += "</ul>";
      informacoes.innerHTML = conteudo;
  		var modal = document.getElementById('myModal'); // Get the modal
  		var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
  		var modalConteudo = document.getElementById("modal-content");
  		modalConteudo.style.width = "80%";
  		modal.style.paddingTop = "0px";
  		modal.style.display = "block"; // When the user clicks the button, open the modal
  		span.onclick = function() { // When the user clicks on <span> (x), close the modal
  				modal.style.display = "none";
  				window.onclick = null;
  				span.onclick = null;
  				modal.style.paddingTop = "100px";
  				modalConteudo.style.width = "450px";
  		}
  		window.onclick = function(event) { // When the user clicks anywhere outside of the modal, close it
  		    if (event.target == modal) {
  						modal.style.display = "none";
  						span.onclick = null;
  						window.onclick = null;
  						modal.style.paddingTop = "100px";
  						modalConteudo.style.width = "350px";
  		    }
  		}
  		break;
  	case "sobre":
  		var conteudo = "";
  		var informacoes	= document.getElementById("modal-informacoes");
  		informacoes.innerHTML = "";
  		conteudo += "<center><img src='imagens/sloganMenuSuperior.png' alt='Slogan Guloso' height='68' width='250'></center>";
  		//informacoes.innerHTML += "<p>Some text in the Modal..</p>";
  		conteudo += '<center><h4>Guloso versão 1.0</h4></center>';
      conteudo += "<dl><b>Desenvolvido por:</b>";
      conteudo += "<dt>Felipe Dias da Silva Cabral</dt>";
      conteudo += "<dd>Email: <a href='mailto:flp.dsc@gmail.com'>flp.dsc@gmail.com</a></dd>";
      conteudo += "<dd>GitHub: <a href='https://github.com/felipecabrals' target='_blank'>https://github.com/felipecabrals</a></dd>";
      conteudo += "<dd>Linkedin: <a href='https://linkedin.com/in/felipe-dias-607647a3' target='_blank'>https://linkedin.com/in/felipe-dias-607647a3</a></dd>";

      conteudo += "<dt>José da Silva Filho</dt>";
      conteudo += "<dd>Email: <a href='mailto:jose10dsf@gmail.com'>jose10dsf@gmail.com</a></dd>";
      conteudo += "<dd>GitHub: <a href='https://github.com/jose10dsf' target='_blank'>https://github.com/jose10dsf</a></dd>";
      conteudo += "<dd>Linkedin: <a href='  https://linkedin.com/in/jose-da-silva-filho-b23986111' target='_blank'>https://linkedin.com/in/jose-da-silva-filho-b23986111</a></dd>";

      conteudo += "<dt>Santhiago Dionizio Pinto</dt>";
      conteudo += "<dd>Email: <a href='mailto:santhiagosdp@gmail.com'>santhiagosdp@gmail.com</a></dd>";
      conteudo += "<dd>GitHub: <a href='https://github.com/santhiagosdp' target='_blank'>https://github.com/santhiagosdp</a></dd>";
      conteudo += "<dd>Linkedin: <a href='https://linkedin.com/in/santhiagosdp' target='_blank'>https://linkedin.com/in/santhiagosdp</a></dd>";
      conteudo += "</dl>";
      /*conteudo += "<ul type='disc'>";
      conteudo += "<li align='justify'><b>José da Silva Filho.</b></li>";
      conteudo += "<ul type='square'>";
      conteudo += "<li>Email: <a href='mailto:jose10dsf@gmail.com'>jose10dsf@gmail.com</a></li>";
      conteudo += "</ul>";
      conteudo += "</ul>";*/
      informacoes.innerHTML = conteudo;
  		var modal = document.getElementById('myModal'); // Get the modal
  		var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
  		modal.style.display = "block"; // When the user clicks the button, open the modal
  		span.onclick = function() { // When the user clicks on <span> (x), close the modal
  		    modal.style.display = "none";
  				window.onclick = null;
  				span.onclick = null;
  		}
  		window.onclick = function(event) { // When the user clicks anywhere outside of the modal, close it
  		    if (event.target == modal) {
  		        modal.style.display = "none";
  						span.onclick = null;
  						window.onclick = null;
  		    }
  		}
  		break;
  	case "resetar configurações":
  		var modal = document.getElementById("myModal");
  		modal.style.display = "none";
  		var span = document.getElementsByClassName("close")[0]; // Get the <span> element that closes the modal
  		span.style.display = "block";
  		var modalConteudo = document.getElementById("modal-content");
  		modalConteudo.style.backgroundColor = "#fefefe";
  		modalConteudo.style.border = "1px solid #888";
  	break;
  	default:

  }

}
