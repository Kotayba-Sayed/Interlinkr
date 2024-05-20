import axios from "axios";


export default axios.create({
    baseURL: 'https://interlinkr-api-4df8d4540ce2.herokuapp.com/'
})

axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik1heWJlIiwiaWQiOjQsImlhdCI6MTcxNjE4MjQzN30.dEZygXaANqpMUiDkOBUbS7UpP78O-Z3vCjP0sIiLz-M`;
axios.defaults.headers.common['Content-Type'] = 'application/json';


