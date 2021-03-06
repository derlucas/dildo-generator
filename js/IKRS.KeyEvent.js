




/*
     FILE ARCHIVED ON 5:33:20 Jun 29, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:43:19 Nov 9, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/**
 * This is a wrapper class for javascript key events.
 *
 * Native javascript events are very simple and not comfortable
 * to use.
 *
 * This adds some extra features to the event.
 *
 * @authos  Ikaros Kappler
 * @version 1.0.0
 * @date    2014-08-11
 **/


IKRS.KeyEvent = function( keyEvent ) {
    
    IKRS.Object.call( this );

    this.keyEvent = keyEvent;
};


IKRS.KeyEvent.prototype             = new IKRS.Object();
IKRS.KeyEvent.prototype.constructor = IKRS.KeyEvent;

IKRS.KeyEvent.prototype.getKeyCode  = function() {
    return this.keyEvent.keyCode;
};

IKRS.KeyEvent.prototype.isShiftKey  = function() {
    return this.keyEvent.keyCode == 16;
};

IKRS.KeyEvent.prototype.isControlKey = function() {
    return this.keyEvent.keyCode == 17;
};

IKRS.KeyEvent.prototype.isAltKey = function() {
    return this.keyEvent.keyCode == 18;
};

/**
 * Pass a character (one-character string) and the function checks
 * if the passed character matches this event's key code.
 **/
IKRS.KeyEvent.prototype.isCharacterKey = function( character ) {
    if( character.length == 0 )
	return false;
    else
	return this.keyEvent.keyCode == character.substring(0,1).toUpperCase().charCodeAt(0);
};

