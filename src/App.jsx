import "./App.css";
import GamePage from "./game/pages/GamePage";
// import TestPlayground from "./game/components/ui/TestPlayground";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <GamePage />
        {/* <TestPlayground /> */}
      </header>
    </div>
  );
}

export default App;
