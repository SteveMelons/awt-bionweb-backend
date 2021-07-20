import { Box, CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGetFavorites } from "../api";
import PaginatingGrid from "../components/PaginatingGrid";

interface FavoriteProps {
  loggedIn: boolean;
}

const Favorite: React.FC<FavoriteProps> = ({ loggedIn }) => {
  const [{ data: favoritesData, loading: favoritesLoading }] =
    useGetFavorites();
  const history = useHistory();

  return (
    <>
      {favoritesLoading ? (
        <CircularProgress color="secondary" />
      ) : !loggedIn ? (
        (() => {
          history.push("/login");
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
