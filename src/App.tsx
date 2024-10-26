import './index.css'

import { Navigation } from './components/LogoNavFooterPageComponents/navigation/Navigation';
import { Footer } from './components/LogoNavFooterPageComponents/footer/Footer';
import { Outlet } from 'react-router-dom';


const App = () => {

  return (
    <>
      <Navigation />
      <Outlet />
      <Footer />
    </>
  )
}

export default App


