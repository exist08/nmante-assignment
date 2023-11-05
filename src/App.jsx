import { useState } from 'react'
import Navbar from './Components/Navbar'
import Bannner from './Components/Bannner'
import AppContainer from './Components/AppContainer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <Bannner />
      <AppContainer />
    </div>
  )
}

export default App
