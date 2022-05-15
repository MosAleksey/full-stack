import {$host} from "../../http/index.axios";

export const store__query = async () => {
    const {data} = await $host.get(`api/store`)
    return data
}

export const store__query__byid = async (store_id) => {
    const {data} = await $host.get(`api/store/${store_id}`)
    return data
}

export const update__store__query__byid = async (store_id, updatedata) => {
    const request = await $host.put(`api/store/${store_id}`, updatedata)
    return request
}

export const delete__store__query__byid = async (store_id) => {
    const request = await $host.delete(`api/store/${store_id}`)
    return request
}

export const create__store__query = async (storedata) => {
    const response = await $host.post(`api/store`, storedata)
    return response
}
export const store__query__bybrand = async (brand) => {
    const {data} = await $host.get(`api/store/filter/${brand}`)
    return data
}