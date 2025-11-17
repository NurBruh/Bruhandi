import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import Loading from '../Loading';
import '../../assets/css/Main.css';

const DrinksPage = ({ adding }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drinks, setDrinks] = useState([]);
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

  useEffect(() => {
    const loadDrinks = async () => {
      try {
        setLoading(true);
        setDrinks([]);
        
        let api = 'https://a57e29c422a5fd0e.mokky.dev/drinks';
        
        if (categoryFilter) {
          api = `${api}?category=${categoryFilter}`;
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
  }, [categoryFilter]);

  const processedDrinks = useMemo(() => {
    const uniqueDrinks = new Set();
    let currentDrinks = drinks.filter(drink => {
      if (!uniqueDrinks.has(drink.id)) {
        uniqueDrinks.add(drink.id);
        return true;
      }
      return false;
    });

    if (searchFilter) {
      const lowercase = searchFilter.toLowerCase().trim();
      if (lowercase.length === 0) return currentDrinks;

      currentDrinks = currentDrinks.filter(drink => {
        const name = drink.name.toLowerCase().includes(lowercase);
        const category = drink.category.toLowerCase().includes(lowercase);
        return name || category;
      });
    }

    return currentDrinks;
  }, [drinks, searchFilter]);
  return (
    <main className="main">
      <section className="main-container">
        <h2 className="main-title">Напитки</h2>
        <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Поиск напитка..."
            value={searchItem}
            onChange={(e) => setSearchItem(e.target.value)}
            style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '8px', border: '2px solid #00963D', width: '300px', outline: 'none' }}
          />
          <button type="submit" style={{ padding: '10px 20px', fontSize: '16px', borderRadius: '8px', backgroundColor: '#ff6f1e', color: 'white', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>
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
              <div style={{ textAlign: 'center', padding: '20px', fontSize: '18px', color: '#666' }}>
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
