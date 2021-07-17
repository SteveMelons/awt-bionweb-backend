import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGetFavorites, useMe } from "../api";
import PaginatingGrid from "../components/PaginatingGrid";

interface FavoriteProps {}

const Favorite: React.FC<FavoriteProps> = () => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: favoritesData }] = useGetFavorites();
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
          <Box mt="2em">
            <Typography variant="h5">Favorites</Typography>
          </Box>
          {favoritesData && favoritesData.length !== 0 && (
            <PaginatingGrid users={favoritesData} />
          )}
        </>
      )}
    </>
  );
};

export default Favorite;
