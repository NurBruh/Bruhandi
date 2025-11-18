import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import Loading from '../Loading';
import '../../assets/css/Main.css';

const DrinksPage = ({ adding }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drinks, setDrinks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [searchItem, setSearchItem] = useState('');

  const categoryFilter = searchParams.get('category');
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

  // Загружаем категории один раз при монтировании
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const { data } = await axios.get('https://a57e29c422a5fd0e.mokky.dev/categorydrink');
        setCategories(data);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };
    loadCategories();
  }, []);

  // Загружаем напитки при изменении фильтров
  useEffect(() => {
    const loadDrinks = async () => {
      try {
        setLoading(true);
        setDrinks([]);
        
        let api = 'https://a57e29c422a5fd0e.mokky.dev/drinks';
        const params = [];
        
        if (categoryFilter) {
          params.push(`category=${categoryFilter}`);
        }
        
        if (searchFilter) {
          params.push(`name=*${searchFilter}*`);
        }
        
        if (params.length > 0) {
          api = `${api}?${params.join('&')}`;
        }
        
        const { data } = await axios.get(api);
        setDrinks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadDrinks();
  }, [categoryFilter, searchFilter]);

  
  const processedDrinks = useMemo(() => {
    const uniqueDrinks = new Set();
    
    return drinks
      .filter(drink => {
        if (!uniqueDrinks.has(drink.id)) {
          uniqueDrinks.add(drink.id);
          return true;
        }
        return false;
      })
      .map(drink => {
      
        const category = categories.find(cat => cat.id === drink.categoryID);
        return {
          ...drink,
          categoryName: category ? category.name : 'Без категории'
        };
      });
  }, [drinks, categories]);
  return (
    <main className="main">
      <section className="main-container">
        <h2 className="main-title">Напитки</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Поиск напитка..."
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
          <div className="main-grid">
            {processedDrinks.length > 0 ? (
              processedDrinks.map((drink) => (
                <Card key={`${drink.type}-${drink.id}`} eda={drink} qosu={adding} />
              ))
            ) : (
              <div className="no-results">
                По вашему запросу не найдено.
              </div>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default DrinksPage;
