import React from 'react';
import '../assets/css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <section className="footer-content">
        <article>
          <h3 className="footer-title">BAHANDI</h3>
          <p className="footer-copyright">
            © 2024 ТОО Баханди. Все права защищены
          </p>
        </article>
        <aside>
          <h4 className="footer-section-title">Компания</h4>
          <nav>
            <ul className="footer-list">
              <li><a href="#" className="footer-link">Франшиза</a></li>
              <li><a href="#" className="footer-link">Вакансии</a></li>
              <li><a href="#" className="footer-link">Оферта</a></li>
              <li><a href="#" className="footer-link">Политика конфиденциальности</a></li>
              <li><a href="#" className="footer-link">Карта сайта</a></li>
            </ul>
          </nav>
        </aside>
      </section>
    </footer>
  );
};

export default Footer;