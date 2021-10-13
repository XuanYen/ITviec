import axios from 'axios';

export const fetchJobSerivce = (page) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.themuse.com/api/public/jobs?page=${page}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}
export const fetchJobDetailService = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.themuse.com/api/public/jobs/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}
export const fetchCompanySerivce = (page) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.themuse.com/api/public/companies?page=${page}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}
export const fetchCompanyDetailService = (id) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.themuse.com/api/public/companies/${id}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}
export const fetchJobSearchSerivce = (searchQuery) => {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.themuse.com/api/public/jobs?page=1${searchQuery}`)
            .then(response => resolve(response.data))
            .catch(error => reject(error))
    })
}
