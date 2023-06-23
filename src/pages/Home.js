import React from "react";
import { useEffect, useState, useMemo } from "react";
import { fetchFromAPI } from "../utils/universityApi.ts";

import Searchbar from "../components/Searchbar.js";
import SearchItem from "../components/SearchItem.js";

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchResult, setSearchResult] = useState([]);
  const [favoriteList, setFavoriteList] = useState([]);

  const memoizedFavoriteList = useMemo(() => {
    const arrStr = JSON.stringify(favoriteList);

    return arrStr;
  }, [favoriteList]);

  useEffect(() => {
    fetchFromAPI("limit=20").then((data) => {
      setSearchResult(data);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("favoriteList");
    if (storedData) {
      setFavoriteList(JSON.parse(storedData));
      console.log(favoriteList);
    }
  }, [memoizedFavoriteList]);

  const addNewFavorite = (item) => {
    const updatedData = [...favoriteList, item];
    setFavoriteList(updatedData);
    localStorage.setItem("favoriteList", JSON.stringify(updatedData));
  };

  const onSearch = (term, country) => {
    setSearchResult([]);
    setIsLoading(true);
    if (country) {
      fetchFromAPI(`name=${term}&country=${country}`).then((data) => {
        setSearchResult(data);
        setIsLoading(false);
      });
    } else {
      fetchFromAPI(`name=${term}`).then((data) => {
        setSearchResult(data);
        setIsLoading(false);
      });
    }
  };

  let content;
  if (searchResult.length) {
    content = searchResult.map((university, index) => {
      return (
        <SearchItem
          key={index}
          name={university.name}
          country={university.country}
          website={university?.web_pages}
          onAddFavorite={addNewFavorite}
          favoriteList={favoriteList}
        />
      );
    });
  } else if (!isLoading && !searchResult.length) {
    content = <div>There are no such university</div>;
  }

  return (
    <div className="App">
      <Searchbar onSearch={onSearch} />
      {isLoading && (
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      )}
      <div
        style={{
          marginTop: "40px",
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
        }}
      >
        {content}
      </div>
    </div>
  );
};

export default Home;
