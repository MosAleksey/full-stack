import {makeAutoObservable} from "mobx";

class MachineStore{
    constructor() {
        this._machine_Info_Data = []
        this._type_Data = []
        this._brand_Data = []
        makeAutoObservable(this)
    }
    setMachineInfo(machine){
        this._machine_Info_Data = machine
    }
    setType(type){
        this._type_Data = type
    }
    setBrand(brand){
        this._brand_Data = brand
    }
    get machine_Info_Data(){
        return this._machine_Info_Data
    }
    get type_Data(){
        return this._type_Data
    }
    get brand_Data(){
        return this._brand_Data
    }
}
export default MachineStore