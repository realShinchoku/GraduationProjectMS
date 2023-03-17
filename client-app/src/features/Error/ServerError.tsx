import {observer} from "mobx-react-lite";
import React from "react";

function ServerError() {
    return (
        <div>500</div>
    );
}

export default observer(ServerError);