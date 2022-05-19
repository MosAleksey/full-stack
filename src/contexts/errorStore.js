import {makeAutoObservable} from "mobx";

class ErrorStore {

    constructor() {
        this._data_Error = []
        this._data_Inspect_Error = []
        this._data_InWork_Error = []
        this._data_Archive_Error = []
        makeAutoObservable(this)
    }

    setError(error){
        this._data_Error = error
    }
    setInspectError(inspectError){
        this._data_Inspect_Error = inspectError
    }
    setInWorkError(InWorkError){
        this._data_InWork_Error = InWorkError
    }
    setArchiveError(ArchiveError){
        this._data_Archive_Error = ArchiveError
    }
    get data_Archive_Error(){
        return this._data_Archive_Error
    }
    get data_InWork_Error(){
        return this._data_InWork_Error
    }
    get data_Error(){
        return this._data_Error
    }
    get data_Inspect_Error(){
        return this._data_Inspect_Error
    }
}
export default ErrorStore