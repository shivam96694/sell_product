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
    const res = await getAllProducts();
    setProducts(res.data);
  } catch (err) {
    console.log(err);
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