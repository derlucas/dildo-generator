




/*
     FILE ARCHIVED ON 3:16:53 Jun 29, 2015 AND RETRIEVED FROM THE
     INTERNET ARCHIVE ON 17:43:18 Nov 9, 2016.
     JAVASCRIPT APPENDED BY WAYBACK MACHINE, COPYRIGHT INTERNET ARCHIVE.

     ALL OTHER CONTENT MAY ALSO BE PROTECTED BY COPYRIGHT (17 U.S.C.
     SECTION 108(a)(3)).
*/
Fx.Elements=new Class({Extends:Fx.CSS,initialize:function(B,A){this.elements=this.subject=$$(B);this.parent(A);},compute:function(G,H,I){var C={};for(var D in G){var A=G[D],E=H[D],F=C[D]={};
for(var B in A){F[B]=this.parent(A[B],E[B],I);}}return C;},set:function(B){for(var C in B){var A=B[C];for(var D in A){this.render(this.elements[C],D,A[D],this.options.unit);
}}return this;},start:function(C){if(!this.check(arguments.callee,C)){return this;}var H={},I={};for(var D in C){var F=C[D],A=H[D]={},G=I[D]={};for(var B in F){var E=this.prepare(this.elements[D],B,F[B]);
A[B]=E.from;G[B]=E.to;}}return this.parent(H,I);}});