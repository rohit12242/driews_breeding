import { Box, Typography, Button, Grid, Divider, Stack } from '@mui/material';
// import human1 from '../assets/human1.gif';
// import animal1 from '../assets/da34.webp';
// import robot1 from '../assets/human4.webp';
import './design.css';
import { useState, useEffect } from 'react';
import Web3Modal from "web3modal";
import { useHistory, useParams } from 'react-router';
import axios from 'axios';
// import { useRef } from 'react';
// import Web3 from 'web3';
import driewsAbi from '../contract/driews.json'
import erc721 from '../contract/erc721.json'
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

const rareTokenId = ['70481530999255192193428858215108995764418775728404228853434173036543984271361','70481530999255192193428858215108995764418775728404228853434173067330309849089','70481530999255192193428858215108995764418775728404228853434173091519565660161','70481530999255192193428858215108995764418775728404228853434173160788798210049','70481530999255192193428858215108995764418775728404228853434173184978054021121','70481530999255192193428858215108995764418775728404228853434173186077565648897','70481530999255192193428858215108995764418775728404228853434173103614193565697','70481530999255192193428858215108995764418775728404228853434173140997588910081','70481530999255192193428858215108995764418775728404228853434173183878542393345']
const driewsContractAddr='0x1daFd73Fc64215FfD60688EC6F623d84bFCc695F';


