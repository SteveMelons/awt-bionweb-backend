import React from "react";
import { useHistory } from "react-router-dom";
import { useGetUser, useMe } from "../api";

interface ProfileProps {}

const Profile: React.FC<ProfileProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: userData, loading: userLoading }] = useGetUser();

  const history = useHistory();

  return (
    <>
      {meLoading ? (
        <h1>Loading...</h1>
      ) : !meData?.id ? (
        (() => {
          console.log(meData);
          history.push("/");
          history.go(0);
        })()
      ) : userLoading ? (
        <h1>Loading</h1>
      ) : !userData ? (
        <h1>Error</h1>
      ) : (
        <pre style={{ fontSize: "2em" }}>
          {JSON.stringify(userData, null, 2)}
        </pre>
      )}
    </>
  );
};

export default Profile;
