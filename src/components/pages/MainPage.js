import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import Loading from '../Loading';
import '../../assets/css/Main.css';

const MainPage = ({ adding }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [burgers, setBurgers] = useState([]);
  const [drinks, setDrinks] = useState([]);
  const [burgerCategories, setBurgerCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState('');

  const searchFilter = searchParams.get('q');

  const handleSearch = (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams(searchParams);
    
    if (searchItem.trim()) {
      newSearchParams.set('q', searchItem.trim());
    } else {
      newSearchParams.delete('q');
    }
    
    setSearchParams(newSearchParams, { replace: true });
  };

  // Загрузка категорий
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const [burgerCatData, drinkCatData] = await Promise.all([
          axios.get('https://a57e29c422a5fd0e.mokky.dev/categoryburger'),
          axios.get('https://a57e29c422a5fd0e.mokky.dev/categorydrink')
        ]);
        setBurgerCategories(burgerCatData.data);
        setDrinkCategories(drinkCatData.data);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };
    loadCategories();
  }, []);

  // Загрузка всех продуктов (без фильтрации на сервере)
  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        setBurgers([]);
        setDrinks([]);
        
        const [burgersData, drinksData] = await Promise.all([
          axios.get('https://a57e29c422a5fd0e.mokky.dev/burger'),
          axios.get('https://a57e29c422a5fd0e.mokky.dev/drinks')
        ]);
        
        setBurgers(burgersData.data);
        setDrinks(drinksData.data);
      } catch (error) {
        console.error('Ошибка загрузки продуктов:', error);
      } finally {
        setLoading(false);
      }
    };
    loadAllProducts();
  }, []);


  const processedProducts = useMemo(() => {
    const uniqueIds = new Set();
    
    // Объединяем бургеры с категориями
    let burgersWithCategories = burgers
      .filter(burger => {
        if (!uniqueIds.has(`burger-${burger.id}`)) {
          uniqueIds.add(`burger-${burger.id}`);
          return true;
        }
        return false;
      })
      .map(burger => {
        const category = burgerCategories.find(cat => cat.id === burger.categoryID);
        return {
          ...burger,
          categoryName: category ? category.name : 'Без категории',
          type: 'burger'
        };
      });


    let drinksWithCategories = drinks
      .filter(drink => {
        if (!uniqueIds.has(`drink-${drink.id}`)) {
          uniqueIds.add(`drink-${drink.id}`);
          return true;
        }
        return false;
      })
      .map(drink => {
        const category = drinkCategories.find(cat => cat.id === drink.categoryID);
        return {
          ...drink,
          categoryName: category ? category.name : 'Без категории',
          type: 'drink'
        };
      });

    if (searchFilter) {
      const lowercase = searchFilter.toLowerCase().trim();
      if (lowercase.length > 0) {
        burgersWithCategories = burgersWithCategories.filter(burger => {
          const name = burger.name?.toLowerCase().includes(lowercase);
          const category = burger.categoryName?.toLowerCase().includes(lowercase);
          return name || category;
        });

        drinksWithCategories = drinksWithCategories.filter(drink => {
          const name = drink.name?.toLowerCase().includes(lowercase);
          const category = drink.categoryName?.toLowerCase().includes(lowercase);
          return name || category;
        });
      }
    }

    const allProducts = [...burgersWithCategories, ...drinksWithCategories];

    return {
      burgers: burgersWithCategories,
      drinks: drinksWithCategories,
      all: allProducts
    };
  }, [burgers, drinks, burgerCategories, drinkCategories, searchFilter]);

  return (
    <main className="main">
      <section className="main-container">
        <h2 className="main-title">Все продукты</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Поиск бургеров и напитков..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Найти
          </button>
        </form>
        
        {isLoading ? (
          <Loading />
        ) : (
          <>
          
            {processedProducts.burgers.length > 0 && (
              <div className="product-section">
                <h3 className="section-title">Бургеры</h3>
                <div className="main-grid">
                  {processedProducts.burgers.map((burger) => (
                    <Card key={`burger-${burger.id}`} eda={burger} qosu={adding} />
                  ))}
                </div>
              </div>
            )}

            
            {processedProducts.drinks.length > 0 && (
              <div className="product-section">
                <h3 className="section-title">Напитки</h3>
                <div className="main-grid">
                  {processedProducts.drinks.map((drink) => (
                    <Card key={`drink-${drink.id}`} eda={drink} qosu={adding} />
                  ))}
                </div>
              </div>
            )}

          
            {processedProducts.all.length === 0 && (
              <div className="no-results">
                По вашему запросу не найдено.
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
};

export default MainPage;
