import { Box, Button, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  addFavorite,
  FiltersInterface,
  getCourses,
  getLanguages,
  getPreferences,
  getStudyprograms,
  getUniversities,
  getUsers,
  useMe,
} from "../api";
import MultiAutoComplete from "../components/MultiAutoComplete";
import PaginatingGrid from "../components/PaginatingGrid";
import { User } from "../types/User";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const [{ data: meData, loading: meLoading }] = useMe();
  // const [{ data: usersData, loading: usersLoading }] = useGetUsers();
  // const [{ data: filtersData, loading: filtersLoading }] = useGetFilters();

  const [users, setUsers] = useState<User[]>([]);

  const [selectedFilters, setSelectedFilters] = useState<FiltersInterface>({
    courses: [],
    languages: [],
    preferences: [],
    skills: [],
    studyprogram: [],
    university: [],
  });

  const history = useHistory();

  const initialLimit = 8;
  const loadLimit = 4;

  return (
    <>
      {meLoading ? (
        <h1>Loading...</h1>
      ) : !meData?.id ? (
        (() => {
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
                setUsers(
                  (
                    await getUsers({
                      params: newPagination,
                      filters: selectedFilters,
                    })
                  ).data
                );
              }}
            >
              Search
            </Button>
          </Box>
          {users.length !== 0 && (
            <PaginatingGrid
              users={users}
              initialLimit={initialLimit}
              loadLimit={loadLimit}
              onLoadMore={async (newPagination) => {
                const newData = (
                  await getUsers({
                    params: newPagination,
                    filters: selectedFilters,
                  })
                ).data;
                setUsers((prev) => [...prev, ...newData]);
              }}
              onClickFavorite={(id) => {
                addFavorite({ favoriteId: id });
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
