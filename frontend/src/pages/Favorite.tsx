import React from "react";
import { useHistory } from "react-router-dom";
import { useMe } from "../api";

interface FavoriteProps {}

const Favorite: React.FC<FavoriteProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
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
        <h1>Favorites!</h1>
      )}
    </>
  );
};

export default Favorite;
