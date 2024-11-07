import { MIN_PASSWORD_LENGTH } from '~/constants';

export default {
  // email
  email_required: 'Email là bắt buộc',
  invalid_email: 'Định dạng email không hợp lệ',
  email_already_in_use: 'Email đã được sử dụng',
  email_verification: 'Xác minh Email',
  // invalid_email_verified: '',

  // otp
  your_otp_code_is: 'Mã OTP của bạn là',

  // password
  password_required: 'Mật khẩu là bắt buộc',
  min_password_length: `Mật khẩu phải có ít nhất ${MIN_PASSWORD_LENGTH} ký tự`,
  max_password_length: `Mật khẩu dài tối đa ${MIN_PASSWORD_LENGTH} ký tự`,

  // phone
  invalid_phone_number: '',

  // product
  product_name_required: 'Tên là bắt buộc',
  product_desc_required: 'Mô tả là bắt buộc',
  import_price_required: 'Giá nhập là bắt buộc',
  price_required: 'Giá là bắt buộc',
  promotional_price_required: 'Giá khuyến mãi là bắt buộc',
  quantity_required: 'Số lượng là bắt buộc',
  product_image_required: 'Ảnh sản phẩm là bắt buộc',

  // exception
  customer_not_found_exception: 'Người dùng không tồn tại',
  delivery_not_found_exception: 'Shipper không tồn tại',
  forbidden_exception: 'Tài nguyên bị cấm',
  unauthorized_exception: 'Không được phép',
  product_not_found_exception: 'Sản phẩm không tồn tại',
  product_id_not_found_exception: 'Không tìm thấy sản phẩm có id là {{id}}',
  otp_is_expired_exception: 'OTP đã hết hạn',
  email_has_been_verified_exception: 'Email đã được xác minh',
  order_not_found_exception: 'Đơn hàng không tồn tại',
  order_received_by_someone: 'Đơn hàng đã được ai đó nhận',
  invalid_otp_code_exception: 'OTP code không hợp lệ',
  email_not_verified_exception: 'Chưa xác minh Email',

  incorrect_account_or_password: 'Tài khoản hoặc mật khẩu không đúng',
  login_successfully: 'Đăng nhập thành công',
};
