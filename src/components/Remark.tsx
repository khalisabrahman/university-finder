import React, { ChangeEvent, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { RemarkInterface } from "../types/types";

const Remark: React.FC<{
  remark: RemarkInterface;
  index: number;
  removeRemark: (index: number) => void;
  editRemark: (index: number, text: string) => void;
}> = ({ remark, editRemark, removeRemark, index }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(remark.text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
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
          <TextField
            id="outlined-basic"
            size="small"
            label="Edit remark"
            variant="outlined"
            value={newText}
            onChange={handleChange}
          />

          <Button
            sx={{
              marginLeft: "8px",
              backgroundColor: "#333333",
              color: "#FFF",
            }}
            type="submit"
            variant="contained"
            onClick={handleUpdate}
          >
            Save
          </Button>
        </div>
      ) : (
        <div>
          {remark.text}

          <IconButton onClick={handleEdit}>
            <ModeEditIcon />
          </IconButton>
          <IconButton onClick={() => removeRemark(index)}>
            <DeleteForeverIcon color="error" />
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default Remark;
