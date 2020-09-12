import React, { useState, useEffect } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  const [colors, setColors] = useState([]);

  useEffect(() => {
    fetchColors();
  }, [colors])

  const fetchColors = () => {
    axiosWithAuth()
    .get("/colors")
    .then(response => {
      setColorList(response.data)
    })
    .catch(error => {
      console.log("Unable to get colors", error)
    })
  }

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} colors={colors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
