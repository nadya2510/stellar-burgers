import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '@store';
import { selectOrderList } from '@selectors';
import { fetchOrdersListAll } from '@slices';

export const Feed: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrdersListAll());
  }, []);

  const orders = useSelector<TOrder[]>(selectOrderList);

  if (!orders.length) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => {
        dispatch(fetchOrdersListAll());
      }}
    />
  );
};
