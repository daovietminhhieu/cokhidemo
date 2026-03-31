// utils/templates.js

function contactUserTemplate(name) {
  return `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8">
    <title>Xác nhận liên hệ</title>
  </head>

  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">
    
    <p>Xin chào <strong>${name}</strong>,</p>

    <p>
      Cảm ơn đã liên hệ với <strong>inoxdiepduong</strong>.
    </p>

    <p>
      Chúng tôi đã nhận được thông tin yêu cầu và sẽ phản hồi trong thời gian sớm nhất 
      (thường trong vòng <strong>24 giờ làm việc</strong>).
    </p>

    <p>
      Trong thời gian chờ đợi, nếu cần, có thể tham khảo thêm tại:
      <br>
      <a href="https://inoxdiepduong.com">https://inoxdiepduong.com</a>
    </p>

    <p>
      Trân trọng,<br>
      <strong>inoxdiepduong</strong>
    </p>

  </body>
  </html>
  `;
}

function contactAdminTemplate(name, email, message) {
  return `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8">
    <title>Liên hệ mới</title>
  </head>

  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">

    <p><strong>📩 Có liên hệ mới từ website</strong></p>

    <p>
      <strong>Thông tin khách hàng:</strong><br>
      - Tên: ${name}<br>
      - Email: ${email}
    </p>

    <p>
      <strong>Nội dung:</strong><br>
      ${message}
    </p>

  </body>
  </html>
  `;
}

function orderUserTemplate(order) {
  const { name, orderId, products, address, phone, email } = order;

  const formatPrice = (price) =>
    Number(price).toLocaleString("vi-VN") + " đ";

  const totalPrice = products.reduce(
    (sum, p) => sum + p.price * p.quantity,
    0
  );

  const totalQuantity = products.reduce(
    (sum, p) => sum + p.quantity,
    0
  );

  const productList = products.map(p => `
    <tr style="border-bottom:1px solid #f1f5f9;">
      <td style="padding:25px;">
        <table border="0" cellpadding="0" cellspacing="0">
          <tr>
            <td style="width:60px; padding-right:20px;">
              <img src="${p.image}" width="60" height="60" style="border-radius:8px; display:block;" alt="Product">
            </td>
            <td>
              <div style="color:#1e293b; font-weight:700; font-size:15px;">${p.name}</div>
              <div style="color:#64748b; font-size:13px; margin-top:2px;">${p.description || ""}</div>
            </td>
          </tr>
        </table>
      </td>
      <td align="center" style="padding:25px 15px; color:#334155; font-size:15px;">
        ${formatPrice(p.price)}
      </td>
      <td align="center" style="padding:25px 15px; color:#334155; font-size:15px;">
        ${p.quantity}
      </td>
      <td align="right" style="padding:25px; color:#0f172a; font-weight:700; font-size:15px;">
        ${formatPrice(p.price * p.quantity)}
      </td>
    </tr>
  `).join("");

  return `<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Xác nhận đơn hàng</title>
</head>
<body style="margin:0; padding:0; background-color:#ffffff; font-family:'Helvetica Neue', Arial, sans-serif; color:#2c3e50;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout:fixed; background-color:#ffffff;">
<tr>
<td align="center">

<table border="0" cellpadding="0" cellspacing="0" width="100%" style="width:100%; max-width:100%;">
<!-- Content -->
<tr>
<td style="padding:40px 5% 30px 5%;">

<h2 style="margin:0 0 20px 0; color:#1a202c; font-size:24px; font-weight:700;">
  Xin chào ${name},
</h2>

<p style="margin:0 0 40px 0; line-height:1.8; color:#4a5568; font-size:16px; max-width:1200px;">
  Cảm ơn bạn đã lựa chọn <strong>Inox Diệp Dương</strong>, thông tin liên lạc: SĐT: ${phone}, email: ${email}.
  Đơn hàng của bạn đã được ghi nhận thành công. Dưới đây là thông tin chi tiết.
</p>

<!-- Summary -->
<div style="background-color:#f8fafc; border:1px solid #e2e8f0; border-radius:12px; margin-bottom:40px; padding:30px;">
<table width="100%">
<tr>
<td style="padding-bottom:20px;">
  <div style="color:#a0aec0; font-size:12px; text-transform:uppercase; font-weight:700;">Mã đơn hàng</div>
  <div style="color:#2d3748; font-size:18px; font-weight:700;">${orderId}</div>
</td>
<td style="padding-bottom:20px;">
  <div style="color:#a0aec0; font-size:12px; text-transform:uppercase; font-weight:700;">Số lượng</div>
  <div style="color:#2d3748; font-size:18px; font-weight:700;">${totalQuantity} sản phẩm</div>
</td>
</tr>
<tr>
<td colspan="2">
  <div style="color:#a0aec0; font-size:12px; text-transform:uppercase; font-weight:700;">Địa chỉ nhận hàng</div>
  <div style="color:#2d3748; font-size:18px; font-weight:700;">${address}</div>
</td>
</tr>
</table>
</div>

<!-- Product Table -->
<div style="border:1px solid #edf2f7; border-radius:12px; overflow:hidden;">
<table width="100%" style="border-collapse:collapse;">
<thead>
<tr style="background-color:#f1f5f9;">
  <th align="left" style="padding:20px 25px;">Sản phẩm</th>
  <th align="center">Giá</th>
  <th align="center">Số lượng</th>
  <th align="right" style="padding-right:25px;">Thành tiền</th>
</tr>
</thead>
<tbody>
${productList}
</tbody>
</table>
</div>

<!-- Total -->
<table width="100%" style="margin-top:40px;">
<tr>
<td align="right">
  <div style="color:#64748b;">Tổng thanh toán</div>
  <div style="color:#ef4444; font-size:32px; font-weight:800;">
    ${formatPrice(totalPrice)}
  </div>
</td>
</tr>
</table>

</td>
</tr>

<!-- Footer -->
<tr>
<td style="padding:60px 5%; background-color:#1e293b;">
<table width="100%">
<tr>
<td style="color:#e2e8f0;">
  <div style="font-size:18px; font-weight:700;">Bạn cần hỗ trợ?</div>
  <p style="color:#94a3b8;">Chúng tôi luôn sẵn sàng hỗ trợ bạn 24/7.</p>
  <div style="margin-top:20px;">
    📞 0011223344 <br/>
    📧 a@example.com
  </div>
</td>
<td align="right" style="color:#64748b;">
  © 2026 Inox Diệp Dương
</td>
</tr>
</table>
</td>
</tr>

</table>

</td>
</tr>
</table>
</body>
</html>`;
}


