import {observer} from "mobx-react-lite";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./AccountManagement.scss"
import AccountStudentFilter from "./AccountStudentFilter";
import {useStore} from "../../../app/stores/store";
import {useEffect} from "react";
import AccountStudentListItem from "./AccountStudentListItem";


function AccountStudent() {

    const {periodStore: {loadLists, periods, periodsList, setAccountStatus, loading}} = useStore();
    useEffect(() => {
        if (periods.size <= 0) {
            setAccountStatus();
            loadLists();
        }
    }, [loadLists, periods.size, setAccountStatus]);
    
    return (
        <Box className={`account_management`}>
            <Box className="inner">
                <Box className="nav">
                    <Typography variant="h3">Tài khoản</Typography>
                    <AccountStudentFilter/>
                    {loading ? 
                        <></> 
                        :
                        <>
                            {periodsList.map(period => <AccountStudentListItem key={period.id} period={period}/>)}
                        </>
                    }
                </Box>
            </Box>
        </Box>
    )
}

export default observer(AccountStudent);