import React from 'react'
import Slider from "react-slick";
import styles from "./SliderTemp.module.css"

function SliderTemp({children}) {
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1,
            },
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      };
  return (
    <div className={styles.sliderContainer}>
 <Slider {...settings} styles={{width:"100%"}}>
        {children}
        </Slider>
    </div>
   
  )
}

export default SliderTemp