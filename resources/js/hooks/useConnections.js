import {useQuery} from "@tanstack/react-query";
import ConnectionService from "../services/ConnectionService";

export const useConnections = () => {
    const connectionService = ConnectionService

    return useQuery({
        queryKey: ["connections"],
        queryFn: async () => {
            const {data, error} = await connectionService.getAll()
            if (error) {
                throw error;
            }

            return data.data;
        },
        suspense: true
    })
}
