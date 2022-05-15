import {makeAutoObservable} from "mobx";

class MachineStore{
    constructor() {
        this._machine_Info_Data = []
        this._type_Data = []
        this._brand_Data = []
        this._store_data = []
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
    setStore(store){
        this._store_data = store
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
    get store_Data(){
        return this._store_data
    }
}
export default MachineStore