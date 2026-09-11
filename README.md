# CV/DL — blog Jekyll

Blog về thị giác máy tính, học sâu và công nghệ, viết cho người đọc phổ thông.
Giao diện tự viết, tối giản theo phong cách Apple: không Bootstrap, không jQuery,
không icon font — chỉ HTML, CSS và một tệp JavaScript nhỏ.

## Chạy thử trên máy

```bash
bundle install
bundle exec jekyll serve
```

Mở http://localhost:4000.

## Viết bài mới

Tạo tệp `_posts/YYYY-MM-DD-ten-bai.md`:

```markdown
---
title: Tên bài viết
categories: [deep learning]
tags: [optimizer, landscape]
description: Một câu tóm tắt — hiện trên thẻ bài viết, thẻ chia sẻ và kết quả tìm kiếm.
image: https://.../anh-bia.png   # tuỳ chọn: ảnh thẻ bài viết + ảnh khi chia sẻ
hero: true                        # tuỳ chọn: hiện luôn ảnh đó ở đầu bài
---

Nội dung bài viết...
```

- `layout: post` và `comments: true` đã là mặc định trong `_config.yml`, không cần khai báo lại.
- Không có `description` thì trang tự cắt 26 từ đầu bài làm tóm tắt.
- Không có `image` thì thẻ bài viết dùng một dải màu dịu, chọn tự động theo tên bài.

## Cấu trúc giao diện

| Tệp | Vai trò |
| --- | --- |
| `_layouts/default.html` | Khung trang: thẻ meta, header kính mờ, footer, script |
| `_includes/post.html` | Trang bài viết: tiêu đề, thời gian đọc, thẻ, chia sẻ, bài trước/sau |
| `_includes/postcard.html` | Thẻ bài viết dùng ở trang chủ |
| `_includes/date.html` | Định dạng ngày tiếng Việt |
| `assets/css/style.css` | Toàn bộ giao diện, biến màu ở đầu tệp |
| `assets/css/syntax.css` | Màu cho khối mã (Rouge) |
| `assets/js/app.js` | Chế độ sáng/tối, menu mobile, thanh tiến độ đọc, lọc chủ đề |

Muốn đổi tông màu: sửa các biến `--accent`, `--bg`, `--text`… ở đầu `assets/css/style.css`.
Giao diện tự đổi sáng/tối theo hệ điều hành, người đọc bấm nút trên thanh điều hướng để chọn thủ công.

## Bật Google Analytics

Điền mã đo lường GA4 (dạng `G-XXXXXXX`) vào `google_analytics` trong `_config.yml`.

## Giấy phép

[MIT](LICENSE). Giao diện gốc trước đây là [dbyll](https://github.com/dbtek/dbyll).
