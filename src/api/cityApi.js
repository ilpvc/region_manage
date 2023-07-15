import service from "@/utils/service";

export const getCityById=(id)=>
  service.request({
    url:`/city/${id}`,
    method:"get"
  })
export const getAllCity=()=>
  service.request({
    url:`/city/`,
    method:"get"
  })


export const pageCity = (pageNo,pageCount) =>
  service.request({
    url: `/city/pageCity/${pageNo}/${pageCount}`,
    method:'get'
  })

export const addCity=(city)=>
  service.request({
    url:'/city/addCity',
    method:"post",
    data:city
  })

export const updateCity=(city)=>
  service.request({
    url:'/city/updateCity',
    method:"put",
    data:city
  })

export const deleteCity=(id)=>
  service.request({
    url:`/city/${id}`,
    method:"delete"
  })