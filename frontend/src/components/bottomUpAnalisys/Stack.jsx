import React from "react";

const Stack = ({ stack }) => {
  return (
    <div className="border border-primary px-3 pb-3 mb-3 stack-card" id="stack">
      <h4 className="mt-3 border-bottom border-primary">Pilha</h4>
      <div className="vstack gap-3">
        {stack.map((element, index) => (
          <div className="bg-secondary border p-2 stack-element" key={index}>
            {element}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stack;
