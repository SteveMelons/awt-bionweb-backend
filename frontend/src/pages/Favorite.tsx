import { Theme, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { removeFavorite, useGetFavorites, useMe } from "../api";
import { makeStyles, createStyles } from "@material-ui/styles";
import StudectCard from "../components/StudectCard";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grid: {
      width: "90%",
      margin: "2em auto",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(25em, 1fr))",
      gap: "1em",
    },
    head: {
      position: "relative",
      right: "9.5%",
      bottom: "-20px",
    },
  })
);

interface FavoriteProps {}

const Favorite: React.FC<FavoriteProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: favoritesData, loading: favoritesLoading }] =
    useGetFavorites();
  const history = useHistory();

  const classes = useStyles();

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
          <Typography variant="h4" className={classes.head}>
            <span style={{ color: "#1e78c8" }}>Favorites</span>
          </Typography>
          <div className={classes.grid}>
            {!favoritesLoading &&
              favoritesData?.map((favorite, i) => (
                <StudectCard
                  key={favorite.id}
                  user={favorite}
                  onClickFavorite={async (id) => {
                    const res = await removeFavorite({ favoriteId: id });
                    history.go(0);
                  }}
                />
              ))}
          </div>
        </>
      )}
    </>
  );
};

export default Favorite;
