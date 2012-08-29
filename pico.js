// mini-pico-tiny convenience micro-framework, ymmv
function $(id){ return document.getElementById(id); }
function html(id, html){ $(id).innerHTML = html; }
function css(id, style){ $(id).style.cssText += ';'+style; }
function anim(id, transform, opacity, dur) {
  css(id, '-webkit-transition:-webkit-transform' +
	',opacity ' + (dur||0.5) + 's,' + (dur||0.5) + 's;-webkit-transform:' +
	transform + ';opacity:' + (1||opacity));
}
function bindEvent(el, eventName, eventHandler) {
	if (el.addEventListener){
		el.addEventListener(eventName, eventHandler, false);
	} else if (el.attachEvent){
		el.attachEvent('on'+eventName, eventHandler);
	}
} 
function stopEvent(e) {
	if (e.stopPropagation) e.stopPropagation();
	else e.cancelBubble = true;

	if (e.preventDefault) e.preventDefault();
	else e.returnValue = false;
}
function log(text) { if (console && typeof console.log === 'function') { console.log(text); } }
function collect(a,f){var n=[];for(var i=0;i<a.length;i++){var v=f(a[i]);if(v!=null)n.push(v)}return n};
// Native Upgrade Prototypes
String.prototype.trim = typeof (String.prototype.trim) != "undefined" ? String.prototype.trim : function() { return this.replace(/^\s\s*/, '').replace(/\s\s*$/, ''); };
// mini-pico-tiny ajax
var ajax={};
ajax.x=function(){try{return new ActiveXObject('Msxml2.XMLHTTP')}catch(e){try{return new ActiveXObject('Microsoft.XMLHTTP')}catch(e){return new XMLHttpRequest()}}};
ajax.serialize=function(f){var g=function(n){return f.getElementsByTagName(n)};var nv=function(e){if(e.name)return encodeURIComponent(e.name)+'='+encodeURIComponent(e.value);else return ''};var i=collect(g('input'),function(i){if((i.type!='radio'&&i.type!='checkbox')||i.checked)return nv(i)});var s=collect(g('select'),nv);var t=collect(g('textarea'),nv);return i.concat(s).concat(t).join('&');};
ajax.send=function(u,f,m,a){var x=ajax.x();x.open(m,u,true);x.onreadystatechange=function(){if(x.readyState==4)f(x.responseText)};if(m=='POST')x.setRequestHeader('Content-type','application/x-www-form-urlencoded');x.send(a)};
ajax.get=function(url,func){ajax.send(url,func,'GET')};
ajax.post=function(url,func,args){ajax.send(url,func,'POST',args)};
