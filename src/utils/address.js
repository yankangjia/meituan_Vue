class Address{
  static convertToServer(data){
    let serverData = {
      realname: data.name,
      telephone: data.tel,
      province: data.province,
      city: data.city,
      county: data.county,
      address_detail: data.addressDetail,
      area_code: data.areaCode,
      is_default: data.isDefault,
    }
    if(data.id){
      serverData.id = data.id
    }
    return serverData
  }

  static convertToFront(data){
    let frontData = {
      name: data.realname,
      tel: data.telephone,
      province: data.province,
      city: data.city,
      county: data.county,
      addressDetail: data.address_detail,
      areaCode: data.area_code,
      isDefault: data.is_default,
      address: data.province + data.city + data.county + data.address_detail
    }
    if(data.id){
      frontData.id = data.id
    }
    return frontData
  }
}

export default Address