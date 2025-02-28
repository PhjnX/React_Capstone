import { motion } from "framer-motion"; // Import motion từ framer-motion

export default function About() {
  return (
    <motion.div
      className="bg-gray-50 py-10"
      initial={{ opacity: 0 }} // Thiết lập giá trị ban đầu
      animate={{ opacity: 1 }} // Thiết lập giá trị khi hoàn thành
      exit={{ opacity: 0 }} // Thiết lập giá trị khi thoát
      transition={{ duration: 0.5 }} // Thời gian hiệu ứng
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-center text-4xl font-semibold text-[#AC98E0] mb-5">
          Về Chúng Tôi
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8">
          Chào mừng bạn đến với PandaMovie - nơi đặt vé xem phim online - mang
          đến cho bạn trải nghiệm đặt vé nhanh chóng và tiện lợi cho các bộ phim
          mới nhất.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-[#AC98E0] mb-4">
              Dịch Vụ Của Chúng Tôi
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>Đặt vé xem phim nhanh chóng và dễ dàng.</li>
              <li>
                Cung cấp thông tin chi tiết về các bộ phim, lịch chiếu và giá
                vé.
              </li>
              <li>Hỗ trợ nhiều hình thức thanh toán an toàn.</li>
              <li>Thông báo nhắc nhở về các suất chiếu yêu thích của bạn.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#AC98E0] mb-4">
              Tại Sao Chọn Chúng Tôi?
            </h3>
            <p className="text-gray-600 mb-4">
              Website của chúng tôi được thiết kế để mang lại sự thuận tiện và
              dễ dàng cho người dùng trong việc tìm kiếm và đặt vé xem phim.
              Chúng tôi cam kết cung cấp các dịch vụ nhanh chóng, an toàn và
              hiệu quả.
            </p>
            <p className="text-gray-600">
              Với đội ngũ phát triển chuyên nghiệp và dịch vụ chăm sóc khách
              hàng tận tình, chúng tôi luôn mong muốn mang đến trải nghiệm đặt
              vé phim tuyệt vời nhất cho bạn.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-[#AC98E0] mb-4">
            Liên Hệ Với Chúng Tôi
          </h3>
          <p className="text-lg text-gray-700">
            Để biết thêm thông tin hoặc cần hỗ trợ, đừng ngần ngại liên hệ với
            chúng tôi qua email hoặc số điện thoại dưới đây.
          </p>
          <p className="text-lg text-gray-600 mt-4">
            Email: support@moviebooking.com
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Số điện thoại: 0123-456-789
          </p>
        </div>
      </div>
    </motion.div>
  );
}
