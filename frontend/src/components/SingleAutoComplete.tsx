import { Autocomplete, CircularProgress, TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { BasicEntity } from "../api";

interface SingleAutoCompleteProps {
  getOptions: () => Promise<BasicEntity[]>;
  label: string;
  onChange: (newVal: BasicEntity) => void;
  preSelected?: BasicEntity;
}

const SingleAutoComplete: React.FC<SingleAutoCompleteProps> = ({
  getOptions,
  label,
  onChange,
  preSelected,
}) => {
  const [selected, setSelected] = useState(preSelected || { id: "", name: "" });

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
        setOptions([{ id: "", name: "" }, ...(await getOptions())]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, getOptions]);

  useEffect(() => {
    onChange(selected);
  }, [selected]);

  return (
    <Autocomplete
      sx={{ width: "100%" }}
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
        setSelected(newVal as any);
      }}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option.id === value.id}
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

export default SingleAutoComplete;
