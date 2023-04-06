import {Box, Button, Card, CardContent, Typography,} from "@mui/material";
import React from "react";
import {Period} from "../../app/models/period";
import {route} from "../../app/router/Routers";

interface Props {
    period: Period;
}

export default function OutlineListItem({period}: Props) {
    return (
        <React.Fragment>
            <Card
                sx={{background: "#F7F9FB", borderRadius: "16px", boxShadow: "none"}}
                className="account_table_list"
            >
                <Typography variant="h6" className="name_table">
                    {period.name}
                </Typography>
                <Box className="account_list">
                    <CardContent>
                        <Typography variant="body2" color="text.secondary">
                            Số đề tài
                        </Typography>
                        <Typography className="text_bold">{period.projectsCount}</Typography>
                    </CardContent>
                    <Box>
                        <Button
                            color="inherit"
                            variant="outlined"
                            className="button_"
                            href={route.outlineDetail(period.id)}
                        >
                            Duyệt đề cương
                        </Button>

                        <Button
                            color="inherit"
                            variant="outlined"
                            className="button_"
                        >
                            Gửi đề cương
                        </Button>
                    </Box>
                </Box>
            </Card>
        </React.Fragment>
    );
}
