export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>Ongoing charity for Meshari bin Ahmed bin Suleiman Al-Abra (May Allah have mercy on him)</p>
      <div className="footer-links">
        <a href="https://x.com/meshari_charity" target="_blank" rel="noopener noreferrer">
          Follow on X
        </a>
        <a href="https://github.com/meshari-charity" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
      <p className="copyright">All rights reserved © {currentYear}</p>
    </footer>
  );
}
