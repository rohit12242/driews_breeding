import { Box, Typography, Button, Grid, Link } from '@mui/material';
// import { Link } from 'react-router-dom';
// import DriewsList from '../component/driewsList';
// import { FaCircle } from "react-icons/fa";
import { useState, useCallback } from 'react';
// import { useEffect } from 'react';
import Web3 from "web3";
import Web3Modal from "web3modal";
import { useHistory } from 'react-router';
import { useSnackbar } from 'notistack';



const { ethers } = require("ethers");
const providerOptions = {
    walletconnect: {
        // package: WalletConnectProvider, // required
        options: {
            infuraId: "" // required
        }
    }
};

const web3Modal = new Web3Modal({
    // network: "mainnet", // optional
    cacheProvider: true, // optional
    providerOptions // required
});

/* const logoutOfWeb3Modal = async () => {
    await web3Modal.clearCachedProvider();
    setTimeout(() => {
        window.location.reload();
    }, 1);
}; */

export default function Home() {
    // const [isLoggedIn, setisLoggedIn] = useState(false)
    const [injectedProvider, setInjectedProvider] = useState();
    // const [provider, setprovider] = useState()
    // const [accountConnectedMsg, setaccountConnectedMsg] = useState(false)
    // const [chainCorrect, setchainCorrect] = useState(false)
    // const [installMetamaskMsg, setinstallMetamaskMsg] = useState(false)
    // const [loggedInAccount, setloggedInAccount] = useState()
    let history = useHistory();
    const { enqueueSnackbar } = useSnackbar();


    const routeToDriews = (address) => {
        // const accountAddress = loggedInAccount;
        history.push(`/driews/${address}`)
    }
    //function to connect to metamask
    const loadWeb3Modal = useCallback(async () => {
        // console.log("load web3 modal is called")
        // setinstallMetamaskMsg(false)
        const { ethereum } = window;
        const metamaskIsInstalled = ethereum && ethereum.isMetaMask;
        if (metamaskIsInstalled) {
            const provider = await web3Modal.connect();
            // console.log("value of provider");
            // const web3 = new Web3(provider);
            // setprovider(provider)
            setInjectedProvider(new ethers.providers.Web3Provider(provider));
            console.log("value of injected provider::", injectedProvider);
            // setisLoggedIn(true);

            const web3 = new Web3(provider)
            const accounts = await web3.eth.getAccounts();
            // setloggedInAccount(accounts[0])

            const networkId = await web3.eth.net.getId();
            console.log("value of networkId::", networkId);

            if (networkId === 1) {
                // setchainCorrect(false);
                // setaccountConnectedMsg(false)
                routeToDriews(accounts[0]);
            }
            else {
                // setchainCorrect(true)
                // setaccountConnectedMsg(false)
                enqueueSnackbar('Wrong Network Detected', { variant: 'error' })
            }

            /*  provider.on("chainChanged", chainId => {
                 console.log(`chain changed to ${chainId}! updating providers`);
                 if (chainId === '0x4') {
                     // setaccountConnectedMsg(false)
                     // setchainCorrect(false);
                     routeToDriews(accounts[0]);
                 }
                 else {
                     // setaccountConnectedMsg(false)
                     // setchainCorrect(true)
                     enqueueSnackbar('Wrong Network Detected',{variant:'error'})
                 }
                 setInjectedProvider(new ethers.providers.Web3Provider(provider));
             }); */

            /*  provider.on("accountsChanged", () => {
                 console.log(`account changed!`);
                 setInjectedProvider(new ethers.providers.Web3Provider(provider));
 
             }); */

            // Subscribe to session disconnection
            /* provider.on("disconnect", (code, reason) => {
                console.log(code, reason);
                logoutOfWeb3Modal();
            }); */
        }
        else {
            /* console.log("please install metamask");
            setinstallMetamaskMsg(true); */
            enqueueSnackbar("Install Metamask", { variant: 'error' })
        }
        // eslint-disable-next-line
    }, [setInjectedProvider]);

    /*  useEffect(() => {
         if (web3Modal.cachedProvider) {
             loadWeb3Modal();
         }
     }, [loadWeb3Modal]); */



    // const showNotification = () =>{
    //     enqueueSnackbar('I love hooks',{variant:'error'});
    // }

    return (
        // <Box style={{ }}>
         <Box style={{minHeight:'100%', background: 'radial-gradient(92.09% 92.09% at 50%  7.91% , #27720D 0%, #BE3330 41.15%, #6242E6 67.19%, #000000 98.96% )',transform: 'rotate(-180deg)'}}> 
            <Box style={{ transform: 'rotate(-180deg)' }}>
                <Typography variant='h2' sx={{ textAlign: 'center',fontWeight: '800', letterSpacing: '2px' }}>RULES</Typography>
                {/* <List sx={{ mt: 5, ml: 15 }}>
                <ListItem>
                    <ListItemIcon sx={{ height: '10px', width: '10px', }}>
                        <FaCircle />
                    </ListItemIcon>
                    <ListItemText sx={{ mt: 0.7 }}>
                        Bredding can only be possible between two different type of driews.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon sx={{ height: '10px', width: '10px', }}>
                        <FaCircle />
                    </ListItemIcon>
                    <ListItemText sx={{ mt: 0.7 }}>
                        Bredding can only be possible between two different type of driews.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon sx={{ height: '10px', width: '10px', }}>
                        <FaCircle />
                    </ListItemIcon>
                    <ListItemText sx={{ mt: 0.7 }}>
                        Bredding can only be possible between two different type of driews.
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon sx={{ height: '10px', width: '10px', }}>
                        <FaCircle />
                    </ListItemIcon>
                    <ListItemText sx={{ mt: 0.7 }}>
                        Bredding can only be possible between two different type of driews.
                    </ListItemText>
                </ListItem>
            </List> */}
                <Grid container sx={{ mt: 9 }}>
                    <Grid item lg={2}>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography variant='body1' sx={{ fontWeight: '900', color: '#FCFFA3' }}>What is Breeding?</Typography>
                        <br />
                        <Typography variant='body2' sx={{ fontWeight: '400', color: '#FCFFA3' }}>2 or 3 Driews of the Gen-1 can be crossed to mint a custom Driew that has traits of the parent Driews. These are called ‘Cross Driews’.
                            <br />
                            <br />Cross Driews can be a result of :
                            <br />1 Human x 1 Robot
                            <br />1 Robot x 1 Animal
                            <br />1 Animal x 1 Human
                            <br />1 Human x 1 Robot x 1 Animal (Super Driew)
                        </Typography>
                        <br />
                        <Typography variant='body1' sx={{ fontWeight: '900', color: '#FCFFA3' }}>Rarity</Typography>
                        <br />
                        <Typography variant='body2' sx={{ fontWeight: '400', color: '#FCFFA3' }}>There are 9 Rare Driews in Gen-1.
                            <br />DH 23, 34, 45
                            <br />DR 23, 34, 45
                            <br />DA 23, 34, 45
                            <br />
                            <br />When a Rare Driew is crossed with 1 or more Driews or Rare Driews, a
                            <br />twin is born. These are the rarest cross Driews.
                        </Typography>
                    </Grid>
                    <Grid item lg={1}>
                    </Grid>
                    <Grid item lg={4}>
                        <Typography variant='body1' sx={{ fontWeight: '900', color: '#FCFFA3' }}>How many breeds per wallet ?</Typography>
                        <Typography variant='body2' sx={{ fontWeight: '400', color: '#FCFFA3' }}>Every wallet can perform ‘breed’ twice.</Typography>
                        <br />
                        <Typography variant='body1' sx={{ fontWeight: '900', color: '#FCFFA3' }}>How to know which Driews are not Breeded?</Typography>
                        <Typography variant='body2' sx={{ fontWeight: '400', color: '#FCFFA3' }}>
                            <Link href="https://docs.google.com/spreadsheets/d/1nGR1YXyXeyPQBCn0VasOo01ZXww_0rIBLbLAbype8ao/edit?usp=sharing" target="_blank" sx={{ color: '#FCFFA3' }}>Check HERE</Link>
                        </Typography>
                        <br />
                        <Typography variant='body1' sx={{ fontWeight: '900', color: '#FCFFA3' }}>Population</Typography>
                        <Typography variant='body2' sx={{ fontWeight: '400', color: '#FCFFA3' }}>Cross Driews - 30
                            <br />Super Driews - 10
                            <br />Rare Driews - 7
                        </Typography>
                        <br />
                        <Typography variant='body1' sx={{ fontWeight: '900', color: '#FCFFA3' }}>IMPORTANT</Typography>
                        <Typography variant='body2' sx={{ fontWeight: '400', color: '#FCFFA3' }}>Every Driew can only participate once in the breeding activity.</Typography>
                        <br />
                        <Typography variant='body1' sx={{ fontWeight: '900', color: '#FCFFA3' }}>Are the parent Driews burnt after breeding?</Typography>
                        <Typography variant='body2' sx={{ fontWeight: '400', color: '#FCFFA3' }}>NO</Typography>
                    </Grid>
                </Grid>

                <Box sx={{ textAlign: 'center', mt: 13 }}>
                    {/* {isLoggedIn === false ? <Button variant='contained' size='large' onClick={loadWeb3Modal} sx={{ zIndex: 1 }} >Connect</Button>
                        :
                        <Button variant='contained' size='large' onClick={logoutOfWeb3Modal} sx={{ zIndex: 1 }}>Disconnect</Button>
                    } */}

                    <Button variant='contained' onClick={loadWeb3Modal} sx={{ zIndex: 1, backgroundColor: '#FCFFA3', color: '#000', height: '79.47px', width: '238.51px', borderRadius: '28px' }} ><Typography variant='h3'>Connect</Typography></Button>
                    {/* <Button variant='contained' size='large' onClick={showNotification} sx={{ zIndex: 1 }} >Demo Notification</Button> */}
                </Box>
            </Box>
        </Box>
    );
}