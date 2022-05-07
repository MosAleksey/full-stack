import {makeAutoObservable} from "mobx";

class UserStore {
    constructor() {
        this._data_user = []
        makeAutoObservable(this)
    }

    setUser(user) {
        this._data_user = user
    }

    get data_User() {
        return this._data_user
    }
}

export default UserStore