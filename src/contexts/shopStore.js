import {makeAutoObservable} from "mobx";

class ShopStore {
    constructor() {
        this._shop_Data = []
        makeAutoObservable(this)
    }

    setShop(store) {
        this._shop_Data = store
    }

    get data_Shop() {
        return this._shop_Data
    }

}
export default ShopStore