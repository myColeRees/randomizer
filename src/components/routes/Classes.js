import LineItem from "../LineItem";
import React from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

export default function Classes(props) {
  let [idSelected, setIdSelected] = React.useState(null);
  let [displayedClasses, setDisplayedClasses] = React.useState([]);
  let [classesData, setClassesData] = React.useState(
    () => JSON.parse(localStorage.getItem("classes")) || []
  );
  const { urlId } = useParams();

  React.useEffect(() => {
    setIdSelected(urlId === undefined ? null : urlId);
  }, [urlId]);

  React.useEffect(() => {
    let selectedClass = classesData.filter(
      (item) => item.parentClass === idSelected
    );
    setDisplayedClasses(selectedClass);
    let clickedItem = classesData.find((item) => item.id === idSelected);
    props.setTitle(clickedItem ? clickedItem.itemClass : "Classes");
  }, [idSelected, classesData]);

  React.useEffect(() => {
    // save classes to local storage
    localStorage.setItem("classes", JSON.stringify(classesData));
  }, [classesData]);

  function setClassesState(event, id) {
    const { name, type, checked, value } = event.target;

    // save data on every change to any lineItem
    setClassesData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, [name]: value } : item
      )
    );
  }

  function deleteItem(id) {
    setClassesData((prevData) => prevData.filter((item) => item.id !== id));
  }

  // Make a new ClassItem
  function updateDataWithInput(e) {
    let textValue = e.target.value.trim();
    let name = e.target.name;
    if (!isValidInput(name, textValue)) {
      return;
    }

    setClassesData((prevData) => {
      return [
        ...prevData,
        {
          id: nanoid(),
          itemClass: textValue,
          probability: 0,
          parentClass: idSelected,
        },
      ];
    });
    e.target.value = "";
  }

  function handleBlur(e) {
    updateDataWithInput(e);
  }

  function handleKeyup(e) {
    if (e.key === "Enter") {
      updateDataWithInput(e);
    }
  }

  function isValidInput(name, value) {
    switch (name) {
      case "new-itemClass":
        return value.length > 0;
      case "itemClass":
        return value.length > 0;
      case "probability":
        return value <= 1;
      default:
        return true;
    }
  }

  let lineItems = displayedClasses.map((item) => {
    return (
      <LineItem
        isSelected={item.id === idSelected}
        key={item.id}
        itemClass={item.itemClass}
        deleteItem={deleteItem}
        id={item.id}
        urlId={urlId}
        probability={item.probability}
        setClassesState={(event) => setClassesState(event, item.id)}
      />
    );
  });

  return (
    <div>
      {lineItems}
      <input
        className='add-item'
        name='new-itemClass'
        type='text'
        placeholder='Add Item'
        onBlur={handleBlur}
        onKeyUp={handleKeyup}
      />
      <div className='hamburger' />
    </div>
  );
}
