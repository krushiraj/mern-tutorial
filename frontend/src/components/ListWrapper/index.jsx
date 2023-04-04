import React from "react";

import "./index.css";

const ListItem = ({ childComponent, ...props }) => {
  return (
    <li className="list-item">
      {childComponent
        ? childComponent(props)
        : new Error("No child component provided")}
    </li>
  );
};

const ListWrapper = ({ childComponent, items }) => {
  return (
    <ul className="list-wrapper">
      {items.map((props) => (
        <ListItem key={props._id} childComponent={childComponent} {...props} />
      ))}
    </ul>
  );
};

export default ListWrapper;
