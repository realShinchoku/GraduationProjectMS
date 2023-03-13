import { Box, Button, Card, CardContent,  Collapse,  Divider, Grid, Typography} from "@mui/material";
import React from "react";

type Props = {
    value: boolean,
};

export default function GraduationAdd({value}: Props) {
  return (
   <Box>
    <Collapse in={value} timeout="auto" unmountOnExit>
        abc 
    </Collapse> 
        
   </Box>
  );
}