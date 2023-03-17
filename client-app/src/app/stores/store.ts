import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import LecturerStore from "./lecturerStore";
import DepartmentSubjectStore from "./departmentSubjectStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    lecturerStore: LecturerStore;
    departmentSubjectStore: DepartmentSubjectStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    lecturerStore: new LecturerStore(),
    departmentSubjectStore: new DepartmentSubjectStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
