import React, { useState } from "react";
import DeletePopOver from "./DeletePopOver";
import Button from "./Button";

export default function DeleteButton ({
    path,
    nodeID,
    nodeName,
    handleToggle,
    buttonText,
    className,
    reset
}) {
    const [visible, setVisible] = useState(false);

    function handleClick (e) {
        e.preventDefault();
        setVisible(visible => !visible);
      }
    return (
        <>
        {visible ? 
        <DeletePopOver
            path={path}
            nodeID={nodeID}
            nodeName={nodeName}
            handleToggle={handleToggle}
            reset={reset}
        />
        :
        <Button handleClick={handleClick} className={className}>
            {buttonText}
        </Button>    
        }
        </>
    )
}