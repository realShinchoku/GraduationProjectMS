import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ListItemLink from "./ListItemLink";
import { List } from "@mui/material";
import { images } from "../../assets";

function HomePage() {
    return (
        <Box className={'homepage'}>
            <Box className="inner">
                <Typography variant="h2">Trang Chủ</Typography>
                <List>
                    <ListItemLink to="/lecturer" primary="Drafts" image={images.logo}/>
                </List>
            </Box>
        </Box>
    )
}

export default observer(HomePage);