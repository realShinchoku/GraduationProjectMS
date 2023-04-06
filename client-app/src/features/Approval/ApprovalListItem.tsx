import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { Period } from "../../app/models/period";
import { route } from "../../app/router/Routers";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { Role } from "../../app/models/user";

interface Props {
  period: Period;
}

function PeriodListItem({ period }: Props) {
  const { userStore } = useStore();
  return (
    <React.Fragment>
      <Card
        sx={{ background: "#F7F9FB", borderRadius: "16px", boxShadow: "none" }}
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
            <Typography className="text_bold">
              {period.projectsCount}
            </Typography>
          </CardContent>
          <Box>
            <Button
              color="inherit"
              variant="outlined"
              className="button_"
              href={route.projectDetail(period.id)}
            >
              Duyệt đề tài
            </Button>
          
          {userStore.getRole === Role.Lecturer && (
            <Button
              color="inherit"
              variant="outlined"
              className="button_"
              href={route.projectDetail(period.id)}
            >
              Chưa có đề tài
            </Button>
            
          )}
          </Box>
        </Box>
      </Card>
    </React.Fragment>
  );
}
export default observer(PeriodListItem);
