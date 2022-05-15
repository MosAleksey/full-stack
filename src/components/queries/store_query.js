import {$host} from "../../http/index.axios";

export const store_query = async () => {
    const {data} = await $host.get(`api/store`)
    return data
}