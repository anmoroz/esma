import axios from "axios";

const ElasticsearchService = (function() {
    const url = '/api/v1'

    const getIndexData = async (connectionId, indexId, method) => {
        return await axios.get(`${url}/connection/${connectionId}/index/${indexId}/${method}`)
    }

    const getData = async (connectionId, method) => {
        return await axios.get(`${url}/connection/${connectionId}/es/${method}`)
    }

    const createIndex = async (connectionId, data) => {
        return await axios.post(`${url}/connection/${connectionId}/index`, data)
    }

    return {
        getIndexData: getIndexData,
        getData: getData,
        createIndex: createIndex
    }
})();

export default ElasticsearchService
