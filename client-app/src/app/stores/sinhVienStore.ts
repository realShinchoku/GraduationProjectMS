import { SinhVien } from './../models/sinhVien';
import { makeAutoObservable, runInAction } from "mobx";
import agent from "../api/agent";

export default class SinhVienStore {

    SinhVienDS : SinhVien[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    list = async () => {
        try {
            const result = await agent.SinhVienAPI.list();
            runInAction(()=>{
                result.data.forEach((SinhVien:SinhVien)=>{
                    this.SinhVienDS.push(SinhVien)
                })
            })
        }
        catch (e) {
            console.log(e);
        }
    }
}