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

function findNextFromUnixSchedule(schedule, UnixSchedule){
	var time = Date.parse(new Date());
	//maybe .filter() does not guarantee order execution
	var index;
	for (var i=0; i < UnixSchedule.length; i++){
		if(time < UnixSchedule[i]){
			index = i;
			break;
		}
	}
	var result = schedule.split(", ")
	//need the index to find ETA
	return result[index]
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
	console.log("schedule", schedule)
	//find first 12,
	var arr = schedule.split(",");
	var result = [];
	var idx;
		
	for(var i=0; i<arr.length; i++){
		if(arr[i].indexOf("12") === 1){
			idx = i;
			break;
		}
	}
	console.log("INDEX SLICEING", idx)

	var AM = arr.slice(0, idx)
	var PM = arr.slice(idx)
	var currentDate = moment().format("YYYY-MM-DD")
	var AM = arr.slice(0,idx).map((time)=>{
		if (lessThan10(time)){
			time = "0"+ time.trim();
		} else {
			time = time.trim();
		}
		var time = preventMinuteTobeMoreThan59(time);
		var str = String(currentDate) + " " + time + ":00"
		return str
	});
	var PM = arr.slice(idx).map(time => {
		var hour_minute = time.split(":");
		var hour = Number( hour_minute[0]  ) + 12;

		if (hour < 24) {
			var time = hour + ":"+ hour_minute[1]
			var str = String(currentDate) + " " + time + ":00"
		} else {
			var hour = hour - 24;
			         // 0 + 0: + minutes == 00:${minute}
			var time = hour + "0:" + hour_minute[1];
			time = time.trim();
			var time = preventMinuteTobeMoreThan59(time);
			var days = moment(todayAt00).add(1, "days").format("YYYY-MM-DD");
			var str = days + " " + time + ":00"
		}
		return str
	})

	return AM.sort().concat(PM.sort())
}

function convertArrToUnix(arr){
	console.log(arr)
	var result =  arr.map(time => Date.parse(time))
	return result;
}
function preventMinuteTobeMoreThan59(time){
	var hour = time.split(":")[0];
	var minute = Number(time.split(":")[1]);
	minute = (Number(minute) > 59) ? "59" : minute
	minute = (Number(minute) < 0) ? "00" : minute
	minute = (Number(minute) < 10) ? "0" + minute : minute

	return hour + String(minute)
}


function test(arr){
	var result = []
	for(var i=0; i < arr.length; i++){
		result.push( arr[i] < arr[i+1] )
	}
	return result
}

