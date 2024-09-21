import React, { ComponentProps } from "react";

const Checkbox = (props: ComponentProps<"input">) => {
  return (
    <label className="checkbox">
      <input type="checkbox" {...props} />
      <div className="checkmark" />
    </label>
  );
};

export default Checkbox;
