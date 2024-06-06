import axios from 'axios'
import { type Truck } from '@/types/truck'

const ENDPOINT = 'http://qa-api-mock-3.eu-central-1.elasticbeanstalk.com/trucks'
const LIMIT = 100

const getAllTrucks = (limit: number = LIMIT) => {
  return axios
    .get(`${ENDPOINT}?limit=${limit}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

const getTruckById = (id: number) => {
  return axios
    .get(`${ENDPOINT}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

const createTruck = (truck: Truck) => {
  return axios
    .post(`${ENDPOINT}`, truck, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

const updateTruckById = (id: number, truck: Truck) => {
  return axios
    .put(`${ENDPOINT}/${id}`, truck, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    })
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

const deleteTruckById = (id: number) => {
  return axios
    .delete(`${ENDPOINT}/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      console.log(error)
    })
}

export { getAllTrucks, getTruckById, createTruck, updateTruckById, deleteTruckById }
