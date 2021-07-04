import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';

import Grid from '@material-ui/core/Grid';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';

import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';

import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import MailIcon from '@material-ui/icons/Mail';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(1),
      padding: theme.spacing(10),
      paddingTop: '100px',
      backgroundColor: theme.palette.secondary.light,
      display: 'flex',
      alignItems: 'center',
      justifyCntent: 'center',
      width: '100%',
      flexDirection: 'column'
    },
    card: {
      width: '75%',
      alignItems: "center",
      borderRadius: theme.spacing(3)

    },
    gridAvatar: {
      alignItems: "center",
      display: "flex",
      flexDirection: 'column',
      justifyContent: 'center',

    },
    avatar: {
      marginTop: '-50px',
      position: 'absolute',
      width: theme.spacing(16),
      height: theme.spacing(16),
      border: '3px solid',
      borderColor: theme.palette.secondary.light,
    },
    table: {
      marginTop: '50px',
      width: '25%',
    },
    grid: {
      display: "flex",
      flexDirection: 'column',
      alignItems: "center",
    }
  }),
);;


export default function Profile() {
  const classes = useStyles();
  const avatar_url = 'http://www.kopfbunt.de/wp-content/uploads/2008/08/20080812_kopfbunt_portrait_bt.jpg';

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Grid container spacing={3}>

            {/* Header image */}
            <Grid className={classes.gridAvatar} item xs={12}>
              <Avatar
                src={avatar_url}
                className={classes.avatar}
                alt='Osman Tasdelen' />


            </Grid>

            {/* Header actions */}
            <Grid className={classes.grid} item xs={12}>
              <TableContainer component={Paper} className={classes.table}>
                <Table >
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">291x</TableCell>
                      <TableCell align="center">422x</TableCell>
                      <TableCell align="center">31x</TableCell>

                    </TableRow>
                  </TableHead>
                  <TableBody>

                    <TableRow>

                      <TableCell align="center">Favorited</TableCell>
                      <TableCell align="center">Contacted</TableCell>
                      <TableCell align="center">Shared</TableCell>

                    </TableRow>

                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>



            {/* Left column */}
            <Grid className={classes.grid} item xs={6}>
              <Typography variant="h5">
                Details of user
              </Typography>


              <Typography variant="subtitle1">
                Here you have an overview of the user's information.
              </Typography>

              <List>

                <ListItem>
                  Username: Erika31
                </ListItem>

                <ListItem>
                  E-Mail: Erika.Musterfrau@stud.uni-due.de
                </ListItem>

                <ListItem>
                  University: Universität Duisburg-Essen
                </ListItem>

                <ListItem>
                  Study program: Angewandte Informatik
                </ListItem>

              </List>
            </Grid>

            {/* Right column */}
            <Grid className={classes.grid} item xs={6}>
              <Typography variant="h5">
                Skills of user
              </Typography>


              <Typography variant="subtitle1">
                Here you have an overview of the user's skillset.
              </Typography>

              <List>

                <ListItem>
                  HTML
                </ListItem>

                <ListItem>
                  CSS
                </ListItem>

                <ListItem>
                  JavaScript
                </ListItem>


              </List>
            </Grid>



            {/* Footer */}
            <Grid className={classes.grid} item xs={12}>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon />
                </IconButton>

                <IconButton aria-label="contact">
                  <MailIcon />
                </IconButton>

                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </CardActions>
            </Grid>


          </Grid>
        </CardContent>

      </Card >
    </div >
  );
}