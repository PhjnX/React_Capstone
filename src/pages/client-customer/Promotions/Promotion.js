import promo1 from "./../../../assets/images/pro-1.png";
import promo2 from "./../../../assets/images/pro-2.png";
import promo3 from "./../../../assets/images/pro-3.png";
const promotions = [
  {
    id: 1,
    title: "Giảm giá 20% cho vé xem phim",
    description:
      "Đặt vé online để nhận ngay ưu đãi giảm giá lên đến 20% cho tất cả các bộ phim chiếu rạp.",
    imageUrl: promo1,
    link: "/promotion-20-percent",
  },
  {
    id: 2,
    title: "Mua 1 tặng 1",
    description:
      "Mua 1 vé, tặng 1 vé miễn phí cho bộ phim yêu thích, áp dụng cho các suất chiếu buổi sáng.",
    imageUrl: promo2,
    link: "/promotion-buy-1-get-1",
  },
  {
    id: 3,
    title: "Giảm giá đặc biệt cho sinh viên",
    description:
      "Sinh viên được giảm giá 30% khi xuất trình thẻ sinh viên tại quầy vé. Đặt vé online để nhận ưu đãi thêm.",
    imageUrl: promo3,
    link: "/promotion-student-discount",
  },
];

export default promotions;
