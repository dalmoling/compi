import CardInfo from "../components/common/CardInfo";
import FormParsing from "../components/home/FormParsing";

import { Steps } from "intro.js-react";

import Cookies from "js-cookie";
import GrammarExamples from "../components/home/GrammarExamples";

const Home = () => {
  const steps = [
    {
      element: "#cardInfo",
      intro:
        "Bem-vindo ao SASC! Essa é uma ferramenta criada para auxílio do ensino na disciplina de compiladores.",
    },
    {
      element: "#grammarInput",
      intro: "Digite aqui a gramática correspondente a sua linguagem.",
    },
    {
      element: "#inputTape",
      intro: "Digite aqui a entrada a ser analisada.",
    },
    {
      element: "#algorithmType",
      intro: "Selecione o algoritmo de análise.",
    },
    {
      element: "#btnAnalisysForm",
      intro: "Clique aqui para executar a análise.",
    },
  ];

  return (
    <>
      <Steps
        enabled={Cookies.get("HomeViewed") == undefined ? true : false}
        steps={steps}
        initialStep={0}
        onExit={Home}
      />
      <CardInfo
        message={
          "Bem-vindo ao SASC - Simulador de Análise Sintática em Compiladores."
        }
      />
      <FormParsing />
      <GrammarExamples />
    </>
  );
};

export default Home;
