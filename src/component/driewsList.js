import { Box, Typography, Button, Grid, Divider, Stack, Popover } from '@mui/material';
// import human1 from '../assets/human1.gif';
import animal1 from '../assets/da34.webp';
// import robot1 from '../assets/human4.webp';
import './design.css';
import { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
// import { useRef } from 'react';
// import Web3 from 'web3';
import driewsAbi from '../contract/driews.json'
import Web3 from 'web3';
import { useSnackbar } from 'notistack';

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



export default function DriewsList() {

    const [humanSelection, setHumanSelection] = useState([])
    const [animalSelection, setAnimalSelection] = useState([])
    const [robotSelection, setRobotSelection] = useState([])
    const [breedBtnActive, setbreedBtnActive] = useState(false)
    const [dataLoaded, setdataLoaded] = useState(false)
    const [driewList, setdriewList] = useState()
    const [humans, sethumans] = useState([])
    const [animals, setanimals] = useState([])
    const [robots, setrobots] = useState([])
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    // const [provider, setprovider] = useState()
    // const [anchorEl, setAnchorEl] = useState(null)
    // const [constructorHasRun, setConstructorHasRun] = useState(false)
    let history = useHistory();

    let { address } = useParams();
    /* const Constructor = () => {
        if (constructorHasRun) return;
        console.log("value of address:::",address);
        if (address === undefined || address === null) {
            routeToHome()
        }
        setConstructorHasRun(true);
    }

    Constructor(); 


    // const handleClick = (event) => {
    //     setAnchorEl(event.currentTarget)
    // }
    // const handleClose = () => {
    //     setAnchorEl(null);
    // }

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
*/


    useEffect(() => {
        const getNfts = async () => {
            const result = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=0x495f947276749Ce646f68AC8c248420045cb7b5e&order_direction=desc&offset=0&limit=20`);
            // console.log("value of http request :::", result.data);
            const data = result.data.assets;
            const nftCount = data.length;
            let driews = [];
            let humanList = [];
            let animalList = [];
            let robotList = [];
            for (let i = 0; i < nftCount; i++) {
                if (data[i].collection.name === 'Driews') {
                    // console.log("value of token id:::", data[i].token_id);
                    let temp = {};
                    temp.tokenId = data[i].token_id
                    temp.imgUrl = data[i].image_url
                    temp.name = data[i].name
                    temp.type = data[i].traits[0].value
                    driews.push(temp);
                    if (data[i].traits[0].value === 'Robot') {
                        robotList.push(temp);
                    }
                    if (data[i].traits[0].value === 'Animal') {
                        animalList.push(temp);
                    }
                    if (data[i].traits[0].value === 'Human') {
                        humanList.push(temp);
                    }
                }
            }
            console.log("list of driews own by address:::", driews);
            sethumans(humanList);
            setanimals(animalList);
            setrobots(robotList);
        }
        getNfts();
    }, [dataLoaded])
    const tokenSelection = (i, type,value) => {
        if (type === 'Human') {
            if (humanSelection[i] === true) {
                let temp = humanSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                setHumanSelection([...temp])
            }
            else {
                let temp = humanSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                setHumanSelection([...temp])
            }

        }
        if (type === 'Animal') {
            console.log("value of i:::",i);
            console.log("value of selected token ::::",value);
            if (animalSelection[i] === true) {
                let temp = animalSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                setAnimalSelection([...temp])
            }
            else {
                let temp = animalSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                setAnimalSelection([...temp])
            }

        }
        if (type === 'Robot') {
            if (robotSelection[i] === true) {
                let temp = robotSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                setRobotSelection([...temp])
            }
            else {
                let temp = robotSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                setRobotSelection([...temp])
            }

        }
        checkBreeding();

    }

    const logoutOfWeb3Modal = async () => {
        await web3Modal.clearCachedProvider();
        // setTimeout(() => {
        //     window.location.reload();
        // }, 1);
        routeToHome();
    };

    const routeToHome = () => {
        history.push(`/`)
    }

    const beforeStyle = {
        height: '80%', width: '40%', marginLeft: 'auto', marginRight: 'auto'
    }

    const afterStyle = {
        height: '80%', width: '40%', marginLeft: 'auto', marginRight: 'auto',
        border: '5px solid yellow'
    }

    const checkBreeding = () => {
        const humanSelected = humanSelection.includes(true);
        const animalSelected = animalSelection.includes(true);
        const robotSelected = robotSelection.includes(true);
        if (humanSelected && animalSelected && robotSelected === true) {
            // alert('super breeding case')
            setbreedBtnActive(true);
        }
        else if ((humanSelected && animalSelected === true) || (animalSelected && robotSelected === true) || (humanSelected && robotSelected === true)) {
            // alert('cross breeding case')
            setbreedBtnActive(true);
        }
        else {
            // alert('not ready for breeding')
            setbreedBtnActive(false);
        }
    }

    const breeding = () => {
        alert("breeding happen with this action")
    }

    const formatter = (addressTemp) => {
        const length = addressTemp.length;
        return `${addressTemp[0]}${addressTemp[1]}${addressTemp[2]}${addressTemp[3]}${addressTemp[4]}${addressTemp[5]}${addressTemp[6]}...........${addressTemp[length - 7]}${addressTemp[length - 6]}${addressTemp[length - 5]}${addressTemp[length - 4]}${addressTemp[length - 3]}${addressTemp[length - 2]}${addressTemp[length - 1]}`
    }


    const contractCallTest = async() =>{
        // console.log("value of address:::",address);
        await window.web3.currentProvider.enable();
        const web3 = new Web3( window.web3.currentProvider);
        const driewsContract = new web3.eth.Contract(driewsAbi,"0x0569E5A2B51dEff645CC35f52125dcddeB4894D3")
        try{
            enqueueSnackbar("Txn is in process",{variant:'info'})
            const result = await driewsContract.methods.crossBreeding(200,300).send({from:address})
           
            console.log("result of transaction:::",result);
        }
        catch(error){
            enqueueSnackbar("Transaction failed",{variant:'error'})

            console.log("value of error::",error);
        }
        // console.log("estimated gas :::" ,await driewsContract.methods.crossBreeding(200,300).estimateGas());
    }

    const crossBreeding = async() =>{

    }


    return (
        <Box >
            <Stack direction='row' sx={{ mt: 4 }} spacing={32}>
                <Box sx={{ flexGrow: '0.9' }}></Box>
                <Typography variant='h3' >Your Driews Collection</Typography>
                <Box>
                    {/* <Button aria-describedby={id} variant='outlined' color='warning' onClick={handleClick}>0xD5Cd7dC0.........2bF39B5d</Button> */}
                    <Button variant='outlined' color='warning' onClick={logoutOfWeb3Modal}>{formatter(address)}</Button>
                    {/* <Button variant='contained' onClick={logoutOfWeb3Modal} sx={{}}>disconnect</Button> */}
                    {/* <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <Typography sx={{ p: 2,'MuiTypography-root':{color:'red'} }}>The content of the Popover.</Typography>
                    </Popover> */}
                </Box>
            </Stack>
            <Grid container sx={{ mt: 7 }} >
                {/* Human area */}
                <Grid item lg={4} sx={{ pl: 0 }}>

                    <Stack direction='row' spacing={2}>
                        <Box >
                            <Typography variant='h5' sx={{ textAlign: 'center' }}>Human</Typography>
                            <Box sx={{ overflow: 'scroll', height: '500px', width: '500px' }}>
                                {humans.map((human,k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            <img onClick={() => tokenSelection(k, 'Human')} src={human.imgUrl} alt='human' style={humanSelection[k] === undefined ? beforeStyle : humanSelection[k] === false ? beforeStyle : afterStyle} />
                                            <Typography sx={{ textAlign: 'center', mt: 1 }}>{human.name}</Typography>
                                            <Divider sx={{ ml: 18, mr: 18, mt: 2 }}></Divider>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                        <Divider orientation='vertical' sx={{ height: '550px' }}></Divider>
                    </Stack>

                </Grid>
                {/* Animal area */}
                <Grid item lg={4} sx={{ pl: 0 }}>
                    <Stack direction='row' spacing={2}>
                        <Box>
                            <Typography variant='h5' sx={{ textAlign: 'center' }}>Animal</Typography>
                            <Box sx={{ overflow: 'scroll', height: '500px', width: '500px' }}>
                                {animals.map((animal,k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            <img onClick={() => tokenSelection(k, 'Animal',animal)} src={animal.imgUrl} alt='animal' style={animalSelection[k] === undefined ? beforeStyle : animalSelection[k] === false ? beforeStyle : afterStyle} />
                                            <Typography sx={{ textAlign: 'center', mt: 1 }}>{animal.name}</Typography>
                                            <Divider sx={{ ml: 18, mr: 18, mt: 2 }}></Divider>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                        <Divider orientation='vertical' sx={{ height: '550px' }}></Divider>
                    </Stack>
                </Grid>
                {/* Robot Area */}
                <Grid item lg={4} sx={{ pl: 0 }}>
                    <Stack direction='row' spacing={2}>
                        <Box>
                            <Typography variant='h5' sx={{ textAlign: 'center' }}>Robot</Typography>
                            <Box sx={{ overflow: 'scroll', height: '500px', width: '500px' }}>
                                {robots.map((robot,k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            <img onClick={() => tokenSelection(k, 'Robot')} src={robot.imgUrl} alt='robot' style={robotSelection[k] === undefined ? beforeStyle : robotSelection[k] === false ? beforeStyle : afterStyle} />
                                            <Typography sx={{ textAlign: 'center', mt: 1 }}>{robot.name}</Typography>
                                            <Divider sx={{ ml: 18, mr: 18, mt: 2 }}></Divider>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                    </Stack>

                </Grid>
            </Grid>
            <Box sx={{ mt: 8, textAlign: 'center' }}>
                {breedBtnActive === true ?
                    <Button variant='contained' onClick={() => breeding()} >Breed</Button> :
                    <Button variant='contained' disabled>Breed</Button>
                }

            </Box>
                <Button variant='contained' onClick={contractCallTest}>testing</Button>
        </Box>
    );
}