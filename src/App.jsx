import Header from './components/Header.jsx';
import Game   from './components/Game.jsx';

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Game />
      </main>
    </>
  );
}
