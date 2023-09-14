import React, { useState } from 'react'
import './styles/App.scss'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import Viewer from './components/Viewer'

function App() {
  const [isToolbarActive, setIsToolbarActive] = useState<boolean>(false)
  const [isEditing, setIsEditing] = useState<boolean>(false)
  const [position, setPosition] = useState<__esri.PointProperties>({ x: -90, y: 34.052, z: 100000 })
  const [tilt, setTilt] = useState<number>(0)
  const [heading, setHeading] = useState<number>(0)
  const toggleToolbar = () => { setIsToolbarActive(!isToolbarActive) }
  const toggleEditing = () => { setIsEditing(!isEditing) }
  const photoClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const url = e.currentTarget.src
    console.log(url)
  }
  const layerUrls = ['http://localhost:3001/features/photos']
  return (
    <div className="App">
        <Header onToggleToolbar={toggleToolbar} isToolbarActive={isToolbarActive} />
        <Toolbar onToggleEditing={toggleEditing} isToolbarActive={isToolbarActive} isEditing={isEditing} photosUrl={layerUrls[0]} photoClick={photoClick} />
        <Viewer isEditing={isEditing} position={position} tilt={tilt} heading={heading} layers={layerUrls} />
    </div>
  )
}

export default App