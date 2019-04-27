const Config = function () {
	return {
		// appMode:	"production",
		appMode:	"development",
		appPort:	"80",
		
		dbName:		"eduTest",
		dbPath: 	"mongodb://localhost:27017", 
		
		pathStatic: "ui/dist",
	};
};

module.exports = new Config();