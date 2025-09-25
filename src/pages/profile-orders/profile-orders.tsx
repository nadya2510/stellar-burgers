import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import { selectOrderList } from '@selectors';
import { fetchOrdersList } from '@slices';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersList());
  }, []);

  const orders = useSelector<TOrder[]>(selectOrderList);

  return <ProfileOrdersUI orders={orders} />;
};
