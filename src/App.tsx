import { GlobalContextProvider } from "./components/Contexts/GlobalContextProvider";
import { AppRouter } from "./components/Router";

function App() {
  return (
    <GlobalContextProvider>
      <AppRouter />
    </GlobalContextProvider>
  );
}

export default App;
