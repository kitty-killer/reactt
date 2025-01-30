import React, { useState, useEffect } from 'react';
import './Footer.css';

function Footer() {
  const easterEggs = React.useMemo(() => [
    "☕ Did you know? Coffee was discovered by goats!",
    "🌟 Pro Tip: Espresso means 'pressed out' in Italian.",
    "🎵 Fun Fact: Beethoven loved coffee so much he used exactly 60 beans per cup!",
    "🍫 Pair your coffee with dark chocolate for a perfect treat.",
    "🌍 Coffee is the second most traded commodity in the world after oil.",
    "🕰️ Morning ritual: Coffee, and then the world.",
    "💡 Did you know? Decaf coffee still contains a small amount of caffeine.",
    "🌱 Coffee beans are actually seeds from coffee cherries."
  ], []);

  const [randomEasterEgg, setRandomEasterEgg] = useState('');

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * easterEggs.length);
    setRandomEasterEgg(easterEggs[randomIndex]);
  }, [easterEggs]);

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__logo">
          <h1>Verwee Coffee</h1>
        </div>
        <div className="footer__easter-egg">
          <p>{randomEasterEgg}</p>
        </div>
       
        <div className="footer__social">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
        </div>
      </div>
      <div className="footer__bottom">
        <p>&copy; {new Date().getFullYear()} Verwee Coffee. All rights reserved.</p>
        <p>Made with ❤️ and ☕ in your favorite coffee shop.</p>
      </div>
    </footer>
  );
}

export default Footer;
