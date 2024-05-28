import React, { useState } from "react";
import ArchivePopOver from "./ArchivePopOver";
import Button from "./Button";

export default function ArchiveButton ({
    path,
    nodeID,
    nodeName,
    handleToggle,
    buttonText,
    className,
    arrayOfThings,
    IDType
}) {
    const [visible, setVisible] = useState(false);

    function handleClick (e) {
        e.preventDefault();
        setVisible(visible => !visible);
      }
    return (
        <>
        {visible ? 
        <ArchivePopOver
            arrayOfThings={arrayOfThings}
            path={path}
            nodeID={nodeID}
            nodeName={nodeName}
            handleToggle={handleToggle}
            IDType={IDType}
        />
        :
        <Button handleClick={handleClick} className={className}>
            {buttonText}
        </Button>    
        }
        </>
    )
}