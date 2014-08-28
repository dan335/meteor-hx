Package.describe({
	name: "danimal:hx",
	summary: "Library for hex grids.",
	version: "0.0.1",
	git: " \* Fill me in! *\ "
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR-CORE@0.9.0-rc12');
  api.export('Hx', ['client', 'server'])
  api.addFiles('hx.js');
});

// Package.onTest(function(api) {
//   api.use('tinytest');
//   api.use('danimal:hex');
//   api.addFiles('danimal:hex-tests.js');
// });
