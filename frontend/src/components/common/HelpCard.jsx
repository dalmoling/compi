import React from "react";

const HelpCard = ({ title, message }) => {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <p className="card-text">{message}</p>
      </div>
    </div>
  );
};

export default HelpCard;
