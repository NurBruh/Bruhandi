import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card';
import Loading from '../Loading';
import '../../assets/css/Main.css';

const BurgersPage = ({ adding }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [fastfood, setFastfood] = useState([]);
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
    const loadBurgers = async () => {
      try {
        setLoading(true);
        setFastfood([]);
        
        let api = 'https://a57e29c422a5fd0e.mokky.dev/burger';
        
        if (categoryFilter) {
          api = `${api}?category=${categoryFilter}`;
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
  }, [categoryFilter]);

  const processedBurgers = useMemo(() => {
    const uniqueBurgers = new Set();
    let currentBurgers = fastfood.filter(burger => {
      if (!uniqueBurgers.has(burger.id)) {
        uniqueBurgers.add(burger.id);
        return true;
      }
      return false;
    });

    if (searchFilter) {
      const lowercase = searchFilter.toLowerCase().trim();
      if (lowercase.length === 0) return currentBurgers;

      currentBurgers = currentBurgers.filter(burger => {
        const name = burger.name.toLowerCase().includes(lowercase);
        const category = burger.category.toLowerCase().includes(lowercase);
        return name || category;
      });
    }

    return currentBurgers;
  }, [fastfood, searchFilter]); 

  return (
    <main className="main">
      <section className="main-container">
        <h2 className="main-title">Бургеры</h2>
        <form onSubmit={handleSearch} style={{ marginBottom: '20px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <input
            type="text"
            placeholder="Поиск бургера..."
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
            {processedBurgers.length > 0 ? (
              processedBurgers.map((b) => (
                <Card key={`${b.type}-${b.id}`} eda={b} qosu={adding} />
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

export default BurgersPage;
