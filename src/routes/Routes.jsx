import { Route, BrowserRouter, Routes } from 'react-router-dom'
import Home from '../screens/home/Home'
import About from '../screens/about/About'
import Homelayout from '../components/Homelayout/Homelayout'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path='/'
          element={
            <Homelayout>
              <Home />
            </Homelayout>
          }
        />
        <Route exact path='/about' element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
