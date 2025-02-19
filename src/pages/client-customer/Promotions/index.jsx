import { motion } from "framer-motion"; 
import promotions from "./Promotion"; 

export default function Promotions() {
  return (
    <motion.div
      className="bg-gray-50 py-10"
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.5 }} 
    >
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-center text-4xl font-semibold text-[#AC98E0] mb-10">
          ƯU ĐÃI KHÁCH HÀNG
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="w-full h-56 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-[#AC98E0]">
                  {promo.title}
                </h3>
                <p className="text-gray-600 mt-2">{promo.description}</p>
                <a
                  href={promo.link}
                  className="mt-4 inline-block bg-[#AC98E0] text-white py-2 px-5 rounded-full transition duration-300 hover:bg-[#9c7bb1]"
                >
                  Xem chi tiết
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
