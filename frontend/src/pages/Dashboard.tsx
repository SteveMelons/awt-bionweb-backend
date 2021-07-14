import { Box, Typography } from "@material-ui/core";
import React from "react";
import { useHistory } from "react-router-dom";
import {
  addFavorite,
  getCourses,
  getLanguages,
  getPreferences,
  getStudyprograms,
  getUniversities,
  useGetFilters,
  useGetUsers,
  useMe,
} from "../api";
import Filters from "../components/Filters";
import MultiAutoComplete from "../components/MultiAutoComplete";
import StudectCard from "../components/StudectCard";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  const [{ data: usersData, loading: usersLoading }] = useGetUsers();
  const [{ data: filtersData, loading: filtersLoading }] = useGetFilters();

  const history = useHistory();

  function sleep(delay = 0) {
    return new Promise((resolve) => {
      setTimeout(resolve, delay);
    });
  }

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
        <>
          {/* <Search /> */}
          {/* <Filters /> */}

          <Box
            mt="2em"
            display="flex"
            flexDirection="column"
            gap="1em"
            width="35em"
          >
            <Typography variant="h5">Filters</Typography>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getUniversities()).data;
                }}
                label="Universities"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getStudyprograms()).data;
                }}
                label="Study Programs"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getCourses()).data;
                }}
                label="Courses"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getLanguages()).data;
                }}
                label="Languages"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getPreferences()).data;
                }}
                label="Preferences"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getPreferences()).data;
                }}
                label="Skills"
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: "90%",
              margin: "2em auto",
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(25em, 1fr))",
              gap: "1em",
            }}
          >
            {!usersLoading &&
              usersData?.map((user) => (
                <StudectCard
                  key={user.id}
                  user={user}
                  onClickFavorite={async (id) => {
                    const res = await addFavorite({ favoriteId: id });
                  }}
                />
              ))}
          </Box>
        </>
      )}
    </>
  );
};

export default Dashboard;