function newProductTemplate(product) {
  const { name, price, quantity, category, description, image, link } = product;

  return `
  <!DOCTYPE html>
  <html lang="vi">
  <head>
    <meta charset="UTF-8">
    <title>Sản phẩm mới</title>
  </head>

  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px;">

    <p><strong>SẢN PHẨM MỚI</strong></p>

    <p style="text-align:center;">
      <img src="${image}" alt="${name}" style="max-width: 100%; border-radius: 6px;">
    </p>

    <p style="text-align:center; font-size: 18px; font-weight: bold;">
      ${name}
    </p>

    <p>
      <strong>Thông tin sản phẩm:</strong><br>
      - Giá: <strong style="color:#d32f2f;">${price} VND</strong><br>
      - Số lượng: ${quantity}<br>
      - Danh mục: ${category}
    </p>

    <p>
      <strong>Mô tả:</strong><br>
      ${description}
    </p>

    <p style="text-align:center; margin-top:20px;">
      <a href="${link}" style="background:#2563eb;color:#fff;padding:10px 16px;text-decoration:none;border-radius:4px;">
        Xem chi tiết
      </a>
    </p>

    <p style="font-size:12px; color:#777; text-align:center; margin-top:30px;">
      © 2026 inoxdiepduong
    </p>

  </body>
  </html>
  `;
}

module.exports = {
  contactUserTemplate,
  contactAdminTemplate,
  orderUserTemplate,
  newProductTemplate
};