import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'

function App() {

  return (
      <>
      <BrowserRouter>
      <Routes>
          <Route path="/Signup"  element={<Signup />} />
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Blog" element={<Blog />} />
      </Routes>
      </BrowserRouter>
      </>
  )
}

export default App
