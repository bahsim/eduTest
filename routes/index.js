
const path = require('path');

module.exports = (app, db) => {
	app.get("/admin*", (req, res) => {
		res.sendFile(path.join(__dirname, '..','ui/pages/administrator/index.html'));
  });
	
	app.get("/api/admin/regions", (req, res) => {
		res.json([{}, {}, {}])
	})
}
