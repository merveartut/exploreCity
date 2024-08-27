import React, { useState } from "react";
import styles from "./DraggableButton.module.css";
import IconButton from "@mui/material/IconButton";
import { MDBIcon } from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { clearPlan, deleteItem } from "../../context/slices/planSlice";
import Menu from "@mui/material/Menu";
import { useDrag } from "react-dnd";
import { MdDelete } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import { useParams } from 'react-router-dom'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

function DraggableButton() {
  const dispatch = useDispatch();
  const plan = useSelector((state) => state.plan.value);
  const [position, setPosition] = useState({ x: 100, y: 100 });
  const { menuType } = useParams()
  const [anchorEl, setAnchorEl] = useState(null);
  const [openPopover, setOpenPopover] = useState(false);
  const groupedList = plan.reduce((acc, item) => {
    // Deep clone the item to avoid mutation
    const itemCopy = { ...item };
  
    // If the type doesn't exist in the accumulator, create it as an empty array
    if (!acc[itemCopy.type]) {
      acc[itemCopy.type] = [];
    }
  
    // Push the deep-cloned item into the correct type group
    acc[itemCopy.type].push(itemCopy);
  
    return acc;
  }, {})
  const handleClick = (event) => {
    if (openPopover) {
      setAnchorEl(null);
    } else {
      setAnchorEl(event.currentTarget);
    }
    setOpenPopover(!openPopover);
  };
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "button",
      item: { position },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          setPosition({
            x: position.x + delta.x,
            y: position.y + delta.y,
          });
        }
      },
    }),
    [position]
  );

  return (
    <div
      ref={drag}
      style={{
        position: "absolute",
        left: position.x,
        top: position.y,
        opacity: isDragging ? 0 : 1,
        cursor: "move",
      }}
    >
      <Tooltip id="save-drag-button" className={styles.saveDragButton} />
      <IconButton
        onClick={(e) => handleClick(e)}
        style={{ position: "absolute" }}
        className={styles.dragButton}
        data-tooltip-id="save-drag-button"
        data-tooltip-content="My Plan"
      >
        <MDBIcon fas icon="list-alt" className={styles.dragIcon} size="lg" />{" "}
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openPopover}
        classes={{
          paper: styles.customPaper,  // Apply the custom class to the Paper component
        }}
        onClose={handleClick}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        
        
        {Object.keys(groupedList).map((type, index) => (
        <Accordion key={index} style={{ width: '100%' }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            id={`panel${index}-header`}
            style={{minHeight:"35px", backgroundColor:"thistle"}}
            classes={{
              content: styles.customAccordionSummaryContent, // Override the content class
            }}
  
          >
            <div>{type}</div>
          </AccordionSummary>
          <AccordionDetails>
            {groupedList[type].map((item, itemIndex) => (
              <row key={itemIndex} style={{justifyContent:"space-between", display:"flex", alignItems:"center"}} >
        <div style={{margin:"3px"}}>
               {itemIndex + 1}. {item.title}
              </div>
              <IconButton
          style={{ alignContent: "end", justifyContent: "end" }}
          onClick={() => dispatch(deleteItem(item))}
        >
          <MdDelete />
        </IconButton>
              </row>
             
            ))}
          </AccordionDetails>
        </Accordion>
      ))}

        <IconButton
          style={{ alignContent: "end", justifyContent: "end" }}
          onClick={() => dispatch(clearPlan())}
        >
          <MdDelete />
        </IconButton>
      </Menu>
    </div>
  );
}

export default DraggableButton;
