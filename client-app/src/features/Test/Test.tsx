import {observer} from "mobx-react-lite";
import TestApi from "./Api/TestApi";
import {useStore} from "../../app/stores/store";
import {Button} from "@mui/material";
import { SinhVien } from "../../app/models/sinhVien";
import { useEffect } from "react";

function Test() {
    const {modalStore ,SinhVienStore:{ SinhVienDS, list }} = useStore();

    useEffect(() => {
        list()
    },[list]);

    return (
        <>
            <div>
                {
                    SinhVienDS.map((sinhVien : SinhVien) =>
                    <div>
                        {sinhVien.displayName}
                    </div>)
                }
            </div>
            <Button onClick={() => {
                modalStore.openModal(<div>modal here</div>)
            }}> 
            open modal
            </Button>
            <TestApi/>
        </>
    )
}

export default observer(Test)