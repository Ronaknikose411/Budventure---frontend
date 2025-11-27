import React, { useEffect, useState } from "react";
import {
  addTrainingData,
  updateTrainingData,
  getTrainingData,
} from "../../api/trainingApi";
import { useNavigate, useParams } from "react-router-dom";

const TrainingForm = () => {
  const { id } = useParams(); // undefined for create
  const navigate = useNavigate();

  const [form, setForm] = useState({
    question: "",
    answer: "",
    tags: "",
    context: "",
  });

  const isEdit = Boolean(id);

  useEffect(() => {
    if (isEdit) {
      loadExisting();
    }
  }, [id]);

  const loadExisting = async () => {
    try {
      const all = await getTrainingData();
      const item = all.find((x) => x._id === id);

      if (item) {
        setForm({
          question: item.question,
          answer: item.answer,
          tags: item.tags?.join(", "),
          context: item.context || "",
        });
      }
    } catch (err) {
      console.error(err);
      alert("Failed to load training details");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    const payload = {
      question: form.question,
      answer: form.answer,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      context: form.context.trim(),
    };

    try {
      if (isEdit) {
        await updateTrainingData(id, payload);
      } else {
        await addTrainingData(payload);
      }
      navigate("/training");
    } catch (err) {
      console.error(err);
      alert("Save failed");
    }
  };

  return (
    <div style={{ padding: "2rem", maxWidth: "700px" }}>
      <h2>{isEdit ? "Edit Training Data" : "Add Training Data"}</h2>

      <form onSubmit={submit}>
        <label>Question</label>
        <input
          name="question"
          value={form.question}
          onChange={handleChange}
          required
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Answer</label>
        <textarea
          name="answer"
          value={form.answer}
          onChange={handleChange}
          required
          rows="3"
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Tags (comma separated)</label>
        <input
          name="tags"
          value={form.tags}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <label>Context (optional)</label>
        <input
          name="context"
          value={form.context}
          onChange={handleChange}
          style={{ width: "100%", marginBottom: "1rem" }}
        />

        <button type="submit">
          {isEdit ? "Update" : "Create"}
        </button>
      </form>
    </div>
  );
};

export default TrainingForm;
