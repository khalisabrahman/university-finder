import React, { useState } from "react";
import { Typography, Card, CardContent, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Remark from "./Remark";

const FavoriteItem = ({ favorite, favoriteList, updateFavoriteList }) => {
  const [remarks, setRemarks] = useState(favorite.remark);
  const [text, setText] = useState("");
  const date = favorite.dateAdded.slice(0, 10);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addRemark(text);
    setText("");
  };

  const addRemark = (text) => {
    if (text) {
      const newRemark = { text };
      setRemarks([...remarks, newRemark]);

      for (let i = 0; i < favoriteList.length; i++) {
        if (favorite.name === favoriteList[i].name) {
          favoriteList[i].remark = [...remarks, newRemark];
        }
      }
      updateFavoriteList(favoriteList);
    }
  };

  const removeRemark = (index) => {
    const updatedRemarks = [...remarks];
    updatedRemarks.splice(index, 1);
    setRemarks(updatedRemarks);

    for (let i = 0; i < favoriteList.length; i++) {
      if (favorite.name === favoriteList[i].name) {
        favoriteList[i].remark = updatedRemarks;
      }
    }
    updateFavoriteList(favoriteList);
  };

  const editRemark = (index, newText) => {
    const updatedRemarks = [...remarks];
    updatedRemarks[index].text = newText;
    setRemarks(updatedRemarks);

    for (let i = 0; i < favoriteList.length; i++) {
      if (favorite.name === favoriteList[i].name) {
        favoriteList[i].remark = updatedRemarks;
      }
    }
    updateFavoriteList(favoriteList);
  };

  return (
    <Card sx={{ width: "100%", maxWidth: "375px" }}>
      <CardContent sx={{ height: "300px", overflowY: "auto" }}>
        <Typography fontWeight="bold" fontSize="20px">
          {favorite.name}
        </Typography>
        <Typography>Country: {favorite.country}</Typography>
        <Typography marginBottom="8px">Date added: {date}</Typography>
        <form onSubmit={handleSubmit} style={{ marginTop: "10px" }}>
          <TextField
            id="outlined-basic"
            size="small"
            label="Type a remark"
            variant="outlined"
            value={text}
            onChange={handleChange}
          />

          <Button
            sx={{
              marginTop: "8px",
              backgroundColor: "#333333",
              color: "#FFF",
            }}
            type="submit"
            variant="contained"
          >
            Add Remark
          </Button>
        </form>
        {remarks.map((remark, index) => (
          <Remark
            key={index}
            index={index}
            remark={remark}
            removeRemark={removeRemark}
            editRemark={editRemark}
          />
        ))}

        <CardActions sx={{ display: "block" }}></CardActions>
      </CardContent>
    </Card>
  );
};

export default FavoriteItem;
