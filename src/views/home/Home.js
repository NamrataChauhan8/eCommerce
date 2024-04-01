import React, { useState, useEffect } from "react";
import "../../assets/Navbar.scss";

const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => product.category === category);
      setFilteredProducts(filtered);
    }
  };

  return (
    <div className="container-fluid mt-3">
      <form className="d-flex">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="btn btn-outline-primary"
            onClick={handleSearch}
            style={{ marginLeft: "7px" }}
          >
            Search
          </button>
        </div>
      </form>

      <div className="mt-3">
        <h3>Categories:</h3>
        <button type="button" className={`btn btn-secondary ${selectedCategory === "All" ? "active" : ""}`} onClick={() => handleCategoryClick("All")} style={{margin:"10px"}}>
          All
        </button>
        {categories.map((category) => (
          <button type="button" className={`btn btn-secondary ${selectedCategory === category ? "active" : ""}`} key={category} onClick={() => handleCategoryClick(category)} style={{margin:"10px"}}>
            {category}
          </button>
        ))}
      </div>

      <div className="row justify-content-center mt-3">
        <div className="col mb-4 text-center">
          <h4 style={{color:"blue"}}>{selectedCategory}</h4>
          <hr />
        </div>
      </div>

      <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
        {filteredProducts.map((product) => (
          <div className="col mb-4" key={product.id}>
            <div className="card h-100">
              <img src={product.image} className="card-img-top" alt={product.title} style={{ height: "200px", objectFit: "contain" }} />
              <div className="card-body">
                <h5 className="card-title">{product.title}</h5>
                <p className="card-text"><b>${product.price}</b></p>
                <p className="card-text">{product.description}</p>
                <p className="card-text"><b>Category:</b> {product.category}</p>
                <p className="card-text"><b>Rating:</b> {product.rating.rate} ({product.rating.count} reviews)</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
