# PracticeProject

NovaChat là ứng dụng nhắn tin demo được xây dựng bằng React Native và TypeScript. Ứng dụng gồm màn hình đăng nhập, danh sách tin nhắn, danh bạ, thông báo, cài đặt và màn hình hội thoại.

Ứng dụng sử dụng dữ liệu mẫu lưu trong bộ nhớ; mọi tài khoản có đủ tên đăng nhập và mật khẩu đều đăng nhập được. Tin nhắn gửi và trạng thái đọc thông báo được cập nhật trong phiên chạy hiện tại. Avatar chân dung được đóng gói sẵn trong ứng dụng để hiển thị ổn định khi ngoại tuyến. Bộ icon giao diện dùng Lucide.

Điều hướng được triển khai bằng React Navigation với thanh tab dưới cùng.

## Yêu cầu

- Node.js `>= 22.11.0`
- Android Studio và Android SDK để chạy Android
- Xcode và CocoaPods để chạy iOS

## Cài đặt và chạy

```sh
npm install
npm start
```

Mở terminal khác trong thư mục project:

```sh
# Android
npm run android

# iOS
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

## Kiểm tra

```sh
npm test -- --runInBand
npm run lint
```
