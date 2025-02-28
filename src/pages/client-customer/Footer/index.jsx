import logo from "./../../../assets/images/logo-footer.png";

export default function Footer() {
  const socialIcons = [
    "Facebook",
    "YouTube",
    "Twitter",
    "Instagram",
    "Dribbble",
  ];
  const footerLinks = [
    {
      title: "GIỚI THIỆU",
      links: [
        "Về Chúng Tôi",
        "Thoả Thuận Sử Dụng",
        "Quy Chế Hoạt Động",
        "Chính Sách Bảo Mật",
      ],
    },
    {
      title: "GÓC ĐIỆN ẢNH",
      links: [
        "Thể Loại Phim",
        "Bình luận Phim",
        "Blog Điện Ảnh",
        "Phim Hay Tháng",
        "Phim IMAX",
      ],
    },
    {
      title: "Hỗ trợ",
      links: ["Hỏi Đáp", "Liên Hệ", "Chính Sách Hoàn Tiền"],
    },
  ];

  return (
    <footer className="bg-black dark:bg-gray-900">
      <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
        <div className="md:flex md:justify-between">
          <div>
            <a href="#" className="flex items-center">
              <img src={logo} className="h-56 me-3" alt="FlowBite Logo" />
            </a>
            <div className="flex mt-4 space-x-5">
              {socialIcons.map((icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-white"
                ></a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:gap-52 sm:grid-cols-3">
            {footerLinks.map(({ title, links }, index) => (
              <div key={index}>
                <h2 className="mb-6 text-sm font-semibold text-white uppercase">
                  {title}
                </h2>
                <ul className="text-gray-400 font-medium">
                  {links.map((link, i) => (
                    <li key={i} className="mb-4">
                      <a href="#" className="hover:underline">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
