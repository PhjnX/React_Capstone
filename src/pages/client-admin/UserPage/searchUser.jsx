// import React from 'react'
// import api from '../../services/api';

// export default function SearchUser() {
//     const [query, setQuery] = useState("");
//     const [users, setUsers] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState("");
  
//     const fetchUsers = async () => {
//       if (!query) return; // Không gọi API nếu input rỗng
//       setLoading(true);
//       try {
//         const response = await api.get(`QuanLyNguoiDung/TimKiemNguoiDung?MaNhom=GP01`);
//         setUsers(response.data); // Giả sử API trả về danh sách người dùng
//       } catch (err) {
//         setError("Lỗi khi tìm kiếm người dùng!");
//       } finally {
//         setLoading(false);
//       }
//     };
  
//     useEffect(() => {
//       const delayDebounce = setTimeout(() => {
//         fetchUsers();
//       }, 500); // Đợi 500ms sau khi nhập mới gọi API
  
//       return () => clearTimeout(delayDebounce); // Xóa timeout khi nhập tiếp
//     }, [query]);
//   return (
//     <div>
//     <input
//       type="text"
//       placeholder="Tìm kiếm người dùng..."
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//     />
//     {loading && <p>Đang tìm kiếm...</p>}
//     {error && <p>{error}</p>}
//     <ul>
//       {users.map((user) => (
//         <li key={user.id}>{user.name}</li>
//       ))}
//     </ul>
//   </div>
//   )
// }
