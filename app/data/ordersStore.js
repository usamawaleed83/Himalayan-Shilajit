// Shared in-memory storage for orders
// This is used by both the orders API routes
let orders = [];

export const getOrders = () => orders;

export const addOrder = (order) => {
  orders.push(order);
  return order;
};

export const getOrderByNumber = (orderNumber) => {
  return orders.find(o => o.orderNumber === orderNumber);
};

export const updateOrder = (orderNumber, updates) => {
  const index = orders.findIndex(o => o.orderNumber === orderNumber);
  if (index !== -1) {
    orders[index] = { ...orders[index], ...updates, updatedAt: new Date() };
    return orders[index];
  }
  return null;
};

export const deleteOrder = (orderNumber) => {
  const index = orders.findIndex(o => o.orderNumber === orderNumber);
  if (index !== -1) {
    orders.splice(index, 1);
    return true;
  }
  return false;
};
