




/*
     FILE ARCHIVED ON 1:44:46 Jun 29, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:42:52 Nov 9, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/**
 * This a slightly modified copy of the merchant_tools.js.
 *
 * It contains the new 
 *
 * @author  Ikaros Kappler
 * @date    2014-07-16
 * @version 1.0.0
 **/


/**
 * This function does not take any parameters. It will collect them from
 * the HTML form by its own.
 **/
function _publish_dildo_design() {


    // Fetch the dildoID (if already saved before)
    /*var dildoID     = -1;
    if( document.getElementById("dildoID") )
	dildoID = document.getElementById("dildoID").value;
    */
    var dildoID   = getCurrentDildoID();
    var dildoHash = getCurrentDildoHash();
    
    


    // This is a mandatory size check.
    // Each printer has a max X-Y-sized printing bed. This function call
    // checks if the created mesh would be out of bounds and asks the user
    // if he/she would like to continue though (if too large).
    // If everything is fine (size OK, or user wants to continue) the 
    // function returns true.
    //if( !checkSizeBeforeSaving() )
    //	return false;


    // Fetch form settings (some older versions of the HTML file might not 
    // yet have the form implemented). 
    if( !document.forms["publish_form"] ) {
	setStatus( "Sorry, it seems your HTML document is not up to date (publish_form missing). Look out for a newer version at Github." );
	return false;
    }

    var dildo_name         = document.forms[ "publish_form" ].elements[ "dong_name" ].value;
    var image_data         = document.forms[ "publish_form" ].elements[ "image_data" ].value;
    var bezier_image_data  = document.forms[ "publish_form" ].elements[ "bezier_image_data" ].value;
    var user_name          = document.forms[ "publish_form" ].elements[ "user_name" ].value;
    var email_address      = document.forms[ "publish_form" ].elements[ "email_address" ].value;
    var hide_email_address = document.forms[ "publish_form" ].elements[ "hide_email_address" ].checked;
    var allow_download     = document.forms[ "publish_form" ].elements[ "allow_download" ].checked;
    var keywords           = document.forms[ "publish_form" ].elements[ "keywords" ].value;

    
    // Attention!
    // The post data will be sent as multipart/form-data, which handles the 
    // characters '+' and '/' in a special way.
    // Use the alternative representation instead: replace '+' by '-' and replace '/' by '_'.
    var image_data_clean          = image_data.replace( /\+/g, "-" );
    image_data_clean              = image_data_clean.replace( /\//g, "_" );
    var bezier_image_data_clean   = bezier_image_data.replace( /\+/g, "-" );
    bezier_image_data_clean       = bezier_image_data_clean.replace( /\//g, "_" );

    // Currently there is no method to avoid editing a loaded bezier curve :(
    // Who wants to implement it?
    var allow_edit         = true; // document.forms[ "publish_form" ].elements[ "allow_edit" ].checked;



    // This function returns a JSON object containing all essential
    // settings. See ZipFileImporter.js for details.
    // Actually all form settings a stored into a JSON object, thus
    // makes it possible to restore the settings the user made each
    // time it's needed (part of the save/load cycle).
    var json_object = ZipFileExporter._build_export_data(); 


    var newURL      = _DILDO_CONFIG.PUBLISHING_URL;


    // This is the new version: an AJAX script that runs in background
    _publishDildo_asynchronousURLCall( newURL, 
				       dildoID,
				       dildoHash,
				       json_object,
				       
				       dildo_name,
				       image_data_clean,
				       bezier_image_data_clean,
				       user_name,
				       email_address,
				       hide_email_address,
				       allow_download,
				       allow_edit,
				       keywords
				     );

}

function _publishDildo_asynchronousURLCall( url, 
					    dildoID, 
					    dildoHash,
					    json_object,
					    
					    dildo_name,
					    image_data,
					    bezier_image_data,
					    user_name,
					    email_address,
					    hide_email_address,
					    allow_download,
					    allow_edit,
					    keywords
					  ) {

    // The createXMLHttpRequest function is defined in the main.js file
    var request   = createXMLHttpRequest();
    
    // Display a nice 'please wait' indicator
    startLoadingAnimation();
    document.getElementById( "loading_span_static" ).innerHTML = "Loading ...";


    var originb64         = Base64.encode( window.location.host );
    var originb64_clean   = originb64.replace( /\+/g, "-" );
    originb64_clean       = originb64_clean.replace( /\//g, "_" );

    //window.alert( bezier_image_data );

    // Build POST data
    var postData  = 
	"id="                 + dildoID                             + "&" +
	"public_hash="        + dildoHash                           + "&" +
	"bend="               + json_object.meshSettings.bendAngle  + "&" +
	"bezier_path="        + json_object.bezierPath.toJSON()     + "&" +
	"dildo_name="         + dildo_name                          + "&" +
	"user_name="          + user_name                           + "&" +
	"email_address="      + email_address                       + "&" +
	"hide_email_address=" + hide_email_address                  + "&" +
	"allow_download="     + allow_download                      + "&" +
	"allow_edit="         + allow_edit                          + "&" +
	"keywords="           + keywords                            + "&" +
	"originb64="          + originb64_clean                     + "&" + 
	"image_data="         + image_data                          + "&" + 
	"bezier_image_data="  + bezier_image_data                   + "&" + 
	"dummy="              + "Do_I_have_to_terminate_POST_data___question_mark";
    
    //window.alert( "originb64=" + originb64 );
    //window.alert( "postData=" + postData );

    
    request.onreadystatechange = function () {
	
	// Ready-State meanings:
	//  - 0: Uninitialized
	//  - 1: Open
	//  - 2: Sent
	//  - 3: Receiving
	//  - 4: Loaded       <- This is what we want :)
        if( request.readyState == 4 ) {
	    
	    // For debugging
	    //window.alert( request.responseText );
	    
	    if( request.status == 200 ) {
		// Everything OK. Model saved.
		
		// Fetch the ID.
		var split       = request.responseText.split(" ");
		if( split.length >=  2 ) {
		    var dildoID     = split[0];
		    var public_hash = split[1];
		
		    // Check if numeric
		    if( IKRS.Utils.isNumeric(dildoID) && IKRS.Utils.isHexadecimal(public_hash) ) {
			
			
			// (Re-)Store the ID into the HTML form (for later updates)
			/*
			  stopLoadingAnimation();
			  messageBox.show( "<br/>\n" +
			  "Your settings have been saved.<br/>\n" +
			  "(dildoID=" + dildoID + ")<br/>\n" +
			  "<br/>\n" +
			  "<button onclick=\"messageBox.hide()\">OK</button>\n"
			  );
			  setStatus( "Your settings have been saved. (id=" + dildoID + ")" );
			  document.getElementById( "dildoID" ).value = dildoID;
			*/
			window.setTimeout( "_publishDildo_succeeded(" + dildoID + ", '" + public_hash + "');", 1500 );

		    } else {
		    	
			stopLoadingAnimation();
			// Returned ID is NOT numeric.
			console.log( "Dildo was saved but returned ID/hash is not numeric (" + dildoID + ", " + public_hash + ")." );
			setStatus( "Dildo was saved but returned ID is not numeric (" + dildoID + ")." );
			messageBox.show( "<br/>Dildo was saved but returned ID/hash is not numeric (" + dildoID + ", " + public_hash + ").<br/>\n" +
					 "<br/>\n" +
					 "<button onclick=\"messageBox.hide()\">OK</button>\n" );
			
		    }
		} else {
		    // split.length < 2
		    stopLoadingAnimation();
		    // Returned ID is NOT numeric.
		    console.log( "Dildo was saved but returned result has illegal length (" + split.length + ")." );
		    setStatus( "Dildo was saved but returned result has illegal length (" + split.length + ")." );
		    messageBox.show( "<br/>Dildo was saved but returned result has illegal length (" + split.length + ").<br/>\n" +
				     "<br/>\n" +
				     "<button onclick=\"messageBox.hide()\">OK</button>\n" );
		}

	    } else {
		
		stopLoadingAnimation();
		console.log( "XMLHttpRequest returned HTTP status code " + request.status + " (" + request.statusText + "): " + request.responseText );
		setStatus( "Failed to save your settings!<br/>\n(HTTP status code " + request.status + ")" );
		messageBox.show( "<br/>Failed to save your settings!<br/>\n" +
				 "(HTTP status code " + request.status + ")<br/>\n" +
				 "<br/>\n" +
				 request.statusText + "<br/>\n" +
				 "<button onclick=\"messageBox.hide()\">Close</button>\n" );

	    } // END else [HTTP status code != 200]
	       
        } else {
	    // A different ready-state than 4 (ignore them!)

	    //stopLoadingAnimation();
	    console.log( "XMLHttpRequest returned readyState=" + request.readyState + ": " + request.responseText );
	    /*
	    setStatus( "Failed to save your settings!" );	    
	    messageBox.show( "<br/>Failed to save your settings!<br/>\n" +
			     "(readyState " + request.readyState + ")!<br/>\n" +
			     "<br/>\n" +
			     "<button onclick=\"messageBox.hide()\">OK</button>\n" );
	    */


	} // END else [ready state != 4]
    }; // END function

    //window.alert( "C" );
    request.open( "POST", url, true );
    request.setRequestHeader( "Content-Type", "application/x-www-form-urlencoded");
    request.setRequestHeader( "Content-Length", postData.length );
    request.setRequestHeader( "Connection", "close" );
    request.send( postData ); 

    //window.alert( "D" );

}


function _publishDildo_succeeded( dildoID, public_hash ) {
    
    stopLoadingAnimation();
    setCurrentDildoID( dildoID, public_hash );
    var openGalleryAction = "javascript:open_gallery('?public_hash=" + public_hash + "')";
    messageBox.show( "<br/>\n" +
		     "Your settings have been saved.<br/>\n" +
		     //<br/>"ID: <a href=\"" + openGalleryAction + "\">" + public_hash + "</a><br/>\n" +
		     "<br/>\n" +
		     "<img src=\"gallery/getPreviewImage.php?public_hash=" + public_hash + "\" width=\"128\" height\"192\" alt=\"uploaded dildo screenshot\" /><br/>\n" +
		     //"<a href=\"javascript:" + openGalleryAction + "\">View in gallery</a><br/>\n" +
		     "<a href=\"gallery/?public_hash=" + public_hash + "\" target=\"_blank\">View in gallery</a><br/>\n" +
		     "<br/>\n" +
		     "<button onclick=\"newScene(); messageBox.hide();\">New Scene</button>\n" +
		     "<button onclick=\"messageBox.hide();\">Continue editing</button>\n",
		     400,
		     400 // IKRS.MessageBox.DEFAULT_HEIGHT
		   );
    setStatus( "Your settings have been saved. ID: " + public_hash );
    
}