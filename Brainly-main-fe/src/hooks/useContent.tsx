import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";



export function useContent(){
    const [contents, setContent]= useState([]);


    useEffect(()=>{
        axios.get(`${BACKEND_URL}/api/v1/content` ,{

            headers:{
                "Authorization":localStorage.getItem("token")
            }
        }) .then ((response) => {
            setContent(response.data.content)
        })
    } ,[])

    
    return contents;
}