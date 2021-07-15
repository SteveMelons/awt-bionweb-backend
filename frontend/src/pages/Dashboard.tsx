import { Box, Button, Typography } from "@material-ui/core";
import React from "react";
import { useState } from "react";
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
import StudectCard from "../components/StudectCard";
import { User } from "../types/User";

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = ({}) => {
  const [{ data: meData, loading: meLoading }] = useMe();
  // const [{ data: usersData, loading: usersLoading }] = useGetUsers();
  // const [{ data: filtersData, loading: filtersLoading }] = useGetFilters();

  const initialLimit = 8;
  const loadLimit = 4;

  const [users, setUsers] = useState<User[]>([]);
  const [pagination, setPagination] = useState({
    limit: initialLimit,
    offset: 0,
  });
  const [selectedFilters, setSelectedFilters] = useState<FiltersInterface>({
    courses: [],
    languages: [],
    preferences: [],
    skills: [],
    studyprogram: [],
    university: [],
  });

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
                setPagination(newPagination);
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
            <Box
              sx={{
                width: "90%",
                margin: "2em auto",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(22em, 1fr))",
                gap: "1.3em",
              }}
            >
              {users.map((user, i) => (
                <StudectCard
                  key={user.id}
                  color={i % 3}
                  user={user}
                  onClickFavorite={(id) => {
                    const res = addFavorite({ favoriteId: id });
                  }}
                />
              ))}
              <Button
                onClick={async () => {
                  const newPagination = {
                    limit: loadLimit,
                    offset: pagination.offset + pagination.limit,
                  };
                  setPagination(newPagination);
                  const newData = (
                    await getUsers({
                      params: newPagination,
                      filters: selectedFilters,
                    })
                  ).data;
                  setUsers((prev) => [...prev, ...newData]);
                }}
              >
                Load More
              </Button>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Dashboard;
