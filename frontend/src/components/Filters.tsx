import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@material-ui/core";
import React from "react";
import { FiltersInterface, useGetFilters } from "../api";

interface FiltersProps {}

const Filters: React.FC<FiltersProps> = ({}) => {
  const [selectedFilters, setSelectedFilters] =
    React.useState<FiltersInterface>({
      courses: [],
      languages: [],
      preferences: [],
      studyprograms: [],
      universities: [],
    });

  const [{ data: filtersData, loading: filtersLoading }] = useGetFilters();

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    filter:
      | "universities"
      | "courses"
      | "languages"
      | "preferences"
      | "studyprograms"
  ) => {
    setSelectedFilters((prevState) => {
      let newState = Object.assign({}, prevState);
      newState[filter] = event.target.value as any[];
      return newState;
    });
  };
  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="universities-label">Universities</InputLabel>
        <Select
          labelId="universities-label"
          id="universities"
          multiple
          value={selectedFilters.universities}
          onChange={(e) => handleChange(e, "universities")}
          input={
            <OutlinedInput
              id="select-multiple-universities"
              label="Universities"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} sx={{ m: "2px" }} />
              ))}
            </Box>
          )}
        >
          {filtersData?.universities.map((value) => (
            <MenuItem key={value.id} value={value}>
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="studyprograms-label">Study Programs</InputLabel>
        <Select
          labelId="studyprograms-label"
          id="studyprograms"
          multiple
          value={selectedFilters.studyprograms}
          onChange={(e) => handleChange(e, "studyprograms")}
          input={
            <OutlinedInput
              id="select-multiple-studyprograms"
              label="Study Programs"
            />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap" }}>
              {selected.map((value) => (
                <Chip key={value.id} label={value.name} sx={{ m: "2px" }} />
              ))}
            </Box>
          )}
        >
          {filtersData?.studyprograms.map((value) => (
            <MenuItem key={value.id} value={value}>
              {value.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Filters;
