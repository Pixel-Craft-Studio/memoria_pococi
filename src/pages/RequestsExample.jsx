import { useState } from "react";
import { ENDPOINTS } from "../api/api_constants";
import {
  useGetAll,
  useGetById,
  usePost,
  usePatch,
  useDelete,
} from "../hooks/useBaseEndpointQueries";

const ID_EXAMPLE = "about-usa";

const Example = () => {
  const [newData, setNewData] = useState({ key: "", content: "" });
  const [updateData, setUpdateData] = useState({ key: "", content: "" });
  const [deleteId, setDeleteId] = useState("");

  // Hooks para las solicitudes
  const {
    data: allData,
    isFetching: isFetchingAll,
    error: errorAll,
  } = useGetAll(ENDPOINTS.CONFIGURATION);
  const { data, isFetching, error } = useGetById(
    ENDPOINTS.CONFIGURATION,
    ID_EXAMPLE
  );

  const {
    data: createDataResponse,
    mutate: postDataApi,
    isLoading: isPosting,
    error: postError,
  } = usePost(ENDPOINTS.CONFIGURATION);

  const {
    data: updateDataResponse,
    mutate: updateDataApi,
    isLoading: isPatching,
    error: patchError,
  } = usePatch(ENDPOINTS.CONFIGURATION);
  
  const {
    data: deleteDataResponse,
    mutate: deleteDataApi,
    isLoading: isDeleting,
    error: deleteError,
  } = useDelete(ENDPOINTS.CONFIGURATION);

  if (isFetchingAll || isFetching) return <div>Loading...</div>;
  if (errorAll || error)
    return (
      <div>An error has occurred: {error.message || errorAll.message}</div>
    );

  const handleCreate = () => {
    postDataApi({ ...newData, content: JSON.parse(newData.content) });
  };

  const handleUpdate = (id) => {
    updateDataApi({
      id,
      data: { ...updateData, content: JSON.parse(updateData.content) },
    });
  };

  const handleDelete = (id) => {
    deleteDataApi(id);
  };

  return (
    <div>
      <h1>Social Platform</h1>

      <h2>All Data</h2>
      <pre>{JSON.stringify(allData, null, 2)}</pre>

      <h2>Data by ID</h2>
      <pre>{JSON.stringify(data?.data, null, 2)}</pre>

      <h2>Create New Data</h2>
      <input
        type="text"
        placeholder="Name"
        value={newData.key}
        onChange={(e) => setNewData({ ...newData, key: e.target.value })}
      />
      <input
        type="text"
        placeholder="Icon URL"
        value={newData.content}
        onChange={(e) => setNewData({ ...newData, content: e.target.value })}
      />
      <button onClick={handleCreate} disabled={isPosting}>
        Create
      </button>
      {postError && <p>Error: {postError.message}</p>}

      <h2>Update Data</h2>
      <input
        type="text"
        placeholder="Name"
        value={updateData.key}
        onChange={(e) => setUpdateData({ ...updateData, key: e.target.value })}
      />
      <input
        type="text"
        placeholder="Icon URL"
        value={updateData.content}
        onChange={(e) =>
          setUpdateData({ ...updateData, content: e.target.value })
        }
      />
      <button onClick={() => handleUpdate(ID_EXAMPLE)} disabled={isPatching}>
        Update
      </button>
      {patchError && <p>Error: {patchError.message}</p>}

      <h2>Delete Data</h2>
      <input
        type="text"
        placeholder="ID to delete"
        value={deleteId}
        onChange={(e) => setDeleteId(e.target.value)}
      />
      <button onClick={() => handleDelete(deleteId)} disabled={isDeleting}>
        Delete
      </button>
      {deleteError && <p>Error: {deleteError.message}</p>}

      {isPosting && <p>Posting data...</p>}
      {isPatching && <p>Patching data...</p>}
      {isDeleting && <p>Deleting data...</p>}
    </div>
  );
};

export default Example;
