var staticCacheName = "train-v1";

this.addEventListener("install", event => {
	//caches waitUntil all resources has been added
	event.waitUntil(
		caches.open(staticCacheName).then(cache => {
			return cache.addAll([
				"/",
				"/index.html",
				"/favicon.ico",
				"/bootstrap/css/bootstrap.css",
				"/bootstrap/fonts/glyphicons-halflings-regular.eot",
				"/bootstrap/fonts/glyphicons-halflings-regular.svg",
				"/bootstrap/fonts/glyphicons-halflings-regular.ttf",
				"/bootstrap/fonts/glyphicons-halflings-regular.woff",
				"/bootstrap/fonts/glyphicons-halflings-regular.woff2",				
				"/static/css/main.9ee545ee.css",
				"/static/css/main.9ee545ee.css.map",
				"/static/js/main.8b71c999.js",
				"/static/js/main.8b71c999.js.map",
				
				// ---- images -------
				"/images/Caltrain_Zone_Map.png",
				"/images/22nd_Street.jpg",
				"/images/Access-Car.gif",
				"/images/Atherton_Station.jpg",
				"/images/Bayshore_Station.jpg",
				"/images/Belmont_Station.jpg",
				"/images/Bike-car.gif",
				"/images/Blossom_Hill_Station.jpg",
				"/images/Broadway_Station.jpg",
				"/images/Burlingame_Station.jpg",
				"/images/California_Avenue_Station.jpg",
				"/images/Capitol_Station.jpg",
				"/images/College_Park_Station.jpg",
				"/images/Gilroy_Station.jpg",
				"/images/Hayward_Park.jpg",
				"/images/Hillsdale_Station.jpg",
				"/images/Lawrence_Station.jpg",
				"/images/Luggage-Car.gif",
				"/images/Menlo_Park_Station.jpg",
				"/images/Millbrae_Transit_Center.jpg",
				"/images/Morgan_Hill_Station.jpg",
				"/images/Mountain_View_Station.jpg",
				"/images/Palo_Alto_Station.jpg",
				"/images/Redwood_City_Station_sign.jpg",
				"/images/San Francisco Station.jpg",
				"/images/San_Antonio_Station.jpg",
				"/images/San_Bruno.jpg",
				"/images/San_Carlos_Station.jpg",
				"/images/San_Francisco_Station.jpg",
				"/images/San_Jose_Diridon_Station.jpg",
				"/images/San_Martin_Station.jpg",
				"/images/San_Mateo_Station.jpg",
				"/images/Santa_Clara_Station.jpg",
				"/images/South_San_Francisco_Station.jpg",
				"/images/Stanford_Station.jpg",
				"/images/Sunnyvale_Station.jpg",
				"/images/Tamien.jpg",
			])
		})
	)
});

this.addEventListener("fetch", function(event){
	event.respondWith(
		caches.match(event.request)
		      .then(function(res){
					return res || fetch(event.request)
		      }));
});

this.addEventListener("activate", function(event){
	event.waitUntil(
		caches.keys()
		      .then(function(cacheNames){
		      	return Promise.all(
			      	cacheNames.filter(function(name){
			      		return name.startsWith('train-') && name != staticCacheName;
			      	}).map(function(cacheName){
			      		return cache.delete(cacheName)
			      	})
			    );
		})
	)
})
