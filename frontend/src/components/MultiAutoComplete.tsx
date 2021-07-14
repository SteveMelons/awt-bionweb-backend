import { Autocomplete, CircularProgress, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BasicEntity } from "../api";

interface MultiAutoCompleteProps {
  getOptions: () => Promise<BasicEntity[]>;
  label: string;
}

const MultiAutoComplete: React.FC<MultiAutoCompleteProps> = ({
  getOptions,
  label,
}) => {
  const [selected, setSelected] = useState<BasicEntity[]>([]);

  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<readonly BasicEntity[]>([]);
  const loading = open && options.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        setOptions([...(await getOptions())]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  return (
    <Autocomplete
      sx={{ width: "100%" }}
      multiple
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      loading={loading}
      options={options}
      value={selected}
      onChange={(e, newVal) => {
        setSelected((prevState) => {
          let newState = Object.assign({}, prevState);
          newState = newVal as any[];
          return newState;
        });
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="..."
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};

export default MultiAutoComplete;
