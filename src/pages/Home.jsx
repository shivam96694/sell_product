import { useEffect, useState } from "react";
import { getAllProducts } from "../services/productService";
import ProductCard from "../products/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /*const fetchProducts = async () => {
    try {
      const res = await getAllProducts();
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };*/

  const fetchProducts = async () => {
  try {
    setLoading(true);

    // 🔸 Temporary static data
    const tempData = [
      {
        id: 1,
        title: "iPhone 13",
        price: 52000,
        location: "Bhopal",
        image: "https://via.placeholder.com/300",
      },
      {
        id: 2,
        title: "HP Laptop",
        price: 35000,
        location: "Indore",
        image: "https://via.placeholder.com/300",
      },
    ];

    setProducts(tempData);
  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <h2 className="center">Loading products...</h2>;

  return (
    <div className="home-container">
      <h2 className="home-title">Latest Products</h2>

      {products.length === 0 ? (
        <p className="center">No products available</p>
      ) : (
        <div className="product-grid">
          {products.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;