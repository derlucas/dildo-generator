




/*
     FILE ARCHIVED ON 4:17:41 Jun 29, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:42:52 Nov 9, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/

/**
 * @author Ikaros Kappler
 * @date 2013-08-22
 * @version 1.0.0
 **/


function saveTextFile( stringData, filename, mimeType ) {

    if( !filename )
	filename = "stringData.txt";
    if( !mimeType )
	mimeType = "text/plain";
    
    var blob = new Blob([stringData], {type: mimeType});
    saveAs(blob, filename);
    
}