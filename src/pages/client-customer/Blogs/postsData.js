import doctorImage from "./../../../assets/images/blog-1.jpg";
import evilImage from "./../../../assets/images/blog-2.jpg";
import animeImage from "./../../../assets/images/blog-3.jpg";
import WibuImage from "./../../../assets/images/blog-4.jpg";
import moiveImage from "./../../../assets/images/blog-5.jpg";
import theaterImage from "./../../../assets/images/blog-6.jpg";
import expectImage from "./../../../assets/images/blog-7.jpg";
import impressImage from "./../../../assets/images/blog-8.jpg";

const latestPosts = [
  {
    id: 1,
    title: "16 bộ phim truyền hình Hàn Quốc về Bác Sĩ đáng xem nhất",
    image: doctorImage,
    views: "2.8K lượt xem",
    tag: "16 bộ phim truyền hình Hàn Quốc",
  },
  {
    id: 2,
    title:
      "Review Tiệm ăn của quỷ: Series kinh dị Việt Nam đầy ám ảnh trên Netflix",
    image: evilImage,
    views: "6.5K lượt xem",
    tag: "Review Tiệm ăn của quỷ",
  },
  {
    id: 3,
    title: "Review Solo Leveling: Hành trình Quân Vương Bóng Đêm",
    image: animeImage,
    views: "18K lượt xem",
    tag: "Review Solo Leveling",
  },
  {
    id: 4,
    title: "Những Anime 2025 hay bạn nhất định phải xem",
    image: WibuImage,
    views: "1.5K lượt xem",
    tag: "Anime 2025 hay",
  },
  {
    id: 5,
    title: "Phim Hàn Quốc 2021 hay gây chấn động màn ảnh",
    image: moiveImage,
    views: "925.8K lượt xem",
    tag: "Phim Hàn Quốc 2021",
  },
  {
    id: 6,
    title: "Top 22 phim chiếu rạp 2021 hay đáng mong chờ nhất",
    image: theaterImage,
    views: "757.7K lượt xem",
    tag: "Top 22 phim chiếu rạp 2021",
  },
  {
    id: 7,
    title: "25 phim hay chiếu rạp 2022 đáng kỳ vọng nhất năm",
    image: expectImage,
    views: "573.5K lượt xem",
    tag: "25 phim hay chiếu rạp 2022",
  },
  {
    id: 8,
    title: "Phim hay 2020 chiếu rạp gây ấn tượng",
    image: impressImage,
    views: "1M lượt xem",
    tag: "Phim hay 2020",
  },
];

const popularPosts = [...latestPosts.slice(4), ...latestPosts.slice(0, 4)];

const postsData = {
  latest: latestPosts,
  popular: popularPosts,
};

export default postsData;
