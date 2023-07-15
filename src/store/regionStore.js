import {defineStore} from "pinia";
import {pageRegion, pageRegionCondition} from "@/api/regionApi";
import router from "@/router";
import moment from "moment";

export const useRegionStore = defineStore('regionStore', () => {

  let regionOriginList = []
  let regionTableList = []
  let initPages = 0

  let total = -1

  async function initRegionList(pageNo, searchInfo) {
    let res
    if (searchInfo !== undefined) {
      res = await pageRegionCondition(pageNo, 5, searchInfo)
    } else {
      res = await pageRegion(pageNo, 5)
    }

    regionOriginList = res.data.list.records
    initPages = res.data.list.pages
    total = res.data.list.total
    console.log(res.data.list)
    regionTableList = []
    let addresses = []
    let cities = ""
    if (regionOriginList !== undefined)
      for (const region of regionOriginList) {
        if (region.cityList !== undefined)
          for (const city of region.cityList) {
            if (city.addressList !== undefined) {
              for (const address of city.addressList) {
                addresses.push(address.address)
              }
            }
            cities = cities + city.cityName + " "
          }
        let regionTableItem = {
          id: region.id,
          regionName: region.regionName,
          cities: cities,
          addresses: addresses,
          createdTime: moment(region.createdTime).format('YYYY-MM-DD HH:mm:ss')
        }

        regionTableList.push(regionTableItem)
        cities = []
        addresses = []
      }
  }

  function getRegionTableList() {
    return regionTableList
  }

  function getRegionOriginList() {
    return regionOriginList
  }

  function getInitPages() {
    return initPages
  }

  function getTotal() {
    return total
  }

  return {
    getRegionOriginList,
    initRegionList,
    getRegionTableList,
    getInitPages,
    getTotal
  }

})