import React, { useState } from 'react'
import { makeStyles, withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import NativeSelect from '@material-ui/core/NativeSelect'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import InputBase from '@material-ui/core/InputBase';
import TextField from '@material-ui/core/TextField'

const BootstrapInput = withStyles((theme) => ({
    root: {
        'label + &': {
            marginTop: theme.spacing(3),
        },
    },
    input: {
        borderRadius: 4,
        position: 'relative',
        backgroundColor: theme.palette.background.paper,
        border: '1px solid #ced4da',
        fontSize: 16,
        padding: '10px 26px 10px 12px',
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        // Use the system font instead of the default Roboto font.
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:focus': {
            borderRadius: 4,
            borderColor: '#80bdff',
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
        },
    },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    width: {
        width: '100%'
    },
    grid: {
        width: '100%',
        padding: theme.spacing(8),
        flexGrow: 1
    },
}))

export default function SearchBoxToolBar() {
    const classes = useStyles()
    const [searchBy, setSearchBy] = useState("Dentist")
    const [searchText, setSearchText] = useState('');
    function handleChange(event) {
        setSearchBy(event.target.value)
    }
    function handleTextChange(event) {
        setSearchText(event.target.value)
        console.log(searchText)
    }
    async function handleSearchClick() {
        console.log('click');
    }
    return (
        <Grid container spacing={2} className={classes.grid} justifyContent='center'>
            <Grid item xs={12} sm={12} md={2} lg={2}>
                <FormControl className={classes.width}>
                    <NativeSelect className={classes.width}
                        id="demo-customized-select-native"
                        value={searchBy}
                        onChange={handleChange}
                        input={<BootstrapInput />}
                    >
                        <option value={"Dentist"}>Dentist</option>
                        <option value={"Clinic"}>Clinic</option>
                    </NativeSelect>
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <FormControl className={classes.width}>
                    <TextField
                        className={classes.width}
                        label={searchBy === "Dentist" ? "Name of dentist" : "Name of clinic"}
                        variant="outlined"
                        size="small"
                        value={searchText}
                        onChange={handleTextChange}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}>
                <FormControl className={classes.width}>
                    <Button variant="contained" color="primary" onClick={handleSearchClick}>Search</Button>
                </FormControl>
            </Grid>
        </Grid>
    )
}
