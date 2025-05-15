import { ShoppingBag, Users, PlusCircle, LogIn } from 'lucide-react';

const Navigation = () => {
  return (
    <ul className="flex space-x-4">
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <ShoppingBag size={16} />
        Product
      </li>
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <Users size={16} />
        Customer
      </li>
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <PlusCircle size={16} />
        Add Transaction
      </li>
      <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
        <LogIn size={16} />
        Login
      </li>
    </ul>
  );
};

export default Navigation;
