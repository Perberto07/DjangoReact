const Cards = ({ children, className = '' }) => {
  return (
    <div className={`rounded-lg shadow p-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export default Cards;