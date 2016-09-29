this.addEventListener("install", event => {
	event.waitUntil(
		caches.open("train-v1").then(cache => {
			return cache.addAll([
				"/",
				"/index.html",
				"/favicon.ico",
				"/bootstrap.css",
				"/images/Access-Car.gif",
				"/images/Bike-car.gif",
				"/images/Luggage-Car.gif",
				"/static/css/main.c28c8e33.css",
				"/static/css/main.c28c8e33.css.map",
				"/static/js/main.7c0e1a57.js",
				"/static/js/main.7c0e1a57.js.map"
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
