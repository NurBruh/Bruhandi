import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { routes } from './routes';

const AppRoute = ({ adding, list, clear, summar }) => {
  return (
    <Routes>
      {routes.map((route, index) => {
        const Component = route.element;
        return (
          <Route 
            key={index}
            path={route.path}
            element={<Component adding={adding} list={list} clear={clear} summar={summar} />} 
          />
        );
      })}
    </Routes>
  );
};

export default AppRoute;
