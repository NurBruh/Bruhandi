import BurgersPage from '../components/pages/BurgersPage';
import CartPage from '../components/pages/CartPage';
import BurgerDetailPage from '../components/pages/BurgerDetailPage';
import DrinksPage from '../components/pages/DrinksPage';
import DrinkDetailPage from '../components/pages/DrinkDetailPage';
import { BURGERS_PAGE_ROUTE, BURGER_DETAIL_PAGE, CART_PAGE_ROUTE, DRINKS_PAGE_ROUTE, DRINK_DETAIL_PAGE } from './consts';

export const routes = [
    { path: BURGERS_PAGE_ROUTE, element: BurgersPage },
    { path: BURGER_DETAIL_PAGE, element: BurgerDetailPage },
    { path: CART_PAGE_ROUTE, element: CartPage },
    { path: DRINKS_PAGE_ROUTE, element: DrinksPage },
    { path: DRINK_DETAIL_PAGE, element: DrinkDetailPage },
];
