const CardGrammar = ({ grammar }) => {
  return (
    <div className="container">
      <div className="border border-primary pb-3 mb-3 stack-card">
        <h4 className="mt-3 border-bottom border-primary">Gramática</h4>
        <div className="vstack gap-1 m-3">
          {grammar.map((element, index) => (
            <div className="bg-primary-subtle d-flex p-3" key={index}>
              {element}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardGrammar;
