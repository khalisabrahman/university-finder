import React, { useState } from "react";
import { Typography, Card, CardContent, CardActions } from "@mui/material";
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
    <Card sx={{ width: 345 }}>
      <CardContent sx={{ height: "145px", overflowY: "auto" }}>
        <Typography fontWeight="bold">{favorite.name}</Typography>
        <Typography>Country: {favorite.country}</Typography>
        <Typography>Date added: {date}</Typography>
        {remarks.map((remark, index) => (
          <Remark
            key={index}
            index={index}
            remark={remark}
            removeRemark={removeRemark}
            editRemark={editRemark}
          />
        ))}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={text}
            onChange={handleChange}
            placeholder="Enter a new remark"
          />
          <button type="submit">Add Remark</button>
        </form>
        <CardActions sx={{ display: "block" }}></CardActions>
      </CardContent>
    </Card>
  );
};

export default FavoriteItem;
