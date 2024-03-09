import React from "react";

export default function EditBox({edit, handleEdit, handleClick, handleToggle}){
return (
  <>
  <form>    
  <input
      id='drinkName'
      size={edit.length}
      type="text"
      value={edit}
      onChange={handleEdit}
  />
{/* <button onClick={handleClick} onKeyDown={(e) => e.key === 'Enter' ? handleClick(e) : ''}> */}
<button onClick={handleClick}>
    Save</button> 
  </form>
<button onClick={handleToggle}>Never Mind</button>
        </> 
)
}