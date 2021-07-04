import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from "@material-ui/core/Avatar";
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Box from '@material-ui/core/Box';
import StarIcon from '@material-ui/icons/Star';
import Divider from '@material-ui/core/Divider';
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            minWidth: 333,
            maxWidth: 444,
            flexGrow: 1,
            margin: theme.spacing(1),
            padding: theme.spacing(1),
            backgroundColor: theme.palette.background.paper,
        },
        title: {
            fontSize: 14,
            fontWeight: 'bold',
        },
        subtitle: {
            fontSize: 11,
            textAlign: 'left',
        },
        pos: {
            marginBottom: 12,
        },
        paper: {
            padding: 2,
            justifyItems: 'center',
            justifySelf: 'center',
            align: 'center',
            textAlign: 'center',
        },
        gridAvatar: {
            backgroundColor: 'white',
            display: "flex",
            alignItems: "center"
        },
        avatar: {
            width: theme.spacing(10),
            height: theme.spacing(10),
        },
        listItemText: {
            fontSize: 10,
            padding: 0,
            margin: 0
        },
        starIcon: {
            display: 'inline',
            color: 'yellow',
            stroke: "black",
            strokeWidth: 1
        },
    }),
);;

function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
        React.cloneElement(element, {
            key: value,
        }),
    );
}

export default function StudectCard() {
    const classes = useStyles();
    const avatar_url = 'http://www.kopfbunt.de/wp-content/uploads/2008/08/20080812_kopfbunt_portrait_bt.jpg';

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={3}>
                    {/* Left Column */}
                    <Grid item xs={6}>

                        <Typography className={classes.subtitle}>
                            Study Program:
                        </Typography >

                        <Typography className={classes.title}>
                            Angewandte Informatik
                        </Typography >

                        <Divider />

                        <Typography className={classes.subtitle}>
                            Looking for students in:
                        </Typography >

                        <div>
                            <List>
                                {generate(
                                    <ListItem button >
                                        <ListItemText
                                            className={classes.listItemText}

                                            primary={
                                                <Typography className={classes.listItemText}>
                                                    Listitem
                                                </Typography>
                                            }
                                        />
                                    </ListItem>,
                                )}
                            </List>
                        </div>

                    </Grid>
                    {/* Right Column Avatar */}
                    <Grid
                        className={classes.gridAvatar}
                        item xs={6}
                        container
                        justify="center"
                    >

                        <Avatar
                            src={avatar_url}
                            className={classes.avatar}
                            alt='Osman Tasdelen' />

                    </Grid>

                    {/* Footer */}
                    <Grid item xs={12}>

                        <Typography className={classes.subtitle} >
                            <Box style={{ fontWeight: "bold", display: "inline" }}>
                                Osman Tasdelen
                            </Box>
                            - Osman.Tasdelen@stud.uni-due.de
                            <StarIcon className={classes.starIcon} />
                        </Typography>

                    </Grid>


                </Grid>
            </CardContent>

        </Card>
    );
}