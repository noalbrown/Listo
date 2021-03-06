import React, { useState } from "react";
import axios from "axios";
import Upload from "../Upload/Upload";
import "./NewItem.css";

function NewItem(props) {
  const [name, changeName] = useState("");
  const [price, changePrice] = useState("");
  const [notes, changeNotes] = useState("");
  const [image, changeImage] = useState("");
  const [link, changeLink] = useState("");

  const handleAddItem = () => {
    // fileUpload();
    const item = {
      list_id: props.listId,
      added_by_id: props.userId,
      name,
      price,
      image,
      notes,
      link
    };

    axios
      .post("/api/item/add", item)
      .then(() => {
        props.toggleAddItem();
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <section className={props.name}>
        <p className="exit" onClick={props.toggleAddItem}>
          X
        </p>
        <div className="newItemInput">
          <span>Item: </span>
          <input
            className="newItemInputField"
            name="name"
            value={name}
            onChange={e => changeName(e.target.value)}
          />
        </div>
        <div className="newItemInput">
          <span>Price: </span>
          <input
            className="newItemInputField"
            name="price"
            type="number"
            value={price}
            onChange={e => changePrice(e.target.value)}
          />
        </div>

        <div className="newItemInput">
          <span>Notes: </span>
          <input
            className="newItemInputField"
            name="notes"
            type="textarea"
            value={notes}
            onChange={e => changeNotes(e.target.value)}
          />
        </div>
        <Upload changeImage={changeImage} className="newItemUpload" />
        <div className="newItemInput">
          <span>Link: </span>
          <input
            className="newItemInputField"
            name="link"
            value={link}
            onChange={e => changeLink(e.target.value)}
          />
        </div>
        <div className="newItemInput">
          <button onClick={handleAddItem}>Add Item to List</button>
        </div>
      </section>
    </>
  );
}

export default NewItem;
