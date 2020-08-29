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

import BookCard from '../components/BookCard';

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





export default function BookCardGrid(props) {
    const classes = useStyles();

    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
    const search = props.match ? props.match.params.name : 'tintin';

    const [books, setBooks] = useState([]);

    const [loading, setLoading] = React.useState(false);
    const [lastIndex, setLastIndex] = React.useState(-1);

    const [openPrice, setOpenPrice] = React.useState(true);
    const [openRating, setOpenRating] = React.useState(true);

    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(8);
    const [maxResults] = useState(35);



    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentBooks = books.slice(indexOfFirstPost, indexOfLastPost);




    useEffect(() => {
        const fetchBooks = () => {
            const url = `https://www.googleapis.com/books/v1/volumes?q=${search}&key=AIzaSyDzyzGstXy8UiAlsHo4BLdk6tpxMd4WMzU&maxResults=${maxResults}`
            // this.books_url + query + "&key=" + this.my_key + "&maxResults=20"
            // private my_key = 'AIzaSyDzyzGstXy8UiAlsHo4BLdk6tpxMd4WMzU';
            setLoading(true);
            axios.get(url)
                .then(res => {
                    setLoading(false);
                    setBooks(res.data.items)
                })
                .catch(err => {
                    console.log(err);
                })
        }
        fetchBooks();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
    };

    const handlePriceClick = () => {
        setOpenPrice(!openPrice);
    };
    const handleRatingClick = () => {
        setOpenRating(!openRating);
    };


    return (
        <React.Fragment>
            <CssBaseline />

            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                </div>
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4} md={2}>
                            <List
                                component="div"
                                aria-labelledby="nested-list-subheader"

                                className={classes.root}
                            >
                                <Typography variant="body1" className={classes.filterHeading}>
                                    Filters
                                </Typography>
                                <Divider />
                                <ListItem button onClick={handlePriceClick}>
                                    <ListItemText primary="Price" />
                                    {openPrice ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={openPrice} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary={
                                                <Typography variant="body2" style={{ color: '#ccc' }}>
                                                    Low to high
                                                </Typography>
                                            } />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary={
                                                <Typography variant="body2" style={{ color: '#ccc' }}>
                                                    High to low
                                                </Typography>
                                            } />
                                        </ListItem>
                                    </List>
                                </Collapse>

                                <ListItem button onClick={handleRatingClick}>
                                    <ListItemText primary="Rating" />
                                    {openRating ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>

                                <Collapse in={openRating} timeout="auto" unmountOnExit>
                                    <List component="div" disablePadding>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary={
                                                <Typography variant="body2" style={{ color: '#ccc' }}>
                                                    More than 4
                                                </Typography>
                                            } />
                                        </ListItem>
                                        <ListItem button className={classes.nested}>
                                            <ListItemText primary={
                                                <Typography variant="body2" style={{ color: '#ccc' }}>
                                                    More than 3
                                                </Typography>
                                            } />
                                        </ListItem>
                                    </List>
                                </Collapse>
                            </List>
                        </Grid>
                        <Grid item xs={12} sm={8} md={10}
                            container
                            spacing={3}
                            direction="row"
                            justify="flex-start"
                            alignItems="flex-start">

                            {!loading && currentBooks && currentBooks.map((book, index) => (
                                <Grid item key={index} xs={12} sm={6} md={3}>
                                    <BookCard book={book} />
                                </Grid>
                            ))}
                            <Pagination count={Math.ceil(maxResults / postsPerPage)}
                                page={currentPage} color="primary"
                                style={{ textAlign: 'center', margin: '10px auto' }}
                                onChange={handlePageChange} />
                        </Grid>

                    </Grid>

                </Container>
            </main>
            {/* Footer */}
            <footer className={classes.footer}>
                <Typography variant="h6" align="center" gutterBottom>
                    Footer
        </Typography>
                <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
                    Something here to give the footer a purpose!
        </Typography>
                <Copyright />
            </footer>
            {/* End footer */}
        </React.Fragment>
    );
}