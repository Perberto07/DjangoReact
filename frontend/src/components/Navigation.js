import { ShoppingBag, Users, PlusCircle, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <ul className="flex space-x-4">
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <ShoppingBag size={16} />
        <Link to='/product'>Product</Link>
      </li>
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <Link></Link><Users size={16} />
        <Link to='/customer'>Customer</Link>
      </li>
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <PlusCircle size={16} />
        <Link to='#'>Add Transaction</Link>
      </li>
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <LogIn size={16} />
        <Link to='/login'> Login</Link>
      </li>
    </ul>
  );
};

export default Navigation;
