import React from "react";

const GrammarExamples = () => {
  return (
    <nav className="container my-3">
      <div className="card">
        <div className="card-header d-flex justify-content-between">
          <h4 className="my-auto">Exemplos</h4>
        </div>
        <div className="card-group">
          <div className="card">
            <div className="card-body">
              <h6>Gramática:</h6>
              <p>
                S-&gt;T and T|T or T|T.
                <br />
                T-&gt;True|False|U.
                <br />
                U-&gt;not T.
              </p>
              <h6>Entrada:</h6>
              <p>True and False</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h6>Gramática:</h6>
              <p>
                S-&gt;A i B.
                <br />
                A-&gt;b.
                <br />
                B-&gt;r C.
                <br />
                C-&gt;d.
              </p>
              <h6>Entrada:</h6>
              <p>b i r d</p>
            </div>
          </div>
          <div className="card">
            <div className="card-body">
              <h6>Gramática:</h6>
              <p>
                A-&gt;y B|x|B C.
                <br />
                B-&gt;z B|u.
                <br />
                C-&gt;s.
              </p>
              <h6>Entrada:</h6>
              <p>y z z z u</p>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default GrammarExamples;
