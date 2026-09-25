import React, { useEffect, useState } from "react";

import { Link, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";

import {

  ArrowLeft, ArrowRight, BarChart3, Check, ChevronDown, CircleUserRound, ClipboardList,

  Eye, Heart, LayoutDashboard, LogOut, Menu, Package, Pencil, Plus, Search, Settings,

  ShoppingBag, ShoppingCart, Star, Trash2, Truck, Users, X

} from "lucide-react";

import { formatVND } from "./data";

import { useStore } from "./store";



function useToast() {

  const [message, setMessage] = useState("");

  const show = (text) => {

    setMessage(text);

    window.clearTimeout(window.__novaToast);

    window.__novaToast = window.setTimeout(() => setMessage(""), 2200);

  };

  return { message, show };

}



function Toast({ message }) {

  if (!message) return null;

  return <div className="toast"><Check size={18}/>{message}</div>;

}



function Logo() {

  return <Link to="/" className="logo">NOVA<span>SHOP</span></Link>;

}



function ShopHeader() {

  const { cartCount } = useStore();

  const [open, setOpen] = useState(false);

  const location = useLocation();

  return (

    <header className="shop-header">

      <Logo />

      <nav className={open ? "mobile-nav open" : "mobile-nav"}>

        <Link className={location.pathname === "/" ? "active" : ""} to="/">Trang chủ</Link>

        <Link className={location.pathname.startsWith("/products") ? "active" : ""} to="/products">Sản phẩm</Link>

        <Link className={location.pathname === "/best-selling" ? "active" : ""} to="/best-selling" onClick={() => setOpen(false)}>Bán chạy</Link>

        <Link className={location.pathname === "/about" ? "active" : ""} to="/about" onClick={() => setOpen(false)}>Về NovaShop</Link>

      </nav>

      <div className="header-tools">

        <Link className="header-icon" to="/products"><Search size={19}/></Link>

        <Link className="header-icon account-link" to="/account"><CircleUserRound size={19}/></Link>

        <Link className="header-icon" to="/cart"><ShoppingCart size={19}/><b>{cartCount}</b></Link>

        <button className="menu-btn" onClick={() => setOpen(!open)}><Menu size={20}/></button>

      </div>

    </header>

  );

}



function ProductCard({ product, onAdded }) {

  const { addToCart } = useStore();

  return (

    <article className="product-card">

      <Link to={`/products/${product.id}`} className="product-image">

        {product.tag && <span className="pill">{product.tag}</span>}

        <button className="heart" onClick={(e) => e.preventDefault()} aria-label="Yêu thích"><Heart size={18}/></button>

        <img src={product.image} alt={product.name} />

      </Link>

      <div className="product-body">

        <div className="product-meta"><span>{product.category}</span><span><Star size={13} fill="currentColor"/> {product.rating}</span></div>

        <Link to={`/products/${product.id}`}><h3>{product.name}</h3></Link>

        <div className="price-row"><strong>{formatVND(product.price)}</strong>{product.oldPrice && <del>{formatVND(product.oldPrice)}</del>}</div>

        <button className="add-btn" onClick={() => { addToCart(product.id); onAdded?.(); }}><Plus size={17}/> Thêm vào giỏ</button>

      </div>

    </article>

  );

}



function ShopFooter() {

  return <footer id="about" className="footer">

    <div><Logo/><p>Thương mại điện tử hiện đại, đơn giản và dễ sử dụng.</p></div>

    <div><b>Khám phá</b><Link to="/products">Tất cả sản phẩm</Link><Link to="/best-selling">Bán chạy</Link><Link to="/about">Về NovaShop</Link><Link to="/cart">Giỏ hàng</Link></div>

    <div><b>Hỗ trợ</b><span>Hotline: 1900 0000</span><span>Email: hello@novashop.vn</span></div>

    <div><b>Thanh toán</b><span>COD · Chuyển khoản</span><span>Bảo mật thông tin</span></div>

  </footer>;

}



function Home() {

  const { products } = useStore();

  const { message, show } = useToast();

  const featured = products.slice(0, 4);

  return <div><ShopHeader/>

    <section className="hero">

      <div className="hero-copy">

        <span className="eyebrow">BỘ SƯU TẬP MỚI · 2026</span>

        <h1>Mua sắm <em>thông minh</em>, sống thật chất.</h1>

        <p>Những sản phẩm được chọn lọc cho phong cách sống hiện đại. Giá tốt, giao nhanh, trải nghiệm đơn giản.</p>

        <div className="hero-actions"><Link className="btn primary" to="/products">Khám phá sản phẩm <ArrowRight size={18}/></Link><Link className="text-link" to="/best-selling">Xem bán chạy</Link></div>

        <div className="hero-trust"><span><Check size={15}/> Đổi trả 7 ngày</span><span><Truck size={15}/> Giao hàng toàn quốc</span></div>

      </div>

      <div className="hero-visual">

        <div className="hero-orbit"></div>

        <img src={products[1]?.image} alt="Sản phẩm nổi bật"/>

        <div className="hero-badge"><Star size={14} fill="currentColor"/> 4.9/5<br/><small>Khách hàng đánh giá</small></div>

      </div>

    </section>

    <section className="benefits">

      <div><Truck/><b>Giao hàng nhanh</b><span>Toàn quốc 2–5 ngày</span></div>

      <div><Check/><b>Đổi trả dễ dàng</b><span>Trong vòng 7 ngày</span></div>

      <div><ShoppingBag/><b>Sản phẩm chính hãng</b><span>Kiểm tra trước khi nhận</span></div>

      <div><CircleUserRound/><b>Hỗ trợ tận tâm</b><span>09:00–22:00 mỗi ngày</span></div>

    </section>

    <section id="featured" className="section">

      <div className="section-heading"><div><span className="eyebrow">ĐƯỢC YÊU THÍCH</span><h2>Sản phẩm nổi bật</h2></div><Link className="text-link" to="/products">Xem tất cả <ArrowRight size={16}/></Link></div>

      <div className="product-grid">{featured.map(p => <ProductCard key={p.id} product={p} onAdded={() => show("Đã thêm sản phẩm vào giỏ")}/>)}</div>

    </section>

    <section className="promo">

      <div><span className="eyebrow">ƯU ĐÃI HÔM NAY</span><h2>Giảm đến 30%<br/><em>cho sản phẩm chọn lọc</em></h2><p>Miễn phí giao hàng cho đơn từ 500.000đ.</p><Link className="btn light" to="/products">Mua ngay <ArrowRight size={17}/></Link></div>

      <div className="promo-circle"><ShoppingBag size={100}/></div>

    </section>

    <ShopFooter/><Toast message={message}/>

  </div>;

}



function BestSelling() {
  const { products } = useStore();
  const { message, show } = useToast();

  const bestSelling = [...products].sort((a, b) => {
    const ratingA = Number(a.rating || 0);
    const ratingB = Number(b.rating || 0);
    if (ratingB !== ratingA) return ratingB - ratingA;
    return Number(b.stock || 0) - Number(a.stock || 0);
  });

  return <div><ShopHeader />
    <section className="catalog-head">
      <span className="eyebrow">ĐƯỢC KHÁCH HÀNG YÊU THÍCH</span>
      <h1>Sản phẩm bán chạy</h1>
      <p>Khám phá những sản phẩm nổi bật được NovaShop tuyển chọn dựa trên mức độ yêu thích và đánh giá của khách hàng.</p>
    </section>

    <main className="section catalog">
      <div className="section-heading">
        <div>
          <span className="eyebrow">TOP SẢN PHẨM</span>
          <h2>Được yêu thích nhất</h2>
        </div>
        <Link className="text-link" to="/products">Xem tất cả sản phẩm <ArrowRight size={16}/></Link>
      </div>

      <div className="product-grid">
        {bestSelling.map(product => (
          <ProductCard
            key={product.id}
            product={{ ...product, tag: product.tag || "Bán chạy" }}
            onAdded={() => show("Đã thêm sản phẩm vào giỏ")}
          />
        ))}
      </div>

      {!bestSelling.length && (
        <div className="empty-state">
          <Package size={40}/>
          <h3>Chưa có sản phẩm</h3>
          <p>NovaShop hiện chưa có sản phẩm bán chạy.</p>
        </div>
      )}
    </main>

    <ShopFooter />
    <Toast message={message}/>
  </div>;
}


function AboutNovaShop() {
  return <div><ShopHeader />
    <section className="hero">
      <div className="hero-copy">
        <span className="eyebrow">VỀ NOVASHOP</span>
        <h1>Mua sắm <em>đơn giản</em>, trải nghiệm khác biệt.</h1>
        <p>
          NovaShop là mô hình cửa hàng thương mại điện tử hiện đại, tập trung vào
          trải nghiệm mua sắm nhanh, dễ sử dụng và lựa chọn sản phẩm phù hợp với
          phong cách sống hàng ngày.
        </p>
        <div className="hero-actions">
          <Link className="btn primary" to="/products">
            Khám phá sản phẩm <ArrowRight size={18}/>
          </Link>
          <Link className="text-link" to="/best-selling">
            Xem sản phẩm bán chạy
          </Link>
        </div>
        <div className="hero-trust">
          <span><Check size={15}/> Sản phẩm được chọn lọc</span>
          <span><Truck size={15}/> Giao hàng toàn quốc</span>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-orbit"></div>
        <div className="promo-circle">
          <ShoppingBag size={100}/>
        </div>
        <div className="hero-badge">
          <Star size={14} fill="currentColor"/> NOVASHOP<br/>
          <small>Shopping made simple</small>
        </div>
      </div>
    </section>

    <section className="benefits">
      <div>
        <ShoppingBag/>
        <b>Sản phẩm chọn lọc</b>
        <span>Ưu tiên chất lượng và tính tiện dụng</span>
      </div>
      <div>
        <Check/>
        <b>Trải nghiệm đơn giản</b>
        <span>Giao diện dễ dùng trên mọi thiết bị</span>
      </div>
      <div>
        <Truck/>
        <b>Giao hàng toàn quốc</b>
        <span>Đặt hàng nhanh và thuận tiện</span>
      </div>
      <div>
        <CircleUserRound/>
        <b>Hỗ trợ khách hàng</b>
        <span>Đồng hành trong quá trình mua sắm</span>
      </div>
    </section>

    <main className="section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">GIÁ TRỊ CỦA NOVASHOP</span>
          <h2>Chúng tôi tập trung vào điều gì?</h2>
        </div>
      </div>

      <div className="admin-panels">
        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <h2>Đơn giản</h2>
              <p>Giúp khách hàng tìm sản phẩm, xem thông tin và đặt hàng dễ dàng.</p>
            </div>
            <Search size={24}/>
          </div>
        </section>

        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <h2>Hiện đại</h2>
              <p>Thiết kế giao diện sạch, responsive và phù hợp với thói quen mua sắm online.</p>
            </div>
            <ShoppingBag size={24}/>
          </div>
        </section>

        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <h2>Tận tâm</h2>
              <p>Đặt trải nghiệm khách hàng làm trọng tâm trong từng bước mua sắm.</p>
            </div>
            <Heart size={24}/>
          </div>
        </section>

        <section className="admin-panel">
          <div className="panel-head">
            <div>
              <h2>Minh bạch</h2>
              <p>Thông tin sản phẩm, giá bán và đơn hàng được trình bày rõ ràng.</p>
            </div>
            <Check size={24}/>
          </div>
        </section>
      </div>
    </main>

    <section className="promo">
      <div>
        <span className="eyebrow">BẮT ĐẦU MUA SẮM</span>
        <h2>Khám phá NovaShop<br/><em>ngay hôm nay.</em></h2>
        <p>Tìm sản phẩm phù hợp với bạn trong bộ sưu tập của NovaShop.</p>
        <Link className="btn light" to="/products">
          Mua sắm ngay <ArrowRight size={17}/>
        </Link>
      </div>
      <div className="promo-circle"><ShoppingBag size={100}/></div>
    </section>

    <ShopFooter />
  </div>;
}


function Products() {

  const { products } = useStore();

  const { message, show } = useToast();

  const [query, setQuery] = useState("");

  const [category, setCategory] = useState("Tất cả");

  const categories = ["Tất cả", ...new Set(products.map(p => p.category))];

  const filtered = products.filter(p => {

    const matchText = `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query.toLowerCase());

    return matchText && (category === "Tất cả" || p.category === category);

  });

  return <div><ShopHeader/>

    <section className="catalog-head"><span className="eyebrow">CỬA HÀNG NOVASHOP</span><h1>Tất cả sản phẩm</h1><p>Khám phá bộ sưu tập được tuyển chọn cho cuộc sống hiện đại.</p></section>

    <section className="catalog section">

      <div className="filters"><label className="search-box"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Tìm sản phẩm..."/></label>

        <div className="category-filter">{categories.map(c => <button key={c} className={category === c ? "selected" : ""} onClick={() => setCategory(c)}>{c}</button>)}</div>

      </div>

      <div className="catalog-count">{filtered.length} sản phẩm</div>

      <div className="product-grid">{filtered.map(p => <ProductCard key={p.id} product={p} onAdded={() => show("Đã thêm sản phẩm vào giỏ")}/>)}</div>

      {!filtered.length && <div className="empty-state"><Package size={40}/><h3>Không tìm thấy sản phẩm</h3><p>Thử từ khóa hoặc danh mục khác.</p></div>}

    </section>

    <ShopFooter/><Toast message={message}/>

  </div>;

}



function ProductDetail() {

  const { id } = useParams();

  const { products, addToCart } = useStore();

  const navigate = useNavigate();

  const { message, show } = useToast();

  const product = products.find(p => p.id === id);

  const [qty, setQty] = useState(1);

  if (!product) return <><ShopHeader/><div className="empty-state page-empty"><h2>Không tìm thấy sản phẩm</h2><Link className="btn primary" to="/products">Quay lại cửa hàng</Link></div></>;

  return <div><ShopHeader/>

    <main className="detail section">

      <button className="back-link" onClick={() => navigate(-1)}><ArrowLeft size={17}/> Quay lại</button>

      <div className="detail-grid">

        <div className="detail-image"><img src={product.image} alt={product.name}/></div>

        <div className="detail-copy"><span className="eyebrow">{product.category}</span><h1>{product.name}</h1><div className="rating"><Star size={17} fill="currentColor"/> {product.rating} · {product.stock} sản phẩm còn lại</div><div className="detail-price">{formatVND(product.price)} <del>{formatVND(product.oldPrice)}</del></div><p>{product.description}</p>

          <div className="qty-row"><button onClick={() => setQty(Math.max(1, qty - 1))}>−</button><b>{qty}</b><button onClick={() => setQty(qty + 1)}>+</button></div>

          <button className="btn primary wide" onClick={() => { addToCart(product.id, qty); show("Đã thêm vào giỏ hàng"); }}>Thêm vào giỏ <ShoppingCart size={18}/></button>

          <div className="detail-points"><span><Check/> Miễn phí giao từ 500.000đ</span><span><Check/> Đổi trả trong 7 ngày</span><span><Check/> Kiểm tra hàng khi nhận</span></div>

        </div>

      </div>

    </main><ShopFooter/><Toast message={message}/></div>;

}



function Cart() {

  const { cartItems, cartTotal, updateCart } = useStore();

  return <div><ShopHeader/><main className="section cart-page"><span className="eyebrow">GIỎ HÀNG</span><h1>Giỏ hàng của bạn</h1>

    {!cartItems.length ? <div className="empty-state"><ShoppingCart size={42}/><h2>Giỏ hàng đang trống</h2><p>Thêm vài sản phẩm yêu thích để bắt đầu.</p><Link className="btn primary" to="/products">Tiếp tục mua sắm</Link></div> :

    <div className="cart-layout"><div className="cart-list">{cartItems.map(({product, quantity}) => <div className="cart-line" key={product.id}><img src={product.image} alt=""/><div className="cart-line-main"><Link to={`/products/${product.id}`}><b>{product.name}</b></Link><span>{product.category}</span><div className="cart-qty"><button onClick={() => updateCart(product.id, quantity - 1)}>−</button><b>{quantity}</b><button onClick={() => updateCart(product.id, quantity + 1)}>+</button></div></div><strong>{formatVND(product.price * quantity)}</strong><button className="delete-btn" onClick={() => updateCart(product.id, 0)}><Trash2 size={18}/></button></div>)}</div>

      <aside className="summary"><h2>Tóm tắt đơn hàng</h2><div><span>Tạm tính</span><b>{formatVND(cartTotal)}</b></div><div><span>Vận chuyển</span><b>{cartTotal >= 500000 ? "Miễn phí" : formatVND(30000)}</b></div><hr/><div className="total"><span>Tổng cộng</span><b>{formatVND(cartTotal + (cartTotal >= 500000 ? 0 : 30000))}</b></div><Link className="btn primary wide" to="/checkout">Tiến hành thanh toán <ArrowRight size={17}/></Link></aside>

    </div>}

  </main><ShopFooter/></div>;

}



function Checkout() {

  const { cartItems, cartTotal, createOrder } = useStore();

  const navigate = useNavigate();

  const [done, setDone] = useState(null);

  const [form, setForm] = useState({ name: "", phone: "", address: "", note: "" });

  const shipping = cartTotal >= 500000 ? 0 : 30000;

  const submit = (e) => {

    e.preventDefault();

    if (!cartItems.length) return;

    const order = createOrder(form);

    setDone(order);

  };

  if (done) return <div><ShopHeader/><main className="success-page"><div className="success-card"><div className="success-icon"><Check size={35}/></div><span className="eyebrow">ĐẶT HÀNG THÀNH CÔNG</span><h1>Cảm ơn bạn đã mua hàng!</h1><p>Đơn <b>{done.id}</b> đã được lưu. NovaShop sẽ liên hệ để xác nhận đơn hàng.</p><Link className="btn primary" to="/products">Tiếp tục mua sắm <ArrowRight size={17}/></Link></div></main><ShopFooter/></div>;

  if (!cartItems.length) return <><ShopHeader/><div className="empty-state page-empty"><ShoppingCart size={42}/><h2>Chưa có sản phẩm để thanh toán</h2><Link className="btn primary" to="/products">Đi tới cửa hàng</Link></div></>;

  return <div><ShopHeader/><main className="section checkout-page"><span className="eyebrow">THANH TOÁN</span><h1>Hoàn tất đơn hàng</h1><div className="checkout-layout">

    <form className="checkout-form" onSubmit={submit}><h2>Thông tin người nhận</h2><div className="form-grid"><label>Họ và tên<input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Nguyễn Văn A"/></label><label>Số điện thoại<input required pattern="[0-9]{9,11}" value={form.phone} onChange={e => setForm({...form,phone:e.target.value})} placeholder="0901234567"/></label></div><label>Địa chỉ nhận hàng<input required value={form.address} onChange={e => setForm({...form,address:e.target.value})} placeholder="Số nhà, đường, phường/xã, tỉnh/thành"/></label><label>Ghi chú đơn hàng<textarea value={form.note} onChange={e => setForm({...form,note:e.target.value})} placeholder="Giao giờ hành chính..."/></label><div className="payment-box"><b>Phương thức thanh toán</b><label className="radio"><input type="radio" checked readOnly/> Thanh toán khi nhận hàng (COD)</label></div><button className="btn primary wide" type="submit">Đặt hàng · {formatVND(cartTotal + shipping)}</button></form>

    <aside className="summary checkout-summary"><h2>Đơn hàng</h2>{cartItems.map(({product,quantity}) => <div className="mini-order" key={product.id}><img src={product.image} alt=""/><span><b>{product.name}</b><small>x{quantity}</small></span><strong>{formatVND(product.price*quantity)}</strong></div>)}<hr/><div><span>Tạm tính</span><b>{formatVND(cartTotal)}</b></div><div><span>Vận chuyển</span><b>{shipping ? formatVND(shipping) : "Miễn phí"}</b></div><div className="total"><span>Tổng cộng</span><b>{formatVND(cartTotal+shipping)}</b></div></aside>

  </div></main><ShopFooter/></div>;

}





function CustomerLogin() {

  const { currentUser, loginCustomer } = useStore();

  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });

  const [error, setError] = useState("");

  if (currentUser) return <Navigate to="/account" replace/>;

  const submit = e => {

    e.preventDefault();

    const result = loginCustomer(form.email, form.password);

    if (result.ok) navigate("/account");

    else setError(result.message);

  };

  return <div className="admin-auth"><div className="admin-auth-card">

    <Logo/><div className="admin-lock"><CircleUserRound size={25}/></div>

    <h1>Đăng nhập khách hàng</h1><p>Đăng nhập để quản lý tài khoản và theo dõi đơn hàng.</p>

    <form onSubmit={submit}><label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="you@example.com"/></label>

    <label>Mật khẩu<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})} placeholder="••••••••"/></label>

    {error && <div className="form-error">{error}</div>}

    <button className="btn primary wide">Đăng nhập <ArrowRight size={17}/></button></form>

    <p className="auth-switch">Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link></p>

    <div className="demo">Demo: <b>customer@novashop.vn</b> / <b>123456</b></div>

    <Link className="back-link center" to="/"><ArrowLeft size={15}/> Về cửa hàng</Link>

  </div></div>;

}



function CustomerRegister() {

  const { currentUser, register } = useStore();

  const navigate = useNavigate();

  const [form, setForm] = useState({name:"",email:"",phone:"",password:"",confirm:""});

  const [error,setError]=useState("");

  if (currentUser) return <Navigate to="/account" replace/>;

  const submit=e=>{

    e.preventDefault();

    if(form.password.length<6) return setError("Mật khẩu phải có ít nhất 6 ký tự.");

    if(form.password!==form.confirm) return setError("Mật khẩu xác nhận không khớp.");

    const result=register(form);

    if(result.ok) navigate("/account"); else setError(result.message);

  };

  return <div className="admin-auth"><div className="admin-auth-card">

    <Logo/><div className="admin-lock"><Plus size={25}/></div><h1>Tạo tài khoản</h1><p>Đăng ký tài khoản NovaShop trong vài bước.</p>

    <form onSubmit={submit}><label>Họ và tên<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label>

    <label>Email<input type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></label>

    <label>Số điện thoại<input required pattern="[0-9]{9,11}" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label>

    <div className="form-grid"><label>Mật khẩu<input type="password" required value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/></label><label>Nhập lại<input type="password" required value={form.confirm} onChange={e=>setForm({...form,confirm:e.target.value})}/></label></div>

    {error&&<div className="form-error">{error}</div>}<button className="btn primary wide">Đăng ký <ArrowRight size={17}/></button></form>

    <p className="auth-switch">Đã có tài khoản? <Link to="/login">Đăng nhập</Link></p><Link className="back-link center" to="/"><ArrowLeft size={15}/> Về cửa hàng</Link>

  </div></div>;

}



function CustomerAccount() {

  const { currentUser, logoutCustomer, orders, updateUser } = useStore();

  const navigate=useNavigate();

  const [editing,setEditing]=useState(false);

  const [form,setForm]=useState(currentUser||{});

  if(!currentUser) return <Navigate to="/login" replace/>;

  const myOrders=orders.filter(o=>o.customer.userId===currentUser.id);

  const save=e=>{e.preventDefault();updateUser(currentUser.id,{name:form.name,phone:form.phone});setEditing(false);};

  return <div><ShopHeader/><main className="section account-page"><div className="account-head"><div><span className="eyebrow">TÀI KHOẢN CỦA BẠN</span><h1>Xin chào, {currentUser.name}</h1><p>{currentUser.email}</p></div><button className="btn ghost" onClick={()=>{logoutCustomer();navigate("/")}}><LogOut size={17}/> Đăng xuất</button></div>

    <div className="account-grid"><section className="admin-panel"><div className="panel-head"><div><h2>Thông tin cá nhân</h2><p>Quản lý thông tin tài khoản của bạn.</p></div><button className="btn ghost" onClick={()=>setEditing(!editing)}><Pencil size={16}/> Chỉnh sửa</button></div>

    {editing?<form onSubmit={save}><div className="form-grid"><label>Họ và tên<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label>Số điện thoại<input required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></label></div><div className="modal-actions"><button type="button" className="btn ghost" onClick={()=>setEditing(false)}>Hủy</button><button className="btn primary">Lưu thay đổi</button></div></form>:<div className="profile-list"><span><b>Họ tên</b>{currentUser.name}</span><span><b>Email</b>{currentUser.email}</span><span><b>Số điện thoại</b>{currentUser.phone}</span></div>}

    </section><section className="admin-panel"><div className="panel-head"><div><h2>Đơn hàng của tôi</h2><p>{myOrders.length} đơn hàng</p></div><Link className="text-link" to="/products">Mua sắm <ArrowRight size={15}/></Link></div>

    {myOrders.map(o=><div className="admin-order-row" key={o.id}><div className="order-id">{o.id}</div><div><b>{o.items.length} sản phẩm</b><span>{new Date(o.createdAt).toLocaleDateString("vi-VN")}</span></div><strong>{formatVND(o.total)}</strong><span className="status">{o.status}</span></div>)}{!myOrders.length&&<div className="admin-empty">Bạn chưa có đơn hàng nào.</div>}</section></div>

  </main><ShopFooter/></div>;

}



function AdminLogin() {

  const { admin, loginAdmin } = useStore();

  const navigate = useNavigate();

  const [username, setUsername] = useState("admin");

  const [password, setPassword] = useState("123456");

  const [error, setError] = useState("");

  if (admin) return <Navigate to="/admin" replace/>;

  const submit = e => { e.preventDefault(); if (username === "admin" && password === "123456") { loginAdmin(); navigate("/admin"); } else setError("Tài khoản hoặc mật khẩu không đúng."); };

  return <div className="admin-auth"><div className="admin-auth-card"><Link to="/" className="logo">NOVA<span>SHOP</span></Link><div className="admin-lock"><LayoutDashboard size={25}/></div><h1>Đăng nhập quản trị</h1><p>Quản lý sản phẩm và đơn hàng NovaShop.</p><form onSubmit={submit}><label>Tài khoản<input value={username} onChange={e=>setUsername(e.target.value)} autoComplete="username"/></label><label>Mật khẩu<input type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password"/></label>{error && <div className="form-error">{error}</div>}<button className="btn primary wide">Đăng nhập <ArrowRight size={17}/></button></form><div className="demo">Demo: <b>admin</b> / <b>123456</b></div><Link className="back-link center" to="/"><ArrowLeft size={15}/> Về cửa hàng</Link></div></div>;

}



function AdminGuard({ children }) {

  const { admin } = useStore();

  return admin ? children : <Navigate to="/admin/login" replace/>;

}



const menu = [

  ["/admin", LayoutDashboard, "Dashboard"],

  ["/admin/products", Package, "Sản phẩm"],

  ["/admin/orders", ClipboardList, "Đơn hàng"],

  ["/admin/customers", Users, "Khách hàng"],

  ["/admin/reports", BarChart3, "Báo cáo"],

  ["/admin/settings", Settings, "Cài đặt"]

];



function AdminShell({ children }) {

  const { logoutAdmin } = useStore();

  const location = useLocation();

  const [mobile, setMobile] = useState(false);

  return <div className="admin-shell">

    <aside className={mobile ? "admin-sidebar mobile-open" : "admin-sidebar"}><div className="admin-brand"><Logo/><button onClick={()=>setMobile(false)}><X size={18}/></button></div><span className="admin-label">QUẢN TRỊ</span><nav>{menu.map(([to,Icon,label])=><Link key={to} className={location.pathname===to ? "active":""} to={to} onClick={()=>setMobile(false)}><Icon size={18}/>{label}</Link>)}</nav><div className="admin-side-bottom"><Link to="/"><ShoppingBag size={17}/> Xem cửa hàng</Link><button onClick={logoutAdmin}><LogOut size={17}/> Đăng xuất</button></div></aside>

    <main className="admin-content"><header className="admin-mobile-header"><button onClick={()=>setMobile(true)}><Menu/></button><span>NovaShop Admin</span></header>{children}</main>

  </div>;

}



function AdminDashboard() {

  const { products, orders, users } = useStore();

  const revenue = orders.reduce((s,o)=>s+o.total,0);

  return <AdminPage title="Dashboard" subtitle="Tổng quan hoạt động cửa hàng"><div className="admin-stats">

    <AdminStat icon={ShoppingBag} label="Sản phẩm" value={products.length}/>

    <AdminStat icon={ClipboardList} label="Đơn hàng" value={orders.length}/>

    <AdminStat icon={Users} label="Khách hàng" value={users.length}/>

    <AdminStat icon={BarChart3} label="Doanh thu" value={formatVND(revenue)}/>

  </div>

  <div className="admin-panels"><section className="admin-panel"><div className="panel-head"><div><h2>Đơn hàng gần đây</h2><p>Cập nhật theo dữ liệu LocalStorage</p></div><Link to="/admin/orders">Xem tất cả <ArrowRight size={15}/></Link></div>{orders.slice(0,5).map(o=><AdminOrderRow key={o.id} order={o}/>)}{!orders.length&&<div className="admin-empty">Chưa có đơn hàng nào.</div>}</section>

  <section className="admin-panel"><div className="panel-head"><div><h2>Sản phẩm</h2><p>Danh mục hiện tại</p></div><Link to="/admin/products">Quản lý <ArrowRight size={15}/></Link></div>{products.slice(0,6).map(p=><div className="product-admin-row" key={p.id}><img src={p.image} alt=""/><div><b>{p.name}</b><span>{p.category} · Tồn {p.stock}</span></div><strong>{formatVND(p.price)}</strong></div>)}</section></div></AdminPage>;

}



function AdminStat({ icon: Icon, label, value }) { return <div className="admin-stat"><span><Icon size={19}/></span><small>{label}</small><strong>{value}</strong></div>; }



function AdminOrderRow({ order }) { return <div className="admin-order-row"><div className="order-id">{order.id}</div><div><b>{order.customer.name}</b><span>{order.items.length} sản phẩm</span></div><strong>{formatVND(order.total)}</strong><span className={`status ${order.status === "Đã giao" ? "done" : order.status === "Đang giao" ? "shipping" : ""}`}>{order.status}</span></div>; }



function AdminPage({ title, subtitle, action, children }) {

  return <><div className="admin-topbar"><div><span className="eyebrow">NOVASHOP ADMIN</span><h1>{title}</h1><p>{subtitle}</p></div>{action}</div>{children}</>;

}



function ProductModal({ product, onClose }) {

  const { addProduct, updateProduct } = useStore();

  const [form, setForm] = useState(product || {name:"",category:"Thời trang",price:0,oldPrice:0,rating:5,stock:10,tag:"Mới",image:"https\://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85",description:""});

  const change = (key, value) => setForm(f => ({...f, [key]: value}));

  const submit = e => { e.preventDefault(); const payload = {...form, price:Number(form.price), oldPrice:Number(form.oldPrice), rating:Number(form.rating), stock:Number(form.stock)}; product ? updateProduct(product.id,payload) : addProduct(payload); onClose(); };

  return <div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><h2>{product ? "Sửa sản phẩm" : "Thêm sản phẩm"}</h2><p>Thông tin được lưu ngay vào LocalStorage.</p></div><button onClick={onClose}><X/></button></div><form onSubmit={submit}><div className="form-grid"><label>Tên sản phẩm<input required value={form.name} onChange={e=>change("name",e.target.value)}/></label><label>Danh mục<select value={form.category} onChange={e=>change("category",e.target.value)}><option>Thời trang</option><option>Giày dép</option><option>Điện tử</option><option>Phụ kiện</option></select></label><label>Giá bán<input required type="number" min="0" value={form.price} onChange={e=>change("price",e.target.value)}/></label><label>Giá cũ<input type="number" min="0" value={form.oldPrice} onChange={e=>change("oldPrice",e.target.value)}/></label><label>Tồn kho<input type="number" min="0" value={form.stock} onChange={e=>change("stock",e.target.value)}/></label><label>Nhãn<input value={form.tag} onChange={e=>change("tag",e.target.value)}/></label></div><label>Link ảnh Unsplash<input required value={form.image} onChange={e=>change("image",e.target.value)}/></label><label>Mô tả<textarea value={form.description} onChange={e=>change("description",e.target.value)}/></label><div className="modal-actions"><button type="button" className="btn ghost" onClick={onClose}>Hủy</button><button className="btn primary">{product ? "Lưu thay đổi" : "Thêm sản phẩm"}</button></div></form></div></div>;

}



function AdminProducts() {

  const { products, deleteProduct } = useStore();

  const [editing, setEditing] = useState(undefined);

  const [search, setSearch] = useState("");

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return <AdminPage title="Sản phẩm" subtitle={`${products.length} sản phẩm đang được bán`} action={<button className="btn primary" onClick={()=>setEditing(null)}><Plus size={17}/> Thêm sản phẩm</button>}>

    <section className="admin-panel"><div className="table-tools"><label className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm sản phẩm..."/></label><span>{filtered.length} kết quả</span></div><div className="table-wrap"><table><thead><tr><th>Sản phẩm</th><th>Danh mục</th><th>Giá</th><th>Tồn kho</th><th>Nhãn</th><th></th></tr></thead><tbody>{filtered.map(p=><tr key={p.id}><td><div className="table-product"><img src={p.image} alt=""/><b>{p.name}</b></div></td><td>{p.category}</td><td><b>{formatVND(p.price)}</b></td><td>{p.stock}</td><td><span className="table-pill">{p.tag || "—"}</span></td><td><div className="row-actions"><button title="Xem"><Eye size={16}/></button><button title="Sửa" onClick={()=>setEditing(p)}><Pencil size={16}/></button><button className="danger" title="Xóa" onClick={()=>{if(confirm(`Xóa "${p.name}"?`)) deleteProduct(p.id)}}><Trash2 size={16}/></button></div></td></tr>)}</tbody></table></div></section>

    {editing !== undefined && <ProductModal product={editing} onClose={()=>setEditing(undefined)}/>}

  </AdminPage>;

}



function AdminOrders() {

  const { orders, updateOrderStatus } = useStore();

  return <AdminPage title="Đơn hàng" subtitle={`${orders.length} đơn hàng từ khách hàng`}><section className="admin-panel"><div className="table-wrap"><table><thead><tr><th>Mã đơn</th><th>Khách hàng</th><th>Sản phẩm</th><th>Tổng tiền</th><th>Ngày đặt</th><th>Trạng thái</th></tr></thead><tbody>{orders.map(o=><tr key={o.id}><td><b>{o.id}</b></td><td><div><b>{o.customer.name}</b><small className="block">{o.customer.phone}</small><small className="block">{o.customer.address}</small></div></td><td>{o.items.map(i=><div key={i.productId} className="order-product">{i.name} × {i.quantity}</div>)}</td><td><b>{formatVND(o.total)}</b></td><td>{new Date(o.createdAt).toLocaleString("vi-VN")}</td><td><select className="status-select" value={o.status} onChange={e=>updateOrderStatus(o.id,e.target.value)}><option>Chờ xác nhận</option><option>Đã xác nhận</option><option>Đang giao</option><option>Đã giao</option><option>Đã hủy</option></select></td></tr>)}</tbody></table></div>{!orders.length&&<div className="admin-empty">Chưa có đơn hàng. Hãy đặt thử một đơn từ trang Shop.</div>}</section></AdminPage>;

}



function AdminCustomers() {

  const { users, orders, updateUser, deleteUser, toggleUserStatus } = useStore();

  const [search,setSearch]=useState("");

  const [editing,setEditing]=useState(null);

  const filtered=users.filter(u=>`${u.name} ${u.email} ${u.phone}`.toLowerCase().includes(search.toLowerCase()));

  const save=e=>{e.preventDefault();updateUser(editing.id,{name:editing.name,phone:editing.phone,email:editing.email});setEditing(null);};

  return <AdminPage title="Tài khoản khách hàng" subtitle={`${users.length} tài khoản đăng ký`} action={<Link className="btn primary" to="/register"><Plus size={17}/> Tạo tài khoản</Link>}>

    <section className="admin-panel"><div className="table-tools"><label className="search-box"><Search size={17}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Tìm tên, email, số điện thoại..."/></label><span>{filtered.length} tài khoản</span></div>

    <div className="table-wrap"><table><thead><tr><th>Khách hàng</th><th>Liên hệ</th><th>Ngày đăng ký</th><th>Đơn hàng</th><th>Trạng thái</th><th></th></tr></thead><tbody>

    {filtered.map(u=>{const count=orders.filter(o=>o.customer.userId===u.id).length; return <tr key={u.id}><td><div className="table-product"><div className="avatar">{u.name.charAt(0).toUpperCase()}</div><div><b>{u.name}</b><small className="block">{u.email}</small></div></div></td><td>{u.phone}</td><td>{new Date(u.createdAt).toLocaleDateString("vi-VN")}</td><td>{count}</td><td><button className={`table-pill ${u.status==="blocked"?"blocked":""}`} onClick={()=>toggleUserStatus(u.id)}>{u.status==="active"?"Đang hoạt động":"Đã khóa"}</button></td><td><div className="row-actions"><button title="Sửa" onClick={()=>setEditing({...u})}><Pencil size={16}/></button><button className="danger" title="Xóa" onClick={()=>{if(confirm(`Xóa tài khoản ${u.email}?`))deleteUser(u.id)}}><Trash2 size={16}/></button></div></td></tr>})}

    </tbody></table></div>{!filtered.length&&<div className="admin-empty">Chưa có tài khoản phù hợp.</div>}</section>

    {editing&&<div className="modal-backdrop"><div className="modal"><div className="modal-head"><div><h2>Sửa tài khoản</h2><p>Admin có thể cập nhật thông tin liên hệ.</p></div><button onClick={()=>setEditing(null)}><X/></button></div><form onSubmit={save}><div className="form-grid"><label>Họ và tên<input required value={editing.name} onChange={e=>setEditing({...editing,name:e.target.value})}/></label><label>Email<input required type="email" value={editing.email} onChange={e=>setEditing({...editing,email:e.target.value})}/></label><label>Số điện thoại<input required value={editing.phone} onChange={e=>setEditing({...editing,phone:e.target.value})}/></label><label>Trạng thái<select value={editing.status} onChange={e=>setEditing({...editing,status:e.target.value})}><option value="active">Đang hoạt động</option><option value="blocked">Đã khóa</option></select></label></div><div className="modal-actions"><button type="button" className="btn ghost" onClick={()=>setEditing(null)}>Hủy</button><button className="btn primary">Lưu thay đổi</button></div></form></div></div>}

  </AdminPage>;

}



function AdminReports() {

  const { orders } = useStore();

  const revenue = orders.reduce((s,o)=>s+o.total,0);

  const byStatus = orders.reduce((a,o)=>({...a,[o.status]:(a[o.status]||0)+1}),{});

  return <AdminPage title="Báo cáo" subtitle="Tổng hợp dữ liệu hiện có trên trình duyệt"><div className="admin-stats"><AdminStat icon={BarChart3} label="Doanh thu" value={formatVND(revenue)}/><AdminStat icon={ClipboardList} label="Tổng đơn" value={orders.length}/><AdminStat icon={Truck} label="Đang giao" value={byStatus["Đang giao"]||0}/><AdminStat icon={Check} label="Đã giao" value={byStatus["Đã giao"]||0}/></div><section className="admin-panel report-note"><BarChart3 size={35}/><h2>Báo cáo frontend-only</h2><p>Dữ liệu được lưu trong LocalStorage của trình duyệt. Khi deploy Vercel, mỗi thiết bị/trình duyệt sẽ có dữ liệu riêng; chưa có cơ sở dữ liệu dùng chung giữa người dùng.</p></section></AdminPage>;

}



function AdminSettings() {

  const { resetDemoData } = useStore();

  return <AdminPage title="Cài đặt" subtitle="Thiết lập demo cửa hàng"><section className="admin-panel settings-panel"><div><h2>Khôi phục dữ liệu mẫu</h2><p>Đưa sản phẩm về 8 sản phẩm mẫu và xóa giỏ hàng/đơn hàng hiện tại.</p></div><button className="btn ghost" onClick={()=>{if(confirm("Khôi phục toàn bộ dữ liệu demo?")) resetDemoData()}}>Khôi phục demo</button></section></AdminPage>;

}



function AdminApp() {

  return <AdminGuard><AdminShell><Routes><Route index element={<AdminDashboard/>}/><Route path="products" element={<AdminProducts/>}/><Route path="orders" element={<AdminOrders/>}/><Route path="customers" element={<AdminCustomers/>}/><Route path="reports" element={<AdminReports/>}/><Route path="settings" element={<AdminSettings/>}/></Routes></AdminShell></AdminGuard>;

}



export default function App() {

  return <Routes>

    <Route path="/" element={<Home/>}/>

    <Route path="/products" element={<Products/>}/>
    <Route path="/best-selling" element={<BestSelling/>}/>
    <Route path="/about" element={<AboutNovaShop/>}/>

    <Route path="/products/:id" element={<ProductDetail/>}/>

    <Route path="/cart" element={<Cart/>}/>

    <Route path="/checkout" element={<Checkout/>}/>

    <Route path="/login" element={<CustomerLogin/>}/>

    <Route path="/register" element={<CustomerRegister/>}/>

    <Route path="/account" element={<CustomerAccount/>}/>

    <Route path="/admin/login" element={<AdminLogin/>}/>

    <Route path="/admin/*" element={<AdminApp/>}/>

    <Route path="*" element={<Navigate to="/" replace/>}/>

  </Routes>;

}