import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getSingleProduct } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
const [preview, setPreview] = useState(null);
  useEffect(() => {
    // 🔴 REAL API (UNCOMMENT LATER)
    /*
    const fetchProduct = async () => {
      const res = await getSingleProduct(id);
      setProduct(res.data);
    };
    fetchProduct();
    */

    // 🟢 DUMMY DATA (REMOVE AFTER BACKEND)
     setProduct({
      id: 1,
      title: "iPhone 13",
      price: 45000,
      location: "Bhopal",
      description: "128GB, Blue, excellent condition",
      images: [
        "https://via.placeholder.com/400",
        "https://via.placeholder.com/401",
        "https://via.placeholder.com/402",
      ],
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
      seller: {
        name: "Shivam Sharma",
        phone: "9999999999",
      },
    });
  }, [id]);

    useEffect(() => {
    if (product) {
      setPreview({ type: "image", url: product.images[0] });
    }
  }, [product]);

  if (!product) return <h2 className="center">Loading...</h2>;

 return (
    <div className="details-container">

      {/* LEFT */}
      <div className="image-section">

        {/* MAIN PREVIEW */}
       {preview && (
  preview.type === "image" ? (
    <img src={preview.url} className="main-image" />
  ) : (
    <video src={preview.url} controls className="main-image" />
  )
)}

        {/* THUMBNAILS */}
        <div  className="thumbnail-row">

          {product.images.map((img, i) => (
            <img
              key={i}
              src={img}
              className="thumbnail"
              onClick={() => setPreview({ type: "image", url: img })}
            />
          ))}

          {/* VIDEO THUMB */}
          <video
            className="thumbnail"
            src={product.video}
            onClick={() =>
              setPreview({ type: "video", url: product.video })
            }
          />

        </div>
      </div>

      {/* RIGHT */}
      <div className="info-section">

        <h2 className="title">{product.title}</h2>

        <p className="price">₹ {product.price}</p>

        <p className="location">{product.location}</p>

        <p className="desc">{product.description}</p>

        <div className="seller-box">
          <div style={{ fontSize: 20, color: "black" }}>
            Information about seller
          </div>
          <p>{product.seller.name}</p>
          <p>{product.seller.phone}</p>
        </div>

        <button className="chat-btn">Chat with Seller</button>

      </div>
    </div>
  );
}

export default ProductDetails;