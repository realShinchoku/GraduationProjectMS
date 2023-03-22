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
}

export const StoreContext = createContext(store);

export function useStore() {
    return useContext(StoreContext);
}
