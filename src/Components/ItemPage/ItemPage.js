import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import axios from "axios";
import default_icon from "./icons/149092.svg";
import "./ItemPage.css";
import Upload from "../Upload/Upload";

function ItemPage(props) {
  const [edit, changeEdit] = useState(false);
  const [name, changeName] = useState("");
  const [price, changePrice] = useState(0);
  const [creatorEmail, changeEmail] = useState("");
  const [creatorId, changeId] = useState(1);
  const [notes, changeNotes] = useState("");
  const [image, changeImage] = useState("");
  const [link, changeLink] = useState("");
  const user = false;

  const toggleEdit = () => {
    console.log(props.user_id, creatorId);
    if (props.user_id === creatorId) {
      changeEdit(!edit);
    } else {
      alert("The user logged in is not the creator of this item");
    }
  };

  useEffect(() => {
    console.log(`hit!`);
    getUser();
  }, []);
  const editItem = () => {
    const item = {
      name,
      price,
      notes,
      image,
      link
    };
    axios
      .put(`/api/item/${props.match.params.itemid}`, item)
      .then(res => {
        getUser();
      })
      .catch(err => console.log(err));
    changeEdit(!edit);
  };

  const getUser = () => {
    axios
      .get(`/api/item/${props.match.params.itemid}`)
      .then(res => {
        let { name, price, email, notes, image, link, creator_id } = res.data;

        changeName(name);
        changePrice(price);
        changeEmail(email);
        changeNotes(notes);
        changeImage(image);
        changeLink(link || null);
        changeId(creator_id);
        console.log(image);
      })
      .catch(err => console.log(err));
  };
  const deleteItem = () => {};

  return (
    <section>
      {edit ? (
        //IF EDIT IS TRUE DISPLAY VIEW BELOW -- EDIT VIEW
        <>
          <article className="itemPage">
            <div className="editInput">
              <span>{`Name: `}</span>
              <input
                className="editInput"
                name="name"
                value={name}
                onChange={e => changeName(e.target.value)}
              />
            </div>
            <div className="editInput">
              <span>{`Price: $`}</span>
              <input
                className="editInput"
                name="price"
                type="number"
                value={price}
                onChange={e => changePrice(e.target.value)}
              />
            </div>
            {creatorEmail ? <p>{`Creator: ${creatorEmail}`}</p> : null}
            <div className="editInput">
              <span>{`Notes: `}</span>
              <input className="editInput" name="notes" value={notes} />
            </div>
            <div>
              {" "}
              <Upload
                changeImage={changeImage}
                user={user}
                className="newItemUpload"
              />
            </div>
            <div className="editInput">
              <span>{"Link: "}</span>
              <input className="editInput" name="link" value={link} />
            </div>
          </article>
        </>
      ) : (
        //IF EDIT  IS FALSE DISPLAY VIEW BELOW (NON-EDIT VIEW)
        <article className="itemPage">
          <p className="backButton" onClick={() => props.history.goBack()}>
            Back
          </p>
          {name ? <h1>{name}</h1> : null}
          {price ? <p>{`$${price}`}</p> : null}
          {creatorEmail ? <p>{`Creator: ${creatorEmail}`}</p> : null}
          {notes ? <p>{`Notes: ${notes}`}</p> : null}
          <img
            alt="item"
            className="largeItemImage"
            src={image ? image : default_icon}
          />
          {link ? <p>{`Link:${link}`}</p> : null}
        </article>
      )}
      <div className="buttons editInput">
        <button
          className="editInput"
          onClick={() => {
            toggleEdit();
            if (edit) getUser();
          }}
        >
          {edit ? "Cancel" : "Edit"}
        </button>
        <button
          className="editInput"
          onClick={() => (edit ? editItem() : deleteItem())}
        >
          {edit ? "Save" : "Delete"}
        </button>
      </div>
    </section>
  );
}

const mapStateToProps = reduxState => {
  const { user_id } = reduxState;
  return { user_id };
};

export default connect(mapStateToProps)(withRouter(ItemPage));
