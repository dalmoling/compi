import { Link, useLocation } from "react-router-dom";

import CardError from "../components/common/CardError";

const Error = () => {
  const location = useLocation();
  const state = location.state || {};

  return (
    <>
      <CardError 
        message={state.message || "Ocorreu um erro desconhecido"} 
        errorType={state.errorType || "unknown_error"} 
        errorDetails={state.errorDetails || ""}
      />
    </>
  );
};

export default Error;
