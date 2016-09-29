this.addEventListener("install", event => {
	event.waitUntil(
		caches.open("train-v1").then(cache => {
			return cache.addAll([
				"/",
				"/index.html",
				"/favicon.ico",
				"/bootstrap.css",
				"/static/css/main.f9541ae4.css",
				"/static/css/main.f9541ae4.css.map",
				"/static/js/main.f6459f8a.js",
				"/static/js/main.f6459f8a.js.map",
				
				// ---- media ------
				"/static/media/glyphicons-halflings-regular.448c34a5.woff2",
				"/static/media/glyphicons-halflings-regular.89889688.svg",
				"/static/media/glyphicons-halflings-regular.e18bbf61.ttf",
				"/static/media/glyphicons-halflings-regular.f4769f9b.eot",
				"/static/media/glyphicons-halflings-regular.fa277232.woff",
				
				// ---- images -------
				"/images/Access-Car.gif",
				"/images/Bike-car.gif",
				"/images/Luggage-Car.gif",
				"/images/22nd_Street.jpg",
				"/images/Bayshore_Station.jpg",
				"/images/Broadway_Station.jpg",
				"/images/Hayward_Park.jpg",
				"/images/Hillsdale_Station.jpg",
				"/images/Millbrae_Transit_Center.jpg",
				"/images/San_Bruno.jpg",
				"/images/San_Francisco_Station.jpg",
				"/images/San_Mateo_Station.jpg",
				"/images/South_San_Francisco_Station.jpg",
			])
		})
	)
});

this.addEventListener("fetch", function(event){
	event.respondWith(
		caches.match(event.request).then(function(res){
			return res || fetch(event.request)
		})
	)
})
