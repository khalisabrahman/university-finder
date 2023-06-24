import React from "react";
import { useEffect, useState, useMemo } from "react";
import { fetchFromAPI } from "../utils/universityApi.tsx";

import Searchbar from "../components/Searchbar";
import SearchItem from "../components/SearchItem";
import {
  FavoriteInterface,
  UniversityItemResponseInterface,
} from "../types/types.tsx";

const Home: React.FC = () => {
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
    }
  }, [memoizedFavoriteList]);

  const addNewFavorite = (item: FavoriteInterface) => {
    const updatedData = [...favoriteList, item];
    setFavoriteList(updatedData);
    localStorage.setItem("favoriteList", JSON.stringify(updatedData));
  };

  const onSearch = (term: string, country: string) => {
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
    content = searchResult.map(
      (university: UniversityItemResponseInterface, index: number) => {
        return (
          <SearchItem
            key={index}
            name={university.name}
            country={university.country}
            website={university?.web_pages}
            onAddFavorite={addNewFavorite}
          />
        );
      }
    );
  } else if (!isLoading && !searchResult.length) {
    content = <div>There are no such university</div>;
  }

  return (
    <div className="App">
      <Searchbar onSearch={onSearch} />

      {/* Loading spinner */}
      {isLoading && (
        <div className="spinner">
          <div className="rect1"></div>
          <div className="rect2"></div>
          <div className="rect3"></div>
          <div className="rect4"></div>
          <div className="rect5"></div>
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
