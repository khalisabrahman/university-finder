import React, { useEffect, useState, useMemo } from "react";
import { Typography } from "@mui/material";

import FavoriteItem from "../components/FavoriteItem";

const FavoritePage: React.FC = () => {
  const [favoriteList, setFavoriteList] = useState([]);

  const memoizedFavoriteList = useMemo(() => {
    const arrStr = JSON.stringify(favoriteList);
    return arrStr;
  }, [favoriteList]);

  useEffect(() => {
    const storedData = localStorage.getItem("favoriteList");
    if (storedData) {
      setFavoriteList(JSON.parse(storedData));
    }
  }, [memoizedFavoriteList]);

  const updateFavoriteList = (updatedList: any) => {
    localStorage.setItem("favoriteList", JSON.stringify(updatedList));
    setFavoriteList(updatedList);
  };

  return (
    <div>
      <Typography
        variant="h5"
        fontWeight="bold"
        marginLeft="10px"
        marginTop="30px"
      >
        List of your favorite universities
      </Typography>
      <div
        style={{
          marginTop: "40px",
          marginLeft: "10px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {!favoriteList.length && (
          <div>
            There are no universities added to the Favorite list. Please add a
            university from the Home page
          </div>
        )}
        {favoriteList.length > 0 &&
          favoriteList.map((favorite, index) => (
            <FavoriteItem
              favorite={favorite}
              favoriteList={favoriteList}
              updateFavoriteList={updateFavoriteList}
              key={index}
            ></FavoriteItem>
          ))}
      </div>
    </div>
  );
};

export default FavoritePage;
