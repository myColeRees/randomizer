import PropertyLineItem from "./PropertyLineItem";
import React from "react";
import { nanoid } from "nanoid";

export default function Properties(props) {
  let [displayedProperties, setDisplayedProperties] = React.useState([]);
  let [propertyData, setPropertyData] = React.useState(
    () => JSON.parse(localStorage.getItem("properties")) || []
  );

  React.useEffect(() => {
    // save properties to local storage
    localStorage.setItem("properties", JSON.stringify(propertyData));
  }, [propertyData]);

  React.useEffect(() => {
    let selectedClass = propertyData.filter(
      (item) => item.parentClass === props.idSelected
    );
    setDisplayedProperties(selectedClass);
    let clickedItem = propertyData.find((item) => item.id === props.idSelected);
    props.setTitle(
      props.classItemSelected
        ? `${props.classItemSelected} Properties`
        : "Properties"
    );
  }, [props.idSelected, propertyData]);

  function setPropertyState(event, id) {
    const { name, type, checked, value } = event.target;

    if (name === "probability" && (value < 0 || value > 100)) {
      return;
    }

    // save data on every change to any propertyLineItem
    setPropertyData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  }

  function deleteItem(id) {
    setPropertyData((prevData) => prevData.filter((item) => item.id !== id));
  }

  // Make a new Property
  function updatePropertyWithInput(e) {
    let textValue = e.target.value.trim();
    let name = e.target.name;
    if (!isValidInput(name, textValue)) {
      return;
    }

    setPropertyData((prevData) => {
      return [
        ...prevData,
        {
          id: nanoid(),
          itemClass: textValue,
          probability: 0,
          parentClass: props.idSelected,
        },
      ];
    });
    e.target.value = "";
  }

  function handlePropertyInputKeyup(e) {
    if (e.key === "Enter") {
      updatePropertyWithInput(e);
    }
  }

  function isValidInput(name, value) {
    switch (name) {
      case "new-itemClass":
        return value.length > 0;
      case "new-classProperty":
        return value.length > 0;
      case "probability":
        return value <= 1;
      default:
        return true;
    }
  }

  let propertyLineItems = displayedProperties.map((item) => {
    return (
      <PropertyLineItem
        isSelected={item.id === props.idSelected}
        key={item.id}
        itemClass={item.itemClass}
        deleteItem={deleteItem}
        id={item.id}
        probability={item.probability}
        setPropertyState={(event) => setPropertyState(event, item.id)}
      />
    );
  });

  return (
    <div>
      {propertyLineItems}
      <input
        className='add-item'
        name='new-classProperty'
        type='text'
        placeholder='Add Property'
        onBlur={updatePropertyWithInput}
        onKeyUp={handlePropertyInputKeyup}
      />
      <br />
    </div>
  );
}
