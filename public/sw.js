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
				"/images/Luggage-Car.gif"
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
