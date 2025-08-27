import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './components/pages/Home'
import About from './components/pages/About'
import Programs from './components/pages/Programs'
import Admissions from './components/pages/Admissions'
import Policies from './components/pages/Policies'
import Contact from './components/pages/Contact'
import Navig from './components/navbar/Navig'
import Footer from './components/footer/Footer'
import Apply from './components/pages/Apply'

function App() {

  return (
    <>

      <Navig />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/programs' element={<Programs />} />
        <Route path='/admissions' element={<Admissions />} />
        <Route path='/policies' element={<Policies />} />
        <Route path='/apply' element={<Apply />} />
        <Route path='/contact' element={<Contact />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
