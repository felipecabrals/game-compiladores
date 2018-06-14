function CampoMinado(caminhoDaImagem){
  this.minas = [];
  this.caminhoDaImagem = caminhoDaImagem;
}
CampoMinado.prototype = {
  adicionarMina: function(x, y){
    if(this.minas[x] == undefined){
      this.minas[x] = [];
    }
    var posicaoNaGridEmPixels = converterPosicaoNaGridEmPixels(x, y);
    this.minas[x][y] = new Sprite(this.caminhoDaImagem, posicaoNaGridEmPixels.x + 4, posicaoNaGridEmPixels.y + 5);
    m = this.minas;
  },
  essaPossicaoNaGridPossuiMina: function(x, y){
    if(this.minas[x] == undefined){
      return false;
    }else if(this.minas[x][y] == undefined){
      return false;
    }else{
      return true;
    }
  },
  desenharMinas: function(){
    for(var xMina in this.minas){
  		for(var yMina in this.minas[xMina]){
          if(this.minas[xMina][yMina].estaCarregada == true){
            this.minas[xMina][yMina].desenharImagem();
          }
  		}
  	}
  }
}
