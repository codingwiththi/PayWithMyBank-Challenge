import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { BsSearch } from "react-icons/bs";
import { useState } from "react";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
} from "reactstrap";


const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

const useStyles2 = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    flexGrow: 1,
    width: '1000px',
    top: '300px',

  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));





function Home({sneakers}){
  const classes = useStyles();
  const classes2 = useStyles2();
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous"></link>
        <script src="//sandbox.paywithmybank.com/start/scripts/pwmb.js?accessId=D61EC9BAF0BB369B9438" type="text/javascript"></script>
                
      </Head>

      <main className={styles.main}>
        <div className={styles.cabecalho}>
          <h1 className={styles.title}>
            Sneakers
          </h1>
        </div>

        <div className={styles.search}>
          <FormGroup>
            <InputGroup>
              <InputGroupAddon addonType="prepend">
              <h4><BsSearch /></h4>
              </InputGroupAddon>
              <Input
                className={styles.input}
                aria-describedby="basic-addon1"
                aria-label="Username"
                placeholder="Search for your sneaker"
                type="text"
                onChange={(event) => {
                  setSearchTerm(event.target.value);
                }}
              ></Input>
            </InputGroup>
        </FormGroup>
            
        </div>
        <div className={styles.line}>

        </div>
        

        
          
          
            <div className={classes2.root}>
              <Grid container spacing={3}>
                {sneakers.results.filter((sneaker) => {
                  if(searchTerm == "") {
                    return sneaker;
                  } else if (sneaker.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                    return sneaker;
                  }
                }).map(sneaker => (
                      <React.Fragment>
                        <Grid item xs={4}>
                          <Card className={classes.root}>
                            <CardActionArea>
                              <div className={classes.photo}>
                              <Image
                                src={sneaker.thumbnailURL}
                                alt={sneaker.description}
                                width={320}
                                height={170}
                              />
                              </div>
                              <CardContent className={styles.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">
                                  {sneaker.description}
                                </Typography>
                                <Grid container spacing={3}>
                                  <Grid item xs={6}>
                                    <label>Size:</label>

                                    <NativeSelect className={styles.select}>
                                    <option aria-label="None" value="" />
                                    <option>38</option>
                                    <option>39</option>
                                    <option>40</option>
                                    <option>41</option>
                                    <option>42</option>
                                  </NativeSelect>

                                  </Grid>
                                  <Grid item xs={6}>
                                    <label>Quantity:</label>

                                    <NativeSelect className={styles.select}> 
                                    <option aria-label="None" value="" />
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                  </NativeSelect>

                                  </Grid>

                                </Grid>
                                
                                <h4>{sneaker.price}</h4>
                              </CardContent>
                            </CardActionArea>
                            <CardActions>
                            <Link href={`/cart/${sneaker.id}`}>
                              <button className={styles.button}>
                                <h5>Add to cart</h5>
                              </button>
                            </Link>
                            </CardActions>
                          </Card>
                        </Grid>
                      </React.Fragment>


              ))}
                
              </Grid>
            </div>
          




        
      </main>
    </div>
  );
};


export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const res = await fetch('https://voliveira.s3-sa-east-1.amazonaws.com/sneakers/index.json')
  const sneakers = await res.json()

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      sneakers,
    },
  }
}

export default Home;