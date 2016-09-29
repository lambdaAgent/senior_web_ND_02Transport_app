const moment = require("moment");
const time = moment().format("YYYY-MM-DD");
const todayAt00 = String(time + "T00:00:00")

function convertUnixToTime(arr){
	return arr.map(time => moment(time).format("h:mm a"))
}

function convertScheduleToUnix(arr){ 
	return convertArrToUnix(
		adjustSchedule(arr)
	)
}

function findNextFromUnixSchedule(UnixSchedule){
	var time = moment().valueOf();
	//maybe .filter() does not guarantee order execution
	var nextTrain;
	for (var i=0; i < UnixSchedule.length; i++){
		if(time < UnixSchedule[i]){
			nextTrain = UnixSchedule[i]
			break;
		}
	}
	return moment(nextTrain).format("h:mm a");
}



module.exports = {
	convertUnixToTime, 
	convertScheduleToUnix, 
	findNextFromUnixSchedule
}

// -------------
//    HELPER
// -------------


String.prototype.trim = function() 
{
    return String(this).replace(/^\s+|\s+$/g, '');
};

function convertTimeToSeconds(str){
	//(hour, min)
	var hour = str.split(":")[0];
	var min = str.split(":")[1];
	var seconds = hour * 60 + min;
	return seconds
}

function lessThan10(time){
	var hour = time.split(":")[0]
	return hour < 10 ? true : false
}

function adjustSchedule(schedule){
	//find first 12,
	var arr = schedule.split(",");
	var result = [];
	var idx = [];
	arr.map( (time,index) => {
		if(time.indexOf("12") === 0){
			idx.push(index+1)
		}
	});
	var AM = arr.slice(0, idx[0])
	var PM = arr.slice(idx[0])
	var test = AM.concat(PM)
	var currentDate = moment().format("YYYY-MM-DD")
	var AM = arr.slice(0,idx[0]).map((time)=>{
		if (lessThan10(time)){
			time = "0"+ time.trim();
		} else {
			time = time.trim();
		}
		var str = String(currentDate) + "T" + time + ":00"
		return str
	});
	var PM = arr.slice(idx[0]).map(time => {
		var hour_min = time.split(":");
		var hour = Number( hour_min[0]  ) + 12;

		if (hour < 24) {
			var time = hour + ":"+ hour_min[1]
			var str = String(currentDate) + "T" + time + ":00"
		} else {
			var hour = hour - 24;
			var time = hour + "0:" + hour_min[1];
			time = time.trim();
			var days = moment(todayAt00).add(1, "days").format("YYYY-MM-DD");
			var str = days + "T" + time + ":00"
		}
		return str
	});
	return AM.sort().concat(PM.sort())
}

function convertArrToUnix(arr){
	return arr.map(time => moment(time).valueOf())
}



function test(arr){
	var result = []
	for(var i=0; i < arr.length; i++){
		result.push( arr[i] < arr[i+1] )
	}
	return result
}

