function Sprite(caminhoDaImagem, xInicial, yInicial){
  this.x = xInicial;
  this.y = yInicial;
  this.estaCarregada = false;
  //this.imagem = imagem;
  this.imagem = new Image();
  this.imagem.src = caminhoDaImagem;
  var that = this;
  this.imagem.onload = function(){
    that.largura = that.imagem.width;
    that.altura = that.imagem.height;
    that.desenharImagem();
    that.estaCarregada = true;
  }
  this.desenharImagem = function(){
    contexto.drawImage(this.imagem, this.x, this.y, this.largura, this.altura);
    //contexto.strokeStyle = "darkred";
    //contexto.lineWidth = 0.5;
    //contexto.strokeRect(this.x, this.y, this.largura, this.altura);
  }
  this.mover = function(dx, dy){
    this.x += dx;
    this.y += dy;
    //limites
    if(this.x > canvas.width){
      this.x = -this.largura;
    }else if(this.x < -this.largura){
      this.x = canvas.width;
    }
    if(this.y > canvas.height - this.altura + 5){
      this.y -= dy;
    }else if(this.y <= -5){
      this.y = canvas.height - this.altura;
    }
  }
  this.colidiu = function(outro){
    var colidiuNoXTopo = outro.x >= this.x && outro.x <= (this.x + this.largura);
    var colidiuNoYTopo = outro.y >= this.y && outro.y <= (this.y + this.altura);
    var colidiuNoXBase = (outro.x + outro.largura) >= this.x && (outro.x + + outro.largura) <= (this.x + this.largura);
    var colidiuNoYBase = (outro.y + outro.altura) >= this.y && (outro.y + outro.altura) <= (this.y + this.altura);
    return (colidiuNoXTopo && colidiuNoYTopo) || (colidiuNoXBase && colidiuNoYBase);
  }
}
