import React, { useState } from "react";
import ArchivePopOver from "./ArchivePopOver";
import Button from "./Button";

export default function ArchiveButton ({path, nodeID, nodeName, handleToggle, children, className, drinks}) {
    const [visible, setVisible] = useState(false);

    function handleClick (e) {
        e.preventDefault();
        setVisible(visible => !visible);
      }
    return (
        <>
        {visible ? 
        <ArchivePopOver
            drinks={drinks}
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