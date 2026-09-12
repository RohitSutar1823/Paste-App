import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) => 
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (pasteId) => {
    dispatch(removeFromPastes(pasteId));
    toast.success("Paste deleted");
  };

  return (
    <div className='min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-6'>
        <input
          className='w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-slate-900 placeholder-slate-400 px-4 py-3 rounded-xl text-sm transition-all shadow-sm'
          type='search'
          placeholder='Search pastes...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        <div className='flex flex-col gap-4'>
          {filteredData.length > 0 ? (
            filteredData.map((paste) => {
              return (
                <div 
                  className='bg-white border border-slate-200 p-4 sm:p-5 rounded-2xl flex flex-col gap-3 transition-all hover:border-slate-300 shadow-sm' 
                  key={paste?._id}
                >
                  <div className='flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0'>
                    <h3 className='font-semibold text-slate-900 text-base wrap-break-word'>{paste.title}</h3>
                    <span className='text-xs text-slate-400 font-mono whitespace-nowrap'>
                      {new Date(paste.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  
                  <p className='text-slate-600 text-sm line-clamp-2 font-mono bg-slate-50 p-3 rounded-lg border border-slate-100 break-all'>
                    {paste.content}
                  </p>

                  <div className='flex flex-wrap items-center justify-between gap-2 pt-2'>
                    <div className='flex flex-wrap gap-3 sm:gap-4 text-xs font-medium'>
                      <Link 
                        to={`/?pasteId=${paste?._id}`} 
                        className='text-slate-600 hover:text-blue-600 transition-colors'
                      >
                        Edit
                      </Link>
                      <Link 
                        to={`/pastes/${paste?._id}`} 
                        className='text-slate-600 hover:text-blue-600 transition-colors'
                      >
                        View
                      </Link>
                      <button 
                        onClick={() => {
                          navigator.clipboard.writeText(paste?.content);
                          toast.success("Copied to clipboard");
                        }}
                        className='text-slate-600 hover:text-blue-600 transition-colors'
                      >
                        Copy
                      </button>
                    </div>

                    <button 
                      onClick={() => handleDelete(paste?._id)}
                      className='text-red-500 hover:text-red-600 text-xs font-medium transition-colors ml-auto sm:ml-0'
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className='text-center py-12 text-slate-400 text-sm'>
              No pastes found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Paste;