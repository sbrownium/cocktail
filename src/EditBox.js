import React from "react";

export default function EditBox({
  edit,
  handleEdit,
  id,
  type
}){
    return (    
      <input
          id={id}
          size={edit.length}
          type={type}
          value={edit}
          onChange={handleEdit}
      />
    )
}