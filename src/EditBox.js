import React from "react";

export default function EditBox({
  edit,
  handleEdit,
  id
}){
    return (    
      <input
          id={id}
          size={edit.length}
          type='text'
          value={edit}
          onChange={handleEdit}
      />
    )
}