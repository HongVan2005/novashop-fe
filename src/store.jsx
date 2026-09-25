import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_PRODUCTS, readStorage } from "./data";

const KEYS = {
  products: "novashop_products",
  cart: "novashop_cart",
  orders: "novashop_orders",
  admin: "novashop_admin",
  users: "novashop_users",
  currentUser: "novashop_current_user"
};

const DEMO_USERS = [
  { id: "u-demo", name: "Khách hàng Demo", email: "customer@novashop.vn", phone: "0900000000", password: "123456", status: "active", createdAt: new Date().toISOString() }
];

const StoreContext = createContext(null);

export function StoreProvider({ children }) {
  const [products, setProducts] = useState(() => readStorage(KEYS.products, DEFAULT_PRODUCTS));
  const [cart, setCart] = useState(() => readStorage(KEYS.cart, []));
  const [orders, setOrders] = useState(() => readStorage(KEYS.orders, []));
  const [admin, setAdmin] = useState(() => readStorage(KEYS.admin, false));
  const [users, setUsers] = useState(() => readStorage(KEYS.users, DEMO_USERS));
  const [currentUser, setCurrentUser] = useState(() => readStorage(KEYS.currentUser, null));

  useEffect(() => localStorage.setItem(KEYS.products, JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem(KEYS.cart, JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem(KEYS.orders, JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem(KEYS.admin, JSON.stringify(admin)), [admin]);
  useEffect(() => localStorage.setItem(KEYS.users, JSON.stringify(users)), [users]);
  useEffect(() => {
    if (currentUser) localStorage.setItem(KEYS.currentUser, JSON.stringify(currentUser));
    else localStorage.removeItem(KEYS.currentUser);
  }, [currentUser]);

  const cartItems = useMemo(
    () => cart.map((item) => ({ ...item, product: products.find((p) => p.id === item.productId) })).filter((x) => x.product),
    [cart, products]
  );
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  const addToCart = (productId, quantity = 1) => setCart(current => {
    const existing = current.find(i => i.productId === productId);
    return existing
      ? current.map(i => i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i)
      : [...current, { productId, quantity }];
  });
  const updateCart = (productId, quantity) => setCart(current =>
    quantity <= 0 ? current.filter(i => i.productId !== productId)
      : current.map(i => i.productId === productId ? { ...i, quantity } : i)
  );
  const clearCart = () => setCart([]);

  const register = ({ name, email, phone, password }) => {
    const normalized = email.trim().toLowerCase();
    if (users.some(u => u.email === normalized)) return { ok: false, message: "Email đã được đăng ký." };
    const user = { id: `u-${Date.now()}`, name: name.trim(), email: normalized, phone: phone.trim(), password, status: "active", createdAt: new Date().toISOString() };
    setUsers(current => [user, ...current]);
    setCurrentUser(user);
    return { ok: true, user };
  };

  const loginCustomer = (email, password) => {
    const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
    if (!user || user.password !== password) return { ok: false, message: "Email hoặc mật khẩu không đúng." };
    if (user.status !== "active") return { ok: false, message: "Tài khoản đang bị khóa. Vui lòng liên hệ cửa hàng." };
    setCurrentUser(user);
    return { ok: true, user };
  };
  const logoutCustomer = () => setCurrentUser(null);

  const updateUser = (id, patch) => {
    setUsers(current => current.map(u => u.id === id ? { ...u, ...patch } : u));
    if (currentUser?.id === id) setCurrentUser(u => ({ ...u, ...patch }));
  };
  const deleteUser = (id) => {
    if (currentUser?.id === id) setCurrentUser(null);
    setUsers(current => current.filter(u => u.id !== id));
  };
  const toggleUserStatus = id => {
    const user = users.find(u => u.id === id);
    if (user) updateUser(id, { status: user.status === "active" ? "blocked" : "active" });
  };

  const createOrder = (customer) => {
    const order = {
      id: `NS-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      customer: { ...customer, userId: currentUser?.id || null, email: currentUser?.email || customer.email || "" },
      items: cartItems.map(({ product, quantity }) => ({ productId: product.id, name: product.name, price: product.price, quantity, image: product.image })),
      total: cartTotal,
      status: "Chờ xác nhận"
    };
    setOrders(current => [order, ...current]);
    clearCart();
    return order;
  };

  const addProduct = product => setProducts(current => [{ ...product, id: `p-${Date.now()}` }, ...current]);
  const updateProduct = (id, patch) => setProducts(current => current.map(p => p.id === id ? { ...p, ...patch } : p));
  const deleteProduct = id => {
    setProducts(current => current.filter(p => p.id !== id));
    setCart(current => current.filter(i => i.productId !== id));
  };
  const updateOrderStatus = (id, status) => setOrders(current => current.map(o => o.id === id ? { ...o, status } : o));
  const resetDemoData = () => {
    setProducts(DEFAULT_PRODUCTS); setCart([]); setOrders([]); setUsers(DEMO_USERS); setCurrentUser(null);
  };

  const value = {
    products, cart, cartItems, cartCount, cartTotal, orders, admin, users, currentUser,
    loginAdmin: () => setAdmin(true), logoutAdmin: () => setAdmin(false),
    register, loginCustomer, logoutCustomer, updateUser, deleteUser, toggleUserStatus,
    addToCart, updateCart, clearCart, createOrder,
    addProduct, updateProduct, deleteProduct, updateOrderStatus, resetDemoData
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}
export function useStore() { return useContext(StoreContext); }
