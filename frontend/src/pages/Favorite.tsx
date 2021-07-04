import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGetFavorites, useMe } from "../api";
import StudectCard from "../components/StudectCard";

interface FavoriteProps {}

const Favorite: React.FC<FavoriteProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: favoritesData, loading: favoritesLoading }] =
    useGetFavorites();
  const history = useHistory();

  return (
    <>
      {meLoading ? (
        <h1>Loading...</h1>
      ) : !meData?.id ? (
        (() => {
          history.push("/");
          history.go(0);
        })()
      ) : (
        <>
          <Typography variant="h4">Favorites</Typography>
          {!favoritesLoading &&
            favoritesData?.map((favorite) => (
              <StudectCard key={favorite.id} user={favorite} />
            ))}
        </>
      )}
    </>
  );
};

export default Favorite;
