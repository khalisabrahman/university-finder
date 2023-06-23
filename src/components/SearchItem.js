import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { Typography, Card, CardContent, CardActions } from "@mui/material";
import Button from "@mui/material/Button";


const SearchItem = ({
  name,
  country,
  website,
  onAddFavorite,
}) => {
  const [favorite, setFavorite] = useState(false);

  const handleAddFavorite = () => {
    setFavorite(true);
    onAddFavorite({
        id: uuidv4(),
        name,
        country,
        dateAdded: new Date(),
        remark: []
    })
  }

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
          >
            {!favorite ? "Add to favorites" : "Added"}
          </Button>
        </CardActions>
      </CardContent>
    </Card>
  );
};

export default SearchItem;
