var moment = require("moment");

var schedule = "5:54, 6:29, 7:44, 8:44, 9:44, 10:43, 11:43, 12:37, 1:37, 2:37, 3:43, 4:32, 4:58, 5:25, 5:21, 5:35, 6:00, 5:43, 6:25, 6:21, 6:35, 7:00, 6:43, 7:25, 7:21, 7:35, 7:55, 8:14, 8:57, 9:57, 10:57, 11:57, 12:06 "

var time = moment().format("YYYY-MM-DD");
var todayAt00 = String(time + "T00:00:00")

String.prototype.trim = function() 
{
    return String(this).replace(/^\s+|\s+$/g, '');
};

function convertTimeToSeconds(str){
	//(hour, min)
	var hour = str.split(":")[0];
	var min = str.split(":")[1];
	var seconds = hour * 60 + min;
	console.log("seconds", seconds)
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
		if(time.indexOf("12") > -1){
			idx.push(index+1)
		}
	});
	var AM = arr.slice(0, idx[0])
	var PM = arr.slice(idx[0])
	var test = AM.concat(PM)
	console.log(test)
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

function convertUnixToTime(arr){
	return arr.map(time => moment(time).format("h:mm a"))
}

const convertScheduleToUnix = (arr) => { 
	return convertArrToUnix(
		adjustSchedule(arr)
	)
}

module.exports = {
	convertUnixToTime, convertScheduleToUnix
}