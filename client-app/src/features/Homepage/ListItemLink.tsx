import * as React from 'react';
import {observer} from 'mobx-react-lite';
import ListItem from '@mui/material/ListItem';
import {Link as RouterLink, LinkProps as RouterLinkProps} from 'react-router-dom';
import {Box, Typography} from '@mui/material';

const Link = React.forwardRef<HTMLAnchorElement, RouterLinkProps>(function Link(
    itemProps,
    ref,
) {
    return <RouterLink ref={ref} {...itemProps} role={undefined}/>;
});

interface ListItemLinkProps {
    name: string;
    title: string;
    to: string;
    image: any;
}

function ListItemLink(props: ListItemLinkProps) {
    const {title, to, image, name} = props;
    return (
        <ListItem className={name} component={Link} to={to}>
            <Box className="thumb">
                <img alt='' src={image}/>
            </Box>
            <Typography variant='h4'>{title}</Typography>
        </ListItem>
    );
}

export default observer(ListItemLink)