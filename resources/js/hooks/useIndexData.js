import {useQuery} from "@tanstack/react-query";
import ElasticsearchService from "../services/ElasticsearchService";

export const useIndexData = (connectionId, indexId, action) => {

    return useQuery({
            queryKey: ["connections", connectionId, "indices", indexId, "output"],
            queryFn: async () => {
                const {data, error} = (await ElasticsearchService.getIndexData(connectionId, indexId, action));
                if (error) {
                    throw error;
                }

                return data;
            },
            suspense: true
        }
    )
}
