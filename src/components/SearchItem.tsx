import { useState } from "react";
import { Typography, Card, CardContent, CardActions } from "@mui/material";
import Button from "@mui/material/Button";

import { FavoriteInterface } from "../types/types";

const SearchItem: React.FC<{
  name: string;
  country: string;
  website: string[];
  onAddFavorite: (favorite: FavoriteInterface) => void;
}> = ({ name, country, website, onAddFavorite }) => {
  const [favorite, setFavorite] = useState(false);

  const handleAddFavorite = () => {
    setFavorite(true);
    onAddFavorite({
      name,
      country,
      dateAdded: new Date().toLocaleDateString('en-GB'),
      remark: [],
    });
  };

  return (
    <Card sx={{ width: 345 }}>
      <CardContent sx={{ height: "150px" }}>
        <Typography fontWeight="bold">{name}</Typography>
        <Typography>Country: {country}</Typography>
        <Typography>Webpage: {website}</Typography>
        <CardActions sx={{ display: "block" }}>
          <Button
            size="small"
            variant="contained"
            onClick={handleAddFavorite}
            color={!favorite ? "primary" : "success"}
          >
            {!favorite ? "Add to favorites" : "Added"}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SearchItem;
