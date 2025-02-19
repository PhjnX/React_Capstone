import { motion } from "framer-motion";

export default function Support() {
  return (
    <motion.div
      className="bg-gray-50 py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }} 
    >
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-center text-4xl font-semibold text-[#AC98E0] mb-5">
          Hỗ Trợ Khách Hàng
        </h2>
        <p className="text-center text-lg text-gray-700 mb-8">
          Nếu bạn gặp phải bất kỳ vấn đề nào khi sử dụng dịch vụ của chúng tôi,
          vui lòng tham khảo phần dưới đây hoặc liên hệ với chúng tôi.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h3 className="text-2xl font-semibold text-[#AC98E0] mb-4">
              Câu Hỏi Thường Gặp
            </h3>
            <ul className="list-disc pl-5 text-gray-600">
              <li>
                <strong>Làm thế nào để đặt vé?</strong> Chỉ cần chọn bộ phim bạn
                muốn xem, chọn lịch chiếu và tiến hành thanh toán.
              </li>
              <li>
                <strong>Có thể thay đổi vé đã mua không?</strong> Hiện tại,
                chúng tôi không hỗ trợ thay đổi vé sau khi đã thanh toán, nhưng
                bạn có thể hủy vé trong vòng 24 giờ trước suất chiếu.
              </li>
              <li>
                <strong>Phương thức thanh toán nào được chấp nhận?</strong>{" "}
                Chúng tôi hỗ trợ thanh toán qua thẻ tín dụng, thẻ ghi nợ và
                chuyển khoản ngân hàng.
              </li>
              <li>
                <strong>Tôi có thể yêu cầu hoàn tiền không?</strong> Hoàn tiền
                có thể yêu cầu trong trường hợp đặc biệt, vui lòng liên hệ với
                chúng tôi để được hỗ trợ.
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-[#AC98E0] mb-4">
              Liên Hệ Với Chúng Tôi
            </h3>
            <p className="text-gray-600 mb-4">
              Nếu bạn cần thêm hỗ trợ hoặc có bất kỳ câu hỏi nào, đừng ngần ngại
              liên hệ với chúng tôi qua các kênh dưới đây.
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Email: support@moviebooking.com
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Số điện thoại: 0123-456-789
            </p>
            <p className="text-lg text-gray-700 mb-4">
              Hoặc bạn có thể sử dụng{" "}
              <a
                href="https://www.momo.vn/cinema/chat"
                target="_blank"
                className="text-[#AC98E0]"
              >
                chat trực tuyến
              </a>{" "}
              để được hỗ trợ ngay lập tức.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
