import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/Card.css';

const Card = ({ eda, qosu }) => {
  
  const linkPath = eda.type === 'drink' ? `/drink/${eda.id}` : `/burger/${eda.id}`;
  
  return (
    <Link to={linkPath} className="card-link">
      <article className="card" style={{ cursor: 'pointer' }}>
      <figure className="card-image">
        {eda.img && <img src={eda.img} alt={eda.name} />}
      </figure>
      <section className="card-content">
        <p className="card-price">{Number(eda.price)} ₸</p>
        <h3 className="card-name">{eda.name}</h3>
        <button 
          className="card-btn" 
          onClick={(e) => {
            e.stopPropagation();
            qosu(eda);
          }}
        >
          В корзину
        </button>
      </section>
    </article>
    </Link>
  );
};

export default Card;