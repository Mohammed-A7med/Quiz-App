export interface GroupListResponse {
  _id: string;
  name: string;
  status: "active" | "inactive";
  instructor: string;
  students: string[];
  max_students: number;
}
