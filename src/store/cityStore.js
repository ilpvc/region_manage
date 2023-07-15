import {defineStore} from "pinia";
import {getAllCity, pageCity} from "@/api/cityApi";
import moment from "moment";

export const useCityStore = defineStore('cityStore', () => {

  let initPages = 0
  let cityList = []
  let total = -1
  let cityMap = new Map

  async function initCityList(pageNo) {
    let res = await pageCity(pageNo, 5)
    let res1 = await getAllCity()
    initPages = res.data.list.pages
    cityList = res1.data.list
    total = res.data.list.total
    for (const city of cityList) {
      cityMap.set(city.id,city.cityName)
    }

  }

  function getInitPages(){
    return initPages
  }

  function getCityList(){
    for (const city of cityList) {
      city.createdTime = moment(city.createdTime).format('YYYY-MM-DD HH:mm:ss')
    }
    return cityList
  }

  function getTotal(){
    return total
  }

  function getCityMap(){
    return cityMap
  }

  return {
    getCityList,
    getInitPages,
    initCityList,
    getTotal,
    getCityMap
  }

})