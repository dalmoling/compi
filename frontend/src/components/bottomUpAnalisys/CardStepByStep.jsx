import Accordion from "./Accordion";

import Cookies from "js-cookie";

const CardStepByStep = ({
  stepByStep,
  stepByStepDetailed,
  stepCont,
  setStepCont,
  qtSteps,
}) => {
  const buttonsNextStep = () => {
    console.log("teste");
    Cookies.set("BottomUpViewed", "", {
      expires: 1,
    });
    setStepCont((prevState) => prevState + 1);
  };

  return (
    <div
      className="border border-primary px-3 pb-3 mt-3 stack-card"
      id="stepByStep"
    >
      <h4 className="mt-3 border-bottom border-primary">Passo a passo</h4>
      <div className="accordion gap-3" id="accordionStep">
        {stepByStep.map((element, index) => (
          <Accordion
            title={element}
            content={stepByStepDetailed[index]}
            index={index}
            key={index}
          />
        ))}
      </div>
      <div
        className="mt-3 pt-3 px-2 border-top border-primary btn-group step-buttons"
        id="stepButtons"
      >
        <button
          className="btn btn-primary"
          disabled={stepCont <= 0}
          type="button"
          onClick={() => setStepCont((prevState) => prevState - 1)}
        >
          Anterior
        </button>
        <button
          className="btn btn-success"
          disabled={stepCont >= qtSteps}
          type="button"
          onClick={buttonsNextStep}
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

export default CardStepByStep;
