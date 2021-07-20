import { Box, Button, CircularProgress, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  FiltersInterface,
  getCourses,
  getLanguages,
  getPreferences,
  getStudyprograms,
  getUniversities,
  getUsers,
  useGetRecommendations,
  useGetSeen,
} from "../api";
import MultiAutoComplete from "../components/MultiAutoComplete";
import PaginatingGrid from "../components/PaginatingGrid";
import StudectCarousel from "../components/StudectCarousel";
import { User } from "../types/User";

interface DashboardProps {
  loggedIn: boolean;
}

const Dashboard: React.FC<DashboardProps> = ({ loggedIn }) => {
  const [{ data: recommendationData, loading: recommendationLoading }] =
    useGetRecommendations();
  const [{ data: seenData, loading: seenLoading }] = useGetSeen();

  const [users, setUsers] = useState<User[]>([]);

  const [selectedFilters, setSelectedFilters] = useState<FiltersInterface>({
    courses: [],
    languages: [],
    preferences: [],
    skills: [],
    studyprogram: [],
    university: [],
  });

  const [initialState, setInitialState] = useState(true);

  const [reloadState, setReloadState] = useState<any>(null);

  const history = useHistory();

  const initialLimit = 8;
  const loadLimit = 4;

  return (
    <>
      {recommendationLoading || seenLoading ? (
        <CircularProgress color="secondary" />
      ) : !loggedIn ? (
        (() => {
          history.push("/login");
          history.go(0);
        })()
      ) : (
        <>
          <Box
            mt="2em"
            display="flex"
            flexDirection="column"
            gap="1em"
            maxWidth="35em"
            width="95%"
          >
            <Typography variant="h5">Filters</Typography>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getUniversities()).data;
                }}
                onChange={(newVal) =>
                  setSelectedFilters((prev) => {
                    let newState = Object.assign({}, prev);
                    newState.university = newVal;
                    return newState;
                  })
                }
                label="Universities"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getStudyprograms()).data;
                }}
                onChange={(newVal) =>
                  setSelectedFilters((prev) => {
                    let newState = Object.assign({}, prev);
                    newState.studyprogram = newVal;
                    return newState;
                  })
                }
                label="Study Programs"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getCourses()).data;
                }}
                onChange={(newVal) =>
                  setSelectedFilters((prev) => {
                    let newState = Object.assign({}, prev);
                    newState.courses = newVal;
                    return newState;
                  })
                }
                label="Courses"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getLanguages()).data;
                }}
                onChange={(newVal) =>
                  setSelectedFilters((prev) => {
                    let newState = Object.assign({}, prev);
                    newState.languages = newVal;
                    return newState;
                  })
                }
                label="Languages"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getPreferences()).data;
                }}
                onChange={(newVal) =>
                  setSelectedFilters((prev) => {
                    let newState = Object.assign({}, prev);
                    newState.preferences = newVal;
                    return newState;
                  })
                }
                label="Preferences"
              />
            </Box>
            <Box>
              <MultiAutoComplete
                getOptions={async () => {
                  return (await getPreferences()).data;
                }}
                onChange={(newVal) =>
                  setSelectedFilters((prev) => {
                    let newState = Object.assign({}, prev);
                    newState.skills = newVal;
                    return newState;
                  })
                }
                label="Skills"
              />
            </Box>
            <Button
              onClick={async () => {
                const newPagination = {
                  limit: initialLimit,
                  offset: 0,
                };
                setReloadState(newPagination);
                const loadedUsers = (
                  await getUsers({
                    params: newPagination,
                    filters: selectedFilters,
                  })
                ).data;
                setUsers(loadedUsers);

                setInitialState(false);
              }}
            >
              Search
            </Button>
          </Box>
          {users.length !== 0 ? (
            <PaginatingGrid
              users={users}
              initialLimit={initialLimit}
              loadLimit={loadLimit}
              reload={reloadState}
              onLoadMore={async (newPagination) => {
                const newData = (
                  await getUsers({
                    params: newPagination,
                    filters: selectedFilters,
                  })
                ).data;
                setUsers((prev) => [...prev, ...newData]);
              }}
            />
          ) : (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mt: "2em",
                width: "100%",
                alignItems: "center",
              }}
            >
              {!initialState && (
                <Box>
                  <Typography textAlign="center" variant="body1">
                    No users match your search...
                    {((recommendationData && recommendationData.length !== 0) ||
                      (seenData && seenData.length !== 0)) && (
                      <>
                        <br />
                        but here are some
                      </>
                    )}
                  </Typography>
                </Box>
              )}
              {recommendationData && recommendationData.length !== 0 && (
                <>
                  <Box>
                    <Typography variant="h5">Recommendations</Typography>
                  </Box>
                  <StudectCarousel users={recommendationData} />
                </>
              )}
              {seenData && seenData.length !== 0 && (
                <>
                  <Box>
                    <Typography variant="h5">Visited Profiles</Typography>
                  </Box>
                  <StudectCarousel users={seenData} />
                </>
              )}
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
