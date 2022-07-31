import React from "react";

export default function ProbabilityContexts(props) {
  React.useEffect(() => {
    props.setTitle("Probability Contexts");
  }, []);

  return <div>ProbabilityContexts</div>;
}
