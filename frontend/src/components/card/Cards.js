const Cards = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 mb-4 ${className}`}>
      {children}
    </div>
  );
};

export default Cards;