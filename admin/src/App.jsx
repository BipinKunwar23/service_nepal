import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Naavbar from './Navbar'
import { Route } from 'react-router-dom';
import { Routes } from 'react-router-dom';
import { CategoryPage } from './category/categoryPage'
import Dashboard from './Dashboard'
import Home from './Home'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
     <Naavbar/>
     
     <Routes>
     <Route path='/' element={<Home/>}/>
      
      <Route path='/category' element={<CategoryPage/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>

     </Routes>
    
    </>
  )
}

export default App
