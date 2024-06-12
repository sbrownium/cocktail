import React, { useState } from "react";
import ArchiveOrDeletePopOver from "./ArchiveOrDeletePopOver";
import Button from "./Button";

export default function ArchiveOrDeleteButton ({
    path,
    nodeID,
    nodeName,
    handleToggle,
    reset,
    arrayOfThings,
    IDType,
    childArray,
    childIDType,
    action,
    buttonText,
    className
}) {
    const [visible, setVisible] = useState(false);

    function handleClick (e) {
        e.preventDefault();
        setVisible(visible => !visible);
      }
    return (
        <>
        {visible ? 
        <ArchiveOrDeletePopOver
            path={path}
            nodeID={nodeID}
            nodeName={nodeName}
            handleToggle={handleToggle}
            reset={reset}
            arrayOfThings={arrayOfThings}
            IDType={IDType}
            childArray={childArray}
            childIDType={childIDType}
            action={action}
      />
        :
       
        <Button handleClick={handleClick} className={className}>
            {buttonText}
        </Button>
        
        }
        </>
    )
}