import { SelectOption } from "@/app/components/hook/progress/editprogressItemHandle";


// Factory để chuyển đổi dữ liệu từ API thành SelectOption[]
export const mapToSelectOptions = <T extends { _id: string; [key: string]: any }>(
  data: T[],
  labelKey: keyof T
): SelectOption[] => {
  return data.map((item) => ({
    value: item._id,
    label: item[labelKey] as string,
  }));
};
