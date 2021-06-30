import { Typography, makeStyles, Container, Link } from "@material-ui/core";
import React from "react";

interface FooterProps {}

const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    textAlign: "center",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[200]
        : theme.palette.grey[800],
  },
}));

const Footer: React.FC<FooterProps> = ({}) => {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">
          Advanced Web Technology Project 2021 - BioNWeb - Studect
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {"Copyright © "}
          <Link color="inherit" href="/">
            Studect
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </footer>
  );
};

export default Footer;
