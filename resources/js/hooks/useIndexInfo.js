import {useQuery} from "@tanstack/react-query";
import ElasticsearchService from "../services/ElasticsearchService";

export const useIndexInfo = (connectionId, indexId) => {

    return useQuery({
            queryKey: ["connections", connectionId, "indices", indexId, "info"],
            queryFn: async () => {
                const {data, error} = (await ElasticsearchService.getIndexData(connectionId, indexId, "info"));
                if (error) {
                    throw error;
                }
                return data;
            },
            suspense: true
        }
    )
}
