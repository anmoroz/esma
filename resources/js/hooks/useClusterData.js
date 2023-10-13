import {useQuery} from "@tanstack/react-query";
import ElasticsearchService from "../services/ElasticsearchService";

export const useClusterData = (connectionId, method) => {

    return useQuery({
        queryKey: ["connection", connectionId, method],
        queryFn: async () => {
            const {data, error} = (await ElasticsearchService.getData(connectionId, method));
            if (error) {
                throw error;
            }

            return data;
        },
        suspense: true
    })
}
