import Header from "./components/Header.jsx";
import Game from "./components/Game.jsx";
import Footer from "./components/Footer.jsx";

export default function App() {
  return (
    <>
      <Header />
      <main className="container">
        <Game />
      </main>
      <Footer />
    </>
  );
}
