//image should 

var stationList = [];

const Stations = {
  stationList: stationList,
  getAll(){
    return this.stationList
  },
  replace(stations){
  	fillNextAndPrevOfStationList(this.stationList);
 	this.stationList = stations
  },
  push(station){
  	station.image = this.getImageById[station.id]
  	fillNextAndPrevOfStationList([station]); //mutate this station
    this.stationList.push(station)
  },
  getById(id){
  	return this.stationList.filter(s => s.id === id)[0];
  },
}

module.exports = Stations;

function attachImageToStations(stations, stationsImage){
	for (var i=0; i < stations.length; i++){
		stations[i].image = stationsImage[stations[i].id]
	}
	return stations
}

function fillNextAndPrevOfStationList(stationList){
	var length = stationList.length;
	stationList.map((s,index) => {
		var initIndex = index + 1;
		//next
		if(initIndex+1 > length){
			s.next = stationList[0].id
		} else {
			s.next = convertNumberToIdString(stationList[index+1].id)
		}
		//prev
		if(initIndex-1 <= 0){
			s.prev = convertNumberToIdString(stationList[stationList.length-1].id)
		} else {
			s.prev = convertNumberToIdString(stationList[index-1].id)
		}
	})
}

function convertNumberToIdString(num){
	num = Math.floor(num)
	if(num < 10){	
		return "00" + num
	} else if (num >= 10 && num < 100){
		return "0"+num
	} else {
		return String(num)
	}
}

