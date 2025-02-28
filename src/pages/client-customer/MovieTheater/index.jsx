import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCinemaSystems } from "./slice";
import CinemaSystem from "./CinemaSystem";
import CinemaList from "./CinemaList";
import TimeList from "./TimeList";
import { BsFilm } from "react-icons/bs";
import { GiClapperboard } from "react-icons/gi";
export default function MovieTheaterPage() {
  const dispatch = useDispatch();
  const { cinemaSystems, cinemas } = useSelector(
    (state) => state.movieTheaterReducer
  );

  const [selectedSystem, setSelectedSystem] = useState(null);
  const [selectedCinema, setSelectedCinema] = useState(null);

  useEffect(() => {
    dispatch(fetchCinemaSystems());
  }, [dispatch]);

  useEffect(() => {
    if (cinemaSystems.length > 0 && !selectedSystem) {
      setSelectedSystem(cinemaSystems[0].maHeThongRap);
    }
  }, [cinemaSystems, selectedSystem]);

  useEffect(() => {
    if (selectedSystem && cinemas[selectedSystem]?.length > 0) {
      setSelectedCinema(cinemas[selectedSystem][0].maCumRap);
    }
  }, [selectedSystem, cinemas]);

  const handleSelectSystem = (maHeThongRap) => {
    setSelectedSystem(maHeThongRap);
    if (cinemas[maHeThongRap]?.length > 0) {
      setSelectedCinema(cinemas[maHeThongRap][0].maCumRap);
    } else {
      setSelectedCinema(null);
    }
  };

  return (
    <div className="p-6 bg-[rgb(250,250,250)] min-h-screen flex flex-col text-white">
      <h1 className="text-4xl font-bold text-center flex justify-center items-center gap-3 mb-6">
        <BsFilm className="text-purple-400 text-5xl animate-bounce mt-10" />
        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text flex items-center gap-2 mt-10 font-mono ">
          LỊCH CHIẾU PHIM
          <GiClapperboard
            className="w-8 h-8 text-orange-400"
            fill="currentColor"
            stroke="none"
          />
        </span>
      </h1>

      <div className="flex flex-1 w-full min-h-[500px]">
        <div className="w-1/6 p-4 border-r border-gray-300 flex flex-col items-center">
          <CinemaSystem onSelect={handleSelectSystem} />
        </div>

        <div className="w-2/6 p-4 border-r border-gray-300 overflow-y-auto flex-1">
          <CinemaList
            maHeThongRap={selectedSystem}
            onSelect={setSelectedCinema}
          />
        </div>

        <div className="w-3/6 p-4 overflow-y-auto flex-1">
          {selectedCinema ? (
            <TimeList maHeThongRap={selectedSystem} maCumRap={selectedCinema} />
          ) : (
            <p className="text-gray-400 text-lg">⏳ Đang tải suất chiếu...</p>
          )}
        </div>
      </div>
    </div>
  );
}
