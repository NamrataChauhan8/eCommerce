import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../../assets/Navbar.scss";

const Home = ({ addToCart }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [noResults, setNoResults] = useState(false);

  const userData = JSON.parse(localStorage.getItem("userData"));
  const isLoggedIn = userData !== null;

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

  useEffect(() => {
    if (sortOrder === "asc") {
      setFilteredProducts(
        [...filteredProducts].sort((a, b) => a.price - b.price)
      );
    } else if (sortOrder === "desc") {
      setFilteredProducts(
        [...filteredProducts].sort((a, b) => b.price - a.price)
      );
    }
  }, [sortOrder]);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredProducts(products);
      setNoResults(false);
    }
  }, [searchQuery, products]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleSearch = (e) => {
    e.preventDefault();
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredProducts(filtered);
    setCurrentPage(1);
    setNoResults(filtered.length === 0);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.category === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };
  const handleAddToCart = (product) => {
    addToCart(product);
    alert("Item added to cart successfully")
  };

  return (
    <div className="container-fluid mt-3">
      <form className="d-flex">
        <div className="input-group">
          {isLoggedIn && (
            <input
              type="text"
              className="form-control"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
          {isLoggedIn && (
            <button
              className="btn btn-outline-primary"
              onClick={handleSearch}
              style={{ marginLeft: "7px" }}
            >
              Search
            </button>
          )}
        </div>
      </form>
      {noResults && (
        <p style={{ margin: "3px", color: "red" }}>No products available</p>
      )}
      {isLoggedIn && (
        <div className="mt-3">
          <button
            type="button"
            className={`btn btn-secondary ${
              selectedCategory === "All" ? "active" : ""
            }`}
            onClick={() => handleCategoryClick("All")}
            style={{ margin: "10px" }}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              type="button"
              className={`btn btn-secondary ${
                selectedCategory === category ? "active" : ""
              }`}
              key={category}
              onClick={() => handleCategoryClick(category)}
              style={{ margin: "10px" }}
            >
              {category}
            </button>
          ))}
        </div>
      )}
      {isLoggedIn && (
        <div className="row justify-content-center mt-3">
          <div className="col mb-4 text-center">
            <h4 style={{ color: "teal" }}>
              <b>{selectedCategory}</b>
            </h4>
            <b style={{ fontSize: "20px" }}>Product prize:</b>
            <button
              className="btn btn-dark mx-2 mt-3"
              onClick={() => handleSort("asc")}
            >
              Low to High
            </button>
            <button
              className="btn btn-dark mx-2 mt-3"
              onClick={() => handleSort("desc")}
            >
              High to Low
            </button>
            <hr />
          </div>
        </div>
      )}
      {isLoggedIn && (
        <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 justify-content-center">
          {currentProducts.map((product) => (
            <div className="col mb-4" key={product.id}>
              <div className="card h-100">
                <img
                  src={product.image}
                  className="card-img-top"
                  alt={product.title}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.title}</h5>
                  <p className="card-text">
                    <b>{product.price}₹</b>
                  </p>
                  <p className="card-text">{product.description}</p>
                  <p className="card-text">
                    <b>Category:</b> {product.category}
                  </p>
                  <p className="card-text">
                    <b>Rating:</b> {product.rating.rate} ({product.rating.count}{" "}
                    reviews)
                  </p>
                  <button
                    className="btn btn-primary m-3"
                    type="button"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {!noResults && isLoggedIn && (
        <div className="pagination justify-content-center m-5" >
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="btn btn-primary"
          >
            Previous
          </button>
          {Array.from(
            { length: Math.ceil(filteredProducts.length / productsPerPage) },
            (_, index) => (
              <button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`btn btn-outline-primary ${
                  currentPage === index + 1 ? "active" : ""
                }`}
              >
                {index + 1}
              </button>
            )
          )}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage ===
              Math.ceil(filteredProducts.length / productsPerPage)
            }
            className="btn btn-primary"
          >
            Next
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div>
          <h1>Please Sign up first</h1>
          <NavLink className="btn btn-primary" to="/">
            Sign Up
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default Home;
