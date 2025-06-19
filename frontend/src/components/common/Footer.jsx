import React from "react";

const Footer = () => {
  return (
    <footer className="bg-body-tertiary text-center text-lg-start">
      <div className="text-center p-3">
        Esse software usa as tabelas de análise sintatica geradas por{" "}
        <a class="text-dark" href="http://smlweb.cpsc.ucalgary.ca/">
          Context Free Grammar Checker.
          <br />
        </a>
        A versão mais atualizada da ferramenta Context Free Grammar Checker é o{" "}
        <a class="text-dark" href="https://mdaines.github.io/grammophone/#/">
          Grammophone.
        </a>
      </div>
      <div className="text-center p-3">
        Ferramenta desenvolvida por{" "}
        <a class="text-dark" href="https://github.com/RogerioCrestani">
          Rogério Crestani
        </a>{" "}
        com apoio e orientação do Prof. Me. Wanderson Rigo no IFC-Videira.
      </div>
    </footer>
  );
};

export default Footer;
