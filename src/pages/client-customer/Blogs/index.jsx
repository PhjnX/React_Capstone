/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import postsData from "./postsData";
import classNames from "classnames";

const tabs = [
  { id: "latest", label: "Mới nhất" },
  { id: "popular", label: "Xem nhiều nhất" },
];

// Tabs Component
const Tabs = ({ activeTab, setActiveTab }) => (
  <div className="flex justify-center mt-5 space-x-5">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className={classNames(
          "pb-2 text-lg font-semibold transition-colors duration-300",
          activeTab === tab.id
            ? "text-black border-b-2 border-[#AC98E0]"
            : "text-gray-400 hover:text-gray-600"
        )}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </button>
    ))}
  </div>
);

// PostList Component
const PostList = ({ posts }) => (
  <motion.div
    className="grid grid-cols-2 md:grid-cols-4 gap-5 mt-6"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.3 }}
  >
    {posts.map((post) => (
      <motion.a
        key={post.id}
        href="https://www.momo.vn/cinema/blog?fromType=nav_menu"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition block cursor-pointer"
        whileHover={{ scale: 1.05 }}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-40 object-cover"
        />
        <div className="p-3">
          {post.tag && (
            <span className="text-xs bg-black text-white px-2 py-1 rounded">
              {post.tag}
            </span>
          )}
          <h3 className="mt-2 text-sm font-semibold">{post.title}</h3>
          <p className="text-gray-400 text-xs mt-1">{post.views}</p>
        </div>
      </motion.a>
    ))}
  </motion.div>
);

// Blog Component
export default function Blog() {
  const [activeTab, setActiveTab] = useState("latest");

  const posts = useMemo(() => postsData[activeTab], [activeTab]);

  return (
    <div className="bg-white p-10">
      <h2 className="text-center text-3xl font-bold text-[#AC98E0] font-nunito">
        BLOG PHIM ẢNH
      </h2>
      <p className="text-center text-gray-500">
        Tổng hợp và Review các bộ phim hot, bom tấn, phim chiếu rạp hay mỗi ngày
      </p>

      {/* Tabs */}
      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Danh sách bài viết */}
      <AnimatePresence mode="wait">
        <PostList key={activeTab} posts={posts} />
      </AnimatePresence>
    </div>
  );
}
