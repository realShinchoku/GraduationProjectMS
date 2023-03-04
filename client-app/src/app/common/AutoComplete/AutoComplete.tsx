import {observer} from "mobx-react-lite";
import Autocomplete from "@mui/material/Autocomplete";
import {TextField} from "@mui/material";
import "./AutoComplete.scss";

type Props = {
    options: any,
    label: any,
};

function AutoComplete({options, label}: Props) {
    return (
        <Autocomplete
            className="btn_complete"
            disablePortal
            options={options}
            style={{width: 130, marginRight: 10}}
            renderInput={(params) => <TextField {...params} label={label}/>}
        />
    )
}

export default AutoComplete;