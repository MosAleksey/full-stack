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

export const error__inspect__query_create = async (err_id, inspect_data) => {
    const {response} = await $host.post(`api/errors/${err_id}/inspect`, inspect_data)
    return response
}

export const  error__inspect_query = async (err_id) => {
    const {data} = await $host.get(`api/errors/${err_id}/inspect`)
    return data
}

export const error__inwork__query_create = async (err_id, inwork_data) => {
    const {response} = await $host.post(`api/errors/${err_id}/inwork`, inwork_data)
    return response
}

export const error__inwork__query = async (err_id) => {
    const {data} = await $host.get(`api/errors/${err_id}/inwork`)
    return data
}

export const error__archive__create =async (err_id, archive_data) => {
    const {response} = await $host.post(`api/errors/${err_id}/archive`, archive_data)
    return response
}

export const error__archive__byid = async (err_id) => {
    const {data} = await $host.get(`api/errors/${err_id}/archive`)
    return data
}

export const error__query__byinv_number = async (inv_number) => {
    const {data} = await $host.get(`api/errors/${inv_number}/statistic`)
    return data
}