export default function DriewsList() {

    const [humanSelection, setHumanSelection] = useState([])
    const [animalSelection, setAnimalSelection] = useState([])
    const [robotSelection, setRobotSelection] = useState([])
    const [breedBtnActive, setbreedBtnActive] = useState(false)
    const [dataLoaded, setdataLoaded] = useState(false)
    // const [driewList, setdriewList] = useState()
    const [humans, sethumans] = useState([])
    const [animals, setanimals] = useState([])
    const [robots, setrobots] = useState([])
    const { enqueueSnackbar } = useSnackbar();
    const [selectedHuman, setselectedHuman] = useState([])
    const [selectedAnimal, setselectedAnimal] = useState([])
    const [selectedRobot, setselectedRobot] = useState([])
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
            // opensea retriveing asset api
            //mainnet
            const result = await axios.get(`https://api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=0x495f947276749Ce646f68AC8c248420045cb7b5e&order_direction=desc&offset=0&limit=20`);
            //rinkbey testnet
            // const result = await axios.get(`https://rinkeby-api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=0x88b48f654c30e99bc2e4a1559b4dcf1ad93fa656&order_direction=desc&offset=0&limit=20`);
            // console.log("value of http request :::", result.data);
            const data = result.data.assets;
            const nftCount = data.length;
            let driews = [];
            let humanList = [];
            let animalList = [];
            let robotList = [];
            for (let i = 0; i < nftCount; i++) {
                //Collection name
                if (data[i].collection.name === 'Driews') {
                //test
                // if (data[i].collection.name === 'Testing Driews') {
                    // console.log("value of token id:::", data[i].token_id);
                    let temp = {};
                    temp.tokenId = data[i].token_id
                    temp.imgUrl = data[i].image_url
                    temp.name = data[i].name
                    temp.type = data[i].traits[0].value
                    temp.breedingStatus = await breedingStatus(data[i].token_id)
                    driews.push(temp);
                    //seggrating based on trait
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
            // console.log("list of driews own by address:::", driews);
            sethumans(humanList);
            setanimals(animalList);
            setrobots(robotList);
        }
        getNfts();
    }, [dataLoaded,address])
    const tokenSelection = (i, type, value) => {
        if (type === 'Human') {
            if (humanSelection[i] === true) {
                let temp = humanSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                let humanSelectionTemp = selectedHuman;
                humanSelectionTemp.pop()
                setselectedHuman([...humanSelectionTemp]);
                setHumanSelection([...temp])
            }
            else {
                let temp = humanSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                let selectionTemp = selectedHuman;
                selectionTemp.pop();
                selectionTemp.push(value)
                setselectedHuman([...selectionTemp])
                setHumanSelection([...temp])
            }

        }
        if (type === 'Animal') {
            console.log("value of i:::", i);
            console.log("value of selected token ::::", value);

            if (animalSelection[i] === true) {
                let temp = animalSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                let animalSelectionTemp = selectedAnimal;
                animalSelectionTemp.pop()
                setselectedAnimal([...animalSelectionTemp]);
                setAnimalSelection([...temp])

            }
            else {
                let temp = animalSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                let selectionTemp = selectedAnimal;
                selectionTemp.pop();
                selectionTemp.push(value)
                setselectedAnimal([...selectionTemp])
                // console.log("value of selected animal:::",selectedAnimal);
                setAnimalSelection([...temp])

            }

        }
        if (type === 'Robot') {
            if (robotSelection[i] === true) {
                let temp = robotSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                let robotSelectionTemp = selectedRobot;
                robotSelectionTemp.pop()
                setselectedRobot([...robotSelectionTemp]);
                setRobotSelection([...temp])
            }
            else {
                let temp = robotSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                let selectionTemp = selectedRobot;
                selectionTemp.pop();
                selectionTemp.push(value)
                setselectedRobot([...selectionTemp])
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

        // console.log("value of selected animal:::",selectedAnimal);
        // console.log("length of animal selection:::",selectedAnimal.length);
        // console.log("value of animal selection:::",selectedAnimal);
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
        // alert("breeding happen with this action")
        if (selectedHuman.length === 1 && selectedAnimal.length === 1 && selectedRobot.length === 1) {
            console.log("super breeding call");
            superBreeding();
        }
        else {
            console.log("cross breeding call");
            crossBreeding();
        }
    }

    const formatter = (addressTemp) => {
        const length = addressTemp.length;
        return `${addressTemp[0]}${addressTemp[1]}${addressTemp[2]}${addressTemp[3]}${addressTemp[4]}${addressTemp[5]}${addressTemp[6]}...........${addressTemp[length - 7]}${addressTemp[length - 6]}${addressTemp[length - 5]}${addressTemp[length - 4]}${addressTemp[length - 3]}${addressTemp[length - 2]}${addressTemp[length - 1]}`
    }

    const breedingStatus = async (tokenId) => {
        await window.web3.currentProvider.enable();
        const web3 = new Web3(window.web3.currentProvider);
        const driewsContract = new web3.eth.Contract(driewsAbi, driewsContractAddr)
        const result = await driewsContract.methods.breedingStatusOfDriews(tokenId).call();
        return result;
    }


    const superBreeding = async () => {
        // console.log("value of address:::",address);
        await window.web3.currentProvider.enable();
        const web3 = new Web3(window.web3.currentProvider);
        const driewsContract = new web3.eth.Contract(driewsAbi, driewsContractAddr)
        try {
            const human = selectedHuman[0];
            const animal = selectedAnimal[0];
            const robot = selectedRobot[0];
            enqueueSnackbar("Txn is in process", { variant: 'info' })
            const result = await driewsContract.methods.superBreeding(human.tokenId, animal.tokenId, robot.tokenId).send({ from: address })
            if(rareTokenId.includes(human.tokenId) || rareTokenId.includes(animal.tokenId) || rareTokenId.includes(robot.tokenId)){
                updateMetaData("super", 'RARE')
            }
            else{
                updateMetaData("super", 'AHR')
            }
            
            console.log("result of transaction:::", result);

            enqueueSnackbar("Transaction Succeed", { variant: 'success' })
            setdataLoaded(!dataLoaded);
            setbreedBtnActive(!breedBtnActive)
        }
        catch (error) {
            enqueueSnackbar("Transaction failed", { variant: 'error' })

            console.log("value of error::", error);
        }
        setHumanSelection([])
        setAnimalSelection([])
        setRobotSelection([])
        setselectedAnimal([])
        setselectedHuman([])
        setselectedRobot([])
        // console.log("estimated gas :::" ,await driewsContract.methods.crossBreeding(200,300).estimateGas());
    }

    const crossBreeding = async () => {
        // console.log("value of address:::",address);
        await window.web3.currentProvider.enable();
        const web3 = new Web3(window.web3.currentProvider);
        const driewsContract = new web3.eth.Contract(driewsAbi, driewsContractAddr)
        // console.log("value of selected human:::", selectedHuman);
        // console.log("value of selected animal:::", selectedAnimal);
        // console.log("value of selected robot:::", selectedRobot);
        try {
            let firstToken;
            let secondToken;
            let type;
            if (selectedHuman.length === 0) {
                firstToken = selectedAnimal[0].tokenId;
                secondToken = selectedRobot[0].tokenId;
                type = 'AR'
            }
            if (selectedAnimal.length === 0) {
                firstToken = selectedHuman[0].tokenId;
                secondToken = selectedRobot[0].tokenId;
                type = 'HR'
            }
            if (selectedRobot.length === 0) {
                firstToken = selectedHuman[0].tokenId;
                secondToken = selectedAnimal[0].tokenId
                type = 'AH'
            }

            if(rareTokenId.includes(firstToken)|| rareTokenId.includes(secondToken)){
                type = 'RARE'
            }

            enqueueSnackbar("Txn is in process", { variant: 'info' })
            // console.log("value of firstToken::", firstToken);
            // console.log("value of secondToken::", secondToken);
            // console.log("value of address::", address);
            const result = await driewsContract.methods.crossBreeding(firstToken, secondToken).send({ from: address })
            console.log("value of reuslt",result);
            updateMetaData("test", type)
            // console.log("result of transaction:::", result);
            enqueueSnackbar("Transaction Succeed", { variant: 'success' })
            setdataLoaded(!dataLoaded);
            setbreedBtnActive(!breedBtnActive)

        }
        catch (error) {
            enqueueSnackbar("Transaction failed", { variant: 'error' })

            // console.log("value of error::", error);
        }
        setHumanSelection([])
        setAnimalSelection([])
        setRobotSelection([])
        setselectedAnimal([])
        setselectedHuman([])
        setselectedRobot([])
        // console.log("estimated gas :::" ,await driewsContract.methods.crossBreeding(200,300).estimateGas());
    }

    const updateMetaData = async (name, type) => {
        let data = {}
        if (type === 'AH') {
            data = {
                "attributes": [

                ],
                "description": "Breeded Driews",
                "external_url": "https://example.com/?token_id=1",
                "image": "https://driewsimage.blob.core.windows.net/driewsnft/AH.jpg",
                "name": "AH",
                "animationFlag":false
            }
        }
        if (type === 'HR') {
            data = {
                "attributes": [

                ],
                "description": "Breeded Driews",
                "external_url": "https://example.com/?token_id=1",
                "image": "https://driewsimage.blob.core.windows.net/driewsnft/HR.jpg",
                "name": "HR",
                "animationFlag":false
            }
        }
        if (type === 'AR') {
            data = {
                "attributes": [

                ],
                "description": "Breeded Driews",
                "external_url": "https://example.com/?token_id=1",
                "image": "https://driewsimage.blob.core.windows.net/driewsnft/RA.jpg",
                "name": "AR",
                "animationFlag":false
            }
        }
        if (type === 'AHR') {
            data = {
                "attributes": [

                ],
                "description": "Breeded Driews",
                "external_url": "https://example.com/?token_id=1",
                "image": "https://driewsimage.blob.core.windows.net/driewsnft/HRA.jpg",
                "name": "AHR",
                "animationFlag":false
            }
        }
        if (type === 'RARE') {
            data = {
                "attributes": [

                ],
                "description": "Breeded Driews",
                "external_url": "https://example.com/?token_id=1",
                "image": "https://driewsimage.blob.core.windows.net/driewsnft/Rare_final.jpg",
                "name": "RARE",
                "animationFlag":false
            }
        }

        if(type==='MINT'){
            data = {
                "attributes": [

                ],
                "description": "Minted outside breeding",
                "external_url": "https://example.com/?token_id=1",
                "image": "https://driewsrestapi.azurewebsites.net/animation",
                "name": "Minted",
                "animationFlag": true
            }
        }
        await window.web3.currentProvider.enable();
        const web3 = new Web3(window.web3.currentProvider);
        const erc721Contract = new web3.eth.Contract(erc721, driewsContractAddr)
        const totalSupply = await erc721Contract.methods.totalSupply().call();
        try {
            //my azure
            // const result = await axios.post(`https://restapidriews.azurewebsites.net/api/metadata/${totalSupply-1}`, data);
            //vinay azure
            const result = await axios.post(`https://driewsrestapi.azurewebsites.net/api/metadata/${totalSupply-1}`, data);
            console.log("result value::",result);
            // const result = await axios.post(`http://localhost:4000/api/metadata/${totalSupply-1}`, data);
            // console.log("value of response::", result.data);
            return true;
        }
        catch {
            return false;
        }

    }

    //direct minting for nft
    const mint = async () => {
        // console.log("value of address:::",address);
        await window.web3.currentProvider.enable();
        const web3 = new Web3(window.web3.currentProvider);
        const driewsContract = new web3.eth.Contract(driewsAbi, driewsContractAddr)
        try {
            enqueueSnackbar("Txn is in process", { variant: 'info' })
            const result = await driewsContract.methods.mintDriews().send({ from: address })
            updateMetaData('mint','MINT')
            
            console.log("result of transaction:::", result);

            enqueueSnackbar("Transaction Succeed", { variant: 'success' })
        }
        catch (error) {
            enqueueSnackbar("Transaction failed", { variant: 'error' })

            console.log("value of error::", error);
        }
    }


    return (
        <Box >
            <Stack direction='row' sx={{ mt: 4 }} spacing={32}>
                <Box sx={{ flexGrow: '0.78' }}></Box>
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
                                {humans.map((human, k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            {human.breedingStatus === false ?
                                                <img onClick={() => tokenSelection(k, 'Human', human)} src={human.imgUrl} alt='human' style={humanSelection[k] === undefined ? beforeStyle : humanSelection[k] === false ? beforeStyle : afterStyle} />
                                                :
                                                <img src={human.imgUrl} alt='human' style={{
                                                    height: '80%', width: '40%', marginLeft: 'auto', marginRight: 'auto', opacity: '0.2'
                                                }} />
                                            }

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
                                {animals.map((animal, k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            {animal.breedingStatus === false ?
                                                <img onClick={() => tokenSelection(k, 'Animal', animal)} src={animal.imgUrl} alt='animal' style={animalSelection[k] === undefined ? beforeStyle : animalSelection[k] === false ? beforeStyle : afterStyle} />
                                                :
                                                <img src={animal.imgUrl} alt='animal' style={{
                                                    height: '80%', width: '40%', marginLeft: 'auto', marginRight: 'auto', opacity: '0.2'
                                                }} />
                                            }
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
                                {robots.map((robot, k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            {robot.breedingStatus === false ?
                                                <img onClick={() => tokenSelection(k, 'Robot', robot)} src={robot.imgUrl} alt='robot' style={robotSelection[k] === undefined ? beforeStyle : robotSelection[k] === false ? beforeStyle : afterStyle} />
                                                :
                                                <img src={robot.imgUrl} alt='robot' style={{
                                                    height: '80%', width: '40%', marginLeft: 'auto', marginRight: 'auto', opacity: '0.2'
                                                }} />
                                            }
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
                    <Button variant='outlined'  size='large' color='warning' onClick={() => breeding()} >Breed</Button> :
                    <Button variant='outlined' size='large' color='warning' disabled>Breed</Button>
                }

            </Box>
            <Button sx={{marginLeft:'45%',marginTop:'10px'}} variant='outlined' size='large' color='warning' onClick={mint}>OwnerMint</Button>
        </Box>
    );
}