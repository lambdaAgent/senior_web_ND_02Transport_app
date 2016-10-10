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
	var result = schedule.split(", ")[index];
	var result_hour = result.split(":")[0];
	    result_hour =  Number(result_hour) < 10 ? "0"+result_hour : result_hour;
	var result_digitilize = String(result_hour) + ":" + result.split(":")[1]
	var today = moment().format("YYYY-MM-DD HH:mm a");
	var date_HourMin_AmPm = today.split(" ");
	var departureTimeString = date_HourMin_AmPm[0] + " " + result_digitilize + " " + date_HourMin_AmPm[2];
	var unix = moment(departureTimeString, "YYYY-MM-DD HH:mm a").valueOf();
	                      //the last index, is hour indication of AM or PM
	return [result, unix, departureTimeString.slice(-2)]
}

//findNextDeparture is like findNextFromUnixSchedule, but
// the initial time is not today date, but departure time
function findNextArrival(departureTimeUnix, schedule, UnixSchedule){
	var time = departureTimeUnix;
	//maybe .filter() does not guarantee order execution
	var departureTimeString = new Date(departureTimeUnix);
	var index;
	for (var i=0; i < UnixSchedule.length; i++){
		if(time < UnixSchedule[i]){
			index = i;
			break;
		}
	}
	var result = schedule.split(", ");
	// console.log(schedule.split(", "))
	// console.log(UnixSchedule)
	// console.log("unix time", time)
	// console.log("departure time",departureTimeString)
	// console.log("UnixSchedule", UnixSchedule.map(u => new Date( u )) )
	// console.log("index",result[0])
	//need the index to find ETA
	var today = moment().format("YYYY-MM-DD HH:mm a");
	         //result      , 12hour indication of AM or PM
	return [ result[index] , today.slice(-2)]
}


module.exports = {
	convertUnixToTime, 
	convertScheduleToUnix, 
	findNextFromUnixSchedule,
	findNextArrival
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
	var idx;
		
	for(var i=0; i<arr.length; i++){
		if(arr[i].indexOf("12") === 1){
			idx = i;
			break;
		}
	}

	var AM = arr.slice(0, idx+1);
	var PM = arr.slice(idx+1);
	var currentDate = moment().format("YYYY-MM-DD")
	var AM = arr.slice(0,idx+1).map((time)=>{
		if (lessThan10(time)){
			time = "0"+ time.trim();
		} else {
			time = time.trim();
		}
		var time = preventMinuteTobeMoreThan59(time);
		var str = String(currentDate) + " " + time + ":00"
		return str
	});
	var PM = arr.slice(idx+1).map(time => {
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
	var result =  arr.map(time => Date.parse(time))
	return result;
}
function preventMinuteTobeMoreThan59(time){
	var hour = time.split(":")[0];
	var minute = Number(time.split(":")[1]);
	minute = (Number(minute) > 59) ? "59" : minute
	minute = (Number(minute) < 0) ? "00" : minute
	minute = (Number(minute) < 10) ? "0" + minute : minute

	return hour + ":" + String(minute)
}


function test(arr){
	var result = []
	for(var i=0; i < arr.length; i++){
		result.push( arr[i] < arr[i+1] )
	}
	return result
}

