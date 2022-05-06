import {makeAutoObservable} from "mobx";

class MachineStore{
    constructor() {

        makeAutoObservable(this)
    }
}
export default MachineStore