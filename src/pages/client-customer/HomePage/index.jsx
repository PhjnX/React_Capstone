import BestMovie from "../BestMovie";
import Blog from "../Blogs";
import Carousel from "../Carousel";
import ListMoviePage from "../ListMoviePage";
import MovieTheaterPage from "../MovieTheater";
export default function HomePage() {
  return (
    <div>
      <Carousel />
      <ListMoviePage />
      <MovieTheaterPage />
      <BestMovie />
      <Blog />
    </div>
  );
}
