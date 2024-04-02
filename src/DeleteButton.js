import React from "react";
import PopOver from "./PopOver";

export default function DeleteButton ({nodeID, nodeName, handleToggle}) {
    return (
        <PopOver
            path='/comments/'
            nodeID={nodeID}
            nodeName={nodeName}
            handleToggle={handleToggle}
        />
    )
}