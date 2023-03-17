import {observer} from "mobx-react-lite";
import {useStore} from "../../app/stores/store";
import React from "react";

function ServerError() {
    return (
        <div>500</div>
    );
}

export default observer(ServerError);