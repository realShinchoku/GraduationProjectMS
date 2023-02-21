import { Box } from "@mui/material";
import {observer} from "mobx-react-lite";
import { NavLink } from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import "./Menu.scss"

type Props = {
    title: any,
    to: string,
    icon: any,
};

function MenuItem({ title, to, icon }: Props) {
    return(
        <NavLink to={to} className="menu_item" style={{ textDecoration: 'none' }}>
            <Grid className="icon">{icon}</Grid>
            <Box component="span" className="title">{title}</Box>
        </NavLink>
    );
}

export default observer(MenuItem);