import React, { useState, useEffect } from 'react';

const Slider = () => {
  const [Index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % 4); 
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className={`carousel-item ${Index === 0 ? 'active' : ''}`}>
            <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3c4df1bcf25b7565.jpg?q=20" className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${Index === 1 ? 'active' : ''}`}>
            <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/87740c2ff977e047.jpg?q=20" className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${Index === 2 ? 'active' : ''}`}>
            <img src="https://rukminim2.flixcart.com/fk-p-flap/844/140/image/c2d7f4acd77a8ad5.jpg?q=50" className="d-block w-100" alt="..." />
          </div>
          <div className={`carousel-item ${Index === 3 ? 'active' : ''}`}>
            <img src="https://rukminim2.flixcart.com/fk-p-flap/844/140/image/204d8300eb02d7d0.jpg?q=100" className="d-block w-100" alt="..." />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default Slider;
