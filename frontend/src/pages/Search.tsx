import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';


import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

import Slider from '@material-ui/core/Slider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

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
        formControl: {
            margin: theme.spacing(1),
            minWidth: 666,
        }
    }),
);;



const StudectSearch: React.FC = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h1>Studect Search</h1>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Please choose your university</InputLabel>
                <Select>
                    <MenuItem value={'Universität Duisburg'}>Universität Duisburg</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">Please choose your study program</InputLabel>
                <Select>
                    <MenuItem value={'Angewandte Informatik'}>Angewandte Informatik</MenuItem>
                    <MenuItem value={'Komedia'}>Komedia</MenuItem>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <Typography id="semester-slider" gutterBottom>Your actual semester    </Typography>
                <Slider
                    aria-labelledby="semester-slider"
                    valueLabelDisplay="auto"
                    defaultValue={1}
                    step={1}
                    marks
                    min={1}
                    max={12}
                />

            </FormControl>

            <FormControl className={classes.formControl}>
                <Typography id="people-slider" gutterBottom>How many people you are looking for   </Typography>
                <Slider
                    aria-labelledby="people-slider"
                    valueLabelDisplay="auto"
                    defaultValue={1}
                    step={1}
                    marks
                    min={1}
                    max={10}
                />

            </FormControl>

            <Typography gutterBottom>Preference for same course</Typography>
            <FormControlLabel
                control={
                    <Checkbox
                        name="check1"
                        color="primary"
                    />
                }
                label="Same course"
            />
            <FormControlLabel
                control={
                    <Checkbox
                        name="check2"
                        color="primary"
                    />
                }
                label="Does not matter"
            />

            <div>
                <Button variant="contained" color="primary" type="submit">
                    Find students
                </Button>
            </div>
        </div>
    );
};


export default StudectSearch;