import axios from 'axios';

export const fetchJobSerivce = () => {
    return new Promise((resolve, reject) => {
        // axios.get(`data.json`)
        //     .then(response => resolve(response))
        //     .catch(error => reject(error))
        axios.get(`https://www.themuse.com/api/public/jobs?page=1`)
            .then(response => resolve(response.data.results))
            .catch(error => reject(error))
    })
}
export const fetchJobDetailService = (id) => {
    return newPromise((resolve, reject) => {
        axios.get(`https://www.themuse.com/api/public/jobs/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}