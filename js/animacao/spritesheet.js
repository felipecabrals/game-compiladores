function Spritesheet(imagem, linhas, colunas, linhaInicial, colunaInicial) {
   this.imagem = imagem;
   this.numLinhas = linhas;
   this.numColunas = colunas;
   this.intervalo = 0;
   this.linha = linhaInicial;
   this.coluna = colunaInicial;
}
Spritesheet.prototype = {
   proximoQuadro: function() {
      var agora = new Date().getTime();
      //console.log(agora);
      // Se ainda não tem último tempo medido
      if (! this.ultimoTempo) this.ultimoTempo = agora;
      // Já é hora de mudar de coluna?
      if (agora - this.ultimoTempo < this.intervalo) return false;
      if (this.coluna < this.numColunas - 1){
        this.coluna++;
      }else{
        this.coluna = 0;
      }
      // Guardar hora da última mudança
      this.ultimoTempo = agora;
      return true;
   },
   desenhar: function(x, y) {
      var largura = this.imagem.width / this.numColunas;
      var altura = this.imagem.height / this.numLinhas;

      contexto.drawImage(
         this.imagem,
         largura * this.coluna,
         altura * this.linha,
         largura,
         altura,
         x,
         y,
         largura,
         altura
      );
   }
}
