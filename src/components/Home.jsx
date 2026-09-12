import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }
    if (!value.trim()) {
      toast.error("Content cannot be empty");
      return;
    }

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success("Paste updated successfully");
    } else {
      dispatch(addToPastes(paste));
      toast.success("Paste created successfully");
    }

    setTitle("");
    setValue("");
    setSearchParams({});
  }

  return (
    <div className='min-h-[calc(100vh-4rem)] bg-slate-50 text-slate-900'>
      <div className='max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-6'>
        <div className='flex flex-col sm:flex-row gap-3 w-full'>
          <input
            className='w-full sm:flex-1 bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-slate-900 placeholder-slate-400 px-4 py-3 rounded-xl text-sm transition-all shadow-sm'
            type='text'
            placeholder='Paste title...'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button 
            onClick={createPaste}
            className='w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-medium px-5 py-3 rounded-xl text-sm transition-colors whitespace-nowrap shadow-sm text-center'
          >
            {pasteId ? "Update Paste" : "Create Paste"}
          </button>
        </div>
        <div>
          <textarea
            className='w-full bg-white border border-slate-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none text-slate-900 placeholder-slate-400 p-4 rounded-xl text-sm transition-all resize-y min-h-[350px] sm:min-h-[400px] font-mono shadow-sm'
            placeholder='Write your content here...'
            value={value}
            onChange={(e) => setValue(e.target.value)}
            rows={15}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;