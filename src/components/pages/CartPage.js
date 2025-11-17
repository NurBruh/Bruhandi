import React from 'react';
import '../../assets/css/CartPage.css';

const CartPage = ({ list, clear, summar }) => {
  if (list.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-empty">
          <h2>Корзина пуста</h2>
          <p>Добавьте товары из меню</p>
        </div>
      </div>
    );
  }

  const totalItems = list.reduce((sum, x) => sum + x.sany, 0);

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Корзина</h2>
          <button className="cart-clear-btn" onClick={clear}>
            Очистить корзину
          </button>
        </div>

        <div className="cart-items-simple">
          <h3>Товары в корзине:</h3>
          <ul className="cart-items-list">
            {list.map((item) => {
              const price = Number(item.price);
              return (
                <li key={`${item.type}-${item.id}`} className="cart-item-simple">
                  <span className="item-name">{item.name}</span>
                  <span className="item-unit-price">{price.toLocaleString('ru-RU')} ₸</span>
                  <span className="item-quantity">x{item.sany}</span>
                  <span className="item-price">{(price * item.sany).toLocaleString('ru-RU')} ₸</span>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="cart-summary">
          <div className="cart-summary-row">
            <span>Всего товаров:</span>
            <span>{totalItems} шт</span>
          </div>
          <div className="cart-summary-row cart-summary-total">
            <span>Итого:</span>
            <span className="cart-total-price">{summar.toLocaleString('ru-RU')} ₸</span>
          </div>
          <button className="cart-checkout-btn">
            Оформить заказ
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
