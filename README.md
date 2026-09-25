# NovaShop – E-commerce React + Vite + Docker + Render

NovaShop giữ nguyên giao diện tone xanh đậm / kem / xanh lime hiện tại và bổ sung:

- Đăng ký tài khoản khách hàng.
- Đăng nhập / đăng xuất khách hàng.
- Trang tài khoản cá nhân.
- Theo dõi các đơn hàng của tài khoản.
- Admin quản lý tài khoản: tìm kiếm, sửa, khóa/mở khóa, xóa.
- Admin tiếp tục quản lý sản phẩm và đơn hàng.
- Docker + Nginx để chạy production.
- Cấu hình Render bằng `render.yaml`.

## 1. Chạy bằng Node

```bash
npm install
npm run dev
```

Mở `http://localhost:5173`.

## 2. Chạy bằng Docker

```bash
docker build -t novashop .
docker run --rm -p 8080:80 novashop
```

Mở `http://localhost:8080`.

## 3. Tài khoản demo

### Khách hàng
- Email: `customer@novashop.vn`
- Mật khẩu: `123456`

### Admin
- URL: `/admin/login`
- Username: `admin`
- Password: `123456`

Sau khi đăng nhập admin:
- `/admin/customers`: quản lý tài khoản khách hàng.
- `/admin/products`: quản lý sản phẩm.
- `/admin/orders`: quản lý đơn hàng.

## 4. Deploy Render

Repo đã có:
- `Dockerfile`
- `nginx.conf`
- `render.yaml`

Cách triển khai:
1. Push thư mục này lên GitHub.
2. Vào Render → New → Blueprint.
3. Chọn repository GitHub.
4. Render đọc `render.yaml` và build Docker image.
5. Sau khi deploy, mở URL Render được cấp.

## Quan trọng về dữ liệu

Bản này là phiên bản frontend demo nên dữ liệu tài khoản, sản phẩm và đơn hàng được lưu bằng LocalStorage. Điều này phù hợp để chạy demo / bài tập / prototype nhưng **không phải hệ thống tài khoản production**: dữ liệu không đồng bộ giữa các thiết bị và mật khẩu đang nằm ở phía client.

Nếu muốn đưa NovaShop thành website thật có nhiều khách hàng dùng chung dữ liệu, bước tiếp theo nên thêm backend API + database (ví dụ Node/Express + MongoDB Atlas), JWT và hash mật khẩu bằng bcrypt. Khi đó admin mới quản lý tài khoản dùng chung trên Render.

## Render Docker

`render.yaml` dùng Docker Web Service và cổng nội bộ `80`.
