import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const ViewPaste = () => {
  const { id } = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);

  // Use .find() instead of .filter() so 'paste' is a single object
  const paste = allPastes.find((p) => p._id === id);

  console.log("Final Paste: ", paste);

  return (
    <div className='flex flex-col gap-4 items-center mt-5'>
      <div className='flex flex-row gap-2 justify-between w-full max-w-150'>
        <input
          className='p-2 rounded-2xl w-[70%] bg-zinc-800 text-white'
          type='text'
          placeholder='enter title here'
          value={paste?.title || ""}
          disabled
        />
      </div>
      <div>
        <textarea
          className='p-3 rounded-2xl min-w-150 min-h-100 bg-zinc-800 text-white'
          placeholder='enter content here'
          value={paste?.content || ""}
          disabled
          rows={20}
        />
      </div>
    </div>
  );
};

export default ViewPaste;