import {$host} from "../../http/index.axios";

export const user_query = async () => {
    const {data} = await $host.get(`api/users`)
    return data
}

export const user_functions_query = async  () => {
    const {data} = await $host.get(`api/userfunctions`)
    return data
}

export const create_user_query = async (json_string) => {
    const response = await $host.post(`api/users`, {json_string})
    return response
}