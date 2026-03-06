# LumiTest Frontend - Giao diện Công cụ Kiểm thử Tự động

Giao diện người dùng cho hệ thống LumiTest, được xây dựng bằng **React** và **Vite**. Cung cấp trải nghiệm hiện đại với thiết kế Glassmorphism và chế độ tối (Dark Mode).

## 1. Yêu cầu hệ thống

- **Node.js 18+**
- **npm** (thường đi kèm khi cài đặt Node.js)

## 2. Cài đặt

Mở terminal tại thư mục này và chạy lệnh sau để cài đặt các thư viện cần thiết:

```bash
npm install
```

## 3. Cách chạy (Chế độ phát triển)

Khởi động server phát triển của Vite:

```bash
npm run dev
```

Giao diện sẽ hiển thị tại địa chỉ: `http://localhost:5173`

## 4. Kết nối với Backend

Mặc định, Frontend sẽ kết nối với Backend chạy tại `http://localhost:8080`. Cấu hình proxy đã được thiết lập sẵn trong `vite.config.js` để tránh lỗi CORS:

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true,
    }
  }
}
```

## 5. Công nghệ sử dụng

- **React 18**
- **Vite** (Công cụ đóng gói và chạy nhanh)
- **Vanilla CSS** (Sử dụng biến CSS và thiết kế tùy chỉnh, không dùng framework bên ngoài để tối ưu hiệu suất)
- **Thiết kế**: Phong cách Glassmorphism cao cấp, tương tác mượt mà.
