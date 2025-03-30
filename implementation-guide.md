# ALVIE Website Implementation Guide

## Các file đã chuẩn bị

### Cấu trúc dự án
- **Cấu trúc thư mục**: Đã tạo cấu trúc thư mục đầy đủ cho website ALVIE với các thư mục css, js, images, pages, components, và fonts

### HTML
- **index.html**: Trang chủ chính với các phần hero, giới thiệu công ty, xem trước dịch vụ, giá trị cốt lõi và CTA
- **pages/contact.html**: Trang liên hệ với form liên hệ, thông tin liên lạc và bản đồ

### CSS
- **css/main.css**: Stylesheet chính chứa các biến, style cơ bản, typography, components và layout
- **css/reset.css**: CSS reset để chuẩn hóa style trên các trình duyệt
- **css/responsive.css**: Media queries cho thiết kế responsive
- **css/contact.css**: Stylesheet bổ sung dành riêng cho trang liên hệ

### JavaScript
- **js/main.js**: JavaScript chính xử lý các chức năng tương tác như mobile menu, scroll effects, lazy loading

## Các file/tài nguyên cần chuẩn bị thêm

### Images
1. **Logo**:
   - alvie-logo.svg: Logo chính (với màu xanh lá)
   - alvie-logo-white.svg: Logo màu trắng cho footer
   - favicon.ico: Favicon cho tab trình duyệt

2. **Icons**:
   - search.svg, phone.svg, mail.svg, map-pin.svg, globe.svg, clock.svg, facebook.svg, linkedin.svg, instagram.svg, youtube.svg (có thể tải từ Feather Icons)

3. **Hero Images**:
   - hero-bg.jpg: Ảnh nền cho phần hero

4. **Service Images**:
   - services/investment.jpg: Ảnh cho dịch vụ tư vấn đầu tư
   - services/events.jpg: Ảnh cho dịch vụ tổ chức sự kiện
   - services/minimart.jpg: Ảnh cho dịch vụ minimart

5. **CTA Images**:
   - cta/cta-1.jpg: Ảnh nền cho CTA đầu tiên
   - cta/cta-2.jpg: Ảnh nền cho CTA thứ hai

### Fonts
- Cần nhúng font Congenial Black hoặc tìm font tương tự trên Google Fonts (có thể dùng Montserrat Bold hoặc Poppins Bold)

### Các trang HTML cần thêm
- **about.html**: Trang giới thiệu về công ty, sứ mệnh, tầm nhìn, giá trị cốt lõi
- **services.html**: Trang chi tiết về dịch vụ tư vấn đầu tư
- **events.html**: Trang chi tiết về dịch vụ tổ chức sự kiện
- **minimart.html**: Trang chi tiết về dịch vụ minimart

## Hướng dẫn triển khai

### Bước 1: Thiết lập cấu trúc thư mục
Tạo cấu trúc thư mục như đã định nghĩa trong file `web-structure.md`

### Bước 2: Thêm các file CSS và JavaScript cơ bản
Sao chép các file CSS và JavaScript đã cung cấp vào thư mục tương ứng:
- `reset.css`, `main.css`, `responsive.css` vào thư mục css
- `main.js` vào thư mục js

### Bước 3: Chuẩn bị hình ảnh
- Thiết kế logo theo hướng dẫn brand identity
- Thu thập hoặc chụp ảnh cho các mục đã đề cập
- Tải các icon cần thiết (có thể dùng Feather Icons, Font Awesome hoặc các bộ icon miễn phí khác)

### Bước 4: Tạo trang chủ và trang liên hệ
Sao chép mã HTML đã cung cấp cho file `index.html` và `pages/contact.html`

### Bước 5: Tạo các trang còn lại
Dựa trên cấu trúc và style đã có, xây dựng các trang còn lại (about, services, events, minimart)

### Bước 6: Kiểm tra trên các thiết bị
- Kiểm tra website trên desktop, tablet và mobile
- Đảm bảo layout responsive hoạt động tốt
- Kiểm tra các tính năng JavaScript

### Bước 7: Tối ưu hóa
- Tối ưu kích thước hình ảnh để tăng tốc độ tải trang
- Minify CSS và JavaScript
- Kiểm tra hiệu suất với các công cụ như Google PageSpeed Insights

## Lưu ý quan trọng
- Đảm bảo tuân thủ hướng dẫn brand identity của ALVIE (màu sắc, typography, giọng điệu)
- Áp dụng đúng brand voice của ALVIE trong các nội dung văn bản
- Đảm bảo tất cả các liên kết đều hoạt động và dẫn đến đúng trang
- Đảm bảo website thân thiện với SEO, có meta tags phù hợp
- Thêm Google Analytics hoặc công cụ theo dõi khác để phân tích lưu lượng truy cập

## Cấu hình cần thiết khi triển khai
1. Cấu hình domain và hosting
2. Cài đặt SSL để đảm bảo kết nối an toàn (https)
3. Thiết lập email liên hệ để nhận form liên hệ
4. Cài đặt và cấu hình các công cụ phân tích
