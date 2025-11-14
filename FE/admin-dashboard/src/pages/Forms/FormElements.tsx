import { useState } from "react";
import { FaBriefcase, FaMapMarkerAlt, FaMoneyBill, FaUsers } from "react-icons/fa";
import { MdBusinessCenter } from "react-icons/md";
import SelectInputs from "../../components/form/form-elements/SelectInputs";
import axios from "axios";

export default function JobPostForm() {
  const [formData, setFormData] = useState({
    title: "",
    jobRequest: "",
    location: "",
    salary: "",
    number: "",
    workType: "",
    education: "",
    position: "",
    description: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost/DuAnWebTuyenDung/BE/admin/job-post.php", formData);
      alert("🎉 Đăng bài thành công!");
    } catch (error) {
      alert("⚠️ Lỗi khi đăng bài!");
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
        <FaBriefcase className="text-blue-600" /> Đăng bài tuyển dụng
      </h2>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Cột trái */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Tiêu đề công việc</label>
            <div className="relative">
              <MdBusinessCenter className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="title"
                placeholder="VD: Lập trình viên ReactJS"
                className="w-full border border-gray-300 rounded-lg pl-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">Yêu cầu công việc</label>
            <input
              type="text"
              name="company"
              placeholder="VD: Có kinh nghiệm 1 năm trở lên"
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">Địa điểm</label>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="location"
                placeholder="VD: TP. Hồ Chí Minh"
                className="w-full border border-gray-300 rounded-lg pl-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Cột phải */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 mb-1 font-medium">Mức lương</label>
            <div className="relative">
              <FaMoneyBill className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                name="salary"
                placeholder="VD: 15 - 25 triệu / tháng"
                className="w-full border border-gray-300 rounded-lg pl-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">Số lượng tuyển</label>
            <div className="relative">
              <FaUsers className="absolute left-3 top-3 text-gray-400" />
              <input
                type="number"
                name="number"
                placeholder="VD: 5"
                className="w-full border border-gray-300 rounded-lg pl-10 p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-600 mb-1 font-medium">Ngành nghề</label>
            <SelectInputs onChange={(data) => setFormData((prev) => ({ ...prev, ...data }))} />
          </div>
        </div>

        {/* Toàn hàng: mô tả */}
        <div className="md:col-span-2">
          <label className="block text-gray-600 mb-1 font-medium">Mô tả công việc</label>
          <textarea
            name="description"
            placeholder="Nhập mô tả chi tiết công việc..."
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            rows="5"
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg shadow transition-transform transform hover:scale-[1.02]"
          >
            🚀 Đăng bài
          </button>
        </div>
      </form>
    </div>
  );
}
