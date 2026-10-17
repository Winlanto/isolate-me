export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <a
          href="https://github.com/Winlanto/isolate-me"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
        </a>
        <span className="footer-copyright">
          © {currentYear} Alek-Jaan Tšern
        </span>
        <a
          href="https://github.com/Winlanto/isolate-me/blob/main/LICENSE"
          target="_blank"
          rel="noreferrer"
        >
          MIT License
        </a>
      </div>
    </footer>
  );
}
