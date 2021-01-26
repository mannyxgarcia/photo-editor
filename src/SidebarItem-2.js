
import React from 'react'

const SidebarItem2 = ({handleImageUpload, image}) => {
  return (
    <>
      <label
        className="custom-file-upload"
        htmlFor="file-upload"
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
      <a download="image.jpg" href={image} className='btn'>Download</a>
    </>
  )
}

export default SidebarItem2
