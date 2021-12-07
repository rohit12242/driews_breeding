import { Box, Typography, Button, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
// import { Link } from 'react-router-dom';
// import DriewsList from '../component/driewsList';
import { FaCircle } from "react-icons/fa";
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


    const routeToDriews = (address) =>{
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
            console.log("value of injected provider::",injectedProvider);
            // setisLoggedIn(true);

            const web3 = new Web3(provider)
            const accounts = await web3.eth.getAccounts();
            // setloggedInAccount(accounts[0])

            const networkId = await web3.eth.net.getId();
            console.log("value of networkId::", networkId);
            
            if (networkId === 4) {
                // setchainCorrect(false);
                // setaccountConnectedMsg(false)
                routeToDriews(accounts[0]);
            }
            else {
                // setchainCorrect(true)
                // setaccountConnectedMsg(false)
                enqueueSnackbar('Wrong Network Detected',{variant:'error'})
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
            enqueueSnackbar("Install Metamask",{variant:'error'})
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
        <Box >
            <Typography variant='h2' sx={{ textAlign: 'center' }}>Rules</Typography>
            <List sx={{ mt: 5, ml: 15 }}>
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
            </List>

            <Box sx={{ textAlign: 'center', mt: 8 }}>
                {/* {isLoggedIn === false ? <Button variant='contained' size='large' onClick={loadWeb3Modal} sx={{ zIndex: 1 }} >Connect</Button>
                        :
                        <Button variant='contained' size='large' onClick={logoutOfWeb3Modal} sx={{ zIndex: 1 }}>Disconnect</Button>
                    } */}

                <Button variant='contained' size='large' onClick={loadWeb3Modal} sx={{ zIndex: 1 }} >Connect</Button>
                {/* <Button variant='contained' size='large' onClick={showNotification} sx={{ zIndex: 1 }} >Demo Notification</Button> */}
            </Box>
        </Box>
    );
}