import {$host} from "../../http/index.axios";

export const user_query = async () => {
    const {data} = await $host.get(`api/users`)
    return data
}