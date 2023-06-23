import React, { useEffect, useState, useMemo } from "react";
import FavoriteItem from "./FavoriteItem";

const FavoritePage = () => {
    console.log('component rendered')
  const [favoriteList, setFavoriteList] = useState([]);

  const memoizedFavoriteList = useMemo(() => {
    console.log('FavPage useMemo runs')
    const arrStr = JSON.stringify(favoriteList);

    return arrStr;
  }, [favoriteList]);

  useEffect(() => {
    console.log('FavPage useEffect')
    const storedData = localStorage.getItem("favoriteList");
    if (storedData) {
      setFavoriteList(JSON.parse(storedData));
    }
  }, [memoizedFavoriteList]);

  const updateFavoriteList = (updatedList) => {
    localStorage.setItem("favoriteList", JSON.stringify(updatedList) );
    setFavoriteList(updatedList);
  };
  

  return (
    <div>
      {favoriteList.map((favorite) => (
        <FavoriteItem
          favorite={favorite}
          favoriteList={favoriteList}
          updateFavoriteList={updateFavoriteList}
        ></FavoriteItem>
      ))}
    </div>
  );
};

export default FavoritePage;
