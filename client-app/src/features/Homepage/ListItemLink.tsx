import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps
} from 'react-router-dom';

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
    itemProps,
    ref,
  ) {
    return <RouterLink ref={ref} {...itemProps} role={undefined} />;
});
  
interface ListItemLinkProps {
    icon?: React.ReactElement;
    primary: string;
    to: string;
    image: any;
  }

  
function ListItemLink(props: ListItemLinkProps) {
    const { icon, primary, to, image } = props;
  
    return (
        <ListItem>
            <ListItem button component={Link} to={to}>
            {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
            <img alt='' src={image}/>
            <ListItemText primary={primary} />
            </ListItem>
        </ListItem>
    );
};

export default ListItemLink