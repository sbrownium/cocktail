import React, { useState } from "react";
import PopOver from "./PopOver";
import Button from "./Button";

export default function DeleteButton ({path, nodeID, nodeName, handleToggle}) {
    const [visible, setVisible] = useState(false);

    function handleClick (e) {
        e.preventDefault();
        setVisible(visible => !visible);
      }
    return (
        <>
        {visible ? 
        <PopOver
            path={path}
            nodeID={nodeID}
            nodeName={nodeName}
            handleToggle={handleToggle}
        />
        :
        <Button value='Delete Comment' handleClick={handleClick} />
        }
        </>
    )
}