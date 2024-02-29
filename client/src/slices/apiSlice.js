import {fetchBaseQuery, createApi} from "@reduxjs/toolkit/query/react"
import {BASE_URL} from '../constants'

const baseQurey = fetchBaseQuery({baseUrl:BASE_URL})

export const apiSlice = createApi({
    baseQurey,
    tagTypes: ["Product"],
    endpoints: builder =>({}),
})