import {$host} from "../../http/index.axios";

export const machine__list__query = async () => {
    const {data} = await $host.get('api/machines')
    return data
}

export const machine__list__filterquery = async (fmachine_query) => {
    const {data} = await $host.get(fmachine_query)

    return data
}
