// src/pages/SuperAdmin/page/TrainingPage.jsx
import React, { useState, useEffect } from "react";
import api from "../../../api/axios";

const TrainingPage = () => {
  const [trainingData, setTrainingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const [form, setForm] = useState({
    question: "",
    answer: "",
    tags: "",
    context: "",
  });

  // Fetch all training data
  useEffect(() => {
    fetchTraining();
  }, []);

  const fetchTraining = async () => {
    try {
      const { data } = await api.get("/training/all");
      setTrainingData(data);
    } catch {
      alert("Failed to load training data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.question || !form.answer) {
      alert("Question and Answer are required!");
      return;
    }

    try {
      const payload = {
        question: form.question,
        answer: form.answer,
        tags: form.tags ? form.tags.split(",").map(t => t.trim()) : [],
        context: form.context || "",
      };

      await api.post("/training/add", payload);
      alert("Training data added successfully!");
      setForm({ question: "", answer: "", tags: "", context: "" });
      setShowForm(false);
      fetchTraining(); // refresh
    } catch {
      alert("Failed to add training data");
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Header with Button on Right */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-4xl font-extrabold bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            AI Training Center
          </h1>
          <p className="text-lg text-gray-600">
            Train your chatbot to answer perfectly
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-2 text-lg font-bold text-white bg-linear-to-r from-green-600 to-emerald-600 rounded-lg shadow-md hover:shadow-emerald-600/60 transform hover:scale-105 transition-all duration-300"
        >
          {showForm ? "CANCEL" : "+ Add Training Data"}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-10 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-6">Add New Q&A</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Question"
              value={form.question}
              onChange={(e) => setForm({ ...form, question: e.target.value })}
              className="w-full px-4 py-3 text-base border rounded-lg focus:border-blue-500"
              required
            />
            <textarea
              placeholder="Answer"
              value={form.answer}
              onChange={(e) => setForm({ ...form, answer: e.target.value })}
              rows="4"
              className="w-full px-4 py-3 text-base border rounded-lg focus:border-blue-500"
              required
            />
            <input
              type="text"
              placeholder="Tags (comma separated)"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              className="w-full px-4 py-3 text-base border rounded-lg"
            />
            <input
              type="text"
              placeholder="Context (optional)"
              value={form.context}
              onChange={(e) => setForm({ ...form, context: e.target.value })}
              className="w-full px-4 py-3 text-base border rounded-lg"
            />
            <div className="text-center">
              <button
                type="submit"
                className="px-10 py-3 text-lg font-bold text-white bg-linear-to-r from-green-600 to-teal-600 rounded-lg hover:shadow-lg transform hover:scale-105 transition"
              >
                SAVE TRAINING DATA
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TRAINING TABLE */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-blue-600 to-indigo-700 text-white p-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Current Training Data</h2>
          <p className="text-base">{trainingData.length} Q&A pairs</p>
        </div>

        {loading ? (
          <div className="p-10 text-center text-lg text-gray-500">Loading...</div>
        ) : trainingData.length === 0 ? (
          <div className="p-10 text-center text-lg text-gray-500">No training data yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm">Question</th>
                  <th className="px-6 py-3 text-left text-sm">Answer</th>
                  <th className="px-6 py-3 text-left text-sm">Tags</th>
                  <th className="px-6 py-3 text-left text-sm">Context</th>
                  <th className="px-6 py-3 text-left text-sm">Added</th>
                </tr>
              </thead>
              <tbody>
                {trainingData.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-blue-50">
                    <td className="px-6 py-4 text-sm font-medium">{item.question}</td>
                    <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate">{item.answer}</td>
                    <td className="px-6 py-4">
                      {item.tags?.map((tag) => (
                        <span key={tag} className="inline-block px-2 py-1 mr-1 text-xs bg-blue-100 text-blue-800 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.context || "—"}</td>
                    <td className="px-6 py-4 text-xs text-gray-500">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrainingPage;