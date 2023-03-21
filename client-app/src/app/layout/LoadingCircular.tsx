import {CircularProgress, Container} from "@mui/material";

interface Props {
    size?: number;
    width?: string;
    height?: string;
}

export default function LoadingCircular({size = 40, width = '100%', height = '100%'}: Props) {
    return (
        <Container sx={{width: width, height: height, display: "flex", alignItems: 'center'}}>
            <CircularProgress sx={{margin: "auto"}} size={size}/>
        </Container>
    )
}