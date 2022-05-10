import {makeAutoObservable} from "mobx";

class UserStore {
    constructor() {
        this._data_user = []
        this._data_userfunction = []
        makeAutoObservable(this)
    }

    setUser(user) {
        this._data_user = user
    }
    setUserFunction(userfunction) {
        this._data_userfunction = userfunction
    }

    get data_User() {
        return this._data_user
    }
    get data_UserFunction(){
        return this._data_userfunction
    }
}

export default UserStore