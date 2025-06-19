const InputTape = ({ inputTape, pointer }) => {
  return (
    <div className="border border-primary px-3 pb-3" id="inputTape">
      <h4 className="mt-3 border-bottom border-primary">Fita de entrada</h4>
      <div className="hstack gap-3 overflow-auto">
        {inputTape.map((element, index) => {
          if (pointer == index)
            return (
              <div>
                <div className="bg-info p-2 tape-element pointed" key={index}>
                  {element}
                </div>
                <div className="arrow"></div>
              </div>
            );
          return (
            <div>
              <div className="bg-info p-2 tape-element" key={index}>
                {element}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InputTape;
