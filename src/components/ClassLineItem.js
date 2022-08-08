import React from "react";
import { getTextWidthFromId } from "../utils";
import { Link } from "react-router-dom";

export default function LineItem(props) {
  let [textWidth, setTextWidth] = React.useState();
  let [errors, setErrors] = React.useState({ itemClass: "", probability: "" });

  React.useEffect(() => {
    // called once when the component loads
    let textWidth = getTextWidthFromId(props.id);
    setTextWidth(textWidth > 30 ? textWidth + 15 : 30);
  }, []);

  // called every time text box is typed in to resize text box
  function updateTextWidth(id) {
    let textWidth = getTextWidthFromId(id);
    setTextWidth(textWidth > 30 ? textWidth + 15 : 30);
  }

  // sets the error message on errors state object if a validation fails
  function setErrorsOnInput(event) {
    let name = event.target.name;
    let value = event.target.value;

    switch (name) {
      case "new-itemClass":
        value.length <= 0 &&
          setErrors((prevErrors) => ({
            ...prevErrors,
            newItemClass: "must be filled",
          }));
        break;
      case "itemClass":
        setErrors((prevErrors) =>
          value.length === 0
            ? {
                ...prevErrors,
                itemClass: "must be filled",
              }
            : {
                ...prevErrors,
                itemClass: "",
              }
        );
        break;
      case "probability":
        setErrors((prevErrors) =>
          value.length === 0
            ? {
                ...prevErrors,
                probability: "must be filled",
              }
            : {
                ...prevErrors,
                probability: "",
              }
        );
        break;
      default:
        break;
    }
  }

  function runValidation(event) {
    setErrorsOnInput(event);
  }

  function setFocusIfError(event) {
    let name = event.target.name;
    if (errors[name].length > 0) {
      event.target.focus();
    }
  }

  function deleteItem(event) {
    props.deleteItem(props.id);
    event.preventDefault();
  }

  return (
    <Link
      to={`/Classes/${props.id}`}
      state={{ classItemSelected: props.itemClass }}
    >
      <form className='lineItem'>
        <input
          name='itemClass'
          type='text'
          id={props.id}
          style={{ width: textWidth }} // dynamically control textbox width
          onChange={(e) => {
            runValidation(e);
            props.setClassesState(e);
            updateTextWidth(props.id);
          }}
          onBlur={setFocusIfError}
          onClick={(e) => e.preventDefault()} // stop from navigating to class
          className={
            // add error class to control validation styling
            (errors.itemClass.length > 0 && " error ") +
            " lineItem--item_class "
          }
          value={props.itemClass}
        />
        <input
          className='lineItem--delete'
          type='button'
          value='Delete'
          onClick={deleteItem}
        />

        {/* <i className='fa-solid fa-trash-can' /> */}

        <input
          name='probability'
          type='number'
          className={
            // add error class to control validation styling
            (errors.probability.length > 0 && " error ") +
            " lineItem--probability "
          }
          onClick={(e) => {
            e.target.select(); // select whole input for quicker editing
            e.preventDefault(); // stop from navigating to class
          }}
          onChange={(e) => {
            runValidation(e);
            props.setClassesState(e);
          }}
          onBlur={setFocusIfError} // don't let user navigate away if there's problem with input
          value={props.probability}
        />
      </form>
    </Link>
  );
}
