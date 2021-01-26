
import React from 'react'

const SidebarItem2 = ({handleImageUpload}) => {
  return (
    <>
      <label
        className="custom-file-upload"
        for="file-upload"
        >
        Upload
      </label>
      <input 
        type="file"
        id="file-upload" 
        name="file" 
        accept="image/*" 
        onChange={handleImageUpload} 
        multiple = {false}
        />
      <button className='btn'>Download</button>
    </>
  )
}

export default SidebarItem2
