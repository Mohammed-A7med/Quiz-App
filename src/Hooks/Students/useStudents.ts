import axios from "axios";
import { useEffect, useState } from "react";
import { STUDENTS_URLs, requestHeader } from "../../constans/END_POINTS";
import { StudentListResponse } from "../../interfaces/Student/StudentListResponse";

const useStudents = () => {
  const [studentsList, setStudentsList] = useState<StudentListResponse[]>([]);
  const [selectedStudentsList, setSelectedStudentsList] = useState<string[]>([]);

  const getAllStudents = async () => {
    try {
      const response = await axios.get(STUDENTS_URLs.getAll, {
        headers: requestHeader(),
      });
      setStudentsList(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllStudents();
  }, []);

  return {
    studentsList,
    selectedStudentsList,
    setSelectedStudentsList,
  };
};

export default useStudents