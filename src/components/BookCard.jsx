import React, { useState, useEffect } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import image from '../assets/1.jpg';
import noImage from '../assets/no_images.png';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import ListSubheader from "@material-ui/core/ListSubheader";
import Divider from '@material-ui/core/Divider';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import Pagination from '@material-ui/lab/Pagination';

import axios from 'axios';

// https://www.googleapis.com/books/v1/volumes?q=
// this.books_url + query + "&key=" + this.my_key + "&maxResults=20"
// private my_key = 'AIzaSyDzyzGstXy8UiAlsHo4BLdk6tpxMd4WMzU';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },

    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundImage: 'url(' + image + ')',
        // backgroundImage: 'url(' + image + ')',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    grid: {
        flex: 1,
        flexDirection: 'column',
    },
    nested: {
        paddingLeft: theme.spacing(4),
        fontSize: '10px',
    },
    filterHeading: {
        padding: theme.spacing(2),
        color: '#ccc',
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
}));





export default function BookCard(props) {
    const classes = useStyles();

    const { book } = props;

    return (
        <React.Fragment>

            <Card className={classes.card}>
                <img src={
                    book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.smallThumbnail : noImage
                } style={{ width: '85%', height: '250px', margin: '20px auto', }} />
                <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="body2" component="h2"
                        style={{ textOverflow: 'ellipsis' }}>
                        {book.volumeInfo.title}
                    </Typography >
                    {/* <Typography variant="caption">
                                                This is a media card.
                                            </Typography> */}
                    <Box mt={1} borderColor="transparent">
                        <Rating name="read-only" readOnly
                            value={
                                book.volumeInfo.averageRating ? book.volumeInfo.averageRating : 3
                            }
                            style={{
                                fontSize: '16px'
                            }} />
                    </Box>
                </CardContent>
                <CardActions>
                    <Button size="small" color="secondary">
                        View More <ArrowRightAltIcon />
                    </Button>
                </CardActions>
            </Card>

        </React.Fragment>
    );
}