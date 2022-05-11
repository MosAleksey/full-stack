import {$host} from "../../http/index.axios";

export const machine__Info__query__By_Id  = async (inv_number) => {
    const invNumber = String(inv_number)
    const {data} = await $host.get(`api/machine_info/${invNumber}`)
    return data
}

export const machine__Info__query  = async () => {
    const {data} = await $host.get(`api/machine_info`)
    return data
}
