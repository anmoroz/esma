import axios from "axios";

const ConnectionService = (function() {
    const url = '/api/v1'

    const getAll = async () => {
        return await axios.get(`${url}/connections`);
    }

    return {
        getAll: getAll
    }
})();

export default ConnectionService
