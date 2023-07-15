import service from "@/utils/service";


export const getRegionById=(id)=>
  service.request({
    url: `/region/${id}`,
    method:"get"
  })
export const getAllRegion=()=>
  service.request({
    url:'/region/',
    method: 'get',
  })

export const pageRegion=(pageNo,pageCount)=>
  service.request({
    url:`/region/pageRegion/${pageNo}/${pageCount}`,
    method:"get"
  })

export const pageRegionCondition=(pageNo,pageCount,searchInfo)=>
  service.request({
    url:`/region/pageRegionCondition/${pageNo}/${pageCount}`,
    method: 'post',
    data: searchInfo
  })

export const addRegion = (region)=>
  service.request({
    url:"/region/addRegion",
    method:'post',
    data:region
  })

export const updateRegion = (region)=>
  service.request({
    url:"/region/updateRegion",
    method:'put',
    data:region
  })

export const deleteRegion = (id)=>
  service.request({
    url:`/region/${id}`,
    method:'delete'
  })