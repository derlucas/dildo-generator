




/*
     FILE ARCHIVED ON 1:45:13 Jun 29, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:42:51 Nov 9, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/

/**
 * This script creates a dummy console for browsers that do not support the
 * console natively.
 *
 * Found at and thanks to
 * /web/20150629014513/http://opensourcehacker.com/2011/03/15/everyone-loves-and-hates-console-log/
 * 
 **/

if( typeof(window.console) == "undefined" ) { 
    console = {}; 
    console.log = console.warn = console.error = function(a) {}; 
}
