
module.exports = {
  //by default all stations schedule will be randomized
  getAllStation(){
    return randomizeScheduleOnAll(stations)
  }
}


function randomizeScheduleOnAll(stations){
  return stations.map(s => {
    s.Southbound = randomizeSchedule(s.Southbound);
    s.Northbound = randomizeSchedule(s.Northbound);
    return s
  })
}
function randomizeSchedule(schedule){
    return schedule.split(", ").map(t => {
      var hour_minute = t.split(":");
      var hours = hour_minute[0];
      var minute = hour_minute[1].substring(0,2);
      //offset the minute to +1minutes or -1minutes
      var minutes_rand = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 1));
      //if minute is minus, it will be converted to NaN, so prevent it
      minute = Number(minute) + Number(minutes_rand);
      if(minute < 0) minute = 0;
      if(minute > 59) minute = 59
      
      if (minute < 10){
        //digitize to double digit, i.e: 01, 02, not 1,2;
        minute = "0" + String(minute);
      }
      
      return String(hours) + ":" + minute;
    }).join(", ")
}

var stations =  [
  { id: "001", 
      zone:1,
      name:"San Francisco Station", 
      Southbound: "4:55, 5:25, 6:06, 6:24, 6:44, 6:56, 7:12, 7:19, 7:24, 7:44, 7:56, 8:12, 8:19, 8:24, 8:44, 8:56, 9:00, 9:37, 10:00, 11:00, 12:00, 1:00, 2:00, 2:37, 3:00, 3:37, 4:10, 4:19, 4:28, 4:33, 4:55, 5:12, 5:20, 5:28, 5:33, 5:55, 6:12, 6:20 6:28, 6:33, 6:55, 7:33, 8:40, 9:40, 10:40, 12:01",
      Northbound: "6:03, 6:38, 6:47, 7:22, 7:07, 7:51, 7:47, 8:03, 8:22, 8:07, 8:51, 8:47, 9:03, 9:27, 9:09, 9:50, 10:09, 10:50, 11:15, 11:50, 12:43, 1:43, 2:43, 3:50, 4:04, 4:40, 5:06, 5:32, 5:27, 5:43, 6:06, 5:49, 6:33, 6:27, 6:43, 7:06, 6:49, 7:32, 7:27, 7:43, 8:02, 8:23, 9:04, 10:04, 11:04, 12:04 ",
      vendors: "Tazza D'Amore (M-F 6a-7p; Sat 8a-3p), Subway sandwich, Bow-K Flowers",
      address: "700 4th St., San Francisco 94107",
      lng:-122.394992,
      lat:37.77639,
      amnesties: {
        wheelchair: true,
        bicycle:true,
        luggage: false
      },
      image: "/images/San_Francisco_Station.jpg",
    },    
     { id: "002", 
      zone:1,
      name:"22nd St. Station", 
      Southbound: "5:00, 5:30, 6:11, 6:29, 6:50, 7:02, 7:18, 7:25, 7:29, 7:50, 8:02, 8:18, 8:25, 8:29, 8:50, 9:02, 9:05, 10:05, 11:05, 12:05, 1:05, 2:05, 3:05, 4:33, 5:33, 6:33, 7:38, 8:45, 9:45, 10:45, 12:06",
      Northbound: "5:54, 6:29, 7:44, 8:44, 9:44, 10:43, 11:43, 12:37, 1:37, 2:37, 3:43, 4:32, 4:58, 5:25, 5:21, 5:35, 6:00, 5:43, 6:25, 6:21, 6:35, 7:00, 6:43, 7:25, 7:21, 7:35, 7:55, 8:14, 8:57, 9:57, 10:57, 11:57", 
      vendors: "",
      address: "1149 22nd St., San Francisco 94107",
      lng:-122.39188,
      lat:37.757599,
      amnesties: {
        wheelchair: false,
        bicycle:true,
        luggage: false
      },
      image: "/images/22nd_Street.jpg",
     
    },  
     { id: "003", 
      zone:1,
      name:"Bayshore Station", 
      Southbound: "5:05, 5:35, 6:35, 7:35, 8:35, 9:10, 10:10, 11:10, 12:10, 1:10, 2:10, 3:12, 4:41, 5:41, 6:41, 7:43, 8:50, 9:50, 10:50, 12:11",
      Northbound: "5:49, 6:24, 7:37, 8:37, 9:38, 10:37, 11:37, 12:31, 1:31, 2:31, 3:37, 4:27, 5:19, 6:19, 7:19, 8:09, 8:52, 9:52, 10:52, 11:52",
      vendors: "",
      address: "400 Tunnel Ave., San Francisco 94134",
      amnesties: {
        wheelchair: true,
        bicycle:true,
        luggage: true
      },
      image: "/images/Bayshore_Station.jpg",
     
    },  
     { id: "004", 
      zone:1,
      name:"South San Francisco Station", 
      Southbound: "5:11, 5:41, 6:41, 7:41, 8:41, 9:15, 10:15, 11:15, 12:15, 1:15, 2:15, 3:17, 4:49, 5:08, 5:49, 6:08, 6:49, 7:08, 7:49, 8:56, 9:56, 10:56, 12:17",
      Northbound: "5:43, 6:18, 7:09, 7:29, 8:09, 8:29, 9:14, 9:32, 10:31, 11:31, 12:25, 1:25, 2:25, 3:31, 4:21, 5:13, 6:13, 7:13, 8:03, 8:46, 9:46, 10:46, 11:46",
      vendors: "",
      address: "590 Dubuque Ave., South San Francisco 94080 ",
      amnesties: {
        wheelchair: false,
        bicycle:true,
        luggage: true
      },
      image: "/images/South_San_Francisco_Station.jpg",
     
    },  
    { id: "005", 
      zone:1,
      name:"San Bruno Station", 
      Southbound: "5:15, 5:45, 6:44, 7:37, 7:44, 8:37, 8:44, 9:18, 9:52, 10:18, 11:18, 12:18, 1:18, 2:18, 2:52, 3:21, 3:52, 4:33, 4:53, 5:35, 5:53, 6:35, 6:53, 7:53, 9:00, 10:00, 11:00, 12:21",
      Northbound: "5:39, 6:14, 7:25, 7:48, 8:25, 8:48, 9:29 ,9:55, 10:27, 11:00, 11:27, 12:21, 1:21, 2:21, 3:27, 3:47, 4:17, 5:08, 5:25, 6:08, 6:25, 7:08, 7:25, 7:59, 8:42, 9:42, 10:42, 11:42",
      vendors: "",
      address: "833  San Mateo Ave., San Bruno 94066 ",
      amnesties: {
        wheelchair: true,
        bicycle:true,
        luggage: true
      },
      image: "/images/San_Bruno.jpg",
     
    },

    { id: "006", 
      zone:2,
      name:"Millbrae Transit Center", 
      Southbound: "5:19, 5:49, 6:24, 6:49, 7:02, 7:17, 7:32, 7:49, 8:02, 8:17, 8:32, 8:49, 9:02, 9:17, 9:22, 9:56, 10:22, 11:22, 12:22, 1:22, 2:22, 2:56, 3:25, 3:56, 4:26, 4:57, 4:50, 5:14, 5:30, 5:57, 5:50, 6:14, 6:30, 6:57, 6:50, 7:14, 7:57, 9:05, 10:05, 11:05, 12:25",
      Northbound: "5:35, 6:10, 6:29, 7:03, 6:50, 7:21, 7:29, 8:03, 7:50, 8:21, 8:29, 9:08, 8:52, 9:24, 9:51, 10:23, 10:56, 11:23, 12:17, 1:17, 2:17, 3:23, 3:43, 4:13, 4:46, 5:04, 5:09, 5:48, 5:29, 6:04, 6:09, 6:48, 6:29, 7:04, 7:09, 7:43, 7:55, 8:35, 9:35, 10:35, 11:35",
      vendors: "Public Telephone, Northbound: 4 phones, Southbound: 2 phones",
      address: "100 California Drive, Millbrae 94030",
      amnesties: {
        wheelchair: true,
        bicycle:true,
        luggage: true
      },
      image: "/images/Millbrae_Transit_Center.jpg",
     
    },
    { id: "007", 
      zone:2,
      name:"Broadway Station", 
      Northbound: "4:55, 5:25, 6:06, 6:24, 6:44, 6:56, 7:12, 7:19, 7:24, 7:44, 7:56, 8:12, 8:19, 8:24, 8:44, 8:56, 9:00, 9:37, 10:00, 11:00, 12:00, 1:00, 2:00, 2:37, 3:00, 3:37, 4:10, 4:19, 4:28, 4:33, 4:55, 5:12, 5:20, 5:28, 5:33, 5:55, 6:12, 6:20 6:28, 6:33, 6:55, 7:33, 8:40, 9:40, 10:40, 12:01",
      Southbound:"8:43, 9:43, 10:43, 11:43, 12:43, 1:43, 2:43, 3:43, 4:43, 5:43, 6:43, 7:43, 8:43, 9:43, 10:43*, 12:29*",
      vendors: "Shuttles: Broadway/Millbrae; Burlingame Trolley",
      address: "1190 California Drive, Burlingame 94010",
      amnesties: {
        wheelchair: false,
        bicycle:true,
        luggage: false
      },
      image: "/images/Broadway_Station.jpg",
     
    },
    { id: "008", 
      zone:2,
      name:"Burlingame Station", 
      Northbound: "5:30, 6:05, 7:16, 7:42, 8:15, 8:42, 9:19, 9:46, 10:18, 10:51, 11:18, 12:12, 1:12, 2:12, 3:18, 3:38, 4:08, 4:59, 5:18, 5:59, 6:18, 6:59, 7:18, 7:37, 7:50, 8:33, 9:33, 10:33, 11:33",
      Southbound: "5:23, 5:53, 6:28, 6:53, 7:44, 7:53, 8:44, 8:53, 9:27, 10:01, 10:27, 11:27, 12:27, 1:27, 2:27, 3:01, 3:30, 4:01, 4:38, 5:01, 5:42, 6:01, 6:42, 7:01, 8:01, 9:09, 10:09, 11:09, 12:29",
      vendors: "Shuttles: Broadway/Millbrae; Burlingame Trolley, Public Telephone: 2 phones",
      address: "290 California Drive, Burlingame 94010",
      amnesties: {
        wheelchair: true,
        bicycle: true,
        luggage: true
      },
      image: "/images/Burlingame_Station.jpg",
    },
    { id: "009", 
      zone:2,
      name:"San Mateo Station", 
      Northbound: "5:25, 6:01, 6:42, 7:12, 7:38, 7:42, 8:11, 8:38, 8:44, 9:15, 9:42, 10:15, 10:47, 11:15, 12:08, 1:08, 2:08, 3:15, 3:34, 4:04, 4:38, 4:55, 5:14, 5:40, 5:55, 6:14, 6:40, 6:55, 7:14, 7:33, 7:46, 8:29, 9:29, 10:29, 11:29",
      Southbound: "5:28, 5:58, 6:32, 6:56, 7:09, 7:48, 7:56, 8:09, 8:48, 8:56, 9:09, 9:30, 10:04, 10:30, 11:30, 12:30, 1:30, 2:30, 3:04, 3:33, 4:04, 4:43, 5:06, 4:59, 5:45, 6:06, 5:59, 6:45, 7:06, 6:59, 8:06, 9:13, 10:13, 11:13, 12:34",
      vendors: "The Melting Pot",
      address: "385 First Ave., San Mateo 94400",
      amnesties: {
        wheelchair: true,
        bicycle: true,
        luggage: true
      },
      image: "/images/San_Mateo_Station.jpg",
    },
    { id: "010", 
      zone:2,
      name:"Hayward Park Station", 
      Northbound: "5:23, 5:58, 7:09, 8:08, 9:12, 10:11, 11:11, 12:05, 1:05, 2:05, 3:11, 4:01, 4:52, 5:52, 6:52, 7:43, 8:26, 9:26, 10:26, 11:26",
      Southbound: "5:31, 6:01, 7:00, 8:00, 9:00, 9:33, 10:33, 11:33, 12:33, 1:33, 2:33, 3:36, 5:09, 6:09, 7:09, 8:09, 9:16, 10:16, 11:16, 12:37",
      vendors: "",
      address: "401 Concar Drive, San Mateo 94402",
      amnesties: {
        wheelchair: true,
        bicycle: true,
        luggage: true
      },
      image: "/images/Hayward_Park.jpg",
    },
    { id: "011", 
      zone:2,
      name:"Hillsdale Station", 
      Northbound: "5:20, 5:55, 6:19, 6:54, 7:05, 7:19, 7:33, 7:54, 8:05, 8:19, 8:33, 8:59, 9:08, 9:38, 10:08, 10:42, 11:08, 12:02, 1:02, 2:02, 3:08, 3:30, 3:58, 4:49, 5:10, 5:19, 5:49, 6:10, 6:19, 6:49, 7:10, 7:29, 7:40, 8:23, 9:23, 10:23, 11:23",
      Southbound: "5:34, 6:04, 6:36, 7:04, 7:42, 7:52, 8:04, 8:42, 8:52, 9:04, 9:37, 10:08, 10:37, 11:37, 12:37, 1:37, 2:37, 3:08, 3:40, 4:08, 4:36, 4:48, 5:13, 5:24, 5:40, 5:50, 6:13, 6:24, 6:40, 6:50, 7:13, 7:24, 8:12, 9:20, 10:20, 11:20, 12:40",
      vendors: "",
      address: "3333 El Camino Real, San Mateo 94403",
      amnesties: {
        wheelchair: true,
        bicycle: true,
        luggage: true
      },
      image: "/images/Hillsdale_Station.jpg",
    },
    { id: "012", 
      zone:2,
      name:"Belmont Station", 
      Northbound: "5:20, 5:55, 6:19, 6:54, 7:05, 7:19, 7:33, 7:54, 8:05, 8:19, 8:33, 8:59, 9:08, 9:38, 10:08, 10:42, 11:08, 12:02, 1:02, 2:02, 3:08, 3:30, 3:58, 4:49, 5:10, 5:19, 5:49, 6:10, 6:19, 6:49, 7:10, 7:29, 7:40, 8:23, 9:23, 10:23, 11:23",
      Southbound: "5:34, 6:04, 6:36, 7:04, 7:42, 7:52, 8:04, 8:42, 8:52, 9:04, 9:37, 10:08, 10:37, 11:37, 12:37, 1:37, 2:37, 3:08, 3:40, 4:08, 4:36, 4:48, 5:13, 5:24, 5:40, 5:50, 6:13, 6:24, 6:40, 6:50, 7:13, 7:24, 8:12, 9:20, 10:20, 11:20, 12:40",
      vendors: "",
      address: "3333 El Camino Real, San Mateo 94403",
      amnesties: {
        wheelchair: true,
        bicycle: true,
        luggage: true
      },
      image: "/images/Hillsdale_Station.jpg",
    },
]
