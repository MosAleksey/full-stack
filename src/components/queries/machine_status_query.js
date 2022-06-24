import {$host} from "../../http/index.axios";

export const machine_status_byid = async (machine_id, status) => {
    const {data} = await $host.put(`api/machines/${machine_id}/byid`, status)
    return data
}
export const machine_status_byinv = async (inv_number, status) => {
    const {data} = await $host.put(`api/machines/${inv_number}/byinv`, status)
    return data
}
export const machine_stoplist = async () => {
    const {data} = await $host.get(`api/machines/stoplist`)
    return data
}