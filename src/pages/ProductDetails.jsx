import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSingleProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";

function ProductDetails() {
  const { id } = useParams();
const navigate = useNavigate();

  const [product, setProduct] = useState(null);
const [preview, setPreview] = useState(null);
  useEffect(() => {
  
    const fetchProduct = async () => {
      const res = await getSingleProduct(id);
      setProduct(res.data);
    };
    fetchProduct();
    
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

<button
  className="chat-btn"
  onClick={() =>
    navigate("/chat", {
      state: {
        productId: product.id,
        sellerId: product.user_id, // seller id from backend
        productTitle: product.title,
      },
    })
  }
>
  Chat with Seller
</button>
      </div>
    </div>
  );
}

export default ProductDetails;