import React, { ChangeEvent, useState } from "react";
import { Typography, Card, CardContent, CardActions } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import Remark from "./Remark";
import { FavoriteInterface } from "../types/types";

const FavoriteItem: React.FC<{
  favorite: FavoriteInterface;
  favoriteList: FavoriteInterface[];
  updateFavoriteList: (updatedList: FavoriteInterface[]) => void;
}> = ({ favorite, favoriteList, updateFavoriteList }) => {
  const [remarks, setRemarks] = useState(favorite.remark);
  const [text, setText] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addRemark(text);
    setText("");
  };

  const addRemark = (text: string) => {
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

  const removeRemark = (index: number) => {
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

  const editRemark = (index: number, newText: string) => {
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
        <Typography marginBottom="8px">Date added: {favorite.dateAdded}</Typography>
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
              marginBottom: "8px",
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
