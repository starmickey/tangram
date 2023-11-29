// import logo from './logo.svg';
import './App.css';
import Piece from './components/game/Piece';
import PieceType from './components/game/PieceType';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Piece type={PieceType.STRIANGLE}/>
        <Piece type={PieceType.MTRIANGLE}/>
        <Piece type={PieceType.LTRIANGLE}/>
        <Piece type={PieceType.SQUARE}/>
        <Piece type={PieceType.PARALLELOGRAM}/>
      </header>
    </div>
  );
}

export default App;
