import * as React from "react";

import {useParams} from "react-router-dom";
import IndexToolbar from "../../common/IndexToolbar";
import Divider from "@mui/material/Divider";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import ElasticsearchService from "../../../../../services/ElasticsearchService";
import Output from "./Output";
import {useIndexInfo} from "../../../../../hooks/useIndexInfo";

export function Component() {
    const params = useParams();
    const queryClient = useQueryClient()
    const indexQuery = useIndexInfo(params.connectionId, params.indexId)
    const [output, setOutput] = React.useState(indexQuery.data);
    const navigate = useNavigate();

    React.useEffect(() => {
        setOutput(indexQuery.data);
    }, [params.indexId])

    const indexActionMutation = useMutation({
        mutationFn: async (action) => {
            const { data, error } = await  ElasticsearchService.getIndexData(params.connectionId, params.indexId, action)
            if (error) {
                throw error;
            }
            return data;
        },
        onSuccess: (data, action) => {
            if (action === "delete") {
                queryClient.invalidateQueries({ queryKey: ["connection", params.connectionId, "indices"] })
                navigate(`/connections/${params.connectionId}`, { replace: true })
                return
            }
            if (action === "open" || action === "close") {
                queryClient.invalidateQueries({ queryKey: ["connections", params.connectionId, "indices", params.indexId, "info"] })
            }
            setOutput(data)
        }
    })

    const [action, setAction] = React.useState("info");
    const indexActionHandler = (action) => {
        setAction(action)
        indexActionMutation.mutate(action)
    }

    return (
        <>
            <IndexToolbar
                action={action}
                disabled={indexActionMutation.isLoading}
                indexActionHandler={indexActionHandler}
            />
            <Divider />
            <Output data={output} indexQuery={indexQuery} />
        </>
    )
}
