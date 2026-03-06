# LumiTest Frontend - Automated Testing Tool UI

Giao diện người dùng cho hệ thống LumiTest, được xây dựng bằng React và Vite.

## 1. Yêu cầu hệ thống

- **Node.js 18+**
- **npm** (đã cài sẵn khi cài Node.js)

## 2. Cài đặt

Mở terminal tại thư mục project và chạy:

```bash
npm install
```

## 3. Cách chạy (Development Mode)

```bash
npm run dev
```

Dự án sẽ chạy tại: `http://localhost:5173`

## 4. Kết nối Backend

Giao diện kết nối với Backend tại `http://localhost:8080`. Cấu hình proxy đã được thiết lập trong `vite.config.js`:

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
- **Vite**
- **Vanilla CSS** (Premium Dark UI/Glassmorphism)
