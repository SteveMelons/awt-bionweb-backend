import { makeStyles, Theme, createStyles } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import { useGetUsers, useMe } from "../api";
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
  })
);

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: usersData, loading: usersLoading }] = useGetUsers();
  const history = useHistory();

  const classes = useStyles();

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
        <div className={classes.grid}>
          {!usersLoading &&
            usersData?.map((user) => <StudectCard key={user.id} user={user} />)}
        </div>
      )}
    </>
  );
};

export default Dashboard;
