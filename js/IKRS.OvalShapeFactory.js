




/*
     FILE ARCHIVED ON 3:47:08 Jun 29, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:43:23 Nov 9, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
/**
 * This is the shape factory for making ovals.
 *
 * @author  Ikaros Kappler
 * @date    2014-07-03
 * @version 1.0.0
 **/ 

IKRS.OvalShapeFactory = function( radiusX,
				  radiusY,
				  startAngle,
				  arc 
				) {
    
    IKRS.ShapeFactory.call( this, "Oval" );
    
    this.radiusX             = radiusX;
    this.radiusY             = radiusY;
    this.startAngle          = startAngle;
    this.arc                 = arc;

};


IKRS.OvalShapeFactory.prototype             = new IKRS.Object();
IKRS.OvalShapeFactory.prototype.constructor = IKRS.ShapeFactory;


/**
 * This function creates the points for a circle shape (with the given segment count).
 **/
IKRS.OvalShapeFactory.prototype.createShapePoints = function( segmentCount ) {
    
    var shapePoints = [];

    // If the mesh is split, the shape will be split into two halfs. 
    // -> eventually divide the shape's segment count by two.
    for( i = 0; i <= segmentCount; i++ ) {

	var pct = i * (1.0/segmentCount);
	var angle = this.startAngle + this.arc * pct;	    
	shapePoints.push( new THREE.Vector3( Math.sin( angle ) * this.radiusX,
					     Math.cos( angle ) * this.radiusY,
					     0
					   )
			);
    }
    
    return shapePoints;
};

