import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';

import { useSelector } from '@store';
import {
  selectOrderList,
  selectOrderTotal,
  selectOrderTotalToday,
  selectOrderRequest,
  selectOrderError
} from '@selectors';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const orders = useSelector<TOrder[]>(selectOrderList);
  const total = useSelector<number>(selectOrderTotal);
  const totalToday = useSelector<number>(selectOrderTotalToday);
  const isLoad = useSelector<boolean>(selectOrderRequest);
  const error = useSelector<string | null>(selectOrderError);
  const feed = {
    orders: orders,
    total: total,
    totalToday: totalToday,
    isLoading: isLoad,
    error: error
  };

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');
  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
