var somExplosao = new Audio();
somExplosao.src = 'sons/explosao.mp3';
somExplosao.volume = 0.4;
somExplosao.load();
var temExplosao = false;
function Explosao(imagem, x, y){
  this.x = x;
  this.y = y;
  this.estagioDaExplosao = 0;
  this.sheet = new Spritesheet(imagem, 1, 5, 0, 0);
  this.sheet.intervalo = 300;
  temExplosao = true;
  somExplosao.currentTime = 0.0;
  somExplosao.play();
}
Explosao.prototype = {
  atualizar: function(){
    if(this.estagioDaExplosao <4){
      var houveTrocaDeQuadro = this.sheet.proximoQuadro();
      if(houveTrocaDeQuadro){
        //alert(this.estagioDaExplosao);
        this.estagioDaExplosao += 1;
      }
      return true;
    }else{
      temExplosao = false;
      return false;
    }
  },
  desenhar: function(){
    this.sheet.desenhar(this.x, this.y);
  }
}
