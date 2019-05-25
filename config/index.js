const Config = function () {
	return {
		appMode:	"production",
		// appMode:	"development",
		appPort:	"80",

		dbPath: 	"mongodb://localhost:27017/edutTest",

		pathStatic: "public",
	};
};

module.exports = new Config();
