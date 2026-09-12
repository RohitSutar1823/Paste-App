import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='w-full h-16 flex items-center justify-between px-6 sm:px-12 border-b border-slate-200 bg-white/80 backdrop-blur-md sticky top-0 z-50'>
      <span className='font-semibold text-slate-800 text-sm tracking-tight'>PasteApp</span>
      <div className='flex gap-6 sm:gap-8 font-medium text-sm'>
        <NavLink 
          to="/" 
          className={({ isActive }) => 
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-slate-500 hover:text-slate-800 transition-colors pb-1"
          }
        >
          Home
        </NavLink>
        <NavLink 
          to="/pastes" 
          className={({ isActive }) => 
            isActive ? "text-blue-600 border-b-2 border-blue-600 pb-1" : "text-slate-500 hover:text-slate-800 transition-colors pb-1"
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;