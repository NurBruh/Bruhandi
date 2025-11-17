import React from 'react';
import Card from './Card';
import DrinkCard from './DrinkCard';
import '../assets/css/Main.css';
import burgerKuriniy from '../assets/images/burger_kuriniy.jpg';
import beefBurger from '../assets/images/beef_burger.png';
import cheeseBurger from '../assets/images/cheese_burger.png';
import burgerKuriniyDvoynoy from '../assets/images/burger_kuriniy_dvoynoy.jpg';
import fishBurger from '../assets/images/fish_bruger.jpg';
import miniBurger from '../assets/images/mini_burger.jpg';

const Main = () => {
  
  return (
    <main className="main">
      
      <div className="main-container">
        <h2 className="main-title">Бургеры</h2>
        <div className="main-grid">
          {burgers.map((burger) => (
            <Card 
              key={burger.id} 
              name={burger.name} 
              price={burger.price} 
              img={burger.img} 
            />
          ))}
        </div>
      </div>

    </main>
  );
};

export default Main;