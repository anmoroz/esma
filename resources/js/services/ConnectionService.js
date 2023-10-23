import axios from "axios";

const ConnectionService = (function() {
    const url = '/api/v1'

    const getAll = async () => {
        return await axios.get(`${url}/connections`);
    }
    const create = async (connection) => {
        return await axios.post(`${url}/connections`, connection);
    }

    return {
        getAll: getAll,
        create: create
    }
})();

export default ConnectionService
