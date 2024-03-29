import App from '@/app';
import AuthRoute from '@routes/auth.route';
import IndexRoute from '@routes/index.route';
import UsersRoute from '@routes/users.route';
import validateEnv from '@utils/validateEnv';
import CartRoute from './routes/cart.route';
import CategoriesRoute from './routes/category.route';
import ProductsRoute from './routes/product.route';
import ShippingMethodsRoute from './routes/shipping-methods.route';
import ShoppingListItemsRoute from './routes/shopping-list-item.route';
import ShoppingListsRoute from './routes/shopping-list.route';
import TagsRoute from './routes/tag.route';
import UserLocationRoute from './routes/user-locations.route';
import UserProductsRoute from './routes/user-products.route';

validateEnv();

const app = new App([
  new IndexRoute(),
  new UsersRoute(),
  new AuthRoute(),
  new ProductsRoute(),
  new TagsRoute(),
  new CategoriesRoute(),
  new ShoppingListsRoute(),
  new ShoppingListItemsRoute(),
  new ShippingMethodsRoute(),
  new CartRoute(),
  new UserLocationRoute(),
  new UserProductsRoute(),
]);

app.listen();
