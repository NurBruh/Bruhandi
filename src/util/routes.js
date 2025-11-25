import MainPage from '../components/pages/MainPage';
import BurgersPage from '../components/pages/BurgersPage';
import CartPage from '../components/pages/CartPage';
import BurgerDetailPage from '../components/pages/BurgerDetailPage';
import DrinksPage from '../components/pages/DrinksPage';
import DrinkDetailPage from '../components/pages/DrinkDetailPage';
import AuthForm from '../components/pages/AuthForm';
import { 
    MAIN_PAGE_ROUTE, 
    BURGERS_PAGE_ROUTE, 
    BURGER_DETAIL_PAGE, 
    CART_PAGE_ROUTE, 
    DRINKS_PAGE_ROUTE, 
    DRINK_DETAIL_PAGE,
    LOGIN_PAGE_ROUTE,
    REGISTER_PAGE_ROUTE 
} from './consts';

export const routes = [
    { path: MAIN_PAGE_ROUTE, element: MainPage },
    { path: BURGERS_PAGE_ROUTE, element: BurgersPage },
    { path: BURGER_DETAIL_PAGE, element: BurgerDetailPage },
    { path: CART_PAGE_ROUTE, element: CartPage },
    { path: DRINKS_PAGE_ROUTE, element: DrinksPage },
    { path: DRINK_DETAIL_PAGE, element: DrinkDetailPage },
    { path: LOGIN_PAGE_ROUTE, element: AuthForm, props: { mode: 'login' } },
    { path: REGISTER_PAGE_ROUTE, element: AuthForm, props: { mode: 'register' } },
];
