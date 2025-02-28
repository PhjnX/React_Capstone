import background from "./../../../assets/images/bg-3.jpg";
import movies from "./movies";
import { Trophy } from "lucide-react";
import { motion } from "framer-motion";

export default function BestMovie() {
  return (
    <div
      className="relative bg-cover bg-center py-12 px-6 text-white"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-3xl font-bold mb-6 text-center font-mono text-[#AC98E0] flex justify-center items-center"
        >
          Top phim <Trophy className="ml-4 w-6 h-6 text-yellow-400" />
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {movies.map((movie, index) => {
            const { image, title, description, date, views } = movie;
            const nextMovie1 = movies[(index + 1) % movies.length];
            const nextMovie2 = movies[(index + 2) % movies.length];
            const { image: image1 } = nextMovie1;
            const { image: image2 } = nextMovie2;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.2,
                }}
                className="relative p-4 rounded-lg overflow-hidden"
              >
                <div className="relative h-72 w-48 flex items-center justify-center">
                  <img
                    src={image2}
                    alt={nextMovie2.title}
                    className="absolute h-full w-auto object-cover rounded-lg opacity-40 transform scale-90 translate-x-10 translate-y-6"
                  />
                  <img
                    src={image1}
                    alt={nextMovie1.title}
                    className="absolute h-full w-auto object-cover rounded-lg opacity-70 transform scale-95 translate-x-5 translate-y-3"
                  />
                  <img
                    src={image}
                    alt={title}
                    className="absolute h-full w-auto object-cover rounded-lg"
                  />
                </div>
                <h3 className="text-lg font-bold mt-4">{title}</h3>
                <p className="text-sm mb-2">{description}</p>
                <p className="text-xs opacity-75">
                  {date} • {views}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="flex justify-center"
        >
          <button className="mt-6 bg-[#AC98E0] hover:bg-[#402F67] text-white px-6 py-2 rounded-lg">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.momo.vn/cinema/top-phim#homecinema"
            >
              Xem nhiều hơn !
            </a>
          </button>
        </motion.div>
      </div>
    </div>
  );
}
