import { observer } from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { IconButton, TextField } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import Autocomplete from '@mui/material/Autocomplete';
import AccountTableList from "./AccountTableList";
import "./AccountManagement.scss"



const complete1 = [
  { label: 'Tiếp nhận'},
  { label: 'Chờ Duyệt' },
  { label: 'Từ Chối'},
];
const complete2 = [
  { label: 'Tiếp nhận'},
  { label: 'Chờ Duyệt' },
  { label: 'Từ Chối'},
];

function AccountManagement() {

    return (
        <Box className={`account_management`}>
          <Box className="inner">
              <Box className="nav">
                <Typography variant="h3">Tài khoản</Typography>
                <Box className="btn">
                  <Box className="btn_item">
                    <Autocomplete
                      className="btn_complete"
                      disablePortal
                      id="combo-box-demo"
                      options={complete1}
                      style={{ width: 130, marginRight: 10 }}
                      renderInput={(params) => <TextField {...params} label="Khoá" />}
                    />
                    <Autocomplete
                      className="btn_complete"
                      disablePortal
                      id="combo-box-demo"
                      options={complete2}
                      style={{ width: 130, marginRight: 10 }}
                      renderInput={(params) => <TextField {...params} label="Khoa" />}
                    />
                  </Box>
                  <Box className="search">
                    <TextField
                      className="search_"
                      fullWidth
                      id="standard-bare"
                      variant="outlined"
                      placeholder="Tìm đợt đồ án..."
                      InputProps={{
                        startAdornment: (
                          <IconButton>
                            <SearchOutlined/>
                          </IconButton>
                        ),
                      }}
                    />
                  </Box>
                </Box>
                <Box>
                  <AccountTableList/>
                </Box>
              </Box>
          </Box>
        </Box>
    )
}

export default observer(AccountManagement);