
import classNames from 'classnames';

const Button = ({ children, onClick, variant = 'primary', className = '', ...props }) => {
  const baseStyles = 'px-2 py-2 rounded shadow-md font-medium transition duration-200';
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600',
    submit: 'bg-blue-500 text-white hover:bg-blue-600',
    green: 'bg-green-700 text-white hover:bg-green-800',
  };

  return (
    <button
      onClick={onClick}
      className={classNames(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
