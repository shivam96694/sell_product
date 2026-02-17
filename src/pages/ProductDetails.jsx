import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import { getSingleProduct } from "../services/productService";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

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

  if (!product) return <h2 className="center">Loading...</h2>;

  return (
    <div className="details-container">
      {/* IMAGE SECTION */}
      <div className="image-section">
        <img src={product.images[0]} className="main-image" />

        <div className="thumbnail-row">
          {product.images.map((img, i) => (
            <img key={i} src={img} className="thumbnail" />
          ))}
        </div>
      </div>

      {/* INFO SECTION */}
      <div className="info-section">
        <h2 style={{color:'black'}}>{product.title}</h2>

        <p className="price">₹ {product.price}</p>

        <p className="location">{product.location}</p>

        <p className="desc">{product.description}</p>

        {/* VIDEO */}
        <video controls className="product-video">
          <source src={product.video} type="video/mp4" />
        </video>

        {/* SELLER */}
        <div className="seller-box">
          <h4>Seller</h4>
          <p>{product.seller.name}</p>
          <p>{product.seller.phone}</p>
        </div>

        <button className="chat-btn">Chat with Seller</button>
      </div>
    </div>
  );
}

export default ProductDetails;