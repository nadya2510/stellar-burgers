import {
  ConstructorPage,
  NotFound404,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders
} from '@pages';
import '../../index.css';
import styles from './app.module.css';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import {
  AppHeader,
  Modal,
  IngredientDetails,
  OrderInfo,
  Protected
} from '@components';
import { fetchGetIngredients, checkUserAuth } from '@slices';
import { selectIsLoading } from '@selectors';
import { useSelector, useDispatch } from '@store';
import { useEffect } from 'react';
import { Preloader } from '@ui';

export const App = () => {
  const dispatch = useDispatch();
  const isIngredientsLoading = useSelector<boolean>(selectIsLoading);

  useEffect(() => {
    dispatch(fetchGetIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, []);

  const location = useLocation();
  const background = location.state?.background;
  const navigate = useNavigate();
  const onCloseModal = () => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <Routes location={background || location}>
          <Route path='*' element={<NotFound404 />} />
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/ingredients/:id' element={<IngredientDetails />} />
          <Route path='/feed' element={<Feed />} />
          <Route path='/feed/:number' element={<OrderInfo />} />
          <Route
            path='/login'
            element={<Protected onlyUnAuth component={<Login />} />}
          />
          <Route
            path='/register'
            element={<Protected onlyUnAuth component={<Register />} />}
          />
          <Route
            path='/forgot-password'
            element={<Protected onlyUnAuth component={<ForgotPassword />} />}
          />
          <Route
            path='/reset-password'
            element={<Protected onlyUnAuth component={<ResetPassword />} />}
          />
          <Route
            path='/profile'
            element={<Protected component={<Profile />} />}
          />
          <Route
            path='/profile/orders'
            element={<Protected component={<ProfileOrders />} />}
          />
          <Route
            path='/profile/orders/:number'
            element={<Protected component={<OrderInfo />} />}
          />
        </Routes>
      )}
      {background && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal
                title={'Детали ингредиента'}
                onClose={onCloseModal}
                children={<IngredientDetails />}
              />
            }
          />
          <Route
            path='/feed/:number'
            element={
              <Modal title='' onClose={onCloseModal} children={<OrderInfo />} />
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal title='' onClose={onCloseModal} children={<OrderInfo />} />
            }
          />
        </Routes>
      )}
    </div>
  );
};
export default App;
