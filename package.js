Package.describe({
	name: "danimal:hx",
	summary: "Library for hex grids.",
	version: "1.0.1",
	git: "https://github.com/dan335/meteor-hx.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR-CORE@0.9.0-rc12');
  api.export('Hx', ['client', 'server'])
  api.addFiles('hx.js');
});