import React from 'react'
import CardGroup from '../CardGroup/CardGroup'
import { data } from "./data"
function Menu() {
  return (
       <CardGroup items={data} ></CardGroup>
  )
}

export default Menu