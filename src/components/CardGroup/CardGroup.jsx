import React, { useState } from "react";
import styles from "./CardGroup.module.css";
import { useSelector } from "react-redux";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Rating from "./Rating";
import Slider from "react-slick";
import Modal from "../CustomModal/CustomModal";
import { BsFillBookmarkPlusFill, BsBookmarkCheckFill } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import { Tooltip } from "react-tooltip";
import SliderTemp from "../SliderTemp/SliderTemp";

function CardGroup({ items, isCategory, addToList, date }) {
  const loggedIn = useSelector((state) => state.loggedIn.value);
  const selectedCity = useSelector((state) => state.city.value);
  const plan = useSelector((state) => state.plan.value);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const onCardClick = (item) => {
    if (loggedIn && selectedCity) {
      navigate(`/list/${selectedCity}/${item.name}/${date}`);
    } else if (loggedIn) {
      setShowModal(true);
    } else {
      navigate("/login");
    }
  };
  const isDisabled = (item) => {
    console.log(item);
    return plan.some((planItem) => planItem.hotel_id === item.hotel_id);
  };
  const setList = (item) => {
    addToList(item);
  };
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
        <div className={styles.sliderContainer}>
<Slider {...settings}>
          {items &&
            items.map((item) => (
              <Card className={styles.sliderCard} key={item.property.id}>
                <Card.Img
                  src={item.property.photoUrls[0].replace(
                    "square60",
                    "square300"
                  )}
                  className={styles.cardImg}
                />
                <Card.Body className={styles.cardBody}>
                  <Card.Text>{item.property.name}</Card.Text>
                </Card.Body>
                <Card.Footer>
                  <row className={styles.footerIcon}>
                    <Rating
                      rating={item.property.reviewScore}
                      ratingLabel={item.property.reviewScoreWord}
                    />
                    <Tooltip id="save-button" className={styles.saveButton} />
                    <IconButton
                      disabled={isDisabled(item)}
                      data-tooltip-id="save-button"
                      data-tooltip-content="Add to my plan"
                      style={{ alignContent: "end", justifyContent: "end" }}
                      onClick={() => setList(item)}
                      classes={{
                        root: styles.customIconButton,
                      }}
                    >
                      {!isDisabled(item) && (
                        <BsFillBookmarkPlusFill
                          style={{ color: "royalblue" }}
                        />
                      )}
                      {isDisabled(item) && (
                        <BsBookmarkCheckFill
                          style={{ opacity: 1, color: "green" }}
                        />
                      )}
                    </IconButton>
                  </row>
                </Card.Footer>
              </Card>
            ))}
        </Slider>
        </div>
        
      )}
    </div>
  );
}

export default CardGroup;
