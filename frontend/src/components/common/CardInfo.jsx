const CardInfo = ({ message }) => {
  return (
    <div className="container" id="cardInfo">
      <div className="card">
        <div className="card-body">{message}</div>
      </div>
    </div>
  );
};

export default CardInfo;
