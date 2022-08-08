import LineItem from "./ClassLineItem";
import React from "react";
import { nanoid } from "nanoid";
import { useParams } from "react-router-dom";

export default function Classes(props) {
  let [displayedClasses, setDisplayedClasses] = React.useState([]);
  let [classesData, setClassesData] = React.useState(
    () => JSON.parse(localStorage.getItem("classes")) || []
  );

  const { urlId } = useParams();

  React.useEffect(() => {
    let selectedClass = classesData.filter(
      (item) => item.parentClass === props.idSelected
    );
    setDisplayedClasses(selectedClass);
    let clickedItem = classesData.find((item) => item.id === props.idSelected);
    props.setTitle(clickedItem ? clickedItem.itemClass : "Classes");
  }, [props.idSelected, classesData]);

  React.useEffect(() => {
    // save classes to local storage
    localStorage.setItem("classes", JSON.stringify(classesData));
  }, [classesData]);

  function setClassesState(event, id) {
    const { name, type, checked, value } = event.target;

    if (name === "probability" && (value < 0 || value > 100)) {
      return;
    }

    // save data on every change to any classLineItem
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
          parentClass: props.idSelected,
        },
      ];
    });
    e.target.value = "";
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
      case "new-classProperty":
        return value.length > 0;
      case "probability":
        return value <= 1;
      default:
        return true;
    }
  }

  // Clerics only have cleric spells

  // could have spells be property of cleric class,
  // could make cleric PC and set all other spells to 0
  // could make cleric spell list

  // or have some kind of Switch mechanism...
  // Switch (Class)
  // case: Cleric
  // clericSpells
  // case: Barbarian
  // barbarian spells

  // maybe it switch could drive PC you get as well

  // Could have PC affect siblings
  // that way if you have a NPC
  // Get Cleric Class which comes with Cleric PC
  // then Cleric PC could affect spells and spells wouldn't have to be a subclass of Cleric

  let lineItems = displayedClasses.map((item) => {
    return (
      <LineItem
        isSelected={item.id === props.idSelected}
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
        onBlur={updateDataWithInput}
        onKeyUp={handleKeyup}
      />
    </div>
  );
}
