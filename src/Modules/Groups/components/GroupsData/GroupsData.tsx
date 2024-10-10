import axios, { AxiosError } from "axios";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import useStudents from "../../../../Hooks/Students/useStudents";
import { GROUPS_URLs, requestHeader } from "../../../../constans/END_POINTS";
import { RequiredField } from "../../../../constans/VALIDATIONS";
import { GroupFormData } from "../../../../interfaces/Groups/GroupFormData";
import { toast } from "react-toastify";
import { AxiosErrorResponse } from "../../../../interfaces/Authentication/AuthResponse";

export default function GroupsData({
  handleCloseAddUpdateModal,
  getAllGroups,
}: any) {
  const navigate = useNavigate();
  const location = useLocation();
  const status = location.state?.type === "edit";
  const groupData = location.state?.GroupData;
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GroupFormData>();

  const onSubmit = async (data: GroupFormData) => {
    try {
      await axios({
        method: status ? "put" : "post",
        baseURL: status
          ? GROUPS_URLs.update(groupData._id)
          : GROUPS_URLs.create,
        data: data,
        headers: requestHeader(),
      });
      if (status) {
        toast.success("Task updated! All changes have been saved.");
        navigate("/dashboard/groups");
      } else {
        toast.success("New task has been added successfully.");
        navigate("/dashboard/groups");
      }
      getAllGroups();
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    }
  };

  const { studentsList, selectedStudentsList, setSelectedStudentsList } =
    useStudents();

  useEffect(() => {
    if (status && groupData) {
      setSelectedStudentsList(groupData.students);
    }
  }, [status, groupData]);
  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900 bg-opacity-50`}
    >
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center p-4 ">
          <h5 className="text-lg font-semibold">Modal title</h5>
          <button
            type="button"
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="10"
              height="12"
              fill="none"
              viewBox="0 0 10 12"
              onClick={() => {
                reset({ name: "" });
                navigate("/dashboard/groups");
                handleCloseAddUpdateModal();
              }}
            >
              <path
                fill="#0D1321"
                d="M6.483 6.11L9.13 2.8c.325-.405.325-1.064 0-1.47L8.542.593c-.325-.406-.852-.406-1.177 0l-2.647 3.31L2.07.594C1.745.188 1.22.188.894.594l-.589.735c-.325.407-.325 1.065 0 1.472l2.648 3.31L.305 9.42c-.325.406-.325 1.065 0 1.472l.589.735c.324.406.851.406 1.176 0l2.648-3.31 2.647 3.31c.325.406.852.406 1.177 0l.588-.736c.325-.406.325-1.064 0-1.47L6.483 6.11z"
              ></path>
            </svg>
          </button>
        </div>
        <div className="p-4 ">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-5 flex border-2 rounded-lg   outline-none focus-within:ring-1 relative">
              <label
                htmlFor="name"
                className="bg-secondColor p-2 font-semibold flex justify-center min-w-20"
              >
                Group Name
              </label>
              <input
                id="name"
                className="pl-3 text-black outline-none flex-1 border-none bg-transparent py-1.5 placeholder:text-gray-400 truncate"
                {...register("name", RequiredField("Name"))}
                defaultValue={status ? groupData.name : ""}
              />
            </div>
            {errors.name && (
              <span className="text-red-500 ps-1 text-xs md:text-sm lg:text-base block mt-1">
                {errors.name.message}
              </span>
            )}

            <div className="mt-5 border-2 rounded-lg outline-none focus-within:ring-1 relative">
              <label
                htmlFor="students"
                className="flex justify-center p-2 font-semibold bg-secondColor min-w-20"
              >
                List Students
              </label>
              <select
                className="px-2 rounded-r-md outline-none flex-1 border-none  bg-transparent py-1.5 pl-1 text-black placeholder:text-gray-400  sm:text-sm sm:leading-5 w-full"
                {...register("students", RequiredField("List Students"))}
                id="students"
                value={selectedStudentsList}
                onChange={(e) =>
                  setSelectedStudentsList(
                    Array.from(
                      e.target.selectedOptions,
                      (option) => option.value
                    )
                  )
                }
                multiple
              >
                {studentsList.map((student) => (
                  <option key={student._id} value={student._id}>
                    {`${student.first_name} ${student.last_name}`}
                  </option>
                ))}
              </select>
            </div>
            {errors.students && (
              <span className="text-red-500 ps-1 text-xs md:text-sm lg:text-base block mt-1">
                {errors.students.message}
              </span>
            )}

            <div className="flex justify-end items-center p-4">
              <button
                type="button"
                className="border-2 border-gray-200 text-gray-700 rounded px-4 py-2 mr-2 hover:bg-gray-200"
                aria-label="Cancel"
                onClick={() => {
                  reset({ name: "" });
                  navigate("/dashboard/groups");
                  handleCloseAddUpdateModal();
                }}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white rounded px-4 py-2 hover:bg-white hover:text-black"
              >
                add
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
