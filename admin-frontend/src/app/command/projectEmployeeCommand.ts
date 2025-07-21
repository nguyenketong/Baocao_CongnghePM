

// Hàm gọi API để lấy thông tin nhân viên
export const fetchEmployeeById = async (employeeId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/employees/${employeeId}`);
    if (!response.ok) {
      throw new Error("Không thể lấy thông tin nhân viên");
    }
    return await response.json();
  } catch (error) {
    console.error("Lỗi khi lấy thông tin nhân viên:", error);
    throw error;
  }
};

// Hàm gọi API để lấy danh sách dự án nếu nhân viên là Technical Lead
export const fetchProjectsForLead = async (employeeId: string) => {
  try {
    const response = await fetch(`http://localhost:3000/employees/project/${employeeId}`);
    if (!response.ok) {
      throw new Error("Không thể lấy dự án của Technical Lead");
    }
    const data = await response.json();
    console.log("Fetched Projects:", data); // Log the data
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy dự án của Technical Lead:", error);
    throw error;
  }
};

