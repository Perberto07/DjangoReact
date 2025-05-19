// components/Sidebar.js
import { ShoppingBag, Users, PlusCircle ,Menu, X} from 'lucide-react'; // Optional: for icons
import React,{useState} from 'react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='w-55 h-screen bg-gray-800 text-white shadow-lg'>
    <button
      className="lg:hidden text-gray-300"
      onClick={() => setIsOpen(!isOpen)}
      arial-label='toggle navigation'>
        {isOpen? <X size={24}/> : <Menu size= {24}/>}
    </button>
    <aside className={`${isOpen ? 'block': 'hidden'}`}>
      
      <div className=''>
        <div className="p-6 text-xl font-bold border-b border-gray-700">
          Dashboard
        </div>

        <nav className=''>
          <ul className="space-y-4">
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <ShoppingBag size={18} />
              Product
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">   
              <Users size={18} />
              Customer
            </li>
            <li className="flex items-center gap-2 hover:text-blue-400 cursor-pointer">
              <PlusCircle size={18} />
              Add Transaction
            </li>
          </ul>
        </nav>
      </div>
    </aside>
    </div>
  );
};

export default Sidebar;
