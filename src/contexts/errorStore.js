import {makeAutoObservable} from "mobx";

class ErrorStore {

    constructor() {
        this._data_Error = []
        makeAutoObservable(this)
    }

    setError(error){
        this._data_Error = error
    }

    get data_Error(){
        return this._data_Error
    }
}
export default ErrorStore