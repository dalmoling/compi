const Accordion = ({ title, content, index }) => {
  return (
    <div className="accordion-item">
      <h2 className="accordion-header">
        <button
          className="accordion-button collapsed"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={"#" + index}
        >
          {title}
        </button>
      </h2>
      <div id={index} className="accordion-collapse collapse">
        <div className="accordion-body">
          <ul className="list-group">
            {content.map((value, index) => (
              <li className="list-group-item text-start" key={index}>
                {value}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
