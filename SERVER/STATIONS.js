
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
      var hours = t.split(":")[0];
      var minutes_rand = Math.floor(Math.random() * 59)
      if (minutes_rand < 10){
        minutes_rand = "0" + minutes_rand
      }
      return String(hours) + ":" + minutes_rand;
    }).join(", ")
}

var stations =  [
  { id: "001", // N = number, Z = Zone
      zone:1,
      name:"San Francisco Station", 
      Southbound: "4:55, 5:25, 6:06, 6:24, 6:44, 6:56, 7:12, 7:19, 7:24, 7:44, 7:56, 8:12, 8:19, 8:24, 8:44, 8:56, 9:00, 9:37, 10:00, 11:00, 12:00, 1:00, 2:00, 2:37, 3:00, 3:37, 4:10, 4:19, 4:28, 4:33, 4:55, 5:12, 5:20, 5:28, 5:33, 5:55, 6:12, 6:20 6:28, 6:33, 6:55, 7:33, 8:40, 9:40, 10:40, 12:01",
      Northbound: "6:03, 6:38, 6:47, 7:22, 7:07, 7:51, 7:47, 8:03, 8:22, 8:07, 8:51, 8:47, 9:03, 9:27, 9:09, 9:50, 10:09, 10:50, 11:15, 11:50, 12:43, 1:43, 2:43, 3:50, 4:04, 4:40, 5:06, 5:32, 5:27, 5:43, 6:06, 5:49, 6:33, 6:27, 6:43, 7:06, 6:49, 7:32, 7:27, 7:43, 8:02, 8:23, 9:04, 10:04, 11:04, 12:04 ",
      vendors: "Tazza D'Amore (M-F 6a-7p; Sat 8a-3p), Subway sandwich, Bow-K Flowers",
      address: "700 4th St., San Francisco 94107",
      lat: "37.77639",
      long: "-122.394992",
      amnesties: {
        wheelchair: true,
        bicycle:true,
        luggage: false
      },
      image: "",
    
    },    
     { id: "002", // N = number, Z = Zone
      zone:1,
      name:"St 22 Station", 
      Southbound: "4:55, 5:25, 6:06, 6:24, 6:44, 6:56, 7:12, 7:19, 7:24, 7:44, 7:56, 8:12, 8:19, 8:24, 8:44, 8:56, 9:00, 9:37, 10:00, 11:00, 12:00, 1:00, 2:00, 2:37, 3:00, 3:37, 4:10, 4:19, 4:28, 4:33, 4:55, 5:12, 5:20, 5:28, 5:33, 5:55, 6:12, 6:20 6:28, 6:33, 6:55, 7:33, 8:40, 9:40, 10:40, 12:01",
      Northbound: "6:03, 6:38, 6:47, 7:22, 7:07, 7:51, 7:47, 8:03, 8:22, 8:07, 8:51, 8:47, 9:03, 9:27, 9:09, 9:50, 10:09, 10:50, 11:15, 11:50, 12:43, 1:43, 2:43, 3:50, 4:04, 4:40, 5:06, 5:32, 5:27, 5:43, 6:06, 5:49, 6:33, 6:27, 6:43, 7:06, 6:49, 7:32, 7:27, 7:43, 8:02, 8:23, 9:04, 10:04, 11:04, 12:04 ",
      vendors: "Tazza D'Amore (M-F 6a-7p; Sat 8a-3p), Subway sandwich, Bow-K Flowers",
      address: "700 4th St., San Francisco 94107",
      lat: "37.77639",
      long: "-122.394992",
      amnesties: {
        wheelchair: true,
        bicycle:true,
        luggage: false
      },
      image: "",
     
    },  
    { id: "007", // N = number, Z = Zone
      zone:6,
      name:"St 226 Station", 
      Southbound: "4:55, 5:25, 6:06, 6:24, 6:44, 6:56, 7:12, 7:19, 7:24, 7:44, 7:56, 8:12, 8:19, 8:24, 8:44, 8:56, 9:00, 9:37, 10:00, 11:00, 12:00, 1:00, 2:00, 2:37, 3:00, 3:37, 4:10, 4:19, 4:28, 4:33, 4:55, 5:12, 5:20, 5:28, 5:33, 5:55, 6:12, 6:20 6:28, 6:33, 6:55, 7:33, 8:40, 9:40, 10:40, 12:01",
      Northbound: "6:03, 6:38, 6:47, 7:22, 7:07, 7:51, 7:47, 8:03, 8:22, 8:07, 8:51, 8:47, 9:03, 9:27, 9:09, 9:50, 10:09, 10:50, 11:15, 11:50, 12:43, 1:43, 2:43, 3:50, 4:04, 4:40, 5:06, 5:32, 5:27, 5:43, 6:06, 5:49, 6:33, 6:27, 6:43, 7:06, 6:49, 7:32, 7:27, 7:43, 8:02, 8:23, 9:04, 10:04, 11:04, 12:04 ",
      vendors: "Tazza D'Amore (M-F 6a-7p; Sat 8a-3p), Subway sandwich, Bow-K Flowers",
      address: "700 4th St., San Francisco 94107",
      lat: "37.77639",
      long: "-122.394992",
      amnesties: {
        wheelchair: true,
        bicycle:true,
        luggage: false
      },
      image: "",
    }, 
]
