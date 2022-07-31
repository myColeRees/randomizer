import React from "react";

export default function SavedOutputs(props) {
  React.useEffect(() => {
    props.setTitle("Saved Outputs");
  }, []);

  return <div>SavedOutputs</div>;
}
