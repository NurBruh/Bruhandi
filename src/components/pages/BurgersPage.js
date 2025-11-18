import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import Loading from '../Loading';
import '../../assets/css/Main.css';

const BurgersPage = ({ adding }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fastfood, setFastfood] = useState([]);
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
        const { data } = await axios.get('https://a57e29c422a5fd0e.mokky.dev/categoryburger');
        setCategories(data);
      } catch (error) {
        console.error('Ошибка загрузки категорий:', error);
      }
    };
    loadCategories();
  }, []);

  
  useEffect(() => {
    const loadBurgers = async () => {
      try {
        setLoading(true);
        setFastfood([]);
        
        let api = 'https://a57e29c422a5fd0e.mokky.dev/burger';
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
        setFastfood(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    loadBurgers();
  }, [categoryFilter, searchFilter]);

 
  const processedBurgers = useMemo(() => {
    const uniqueBurgers = new Set();
    
    return fastfood
      .filter(burger => {
        if (!uniqueBurgers.has(burger.id)) {
          uniqueBurgers.add(burger.id);
          return true;
        }
        return false;
      })
      .map(burger => {
        // Находим категорию по categoryID
        const category = categories.find(cat => cat.id === burger.categoryID);
        return {
          ...burger,
          categoryName: category ? category.name : 'Без категории'
        };
      });
  }, [fastfood, categories]); 

  return (
    <main className="main">
      <section className="main-container">
        <h2 className="main-title">Бургеры</h2>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Поиск бургера..."
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
            {processedBurgers.length > 0 ? (
              processedBurgers.map((b) => (
                <Card key={`${b.type}-${b.id}`} eda={b} qosu={adding} />
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

export default BurgersPage;
