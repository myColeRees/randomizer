import Classes from "../Classes";
import Properties from "../Properties";
import React from "react";
import { useParams, useLocation } from "react-router-dom";

export default function ClassesContainer(props) {
  let [idSelected, setIdSelected] = React.useState(null);
  let [isSubclassesShown, setisSubclassesShown] = React.useState(true);
  const { urlId } = useParams();

  React.useEffect(() => {
    setIdSelected(urlId === undefined ? null : urlId);
    !urlId && setisSubclassesShown(true);
  }, [urlId]);

  function flipPage() {
    setisSubclassesShown((prevIsSubClassesShown) => !prevIsSubClassesShown);
  }

  let classItemSelected = useLocation().state?.classItemSelected;

  return (
    <div>
      {isSubclassesShown ? (
        <Classes idSelected={idSelected} setTitle={props.setTitle} />
      ) : (
        <Properties
          idSelected={idSelected}
          classItemSelected={classItemSelected}
          setTitle={props.setTitle}
        />
      )}

      <br />
      <br />
      <br />
      <br />
      <br />

      {idSelected && (
        <div className='page-flippers radio-toolbar'>
          <input
            type='radio'
            id='subclasses'
            name='classPage'
            value='subclasses'
            checked={isSubclassesShown}
            onChange={flipPage}
          />
          <label htmlFor='subclasses'>subclasses</label>

          <br />

          <input
            type='radio'
            id='properties'
            name='classPage'
            value='properties'
            checked={!isSubclassesShown}
            onChange={flipPage}
          />
          <label htmlFor='properties'>properties</label>
        </div>
      )}
      <br />
    </div>
  );
}
