import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.find((p) => p._id === id);

  return (
    <div className='min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-6'>
        <div className='w-full'>
          <input
            className='w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 px-4 py-3 rounded-xl text-sm shadow-sm'
            type='text'
            placeholder='enter title here'
            value={paste?.title || ""}
            disabled
          />
        </div>
        <div>
          <textarea
            className='w-full bg-white border border-slate-200 text-slate-900 placeholder-slate-400 p-4 rounded-xl text-sm resize-y min-h-87.5 sm:min-h-100 font-mono shadow-sm'
            placeholder='enter content here'
            value={paste?.content || ""}
            disabled
            rows={15}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;