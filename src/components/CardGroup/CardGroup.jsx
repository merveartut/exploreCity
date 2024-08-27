import React, { useState } from "react";
import styles from "./CardGroup.module.css";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import Slider from "react-slick";
import Modal from "../Modal/Modal";
import { BsFillBookmarkPlusFill, BsBookmarkCheckFill } from "react-icons/bs";
import IconButton from '@mui/material/IconButton';
import { Tooltip } from 'react-tooltip'


function CardGroup({ items, isCategory, selectedCity, addToList }) {
  const loggedIn = useSelector((state) => state.loggedIn.value);
  const plan = useSelector((state) => state.plan.value)
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const onCardClick = (item) => {
    if (loggedIn && selectedCity) {
      navigate(`/list/${selectedCity}/${item.name}`);
    } else if (loggedIn) {
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };
  const isDisabled = (item) => {
    return plan.some(planItem => planItem.id === item.id)
  }
  const setList = (item) => {

      addToList(item)
  }
  var settings = { 
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
     
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
 
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
 
        }
      }
    ]
  }

  return (
    <div className="container">
      {showModal && <Modal></Modal>}
      {isCategory ? (
        <div
          className="row"
          style={{ gap: 12, justifyContent: "space-evenly" }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className={styles.card}
              onClick={() => onCardClick(item)}
            >
              <img
                className={styles.menuImg}
                src={item.src || item.cardPhotos[0].sizes.urlTemplate}
                width="100%"
                height="100%"
                onClick={() => onCardClick(item)}
                hoverable
              ></img>
              <div className={styles.titles}>
                <h2>{item.name}</h2>
              </div>
            </div>
          ))}
        </div>
      ) : (
       <Slider {...settings}>
          {items.map((item) => (
             <Card
             className={styles.sliderCard}
             key={item.id}
             
           >
             <Card.Img
               src={item?.cardPhotos[0]?.sizes?.urlTemplate}
               className={styles.cardImg}
             />
             <Card.Body className={styles.cardBody}>
               <div className={styles.itemTitle}>
                 {item.title}
                 <br />
               </div>
               <row className={styles.footerIcon}>
               <Rating rating={item.bubbleRating.rating} />
               <Tooltip id="save-button" className={styles.saveButton} />
               <IconButton 
               disabled={isDisabled(item)} 
               data-tooltip-id="save-button" 
               data-tooltip-content= "Add to my plan" 
               style={{alignContent:"end", justifyContent:"end"}} 
               onClick={() => setList(item)}
               classes={{
                root: styles.customIconButton,
              }}
               >
               {!isDisabled(item) && <BsFillBookmarkPlusFill style={{color:"royalblue"}} />}
               {isDisabled(item) && <BsBookmarkCheckFill style={{opacity:1, color:"green"}}/>}
               </IconButton>
               
               </row>
              
             
             </Card.Body>
           </Card>
          )
           
          )}
        </Slider>
      )}
    </div>
  );
}

export default CardGroup;
