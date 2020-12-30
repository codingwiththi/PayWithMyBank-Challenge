import { useRouter } from 'next/router';
import styles from '../../styles/Home.module.css'
import Grid from '@material-ui/core/Grid';
import { BsArrowLeft } from "react-icons/bs";
import Link from 'next/link';
import { makeStyles } from '@material-ui/core/styles';
import Image from 'next/image'
import Head from 'next/head'
import { Button } from 'react-bootstrap';

const useStyles = makeStyles({
    root: {
      maxWidth: 345,
    },
    media: {
      height: 633,
    },
  });

function Sneaker({sneakers}){ 
    //console.log(sneakers.results);
    const classes = useStyles();
    const router = useRouter();
    var sneakerUrl  = router.query["sneaker"];

    


    return (
        <div>
            <Head>
                <title>Cart</title>
                <link rel="icon" href="/favicon.ico" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossOrigin="anonymous"></link>
                
                <script src="//sandbox.paywithmybank.com/start/scripts/pwmb.js?accessId=D61EC9BAF0BB369B9438" type="text/javascript"></script>
                
                
                <script type="text/javascript" src="/js/PayWithMyBank.js"></script>
                
            </Head>
        

        <main className={styles.main}>
            <div className={styles.cabecalho}>
                <Grid container spacing={3}>
                    <Grid item xs >
                        <Link href={"/"}>
                            <button className={styles.back}><BsArrowLeft /> Back</button>
                        </Link>
                    </Grid>
                    <Grid item xs={6}>
                        <h1 className={styles.title}>
                            Checkout
                        </h1>
                    </Grid>
                    <Grid item xs>
                    </Grid>
                </Grid>
            </div>
            <div className={styles.status}>
            <Grid container spacing={3}>
                    <Grid item xs >
                        <span className={styles.checkbox}></span>
                        <h4>Cart</h4>
                    </Grid>
                    <Grid item xs className={styles.meio}>
                        <span className={styles.checkbox}></span>
                        <h4>Payment options</h4>
                    </Grid>
                    <Grid item xs className={styles.fim}>
                        <span className={styles.checkboxFim}></span>
                        <h4 className={styles.fim}>Receipt</h4>
                    </Grid>
                </Grid>

            </div>
            
            <div className={styles.cart}>
                
            {sneakers.results.filter((sneaker) => {
                  if(sneakerUrl == "") {
                      console.log("sneakerUrl");
                    return sneaker;
                  } else if (sneaker.id.includes(sneakerUrl)) {
                      console.log(sneaker.id);
                    return sneaker;
                  }
                }).map(sneaker => (
                    
                    <Grid container spacing={5}>
                    <Grid item xs={6} >
                              <Image
                                src={sneaker.maxresURL}
                                alt={sneaker.description}
                                width={532}
                                height={633}
                                className={styles.photo}

                            />
                    </Grid>
                    <Grid item xs={6}>
                        <div className={styles.order}>
                            <Grid container spacing={5}>
                            <Grid item xs>
                                <h3 className={styles.cartTitle}>Cart Total</h3>
                                <h4 className={styles.cartBody}>{sneaker.description}</h4>
                            </Grid>
                            <Grid item xs>
                                <h3 className={styles.cartTitle}>Delivery Details</h3>
                            </Grid>
                            </Grid>
                            <Grid container spacing={5}>
                            <Grid item xs>
                            </Grid>
                            <Grid item xs>
                                <h4 className={styles.cartBody}>Total Cost: </h4><h4 >{sneaker.price}</h4>
                            </Grid>
                            </Grid>
                            <div id="widget">carregando...</div>

                        </div>
                    
                    </Grid>
                </Grid>

                ))}
            

                </div>
                
                
            </main>
        </div>
    );
}


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

export default Sneaker;

