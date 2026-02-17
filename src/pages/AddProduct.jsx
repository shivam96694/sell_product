import { useState } from "react";
import api from "../services/api";
import TextField from "@mui/material/TextField";
function AddProduct() {
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
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  

 const handleImageChange = (e) => {
  const files = Array.from(e.target.files);
  setImages(files);

  const previewUrls = files.map((file) => URL.createObjectURL(file));
  setImagePreview(previewUrls);
};

  const handleVideoChange = (e) => {
  const file = e.target.files[0];
  setVideo(file);

  if (file) {
    setVideoPreview(URL.createObjectURL(file));
  }
};

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", form.title);
    formData.append("price", form.price);
    formData.append("location", form.location);
    formData.append("description", form.description);

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    formData.append("video", video);

    try {
      await api.post("/products", formData);
      alert("Product added ✅");
    } catch (err) {
      console.log(err);
      alert("Error uploading product");
    }
  };

  const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #cbd5e1",
  fontSize: "15px",
  outline: "none",
};

const labelStyle = {
  fontWeight: "600",
  marginTop: "5px",
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
  transition: "0.3s",
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
      <h2 style={{ textAlign: "center", marginBottom: 10 ,color:'black'}}>
        Add Product 🚀
      </h2>

   <TextField
  name="title"
  label="Title"
  onChange={handleChange}
  fullWidth
/>

<TextField
  name="price"
  label="Price"
  onChange={handleChange}
  fullWidth
/>

<TextField
  name="location"
  label="Location"
  onChange={handleChange}
  fullWidth
/>

<TextField
  name="description"
  label="Description"
  multiline
  rows={4}
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


<label style={labelStyle}>Upload Images</label>

<label
  style={uploadBoxStyle}
>
  📸 Choose Images
  <input
    type="file"
    multiple
    onChange={handleImageChange}
    style={{ display: "none" }}
  />
</label>


{videoPreview && (
  <video
    src={videoPreview}
    controls
    style={{
      width: "100%",
      borderRadius: 10,
      marginTop: 10,
    }}
  />
)}


<label style={labelStyle}>Upload Video</label>

<label
  style={uploadBoxStyle}
>
  🎬 Choose Video
  <input
    type="file"
    accept="video/*"
    onChange={handleVideoChange}
    style={{ display: "none" }}
  />
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
    cursor: "pointer",
    marginTop: 15,
    fontWeight: "bold",
  }}
  onMouseOver={(e) =>
    (e.target.style.transform = "scale(1.03)")
  }
  onMouseOut={(e) =>
    (e.target.style.transform = "scale(1)")
  }
>
  Submit Product 
</button>
    </form>
  </div>
);
}

export default AddProduct;