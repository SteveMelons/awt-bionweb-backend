import React from "react";
import { useHistory } from "react-router-dom";
import { useMe } from "../api";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const history = useHistory();

  return (
    <>
      {meLoading ? (
        <h1>Loading...</h1>
      ) : !meData?.id ? (
        (() => {
          console.log(meData);
          history.push("/login");
          history.go(0);
        })()
      ) : (
        <h1>Dashboard/Home</h1>
      )}
    </>
  );
};

export default Dashboard;
