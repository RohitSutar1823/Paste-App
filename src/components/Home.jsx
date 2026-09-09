import React from 'react'
import { useState } from 'react'

const Home = () => {
  const [title, setTitle] = useState('')
  return (
    <div>
      <input
      className='p-2 rounded-2xl mt-2'
      type="text"
      placeholder='enter the text'
      value={title}
      onChange={(e)=>setTitle(e.target.value)}
      />
    </div>
  )
}

export default Home
