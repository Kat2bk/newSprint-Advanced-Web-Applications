import React, { useState, useEffect } from 'react';

import Bubbles from './Bubbles';
import ColorList from './ColorList';
import { axiosWithAuth } from '../utils/axiosWithAuth';

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);
  const [changeColors, setChangeColors] = useState([]);
  // fetch your colors data from the server when the component mounts
  // set that data to the colorList state property
  useEffect(() => {
    fetchColors()
  }, [changeColors]);

  const fetchColors = () => {
    axiosWithAuth()
      .get(`http://localhost:5000/api/colors`)
      .then(res => setColorList(res.data))
      .catch(err => console.log(err.response));
  };

  return (
    <>
      <ColorList
        colors={colorList}
        updateColors={setColorList}
        changeColors={changeColors}
        setChangeColors={setChangeColors}
      />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
