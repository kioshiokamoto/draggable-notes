//Basado en https://lo-victoria.com/making-draggable-components-in-react

import React, { useState, useEffect } from "react";
import "./App.css";
import Draggable from "react-draggable";
import { v4 as uuidv4 } from "uuid";
var randomColor = require("randomcolor");

function App() {
  const [item, setItem] = useState("");
  const [items, setItems] = useState(
    JSON.parse(localStorage.getItem("items")) || []
  );
  const keyPress = (event) => {
    var code = event.keyCode || event.which;
    if (code === 13) {
      newitem();
    }
  };
  const newitem = () => {
    if (item.trim() !== "" && item.length > 2) {
      //Validar nota
      const newitem = {
        id: uuidv4(),
        item: item,
        color: randomColor({ luminosity: "light", }),
        defaultPos: { x: 100, y: 0 },
      };
      setItems((items) => [...items, newitem]); // Añade item a arreglo
      setItem(""); //Limpia input
    } else {
      alert("Debe ingresar un item válido");
      setItem("");
    }
  };
  const updatePos = (data, index) => {
    let newArr = [...items];
    newArr[index].defaultPos = { x: data.x, y: data.y };
    setItems(newArr);
  };
  const deleteNote = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);
  return (
    <div>
      <input
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Ingresa una nota!"
        onKeyPress={(e) => keyPress(e)}
      />
      <button onClick={newitem} className='enter'>Ingresar</button>
      {items.map((item, index) => {
        return (
          <Draggable
            key={item.id}
            defaultPosition={item.defaultPos}
            onStop={(e, data) => {
              updatePos(data, index);
            }}
          >
            <div style={{ backgroundColor: item.color }} className="box">
              <span>{`${item.item}`}</span>
              <button className='delete' id="delete" onClick={(e) => deleteNote(item.id)}>
                <i class="fas fa-times-circle"></i>
              </button>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
}

export default App;
