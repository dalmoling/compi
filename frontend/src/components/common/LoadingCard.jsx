import React from "react";
import HelpCard from "../common/HelpCard";

const LoadingCard = ({ message }) => {
  return (
    <div className="row">
      <div className="col-md-6">
        <div className="loader"></div>
      </div>
      <div className="col-md-6">
        <div className="card">
          <div className="card-header">
            Um momento! A entrada está sendo analisada!
          </div>
          <div className="card-body">
            <p className="card-text">
              Na análise sintática ascendente (bottom-up), a árvore gramatical é
              construída para uma cadeia de entrada a partir das folhas em
              direção a raiz da árvore.
            </p>
            <p className="card-text">
              Nessa técnica, a análise consiste em empilhar símbolos da sentença
              de entrada, até que os símbolos na pilha formem o lado direito de
              uma produção, quando isso ocorre, esses símbolos são substituídos
              na pilha pelo terminal da produção. Esse processo se repete até
              que na pilha que a sentença acabe e reste na pilha o símbolo
              inicial da gramática, se isso ocorrer a entrada está
              sintaticamente correta.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingCard;
