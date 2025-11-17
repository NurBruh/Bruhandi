import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AppRoute from './util/AppRoute';

function App() {
  const [korzina, setKorzina] = useState([]);

  const qosu = (eda) => {
    const existingItem = korzina.find((x) => x.id === eda.id);
    
    if (existingItem) {
      setKorzina(korzina.map((x) =>
        x.id === eda.id 
          ? { ...x, sany: x.sany + 1 } 
          : x
      ));
    } else {
      setKorzina([...korzina, { ...eda, sany: 1 }]);
    }
  };

  const tastau = () => setKorzina([]);
  const barligi = korzina.reduce((sum, x) => sum + x.sany, 0);
  const summa = korzina.reduce((sum, x) => sum + Number(x.price) * x.sany, 0);

  return (
    <Router>
      <div className="App">
        <Header sany={barligi} />

        <AppRoute 
          adding={qosu} 
          list={korzina} 
          clear={tastau} 
          summar={summa} 
        />

        <Footer />
      </div>
    </Router>
  );
}

export default App;
