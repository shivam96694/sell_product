import { useState, useEffect } from "react";

function ProductForm({ initialData = {}, onSubmit, isEdit }) {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit && initialData) {
      setForm(initialData);
    }
  }, [initialData, isEdit]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="add-product-container">
      <form onSubmit={handleSubmit} className="add-product-form">
        <h2>{isEdit ? "Edit Product" : "Add Product"}</h2>

        <input
          name="title"
          value={form.title}
          placeholder="Title"
          onChange={handleChange}
        />

        <input
          name="price"
          value={form.price}
          placeholder="Price"
          onChange={handleChange}
        />

        <input
          name="location"
          value={form.location}
          placeholder="Location"
          onChange={handleChange}
        />

        <textarea
          name="description"
          value={form.description}
          placeholder="Description"
          onChange={handleChange}
        />

        <button type="submit">
          {isEdit ? "Update Product" : "Submit Product"}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;