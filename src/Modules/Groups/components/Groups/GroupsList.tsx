import { useEffect, useState } from "react";
import Styles from "./GroupsList.module.css";
import { GroupListResponse } from "../../../../interfaces/Groups/GroupsListResponse";
import axios, { AxiosError } from "axios";
import { GROUPS_URLs, requestHeader } from "../../../../constans/END_POINTS";
import DeleteConfirmationModal from "../../../Shared/components/DeleteConfirmationModal/DeleteConfirmationModal";
import { AxiosErrorResponse } from "../../../../interfaces/Authentication/AuthResponse";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import GroupsData from "../GroupsData/GroupsData";
import LoadingSpinner from "../../../../utils/components/loader";

export default function GroupsList() {
  const [groupsList, setGroupsList] = useState<GroupListResponse[]>([]);
  const [groupId, setGroupId] = useState("0");
  const [loading, setLoading] = useState<boolean>(false);
  const [counterLoading, setCounterLoadind] = useState<number>(0);
  const [showModal, setShowModal] = useState<boolean>(false);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModel = (projectId: string) => {
    setGroupId(projectId);
    setShowModal(true);
  };

  // For Add Group Modal
  const [showAddUpdateModal, setShowAddUpdateModal] = useState<boolean>(false);
  const handleOpenAddUpdateModal = () => setShowAddUpdateModal(true);
  const handleCloseAddUpdateModal = () => setShowAddUpdateModal(false);

  // Function to fetch the list of Groups from the API
  const getAllGroups = async () => {
    if (counterLoading == 0) {
      setLoading(true);
      setCounterLoadind(1);
    }
    try {
      const response = await axios.get(GROUPS_URLs.getAll, {
        headers: requestHeader(),
      });
      setGroupsList(response.data);
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(axiosError.response?.data.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to delete a Group
  const DeleteGroup = async () => {
    try {
      await axios.delete(GROUPS_URLs.delete(groupId), {
        headers: requestHeader(),
      });
      handleCloseModal();
      getAllGroups();
      toast.success("Group deleted successfully.");
    } catch (error) {
      const axiosError = error as AxiosError<AxiosErrorResponse>;
      toast.error(
        axiosError.response?.data.message ||
          "Failed to delete the Group. Please try again."
      );
    }
  };

  useEffect(() => {
    getAllGroups();
  }, []);

  return (
    <>
      {loading ? (
        <LoadingSpinner/>
      ) : (
        <>
          {/* Add Group Modal */}
          {showAddUpdateModal && (
            <GroupsData
              handleCloseAddUpdateModal={handleCloseAddUpdateModal}
              getAllGroups={getAllGroups}
            />
          )}

          {/* DeleteConfirmationModal component displays a confirmation dialog when deleting an item */}
          <DeleteConfirmationModal
            title="Group"
            showModal={showModal}
            handleCloseModal={handleCloseModal}
            handleDeleteModal={DeleteGroup}
          />

          {/* Container for the "Add Group" button, aligned to the right */}
          <div className="flex w-full justify-end my-5">
            <button
              onClick={handleOpenAddUpdateModal}
              className={`inline-flex items-center gap-2 rounded-full bg-transparent px-4 py-2 text-black shadow-sm focus:relative ${Styles["border-btn"]}`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 20 20"
                className="size-4"
              >
                <path
                  fill="#000"
                  d="M10 .313A9.686 9.686 0 00.312 10 9.686 9.686 0 0010 19.688 9.686 9.686 0 0019.688 10 9.686 9.686 0 0010 .312zm5.625 10.78a.47.47 0 01-.469.47h-3.594v3.593a.47.47 0 01-.468.469H8.906a.47.47 0 01-.469-.469v-3.594H4.845a.47.47 0 01-.469-.468V8.906a.47.47 0 01.469-.469h3.593V4.845a.47.47 0 01.47-.469h2.187a.47.47 0 01.469.469v3.593h3.593a.47.47 0 01.469.47v2.187z"
                ></path>
              </svg>
              Add Group
            </button>
          </div>

          {/* Main container for the group list */}
          <div
            className={`container mx-auto rounded-md p-5 ${Styles["border-btn"]}`}
          >
            <h4 className="py-2 text-lg font-semibold">Groups List</h4>

            {/* grid layout for displaying group items */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2 lg:gap-8">
              {groupsList.map((list) => (
                <div
                  key={list._id}
                  className={`rounded-lg flex flex-col sm:flex-row justify-between py-3 px-2 items-center ${Styles["border-btn"]}`}
                >
                  {/* Group details section */}
                  <div className="item mb-4 sm:mb-0">
                    <h5 className="text-base font-medium">
                      Group: {list.name}
                    </h5>
                    <p className="text-sm">
                      No. of students: {list.students.length}
                    </p>
                  </div>

                  {/* Edit and Delete button container */}
                  <div className="item-2">
                    <span className="inline-flex overflow-hidden">
                      {/* Edit button */}
                      <button
                        className="inline-block p-3 text-gray-700 hover:bg-gray-50 focus:relative"
                        title="Edit Product"
                        onClick={handleOpenAddUpdateModal}
                      >
                        <Link
                          to={`/dashboard/groups-edit/${list._id}`}
                          state={{ GroupData: list, type: "edit" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="19"
                            height="19"
                            fill="none"
                            viewBox="0 0 19 19"
                          >
                            <path
                              fill="#222"
                              d="M4 15.011l4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414 0-.534-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L4 10.581v4.43zM15.045 2.456l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM6 11.416l6.03-5.974 1.586 1.586L7.587 13 6 13.004v-1.589z"
                            ></path>
                            <path
                              fill="#222"
                              d="M2 19h14c1.103 0 2-.897 2-2V8.332l-2 2V17H5.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H2V3h6.847l2-2H2C.897 1 0 1.897 0 3v14c0 1.103.897 2 2 2z"
                            ></path>
                          </svg>
                        </Link>
                      </button>

                      {/* Delete button */}
                      <button
                        className="inline-block p-3 hover:bg-gray-50 focus:relative"
                        title="Delete Product"
                        onClick={() => handleShowModel(list._id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="20"
                          fill="none"
                          viewBox="0 0 18 20"
                        >
                          <path
                            fill="#222"
                            d="M5.438 2.313H5.25a.188.188 0 00.188-.188v.188zm0 0h7.125v-.188c0 .103.084.188.187.188h-.188V4h1.688V2.125c0-.827-.673-1.5-1.5-1.5h-7.5c-.827 0-1.5.673-1.5 1.5V4h1.688V2.312zM17.25 4H.75a.75.75 0 00-.75.75v.75c0 .103.084.188.188.188h1.415l.579 12.257c.038.8.698 1.43 1.498 1.43h10.64c.802 0 1.46-.628 1.498-1.43l.579-12.258h1.416A.188.188 0 0018 5.5v-.75a.75.75 0 00-.75-.75zm-3.11 13.688H3.86l-.567-12h11.414l-.567 12z"
                          ></path>
                        </svg>
                      </button>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
