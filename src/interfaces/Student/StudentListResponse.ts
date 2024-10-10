export interface StudentListResponse {
  _id: string;
  status: "active" | "inactive";
  first_name: string;
  last_name: string;
  email: string;
  role: "Student" | "Instructor";
}
