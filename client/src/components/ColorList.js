import React, { useState } from "react";
import {axiosWithAuth} from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors, changeColors, setChangeColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const addingColor = event => {
    event.preventDefault();
    axiosWithAuth()
    .post(`http://localhost:5000/api/colors`, addColor)
    .then(response => {
      setChangeColors(!changeColors);
    })
    .catch(error => console.log("Unable to add color", error))
  }

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?
    axiosWithAuth()
    .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
    .then(response => {
      console.log("response from saveEdit", response)
      setChangeColors(!changeColors)
    })
    .catch(error => {
      console.log("Unable to do that", error)
    })
  };

  const deleteColor = colors => {
    // make a delete request to delete this color
    axiosWithAuth()
    .delete(`http://localhost:5000/api/colors/${colors.id}`)
    .then(response => {
      console.log("response from delete", response)
      setChangeColors(!changeColors);
    })
    .catch(error => {
      console.log("unable to do that", error)
    })
  };

  return (
    <div className="colors-wrap">
    <div className="spacer" />
    {/* stretch - build another form here to add a color */}
    <form onSubmit={addingColor}>
    <legend>add a color</legend>
    <label>
      color name:
      <input
        onChange={e =>
          setAddColor({ ...addColor, color: e.target.value })
        }
        value={addColor.color}
      />
    </label>
    <label>
      hex code:
      <input
        onChange={e =>
          setAddColor({
            ...addColor,
            code: { hex: e.target.value },
          })
        }
        value={addColor.code.hex}
      />
    </label>
    <div className='button-row'>
      <button type='submit'>save</button>
      <button>cancel</button>
    </div>
  </form>
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ColorList;



