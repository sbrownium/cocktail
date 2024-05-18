import React from "react";

export default function EditBox({
  className,
  edit,
  handleEdit,
  id
}){
    return (    
      <input
          id={id}
          className={className}
          size={edit.length}
          type='text'
          value={edit}
          onChange={handleEdit}
      />
    )
}