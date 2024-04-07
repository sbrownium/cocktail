import React, { useState } from "react";
import PopOver from "./PopOver";
import Button from "./Button";

export default function DeleteButton ({path, nodeID, nodeName, handleToggle, children, className}) {
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
        <Button handleClick={handleClick} className={className}>
            {children}
        </Button>    
        }
        </>
    )
}