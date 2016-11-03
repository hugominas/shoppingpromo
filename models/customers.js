'use strict';

function customers() {
  this.readDbFile().then((data)=>{
    if(data){
      this.customers=data||[];
    }
  });
}

customers.prototype.getById = function(id){
  return this.customers.filter((cust) => {
    return (id == cust.id)
  })
}


customers.prototype.readDbFile = function(file){
  return new Promise ((resolve,reject) => {
    resolve([
      {
        "id": "1",
        "name": "Coca Cola",
        "since": "2014-06-28",
        "revenue": "492.12"
      },
      {
        "id": "2",
        "name": "Teamleader",
        "since": "2015-01-15",
        "revenue": "1505.95"
      },
      {
        "id": "3",
        "name": "Jeroen De Wit",
        "since": "2016-02-11",
        "revenue": "0.00"
      }
    ])
  })
}

module.exports = new customers();
