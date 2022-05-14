import {makeAutoObservable} from "mobx";

class ErrorStore {

    constructor() {
        this._data_Error = []
        this._data_Inspect_Error = []
        makeAutoObservable(this)
    }

    setError(error){
        this._data_Error = error
    }
    setInspectError(inspectError){
        this._data_Inspect_Error = inspectError
    }

    get data_Error(){
        return this._data_Error
    }
    get data_Inspect_Error(){
        return this._data_Inspect_Error
    }
}
export default ErrorStore