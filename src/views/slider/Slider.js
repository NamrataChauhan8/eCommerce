import React from 'react'

const Slider = () => {
  return (
    <div>
      <div id="carouselExample" class="carousel slide">
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/3c4df1bcf25b7565.jpg?q=20" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/87740c2ff977e047.jpg?q=20" class="d-block w-100" alt="..."/>
    </div>
    <div class="carousel-item">
      <img src="https://rukminim2.flixcart.com/fk-p-flap/844/140/image/c2d7f4acd77a8ad5.jpg?q=50" class="d-block w-100" alt="..."/>
    </div>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
    </div>
  )
}

export default Slider
