import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import LecturerStore from "./lecturerStore";
import DepartmentSubjectStore from "./departmentSubjectStore";
import PeriodStore from "./periodStore";
import InstructorStore from "./instructorStore";
import StudentStore from "./studentStore";
import PopupNotificationStore from "./popupNotificationStore";
import SnackBarStore from "./snackBarStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    lecturerStore: LecturerStore;
    departmentSubjectStore: DepartmentSubjectStore;
    instructorStore: InstructorStore;
    periodStore: PeriodStore;
    studentStore: StudentStore;
    popupNotificationStore: PopupNotificationStore;
    snackBarStore: SnackBarStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    lecturerStore: new LecturerStore(),
    departmentSubjectStore: new DepartmentSubjectStore(),
    instructorStore: new InstructorStore(),
    periodStore: new PeriodStore(),
    studentStore: new StudentStore(),
    popupNotificationStore: new PopupNotificationStore(),
    snackBarStore: new SnackBarStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}