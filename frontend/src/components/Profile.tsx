import React from "react";
import { useHistory } from "react-router-dom";
import { useMe } from "../api";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const [{ data, loading }] = useMe();

  const history = useHistory();

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : !data?.id ? (
        (() => {
          console.log(data);
          history.push("/");
          history.go(0);
        })()
      ) : (
        <h1>Profile!</h1>
      )}
    </>
  );
};

export default Profile;
