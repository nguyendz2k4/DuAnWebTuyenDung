import { useState, useEffect } from "react"; // <-- THÊM
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import UserMetaCard from "../components/UserProfile/UserMetaCard";
import UserInfoCard from "../components/UserProfile/UserInfoCard";
import UserAddressCard from "../components/UserProfile/UserAddressCard";
import PageMeta from "../components/common/PageMeta";

// Định nghĩa kiểu dữ liệu cho user (dựa trên ảnh CSDL của bạn)
type UserData = {
  user_id: number;
  username: string;
  email: string;
  role: 'job_seeker' | 'employer' | 'admin';
  status: number;
  created_at: string;
};

export default function UserProfiles() {
  // --- THÊM LOGIC LẤY DỮ LIỆU ---
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Hàm để lấy dữ liệu
    const fetchUserProfile = async () => {
      try {
        // 1. Lấy userId từ localStorage (đã lưu khi đăng nhập)
        const userId = localStorage.getItem("userId");
        if (!userId) {
          throw new Error("Không tìm thấy userId. Vui lòng đăng nhập lại.");
        }

        // 2. Gọi API (đảm bảo URL này đúng)
        const res = await fetch(`http://localhost/BE/api/getUserProfile.php?id=${userId}`);

        if (!res.ok) {
          throw new Error("Lỗi khi kết nối mạng");
        }

        const data = await res.json();

        // 3. Cập nhật state
        if (data.success) {
          setUser(data.user);
        } else {
          throw new Error(data.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []); // Mảng rỗng [] nghĩa là chạy 1 lần khi component được tải
  // --- KẾT THÚC LOGIC LẤY DỮ LIỆU ---


  // --- XỬ LÝ GIAO DIỆN KHI ĐANG TẢI HOẶC LỖI ---
  if (loading) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold">Đang tải hồ sơ...</h3>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-red-500">Lỗi: {error}</h3>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6">
        <h3 className="text-lg font-semibold text-red-500">Không tìm thấy dữ liệu người dùng.</h3>
      </div>
    );
  }

  // --- TRẢ VỀ GIAO DIỆN KHI CÓ DỮ LIỆU ---
  return (
    <>
      <PageMeta
        title={`${user.username} Profile | TailAdmin`}
        description="Trang hồ sơ cá nhân"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Hồ sơ của: {user.username}
        </h3>
        <div className="space-y-6">
          {/* THÊM props "user" vào đây */}
          <UserMetaCard user={user} />
          <UserInfoCard user={user} />

          {/* LƯU Ý: Bảng 'users' của bạn không có thông tin địa chỉ.
            Component <UserAddressCard /> này sẽ không có gì để hiển thị
            trừ khi bạn thêm cột (address, city, v.v.) vào CSDL.
            Tôi vẫn để nó ở đây, và bạn có thể truyền "user" vào
            hoặc tạm thời ẩn nó đi.
          */}
          <UserAddressCard user={user} />
        </div>
      </div>
    </>
  );
}