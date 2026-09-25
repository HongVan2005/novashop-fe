export const DEFAULT_PRODUCTS = [
  {
    id: "p1",
    name: "Áo thun Essential Premium",
    category: "Thời trang",
    price: 349000,
    oldPrice: 429000,
    rating: 4.9,
    stock: 42,
    tag: "Bán chạy",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",
    description: "Áo thun cotton premium form regular, mềm nhẹ và dễ phối đồ hằng ngày."
  },
  {
    id: "p2",
    name: "Sneaker Urban Runner",
    category: "Giày dép",
    price: 1290000,
    oldPrice: 1590000,
    rating: 4.8,
    stock: 25,
    tag: "Hot",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
    description: "Sneaker phong cách đô thị với đế êm, thiết kế tối giản và dễ phối."
  },
  {
    id: "p3",
    name: "Tai nghe AirBeat Pro",
    category: "Điện tử",
    price: 1890000,
    oldPrice: 2290000,
    rating: 4.8,
    stock: 18,
    tag: "Mới",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85",
    description: "Tai nghe không dây chống ồn chủ động, âm thanh cân bằng và pin dài."
  },
  {
    id: "p4",
    name: "Đồng hồ Minimal Steel",
    category: "Phụ kiện",
    price: 1590000,
    oldPrice: 1890000,
    rating: 4.7,
    stock: 14,
    tag: "Limited",
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=900&q=85",
    description: "Đồng hồ dây thép phong cách tối giản, phù hợp cả đi làm lẫn đi chơi."
  },
  {
    id: "p5",
    name: "Balo Daily Canvas",
    category: "Phụ kiện",
    price: 690000,
    oldPrice: 790000,
    rating: 4.7,
    stock: 31,
    tag: "Ưa thích",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=85",
    description: "Balo canvas nhiều ngăn, đựng laptop và vật dụng cá nhân tiện lợi."
  },
  {
    id: "p6",
    name: "Kính mát Classic Frame",
    category: "Phụ kiện",
    price: 490000,
    oldPrice: 590000,
    rating: 4.6,
    stock: 36,
    tag: "Sale",
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=900&q=85",
    description: "Kính mát gọng classic, thiết kế thanh lịch cho những ngày nắng."
  },
  {
    id: "p7",
    name: "Loa Bluetooth Pulse Mini",
    category: "Điện tử",
    price: 990000,
    oldPrice: 1190000,
    rating: 4.8,
    stock: 22,
    tag: "Bán chạy",
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=900&q=85",
    description: "Loa Bluetooth nhỏ gọn, âm thanh mạnh và thời lượng pin phù hợp mang đi."
  },
  {
    id: "p8",
    name: "Áo khoác Daily Bomber",
    category: "Thời trang",
    price: 1190000,
    oldPrice: 1490000,
    rating: 4.9,
    stock: 12,
    tag: "Mới",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=900&q=85",
    description: "Bomber dáng hiện đại, chất liệu nhẹ và giữ form tốt."
  }
];

export const formatVND = (value) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(value);

export const readStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};