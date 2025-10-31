import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import CarInsurance from './pages/CarInsurance'

function App() {

  return (
      <BrowserRouter>
        <Routes>
           <Route path="/" element={<Home/>}></Route>
           <Route path="/car-quote" element={<CarInsurance/>}></Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
