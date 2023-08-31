import axios from "axios";
import env from "react-dotenv";
// const BASE_URL = env
// console.log('BASE_URL',BASE_URL)
const token = 'pk_987404f82f2e4d039503ec72d0fdc68f'
const baseService = axios.create({
    baseURL: 'https://cloud.iexapis.com/stable',
    params: {
      token: token
    }
  });
