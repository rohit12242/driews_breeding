import { Box, Typography, Button, Grid, Divider, Stack } from '@mui/material';
// import human1 from '../assets/human1.gif';
import animal1 from '../assets/da34.webp';
// import robot1 from '../assets/human4.webp';
import './design.css';
import { useState } from 'react';

export default function DriewsList() {

    const [humanSelection, setHumanSelection] = useState([])
    const [animalSelection, setAnimalSelection] = useState([])
    const [robotSelection, setRobotSelection] = useState([])
    const [breedBtnActive, setbreedBtnActive] = useState(false)

    const tokenSelection = (i, type) => {
        if (type === 'Human') {
            if(humanSelection[i] === true){
                let temp = humanSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                setHumanSelection([...temp])
            }
            else{
                let temp = humanSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                setHumanSelection([...temp])
            }
            
        }
        if (type === 'Animal') {
            if(animalSelection[i]===true){
                let temp = animalSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                setAnimalSelection([...temp])
            }
            else{
                let temp = animalSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                temp[i] = true;
                setAnimalSelection([...temp])
            }
            
        }
        if (type === 'Robot') {
            if(robotSelection[i]===true){
                let temp = robotSelection;
                for (let j = 0; j < temp.length; j++) {
                    temp[j] = false;
                }
                setRobotSelection([...temp])
            }
            else{
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

    const beforeStyle = {
        height: '80%', width: '40%', marginLeft: 'auto', marginRight: 'auto'
    }

    const afterStyle = {
        height: '80%', width: '40%', marginLeft: 'auto', marginRight: 'auto',
        border: '1px solid red'
    }

    const checkBreeding = () =>{
        const humanSelected = humanSelection.includes(true);
        const animalSelected = animalSelection.includes(true);
        const robotSelected = robotSelection.includes(true);
        if(humanSelected && animalSelected && robotSelected === true){
            // alert('super breeding case')
            setbreedBtnActive(true);
        }
        else if( (humanSelected && animalSelected===true ) || (animalSelected && robotSelected === true) || (humanSelected && robotSelected === true)){
            // alert('cross breeding case')
            setbreedBtnActive(true);
        }
        else{
            // alert('not ready for breeding')
            setbreedBtnActive(false);
        }
    }

    const breeding = () => {
        alert("breeding happen with this action")
    }


    return (
        <Box >
            <Typography variant='h3' sx={{ textAlign: 'center', mt: 4 }}>Your Driews Collection</Typography>
            <Grid container sx={{ mt: 7 }} >
                {/* Human area */}
                <Grid item lg={4} sx={{ pl: 0 }}>

                    <Stack direction='row' spacing={2}>
                        <Box >
                            <Typography variant='h5' sx={{ textAlign: 'center' }}>Human</Typography>
                            <Box sx={{ overflow: 'scroll', height: '500px', width: '500px' }}>
                                {[0, 1, 2, 3, 4].map((k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            <img onClick={() => tokenSelection(k, 'Human')} src={animal1} alt='human1' style={humanSelection[k] === undefined ? beforeStyle : humanSelection[k] === false ? beforeStyle : afterStyle} />
                                            <Typography sx={{ textAlign: 'center', mt: 1 }}>Human{k+1}</Typography>
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
                                {[0, 1, 2, 3, 4].map((k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            <img onClick={() => tokenSelection(k, 'Animal')} src={animal1} alt='human1' style={animalSelection[k] === undefined ? beforeStyle : animalSelection[k] === false ? beforeStyle : afterStyle} />
                                            <Typography sx={{ textAlign: 'center', mt: 1 }}>Animal{k+1}</Typography>
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
                                {[0, 1, 2, 3, 4].map((k) => {
                                    return (
                                        <Box sx={{ mt: 3 }}>
                                            <img onClick={() => tokenSelection(k, 'Robot')} src={animal1} alt='human1' style={robotSelection[k] === undefined ? beforeStyle : robotSelection[k] === false ? beforeStyle : afterStyle} />
                                            <Typography sx={{ textAlign: 'center', mt: 1 }}>Robot{k+1}</Typography>
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
                {breedBtnActive===true?
                <Button variant='contained' onClick={()=> breeding()} >Breed</Button>:
                <Button variant='contained' disabled>Breed</Button>    
            }
                
            </Box>
        </Box>
    );
}