import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import api from "../services/api";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });

  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const [imagePreview, setImagePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);

  // 🟢 LOAD PRODUCT DATA
  useEffect(() => {
    const fetchProduct = async () => {
      const res = await api.get(`/products/${id}`);

      const data = res.data;

      setForm({
        title: data.title,
        price: data.price,
        location: data.location,
        description: data.description,
      });

      // existing images preview
      setImagePreview(data.images || []);

      // existing video preview
      setVideoPreview(data.video || null);
    };

    fetchProduct();
  }, [id]);

  // 🟢 HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🟢 NEW IMAGE SELECT
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);

    const previewUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreview(previewUrls);
  };

  // 🟢 NEW VIDEO SELECT
  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    setVideo(file);

    if (file) {
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  // 🟢 UPDATE PRODUCT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("location", form.location);
    formData.append("description", form.description);

    images.forEach((img) => formData.append("images", img));

    if (video) {
      formData.append("video", video);
    }

    await api.put(`/products/${id}`, formData);

    alert("Product updated ✅");
    navigate("/my-products");
  };

  const uploadBoxStyle = {
    border: "2px dashed #530ee9",
    padding: "20px",
    textAlign: "center",
    borderRadius: "10px",
    cursor: "pointer",
    color: "#530ee9",
    fontWeight: "600",
    background: "#f5f3ff",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #0f172a, #1e293b)",
        padding: 20,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 500,
          background: "#fff",
          padding: 30,
          borderRadius: 15,
          boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
          display: "flex",
          flexDirection: "column",
          gap: 15,
        }}
      >
        <h2 style={{ textAlign: "center", color: "black" }}>
          Edit Product ✏️
        </h2>

        <TextField name="title" label="Title" value={form.title} onChange={handleChange} fullWidth />
        <TextField name="price" label="Price" value={form.price} onChange={handleChange} fullWidth />
        <TextField name="location" label="Location" value={form.location} onChange={handleChange} fullWidth />
        <TextField
          name="description"
          label="Description"
          multiline
          rows={4}
          value={form.description}
          onChange={handleChange}
          fullWidth
        />

        {/* IMAGE PREVIEW */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {imagePreview.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="preview"
              style={{
                width: 80,
                height: 80,
                objectFit: "cover",
                borderRadius: 8,
                border: "2px solid #530ee9",
              }}
            />
          ))}
        </div>

        <label style={uploadBoxStyle}>
          📸 Choose New Images
          <input type="file" multiple hidden onChange={handleImageChange} />
        </label>

        {videoPreview && (
          <video src={videoPreview} controls style={{ width: "100%", borderRadius: 10 }} />
        )}

        <label style={uploadBoxStyle}>
          🎬 Choose New Video
          <input type="file" accept="video/*" hidden onChange={handleVideoChange} />
        </label>

        <button
          type="submit"
          style={{
            padding: "14px",
            background: "linear-gradient(to right, #7c3aed, #530ee9)",
            color: "#fff",
            fontSize: 16,
            border: "none",
            borderRadius: 10,
            fontWeight: "bold",
          }}
        >
          Update Product
        </button>
      </form>
    </div>
  );
}

export default EditProduct;