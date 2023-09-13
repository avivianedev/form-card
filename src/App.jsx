import Home from "./pages/Home"
import { Provider } from "./context/Provider"


function App() {

  return (
    <>
      <Provider>
        <main>
          <Home />
        </main>
      </Provider>

    </>
  )
}

export default App
