import { clearOrdert, initialStateOrder } from './orderSlice';
import {
  fetchBurgerOrder,
  fetchOrdersListAll,
  fetchOrdersList,
  fetchOrderByNumber
} from './actions';
import reducer from './orderSlice';
import { expect, test, jest } from '@jest/globals';
import { orderData, mockOrderData } from './orderData';

describe('Проверка слайса orderSlice', () => {
  test('очистка информации о заказе', () => {
    const initialState = {
      isLoad: false,
      orderData: mockOrderData.order,
      orderList: [],
      total: 0,
      totalToday: 0,
      error: null
    };

    const store = reducer(initialState, clearOrdert());

    const received = store.orderData;
    expect(received).toEqual(null);
  });
  //-----fetchBurgerOrder
  test('экшен будет отправлен перед вызовом асинхронной функции fetchBurgerOrder', () => {
    const store = reducer(
      initialStateOrder,
      fetchBurgerOrder.pending('', mockOrderData.order.ingredients)
    );

    expect(true).toBe(store.isLoad);
  });

  test('асинхронная функция завершится без ошибки fetchBurgerOrder', () => {
    const store = reducer(
      initialStateOrder,
      fetchBurgerOrder.fulfilled(
        mockOrderData,
        '',
        mockOrderData.order.ingredients
      )
    );

    expect(false).toBe(store.isLoad);
    expect(mockOrderData.order).toEqual(store.orderData);
  });

  test('асинхронная функция завершится с ошибкой fetchBurgerOrder', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialStateOrder,
      fetchBurgerOrder.rejected(error, '', mockOrderData.order.ingredients)
    );

    expect(false).toBe(store.isLoad);
    expect(error.message).toEqual(store.error);
  });
  //-----fetchOrdersListAll
  test('экшен будет отправлен перед вызовом асинхронной функции fetchOrdersListAll', () => {
    const store = reducer(initialStateOrder, fetchOrdersListAll.pending(''));

    expect(true).toBe(store.isLoad);
  });

  test('асинхронная функция завершится без ошибки fetchOrdersListAll', () => {
    const store = reducer(
      initialStateOrder,
      fetchOrdersListAll.fulfilled(orderData, '')
    );

    expect(false).toBe(store.isLoad);
    expect(orderData.orders).toEqual(store.orderList);
    expect(orderData.total).toEqual(store.total);
    expect(orderData.totalToday).toEqual(store.totalToday);
  });

  test('асинхронная функция завершится с ошибкой fetchOrdersListAll', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialStateOrder,
      fetchOrdersListAll.rejected(error, '')
    );

    expect(false).toBe(store.isLoad);
    expect(error.message).toEqual(store.error);
  });
  //-----fetchOrdersList
  test('экшен будет отправлен перед вызовом асинхронной функции fetchOrdersList', () => {
    const store = reducer(initialStateOrder, fetchOrdersList.pending(''));

    expect(true).toBe(store.isLoad);
  });

  test('асинхронная функция завершится без ошибки fetchOrdersList', () => {
    const store = reducer(
      initialStateOrder,
      fetchOrdersList.fulfilled([mockOrderData.order], '')
    );

    expect(false).toBe(store.isLoad);
    expect([mockOrderData.order]).toEqual(store.orderList);
  });

  test('асинхронная функция завершится с ошибкой fetchOrdersList', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialStateOrder,
      fetchOrdersList.rejected(error, '')
    );

    expect(false).toBe(store.isLoad);
    expect(error.message).toEqual(store.error);
  });
  //-----fetchOrderByNumber
  test('экшен будет отправлен перед вызовом асинхронной функции fetchOrderByNumber', () => {
    const store = reducer(
      initialStateOrder,
      fetchOrderByNumber.pending('', mockOrderData.order.number)
    );

    expect(true).toBe(store.isLoad);
  });

  test('асинхронная функция завершится без ошибки fetchOrderByNumber', () => {
    const receivedOrder = orderData.orders.filter(
      (order) => order.number === mockOrderData.order.number
    );
    const store = reducer(
      initialStateOrder,
      fetchOrderByNumber.fulfilled(
        { ...orderData, orders: receivedOrder },
        '',
        mockOrderData.order.number
      )
    );

    expect(false).toBe(store.isLoad);
    expect(receivedOrder[0]).toEqual(store.orderData);
  });

  test('асинхронная функция завершится с ошибкой fetchOrderByNumber', () => {
    const error = new Error('error_message');
    const store = reducer(
      initialStateOrder,
      fetchOrderByNumber.rejected(error, '', mockOrderData.order.number)
    );

    expect(false).toBe(store.isLoad);
    expect(error.message).toEqual(store.error);
  });
});
