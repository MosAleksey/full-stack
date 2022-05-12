import {$host} from "../../http/index.axios";

export const error__query  = async () => {
    const {data} = await $host.get(`api/errors`)
    return data
}
export const error__query__byid  = async (custom__query) => {
    const {data} = await $host.get(custom__query)
    return data
}
export const error__query__update  = async (custom__query, req_data) => {
    const {data} = await $host.put(custom__query, req_data)
    return data
}

export const error__query__create  = async (error_data) => {
    const {response} = await $host.post(`api/errors`, error_data)
    return response
}