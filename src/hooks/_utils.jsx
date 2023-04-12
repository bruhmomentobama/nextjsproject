import axios from 'axios'
import { toast } from 'react-toastify'

export const fetcher = (url) => axios.get(url).then((res) => res.data)
export const fetcherWithArgs = ([url, params = {}]) => axios.get(url, { params }).then((res) => res.data)

export const handleErrors = (err) => {
  // Console Log for debugging purposes
  console.log(err) // eslint-disable-line
  console.log(err.response) // eslint-disable-line

  switch (err.response.status) {
    case 406: {
      err.response.data.errors.forEach((error) => {
        toast.error(error.msg)
      })
      break
    }
    default: {
      toast.error('Something is wrong with the server')
    }
  }
}
