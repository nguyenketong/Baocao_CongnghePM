import { toast } from "react-toastify";
import { 
  getProjectCategory, 
  create, 
  deleteProjectCategory, 
  updateProjectCategory, 
  getProjectCategoryById 
} from "../../app/services/projectCategoryService"; // Thay tên service nếu cần

// Lấy danh sách danh mục
export const fetchProjectCategories = async (setProjectCategories: React.Dispatch<React.SetStateAction<any>>) => {
  try {
    const data = await getProjectCategory();
    setProjectCategories(data);
  } catch (error) {
    toast.error("Lỗi khi lấy danh mục!");
    console.error("Lỗi khi lấy danh mục:", error);
  }
};

// Thêm danh mục mới
export const handleAdd = async (name: string, setName: React.Dispatch<React.SetStateAction<string>>, fetchProjectCategories: () => void) => {
  if (!name.trim()) {
    toast.error("Tên danh mục không được để trống!");
    return;
  }
  try {
    await create(name);
    toast.success("Thêm danh mục thành công!");
    setName("");
    fetchProjectCategories();
  } catch (error) {
    toast.error("Lỗi khi thêm danh mục!");
    console.error("Lỗi khi thêm danh mục:", error);
  }
};

// Xóa danh mục
export const handleDelete = async (id: string, fetchProjectCategories: () => void) => {
  try {
    await deleteProjectCategory(id);
    toast.success("Xóa danh mục thành công!");
    fetchProjectCategories();
  } catch (error) {
    toast.error("Lỗi khi xóa danh mục!");
    console.error("Lỗi khi xóa danh mục:", error);
  }
};

// Lấy thông tin danh mục để chỉnh sửa
export const handleEditClick = async (id: string, setEditId: React.Dispatch<React.SetStateAction<string | null>>, setEditName: React.Dispatch<React.SetStateAction<string>>) => {
  try {
    const projectCategory = await getProjectCategoryById(id);
    setEditId(id);
    setEditName(projectCategory.projectCategoryName);
  } catch (error) {
    toast.error("Lỗi khi lấy thông tin danh mục!");
    console.error("Lỗi khi lấy thông tin danh mục:", error);
  }
};

// Cập nhật danh mục
export const handleUpdate = async (editId: string | null, editName: string, setEditId: React.Dispatch<React.SetStateAction<string | null>>, setEditName: React.Dispatch<React.SetStateAction<string>>, fetchProjectCategories: () => void) => {
  if (!editId || !editName.trim()) {
    toast.error("Tên danh mục không được để trống!");
    return;
  }
  try {
    await updateProjectCategory(editId, editName);
    toast.success("Cập nhật danh mục thành công!");
    setEditId(null);
    setEditName("");
    fetchProjectCategories();
  } catch (error) {
    toast.error("Lỗi khi cập nhật danh mục!");
    console.error("Lỗi khi cập nhật danh mục:", error);
  }
};
