import React from "react";

export default function NumericalClasses(props) {
  React.useEffect(() => {
    props.setTitle("Numerical Classes");
  }, []);

  return <div>NumericalClasses</div>;
}
