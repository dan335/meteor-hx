Package.describe({
	name: "danimal:hx",
	summary: "Library for hex grids.",
	version: "1.0.9",
	git: "https://github.com/dan335/meteor-hx.git"
});

Package.onUse(function(api) {
  api.versionsFrom('1.2');
	api.use(['underscore', 'check']);
  api.export('Hx');
  api.addFiles('hx.js');
});
