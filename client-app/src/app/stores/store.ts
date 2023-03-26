import {createContext, useContext} from "react";
import CommonStore from "./commonStore";
import UserStore from "./userStore";
import ModalStore from "./modalStore";
import LecturerStore from "./lecturerStore";
import PeriodStore from "./periodStore";
import InstructorStore from "./instructorStore";
import StudentStore from "./studentStore";
import PopupNotificationStore from "./popupNotificationStore";
import SnackBarStore from "./snackBarStore";
import FilterItemsStore from "./filterItemsStore";
import DepartmentSubjectStore from "./departmentSubjectStore";

interface Store {
    commonStore: CommonStore;
    userStore: UserStore;
    modalStore: ModalStore;
    lecturerStore: LecturerStore;
    filterItemsStore: FilterItemsStore;
    instructorStore: InstructorStore;
    periodStore: PeriodStore;
    studentStore: StudentStore;
    popupNotificationStore: PopupNotificationStore;
    snackBarStore: SnackBarStore;
    departmentSubjectStore: DepartmentSubjectStore;
}

export const store: Store = {
    commonStore: new CommonStore(),
    userStore: new UserStore(),
    modalStore: new ModalStore(),
    lecturerStore: new LecturerStore(),
    filterItemsStore: new FilterItemsStore(),
    instructorStore: new InstructorStore(),
    periodStore: new PeriodStore(),
    studentStore: new StudentStore(),
    popupNotificationStore: new PopupNotificationStore(),
    snackBarStore: new SnackBarStore(),
    departmentSubjectStore: new DepartmentSubjectStore(),
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
