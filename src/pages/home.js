import { Box, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
// import DriewsList from '../component/driewsList';

export default function Home() {
    return (
        <Box sx={{mt:30}}>
            <Typography variant='h3' sx={{ textAlign: 'center' }}>Here we will put rules of breeding</Typography>
            <Box sx={{ textAlign: 'center' }}>
                <Link to='/driews' ><Button variant='contained' >Connect Metamsk</Button></Link>
            </Box>
        </Box>
    );
}