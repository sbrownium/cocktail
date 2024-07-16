import React from "react";
import './EditBox.css'

export default function EditBox({
  className,
  edit,
  handleEdit,
  id,
  textareaRef
}){
    return (    
      <textarea
          id={id}
          className={className}
          ref={textareaRef}
          // size={edit.length}
          type='text'
          value={edit}
          onChange={handleEdit}
      />
    )
}