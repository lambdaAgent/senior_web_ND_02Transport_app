var fs = require("fs");
fs.readdir("./images", (err, files) => {
	files.map(f=>{
		var file = `"/images/${f}",`
		console.log(file )
	})
})