import React from "react";
import { Link } from "react-router-dom";

export default function Breadcrumbs(props) {
  let [breadCrumbItems, setBreadCrumbItems] = React.useState([]);

  React.useEffect(() => {
    let allItems = [];
    allItems = JSON.parse(localStorage.getItem("classes"));
    let id = props.idSelected;
    let breadCrumbsInProgress = [];

    while (id) {
      let classItem = allItems.find((classItem) => classItem.id === id);
      breadCrumbsInProgress.unshift({
        id: classItem.id,
        itemClass: classItem.itemClass,
      });
      id = classItem.parentClass;
    }

    setBreadCrumbItems(breadCrumbsInProgress);
  }, [props.idSelected]);

  let crumbs = breadCrumbItems.map((classItem) => (
    <li key={classItem.id}>
      <Link to={`/Classes/${classItem.id}`} className='breadcrumb'>
        {classItem.itemClass}
      </Link>
    </li>
  ));

  crumbs.unshift(
    <li key={"first"}>
      <Link to={`/Classes/`} className='breadcrumb'>
        Classes
      </Link>
    </li>
  );

  return (
    <div className='breadcrumbs'>
      <ul>{crumbs}</ul>
    </div>
  );
}
