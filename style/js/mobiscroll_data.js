(function($){function Scroller(elem,settings){var m,hi,v,dw,ww,wh,rwh,mw,mh,anim,debounce,that=this,ms=$.mobiscroll,e=elem,elm=$(e),theme,lang,s=extend({},defaults),pres={},warr=[],iv={},pixels={},input=elm.is('input'),visible=false;function isReadOnly(wh){if($.isArray(s.readonly)){var i=$('.dwwl',dw).index(wh);return s.readonly[i];}