import { FC, useMemo } from 'react';
import {
  TConstructorIngredient,
  TConstructorItems,
  TOrder
} from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '@store';
import {
  selectConstructorItems,
  selectOrderRequest,
  selectOrderModalData,
  selectUser
} from '@selectors';
import { fetchBurgerOrder, clearConstructorOrdert, clearOrdert } from '@slices';
import { useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector<TConstructorItems>(
    selectConstructorItems
  );
  const orderRequest = useSelector<boolean>(selectOrderRequest);
  const orderModalData = useSelector<TOrder | null>(selectOrderModalData);
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    if (!user) {
      return navigate('/login');
    }

    const dataOrder = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(fetchBurgerOrder(dataOrder));
  };

  const closeOrderModal = () => {
    dispatch(clearOrdert());
    dispatch(clearConstructorOrdert());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
