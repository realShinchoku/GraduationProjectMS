import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

interface Props {
    title: any,
    to: string,
    icon: any,
}

function LinkSidebar({title, to, icon}: Props) {
    return (
        <NavLink to={to} className="tab_" style={{textDecoration: 'none'}}>
            <Grid className="icon">{icon}</Grid>
            <Box component="span" className="title">{title}</Box>
        </NavLink>
    );
}

export default LinkSidebar;