import React, { useEffect, useState } from "react";
import { getTrainingData, deleteTrainingData } from "../../api/trainingApi";
import { useNavigate } from "react-router-dom";

const TrainingList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadData = async () => {
    try {
      const res = await getTrainingData();
      setData(res);
    } catch (err) {
      console.error(err);
      alert("Failed to load training data");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete training data?")) return;

    try {
      await deleteTrainingData(id);
      loadData();
    } catch (err) {
      alert("Delete failed");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Training Data</h2>
      <button onClick={() => navigate("/training/add")} style={{ marginBottom: "1rem" }}>
        + Add Training
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border="1" cellPadding="10" width="100%">
          <thead>
            <tr>
              <th>Question</th>
              <th>Answer</th>
              <th>Tags</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td>{item.question}</td>
                <td>{item.answer}</td>
                <td>{item.tags?.join(", ")}</td>
                <td>
                  <button onClick={() => navigate(`/training/edit/${item._id}`)}>
                    Edit
                  </button>
                  &nbsp;
                  <button onClick={() => handleDelete(item._id)} style={{ color: "red" }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No training data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default TrainingList;
