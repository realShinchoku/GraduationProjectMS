import {CircularProgress, Container} from "@mui/material";

interface Props {
    size?: number;
}
export default function LoadingCircular({size = 40}:Props) {
    return(
        <Container sx={{width: "100vw", height: "100vh", display: "flex"}} >
            <CircularProgress sx={{margin: "auto"}} size={size} />
        </Container>
    )
}