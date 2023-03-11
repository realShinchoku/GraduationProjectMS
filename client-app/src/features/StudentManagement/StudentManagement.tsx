import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./StudentManagement.scss"
import StudentTableList from "./StudentTableList";


function StudentManagement() {

    return (
        <Box className={`account_management`}>
          <Box className="inner">
              <Box className="nav">
                <Typography variant="h3">Quản Lý Sinh Viên</Typography>
                <Box className="btn">
                </Box>
                <Box>
                  <StudentTableList/>
                </Box>
              </Box>
          </Box>
        </Box>
    )
}

export default observer(StudentManagement);
