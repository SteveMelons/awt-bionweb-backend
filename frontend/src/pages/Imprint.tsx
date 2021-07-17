import { Box, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const Imprint: React.FC = () => {
  return (
    <Box textAlign="left" width="95%">
      <Typography variant="h3">Imprint</Typography>
      <Box mt="1em">
        <Typography variant="body1">
          Advanced Web Technology Project 2021 - BioNWeb - Studect
        </Typography>
      </Box>
      <Typography mt="1.5em" variant="h5">
        Appreciation
      </Typography>
      <Typography variant="body1">
        Credit goes out to the whole <b>BioNWeb Team</b>:
        <br />
        <br />
        Shahab Abbaszadeh, Ahmand Rifaee, Osman Tasdelen, Furkan Erbil and
        Oliver Fischer
        <br />
        <br />
        as well as the <b>Advanced Web Technology Course 2021</b>, especially
        <br />
        Prof. Dr. Mohamed Chatti
        <br />
        and M. Sc. Shoeb Joarder
      </Typography>
    </Box>
  );
};

export default Imprint;
