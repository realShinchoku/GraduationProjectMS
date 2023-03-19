import {Box} from "@mui/material";
import {NavLink} from "react-router-dom";
import Grid from "@mui/material/Unstable_Grid2/Grid2";

import "./SidebarItem.scss"

interface Props {
    title: string,
    to: string,
    icon: any,
}

function SidebarItem({title, to, icon}: Props) {
    return (
        <NavLink to={to} className="menu_item" style={{textDecoration: 'none'}}>
            <Box component="img" src={icon} alt="" className="icon" />
            <Box component="span" className="title">{title}</Box>
        </NavLink>
    );
}

export default SidebarItem;
