import axios from "axios";
import request from "@/utils/request";
import {getToken} from "@/utils/auth";

export function fetchData(){
    return request({
        url: '/api/data',
        method: "GET",
    })
}
