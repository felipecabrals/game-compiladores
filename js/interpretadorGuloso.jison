/* linguagem jogo guloso */
%lex
%%

\s+ 				/*ignore whitespace */
[0-9]+\b		return 'NUMBER';
"cima"			return 'D_CIMA';
"baixo"			return 'D_BAIXO';
"direita" 	return 'D_DIREITA';
"esquerda" 	return 'D_ESQUERDA';
"a" 				return 'P_A';
"para" 			return 'P_PARA';
"mover" 		return 'V_MOVER';
"passo(s)"	return 'S_PASSO';
"." 				return 'PONTO_FINAL';
<<EOF>> 		return 'EOF';
. 					return 'INVALID';

/lex

%start jogada

%%

jogada
			: instrucoes EOF
			;

instrucoes
			: instrucao PONTO_FINAL instrucoes
			|instrucao PONTO_FINAL
			;

instrucao
			: movimentacao
			;

movimentacao
			: V_MOVER NUMBER S_PASSO P_PARA P_A D_DIREITA
				{instrucoesDaJogada.push({"tipoDeAcao": $1, "direcao": $6, "quantidadeDePassos": $2})}
			| V_MOVER NUMBER S_PASSO P_PARA P_A D_ESQUERDA
				{instrucoesDaJogada.push({"tipoDeAcao": $1, "direcao": $6, "quantidadeDePassos": $2})}
			| V_MOVER NUMBER S_PASSO P_PARA D_CIMA
				{instrucoesDaJogada.push({"tipoDeAcao": $1, "direcao": $5, "quantidadeDePassos": $2})}
			|V_MOVER NUMBER S_PASSO P_PARA D_BAIXO
				{instrucoesDaJogada.push({"tipoDeAcao": $1, "direcao": $5, "quantidadeDePassos": $2})}
			;
