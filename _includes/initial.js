/*! zachleat.com - v2.1.5 - 2020-01-02
* Copyright (c) 2020 Zach Leatherman; MIT License */
var ZL = {
	getDistFolder: function() {
		var distMeta = document.querySelector( 'meta[name="dist"]' );

		return distMeta ? distMeta.content : '';
	},
	// Font loading Radio select emulator in footer
	setEmulatorRadioValue: function( value ) {
		var radios = document.querySelectorAll( '#fontloademu [name="fontloademu"]' );
		for( var j = 0, k = radios.length; j < k; j++ ) {
			radios[ j ].checked = value === radios[ j ].value;
		}
	}
};

;(function( doc ) {
	// IE9+
	if( !( 'geolocation' in navigator ) ) {
		return;
	}

	var classes = [ "enhanced-js" ];

	// Fonts
	if( sessionStorage.webfontStageOne && sessionStorage.webfontStageTwo ) {
		// Don’t push this class, webfont-stage-1 is just for the subset font (since full roman is layered on top, we don’t need it)
		// classes.push( "webfont-stage-1" );
		classes.push( "webfont-stage-2" );
	}

	document.documentElement.className += " " + classes.join( " " );
})( document );


;(function( doc ) {
	if( !( "fonts" in document ) ) {
		return;
	} else if( sessionStorage.webfontStageOne && sessionStorage.webfontStageTwo ) {
		return;
	}

	var docEl = doc.documentElement;
	document.fonts.load("1em LatoSubset").then(function() {
		docEl.classList.add( "webfont-stage-1" );
		sessionStorage.webfontStageOne = true;

		Promise.all([
			document.fonts.load("1em Lato"),
			document.fonts.load("700 1em LatoBold"),
			document.fonts.load("italic 1em LatoItalic"),
			document.fonts.load("italic 700 1em LatoBoldItalic")
		]).then(function () {
			docEl.classList.add( "webfont-stage-2" );
			sessionStorage.webfontStageTwo = true;
		});
	});

})( document );