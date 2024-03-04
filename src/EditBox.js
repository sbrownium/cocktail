import React, {useState} from "react";

export default function EditBox({text}){
    const [edit, setEdit] = useState(text)
    return (
//         <>
//   <label>Edit
  <input
      id='drinkName'
      size={edit.length}
      type="text"
      value={edit}
      onChange={(e) => setEdit(e.target.value)}
  />
//   </label>
//   </>
)
}