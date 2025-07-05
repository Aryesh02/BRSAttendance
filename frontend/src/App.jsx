import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AttendanceViewer from './AttendanceViewer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AttendanceViewer />
    </>
  )
}

export default App
