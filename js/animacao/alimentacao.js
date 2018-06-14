var somMordida = new Audio();
somMordida.src = 'sons/mordida.mp3';
somMordida.volume = 0.4;
somMordida.load();
function Alimentacao(caminhoDaImagem){
  this.comidas = [];
  this.caminhoDaImagem = caminhoDaImagem;
  this.quantidadeDeComidas = 0;
}
Alimentacao.prototype = {
  adicionarComida: function(x, y){
    if(this.comidas[x] == undefined){
      this.comidas[x] = [];
    }
    var posicaoNaGridEmPixels = converterPosicaoNaGridEmPixels(x, y);
    this.comidas[x][y] = new Sprite(this.caminhoDaImagem, posicaoNaGridEmPixels.x + 6, posicaoNaGridEmPixels.y + 9.5);
    this.quantidadeDeComidas += 1;
  },
  removerComida: function(x, y){
    this.comidas[x].splice(y,1);
    this.quantidadeDeComidas -= 1;
  },
  essaPossicaoNaGridPossuiComida: function(x, y){
    if(this.comidas[x] == undefined){
      return false;
    }else if(this.comidas[x][y] == undefined){
      return false;
    }else{
      return true;
    }
  },
  desenharComidas: function(){
    for(var xComida in this.comidas){
  		for(var yComida in this.comidas[xComida]){
          if(this.comidas[xComida][yComida].estaCarregada == true){
            this.comidas[xComida][yComida].desenharImagem();
          }
  		}
  	}
  }
}
