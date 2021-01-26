import React, {useState} from 'react'
import './App.css'
import Slider from './Slider'
import SidebarItem from './SidebarItem'
import SidebarItem2 from './SidebarItem-2'

const defaultSettings = [
  {
   name: 'Brightness',
   property: 'brightness',
   value: 100,
   range: {
     min: 0,
     max: 200
   },
   unit: '%' 
  },
  {
   name: 'Contrast',
   property: 'contrast',
   value: 100,
   range: {
     min: 0,
     max: 200
   },
   unit: '%' 
  },
  {
   name: 'Saturation',
   property: 'saturate',
   value: 100,
   range: {
     min: 0,
     max: 200
   },
   unit: '%' 
  },
  {
   name: 'Grayscale',
   property: 'grayscale',
   value: 0,
   range: {
     min: 0,
     max: 100
   },
   unit: '%' 
  },
  {
   name: 'Sepia',
   property: 'sepia',
   value: 0,
   range: {
     min: 0,
     max: 100
   },
   unit: '%' 
  },
  {
   name: 'Hue Rotate',
   property: 'hue-rotate',
   value: 0,
   range: {
     min: 0,
     max: 360
   },
   unit: 'deg' 
  },
  {
   name: 'Blur',
   property: 'blur',
   value: 0,
   range: {
     min: 0,
     max: 20
   },
   unit: 'px' 
  },
]

const defaultImage = "https://images.unsplash.com/photo-1611530624100-5fc87c9d5baa?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80"

function App() {
  const [options, setOptions] = useState(defaultSettings)
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [image, setImage] = useState(defaultImage)
  
  const selectedOption = options[selectedIndex]
  
  function handleSliderChange({ target }) {
    setOptions(prevOptions => {
      return prevOptions.map((option, index) => {
        if (index !== selectedIndex) return option
        return { ...option, value: target.value }
      })
    })
  }
  
  async function handleImageUpload ({ target }) {
    const files = target.files
    const data = new FormData()
    data.append('file', files[0])
    data.append('upload_preset', 'image-filter')
    const res = await fetch(
      'https://api.cloudinary.com/v1_1/dpxqqumck/image/upload',
      {
        method: 'POST',
        body: data
      }
    )
    const file = await res.json()
    setImage(file.secure_url)
  }
  
  function getImage(){
    return { backgroundImage: `url(${image})` }
  }
  
  function getImageStyle() {
    const filters = options.map(option => {
      return `${option.property}(${option.value}${option.unit})`
    })
    
    return { filter: filters.join(' ')}
  }
  
  return (
    <>
      <div className="container">
        <div className="main-image-style" style={getImageStyle()}>
          <div 
            className="main-image"
            style={ getImage()} 
            />
        </div>
        <div className="sidebar-2">
          <SidebarItem2
            handleImageUpload={handleImageUpload}
            image={image}
          />
        </div>
        <div className="sidebar">
          {options.map((options, index) => {
            return (
              <SidebarItem 
                key={index}
                name={options.name}
                active={index === selectedIndex}
                handleClick={() => setSelectedIndex(index)}
              />
            )
          })}
        </div>
        <Slider 
          min={selectedOption.range.min}
          max={selectedOption.range.max}
          value={selectedOption.value}
          handleChange={handleSliderChange}
        />
      </div>
    </>
  );
}

export default App;
