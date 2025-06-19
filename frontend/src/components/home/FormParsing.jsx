import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";

const FormParsing = () => {
  const [grammar, setGrammar] = useState("S->id.");
  const [parsingType, setParsingType] = useState("slr1");
  const [inputTape, setInputTape] = useState("id");

  const setCookies = () => {
    Cookies.set("HomeViewed", "", {
      expires: 1,
    });
  };

  const removeCookies = () => {
    Cookies.remove("HomeViewed");
    location.reload();
  };

  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    navigate("/bottom-up", {
      state: {
        grammar: grammar,
        parsingType: parsingType,
        inputTape: inputTape,
      },
    });
  };

  return (
    <nav className="container my-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h4 className="my-auto">Analisar gramática</h4>
          <button
            onClick={removeCookies}
            className="btn btn-primary my-auto float-end"
          >
            Ver tutorial
          </button>
        </div>
        <form action="#" onSubmit={handleSubmit}>
          <div className="row m-2 ">
            <div className="col-md-6 my-3" id="grammarInput">
              <label htmlFor="grammarInput mt-3" className="form-label">
                Gramatica
              </label>
              <textarea
                className="form-control mb-3"
                id="grammarInput"
                rows={6}
                required
                onChange={(event) => setGrammar(event.target.value)}
                value={grammar}
              />
            </div>
            <div className="col-md-6 my-3">
              <div id="inputTape">
                <label htmlFor="inputTape mt-3" className="form-label">
                  Fita de entrada
                </label>
                <input
                  type="text"
                  className="form-control mb-3"
                  id="inputTape"
                  aria-describedby="inputTape"
                  required
                  onChange={(event) => setInputTape(event.target.value)}
                  value={inputTape}
                />
              </div>
              <div id="algorithmType">
                <label htmlFor="algorithmType" className="form-label">
                  Tipo de algoritmo
                </label>
                <select
                  className="form-select mb-3"
                  id="algorithmType"
                  aria-label="algorithmType"
                  required
                  onChange={(event) => setParsingType(event.target.value)}
                  value={parsingType}
                >
                  <option value="slr1">SLR</option>
                  <option value="lr1">LR1</option>
                  <option value="lr0">LR0</option>
                  <option value="lalr1">LALR</option>
                </select>
              </div>
              <button
                onClick={setCookies}
                type="submit"
                className="btn btn-primary mb-3"
                id="btnAnalisysForm"
              >
                Analisar
              </button>
            </div>
          </div>
        </form>
      </div>
    </nav>
  );
};

export default FormParsing;
