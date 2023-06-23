import React, { useState } from "react";

const Remark = ({ remark, editRemark, removeRemark, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(remark.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event) => {
    setNewText(event.target.value);
  };

  const handleUpdate = () => {
    editRemark(index, newText);
    setIsEditing(false);
  };
  return (
    <div>
      {isEditing ? (
        <div>
          <input type="text" value={newText} onChange={handleChange} />
          <button onClick={handleUpdate}>Save</button>
        </div>
      ) : (
        <div>
          {remark.text}
          <button onClick={handleEdit}>Edit</button>
          <button onClick={() => removeRemark(index)}>Remove</button>
        </div>
      )}
    </div>
  );
};

export default Remark;
