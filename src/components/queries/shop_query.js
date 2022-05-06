import {$host} from "../../http/index.axios";

export const shop_query = async () => {
    const {data} = await $host.get(`api/shops`)
    return data
}