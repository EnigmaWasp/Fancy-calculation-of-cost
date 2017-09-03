// Loading prices

var prices = new Array();

$(document).ready(function(){
	$.ajax({
		type: "GET",
		url: "templates/xml/price.xml",
		dataType: "xml",
		success: function getXMLToArray(xml) {
			if($(xml).children().length > 0){
			//Foreach Node found
			$(xml).children().each(function(){    
				if($(xml).find(this.nodeName).children().length > 0){
				//If it has children recursively get the inner array
				var NextNode = $(xml).find(this.nodeName);
				prices[this.nodeName] = getXMLToArray(NextNode);
				} else {
				//If not then store the next value to the current array
				prices[this.nodeName] = $(xml).find(this.nodeName).text();
				}
			});
			}
		}
	});
});

console.log(prices);

/*
 * jQuery 2d Transform v0.9.3
 * http://wiki.github.com/heygrady/transform/
 *
 * Copyright 2010, Grady Kuhnline
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 * 
 * Date: Sat Dec 4 15:46:09 2010 -0800
 */
(function(f,g,j,b){var h=/progid:DXImageTransform\.Microsoft\.Matrix\(.*?\)/,c=/^([\+\-]=)?([\d+.\-]+)(.*)$/,q=/%/;var d=j.createElement("modernizr"),e=d.style;function n(s){return parseFloat(s)}function l(){var s={transformProperty:"",MozTransform:"-moz-",WebkitTransform:"-webkit-",OTransform:"-o-",msTransform:"-ms-"};for(var t in s){if(typeof e[t]!="undefined"){return s[t]}}return null}function r(){if(typeof(g.Modernizr)!=="undefined"){return Modernizr.csstransforms}var t=["transformProperty","WebkitTransform","MozTransform","OTransform","msTransform"];for(var s in t){if(e[t[s]]!==b){return true}}}var a=l(),i=a!==null?a+"transform":false,k=a!==null?a+"transform-origin":false;f.support.csstransforms=r();if(a=="-ms-"){i="msTransform";k="msTransformOrigin"}f.extend({transform:function(s){s.transform=this;this.$elem=f(s);this.applyingMatrix=false;this.matrix=null;this.height=null;this.width=null;this.outerHeight=null;this.outerWidth=null;this.boxSizingValue=null;this.boxSizingProperty=null;this.attr=null;this.transformProperty=i;this.transformOriginProperty=k}});f.extend(f.transform,{funcs:["matrix","origin","reflect","reflectX","reflectXY","reflectY","rotate","scale","scaleX","scaleY","skew","skewX","skewY","translate","translateX","translateY"]});f.fn.transform=function(s,t){return this.each(function(){var u=this.transform||new f.transform(this);if(s){u.exec(s,t)}})};f.transform.prototype={exec:function(s,t){t=f.extend(true,{forceMatrix:false,preserve:false},t);this.attr=null;if(t.preserve){s=f.extend(true,this.getAttrs(true,true),s)}else{s=f.extend(true,{},s)}this.setAttrs(s);if(f.support.csstransforms&&!t.forceMatrix){return this.execFuncs(s)}else{if(f.browser.msie||(f.support.csstransforms&&t.forceMatrix)){return this.execMatrix(s)}}return false},execFuncs:function(t){var s=[];for(var u in t){if(u=="origin"){this[u].apply(this,f.isArray(t[u])?t[u]:[t[u]])}else{if(f.inArray(u,f.transform.funcs)!==-1){s.push(this.createTransformFunc(u,t[u]))}}}this.$elem.css(i,s.join(" "));return true},execMatrix:function(z){var C,x,t;var F=this.$elem[0],B=this;function A(N,M){if(q.test(N)){return parseFloat(N)/100*B["safeOuter"+(M?"Height":"Width")]()}return o(F,N)}var s=/translate[X|Y]?/,u=[];for(var v in z){switch(f.type(z[v])){case"array":t=z[v];break;case"string":t=f.map(z[v].split(","),f.trim);break;default:t=[z[v]]}if(f.matrix[v]){if(f.cssAngle[v]){t=f.map(t,f.angle.toDegree)}else{if(!f.cssNumber[v]){t=f.map(t,A)}else{t=f.map(t,n)}}x=f.matrix[v].apply(this,t);if(s.test(v)){u.push(x)}else{C=C?C.x(x):x}}else{if(v=="origin"){this[v].apply(this,t)}}}C=C||f.matrix.identity();f.each(u,function(M,N){C=C.x(N)});var K=parseFloat(C.e(1,1).toFixed(6)),I=parseFloat(C.e(2,1).toFixed(6)),H=parseFloat(C.e(1,2).toFixed(6)),G=parseFloat(C.e(2,2).toFixed(6)),L=C.rows===3?parseFloat(C.e(1,3).toFixed(6)):0,J=C.rows===3?parseFloat(C.e(2,3).toFixed(6)):0;if(f.support.csstransforms&&a==="-moz-"){this.$elem.css(i,"matrix("+K+", "+I+", "+H+", "+G+", "+L+"px, "+J+"px)")}else{if(f.support.csstransforms){this.$elem.css(i,"matrix("+K+", "+I+", "+H+", "+G+", "+L+", "+J+")")}else{if(f.browser.msie){var w=", FilterType='nearest neighbor'";var D=this.$elem[0].style;var E="progid:DXImageTransform.Microsoft.Matrix(M11="+K+", M12="+H+", M21="+I+", M22="+G+", sizingMethod='auto expand'"+w+")";var y=D.filter||f.curCSS(this.$elem[0],"filter")||"";D.filter=h.test(y)?y.replace(h,E):y?y+" "+E:E;this.applyingMatrix=true;this.matrix=C;this.fixPosition(C,L,J);this.applyingMatrix=false;this.matrix=null}}}return true},origin:function(s,t){if(f.support.csstransforms){if(typeof t==="undefined"){this.$elem.css(k,s)}else{this.$elem.css(k,s+" "+t)}return true}switch(s){case"left":s="0";break;case"right":s="100%";break;case"center":case b:s="50%"}switch(t){case"top":t="0";break;case"bottom":t="100%";break;case"center":case b:t="50%"}this.setAttr("origin",[q.test(s)?s:o(this.$elem[0],s)+"px",q.test(t)?t:o(this.$elem[0],t)+"px"]);return true},createTransformFunc:function(t,u){if(t.substr(0,7)==="reflect"){var s=u?f.matrix[t]():f.matrix.identity();return"matrix("+s.e(1,1)+", "+s.e(2,1)+", "+s.e(1,2)+", "+s.e(2,2)+", 0, 0)"}if(t=="matrix"){if(a==="-moz-"){u[4]=u[4]?u[4]+"px":0;u[5]=u[5]?u[5]+"px":0}}return t+"("+(f.isArray(u)?u.join(", "):u)+")"},fixPosition:function(B,y,x,D,s){var w=new f.matrix.calc(B,this.safeOuterHeight(),this.safeOuterWidth()),C=this.getAttr("origin");var v=w.originOffset(new f.matrix.V2(q.test(C[0])?parseFloat(C[0])/100*w.outerWidth:parseFloat(C[0]),q.test(C[1])?parseFloat(C[1])/100*w.outerHeight:parseFloat(C[1])));var t=w.sides();var u=this.$elem.css("position");if(u=="static"){u="relative"}var A={top:0,left:0};var z={position:u,top:(v.top+x+t.top+A.top)+"px",left:(v.left+y+t.left+A.left)+"px",zoom:1};this.$elem.css(z)}};function o(s,u){var t=c.exec(f.trim(u));if(t[3]&&t[3]!=="px"){var w="paddingBottom",v=f.style(s,w);f.style(s,w,u);u=p(s,w);f.style(s,w,v);return u}return parseFloat(u)}function p(t,u){if(t[u]!=null&&(!t.style||t.style[u]==null)){return t[u]}var s=parseFloat(f.css(t,u));return s&&s>-10000?s:0}})(jQuery,this,this.document);(function(d,c,a,f){d.extend(d.transform.prototype,{safeOuterHeight:function(){return this.safeOuterLength("height")},safeOuterWidth:function(){return this.safeOuterLength("width")},safeOuterLength:function(l){var p="outer"+(l=="width"?"Width":"Height");if(!d.support.csstransforms&&d.browser.msie){l=l=="width"?"width":"height";if(this.applyingMatrix&&!this[p]&&this.matrix){var k=new d.matrix.calc(this.matrix,1,1),n=k.offset(),g=this.$elem[p]()/n[l];this[p]=g;return g}else{if(this.applyingMatrix&&this[p]){return this[p]}}var o={height:["top","bottom"],width:["left","right"]};var h=this.$elem[0],j=parseFloat(d.curCSS(h,l,true)),q=this.boxSizingProperty,i=this.boxSizingValue;if(!this.boxSizingProperty){q=this.boxSizingProperty=e()||"box-sizing";i=this.boxSizingValue=this.$elem.css(q)||"content-box"}if(this[p]&&this[l]==j){return this[p]}else{this[l]=j}if(q&&(i=="padding-box"||i=="content-box")){j+=parseFloat(d.curCSS(h,"padding-"+o[l][0],true))||0+parseFloat(d.curCSS(h,"padding-"+o[l][1],true))||0}if(q&&i=="content-box"){j+=parseFloat(d.curCSS(h,"border-"+o[l][0]+"-width",true))||0+parseFloat(d.curCSS(h,"border-"+o[l][1]+"-width",true))||0}this[p]=j;return j}return this.$elem[p]()}});var b=null;function e(){if(b){return b}var h={boxSizing:"box-sizing",MozBoxSizing:"-moz-box-sizing",WebkitBoxSizing:"-webkit-box-sizing",OBoxSizing:"-o-box-sizing"},g=a.body;for(var i in h){if(typeof g.style[i]!="undefined"){b=h[i];return b}}return null}})(jQuery,this,this.document);(function(g,f,b,h){var d=/([\w\-]*?)\((.*?)\)/g,a="data-transform",e=/\s/,c=/,\s?/;g.extend(g.transform.prototype,{setAttrs:function(i){var j="",l;for(var k in i){l=i[k];if(g.isArray(l)){l=l.join(", ")}j+=" "+k+"("+l+")"}this.attr=g.trim(j);this.$elem.attr(a,this.attr)},setAttr:function(k,l){if(g.isArray(l)){l=l.join(", ")}var j=this.attr||this.$elem.attr(a);if(!j||j.indexOf(k)==-1){this.attr=g.trim(j+" "+k+"("+l+")");this.$elem.attr(a,this.attr)}else{var i=[],n;d.lastIndex=0;while(n=d.exec(j)){if(k==n[1]){i.push(k+"("+l+")")}else{i.push(n[0])}}this.attr=i.join(" ");this.$elem.attr(a,this.attr)}},getAttrs:function(){var j=this.attr||this.$elem.attr(a);if(!j){return{}}var i={},l,k;d.lastIndex=0;while((l=d.exec(j))!==null){if(l){k=l[2].split(c);i[l[1]]=k.length==1?k[0]:k}}return i},getAttr:function(j){var i=this.getAttrs();if(typeof i[j]!=="undefined"){return i[j]}if(j==="origin"&&g.support.csstransforms){return this.$elem.css(this.transformOriginProperty).split(e)}else{if(j==="origin"){return["50%","50%"]}}return g.cssDefault[j]||0}});if(typeof(g.cssAngle)=="undefined"){g.cssAngle={}}g.extend(g.cssAngle,{rotate:true,skew:true,skewX:true,skewY:true});if(typeof(g.cssDefault)=="undefined"){g.cssDefault={}}g.extend(g.cssDefault,{scale:[1,1],scaleX:1,scaleY:1,matrix:[1,0,0,1,0,0],origin:["50%","50%"],reflect:[1,0,0,1,0,0],reflectX:[1,0,0,1,0,0],reflectXY:[1,0,0,1,0,0],reflectY:[1,0,0,1,0,0]});if(typeof(g.cssMultipleValues)=="undefined"){g.cssMultipleValues={}}g.extend(g.cssMultipleValues,{matrix:6,origin:{length:2,duplicate:true},reflect:6,reflectX:6,reflectXY:6,reflectY:6,scale:{length:2,duplicate:true},skew:2,translate:2});g.extend(g.cssNumber,{matrix:true,reflect:true,reflectX:true,reflectXY:true,reflectY:true,scale:true,scaleX:true,scaleY:true});g.each(g.transform.funcs,function(j,k){g.cssHooks[k]={set:function(n,o){var l=n.transform||new g.transform(n),i={};i[k]=o;l.exec(i,{preserve:true})},get:function(n,l){var i=n.transform||new g.transform(n);return i.getAttr(k)}}});g.each(["reflect","reflectX","reflectXY","reflectY"],function(j,k){g.cssHooks[k].get=function(n,l){var i=n.transform||new g.transform(n);return i.getAttr("matrix")||g.cssDefault[k]}})})(jQuery,this,this.document);(function(e,g,h,c){var d=/^([+\-]=)?([\d+.\-]+)(.*)$/;var a=e.fn.animate;e.fn.animate=function(p,l,o,n){var k=e.speed(l,o,n),j=e.cssMultipleValues;k.complete=k.old;if(!e.isEmptyObject(p)){if(typeof k.original==="undefined"){k.original={}}e.each(p,function(s,u){if(j[s]||e.cssAngle[s]||(!e.cssNumber[s]&&e.inArray(s,e.transform.funcs)!==-1)){var t=null;if(jQuery.isArray(p[s])){var r=1,q=u.length;if(j[s]){r=(typeof j[s].length==="undefined"?j[s]:j[s].length)}if(q>r||(q<r&&q==2)||(q==2&&r==2&&isNaN(parseFloat(u[q-1])))){t=u[q-1];u.splice(q-1,1)}}k.original[s]=u.toString();p[s]=parseFloat(u)}})}return a.apply(this,[arguments[0],k])};var b="paddingBottom";function i(k,l){if(k[l]!=null&&(!k.style||k.style[l]==null)){}var j=parseFloat(e.css(k,l));return j&&j>-10000?j:0}var f=e.fx.prototype.custom;e.fx.prototype.custom=function(u,v,w){var y=e.cssMultipleValues[this.prop],p=e.cssAngle[this.prop];if(y||(!e.cssNumber[this.prop]&&e.inArray(this.prop,e.transform.funcs)!==-1)){this.values=[];if(!y){y=1}var x=this.options.original[this.prop],t=e(this.elem).css(this.prop),j=e.cssDefault[this.prop]||0;if(!e.isArray(t)){t=[t]}if(!e.isArray(x)){if(e.type(x)==="string"){x=x.split(",")}else{x=[x]}}var l=y.length||y,s=0;while(x.length<l){x.push(y.duplicate?x[0]:j[s]||0);s++}var k,r,q,o=this,n=o.elem.transform;orig=e.style(o.elem,b);e.each(x,function(z,A){if(t[z]){k=t[z]}else{if(j[z]&&!y.duplicate){k=j[z]}else{if(y.duplicate){k=t[0]}else{k=0}}}if(p){k=e.angle.toDegree(k)}else{if(!e.cssNumber[o.prop]){r=d.exec(e.trim(k));if(r[3]&&r[3]!=="px"){if(r[3]==="%"){k=parseFloat(r[2])/100*n["safeOuter"+(z?"Height":"Width")]()}else{e.style(o.elem,b,k);k=i(o.elem,b);e.style(o.elem,b,orig)}}}}k=parseFloat(k);r=d.exec(e.trim(A));if(r){q=parseFloat(r[2]);w=r[3]||"px";if(p){q=e.angle.toDegree(q+w);w="deg"}else{if(!e.cssNumber[o.prop]&&w==="%"){k=(k/n["safeOuter"+(z?"Height":"Width")]())*100}else{if(!e.cssNumber[o.prop]&&w!=="px"){e.style(o.elem,b,(q||1)+w);k=((q||1)/i(o.elem,b))*k;e.style(o.elem,b,orig)}}}if(r[1]){q=((r[1]==="-="?-1:1)*q)+k}}else{q=A;w=""}o.values.push({start:k,end:q,unit:w})})}return f.apply(this,arguments)};e.fx.multipleValueStep={_default:function(j){e.each(j.values,function(k,l){j.values[k].now=l.start+((l.end-l.start)*j.pos)})}};e.each(["matrix","reflect","reflectX","reflectXY","reflectY"],function(j,k){e.fx.multipleValueStep[k]=function(n){var p=n.decomposed,l=e.matrix;m=l.identity();p.now={};e.each(p.start,function(q){p.now[q]=parseFloat(p.start[q])+((parseFloat(p.end[q])-parseFloat(p.start[q]))*n.pos);if(((q==="scaleX"||q==="scaleY")&&p.now[q]===1)||(q!=="scaleX"&&q!=="scaleY"&&p.now[q]===0)){return true}m=m.x(l[q](p.now[q]))});var o;e.each(n.values,function(q){switch(q){case 0:o=parseFloat(m.e(1,1).toFixed(6));break;case 1:o=parseFloat(m.e(2,1).toFixed(6));break;case 2:o=parseFloat(m.e(1,2).toFixed(6));break;case 3:o=parseFloat(m.e(2,2).toFixed(6));break;case 4:o=parseFloat(m.e(1,3).toFixed(6));break;case 5:o=parseFloat(m.e(2,3).toFixed(6));break}n.values[q].now=o})}});e.each(e.transform.funcs,function(j,k){e.fx.step[k]=function(o){var n=o.elem.transform||new e.transform(o.elem),l={};if(e.cssMultipleValues[k]||(!e.cssNumber[k]&&e.inArray(k,e.transform.funcs)!==-1)){(e.fx.multipleValueStep[o.prop]||e.fx.multipleValueStep._default)(o);l[o.prop]=[];e.each(o.values,function(p,q){l[o.prop].push(q.now+(e.cssNumber[o.prop]?"":q.unit))})}else{l[o.prop]=o.now+(e.cssNumber[o.prop]?"":o.unit)}n.exec(l,{preserve:true})}});e.each(["matrix","reflect","reflectX","reflectXY","reflectY"],function(j,k){e.fx.step[k]=function(q){var p=q.elem.transform||new e.transform(q.elem),o={};if(!q.initialized){q.initialized=true;if(k!=="matrix"){var n=e.matrix[k]().elements;var r;e.each(q.values,function(s){switch(s){case 0:r=n[0];break;case 1:r=n[2];break;case 2:r=n[1];break;case 3:r=n[3];break;default:r=0}q.values[s].end=r})}q.decomposed={};var l=q.values;q.decomposed.start=e.matrix.matrix(l[0].start,l[1].start,l[2].start,l[3].start,l[4].start,l[5].start).decompose();q.decomposed.end=e.matrix.matrix(l[0].end,l[1].end,l[2].end,l[3].end,l[4].end,l[5].end).decompose()}(e.fx.multipleValueStep[q.prop]||e.fx.multipleValueStep._default)(q);o.matrix=[];e.each(q.values,function(s,t){o.matrix.push(t.now)});p.exec(o,{preserve:true})}})})(jQuery,this,this.document);(function(g,h,j,c){var d=180/Math.PI;var k=200/Math.PI;var f=Math.PI/180;var e=2/1.8;var i=0.9;var a=Math.PI/200;var b=/^([+\-]=)?([\d+.\-]+)(.*)$/;g.extend({angle:{runit:/(deg|g?rad)/,radianToDegree:function(l){return l*d},radianToGrad:function(l){return l*k},degreeToRadian:function(l){return l*f},degreeToGrad:function(l){return l*e},gradToDegree:function(l){return l*i},gradToRadian:function(l){return l*a},toDegree:function(n){var l=b.exec(n);if(l){n=parseFloat(l[2]);switch(l[3]||"deg"){case"grad":n=g.angle.gradToDegree(n);break;case"rad":n=g.angle.radianToDegree(n);break}return n}return 0}}})})(jQuery,this,this.document);(function(f,e,b,g){if(typeof(f.matrix)=="undefined"){f.extend({matrix:{}})}var d=f.matrix;f.extend(d,{V2:function(h,i){if(f.isArray(arguments[0])){this.elements=arguments[0].slice(0,2)}else{this.elements=[h,i]}this.length=2},V3:function(h,j,i){if(f.isArray(arguments[0])){this.elements=arguments[0].slice(0,3)}else{this.elements=[h,j,i]}this.length=3},M2x2:function(i,h,k,j){if(f.isArray(arguments[0])){this.elements=arguments[0].slice(0,4)}else{this.elements=Array.prototype.slice.call(arguments).slice(0,4)}this.rows=2;this.cols=2},M3x3:function(n,l,k,j,i,h,q,p,o){if(f.isArray(arguments[0])){this.elements=arguments[0].slice(0,9)}else{this.elements=Array.prototype.slice.call(arguments).slice(0,9)}this.rows=3;this.cols=3}});var c={e:function(k,h){var i=this.rows,j=this.cols;if(k>i||h>i||k<1||h<1){return 0}return this.elements[(k-1)*j+h-1]},decompose:function(){var v=this.e(1,1),t=this.e(2,1),q=this.e(1,2),p=this.e(2,2),o=this.e(1,3),n=this.e(2,3);if(Math.abs(v*p-t*q)<0.01){return{rotate:0+"deg",skewX:0+"deg",scaleX:1,scaleY:1,translateX:0+"px",translateY:0+"px"}}var l=o,j=n;var u=Math.sqrt(v*v+t*t);v=v/u;t=t/u;var i=v*q+t*p;q-=v*i;p-=t*i;var s=Math.sqrt(q*q+p*p);q=q/s;p=p/s;i=i/s;if((v*p-t*q)<0){v=-v;t=-t;u=-u}var w=f.angle.radianToDegree;var h=w(Math.atan2(t,v));i=w(Math.atan(i));return{rotate:h+"deg",skewX:i+"deg",scaleX:u,scaleY:s,translateX:l+"px",translateY:j+"px"}}};f.extend(d.M2x2.prototype,c,{toM3x3:function(){var h=this.elements;return new d.M3x3(h[0],h[1],0,h[2],h[3],0,0,0,1)},x:function(j){var k=typeof(j.rows)==="undefined";if(!k&&j.rows==3){return this.toM3x3().x(j)}var i=this.elements,h=j.elements;if(k&&h.length==2){return new d.V2(i[0]*h[0]+i[1]*h[1],i[2]*h[0]+i[3]*h[1])}else{if(h.length==i.length){return new d.M2x2(i[0]*h[0]+i[1]*h[2],i[0]*h[1]+i[1]*h[3],i[2]*h[0]+i[3]*h[2],i[2]*h[1]+i[3]*h[3])}}return false},inverse:function(){var i=1/this.determinant(),h=this.elements;return new d.M2x2(i*h[3],i*-h[1],i*-h[2],i*h[0])},determinant:function(){var h=this.elements;return h[0]*h[3]-h[1]*h[2]}});f.extend(d.M3x3.prototype,c,{x:function(j){var k=typeof(j.rows)==="undefined";if(!k&&j.rows<3){j=j.toM3x3()}var i=this.elements,h=j.elements;if(k&&h.length==3){return new d.V3(i[0]*h[0]+i[1]*h[1]+i[2]*h[2],i[3]*h[0]+i[4]*h[1]+i[5]*h[2],i[6]*h[0]+i[7]*h[1]+i[8]*h[2])}else{if(h.length==i.length){return new d.M3x3(i[0]*h[0]+i[1]*h[3]+i[2]*h[6],i[0]*h[1]+i[1]*h[4]+i[2]*h[7],i[0]*h[2]+i[1]*h[5]+i[2]*h[8],i[3]*h[0]+i[4]*h[3]+i[5]*h[6],i[3]*h[1]+i[4]*h[4]+i[5]*h[7],i[3]*h[2]+i[4]*h[5]+i[5]*h[8],i[6]*h[0]+i[7]*h[3]+i[8]*h[6],i[6]*h[1]+i[7]*h[4]+i[8]*h[7],i[6]*h[2]+i[7]*h[5]+i[8]*h[8])}}return false},inverse:function(){var i=1/this.determinant(),h=this.elements;return new d.M3x3(i*(h[8]*h[4]-h[7]*h[5]),i*(-(h[8]*h[1]-h[7]*h[2])),i*(h[5]*h[1]-h[4]*h[2]),i*(-(h[8]*h[3]-h[6]*h[5])),i*(h[8]*h[0]-h[6]*h[2]),i*(-(h[5]*h[0]-h[3]*h[2])),i*(h[7]*h[3]-h[6]*h[4]),i*(-(h[7]*h[0]-h[6]*h[1])),i*(h[4]*h[0]-h[3]*h[1]))},determinant:function(){var h=this.elements;return h[0]*(h[8]*h[4]-h[7]*h[5])-h[3]*(h[8]*h[1]-h[7]*h[2])+h[6]*(h[5]*h[1]-h[4]*h[2])}});var a={e:function(h){return this.elements[h-1]}};f.extend(d.V2.prototype,a);f.extend(d.V3.prototype,a)})(jQuery,this,this.document);(function(c,b,a,d){if(typeof(c.matrix)=="undefined"){c.extend({matrix:{}})}c.extend(c.matrix,{calc:function(e,f,g){this.matrix=e;this.outerHeight=f;this.outerWidth=g}});c.matrix.calc.prototype={coord:function(e,i,h){h=typeof(h)!=="undefined"?h:0;var g=this.matrix,f;switch(g.rows){case 2:f=g.x(new c.matrix.V2(e,i));break;case 3:f=g.x(new c.matrix.V3(e,i,h));break}return f},corners:function(e,h){var f=!(typeof(e)!=="undefined"||typeof(h)!=="undefined"),g;if(!this.c||!f){h=h||this.outerHeight;e=e||this.outerWidth;g={tl:this.coord(0,0),bl:this.coord(0,h),tr:this.coord(e,0),br:this.coord(e,h)}}else{g=this.c}if(f){this.c=g}return g},sides:function(e){var f=e||this.corners();return{top:Math.min(f.tl.e(2),f.tr.e(2),f.br.e(2),f.bl.e(2)),bottom:Math.max(f.tl.e(2),f.tr.e(2),f.br.e(2),f.bl.e(2)),left:Math.min(f.tl.e(1),f.tr.e(1),f.br.e(1),f.bl.e(1)),right:Math.max(f.tl.e(1),f.tr.e(1),f.br.e(1),f.bl.e(1))}},offset:function(e){var f=this.sides(e);return{height:Math.abs(f.bottom-f.top),width:Math.abs(f.right-f.left)}},area:function(e){var h=e||this.corners();var g={x:h.tr.e(1)-h.tl.e(1)+h.br.e(1)-h.bl.e(1),y:h.tr.e(2)-h.tl.e(2)+h.br.e(2)-h.bl.e(2)},f={x:h.bl.e(1)-h.tl.e(1)+h.br.e(1)-h.tr.e(1),y:h.bl.e(2)-h.tl.e(2)+h.br.e(2)-h.tr.e(2)};return 0.25*Math.abs(g.e(1)*f.e(2)-g.e(2)*f.e(1))},nonAffinity:function(){var f=this.sides(),g=f.top-f.bottom,e=f.left-f.right;return parseFloat(parseFloat(Math.abs((Math.pow(g,2)+Math.pow(e,2))/(f.top*f.bottom+f.left*f.right))).toFixed(8))},originOffset:function(h,g){h=h?h:new c.matrix.V2(this.outerWidth*0.5,this.outerHeight*0.5);g=g?g:new c.matrix.V2(0,0);var e=this.coord(h.e(1),h.e(2));var f=this.coord(g.e(1),g.e(2));return{top:(f.e(2)-g.e(2))-(e.e(2)-h.e(2)),left:(f.e(1)-g.e(1))-(e.e(1)-h.e(1))}}}})(jQuery,this,this.document);(function(e,d,a,f){if(typeof(e.matrix)=="undefined"){e.extend({matrix:{}})}var c=e.matrix,g=c.M2x2,b=c.M3x3;e.extend(c,{identity:function(k){k=k||2;var l=k*k,n=new Array(l),j=k+1;for(var h=0;h<l;h++){n[h]=(h%j)===0?1:0}return new c["M"+k+"x"+k](n)},matrix:function(){var h=Array.prototype.slice.call(arguments);switch(arguments.length){case 4:return new g(h[0],h[2],h[1],h[3]);case 6:return new b(h[0],h[2],h[4],h[1],h[3],h[5],0,0,1)}},reflect:function(){return new g(-1,0,0,-1)},reflectX:function(){return new g(1,0,0,-1)},reflectXY:function(){return new g(0,1,1,0)},reflectY:function(){return new g(-1,0,0,1)},rotate:function(l){var i=e.angle.degreeToRadian(l),k=Math.cos(i),n=Math.sin(i);var j=k,h=n,p=-n,o=k;return new g(j,p,h,o)},scale:function(i,h){i=i||i===0?i:1;h=h||h===0?h:i;return new g(i,0,0,h)},scaleX:function(h){return c.scale(h,1)},scaleY:function(h){return c.scale(1,h)},skew:function(k,i){k=k||0;i=i||0;var l=e.angle.degreeToRadian(k),j=e.angle.degreeToRadian(i),h=Math.tan(l),n=Math.tan(j);return new g(1,h,n,1)},skewX:function(h){return c.skew(h)},skewY:function(h){return c.skew(0,h)},translate:function(i,h){i=i||0;h=h||0;return new b(1,0,i,0,1,h,0,0,1)},translateX:function(h){return c.translate(h)},translateY:function(h){return c.translate(0,h)}})})(jQuery,this,this.document);

// =============

/*
 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
 *
 * Uses the built In easIng capabilities added In jQuery 1.1
 * to offer multiple easIng options
 *
 * Copyright (c) 2007 George Smith
 * Licensed under the MIT License:
 *   http://www.opensource.org/licenses/mit-license.php
 */

// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	swing: function (x, t, b, c, d) {
		//alert(jQuery.easing.default);
		return jQuery.easing[jQuery.easing.def](x, t, b, c, d);
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuad: function (x, t, b, c, d) {
		return -c *(t/=d)*(t-2) + b;
	},
	easeInOutQuad: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t + b;
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInCubic: function (x, t, b, c, d) {
		return c*(t/=d)*t*t + b;
	},
	easeOutCubic: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t + 1) + b;
	},
	easeInOutCubic: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t + b;
		return c/2*((t-=2)*t*t + 2) + b;
	},
	easeInQuart: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuart: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	easeInQuint: function (x, t, b, c, d) {
		return c*(t/=d)*t*t*t*t + b;
	},
	easeOutQuint: function (x, t, b, c, d) {
		return c*((t=t/d-1)*t*t*t*t + 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	},
	easeInSine: function (x, t, b, c, d) {
		return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
	},
	easeOutSine: function (x, t, b, c, d) {
		return c * Math.sin(t/d * (Math.PI/2)) + b;
	},
	easeInOutSine: function (x, t, b, c, d) {
		return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
	},
	easeInExpo: function (x, t, b, c, d) {
		return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
	},
	easeOutExpo: function (x, t, b, c, d) {
		return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
	},
	easeInOutExpo: function (x, t, b, c, d) {
		if (t==0) return b;
		if (t==d) return b+c;
		if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
		return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
	},
	easeInCirc: function (x, t, b, c, d) {
		return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
	},
	easeOutCirc: function (x, t, b, c, d) {
		return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
	},
	easeInOutCirc: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
		return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
	},
	easeInElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	easeOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},
	easeInOutElastic: function (x, t, b, c, d) {
		var s=1.70158;var p=0;var a=c;
		if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
		if (a < Math.abs(c)) { a=c; var s=p/4; }
		else var s = p/(2*Math.PI) * Math.asin (c/a);
		if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
	},
	easeInBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	easeOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158;
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	},
	easeInOutBack: function (x, t, b, c, d, s) {
		if (s == undefined) s = 1.70158; 
		if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	easeInBounce: function (x, t, b, c, d) {
		return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
	},
	easeOutBounce: function (x, t, b, c, d) {
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
		} else {
			return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
		}
	},
	easeInOutBounce: function (x, t, b, c, d) {
		if (t < d/2) return jQuery.easing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
		return jQuery.easing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
	}
});


// =============

 /*!
 * fancyBox - jQuery Plugin
 * version: 2.0.5 (21/02/2012)
 * @requires jQuery v1.6 or later
 *
 * Examples at http://fancyapps.com/fancybox/
 * License: www.fancyapps.com/fancybox/#license
 *
 * Copyright 2012 Janis Skarnelis - janis@fancyapps.com
 *
 */
(function (window, document, $) {
	var W = $(window),
		D = $(document),
		F = $.fancybox = function () {
			F.open.apply( this, arguments );
		},
		didResize = false,
		resizeTimer = null,
		isMobile = typeof document.createTouch !== "undefined";

	$.extend(F, {
		// The current version of fancyBox
		version: '2.0.5',

		defaults: {
			padding: 15,
			margin: 20,

			width: 800,
			height: 600,
			minWidth: 100,
			minHeight: 100,
			maxWidth: 9999,
			maxHeight: 9999,

			autoSize: true,
			autoResize: !isMobile,
			autoCenter : !isMobile,
			fitToView: true,
			aspectRatio: false,
			topRatio: 0.5,

			fixed: !($.browser.msie && $.browser.version <= 6) && !isMobile,
			scrolling: 'auto', // 'auto', 'yes' or 'no'
			wrapCSS: 'fancybox-default',

			arrows: true,
			closeBtn: true,
			closeClick: false,
			nextClick : false,
			mouseWheel: true,
			autoPlay: false,
			playSpeed: 3000,
			preload : 3,

			modal: false,
			loop: true,
			ajax: { dataType: 'html', headers: { 'X-fancyBox': true } },
			keys: {
				next: [13, 32, 34, 39, 40], // enter, space, page down, right arrow, down arrow
				prev: [8, 33, 37, 38], // backspace, page up, left arrow, up arrow
				close: [27] // escape key
			},

			// Override some properties
			index: 0,
			type: null,
			href: null,
			content: null,
			title: null,

			// HTML templates
			tpl: {
				wrap: '<div class="fancybox-wrap"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div>',
				image: '<img class="fancybox-image" src="{href}" alt="" />',
				iframe: '<iframe class="fancybox-iframe" name="fancybox-frame{rnd}" frameborder="0" hspace="0"' + ($.browser.msie ? ' allowtransparency="true"' : '') + '></iframe>',
				swf: '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="wmode" value="transparent" /><param name="allowfullscreen" value="true" /><param name="allowscriptaccess" value="always" /><param name="movie" value="{href}" /><embed src="{href}" type="application/x-shockwave-flash" allowfullscreen="true" allowscriptaccess="always" width="100%" height="100%" wmode="transparent"></embed></object>',
				error: '<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',
				closeBtn: '<div title="Close" class="fancybox-item fancybox-close"></div>',
				next: '<a title="Next" class="fancybox-nav fancybox-next"><span></span></a>',
				prev: '<a title="Previous" class="fancybox-nav fancybox-prev"><span></span></a>'
			},

			// Properties for each animation type
			// Opening fancyBox
			openEffect: 'fade', // 'elastic', 'fade' or 'none'
			openSpeed: 250,
			openEasing: 'swing',
			openOpacity: true,
			openMethod: 'zoomIn',

			// Closing fancyBox
			closeEffect: 'fade', // 'elastic', 'fade' or 'none'
			closeSpeed: 250,
			closeEasing: 'swing',
			closeOpacity: true,
			closeMethod: 'zoomOut',

			// Changing next gallery item
			nextEffect: 'elastic', // 'elastic', 'fade' or 'none'
			nextSpeed: 300,
			nextEasing: 'swing',
			nextMethod: 'changeIn',

			// Changing previous gallery item
			prevEffect: 'elastic', // 'elastic', 'fade' or 'none'
			prevSpeed: 300,
			prevEasing: 'swing',
			prevMethod: 'changeOut',

			// Enabled helpers
			helpers: {
				overlay: {
					speedIn: 0,
					speedOut: 300,
					opacity: 0.8,
					css: {
						cursor: 'pointer'
					},
					closeClick: true
				},
				title: {
					type: 'float' // 'float', 'inside', 'outside' or 'over'
				}
			},

			// Callbacks
			onCancel: $.noop, // If canceling
			beforeLoad: $.noop, // Before loading
			afterLoad: $.noop, // After loading
			beforeShow: $.noop, // Before changing in current item
			afterShow: $.noop, // After opening
			beforeClose: $.noop, // Before closing
			afterClose: $.noop // After closing
		},

		//Current state
		group: {}, // Selected group
		opts: {}, // Group options
		coming: null, // Element being loaded
		current: null, // Currently loaded element
		isOpen: false, // Is currently open
		isOpened: false, // Have been fully opened at least once
		wrap: null,
		outer: null,
		inner: null,

		player: {
			timer: null,
			isActive: false
		},

		// Loaders
		ajaxLoad: null,
		imgPreload: null,

		// Some collections
		transitions: {},
		helpers: {},

		/*
		 *	Static methods
		 */

		open: function (group, opts) {
			//Kill existing instances
			F.close(true);

			//Normalize group
			if (group && !$.isArray(group)) {
				group = group instanceof $ ? $(group).get() : [group];
			}

			F.isActive = true;

			//Extend the defaults
			F.opts = $.extend(true, {}, F.defaults, opts);

			//All options are merged recursive except keys
			if ($.isPlainObject(opts) && typeof opts.keys !== 'undefined') {
				F.opts.keys = opts.keys ? $.extend({}, F.defaults.keys, opts.keys) : false;
			}

			F.group = group;

			F._start(F.opts.index || 0);
		},

		cancel: function () {
			if (F.coming && false === F.trigger('onCancel')) {
				return;
			}

			F.coming = null;

			F.hideLoading();

			if (F.ajaxLoad) {
				F.ajaxLoad.abort();
			}

			F.ajaxLoad = null;

			if (F.imgPreload) {
				F.imgPreload.onload = F.imgPreload.onabort = F.imgPreload.onerror = null;
			}
		},

		close: function (a) {
			F.cancel();

			if (!F.current || false === F.trigger('beforeClose')) {
				return;
			}

			F.unbindEvents();

			//If forced or is still opening then remove immediately
			if (!F.isOpen || (a && a[0] === true)) {
				$(".fancybox-wrap").stop().trigger('onReset').remove();

				F._afterZoomOut();

			} else {
				F.isOpen = F.isOpened = false;

				$(".fancybox-item, .fancybox-nav").remove();

				F.wrap.stop(true).removeClass('fancybox-opened');
				F.inner.css('overflow', 'hidden');

				F.transitions[F.current.closeMethod]();
			}
		},

		// Start/stop slideshow
		play: function (a) {
			var clear = function () {
					clearTimeout(F.player.timer);
				},
				set = function () {
					clear();

					if (F.current && F.player.isActive) {
						F.player.timer = setTimeout(F.next, F.current.playSpeed);
					}
				},
				stop = function () {
					clear();

					$('body').unbind('.player');

					F.player.isActive = false;

					F.trigger('onPlayEnd');
				},
				start = function () {
					if (F.current && (F.current.loop || F.current.index < F.group.length - 1)) {
						F.player.isActive = true;

						$('body').bind({
							'afterShow.player onUpdate.player': set,
							'onCancel.player beforeClose.player': stop,
							'beforeLoad.player': clear
						});

						set();

						F.trigger('onPlayStart');
					}
				};

			if (F.player.isActive || (a && a[0] === false)) {
				stop();
			} else {
				start();
			}
		},

		next: function () {
			if (F.current) {
				F.jumpto(F.current.index + 1);
			}
		},

		prev: function () {
			if (F.current) {
				F.jumpto(F.current.index - 1);
			}
		},

		jumpto: function (index) {
			if (!F.current) {
				return;
			}

			index = parseInt(index, 10);

			if (F.group.length > 1 && F.current.loop) {
				if (index >= F.group.length) {
					index = 0;

				} else if (index < 0) {
					index = F.group.length - 1;
				}
			}

			if (typeof F.group[index] !== 'undefined') {
				F.cancel();

				F._start(index);
			}
		},

		reposition: function (a) {
			if (F.isOpen) {
				F.wrap.css(F._getPosition(a));
			}
		},

		update: function (e) {
			if (F.isOpen) {
				// It's a very bad idea to attach handlers to the window scroll event, run this code after a delay
				if (!didResize) {
					resizeTimer = setTimeout(function () {
						var current = F.current;

						if (didResize) {
							didResize = false;

							if (current) {
								if (current.autoResize || (e && e.type === 'orientationchange')) {
									if (current.autoSize) {
										F.inner.height('auto');
										current.height = F.inner.height();
									}

									F._setDimension();

									if (current.canGrow) {
										F.inner.height('auto');
									}
								}

								if (current.autoCenter) {
									F.reposition();
								}

								F.trigger('onUpdate');
							}
						}
					}, 100);
				}

				didResize = true;
			}
		},

		toggle: function () {
			if (F.isOpen) {
				F.current.fitToView = !F.current.fitToView;

				F.update();
			}
		},

		hideLoading: function () {
			$("#fancybox-loading").remove();
		},

		showLoading: function () {
			F.hideLoading();

			$('<div id="fancybox-loading"><div></div></div>').click(F.cancel).appendTo('body');
		},

		getViewport: function () {
			return {
				x: W.scrollLeft(),
				y: W.scrollTop(),
				w: W.width(),
				h: W.height()
			};
		},

		// Unbind the keyboard / clicking actions
		unbindEvents: function () {
			if (F.wrap) {
				F.wrap.unbind('.fb');
			}

			D.unbind('.fb');
			W.unbind('.fb');
		},

		bindEvents: function () {
			var current = F.current,
				keys = current.keys;

			if (!current) {
				return;
			}

			W.bind('resize.fb, orientationchange.fb', F.update);

			if (keys) {
				D.bind('keydown.fb', function (e) {
					var code;

					// Ignore key combinations and key events within form elements
					if (!e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey && $.inArray(e.target.tagName.toLowerCase(), ['input', 'textarea', 'select', 'button']) < 0) {
						code = e.keyCode;

						if ($.inArray(code, keys.close) > -1) {
							F.close();
							e.preventDefault();

						} else if ($.inArray(code, keys.next) > -1) {
							F.next();
							e.preventDefault();

						} else if ($.inArray(code, keys.prev) > -1) {
							F.prev();
							e.preventDefault();
						}
					}
				});
			}

			if ($.fn.mousewheel && current.mouseWheel && F.group.length > 1) {
				F.wrap.bind('mousewheel.fb', function (e, delta) {
					var target = $(e.target).get(0);

					if (target.clientHeight === 0 || (target.scrollHeight === target.clientHeight && target.scrollWidth === target.clientWidth)) {
						e.preventDefault();

						F[delta > 0 ? 'prev' : 'next']();
					}
				});
			}
		},

		trigger: function (event) {
			var ret, obj = F[ $.inArray(event, ['onCancel', 'beforeLoad', 'afterLoad']) > -1 ? 'coming' : 'current' ];

			if (!obj) {
				return;
			}

			if ($.isFunction( obj[event] )) {
				ret = obj[event].apply(obj, Array.prototype.slice.call(arguments, 1));
			}

			if (ret === false) {
				return false;
			}

			if (obj.helpers) {
				$.each(obj.helpers, function (helper, opts) {
					if (opts && typeof F.helpers[helper] !== 'undefined' && $.isFunction(F.helpers[helper][event])) {
						F.helpers[helper][event](opts, obj);
					}
				});
			}

			$.event.trigger(event + '.fb');
		},

		isImage: function (str) {
			return str && str.match(/\.(jpg|gif|png|bmp|jpeg)(.*)?$/i);
		},

		isSWF: function (str) {
			return str && str.match(/\.(swf)(.*)?$/i);
		},

		_start: function (index) {
			var coming = {},
				element = F.group[index] || null,
				isDom,
				href,
				type,
				rez;

			if (element && (element.nodeType || element instanceof $)) {
				isDom = true;

				if ($.metadata) {
					coming = $(element).metadata();
				}
			}

			coming = $.extend(true, {}, F.opts, {index : index, element : element}, ($.isPlainObject(element) ? element : coming));

			// Re-check overridable options
			$.each(['href', 'title', 'content', 'type'], function(i,v) {
				coming[v] = F.opts[ v ] || (isDom && $(element).attr( v )) || coming[ v ] || null;
			});

			// Convert margin property to array - top, right, bottom, left
			if (typeof coming.margin === 'number') {
				coming.margin = [coming.margin, coming.margin, coming.margin, coming.margin];
			}

			// 'modal' propery is just a shortcut
			if (coming.modal) {
				$.extend(true, coming, {
					closeBtn : false,
					closeClick: false,
					nextClick : false,
					arrows : false,
					mouseWheel : false,
					keys : null,
					helpers: {
						overlay : {
							css: {
								cursor : 'auto'
							},
							closeClick : false
						}
					}
				});
			}

			//Give a chance for callback or helpers to update coming item (type, title, etc)
			F.coming = coming;

			if (false === F.trigger('beforeLoad')) {
				F.coming = null;
				return;
			}

			type = coming.type;
			href = coming.href || element;

			///Check if content type is set, if not, try to get
			if (!type) {
				if (isDom) {
					rez = $(element).data('fancybox-type');

					if (!rez && element.className) {
						rez = element.className.match(/fancybox\.(\w+)/);
						type = rez ? rez[1] : null;
					}
				}

				if (!type && $.type(href) === "string") {
					if (F.isImage(href)) {
						type = 'image';

					} else if (F.isSWF(href)) {
						type = 'swf';

					} else if (href.match(/^#/)) {
						type = 'inline';
					}
				}

				// ...if not - display element itself
				if (!type) {
					type = isDom ? 'inline' : 'html';
				}

				coming.type = type;
			}

			// Check before try to load; 'inline' and 'html' types need content, others - href
			if (type === 'inline' || type === 'html') {
				if (!coming.content) {
					if (type === 'inline') {
						coming.content = $( $.type(href) === "string" ? href.replace(/.*(?=#[^\s]+$)/, '') : href ); //strip for ie7

					} else {
						coming.content = element;
					}
				}

				if (!coming.content || !coming.content.length) {
					type = null;
				}

			} else if (!href) {
				type = null;
			}

			/*
				Add reference to the group, so it`s possible to access from callbacks, example:

				afterLoad : function() {
					this.title = 'Image ' + (this.index + 1) + ' of ' + this.group.length + (this.title ? ' - ' + this.title : '');
				}

			*/

			coming.group = F.group;
			coming.isDom = isDom;
			coming.href = href;

			if (type === 'image') {
				F._loadImage();

			} else if (type === 'ajax') {
				F._loadAjax();

			} else if (type) {
				F._afterLoad();

			} else {
				F._error( 'type' );
			}
		},

		_error: function ( type ) {
			F.hideLoading();

			$.extend(F.coming, {
				type : 'html',
				autoSize : true,
				minHeight : 0,
				hasError : type,
				content : F.coming.tpl.error
			});

			F._afterLoad();
		},

		_loadImage: function () {
			// Reset preload image so it is later possible to check "complete" property
			F.imgPreload = new Image();

			F.imgPreload.onload = function () {
				this.onload = this.onerror = null;

				F.coming.width = this.width;
				F.coming.height = this.height;

				F._afterLoad();
			};

			F.imgPreload.onerror = function () {
				this.onload = this.onerror = null;

				F._error( 'image' );
			};

			F.imgPreload.src = F.coming.href;

			if (!F.imgPreload.width) {
				F.showLoading();
			}
		},

		_loadAjax: function () {
			F.showLoading();

			F.ajaxLoad = $.ajax($.extend({}, F.coming.ajax, {
				url: F.coming.href,
				error: function (jqXHR, textStatus) {
					if (textStatus !== 'abort') {
						F._error( 'ajax', jqXHR );

					} else {
						F.hideLoading();
					}
				},
				success: function (data, textStatus) {
					if (textStatus === 'success') {
						F.coming.content = data;

						F._afterLoad();
					}
				}
			}));
		},

		_preloadImages: function() {
			var group = F.group,
				current = F.current,
				len = group.length,
				item,
				href;

			if (!current.preload || group.length < 2) {
				return;
			}

			for (var i = 1; i <= Math.min(current.preload, len - 1); i++) {
				item = group[ (current.index + i ) % len ];
				href = $( item ).attr('href') || item;

				if (href) {
					new Image().src = href;
				}
			}
		},

		_afterLoad: function () {
			F.hideLoading();

			if (!F.coming || false === F.trigger('afterLoad', F.current)) {
				F.coming = false;

				return;
			}

			if (F.isOpened) {
				$(".fancybox-item").remove();

				F.wrap.stop(true).removeClass('fancybox-opened');
				F.inner.css('overflow', 'hidden');

				F.transitions[F.current.prevMethod]();

			} else {
				$(".fancybox-wrap").stop().trigger('onReset').remove();

				F.trigger('afterClose');
			}

			F.unbindEvents();

			F.isOpen = false;
			F.current = F.coming;

			//Build the neccessary markup
			F.wrap = $(F.current.tpl.wrap).addClass('fancybox-' + (isMobile ? 'mobile' : 'desktop') + ' fancybox-tmp ' + F.current.wrapCSS).appendTo('body');
			F.outer = $('.fancybox-outer', F.wrap).css('padding', F.current.padding + 'px');
			F.inner = $('.fancybox-inner', F.wrap);

			F._setContent();
		},

		_setContent: function () {
			var content, loadingBay, iframe, current = F.current, type = current.type;

			switch (type) {
				case 'inline':
				case 'ajax':
				case 'html':
					content = current.content;

					if (content instanceof $) {
						content = content.show().detach();

						if (content.parent().hasClass('fancybox-inner')) {
							content.parents('.fancybox-wrap').trigger('onReset').remove();
						}

						$(F.wrap).bind('onReset', function () {
							content.appendTo('body').hide();
						});
					}

					if (current.autoSize) {
						loadingBay = $('<div class="fancybox-tmp ' + F.current.wrapCSS + '"></div>').appendTo('body').append(content);
						current.width = loadingBay.width();
						current.height = loadingBay.height();

						// Re-check to fix 1px bug in some browsers
						loadingBay.width( F.current.width );

						if (loadingBay.height() > current.height) {
							loadingBay.width(current.width + 1);

							current.width = loadingBay.width();
							current.height = loadingBay.height();
						}

						content = loadingBay.contents().detach();

						loadingBay.remove();
					}

				break;

				case 'image':
					content = current.tpl.image.replace('{href}', current.href);

					current.aspectRatio = true;
				break;

				case 'swf':
					content = current.tpl.swf.replace(/\{width\}/g, current.width).replace(/\{height\}/g, current.height).replace(/\{href\}/g, current.href);
				break;
			}

			if (type === 'iframe') {
				content = $(current.tpl.iframe.replace('{rnd}', new Date().getTime()) ).attr('scrolling', current.scrolling);

				current.scrolling = 'auto';

				// Set auto height for iframes
				if (current.autoSize) {
					content.width( current.width );

					F.showLoading();

					content.data('ready', false).appendTo(F.inner).bind({
						onCancel : function() {
							$(this).unbind();

							F._afterZoomOut();
						},
						load : function() {
							var iframe = $(this), height;

							try {
								if (this.contentWindow.document.location) {
									height = iframe.contents().find('body').height() + 12;

									iframe.height( height );
								}

							} catch (e) {
								current.autoSize = false;
							}

							if (iframe.data('ready') === false) {
								F.hideLoading();

								if (height) {
									F.current.height = height;
								}

								F._beforeShow();

								iframe.data('ready', true);

							} else if (height) {
								F.update();
							}
						}

					}).attr('src', current.href);

					return;

				} else {
					content.attr('src', current.href);
				}

			} else if (type === 'image' || type === 'swf') {
				current.autoSize = false;
				current.scrolling = 'visible';
			}

			F.inner.append(content);

			F._beforeShow();
		},

		_beforeShow : function() {
			F.coming = null;

			//Give a chance for helpers or callbacks to update elements
			F.trigger('beforeShow');

			//Set initial dimensions and hide
			F._setDimension();

			F.wrap.hide().removeClass('fancybox-tmp');

			F.bindEvents();
			F._preloadImages();

			F.transitions[ F.isOpened ? F.current.nextMethod : F.current.openMethod ]();
		},

		_setDimension: function () {
			var wrap = F.wrap,
				outer = F.outer,
				inner = F.inner,
				current = F.current,
				viewport = F.getViewport(),
				margin = current.margin,
				padding2 = current.padding * 2,
				width = current.width,
				height = current.height,
				maxWidth = current.maxWidth,
				maxHeight = current.maxHeight,
				minWidth = current.minWidth,
				minHeight = current.minHeight,
				ratio,
				height_,
				space;

			viewport.w -= (margin[1] + margin[3]);
			viewport.h -= (margin[0] + margin[2]);

			if (width.toString().indexOf('%') > -1) {
				width = (((viewport.w - padding2) * parseFloat(width)) / 100);
			}

			if (height.toString().indexOf('%') > -1) {
				height = (((viewport.h - padding2) * parseFloat(height)) / 100);
			}

			ratio = width / height;

			width += padding2;
			height += padding2;

			if (current.fitToView) {
				maxWidth = Math.min(viewport.w, maxWidth);
				maxHeight = Math.min(viewport.h, maxHeight);
			}

			if (current.aspectRatio) {
				if (width > maxWidth) {
					width = maxWidth;
					height = ((width - padding2) / ratio) + padding2;
				}

				if (height > maxHeight) {
					height = maxHeight;
					width = ((height - padding2) * ratio) + padding2;
				}

				if (width < minWidth) {
					width = minWidth;
					height = ((width - padding2) / ratio) + padding2;
				}

				if (height < minHeight) {
					height = minHeight;
					width = ((height - padding2) * ratio) + padding2;
				}

			} else {
				width = Math.max(minWidth, Math.min(width, maxWidth));
				height = Math.max(minHeight, Math.min(height, maxHeight));
			}

			width = Math.round(width);
			height = Math.round(height);

			//Reset dimensions
			$(wrap.add(outer).add(inner)).width('auto').height('auto');

			inner.width(width - padding2).height(height - padding2);
			wrap.width(width);

			height_ = wrap.height(); // Real wrap height

			//Fit wrapper inside
			if (width > maxWidth || height_ > maxHeight) {
				while ((width > maxWidth || height_ > maxHeight) && width > minWidth && height_ > minHeight) {
					height = height - 10;

					if (current.aspectRatio) {
						width = Math.round(((height - padding2) * ratio) + padding2);

						if (width < minWidth) {
							width = minWidth;
							height = ((width - padding2) / ratio) + padding2;
						}

					} else {
						width = width - 10;
					}

					inner.width(width - padding2).height(height - padding2);
					wrap.width(width);

					height_ = wrap.height();
				}
			}

			current.dim = {
				width: width,
				height: height_
			};

			current.canGrow = current.autoSize && height > minHeight && height < maxHeight;
			current.canShrink = false;
			current.canExpand = false;

			if ((width - padding2) < current.width || (height - padding2) < current.height) {
				current.canExpand = true;

			} else if ((width > viewport.w || height_ > viewport.h) && width > minWidth && height > minHeight) {
				current.canShrink = true;
			}

			space = height_ - padding2;

			F.innerSpace = space - inner.height();
			F.outerSpace = space - outer.height();
		},

		_getPosition: function (a) {
			var current = F.current,
				viewport = F.getViewport(),
				margin = current.margin,
				width = F.wrap.width() + margin[1] + margin[3],
				height = F.wrap.height() + margin[0] + margin[2],
				rez = {
					position: 'absolute',
					top: margin[0] + viewport.y,
					left: margin[3] + viewport.x
				};

			if (current.fixed && (!a || a[0] === false) && height <= viewport.h && width <= viewport.w) {
				rez = {
					position: 'fixed',
					top: margin[0],
					left: margin[3]
				};
			}

			rez.top = Math.ceil(Math.max(rez.top, rez.top + ((viewport.h - height) * current.topRatio))) + 'px';
			rez.left = Math.ceil(Math.max(rez.left, rez.left + ((viewport.w - width) * 0.5))) + 'px';

			return rez;
		},

		_afterZoomIn: function () {
			var current = F.current, scrolling = current.scrolling;

			F.isOpen = F.isOpened = true;

			F.wrap.addClass('fancybox-opened').css('overflow', 'visible');

			F.update();

			F.inner.css('overflow', scrolling === 'yes' ? 'scroll' : (scrolling === 'no' ? 'hidden' : scrolling));

			//Assign a click event
			if (current.closeClick || current.nextClick) {
				F.inner.css('cursor', 'pointer').bind('click.fb', current.nextClick ? F.next : F.close);
			}

			//Create a close button
			if (current.closeBtn) {
				$(current.tpl.closeBtn).appendTo(F.outer).bind('click.fb', F.close);
			}

			//Create navigation arrows
			if (current.arrows && F.group.length > 1) {
				if (current.loop || current.index > 0) {
					$(current.tpl.prev).appendTo(F.inner).bind('click.fb', F.prev);
				}

				if (current.loop || current.index < F.group.length - 1) {
					$(current.tpl.next).appendTo(F.inner).bind('click.fb', F.next);
				}
			}

			F.trigger('afterShow');

			if (F.opts.autoPlay && !F.player.isActive) {
				F.opts.autoPlay = false;

				F.play();
			}
		},

		_afterZoomOut: function () {
			F.trigger('afterClose');

			F.wrap.trigger('onReset').remove();

			$.extend(F, {
				group: {},
				opts: {},
				current: null,
				isActive: false,
				isOpened: false,
				isOpen: false,
				wrap: null,
				outer: null,
				inner: null
			});
		}
	});

	/*
	 *	Default transitions
	 */

	F.transitions = {
		getOrigPosition: function () {
			var current = F.current,
				element = current.element,
				padding = current.padding,
				orig = $(current.orig),
				pos = {},
				width = 50,
				height = 50,
				viewport;

			if (!orig.length && current.isDom && $(element).is(':visible')) {
				orig = $(element).find('img:first');

				if (!orig.length) {
					orig = $(element);
				}
			}

			if (orig.length) {
				pos = orig.offset();

				if (orig.is('img')) {
					width = orig.outerWidth();
					height = orig.outerHeight();
				}

			} else {
				viewport = F.getViewport();

				pos.top = viewport.y + (viewport.h - height) * 0.5;
				pos.left = viewport.x + (viewport.w - width) * 0.5;
			}

			pos = {
				top: Math.ceil(pos.top - padding) + 'px',
				left: Math.ceil(pos.left - padding) + 'px',
				width: Math.ceil(width + padding * 2) + 'px',
				height: Math.ceil(height + padding * 2) + 'px'
			};

			return pos;
		},

		step: function (now, fx) {
			var ratio, innerValue, outerValue;

			if (fx.prop === 'width' || fx.prop === 'height') {
				innerValue = outerValue = Math.ceil(now - (F.current.padding * 2));

				if (fx.prop === 'height') {
					ratio = (now - fx.start) / (fx.end - fx.start);

					if (fx.start > fx.end) {
						ratio = 1 - ratio;
					}

					innerValue -= F.innerSpace * ratio;
					outerValue -= F.outerSpace * ratio;
				}

				F.inner[fx.prop](innerValue);
				F.outer[fx.prop](outerValue);
			}
		},

		zoomIn: function () {
			var wrap = F.wrap,
				current = F.current,
				startPos,
				endPos,
				dim = current.dim;

			if (current.openEffect === 'elastic') {
				endPos = $.extend({}, dim, F._getPosition(true));

				//Remove "position" property
				delete endPos.position;

				startPos = this.getOrigPosition();

				if (current.openOpacity) {
					startPos.opacity = 0;
					endPos.opacity = 1;
				}

				F.outer.add(F.inner).width('auto').height('auto');

				wrap.css(startPos).show();

				wrap.animate(endPos, {
					duration: current.openSpeed,
					easing: current.openEasing,
					step: this.step,
					complete: F._afterZoomIn
				});

			} else {
				wrap.css($.extend({}, dim, F._getPosition()));

				if (current.openEffect === 'fade') {
					wrap.fadeIn(current.openSpeed, F._afterZoomIn);

				} else {
					wrap.show();
					F._afterZoomIn();
				}
			}
		},

		zoomOut: function () {
			var wrap = F.wrap,
				current = F.current,
				endPos;

			if (current.closeEffect === 'elastic') {
				if (wrap.css('position') === 'fixed') {
					wrap.css(F._getPosition(true));
				}

				endPos = this.getOrigPosition();

				if (current.closeOpacity) {
					endPos.opacity = 0;
				}

				wrap.animate(endPos, {
					duration: current.closeSpeed,
					easing: current.closeEasing,
					step: this.step,
					complete: F._afterZoomOut
				});

			} else {
				wrap.fadeOut(current.closeEffect === 'fade' ? current.closeSpeed : 0, F._afterZoomOut);
			}
		},

		changeIn: function () {
			var wrap = F.wrap,
				current = F.current,
				startPos;

			if (current.nextEffect === 'elastic') {
				startPos = F._getPosition(true);
				startPos.opacity = 0;
				startPos.top = (parseInt(startPos.top, 10) - 200) + 'px';

				wrap.css(startPos).show().animate({
					opacity: 1,
					top: '+=200px'
				}, {
					duration: current.nextSpeed,
					easing: current.nextEasing,
					complete: F._afterZoomIn
				});

			} else {
				wrap.css(F._getPosition());

				if (current.nextEffect === 'fade') {
					wrap.hide().fadeIn(current.nextSpeed, F._afterZoomIn);

				} else {
					wrap.show();
					F._afterZoomIn();
				}
			}
		},

		changeOut: function () {
			var wrap = F.wrap,
				current = F.current,
				cleanUp = function () {
					$(this).trigger('onReset').remove();
				};

			wrap.removeClass('fancybox-opened');

			if (current.prevEffect === 'elastic') {
				wrap.animate({
					'opacity': 0,
					top: '+=200px'
				}, {
					duration: current.prevSpeed,
					easing: current.prevEasing,
					complete: cleanUp
				});

			} else {
				wrap.fadeOut(current.prevEffect === 'fade' ? current.prevSpeed : 0, cleanUp);
			}
		}
	};

	/*
	 *	Overlay helper
	 */

	F.helpers.overlay = {
		overlay: null,

		update: function () {
			var width, scrollWidth, offsetWidth;

			//Reset width/height so it will not mess
			this.overlay.width(0).height(0);

			if ($.browser.msie) {
				scrollWidth = Math.max(document.documentElement.scrollWidth, document.body.scrollWidth);
				offsetWidth = Math.max(document.documentElement.offsetWidth, document.body.offsetWidth);

				width = scrollWidth < offsetWidth ? W.width() : scrollWidth;

			} else {
				width = D.width();
			}

			this.overlay.width(width).height(D.height());
		},

		beforeShow: function (opts) {
			if (this.overlay) {
				return;
			}

			opts = $.extend(true, {
				speedIn : 'fast',
				closeClick : true,
				opacity : 0.8,
				css : {
					background: 'white'
				}
			}, opts);

			this.overlay = $('<div id="fancybox-overlay"></div>').css(opts.css).appendTo('body');

			this.update();

			if (opts.closeClick) {
				this.overlay.bind('click.fb', F.close);
			}

			W.bind("resize.fb", $.proxy(this.update, this));

			this.overlay.fadeTo(opts.speedIn, opts.opacity);
		},

		onUpdate: function () {
			//Update as content may change document dimensions
			this.update();
		},

		afterClose: function (opts) {
			if (this.overlay) {

				this.overlay.fadeOut(opts.speedOut || 0, function () {
					$(this).remove();
				});
			}

			this.overlay = null;
		}
	};

	/*
	 *	Title helper
	 */

	F.helpers.title = {
		beforeShow: function (opts) {
			var title, text = F.current.title;

			if (text) {
				title = $('<div class="fancybox-title fancybox-title-' + opts.type + '-wrap">' + text + '</div>').appendTo('body');

				if (opts.type === 'float') {
					//This helps for some browsers
					title.width(title.width());

					title.wrapInner('<span class="child"></span>');

					//Increase bottom margin so this title will also fit into viewport
					F.current.margin[2] += Math.abs(parseInt(title.css('margin-bottom'), 10));
				}

				title.appendTo(opts.type === 'over' ? F.inner : (opts.type === 'outside' ? F.wrap : F.outer));
			}
		}
	};

	// jQuery plugin initialization
	$.fn.fancybox = function (options) {
		var that = $(this),
			selector = this.selector || '',
			index,
			run = function(e) {
				var what = this, relType = 'rel', relVal = what[ relType ], idx = index;

				if (!(e.ctrlKey || e.altKey || e.shiftKey || e.metaKey)) {
					e.preventDefault();

					if (!relVal) {
						relType = 'data-fancybox-group';
						relVal = $(what).attr('data-fancybox-group');
					}

					if (relVal && relVal !== '' && relVal !== 'nofollow') {
						what = selector.length ? $(selector) : that;
						what = what.filter('[' + relType + '="' + relVal + '"]');
						idx = what.index(this);
					}

					options.index = idx;

					F.open(what, options);
				}
			};

		options = options || {};
		index = options.index || 0;

		if (selector) {
			D.undelegate(selector, 'click.fb-start').delegate(selector, 'click.fb-start', run);

		} else {
			that.unbind('click.fb-start').bind('click.fb-start', run);
		}

		return this;
	};

}(window, document, jQuery));

// =============

/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function c(b,c){var e=b.nodeName.toLowerCase();if("area"===e){var f=b.parentNode,g=f.name,h;return!b.href||!g||f.nodeName.toLowerCase()!=="map"?!1:(h=a("img[usemap=#"+g+"]")[0],!!h&&d(h))}return(/input|select|textarea|button|object/.test(e)?!b.disabled:"a"==e?b.href||c:c)&&d(b)}function d(b){return!a(b).parents().andSelf().filter(function(){return a.curCSS(this,"visibility")==="hidden"||a.expr.filters.hidden(this)}).length}a.ui=a.ui||{};if(a.ui.version)return;a.extend(a.ui,{version:"1.8.21",keyCode:{ALT:18,BACKSPACE:8,CAPS_LOCK:20,COMMA:188,COMMAND:91,COMMAND_LEFT:91,COMMAND_RIGHT:93,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,MENU:93,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38,WINDOWS:91}}),a.fn.extend({propAttr:a.fn.prop||a.fn.attr,_focus:a.fn.focus,focus:function(b,c){return typeof b=="number"?this.each(function(){var d=this;setTimeout(function(){a(d).focus(),c&&c.call(d)},b)}):this._focus.apply(this,arguments)},scrollParent:function(){var b;return a.browser.msie&&/(static|relative)/.test(this.css("position"))||/absolute/.test(this.css("position"))?b=this.parents().filter(function(){return/(relative|absolute|fixed)/.test(a.curCSS(this,"position",1))&&/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0):b=this.parents().filter(function(){return/(auto|scroll)/.test(a.curCSS(this,"overflow",1)+a.curCSS(this,"overflow-y",1)+a.curCSS(this,"overflow-x",1))}).eq(0),/fixed/.test(this.css("position"))||!b.length?a(document):b},zIndex:function(c){if(c!==b)return this.css("zIndex",c);if(this.length){var d=a(this[0]),e,f;while(d.length&&d[0]!==document){e=d.css("position");if(e==="absolute"||e==="relative"||e==="fixed"){f=parseInt(d.css("zIndex"),10);if(!isNaN(f)&&f!==0)return f}d=d.parent()}}return 0},disableSelection:function(){return this.bind((a.support.selectstart?"selectstart":"mousedown")+".ui-disableSelection",function(a){a.preventDefault()})},enableSelection:function(){return this.unbind(".ui-disableSelection")}}),a.each(["Width","Height"],function(c,d){function h(b,c,d,f){return a.each(e,function(){c-=parseFloat(a.curCSS(b,"padding"+this,!0))||0,d&&(c-=parseFloat(a.curCSS(b,"border"+this+"Width",!0))||0),f&&(c-=parseFloat(a.curCSS(b,"margin"+this,!0))||0)}),c}var e=d==="Width"?["Left","Right"]:["Top","Bottom"],f=d.toLowerCase(),g={innerWidth:a.fn.innerWidth,innerHeight:a.fn.innerHeight,outerWidth:a.fn.outerWidth,outerHeight:a.fn.outerHeight};a.fn["inner"+d]=function(c){return c===b?g["inner"+d].call(this):this.each(function(){a(this).css(f,h(this,c)+"px")})},a.fn["outer"+d]=function(b,c){return typeof b!="number"?g["outer"+d].call(this,b):this.each(function(){a(this).css(f,h(this,b,!0,c)+"px")})}}),a.extend(a.expr[":"],{data:function(b,c,d){return!!a.data(b,d[3])},focusable:function(b){return c(b,!isNaN(a.attr(b,"tabindex")))},tabbable:function(b){var d=a.attr(b,"tabindex"),e=isNaN(d);return(e||d>=0)&&c(b,!e)}}),a(function(){var b=document.body,c=b.appendChild(c=document.createElement("div"));c.offsetHeight,a.extend(c.style,{minHeight:"100px",height:"auto",padding:0,borderWidth:0}),a.support.minHeight=c.offsetHeight===100,a.support.selectstart="onselectstart"in c,b.removeChild(c).style.display="none"}),a.extend(a.ui,{plugin:{add:function(b,c,d){var e=a.ui[b].prototype;for(var f in d)e.plugins[f]=e.plugins[f]||[],e.plugins[f].push([c,d[f]])},call:function(a,b,c){var d=a.plugins[b];if(!d||!a.element[0].parentNode)return;for(var e=0;e<d.length;e++)a.options[d[e][0]]&&d[e][1].apply(a.element,c)}},contains:function(a,b){return document.compareDocumentPosition?a.compareDocumentPosition(b)&16:a!==b&&a.contains(b)},hasScroll:function(b,c){if(a(b).css("overflow")==="hidden")return!1;var d=c&&c==="left"?"scrollLeft":"scrollTop",e=!1;return b[d]>0?!0:(b[d]=1,e=b[d]>0,b[d]=0,e)},isOverAxis:function(a,b,c){return a>b&&a<b+c},isOver:function(b,c,d,e,f,g){return a.ui.isOverAxis(b,d,f)&&a.ui.isOverAxis(c,e,g)}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.widget.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){if(a.cleanData){var c=a.cleanData;a.cleanData=function(b){for(var d=0,e;(e=b[d])!=null;d++)try{a(e).triggerHandler("remove")}catch(f){}c(b)}}else{var d=a.fn.remove;a.fn.remove=function(b,c){return this.each(function(){return c||(!b||a.filter(b,[this]).length)&&a("*",this).add([this]).each(function(){try{a(this).triggerHandler("remove")}catch(b){}}),d.call(a(this),b,c)})}}a.widget=function(b,c,d){var e=b.split(".")[0],f;b=b.split(".")[1],f=e+"-"+b,d||(d=c,c=a.Widget),a.expr[":"][f]=function(c){return!!a.data(c,b)},a[e]=a[e]||{},a[e][b]=function(a,b){arguments.length&&this._createWidget(a,b)};var g=new c;g.options=a.extend(!0,{},g.options),a[e][b].prototype=a.extend(!0,g,{namespace:e,widgetName:b,widgetEventPrefix:a[e][b].prototype.widgetEventPrefix||b,widgetBaseClass:f},d),a.widget.bridge(b,a[e][b])},a.widget.bridge=function(c,d){a.fn[c]=function(e){var f=typeof e=="string",g=Array.prototype.slice.call(arguments,1),h=this;return e=!f&&g.length?a.extend.apply(null,[!0,e].concat(g)):e,f&&e.charAt(0)==="_"?h:(f?this.each(function(){var d=a.data(this,c),f=d&&a.isFunction(d[e])?d[e].apply(d,g):d;if(f!==d&&f!==b)return h=f,!1}):this.each(function(){var b=a.data(this,c);b?b.option(e||{})._init():a.data(this,c,new d(e,this))}),h)}},a.Widget=function(a,b){arguments.length&&this._createWidget(a,b)},a.Widget.prototype={widgetName:"widget",widgetEventPrefix:"",options:{disabled:!1},_createWidget:function(b,c){a.data(c,this.widgetName,this),this.element=a(c),this.options=a.extend(!0,{},this.options,this._getCreateOptions(),b);var d=this;this.element.bind("remove."+this.widgetName,function(){d.destroy()}),this._create(),this._trigger("create"),this._init()},_getCreateOptions:function(){return a.metadata&&a.metadata.get(this.element[0])[this.widgetName]},_create:function(){},_init:function(){},destroy:function(){this.element.unbind("."+this.widgetName).removeData(this.widgetName),this.widget().unbind("."+this.widgetName).removeAttr("aria-disabled").removeClass(this.widgetBaseClass+"-disabled "+"ui-state-disabled")},widget:function(){return this.element},option:function(c,d){var e=c;if(arguments.length===0)return a.extend({},this.options);if(typeof c=="string"){if(d===b)return this.options[c];e={},e[c]=d}return this._setOptions(e),this},_setOptions:function(b){var c=this;return a.each(b,function(a,b){c._setOption(a,b)}),this},_setOption:function(a,b){return this.options[a]=b,a==="disabled"&&this.widget()[b?"addClass":"removeClass"](this.widgetBaseClass+"-disabled"+" "+"ui-state-disabled").attr("aria-disabled",b),this},enable:function(){return this._setOption("disabled",!1)},disable:function(){return this._setOption("disabled",!0)},_trigger:function(b,c,d){var e,f,g=this.options[b];d=d||{},c=a.Event(c),c.type=(b===this.widgetEventPrefix?b:this.widgetEventPrefix+b).toLowerCase(),c.target=this.element[0],f=c.originalEvent;if(f)for(e in f)e in c||(c[e]=f[e]);return this.element.trigger(c,d),!(a.isFunction(g)&&g.call(this.element[0],c,d)===!1||c.isDefaultPrevented())}}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.mouse.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=!1;a(document).mouseup(function(a){c=!1}),a.widget("ui.mouse",{options:{cancel:":input,option",distance:1,delay:0},_mouseInit:function(){var b=this;this.element.bind("mousedown."+this.widgetName,function(a){return b._mouseDown(a)}).bind("click."+this.widgetName,function(c){if(!0===a.data(c.target,b.widgetName+".preventClickEvent"))return a.removeData(c.target,b.widgetName+".preventClickEvent"),c.stopImmediatePropagation(),!1}),this.started=!1},_mouseDestroy:function(){this.element.unbind("."+this.widgetName),a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate)},_mouseDown:function(b){if(c)return;this._mouseStarted&&this._mouseUp(b),this._mouseDownEvent=b;var d=this,e=b.which==1,f=typeof this.options.cancel=="string"&&b.target.nodeName?a(b.target).closest(this.options.cancel).length:!1;if(!e||f||!this._mouseCapture(b))return!0;this.mouseDelayMet=!this.options.delay,this.mouseDelayMet||(this._mouseDelayTimer=setTimeout(function(){d.mouseDelayMet=!0},this.options.delay));if(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)){this._mouseStarted=this._mouseStart(b)!==!1;if(!this._mouseStarted)return b.preventDefault(),!0}return!0===a.data(b.target,this.widgetName+".preventClickEvent")&&a.removeData(b.target,this.widgetName+".preventClickEvent"),this._mouseMoveDelegate=function(a){return d._mouseMove(a)},this._mouseUpDelegate=function(a){return d._mouseUp(a)},a(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate),b.preventDefault(),c=!0,!0},_mouseMove:function(b){return!a.browser.msie||document.documentMode>=9||!!b.button?this._mouseStarted?(this._mouseDrag(b),b.preventDefault()):(this._mouseDistanceMet(b)&&this._mouseDelayMet(b)&&(this._mouseStarted=this._mouseStart(this._mouseDownEvent,b)!==!1,this._mouseStarted?this._mouseDrag(b):this._mouseUp(b)),!this._mouseStarted):this._mouseUp(b)},_mouseUp:function(b){return a(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate),this._mouseStarted&&(this._mouseStarted=!1,b.target==this._mouseDownEvent.target&&a.data(b.target,this.widgetName+".preventClickEvent",!0),this._mouseStop(b)),!1},_mouseDistanceMet:function(a){return Math.max(Math.abs(this._mouseDownEvent.pageX-a.pageX),Math.abs(this._mouseDownEvent.pageY-a.pageY))>=this.options.distance},_mouseDelayMet:function(a){return this.mouseDelayMet},_mouseStart:function(a){},_mouseDrag:function(a){},_mouseStop:function(a){},_mouseCapture:function(a){return!0}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.position.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.ui=a.ui||{};var c=/left|center|right/,d=/top|center|bottom/,e="center",f={},g=a.fn.position,h=a.fn.offset;a.fn.position=function(b){if(!b||!b.of)return g.apply(this,arguments);b=a.extend({},b);var h=a(b.of),i=h[0],j=(b.collision||"flip").split(" "),k=b.offset?b.offset.split(" "):[0,0],l,m,n;return i.nodeType===9?(l=h.width(),m=h.height(),n={top:0,left:0}):i.setTimeout?(l=h.width(),m=h.height(),n={top:h.scrollTop(),left:h.scrollLeft()}):i.preventDefault?(b.at="left top",l=m=0,n={top:b.of.pageY,left:b.of.pageX}):(l=h.outerWidth(),m=h.outerHeight(),n=h.offset()),a.each(["my","at"],function(){var a=(b[this]||"").split(" ");a.length===1&&(a=c.test(a[0])?a.concat([e]):d.test(a[0])?[e].concat(a):[e,e]),a[0]=c.test(a[0])?a[0]:e,a[1]=d.test(a[1])?a[1]:e,b[this]=a}),j.length===1&&(j[1]=j[0]),k[0]=parseInt(k[0],10)||0,k.length===1&&(k[1]=k[0]),k[1]=parseInt(k[1],10)||0,b.at[0]==="right"?n.left+=l:b.at[0]===e&&(n.left+=l/2),b.at[1]==="bottom"?n.top+=m:b.at[1]===e&&(n.top+=m/2),n.left+=k[0],n.top+=k[1],this.each(function(){var c=a(this),d=c.outerWidth(),g=c.outerHeight(),h=parseInt(a.curCSS(this,"marginLeft",!0))||0,i=parseInt(a.curCSS(this,"marginTop",!0))||0,o=d+h+(parseInt(a.curCSS(this,"marginRight",!0))||0),p=g+i+(parseInt(a.curCSS(this,"marginBottom",!0))||0),q=a.extend({},n),r;b.my[0]==="right"?q.left-=d:b.my[0]===e&&(q.left-=d/2),b.my[1]==="bottom"?q.top-=g:b.my[1]===e&&(q.top-=g/2),f.fractions||(q.left=Math.round(q.left),q.top=Math.round(q.top)),r={left:q.left-h,top:q.top-i},a.each(["left","top"],function(c,e){a.ui.position[j[c]]&&a.ui.position[j[c]][e](q,{targetWidth:l,targetHeight:m,elemWidth:d,elemHeight:g,collisionPosition:r,collisionWidth:o,collisionHeight:p,offset:k,my:b.my,at:b.at})}),a.fn.bgiframe&&c.bgiframe(),c.offset(a.extend(q,{using:b.using}))})},a.ui.position={fit:{left:function(b,c){var d=a(window),e=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft();b.left=e>0?b.left-e:Math.max(b.left-c.collisionPosition.left,b.left)},top:function(b,c){var d=a(window),e=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop();b.top=e>0?b.top-e:Math.max(b.top-c.collisionPosition.top,b.top)}},flip:{left:function(b,c){if(c.at[0]===e)return;var d=a(window),f=c.collisionPosition.left+c.collisionWidth-d.width()-d.scrollLeft(),g=c.my[0]==="left"?-c.elemWidth:c.my[0]==="right"?c.elemWidth:0,h=c.at[0]==="left"?c.targetWidth:-c.targetWidth,i=-2*c.offset[0];b.left+=c.collisionPosition.left<0?g+h+i:f>0?g+h+i:0},top:function(b,c){if(c.at[1]===e)return;var d=a(window),f=c.collisionPosition.top+c.collisionHeight-d.height()-d.scrollTop(),g=c.my[1]==="top"?-c.elemHeight:c.my[1]==="bottom"?c.elemHeight:0,h=c.at[1]==="top"?c.targetHeight:-c.targetHeight,i=-2*c.offset[1];b.top+=c.collisionPosition.top<0?g+h+i:f>0?g+h+i:0}}},a.offset.setOffset||(a.offset.setOffset=function(b,c){/static/.test(a.curCSS(b,"position"))&&(b.style.position="relative");var d=a(b),e=d.offset(),f=parseInt(a.curCSS(b,"top",!0),10)||0,g=parseInt(a.curCSS(b,"left",!0),10)||0,h={top:c.top-e.top+f,left:c.left-e.left+g};"using"in c?c.using.call(b,h):d.css(h)},a.fn.offset=function(b){var c=this[0];return!c||!c.ownerDocument?null:b?a.isFunction(b)?this.each(function(c){a(this).offset(b.call(this,c,a(this).offset()))}):this.each(function(){a.offset.setOffset(this,b)}):h.call(this)}),function(){var b=document.getElementsByTagName("body")[0],c=document.createElement("div"),d,e,g,h,i;d=document.createElement(b?"div":"body"),g={visibility:"hidden",width:0,height:0,border:0,margin:0,background:"none"},b&&a.extend(g,{position:"absolute",left:"-1000px",top:"-1000px"});for(var j in g)d.style[j]=g[j];d.appendChild(c),e=b||document.documentElement,e.insertBefore(d,e.firstChild),c.style.cssText="position: absolute; left: 10.7432222px; top: 10.432325px; height: 30px; width: 201px;",h=a(c).offset(function(a,b){return b}).offset(),d.innerHTML="",e.removeChild(d),i=h.top+h.left+(b?2e3:0),f.fractions=i>21&&i<22}()})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.draggable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.draggable",a.ui.mouse,{widgetEventPrefix:"drag",options:{addClasses:!0,appendTo:"parent",axis:!1,connectToSortable:!1,containment:!1,cursor:"auto",cursorAt:!1,grid:!1,handle:!1,helper:"original",iframeFix:!1,opacity:!1,refreshPositions:!1,revert:!1,revertDuration:500,scope:"default",scroll:!0,scrollSensitivity:20,scrollSpeed:20,snap:!1,snapMode:"both",snapTolerance:20,stack:!1,zIndex:!1},_create:function(){this.options.helper=="original"&&!/^(?:r|a|f)/.test(this.element.css("position"))&&(this.element[0].style.position="relative"),this.options.addClasses&&this.element.addClass("ui-draggable"),this.options.disabled&&this.element.addClass("ui-draggable-disabled"),this._mouseInit()},destroy:function(){if(!this.element.data("draggable"))return;return this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options;return this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")?!1:(this.handle=this._getHandle(b),this.handle?(c.iframeFix&&a(c.iframeFix===!0?"iframe":c.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1e3}).css(a(this).offset()).appendTo("body")}),!0):!1)},_mouseStart:function(b){var c=this.options;return this.helper=this._createHelper(b),this.helper.addClass("ui-draggable-dragging"),this._cacheHelperProportions(),a.ui.ddmanager&&(a.ui.ddmanager.current=this),this._cacheMargins(),this.cssPosition=this.helper.css("position"),this.scrollParent=this.helper.scrollParent(),this.offset=this.positionAbs=this.element.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.originalPosition=this.position=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,c.cursorAt&&this._adjustOffsetFromHelper(c.cursorAt),c.containment&&this._setContainment(),this._trigger("start",b)===!1?(this._clear(),!1):(this._cacheHelperProportions(),a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this._mouseDrag(b,!0),a.ui.ddmanager&&a.ui.ddmanager.dragStart(this,b),!0)},_mouseDrag:function(b,c){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute");if(!c){var d=this._uiHash();if(this._trigger("drag",b,d)===!1)return this._mouseUp({}),!1;this.position=d.position}if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";return a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),!1},_mouseStop:function(b){var c=!1;a.ui.ddmanager&&!this.options.dropBehaviour&&(c=a.ui.ddmanager.drop(this,b)),this.dropped&&(c=this.dropped,this.dropped=!1);var d=this.element[0],e=!1;while(d&&(d=d.parentNode))d==document&&(e=!0);if(!e&&this.options.helper==="original")return!1;if(this.options.revert=="invalid"&&!c||this.options.revert=="valid"&&c||this.options.revert===!0||a.isFunction(this.options.revert)&&this.options.revert.call(this.element,c)){var f=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){f._trigger("stop",b)!==!1&&f._clear()})}else this._trigger("stop",b)!==!1&&this._clear();return!1},_mouseUp:function(b){return this.options.iframeFix===!0&&a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)}),a.ui.ddmanager&&a.ui.ddmanager.dragStop(this,b),a.ui.mouse.prototype._mouseUp.call(this,b)},cancel:function(){return this.helper.is(".ui-draggable-dragging")?this._mouseUp({}):this._clear(),this},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?!0:!1;return a(this.options.handle,this.element).find("*").andSelf().each(function(){this==b.target&&(c=!0)}),c},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b])):c.helper=="clone"?this.element.clone().removeAttr("id"):this.element;return d.parents("body").length||d.appendTo(c.appendTo=="parent"?this.element[0].parentNode:c.appendTo),d[0]!=this.element[0]&&!/(fixed|absolute)/.test(d.css("position"))&&d.css("position","absolute"),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.element.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.element.css("marginLeft"),10)||0,top:parseInt(this.element.css("marginTop"),10)||0,right:parseInt(this.element.css("marginRight"),10)||0,bottom:parseInt(this.element.css("marginBottom"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[b.containment=="document"?0:a(window).scrollLeft()-this.offset.relative.left-this.offset.parent.left,b.containment=="document"?0:a(window).scrollTop()-this.offset.relative.top-this.offset.parent.top,(b.containment=="document"?0:a(window).scrollLeft())+a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(b.containment=="document"?0:a(window).scrollTop())+(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)&&b.containment.constructor!=Array){var c=a(b.containment),d=c[0];if(!d)return;var e=c.offset(),f=a(d).css("overflow")!="hidden";this.containment=[(parseInt(a(d).css("borderLeftWidth"),10)||0)+(parseInt(a(d).css("paddingLeft"),10)||0),(parseInt(a(d).css("borderTopWidth"),10)||0)+(parseInt(a(d).css("paddingTop"),10)||0),(f?Math.max(d.scrollWidth,d.offsetWidth):d.offsetWidth)-(parseInt(a(d).css("borderLeftWidth"),10)||0)-(parseInt(a(d).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left-this.margins.right,(f?Math.max(d.scrollHeight,d.offsetHeight):d.offsetHeight)-(parseInt(a(d).css("borderTopWidth"),10)||0)-(parseInt(a(d).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top-this.margins.bottom],this.relative_container=c}else b.containment.constructor==Array&&(this.containment=b.containment)},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName),f=b.pageX,g=b.pageY;if(this.originalPosition){var h;if(this.containment){if(this.relative_container){var i=this.relative_container.offset();h=[this.containment[0]+i.left,this.containment[1]+i.top,this.containment[2]+i.left,this.containment[3]+i.top]}else h=this.containment;b.pageX-this.offset.click.left<h[0]&&(f=h[0]+this.offset.click.left),b.pageY-this.offset.click.top<h[1]&&(g=h[1]+this.offset.click.top),b.pageX-this.offset.click.left>h[2]&&(f=h[2]+this.offset.click.left),b.pageY-this.offset.click.top>h[3]&&(g=h[3]+this.offset.click.top)}if(c.grid){var j=c.grid[1]?this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1]:this.originalPageY;g=h?j-this.offset.click.top<h[1]||j-this.offset.click.top>h[3]?j-this.offset.click.top<h[1]?j+c.grid[1]:j-c.grid[1]:j:j;var k=c.grid[0]?this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0]:this.originalPageX;f=h?k-this.offset.click.left<h[0]||k-this.offset.click.left>h[2]?k-this.offset.click.left<h[0]?k+c.grid[0]:k-c.grid[0]:k:k}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&a.browser.version<526&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_clear:function(){this.helper.removeClass("ui-draggable-dragging"),this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval&&this.helper.remove(),this.helper=null,this.cancelHelperRemoval=!1},_trigger:function(b,c,d){return d=d||this._uiHash(),a.ui.plugin.call(this,b,[c,d]),b=="drag"&&(this.positionAbs=this._convertPositionTo("absolute")),a.Widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(a){return{helper:this.helper,position:this.position,originalPosition:this.originalPosition,offset:this.positionAbs}}}),a.extend(a.ui.draggable,{version:"1.8.21"}),a.ui.plugin.add("draggable","connectToSortable",{start:function(b,c){var d=a(this).data("draggable"),e=d.options,f=a.extend({},c,{item:d.element});d.sortables=[],a(e.connectToSortable).each(function(){var c=a.data(this,"sortable");c&&!c.options.disabled&&(d.sortables.push({instance:c,shouldRevert:c.options.revert}),c.refreshPositions(),c._trigger("activate",b,f))})},stop:function(b,c){var d=a(this).data("draggable"),e=a.extend({},c,{item:d.element});a.each(d.sortables,function(){this.instance.isOver?(this.instance.isOver=0,d.cancelHelperRemoval=!0,this.instance.cancelHelperRemoval=!1,this.shouldRevert&&(this.instance.options.revert=!0),this.instance._mouseStop(b),this.instance.options.helper=this.instance.options._helper,d.options.helper=="original"&&this.instance.currentItem.css({top:"auto",left:"auto"})):(this.instance.cancelHelperRemoval=!1,this.instance._trigger("deactivate",b,e))})},drag:function(b,c){var d=a(this).data("draggable"),e=this,f=function(b){var c=this.offset.click.top,d=this.offset.click.left,e=this.positionAbs.top,f=this.positionAbs.left,g=b.height,h=b.width,i=b.top,j=b.left;return a.ui.isOver(e+c,f+d,i,j,g,h)};a.each(d.sortables,function(f){this.instance.positionAbs=d.positionAbs,this.instance.helperProportions=d.helperProportions,this.instance.offset.click=d.offset.click,this.instance._intersectsWith(this.instance.containerCache)?(this.instance.isOver||(this.instance.isOver=1,this.instance.currentItem=a(e).clone().removeAttr("id").appendTo(this.instance.element).data("sortable-item",!0),this.instance.options._helper=this.instance.options.helper,this.instance.options.helper=function(){return c.helper[0]},b.target=this.instance.currentItem[0],this.instance._mouseCapture(b,!0),this.instance._mouseStart(b,!0,!0),this.instance.offset.click.top=d.offset.click.top,this.instance.offset.click.left=d.offset.click.left,this.instance.offset.parent.left-=d.offset.parent.left-this.instance.offset.parent.left,this.instance.offset.parent.top-=d.offset.parent.top-this.instance.offset.parent.top,d._trigger("toSortable",b),d.dropped=this.instance.element,d.currentItem=d.element,this.instance.fromOutside=d),this.instance.currentItem&&this.instance._mouseDrag(b)):this.instance.isOver&&(this.instance.isOver=0,this.instance.cancelHelperRemoval=!0,this.instance.options.revert=!1,this.instance._trigger("out",b,this.instance._uiHash(this.instance)),this.instance._mouseStop(b,!0),this.instance.options.helper=this.instance.options._helper,this.instance.currentItem.remove(),this.instance.placeholder&&this.instance.placeholder.remove(),d._trigger("fromSortable",b),d.dropped=!1)})}}),a.ui.plugin.add("draggable","cursor",{start:function(b,c){var d=a("body"),e=a(this).data("draggable").options;d.css("cursor")&&(e._cursor=d.css("cursor")),d.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;d._cursor&&a("body").css("cursor",d._cursor)}}),a.ui.plugin.add("draggable","opacity",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("opacity")&&(e._opacity=d.css("opacity")),d.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;d._opacity&&a(c.helper).css("opacity",d._opacity)}}),a.ui.plugin.add("draggable","scroll",{start:function(b,c){var d=a(this).data("draggable");d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"&&(d.overflowOffset=d.scrollParent.offset())},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=!1;if(d.scrollParent[0]!=document&&d.scrollParent[0].tagName!="HTML"){if(!e.axis||e.axis!="x")d.overflowOffset.top+d.scrollParent[0].offsetHeight-b.pageY<e.scrollSensitivity?d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop+e.scrollSpeed:b.pageY-d.overflowOffset.top<e.scrollSensitivity&&(d.scrollParent[0].scrollTop=f=d.scrollParent[0].scrollTop-e.scrollSpeed);if(!e.axis||e.axis!="y")d.overflowOffset.left+d.scrollParent[0].offsetWidth-b.pageX<e.scrollSensitivity?d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft+e.scrollSpeed:b.pageX-d.overflowOffset.left<e.scrollSensitivity&&(d.scrollParent[0].scrollLeft=f=d.scrollParent[0].scrollLeft-e.scrollSpeed)}else{if(!e.axis||e.axis!="x")b.pageY-a(document).scrollTop()<e.scrollSensitivity?f=a(document).scrollTop(a(document).scrollTop()-e.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<e.scrollSensitivity&&(f=a(document).scrollTop(a(document).scrollTop()+e.scrollSpeed));if(!e.axis||e.axis!="y")b.pageX-a(document).scrollLeft()<e.scrollSensitivity?f=a(document).scrollLeft(a(document).scrollLeft()-e.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<e.scrollSensitivity&&(f=a(document).scrollLeft(a(document).scrollLeft()+e.scrollSpeed))}f!==!1&&a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(d,b)}}),a.ui.plugin.add("draggable","snap",{start:function(b,c){var d=a(this).data("draggable"),e=d.options;d.snapElements=[],a(e.snap.constructor!=String?e.snap.items||":data(draggable)":e.snap).each(function(){var b=a(this),c=b.offset();this!=d.element[0]&&d.snapElements.push({item:this,width:b.outerWidth(),height:b.outerHeight(),top:c.top,left:c.left})})},drag:function(b,c){var d=a(this).data("draggable"),e=d.options,f=e.snapTolerance,g=c.offset.left,h=g+d.helperProportions.width,i=c.offset.top,j=i+d.helperProportions.height;for(var k=d.snapElements.length-1;k>=0;k--){var l=d.snapElements[k].left,m=l+d.snapElements[k].width,n=d.snapElements[k].top,o=n+d.snapElements[k].height;if(!(l-f<g&&g<m+f&&n-f<i&&i<o+f||l-f<g&&g<m+f&&n-f<j&&j<o+f||l-f<h&&h<m+f&&n-f<i&&i<o+f||l-f<h&&h<m+f&&n-f<j&&j<o+f)){d.snapElements[k].snapping&&d.options.snap.release&&d.options.snap.release.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=!1;continue}if(e.snapMode!="inner"){var p=Math.abs(n-j)<=f,q=Math.abs(o-i)<=f,r=Math.abs(l-h)<=f,s=Math.abs(m-g)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n-d.helperProportions.height,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l-d.helperProportions.width}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m}).left-d.margins.left)}var t=p||q||r||s;if(e.snapMode!="outer"){var p=Math.abs(n-i)<=f,q=Math.abs(o-j)<=f,r=Math.abs(l-g)<=f,s=Math.abs(m-h)<=f;p&&(c.position.top=d._convertPositionTo("relative",{top:n,left:0}).top-d.margins.top),q&&(c.position.top=d._convertPositionTo("relative",{top:o-d.helperProportions.height,left:0}).top-d.margins.top),r&&(c.position.left=d._convertPositionTo("relative",{top:0,left:l}).left-d.margins.left),s&&(c.position.left=d._convertPositionTo("relative",{top:0,left:m-d.helperProportions.width}).left-d.margins.left)}!d.snapElements[k].snapping&&(p||q||r||s||t)&&d.options.snap.snap&&d.options.snap.snap.call(d.element,b,a.extend(d._uiHash(),{snapItem:d.snapElements[k].item})),d.snapElements[k].snapping=p||q||r||s||t}}}),a.ui.plugin.add("draggable","stack",{start:function(b,c){var d=a(this).data("draggable").options,e=a.makeArray(a(d.stack)).sort(function(b,c){return(parseInt(a(b).css("zIndex"),10)||0)-(parseInt(a(c).css("zIndex"),10)||0)});if(!e.length)return;var f=parseInt(e[0].style.zIndex)||0;a(e).each(function(a){this.style.zIndex=f+a}),this[0].style.zIndex=f+e.length}}),a.ui.plugin.add("draggable","zIndex",{start:function(b,c){var d=a(c.helper),e=a(this).data("draggable").options;d.css("zIndex")&&(e._zIndex=d.css("zIndex")),d.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;d._zIndex&&a(c.helper).css("zIndex",d._zIndex)}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.droppable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.droppable",{widgetEventPrefix:"drop",options:{accept:"*",activeClass:!1,addClasses:!0,greedy:!1,hoverClass:!1,scope:"default",tolerance:"intersect"},_create:function(){var b=this.options,c=b.accept;this.isover=0,this.isout=1,this.accept=a.isFunction(c)?c:function(a){return a.is(c)},this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight},a.ui.ddmanager.droppables[b.scope]=a.ui.ddmanager.droppables[b.scope]||[],a.ui.ddmanager.droppables[b.scope].push(this),b.addClasses&&this.element.addClass("ui-droppable")},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++)b[c]==this&&b.splice(c,1);return this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable"),this},_setOption:function(b,c){b=="accept"&&(this.accept=a.isFunction(c)?c:function(a){return a.is(c)}),a.Widget.prototype._setOption.apply(this,arguments)},_activate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.addClass(this.options.activeClass),c&&this._trigger("activate",b,this.ui(c))},_deactivate:function(b){var c=a.ui.ddmanager.current;this.options.activeClass&&this.element.removeClass(this.options.activeClass),c&&this._trigger("deactivate",b,this.ui(c))},_over:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.addClass(this.options.hoverClass),this._trigger("over",b,this.ui(c)))},_out:function(b){var c=a.ui.ddmanager.current;if(!c||(c.currentItem||c.element)[0]==this.element[0])return;this.accept.call(this.element[0],c.currentItem||c.element)&&(this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("out",b,this.ui(c)))},_drop:function(b,c){var d=c||a.ui.ddmanager.current;if(!d||(d.currentItem||d.element)[0]==this.element[0])return!1;var e=!1;return this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var b=a.data(this,"droppable");if(b.options.greedy&&!b.options.disabled&&b.options.scope==d.options.scope&&b.accept.call(b.element[0],d.currentItem||d.element)&&a.ui.intersect(d,a.extend(b,{offset:b.element.offset()}),b.options.tolerance))return e=!0,!1}),e?!1:this.accept.call(this.element[0],d.currentItem||d.element)?(this.options.activeClass&&this.element.removeClass(this.options.activeClass),this.options.hoverClass&&this.element.removeClass(this.options.hoverClass),this._trigger("drop",b,this.ui(d)),this.element):!1},ui:function(a){return{draggable:a.currentItem||a.element,helper:a.helper,position:a.position,offset:a.positionAbs}}}),a.extend(a.ui.droppable,{version:"1.8.21"}),a.ui.intersect=function(b,c,d){if(!c.offset)return!1;var e=(b.positionAbs||b.position.absolute).left,f=e+b.helperProportions.width,g=(b.positionAbs||b.position.absolute).top,h=g+b.helperProportions.height,i=c.offset.left,j=i+c.proportions.width,k=c.offset.top,l=k+c.proportions.height;switch(d){case"fit":return i<=e&&f<=j&&k<=g&&h<=l;case"intersect":return i<e+b.helperProportions.width/2&&f-b.helperProportions.width/2<j&&k<g+b.helperProportions.height/2&&h-b.helperProportions.height/2<l;case"pointer":var m=(b.positionAbs||b.position.absolute).left+(b.clickOffset||b.offset.click).left,n=(b.positionAbs||b.position.absolute).top+(b.clickOffset||b.offset.click).top,o=a.ui.isOver(n,m,k,i,c.proportions.height,c.proportions.width);return o;case"touch":return(g>=k&&g<=l||h>=k&&h<=l||g<k&&h>l)&&(e>=i&&e<=j||f>=i&&f<=j||e<i&&f>j);default:return!1}},a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(b,c){var d=a.ui.ddmanager.droppables[b.options.scope]||[],e=c?c.type:null,f=(b.currentItem||b.element).find(":data(droppable)").andSelf();g:for(var h=0;h<d.length;h++){if(d[h].options.disabled||b&&!d[h].accept.call(d[h].element[0],b.currentItem||b.element))continue;for(var i=0;i<f.length;i++)if(f[i]==d[h].element[0]){d[h].proportions.height=0;continue g}d[h].visible=d[h].element.css("display")!="none";if(!d[h].visible)continue;e=="mousedown"&&d[h]._activate.call(d[h],c),d[h].offset=d[h].element.offset(),d[h].proportions={width:d[h].element[0].offsetWidth,height:d[h].element[0].offsetHeight}}},drop:function(b,c){var d=!1;return a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(!this.options)return;!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)&&(d=this._drop.call(this,c)||d),!this.options.disabled&&this.visible&&this.accept.call(this.element[0],b.currentItem||b.element)&&(this.isout=1,this.isover=0,this._deactivate.call(this,c))}),d},dragStart:function(b,c){b.element.parents(":not(body,html)").bind("scroll.droppable",function(){b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)})},drag:function(b,c){b.options.refreshPositions&&a.ui.ddmanager.prepareOffsets(b,c),a.each(a.ui.ddmanager.droppables[b.options.scope]||[],function(){if(this.options.disabled||this.greedyChild||!this.visible)return;var d=a.ui.intersect(b,this,this.options.tolerance),e=!d&&this.isover==1?"isout":d&&this.isover==0?"isover":null;if(!e)return;var f;if(this.options.greedy){var g=this.element.parents(":data(droppable):eq(0)");g.length&&(f=a.data(g[0],"droppable"),f.greedyChild=e=="isover"?1:0)}f&&e=="isover"&&(f.isover=0,f.isout=1,f._out.call(f,c)),this[e]=1,this[e=="isout"?"isover":"isout"]=0,this[e=="isover"?"_over":"_out"].call(this,c),f&&e=="isout"&&(f.isout=0,f.isover=1,f._over.call(f,c))})},dragStop:function(b,c){b.element.parents(":not(body,html)").unbind("scroll.droppable"),b.options.refreshPositions||a.ui.ddmanager.prepareOffsets(b,c)}}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.resizable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.resizable",a.ui.mouse,{widgetEventPrefix:"resize",options:{alsoResize:!1,animate:!1,animateDuration:"slow",animateEasing:"swing",aspectRatio:!1,autoHide:!1,containment:!1,ghost:!1,grid:!1,handles:"e,s,se",helper:!1,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1e3},_create:function(){var b=this,c=this.options;this.element.addClass("ui-resizable"),a.extend(this,{_aspectRatio:!!c.aspectRatio,aspectRatio:c.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:c.helper||c.ghost||c.animate?c.helper||"ui-resizable-helper":null}),this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)&&(this.element.wrap(a('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")})),this.element=this.element.parent().data("resizable",this.element.data("resizable")),this.elementIsWrapper=!0,this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")}),this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0}),this.originalResizeStyle=this.originalElement.css("resize"),this.originalElement.css("resize","none"),this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"})),this.originalElement.css({margin:this.originalElement.css("margin")}),this._proportionallyResize()),this.handles=c.handles||(a(".ui-resizable-handle",this.element).length?{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"}:"e,s,se");if(this.handles.constructor==String){this.handles=="all"&&(this.handles="n,e,s,w,se,sw,ne,nw");var d=this.handles.split(",");this.handles={};for(var e=0;e<d.length;e++){var f=a.trim(d[e]),g="ui-resizable-"+f,h=a('<div class="ui-resizable-handle '+g+'"></div>');h.css({zIndex:c.zIndex}),"se"==f&&h.addClass("ui-icon ui-icon-gripsmall-diagonal-se"),this.handles[f]=".ui-resizable-"+f,this.element.append(h)}}this._renderAxis=function(b){b=b||this.element;for(var c in this.handles){this.handles[c].constructor==String&&(this.handles[c]=a(this.handles[c],this.element).show());if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var d=a(this.handles[c],this.element),e=0;e=/sw|ne|nw|se|n|s/.test(c)?d.outerHeight():d.outerWidth();var f=["padding",/ne|nw|n/.test(c)?"Top":/se|sw|s/.test(c)?"Bottom":/^e$/.test(c)?"Right":"Left"].join("");b.css(f,e),this._proportionallyResize()}if(!a(this.handles[c]).length)continue}},this._renderAxis(this.element),this._handles=a(".ui-resizable-handle",this.element).disableSelection(),this._handles.mouseover(function(){if(!b.resizing){if(this.className)var a=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i);b.axis=a&&a[1]?a[1]:"se"}}),c.autoHide&&(this._handles.hide(),a(this.element).addClass("ui-resizable-autohide").hover(function(){if(c.disabled)return;a(this).removeClass("ui-resizable-autohide"),b._handles.show()},function(){if(c.disabled)return;b.resizing||(a(this).addClass("ui-resizable-autohide"),b._handles.hide())})),this._mouseInit()},destroy:function(){this._mouseDestroy();var b=function(b){a(b).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){b(this.element);var c=this.element;c.after(this.originalElement.css({position:c.css("position"),width:c.outerWidth(),height:c.outerHeight(),top:c.css("top"),left:c.css("left")})).remove()}return this.originalElement.css("resize",this.originalResizeStyle),b(this.originalElement),this},_mouseCapture:function(b){var c=!1;for(var d in this.handles)a(this.handles[d])[0]==b.target&&(c=!0);return!this.options.disabled&&c},_mouseStart:function(b){var d=this.options,e=this.element.position(),f=this.element;this.resizing=!0,this.documentScroll={top:a(document).scrollTop(),left:a(document).scrollLeft()},(f.is(".ui-draggable")||/absolute/.test(f.css("position")))&&f.css({position:"absolute",top:e.top,left:e.left}),this._renderProxy();var g=c(this.helper.css("left")),h=c(this.helper.css("top"));d.containment&&(g+=a(d.containment).scrollLeft()||0,h+=a(d.containment).scrollTop()||0),this.offset=this.helper.offset(),this.position={left:g,top:h},this.size=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalSize=this._helper?{width:f.outerWidth(),height:f.outerHeight()}:{width:f.width(),height:f.height()},this.originalPosition={left:g,top:h},this.sizeDiff={width:f.outerWidth()-f.width(),height:f.outerHeight()-f.height()},this.originalMousePosition={left:b.pageX,top:b.pageY},this.aspectRatio=typeof d.aspectRatio=="number"?d.aspectRatio:this.originalSize.width/this.originalSize.height||1;var i=a(".ui-resizable-"+this.axis).css("cursor");return a("body").css("cursor",i=="auto"?this.axis+"-resize":i),f.addClass("ui-resizable-resizing"),this._propagate("start",b),!0},_mouseDrag:function(b){var c=this.helper,d=this.options,e={},f=this,g=this.originalMousePosition,h=this.axis,i=b.pageX-g.left||0,j=b.pageY-g.top||0,k=this._change[h];if(!k)return!1;var l=k.apply(this,[b,i,j]),m=a.browser.msie&&a.browser.version<7,n=this.sizeDiff;this._updateVirtualBoundaries(b.shiftKey);if(this._aspectRatio||b.shiftKey)l=this._updateRatio(l,b);return l=this._respectSize(l,b),this._propagate("resize",b),c.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"}),!this._helper&&this._proportionallyResizeElements.length&&this._proportionallyResize(),this._updateCache(l),this._trigger("resize",b,this.ui()),!1},_mouseStop:function(b){this.resizing=!1;var c=this.options,d=this;if(this._helper){var e=this._proportionallyResizeElements,f=e.length&&/textarea/i.test(e[0].nodeName),g=f&&a.ui.hasScroll(e[0],"left")?0:d.sizeDiff.height,h=f?0:d.sizeDiff.width,i={width:d.helper.width()-h,height:d.helper.height()-g},j=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,k=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;c.animate||this.element.css(a.extend(i,{top:k,left:j})),d.helper.height(d.size.height),d.helper.width(d.size.width),this._helper&&!c.animate&&this._proportionallyResize()}return a("body").css("cursor","auto"),this.element.removeClass("ui-resizable-resizing"),this._propagate("stop",b),this._helper&&this.helper.remove(),!1},_updateVirtualBoundaries:function(a){var b=this.options,c,e,f,g,h;h={minWidth:d(b.minWidth)?b.minWidth:0,maxWidth:d(b.maxWidth)?b.maxWidth:Infinity,minHeight:d(b.minHeight)?b.minHeight:0,maxHeight:d(b.maxHeight)?b.maxHeight:Infinity};if(this._aspectRatio||a)c=h.minHeight*this.aspectRatio,f=h.minWidth/this.aspectRatio,e=h.maxHeight*this.aspectRatio,g=h.maxWidth/this.aspectRatio,c>h.minWidth&&(h.minWidth=c),f>h.minHeight&&(h.minHeight=f),e<h.maxWidth&&(h.maxWidth=e),g<h.maxHeight&&(h.maxHeight=g);this._vBoundaries=h},_updateCache:function(a){var b=this.options;this.offset=this.helper.offset(),d(a.left)&&(this.position.left=a.left),d(a.top)&&(this.position.top=a.top),d(a.height)&&(this.size.height=a.height),d(a.width)&&(this.size.width=a.width)},_updateRatio:function(a,b){var c=this.options,e=this.position,f=this.size,g=this.axis;return d(a.height)?a.width=a.height*this.aspectRatio:d(a.width)&&(a.height=a.width/this.aspectRatio),g=="sw"&&(a.left=e.left+(f.width-a.width),a.top=null),g=="nw"&&(a.top=e.top+(f.height-a.height),a.left=e.left+(f.width-a.width)),a},_respectSize:function(a,b){var c=this.helper,e=this._vBoundaries,f=this._aspectRatio||b.shiftKey,g=this.axis,h=d(a.width)&&e.maxWidth&&e.maxWidth<a.width,i=d(a.height)&&e.maxHeight&&e.maxHeight<a.height,j=d(a.width)&&e.minWidth&&e.minWidth>a.width,k=d(a.height)&&e.minHeight&&e.minHeight>a.height;j&&(a.width=e.minWidth),k&&(a.height=e.minHeight),h&&(a.width=e.maxWidth),i&&(a.height=e.maxHeight);var l=this.originalPosition.left+this.originalSize.width,m=this.position.top+this.size.height,n=/sw|nw|w/.test(g),o=/nw|ne|n/.test(g);j&&n&&(a.left=l-e.minWidth),h&&n&&(a.left=l-e.maxWidth),k&&o&&(a.top=m-e.minHeight),i&&o&&(a.top=m-e.maxHeight);var p=!a.width&&!a.height;return p&&!a.left&&a.top?a.top=null:p&&!a.top&&a.left&&(a.left=null),a},_proportionallyResize:function(){var b=this.options;if(!this._proportionallyResizeElements.length)return;var c=this.helper||this.element;for(var d=0;d<this._proportionallyResizeElements.length;d++){var e=this._proportionallyResizeElements[d];if(!this.borderDif){var f=[e.css("borderTopWidth"),e.css("borderRightWidth"),e.css("borderBottomWidth"),e.css("borderLeftWidth")],g=[e.css("paddingTop"),e.css("paddingRight"),e.css("paddingBottom"),e.css("paddingLeft")];this.borderDif=a.map(f,function(a,b){var c=parseInt(a,10)||0,d=parseInt(g[b],10)||0;return c+d})}if(!a.browser.msie||!a(c).is(":hidden")&&!a(c).parents(":hidden").length)e.css({height:c.height()-this.borderDif[0]-this.borderDif[2]||0,width:c.width()-this.borderDif[1]-this.borderDif[3]||0});else continue}},_renderProxy:function(){var b=this.element,c=this.options;this.elementOffset=b.offset();if(this._helper){this.helper=this.helper||a('<div style="overflow:hidden;"></div>');var d=a.browser.msie&&a.browser.version<7,e=d?1:0,f=d?2:-1;this.helper.addClass(this._helper).css({width:this.element.outerWidth()+f,height:this.element.outerHeight()+f,position:"absolute",left:this.elementOffset.left-e+"px",top:this.elementOffset.top-e+"px",zIndex:++c.zIndex}),this.helper.appendTo("body").disableSelection()}else this.helper=this.element},_change:{e:function(a,b,c){return{width:this.originalSize.width+b}},w:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{left:f.left+b,width:e.width-b}},n:function(a,b,c){var d=this.options,e=this.originalSize,f=this.originalPosition;return{top:f.top+c,height:e.height-c}},s:function(a,b,c){return{height:this.originalSize.height+c}},se:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},sw:function(b,c,d){return a.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[b,c,d]))},ne:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[b,c,d]))},nw:function(b,c,d){return a.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[b,c,d]))}},_propagate:function(b,c){a.ui.plugin.call(this,b,[c,this.ui()]),b!="resize"&&this._trigger(b,c,this.ui())},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}),a.extend(a.ui.resizable,{version:"1.8.21"}),a.ui.plugin.add("resizable","alsoResize",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=function(b){a(b).each(function(){var b=a(this);b.data("resizable-alsoresize",{width:parseInt(b.width(),10),height:parseInt(b.height(),10),left:parseInt(b.css("left"),10),top:parseInt(b.css("top"),10)})})};typeof e.alsoResize=="object"&&!e.alsoResize.parentNode?e.alsoResize.length?(e.alsoResize=e.alsoResize[0],f(e.alsoResize)):a.each(e.alsoResize,function(a){f(a)}):f(e.alsoResize)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.originalSize,g=d.originalPosition,h={height:d.size.height-f.height||0,width:d.size.width-f.width||0,top:d.position.top-g.top||0,left:d.position.left-g.left||0},i=function(b,d){a(b).each(function(){var b=a(this),e=a(this).data("resizable-alsoresize"),f={},g=d&&d.length?d:b.parents(c.originalElement[0]).length?["width","height"]:["width","height","top","left"];a.each(g,function(a,b){var c=(e[b]||0)+(h[b]||0);c&&c>=0&&(f[b]=c||null)}),b.css(f)})};typeof e.alsoResize=="object"&&!e.alsoResize.nodeType?a.each(e.alsoResize,function(a,b){i(a,b)}):i(e.alsoResize)},stop:function(b,c){a(this).removeData("resizable-alsoresize")}}),a.ui.plugin.add("resizable","animate",{stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d._proportionallyResizeElements,g=f.length&&/textarea/i.test(f[0].nodeName),h=g&&a.ui.hasScroll(f[0],"left")?0:d.sizeDiff.height,i=g?0:d.sizeDiff.width,j={width:d.size.width-i,height:d.size.height-h},k=parseInt(d.element.css("left"),10)+(d.position.left-d.originalPosition.left)||null,l=parseInt(d.element.css("top"),10)+(d.position.top-d.originalPosition.top)||null;d.element.animate(a.extend(j,l&&k?{top:l,left:k}:{}),{duration:e.animateDuration,easing:e.animateEasing,step:function(){var c={width:parseInt(d.element.css("width"),10),height:parseInt(d.element.css("height"),10),top:parseInt(d.element.css("top"),10),left:parseInt(d.element.css("left"),10)};f&&f.length&&a(f[0]).css({width:c.width,height:c.height}),d._updateCache(c),d._propagate("resize",b)}})}}),a.ui.plugin.add("resizable","containment",{start:function(b,d){var e=a(this).data("resizable"),f=e.options,g=e.element,h=f.containment,i=h instanceof a?h.get(0):/parent/.test(h)?g.parent().get(0):h;if(!i)return;e.containerElement=a(i);if(/document/.test(h)||h==document)e.containerOffset={left:0,top:0},e.containerPosition={left:0,top:0},e.parentData={element:a(document),left:0,top:0,width:a(document).width(),height:a(document).height()||document.body.parentNode.scrollHeight};else{var j=a(i),k=[];a(["Top","Right","Left","Bottom"]).each(function(a,b){k[a]=c(j.css("padding"+b))}),e.containerOffset=j.offset(),e.containerPosition=j.position(),e.containerSize={height:j.innerHeight()-k[3],width:j.innerWidth()-k[1]};var l=e.containerOffset,m=e.containerSize.height,n=e.containerSize.width,o=a.ui.hasScroll(i,"left")?i.scrollWidth:n,p=a.ui.hasScroll(i)?i.scrollHeight:m;e.parentData={element:i,left:l.left,top:l.top,width:o,height:p}}},resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.containerSize,g=d.containerOffset,h=d.size,i=d.position,j=d._aspectRatio||b.shiftKey,k={top:0,left:0},l=d.containerElement;l[0]!=document&&/static/.test(l.css("position"))&&(k=g),i.left<(d._helper?g.left:0)&&(d.size.width=d.size.width+(d._helper?d.position.left-g.left:d.position.left-k.left),j&&(d.size.height=d.size.width/d.aspectRatio),d.position.left=e.helper?g.left:0),i.top<(d._helper?g.top:0)&&(d.size.height=d.size.height+(d._helper?d.position.top-g.top:d.position.top),j&&(d.size.width=d.size.height*d.aspectRatio),d.position.top=d._helper?g.top:0),d.offset.left=d.parentData.left+d.position.left,d.offset.top=d.parentData.top+d.position.top;var m=Math.abs((d._helper?d.offset.left-k.left:d.offset.left-k.left)+d.sizeDiff.width),n=Math.abs((d._helper?d.offset.top-k.top:d.offset.top-g.top)+d.sizeDiff.height),o=d.containerElement.get(0)==d.element.parent().get(0),p=/relative|absolute/.test(d.containerElement.css("position"));o&&p&&(m-=d.parentData.left),m+d.size.width>=d.parentData.width&&(d.size.width=d.parentData.width-m,j&&(d.size.height=d.size.width/d.aspectRatio)),n+d.size.height>=d.parentData.height&&(d.size.height=d.parentData.height-n,j&&(d.size.width=d.size.height*d.aspectRatio))},stop:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.position,g=d.containerOffset,h=d.containerPosition,i=d.containerElement,j=a(d.helper),k=j.offset(),l=j.outerWidth()-d.sizeDiff.width,m=j.outerHeight()-d.sizeDiff.height;d._helper&&!e.animate&&/relative/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m}),d._helper&&!e.animate&&/static/.test(i.css("position"))&&a(this).css({left:k.left-h.left-g.left,width:l,height:m})}}),a.ui.plugin.add("resizable","ghost",{start:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size;d.ghost=d.originalElement.clone(),d.ghost.css({opacity:.25,display:"block",position:"relative",height:f.height,width:f.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof e.ghost=="string"?e.ghost:""),d.ghost.appendTo(d.helper)},resize:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})},stop:function(b,c){var d=a(this).data("resizable"),e=d.options;d.ghost&&d.helper&&d.helper.get(0).removeChild(d.ghost.get(0))}}),a.ui.plugin.add("resizable","grid",{resize:function(b,c){var d=a(this).data("resizable"),e=d.options,f=d.size,g=d.originalSize,h=d.originalPosition,i=d.axis,j=e._aspectRatio||b.shiftKey;e.grid=typeof e.grid=="number"?[e.grid,e.grid]:e.grid;var k=Math.round((f.width-g.width)/(e.grid[0]||1))*(e.grid[0]||1),l=Math.round((f.height-g.height)/(e.grid[1]||1))*(e.grid[1]||1);/^(se|s|e)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l):/^(ne)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l):/^(sw)$/.test(i)?(d.size.width=g.width+k,d.size.height=g.height+l,d.position.left=h.left-k):(d.size.width=g.width+k,d.size.height=g.height+l,d.position.top=h.top-l,d.position.left=h.left-k)}});var c=function(a){return parseInt(a,10)||0},d=function(a){return!isNaN(parseInt(a,10))}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.selectable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.selectable",a.ui.mouse,{options:{appendTo:"body",autoRefresh:!0,distance:0,filter:"*",tolerance:"touch"},_create:function(){var b=this;this.element.addClass("ui-selectable"),this.dragged=!1;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]),c.addClass("ui-selectee"),c.each(function(){var b=a(this),c=b.offset();a.data(this,"selectable-item",{element:this,$element:b,left:c.left,top:c.top,right:c.left+b.outerWidth(),bottom:c.top+b.outerHeight(),startselected:!1,selected:b.hasClass("ui-selected"),selecting:b.hasClass("ui-selecting"),unselecting:b.hasClass("ui-unselecting")})})},this.refresh(),this.selectees=c.addClass("ui-selectee"),this._mouseInit(),this.helper=a("<div class='ui-selectable-helper'></div>")},destroy:function(){return this.selectees.removeClass("ui-selectee").removeData("selectable-item"),this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable"),this._mouseDestroy(),this},_mouseStart:function(b){var c=this;this.opos=[b.pageX,b.pageY];if(this.options.disabled)return;var d=this.options;this.selectees=a(d.filter,this.element[0]),this._trigger("start",b),a(d.appendTo).append(this.helper),this.helper.css({left:b.clientX,top:b.clientY,width:0,height:0}),d.autoRefresh&&this.refresh(),this.selectees.filter(".ui-selected").each(function(){var d=a.data(this,"selectable-item");d.startselected=!0,!b.metaKey&&!b.ctrlKey&&(d.$element.removeClass("ui-selected"),d.selected=!1,d.$element.addClass("ui-unselecting"),d.unselecting=!0,c._trigger("unselecting",b,{unselecting:d.element}))}),a(b.target).parents().andSelf().each(function(){var d=a.data(this,"selectable-item");if(d){var e=!b.metaKey&&!b.ctrlKey||!d.$element.hasClass("ui-selected");return d.$element.removeClass(e?"ui-unselecting":"ui-selected").addClass(e?"ui-selecting":"ui-unselecting"),d.unselecting=!e,d.selecting=e,d.selected=e,e?c._trigger("selecting",b,{selecting:d.element}):c._trigger("unselecting",b,{unselecting:d.element}),!1}})},_mouseDrag:function(b){var c=this;this.dragged=!0;if(this.options.disabled)return;var d=this.options,e=this.opos[0],f=this.opos[1],g=b.pageX,h=b.pageY;if(e>g){var i=g;g=e,e=i}if(f>h){var i=h;h=f,f=i}return this.helper.css({left:e,top:f,width:g-e,height:h-f}),this.selectees.each(function(){var i=a.data(this,"selectable-item");if(!i||i.element==c.element[0])return;var j=!1;d.tolerance=="touch"?j=!(i.left>g||i.right<e||i.top>h||i.bottom<f):d.tolerance=="fit"&&(j=i.left>e&&i.right<g&&i.top>f&&i.bottom<h),j?(i.selected&&(i.$element.removeClass("ui-selected"),i.selected=!1),i.unselecting&&(i.$element.removeClass("ui-unselecting"),i.unselecting=!1),i.selecting||(i.$element.addClass("ui-selecting"),i.selecting=!0,c._trigger("selecting",b,{selecting:i.element}))):(i.selecting&&((b.metaKey||b.ctrlKey)&&i.startselected?(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.$element.addClass("ui-selected"),i.selected=!0):(i.$element.removeClass("ui-selecting"),i.selecting=!1,i.startselected&&(i.$element.addClass("ui-unselecting"),i.unselecting=!0),c._trigger("unselecting",b,{unselecting:i.element}))),i.selected&&!b.metaKey&&!b.ctrlKey&&!i.startselected&&(i.$element.removeClass("ui-selected"),i.selected=!1,i.$element.addClass("ui-unselecting"),i.unselecting=!0,c._trigger("unselecting",b,{unselecting:i.element})))}),!1},_mouseStop:function(b){var c=this;this.dragged=!1;var d=this.options;return a(".ui-unselecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-unselecting"),d.unselecting=!1,d.startselected=!1,c._trigger("unselected",b,{unselected:d.element})}),a(".ui-selecting",this.element[0]).each(function(){var d=a.data(this,"selectable-item");d.$element.removeClass("ui-selecting").addClass("ui-selected"),d.selecting=!1,d.selected=!0,d.startselected=!0,c._trigger("selected",b,{selected:d.element})}),this._trigger("stop",b),this.helper.remove(),!1}}),a.extend(a.ui.selectable,{version:"1.8.21"})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.sortable.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.sortable",a.ui.mouse,{widgetEventPrefix:"sort",ready:!1,options:{appendTo:"parent",axis:!1,connectWith:!1,containment:!1,cursor:"auto",cursorAt:!1,dropOnEmpty:!0,forcePlaceholderSize:!1,forceHelperSize:!1,grid:!1,handle:!1,helper:"original",items:"> *",opacity:!1,placeholder:!1,revert:!1,scroll:!0,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1e3},_create:function(){var a=this.options;this.containerCache={},this.element.addClass("ui-sortable"),this.refresh(),this.floating=this.items.length?a.axis==="x"||/left|right/.test(this.items[0].item.css("float"))||/inline|table-cell/.test(this.items[0].item.css("display")):!1,this.offset=this.element.offset(),this._mouseInit(),this.ready=!0},destroy:function(){a.Widget.prototype.destroy.call(this),this.element.removeClass("ui-sortable ui-sortable-disabled"),this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--)this.items[b].item.removeData(this.widgetName+"-item");return this},_setOption:function(b,c){b==="disabled"?(this.options[b]=c,this.widget()[c?"addClass":"removeClass"]("ui-sortable-disabled")):a.Widget.prototype._setOption.apply(this,arguments)},_mouseCapture:function(b,c){var d=this;if(this.reverting)return!1;if(this.options.disabled||this.options.type=="static")return!1;this._refreshItems(b);var e=null,f=this,g=a(b.target).parents().each(function(){if(a.data(this,d.widgetName+"-item")==f)return e=a(this),!1});a.data(b.target,d.widgetName+"-item")==f&&(e=a(b.target));if(!e)return!1;if(this.options.handle&&!c){var h=!1;a(this.options.handle,e).find("*").andSelf().each(function(){this==b.target&&(h=!0)});if(!h)return!1}return this.currentItem=e,this._removeCurrentsFromItems(),!0},_mouseStart:function(b,c,d){var e=this.options,f=this;this.currentContainer=this,this.refreshPositions(),this.helper=this._createHelper(b),this._cacheHelperProportions(),this._cacheMargins(),this.scrollParent=this.helper.scrollParent(),this.offset=this.currentItem.offset(),this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left},a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()}),this.helper.css("position","absolute"),this.cssPosition=this.helper.css("position"),this.originalPosition=this._generatePosition(b),this.originalPageX=b.pageX,this.originalPageY=b.pageY,e.cursorAt&&this._adjustOffsetFromHelper(e.cursorAt),this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]},this.helper[0]!=this.currentItem[0]&&this.currentItem.hide(),this._createPlaceholder(),e.containment&&this._setContainment(),e.cursor&&(a("body").css("cursor")&&(this._storedCursor=a("body").css("cursor")),a("body").css("cursor",e.cursor)),e.opacity&&(this.helper.css("opacity")&&(this._storedOpacity=this.helper.css("opacity")),this.helper.css("opacity",e.opacity)),e.zIndex&&(this.helper.css("zIndex")&&(this._storedZIndex=this.helper.css("zIndex")),this.helper.css("zIndex",e.zIndex)),this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"&&(this.overflowOffset=this.scrollParent.offset()),this._trigger("start",b,this._uiHash()),this._preserveHelperProportions||this._cacheHelperProportions();if(!d)for(var g=this.containers.length-1;g>=0;g--)this.containers[g]._trigger("activate",b,f._uiHash(this));return a.ui.ddmanager&&(a.ui.ddmanager.current=this),a.ui.ddmanager&&!e.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b),this.dragging=!0,this.helper.addClass("ui-sortable-helper"),this._mouseDrag(b),!0},_mouseDrag:function(b){this.position=this._generatePosition(b),this.positionAbs=this._convertPositionTo("absolute"),this.lastPositionAbs||(this.lastPositionAbs=this.positionAbs);if(this.options.scroll){var c=this.options,d=!1;this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"?(this.overflowOffset.top+this.scrollParent[0].offsetHeight-b.pageY<c.scrollSensitivity?this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop+c.scrollSpeed:b.pageY-this.overflowOffset.top<c.scrollSensitivity&&(this.scrollParent[0].scrollTop=d=this.scrollParent[0].scrollTop-c.scrollSpeed),this.overflowOffset.left+this.scrollParent[0].offsetWidth-b.pageX<c.scrollSensitivity?this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft+c.scrollSpeed:b.pageX-this.overflowOffset.left<c.scrollSensitivity&&(this.scrollParent[0].scrollLeft=d=this.scrollParent[0].scrollLeft-c.scrollSpeed)):(b.pageY-a(document).scrollTop()<c.scrollSensitivity?d=a(document).scrollTop(a(document).scrollTop()-c.scrollSpeed):a(window).height()-(b.pageY-a(document).scrollTop())<c.scrollSensitivity&&(d=a(document).scrollTop(a(document).scrollTop()+c.scrollSpeed)),b.pageX-a(document).scrollLeft()<c.scrollSensitivity?d=a(document).scrollLeft(a(document).scrollLeft()-c.scrollSpeed):a(window).width()-(b.pageX-a(document).scrollLeft())<c.scrollSensitivity&&(d=a(document).scrollLeft(a(document).scrollLeft()+c.scrollSpeed))),d!==!1&&a.ui.ddmanager&&!c.dropBehaviour&&a.ui.ddmanager.prepareOffsets(this,b)}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y")this.helper[0].style.left=this.position.left+"px";if(!this.options.axis||this.options.axis!="x")this.helper[0].style.top=this.position.top+"px";for(var e=this.items.length-1;e>=0;e--){var f=this.items[e],g=f.item[0],h=this._intersectsWithPointer(f);if(!h)continue;if(g!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=g&&!a.ui.contains(this.placeholder[0],g)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],g):!0)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(f))this._rearrange(b,f);else break;this._trigger("change",b,this._uiHash());break}}return this._contactContainers(b),a.ui.ddmanager&&a.ui.ddmanager.drag(this,b),this._trigger("sort",b,this._uiHash()),this.lastPositionAbs=this.positionAbs,!1},_mouseStop:function(b,c){if(!b)return;a.ui.ddmanager&&!this.options.dropBehaviour&&a.ui.ddmanager.drop(this,b);if(this.options.revert){var d=this,e=d.placeholder.offset();d.reverting=!0,a(this.helper).animate({left:e.left-this.offset.parent.left-d.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-d.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){d._clear(b)})}else this._clear(b,c);return!1},cancel:function(){var b=this;if(this.dragging){this._mouseUp({target:null}),this.options.helper=="original"?this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper"):this.currentItem.show();for(var c=this.containers.length-1;c>=0;c--)this.containers[c]._trigger("deactivate",null,b._uiHash(this)),this.containers[c].containerCache.over&&(this.containers[c]._trigger("out",null,b._uiHash(this)),this.containers[c].containerCache.over=0)}return this.placeholder&&(this.placeholder[0].parentNode&&this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.options.helper!="original"&&this.helper&&this.helper[0].parentNode&&this.helper.remove(),a.extend(this,{helper:null,dragging:!1,reverting:!1,_noFinalSort:null}),this.domPosition.prev?a(this.domPosition.prev).after(this.currentItem):a(this.domPosition.parent).prepend(this.currentItem)),this},serialize:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},a(c).each(function(){var c=(a(b.item||this).attr(b.attribute||"id")||"").match(b.expression||/(.+)[-=_](.+)/);c&&d.push((b.key||c[1]+"[]")+"="+(b.key&&b.expression?c[1]:c[2]))}),!d.length&&b.key&&d.push(b.key+"="),d.join("&")},toArray:function(b){var c=this._getItemsAsjQuery(b&&b.connected),d=[];return b=b||{},c.each(function(){d.push(a(b.item||this).attr(b.attribute||"id")||"")}),d},_intersectsWith:function(a){var b=this.positionAbs.left,c=b+this.helperProportions.width,d=this.positionAbs.top,e=d+this.helperProportions.height,f=a.left,g=f+a.width,h=a.top,i=h+a.height,j=this.offset.click.top,k=this.offset.click.left,l=d+j>h&&d+j<i&&b+k>f&&b+k<g;return this.options.tolerance=="pointer"||this.options.forcePointerForContainers||this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>a[this.floating?"width":"height"]?l:f<b+this.helperProportions.width/2&&c-this.helperProportions.width/2<g&&h<d+this.helperProportions.height/2&&e-this.helperProportions.height/2<i},_intersectsWithPointer:function(b){var c=this.options.axis==="x"||a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top,b.height),d=this.options.axis==="y"||a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left,b.width),e=c&&d,f=this._getDragVerticalDirection(),g=this._getDragHorizontalDirection();return e?this.floating?g&&g=="right"||f=="down"?2:1:f&&(f=="down"?2:1):!1},_intersectsWithSides:function(b){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,b.top+b.height/2,b.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,b.left+b.width/2,b.width),e=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();return this.floating&&f?f=="right"&&d||f=="left"&&!d:e&&(e=="down"&&c||e=="up"&&!c)},_getDragVerticalDirection:function(){var a=this.positionAbs.top-this.lastPositionAbs.top;return a!=0&&(a>0?"down":"up")},_getDragHorizontalDirection:function(){var a=this.positionAbs.left-this.lastPositionAbs.left;return a!=0&&(a>0?"right":"left")},refresh:function(a){return this._refreshItems(a),this.refreshPositions(),this},_connectWith:function(){var a=this.options;return a.connectWith.constructor==String?[a.connectWith]:a.connectWith},_getItemsAsjQuery:function(b){var c=this,d=[],e=[],f=this._connectWith();if(f&&b)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&e.push([a.isFunction(j.options.items)?j.options.items.call(j.element):a(j.options.items,j.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),j])}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper").not(".ui-sortable-placeholder"),this]);for(var g=e.length-1;g>=0;g--)e[g][0].each(function(){d.push(this)});return a(d)},_removeCurrentsFromItems:function(){var a=this.currentItem.find(":data("+this.widgetName+"-item)");for(var b=0;b<this.items.length;b++)for(var c=0;c<a.length;c++)a[c]==this.items[b].item[0]&&this.items.splice(b,1)},_refreshItems:function(b){this.items=[],this.containers=[this];var c=this.items,d=this,e=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]],f=this._connectWith();if(f&&this.ready)for(var g=f.length-1;g>=0;g--){var h=a(f[g]);for(var i=h.length-1;i>=0;i--){var j=a.data(h[i],this.widgetName);j&&j!=this&&!j.options.disabled&&(e.push([a.isFunction(j.options.items)?j.options.items.call(j.element[0],b,{item:this.currentItem}):a(j.options.items,j.element),j]),this.containers.push(j))}}for(var g=e.length-1;g>=0;g--){var k=e[g][1],l=e[g][0];for(var i=0,m=l.length;i<m;i++){var n=a(l[i]);n.data(this.widgetName+"-item",k),c.push({item:n,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){this.offsetParent&&this.helper&&(this.offset.parent=this._getParentOffset());for(var c=this.items.length-1;c>=0;c--){var d=this.items[c];if(d.instance!=this.currentContainer&&this.currentContainer&&d.item[0]!=this.currentItem[0])continue;var e=this.options.toleranceElement?a(this.options.toleranceElement,d.item):d.item;b||(d.width=e.outerWidth(),d.height=e.outerHeight());var f=e.offset();d.left=f.left,d.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers)this.options.custom.refreshContainers.call(this);else for(var c=this.containers.length-1;c>=0;c--){var f=this.containers[c].element.offset();this.containers[c].containerCache.left=f.left,this.containers[c].containerCache.top=f.top,this.containers[c].containerCache.width=this.containers[c].element.outerWidth(),this.containers[c].containerCache.height=this.containers[c].element.outerHeight()}return this},_createPlaceholder:function(b){var c=b||this,d=c.options;if(!d.placeholder||d.placeholder.constructor==String){var e=d.placeholder;d.placeholder={element:function(){var b=a(document.createElement(c.currentItem[0].nodeName)).addClass(e||c.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];return e||(b.style.visibility="hidden"),b},update:function(a,b){if(e&&!d.forcePlaceholderSize)return;b.height()||b.height(c.currentItem.innerHeight()-parseInt(c.currentItem.css("paddingTop")||0,10)-parseInt(c.currentItem.css("paddingBottom")||0,10)),b.width()||b.width(c.currentItem.innerWidth()-parseInt(c.currentItem.css("paddingLeft")||0,10)-parseInt(c.currentItem.css("paddingRight")||0,10))}}}c.placeholder=a(d.placeholder.element.call(c.element,c.currentItem)),c.currentItem.after(c.placeholder),d.placeholder.update(c,c.placeholder)},_contactContainers:function(b){var c=null,d=null;for(var e=this.containers.length-1;e>=0;e--){if(a.ui.contains(this.currentItem[0],this.containers[e].element[0]))continue;if(this._intersectsWith(this.containers[e].containerCache)){if(c&&a.ui.contains(this.containers[e].element[0],c.element[0]))continue;c=this.containers[e],d=e}else this.containers[e].containerCache.over&&(this.containers[e]._trigger("out",b,this._uiHash(this)),this.containers[e].containerCache.over=0)}if(!c)return;if(this.containers.length===1)this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1;else if(this.currentContainer!=this.containers[d]){var f=1e4,g=null,h=this.positionAbs[this.containers[d].floating?"left":"top"];for(var i=this.items.length-1;i>=0;i--){if(!a.ui.contains(this.containers[d].element[0],this.items[i].item[0]))continue;var j=this.containers[d].floating?this.items[i].item.offset().left:this.items[i].item.offset().top;Math.abs(j-h)<f&&(f=Math.abs(j-h),g=this.items[i],this.direction=j-h>0?"down":"up")}if(!g&&!this.options.dropOnEmpty)return;this.currentContainer=this.containers[d],g?this._rearrange(b,g,null,!0):this._rearrange(b,null,this.containers[d].element,!0),this._trigger("change",b,this._uiHash()),this.containers[d]._trigger("change",b,this._uiHash(this)),this.options.placeholder.update(this.currentContainer,this.placeholder),this.containers[d]._trigger("over",b,this._uiHash(this)),this.containers[d].containerCache.over=1}},_createHelper:function(b){var c=this.options,d=a.isFunction(c.helper)?a(c.helper.apply(this.element[0],[b,this.currentItem])):c.helper=="clone"?this.currentItem.clone():this.currentItem;return d.parents("body").length||a(c.appendTo!="parent"?c.appendTo:this.currentItem[0].parentNode)[0].appendChild(d[0]),d[0]==this.currentItem[0]&&(this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}),(d[0].style.width==""||c.forceHelperSize)&&d.width(this.currentItem.width()),(d[0].style.height==""||c.forceHelperSize)&&d.height(this.currentItem.height()),d},_adjustOffsetFromHelper:function(b){typeof b=="string"&&(b=b.split(" ")),a.isArray(b)&&(b={left:+b[0],top:+b[1]||0}),"left"in b&&(this.offset.click.left=b.left+this.margins.left),"right"in b&&(this.offset.click.left=this.helperProportions.width-b.right+this.margins.left),"top"in b&&(this.offset.click.top=b.top+this.margins.top),"bottom"in b&&(this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top)},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])&&(b.left+=this.scrollParent.scrollLeft(),b.top+=this.scrollParent.scrollTop());if(this.offsetParent[0]==document.body||this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)b={top:0,left:0};return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var a=this.currentItem.position();return{top:a.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:a.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}return{top:0,left:0}},_cacheMargins:function(){this.margins={left:parseInt(this.currentItem.css("marginLeft"),10)||0,top:parseInt(this.currentItem.css("marginTop"),10)||0}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var b=this.options;b.containment=="parent"&&(b.containment=this.helper[0].parentNode);if(b.containment=="document"||b.containment=="window")this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(b.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(b.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top];if(!/^(document|window|parent)$/.test(b.containment)){var c=a(b.containment)[0],d=a(b.containment).offset(),e=a(c).css("overflow")!="hidden";this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(e?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(e?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(b,c){c||(c=this.position);var d=b=="absolute"?1:-1,e=this.options,f=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=/(html|body)/i.test(f[0].tagName);return{top:c.top+this.offset.relative.top*d+this.offset.parent.top*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():g?0:f.scrollTop())*d),left:c.left+this.offset.relative.left*d+this.offset.parent.left*d-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:f.scrollLeft())*d)}},_generatePosition:function(b){var c=this.options,d=this.cssPosition=="absolute"&&(this.scrollParent[0]==document||!a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,e=/(html|body)/i.test(d[0].tagName);this.cssPosition=="relative"&&(this.scrollParent[0]==document||this.scrollParent[0]==this.offsetParent[0])&&(this.offset.relative=this._getRelativeOffset());var f=b.pageX,g=b.pageY;if(this.originalPosition){this.containment&&(b.pageX-this.offset.click.left<this.containment[0]&&(f=this.containment[0]+this.offset.click.left),b.pageY-this.offset.click.top<this.containment[1]&&(g=this.containment[1]+this.offset.click.top),b.pageX-this.offset.click.left>this.containment[2]&&(f=this.containment[2]+this.offset.click.left),b.pageY-this.offset.click.top>this.containment[3]&&(g=this.containment[3]+this.offset.click.top));if(c.grid){var h=this.originalPageY+Math.round((g-this.originalPageY)/c.grid[1])*c.grid[1];g=this.containment?h-this.offset.click.top<this.containment[1]||h-this.offset.click.top>this.containment[3]?h-this.offset.click.top<this.containment[1]?h+c.grid[1]:h-c.grid[1]:h:h;var i=this.originalPageX+Math.round((f-this.originalPageX)/c.grid[0])*c.grid[0];f=this.containment?i-this.offset.click.left<this.containment[0]||i-this.offset.click.left>this.containment[2]?i-this.offset.click.left<this.containment[0]?i+c.grid[0]:i-c.grid[0]:i:i}}return{top:g-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollTop():e?0:d.scrollTop()),left:f-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():e?0:d.scrollLeft())}},_rearrange:function(a,b,c,d){c?c[0].appendChild(this.placeholder[0]):b.item[0].parentNode.insertBefore(this.placeholder[0],this.direction=="down"?b.item[0]:b.item[0].nextSibling),this.counter=this.counter?++this.counter:1;var e=this,f=this.counter;window.setTimeout(function(){f==e.counter&&e.refreshPositions(!d)},0)},_clear:function(b,c){this.reverting=!1;var d=[],e=this;!this._noFinalSort&&this.currentItem.parent().length&&this.placeholder.before(this.currentItem),this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var f in this._storedCSS)if(this._storedCSS[f]=="auto"||this._storedCSS[f]=="static")this._storedCSS[f]="";this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else this.currentItem.show();this.fromOutside&&!c&&d.push(function(a){this._trigger("receive",a,this._uiHash(this.fromOutside))}),(this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!c&&d.push(function(a){this._trigger("update",a,this._uiHash())});if(!a.ui.contains(this.element[0],this.currentItem[0])){c||d.push(function(a){this._trigger("remove",a,this._uiHash())});for(var f=this.containers.length-1;f>=0;f--)a.ui.contains(this.containers[f].element[0],this.currentItem[0])&&!c&&(d.push(function(a){return function(b){a._trigger("receive",b,this._uiHash(this))}}.call(this,this.containers[f])),d.push(function(a){return function(b){a._trigger("update",b,this._uiHash(this))}}.call(this,this.containers[f])))}for(var f=this.containers.length-1;f>=0;f--)c||d.push(function(a){return function(b){a._trigger("deactivate",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over&&(d.push(function(a){return function(b){a._trigger("out",b,this._uiHash(this))}}.call(this,this.containers[f])),this.containers[f].containerCache.over=0);this._storedCursor&&a("body").css("cursor",this._storedCursor),this._storedOpacity&&this.helper.css("opacity",this._storedOpacity),this._storedZIndex&&this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex),this.dragging=!1;if(this.cancelHelperRemoval){if(!c){this._trigger("beforeStop",b,this._uiHash());for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return!1}c||this._trigger("beforeStop",b,this._uiHash()),this.placeholder[0].parentNode.removeChild(this.placeholder[0]),this.helper[0]!=this.currentItem[0]&&this.helper.remove(),this.helper=null;if(!c){for(var f=0;f<d.length;f++)d[f].call(this,b);this._trigger("stop",b,this._uiHash())}return this.fromOutside=!1,!0},_trigger:function(){a.Widget.prototype._trigger.apply(this,arguments)===!1&&this.cancel()},_uiHash:function(b){var c=b||this;return{helper:c.helper,placeholder:c.placeholder||a([]),position:c.position,originalPosition:c.originalPosition,offset:c.positionAbs,item:c.currentItem,sender:b?b.element:null}}}),a.extend(a.ui.sortable,{version:"1.8.21"})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.accordion.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.accordion",{options:{active:0,animated:"slide",autoHeight:!0,clearStyle:!1,collapsible:!1,event:"click",fillSpace:!1,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:!1,navigationFilter:function(){return this.href.toLowerCase()===location.href.toLowerCase()}},_create:function(){var b=this,c=b.options;b.running=0,b.element.addClass("ui-accordion ui-widget ui-helper-reset").children("li").addClass("ui-accordion-li-fix"),b.headers=b.element.find(c.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){if(c.disabled)return;a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){if(c.disabled)return;a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){if(c.disabled)return;a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){if(c.disabled)return;a(this).removeClass("ui-state-focus")}),b.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");if(c.navigation){var d=b.element.find("a").filter(c.navigationFilter).eq(0);if(d.length){var e=d.closest(".ui-accordion-header");e.length?b.active=e:b.active=d.closest(".ui-accordion-content").prev()}}b.active=b._findActive(b.active||c.active).addClass("ui-state-default ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top"),b.active.next().addClass("ui-accordion-content-active"),b._createIcons(),b.resize(),b.element.attr("role","tablist"),b.headers.attr("role","tab").bind("keydown.accordion",function(a){return b._keydown(a)}).next().attr("role","tabpanel"),b.headers.not(b.active||"").attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).next().hide(),b.active.length?b.active.attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}):b.headers.eq(0).attr("tabIndex",0),a.browser.safari||b.headers.find("a").attr("tabIndex",-1),c.event&&b.headers.bind(c.event.split(" ").join(".accordion ")+".accordion",function(a){b._clickHandler.call(b,a,this),a.preventDefault()})},_createIcons:function(){var b=this.options;b.icons&&(a("<span></span>").addClass("ui-icon "+b.icons.header).prependTo(this.headers),this.active.children(".ui-icon").toggleClass(b.icons.header).toggleClass(b.icons.headerSelected),this.element.addClass("ui-accordion-icons"))},_destroyIcons:function(){this.headers.children(".ui-icon").remove(),this.element.removeClass("ui-accordion-icons")},destroy:function(){var b=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role"),this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-accordion-disabled ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-state-disabled ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("aria-selected").removeAttr("tabIndex"),this.headers.find("a").removeAttr("tabIndex"),this._destroyIcons();var c=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active ui-accordion-disabled ui-state-disabled");return(b.autoHeight||b.fillHeight)&&c.css("height",""),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b=="active"&&this.activate(c),b=="icons"&&(this._destroyIcons(),c&&this._createIcons()),b=="disabled"&&this.headers.add(this.headers.next())[c?"addClass":"removeClass"]("ui-accordion-disabled ui-state-disabled")},_keydown:function(b){if(this.options.disabled||b.altKey||b.ctrlKey)return;var c=a.ui.keyCode,d=this.headers.length,e=this.headers.index(b.target),f=!1;switch(b.keyCode){case c.RIGHT:case c.DOWN:f=this.headers[(e+1)%d];break;case c.LEFT:case c.UP:f=this.headers[(e-1+d)%d];break;case c.SPACE:case c.ENTER:this._clickHandler({target:b.target},b.target),b.preventDefault()}return f?(a(b.target).attr("tabIndex",-1),a(f).attr("tabIndex",0),f.focus(),!1):!0},resize:function(){var b=this.options,c;if(b.fillSpace){if(a.browser.msie){var d=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}c=this.element.parent().height(),a.browser.msie&&this.element.parent().css("overflow",d),this.headers.each(function(){c-=a(this).outerHeight(!0)}),this.headers.next().each(function(){a(this).height(Math.max(0,c-a(this).innerHeight()+a(this).height()))}).css("overflow","auto")}else b.autoHeight&&(c=0,this.headers.next().each(function(){c=Math.max(c,a(this).height("").height())}).height(c));return this},activate:function(a){this.options.active=a;var b=this._findActive(a)[0];return this._clickHandler({target:b},b),this},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===!1?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,c){var d=this.options;if(d.disabled)return;if(!b.target){if(!d.collapsible)return;this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),this.active.next().addClass("ui-accordion-content-active");var e=this.active.next(),f={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:e},g=this.active=a([]);this._toggle(g,e,f);return}var h=a(b.currentTarget||c),i=h[0]===this.active[0];d.active=d.collapsible&&i?!1:this.headers.index(h);if(this.running||!d.collapsible&&i)return;var j=this.active,g=h.next(),e=this.active.next(),f={options:d,newHeader:i&&d.collapsible?a([]):h,oldHeader:this.active,newContent:i&&d.collapsible?a([]):g,oldContent:e},k=this.headers.index(this.active[0])>this.headers.index(h[0]);this.active=i?a([]):h,this._toggle(g,e,f,i,k),j.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").children(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header),i||(h.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").children(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected),h.next().addClass("ui-accordion-content-active"));return},_toggle:function(b,c,d,e,f){var g=this,h=g.options;g.toShow=b,g.toHide=c,g.data=d;var i=function(){if(!g)return;return g._completed.apply(g,arguments)};g._trigger("changestart",null,g.data),g.running=c.size()===0?b.size():c.size();if(h.animated){var j={};h.collapsible&&e?j={toShow:a([]),toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace}:j={toShow:b,toHide:c,complete:i,down:f,autoHeight:h.autoHeight||h.fillSpace},h.proxied||(h.proxied=h.animated),h.proxiedDuration||(h.proxiedDuration=h.duration),h.animated=a.isFunction(h.proxied)?h.proxied(j):h.proxied,h.duration=a.isFunction(h.proxiedDuration)?h.proxiedDuration(j):h.proxiedDuration;var k=a.ui.accordion.animations,l=h.duration,m=h.animated;m&&!k[m]&&!a.easing[m]&&(m="slide"),k[m]||(k[m]=function(a){this.slide(a,{easing:m,duration:l||700})}),k[m](j)}else h.collapsible&&e?b.toggle():(c.hide(),b.show()),i(!0);c.prev().attr({"aria-expanded":"false","aria-selected":"false",tabIndex:-1}).blur(),b.prev().attr({"aria-expanded":"true","aria-selected":"true",tabIndex:0}).focus()},_completed:function(a){this.running=a?0:--this.running;if(this.running)return;this.options.clearStyle&&this.toShow.add(this.toHide).css({height:"",overflow:""}),this.toHide.removeClass("ui-accordion-content-active"),this.toHide.length&&(this.toHide.parent()[0].className=this.toHide.parent()[0].className),this._trigger("change",null,this.data)}}),a.extend(a.ui.accordion,{version:"1.8.21",animations:{slide:function(b,c){b=a.extend({easing:"swing",duration:300},b,c);if(!b.toHide.size()){b.toShow.animate({height:"show",paddingTop:"show",paddingBottom:"show"},b);return}if(!b.toShow.size()){b.toHide.animate({height:"hide",paddingTop:"hide",paddingBottom:"hide"},b);return}var d=b.toShow.css("overflow"),e=0,f={},g={},h=["height","paddingTop","paddingBottom"],i,j=b.toShow;i=j[0].style.width,j.width(j.parent().width()-parseFloat(j.css("paddingLeft"))-parseFloat(j.css("paddingRight"))-(parseFloat(j.css("borderLeftWidth"))||0)-(parseFloat(j.css("borderRightWidth"))||0)),a.each(h,function(c,d){g[d]="hide";var e=(""+a.css(b.toShow[0],d)).match(/^([\d+-.]+)(.*)$/);f[d]={value:e[1],unit:e[2]||"px"}}),b.toShow.css({height:0,overflow:"hidden"}).show(),b.toHide.filter(":hidden").each(b.complete).end().filter(":visible").animate(g,{step:function(a,c){c.prop=="height"&&(e=c.end-c.start===0?0:(c.now-c.start)/(c.end-c.start)),b.toShow[0].style[c.prop]=e*f[c.prop].value+f[c.prop].unit},duration:b.duration,easing:b.easing,complete:function(){b.autoHeight||b.toShow.css("height",""),b.toShow.css({width:i,overflow:d}),b.complete()}})},bounceslide:function(a){this.slide(a,{easing:a.down?"easeOutBounce":"swing",duration:a.down?1e3:200})}}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.autocomplete.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=0;a.widget("ui.autocomplete",{options:{appendTo:"body",autoFocus:!1,delay:300,minLength:1,position:{my:"left top",at:"left bottom",collision:"none"},source:null},pending:0,_create:function(){var b=this,c=this.element[0].ownerDocument,d;this.isMultiLine=this.element.is("textarea"),this.element.addClass("ui-autocomplete-input").attr("autocomplete","off").attr({role:"textbox","aria-autocomplete":"list","aria-haspopup":"true"}).bind("keydown.autocomplete",function(c){if(b.options.disabled||b.element.propAttr("readOnly"))return;d=!1;var e=a.ui.keyCode;switch(c.keyCode){case e.PAGE_UP:b._move("previousPage",c);break;case e.PAGE_DOWN:b._move("nextPage",c);break;case e.UP:b._keyEvent("previous",c);break;case e.DOWN:b._keyEvent("next",c);break;case e.ENTER:case e.NUMPAD_ENTER:b.menu.active&&(d=!0,c.preventDefault());case e.TAB:if(!b.menu.active)return;b.menu.select(c);break;case e.ESCAPE:b.element.val(b.term),b.close(c);break;default:clearTimeout(b.searching),b.searching=setTimeout(function(){b.term!=b.element.val()&&(b.selectedItem=null,b.search(null,c))},b.options.delay)}}).bind("keypress.autocomplete",function(a){d&&(d=!1,a.preventDefault())}).bind("focus.autocomplete",function(){if(b.options.disabled)return;b.selectedItem=null,b.previous=b.element.val()}).bind("blur.autocomplete",function(a){if(b.options.disabled)return;clearTimeout(b.searching),b.closing=setTimeout(function(){b.close(a),b._change(a)},150)}),this._initSource(),this.menu=a("<ul></ul>").addClass("ui-autocomplete").appendTo(a(this.options.appendTo||"body",c)[0]).mousedown(function(c){var d=b.menu.element[0];a(c.target).closest(".ui-menu-item").length||setTimeout(function(){a(document).one("mousedown",function(c){c.target!==b.element[0]&&c.target!==d&&!a.ui.contains(d,c.target)&&b.close()})},1),setTimeout(function(){clearTimeout(b.closing)},13)}).menu({focus:function(a,c){var d=c.item.data("item.autocomplete");!1!==b._trigger("focus",a,{item:d})&&/^key/.test(a.originalEvent.type)&&b.element.val(d.value)},selected:function(a,d){var e=d.item.data("item.autocomplete"),f=b.previous;b.element[0]!==c.activeElement&&(b.element.focus(),b.previous=f,setTimeout(function(){b.previous=f,b.selectedItem=e},1)),!1!==b._trigger("select",a,{item:e})&&b.element.val(e.value),b.term=b.element.val(),b.close(a),b.selectedItem=e},blur:function(a,c){b.menu.element.is(":visible")&&b.element.val()!==b.term&&b.element.val(b.term)}}).zIndex(this.element.zIndex()+1).css({top:0,left:0}).hide().data("menu"),a.fn.bgiframe&&this.menu.element.bgiframe(),b.beforeunloadHandler=function(){b.element.removeAttr("autocomplete")},a(window).bind("beforeunload",b.beforeunloadHandler)},destroy:function(){this.element.removeClass("ui-autocomplete-input").removeAttr("autocomplete").removeAttr("role").removeAttr("aria-autocomplete").removeAttr("aria-haspopup"),this.menu.element.remove(),a(window).unbind("beforeunload",this.beforeunloadHandler),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments),b==="source"&&this._initSource(),b==="appendTo"&&this.menu.element.appendTo(a(c||"body",this.element[0].ownerDocument)[0]),b==="disabled"&&c&&this.xhr&&this.xhr.abort()},_initSource:function(){var b=this,c,d;a.isArray(this.options.source)?(c=this.options.source,this.source=function(b,d){d(a.ui.autocomplete.filter(c,b.term))}):typeof this.options.source=="string"?(d=this.options.source,this.source=function(c,e){b.xhr&&b.xhr.abort(),b.xhr=a.ajax({url:d,data:c,dataType:"json",success:function(a,b){e(a)},error:function(){e([])}})}):this.source=this.options.source},search:function(a,b){a=a!=null?a:this.element.val(),this.term=this.element.val();if(a.length<this.options.minLength)return this.close(b);clearTimeout(this.closing);if(this._trigger("search",b)===!1)return;return this._search(a)},_search:function(a){this.pending++,this.element.addClass("ui-autocomplete-loading"),this.source({term:a},this._response())},_response:function(){var a=this,b=++c;return function(d){b===c&&a.__response(d),a.pending--,a.pending||a.element.removeClass("ui-autocomplete-loading")}},__response:function(a){!this.options.disabled&&a&&a.length?(a=this._normalize(a),this._suggest(a),this._trigger("open")):this.close()},close:function(a){clearTimeout(this.closing),this.menu.element.is(":visible")&&(this.menu.element.hide(),this.menu.deactivate(),this._trigger("close",a))},_change:function(a){this.previous!==this.element.val()&&this._trigger("change",a,{item:this.selectedItem})},_normalize:function(b){return b.length&&b[0].label&&b[0].value?b:a.map(b,function(b){return typeof b=="string"?{label:b,value:b}:a.extend({label:b.label||b.value,value:b.value||b.label},b)})},_suggest:function(b){var c=this.menu.element.empty().zIndex(this.element.zIndex()+1);this._renderMenu(c,b),this.menu.deactivate(),this.menu.refresh(),c.show(),this._resizeMenu(),c.position(a.extend({of:this.element},this.options.position)),this.options.autoFocus&&this.menu.next(new a.Event("mouseover"))},_resizeMenu:function(){var a=this.menu.element;a.outerWidth(Math.max(a.width("").outerWidth()+1,this.element.outerWidth()))},_renderMenu:function(b,c){var d=this;a.each(c,function(a,c){d._renderItem(b,c)})},_renderItem:function(b,c){return a("<li></li>").data("item.autocomplete",c).append(a("<a></a>").text(c.label)).appendTo(b)},_move:function(a,b){if(!this.menu.element.is(":visible")){this.search(null,b);return}if(this.menu.first()&&/^previous/.test(a)||this.menu.last()&&/^next/.test(a)){this.element.val(this.term),this.menu.deactivate();return}this.menu[a](b)},widget:function(){return this.menu.element},_keyEvent:function(a,b){if(!this.isMultiLine||this.menu.element.is(":visible"))this._move(a,b),b.preventDefault()}}),a.extend(a.ui.autocomplete,{escapeRegex:function(a){return a.replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&")},filter:function(b,c){var d=new RegExp(a.ui.autocomplete.escapeRegex(c),"i");return a.grep(b,function(a){return d.test(a.label||a.value||a)})}})})(jQuery),function(a){a.widget("ui.menu",{_create:function(){var b=this;this.element.addClass("ui-menu ui-widget ui-widget-content ui-corner-all").attr({role:"listbox","aria-activedescendant":"ui-active-menuitem"}).click(function(c){if(!a(c.target).closest(".ui-menu-item a").length)return;c.preventDefault(),b.select(c)}),this.refresh()},refresh:function(){var b=this,c=this.element.children("li:not(.ui-menu-item):has(a)").addClass("ui-menu-item").attr("role","menuitem");c.children("a").addClass("ui-corner-all").attr("tabindex",-1).mouseenter(function(c){b.activate(c,a(this).parent())}).mouseleave(function(){b.deactivate()})},activate:function(a,b){this.deactivate();if(this.hasScroll()){var c=b.offset().top-this.element.offset().top,d=this.element.scrollTop(),e=this.element.height();c<0?this.element.scrollTop(d+c):c>=e&&this.element.scrollTop(d+c-e+b.height())}this.active=b.eq(0).children("a").addClass("ui-state-hover").attr("id","ui-active-menuitem").end(),this._trigger("focus",a,{item:b})},deactivate:function(){if(!this.active)return;this.active.children("a").removeClass("ui-state-hover").removeAttr("id"),this._trigger("blur"),this.active=null},next:function(a){this.move("next",".ui-menu-item:first",a)},previous:function(a){this.move("prev",".ui-menu-item:last",a)},first:function(){return this.active&&!this.active.prevAll(".ui-menu-item").length},last:function(){return this.active&&!this.active.nextAll(".ui-menu-item").length},move:function(a,b,c){if(!this.active){this.activate(c,this.element.children(b));return}var d=this.active[a+"All"](".ui-menu-item").eq(0);d.length?this.activate(c,d):this.activate(c,this.element.children(b))},nextPage:function(b){if(this.hasScroll()){if(!this.active||this.last()){this.activate(b,this.element.children(".ui-menu-item:first"));return}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c-d+a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:last")),this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.last()?":first":":last"))},previousPage:function(b){if(this.hasScroll()){if(!this.active||this.first()){this.activate(b,this.element.children(".ui-menu-item:last"));return}var c=this.active.offset().top,d=this.element.height(),e=this.element.children(".ui-menu-item").filter(function(){var b=a(this).offset().top-c+d-a(this).height();return b<10&&b>-10});e.length||(e=this.element.children(".ui-menu-item:first")),this.activate(b,e)}else this.activate(b,this.element.children(".ui-menu-item").filter(!this.active||this.first()?":last":":first"))},hasScroll:function(){return this.element.height()<this.element[a.fn.prop?"prop":"attr"]("scrollHeight")},select:function(a){this._trigger("selected",a,{item:this.active})}})}(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.button.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c,d,e,f,g="ui-button ui-widget ui-state-default ui-corner-all",h="ui-state-hover ui-state-active ",i="ui-button-icons-only ui-button-icon-only ui-button-text-icons ui-button-text-icon-primary ui-button-text-icon-secondary ui-button-text-only",j=function(){var b=a(this).find(":ui-button");setTimeout(function(){b.button("refresh")},1)},k=function(b){var c=b.name,d=b.form,e=a([]);return c&&(d?e=a(d).find("[name='"+c+"']"):e=a("[name='"+c+"']",b.ownerDocument).filter(function(){return!this.form})),e};a.widget("ui.button",{options:{disabled:null,text:!0,label:null,icons:{primary:null,secondary:null}},_create:function(){this.element.closest("form").unbind("reset.button").bind("reset.button",j),typeof this.options.disabled!="boolean"?this.options.disabled=!!this.element.propAttr("disabled"):this.element.propAttr("disabled",this.options.disabled),this._determineButtonType(),this.hasTitle=!!this.buttonElement.attr("title");var b=this,h=this.options,i=this.type==="checkbox"||this.type==="radio",l="ui-state-hover"+(i?"":" ui-state-active"),m="ui-state-focus";h.label===null&&(h.label=this.buttonElement.html()),this.buttonElement.addClass(g).attr("role","button").bind("mouseenter.button",function(){if(h.disabled)return;a(this).addClass("ui-state-hover"),this===c&&a(this).addClass("ui-state-active")}).bind("mouseleave.button",function(){if(h.disabled)return;a(this).removeClass(l)}).bind("click.button",function(a){h.disabled&&(a.preventDefault(),a.stopImmediatePropagation())}),this.element.bind("focus.button",function(){b.buttonElement.addClass(m)}).bind("blur.button",function(){b.buttonElement.removeClass(m)}),i&&(this.element.bind("change.button",function(){if(f)return;b.refresh()}),this.buttonElement.bind("mousedown.button",function(a){if(h.disabled)return;f=!1,d=a.pageX,e=a.pageY}).bind("mouseup.button",function(a){if(h.disabled)return;if(d!==a.pageX||e!==a.pageY)f=!0})),this.type==="checkbox"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).toggleClass("ui-state-active"),b.buttonElement.attr("aria-pressed",b.element[0].checked)}):this.type==="radio"?this.buttonElement.bind("click.button",function(){if(h.disabled||f)return!1;a(this).addClass("ui-state-active"),b.buttonElement.attr("aria-pressed","true");var c=b.element[0];k(c).not(c).map(function(){return a(this).button("widget")[0]}).removeClass("ui-state-active").attr("aria-pressed","false")}):(this.buttonElement.bind("mousedown.button",function(){if(h.disabled)return!1;a(this).addClass("ui-state-active"),c=this,a(document).one("mouseup",function(){c=null})}).bind("mouseup.button",function(){if(h.disabled)return!1;a(this).removeClass("ui-state-active")}).bind("keydown.button",function(b){if(h.disabled)return!1;(b.keyCode==a.ui.keyCode.SPACE||b.keyCode==a.ui.keyCode.ENTER)&&a(this).addClass("ui-state-active")}).bind("keyup.button",function(){a(this).removeClass("ui-state-active")}),this.buttonElement.is("a")&&this.buttonElement.keyup(function(b){b.keyCode===a.ui.keyCode.SPACE&&a(this).click()})),this._setOption("disabled",h.disabled),this._resetButton()},_determineButtonType:function(){this.element.is(":checkbox")?this.type="checkbox":this.element.is(":radio")?this.type="radio":this.element.is("input")?this.type="input":this.type="button";if(this.type==="checkbox"||this.type==="radio"){var a=this.element.parents().filter(":last"),b="label[for='"+this.element.attr("id")+"']";this.buttonElement=a.find(b),this.buttonElement.length||(a=a.length?a.siblings():this.element.siblings(),this.buttonElement=a.filter(b),this.buttonElement.length||(this.buttonElement=a.find(b))),this.element.addClass("ui-helper-hidden-accessible");var c=this.element.is(":checked");c&&this.buttonElement.addClass("ui-state-active"),this.buttonElement.attr("aria-pressed",c)}else this.buttonElement=this.element},widget:function(){return this.buttonElement},destroy:function(){this.element.removeClass("ui-helper-hidden-accessible"),this.buttonElement.removeClass(g+" "+h+" "+i).removeAttr("role").removeAttr("aria-pressed").html(this.buttonElement.find(".ui-button-text").html()),this.hasTitle||this.buttonElement.removeAttr("title"),a.Widget.prototype.destroy.call(this)},_setOption:function(b,c){a.Widget.prototype._setOption.apply(this,arguments);if(b==="disabled"){c?this.element.propAttr("disabled",!0):this.element.propAttr("disabled",!1);return}this._resetButton()},refresh:function(){var b=this.element.is(":disabled");b!==this.options.disabled&&this._setOption("disabled",b),this.type==="radio"?k(this.element[0]).each(function(){a(this).is(":checked")?a(this).button("widget").addClass("ui-state-active").attr("aria-pressed","true"):a(this).button("widget").removeClass("ui-state-active").attr("aria-pressed","false")}):this.type==="checkbox"&&(this.element.is(":checked")?this.buttonElement.addClass("ui-state-active").attr("aria-pressed","true"):this.buttonElement.removeClass("ui-state-active").attr("aria-pressed","false"))},_resetButton:function(){if(this.type==="input"){this.options.label&&this.element.val(this.options.label);return}var b=this.buttonElement.removeClass(i),c=a("<span></span>",this.element[0].ownerDocument).addClass("ui-button-text").html(this.options.label).appendTo(b.empty()).text(),d=this.options.icons,e=d.primary&&d.secondary,f=[];d.primary||d.secondary?(this.options.text&&f.push("ui-button-text-icon"+(e?"s":d.primary?"-primary":"-secondary")),d.primary&&b.prepend("<span class='ui-button-icon-primary ui-icon "+d.primary+"'></span>"),d.secondary&&b.append("<span class='ui-button-icon-secondary ui-icon "+d.secondary+"'></span>"),this.options.text||(f.push(e?"ui-button-icons-only":"ui-button-icon-only"),this.hasTitle||b.attr("title",c))):f.push("ui-button-text-only"),b.addClass(f.join(" "))}}),a.widget("ui.buttonset",{options:{items:":button, :submit, :reset, :checkbox, :radio, a, :data(button)"},_create:function(){this.element.addClass("ui-buttonset")},_init:function(){this.refresh()},_setOption:function(b,c){b==="disabled"&&this.buttons.button("option",b,c),a.Widget.prototype._setOption.apply(this,arguments)},refresh:function(){var b=this.element.css("direction")==="rtl";this.buttons=this.element.find(this.options.items).filter(":ui-button").button("refresh").end().not(":ui-button").button().end().map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-all ui-corner-left ui-corner-right").filter(":first").addClass(b?"ui-corner-right":"ui-corner-left").end().filter(":last").addClass(b?"ui-corner-left":"ui-corner-right").end().end()},destroy:function(){this.element.removeClass("ui-buttonset"),this.buttons.map(function(){return a(this).button("widget")[0]}).removeClass("ui-corner-left ui-corner-right").end().button("destroy"),a.Widget.prototype.destroy.call(this)}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.dialog.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c="ui-dialog ui-widget ui-widget-content ui-corner-all ",d={buttons:!0,height:!0,maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0,width:!0},e={maxHeight:!0,maxWidth:!0,minHeight:!0,minWidth:!0},f=a.attrFn||{val:!0,css:!0,html:!0,text:!0,data:!0,width:!0,height:!0,offset:!0,click:!0};a.widget("ui.dialog",{options:{autoOpen:!0,buttons:{},closeOnEscape:!0,closeText:"close",dialogClass:"",draggable:!0,hide:null,height:"auto",maxHeight:!1,maxWidth:!1,minHeight:150,minWidth:150,modal:!1,position:{my:"center",at:"center",collision:"fit",using:function(b){var c=a(this).css(b).offset().top;c<0&&a(this).css("top",b.top-c)}},resizable:!0,show:null,stack:!0,title:"",width:300,zIndex:1e3},_create:function(){this.originalTitle=this.element.attr("title"),typeof this.originalTitle!="string"&&(this.originalTitle=""),this.options.title=this.options.title||this.originalTitle;var b=this,d=b.options,e=d.title||"&#160;",f=a.ui.dialog.getTitleId(b.element),g=(b.uiDialog=a("<div></div>")).appendTo(document.body).hide().addClass(c+d.dialogClass).css({zIndex:d.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(c){d.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}).attr({role:"dialog","aria-labelledby":f}).mousedown(function(a){b.moveToTop(!1,a)}),h=b.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(g),i=(b.uiDialogTitlebar=a("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(g),j=a('<a href="#"></a>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){j.addClass("ui-state-hover")},function(){j.removeClass("ui-state-hover")}).focus(function(){j.addClass("ui-state-focus")}).blur(function(){j.removeClass("ui-state-focus")}).click(function(a){return b.close(a),!1}).appendTo(i),k=(b.uiDialogTitlebarCloseText=a("<span></span>")).addClass("ui-icon ui-icon-closethick").text(d.closeText).appendTo(j),l=a("<span></span>").addClass("ui-dialog-title").attr("id",f).html(e).prependTo(i);a.isFunction(d.beforeclose)&&!a.isFunction(d.beforeClose)&&(d.beforeClose=d.beforeclose),i.find("*").add(i).disableSelection(),d.draggable&&a.fn.draggable&&b._makeDraggable(),d.resizable&&a.fn.resizable&&b._makeResizable(),b._createButtons(d.buttons),b._isOpen=!1,a.fn.bgiframe&&g.bgiframe()},_init:function(){this.options.autoOpen&&this.open()},destroy:function(){var a=this;return a.overlay&&a.overlay.destroy(),a.uiDialog.hide(),a.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body"),a.uiDialog.remove(),a.originalTitle&&a.element.attr("title",a.originalTitle),a},widget:function(){return this.uiDialog},close:function(b){var c=this,d,e;if(!1===c._trigger("beforeClose",b))return;return c.overlay&&c.overlay.destroy(),c.uiDialog.unbind("keypress.ui-dialog"),c._isOpen=!1,c.options.hide?c.uiDialog.hide(c.options.hide,function(){c._trigger("close",b)}):(c.uiDialog.hide(),c._trigger("close",b)),a.ui.dialog.overlay.resize(),c.options.modal&&(d=0,a(".ui-dialog").each(function(){this!==c.uiDialog[0]&&(e=a(this).css("z-index"),isNaN(e)||(d=Math.max(d,e)))}),a.ui.dialog.maxZ=d),c},isOpen:function(){return this._isOpen},moveToTop:function(b,c){var d=this,e=d.options,f;return e.modal&&!b||!e.stack&&!e.modal?d._trigger("focus",c):(e.zIndex>a.ui.dialog.maxZ&&(a.ui.dialog.maxZ=e.zIndex),d.overlay&&(a.ui.dialog.maxZ+=1,d.overlay.$el.css("z-index",a.ui.dialog.overlay.maxZ=a.ui.dialog.maxZ)),f={scrollTop:d.element.scrollTop(),scrollLeft:d.element.scrollLeft()},a.ui.dialog.maxZ+=1,d.uiDialog.css("z-index",a.ui.dialog.maxZ),d.element.attr(f),d._trigger("focus",c),d)},open:function(){if(this._isOpen)return;var b=this,c=b.options,d=b.uiDialog;return b.overlay=c.modal?new a.ui.dialog.overlay(b):null,b._size(),b._position(c.position),d.show(c.show),b.moveToTop(!0),c.modal&&d.bind("keydown.ui-dialog",function(b){if(b.keyCode!==a.ui.keyCode.TAB)return;var c=a(":tabbable",this),d=c.filter(":first"),e=c.filter(":last");if(b.target===e[0]&&!b.shiftKey)return d.focus(1),!1;if(b.target===d[0]&&b.shiftKey)return e.focus(1),!1}),a(b.element.find(":tabbable").get().concat(d.find(".ui-dialog-buttonpane :tabbable").get().concat(d.get()))).eq(0).focus(),b._isOpen=!0,b._trigger("open"),b},_createButtons:function(b){var c=this,d=!1,e=a("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix"),g=a("<div></div>").addClass("ui-dialog-buttonset").appendTo(e);c.uiDialog.find(".ui-dialog-buttonpane").remove(),typeof b=="object"&&b!==null&&a.each(b,function(){return!(d=!0)}),d&&(a.each(b,function(b,d){d=a.isFunction(d)?{click:d,text:b}:d;var e=a('<button type="button"></button>').click(function(){d.click.apply(c.element[0],arguments)}).appendTo(g);a.each(d,function(a,b){if(a==="click")return;a in f?e[a](b):e.attr(a,b)}),a.fn.button&&e.button()}),e.appendTo(c.uiDialog))},_makeDraggable:function(){function f(a){return{position:a.position,offset:a.offset}}var b=this,c=b.options,d=a(document),e;b.uiDialog.draggable({cancel:".ui-dialog-content, .ui-dialog-titlebar-close",handle:".ui-dialog-titlebar",containment:"document",start:function(d,g){e=c.height==="auto"?"auto":a(this).height(),a(this).height(a(this).height()).addClass("ui-dialog-dragging"),b._trigger("dragStart",d,f(g))},drag:function(a,c){b._trigger("drag",a,f(c))},stop:function(g,h){c.position=[h.position.left-d.scrollLeft(),h.position.top-d.scrollTop()],a(this).removeClass("ui-dialog-dragging").height(e),b._trigger("dragStop",g,f(h)),a.ui.dialog.overlay.resize()}})},_makeResizable:function(c){function h(a){return{originalPosition:a.originalPosition,originalSize:a.originalSize,position:a.position,size:a.size}}c=c===b?this.options.resizable:c;var d=this,e=d.options,f=d.uiDialog.css("position"),g=typeof c=="string"?c:"n,e,s,w,se,sw,ne,nw";d.uiDialog.resizable({cancel:".ui-dialog-content",containment:"document",alsoResize:d.element,maxWidth:e.maxWidth,maxHeight:e.maxHeight,minWidth:e.minWidth,minHeight:d._minHeight(),handles:g,start:function(b,c){a(this).addClass("ui-dialog-resizing"),d._trigger("resizeStart",b,h(c))},resize:function(a,b){d._trigger("resize",a,h(b))},stop:function(b,c){a(this).removeClass("ui-dialog-resizing"),e.height=a(this).height(),e.width=a(this).width(),d._trigger("resizeStop",b,h(c)),a.ui.dialog.overlay.resize()}}).css("position",f).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_minHeight:function(){var a=this.options;return a.height==="auto"?a.minHeight:Math.min(a.minHeight,a.height)},_position:function(b){var c=[],d=[0,0],e;if(b){if(typeof b=="string"||typeof b=="object"&&"0"in b)c=b.split?b.split(" "):[b[0],b[1]],c.length===1&&(c[1]=c[0]),a.each(["left","top"],function(a,b){+c[a]===c[a]&&(d[a]=c[a],c[a]=b)}),b={my:c.join(" "),at:c.join(" "),offset:d.join(" ")};b=a.extend({},a.ui.dialog.prototype.options.position,b)}else b=a.ui.dialog.prototype.options.position;e=this.uiDialog.is(":visible"),e||this.uiDialog.show(),this.uiDialog.css({top:0,left:0}).position(a.extend({of:window},b)),e||this.uiDialog.hide()},_setOptions:function(b){var c=this,f={},g=!1;a.each(b,function(a,b){c._setOption(a,b),a in d&&(g=!0),a in e&&(f[a]=b)}),g&&this._size(),this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option",f)},_setOption:function(b,d){var e=this,f=e.uiDialog;switch(b){case"beforeclose":b="beforeClose";break;case"buttons":e._createButtons(d);break;case"closeText":e.uiDialogTitlebarCloseText.text(""+d);break;case"dialogClass":f.removeClass(e.options.dialogClass).addClass(c+d);break;case"disabled":d?f.addClass("ui-dialog-disabled"):f.removeClass("ui-dialog-disabled");break;case"draggable":var g=f.is(":data(draggable)");g&&!d&&f.draggable("destroy"),!g&&d&&e._makeDraggable();break;case"position":e._position(d);break;case"resizable":var h=f.is(":data(resizable)");h&&!d&&f.resizable("destroy"),h&&typeof d=="string"&&f.resizable("option","handles",d),!h&&d!==!1&&e._makeResizable(d);break;case"title":a(".ui-dialog-title",e.uiDialogTitlebar).html(""+(d||"&#160;"))}a.Widget.prototype._setOption.apply(e,arguments)},_size:function(){var b=this.options,c,d,e=this.uiDialog.is(":visible");this.element.show().css({width:"auto",minHeight:0,height:0}),b.minWidth>b.width&&(b.width=b.minWidth),c=this.uiDialog.css({height:"auto",width:b.width}).height(),d=Math.max(0,b.minHeight-c);if(b.height==="auto")if(a.support.minHeight)this.element.css({minHeight:d,height:"auto"});else{this.uiDialog.show();var f=this.element.css("height","auto").height();e||this.uiDialog.hide(),this.element.height(Math.max(f,d))}else this.element.height(Math.max(b.height-c,0));this.uiDialog.is(":data(resizable)")&&this.uiDialog.resizable("option","minHeight",this._minHeight())}}),a.extend(a.ui.dialog,{version:"1.8.21",uuid:0,maxZ:0,getTitleId:function(a){var b=a.attr("id");return b||(this.uuid+=1,b=this.uuid),"ui-dialog-title-"+b},overlay:function(b){this.$el=a.ui.dialog.overlay.create(b)}}),a.extend(a.ui.dialog.overlay,{instances:[],oldInstances:[],maxZ:0,events:a.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(a){return a+".dialog-overlay"}).join(" "),create:function(b){this.instances.length===0&&(setTimeout(function(){a.ui.dialog.overlay.instances.length&&a(document).bind(a.ui.dialog.overlay.events,function(b){if(a(b.target).zIndex()<a.ui.dialog.overlay.maxZ)return!1})},1),a(document).bind("keydown.dialog-overlay",function(c){b.options.closeOnEscape&&!c.isDefaultPrevented()&&c.keyCode&&c.keyCode===a.ui.keyCode.ESCAPE&&(b.close(c),c.preventDefault())}),a(window).bind("resize.dialog-overlay",a.ui.dialog.overlay.resize));var c=(this.oldInstances.pop()||a("<div></div>").addClass("ui-widget-overlay")).appendTo(document.body).css({width:this.width(),height:this.height()});return a.fn.bgiframe&&c.bgiframe(),this.instances.push(c),c},destroy:function(b){var c=a.inArray(b,this.instances);c!=-1&&this.oldInstances.push(this.instances.splice(c,1)[0]),this.instances.length===0&&a([document,window]).unbind(".dialog-overlay"),b.remove();var d=0;a.each(this.instances,function(){d=Math.max(d,this.css("z-index"))}),this.maxZ=d},height:function(){var b,c;return a.browser.msie&&a.browser.version<7?(b=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight),c=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight),b<c?a(window).height()+"px":b+"px"):a(document).height()+"px"},width:function(){var b,c;return a.browser.msie?(b=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth),c=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth),b<c?a(window).width()+"px":b+"px"):a(document).width()+"px"},resize:function(){var b=a([]);a.each(a.ui.dialog.overlay.instances,function(){b=b.add(this)}),b.css({width:0,height:0}).css({width:a.ui.dialog.overlay.width(),height:a.ui.dialog.overlay.height()})}}),a.extend(a.ui.dialog.overlay.prototype,{destroy:function(){a.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.slider.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){var c=5;a.widget("ui.slider",a.ui.mouse,{widgetEventPrefix:"slide",options:{animate:!1,distance:0,max:100,min:0,orientation:"horizontal",range:!1,step:1,value:0,values:null},_create:function(){var b=this,d=this.options,e=this.element.find(".ui-slider-handle").addClass("ui-state-default ui-corner-all"),f="<a class='ui-slider-handle ui-state-default ui-corner-all' href='#'></a>",g=d.values&&d.values.length||1,h=[];this._keySliding=!1,this._mouseSliding=!1,this._animateOff=!0,this._handleIndex=null,this._detectOrientation(),this._mouseInit(),this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget"+" ui-widget-content"+" ui-corner-all"+(d.disabled?" ui-slider-disabled ui-disabled":"")),this.range=a([]),d.range&&(d.range===!0&&(d.values||(d.values=[this._valueMin(),this._valueMin()]),d.values.length&&d.values.length!==2&&(d.values=[d.values[0],d.values[0]])),this.range=a("<div></div>").appendTo(this.element).addClass("ui-slider-range ui-widget-header"+(d.range==="min"||d.range==="max"?" ui-slider-range-"+d.range:"")));for(var i=e.length;i<g;i+=1)h.push(f);this.handles=e.add(a(h.join("")).appendTo(b.element)),this.handle=this.handles.eq(0),this.handles.add(this.range).filter("a").click(function(a){a.preventDefault()}).hover(function(){d.disabled||a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){d.disabled?a(this).blur():(a(".ui-slider .ui-state-focus").removeClass("ui-state-focus"),a(this).addClass("ui-state-focus"))}).blur(function(){a(this).removeClass("ui-state-focus")}),this.handles.each(function(b){a(this).data("index.ui-slider-handle",b)}),this.handles.keydown(function(d){var e=a(this).data("index.ui-slider-handle"),f,g,h,i;if(b.options.disabled)return;switch(d.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.PAGE_UP:case a.ui.keyCode.PAGE_DOWN:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:d.preventDefault();if(!b._keySliding){b._keySliding=!0,a(this).addClass("ui-state-active"),f=b._start(d,e);if(f===!1)return}}i=b.options.step,b.options.values&&b.options.values.length?g=h=b.values(e):g=h=b.value();switch(d.keyCode){case a.ui.keyCode.HOME:h=b._valueMin();break;case a.ui.keyCode.END:h=b._valueMax();break;case a.ui.keyCode.PAGE_UP:h=b._trimAlignValue(g+(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.PAGE_DOWN:h=b._trimAlignValue(g-(b._valueMax()-b._valueMin())/c);break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g===b._valueMax())return;h=b._trimAlignValue(g+i);break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g===b._valueMin())return;h=b._trimAlignValue(g-i)}b._slide(d,e,h)}).keyup(function(c){var d=a(this).data("index.ui-slider-handle");b._keySliding&&(b._keySliding=!1,b._stop(c,d),b._change(c,d),a(this).removeClass("ui-state-active"))}),this._refreshValue(),this._animateOff=!1},destroy:function(){return this.handles.remove(),this.range.remove(),this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider"),this._mouseDestroy(),this},_mouseCapture:function(b){var c=this.options,d,e,f,g,h,i,j,k,l;return c.disabled?!1:(this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()},this.elementOffset=this.element.offset(),d={x:b.pageX,y:b.pageY},e=this._normValueFromMouse(d),f=this._valueMax()-this._valueMin()+1,h=this,this.handles.each(function(b){var c=Math.abs(e-h.values(b));f>c&&(f=c,g=a(this),i=b)}),c.range===!0&&this.values(1)===c.min&&(i+=1,g=a(this.handles[i])),j=this._start(b,i),j===!1?!1:(this._mouseSliding=!0,h._handleIndex=i,g.addClass("ui-state-active").focus(),k=g.offset(),l=!a(b.target).parents().andSelf().is(".ui-slider-handle"),this._clickOffset=l?{left:0,top:0}:{left:b.pageX-k.left-g.width()/2,top:b.pageY-k.top-g.height()/2-(parseInt(g.css("borderTopWidth"),10)||0)-(parseInt(g.css("borderBottomWidth"),10)||0)+(parseInt(g.css("marginTop"),10)||0)},this.handles.hasClass("ui-state-hover")||this._slide(b,i,e),this._animateOff=!0,!0))},_mouseStart:function(a){return!0},_mouseDrag:function(a){var b={x:a.pageX,y:a.pageY},c=this._normValueFromMouse(b);return this._slide(a,this._handleIndex,c),!1},_mouseStop:function(a){return this.handles.removeClass("ui-state-active"),this._mouseSliding=!1,this._stop(a,this._handleIndex),this._change(a,this._handleIndex),this._handleIndex=null,this._clickOffset=null,this._animateOff=!1,!1},_detectOrientation:function(){this.orientation=this.options.orientation==="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(a){var b,c,d,e,f;return this.orientation==="horizontal"?(b=this.elementSize.width,c=a.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)):(b=this.elementSize.height,c=a.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)),d=c/b,d>1&&(d=1),d<0&&(d=0),this.orientation==="vertical"&&(d=1-d),e=this._valueMax()-this._valueMin(),f=this._valueMin()+d*e,this._trimAlignValue(f)},_start:function(a,b){var c={handle:this.handles[b],value:this.value()};return this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("start",a,c)},_slide:function(a,b,c){var d,e,f;this.options.values&&this.options.values.length?(d=this.values(b?0:1),this.options.values.length===2&&this.options.range===!0&&(b===0&&c>d||b===1&&c<d)&&(c=d),c!==this.values(b)&&(e=this.values(),e[b]=c,f=this._trigger("slide",a,{handle:this.handles[b],value:c,values:e}),d=this.values(b?0:1),f!==!1&&this.values(b,c,!0))):c!==this.value()&&(f=this._trigger("slide",a,{handle:this.handles[b],value:c}),f!==!1&&this.value(c))},_stop:function(a,b){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("stop",a,c)},_change:function(a,b){if(!this._keySliding&&!this._mouseSliding){var c={handle:this.handles[b],value:this.value()};this.options.values&&this.options.values.length&&(c.value=this.values(b),c.values=this.values()),this._trigger("change",a,c)}},value:function(a){if(arguments.length){this.options.value=this._trimAlignValue(a),this._refreshValue(),this._change(null,0);return}return this._value()},values:function(b,c){var d,e,f;if(arguments.length>1){this.options.values[b]=this._trimAlignValue(c),this._refreshValue(),this._change(null,b);return}if(!arguments.length)return this._values();if(!a.isArray(arguments[0]))return this.options.values&&this.options.values.length?this._values(b):this.value();d=this.options.values,e=arguments[0];for(f=0;f<d.length;f+=1)d[f]=this._trimAlignValue(e[f]),this._change(null,f);this._refreshValue()},_setOption:function(b,c){var d,e=0;a.isArray(this.options.values)&&(e=this.options.values.length),a.Widget.prototype._setOption.apply(this,arguments);switch(b){case"disabled":c?(this.handles.filter(".ui-state-focus").blur(),this.handles.removeClass("ui-state-hover"),this.handles.propAttr("disabled",!0),this.element.addClass("ui-disabled")):(this.handles.propAttr("disabled",!1),this.element.removeClass("ui-disabled"));break;case"orientation":this._detectOrientation(),this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation),this._refreshValue();break;case"value":this._animateOff=!0,this._refreshValue(),this._change(null,0),this._animateOff=!1;break;case"values":this._animateOff=!0,this._refreshValue();for(d=0;d<e;d+=1)this._change(null,d);this._animateOff=!1}},_value:function(){var a=this.options.value;return a=this._trimAlignValue(a),a},_values:function(a){var b,c,d;if(arguments.length)return b=this.options.values[a],b=this._trimAlignValue(b),b;c=this.options.values.slice();for(d=0;d<c.length;d+=1)c[d]=this._trimAlignValue(c[d]);return c},_trimAlignValue:function(a){if(a<=this._valueMin())return this._valueMin();if(a>=this._valueMax())return this._valueMax();var b=this.options.step>0?this.options.step:1,c=(a-this._valueMin())%b,d=a-c;return Math.abs(c)*2>=b&&(d+=c>0?b:-b),parseFloat(d.toFixed(5))},_valueMin:function(){return this.options.min},_valueMax:function(){return this.options.max},_refreshValue:function(){var b=this.options.range,c=this.options,d=this,e=this._animateOff?!1:c.animate,f,g={},h,i,j,k;this.options.values&&this.options.values.length?this.handles.each(function(b,i){f=(d.values(b)-d._valueMin())/(d._valueMax()-d._valueMin())*100,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",a(this).stop(1,1)[e?"animate":"css"](g,c.animate),d.options.range===!0&&(d.orientation==="horizontal"?(b===0&&d.range.stop(1,1)[e?"animate":"css"]({left:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({width:f-h+"%"},{queue:!1,duration:c.animate})):(b===0&&d.range.stop(1,1)[e?"animate":"css"]({bottom:f+"%"},c.animate),b===1&&d.range[e?"animate":"css"]({height:f-h+"%"},{queue:!1,duration:c.animate}))),h=f}):(i=this.value(),j=this._valueMin(),k=this._valueMax(),f=k!==j?(i-j)/(k-j)*100:0,g[d.orientation==="horizontal"?"left":"bottom"]=f+"%",this.handle.stop(1,1)[e?"animate":"css"](g,c.animate),b==="min"&&this.orientation==="horizontal"&&this.range.stop(1,1)[e?"animate":"css"]({width:f+"%"},c.animate),b==="max"&&this.orientation==="horizontal"&&this.range[e?"animate":"css"]({width:100-f+"%"},{queue:!1,duration:c.animate}),b==="min"&&this.orientation==="vertical"&&this.range.stop(1,1)[e?"animate":"css"]({height:f+"%"},c.animate),b==="max"&&this.orientation==="vertical"&&this.range[e?"animate":"css"]({height:100-f+"%"},{queue:!1,duration:c.animate}))}}),a.extend(a.ui.slider,{version:"1.8.21"})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.tabs.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){function e(){return++c}function f(){return++d}var c=0,d=0;a.widget("ui.tabs",{options:{add:null,ajaxOptions:null,cache:!1,cookie:null,collapsible:!1,disable:null,disabled:[],enable:null,event:"click",fx:null,idPrefix:"ui-tabs-",load:null,panelTemplate:"<div></div>",remove:null,select:null,show:null,spinner:"<em>Loading&#8230;</em>",tabTemplate:"<li><a href='#{href}'><span>#{label}</span></a></li>"},_create:function(){this._tabify(!0)},_setOption:function(a,b){if(a=="selected"){if(this.options.collapsible&&b==this.options.selected)return;this.select(b)}else this.options[a]=b,this._tabify()},_tabId:function(a){return a.title&&a.title.replace(/\s/g,"_").replace(/[^\w\u00c0-\uFFFF-]/g,"")||this.options.idPrefix+e()},_sanitizeSelector:function(a){return a.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+f());return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(a,b){return{tab:a,panel:b,index:this.anchors.index(a)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(c){function m(b,c){b.css("display",""),!a.support.opacity&&c.opacity&&b[0].style.removeAttribute("filter")}var d=this,e=this.options,f=/^#.+/;this.list=this.element.find("ol,ul").eq(0),this.lis=a(" > li:has(a[href])",this.list),this.anchors=this.lis.map(function(){return a("a",this)[0]}),this.panels=a([]),this.anchors.each(function(b,c){var g=a(c).attr("href"),h=g.split("#")[0],i;h&&(h===location.toString().split("#")[0]||(i=a("base")[0])&&h===i.href)&&(g=c.hash,c.href=g);if(f.test(g))d.panels=d.panels.add(d.element.find(d._sanitizeSelector(g)));else if(g&&g!=="#"){a.data(c,"href.tabs",g),a.data(c,"load.tabs",g.replace(/#.*$/,""));var j=d._tabId(c);c.href="#"+j;var k=d.element.find("#"+j);k.length||(k=a(e.panelTemplate).attr("id",j).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(d.panels[b-1]||d.list),k.data("destroy.tabs",!0)),d.panels=d.panels.add(k)}else e.disabled.push(b)}),c?(this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all"),this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.lis.addClass("ui-state-default ui-corner-top"),this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom"),e.selected===b?(location.hash&&this.anchors.each(function(a,b){if(b.hash==location.hash)return e.selected=a,!1}),typeof e.selected!="number"&&e.cookie&&(e.selected=parseInt(d._cookie(),10)),typeof e.selected!="number"&&this.lis.filter(".ui-tabs-selected").length&&(e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))),e.selected=e.selected||(this.lis.length?0:-1)):e.selected===null&&(e.selected=-1),e.selected=e.selected>=0&&this.anchors[e.selected]||e.selected<0?e.selected:0,e.disabled=a.unique(e.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(a,b){return d.lis.index(a)}))).sort(),a.inArray(e.selected,e.disabled)!=-1&&e.disabled.splice(a.inArray(e.selected,e.disabled),1),this.panels.addClass("ui-tabs-hide"),this.lis.removeClass("ui-tabs-selected ui-state-active"),e.selected>=0&&this.anchors.length&&(d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash)).removeClass("ui-tabs-hide"),this.lis.eq(e.selected).addClass("ui-tabs-selected ui-state-active"),d.element.queue("tabs",function(){d._trigger("show",null,d._ui(d.anchors[e.selected],d.element.find(d._sanitizeSelector(d.anchors[e.selected].hash))[0]))}),this.load(e.selected)),a(window).bind("unload",function(){d.lis.add(d.anchors).unbind(".tabs"),d.lis=d.anchors=d.panels=null})):e.selected=this.lis.index(this.lis.filter(".ui-tabs-selected")),this.element[e.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible"),e.cookie&&this._cookie(e.selected,e.cookie);for(var g=0,h;h=this.lis[g];g++)a(h)[a.inArray(g,e.disabled)!=-1&&!a(h).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled");e.cache===!1&&this.anchors.removeData("cache.tabs"),this.lis.add(this.anchors).unbind(".tabs");if(e.event!=="mouseover"){var i=function(a,b){b.is(":not(.ui-state-disabled)")&&b.addClass("ui-state-"+a)},j=function(a,b){b.removeClass("ui-state-"+a)};this.lis.bind("mouseover.tabs",function(){i("hover",a(this))}),this.lis.bind("mouseout.tabs",function(){j("hover",a(this))}),this.anchors.bind("focus.tabs",function(){i("focus",a(this).closest("li"))}),this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var k,l;e.fx&&(a.isArray(e.fx)?(k=e.fx[0],l=e.fx[1]):k=l=e.fx);var n=l?function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.hide().removeClass("ui-tabs-hide").animate(l,l.duration||"normal",function(){m(c,l),d._trigger("show",null,d._ui(b,c[0]))})}:function(b,c){a(b).closest("li").addClass("ui-tabs-selected ui-state-active"),c.removeClass("ui-tabs-hide"),d._trigger("show",null,d._ui(b,c[0]))},o=k?function(a,b){b.animate(k,k.duration||"normal",function(){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),m(b,k),d.element.dequeue("tabs")})}:function(a,b,c){d.lis.removeClass("ui-tabs-selected ui-state-active"),b.addClass("ui-tabs-hide"),d.element.dequeue("tabs")};this.anchors.bind(e.event+".tabs",function(){var b=this,c=a(b).closest("li"),f=d.panels.filter(":not(.ui-tabs-hide)"),g=d.element.find(d._sanitizeSelector(b.hash));if(c.hasClass("ui-tabs-selected")&&!e.collapsible||c.hasClass("ui-state-disabled")||c.hasClass("ui-state-processing")||d.panels.filter(":animated").length||d._trigger("select",null,d._ui(this,g[0]))===!1)return this.blur(),!1;e.selected=d.anchors.index(this),d.abort();if(e.collapsible){if(c.hasClass("ui-tabs-selected"))return e.selected=-1,e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){o(b,f)}).dequeue("tabs"),this.blur(),!1;if(!f.length)return e.cookie&&d._cookie(e.selected,e.cookie),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this)),this.blur(),!1}e.cookie&&d._cookie(e.selected,e.cookie);if(g.length)f.length&&d.element.queue("tabs",function(){o(b,f)}),d.element.queue("tabs",function(){n(b,g)}),d.load(d.anchors.index(this));else throw"jQuery UI Tabs: Mismatching fragment identifier.";a.browser.msie&&this.blur()}),this.anchors.bind("click.tabs",function(){return!1})},_getIndex:function(a){return typeof a=="string"&&(a=this.anchors.index(this.anchors.filter("[href$='"+a+"']"))),a},destroy:function(){var b=this.options;return this.abort(),this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs"),this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all"),this.anchors.each(function(){var b=a.data(this,"href.tabs");b&&(this.href=b);var c=a(this).unbind(".tabs");a.each(["href","load","cache"],function(a,b){c.removeData(b+".tabs")})}),this.lis.unbind(".tabs").add(this.panels).each(function(){a.data(this,"destroy.tabs")?a(this).remove():a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}),b.cookie&&this._cookie(null,b.cookie),this},add:function(c,d,e){e===b&&(e=this.anchors.length);var f=this,g=this.options,h=a(g.tabTemplate.replace(/#\{href\}/g,c).replace(/#\{label\}/g,d)),i=c.indexOf("#")?this._tabId(a("a",h)[0]):c.replace("#","");h.addClass("ui-state-default ui-corner-top").data("destroy.tabs",!0);var j=f.element.find("#"+i);return j.length||(j=a(g.panelTemplate).attr("id",i).data("destroy.tabs",!0)),j.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide"),e>=this.lis.length?(h.appendTo(this.list),j.appendTo(this.list[0].parentNode)):(h.insertBefore(this.lis[e]),j.insertBefore(this.panels[e])),g.disabled=a.map(g.disabled,function(a,b){return a>=e?++a:a}),this._tabify(),this.anchors.length==1&&(g.selected=0,h.addClass("ui-tabs-selected ui-state-active"),j.removeClass("ui-tabs-hide"),this.element.queue("tabs",function(){f._trigger("show",null,f._ui(f.anchors[0],f.panels[0]))}),this.load(0)),this._trigger("add",null,this._ui(this.anchors[e],this.panels[e])),this},remove:function(b){b=this._getIndex(b);var c=this.options,d=this.lis.eq(b).remove(),e=this.panels.eq(b).remove();return d.hasClass("ui-tabs-selected")&&this.anchors.length>1&&this.select(b+(b+1<this.anchors.length?1:-1)),c.disabled=a.map(a.grep(c.disabled,function(a,c){return a!=b}),function(a,c){return a>=b?--a:a}),this._tabify(),this._trigger("remove",null,this._ui(d.find("a")[0],e[0])),this},enable:function(b){b=this._getIndex(b);var c=this.options;if(a.inArray(b,c.disabled)==-1)return;return this.lis.eq(b).removeClass("ui-state-disabled"),c.disabled=a.grep(c.disabled,function(a,c){return a!=b}),this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b])),this},disable:function(a){a=this._getIndex(a);var b=this,c=this.options;return a!=c.selected&&(this.lis.eq(a).addClass("ui-state-disabled"),c.disabled.push(a),c.disabled.sort(),this._trigger("disable",null,this._ui(this.anchors[a],this.panels[a]))),this},select:function(a){a=this._getIndex(a);if(a==-1)if(this.options.collapsible&&this.options.selected!=-1)a=this.options.selected;else return this;return this.anchors.eq(a).trigger(this.options.event+".tabs"),this},load:function(b){b=this._getIndex(b);var c=this,d=this.options,e=this.anchors.eq(b)[0],f=a.data(e,"load.tabs");this.abort();if(!f||this.element.queue("tabs").length!==0&&a.data(e,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(b).addClass("ui-state-processing");if(d.spinner){var g=a("span",e);g.data("label.tabs",g.html()).html(d.spinner)}return this.xhr=a.ajax(a.extend({},d.ajaxOptions,{url:f,success:function(f,g){c.element.find(c._sanitizeSelector(e.hash)).html(f),c._cleanup(),d.cache&&a.data(e,"cache.tabs",!0),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.success(f,g)}catch(h){}},error:function(a,f,g){c._cleanup(),c._trigger("load",null,c._ui(c.anchors[b],c.panels[b]));try{d.ajaxOptions.error(a,f,b,e)}catch(g){}}})),c.element.dequeue("tabs"),this},abort:function(){return this.element.queue([]),this.panels.stop(!1,!0),this.element.queue("tabs",this.element.queue("tabs").splice(-2,2)),this.xhr&&(this.xhr.abort(),delete this.xhr),this._cleanup(),this},url:function(a,b){return this.anchors.eq(a).removeData("cache.tabs").data("load.tabs",b),this},length:function(){return this.anchors.length}}),a.extend(a.ui.tabs,{version:"1.8.21"}),a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(a,b){var c=this,d=this.options,e=c._rotate||(c._rotate=function(b){clearTimeout(c.rotation),c.rotation=setTimeout(function(){var a=d.selected;c.select(++a<c.anchors.length?a:0)},a),b&&b.stopPropagation()}),f=c._unrotate||(c._unrotate=b?function(a){e()}:function(a){a.clientX&&c.rotate(null)});return a?(this.element.bind("tabsshow",e),this.anchors.bind(d.event+".tabs",f),e()):(clearTimeout(c.rotation),this.element.unbind("tabsshow",e),this.anchors.unbind(d.event+".tabs",f),delete this._rotate,delete this._unrotate),this}})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.datepicker.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function($,undefined){function Datepicker(){this.debug=!1,this._curInst=null,this._keyEvent=!1,this._disabledInputs=[],this._datepickerShowing=!1,this._inDialog=!1,this._mainDivId="ui-datepicker-div",this._inlineClass="ui-datepicker-inline",this._appendClass="ui-datepicker-append",this._triggerClass="ui-datepicker-trigger",this._dialogClass="ui-datepicker-dialog",this._disableClass="ui-datepicker-disabled",this._unselectableClass="ui-datepicker-unselectable",this._currentClass="ui-datepicker-current-day",this._dayOverClass="ui-datepicker-days-cell-over",this.regional=[],this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],weekHeader:"Wk",dateFormat:"mm/dd/yy",firstDay:0,isRTL:!1,showMonthAfterYear:!1,yearSuffix:""},this._defaults={showOn:"focus",showAnim:"fadeIn",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:!1,hideIfNoPrevNext:!1,navigationAsDateFormat:!1,gotoCurrent:!1,changeMonth:!1,changeYear:!1,yearRange:"c-10:c+10",showOtherMonths:!1,selectOtherMonths:!1,showWeek:!1,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"fast",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:!0,showButtonPanel:!1,autoSize:!1,disabled:!1},$.extend(this._defaults,this.regional[""]),this.dpDiv=bindHover($('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}function bindHover(a){var b="button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a";return a.bind("mouseout",function(a){var c=$(a.target).closest(b);if(!c.length)return;c.removeClass("ui-state-hover ui-datepicker-prev-hover ui-datepicker-next-hover")}).bind("mouseover",function(c){var d=$(c.target).closest(b);if($.datepicker._isDisabledDatepicker(instActive.inline?a.parent()[0]:instActive.input[0])||!d.length)return;d.parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover"),d.addClass("ui-state-hover"),d.hasClass("ui-datepicker-prev")&&d.addClass("ui-datepicker-prev-hover"),d.hasClass("ui-datepicker-next")&&d.addClass("ui-datepicker-next-hover")})}function extendRemove(a,b){$.extend(a,b);for(var c in b)if(b[c]==null||b[c]==undefined)a[c]=b[c];return a}function isArray(a){return a&&($.browser.safari&&typeof a=="object"&&a.length||a.constructor&&a.constructor.toString().match(/\Array\(\)/))}$.extend($.ui,{datepicker:{version:"1.8.21"}});var PROP_NAME="datepicker",dpuuid=(new Date).getTime(),instActive;$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",maxRows:4,log:function(){this.debug&&console.log.apply("",arguments)},_widgetDatepicker:function(){return this.dpDiv},setDefaults:function(a){return extendRemove(this._defaults,a||{}),this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase(),inline=nodeName=="div"||nodeName=="span";target.id||(this.uuid+=1,target.id="dp"+this.uuid);var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{}),nodeName=="input"?this._connectDatepicker(target,inst):inline&&this._inlineDatepicker(target,inst)},_newInst:function(a,b){var c=a[0].id.replace(/([^A-Za-z0-9_-])/g,"\\\\$1");return{id:c,input:a,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:b,dpDiv:b?bindHover($('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>')):this.dpDiv}},_connectDatepicker:function(a,b){var c=$(a);b.append=$([]),b.trigger=$([]);if(c.hasClass(this.markerClassName))return;this._attachments(c,b),c.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).keyup(this._doKeyUp).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),this._autoSize(b),$.data(a,PROP_NAME,b),b.settings.disabled&&this._disableDatepicker(a)},_attachments:function(a,b){var c=this._get(b,"appendText"),d=this._get(b,"isRTL");b.append&&b.append.remove(),c&&(b.append=$('<span class="'+this._appendClass+'">'+c+"</span>"),a[d?"before":"after"](b.append)),a.unbind("focus",this._showDatepicker),b.trigger&&b.trigger.remove();var e=this._get(b,"showOn");(e=="focus"||e=="both")&&a.focus(this._showDatepicker);if(e=="button"||e=="both"){var f=this._get(b,"buttonText"),g=this._get(b,"buttonImage");b.trigger=$(this._get(b,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:g,alt:f,title:f}):$('<button type="button"></button>').addClass(this._triggerClass).html(g==""?f:$("<img/>").attr({src:g,alt:f,title:f}))),a[d?"before":"after"](b.trigger),b.trigger.click(function(){return $.datepicker._datepickerShowing&&$.datepicker._lastInput==a[0]?$.datepicker._hideDatepicker():$.datepicker._datepickerShowing&&$.datepicker._lastInput!=a[0]?($.datepicker._hideDatepicker(),$.datepicker._showDatepicker(a[0])):$.datepicker._showDatepicker(a[0]),!1})}},_autoSize:function(a){if(this._get(a,"autoSize")&&!a.inline){var b=new Date(2009,11,20),c=this._get(a,"dateFormat");if(c.match(/[DM]/)){var d=function(a){var b=0,c=0;for(var d=0;d<a.length;d++)a[d].length>b&&(b=a[d].length,c=d);return c};b.setMonth(d(this._get(a,c.match(/MM/)?"monthNames":"monthNamesShort"))),b.setDate(d(this._get(a,c.match(/DD/)?"dayNames":"dayNamesShort"))+20-b.getDay())}a.input.attr("size",this._formatDate(a,b).length)}},_inlineDatepicker:function(a,b){var c=$(a);if(c.hasClass(this.markerClassName))return;c.addClass(this.markerClassName).append(b.dpDiv).bind("setData.datepicker",function(a,c,d){b.settings[c]=d}).bind("getData.datepicker",function(a,c){return this._get(b,c)}),$.data(a,PROP_NAME,b),this._setDate(b,this._getDefaultDate(b),!0),this._updateDatepicker(b),this._updateAlternate(b),b.settings.disabled&&this._disableDatepicker(a),b.dpDiv.css("display","block")},_dialogDatepicker:function(a,b,c,d,e){var f=this._dialogInst;if(!f){this.uuid+=1;var g="dp"+this.uuid;this._dialogInput=$('<input type="text" id="'+g+'" style="position: absolute; top: -100px; width: 0px; z-index: -10;"/>'),this._dialogInput.keydown(this._doKeyDown),$("body").append(this._dialogInput),f=this._dialogInst=this._newInst(this._dialogInput,!1),f.settings={},$.data(this._dialogInput[0],PROP_NAME,f)}extendRemove(f.settings,d||{}),b=b&&b.constructor==Date?this._formatDate(f,b):b,this._dialogInput.val(b),this._pos=e?e.length?e:[e.pageX,e.pageY]:null;if(!this._pos){var h=document.documentElement.clientWidth,i=document.documentElement.clientHeight,j=document.documentElement.scrollLeft||document.body.scrollLeft,k=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[h/2-100+j,i/2-150+k]}return this._dialogInput.css("left",this._pos[0]+20+"px").css("top",this._pos[1]+"px"),f.settings.onSelect=c,this._inDialog=!0,this.dpDiv.addClass(this._dialogClass),this._showDatepicker(this._dialogInput[0]),$.blockUI&&$.blockUI(this.dpDiv),$.data(this._dialogInput[0],PROP_NAME,f),this},_destroyDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();$.removeData(a,PROP_NAME),d=="input"?(c.append.remove(),c.trigger.remove(),b.removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress).unbind("keyup",this._doKeyUp)):(d=="div"||d=="span")&&b.removeClass(this.markerClassName).empty()},_enableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!1,c.trigger.filter("button").each(function(){this.disabled=!1}).end().filter("img").css({opacity:"1.0",cursor:""});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().removeClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").removeAttr("disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b})},_disableDatepicker:function(a){var b=$(a),c=$.data(a,PROP_NAME);if(!b.hasClass(this.markerClassName))return;var d=a.nodeName.toLowerCase();if(d=="input")a.disabled=!0,c.trigger.filter("button").each(function(){this.disabled=!0}).end().filter("img").css({opacity:"0.5",cursor:"default"});else if(d=="div"||d=="span"){var e=b.children("."+this._inlineClass);e.children().addClass("ui-state-disabled"),e.find("select.ui-datepicker-month, select.ui-datepicker-year").attr("disabled","disabled")}this._disabledInputs=$.map(this._disabledInputs,function(b){return b==a?null:b}),this._disabledInputs[this._disabledInputs.length]=a},_isDisabledDatepicker:function(a){if(!a)return!1;for(var b=0;b<this._disabledInputs.length;b++)if(this._disabledInputs[b]==a)return!0;return!1},_getInst:function(a){try{return $.data(a,PROP_NAME)}catch(b){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(a,b,c){var d=this._getInst(a);if(arguments.length==2&&typeof b=="string")return b=="defaults"?$.extend({},$.datepicker._defaults):d?b=="all"?$.extend({},d.settings):this._get(d,b):null;var e=b||{};typeof b=="string"&&(e={},e[b]=c);if(d){this._curInst==d&&this._hideDatepicker();var f=this._getDateDatepicker(a,!0),g=this._getMinMaxDate(d,"min"),h=this._getMinMaxDate(d,"max");extendRemove(d.settings,e),g!==null&&e.dateFormat!==undefined&&e.minDate===undefined&&(d.settings.minDate=this._formatDate(d,g)),h!==null&&e.dateFormat!==undefined&&e.maxDate===undefined&&(d.settings.maxDate=this._formatDate(d,h)),this._attachments($(a),d),this._autoSize(d),this._setDate(d,f),this._updateAlternate(d),this._updateDatepicker(d)}},_changeDatepicker:function(a,b,c){this._optionDatepicker(a,b,c)},_refreshDatepicker:function(a){var b=this._getInst(a);b&&this._updateDatepicker(b)},_setDateDatepicker:function(a,b){var c=this._getInst(a);c&&(this._setDate(c,b),this._updateDatepicker(c),this._updateAlternate(c))},_getDateDatepicker:function(a,b){var c=this._getInst(a);return c&&!c.inline&&this._setDateFromField(c,b),c?this._getDate(c):null},_doKeyDown:function(a){var b=$.datepicker._getInst(a.target),c=!0,d=b.dpDiv.is(".ui-datepicker-rtl");b._keyEvent=!0;if($.datepicker._datepickerShowing)switch(a.keyCode){case 9:$.datepicker._hideDatepicker(),c=!1;break;case 13:var e=$("td."+$.datepicker._dayOverClass+":not(."+$.datepicker._currentClass+")",b.dpDiv);e[0]&&$.datepicker._selectDay(a.target,b.selectedMonth,b.selectedYear,e[0]);var f=$.datepicker._get(b,"onSelect");if(f){var g=$.datepicker._formatDate(b);f.apply(b.input?b.input[0]:null,[g,b])}else $.datepicker._hideDatepicker();return!1;case 27:$.datepicker._hideDatepicker();break;case 33:$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 34:$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 35:(a.ctrlKey||a.metaKey)&&$.datepicker._clearDate(a.target),c=a.ctrlKey||a.metaKey;break;case 36:(a.ctrlKey||a.metaKey)&&$.datepicker._gotoToday(a.target),c=a.ctrlKey||a.metaKey;break;case 37:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?1:-1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?-$.datepicker._get(b,"stepBigMonths"):-$.datepicker._get(b,"stepMonths"),"M");break;case 38:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,-7,"D"),c=a.ctrlKey||a.metaKey;break;case 39:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,d?-1:1,"D"),c=a.ctrlKey||a.metaKey,a.originalEvent.altKey&&$.datepicker._adjustDate(a.target,a.ctrlKey?+$.datepicker._get(b,"stepBigMonths"):+$.datepicker._get(b,"stepMonths"),"M");break;case 40:(a.ctrlKey||a.metaKey)&&$.datepicker._adjustDate(a.target,7,"D"),c=a.ctrlKey||a.metaKey;break;default:c=!1}else a.keyCode==36&&a.ctrlKey?$.datepicker._showDatepicker(this):c=!1;c&&(a.preventDefault(),a.stopPropagation())},_doKeyPress:function(a){var b=$.datepicker._getInst(a.target);if($.datepicker._get(b,"constrainInput")){var c=$.datepicker._possibleChars($.datepicker._get(b,"dateFormat")),d=String.fromCharCode(a.charCode==undefined?a.keyCode:a.charCode);return a.ctrlKey||a.metaKey||d<" "||!c||c.indexOf(d)>-1}},_doKeyUp:function(a){var b=$.datepicker._getInst(a.target);if(b.input.val()!=b.lastVal)try{var c=$.datepicker.parseDate($.datepicker._get(b,"dateFormat"),b.input?b.input.val():null,$.datepicker._getFormatConfig(b));c&&($.datepicker._setDateFromField(b),$.datepicker._updateAlternate(b),$.datepicker._updateDatepicker(b))}catch(d){$.datepicker.log(d)}return!0},_showDatepicker:function(a){a=a.target||a,a.nodeName.toLowerCase()!="input"&&(a=$("input",a.parentNode)[0]);if($.datepicker._isDisabledDatepicker(a)||$.datepicker._lastInput==a)return;var b=$.datepicker._getInst(a);$.datepicker._curInst&&$.datepicker._curInst!=b&&($.datepicker._curInst.dpDiv.stop(!0,!0),b&&$.datepicker._datepickerShowing&&$.datepicker._hideDatepicker($.datepicker._curInst.input[0]));var c=$.datepicker._get(b,"beforeShow"),d=c?c.apply(a,[a,b]):{};if(d===!1)return;extendRemove(b.settings,d),b.lastVal=null,$.datepicker._lastInput=a,$.datepicker._setDateFromField(b),$.datepicker._inDialog&&(a.value=""),$.datepicker._pos||($.datepicker._pos=$.datepicker._findPos(a),$.datepicker._pos[1]+=a.offsetHeight);var e=!1;$(a).parents().each(function(){return e|=$(this).css("position")=="fixed",!e}),e&&$.browser.opera&&($.datepicker._pos[0]-=document.documentElement.scrollLeft,$.datepicker._pos[1]-=document.documentElement.scrollTop);var f={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null,b.dpDiv.empty(),b.dpDiv.css({position:"absolute",display:"block",top:"-1000px"}),$.datepicker._updateDatepicker(b),f=$.datepicker._checkOffset(b,f,e),b.dpDiv.css({position:$.datepicker._inDialog&&$.blockUI?"static":e?"fixed":"absolute",display:"none",left:f.left+"px",top:f.top+"px"});if(!b.inline){var g=$.datepicker._get(b,"showAnim"),h=$.datepicker._get(b,"duration"),i=function(){var a=b.dpDiv.find("iframe.ui-datepicker-cover");if(!!a.length){var c=$.datepicker._getBorders(b.dpDiv);a.css({left:-c[0],top:-c[1],width:b.dpDiv.outerWidth(),height:b.dpDiv.outerHeight()})}};b.dpDiv.zIndex($(a).zIndex()+1),$.datepicker._datepickerShowing=!0,$.effects&&$.effects[g]?b.dpDiv.show(g,$.datepicker._get(b,"showOptions"),h,i):b.dpDiv[g||"show"](g?h:null,i),(!g||!h)&&i(),b.input.is(":visible")&&!b.input.is(":disabled")&&b.input.focus(),$.datepicker._curInst=b}},_updateDatepicker:function(a){var b=this;b.maxRows=4;var c=$.datepicker._getBorders(a.dpDiv);instActive=a,a.dpDiv.empty().append(this._generateHTML(a));var d=a.dpDiv.find("iframe.ui-datepicker-cover");!d.length||d.css({left:-c[0],top:-c[1],width:a.dpDiv.outerWidth(),height:a.dpDiv.outerHeight()}),a.dpDiv.find("."+this._dayOverClass+" a").mouseover();var e=this._getNumberOfMonths(a),f=e[1],g=17;a.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width(""),f>1&&a.dpDiv.addClass("ui-datepicker-multi-"+f).css("width",g*f+"em"),a.dpDiv[(e[0]!=1||e[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi"),a.dpDiv[(this._get(a,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl"),a==$.datepicker._curInst&&$.datepicker._datepickerShowing&&a.input&&a.input.is(":visible")&&!a.input.is(":disabled")&&a.input[0]!=document.activeElement&&a.input.focus();if(a.yearshtml){var h=a.yearshtml;setTimeout(function(){h===a.yearshtml&&a.yearshtml&&a.dpDiv.find("select.ui-datepicker-year:first").replaceWith(a.yearshtml),h=a.yearshtml=null},0)}},_getBorders:function(a){var b=function(a){return{thin:1,medium:2,thick:3}[a]||a};return[parseFloat(b(a.css("border-left-width"))),parseFloat(b(a.css("border-top-width")))]},_checkOffset:function(a,b,c){var d=a.dpDiv.outerWidth(),e=a.dpDiv.outerHeight(),f=a.input?a.input.outerWidth():0,g=a.input?a.input.outerHeight():0,h=document.documentElement.clientWidth+$(document).scrollLeft(),i=document.documentElement.clientHeight+$(document).scrollTop();return b.left-=this._get(a,"isRTL")?d-f:0,b.left-=c&&b.left==a.input.offset().left?$(document).scrollLeft():0,b.top-=c&&b.top==a.input.offset().top+g?$(document).scrollTop():0,b.left-=Math.min(b.left,b.left+d>h&&h>d?Math.abs(b.left+d-h):0),b.top-=Math.min(b.top,b.top+e>i&&i>e?Math.abs(e+g):0),b},_findPos:function(a){var b=this._getInst(a),c=this._get(b,"isRTL");while(a&&(a.type=="hidden"||a.nodeType!=1||$.expr.filters.hidden(a)))a=a[c?"previousSibling":"nextSibling"];var d=$(a).offset();return[d.left,d.top]},_hideDatepicker:function(a){var b=this._curInst;if(!b||a&&b!=$.data(a,PROP_NAME))return;if(this._datepickerShowing){var c=this._get(b,"showAnim"),d=this._get(b,"duration"),e=function(){$.datepicker._tidyDialog(b)};$.effects&&$.effects[c]?b.dpDiv.hide(c,$.datepicker._get(b,"showOptions"),d,e):b.dpDiv[c=="slideDown"?"slideUp":c=="fadeIn"?"fadeOut":"hide"](c?d:null,e),c||e(),this._datepickerShowing=!1;var f=this._get(b,"onClose");f&&f.apply(b.input?b.input[0]:null,[b.input?b.input.val():"",b]),this._lastInput=null,this._inDialog&&(this._dialogInput.css({position:"absolute",left:"0",top:"-100px"}),$.blockUI&&($.unblockUI(),$("body").append(this.dpDiv))),this._inDialog=!1}},_tidyDialog:function(a){a.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(a){if(!$.datepicker._curInst)return;var b=$(a.target),c=$.datepicker._getInst(b[0]);(b[0].id!=$.datepicker._mainDivId&&b.parents("#"+$.datepicker._mainDivId).length==0&&!b.hasClass($.datepicker.markerClassName)&&!b.closest("."+$.datepicker._triggerClass).length&&$.datepicker._datepickerShowing&&(!$.datepicker._inDialog||!$.blockUI)||b.hasClass($.datepicker.markerClassName)&&$.datepicker._curInst!=c)&&$.datepicker._hideDatepicker()},_adjustDate:function(a,b,c){var d=$(a),e=this._getInst(d[0]);if(this._isDisabledDatepicker(d[0]))return;this._adjustInstDate(e,b+(c=="M"?this._get(e,"showCurrentAtPos"):0),c),this._updateDatepicker(e)},_gotoToday:function(a){var b=$(a),c=this._getInst(b[0]);if(this._get(c,"gotoCurrent")&&c.currentDay)c.selectedDay=c.currentDay,c.drawMonth=c.selectedMonth=c.currentMonth,c.drawYear=c.selectedYear=c.currentYear;else{var d=new Date;c.selectedDay=d.getDate(),c.drawMonth=c.selectedMonth=d.getMonth(),c.drawYear=c.selectedYear=d.getFullYear()}this._notifyChange(c),this._adjustDate(b)},_selectMonthYear:function(a,b,c){var d=$(a),e=this._getInst(d[0]);e["selected"+(c=="M"?"Month":"Year")]=e["draw"+(c=="M"?"Month":"Year")]=parseInt(b.options[b.selectedIndex].value,10),this._notifyChange(e),this._adjustDate(d)},_selectDay:function(a,b,c,d){var e=$(a);if($(d).hasClass(this._unselectableClass)||this._isDisabledDatepicker(e[0]))return;var f=this._getInst(e[0]);f.selectedDay=f.currentDay=$("a",d).html(),f.selectedMonth=f.currentMonth=b,f.selectedYear=f.currentYear=c,this._selectDate(a,this._formatDate(f,f.currentDay,f.currentMonth,f.currentYear))},_clearDate:function(a){var b=$(a),c=this._getInst(b[0]);this._selectDate(b,"")},_selectDate:function(a,b){var c=$(a),d=this._getInst(c[0]);b=b!=null?b:this._formatDate(d),d.input&&d.input.val(b),this._updateAlternate(d);var e=this._get(d,"onSelect");e?e.apply(d.input?d.input[0]:null,[b,d]):d.input&&d.input.trigger("change"),d.inline?this._updateDatepicker(d):(this._hideDatepicker(),this._lastInput=d.input[0],typeof d.input[0]!="object"&&d.input.focus(),this._lastInput=null)},_updateAlternate:function(a){var b=this._get(a,"altField");if(b){var c=this._get(a,"altFormat")||this._get(a,"dateFormat"),d=this._getDate(a),e=this.formatDate(c,d,this._getFormatConfig(a));$(b).each(function(){$(this).val(e)})}},noWeekends:function(a){var b=a.getDay();return[b>0&&b<6,""]},iso8601Week:function(a){var b=new Date(a.getTime());b.setDate(b.getDate()+4-(b.getDay()||7));var c=b.getTime();return b.setMonth(0),b.setDate(1),Math.floor(Math.round((c-b)/864e5)/7)+1},parseDate:function(a,b,c){if(a==null||b==null)throw"Invalid arguments";b=typeof b=="object"?b.toString():b+"";if(b=="")return null;var d=(c?c.shortYearCutoff:null)||this._defaults.shortYearCutoff;d=typeof d!="string"?d:(new Date).getFullYear()%100+parseInt(d,10);var e=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,f=(c?c.dayNames:null)||this._defaults.dayNames,g=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,h=(c?c.monthNames:null)||this._defaults.monthNames,i=-1,j=-1,k=-1,l=-1,m=!1,n=function(b){var c=s+1<a.length&&a.charAt(s+1)==b;return c&&s++,c},o=function(a){var c=n(a),d=a=="@"?14:a=="!"?20:a=="y"&&c?4:a=="o"?3:2,e=new RegExp("^\\d{1,"+d+"}"),f=b.substring(r).match(e);if(!f)throw"Missing number at position "+r;return r+=f[0].length,parseInt(f[0],10)},p=function(a,c,d){var e=$.map(n(a)?d:c,function(a,b){return[[b,a]]}).sort(function(a,b){return-(a[1].length-b[1].length)}),f=-1;$.each(e,function(a,c){var d=c[1];if(b.substr(r,d.length).toLowerCase()==d.toLowerCase())return f=c[0],r+=d.length,!1});if(f!=-1)return f+1;throw"Unknown name at position "+r},q=function(){if(b.charAt(r)!=a.charAt(s))throw"Unexpected literal at position "+r;r++},r=0;for(var s=0;s<a.length;s++)if(m)a.charAt(s)=="'"&&!n("'")?m=!1:q();else switch(a.charAt(s)){case"d":k=o("d");break;case"D":p("D",e,f);break;case"o":l=o("o");break;case"m":j=o("m");break;case"M":j=p("M",g,h);break;case"y":i=o("y");break;case"@":var t=new Date(o("@"));i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"!":var t=new Date((o("!")-this._ticksTo1970)/1e4);i=t.getFullYear(),j=t.getMonth()+1,k=t.getDate();break;case"'":n("'")?q():m=!0;break;default:q()}if(r<b.length)throw"Extra/unparsed characters found in date: "+b.substring(r);i==-1?i=(new Date).getFullYear():i<100&&(i+=(new Date).getFullYear()-(new Date).getFullYear()%100+(i<=d?0:-100));if(l>-1){j=1,k=l;do{var u=this._getDaysInMonth(i,j-1);if(k<=u)break;j++,k-=u}while(!0)}var t=this._daylightSavingAdjust(new Date(i,j-1,k));if(t.getFullYear()!=i||t.getMonth()+1!=j||t.getDate()!=k)throw"Invalid date";return t},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TICKS:"!",TIMESTAMP:"@",W3C:"yy-mm-dd",_ticksTo1970:(718685+Math.floor(492.5)-Math.floor(19.7)+Math.floor(4.925))*24*60*60*1e7,formatDate:function(a,b,c){if(!b)return"";var d=(c?c.dayNamesShort:null)||this._defaults.dayNamesShort,e=(c?c.dayNames:null)||this._defaults.dayNames,f=(c?c.monthNamesShort:null)||this._defaults.monthNamesShort,g=(c?c.monthNames:null)||this._defaults.monthNames,h=function(b){var c=m+1<a.length&&a.charAt(m+1)==b;return c&&m++,c},i=function(a,b,c){var d=""+b;if(h(a))while(d.length<c)d="0"+d;return d},j=function(a,b,c,d){return h(a)?d[b]:c[b]},k="",l=!1;if(b)for(var m=0;m<a.length;m++)if(l)a.charAt(m)=="'"&&!h("'")?l=!1:k+=a.charAt(m);else switch(a.charAt(m)){case"d":k+=i("d",b.getDate(),2);break;case"D":k+=j("D",b.getDay(),d,e);break;case"o":k+=i("o",Math.round(((new Date(b.getFullYear(),b.getMonth(),b.getDate())).getTime()-(new Date(b.getFullYear(),0,0)).getTime())/864e5),3);break;case"m":k+=i("m",b.getMonth()+1,2);break;case"M":k+=j("M",b.getMonth(),f,g);break;case"y":k+=h("y")?b.getFullYear():(b.getYear()%100<10?"0":"")+b.getYear()%100;break;case"@":k+=b.getTime();break;case"!":k+=b.getTime()*1e4+this._ticksTo1970;break;case"'":h("'")?k+="'":l=!0;break;default:k+=a.charAt(m)}return k},_possibleChars:function(a){var b="",c=!1,d=function(b){var c=e+1<a.length&&a.charAt(e+1)==b;return c&&e++,c};for(var e=0;e<a.length;e++)if(c)a.charAt(e)=="'"&&!d("'")?c=!1:b+=a.charAt(e);else switch(a.charAt(e)){case"d":case"m":case"y":case"@":b+="0123456789";break;case"D":case"M":return null;case"'":d("'")?b+="'":c=!0;break;default:b+=a.charAt(e)}return b},_get:function(a,b){return a.settings[b]!==undefined?a.settings[b]:this._defaults[b]},_setDateFromField:function(a,b){if(a.input.val()==a.lastVal)return;var c=this._get(a,"dateFormat"),d=a.lastVal=a.input?a.input.val():null,e,f;e=f=this._getDefaultDate(a);var g=this._getFormatConfig(a);try{e=this.parseDate(c,d,g)||f}catch(h){this.log(h),d=b?"":d}a.selectedDay=e.getDate(),a.drawMonth=a.selectedMonth=e.getMonth(),a.drawYear=a.selectedYear=e.getFullYear(),a.currentDay=d?e.getDate():0,a.currentMonth=d?e.getMonth():0,a.currentYear=d?e.getFullYear():0,this._adjustInstDate(a)},_getDefaultDate:function(a){return this._restrictMinMax(a,this._determineDate(a,this._get(a,"defaultDate"),new Date))},_determineDate:function(a,b,c){var d=function(a){var b=new Date;return b.setDate(b.getDate()+a),b},e=function(b){try{return $.datepicker.parseDate($.datepicker._get(a,"dateFormat"),b,$.datepicker._getFormatConfig(a))}catch(c){}var d=(b.toLowerCase().match(/^c/)?$.datepicker._getDate(a):null)||new Date,e=d.getFullYear(),f=d.getMonth(),g=d.getDate(),h=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g,i=h.exec(b);while(i){switch(i[2]||"d"){case"d":case"D":g+=parseInt(i[1],10);break;case"w":case"W":g+=parseInt(i[1],10)*7;break;case"m":case"M":f+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f));break;case"y":case"Y":e+=parseInt(i[1],10),g=Math.min(g,$.datepicker._getDaysInMonth(e,f))}i=h.exec(b)}return new Date(e,f,g)},f=b==null||b===""?c:typeof b=="string"?e(b):typeof b=="number"?isNaN(b)?c:d(b):new Date(b.getTime());return f=f&&f.toString()=="Invalid Date"?c:f,f&&(f.setHours(0),f.setMinutes(0),f.setSeconds(0),f.setMilliseconds(0)),this._daylightSavingAdjust(f)},_daylightSavingAdjust:function(a){return a?(a.setHours(a.getHours()>12?a.getHours()+2:0),a):null},_setDate:function(a,b,c){var d=!b,e=a.selectedMonth,f=a.selectedYear,g=this._restrictMinMax(a,this._determineDate(a,b,new Date));a.selectedDay=a.currentDay=g.getDate(),a.drawMonth=a.selectedMonth=a.currentMonth=g.getMonth(),a.drawYear=a.selectedYear=a.currentYear=g.getFullYear(),(e!=a.selectedMonth||f!=a.selectedYear)&&!c&&this._notifyChange(a),this._adjustInstDate(a),a.input&&a.input.val(d?"":this._formatDate(a))},_getDate:function(a){var b=!a.currentYear||a.input&&a.input.val()==""?null:this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return b},_generateHTML:function(a){var b=new Date;b=this._daylightSavingAdjust(new Date(b.getFullYear(),b.getMonth(),b.getDate()));var c=this._get(a,"isRTL"),d=this._get(a,"showButtonPanel"),e=this._get(a,"hideIfNoPrevNext"),f=this._get(a,"navigationAsDateFormat"),g=this._getNumberOfMonths(a),h=this._get(a,"showCurrentAtPos"),i=this._get(a,"stepMonths"),j=g[0]!=1||g[1]!=1,k=this._daylightSavingAdjust(a.currentDay?new Date(a.currentYear,a.currentMonth,a.currentDay):new Date(9999,9,9)),l=this._getMinMaxDate(a,"min"),m=this._getMinMaxDate(a,"max"),n=a.drawMonth-h,o=a.drawYear;n<0&&(n+=12,o--);if(m){var p=this._daylightSavingAdjust(new Date(m.getFullYear(),m.getMonth()-g[0]*g[1]+1,m.getDate()));p=l&&p<l?l:p;while(this._daylightSavingAdjust(new Date(o,n,1))>p)n--,n<0&&(n=11,o--)}a.drawMonth=n,a.drawYear=o;var q=this._get(a,"prevText");q=f?this.formatDate(q,this._daylightSavingAdjust(new Date(o,n-i,1)),this._getFormatConfig(a)):q;var r=this._canAdjustMonth(a,-1,o,n)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', -"+i+", 'M');\""+' title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>":e?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+q+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"e":"w")+'">'+q+"</span></a>",s=this._get(a,"nextText");s=f?this.formatDate(s,this._daylightSavingAdjust(new Date(o,n+i,1)),this._getFormatConfig(a)):s;var t=this._canAdjustMonth(a,1,o,n)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._adjustDate('#"+a.id+"', +"+i+", 'M');\""+' title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>":e?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+s+'"><span class="ui-icon ui-icon-circle-triangle-'+(c?"w":"e")+'">'+s+"</span></a>",u=this._get(a,"currentText"),v=this._get(a,"gotoCurrent")&&a.currentDay?k:b;u=f?this.formatDate(u,v,this._getFormatConfig(a)):u;var w=a.inline?"":'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery_'+dpuuid+'.datepicker._hideDatepicker();">'+this._get(a,"closeText")+"</button>",x=d?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(c?w:"")+(this._isInRange(a,v)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery_'+dpuuid+".datepicker._gotoToday('#"+a.id+"');\""+">"+u+"</button>":"")+(c?"":w)+"</div>":"",y=parseInt(this._get(a,"firstDay"),10);y=isNaN(y)?0:y;var z=this._get(a,"showWeek"),A=this._get(a,"dayNames"),B=this._get(a,"dayNamesShort"),C=this._get(a,"dayNamesMin"),D=this._get(a,"monthNames"),E=this._get(a,"monthNamesShort"),F=this._get(a,"beforeShowDay"),G=this._get(a,"showOtherMonths"),H=this._get(a,"selectOtherMonths"),I=this._get(a,"calculateWeek")||this.iso8601Week,J=this._getDefaultDate(a),K="";for(var L=0;L<g[0];L++){var M="";this.maxRows=4;for(var N=0;N<g[1];N++){var O=this._daylightSavingAdjust(new Date(o,n,a.selectedDay)),P=" ui-corner-all",Q="";if(j){Q+='<div class="ui-datepicker-group';if(g[1]>1)switch(N){case 0:Q+=" ui-datepicker-group-first",P=" ui-corner-"+(c?"right":"left");break;case g[1]-1:Q+=" ui-datepicker-group-last",P=" ui-corner-"+(c?"left":"right");break;default:Q+=" ui-datepicker-group-middle",P=""}Q+='">'}Q+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+P+'">'+(/all|left/.test(P)&&L==0?c?t:r:"")+(/all|right/.test(P)&&L==0?c?r:t:"")+this._generateMonthYearHeader(a,n,o,l,m,L>0||N>0,D,E)+'</div><table class="ui-datepicker-calendar"><thead>'+"<tr>";var R=z?'<th class="ui-datepicker-week-col">'+this._get(a,"weekHeader")+"</th>":"";for(var S=0;S<7;S++){var T=(S+y)%7;R+="<th"+((S+y+6)%7>=5?' class="ui-datepicker-week-end"':"")+">"+'<span title="'+A[T]+'">'+C[T]+"</span></th>"}Q+=R+"</tr></thead><tbody>";var U=this._getDaysInMonth(o,n);o==a.selectedYear&&n==a.selectedMonth&&(a.selectedDay=Math.min(a.selectedDay,U));var V=(this._getFirstDayOfMonth(o,n)-y+7)%7,W=Math.ceil((V+U)/7),X=j?this.maxRows>W?this.maxRows:W:W;this.maxRows=X;var Y=this._daylightSavingAdjust(new Date(o,n,1-V));for(var Z=0;Z<X;Z++){Q+="<tr>";var _=z?'<td class="ui-datepicker-week-col">'+this._get(a,"calculateWeek")(Y)+"</td>":"";for(var S=0;S<7;S++){var ba=F?F.apply(a.input?a.input[0]:null,[Y]):[!0,""],bb=Y.getMonth()!=n,bc=bb&&!H||!ba[0]||l&&Y<l||m&&Y>m;_+='<td class="'+((S+y+6)%7>=5?" ui-datepicker-week-end":"")+(bb?" ui-datepicker-other-month":"")+(Y.getTime()==O.getTime()&&n==a.selectedMonth&&a._keyEvent||J.getTime()==Y.getTime()&&J.getTime()==O.getTime()?" "+this._dayOverClass:"")+(bc?" "+this._unselectableClass+" ui-state-disabled":"")+(bb&&!G?"":" "+ba[1]+(Y.getTime()==k.getTime()?" "+this._currentClass:"")+(Y.getTime()==b.getTime()?" ui-datepicker-today":""))+'"'+((!bb||G)&&ba[2]?' title="'+ba[2]+'"':"")+(bc?"":' onclick="DP_jQuery_'+dpuuid+".datepicker._selectDay('#"+a.id+"',"+Y.getMonth()+","+Y.getFullYear()+', this);return false;"')+">"+(bb&&!G?"&#xa0;":bc?'<span class="ui-state-default">'+Y.getDate()+"</span>":'<a class="ui-state-default'+(Y.getTime()==b.getTime()?" ui-state-highlight":"")+(Y.getTime()==k.getTime()?" ui-state-active":"")+(bb?" ui-priority-secondary":"")+'" href="#">'+Y.getDate()+"</a>")+"</td>",Y.setDate(Y.getDate()+1),Y=this._daylightSavingAdjust(Y)}Q+=_+"</tr>"}n++,n>11&&(n=0,o++),Q+="</tbody></table>"+(j?"</div>"+(g[0]>0&&N==g[1]-1?'<div class="ui-datepicker-row-break"></div>':""):""),M+=Q}K+=M}return K+=x+($.browser.msie&&parseInt($.browser.version,10)<7&&!a.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':""),a._keyEvent=!1,K},_generateMonthYearHeader:function(a,b,c,d,e,f,g,h){var i=this._get(a,"changeMonth"),j=this._get(a,"changeYear"),k=this._get(a,"showMonthAfterYear"),l='<div class="ui-datepicker-title">',m="";if(f||!i)m+='<span class="ui-datepicker-month">'+g[b]+"</span>";else{var n=d&&d.getFullYear()==c,o=e&&e.getFullYear()==c;m+='<select class="ui-datepicker-month" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'M');\" "+">";for(var p=0;p<12;p++)(!n||p>=d.getMonth())&&(!o||p<=e.getMonth())&&(m+='<option value="'+p+'"'+(p==b?' selected="selected"':"")+">"+h[p]+"</option>");m+="</select>"}k||(l+=m+(f||!i||!j?"&#xa0;":""));if(!a.yearshtml){a.yearshtml="";if(f||!j)l+='<span class="ui-datepicker-year">'+c+"</span>";else{var q=this._get(a,"yearRange").split(":"),r=(new Date).getFullYear(),s=function(a){var b=a.match(/c[+-].*/)?c+parseInt(a.substring(1),10):a.match(/[+-].*/)?r+parseInt(a,10):parseInt(a,10);return isNaN(b)?r:b},t=s(q[0]),u=Math.max(t,s(q[1]||""));t=d?Math.max(t,d.getFullYear()):t,u=e?Math.min(u,e.getFullYear()):u,a.yearshtml+='<select class="ui-datepicker-year" onchange="DP_jQuery_'+dpuuid+".datepicker._selectMonthYear('#"+a.id+"', this, 'Y');\" "+">";for(;t<=u;t++)a.yearshtml+='<option value="'+t+'"'+(t==c?' selected="selected"':"")+">"+t+"</option>";a.yearshtml+="</select>",l+=a.yearshtml,a.yearshtml=null}}return l+=this._get(a,"yearSuffix"),k&&(l+=(f||!i||!j?"&#xa0;":"")+m),l+="</div>",l},_adjustInstDate:function(a,b,c){var d=a.drawYear+(c=="Y"?b:0),e=a.drawMonth+(c=="M"?b:0),f=Math.min(a.selectedDay,this._getDaysInMonth(d,e))+(c=="D"?b:0),g=this._restrictMinMax(a,this._daylightSavingAdjust(new Date(d,e,f)));a.selectedDay=g.getDate(),a.drawMonth=a.selectedMonth=g.getMonth(),a.drawYear=a.selectedYear=g.getFullYear(),(c=="M"||c=="Y")&&this._notifyChange(a)},_restrictMinMax:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max"),e=c&&b<c?c:b;return e=d&&e>d?d:e,e},_notifyChange:function(a){var b=this._get(a,"onChangeMonthYear");b&&b.apply(a.input?a.input[0]:null,[a.selectedYear,a.selectedMonth+1,a])},_getNumberOfMonths:function(a){var b=this._get(a,"numberOfMonths");return b==null?[1,1]:typeof b=="number"?[1,b]:b},_getMinMaxDate:function(a,b){return this._determineDate(a,this._get(a,b+"Date"),null)},_getDaysInMonth:function(a,b){return 32-this._daylightSavingAdjust(new Date(a,b,32)).getDate()},_getFirstDayOfMonth:function(a,b){return(new Date(a,b,1)).getDay()},_canAdjustMonth:function(a,b,c,d){var e=this._getNumberOfMonths(a),f=this._daylightSavingAdjust(new Date(c,d+(b<0?b:e[0]*e[1]),1));return b<0&&f.setDate(this._getDaysInMonth(f.getFullYear(),f.getMonth())),this._isInRange(a,f)},_isInRange:function(a,b){var c=this._getMinMaxDate(a,"min"),d=this._getMinMaxDate(a,"max");return(!c||b.getTime()>=c.getTime())&&(!d||b.getTime()<=d.getTime())},_getFormatConfig:function(a){var b=this._get(a,"shortYearCutoff");return b=typeof b!="string"?b:(new Date).getFullYear()%100+parseInt(b,10),{shortYearCutoff:b,dayNamesShort:this._get(a,"dayNamesShort"),dayNames:this._get(a,"dayNames"),monthNamesShort:this._get(a,"monthNamesShort"),monthNames:this._get(a,"monthNames")}},_formatDate:function(a,b,c,d){b||(a.currentDay=a.selectedDay,a.currentMonth=a.selectedMonth,a.currentYear=a.selectedYear);var e=b?typeof b=="object"?b:this._daylightSavingAdjust(new Date(d,c,b)):this._daylightSavingAdjust(new Date(a.currentYear,a.currentMonth,a.currentDay));return this.formatDate(this._get(a,"dateFormat"),e,this._getFormatConfig(a))}}),$.fn.datepicker=function(a){if(!this.length)return this;$.datepicker.initialized||($(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv),$.datepicker.initialized=!0);var b=Array.prototype.slice.call(arguments,1);return typeof a!="string"||a!="isDisabled"&&a!="getDate"&&a!="widget"?a=="option"&&arguments.length==2&&typeof arguments[1]=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b)):this.each(function(){typeof a=="string"?$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this].concat(b)):$.datepicker._attachDatepicker(this,a)}):$.datepicker["_"+a+"Datepicker"].apply($.datepicker,[this[0]].concat(b))},$.datepicker=new Datepicker,$.datepicker.initialized=!1,$.datepicker.uuid=(new Date).getTime(),$.datepicker.version="1.8.21",window["DP_jQuery_"+dpuuid]=$})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.ui.progressbar.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.widget("ui.progressbar",{options:{value:0,max:100},min:0,_create:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this.min,"aria-valuemax":this.options.max,"aria-valuenow":this._value()}),this.valueDiv=a("<div class='ui-progressbar-value ui-widget-header ui-corner-left'></div>").appendTo(this.element),this.oldValue=this._value(),this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow"),this.valueDiv.remove(),a.Widget.prototype.destroy.apply(this,arguments)},value:function(a){return a===b?this._value():(this._setOption("value",a),this)},_setOption:function(b,c){b==="value"&&(this.options.value=c,this._refreshValue(),this._value()===this.options.max&&this._trigger("complete")),a.Widget.prototype._setOption.apply(this,arguments)},_value:function(){var a=this.options.value;return typeof a!="number"&&(a=0),Math.min(this.options.max,Math.max(this.min,a))},_percentage:function(){return 100*this._value()/this.options.max},_refreshValue:function(){var a=this.value(),b=this._percentage();this.oldValue!==a&&(this.oldValue=a,this._trigger("change")),this.valueDiv.toggle(a>this.min).toggleClass("ui-corner-right",a===this.options.max).width(b.toFixed(0)+"%"),this.element.attr("aria-valuenow",a)}}),a.extend(a.ui.progressbar,{version:"1.8.21"})})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.core.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
jQuery.effects||function(a,b){function c(b){var c;return b&&b.constructor==Array&&b.length==3?b:(c=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))?[parseInt(c[1],10),parseInt(c[2],10),parseInt(c[3],10)]:(c=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(b))?[parseFloat(c[1])*2.55,parseFloat(c[2])*2.55,parseFloat(c[3])*2.55]:(c=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(b))?[parseInt(c[1],16),parseInt(c[2],16),parseInt(c[3],16)]:(c=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(b))?[parseInt(c[1]+c[1],16),parseInt(c[2]+c[2],16),parseInt(c[3]+c[3],16)]:(c=/rgba\(0, 0, 0, 0\)/.exec(b))?e.transparent:e[a.trim(b).toLowerCase()]}function d(b,d){var e;do{e=a.curCSS(b,d);if(e!=""&&e!="transparent"||a.nodeName(b,"body"))break;d="backgroundColor"}while(b=b.parentNode);return c(e)}function h(){var a=document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle,b={},c,d;if(a&&a.length&&a[0]&&a[a[0]]){var e=a.length;while(e--)c=a[e],typeof a[c]=="string"&&(d=c.replace(/\-(\w)/g,function(a,b){return b.toUpperCase()}),b[d]=a[c])}else for(c in a)typeof a[c]=="string"&&(b[c]=a[c]);return b}function i(b){var c,d;for(c in b)d=b[c],(d==null||a.isFunction(d)||c in g||/scrollbar/.test(c)||!/color/i.test(c)&&isNaN(parseFloat(d)))&&delete b[c];return b}function j(a,b){var c={_:0},d;for(d in b)a[d]!=b[d]&&(c[d]=b[d]);return c}function k(b,c,d,e){typeof b=="object"&&(e=c,d=null,c=b,b=c.effect),a.isFunction(c)&&(e=c,d=null,c={});if(typeof c=="number"||a.fx.speeds[c])e=d,d=c,c={};return a.isFunction(d)&&(e=d,d=null),c=c||{},d=d||c.duration,d=a.fx.off?0:typeof d=="number"?d:d in a.fx.speeds?a.fx.speeds[d]:a.fx.speeds._default,e=e||c.complete,[b,c,d,e]}function l(b){return!b||typeof b=="number"||a.fx.speeds[b]?!0:typeof b=="string"&&!a.effects[b]?!0:!1}a.effects={},a.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","borderColor","color","outlineColor"],function(b,e){a.fx.step[e]=function(a){a.colorInit||(a.start=d(a.elem,e),a.end=c(a.end),a.colorInit=!0),a.elem.style[e]="rgb("+Math.max(Math.min(parseInt(a.pos*(a.end[0]-a.start[0])+a.start[0],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[1]-a.start[1])+a.start[1],10),255),0)+","+Math.max(Math.min(parseInt(a.pos*(a.end[2]-a.start[2])+a.start[2],10),255),0)+")"}});var e={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]},f=["add","remove","toggle"],g={border:1,borderBottom:1,borderColor:1,borderLeft:1,borderRight:1,borderTop:1,borderWidth:1,margin:1,padding:1};a.effects.animateClass=function(b,c,d,e){return a.isFunction(d)&&(e=d,d=null),this.queue(function(){var g=a(this),k=g.attr("style")||" ",l=i(h.call(this)),m,n=g.attr("class")||"";a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),m=i(h.call(this)),g.attr("class",n),g.animate(j(l,m),{queue:!1,duration:c,easing:d,complete:function(){a.each(f,function(a,c){b[c]&&g[c+"Class"](b[c])}),typeof g.attr("style")=="object"?(g.attr("style").cssText="",g.attr("style").cssText=k):g.attr("style",k),e&&e.apply(this,arguments),a.dequeue(this)}})})},a.fn.extend({_addClass:a.fn.addClass,addClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{add:b},c,d,e]):this._addClass(b)},_removeClass:a.fn.removeClass,removeClass:function(b,c,d,e){return c?a.effects.animateClass.apply(this,[{remove:b},c,d,e]):this._removeClass(b)},_toggleClass:a.fn.toggleClass,toggleClass:function(c,d,e,f,g){return typeof d=="boolean"||d===b?e?a.effects.animateClass.apply(this,[d?{add:c}:{remove:c},e,f,g]):this._toggleClass(c,d):a.effects.animateClass.apply(this,[{toggle:c},d,e,f])},switchClass:function(b,c,d,e,f){return a.effects.animateClass.apply(this,[{add:c,remove:b},d,e,f])}}),a.extend(a.effects,{version:"1.8.21",save:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.data("ec.storage."+b[c],a[0].style[b[c]])},restore:function(a,b){for(var c=0;c<b.length;c++)b[c]!==null&&a.css(b[c],a.data("ec.storage."+b[c]))},setMode:function(a,b){return b=="toggle"&&(b=a.is(":hidden")?"show":"hide"),b},getBaseline:function(a,b){var c,d;switch(a[0]){case"top":c=0;break;case"middle":c=.5;break;case"bottom":c=1;break;default:c=a[0]/b.height}switch(a[1]){case"left":d=0;break;case"center":d=.5;break;case"right":d=1;break;default:d=a[1]/b.width}return{x:d,y:c}},createWrapper:function(b){if(b.parent().is(".ui-effects-wrapper"))return b.parent();var c={width:b.outerWidth(!0),height:b.outerHeight(!0),"float":b.css("float")},d=a("<div></div>").addClass("ui-effects-wrapper").css({fontSize:"100%",background:"transparent",border:"none",margin:0,padding:0}),e=document.activeElement;try{e.id}catch(f){e=document.body}return b.wrap(d),(b[0]===e||a.contains(b[0],e))&&a(e).focus(),d=b.parent(),b.css("position")=="static"?(d.css({position:"relative"}),b.css({position:"relative"})):(a.extend(c,{position:b.css("position"),zIndex:b.css("z-index")}),a.each(["top","left","bottom","right"],function(a,d){c[d]=b.css(d),isNaN(parseInt(c[d],10))&&(c[d]="auto")}),b.css({position:"relative",top:0,left:0,right:"auto",bottom:"auto"})),d.css(c).show()},removeWrapper:function(b){var c,d=document.activeElement;return b.parent().is(".ui-effects-wrapper")?(c=b.parent().replaceWith(b),(b[0]===d||a.contains(b[0],d))&&a(d).focus(),c):b},setTransition:function(b,c,d,e){return e=e||{},a.each(c,function(a,c){var f=b.cssUnit(c);f[0]>0&&(e[c]=f[0]*d+f[1])}),e}}),a.fn.extend({effect:function(b,c,d,e){var f=k.apply(this,arguments),g={options:f[1],duration:f[2],callback:f[3]},h=g.options.mode,i=a.effects[b];return a.fx.off||!i?h?this[h](g.duration,g.callback):this.each(function(){g.callback&&g.callback.call(this)}):i.call(this,g)},_show:a.fn.show,show:function(a){if(l(a))return this._show.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="show",this.effect.apply(this,b)},_hide:a.fn.hide,hide:function(a){if(l(a))return this._hide.apply(this,arguments);var b=k.apply(this,arguments);return b[1].mode="hide",this.effect.apply(this,b)},__toggle:a.fn.toggle,toggle:function(b){if(l(b)||typeof b=="boolean"||a.isFunction(b))return this.__toggle.apply(this,arguments);var c=k.apply(this,arguments);return c[1].mode="toggle",this.effect.apply(this,c)},cssUnit:function(b){var c=this.css(b),d=[];return a.each(["em","px","%","pt"],function(a,b){c.indexOf(b)>0&&(d=[parseFloat(c),b])}),d}}),a.easing.jswing=a.easing.swing,a.extend(a.easing,{def:"easeOutQuad",swing:function(b,c,d,e,f){return a.easing[a.easing.def](b,c,d,e,f)},easeInQuad:function(a,b,c,d,e){return d*(b/=e)*b+c},easeOutQuad:function(a,b,c,d,e){return-d*(b/=e)*(b-2)+c},easeInOutQuad:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b+c:-d/2*(--b*(b-2)-1)+c},easeInCubic:function(a,b,c,d,e){return d*(b/=e)*b*b+c},easeOutCubic:function(a,b,c,d,e){return d*((b=b/e-1)*b*b+1)+c},easeInOutCubic:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b+c:d/2*((b-=2)*b*b+2)+c},easeInQuart:function(a,b,c,d,e){return d*(b/=e)*b*b*b+c},easeOutQuart:function(a,b,c,d,e){return-d*((b=b/e-1)*b*b*b-1)+c},easeInOutQuart:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b+c:-d/2*((b-=2)*b*b*b-2)+c},easeInQuint:function(a,b,c,d,e){return d*(b/=e)*b*b*b*b+c},easeOutQuint:function(a,b,c,d,e){return d*((b=b/e-1)*b*b*b*b+1)+c},easeInOutQuint:function(a,b,c,d,e){return(b/=e/2)<1?d/2*b*b*b*b*b+c:d/2*((b-=2)*b*b*b*b+2)+c},easeInSine:function(a,b,c,d,e){return-d*Math.cos(b/e*(Math.PI/2))+d+c},easeOutSine:function(a,b,c,d,e){return d*Math.sin(b/e*(Math.PI/2))+c},easeInOutSine:function(a,b,c,d,e){return-d/2*(Math.cos(Math.PI*b/e)-1)+c},easeInExpo:function(a,b,c,d,e){return b==0?c:d*Math.pow(2,10*(b/e-1))+c},easeOutExpo:function(a,b,c,d,e){return b==e?c+d:d*(-Math.pow(2,-10*b/e)+1)+c},easeInOutExpo:function(a,b,c,d,e){return b==0?c:b==e?c+d:(b/=e/2)<1?d/2*Math.pow(2,10*(b-1))+c:d/2*(-Math.pow(2,-10*--b)+2)+c},easeInCirc:function(a,b,c,d,e){return-d*(Math.sqrt(1-(b/=e)*b)-1)+c},easeOutCirc:function(a,b,c,d,e){return d*Math.sqrt(1-(b=b/e-1)*b)+c},easeInOutCirc:function(a,b,c,d,e){return(b/=e/2)<1?-d/2*(Math.sqrt(1-b*b)-1)+c:d/2*(Math.sqrt(1-(b-=2)*b)+1)+c},easeInElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return-(h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g))+c},easeOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e)==1)return c+d;g||(g=e*.3);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return h*Math.pow(2,-10*b)*Math.sin((b*e-f)*2*Math.PI/g)+d+c},easeInOutElastic:function(a,b,c,d,e){var f=1.70158,g=0,h=d;if(b==0)return c;if((b/=e/2)==2)return c+d;g||(g=e*.3*1.5);if(h<Math.abs(d)){h=d;var f=g/4}else var f=g/(2*Math.PI)*Math.asin(d/h);return b<1?-0.5*h*Math.pow(2,10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)+c:h*Math.pow(2,-10*(b-=1))*Math.sin((b*e-f)*2*Math.PI/g)*.5+d+c},easeInBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*(c/=f)*c*((g+1)*c-g)+d},easeOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),e*((c=c/f-1)*c*((g+1)*c+g)+1)+d},easeInOutBack:function(a,c,d,e,f,g){return g==b&&(g=1.70158),(c/=f/2)<1?e/2*c*c*(((g*=1.525)+1)*c-g)+d:e/2*((c-=2)*c*(((g*=1.525)+1)*c+g)+2)+d},easeInBounce:function(b,c,d,e,f){return e-a.easing.easeOutBounce(b,f-c,0,e,f)+d},easeOutBounce:function(a,b,c,d,e){return(b/=e)<1/2.75?d*7.5625*b*b+c:b<2/2.75?d*(7.5625*(b-=1.5/2.75)*b+.75)+c:b<2.5/2.75?d*(7.5625*(b-=2.25/2.75)*b+.9375)+c:d*(7.5625*(b-=2.625/2.75)*b+.984375)+c},easeInOutBounce:function(b,c,d,e,f){return c<f/2?a.easing.easeInBounce(b,c*2,0,e,f)*.5+d:a.easing.easeOutBounce(b,c*2-f,0,e,f)*.5+e*.5+d}})}(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.blind.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.blind=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=f=="vertical"?"height":"width",i=f=="vertical"?g.height():g.width();e=="show"&&g.css(h,0);var j={};j[h]=e=="show"?i:0,g.animate(j,b.duration,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.bounce.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.bounce=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"up",g=b.options.distance||20,h=b.options.times||5,i=b.duration||250;/show|hide/.test(e)&&d.push("opacity"),a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",g=b.options.distance||(j=="top"?c.outerHeight({margin:!0})/3:c.outerWidth({margin:!0})/3);e=="show"&&c.css("opacity",0).css(j,k=="pos"?-g:g),e=="hide"&&(g=g/(h*2)),e!="hide"&&h--;if(e=="show"){var l={opacity:1};l[j]=(k=="pos"?"+=":"-=")+g,c.animate(l,i/2,b.options.easing),g=g/2,h--}for(var m=0;m<h;m++){var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing),g=e=="hide"?g*2:g/2}if(e=="hide"){var l={opacity:0};l[j]=(k=="pos"?"-=":"+=")+g,c.animate(l,i/2,b.options.easing,function(){c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}else{var n={},p={};n[j]=(k=="pos"?"-=":"+=")+g,p[j]=(k=="pos"?"+=":"-=")+g,c.animate(n,i/2,b.options.easing).animate(p,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)})}c.queue("fx",function(){c.dequeue()}),c.dequeue()})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.clip.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.clip=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","height","width"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"vertical";a.effects.save(c,d),c.show();var g=a.effects.createWrapper(c).css({overflow:"hidden"}),h=c[0].tagName=="IMG"?g:c,i={size:f=="vertical"?"height":"width",position:f=="vertical"?"top":"left"},j=f=="vertical"?h.height():h.width();e=="show"&&(h.css(i.size,0),h.css(i.position,j/2));var k={};k[i.size]=e=="show"?j:0,k[i.position]=e=="show"?0:j/2,h.animate(k,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.drop.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.drop=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","opacity"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0})/2:c.outerWidth({margin:!0})/2);e=="show"&&c.css("opacity",0).css(g,h=="pos"?-i:i);var j={opacity:e=="show"?1:0};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.explode.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.explode=function(b){return this.queue(function(){var c=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3,d=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?a(this).is(":visible")?"hide":"show":b.options.mode;var e=a(this).show().css("visibility","hidden"),f=e.offset();f.top-=parseInt(e.css("marginTop"),10)||0,f.left-=parseInt(e.css("marginLeft"),10)||0;var g=e.outerWidth(!0),h=e.outerHeight(!0);for(var i=0;i<c;i++)for(var j=0;j<d;j++)e.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-j*(g/d),top:-i*(h/c)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/d,height:h/c,left:f.left+j*(g/d)+(b.options.mode=="show"?(j-Math.floor(d/2))*(g/d):0),top:f.top+i*(h/c)+(b.options.mode=="show"?(i-Math.floor(c/2))*(h/c):0),opacity:b.options.mode=="show"?0:1}).animate({left:f.left+j*(g/d)+(b.options.mode=="show"?0:(j-Math.floor(d/2))*(g/d)),top:f.top+i*(h/c)+(b.options.mode=="show"?0:(i-Math.floor(c/2))*(h/c)),opacity:b.options.mode=="show"?1:0},b.duration||500);setTimeout(function(){b.options.mode=="show"?e.css({visibility:"visible"}):e.css({visibility:"visible"}).hide(),b.callback&&b.callback.apply(e[0]),e.dequeue(),a("div.ui-effects-explode").remove()},b.duration||500)})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.fade.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.fade=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide");c.animate({opacity:d},{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.fold.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.fold=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"hide"),f=b.options.size||15,g=!!b.options.horizFirst,h=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(c,d),c.show();var i=a.effects.createWrapper(c).css({overflow:"hidden"}),j=e=="show"!=g,k=j?["width","height"]:["height","width"],l=j?[i.width(),i.height()]:[i.height(),i.width()],m=/([0-9]+)%/.exec(f);m&&(f=parseInt(m[1],10)/100*l[e=="hide"?0:1]),e=="show"&&i.css(g?{height:0,width:f}:{height:f,width:0});var n={},p={};n[k[0]]=e=="show"?l[0]:f,p[k[1]]=e=="show"?l[1]:0,i.animate(n,h,b.options.easing).animate(p,h,b.options.easing,function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.highlight.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.highlight=function(b){return this.queue(function(){var c=a(this),d=["backgroundImage","backgroundColor","opacity"],e=a.effects.setMode(c,b.options.mode||"show"),f={backgroundColor:c.css("backgroundColor")};e=="hide"&&(f.opacity=0),a.effects.save(c,d),c.show().css({backgroundImage:"none",backgroundColor:b.options.color||"#ffff99"}).animate(f,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),e=="show"&&!a.support.opacity&&this.style.removeAttribute("filter"),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.pulsate.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.pulsate=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"show"),e=(b.options.times||5)*2-1,f=b.duration?b.duration/2:a.fx.speeds._default/2,g=c.is(":visible"),h=0;g||(c.css("opacity",0).show(),h=1),(d=="hide"&&g||d=="show"&&!g)&&e--;for(var i=0;i<e;i++)c.animate({opacity:h},f,b.options.easing),h=(h+1)%2;c.animate({opacity:h},f,b.options.easing,function(){h==0&&c.hide(),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}).dequeue()})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.scale.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.puff=function(b){return this.queue(function(){var c=a(this),d=a.effects.setMode(c,b.options.mode||"hide"),e=parseInt(b.options.percent,10)||150,f=e/100,g={height:c.height(),width:c.width()};a.extend(b.options,{fade:!0,mode:d,percent:d=="hide"?e:100,from:d=="hide"?g:{height:g.height*f,width:g.width*f}}),c.effect("scale",b.options,b.duration,b.callback),c.dequeue()})},a.effects.scale=function(b){return this.queue(function(){var c=a(this),d=a.extend(!0,{},b.options),e=a.effects.setMode(c,b.options.mode||"effect"),f=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:e=="hide"?0:100),g=b.options.direction||"both",h=b.options.origin;e!="effect"&&(d.origin=h||["middle","center"],d.restore=!0);var i={height:c.height(),width:c.width()};c.from=b.options.from||(e=="show"?{height:0,width:0}:i);var j={y:g!="horizontal"?f/100:1,x:g!="vertical"?f/100:1};c.to={height:i.height*j.y,width:i.width*j.x},b.options.fade&&(e=="show"&&(c.from.opacity=0,c.to.opacity=1),e=="hide"&&(c.from.opacity=1,c.to.opacity=0)),d.from=c.from,d.to=c.to,d.mode=e,c.effect("size",d,b.duration,b.callback),c.dequeue()})},a.effects.size=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right","width","height","overflow","opacity"],e=["position","top","bottom","left","right","overflow","opacity"],f=["width","height","overflow"],g=["fontSize"],h=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"],i=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"],j=a.effects.setMode(c,b.options.mode||"effect"),k=b.options.restore||!1,l=b.options.scale||"both",m=b.options.origin,n={height:c.height(),width:c.width()};c.from=b.options.from||n,c.to=b.options.to||n;if(m){var p=a.effects.getBaseline(m,n);c.from.top=(n.height-c.from.height)*p.y,c.from.left=(n.width-c.from.width)*p.x,c.to.top=(n.height-c.to.height)*p.y,c.to.left=(n.width-c.to.width)*p.x}var q={from:{y:c.from.height/n.height,x:c.from.width/n.width},to:{y:c.to.height/n.height,x:c.to.width/n.width}};if(l=="box"||l=="both")q.from.y!=q.to.y&&(d=d.concat(h),c.from=a.effects.setTransition(c,h,q.from.y,c.from),c.to=a.effects.setTransition(c,h,q.to.y,c.to)),q.from.x!=q.to.x&&(d=d.concat(i),c.from=a.effects.setTransition(c,i,q.from.x,c.from),c.to=a.effects.setTransition(c,i,q.to.x,c.to));(l=="content"||l=="both")&&q.from.y!=q.to.y&&(d=d.concat(g),c.from=a.effects.setTransition(c,g,q.from.y,c.from),c.to=a.effects.setTransition(c,g,q.to.y,c.to)),a.effects.save(c,k?d:e),c.show(),a.effects.createWrapper(c),c.css("overflow","hidden").css(c.from);if(l=="content"||l=="both")h=h.concat(["marginTop","marginBottom"]).concat(g),i=i.concat(["marginLeft","marginRight"]),f=d.concat(h).concat(i),c.find("*[width]").each(function(){var c=a(this);k&&a.effects.save(c,f);var d={height:c.height(),width:c.width()};c.from={height:d.height*q.from.y,width:d.width*q.from.x},c.to={height:d.height*q.to.y,width:d.width*q.to.x},q.from.y!=q.to.y&&(c.from=a.effects.setTransition(c,h,q.from.y,c.from),c.to=a.effects.setTransition(c,h,q.to.y,c.to)),q.from.x!=q.to.x&&(c.from=a.effects.setTransition(c,i,q.from.x,c.from),c.to=a.effects.setTransition(c,i,q.to.x,c.to)),c.css(c.from),c.animate(c.to,b.duration,b.options.easing,function(){k&&a.effects.restore(c,f)})});c.animate(c.to,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){c.to.opacity===0&&c.css("opacity",c.from.opacity),j=="hide"&&c.hide(),a.effects.restore(c,k?d:e),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.shake.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.shake=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"effect"),f=b.options.direction||"left",g=b.options.distance||20,h=b.options.times||3,i=b.duration||b.options.duration||140;a.effects.save(c,d),c.show(),a.effects.createWrapper(c);var j=f=="up"||f=="down"?"top":"left",k=f=="up"||f=="left"?"pos":"neg",l={},m={},n={};l[j]=(k=="pos"?"-=":"+=")+g,m[j]=(k=="pos"?"+=":"-=")+g*2,n[j]=(k=="pos"?"-=":"+=")+g*2,c.animate(l,i,b.options.easing);for(var p=1;p<h;p++)c.animate(m,i,b.options.easing).animate(n,i,b.options.easing);c.animate(m,i,b.options.easing).animate(l,i/2,b.options.easing,function(){a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments)}),c.queue("fx",function(){c.dequeue()}),c.dequeue()})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.slide.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.slide=function(b){return this.queue(function(){var c=a(this),d=["position","top","bottom","left","right"],e=a.effects.setMode(c,b.options.mode||"show"),f=b.options.direction||"left";a.effects.save(c,d),c.show(),a.effects.createWrapper(c).css({overflow:"hidden"});var g=f=="up"||f=="down"?"top":"left",h=f=="up"||f=="left"?"pos":"neg",i=b.options.distance||(g=="top"?c.outerHeight({margin:!0}):c.outerWidth({margin:!0}));e=="show"&&c.css(g,h=="pos"?isNaN(i)?"-"+i:-i:i);var j={};j[g]=(e=="show"?h=="pos"?"+=":"-=":h=="pos"?"-=":"+=")+i,c.animate(j,{queue:!1,duration:b.duration,easing:b.options.easing,complete:function(){e=="hide"&&c.hide(),a.effects.restore(c,d),a.effects.removeWrapper(c),b.callback&&b.callback.apply(this,arguments),c.dequeue()}})})}})(jQuery);;/*! jQuery UI - v1.8.21 - 2012-06-05
* https://github.com/jquery/jquery-ui
* Includes: jquery.effects.transfer.js
* Copyright (c) 2012 AUTHORS.txt; Licensed MIT, GPL */
(function(a,b){a.effects.transfer=function(b){return this.queue(function(){var c=a(this),d=a(b.options.to),e=d.offset(),f={top:e.top,left:e.left,height:d.innerHeight(),width:d.innerWidth()},g=c.offset(),h=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:g.top,left:g.left,height:c.innerHeight(),width:c.innerWidth(),position:"absolute"}).animate(f,b.duration,b.options.easing,function(){h.remove(),b.callback&&b.callback.apply(c[0],arguments),c.dequeue()})})}})(jQuery);;

// =============

/*
 * jQuery UI Touch Punch 0.2.2
 *
 * Copyright 2011, Dave Furfero
 * Dual licensed under the MIT or GPL Version 2 licenses.
 *
 * Depends:
 *  jquery.ui.widget.js
 *  jquery.ui.mouse.js
 */
(function(b){b.support.touch="ontouchend" in document;if(!b.support.touch){return;}var c=b.ui.mouse.prototype,e=c._mouseInit,a;function d(g,h){if(g.originalEvent.touches.length>1){return;}g.preventDefault();var i=g.originalEvent.changedTouches[0],f=document.createEvent("MouseEvents");f.initMouseEvent(h,true,true,window,1,i.screenX,i.screenY,i.clientX,i.clientY,false,false,false,false,0,null);g.target.dispatchEvent(f);}c._touchStart=function(g){var f=this;if(a||!f._mouseCapture(g.originalEvent.changedTouches[0])){return;}a=true;f._touchMoved=false;d(g,"mouseover");d(g,"mousemove");d(g,"mousedown");};c._touchMove=function(f){if(!a){return;}this._touchMoved=true;d(f,"mousemove");};c._touchEnd=function(f){if(!a){return;}d(f,"mouseup");d(f,"mouseout");if(!this._touchMoved){d(f,"click");}a=false;};c._mouseInit=function(){var f=this;f.element.bind("touchstart",b.proxy(f,"_touchStart")).bind("touchmove",b.proxy(f,"_touchMove")).bind("touchend",b.proxy(f,"_touchEnd"));e.call(f);};})(jQuery);

// =============

/**
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 *
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
;(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

// =============

/* =============================================================
 * bootstrap-scrollspy.js v2.0.1
 * http://twitter.github.com/bootstrap/javascript.html#scrollspy
 * =============================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================== */

!function ( $ ) {

	"use strict";

	/* SCROLLSPY CLASS DEFINITION
	 * ========================== */

	function ScrollSpy( element, options) {
		var process = $.proxy(this.process, this)
			, $element = $(element).is('body') ? $(window) : $(element)
			, href;
		this.options = $.extend({}, $.fn.scrollspy.defaults, options);
		this.$scrollElement = $element.on('scroll.scroll.data-api', process);
		this.selector = (this.options.target
			|| ((href = $(element).attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
			|| '') + ' .nav li > a';
		this.$body = $('body').on('click.scroll.data-api', this.selector, process);
		this.refresh();
		this.process();
	}

	ScrollSpy.prototype = {

		constructor: ScrollSpy

		, refresh: function () {
			this.targets = this.$body
				.find(this.selector)
				.map(function () {
					var href = $(this).attr('href').replace(/.*(?=#[^\s]+$)/, '');
					return /^#\w/.test(href) && $(href).length ? href : null
				});

			this.offsets = $.map(this.targets, function (id) {
				return $(id).position().top
			})
		}

		, process: function () {
			var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
				, offsets = this.offsets
				, targets = this.targets
				, activeTarget = this.activeTarget
				, i;

			for (i = offsets.length; i--;) {
				activeTarget != targets[i]
					&& scrollTop >= offsets[i]
					&& (!offsets[i + 1] || scrollTop <= offsets[i + 1])
				&& this.activate( targets[i] )
			}
		}

		, activate: function (target) {
			var active;

			this.activeTarget = target;

			this.$body
				.find(this.selector).parent('.active')
				.removeClass('active');
				//.find('i').stop().css({'display':'block'}).animate({'top' : -10},50,function(){$(this).css({'display':'none'})})

			active = this.$body
				.find(this.selector + '[href$="' + target + '"]')
				.parent('li')
				.addClass('active');
				//find('i').stop().css({'display':'block'}).animate({'top' : 0},50);

			if ( active.parent('.dropdown-menu') )  {
				active.closest('li.dropdown').addClass('active')
			}
		}

	};


	/* SCROLLSPY PLUGIN DEFINITION
	 * =========================== */

	$.fn.scrollspy = function ( option ) {
		return this.each(function () {
			var $this = $(this)
				, data = $this.data('scrollspy')
				, options = typeof option == 'object' && option;
			if (!data) $this.data('scrollspy', (data = new ScrollSpy(this, options)));
			if (typeof option == 'string') data[option]()
		})
	};

	$.fn.scrollspy.Constructor = ScrollSpy;

	$.fn.scrollspy.defaults = {
		offset: 145
	};


	/* SCROLLSPY DATA-API
	 * ================== */

	$(function () {

	});

}( window.jQuery );

// =============

/* ===========================================================
 * bootstrap-tooltip.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tooltips
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ===========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TOOLTIP PUBLIC CLASS DEFINITION
  * =============================== */

  var Tooltip = function (element, options) {
    this.init('tooltip', element, options)
  }

  Tooltip.prototype = {

    constructor: Tooltip

  , init: function (type, element, options) {
      var eventIn
        , eventOut

      this.type = type
      this.$element = $(element)
      this.options = this.getOptions(options)
      this.enabled = true

      if (this.options.trigger != 'manual') {
        eventIn  = this.options.trigger == 'hover' ? 'mouseenter' : 'focus'
        eventOut = this.options.trigger == 'hover' ? 'mouseleave' : 'blur'
        this.$element.on(eventIn, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut, this.options.selector, $.proxy(this.leave, this))
      }

      this.options.selector ?
        (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
        this.fixTitle()
    }

  , getOptions: function (options) {
      options = $.extend({}, $.fn[this.type].defaults, options, this.$element.data())

      if (options.delay && typeof options.delay == 'number') {
        options.delay = {
          show: options.delay
        , hide: options.delay
        }
      }

      return options
    }

  , enter: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (!self.options.delay || !self.options.delay.show) return self.show()

      clearTimeout(this.timeout)
      self.hoverState = 'in'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'in') self.show()
      }, self.options.delay.show)
    }

  , leave: function (e) {
      var self = $(e.currentTarget)[this.type](this._options).data(this.type)

      if (this.timeout) clearTimeout(this.timeout)
      if (!self.options.delay || !self.options.delay.hide) return self.hide()

      self.hoverState = 'out'
      this.timeout = setTimeout(function() {
        if (self.hoverState == 'out') self.hide()
      }, self.options.delay.hide)
    }

  , show: function () {
      var $tip
        , inside
        , pos
        , actualWidth
        , actualHeight
        , placement
        , tp

      if (this.hasContent() && this.enabled) {
        $tip = this.tip()
        this.setContent()

        if (this.options.animation) {
          $tip.addClass('fade')
        }

        placement = typeof this.options.placement == 'function' ?
          this.options.placement.call(this, $tip[0], this.$element[0]) :
          this.options.placement

        inside = /in/.test(placement)

        $tip
          .remove()
          .css({ top: 0, left: 0, display: 'block' })
          .appendTo(inside ? this.$element : document.body)

        pos = this.getPosition(inside)

        actualWidth = $tip[0].offsetWidth
        actualHeight = $tip[0].offsetHeight

        switch (inside ? placement.split(' ')[1] : placement) {
          case 'bottom':
            tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'top':
            tp = {top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2}
            break
          case 'left':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth}
            break
          case 'right':
            tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width}
            break
        }

        $tip
          .css(tp)
          .addClass(placement)
          .addClass('in')
      }
    }

  , isHTML: function(text) {
      // html string detection logic adapted from jQuery
      return typeof text != 'string'
        || ( text.charAt(0) === "<"
          && text.charAt( text.length - 1 ) === ">"
          && text.length >= 3
        ) || /^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(text)
    }

  , setContent: function () {
      var $tip = this.tip()
        , title = this.getTitle()

      $tip.find('.tooltip-inner')[this.isHTML(title) ? 'html' : 'text'](title)
      $tip.removeClass('fade in top bottom left right')
    }

  , hide: function () {
      var that = this
        , $tip = this.tip()

      $tip.removeClass('in')

      function removeWithAnimation() {
        var timeout = setTimeout(function () {
          $tip.off($.support.transition.end).remove()
        }, 500)

        $tip.one($.support.transition.end, function () {
          clearTimeout(timeout)
          $tip.remove()
        })
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        removeWithAnimation() :
        $tip.remove()
    }

  , fixTitle: function () {
      var $e = this.$element
      if ($e.attr('title') || typeof($e.attr('data-original-title')) != 'string') {
        $e.attr('data-original-title', $e.attr('title') || '').removeAttr('title')
      }
    }

  , hasContent: function () {
      return this.getTitle()
    }

  , getPosition: function (inside) {
      return $.extend({}, (inside ? {top: 0, left: 0} : this.$element.offset()), {
        width: this.$element[0].offsetWidth
      , height: this.$element[0].offsetHeight
      })
    }

  , getTitle: function () {
      var title
        , $e = this.$element
        , o = this.options

      title = $e.attr('data-original-title')
        || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

      return title
    }

  , tip: function () {
      return this.$tip = this.$tip || $(this.options.template)
    }

  , validate: function () {
      if (!this.$element[0].parentNode) {
        this.hide()
        this.$element = null
        this.options = null
      }
    }

  , enable: function () {
      this.enabled = true
    }

  , disable: function () {
      this.enabled = false
    }

  , toggleEnabled: function () {
      this.enabled = !this.enabled
    }

  , toggle: function () {
      this[this.tip().hasClass('in') ? 'hide' : 'show']()
    }

  }


 /* TOOLTIP PLUGIN DEFINITION
  * ========================= */

  $.fn.tooltip = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tooltip')
        , options = typeof option == 'object' && option
      if (!data) $this.data('tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tooltip.Constructor = Tooltip

  $.fn.tooltip.defaults = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover'
  , title: ''
  , delay: 0
  }

}(window.jQuery);


// =============

/* ========================================================
 * bootstrap-tab.js v2.0.4
 * http://twitter.github.com/bootstrap/javascript.html#tabs
 * ========================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================== */


!function ($) {

  "use strict"; // jshint ;_;


 /* TAB CLASS DEFINITION
  * ==================== */

  var Tab = function ( element ) {
    this.element = $(element)
  }

  Tab.prototype = {

    constructor: Tab

  , show: function () {
      var $this = this.element
        , $ul = $this.closest('ul:not(.dropdown-menu)')
        , selector = $this.attr('data-target')
        , previous
        , $target
        , e

      if (!selector) {
        selector = $this.attr('href')
        selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
      }

      if ( $this.parent('li').hasClass('active') ) return

      previous = $ul.find('.active a').last()[0]

      e = $.Event('show', {
        relatedTarget: previous
      })

      $this.trigger(e)

      if (e.isDefaultPrevented()) return

      $target = $(selector)

      this.activate($this.parent('li'), $ul)
      this.activate($target, $target.parent(), function () {
        $this.trigger({
          type: 'shown'
        , relatedTarget: previous
        })
      })
    }

  , activate: function ( element, container, callback) {
      var $active = container.find('> .active')
        , transition = callback
            && $.support.transition
            && $active.hasClass('fade')

      function next() {
        $active
          .removeClass('active')
          .find('> .dropdown-menu > .active')
          .removeClass('active')

        element.addClass('active')

        if (transition) {
          element[0].offsetWidth // reflow for transition
          element.addClass('in')
        } else {
          element.removeClass('fade')
        }

        if ( element.parent('.dropdown-menu') ) {
          element.closest('li.dropdown').addClass('active')
        }

        callback && callback()
      }

      transition ?
        $active.one($.support.transition.end, next) :
        next()

      $active.removeClass('in')
    }
  }


 /* TAB PLUGIN DEFINITION
  * ===================== */

  $.fn.tab = function ( option ) {
    return this.each(function () {
      var $this = $(this)
        , data = $this.data('tab')
      if (!data) $this.data('tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.tab.Constructor = Tab


 /* TAB DATA-API
  * ============ */

  $(function () {
    $('body').on('click.tab.data-api', '[data-toggle="tab"], [data-toggle="pill"]', function (e) {
      e.preventDefault()
      $(this).tab('show')
    })
  })

}(window.jQuery);

// =============

(function($){
$.fn.scrollFollow = function( scrollFollowOptions ){
    var defaultOptions = {
		easing: 'linear',			//тип анимации, из easing
		duration:0,					//скорость анимации, если 0 - то включается режим fixed
		marginTopDefault:0,			//отступ сверху от точки создания блока
		marginBottom:0,				//отступ снизу, за который не будет заезжать блок
		indentTop: 52, 			// начинать скроллить на расстоянии отличном от верхней границы экрана
		marginTop: 'auto',			//расстояния от верха страницы до блока на странице auto или количество px
		animationParam: 'top',		//что анимировать (top, marginTop)
		wrapper:true,				//создавать ли пустое блок на месте стартовой позиции блока, что бы обтекающий контент его не заполнял
		parentWidth:false,			//если у анимированного блока нет ширины можно взять у родителя
		_debugger:false,
		onStartAnimate:null,
		onStopAnimate:null,
		onPositionAway:null,
		onPositionBack:null
    };
    var options = $.extend({}, defaultOptions, scrollFollowOptions);
	/*инициализация блока, события*/
    var init = function(obj){
		var $this = {}; 
		var bottomStop; 
		$this.block = $(obj); //анимированый блок
		
		$this.block.wrap("<div class='sf_wrapper' />").wrap("<div class='sf_body' />"); //создаём обёртку
		$this.block.body = $this.block.parents('.sf_body'); //анимированный блок
		$this.block.wrapper = $this.block.parents('.sf_wrapper'); //обёртка анимированного блока
		
		$this.block.wrapper.css({
			'position':'relative'	//что бы от этой точки был отсчёт анимации
			//'z-index':'10000'
		});
		
		$this.block.body.css({
			'position':'absolute',
			'top':+options.marginTopDefault	,
			'z-index':'10000'
		});
		blockSize($this);
		$(window).scroll(function(e){
			scrollingGo(whatScroll(), $this);
		});
		
	};
	var sf_debugger = function($this){
		if(!$('.sf_debugger').length){
		$('<div class="sf_debugger">'+
			'<div class="sf_marginTop"></div>'+
			'<div class="sf_marginBottom"></div>'+
			'<div class="sf_indentTop"></div>'+
			'<div class="debug_text"></div>'+
		  '</div>').appendTo('body');
		  
			var dbgWrapper = $('.sf_debugger');
			var dbgMT = dbgWrapper.find('.sf_marginTop');
			var dbgMB = dbgWrapper.find('.sf_marginBottom');
			var dbgIT = dbgWrapper.find('.sf_indentTop');
			var dbgTXT = dbgWrapper.find('.debug_text');
			$('body').css({'position':'relative'});
			dbgWrapper.css({
				'position':'absolute',
				'top':'0',
				'left':'0',
				'width':'100%',
				'height':'100%',
				'background':'rgba(0,0,0,0.1)',
				'z-index':'100000'
			});
			dbgMT.css({
				'position':'absolute',
				'top':options.marginTop+'px',
				'left':'0',
				'width':'100%',
				'height':'1px',
				'margin-top':'-2px',
				'border-bottom':'1px solid #4affff'
			});
			dbgMB.css({
				'position':'absolute',
				'top':bottomStop+'px',
				'left':'0',
				'width':'100%',
				'height':'1px',
				'margin-top':'-2px',
				'border-bottom':'1px solid #4affff'
			});
			dbgIT.css({
				'position':'fixed',
				'top':options.indentTop+'px',
				'left':'0',
				'width':'100%',
				'height':'1px',
				'margin-top':'-2px',
				'border-bottom':'1px solid #4affff'
			});
			dbgTXT.css({
				'position':'fixed',
				'top':'20px',
				'left':'20px',
				'width':'250px',
				'padding':'200px',
				'background':'rgba(0,0,0,0.5)'
			})
		}
		
			
		  
	};
	/*анимация*/
	var scrollingGo = function(pos, $this) {
			blockSize($this);
			//$('.dynamMenu .wrprAction h4').text(bottomStop+' '+ pos)
			if(options.duration != 0) { 
				if (pos < options.marginTop-options.indentTop) {
					newMargin = options.marginTopDefault;
				} else {
					if(pos > bottomStop-options.indentTop){
						newMargin = bottomStop - options.marginTop + options.marginTopDefault;
					} else {
						newMargin = pos - options.marginTop + options.marginTopDefault+options.indentTop;
					}
				}
				whatAnimate = {};
				whatAnimate[options.animationParam] = newMargin;
				$this.block.body.stop();
				/*options.onStartAnimate.call($this.block);*/
				$this.block.body.animate(whatAnimate, options.duration, options.easing/*, function(){options.onStopAnimate.call($this.block)}*/);
			} else {
				newMargin = options.marginTopDefault;
				if (pos < options.marginTop-options.indentTop) {
					$this.block.body.css({"position":"absolute"}).removeClass('sf_move');
				} else {
					if(pos > bottomStop-options.indentTop){
						newMargin = bottomStop - options.marginTop + options.marginTopDefault
						$this.block.body.css({"position":"absolute"}).addClass('sf_move');
					} else {
						newMargin = options.marginTopDefault+options.indentTop;
						$this.block.body.css({"position":"fixed"}).addClass('sf_move');
					}
					
				}
				whatAnimate = {};
				whatAnimate[options.animationParam] = newMargin;
				$this.block.body.css(whatAnimate);

			}
	};
	/*высчитываем значние скролла*/
	var whatScroll = function(){
		return f_filterResults (
			window.pageYOffset ? window.pageYOffset : 0,
			document.documentElement ? document.documentElement.scrollTop : 0,
			document.body ? document.body.scrollTop : 0
		);
		function f_filterResults(n_win, n_docel, n_body) {
			var n_result = n_win ? n_win : 0;
			if (n_docel && (!n_result || (n_result > n_docel)))
				n_result = n_docel;
			return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
		}
	};
	/*расчитываем размеры блока*/
	var blockSize = function($this){
		var blockSize = {};
		if (options.marginTop == "auto"){
			options.marginTop = $this.block.wrapper.offset().top;
			$(window).resize(function(){

				options.marginTop = $this.block.wrapper.offset().top;
				//alert(options.marginTop);
			});
		}
		if (options.parentWidth == true) {
			blockSize.width = $this.block.wrapper.parent().width();
		} else if (options.parentWidth == '100%'){blockSize.width = '100%'}
		else
		{
			blockSize.width = $this.block.width();
		}
		blockSize.height = 			
			parseInt($this.block.height())+
			parseInt($this.block.css('marginTop'))+
			parseInt($this.block.css('marginBottom'))+
			parseInt($this.block.css('paddingTop'))+
			parseInt($this.block.css('paddingBottom'))+
			parseInt($this.block.css('borderTopWidth'))+
			parseInt($this.block.css('borderBottomWidth'))
		if (options.wrapper == true) {		
			$this.block.wrapper.css({
				'height':blockSize.height
			});
		}
		
		$this.block.wrapper.css({
			'width':blockSize.width
		});
		$this.block.body.css({
			'width':blockSize.width,
			'height':blockSize.height
		});
		
		bottomStop = $(document).height() - options.marginBottom - options.marginTopDefault - blockSize.height;
		/*полная высота страницы - отступ снизу из конфига - отступ сверху - высота блока*/
		if( options._debugger == true) {
			sf_debugger($this)
		}
	};

    if (this.length > 0){
        this.each(function(){ 
            init(this);
        });
    }
    return this;
}
})(jQuery);


// =============

(function($){var i=function(e){if(!e)var e=window.event;e.cancelBubble=true;if(e.stopPropagation)e.stopPropagation()};$.fn.checkbox=function(f){try{document.execCommand('BackgroundImageCache',false,true)}catch(e){}var g={cls:'jquery-checkbox',empty:'empty.png'};g=$.extend(g,f||{});var h=function(a){var b=a.checked;var c=a.disabled;var d=$(a);if(a.stateInterval)clearInterval(a.stateInterval);a.stateInterval=setInterval(function(){if(a.disabled!=c)d.trigger((c=!!a.disabled)?'disable':'enable');if(a.checked!=b)d.trigger((b=!!a.checked)?'check':'uncheck')},10);return d};return this.each(function(){var a=this;var b=h(a);if(a.wrapper)a.wrapper.remove();a.wrapper=$('<span class="'+g.cls+'"><span class="mark"><img src="'+g.empty+'" /></span></span>');a.wrapperInner=a.wrapper.children('span:eq(0)');a.wrapper.hover(function(e){a.wrapperInner.addClass(g.cls+'-hover');i(e)},function(e){a.wrapperInner.removeClass(g.cls+'-hover');i(e)});b.css({position:'absolute',zIndex:-1,visibility:'hidden'}).after(a.wrapper);var c=false;if(b.attr('id')){c=$('label[for='+b.attr('id')+']');if(!c.length)c=false}if(!c){c=b.closest?b.closest('label'):b.parents('label:eq(0)');if(!c.length)c=false}if(c){c.hover(function(e){a.wrapper.trigger('mouseover',[e])},function(e){a.wrapper.trigger('mouseout',[e])});c.click(function(e){b.trigger('click',[e]);i(e);return false})}a.wrapper.click(function(e){b.trigger('click',[e]);i(e);return false});b.click(function(e){i(e)});b.bind('disable',function(){a.wrapperInner.addClass(g.cls+'-disabled')}).bind('enable',function(){a.wrapperInner.removeClass(g.cls+'-disabled')});b.bind('check',function(){a.wrapper.addClass(g.cls+'-checked')}).bind('uncheck',function(){a.wrapper.removeClass(g.cls+'-checked')});$('img',a.wrapper).bind('dragstart',function(){return false}).bind('mousedown',function(){return false});if(window.getSelection)a.wrapper.css('MozUserSelect','none');if(a.checked)a.wrapper.addClass(g.cls+'-checked');if(a.disabled)a.wrapperInner.addClass(g.cls+'-disabled')})}})(jQuery);

// =============

/*
* Placeholder plugin for jQuery
* ---
* Copyright 2010, Daniel Stocks (http://webcloud.se)
* Released under the MIT, BSD, and GPL Licenses.
*/
(function($) {
    function Placeholder(input) {
        this.input = input;
        if (input.attr('type') == 'password') {
            this.handlePassword();
        }
        // Prevent placeholder values from submitting
        $(input[0].form).submit(function() {
            if (input.hasClass('placeholder') && input[0].value == input.attr('placeholder')) {
                input[0].value = '';
            }
        });
    }
    Placeholder.prototype = {
        show : function(loading) {
            // FF and IE saves values when you refresh the page. If the user refreshes the page with
            // the placeholders showing they will be the default values and the input fields won't be empty.
            if (this.input[0].value === '' || (loading && this.valueIsPlaceholder())) {
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute('type', 'text');
                    } catch (e) {
                        this.input.before(this.fakePassword.show()).hide();
                    }
                }
                this.input.addClass('placeholder');
                this.input[0].value = this.input.attr('placeholder');
            }
        },
        hide : function() {
            if (this.valueIsPlaceholder() && this.input.hasClass('placeholder')) {
                this.input.removeClass('placeholder');
                this.input[0].value = '';
                if (this.isPassword) {
                    try {
                        this.input[0].setAttribute('type', 'password');
                    } catch (e) { }
                    // Restore focus for Opera and IE
                    this.input.show();
                    this.input[0].focus();
                }
            }
        },
        valueIsPlaceholder : function() {
            return this.input[0].value == this.input.attr('placeholder');
        },
        handlePassword: function() {
            var input = this.input;
            input.attr('realType', 'password');
            this.isPassword = true;
            // IE < 9 doesn't allow changing the type of password inputs
            if ($.browser.msie && input[0].outerHTML) {
                var fakeHTML = $(input[0].outerHTML.replace(/type=(['"])?password\1/gi, 'type=$1text$1'));
                this.fakePassword = fakeHTML.val(input.attr('placeholder')).addClass('placeholder').focus(function() {
                    input.trigger('focus');
                    $(this).hide();
                });
                $(input[0].form).submit(function() {
                    fakeHTML.remove();
                    input.show()
                });
            }
        }
    };
    var NATIVE_SUPPORT = !!("placeholder" in document.createElement( "input" ));
    $.fn.placeholder = function() {
        return NATIVE_SUPPORT ? this : this.each(function() {
            var input = $(this);
            var placeholder = new Placeholder(input);
            placeholder.show(true);
            input.focus(function() {
                placeholder.hide();
            });
            input.blur(function() {
                placeholder.show(false);
            });

            // On page refresh, IE doesn't re-populate user input
            // until the window.onload event is fired.
            if ($.browser.msie) {
                $(window).load(function() {
                    if(input.val()) {
                        input.removeClass("placeholder");
                    }
                    placeholder.show(true);
                });
                // What's even worse, the text cursor disappears
                // when tabbing between text inputs, here's a fix
                input.focus(function() {
                    if(this.value == "") {
                        var range = this.createTextRange();
                        range.collapse(true);
                        range.moveStart('character', 0);
                        range.select();
                    }
                });
            }
        });
    }
})(jQuery);

// =============

/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
var split;

// Avoid running twice; that would break the `nativeSplit` reference
split = split || function (undef) {

    var nativeSplit = String.prototype.split,
        compliantExecNpcg = /()??/.exec("")[1] === undef, // NPCG: nonparticipating capturing group
        self;

    self = function (str, separator, limit) {
        // If `separator` is not a regex, use `nativeSplit`
        if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
            return nativeSplit.call(str, separator, limit);
        }
        var output = [],
            flags = (separator.ignoreCase ? "i" : "") +
                    (separator.multiline  ? "m" : "") +
                    (separator.extended   ? "x" : "") + // Proposed for ES6
                    (separator.sticky     ? "y" : ""), // Firefox 3+
            lastLastIndex = 0,
            // Make `global` and avoid `lastIndex` issues by working with a copy
            separator = new RegExp(separator.source, flags + "g"),
            separator2, match, lastIndex, lastLength;
        str += ""; // Type-convert
        if (!compliantExecNpcg) {
            // Doesn't need flags gy, but they don't hurt
            separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
        }
        /* Values for `limit`, per the spec:
         * If undefined: 4294967295 // Math.pow(2, 32) - 1
         * If 0, Infinity, or NaN: 0
         * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
         * If negative number: 4294967296 - Math.floor(Math.abs(limit))
         * If other: Type-convert, then use the above rules
         */
        limit = limit === undef ?
            -1 >>> 0 : // Math.pow(2, 32) - 1
            limit >>> 0; // ToUint32(limit)
        while (match = separator.exec(str)) {
            // `separator.lastIndex` is not reliable cross-browser
            lastIndex = match.index + match[0].length;
            if (lastIndex > lastLastIndex) {
                output.push(str.slice(lastLastIndex, match.index));
                // Fix browsers whose `exec` methods don't consistently return `undefined` for
                // nonparticipating capturing groups
                if (!compliantExecNpcg && match.length > 1) {
                    match[0].replace(separator2, function () {
                        for (var i = 1; i < arguments.length - 2; i++) {
                            if (arguments[i] === undef) {
                                match[i] = undef;
                            }
                        }
                    });
                }
                if (match.length > 1 && match.index < str.length) {
                    Array.prototype.push.apply(output, match.slice(1));
                }
                lastLength = match[0].length;
                lastLastIndex = lastIndex;
                if (output.length >= limit) {
                    break;
                }
            }
            if (separator.lastIndex === match.index) {
                separator.lastIndex++; // Avoid an infinite loop
            }
        }
        if (lastLastIndex === str.length) {
            if (lastLength || !separator.test("")) {
                output.push("");
            }
        } else {
            output.push(str.slice(lastLastIndex));
        }
        return output.length > limit ? output.slice(0, limit) : output;
    };

    // For convenience
    String.prototype.split = function (separator, limit) {
        return self(this, separator, limit);
    };

    return self;

}();



// =============

// ikSelect 0.8.1
// Copyright (c) 2012 Igor Kozlov
// i10k.ru

;(function($,p,q,r){var s=$(p);var t={syntax:'<div class="ik_select_link"><span class="ik_select_link_text"></span></div><div class="ik_select_block"><div class="ik_select_list"></div></div>',autoWidth:true,ddFullWidth:true,customClass:"",ddCustomClass:"",ddMaxHeight:200};var u=$([]);var v=false;var w=-1;$.browser.mobile=(/iphone|ipad|ipod|android/i.test(navigator.userAgent.toLowerCase()));$.browser.android=(/android/i.test(navigator.userAgent.toLowerCase()));$.browser.operamini=Object.prototype.toString.call(p.operamini)==="[object OperaMini]";function IkSelect(a,b){var c=this;c.element=a;c.options=$.extend({},t,b);c._defaults=t;c._name='ikSelect';if(c.element===r){return c}c.fakeSelect=$('<div class="ik_select">'+c.options.syntax+'</div>');c.select=$(c.element);c.link=$(".ik_select_link",c.fakeSelect);c.linkText=$(".ik_select_link_text",c.fakeSelect);c.block=$(".ik_select_block",c.fakeSelect);c.list=$(".ik_select_list",c.fakeSelect);c.listInner=$('<div class="ik_select_list_inner"/>');c.active=$([]);c.hover=$([]);c.init()}$.extend(IkSelect.prototype,{init:function(){var h=this;var i=h.fakeSelect;var j=h.select;var k=h.link;var l=h.linkText;var m=h.block;var n=h.list;var o=h.listInner;n.append(o);i.addClass(h.options.customClass);m.addClass(h.options.ddCustomClass);h.reset();if(j.attr("disabled")){h.disable_select()}k.bind("click.ikSelect",function(){if(i.data("ik_select_disabled")){return this}if(u.length){u.data("plugin_ikSelect").hide_block()}if(!$.browser.mobile){h.show_block()}j.focus()});j.bind("focus.ikSelect",function(){if(i.data("ik_select_disabled")){return this}k.addClass("ik_select_focus");if((i.offset().top+i.height()>s.scrollTop()+s.height())||(i.offset().top+i.height()<s.scrollTop())){s.scrollTop(i.offset().top-s.height()/2)}});j.bind("blur.ikSelect",function(){if(i.data("ik_select_disabled")){return this}k.removeClass("ik_select_focus")});j.bind("change.ikSelect",function(a){h._select_fake_option()});j.bind("keydown.ikSelect keyup.ikSelect",function(a){var b=a.which;var c=h.active;var d=h.hover;var e=a.type;switch(b){case 40:if(e==="keydown"){a.preventDefault();var f;if(d.next("li").length){f=d.next("li");while(f.hasClass("ik_select_option_disabled")){f=f.next()}}if((!f||!f.length)&&d.parents(".ik_select_optgroup").next().length){f=d.parents(".ik_select_optgroup").next();while(f.length&&!f.find("li:not(.ik_select_option_disabled)").length){f=f.next()}f=f.find("li:not(.ik_select_option_disabled):first")}if(f&&f.length){h._move_to(f)}}break;case 38:if(e==="keydown"){a.preventDefault();var g;if(d.prev("li").length){g=d.prev("li");while(g.hasClass("ik_select_option_disabled")){g=g.prev()}}if((!g||!g.length)&&d.parents(".ik_select_optgroup").prev().length){g=d.parents(".ik_select_optgroup").prev();while(g.length&&!g.find("li:not(.ik_select_option_disabled)").length){g=g.prev()}g=g.find("li:last")}if(g&&g.length){h._move_to(g)}}break;case 33:case 36:if(e==="keydown"){a.preventDefault();h._move_to($("li:first",n))}break;case 34:case 35:if(e==="keydown"){a.preventDefault();h._move_to($("li:last",n))}break;case 32:if(e==="keydown"){a.preventDefault();if(!m.is(":visible")){h.show_block()}else{h._select_real_option()}}break;case 13:if(e==="keydown"&&m.is(":visible")){a.preventDefault();h._select_real_option()}break;case 27:if(e==="keydown"){a.preventDefault();h.hide_block()}break;case 9:if(e==="keydown"){if($.browser.webkit&&m.is(":visible")){a.preventDefault()}else{h.hide_block()}}break;default:if(e==="keyup"){h._select_fake_option()}break}});j.after(i);h.redraw();j.prependTo(i);m.data("ik_select_block_left",m.css("left"));m.data("ik_select_block_top",m.css("top"))},redraw:function(){var a=this;var b=a.select;var c=a.fakeSelect;var d=a.block;var e=a.list;var f=a.listInner;var g=a.options.autoWidth;var h=a.options.ddFullWidth;if(g||h){f.width("auto");$("ul",f).width("auto");c.width("auto");d.show().width(9999);f.css("float","left");e.css("position","absolute");var i=e.outerWidth(true);var j=e.width();e.css("position","static");d.hide().css("width","100%");f.css("float","none");if(w===-1){var k=$('<div style="width:50px;height:50px;overflow:hidden;position:absolute;top:-200px;left:-200px;"><div style="height:100px;"></div>');$("body").append(k);var l=$("div",k).innerWidth();k.css("overflow","auto");var m=$("div",k).innerWidth();$(k).remove();w=l-m}var n=c.parent().width();if(h){d.width(i);f.width(j);$("ul",f).width(j)}if(i>n){i=n}if(g){c.width(i)}}a._fix_height();if(!$.browser.mobile){b.width(1);b.css({left:-9999,top:0,height:c.height()})}},reset:function(){var a=this;var b=a.select;var c=a.linkText;var d=a.listInner;c.html(b.html());d.empty();var e='';var f=$("optgroup",b);if(f.length){f.each(function(){e+='<div class="ik_select_optgroup'+($(this).is(":disabled")?" ik_select_optgroup_disabled":"")+'">';e+='<div class="ik_select_optgroup_label">'+$(this).attr("label")+'</div>';e+='<ul>';$("option",this).each(function(){e+='<li'+($(this).is(":disabled")?" class=\"ik_select_option_disabled\"":"")+'><span class="ik_select_option" title="'+$(this).val()+'">'+$(this).html()+'</span></li>'});e+='</ul>';e+='</div>'})}else{e+='<ul>';$("option",b).each(function(){e+='<li'+($(this).is(":disabled")?" class=\"ik_select_option_disabled\"":"")+'><span class="ik_select_option" title="'+$(this).val()+'">'+$(this).html()+'</span></li>'});e+='</ul>'}d.append(e);a._select_fake_option();a._attach_list_events($("li:not(.ik_select_option_disabled)",d))},_attach_list_events:function(a){var b=this;var c=b.select;var d=b.linkText;var e=b.list;a.bind("click.ikSelect",function(){d.html($(".ik_select_option",this).html());c.val($(".ik_select_option",this).attr("title"));b.active.removeClass("ik_select_active");b.active=$(this).addClass("ik_select_active");b.hide_block();c.change();c.focus()});a.bind("mouseover.ikSelect",function(){b.hover.removeClass("ik_select_hover");b.hover=$(this).addClass("ik_select_hover")});a.addClass("ik_select_has_events")},_detach_list_events:function(a){a.unbind(".ikSelect");a.removeClass("ik_select_has_events")},set_defaults:function(a){$.extend(this._defaults,a||{});return this},hide_block:function(){var a=this.fakeSelect;var b=this.block;var c=this.select;b.hide().appendTo(a).css({"left":b.data("ik_select_block_left"),"top":b.data("ik_select_block_top")});u=$([]);c.focus()},show_block:function(){var a=this;var b=a.select;if($.browser.mobile&&!$.browser.android){b.focus();return a}if(u.is(a.select)){return a}else if(u.length){u.data("plugin_ikSelect").hide_block()}var c=a.fakeSelect;var d=a.block;var e=a.list;var f=a.listInner;var g=a.hover;var h=a.active;d.show();var i=$("option",b).index($("option:selected",b));g.removeClass("ik_select_hover");h.removeClass("ik_select_active");var j=$("li:eq("+i+")",e);j.addClass("ik_select_hover ik_select_active");a.hover=j;a.active=j;d.removeClass("ik_select_block_right");d.css("left",d.data("ik_select_block_left"));if(a.options.ddFullWidth&&c.offset().left+d.outerWidth(true)>s.width()){d.addClass("ik_select_block_right");d.css("left",(d.offset().left+d.outerWidth(true)-s.width())*(-1))}d.removeClass("ik_select_block_up");d.css("top",d.data("ik_select_block_top"));if(d.offset().top+d.outerHeight(true)>s.scrollTop()+s.height()){d.addClass("ik_select_block_up");d.css("top",((d.offset().top+d.outerHeight(true)-parseInt(d.data("ik_select_block_top"),10))-(s.scrollTop()+s.height()))*(-1))}var k=d.offset().left;var l=d.offset().top;d.width(d.width());d.appendTo("body").css({"left":k,"top":l});var m=$(".ik_select_active",e).position().top-e.height()/2;e.data("ik_select_scrollTop",m);f.scrollTop(m);u=b},add_options:function(h){var i=this;var j=i.select;var k=i.list;var l=i.listInner;var m='',selectHtml='';$.each(h,function(c,d){if(typeof d==='string'){m+='<li><span class="ik_select_option" title="'+c+'">'+d+'</span></li>';selectHtml+='<option value="'+c+'">'+d+'</option>'}else if(typeof d==='object'){var e=$("ul:eq("+c+")",k);var f=$("optgroup:eq("+c+")",j);var g=d;$.each(g,function(a,b){m+='<li><span class="ik_select_option" title="'+a+'">'+b+'</span></li>';selectHtml+='<option value="'+a+'">'+b+'</option>'});e.append(m);f.append(selectHtml);m='';selectHtml=''}});if(selectHtml!==''){$(":first",l).append(m);j.append(selectHtml)}i._fix_height();i._attach_list_events($("li:not(.ik_select_has_events)",l))},remove_options:function(d){var e=this;var f=e.select;var g=e.list;var h=$([]);$.each(d,function(b,c){$("option",f).each(function(a){if($(this).val()===c){h=h.add($(this)).add($("li:eq("+a+")",g))}})});h.remove();e._select_fake_option();e._fix_height()},_select_real_option:function(){var a=this.hover;var b=this.active;b.removeClass("ik_select_active");a.addClass("ik_select_active").click()},_select_fake_option:function(){var a=this;var b=a.select;var c=a.list;var d=a.linkText;var e=$(":selected",b);var f=$("option",b).index(e);d.html(e.html());a.hover=$("li",c).removeClass("ik_select_hover ik_select_active").eq(f).addClass("ik_select_hover ik_select_active");a.active=a.hover},disable_select:function(){var a=this.fakeSelect;var b=this.select;b.attr("disabled","disabled");a.addClass("ik_select_disabled").data("ik_select_disabled",true)},enable_select:function(){var a=this.fakeSelect;var b=this.select;b.removeAttr("disabled");a.removeClass("ik_select_disabled").data("ik_select_disabled",false)},toggle_select:function(){var a=this;var b=a.fakeSelect;if(b.data("ik_select_disabled")){a.enable_select()}else{a.disable_select()}},make_selection:function(a){var b=this;var c=b.select;c.val(a);b._select_fake_option()},disable_optgroups:function(d){var e=this;var f=e.select;var g=e.list;$.each(d,function(a,b){var c=$("optgroup:eq("+b+")",f);c.attr("disabled","disabled");$(".ik_select_optgroup:eq("+b+")",g).addClass("ik_select_optgroup_disabled");e.disable_options($("option",c))});e._select_fake_option()},enable_optgroups:function(d){var e=this;var f=e.select;var g=e.list;$.each(d,function(a,b){var c=$("optgroup:eq("+b+")",f);c.removeAttr("disabled");$(".ik_select_optgroup:eq("+b+")",g).removeClass("ik_select_optgroup_disabled");e.enable_options($("option",c))});e._select_fake_option()},disable_options:function(g){var h=this;var i=h.select;var j=h.list;var k=$("option",i);$.each(g,function(c,d){if(typeof d==="object"){$(this).attr("disabled","disabled");var e=k.index(this);var f=$("li:eq("+e+")",j).addClass("ik_select_option_disabled");h._detach_list_events(f)}else{k.each(function(a){if($(this).val()===d){$(this).attr("disabled","disabled");var b=$("li:eq("+a+")",j).addClass("ik_select_option_disabled");h._detach_list_events(b);return this}})}});h._select_fake_option()},enable_options:function(g){var h=this;var i=h.select;var j=h.list;var k=$("option",i);$.each(g,function(c,d){if(typeof d==="object"){$(this).removeAttr("disabled");var e=k.index(this);var f=$("li:eq("+e+")",j).removeClass("ik_select_option_disabled");h._attach_list_events(f)}else{k.each(function(a){if($(this).val()===d){$(this).removeAttr("disabled");var b=$("li:eq("+a+")",j).removeClass("ik_select_option_disabled");h._attach_list_events(b);return this}})}});h._select_fake_option()},detach_plugin:function(){var a=this;var b=a.select;var c=a.fakeSelect;b.unbind(".ikSelect").css({"width":"","height":"","left":"","top":""});c.before(b);c.remove()},_move_to:function(a){var b=this;var c=b.select;var d=b.block;var e=b.linkText;if(!d.is(":visible")&&$.browser.webkit){b.show_block();return this}b.hover.removeClass("ik_select_hover");a.addClass("ik_select_hover");b.hover=a;if(!$.browser.webkit){b.active.removeClass("ik_select_active");a.addClass("ik_select_active");b.active=a}if(!d.is(":visible")||$.browser.mozilla){if(!$.browser.mozilla){c.val($(".ik_select_option",a).attr("title"));c.change()}e.html($(".ik_select_option",a).html())}},_fix_height:function(){var a=this;var b=a.block;var c=a.listInner;var d=a.options.ddMaxHeight;var e=a.options.ddFullWidth;b.show();c.css("height","auto");if(c.height()>d){c.css({overflow:"auto",height:d,position:"relative"});if(!$.data(c,"ik_select_hasScrollbar")){if(e){b.width(b.width()+w);c.width(c.width()+w)}}$.data(c,"ik_select_hasScrollbar",true)}else{if($.data(c,"ik_select_hasScrollbar")){c.css({overflow:"",height:"auto"});c.width(c.width()-w);b.width(b.width()-w)}}b.hide()}});$.fn.ikSelect=function(b){if($.browser.operamini){return this}var c=Array.prototype.slice.call(arguments);return this.each(function(){if(!$.data(this,'plugin_ikSelect')){$.data(this,'plugin_ikSelect',new IkSelect(this,b))}else if(typeof b==='string'){var a=$.data(this,'plugin_ikSelect');switch(b){case'reset':a.reset();break;case'hide_dropdown':a.hide_block();break;case'show_dropdown':v=true;a.show_block();break;case'add_options':a.add_options(c[1]);break;case'remove_options':a.remove_options(c[1]);break;case'enable':a.enable_select();break;case'disable':a.disable_select();break;case'toggle':a.toggle_select();break;case'select':a.make_selection(c[1]);break;case'set_defaults':a.set_defaults(c[1]);break;case'redraw':a.redraw();break;case'disable_options':a.disable_options(c[1]);break;case'enable_options':a.enable_options(c[1]);break;case'disable_optgroups':a.disable_optgroups(c[1]);break;case'enable_optgroups':a.enable_optgroups(c[1]);break;case'detach':a.detach_plugin();break}}})};$.ikSelect=new IkSelect();$(q).bind("click.ikSelect",function(a){if(!v&&u.length&&!$(a.target).parents(".ik_select").length){u.ikSelect("hide_dropdown");u=$([])}if(v){v=false}})})(jQuery,window,document);

// =============

price = {
// Справочник соответствий ползунков пакетам
sliders2glass : {
	1111 : 'TWIG-1111',
	1121 : 'TWIG-2123',
	1131 : 'TWIG-2133',
	1141 : 'TWIG-1143',
	1112 : 'TWIG-1114',
	1122 : 'TWIG-2123',
	1132 : 'TWIG-2133',
	1142 : 'TWIG-1143',
	1113 : 'TWIG-1114',
	1123 : 'TWIG-2123',
	1133 : 'TWIG-2133',
	1143 : 'TWIG-1143',
	1114 : 'TWIG-1114',
	1124 : 'TWIG-3224',
	1134 : 'TWIG-3243',
	1144 : 'TWIG-3243',
	1211 : 'TWIG-1311',
	1221 : 'TWIG-4221',
	1231 : 'TWIG-1333',
	1241 : 'TWIG-2243',
	1212 : 'TWIG-1314',
	1222 : 'TWIG-3222',
	1232 : 'TWIG-1333',
	1242 : 'TWIG-2243',
	1213 : 'TWIG-1314',
	1223 : 'TWIG-1333',
	1233 : 'TWIG-1333',
	1243 : 'TWIG-2243',
	1214 : 'TWIG-1314',
	1224 : 'TWIG-3224',
	1234 : 'TWIG-3243',
	1244 : 'TWIG-3243',
	1311 : 'TWIG-1311',
	1321 : 'TWIG-3421',
	1331 : 'TWIG-1333',
	1341 : 'TWIG-2443',
	1312 : 'TWIG-1314',
	1322 : 'TWIG-1333',
	1332 : 'TWIG-1333',
	1342 : 'TWIG-2443',
	1313 : 'TWIG-1314',
	1323 : 'TWIG-1333',
	1333 : 'TWIG-1333',
	1343 : 'TWIG-2443',
	1314 : 'TWIG-1314',
	1324 : 'TWIG-3424',
	1334 : 'TWIG-1333',
	1344 : 'TWIG-1333',
	1411 : 'TWIG-3411',
	1421 : 'TWIG-3421',
	1431 : 'TWIG-3433',
	1441 : 'TWIG-2443',
	1412 : 'TWIG-3422',
	1422 : 'TWIG-3422',
	1432 : 'TWIG-3433',
	1442 : 'TWIG-2443',
	1413 : 'TWIG-3433',
	1423 : 'TWIG-3433',
	1433 : 'TWIG-3433',
	1443 : 'TWIG-2443',
	1414 : 'TWIG-3424',
	1424 : 'TWIG-3424',
	1434 : 'TWIG-1333',
	1444 : 'TWIG-2443',
	2111 : 'TWIG-4211',
	2121 : 'TWIG-2123',
	2131 : 'TWIG-2133',
	2141 : 'TWIG-2243',
	2112 : 'TWIG-2123',
	2122 : 'TWIG-2123',
	2132 : 'TWIG-2133',
	2142 : 'TWIG-2243',
	2113 : 'TWIG-2123',
	2123 : 'TWIG-2123',
	2133 : 'TWIG-2133',
	2143 : 'TWIG-2243',
	2114 : 'TWIG-3224',
	2124 : 'TWIG-3224',
	2134 : 'TWIG-2133',
	2144 : 'TWIG-2133',
	2211 : 'TWIG-4211',
	2221 : 'TWIG-4221',
	2231 : 'TWIG-2333',
	2241 : 'TWIG-2243',
	2212 : 'TWIG-2313',
	2222 : 'TWIG-3222',
	2232 : 'TWIG-2333',
	2242 : 'TWIG-2243',
	2213 : 'TWIG-2313',
	2223 : 'TWIG-2333',
	2233 : 'TWIG-2333',
	2243 : 'TWIG-2243',
	2214 : 'TWIG-3224',
	2224 : 'TWIG-3224',
	2234 : 'TWIG-2333',
	2244 : 'TWIG-2243',
	2311 : 'TWIG-2313',
	2321 : 'TWIG-3421',
	2331 : 'TWIG-2333',
	2341 : 'TWIG-2443',
	2312 : 'TWIG-2313',
	2322 : 'TWIG-2333',
	2332 : 'TWIG-2333',
	2342 : 'TWIG-2443',
	2313 : 'TWIG-2313',
	2323 : 'TWIG-2333',
	2333 : 'TWIG-2333',
	2343 : 'TWIG-2443',
	2314 : 'TWIG-3424',
	2324 : 'TWIG-3424',
	2334 : 'TWIG-2333',
	2344 : 'TWIG-2333',
	2411 : 'TWIG-3411',
	2421 : 'TWIG-3421',
	2431 : 'TWIG-3433',
	2441 : 'TWIG-2443',
	2412 : 'TWIG-3422',
	2422 : 'TWIG-3422',
	2432 : 'TWIG-3433',
	2442 : 'TWIG-2443',
	2413 : 'TWIG-3433',
	2423 : 'TWIG-3433',
	2433 : 'TWIG-3433',
	2443 : 'TWIG-2443',
	2414 : 'TWIG-3424',
	2424 : 'TWIG-3424',
	2434 : 'TWIG-2333',
	2444 : 'TWIG-2443',
	3111 : 'TWIG-4211',
	3121 : 'TWIG-4221',
	3131 : 'TWIG-3233',
	3141 : 'TWIG-3243',
	3112 : 'TWIG-3222',
	3122 : 'TWIG-3222',
	3132 : 'TWIG-3233',
	3142 : 'TWIG-3243',
	3113 : 'TWIG-3323',
	3123 : 'TWIG-3323',
	3133 : 'TWIG-3233',
	3143 : 'TWIG-3243',
	3114 : 'TWIG-3224',
	3124 : 'TWIG-3224',
	3134 : 'TWIG-3224',
	3144 : 'TWIG-3243',
	3211 : 'TWIG-4211',
	3221 : 'TWIG-4221',
	3231 : 'TWIG-3233',
	3241 : 'TWIG-3243',
	3212 : 'TWIG-3222',
	3222 : 'TWIG-3222',
	3232 : 'TWIG-3233',
	3242 : 'TWIG-3243',
	3213 : 'TWIG-3323',
	3223 : 'TWIG-3323',
	3233 : 'TWIG-3233',
	3243 : 'TWIG-3243',
	3214 : 'TWIG-3224',
	3224 : 'TWIG-3224',
	3234 : 'TWIG-3224',
	3244 : 'TWIG-3243',
	3311 : 'TWIG-3411',
	3321 : 'TWIG-3421',
	3331 : 'TWIG-3433',
	3341 : 'TWIG-3443',
	3312 : 'TWIG-3323',
	3322 : 'TWIG-3323',
	3332 : 'TWIG-3433',
	3342 : 'TWIG-3443',
	3313 : 'TWIG-3323',
	3323 : 'TWIG-3323',
	3333 : 'TWIG-3433',
	3343 : 'TWIG-3443',
	3314 : 'TWIG-3424',
	3324 : 'TWIG-3424',
	3334 : 'TWIG-2333',
	3344 : 'TWIG-3443',
	3411 : 'TWIG-3411',
	3421 : 'TWIG-3421',
	3431 : 'TWIG-3433',
	3441 : 'TWIG-3443',
	3412 : 'TWIG-3422',
	3422 : 'TWIG-3422',
	3432 : 'TWIG-3433',
	3442 : 'TWIG-3443',
	3413 : 'TWIG-3433',
	3423 : 'TWIG-3433',
	3433 : 'TWIG-3433',
	3443 : 'TWIG-3443',
	3414 : 'TWIG-3424',
	3424 : 'TWIG-3424',
	3434 : 'TWIG-3433',
	3444 : 'TWIG-3443',
	4111 : 'TWIG-4211',
	4121 : 'TWIG-4221',
	4131 : 'TWIG-4243',
	4141 : 'TWIG-4243',
	4112 : 'TWIG-4423',
	4122 : 'TWIG-4423',
	4132 : 'TWIG-4243',
	4142 : 'TWIG-4243',
	4113 : 'TWIG-4423',
	4123 : 'TWIG-4423',
	4133 : 'TWIG-4243',
	4143 : 'TWIG-4243',
	4114 : 'TWIG-4243',
	4124 : 'TWIG-3224',
	4134 : 'TWIG-3224',
	4144 : 'TWIG-4243',
	4211 : 'TWIG-4211',
	4221 : 'TWIG-4221',
	4231 : 'TWIG-4243',
	4241 : 'TWIG-4243',
	4212 : 'TWIG-4423',
	4222 : 'TWIG-4423',
	4232 : 'TWIG-4243',
	4242 : 'TWIG-4243',
	4213 : 'TWIG-4423',
	4223 : 'TWIG-4423',
	4233 : 'TWIG-4243',
	4243 : 'TWIG-4243',
	4214 : 'TWIG-3224',
	4224 : 'TWIG-3224',
	4234 : 'TWIG-3224',
	4244 : 'TWIG-4243',
	4311 : 'TWIG-4421',
	4321 : 'TWIG-4421',
	4331 : 'TWIG-4433',
	4341 : 'TWIG-4433',
	4312 : 'TWIG-4423',
	4322 : 'TWIG-4423',
	4332 : 'TWIG-4433',
	4342 : 'TWIG-4243',
	4313 : 'TWIG-4423',
	4323 : 'TWIG-4423',
	4333 : 'TWIG-4433',
	4343 : 'TWIG-4243',
	4314 : 'TWIG-1314',
	4324 : 'TWIG-3323',
	4334 : 'TWIG-4433',
	4344 : 'TWIG-4243',
	4411 : 'TWIG-4421',
	4421 : 'TWIG-4421',
	4431 : 'TWIG-4433',
	4441 : 'TWIG-4421',
	4412 : 'TWIG-4423',
	4422 : 'TWIG-4423',
	4432 : 'TWIG-4433',
	4442 : 'TWIG-4433',
	4413 : 'TWIG-4423',
	4423 : 'TWIG-4423',
	4433 : 'TWIG-4433',
	4443 : 'TWIG-4433',
	4414 : 'TWIG-4423',
	4424 : 'TWIG-4423',
	4434 : 'TWIG-4433',
	4444 : 'TWIG-4433'
},


// Типы домов и стоимость дополнительных опций
houseTypes : {
	monolithic: {'installpricem2':1700,		'innersillpricem':323,		'isaddtionalbase':0.3,		'outersillpricem':160,		'osadditionalbase':0.1,		'jambheadpricem':800,		'jhadditionalh2base':0.4,		'mosquito net':1000},
	panel: {'installpricem2':1600,		'innersillpricem':231,		'isaddtionalbase':0.2,		'outersillpricem':140,		'osadditionalbase':0,		'jambheadpricem':700,		'jhadditionalh2base':0.3,		'mosquito net':1000},
	brick: {'installpricem2':1700,		'innersillpricem':323,		'isaddtionalbase':0.3,		'outersillpricem':160,		'osadditionalbase':0.1,		'jambheadpricem':800,		'jhadditionalh2base':0.4,		'mosquito net':1000},
	stalinType: {'installpricem2':1800,		'innersillpricem':509,		'isaddtionalbase':0.4,		'outersillpricem':177,		'osadditionalbase':0.1,		'jambheadpricem':920,		'jhadditionalh2base':0.4,		'mosquito net':1000}
},


// Матрицы цен
matrixSubTypes : {
	'11-1' : {
		400 : {400:3555,	500:3712,	600:3870,	700:4027,	800:4184,	900:4340,	1000:4497,	1100:4653,	1200:4812,	1300:4969,	1400:5126,	1500:5282,	1600:5439,	1700:5595,	1800:5754,	1900:5911,	2000:6067,	2100:6224,	2200:6381,	2300:6537,	2400:6696,	2500:6853,	2600:7009,	2700:7166,	2800:7323,	2900:7479,	3000:7638},
		500 : {400:3707,	500:3877,	600:4048,	700:4218,	800:4388,	900:4557,	1000:4727,	1100:4896,	1200:5068,	1300:5238,	1400:5407,	1500:5577,	1600:5747,	1700:5916,	1800:6088,	1900:6258,	2000:6427,	2100:6596,	2200:6767,	2300:6936,	2400:7108,	2500:7278,	2600:7447,	2700:7616,	2800:7786,	2900:7956,	3000:8127},
		600 : {400:3859,	500:4042,	600:4226,	700:4409,	800:4592,	900:4774,	1000:4957,	1100:5139,	1200:5324,	1300:5507,	1400:5689,	1500:5872,	1600:6055,	1700:6237,	1800:6422,	1900:6605,	2000:6787,	2100:6969,	2200:7152,	2300:7335,	2400:7519,	2500:7702,	2600:7885,	2700:8067,	2800:8250,	2900:8432,	3000:8617},
		700 : {400:4012,	500:4208,	600:4405,	700:4601,	800:4797,	900:4992,	1000:5188,	1100:5383,	1200:5581,	1300:5777,	1400:5972,	1500:6167,	1600:6364,	1700:6559,	1800:6756,	1900:6953,	2000:7148,	2100:7343,	2200:7539,	2300:7734,	2400:7932,	2500:8128,	2600:8323,	2700:8519,	2800:8715,	2900:8910,	3000:9107},
		800 : {400:4165,	500:4373,	600:4583,	700:4792,	800:5001,	900:5209,	1000:5418,	1100:5626,	1200:5837,	1300:6046,	1400:6254,	1500:6462,	1600:6671,	1700:6880,	1800:7090,	1900:7299,	2000:7508,	2100:7716,	2200:7925,	2300:8133,	2400:8344,	2500:8553,	2600:8761,	2700:8969,	2800:9178,	2900:9387,	3000:9597},
		900 : {400:4317,	500:4538,	600:4761,	700:4984,	800:5205,	900:5426,	1000:5648,	1100:5869,	1200:6093,	1300:6315,	1400:6536,	1500:6757,	1600:6979,	1700:7201,	1800:7424,	1900:7646,	2000:7867,	2100:8089,	2200:8311,	2300:8532,	2400:8755,	2500:8978,	2600:9199,	2700:9420,	2800:9642,	2900:9863,	3000:10087},
		1000 : {400:4470,	500:4704,	600:4940,	700:5175,	800:5410,	900:5644,	1000:5879,	1100:6113,	1200:6350,	1300:6585,	1400:6819,	1500:7053,	1600:7288,	1700:7522,	1800:7759,	1900:7994,	2000:8228,	2100:8462,	2200:8697,	2300:8932,	2400:9168,	2500:9403,	2600:9637,	2700:9872,	2800:10107,	2900:10341,	3000:10577},
		1100 : {400:4622,	500:4869,	600:5118,	700:5367,	800:5614,	900:5861,	1000:6109,	1100:6356,	1200:6606,	1300:6854,	1400:7101,	1500:7348,	1600:7596,	1700:7843,	1800:8093,	1900:8341,	2000:8588,	2100:8835,	2200:9083,	2300:9330,	2400:9580,	2500:9828,	2600:10075,	2700:10322},
		1200 : {400:4774,	500:5034,	600:5297,	700:5558,	800:5818,	900:6078,	1000:6339,	1100:6599,	1200:6862,	1300:7123,	1400:7383,	1500:7643,	1600:7904,	1700:8164,	1800:8427,	1900:8688,	2000:8948,	2100:9208,	2200:9469,	2300:9729,	2400:9992,	2500:10253},
		1300 : {400:4927,	500:5200,	600:5476,	700:5750,	800:6023,	900:6296,	1000:6570,	1100:6843,	1200:7118,	1300:7392,	1400:7666,	1500:7939,	1600:8213,	1700:8486,	1800:8761,	1900:9035,	2000:9309,	2100:9582,	2200:9856,	2300:10129},
		1400 : {400:5079,	500:5365,	600:5654,	700:5941,	800:6227,	900:6513,	1000:6800,	1100:7086,	1200:7374,	1300:7661,	1400:7948,	1500:8234,	1600:8521,	1700:8807,	1800:9095,	1900:9382,	2000:9668,	2100:9954},
		1500 : {400:5231,	500:5530,	600:5832,	700:6132,	800:6431,	900:6730,	1000:7030,	1100:7329,	1200:7630,	1300:7930,	1400:8230,	1500:8529,	1600:8829,	1700:9128,	1800:9429,	1900:9729,	2000:10028},
		1600 : {400:5384,	500:5696,	600:6011,	700:6324,	800:6636,	900:6948,	1000:7261,	1100:7573,	1200:7887,	1300:8200,	1400:8512,	1500:8824,	1600:9137,	1700:9449,	1800:9764},
		1700 : {400:5536,	500:5861,	600:6189,	700:6515,	800:6840,	900:7165,	1000:7491,	1100:7816,	1200:8143,	1300:8469,	1400:8794,	1500:9119,	1600:9445,	1700:9770},
		1800 : {400:5688,	500:6026,	600:6367,	700:6706,	800:7044,	900:7382,	1000:7721,	1100:8059,	1200:8399,	1300:8738,	1400:9076,	1500:9414,	1600:9753},
		1900 : {400:5841,	500:6192,	600:6546,	700:6898,	800:7249,	900:7600,	1000:7952,	1100:8303,	1200:8656,	1300:9008,	1400:9359,	1500:9710},
		2000 : {400:5994,	500:6358,	600:6724,	700:7089,	800:7453,	900:7817,	1000:8182,	1100:8546,	1200:8912,	1300:9277,	1400:9641,	1500:10005},
		2100 : {400:6146,	500:6523,	600:6902,	700:7280,	800:7657,	900:8034,	1000:8412,	1100:8789,	1200:9168,	1300:9546,	1400:9923},
		2200 : {400:6299,	500:6689,	600:7081,	700:7472,	800:7862,	900:8252,	1000:8643,	1100:9033,	1200:9425,	1300:9816},
		2300 : {400:6451,	500:6854,	600:7259,	700:7663,	800:8066,	900:8469,	1000:8873,	1100:9276,	1200:9681,	1300:10085},
		2400 : {400:6603,	500:7019,	600:7437,	700:7854,	800:8270,	900:8686,	1000:9103,	1100:9519,	1200:9937},
		2500 : {400:6756,	500:7185,	600:7616,	700:8046,	800:8475,	900:8904,	1000:9334,	1100:9762,	1200:10194},
		2600 : {400:6908,	500:7350,	600:7794,	700:8237,	800:8679,	900:9121,	1000:9564,	1100:10005},
		2700 : {400:7060,	500:7515,	600:7972,	700:8428,	800:8883,	900:9338,	1000:9794,	1100:10248},
		2800 : {400:7213,	500:7681,	600:8151,	700:8620,	800:9088,	900:9556,	1000:10024},
		2900 : {400:7365,	500:7846,	600:8329,	700:8811,	800:9292,	900:9773,	1000:10254},
		3000 : {400:7517,	500:8011,	600:8507,	700:9002,	800:9496,	900:9990}
	},
	'11-2' : {
		400 : {400:3719,	500:3840,	600:3963,	700:4085,	800:4248,	900:4411,	1000:4574,	1100:4737,	1200:4902,	1300:5065,	1400:5228,	1500:5391,	1600:5554,	1700:5717,	1800:5882,	1900:6045,	2000:6208,	2100:6371,	2200:6534,	2300:6697,	2400:6862,	2500:7025,	2600:7188,	2700:7351,	2800:7514,	2900:7677,	3000:7842},
		500 : {400:3834,	500:3955,	600:4104,	700:4281,	800:4456,	900:4632,	1000:4808,	1100:4984,	1200:5162,	1300:5339,	1400:5514,	1500:5690,	1600:5866,	1700:6042,	1800:6220,	1900:6396,	2000:6572,	2100:6748,	2200:6924,	2300:7100,	2400:7278,	2500:7454,	2600:7630,	2700:7806,	2800:7982,	2900:8158,	3000:8336},
		600 : {400:3948,	500:4095,	600:4286,	700:4476,	800:4664,	900:4853,	1000:5043,	1100:5231,	1200:5422,	1300:5612,	1400:5800,	1500:5989,	1600:6178,	1700:6367,	1800:6558,	1900:6747,	2000:6936,	2100:7125,	2200:7314,	2300:7503,	2400:7694,	2500:7883,	2600:8072,	2700:8261,	2800:8450,	2900:8639,	3000:8830},
		700 : {400:4064,	500:4266,	600:4469,	700:4672,	800:4874,	900:5075,	1000:5278,	1100:5479,	1200:5683,	1300:5886,	1400:6087,	1500:6289,	1600:6491,	1700:6693,	1800:6897,	1900:7099,	2000:7301,	2100:7503,	2200:7705,	2300:7907,	2400:8111,	2500:8313,	2600:8515,	2700:8716,	2800:8919,	2900:9120,	3000:9324},
		800 : {400:4220,	500:4435,	600:4652,	700:4867,	800:5082,	900:5296,	1000:5512,	1100:5726,	1200:5943,	1300:6159,	1400:6373,	1500:6588,	1600:6803,	1700:7018,	1800:7235,	1900:7450,	2000:7665,	2100:7880,	2200:8095,	2300:8310,	2400:8527,	2500:8742,	2600:8957,	2700:9171,	2800:9387,	2900:9601,	3000:9818},
		900 : {400:4377,	500:4604,	600:4834,	700:5062,	800:5290,	900:5518,	1000:5746,	1100:5974,	1200:6204,	1300:6432,	1400:6660,	1500:6887,	1600:7116,	1700:7343,	1800:7573,	1900:7801,	2000:8029,	2100:8257,	2200:8485,	2300:8713,	2400:8943,	2500:9171,	2600:9399,	2700:9626,	2800:9855,	2900:10082,	3000:10312},
		1000 : {400:4534,	500:4774,	600:5017,	700:5259,	800:5499,	900:5740,	1000:5981,	1100:6222,	1200:6465,	1300:6706,	1400:6947,	1500:7187,	1600:7429,	1700:7669,	1800:7912,	1900:8153,	2000:8394,	2100:8635,	2200:8876,	2300:9117,	2400:9359,	2500:9601,	2600:9841,	2700:10082,	2800:10323,	2900:10564,	3000:10807},
		1100 : {400:4690,	500:4944,	600:5199,	700:5454,	800:5707,	900:5961,	1000:6215,	1100:6469,	1200:6725,	1300:6979,	1400:7233,	1500:7486,	1600:7741,	1700:7994,	1800:8250,	1900:8504,	2000:8758,	2100:9012,	2200:9266,	2300:9519,	2400:9775,	2500:10030,	2600:10283,	2700:10537},
		1200 : {400:4846,	500:5113,	600:5382,	700:5649,	800:5916,	900:6182,	1000:6450,	1100:6716,	1200:6985,	1300:7252,	1400:7519,	1500:7785,	1600:8053,	1700:8319,	1800:8588,	1900:8856,	2000:9122,	2100:9389,	2200:9656,	2300:9922,	2400:10191,	2500:10459},
		1300 : {400:5004,	500:5283,	600:5565,	700:5845,	800:6125,	900:6404,	1000:6685,	1100:6964,	1200:7246,	1300:7526,	1400:7806,	1500:8085,	1600:8366,	1700:8645,	1800:8927,	1900:9207,	2000:9487,	2100:9766,	2200:10047,	2300:10326},
		1400 : {400:5160,	500:5452,	600:5747,	700:6041,	800:6333,	900:6626,	1000:6919,	1100:7211,	1200:7506,	1300:7800,	1400:8092,	1500:8384,	1600:8678,	1700:8970,	1800:9265,	1900:9558,	2000:9851,	2100:10143},
		1500 : {400:5316,	500:5622,	600:5929,	700:6236,	800:6541,	900:6847,	1000:7153,	1100:7459,	1200:7766,	1300:8073,	1400:8378,	1500:8684,	1600:8990,	1700:9295,	1800:9603,	1900:9910,	2000:10215},
		1600 : {400:5473,	500:5792,	600:6113,	700:6432,	800:6750,	900:7069,	1000:7388,	1100:7707,	1200:8027,	1300:8347,	1400:8665,	1500:8984,	1600:9303,	1700:9621,	1800:9942},
		1700 : {400:5630,	500:5961,	600:6295,	700:6627,	800:6959,	900:7290,	1000:7622,	1100:7954,	1200:8288,	1300:8620,	1400:8951,	1500:9283,	1600:9615,	1700:9946},
		1800 : {400:5786,	500:6130,	600:6477,	700:6822,	800:7167,	900:7511,	1000:7857,	1100:8201,	1200:8548,	1300:8893,	1400:9237,	1500:9582,	1600:9927},
		1900 : {400:5943,	500:6301,	600:6660,	700:7019,	800:7376,	900:7733,	1000:8092,	1100:8449,	1200:8809,	1300:9167,	1400:9524,	1500:9882},
		2000 : {400:6100,	500:6470,	600:6843,	700:7214,	800:7584,	900:7955,	1000:8326,	1100:8696,	1200:9069,	1300:9440,	1400:9811,	1500:10181},
		2100 : {400:6256,	500:6639,	600:7025,	700:7409,	800:7792,	900:8176,	1000:8560,	1100:8943,	1200:9329,	1300:9713,	1400:10097},
		2200 : {400:6413,	500:6809,	600:7208,	700:7605,	800:8002,	900:8398,	1000:8795,	1100:9192,	1200:9590,	1300:9987},
		2300 : {400:6569,	500:6979,	600:7390,	700:7801,	800:8210,	900:8619,	1000:9029,	1100:9439,	1200:9850,	1300:10261},
		2400 : {400:6726,	500:7148,	600:7573,	700:7996,	800:8418,	900:8840,	1000:9264,	1100:9686,	1200:10111},
		2500 : {400:6883,	500:7318,	600:7756,	700:8192,	800:8627,	900:9063,	1000:9499,	1100:9934,	1200:10372},
		2600 : {400:7039,	500:7487,	600:7938,	700:8387,	800:8835,	900:9284,	1000:9733,	1100:10181},
		2700 : {400:7196,	500:7657,	600:8120,	700:8582,	800:9044,	900:9505,	1000:9967,	1100:10428},
		2800 : {400:7353,	500:7827,	600:8303,	700:8779,	800:9253,	900:9727,	1000:10202},
		2900 : {400:7509,	500:7996,	600:8486,	700:8974,	800:9461,	900:9948,	1000:10436},
		3000 : {400:7665,	500:8166,	600:8668,	700:9169,	800:9669,	900:10170}
	},
	'11-3' : {
		400 : {400:4164,	500:4339,	600:4516,	700:4691,	800:4901,	900:5122,	1000:5342,	1100:5563,	1200:5785,	1300:6006,	1400:6227,	1500:6447,	1600:6668,	1700:6888,	1800:7111,	1900:7332,	2000:7552,	2100:7773,	2200:7993,	2300:8214,	2400:8437,	2500:8657,	2600:8878,	2700:9098,	2800:9319,	2900:9539,	3000:9762},
		500 : {400:4320,	500:4495,	600:4691,	700:4926,	800:5161,	900:5396,	1000:5631,	1100:5867,	1200:6104,	1300:6339,	1400:6574,	1500:6809,	1600:7044,	1700:7279,	1800:7517,	1900:7752,	2000:7987,	2100:8222,	2200:8457,	2300:8692,	2400:8929,	2500:9164,	2600:9399,	2700:9634,	2800:9869,	2900:10104,	3000:10342},
		600 : {400:4477,	500:4671,	600:4923,	700:5172,	800:5422,	900:5671,	1000:5921,	1100:6170,	1200:6422,	1300:6672,	1400:6921,	1500:7171,	1600:7421,	1700:7670,	1800:7922,	1900:8172,	2000:8421,	2100:8671,	2200:8920,	2300:9170,	2400:9422,	2500:9671,	2600:9921,	2700:10170,	2800:10420,	2900:10669,	3000:10921},
		700 : {400:4634,	500:4888,	600:5154,	700:5418,	800:5682,	900:5946,	1000:6210,	1100:6474,	1200:6741,	1300:7005,	1400:7269,	1500:7533,	1600:7797,	1700:8061,	1800:8327,	1900:8592,	2000:8856,	2100:9120,	2200:9384,	2300:9648,	2400:9914,	2500:10178,	2600:10442,	2700:10706,	2800:10970,	2900:11235,	3000:11501},
		800 : {400:4826,	500:5104,	600:5385,	700:5664,	800:5943,	900:6221,	1000:6500,	1100:6778,	1200:7059,	1300:7338,	1400:7616,	1500:7895,	1600:8173,	1700:8452,	1800:8733,	1900:9011,	2000:9290,	2100:9569,	2200:9847,	2300:10126,	2400:10407,	2500:10685,	2600:10964,	2700:11242,	2800:11521,	2900:11800,	3000:12080},
		900 : {400:5028,	500:5321,	600:5617,	700:5910,	800:6203,	900:6496,	1000:6789,	1100:7082,	1200:7378,	1300:7671,	1400:7964,	1500:8257,	1600:8550,	1700:8843,	1800:9138,	1900:9431,	2000:9724,	2100:10018,	2200:10311,	2300:10604,	2400:10899,	2500:11192,	2600:11485,	2700:11778,	2800:12071,	2900:12365,	3000:12660},
		1000 : {400:5231,	500:5538,	600:5848,	700:6156,	800:6463,	900:6771,	1000:7078,	1100:7386,	1200:7696,	1300:8004,	1400:8311,	1500:8619,	1600:8926,	1700:9234,	1800:9544,	1900:9851,	2000:10159,	2100:10467,	2200:10774,	2300:11082,	2400:11392,	2500:11699,	2600:12007,	2700:12314,	2800:12622,	2900:12930,	3000:13239},
		1100 : {400:5433,	500:5755,	600:6079,	700:6402,	800:6724,	900:7046,	1000:7368,	1100:7690,	1200:8014,	1300:8336,	1400:8659,	1500:8981,	1600:9303,	1700:9625,	1800:9949,	1900:10271,	2000:10593,	2100:10916,	2200:11238,	2300:11560,	2400:11884,	2500:12206,	2600:12528,	2700:12850},
		1200 : {400:5635,	500:5972,	600:6311,	700:6647,	800:6984,	900:7321,	1000:7657,	1100:7994,	1200:8333,	1300:8669,	1400:9006,	1500:9343,	1600:9679,	1700:10016,	1800:10355,	1900:10691,	2000:11028,	2100:11364,	2200:11701,	2300:12038,	2400:12377,	2500:12713},
		1300 : {400:5838,	500:6189,	600:6542,	700:6893,	800:7244,	900:7595,	1000:7947,	1100:8298,	1200:8651,	1300:9002,	1400:9353,	1500:9704,	1600:10056,	1700:10407,	1800:10760,	1900:11111,	2000:11462,	2100:11813,	2200:12165,	2300:12516},
		1400 : {400:6040,	500:6406,	600:6774,	700:7139,	800:7505,	900:7870,	1000:8236,	1100:8602,	1200:8970,	1300:9335,	1400:9701,	1500:10066,	1600:10432,	1700:10798,	1800:11166,	1900:11531,	2000:11897,	2100:12262},
		1500 : {400:6242,	500:6622,	600:7005,	700:7385,	800:7765,	900:8145,	1000:8525,	1100:8906,	1200:9288,	1300:9668,	1400:10048,	1500:10428,	1600:10808,	1700:11189,	1800:11571,	1900:11951,	2000:12331},
		1600 : {400:6445,	500:6839,	600:7236,	700:7631,	800:8026,	900:8420,	1000:8815,	1100:9209,	1200:9606,	1300:10001,	1400:10396,	1500:10790,	1600:11185,	1700:11580,	1800:11976},
		1700 : {400:6647,	500:7056,	600:7468,	700:7877,	800:8286,	900:8695,	1000:9104,	1100:9513,	1200:9925,	1300:10334,	1400:10743,	1500:11152,	1600:11561,	1700:11970},
		1800 : {400:6849,	500:7273,	600:7699,	700:8123,	800:8546,	900:8970,	1000:9394,	1100:9817,	1200:10243,	1300:10667,	1400:11090,	1500:11514,	1600:11938},
		1900 : {400:7052,	500:7490,	600:7930,	700:8368,	800:8807,	900:9245,	1000:9683,	1100:10121,	1200:10562,	1300:11000,	1400:11438,	1500:11876},
		2000 : {400:7254,	500:7707,	600:8162,	700:8614,	800:9067,	900:9520,	1000:9972,	1100:10425,	1200:10880,	1300:11333,	1400:11785,	1500:12238},
		2100 : {400:7456,	500:7924,	600:8393,	700:8860,	800:9327,	900:9795,	1000:10262,	1100:10729,	1200:11198,	1300:11666,	1400:12133},
		2200 : {400:7659,	500:8140,	600:8624,	700:9106,	800:9588,	900:10069,	1000:10551,	1100:11033,	1200:11517,	1300:11998},
		2300 : {400:7861,	500:8357,	600:8856,	700:9352,	800:9848,	900:10344,	1000:10841,	1100:11337,	1200:11835,	1300:12331},
		2400 : {400:8063,	500:8574,	600:9087,	700:9598,	800:10109,	900:10619,	1000:11130,	1100:11641,	1200:12154},
		2500 : {400:8266,	500:8791,	600:9319,	700:9844,	800:10369,	900:10894,	1000:11419,	1100:11944,	1200:12472},
		2600 : {400:8468,	500:9008,	600:9550,	700:10090,	800:10629,	900:11169,	1000:11709,	1100:12248},
		2700 : {400:8670,	500:9225,	600:9781,	700:10335,	800:10890,	900:11444,	1000:11998,	1100:12552},
		2800 : {400:8873,	500:9442,	600:10013,	700:10581,	800:11150,	900:11719,	1000:12287},
		2900 : {400:9075,	500:9658,	600:10244,	700:10827,	800:11410,	900:11994,	1000:12577},
		3000 : {400:9278,	500:9875,	600:10475,	700:11073,	800:11671,	900:12269}
	},
	
	'12-1' : {
		500 : {500:4455,	600:4631,	700:4806,	800:4981,	900:5155,	1000:5330},
		600 : {500:4625,	600:4814,	700:5002,	800:5190,	900:5377,	1000:5565},
		700 : {500:4795,	600:4997,	700:5198,	800:5399,	900:5599,	1000:5799},
		800 : {500:5187,	600:5402,	700:5616,	800:6158,	900:6289,	1000:6503},
		900 : {500:5357,	600:5585,	700:5812,	800:6367,	900:6511,	1000:6738},
		1000 : {500:5603,	600:5845,	700:6084,	800:6652,	900:6810,	1000:7050},
		1100 : {500:5753,	600:6007,	700:6260,	800:6840,	900:7011,	1000:7264},
		1200 : {500:5922,	600:6190,	700:6455,	800:7049,	900:7233,	1000:7498},
		1300 : {500:6093,	600:6373,	700:6652,	800:7259,	900:7455,	1000:7734},
		1400 : {500:6264,	600:6557,	700:6849,	800:7469,	900:7678,	1000:7970},
		1500 : {500:6434,	600:6740,	700:7045,	800:7677,	900:7900,	1000:8204},
		1600 : {500:6426,	600:6746,	700:7063,	800:7709,	900:7944,	1000:8262},
		1700 : {500:6597,	600:6929,	700:7260,	800:7919,	900:8167,	1000:8498},
		1800 : {500:6843,	600:7188,	700:7532,	800:8203,	900:8465,	1000:8808},
		1900 : {500:7014,	600:7372,	700:7728,	800:8413,	900:8687,	1000:9044},
		2000 : {500:7577,	600:7948,	700:8318,	800:9015,	900:9302,	1000:9672}
	},
	'12-2' : {
		500 : {500:4710,	600:4851,	700:4991,	800:5459,	900:5537,	1000:5716},
		600 : {500:4843,	600:4984,	700:5130,	800:5651,	900:5761,	1000:5953},
		700 : {500:5057,	600:5205,	700:5410,	800:5944,	900:6067,	1000:6272},
		800 : {500:5241,	600:5442,	700:5660,	800:6207,	900:6343,	1000:6561},
		900 : {500:5394,	600:5627,	700:5858,	800:6418,	900:6567,	1000:6798},
		1000 : {500:5643,	600:5889,	700:6133,	800:6706,	900:6868,	1000:7112},
		1100 : {500:5795,	600:6054,	700:6311,	800:6896,	900:7071,	1000:7328},
		1200 : {500:5967,	600:6239,	700:6509,	800:7107,	900:7295,	1000:7565},
		1300 : {500:6140,	600:6425,	700:6708,	800:7319,	900:7520,	1000:7803},
		1400 : {500:6313,	600:6611,	700:6907,	800:7531,	900:7745,	1000:8041},
		1500 : {500:6485,	600:6796,	700:7105,	800:7742,	900:7969,	1000:8278},
		1600 : {500:6768,	600:7092,	700:7414,	800:8064,	900:8304,	1000:8626},
		1700 : {500:6941,	600:7278,	700:7613,	800:8276,	900:8529,	1000:8864},
		1800 : {500:7190,	600:7539,	700:7887,	800:8563,	900:8829,	1000:9177},
		1900 : {500:7363,	600:7725,	700:8086,	800:8775,	900:9054,	1000:9415},
		2000 : {500:7640,	600:8015,	700:8390,	800:9092,	900:9383,	1000:9758}
	},
	'12-3' : {
		500 : {500:5159,	600:5341,	700:5521,	800:6029,	900:6136,	1000:6359},
		600 : {500:5321,	600:5503,	700:5683,	800:6243,	900:6399,	1000:6636},
		700 : {500:5563,	600:5745,	700:5992,	800:6572,	900:6742,	1000:6994},
		800 : {500:5776,	600:6010,	700:6277,	800:6871,	900:7056,	1000:7322},
		900 : {500:5946,	600:6229,	700:6510,	800:7119,	900:7319,	1000:7599},
		1000 : {500:6227,	600:6525,	700:6820,	800:7443,	900:7657,	1000:7953},
		1100 : {500:6410,	600:6722,	700:7032,	800:7670,	900:7898,	1000:8208},
		1200 : {500:6615,	600:6941,	700:7266,	800:7918,	900:8161,	1000:8485},
		1300 : {500:6819,	600:7160,	700:7499,	800:8166,	900:8424,	1000:8762},
		1400 : {500:7024,	600:7380,	700:7733,	800:8414,	900:8686,	1000:9040},
		1500 : {500:7228,	600:7599,	700:7966,	800:8662,	900:8949,	1000:9317},
		1600 : {500:7543,	600:7928,	700:8310,	800:9021,	900:9322,	1000:9704},
		1700 : {500:7748,	600:8147,	700:8544,	800:9269,	900:9584,	1000:9981},
		1800 : {500:8028,	600:8442,	700:8854,	800:9593,	900:9923,	1000:10334},
		1900 : {500:8233,	600:8661,	700:9087,	800:9841,	900:10186,	1000:10611},
		2000 : {500:8542,	600:8985,	700:9425,	800:10194,	900:10553,	1000:10993}
	},
	'13-1' : {
		500 : {500:4455,	600:4631,	700:4806,	800:4981,	900:5155,	1000:5330},
		600 : {500:4625,	600:4814,	700:5002,	800:5190,	900:5377,	1000:5565},
		700 : {500:4795,	600:4997,	700:5198,	800:5399,	900:5599,	1000:5799},
		800 : {500:5187,	600:5402,	700:5616,	800:6158,	900:6289,	1000:6503},
		900 : {500:5357,	600:5585,	700:5812,	800:6367,	900:6511,	1000:6738},
		1000 : {500:5603,	600:5845,	700:6084,	800:6652,	900:6810,	1000:7050},
		1100 : {500:5753,	600:6007,	700:6260,	800:6840,	900:7011,	1000:7264},
		1200 : {500:5922,	600:6190,	700:6455,	800:7049,	900:7233,	1000:7498},
		1300 : {500:6093,	600:6373,	700:6652,	800:7259,	900:7455,	1000:7734},
		1400 : {500:6264,	600:6557,	700:6849,	800:7469,	900:7678,	1000:7970},
		1500 : {500:6434,	600:6740,	700:7045,	800:7677,	900:7900,	1000:8204},
		1600 : {500:6426,	600:6746,	700:7063,	800:7709,	900:7944,	1000:8262},
		1700 : {500:6597,	600:6929,	700:7260,	800:7919,	900:8167,	1000:8498},
		1800 : {500:6843,	600:7188,	700:7532,	800:8203,	900:8465,	1000:8808},
		1900 : {500:7014,	600:7372,	700:7728,	800:8413,	900:8687,	1000:9044},
		2000 : {500:7577,	600:7948,	700:8318,	800:9015,	900:9302,	1000:9672}
	},
	'13-2' : {
		500 : {500:4710,	600:4851,	700:4991,	800:5459,	900:5537,	1000:5716},
		600 : {500:4843,	600:4984,	700:5130,	800:5651,	900:5761,	1000:5953},
		700 : {500:5057,	600:5205,	700:5410,	800:5944,	900:6067,	1000:6272},
		800 : {500:5241,	600:5442,	700:5660,	800:6207,	900:6343,	1000:6561},
		900 : {500:5394,	600:5627,	700:5858,	800:6418,	900:6567,	1000:6798},
		1000 : {500:5643,	600:5889,	700:6133,	800:6706,	900:6868,	1000:7112},
		1100 : {500:5795,	600:6054,	700:6311,	800:6896,	900:7071,	1000:7328},
		1200 : {500:5967,	600:6239,	700:6509,	800:7107,	900:7295,	1000:7565},
		1300 : {500:6140,	600:6425,	700:6708,	800:7319,	900:7520,	1000:7803},
		1400 : {500:6313,	600:6611,	700:6907,	800:7531,	900:7745,	1000:8041},
		1500 : {500:6485,	600:6796,	700:7105,	800:7742,	900:7969,	1000:8278},
		1600 : {500:6768,	600:7092,	700:7414,	800:8064,	900:8304,	1000:8626},
		1700 : {500:6941,	600:7278,	700:7613,	800:8276,	900:8529,	1000:8864},
		1800 : {500:7190,	600:7539,	700:7887,	800:8563,	900:8829,	1000:9177},
		1900 : {500:7363,	600:7725,	700:8086,	800:8775,	900:9054,	1000:9415},
		2000 : {500:7640,	600:8015,	700:8390,	800:9092,	900:9383,	1000:9758}
	},
	'13-3' : {
		500 : {500:5159,	600:5341,	700:5521,	800:6029,	900:6136,	1000:6359},
		600 : {500:5321,	600:5503,	700:5683,	800:6243,	900:6399,	1000:6636},
		700 : {500:5563,	600:5745,	700:5992,	800:6572,	900:6742,	1000:6994},
		800 : {500:5776,	600:6010,	700:6277,	800:6871,	900:7056,	1000:7322},
		900 : {500:5946,	600:6229,	700:6510,	800:7119,	900:7319,	1000:7599},
		1000 : {500:6227,	600:6525,	700:6820,	800:7443,	900:7657,	1000:7953},
		1100 : {500:6410,	600:6722,	700:7032,	800:7670,	900:7898,	1000:8208},
		1200 : {500:6615,	600:6941,	700:7266,	800:7918,	900:8161,	1000:8485},
		1300 : {500:6819,	600:7160,	700:7499,	800:8166,	900:8424,	1000:8762},
		1400 : {500:7024,	600:7380,	700:7733,	800:8414,	900:8686,	1000:9040},
		1500 : {500:7228,	600:7599,	700:7966,	800:8662,	900:8949,	1000:9317},
		1600 : {500:7543,	600:7928,	700:8310,	800:9021,	900:9322,	1000:9704},
		1700 : {500:7748,	600:8147,	700:8544,	800:9269,	900:9584,	1000:9981},
		1800 : {500:8028,	600:8442,	700:8854,	800:9593,	900:9923,	1000:10334},
		1900 : {500:8233,	600:8661,	700:9087,	800:9841,	900:10186,	1000:10611},
		2000 : {500:8542,	600:8985,	700:9425,	800:10194,	900:10553,	1000:10993}
	},
	'14-1' : {
		500 : {500:4886,	600:5063,	700:5241,	800:5639,	900:5772,	1000:6002},
		600 : {500:5056,	600:5246,	700:5437,	800:5848,	900:5994,	1000:6236},
		700 : {500:5238,	600:5440,	700:5645,	800:6069,	900:6228,	1000:6483},
		800 : {500:5460,	600:5675,	700:5892,	800:6329,	900:6502,	1000:6770},
		900 : {500:5753,	600:5981,	700:6211,	800:6662,	900:6847,	1000:7128},
		1000 : {500:5924,	600:6165,	700:6408,	800:6871,	900:7069,	1000:7363},
		1100 : {500:6073,	600:6327,	700:6583,	800:7059,	900:7270,	1000:7578},
		1200 : {500:6274,	600:6541,	700:6811,	800:7300,	900:7524,	1000:7844},
		1300 : {500:6445,	600:6725,	700:7007,	800:7509,	900:7746,	1000:8079},
		1400 : {500:6616,	600:6909,	700:7204,	800:7719,	900:7969,	1000:8315},
		1500 : {500:6810,	600:7116,	700:7424,	800:7952,	900:8215,	1000:8574},
		1600 : {500:7090,	600:7409,	700:7730,	800:8271,	900:8547,	1000:8919},
		1700 : {500:7336,	600:7668,	700:8002,	800:8556,	900:8845,	1000:9230},
		1800 : {500:7506,	600:7851,	700:8198,	800:8765,	900:9067,	1000:9465},
		1900 : {500:7677,	600:8035,	700:8395,	800:8975,	900:9290,	1000:9700},
		2000 : {500:7952,	600:8324,	700:8697,	800:9289,	900:9617,	1000:10041}
	},
	'14-2' : {
		500 : {500:5053,	600:5194,	700:5337,	800:5700,	900:5819,	1000:6052},
		600 : {500:5185,	600:5326,	700:5476,	800:5892,	900:6043,	1000:6289},
		700 : {500:5330,	600:5478,	700:5687,	800:6115,	900:6279,	1000:6539},
		800 : {500:5514,	600:5715,	700:5937,	800:6378,	900:6555,	1000:6827},
		900 : {500:5791,	600:6023,	700:6258,	800:6713,	900:6902,	1000:7188},
		1000 : {500:5964,	600:6209,	700:6457,	800:6925,	900:7127,	1000:7426},
		1100 : {500:6115,	600:6374,	700:6634,	800:7115,	900:7331,	1000:7642},
		1200 : {500:6323,	600:6595,	700:6869,	800:7362,	900:7591,	1000:7915},
		1300 : {500:6496,	600:6781,	700:7068,	800:7574,	900:7816,	1000:8153},
		1400 : {500:6669,	600:6967,	700:7267,	800:7786,	900:8041,	1000:8391},
		1500 : {500:6861,	600:7172,	700:7485,	800:8017,	900:8285,	1000:8648},
		1600 : {500:7145,	600:7468,	700:7794,	800:8339,	900:8620,	1000:8996},
		1700 : {500:7393,	600:7730,	700:8068,	800:8627,	900:8920,	1000:9310},
		1800 : {500:7565,	600:7915,	700:8266,	800:8838,	900:9144,	1000:9547},
		1900 : {500:7738,	600:8101,	700:8465,	800:9050,	900:9369,	1000:9785},
		2000 : {500:8016,	600:8391,	700:8769,	800:9366,	900:9698,	1000:10127}
	},
	'14-3' : {
		500 : {500:5502,	600:5684,	700:5867,	800:6270,	900:6418,	1000:6695},
		600 : {500:5663,	600:5846,	700:6029,	800:6484,	900:6681,	1000:6972},
		700 : {500:5836,	600:6018,	700:6269,	800:6744,	900:6955,	1000:7261},
		800 : {500:6049,	600:6283,	700:6553,	800:7043,	900:7268,	1000:7589},
		900 : {500:6343,	600:6626,	700:6910,	800:7414,	900:7654,	1000:7989},
		1000 : {500:6547,	600:6845,	700:7144,	800:7662,	900:7917,	1000:8266},
		1100 : {500:6730,	600:7042,	700:7356,	800:7889,	900:8158,	1000:8522},
		1200 : {500:6971,	600:7298,	700:7626,	800:8173,	900:8457,	1000:8835},
		1300 : {500:7176,	600:7517,	700:7859,	800:8421,	900:8719,	1000:9113},
		1400 : {500:7380,	600:7736,	700:8093,	800:8669,	900:8982,	1000:9390},
		1500 : {500:7605,	600:7975,	700:8346,	800:8937,	900:9265,	1000:9687},
		1600 : {500:7920,	600:8304,	700:8690,	800:9296,	900:9637,	1000:10074},
		1700 : {500:8199,	600:8599,	700:8999,	800:9619,	900:9975,	1000:10426},
		1800 : {500:8404,	600:8818,	700:9233,	800:9867,	900:10238,	1000:10704},
		1900 : {500:8609,	600:9037,	700:9466,	800:10115,	900:10501,	1000:10981},
		2000 : {500:8918,	600:9360,	700:9804,	800:10468,	900:10867,	1000:11362}
	},
	'15-1' : {
		500 : {500:4886,	600:5063,	700:5241,	800:5639,	900:5772,	1000:6002},
		600 : {500:5056,	600:5246,	700:5437,	800:5848,	900:5994,	1000:6236},
		700 : {500:5238,	600:5440,	700:5645,	800:6069,	900:6228,	1000:6483},
		800 : {500:5460,	600:5675,	700:5892,	800:6329,	900:6502,	1000:6770},
		900 : {500:5753,	600:5981,	700:6211,	800:6662,	900:6847,	1000:7128},
		1000 : {500:5924,	600:6165,	700:6408,	800:6871,	900:7069,	1000:7363},
		1100 : {500:6073,	600:6327,	700:6583,	800:7059,	900:7270,	1000:7578},
		1200 : {500:6274,	600:6541,	700:6811,	800:7300,	900:7524,	1000:7844},
		1300 : {500:6445,	600:6725,	700:7007,	800:7509,	900:7746,	1000:8079},
		1400 : {500:6616,	600:6909,	700:7204,	800:7719,	900:7969,	1000:8315},
		1500 : {500:6810,	600:7116,	700:7424,	800:7952,	900:8215,	1000:8574},
		1600 : {500:7090,	600:7409,	700:7730,	800:8271,	900:8547,	1000:8919},
		1700 : {500:7336,	600:7668,	700:8002,	800:8556,	900:8845,	1000:9230},
		1800 : {500:7506,	600:7851,	700:8198,	800:8765,	900:9067,	1000:9465},
		1900 : {500:7677,	600:8035,	700:8395,	800:8975,	900:9290,	1000:9700},
		2000 : {500:7952,	600:8324,	700:8697,	800:9289,	900:9617,	1000:10041}
	},
	'15-2' : {
		500 : {500:5053,	600:5194,	700:5337,	800:5700,	900:5819,	1000:6052},
		600 : {500:5185,	600:5326,	700:5476,	800:5892,	900:6043,	1000:6289},
		700 : {500:5330,	600:5478,	700:5687,	800:6115,	900:6279,	1000:6539},
		800 : {500:5514,	600:5715,	700:5937,	800:6378,	900:6555,	1000:6827},
		900 : {500:5791,	600:6023,	700:6258,	800:6713,	900:6902,	1000:7188},
		1000 : {500:5964,	600:6209,	700:6457,	800:6925,	900:7127,	1000:7426},
		1100 : {500:6115,	600:6374,	700:6634,	800:7115,	900:7331,	1000:7642},
		1200 : {500:6323,	600:6595,	700:6869,	800:7362,	900:7591,	1000:7915},
		1300 : {500:6496,	600:6781,	700:7068,	800:7574,	900:7816,	1000:8153},
		1400 : {500:6669,	600:6967,	700:7267,	800:7786,	900:8041,	1000:8391},
		1500 : {500:6861,	600:7172,	700:7485,	800:8017,	900:8285,	1000:8648},
		1600 : {500:7145,	600:7468,	700:7794,	800:8339,	900:8620,	1000:8996},
		1700 : {500:7393,	600:7730,	700:8068,	800:8627,	900:8920,	1000:9310},
		1800 : {500:7565,	600:7915,	700:8266,	800:8838,	900:9144,	1000:9547},
		1900 : {500:7738,	600:8101,	700:8465,	800:9050,	900:9369,	1000:9785},
		2000 : {500:8016,	600:8391,	700:8769,	800:9366,	900:9698,	1000:10127}
	},
	'15-3' : {
		500 : {500:5502,	600:5684,	700:5867,	800:6270,	900:6418,	1000:6695},
		600 : {500:5663,	600:5846,	700:6029,	800:6484,	900:6681,	1000:6972},
		700 : {500:5836,	600:6018,	700:6269,	800:6744,	900:6955,	1000:7261},
		800 : {500:6049,	600:6283,	700:6553,	800:7043,	900:7268,	1000:7589},
		900 : {500:6343,	600:6626,	700:6910,	800:7414,	900:7654,	1000:7989},
		1000 : {500:6547,	600:6845,	700:7144,	800:7662,	900:7917,	1000:8266},
		1100 : {500:6730,	600:7042,	700:7356,	800:7889,	900:8158,	1000:8522},
		1200 : {500:6971,	600:7298,	700:7626,	800:8173,	900:8457,	1000:8835},
		1300 : {500:7176,	600:7517,	700:7859,	800:8421,	900:8719,	1000:9113},
		1400 : {500:7380,	600:7736,	700:8093,	800:8669,	900:8982,	1000:9390},
		1500 : {500:7605,	600:7975,	700:8346,	800:8937,	900:9265,	1000:9687},
		1600 : {500:7920,	600:8304,	700:8690,	800:9296,	900:9637,	1000:10074},
		1700 : {500:8199,	600:8599,	700:8999,	800:9619,	900:9975,	1000:10426},
		1800 : {500:8404,	600:8818,	700:9233,	800:9867,	900:10238,	1000:10704},
		1900 : {500:8609,	600:9037,	700:9466,	800:10115,	900:10501,	1000:10981},
		2000 : {500:8918,	600:9360,	700:9804,	800:10468,	900:10867,	1000:11362}
	},
	'16-1' : {
		500 : {500:4559,	600:4736,	700:4919,	800:5094,	900:5289,	1000:5468,	1100:5642,	1200:5880,	1300:6055,	1400:6230,	1500:6404,	1600:6654,	1700:6829,	1800:7128,	1900:7303,	2000:7478,	2100:7652,	2200:7589,	2300:7764,	2400:7940,	2500:8115},
		600 : {500:4729,	600:4918,	700:5115,	800:5303,	900:5511,	1000:5702,	1100:5890,	1200:6141,	1300:6329,	1400:6517,	1500:6704,	1600:6967,	1700:7155,	1800:7467,	1900:7654,	2000:7842,	2100:8029,	2200:7979,	2300:8167,	2400:8357,	2500:8544},
		700 : {500:4900,	600:5102,	700:5311,	800:5512,	900:5733,	1000:5938,	1100:6139,	1200:6403,	1300:6604,	1400:6804,	1500:7004,	1600:7280,	1700:7481,	1800:7806,	1900:8007,	2000:8208,	2100:8408,	2200:8371,	2300:8572,	2400:8774,	2500:8975},
		800 : {500:4967,	600:5182,	700:5685,	800:5927,	900:6187,	1000:6477,	1100:6690,	1200:6906,	1300:7119,	1400:7571,	1500:7783,	1600:7997,	1700:8211,	1800:8350,	1900:8564,	2000:8778,	2100:8991,	2200:9197,	2300:9411,	2400:9626,	2500:9840},
		900 : {500:5384,	600:5612,	700:6127,	800:6382,	900:6655,	1000:6958,	1100:7185,	1200:7413,	1300:7640,	1400:8104,	1500:8330,	1600:8557,	1700:8783,	1800:8936,	1900:9162,	2000:9389,	2100:9615,	2200:9834,	2300:10061,	2400:10289,	2500:10516},
		1000 : {500:5554,	600:5796,	700:6324,	800:6592,	900:6878,	1000:7193,	1100:7433,	1200:7674,	1300:7914,	1400:8391,	1500:8630,	1600:8870,	1700:9110,	1800:9275,	1900:9515,	2000:9755,	2100:9994,	2200:10226,	2300:10466,	2400:10707,	2500:10947},
		1100 : {500:5725,	600:5979,	700:6520,	800:6801,	900:7100,	1000:7429,	1100:7682,	1200:7936,	1300:8189,	1400:8679,	1500:8931,	1600:9184,	1700:9436,	1800:9614,	1900:9867,	2000:10120,	2100:10372,	2200:10617},
		1200 : {500:5958,	600:6225,	700:6779,	800:7073,	900:7385,	1000:7727,	1100:7993,	1200:8260,	1300:8526,	1400:9029,	1500:9294,	1600:9559,	1700:9825,	1800:10016,	1900:10282,	2000:10548},
		1300 : {500:6129,	600:6409,	700:6976,	800:7283,	900:7608,	1000:7962,	1100:8241,	1200:8521,	1300:8800,	1400:9316,	1500:9594,	1600:9873,	1700:10152,	1800:10356,	1900:10634},
		1400 : {500:6299,	600:6593,	700:7173,	800:7492,	900:7830,	1000:8198,	1100:8490,	1200:8783,	1300:9075,	1400:9604,	1500:9895,	1600:10186,	1700:10478},
		1500 : {500:6518,	600:6825,	700:7418,	800:7750,	900:8101,	1000:8482,	1100:8787,	1200:9093,	1300:9398,	1400:9940,	1500:10243,	1600:10548},
		1600 : {500:6689,	600:7008,	700:7614,	800:7960,	900:8324,	1000:8718,	1100:9035,	1200:9354,	1300:9672,	1400:10227,	1500:10544},
		1700 : {500:7010,	600:7343,	700:7962,	800:8320,	900:8697,	1000:9104,	1100:9435,	1200:9767,	1300:10097,	1400:10665},
		1800 : {500:7180,	600:7525,	700:8157,	800:8529,	900:8919,	1000:9339,	1100:9682,	1200:10027,	1300:10371},
		1900 : {500:7351,	600:7709,	700:8354,	800:8739,	900:9142,	1000:9574,	1100:9931,	1200:10289,	1300:10646},
		2000 : {500:7522,	600:7893,	700:8551,	800:8948,	900:9364,	1000:9810,	1100:10179,	1200:10551}
	},
	'16-2' : {
		500 : {500:4729,	600:4870,	700:5018,	800:5157,	900:5338,	1000:5521,	1100:5700,	1200:5943,	1300:6122,	1400:6302,	1500:6480,	1600:6735,	1700:6914,	1800:7439,	1900:7618,	2000:7473,	2100:7651,	2200:7593,	2300:7772,	2400:7953,	2500:8133},
		600 : {500:4861,	600:5002,	700:5157,	800:5349,	900:5562,	1000:5758,	1100:5950,	1200:6206,	1300:6398,	1400:6591,	1500:6782,	1600:7050,	1700:7242,	1800:7780,	1900:7972,	2000:7840,	2100:8031,	2200:7986,	2300:8178,	2400:8372,	2500:8564},
		700 : {500:4994,	600:5142,	700:5356,	800:5561,	900:5787,	1000:5996,	1100:6201,	1200:6470,	1300:6675,	1400:6881,	1500:7085,	1600:7365,	1700:7571,	1800:8122,	1900:8327,	2000:8207,	2100:8412,	2200:8380,	2300:8585,	2400:8792,	2500:8997},
		800 : {500:5391,	600:5592,	700:5810,	800:6029,	900:6246,	1000:6540,	1100:6759,	1200:6978,	1300:7197,	1400:7662,	1500:7880,	1600:8098,	1700:8316,	1800:8460,	1900:8678,	2000:8897,	2100:9114,	2200:9314,	2300:9533,	2400:9752,	2500:9971},
		900 : {500:5791,	600:6024,	700:6255,	800:6486,	900:6717,	1000:7024,	1100:7255,	1200:7488,	1300:7719,	1400:8198,	1500:8428,	1600:8660,	1700:8891,	1800:9048,	1900:9279,	2000:9510,	2100:9741,	2200:9954,	2300:10185,	2400:10418,	2500:10649},
		1000 : {500:5964,	600:6210,	700:6454,	800:6698,	900:6942,	1000:7262,	1100:7506,	1200:7752,	1300:7996,	1400:8488,	1500:8731,	1600:8976,	1700:9220,	1800:9389,	1900:9634,	2000:9878,	2100:10121,	2200:10347,	2300:10592,	2400:10837,	2500:11082},
		1100 : {500:6137,	600:6396,	700:6653,	800:6910,	900:7167,	1000:7500,	1100:7757,	1200:8016,	1300:8273,	1400:8778,	1500:9034,	1600:9291,	1700:9549,	1800:9731,	1900:9989,	2000:10246,	2100:10502,	2200:10741},
		1200 : {500:6382,	600:6653,	700:6924,	800:7194,	900:7463,	1000:7810,	1100:8080,	1200:8351,	1300:8622,	1400:9139,	1500:9409,	1600:9679,	1700:9949,	1800:10145,	1900:10415,	2000:10685},
		1300 : {500:6555,	600:6839,	700:7123,	800:7406,	900:7688,	1000:8047,	1100:8331,	1200:8615,	1300:8899,	1400:9429,	1500:9711,	1600:9995,	1700:10278,	1800:10486,	1900:10770},
		1400 : {500:6728,	600:7025,	700:7322,	800:7618,	900:7913,	1000:8285,	1100:8582,	1200:8879,	1300:9175,	1400:9719,	1500:10014,	1600:10310,	1700:10607},
		1500 : {500:6940,	600:7250,	700:7559,	800:7869,	900:8177,	1000:8562,	1100:8871,	1200:9182,	1300:9491,	1400:10048,	1500:10356,	1600:10665},
		1600 : {500:7113,	600:7436,	700:7758,	800:8081,	900:8402,	1000:8800,	1100:9122,	1200:9446,	1300:9768,	1400:10338,	1500:10659},
		1700 : {500:7436,	600:7773,	700:8108,	800:8443,	900:8778,	1000:9189,	1100:9524,	1200:9860,	1300:10196,	1400:10778},
		1800 : {500:7609,	600:7958,	700:8306,	800:8654,	900:9002,	1000:9426,	1100:9774,	1200:10123,	1300:10472},
		1900 : {500:7782,	600:8144,	700:8505,	800:8866,	900:9227,	1000:9664,	1100:10025,	1200:10387,	1300:10748},
		2000 : {500:7955,	600:8330,	700:8704,	800:9078,	900:9451,	1000:9902,	1100:10276,	1200:10651}
	},
	'16-3' : {
		500 : {500:5135,	600:5318,	700:5506,	800:5686,	900:5895,	1000:6122,	1100:6345,	1200:6631,	1300:6854,	1400:7077,	1500:7300,	1600:7598,	1700:7821,	1800:8168,	1900:8391,	2000:8289,	2100:8512,	2200:8497,	2300:8720,	2400:8945,	2500:9168},
		600 : {500:5297,	600:5479,	700:5667,	800:5900,	900:6158,	1000:6399,	1100:6636,	1200:6938,	1300:7175,	1400:7412,	1500:7650,	1600:7962,	1700:8199,	1800:8561,	1900:8799,	2000:8711,	2100:8949,	2200:8948,	2300:9186,	2400:9425,	2500:9662},
		700 : {500:5459,	600:5641,	700:5896,	800:6148,	900:6421,	1000:6676,	1100:6928,	1200:7244,	1300:7496,	1400:7747,	1500:7999,	1600:8326,	1700:8578,	1800:8955,	1900:9206,	2000:9134,	2100:9385,	2200:9399,	2300:9651,	2400:9905,	2500:10157},
		800 : {500:5410,	600:5644,	700:6088,	800:6390,	900:6657,	1000:6927,	1100:7172,	1200:7440,	1300:7707,	1400:7973,	1500:8239,	1600:8615,	1700:8881,	1800:9153,	1900:9420,	2000:9799,	2100:10065,	2200:10331,	2300:10598,	2400:10866,	2500:11143},
		900 : {500:5704,	600:5987,	700:6445,	800:6762,	900:7043,	1000:7327,	1100:7587,	1200:7870,	1300:8150,	1400:8431,	1500:8712,	1600:9102,	1700:9383,	1800:9670,	1900:9951,	2000:10344,	2100:10625,	2200:10906,	2300:11187,	2400:11470,	2500:11761},
		1000 : {500:5908,	600:6206,	700:6678,	800:7010,	900:7305,	1000:7604,	1100:7878,	1200:8176,	1300:8471,	1400:8766,	1500:9062,	1600:9466,	1700:9762,	1800:10063,	1900:10358,	2000:10766,	2100:11062,	2200:11357,	2300:11652,	2400:11950,	2500:12255},
		1100 : {500:6113,	600:6425,	700:6912,	800:7258,	900:7568,	1000:7881,	1100:8170,	1200:8482,	1300:8792,	1400:9102,	1500:9411,	1600:9831,	1700:10140,	1800:10456,	1900:10766,	2000:11189,	2100:11498,	2200:11808},
		1200 : {500:6354,	600:6680,	700:7182,	800:7542,	900:7867,	1000:8195,	1100:8498,	1200:8824,	1300:9149,	1400:9473,	1500:9797,	1600:10231,	1700:10555,	1800:10886,	1900:11210,	2000:11647},
		1300 : {500:6558,	600:6899,	700:7415,	800:7791,	900:8129,	1000:8472,	1100:8789,	1200:9131,	1300:9469,	1400:9808,	1500:10147,	1600:10595,	1700:10934,	1800:11279,	1900:11618},
		1400 : {500:6763,	600:7119,	700:7649,	800:8039,	900:8392,	1000:8749,	1100:9081,	1200:9437,	1300:9790,	1400:10143,	1500:10497,	1600:10959,	1700:11313},
		1500 : {500:6987,	600:7358,	700:7903,	800:8307,	900:8675,	1000:9046,	1100:9393,	1200:9763,	1300:10131,	1400:10498,	1500:10866,	1600:11343},
		1600 : {500:7192,	600:7577,	700:8136,	800:8555,	900:8937,	1000:9323,	1100:9684,	1200:10069,	1300:10451,	1400:10834,	1500:11216},
		1700 : {500:7472,	600:7871,	700:8445,	800:8878,	900:9275,	1000:9676,	1100:10051,	1200:10450,	1300:10847,	1400:11244},
		1800 : {500:7676,	600:8090,	700:8679,	800:9126,	900:9538,	1000:9953,	1100:10343,	1200:10756,	1300:11168},
		1900 : {500:7881,	600:8309,	700:8912,	800:9374,	900:9800,	1000:10230,	1100:10634,	1200:11063,	1300:11488},
		2000 : {500:8086,	600:8528,	700:9146,	800:9623,	900:10063,	1000:10507,	1100:10926,	1200:11369}
	},
	'17-1' : {
		500 : {500:4559,	600:4736,	700:4919,	800:5094,	900:5289,	1000:5468,	1100:5642,	1200:5880,	1300:6055,	1400:6230,	1500:6404,	1600:6654,	1700:6829,	1800:7128,	1900:7303,	2000:7478,	2100:7652,	2200:7589,	2300:7764,	2400:7940,	2500:8115},
		600 : {500:4729,	600:4918,	700:5115,	800:5303,	900:5511,	1000:5702,	1100:5890,	1200:6141,	1300:6329,	1400:6517,	1500:6704,	1600:6967,	1700:7155,	1800:7467,	1900:7654,	2000:7842,	2100:8029,	2200:7979,	2300:8167,	2400:8357,	2500:8544},
		700 : {500:4900,	600:5102,	700:5311,	800:5512,	900:5733,	1000:5938,	1100:6139,	1200:6403,	1300:6604,	1400:6804,	1500:7004,	1600:7280,	1700:7481,	1800:7806,	1900:8007,	2000:8208,	2100:8408,	2200:8371,	2300:8572,	2400:8774,	2500:8975},
		800 : {500:4967,	600:5182,	700:5685,	800:5927,	900:6187,	1000:6477,	1100:6690,	1200:6906,	1300:7119,	1400:7571,	1500:7783,	1600:7997,	1700:8211,	1800:8350,	1900:8564,	2000:8778,	2100:8991,	2200:9197,	2300:9411,	2400:9626,	2500:9840},
		900 : {500:5384,	600:5612,	700:6127,	800:6382,	900:6655,	1000:6958,	1100:7185,	1200:7413,	1300:7640,	1400:8104,	1500:8330,	1600:8557,	1700:8783,	1800:8936,	1900:9162,	2000:9389,	2100:9615,	2200:9834,	2300:10061,	2400:10289,	2500:10516},
		1000 : {500:5554,	600:5796,	700:6324,	800:6592,	900:6878,	1000:7193,	1100:7433,	1200:7674,	1300:7914,	1400:8391,	1500:8630,	1600:8870,	1700:9110,	1800:9275,	1900:9515,	2000:9755,	2100:9994,	2200:10226,	2300:10466,	2400:10707,	2500:10947},
		1100 : {500:5725,	600:5979,	700:6520,	800:6801,	900:7100,	1000:7429,	1100:7682,	1200:7936,	1300:8189,	1400:8679,	1500:8931,	1600:9184,	1700:9436,	1800:9614,	1900:9867,	2000:10120,	2100:10372,	2200:10617},
		1200 : {500:5958,	600:6225,	700:6779,	800:7073,	900:7385,	1000:7727,	1100:7993,	1200:8260,	1300:8526,	1400:9029,	1500:9294,	1600:9559,	1700:9825,	1800:10016,	1900:10282,	2000:10548},
		1300 : {500:6129,	600:6409,	700:6976,	800:7283,	900:7608,	1000:7962,	1100:8241,	1200:8521,	1300:8800,	1400:9316,	1500:9594,	1600:9873,	1700:10152,	1800:10356,	1900:10634},
		1400 : {500:6299,	600:6593,	700:7173,	800:7492,	900:7830,	1000:8198,	1100:8490,	1200:8783,	1300:9075,	1400:9604,	1500:9895,	1600:10186,	1700:10478},
		1500 : {500:6518,	600:6825,	700:7418,	800:7750,	900:8101,	1000:8482,	1100:8787,	1200:9093,	1300:9398,	1400:9940,	1500:10243,	1600:10548},
		1600 : {500:6689,	600:7008,	700:7614,	800:7960,	900:8324,	1000:8718,	1100:9035,	1200:9354,	1300:9672,	1400:10227,	1500:10544},
		1700 : {500:7010,	600:7343,	700:7962,	800:8320,	900:8697,	1000:9104,	1100:9435,	1200:9767,	1300:10097,	1400:10665},
		1800 : {500:7180,	600:7525,	700:8157,	800:8529,	900:8919,	1000:9339,	1100:9682,	1200:10027,	1300:10371},
		1900 : {500:7351,	600:7709,	700:8354,	800:8739,	900:9142,	1000:9574,	1100:9931,	1200:10289,	1300:10646},
		2000 : {500:7522,	600:7893,	700:8551,	800:8948,	900:9364,	1000:9810,	1100:10179,	1200:10551}
	},
	'17-2' : {
		500 : {500:4729,	600:4870,	700:5018,	800:5157,	900:5338,	1000:5521,	1100:5700,	1200:5943,	1300:6122,	1400:6302,	1500:6480,	1600:6735,	1700:6914,	1800:7439,	1900:7618,	2000:7473,	2100:7651,	2200:7593,	2300:7772,	2400:7953,	2500:8133},
		600 : {500:4861,	600:5002,	700:5157,	800:5349,	900:5562,	1000:5758,	1100:5950,	1200:6206,	1300:6398,	1400:6591,	1500:6782,	1600:7050,	1700:7242,	1800:7780,	1900:7972,	2000:7840,	2100:8031,	2200:7986,	2300:8178,	2400:8372,	2500:8564},
		700 : {500:4994,	600:5142,	700:5356,	800:5561,	900:5787,	1000:5996,	1100:6201,	1200:6470,	1300:6675,	1400:6881,	1500:7085,	1600:7365,	1700:7571,	1800:8122,	1900:8327,	2000:8207,	2100:8412,	2200:8380,	2300:8585,	2400:8792,	2500:8997},
		800 : {500:5391,	600:5592,	700:5810,	800:6029,	900:6246,	1000:6540,	1100:6759,	1200:6978,	1300:7197,	1400:7662,	1500:7880,	1600:8098,	1700:8316,	1800:8460,	1900:8678,	2000:8897,	2100:9114,	2200:9314,	2300:9533,	2400:9752,	2500:9971},
		900 : {500:5791,	600:6024,	700:6255,	800:6486,	900:6717,	1000:7024,	1100:7255,	1200:7488,	1300:7719,	1400:8198,	1500:8428,	1600:8660,	1700:8891,	1800:9048,	1900:9279,	2000:9510,	2100:9741,	2200:9954,	2300:10185,	2400:10418,	2500:10649},
		1000 : {500:5964,	600:6210,	700:6454,	800:6698,	900:6942,	1000:7262,	1100:7506,	1200:7752,	1300:7996,	1400:8488,	1500:8731,	1600:8976,	1700:9220,	1800:9389,	1900:9634,	2000:9878,	2100:10121,	2200:10347,	2300:10592,	2400:10837,	2500:11082},
		1100 : {500:6137,	600:6396,	700:6653,	800:6910,	900:7167,	1000:7500,	1100:7757,	1200:8016,	1300:8273,	1400:8778,	1500:9034,	1600:9291,	1700:9549,	1800:9731,	1900:9989,	2000:10246,	2100:10502,	2200:10741},
		1200 : {500:6382,	600:6653,	700:6924,	800:7194,	900:7463,	1000:7810,	1100:8080,	1200:8351,	1300:8622,	1400:9139,	1500:9409,	1600:9679,	1700:9949,	1800:10145,	1900:10415,	2000:10685},
		1300 : {500:6555,	600:6839,	700:7123,	800:7406,	900:7688,	1000:8047,	1100:8331,	1200:8615,	1300:8899,	1400:9429,	1500:9711,	1600:9995,	1700:10278,	1800:10486,	1900:10770},
		1400 : {500:6728,	600:7025,	700:7322,	800:7618,	900:7913,	1000:8285,	1100:8582,	1200:8879,	1300:9175,	1400:9719,	1500:10014,	1600:10310,	1700:10607},
		1500 : {500:6940,	600:7250,	700:7559,	800:7869,	900:8177,	1000:8562,	1100:8871,	1200:9182,	1300:9491,	1400:10048,	1500:10356,	1600:10665},
		1600 : {500:7113,	600:7436,	700:7758,	800:8081,	900:8402,	1000:8800,	1100:9122,	1200:9446,	1300:9768,	1400:10338,	1500:10659},
		1700 : {500:7436,	600:7773,	700:8108,	800:8443,	900:8778,	1000:9189,	1100:9524,	1200:9860,	1300:10196,	1400:10778},
		1800 : {500:7609,	600:7958,	700:8306,	800:8654,	900:9002,	1000:9426,	1100:9774,	1200:10123,	1300:10472},
		1900 : {500:7782,	600:8144,	700:8505,	800:8866,	900:9227,	1000:9664,	1100:10025,	1200:10387,	1300:10748},
		2000 : {500:7955,	600:8330,	700:8704,	800:9078,	900:9451,	1000:9902,	1100:10276,	1200:10651}
	},
	'17-3' : {
		500 : {500:5135,	600:5318,	700:5506,	800:5686,	900:5895,	1000:6122,	1100:6345,	1200:6631,	1300:6854,	1400:7077,	1500:7300,	1600:7598,	1700:7821,	1800:8168,	1900:8391,	2000:8289,	2100:8512,	2200:8497,	2300:8720,	2400:8945,	2500:9168},
		600 : {500:5297,	600:5479,	700:5667,	800:5900,	900:6158,	1000:6399,	1100:6636,	1200:6938,	1300:7175,	1400:7412,	1500:7650,	1600:7962,	1700:8199,	1800:8561,	1900:8799,	2000:8711,	2100:8949,	2200:8948,	2300:9186,	2400:9425,	2500:9662},
		700 : {500:5459,	600:5641,	700:5896,	800:6148,	900:6421,	1000:6676,	1100:6928,	1200:7244,	1300:7496,	1400:7747,	1500:7999,	1600:8326,	1700:8578,	1800:8955,	1900:9206,	2000:9134,	2100:9385,	2200:9399,	2300:9651,	2400:9905,	2500:10157},
		800 : {500:5410,	600:5644,	700:6088,	800:6390,	900:6657,	1000:6927,	1100:7172,	1200:7440,	1300:7707,	1400:7973,	1500:8239,	1600:8615,	1700:8881,	1800:9153,	1900:9420,	2000:9799,	2100:10065,	2200:10331,	2300:10598,	2400:10866,	2500:11143},
		900 : {500:5704,	600:5987,	700:6445,	800:6762,	900:7043,	1000:7327,	1100:7587,	1200:7870,	1300:8150,	1400:8431,	1500:8712,	1600:9102,	1700:9383,	1800:9670,	1900:9951,	2000:10344,	2100:10625,	2200:10906,	2300:11187,	2400:11470,	2500:11761},
		1000 : {500:5908,	600:6206,	700:6678,	800:7010,	900:7305,	1000:7604,	1100:7878,	1200:8176,	1300:8471,	1400:8766,	1500:9062,	1600:9466,	1700:9762,	1800:10063,	1900:10358,	2000:10766,	2100:11062,	2200:11357,	2300:11652,	2400:11950,	2500:12255},
		1100 : {500:6113,	600:6425,	700:6912,	800:7258,	900:7568,	1000:7881,	1100:8170,	1200:8482,	1300:8792,	1400:9102,	1500:9411,	1600:9831,	1700:10140,	1800:10456,	1900:10766,	2000:11189,	2100:11498,	2200:11808},
		1200 : {500:6354,	600:6680,	700:7182,	800:7542,	900:7867,	1000:8195,	1100:8498,	1200:8824,	1300:9149,	1400:9473,	1500:9797,	1600:10231,	1700:10555,	1800:10886,	1900:11210,	2000:11647},
		1300 : {500:6558,	600:6899,	700:7415,	800:7791,	900:8129,	1000:8472,	1100:8789,	1200:9131,	1300:9469,	1400:9808,	1500:10147,	1600:10595,	1700:10934,	1800:11279,	1900:11618},
		1400 : {500:6763,	600:7119,	700:7649,	800:8039,	900:8392,	1000:8749,	1100:9081,	1200:9437,	1300:9790,	1400:10143,	1500:10497,	1600:10959,	1700:11313},
		1500 : {500:6987,	600:7358,	700:7903,	800:8307,	900:8675,	1000:9046,	1100:9393,	1200:9763,	1300:10131,	1400:10498,	1500:10866,	1600:11343},
		1600 : {500:7192,	600:7577,	700:8136,	800:8555,	900:8937,	1000:9323,	1100:9684,	1200:10069,	1300:10451,	1400:10834,	1500:11216},
		1700 : {500:7472,	600:7871,	700:8445,	800:8878,	900:9275,	1000:9676,	1100:10051,	1200:10450,	1300:10847,	1400:11244},
		1800 : {500:7676,	600:8090,	700:8679,	800:9126,	900:9538,	1000:9953,	1100:10343,	1200:10756,	1300:11168},
		1900 : {500:7881,	600:8309,	700:8912,	800:9374,	900:9800,	1000:10230,	1100:10634,	1200:11063,	1300:11488},
		2000 : {500:8086,	600:8528,	700:9146,	800:9623,	900:10063,	1000:10507,	1100:10926,	1200:11369}
	},
	'18-1' : {
		500 : {500:4559,	600:4736,	700:4919,	800:5094,	900:5289,	1000:5468,	1100:5642,	1200:5880,	1300:6055,	1400:6230,	1500:6404,	1600:6654,	1700:6829,	1800:7128,	1900:7303,	2000:7478,	2100:7652,	2200:7589,	2300:7764,	2400:7940,	2500:8115},
		600 : {500:4729,	600:4918,	700:5115,	800:5303,	900:5511,	1000:5702,	1100:5890,	1200:6141,	1300:6329,	1400:6517,	1500:6704,	1600:6967,	1700:7155,	1800:7467,	1900:7654,	2000:7842,	2100:8029,	2200:7979,	2300:8167,	2400:8357,	2500:8544},
		700 : {500:4900,	600:5102,	700:5311,	800:5512,	900:5733,	1000:5938,	1100:6139,	1200:6403,	1300:6604,	1400:6804,	1500:7004,	1600:7280,	1700:7481,	1800:7806,	1900:8007,	2000:8208,	2100:8408,	2200:8371,	2300:8572,	2400:8774,	2500:8975},
		800 : {500:4967,	600:5182,	700:5685,	800:5927,	900:6187,	1000:6477,	1100:6690,	1200:6906,	1300:7119,	1400:7571,	1500:7783,	1600:7997,	1700:8211,	1800:8350,	1900:8564,	2000:8778,	2100:8991,	2200:9197,	2300:9411,	2400:9626,	2500:9840},
		900 : {500:5384,	600:5612,	700:6127,	800:6382,	900:6655,	1000:6958,	1100:7185,	1200:7413,	1300:7640,	1400:8104,	1500:8330,	1600:8557,	1700:8783,	1800:8936,	1900:9162,	2000:9389,	2100:9615,	2200:9834,	2300:10061,	2400:10289,	2500:10516},
		1000 : {500:5554,	600:5796,	700:6324,	800:6592,	900:6878,	1000:7193,	1100:7433,	1200:7674,	1300:7914,	1400:8391,	1500:8630,	1600:8870,	1700:9110,	1800:9275,	1900:9515,	2000:9755,	2100:9994,	2200:10226,	2300:10466,	2400:10707,	2500:10947},
		1100 : {500:5725,	600:5979,	700:6520,	800:6801,	900:7100,	1000:7429,	1100:7682,	1200:7936,	1300:8189,	1400:8679,	1500:8931,	1600:9184,	1700:9436,	1800:9614,	1900:9867,	2000:10120,	2100:10372,	2200:10617},
		1200 : {500:5958,	600:6225,	700:6779,	800:7073,	900:7385,	1000:7727,	1100:7993,	1200:8260,	1300:8526,	1400:9029,	1500:9294,	1600:9559,	1700:9825,	1800:10016,	1900:10282,	2000:10548},
		1300 : {500:6129,	600:6409,	700:6976,	800:7283,	900:7608,	1000:7962,	1100:8241,	1200:8521,	1300:8800,	1400:9316,	1500:9594,	1600:9873,	1700:10152,	1800:10356,	1900:10634},
		1400 : {500:6299,	600:6593,	700:7173,	800:7492,	900:7830,	1000:8198,	1100:8490,	1200:8783,	1300:9075,	1400:9604,	1500:9895,	1600:10186,	1700:10478},
		1500 : {500:6518,	600:6825,	700:7418,	800:7750,	900:8101,	1000:8482,	1100:8787,	1200:9093,	1300:9398,	1400:9940,	1500:10243,	1600:10548},
		1600 : {500:6689,	600:7008,	700:7614,	800:7960,	900:8324,	1000:8718,	1100:9035,	1200:9354,	1300:9672,	1400:10227,	1500:10544},
		1700 : {500:7010,	600:7343,	700:7962,	800:8320,	900:8697,	1000:9104,	1100:9435,	1200:9767,	1300:10097,	1400:10665},
		1800 : {500:7180,	600:7525,	700:8157,	800:8529,	900:8919,	1000:9339,	1100:9682,	1200:10027,	1300:10371},
		1900 : {500:7351,	600:7709,	700:8354,	800:8739,	900:9142,	1000:9574,	1100:9931,	1200:10289,	1300:10646},
		2000 : {500:7522,	600:7893,	700:8551,	800:8948,	900:9364,	1000:9810,	1100:10179,	1200:10551}
	},
	'18-2' : {
		500 : {500:4729,	600:4870,	700:5018,	800:5157,	900:5338,	1000:5521,	1100:5700,	1200:5943,	1300:6122,	1400:6302,	1500:6480,	1600:6735,	1700:6914,	1800:7439,	1900:7618,	2000:7473,	2100:7651,	2200:7593,	2300:7772,	2400:7953,	2500:8133},
		600 : {500:4861,	600:5002,	700:5157,	800:5349,	900:5562,	1000:5758,	1100:5950,	1200:6206,	1300:6398,	1400:6591,	1500:6782,	1600:7050,	1700:7242,	1800:7780,	1900:7972,	2000:7840,	2100:8031,	2200:7986,	2300:8178,	2400:8372,	2500:8564},
		700 : {500:4994,	600:5142,	700:5356,	800:5561,	900:5787,	1000:5996,	1100:6201,	1200:6470,	1300:6675,	1400:6881,	1500:7085,	1600:7365,	1700:7571,	1800:8122,	1900:8327,	2000:8207,	2100:8412,	2200:8380,	2300:8585,	2400:8792,	2500:8997},
		800 : {500:5391,	600:5592,	700:5810,	800:6029,	900:6246,	1000:6540,	1100:6759,	1200:6978,	1300:7197,	1400:7662,	1500:7880,	1600:8098,	1700:8316,	1800:8460,	1900:8678,	2000:8897,	2100:9114,	2200:9314,	2300:9533,	2400:9752,	2500:9971},
		900 : {500:5791,	600:6024,	700:6255,	800:6486,	900:6717,	1000:7024,	1100:7255,	1200:7488,	1300:7719,	1400:8198,	1500:8428,	1600:8660,	1700:8891,	1800:9048,	1900:9279,	2000:9510,	2100:9741,	2200:9954,	2300:10185,	2400:10418,	2500:10649},
		1000 : {500:5964,	600:6210,	700:6454,	800:6698,	900:6942,	1000:7262,	1100:7506,	1200:7752,	1300:7996,	1400:8488,	1500:8731,	1600:8976,	1700:9220,	1800:9389,	1900:9634,	2000:9878,	2100:10121,	2200:10347,	2300:10592,	2400:10837,	2500:11082},
		1100 : {500:6137,	600:6396,	700:6653,	800:6910,	900:7167,	1000:7500,	1100:7757,	1200:8016,	1300:8273,	1400:8778,	1500:9034,	1600:9291,	1700:9549,	1800:9731,	1900:9989,	2000:10246,	2100:10502,	2200:10741},
		1200 : {500:6382,	600:6653,	700:6924,	800:7194,	900:7463,	1000:7810,	1100:8080,	1200:8351,	1300:8622,	1400:9139,	1500:9409,	1600:9679,	1700:9949,	1800:10145,	1900:10415,	2000:10685},
		1300 : {500:6555,	600:6839,	700:7123,	800:7406,	900:7688,	1000:8047,	1100:8331,	1200:8615,	1300:8899,	1400:9429,	1500:9711,	1600:9995,	1700:10278,	1800:10486,	1900:10770},
		1400 : {500:6728,	600:7025,	700:7322,	800:7618,	900:7913,	1000:8285,	1100:8582,	1200:8879,	1300:9175,	1400:9719,	1500:10014,	1600:10310,	1700:10607},
		1500 : {500:6940,	600:7250,	700:7559,	800:7869,	900:8177,	1000:8562,	1100:8871,	1200:9182,	1300:9491,	1400:10048,	1500:10356,	1600:10665},
		1600 : {500:7113,	600:7436,	700:7758,	800:8081,	900:8402,	1000:8800,	1100:9122,	1200:9446,	1300:9768,	1400:10338,	1500:10659},
		1700 : {500:7436,	600:7773,	700:8108,	800:8443,	900:8778,	1000:9189,	1100:9524,	1200:9860,	1300:10196,	1400:10778},
		1800 : {500:7609,	600:7958,	700:8306,	800:8654,	900:9002,	1000:9426,	1100:9774,	1200:10123,	1300:10472},
		1900 : {500:7782,	600:8144,	700:8505,	800:8866,	900:9227,	1000:9664,	1100:10025,	1200:10387,	1300:10748},
		2000 : {500:7955,	600:8330,	700:8704,	800:9078,	900:9451,	1000:9902,	1100:10276,	1200:10651}
	},
	'18-3' : {
		500 : {500:5135,	600:5318,	700:5506,	800:5686,	900:5895,	1000:6122,	1100:6345,	1200:6631,	1300:6854,	1400:7077,	1500:7300,	1600:7598,	1700:7821,	1800:8168,	1900:8391,	2000:8289,	2100:8512,	2200:8497,	2300:8720,	2400:8945,	2500:9168},
		600 : {500:5297,	600:5479,	700:5667,	800:5900,	900:6158,	1000:6399,	1100:6636,	1200:6938,	1300:7175,	1400:7412,	1500:7650,	1600:7962,	1700:8199,	1800:8561,	1900:8799,	2000:8711,	2100:8949,	2200:8948,	2300:9186,	2400:9425,	2500:9662},
		700 : {500:5459,	600:5641,	700:5896,	800:6148,	900:6421,	1000:6676,	1100:6928,	1200:7244,	1300:7496,	1400:7747,	1500:7999,	1600:8326,	1700:8578,	1800:8955,	1900:9206,	2000:9134,	2100:9385,	2200:9399,	2300:9651,	2400:9905,	2500:10157},
		800 : {500:5410,	600:5644,	700:6088,	800:6390,	900:6657,	1000:6927,	1100:7172,	1200:7440,	1300:7707,	1400:7973,	1500:8239,	1600:8615,	1700:8881,	1800:9153,	1900:9420,	2000:9799,	2100:10065,	2200:10331,	2300:10598,	2400:10866,	2500:11143},
		900 : {500:5704,	600:5987,	700:6445,	800:6762,	900:7043,	1000:7327,	1100:7587,	1200:7870,	1300:8150,	1400:8431,	1500:8712,	1600:9102,	1700:9383,	1800:9670,	1900:9951,	2000:10344,	2100:10625,	2200:10906,	2300:11187,	2400:11470,	2500:11761},
		1000 : {500:5908,	600:6206,	700:6678,	800:7010,	900:7305,	1000:7604,	1100:7878,	1200:8176,	1300:8471,	1400:8766,	1500:9062,	1600:9466,	1700:9762,	1800:10063,	1900:10358,	2000:10766,	2100:11062,	2200:11357,	2300:11652,	2400:11950,	2500:12255},
		1100 : {500:6113,	600:6425,	700:6912,	800:7258,	900:7568,	1000:7881,	1100:8170,	1200:8482,	1300:8792,	1400:9102,	1500:9411,	1600:9831,	1700:10140,	1800:10456,	1900:10766,	2000:11189,	2100:11498,	2200:11808},
		1200 : {500:6354,	600:6680,	700:7182,	800:7542,	900:7867,	1000:8195,	1100:8498,	1200:8824,	1300:9149,	1400:9473,	1500:9797,	1600:10231,	1700:10555,	1800:10886,	1900:11210,	2000:11647},
		1300 : {500:6558,	600:6899,	700:7415,	800:7791,	900:8129,	1000:8472,	1100:8789,	1200:9131,	1300:9469,	1400:9808,	1500:10147,	1600:10595,	1700:10934,	1800:11279,	1900:11618},
		1400 : {500:6763,	600:7119,	700:7649,	800:8039,	900:8392,	1000:8749,	1100:9081,	1200:9437,	1300:9790,	1400:10143,	1500:10497,	1600:10959,	1700:11313},
		1500 : {500:6987,	600:7358,	700:7903,	800:8307,	900:8675,	1000:9046,	1100:9393,	1200:9763,	1300:10131,	1400:10498,	1500:10866,	1600:11343},
		1600 : {500:7192,	600:7577,	700:8136,	800:8555,	900:8937,	1000:9323,	1100:9684,	1200:10069,	1300:10451,	1400:10834,	1500:11216},
		1700 : {500:7472,	600:7871,	700:8445,	800:8878,	900:9275,	1000:9676,	1100:10051,	1200:10450,	1300:10847,	1400:11244},
		1800 : {500:7676,	600:8090,	700:8679,	800:9126,	900:9538,	1000:9953,	1100:10343,	1200:10756,	1300:11168},
		1900 : {500:7881,	600:8309,	700:8912,	800:9374,	900:9800,	1000:10230,	1100:10634,	1200:11063,	1300:11488},
		2000 : {500:8086,	600:8528,	700:9146,	800:9623,	900:10063,	1000:10507,	1100:10926,	1200:11369}
	},
	'19-1' : {
		500 : {500:4559,	600:4736,	700:4919,	800:5094,	900:5289,	1000:5468,	1100:5642,	1200:5880,	1300:6055,	1400:6230,	1500:6404,	1600:6654,	1700:6829,	1800:7128,	1900:7303,	2000:7478,	2100:7652,	2200:7589,	2300:7764,	2400:7940,	2500:8115},
		600 : {500:4729,	600:4918,	700:5115,	800:5303,	900:5511,	1000:5702,	1100:5890,	1200:6141,	1300:6329,	1400:6517,	1500:6704,	1600:6967,	1700:7155,	1800:7467,	1900:7654,	2000:7842,	2100:8029,	2200:7979,	2300:8167,	2400:8357,	2500:8544},
		700 : {500:4900,	600:5102,	700:5311,	800:5512,	900:5733,	1000:5938,	1100:6139,	1200:6403,	1300:6604,	1400:6804,	1500:7004,	1600:7280,	1700:7481,	1800:7806,	1900:8007,	2000:8208,	2100:8408,	2200:8371,	2300:8572,	2400:8774,	2500:8975},
		800 : {500:4967,	600:5182,	700:5685,	800:5927,	900:6187,	1000:6477,	1100:6690,	1200:6906,	1300:7119,	1400:7571,	1500:7783,	1600:7997,	1700:8211,	1800:8350,	1900:8564,	2000:8778,	2100:8991,	2200:9197,	2300:9411,	2400:9626,	2500:9840},
		900 : {500:5384,	600:5612,	700:6127,	800:6382,	900:6655,	1000:6958,	1100:7185,	1200:7413,	1300:7640,	1400:8104,	1500:8330,	1600:8557,	1700:8783,	1800:8936,	1900:9162,	2000:9389,	2100:9615,	2200:9834,	2300:10061,	2400:10289,	2500:10516},
		1000 : {500:5554,	600:5796,	700:6324,	800:6592,	900:6878,	1000:7193,	1100:7433,	1200:7674,	1300:7914,	1400:8391,	1500:8630,	1600:8870,	1700:9110,	1800:9275,	1900:9515,	2000:9755,	2100:9994,	2200:10226,	2300:10466,	2400:10707,	2500:10947},
		1100 : {500:5725,	600:5979,	700:6520,	800:6801,	900:7100,	1000:7429,	1100:7682,	1200:7936,	1300:8189,	1400:8679,	1500:8931,	1600:9184,	1700:9436,	1800:9614,	1900:9867,	2000:10120,	2100:10372,	2200:10617},
		1200 : {500:5958,	600:6225,	700:6779,	800:7073,	900:7385,	1000:7727,	1100:7993,	1200:8260,	1300:8526,	1400:9029,	1500:9294,	1600:9559,	1700:9825,	1800:10016,	1900:10282,	2000:10548},
		1300 : {500:6129,	600:6409,	700:6976,	800:7283,	900:7608,	1000:7962,	1100:8241,	1200:8521,	1300:8800,	1400:9316,	1500:9594,	1600:9873,	1700:10152,	1800:10356,	1900:10634},
		1400 : {500:6299,	600:6593,	700:7173,	800:7492,	900:7830,	1000:8198,	1100:8490,	1200:8783,	1300:9075,	1400:9604,	1500:9895,	1600:10186,	1700:10478},
		1500 : {500:6518,	600:6825,	700:7418,	800:7750,	900:8101,	1000:8482,	1100:8787,	1200:9093,	1300:9398,	1400:9940,	1500:10243,	1600:10548},
		1600 : {500:6689,	600:7008,	700:7614,	800:7960,	900:8324,	1000:8718,	1100:9035,	1200:9354,	1300:9672,	1400:10227,	1500:10544},
		1700 : {500:7010,	600:7343,	700:7962,	800:8320,	900:8697,	1000:9104,	1100:9435,	1200:9767,	1300:10097,	1400:10665},
		1800 : {500:7180,	600:7525,	700:8157,	800:8529,	900:8919,	1000:9339,	1100:9682,	1200:10027,	1300:10371},
		1900 : {500:7351,	600:7709,	700:8354,	800:8739,	900:9142,	1000:9574,	1100:9931,	1200:10289,	1300:10646},
		2000 : {500:7522,	600:7893,	700:8551,	800:8948,	900:9364,	1000:9810,	1100:10179,	1200:10551}
	},
	'19-2' : {
		500 : {500:4729,	600:4870,	700:5018,	800:5157,	900:5338,	1000:5521,	1100:5700,	1200:5943,	1300:6122,	1400:6302,	1500:6480,	1600:6735,	1700:6914,	1800:7439,	1900:7618,	2000:7473,	2100:7651,	2200:7593,	2300:7772,	2400:7953,	2500:8133},
		600 : {500:4861,	600:5002,	700:5157,	800:5349,	900:5562,	1000:5758,	1100:5950,	1200:6206,	1300:6398,	1400:6591,	1500:6782,	1600:7050,	1700:7242,	1800:7780,	1900:7972,	2000:7840,	2100:8031,	2200:7986,	2300:8178,	2400:8372,	2500:8564},
		700 : {500:4994,	600:5142,	700:5356,	800:5561,	900:5787,	1000:5996,	1100:6201,	1200:6470,	1300:6675,	1400:6881,	1500:7085,	1600:7365,	1700:7571,	1800:8122,	1900:8327,	2000:8207,	2100:8412,	2200:8380,	2300:8585,	2400:8792,	2500:8997},
		800 : {500:5391,	600:5592,	700:5810,	800:6029,	900:6246,	1000:6540,	1100:6759,	1200:6978,	1300:7197,	1400:7662,	1500:7880,	1600:8098,	1700:8316,	1800:8460,	1900:8678,	2000:8897,	2100:9114,	2200:9314,	2300:9533,	2400:9752,	2500:9971},
		900 : {500:5791,	600:6024,	700:6255,	800:6486,	900:6717,	1000:7024,	1100:7255,	1200:7488,	1300:7719,	1400:8198,	1500:8428,	1600:8660,	1700:8891,	1800:9048,	1900:9279,	2000:9510,	2100:9741,	2200:9954,	2300:10185,	2400:10418,	2500:10649},
		1000 : {500:5964,	600:6210,	700:6454,	800:6698,	900:6942,	1000:7262,	1100:7506,	1200:7752,	1300:7996,	1400:8488,	1500:8731,	1600:8976,	1700:9220,	1800:9389,	1900:9634,	2000:9878,	2100:10121,	2200:10347,	2300:10592,	2400:10837,	2500:11082},
		1100 : {500:6137,	600:6396,	700:6653,	800:6910,	900:7167,	1000:7500,	1100:7757,	1200:8016,	1300:8273,	1400:8778,	1500:9034,	1600:9291,	1700:9549,	1800:9731,	1900:9989,	2000:10246,	2100:10502,	2200:10741},
		1200 : {500:6382,	600:6653,	700:6924,	800:7194,	900:7463,	1000:7810,	1100:8080,	1200:8351,	1300:8622,	1400:9139,	1500:9409,	1600:9679,	1700:9949,	1800:10145,	1900:10415,	2000:10685},
		1300 : {500:6555,	600:6839,	700:7123,	800:7406,	900:7688,	1000:8047,	1100:8331,	1200:8615,	1300:8899,	1400:9429,	1500:9711,	1600:9995,	1700:10278,	1800:10486,	1900:10770},
		1400 : {500:6728,	600:7025,	700:7322,	800:7618,	900:7913,	1000:8285,	1100:8582,	1200:8879,	1300:9175,	1400:9719,	1500:10014,	1600:10310,	1700:10607},
		1500 : {500:6940,	600:7250,	700:7559,	800:7869,	900:8177,	1000:8562,	1100:8871,	1200:9182,	1300:9491,	1400:10048,	1500:10356,	1600:10665},
		1600 : {500:7113,	600:7436,	700:7758,	800:8081,	900:8402,	1000:8800,	1100:9122,	1200:9446,	1300:9768,	1400:10338,	1500:10659},
		1700 : {500:7436,	600:7773,	700:8108,	800:8443,	900:8778,	1000:9189,	1100:9524,	1200:9860,	1300:10196,	1400:10778},
		1800 : {500:7609,	600:7958,	700:8306,	800:8654,	900:9002,	1000:9426,	1100:9774,	1200:10123,	1300:10472},
		1900 : {500:7782,	600:8144,	700:8505,	800:8866,	900:9227,	1000:9664,	1100:10025,	1200:10387,	1300:10748},
		2000 : {500:7955,	600:8330,	700:8704,	800:9078,	900:9451,	1000:9902,	1100:10276,	1200:10651}
	},
	'19-3' : {
		500 : {500:5135,	600:5318,	700:5506,	800:5686,	900:5895,	1000:6122,	1100:6345,	1200:6631,	1300:6854,	1400:7077,	1500:7300,	1600:7598,	1700:7821,	1800:8168,	1900:8391,	2000:8289,	2100:8512,	2200:8497,	2300:8720,	2400:8945,	2500:9168},
		600 : {500:5297,	600:5479,	700:5667,	800:5900,	900:6158,	1000:6399,	1100:6636,	1200:6938,	1300:7175,	1400:7412,	1500:7650,	1600:7962,	1700:8199,	1800:8561,	1900:8799,	2000:8711,	2100:8949,	2200:8948,	2300:9186,	2400:9425,	2500:9662},
		700 : {500:5459,	600:5641,	700:5896,	800:6148,	900:6421,	1000:6676,	1100:6928,	1200:7244,	1300:7496,	1400:7747,	1500:7999,	1600:8326,	1700:8578,	1800:8955,	1900:9206,	2000:9134,	2100:9385,	2200:9399,	2300:9651,	2400:9905,	2500:10157},
		800 : {500:5410,	600:5644,	700:6088,	800:6390,	900:6657,	1000:6927,	1100:7172,	1200:7440,	1300:7707,	1400:7973,	1500:8239,	1600:8615,	1700:8881,	1800:9153,	1900:9420,	2000:9799,	2100:10065,	2200:10331,	2300:10598,	2400:10866,	2500:11143},
		900 : {500:5704,	600:5987,	700:6445,	800:6762,	900:7043,	1000:7327,	1100:7587,	1200:7870,	1300:8150,	1400:8431,	1500:8712,	1600:9102,	1700:9383,	1800:9670,	1900:9951,	2000:10344,	2100:10625,	2200:10906,	2300:11187,	2400:11470,	2500:11761},
		1000 : {500:5908,	600:6206,	700:6678,	800:7010,	900:7305,	1000:7604,	1100:7878,	1200:8176,	1300:8471,	1400:8766,	1500:9062,	1600:9466,	1700:9762,	1800:10063,	1900:10358,	2000:10766,	2100:11062,	2200:11357,	2300:11652,	2400:11950,	2500:12255},
		1100 : {500:6113,	600:6425,	700:6912,	800:7258,	900:7568,	1000:7881,	1100:8170,	1200:8482,	1300:8792,	1400:9102,	1500:9411,	1600:9831,	1700:10140,	1800:10456,	1900:10766,	2000:11189,	2100:11498,	2200:11808},
		1200 : {500:6354,	600:6680,	700:7182,	800:7542,	900:7867,	1000:8195,	1100:8498,	1200:8824,	1300:9149,	1400:9473,	1500:9797,	1600:10231,	1700:10555,	1800:10886,	1900:11210,	2000:11647},
		1300 : {500:6558,	600:6899,	700:7415,	800:7791,	900:8129,	1000:8472,	1100:8789,	1200:9131,	1300:9469,	1400:9808,	1500:10147,	1600:10595,	1700:10934,	1800:11279,	1900:11618},
		1400 : {500:6763,	600:7119,	700:7649,	800:8039,	900:8392,	1000:8749,	1100:9081,	1200:9437,	1300:9790,	1400:10143,	1500:10497,	1600:10959,	1700:11313},
		1500 : {500:6987,	600:7358,	700:7903,	800:8307,	900:8675,	1000:9046,	1100:9393,	1200:9763,	1300:10131,	1400:10498,	1500:10866,	1600:11343},
		1600 : {500:7192,	600:7577,	700:8136,	800:8555,	900:8937,	1000:9323,	1100:9684,	1200:10069,	1300:10451,	1400:10834,	1500:11216},
		1700 : {500:7472,	600:7871,	700:8445,	800:8878,	900:9275,	1000:9676,	1100:10051,	1200:10450,	1300:10847,	1400:11244},
		1800 : {500:7676,	600:8090,	700:8679,	800:9126,	900:9538,	1000:9953,	1100:10343,	1200:10756,	1300:11168},
		1900 : {500:7881,	600:8309,	700:8912,	800:9374,	900:9800,	1000:10230,	1100:10634,	1200:11063,	1300:11488},
		2000 : {500:8086,	600:8528,	700:9146,	800:9623,	900:10063,	1000:10507,	1100:10926,	1200:11369}
	},
	'110-1' : {
		500 : {500:4559,	600:4736,	700:4919,	800:5094,	900:5289,	1000:5468,	1100:5642,	1200:5880,	1300:6055,	1400:6230,	1500:6404,	1600:6654,	1700:6829,	1800:7128,	1900:7303,	2000:7478,	2100:7652,	2200:7589,	2300:7764,	2400:7940,	2500:8115},
		600 : {500:4729,	600:4918,	700:5115,	800:5303,	900:5511,	1000:5702,	1100:5890,	1200:6141,	1300:6329,	1400:6517,	1500:6704,	1600:6967,	1700:7155,	1800:7467,	1900:7654,	2000:7842,	2100:8029,	2200:7979,	2300:8167,	2400:8357,	2500:8544},
		700 : {500:4900,	600:5102,	700:5311,	800:5512,	900:5733,	1000:5938,	1100:6139,	1200:6403,	1300:6604,	1400:6804,	1500:7004,	1600:7280,	1700:7481,	1800:7806,	1900:8007,	2000:8208,	2100:8408,	2200:8371,	2300:8572,	2400:8774,	2500:8975},
		800 : {500:4967,	600:5182,	700:5685,	800:5927,	900:6187,	1000:6477,	1100:6690,	1200:6906,	1300:7119,	1400:7571,	1500:7783,	1600:7997,	1700:8211,	1800:8350,	1900:8564,	2000:8778,	2100:8991,	2200:9197,	2300:9411,	2400:9626,	2500:9840},
		900 : {500:5384,	600:5612,	700:6127,	800:6382,	900:6655,	1000:6958,	1100:7185,	1200:7413,	1300:7640,	1400:8104,	1500:8330,	1600:8557,	1700:8783,	1800:8936,	1900:9162,	2000:9389,	2100:9615,	2200:9834,	2300:10061,	2400:10289,	2500:10516},
		1000 : {500:5554,	600:5796,	700:6324,	800:6592,	900:6878,	1000:7193,	1100:7433,	1200:7674,	1300:7914,	1400:8391,	1500:8630,	1600:8870,	1700:9110,	1800:9275,	1900:9515,	2000:9755,	2100:9994,	2200:10226,	2300:10466,	2400:10707,	2500:10947},
		1100 : {500:5725,	600:5979,	700:6520,	800:6801,	900:7100,	1000:7429,	1100:7682,	1200:7936,	1300:8189,	1400:8679,	1500:8931,	1600:9184,	1700:9436,	1800:9614,	1900:9867,	2000:10120,	2100:10372,	2200:10617},
		1200 : {500:5958,	600:6225,	700:6779,	800:7073,	900:7385,	1000:7727,	1100:7993,	1200:8260,	1300:8526,	1400:9029,	1500:9294,	1600:9559,	1700:9825,	1800:10016,	1900:10282,	2000:10548},
		1300 : {500:6129,	600:6409,	700:6976,	800:7283,	900:7608,	1000:7962,	1100:8241,	1200:8521,	1300:8800,	1400:9316,	1500:9594,	1600:9873,	1700:10152,	1800:10356,	1900:10634},
		1400 : {500:6299,	600:6593,	700:7173,	800:7492,	900:7830,	1000:8198,	1100:8490,	1200:8783,	1300:9075,	1400:9604,	1500:9895,	1600:10186,	1700:10478},
		1500 : {500:6518,	600:6825,	700:7418,	800:7750,	900:8101,	1000:8482,	1100:8787,	1200:9093,	1300:9398,	1400:9940,	1500:10243,	1600:10548},
		1600 : {500:6689,	600:7008,	700:7614,	800:7960,	900:8324,	1000:8718,	1100:9035,	1200:9354,	1300:9672,	1400:10227,	1500:10544},
		1700 : {500:7010,	600:7343,	700:7962,	800:8320,	900:8697,	1000:9104,	1100:9435,	1200:9767,	1300:10097,	1400:10665},
		1800 : {500:7180,	600:7525,	700:8157,	800:8529,	900:8919,	1000:9339,	1100:9682,	1200:10027,	1300:10371},
		1900 : {500:7351,	600:7709,	700:8354,	800:8739,	900:9142,	1000:9574,	1100:9931,	1200:10289,	1300:10646},
		2000 : {500:7522,	600:7893,	700:8551,	800:8948,	900:9364,	1000:9810,	1100:10179,	1200:10551}
	},
	'110-2' : {
		500 : {500:4729,	600:4870,	700:5018,	800:5157,	900:5338,	1000:5521,	1100:5700,	1200:5943,	1300:6122,	1400:6302,	1500:6480,	1600:6735,	1700:6914,	1800:7439,	1900:7618,	2000:7473,	2100:7651,	2200:7593,	2300:7772,	2400:7953,	2500:8133},
		600 : {500:4861,	600:5002,	700:5157,	800:5349,	900:5562,	1000:5758,	1100:5950,	1200:6206,	1300:6398,	1400:6591,	1500:6782,	1600:7050,	1700:7242,	1800:7780,	1900:7972,	2000:7840,	2100:8031,	2200:7986,	2300:8178,	2400:8372,	2500:8564},
		700 : {500:4994,	600:5142,	700:5356,	800:5561,	900:5787,	1000:5996,	1100:6201,	1200:6470,	1300:6675,	1400:6881,	1500:7085,	1600:7365,	1700:7571,	1800:8122,	1900:8327,	2000:8207,	2100:8412,	2200:8380,	2300:8585,	2400:8792,	2500:8997},
		800 : {500:5391,	600:5592,	700:5810,	800:6029,	900:6246,	1000:6540,	1100:6759,	1200:6978,	1300:7197,	1400:7662,	1500:7880,	1600:8098,	1700:8316,	1800:8460,	1900:8678,	2000:8897,	2100:9114,	2200:9314,	2300:9533,	2400:9752,	2500:9971},
		900 : {500:5791,	600:6024,	700:6255,	800:6486,	900:6717,	1000:7024,	1100:7255,	1200:7488,	1300:7719,	1400:8198,	1500:8428,	1600:8660,	1700:8891,	1800:9048,	1900:9279,	2000:9510,	2100:9741,	2200:9954,	2300:10185,	2400:10418,	2500:10649},
		1000 : {500:5964,	600:6210,	700:6454,	800:6698,	900:6942,	1000:7262,	1100:7506,	1200:7752,	1300:7996,	1400:8488,	1500:8731,	1600:8976,	1700:9220,	1800:9389,	1900:9634,	2000:9878,	2100:10121,	2200:10347,	2300:10592,	2400:10837,	2500:11082},
		1100 : {500:6137,	600:6396,	700:6653,	800:6910,	900:7167,	1000:7500,	1100:7757,	1200:8016,	1300:8273,	1400:8778,	1500:9034,	1600:9291,	1700:9549,	1800:9731,	1900:9989,	2000:10246,	2100:10502,	2200:10741},
		1200 : {500:6382,	600:6653,	700:6924,	800:7194,	900:7463,	1000:7810,	1100:8080,	1200:8351,	1300:8622,	1400:9139,	1500:9409,	1600:9679,	1700:9949,	1800:10145,	1900:10415,	2000:10685},
		1300 : {500:6555,	600:6839,	700:7123,	800:7406,	900:7688,	1000:8047,	1100:8331,	1200:8615,	1300:8899,	1400:9429,	1500:9711,	1600:9995,	1700:10278,	1800:10486,	1900:10770},
		1400 : {500:6728,	600:7025,	700:7322,	800:7618,	900:7913,	1000:8285,	1100:8582,	1200:8879,	1300:9175,	1400:9719,	1500:10014,	1600:10310,	1700:10607},
		1500 : {500:6940,	600:7250,	700:7559,	800:7869,	900:8177,	1000:8562,	1100:8871,	1200:9182,	1300:9491,	1400:10048,	1500:10356,	1600:10665},
		1600 : {500:7113,	600:7436,	700:7758,	800:8081,	900:8402,	1000:8800,	1100:9122,	1200:9446,	1300:9768,	1400:10338,	1500:10659},
		1700 : {500:7436,	600:7773,	700:8108,	800:8443,	900:8778,	1000:9189,	1100:9524,	1200:9860,	1300:10196,	1400:10778},
		1800 : {500:7609,	600:7958,	700:8306,	800:8654,	900:9002,	1000:9426,	1100:9774,	1200:10123,	1300:10472},
		1900 : {500:7782,	600:8144,	700:8505,	800:8866,	900:9227,	1000:9664,	1100:10025,	1200:10387,	1300:10748},
		2000 : {500:7955,	600:8330,	700:8704,	800:9078,	900:9451,	1000:9902,	1100:10276,	1200:10651}
	},
	'110-3' : {
		500 : {500:5135,	600:5318,	700:5506,	800:5686,	900:5895,	1000:6122,	1100:6345,	1200:6631,	1300:6854,	1400:7077,	1500:7300,	1600:7598,	1700:7821,	1800:8168,	1900:8391,	2000:8289,	2100:8512,	2200:8497,	2300:8720,	2400:8945,	2500:9168},
		600 : {500:5297,	600:5479,	700:5667,	800:5900,	900:6158,	1000:6399,	1100:6636,	1200:6938,	1300:7175,	1400:7412,	1500:7650,	1600:7962,	1700:8199,	1800:8561,	1900:8799,	2000:8711,	2100:8949,	2200:8948,	2300:9186,	2400:9425,	2500:9662},
		700 : {500:5459,	600:5641,	700:5896,	800:6148,	900:6421,	1000:6676,	1100:6928,	1200:7244,	1300:7496,	1400:7747,	1500:7999,	1600:8326,	1700:8578,	1800:8955,	1900:9206,	2000:9134,	2100:9385,	2200:9399,	2300:9651,	2400:9905,	2500:10157},
		800 : {500:5410,	600:5644,	700:6088,	800:6390,	900:6657,	1000:6927,	1100:7172,	1200:7440,	1300:7707,	1400:7973,	1500:8239,	1600:8615,	1700:8881,	1800:9153,	1900:9420,	2000:9799,	2100:10065,	2200:10331,	2300:10598,	2400:10866,	2500:11143},
		900 : {500:5704,	600:5987,	700:6445,	800:6762,	900:7043,	1000:7327,	1100:7587,	1200:7870,	1300:8150,	1400:8431,	1500:8712,	1600:9102,	1700:9383,	1800:9670,	1900:9951,	2000:10344,	2100:10625,	2200:10906,	2300:11187,	2400:11470,	2500:11761},
		1000 : {500:5908,	600:6206,	700:6678,	800:7010,	900:7305,	1000:7604,	1100:7878,	1200:8176,	1300:8471,	1400:8766,	1500:9062,	1600:9466,	1700:9762,	1800:10063,	1900:10358,	2000:10766,	2100:11062,	2200:11357,	2300:11652,	2400:11950,	2500:12255},
		1100 : {500:6113,	600:6425,	700:6912,	800:7258,	900:7568,	1000:7881,	1100:8170,	1200:8482,	1300:8792,	1400:9102,	1500:9411,	1600:9831,	1700:10140,	1800:10456,	1900:10766,	2000:11189,	2100:11498,	2200:11808},
		1200 : {500:6354,	600:6680,	700:7182,	800:7542,	900:7867,	1000:8195,	1100:8498,	1200:8824,	1300:9149,	1400:9473,	1500:9797,	1600:10231,	1700:10555,	1800:10886,	1900:11210,	2000:11647},
		1300 : {500:6558,	600:6899,	700:7415,	800:7791,	900:8129,	1000:8472,	1100:8789,	1200:9131,	1300:9469,	1400:9808,	1500:10147,	1600:10595,	1700:10934,	1800:11279,	1900:11618},
		1400 : {500:6763,	600:7119,	700:7649,	800:8039,	900:8392,	1000:8749,	1100:9081,	1200:9437,	1300:9790,	1400:10143,	1500:10497,	1600:10959,	1700:11313},
		1500 : {500:6987,	600:7358,	700:7903,	800:8307,	900:8675,	1000:9046,	1100:9393,	1200:9763,	1300:10131,	1400:10498,	1500:10866,	1600:11343},
		1600 : {500:7192,	600:7577,	700:8136,	800:8555,	900:8937,	1000:9323,	1100:9684,	1200:10069,	1300:10451,	1400:10834,	1500:11216},
		1700 : {500:7472,	600:7871,	700:8445,	800:8878,	900:9275,	1000:9676,	1100:10051,	1200:10450,	1300:10847,	1400:11244},
		1800 : {500:7676,	600:8090,	700:8679,	800:9126,	900:9538,	1000:9953,	1100:10343,	1200:10756,	1300:11168},
		1900 : {500:7881,	600:8309,	700:8912,	800:9374,	900:9800,	1000:10230,	1100:10634,	1200:11063,	1300:11488},
		2000 : {500:8086,	600:8528,	700:9146,	800:9623,	900:10063,	1000:10507,	1100:10926,	1200:11369}
	},
	'111-1' : {
		500 : {500:4559,	600:4736,	700:4919,	800:5094,	900:5289,	1000:5468,	1100:5642,	1200:5880,	1300:6055,	1400:6230,	1500:6404,	1600:6654,	1700:6829,	1800:7128,	1900:7303,	2000:7478,	2100:7652,	2200:7589,	2300:7764,	2400:7940,	2500:8115},
		600 : {500:4729,	600:4918,	700:5115,	800:5303,	900:5511,	1000:5702,	1100:5890,	1200:6141,	1300:6329,	1400:6517,	1500:6704,	1600:6967,	1700:7155,	1800:7467,	1900:7654,	2000:7842,	2100:8029,	2200:7979,	2300:8167,	2400:8357,	2500:8544},
		700 : {500:4900,	600:5102,	700:5311,	800:5512,	900:5733,	1000:5938,	1100:6139,	1200:6403,	1300:6604,	1400:6804,	1500:7004,	1600:7280,	1700:7481,	1800:7806,	1900:8007,	2000:8208,	2100:8408,	2200:8371,	2300:8572,	2400:8774,	2500:8975},
		800 : {500:4967,	600:5182,	700:5685,	800:5927,	900:6187,	1000:6477,	1100:6690,	1200:6906,	1300:7119,	1400:7571,	1500:7783,	1600:7997,	1700:8211,	1800:8350,	1900:8564,	2000:8778,	2100:8991,	2200:9197,	2300:9411,	2400:9626,	2500:9840},
		900 : {500:5384,	600:5612,	700:6127,	800:6382,	900:6655,	1000:6958,	1100:7185,	1200:7413,	1300:7640,	1400:8104,	1500:8330,	1600:8557,	1700:8783,	1800:8936,	1900:9162,	2000:9389,	2100:9615,	2200:9834,	2300:10061,	2400:10289,	2500:10516},
		1000 : {500:5554,	600:5796,	700:6324,	800:6592,	900:6878,	1000:7193,	1100:7433,	1200:7674,	1300:7914,	1400:8391,	1500:8630,	1600:8870,	1700:9110,	1800:9275,	1900:9515,	2000:9755,	2100:9994,	2200:10226,	2300:10466,	2400:10707,	2500:10947},
		1100 : {500:5725,	600:5979,	700:6520,	800:6801,	900:7100,	1000:7429,	1100:7682,	1200:7936,	1300:8189,	1400:8679,	1500:8931,	1600:9184,	1700:9436,	1800:9614,	1900:9867,	2000:10120,	2100:10372,	2200:10617},
		1200 : {500:5958,	600:6225,	700:6779,	800:7073,	900:7385,	1000:7727,	1100:7993,	1200:8260,	1300:8526,	1400:9029,	1500:9294,	1600:9559,	1700:9825,	1800:10016,	1900:10282,	2000:10548},
		1300 : {500:6129,	600:6409,	700:6976,	800:7283,	900:7608,	1000:7962,	1100:8241,	1200:8521,	1300:8800,	1400:9316,	1500:9594,	1600:9873,	1700:10152,	1800:10356,	1900:10634},
		1400 : {500:6299,	600:6593,	700:7173,	800:7492,	900:7830,	1000:8198,	1100:8490,	1200:8783,	1300:9075,	1400:9604,	1500:9895,	1600:10186,	1700:10478},
		1500 : {500:6518,	600:6825,	700:7418,	800:7750,	900:8101,	1000:8482,	1100:8787,	1200:9093,	1300:9398,	1400:9940,	1500:10243,	1600:10548},
		1600 : {500:6689,	600:7008,	700:7614,	800:7960,	900:8324,	1000:8718,	1100:9035,	1200:9354,	1300:9672,	1400:10227,	1500:10544},
		1700 : {500:7010,	600:7343,	700:7962,	800:8320,	900:8697,	1000:9104,	1100:9435,	1200:9767,	1300:10097,	1400:10665},
		1800 : {500:7180,	600:7525,	700:8157,	800:8529,	900:8919,	1000:9339,	1100:9682,	1200:10027,	1300:10371},
		1900 : {500:7351,	600:7709,	700:8354,	800:8739,	900:9142,	1000:9574,	1100:9931,	1200:10289,	1300:10646},
		2000 : {500:7522,	600:7893,	700:8551,	800:8948,	900:9364,	1000:9810,	1100:10179,	1200:10551}
	},
	'111-2' : {
		500 : {500:4729,	600:4870,	700:5018,	800:5157,	900:5338,	1000:5521,	1100:5700,	1200:5943,	1300:6122,	1400:6302,	1500:6480,	1600:6735,	1700:6914,	1800:7439,	1900:7618,	2000:7473,	2100:7651,	2200:7593,	2300:7772,	2400:7953,	2500:8133},
		600 : {500:4861,	600:5002,	700:5157,	800:5349,	900:5562,	1000:5758,	1100:5950,	1200:6206,	1300:6398,	1400:6591,	1500:6782,	1600:7050,	1700:7242,	1800:7780,	1900:7972,	2000:7840,	2100:8031,	2200:7986,	2300:8178,	2400:8372,	2500:8564},
		700 : {500:4994,	600:5142,	700:5356,	800:5561,	900:5787,	1000:5996,	1100:6201,	1200:6470,	1300:6675,	1400:6881,	1500:7085,	1600:7365,	1700:7571,	1800:8122,	1900:8327,	2000:8207,	2100:8412,	2200:8380,	2300:8585,	2400:8792,	2500:8997},
		800 : {500:5391,	600:5592,	700:5810,	800:6029,	900:6246,	1000:6540,	1100:6759,	1200:6978,	1300:7197,	1400:7662,	1500:7880,	1600:8098,	1700:8316,	1800:8460,	1900:8678,	2000:8897,	2100:9114,	2200:9314,	2300:9533,	2400:9752,	2500:9971},
		900 : {500:5791,	600:6024,	700:6255,	800:6486,	900:6717,	1000:7024,	1100:7255,	1200:7488,	1300:7719,	1400:8198,	1500:8428,	1600:8660,	1700:8891,	1800:9048,	1900:9279,	2000:9510,	2100:9741,	2200:9954,	2300:10185,	2400:10418,	2500:10649},
		1000 : {500:5964,	600:6210,	700:6454,	800:6698,	900:6942,	1000:7262,	1100:7506,	1200:7752,	1300:7996,	1400:8488,	1500:8731,	1600:8976,	1700:9220,	1800:9389,	1900:9634,	2000:9878,	2100:10121,	2200:10347,	2300:10592,	2400:10837,	2500:11082},
		1100 : {500:6137,	600:6396,	700:6653,	800:6910,	900:7167,	1000:7500,	1100:7757,	1200:8016,	1300:8273,	1400:8778,	1500:9034,	1600:9291,	1700:9549,	1800:9731,	1900:9989,	2000:10246,	2100:10502,	2200:10741},
		1200 : {500:6382,	600:6653,	700:6924,	800:7194,	900:7463,	1000:7810,	1100:8080,	1200:8351,	1300:8622,	1400:9139,	1500:9409,	1600:9679,	1700:9949,	1800:10145,	1900:10415,	2000:10685},
		1300 : {500:6555,	600:6839,	700:7123,	800:7406,	900:7688,	1000:8047,	1100:8331,	1200:8615,	1300:8899,	1400:9429,	1500:9711,	1600:9995,	1700:10278,	1800:10486,	1900:10770},
		1400 : {500:6728,	600:7025,	700:7322,	800:7618,	900:7913,	1000:8285,	1100:8582,	1200:8879,	1300:9175,	1400:9719,	1500:10014,	1600:10310,	1700:10607},
		1500 : {500:6940,	600:7250,	700:7559,	800:7869,	900:8177,	1000:8562,	1100:8871,	1200:9182,	1300:9491,	1400:10048,	1500:10356,	1600:10665},
		1600 : {500:7113,	600:7436,	700:7758,	800:8081,	900:8402,	1000:8800,	1100:9122,	1200:9446,	1300:9768,	1400:10338,	1500:10659},
		1700 : {500:7436,	600:7773,	700:8108,	800:8443,	900:8778,	1000:9189,	1100:9524,	1200:9860,	1300:10196,	1400:10778},
		1800 : {500:7609,	600:7958,	700:8306,	800:8654,	900:9002,	1000:9426,	1100:9774,	1200:10123,	1300:10472},
		1900 : {500:7782,	600:8144,	700:8505,	800:8866,	900:9227,	1000:9664,	1100:10025,	1200:10387,	1300:10748},
		2000 : {500:7955,	600:8330,	700:8704,	800:9078,	900:9451,	1000:9902,	1100:10276,	1200:10651}
	},
	'111-3' : {
		500 : {500:5135,	600:5318,	700:5506,	800:5686,	900:5895,	1000:6122,	1100:6345,	1200:6631,	1300:6854,	1400:7077,	1500:7300,	1600:7598,	1700:7821,	1800:8168,	1900:8391,	2000:8289,	2100:8512,	2200:8497,	2300:8720,	2400:8945,	2500:9168},
		600 : {500:5297,	600:5479,	700:5667,	800:5900,	900:6158,	1000:6399,	1100:6636,	1200:6938,	1300:7175,	1400:7412,	1500:7650,	1600:7962,	1700:8199,	1800:8561,	1900:8799,	2000:8711,	2100:8949,	2200:8948,	2300:9186,	2400:9425,	2500:9662},
		700 : {500:5459,	600:5641,	700:5896,	800:6148,	900:6421,	1000:6676,	1100:6928,	1200:7244,	1300:7496,	1400:7747,	1500:7999,	1600:8326,	1700:8578,	1800:8955,	1900:9206,	2000:9134,	2100:9385,	2200:9399,	2300:9651,	2400:9905,	2500:10157},
		800 : {500:5410,	600:5644,	700:6088,	800:6390,	900:6657,	1000:6927,	1100:7172,	1200:7440,	1300:7707,	1400:7973,	1500:8239,	1600:8615,	1700:8881,	1800:9153,	1900:9420,	2000:9799,	2100:10065,	2200:10331,	2300:10598,	2400:10866,	2500:11143},
		900 : {500:5704,	600:5987,	700:6445,	800:6762,	900:7043,	1000:7327,	1100:7587,	1200:7870,	1300:8150,	1400:8431,	1500:8712,	1600:9102,	1700:9383,	1800:9670,	1900:9951,	2000:10344,	2100:10625,	2200:10906,	2300:11187,	2400:11470,	2500:11761},
		1000 : {500:5908,	600:6206,	700:6678,	800:7010,	900:7305,	1000:7604,	1100:7878,	1200:8176,	1300:8471,	1400:8766,	1500:9062,	1600:9466,	1700:9762,	1800:10063,	1900:10358,	2000:10766,	2100:11062,	2200:11357,	2300:11652,	2400:11950,	2500:12255},
		1100 : {500:6113,	600:6425,	700:6912,	800:7258,	900:7568,	1000:7881,	1100:8170,	1200:8482,	1300:8792,	1400:9102,	1500:9411,	1600:9831,	1700:10140,	1800:10456,	1900:10766,	2000:11189,	2100:11498,	2200:11808},
		1200 : {500:6354,	600:6680,	700:7182,	800:7542,	900:7867,	1000:8195,	1100:8498,	1200:8824,	1300:9149,	1400:9473,	1500:9797,	1600:10231,	1700:10555,	1800:10886,	1900:11210,	2000:11647},
		1300 : {500:6558,	600:6899,	700:7415,	800:7791,	900:8129,	1000:8472,	1100:8789,	1200:9131,	1300:9469,	1400:9808,	1500:10147,	1600:10595,	1700:10934,	1800:11279,	1900:11618},
		1400 : {500:6763,	600:7119,	700:7649,	800:8039,	900:8392,	1000:8749,	1100:9081,	1200:9437,	1300:9790,	1400:10143,	1500:10497,	1600:10959,	1700:11313},
		1500 : {500:6987,	600:7358,	700:7903,	800:8307,	900:8675,	1000:9046,	1100:9393,	1200:9763,	1300:10131,	1400:10498,	1500:10866,	1600:11343},
		1600 : {500:7192,	600:7577,	700:8136,	800:8555,	900:8937,	1000:9323,	1100:9684,	1200:10069,	1300:10451,	1400:10834,	1500:11216},
		1700 : {500:7472,	600:7871,	700:8445,	800:8878,	900:9275,	1000:9676,	1100:10051,	1200:10450,	1300:10847,	1400:11244},
		1800 : {500:7676,	600:8090,	700:8679,	800:9126,	900:9538,	1000:9953,	1100:10343,	1200:10756,	1300:11168},
		1900 : {500:7881,	600:8309,	700:8912,	800:9374,	900:9800,	1000:10230,	1100:10634,	1200:11063,	1300:11488},
		2000 : {500:8086,	600:8528,	700:9146,	800:9623,	900:10063,	1000:10507,	1100:10926,	1200:11369}
	},
	'112-1' : {
		500 : {500:4559,	600:4736,	700:4919,	800:5094,	900:5289,	1000:5468,	1100:5642,	1200:5880,	1300:6055,	1400:6230,	1500:6404,	1600:6654,	1700:6829,	1800:7128,	1900:7303,	2000:7478,	2100:7652,	2200:7589,	2300:7764,	2400:7940,	2500:8115},
		600 : {500:4729,	600:4918,	700:5115,	800:5303,	900:5511,	1000:5702,	1100:5890,	1200:6141,	1300:6329,	1400:6517,	1500:6704,	1600:6967,	1700:7155,	1800:7467,	1900:7654,	2000:7842,	2100:8029,	2200:7979,	2300:8167,	2400:8357,	2500:8544},
		700 : {500:4900,	600:5102,	700:5311,	800:5512,	900:5733,	1000:5938,	1100:6139,	1200:6403,	1300:6604,	1400:6804,	1500:7004,	1600:7280,	1700:7481,	1800:7806,	1900:8007,	2000:8208,	2100:8408,	2200:8371,	2300:8572,	2400:8774,	2500:8975},
		800 : {500:4967,	600:5182,	700:5685,	800:5927,	900:6187,	1000:6477,	1100:6690,	1200:6906,	1300:7119,	1400:7571,	1500:7783,	1600:7997,	1700:8211,	1800:8350,	1900:8564,	2000:8778,	2100:8991,	2200:9197,	2300:9411,	2400:9626,	2500:9840},
		900 : {500:5384,	600:5612,	700:6127,	800:6382,	900:6655,	1000:6958,	1100:7185,	1200:7413,	1300:7640,	1400:8104,	1500:8330,	1600:8557,	1700:8783,	1800:8936,	1900:9162,	2000:9389,	2100:9615,	2200:9834,	2300:10061,	2400:10289,	2500:10516},
		1000 : {500:5554,	600:5796,	700:6324,	800:6592,	900:6878,	1000:7193,	1100:7433,	1200:7674,	1300:7914,	1400:8391,	1500:8630,	1600:8870,	1700:9110,	1800:9275,	1900:9515,	2000:9755,	2100:9994,	2200:10226,	2300:10466,	2400:10707,	2500:10947},
		1100 : {500:5725,	600:5979,	700:6520,	800:6801,	900:7100,	1000:7429,	1100:7682,	1200:7936,	1300:8189,	1400:8679,	1500:8931,	1600:9184,	1700:9436,	1800:9614,	1900:9867,	2000:10120,	2100:10372,	2200:10617},
		1200 : {500:5958,	600:6225,	700:6779,	800:7073,	900:7385,	1000:7727,	1100:7993,	1200:8260,	1300:8526,	1400:9029,	1500:9294,	1600:9559,	1700:9825,	1800:10016,	1900:10282,	2000:10548},
		1300 : {500:6129,	600:6409,	700:6976,	800:7283,	900:7608,	1000:7962,	1100:8241,	1200:8521,	1300:8800,	1400:9316,	1500:9594,	1600:9873,	1700:10152,	1800:10356,	1900:10634},
		1400 : {500:6299,	600:6593,	700:7173,	800:7492,	900:7830,	1000:8198,	1100:8490,	1200:8783,	1300:9075,	1400:9604,	1500:9895,	1600:10186,	1700:10478},
		1500 : {500:6518,	600:6825,	700:7418,	800:7750,	900:8101,	1000:8482,	1100:8787,	1200:9093,	1300:9398,	1400:9940,	1500:10243,	1600:10548},
		1600 : {500:6689,	600:7008,	700:7614,	800:7960,	900:8324,	1000:8718,	1100:9035,	1200:9354,	1300:9672,	1400:10227,	1500:10544},
		1700 : {500:7010,	600:7343,	700:7962,	800:8320,	900:8697,	1000:9104,	1100:9435,	1200:9767,	1300:10097,	1400:10665},
		1800 : {500:7180,	600:7525,	700:8157,	800:8529,	900:8919,	1000:9339,	1100:9682,	1200:10027,	1300:10371},
		1900 : {500:7351,	600:7709,	700:8354,	800:8739,	900:9142,	1000:9574,	1100:9931,	1200:10289,	1300:10646},
		2000 : {500:7522,	600:7893,	700:8551,	800:8948,	900:9364,	1000:9810,	1100:10179,	1200:10551}
	},
	'112-2' : {
		500 : {500:4729,	600:4870,	700:5018,	800:5157,	900:5338,	1000:5521,	1100:5700,	1200:5943,	1300:6122,	1400:6302,	1500:6480,	1600:6735,	1700:6914,	1800:7439,	1900:7618,	2000:7473,	2100:7651,	2200:7593,	2300:7772,	2400:7953,	2500:8133},
		600 : {500:4861,	600:5002,	700:5157,	800:5349,	900:5562,	1000:5758,	1100:5950,	1200:6206,	1300:6398,	1400:6591,	1500:6782,	1600:7050,	1700:7242,	1800:7780,	1900:7972,	2000:7840,	2100:8031,	2200:7986,	2300:8178,	2400:8372,	2500:8564},
		700 : {500:4994,	600:5142,	700:5356,	800:5561,	900:5787,	1000:5996,	1100:6201,	1200:6470,	1300:6675,	1400:6881,	1500:7085,	1600:7365,	1700:7571,	1800:8122,	1900:8327,	2000:8207,	2100:8412,	2200:8380,	2300:8585,	2400:8792,	2500:8997},
		800 : {500:5391,	600:5592,	700:5810,	800:6029,	900:6246,	1000:6540,	1100:6759,	1200:6978,	1300:7197,	1400:7662,	1500:7880,	1600:8098,	1700:8316,	1800:8460,	1900:8678,	2000:8897,	2100:9114,	2200:9314,	2300:9533,	2400:9752,	2500:9971},
		900 : {500:5791,	600:6024,	700:6255,	800:6486,	900:6717,	1000:7024,	1100:7255,	1200:7488,	1300:7719,	1400:8198,	1500:8428,	1600:8660,	1700:8891,	1800:9048,	1900:9279,	2000:9510,	2100:9741,	2200:9954,	2300:10185,	2400:10418,	2500:10649},
		1000 : {500:5964,	600:6210,	700:6454,	800:6698,	900:6942,	1000:7262,	1100:7506,	1200:7752,	1300:7996,	1400:8488,	1500:8731,	1600:8976,	1700:9220,	1800:9389,	1900:9634,	2000:9878,	2100:10121,	2200:10347,	2300:10592,	2400:10837,	2500:11082},
		1100 : {500:6137,	600:6396,	700:6653,	800:6910,	900:7167,	1000:7500,	1100:7757,	1200:8016,	1300:8273,	1400:8778,	1500:9034,	1600:9291,	1700:9549,	1800:9731,	1900:9989,	2000:10246,	2100:10502,	2200:10741},
		1200 : {500:6382,	600:6653,	700:6924,	800:7194,	900:7463,	1000:7810,	1100:8080,	1200:8351,	1300:8622,	1400:9139,	1500:9409,	1600:9679,	1700:9949,	1800:10145,	1900:10415,	2000:10685},
		1300 : {500:6555,	600:6839,	700:7123,	800:7406,	900:7688,	1000:8047,	1100:8331,	1200:8615,	1300:8899,	1400:9429,	1500:9711,	1600:9995,	1700:10278,	1800:10486,	1900:10770},
		1400 : {500:6728,	600:7025,	700:7322,	800:7618,	900:7913,	1000:8285,	1100:8582,	1200:8879,	1300:9175,	1400:9719,	1500:10014,	1600:10310,	1700:10607},
		1500 : {500:6940,	600:7250,	700:7559,	800:7869,	900:8177,	1000:8562,	1100:8871,	1200:9182,	1300:9491,	1400:10048,	1500:10356,	1600:10665},
		1600 : {500:7113,	600:7436,	700:7758,	800:8081,	900:8402,	1000:8800,	1100:9122,	1200:9446,	1300:9768,	1400:10338,	1500:10659},
		1700 : {500:7436,	600:7773,	700:8108,	800:8443,	900:8778,	1000:9189,	1100:9524,	1200:9860,	1300:10196,	1400:10778},
		1800 : {500:7609,	600:7958,	700:8306,	800:8654,	900:9002,	1000:9426,	1100:9774,	1200:10123,	1300:10472},
		1900 : {500:7782,	600:8144,	700:8505,	800:8866,	900:9227,	1000:9664,	1100:10025,	1200:10387,	1300:10748},
		2000 : {500:7955,	600:8330,	700:8704,	800:9078,	900:9451,	1000:9902,	1100:10276,	1200:10651}
	},
	'112-3' : {
		500 : {500:5135,	600:5318,	700:5506,	800:5686,	900:5895,	1000:6122,	1100:6345,	1200:6631,	1300:6854,	1400:7077,	1500:7300,	1600:7598,	1700:7821,	1800:8168,	1900:8391,	2000:8289,	2100:8512,	2200:8497,	2300:8720,	2400:8945,	2500:9168},
		600 : {500:5297,	600:5479,	700:5667,	800:5900,	900:6158,	1000:6399,	1100:6636,	1200:6938,	1300:7175,	1400:7412,	1500:7650,	1600:7962,	1700:8199,	1800:8561,	1900:8799,	2000:8711,	2100:8949,	2200:8948,	2300:9186,	2400:9425,	2500:9662},
		700 : {500:5459,	600:5641,	700:5896,	800:6148,	900:6421,	1000:6676,	1100:6928,	1200:7244,	1300:7496,	1400:7747,	1500:7999,	1600:8326,	1700:8578,	1800:8955,	1900:9206,	2000:9134,	2100:9385,	2200:9399,	2300:9651,	2400:9905,	2500:10157},
		800 : {500:5410,	600:5644,	700:6088,	800:6390,	900:6657,	1000:6927,	1100:7172,	1200:7440,	1300:7707,	1400:7973,	1500:8239,	1600:8615,	1700:8881,	1800:9153,	1900:9420,	2000:9799,	2100:10065,	2200:10331,	2300:10598,	2400:10866,	2500:11143},
		900 : {500:5704,	600:5987,	700:6445,	800:6762,	900:7043,	1000:7327,	1100:7587,	1200:7870,	1300:8150,	1400:8431,	1500:8712,	1600:9102,	1700:9383,	1800:9670,	1900:9951,	2000:10344,	2100:10625,	2200:10906,	2300:11187,	2400:11470,	2500:11761},
		1000 : {500:5908,	600:6206,	700:6678,	800:7010,	900:7305,	1000:7604,	1100:7878,	1200:8176,	1300:8471,	1400:8766,	1500:9062,	1600:9466,	1700:9762,	1800:10063,	1900:10358,	2000:10766,	2100:11062,	2200:11357,	2300:11652,	2400:11950,	2500:12255},
		1100 : {500:6113,	600:6425,	700:6912,	800:7258,	900:7568,	1000:7881,	1100:8170,	1200:8482,	1300:8792,	1400:9102,	1500:9411,	1600:9831,	1700:10140,	1800:10456,	1900:10766,	2000:11189,	2100:11498,	2200:11808},
		1200 : {500:6354,	600:6680,	700:7182,	800:7542,	900:7867,	1000:8195,	1100:8498,	1200:8824,	1300:9149,	1400:9473,	1500:9797,	1600:10231,	1700:10555,	1800:10886,	1900:11210,	2000:11647},
		1300 : {500:6558,	600:6899,	700:7415,	800:7791,	900:8129,	1000:8472,	1100:8789,	1200:9131,	1300:9469,	1400:9808,	1500:10147,	1600:10595,	1700:10934,	1800:11279,	1900:11618},
		1400 : {500:6763,	600:7119,	700:7649,	800:8039,	900:8392,	1000:8749,	1100:9081,	1200:9437,	1300:9790,	1400:10143,	1500:10497,	1600:10959,	1700:11313},
		1500 : {500:6987,	600:7358,	700:7903,	800:8307,	900:8675,	1000:9046,	1100:9393,	1200:9763,	1300:10131,	1400:10498,	1500:10866,	1600:11343},
		1600 : {500:7192,	600:7577,	700:8136,	800:8555,	900:8937,	1000:9323,	1100:9684,	1200:10069,	1300:10451,	1400:10834,	1500:11216},
		1700 : {500:7472,	600:7871,	700:8445,	800:8878,	900:9275,	1000:9676,	1100:10051,	1200:10450,	1300:10847,	1400:11244},
		1800 : {500:7676,	600:8090,	700:8679,	800:9126,	900:9538,	1000:9953,	1100:10343,	1200:10756,	1300:11168},
		1900 : {500:7881,	600:8309,	700:8912,	800:9374,	900:9800,	1000:10230,	1100:10634,	1200:11063,	1300:11488},
		2000 : {500:8086,	600:8528,	700:9146,	800:9623,	900:10063,	1000:10507,	1100:10926,	1200:11369}
	},
	'21-1' : {
		500 : {900:4929,	1000:5100,	1100:5269,	1200:5440,	1300:5611,	1400:5780,	1500:5949,	1600:6119,	1700:6289,	1800:6460,	1900:6630,	2000:6800},
		600 : {900:5214,	1000:5397,	1100:5579,	1200:5764,	1300:5947,	1400:6129,	1500:6312,	1600:6495,	1700:6677,	1800:6862,	1900:7045,	2000:7227},
		700 : {900:5499,	1000:5695,	1100:5891,	1200:6088,	1300:6284,	1400:6479,	1500:6675,	1600:6871,	1700:7066,	1800:7264,	1900:7460,	2000:7655},
		800 : {900:5784,	1000:5993,	1100:6201,	1200:6412,	1300:6621,	1400:6829,	1500:7037,	1600:7247,	1700:7455,	1800:7665,	1900:7874,	2000:8083},
		900 : {900:6068,	1000:6291,	1100:6512,	1200:6735,	1300:6957,	1400:7179,	1500:7400,	1600:7622,	1700:7843,	1800:8067,	1900:8289,	2000:8510},
		1000 : {900:6354,	1000:6589,	1100:6823,	1200:7060,	1300:7295,	1400:7529,	1500:7763,	1600:7998,	1700:8232,	1800:8469,	1900:8704,	2000:8938},
		1100 : {900:6639,	1000:6887,	1100:7134,	1200:7383,	1300:7631,	1400:7879,	1500:8126,	1600:8374,	1700:8621,	1800:8870,	1900:9119,	2000:9366},
		1200 : {900:6923,	1000:7184,	1100:7444,	1200:7707,	1300:7968,	1400:8228,	1500:8488,	1600:8749,	1700:9009,	1800:9272,	1900:9533,	2000:9793},
		1300 : {900:7208,	1000:7482,	1100:7755,	1200:8031,	1300:8305,	1400:8578,	1500:8851,	1600:9125,	1700:9398,	1800:9674,	1900:9948,	2000:10221},
		1400 : {900:7493,	1000:7780,	1100:8066,	1200:8355,	1300:8642,	1400:8928,	1500:9214,	1600:9501,	1700:9787,	1800:10076,	1900:10363,	2000:10649},
		1500 : {900:7778,	1000:8078,	1100:8377,	1200:8678,	1300:8978,	1400:9277,	1500:9576,	1600:9876,	1700:10175,	1800:10477,	1900:10777,	2000:11076},
		1600 : {900:8063,	1000:8376,	1100:8688,	1200:9002,	1300:9315,	1400:9627,	1500:9939,	1600:10252,	1700:10565,	1800:10879,	1900:11192,	2000:11504},
		1700 : {900:8348,	1000:8674,	1100:8999,	1200:9326,	1300:9652,	1400:9977,	1500:10302,	1600:10628,	1700:10953,	1800:11281,	1900:11607,	2000:11932},
		1800 : {900:8632,	1000:8971,	1100:9309,	1200:9650,	1300:9988,	1400:10326,	1500:10665,	1600:11003,	1700:11342,	1800:11682,	1900:12021,	2000:12359},
		1900 : {900:8917,	1000:9269,	1100:9620,	1200:9974,	1300:10326,	1400:10677,	1500:11028,	1600:11380,	1700:11731,	1800:12084,	1900:12436,	2000:12787},
		2000 : {900:9202,	1000:9567,	1100:9931,	1200:10298,	1300:10662,	1400:11026,	1500:11390,	1600:11755,	1700:12119,	1800:12486,	1900:12851,	2000:13215}
	},
	'21-2' : {
		500 : {900:5139,	1000:5261,	1100:5394,	1200:5572,	1300:5749,	1400:5924,	1500:6100,	1600:6276,	1700:6452,	1800:6630,	1900:6807,	2000:6982},
		600 : {900:5334,	1000:5524,	1100:5712,	1200:5903,	1300:6093,	1400:6281,	1500:6470,	1600:6660,	1700:6848,	1800:7039,	1900:7229,	2000:7417},
		700 : {900:5627,	1000:5830,	1100:6031,	1200:6235,	1300:6438,	1400:6639,	1500:6841,	1600:7044,	1700:7245,	1800:7449,	1900:7652,	2000:7853},
		800 : {900:5920,	1000:6135,	1100:6350,	1200:6567,	1300:6782,	1400:6997,	1500:7212,	1600:7427,	1700:7642,	1800:7859,	1900:8074,	2000:8289},
		900 : {900:6212,	1000:6441,	1100:6668,	1200:6898,	1300:7127,	1400:7354,	1500:7582,	1600:7810,	1700:8038,	1800:8268,	1900:8496,	2000:8724},
		1000 : {900:6505,	1000:6747,	1100:6987,	1200:7230,	1300:7472,	1400:7712,	1500:7953,	1600:8194,	1700:8435,	1800:8678,	1900:8919,	2000:9160},
		1100 : {900:6798,	1000:7052,	1100:7306,	1200:7562,	1300:7816,	1400:8070,	1500:8323,	1600:8578,	1700:8831,	1800:9087,	1900:9341,	2000:9595},
		1200 : {900:7090,	1000:7358,	1100:7624,	1200:7893,	1300:8160,	1400:8427,	1500:8693,	1600:8961,	1700:9227,	1800:9496,	1900:9764,	2000:10030},
		1300 : {900:7383,	1000:7664,	1100:7943,	1200:8225,	1300:8505,	1400:8785,	1500:9064,	1600:9345,	1700:9624,	1800:9906,	1900:10186,	2000:10466},
		1400 : {900:7676,	1000:7969,	1100:8262,	1200:8557,	1300:8850,	1400:9142,	1500:9435,	1600:9728,	1700:10021,	1800:10316,	1900:10609,	2000:10901},
		1500 : {900:7968,	1000:8275,	1100:8580,	1200:8888,	1300:9194,	1400:9500,	1500:9805,	1600:10111,	1700:10417,	1800:10725,	1900:11031,	2000:11336},
		1600 : {900:8261,	1000:8581,	1100:8899,	1200:9220,	1300:9539,	1400:9858,	1500:10176,	1600:10495,	1700:10814,	1800:11135,	1900:11454,	2000:11772},
		1700 : {900:8554,	1000:8886,	1100:9218,	1200:9551,	1300:9884,	1400:10215,	1500:10547,	1600:10879,	1700:11210,	1800:11544,	1900:11876,	2000:12208},
		1800 : {900:8846,	1000:9191,	1100:9536,	1200:9883,	1300:10228,	1400:10572,	1500:10917,	1600:11262,	1700:11606,	1800:11953,	1900:12298,	2000:12643},
		1900 : {900:9139,	1000:9498,	1100:9855,	1200:10215,	1300:10573,	1400:10930,	1500:11288,	1600:11646,	1700:12003,	1800:12363,	1900:12721,	2000:13079},
		2000 : {900:9432,	1000:9803,	1100:10174,	1200:10546,	1300:10917,	1400:11288,	1500:11658,	1600:12029,	1700:12400,	1800:12773,	1900:13144,	2000:13514}
	},
	'21-3' : {
		500 : {900:6011,	1000:6186,	1100:6365,	1200:6603,	1300:6838,	1400:7073,	1500:7308,	1600:7543,	1700:7778,	1800:8015,	1900:8250,	2000:8486},
		600 : {900:6282,	1000:6528,	1100:6777,	1200:7029,	1300:7279,	1400:7528,	1500:7778,	1600:8027,	1700:8277,	1800:8529,	1900:8778,	2000:9028},
		700 : {900:6661,	1000:6925,	1100:7189,	1200:7456,	1300:7720,	1400:7984,	1500:8248,	1600:8512,	1700:8776,	1800:9042,	1900:9306,	2000:9570},
		800 : {900:7044,	1000:7322,	1100:7601,	1200:7882,	1300:8160,	1400:8439,	1500:8718,	1600:8996,	1700:9275,	1800:9556,	1900:9834,	2000:10113},
		900 : {900:7427,	1000:7720,	1100:8013,	1200:8308,	1300:8601,	1400:8894,	1500:9188,	1600:9481,	1700:9774,	1800:10069,	1900:10362,	2000:10655},
		1000 : {900:7810,	1000:8117,	1100:8425,	1200:8735,	1300:9042,	1400:9350,	1500:9657,	1600:9965,	1700:10273,	1800:10583,	1900:10890,	2000:11198},
		1100 : {900:8192,	1000:8515,	1100:8837,	1200:9161,	1300:9483,	1400:9805,	1500:10127,	1600:10449,	1700:10772,	1800:11096,	1900:11418,	2000:11740},
		1200 : {900:8575,	1000:8912,	1100:9249,	1200:9587,	1300:9924,	1400:10261,	1500:10597,	1600:10934,	1700:11270,	1800:11609,	1900:11946,	2000:12283},
		1300 : {900:8958,	1000:9309,	1100:9660,	1200:10014,	1300:10365,	1400:10716,	1500:11067,	1600:11418,	1700:11769,	1800:12123,	1900:12474,	2000:12825},
		1400 : {900:9341,	1000:9707,	1100:10072,	1200:10440,	1300:10806,	1400:11171,	1500:11537,	1600:11903,	1700:12268,	1800:12636,	1900:13002,	2000:13367},
		1500 : {900:9724,	1000:10104,	1100:10484,	1200:10867,	1300:11247,	1400:11627,	1500:12007,	1600:12387,	1700:12767,	1800:13150,	1900:13530,	2000:13910},
		1600 : {900:10107,	1000:10501,	1100:10896,	1200:11293,	1300:11688,	1400:12082,	1500:12477,	1600:12872,	1700:13266,	1800:13663,	1900:14058,	2000:14452},
		1700 : {900:10490,	1000:10899,	1100:11308,	1200:11719,	1300:12129,	1400:12538,	1500:12947,	1600:13356,	1700:13765,	1800:14177,	1900:14586,	2000:14995},
		1800 : {900:10873,	1000:11296,	1100:11720,	1200:12146,	1300:12569,	1400:12993,	1500:13417,	1600:13840,	1700:14264,	1800:14690,	1900:15114,	2000:15537},
		1900 : {900:11255,	1000:11694,	1100:12132,	1200:12572,	1300:13010,	1400:13448,	1500:13887,	1600:14325,	1700:14763,	1800:15203,	1900:15642,	2000:16080},
		2000 : {900:11638,	1000:12091,	1100:12544,	1200:12999,	1300:13451,	1400:13904,	1500:14357,	1600:14809,	1700:15262,	1800:15717,	1900:16169,	2000:16622}
	},
	'22-1' : {
		500 : {900:5579,	1000:5756,	1100:5903,	1200:6057,	1300:6206,	1400:6577,	1500:6724,	1600:6874,	1700:6981,	1800:7185,	1900:7334,	2000:7482},
		600 : {900:5839,	1000:6028,	1100:6189,	1200:6356,	1300:6517,	1400:6901,	1500:7062,	1600:7225,	1700:7345,	1800:7562,	1900:7724,	2000:7884},
		700 : {900:6110,	1000:6313,	1100:6487,	1200:6666,	1300:6841,	1400:7238,	1500:7412,	1600:7587,	1700:7720,	1800:7951,	1900:8125,	2000:8299},
		800 : {900:6423,	1000:6638,	1100:6825,	1200:7017,	1300:7205,	1400:7615,	1500:7802,	1600:7990,	1700:8136,	1800:8380,	1900:8567,	2000:8754},
		900 : {900:6806,	1000:7034,	1100:7234,	1200:7440,	1300:7640,	1400:8063,	1500:8263,	1600:8464,	1700:8623,	1800:8879,	1900:9080,	2000:9280},
		1000 : {900:7066,	1000:7308,	1100:7521,	1200:7739,	1300:7953,	1400:8389,	1500:8601,	1600:8816,	1700:8988,	1800:9257,	1900:9471,	2000:9683},
		1100 : {900:7306,	1000:7561,	1100:7786,	1200:8018,	1300:8244,	1400:8693,	1500:8919,	1600:9146,	1700:9331,	1800:9613,	1900:9840,	2000:10066},
		1200 : {900:7597,	1000:7865,	1100:8103,	1200:8348,	1300:8587,	1400:9049,	1500:9288,	1600:9528,	1700:9726,	1800:10022,	1900:10261,	2000:10500},
		1300 : {900:7858,	1000:8138,	1100:8390,	1200:8647,	1300:8900,	1400:9375,	1500:9626,	1600:9880,	1700:10091,	1800:10399,	1900:10652,	2000:10903},
		1400 : {900:8119,	1000:8413,	1100:8677,	1200:8948,	1300:9213,	1400:9701,	1500:9965,	1600:10232,	1700:10456,	1800:10777,	1900:11042,	2000:11307},
		1500 : {900:8403,	1000:8710,	1100:8987,	1200:9271,	1300:9549,	1400:10050,	1500:10328,	1600:10607,	1700:10844,	1800:11178,	1900:11457,	2000:11734},
		1600 : {900:8773,	1000:9093,	1100:9383,	1200:9680,	1300:9971,	1400:10485,	1500:10776,	1600:11068,	1700:11318,	1800:11665,	1900:11956,	2000:12247},
		1700 : {900:9110,	1000:9442,	1100:9746,	1200:10055,	1300:10359,	1400:10886,	1500:11190,	1600:11495,	1700:11758,	1800:12118,	1900:12423,	2000:12726},
		1800 : {900:9369,	1000:9715,	1100:10031,	1200:10354,	1300:10671,	1400:11211,	1500:11527,	1600:11846,	1700:12122,	1800:12495,	1900:12812,	2000:13129},
		1900 : {900:9630,	1000:9989,	1100:10318,	1200:10653,	1300:10984,	1400:11537,	1500:11866,	1600:12197,	1700:12486,	1800:12872,	1900:13203,	2000:13532},
		2000 : {900:9996,	1000:10368,	1100:10710,	1200:11059,	1300:11402,	1400:11968,	1500:12310,	1600:12655,	1700:12956,	1800:13355,	1900:13699,	2000:14041}
	},
	'22-2' : {
		500 : {900:5890,	1000:5997,	1100:6109,	1200:6247,	1300:6381,	1400:6737,	1500:6870,	1600:7004,	1700:7106,	1800:7315,	1900:7469,	2000:7622},
		600 : {900:6071,	1000:6212,	1100:6351,	1200:6496,	1300:6636,	1400:7017,	1500:7183,	1600:7350,	1700:7475,	1800:7697,	1900:7864,	2000:8030},
		700 : {900:6312,	1000:6459,	1100:6605,	1200:6778,	1300:6958,	1400:7359,	1500:7538,	1600:7718,	1700:7856,	1800:8091,	1900:8271,	2000:8450},
		800 : {900:6593,	1000:6747,	1100:6937,	1200:7135,	1300:7327,	1400:7742,	1500:7933,	1600:8127,	1700:8278,	1800:8526,	1900:8718,	2000:8910},
		900 : {900:6946,	1000:7147,	1100:7352,	1200:7562,	1300:7767,	1400:8195,	1500:8400,	1600:8606,	1700:8770,	1800:9031,	1900:9237,	2000:9441},
		1000 : {900:7207,	1000:7426,	1100:7644,	1200:7867,	1300:8085,	1400:8526,	1500:8744,	1600:8963,	1700:9140,	1800:9414,	1900:9632,	2000:9850},
		1100 : {900:7452,	1000:7684,	1100:7915,	1200:8151,	1300:8382,	1400:8836,	1500:9067,	1600:9299,	1700:9489,	1800:9776,	1900:10007,	2000:10238},
		1200 : {900:7753,	1000:7998,	1100:8242,	1200:8491,	1300:8736,	1400:9202,	1500:9446,	1600:9691,	1700:9894,	1800:10194,	1900:10439,	2000:10682},
		1300 : {900:8019,	1000:8278,	1100:8534,	1200:8796,	1300:9054,	1400:9533,	1500:9790,	1600:10048,	1700:10264,	1800:10577,	1900:10834,	2000:11091},
		1400 : {900:8286,	1000:8557,	1100:8826,	1200:9102,	1300:9372,	1400:9865,	1500:10134,	1600:10406,	1700:10634,	1800:10960,	1900:11231,	2000:11500},
		1500 : {900:8571,	1000:8855,	1100:9138,	1200:9426,	1300:9709,	1400:10215,	1500:10497,	1600:10781,	1700:11023,	1800:11362,	1900:11646,	2000:11928},
		1600 : {900:8947,	1000:9244,	1100:9540,	1200:9841,	1300:10137,	1400:10656,	1500:10951,	1600:11249,	1700:11503,	1800:11855,	1900:12152,	2000:12447},
		1700 : {900:9289,	1000:9599,	1100:9907,	1200:10222,	1300:10531,	1400:11063,	1500:11371,	1600:11681,	1700:11949,	1800:12314,	1900:12623,	2000:12932},
		1800 : {900:9554,	1000:9877,	1100:10199,	1200:10526,	1300:10848,	1400:11393,	1500:11714,	1600:12037,	1700:12318,	1800:12696,	1900:13018,	2000:13340},
		1900 : {900:9820,	1000:10156,	1100:10491,	1200:10831,	1300:11166,	1400:11724,	1500:12058,	1600:12394,	1700:12688,	1800:13079,	1900:13414,	2000:13749},
		2000 : {900:10191,	1000:10540,	1100:10887,	1200:11241,	1300:11589,	1400:12159,	1500:12507,	1600:12856,	1700:13163,	1800:13567,	1900:13915,	2000:14262}
	},
	'22-3' : {
		500 : {900:6488,	1000:6629,	1100:6772,	1200:6948,	1300:7119,	1400:7513,	1500:7684,	1600:7855,	1700:7985,	1800:8230,	1900:8422,	2000:8615},
		600 : {900:6713,	1000:6889,	1100:7067,	1200:7251,	1300:7429,	1400:7838,	1500:8044,	1600:8251,	1700:8417,	1800:8680,	1900:8887,	2000:9094},
		700 : {900:7003,	1000:7188,	1100:7373,	1200:7575,	1300:7796,	1400:8241,	1500:8462,	1600:8683,	1700:8864,	1800:9141,	1900:9363,	2000:9584},
		800 : {900:7334,	1000:7527,	1100:7748,	1200:7989,	1300:8225,	1400:8684,	1500:8920,	1600:9155,	1700:9350,	1800:9642,	1900:9878,	2000:10114},
		900 : {900:7738,	1000:7969,	1100:8219,	1200:8475,	1300:8726,	1400:9199,	1500:9449,	1600:9700,	1700:9909,	1800:10216,	1900:10466,	2000:10716},
		1000 : {900:8039,	1000:8303,	1100:8568,	1200:8838,	1300:9103,	1400:9591,	1500:9856,	1600:10121,	1700:10345,	1800:10666,	1900:10931,	2000:11195},
		1100 : {900:8336,	1000:8616,	1100:8895,	1200:9180,	1300:9459,	1400:9962,	1500:10241,	1600:10520,	1700:10759,	1800:11094,	1900:11374,	2000:11653},
		1200 : {900:8692,	1000:8986,	1100:9280,	1200:9579,	1300:9873,	1400:10390,	1500:10684,	1600:10977,	1700:11230,	1800:11581,	1900:11874,	2000:12168},
		1300 : {900:9012,	1000:9320,	1100:9628,	1200:9942,	1300:10250,	1400:10782,	1500:11090,	1600:11398,	1700:11666,	1800:12031,	1900:12339,	2000:12647},
		1400 : {900:9331,	1000:9654,	1100:9977,	1200:10305,	1300:10628,	1400:11174,	1500:11497,	1600:11819,	1700:12101,	1800:12481,	1900:12804,	2000:13126},
		1500 : {900:9671,	1000:10008,	1100:10345,	1200:10688,	1300:11025,	1400:11586,	1500:11923,	1600:12260,	1700:12557,	1800:12951,	1900:13288,	2000:13625},
		1600 : {900:10100,	1000:10452,	1100:10804,	1200:11161,	1300:11513,	1400:12088,	1500:12440,	1600:12792,	1700:13103,	1800:13511,	1900:13863,	2000:14214},
		1700 : {900:10495,	1000:10861,	1100:11228,	1200:11600,	1300:11966,	1400:12555,	1500:12922,	1600:13288,	1700:13613,	1800:14036,	1900:14403,	2000:14769},
		1800 : {900:10814,	1000:11195,	1100:11576,	1200:11963,	1300:12343,	1400:12947,	1500:13328,	1600:13709,	1700:14049,	1800:14486,	1900:14867,	2000:15248},
		1900 : {900:11134,	1000:11529,	1100:11925,	1200:12326,	1300:12721,	1400:13339,	1500:13735,	1600:14130,	1700:14485,	1800:14936,	1900:15332,	2000:15727},
		2000 : {900:11558,	1000:11968,	1100:12377,	1200:12793,	1300:13203,	1400:13836,	1500:14246,	1600:14655,	1700:15024,	1800:15491,	1900:15901,	2000:16310}
	},
	'23-1' : {
		500 : {900:5579,	1000:5756,	1100:5903,	1200:6057,	1300:6206,	1400:6577,	1500:6724,	1600:6874,	1700:6981,	1800:7185,	1900:7334,	2000:7482},
		600 : {900:5839,	1000:6028,	1100:6189,	1200:6356,	1300:6517,	1400:6901,	1500:7062,	1600:7225,	1700:7345,	1800:7562,	1900:7724,	2000:7884},
		700 : {900:6110,	1000:6313,	1100:6487,	1200:6666,	1300:6841,	1400:7238,	1500:7412,	1600:7587,	1700:7720,	1800:7951,	1900:8125,	2000:8299},
		800 : {900:6423,	1000:6638,	1100:6825,	1200:7017,	1300:7205,	1400:7615,	1500:7802,	1600:7990,	1700:8136,	1800:8380,	1900:8567,	2000:8754},
		900 : {900:6806,	1000:7034,	1100:7234,	1200:7440,	1300:7640,	1400:8063,	1500:8263,	1600:8464,	1700:8623,	1800:8879,	1900:9080,	2000:9280},
		1000 : {900:7066,	1000:7308,	1100:7521,	1200:7739,	1300:7953,	1400:8389,	1500:8601,	1600:8816,	1700:8988,	1800:9257,	1900:9471,	2000:9683},
		1100 : {900:7306,	1000:7561,	1100:7786,	1200:8018,	1300:8244,	1400:8693,	1500:8919,	1600:9146,	1700:9331,	1800:9613,	1900:9840,	2000:10066},
		1200 : {900:7597,	1000:7865,	1100:8103,	1200:8348,	1300:8587,	1400:9049,	1500:9288,	1600:9528,	1700:9726,	1800:10022,	1900:10261,	2000:10500},
		1300 : {900:7858,	1000:8138,	1100:8390,	1200:8647,	1300:8900,	1400:9375,	1500:9626,	1600:9880,	1700:10091,	1800:10399,	1900:10652,	2000:10903},
		1400 : {900:8119,	1000:8413,	1100:8677,	1200:8948,	1300:9213,	1400:9701,	1500:9965,	1600:10232,	1700:10456,	1800:10777,	1900:11042,	2000:11307},
		1500 : {900:8403,	1000:8710,	1100:8987,	1200:9271,	1300:9549,	1400:10050,	1500:10328,	1600:10607,	1700:10844,	1800:11178,	1900:11457,	2000:11734},
		1600 : {900:8773,	1000:9093,	1100:9383,	1200:9680,	1300:9971,	1400:10485,	1500:10776,	1600:11068,	1700:11318,	1800:11665,	1900:11956,	2000:12247},
		1700 : {900:9110,	1000:9442,	1100:9746,	1200:10055,	1300:10359,	1400:10886,	1500:11190,	1600:11495,	1700:11758,	1800:12118,	1900:12423,	2000:12726},
		1800 : {900:9369,	1000:9715,	1100:10031,	1200:10354,	1300:10671,	1400:11211,	1500:11527,	1600:11846,	1700:12122,	1800:12495,	1900:12812,	2000:13129},
		1900 : {900:9630,	1000:9989,	1100:10318,	1200:10653,	1300:10984,	1400:11537,	1500:11866,	1600:12197,	1700:12486,	1800:12872,	1900:13203,	2000:13532},
		2000 : {900:9996,	1000:10368,	1100:10710,	1200:11059,	1300:11402,	1400:11968,	1500:12310,	1600:12655,	1700:12956,	1800:13355,	1900:13699,	2000:14041}
	},
	'23-2' : {
		500 : {900:5890,	1000:5997,	1100:6109,	1200:6247,	1300:6381,	1400:6737,	1500:6870,	1600:7004,	1700:7106,	1800:7315,	1900:7469,	2000:7622},
		600 : {900:6071,	1000:6212,	1100:6351,	1200:6496,	1300:6636,	1400:7017,	1500:7183,	1600:7350,	1700:7475,	1800:7697,	1900:7864,	2000:8030},
		700 : {900:6312,	1000:6459,	1100:6605,	1200:6778,	1300:6958,	1400:7359,	1500:7538,	1600:7718,	1700:7856,	1800:8091,	1900:8271,	2000:8450},
		800 : {900:6593,	1000:6747,	1100:6937,	1200:7135,	1300:7327,	1400:7742,	1500:7933,	1600:8127,	1700:8278,	1800:8526,	1900:8718,	2000:8910},
		900 : {900:6946,	1000:7147,	1100:7352,	1200:7562,	1300:7767,	1400:8195,	1500:8400,	1600:8606,	1700:8770,	1800:9031,	1900:9237,	2000:9441},
		1000 : {900:7207,	1000:7426,	1100:7644,	1200:7867,	1300:8085,	1400:8526,	1500:8744,	1600:8963,	1700:9140,	1800:9414,	1900:9632,	2000:9850},
		1100 : {900:7452,	1000:7684,	1100:7915,	1200:8151,	1300:8382,	1400:8836,	1500:9067,	1600:9299,	1700:9489,	1800:9776,	1900:10007,	2000:10238},
		1200 : {900:7753,	1000:7998,	1100:8242,	1200:8491,	1300:8736,	1400:9202,	1500:9446,	1600:9691,	1700:9894,	1800:10194,	1900:10439,	2000:10682},
		1300 : {900:8019,	1000:8278,	1100:8534,	1200:8796,	1300:9054,	1400:9533,	1500:9790,	1600:10048,	1700:10264,	1800:10577,	1900:10834,	2000:11091},
		1400 : {900:8286,	1000:8557,	1100:8826,	1200:9102,	1300:9372,	1400:9865,	1500:10134,	1600:10406,	1700:10634,	1800:10960,	1900:11231,	2000:11500},
		1500 : {900:8571,	1000:8855,	1100:9138,	1200:9426,	1300:9709,	1400:10215,	1500:10497,	1600:10781,	1700:11023,	1800:11362,	1900:11646,	2000:11928},
		1600 : {900:8947,	1000:9244,	1100:9540,	1200:9841,	1300:10137,	1400:10656,	1500:10951,	1600:11249,	1700:11503,	1800:11855,	1900:12152,	2000:12447},
		1700 : {900:9289,	1000:9599,	1100:9907,	1200:10222,	1300:10531,	1400:11063,	1500:11371,	1600:11681,	1700:11949,	1800:12314,	1900:12623,	2000:12932},
		1800 : {900:9554,	1000:9877,	1100:10199,	1200:10526,	1300:10848,	1400:11393,	1500:11714,	1600:12037,	1700:12318,	1800:12696,	1900:13018,	2000:13340},
		1900 : {900:9820,	1000:10156,	1100:10491,	1200:10831,	1300:11166,	1400:11724,	1500:12058,	1600:12394,	1700:12688,	1800:13079,	1900:13414,	2000:13749},
		2000 : {900:10191,	1000:10540,	1100:10887,	1200:11241,	1300:11589,	1400:12159,	1500:12507,	1600:12856,	1700:13163,	1800:13567,	1900:13915,	2000:14262}
	},
	'23-3' : {
		500 : {900:6488,	1000:6629,	1100:6772,	1200:6948,	1300:7119,	1400:7513,	1500:7684,	1600:7855,	1700:7985,	1800:8230,	1900:8422,	2000:8615},
		600 : {900:6713,	1000:6889,	1100:7067,	1200:7251,	1300:7429,	1400:7838,	1500:8044,	1600:8251,	1700:8417,	1800:8680,	1900:8887,	2000:9094},
		700 : {900:7003,	1000:7188,	1100:7373,	1200:7575,	1300:7796,	1400:8241,	1500:8462,	1600:8683,	1700:8864,	1800:9141,	1900:9363,	2000:9584},
		800 : {900:7334,	1000:7527,	1100:7748,	1200:7989,	1300:8225,	1400:8684,	1500:8920,	1600:9155,	1700:9350,	1800:9642,	1900:9878,	2000:10114},
		900 : {900:7738,	1000:7969,	1100:8219,	1200:8475,	1300:8726,	1400:9199,	1500:9449,	1600:9700,	1700:9909,	1800:10216,	1900:10466,	2000:10716},
		1000 : {900:8039,	1000:8303,	1100:8568,	1200:8838,	1300:9103,	1400:9591,	1500:9856,	1600:10121,	1700:10345,	1800:10666,	1900:10931,	2000:11195},
		1100 : {900:8336,	1000:8616,	1100:8895,	1200:9180,	1300:9459,	1400:9962,	1500:10241,	1600:10520,	1700:10759,	1800:11094,	1900:11374,	2000:11653},
		1200 : {900:8692,	1000:8986,	1100:9280,	1200:9579,	1300:9873,	1400:10390,	1500:10684,	1600:10977,	1700:11230,	1800:11581,	1900:11874,	2000:12168},
		1300 : {900:9012,	1000:9320,	1100:9628,	1200:9942,	1300:10250,	1400:10782,	1500:11090,	1600:11398,	1700:11666,	1800:12031,	1900:12339,	2000:12647},
		1400 : {900:9331,	1000:9654,	1100:9977,	1200:10305,	1300:10628,	1400:11174,	1500:11497,	1600:11819,	1700:12101,	1800:12481,	1900:12804,	2000:13126},
		1500 : {900:9671,	1000:10008,	1100:10345,	1200:10688,	1300:11025,	1400:11586,	1500:11923,	1600:12260,	1700:12557,	1800:12951,	1900:13288,	2000:13625},
		1600 : {900:10100,	1000:10452,	1100:10804,	1200:11161,	1300:11513,	1400:12088,	1500:12440,	1600:12792,	1700:13103,	1800:13511,	1900:13863,	2000:14214},
		1700 : {900:10495,	1000:10861,	1100:11228,	1200:11600,	1300:11966,	1400:12555,	1500:12922,	1600:13288,	1700:13613,	1800:14036,	1900:14403,	2000:14769},
		1800 : {900:10814,	1000:11195,	1100:11576,	1200:11963,	1300:12343,	1400:12947,	1500:13328,	1600:13709,	1700:14049,	1800:14486,	1900:14867,	2000:15248},
		1900 : {900:11134,	1000:11529,	1100:11925,	1200:12326,	1300:12721,	1400:13339,	1500:13735,	1600:14130,	1700:14485,	1800:14936,	1900:15332,	2000:15727},
		2000 : {900:11558,	1000:11968,	1100:12377,	1200:12793,	1300:13203,	1400:13836,	1500:14246,	1600:14655,	1700:15024,	1800:15491,	1900:15901,	2000:16310}
	},
	'24-1' : {
		500 : {900:6594,	1000:6825,	1100:6999,	1200:7179,	1300:7354,	1400:7751,	1500:7925,	1600:8102,	1700:8235,	1800:8466,	1900:8640,	2000:8814},
		600 : {900:6906,	1000:7150,	1100:7337,	1200:7530,	1300:7718,	1400:8128,	1500:8315,	1600:8505,	1700:8651,	1800:8895,	1900:9082,	2000:9269},
		700 : {900:7230,	1000:7487,	1100:7687,	1200:7893,	1300:8093,	1400:8517,	1500:8717,	1600:8919,	1700:9078,	1800:9335,	1900:9536,	2000:9736},
		800 : {900:7817,	1000:8087,	1100:8300,	1200:8519,	1300:8732,	1400:9497,	1500:9710,	1600:9925,	1700:10016,	1800:10285,	1900:10499,	2000:10712},
		900 : {900:8252,	1000:8535,	1100:8761,	1200:8993,	1300:9220,	1400:9997,	1500:10223,	1600:10452,	1700:10555,	1800:10838,	1900:11065,	2000:11291},
		1000 : {900:8642,	1000:8938,	1100:9176,	1200:9421,	1300:9661,	1400:10451,	1500:10690,	1600:10932,	1700:11048,	1800:11344,	1900:11584,	2000:11823},
		1100 : {900:8913,	1000:9222,	1100:9474,	1200:9732,	1300:9984,	1400:10787,	1500:11039,	1600:11294,	1700:11424,	1800:11732,	1900:11985,	2000:12237},
		1200 : {900:9257,	1000:9579,	1100:9844,	1200:10114,	1300:10380,	1400:11196,	1500:11461,	1600:11729,	1700:11871,	1800:12193,	1900:12458,	2000:12723},
		1300 : {900:9570,	1000:9905,	1100:10183,	1200:10466,	1300:10745,	1400:11574,	1500:11852,	1600:12133,	1700:12288,	1800:12623,	1900:12901,	2000:13179},
		1400 : {900:9884,	1000:10232,	1100:10523,	1200:10820,	1300:11111,	1400:11953,	1500:12244,	1600:12538,	1700:12706,	1800:13054,	1900:13346,	2000:13636},
		1500 : {900:10221,	1000:10582,	1100:10886,	1200:11195,	1300:11500,	1400:12355,	1500:12659,	1600:12966,	1700:13147,	1800:13508,	1900:13812,	2000:14116},
		1600 : {900:10465,	1000:10839,	1100:11156,	1200:11479,	1300:11796,	1400:12664,	1500:12981,	1600:13301,	1700:13495,	1800:13869,	1900:14186,	2000:14503},
		1700 : {900:10855,	1000:11242,	1100:11572,	1200:11907,	1300:12238,	1400:13119,	1500:13449,	1600:13781,	1700:13989,	1800:14375,	1900:14706,	2000:15036},
		1800 : {900:11243,	1000:11643,	1100:11986,	1200:12335,	1300:12678,	1400:13572,	1500:13915,	1600:14261,	1700:14481,	1800:14880,	1900:15224,	2000:15567},
		1900 : {900:11557,	1000:11969,	1100:12325,	1200:12687,	1300:13043,	1400:13950,	1500:14306,	1600:14664,	1700:14898,	1800:15310,	1900:15667,	2000:16023},
		2000 : {900:12369,	1000:12795,	1100:13163,	1200:13538,	1300:13907,	1400:14827,	1500:15196,	1600:15568,	1700:15814,	1800:16239,	1900:16609,	2000:16978}
	},
	'24-2' : {
		500 : {900:7118,	1000:7260,	1100:7398,	1200:7543,	1300:7683,	1400:8373,	1500:8511,	1600:8653,	1700:8689,	1800:8924,	1900:9103,	2000:9282},
		600 : {900:7364,	1000:7505,	1100:7644,	1200:7789,	1300:7928,	1400:8656,	1500:8847,	1600:9041,	1700:9111,	1800:9359,	1900:9551,	2000:9743},
		700 : {900:7703,	1000:7844,	1100:7983,	1200:8171,	1300:8376,	1400:9132,	1500:9336,	1600:9543,	1700:9626,	1800:9887,	1900:10092,	2000:10296},
		800 : {900:8053,	1000:8194,	1100:8409,	1200:8632,	1300:8850,	1400:9619,	1500:9836,	1600:10056,	1700:10152,	1800:10426,	1900:10644,	2000:10861},
		900 : {900:8422,	1000:8646,	1100:8876,	1200:9112,	1300:9343,	1400:10125,	1500:10356,	1600:10589,	1700:10697,	1800:10984,	1900:11215,	2000:11446},
		1000 : {900:8807,	1000:9053,	1100:9297,	1200:9546,	1300:9790,	1400:10585,	1500:10828,	1600:11074,	1700:11196,	1800:11496,	1900:11740,	2000:11983},
		1100 : {900:9085,	1000:9344,	1100:9600,	1200:9862,	1300:10119,	1400:10927,	1500:11183,	1600:11443,	1700:11577,	1800:11890,	1900:12147,	2000:12403},
		1200 : {900:9439,	1000:9711,	1100:9980,	1200:10255,	1300:10526,	1400:11346,	1500:11616,	1600:11888,	1700:12035,	1800:12361,	1900:12631,	2000:12900},
		1300 : {900:9758,	1000:10043,	1100:10325,	1200:10613,	1300:10897,	1400:11730,	1500:12012,	1600:12297,	1700:12458,	1800:12797,	1900:13080,	2000:13362},
		1400 : {900:10078,	1000:10376,	1100:10671,	1200:10972,	1300:11269,	1400:12115,	1500:12411,	1600:12709,	1700:12882,	1800:13234,	1900:13530,	2000:13825},
		1500 : {900:10416,	1000:10727,	1100:11035,	1200:11349,	1300:11659,	1400:12518,	1500:12826,	1600:13137,	1700:13324,	1800:13688,	1900:13998,	2000:14306},
		1600 : {900:10955,	1000:11279,	1100:11600,	1200:11928,	1300:12250,	1400:13122,	1500:13444,	1600:13768,	1700:13967,	1800:14345,	1900:14667,	2000:14988},
		1700 : {900:11351,	1000:11688,	1100:12022,	1200:12362,	1300:12697,	1400:13583,	1500:13917,	1600:14254,	1700:14466,	1800:14857,	1900:15192,	2000:15526},
		1800 : {900:11745,	1000:12095,	1100:12442,	1200:12795,	1300:13143,	1400:14042,	1500:14389,	1600:14739,	1700:14964,	1800:15368,	1900:15716,	2000:16063},
		1900 : {900:12064,	1000:12427,	1100:12787,	1200:13153,	1300:13514,	1400:14426,	1500:14786,	1600:15149,	1700:15387,	1800:15804,	1900:16165,	2000:16525},
		2000 : {900:12593,	1000:12968,	1100:13342,	1200:13721,	1300:14095,	1400:15019,	1500:15393,	1600:15768,	1700:16019,	1800:16449,	1900:16823,	2000:17197}
	},
	'24-3' : {
		500 : {900:7874,	1000:8054,	1100:8234,	1200:8420,	1300:8599,	1400:9331,	1500:9510,	1600:9690,	1700:9748,	1800:10021,	1900:10244,	2000:10467},
		600 : {900:8177,	1000:8357,	1100:8537,	1200:8722,	1300:8902,	1400:9649,	1500:9886,	1600:10123,	1700:10239,	1800:10532,	1900:10770,	2000:11007},
		700 : {900:8572,	1000:8752,	1100:8932,	1200:9139,	1300:9391,	1400:10194,	1500:10446,	1600:10698,	1700:10827,	1800:11136,	1900:11388,	2000:11639},
		800 : {900:8977,	1000:9157,	1100:9393,	1200:9666,	1300:9932,	1400:10749,	1500:11016,	1600:11282,	1700:11426,	1800:11749,	1900:12015,	2000:12282},
		900 : {900:9403,	1000:9646,	1100:9926,	1200:10213,	1300:10494,	1400:11326,	1500:11607,	1600:11888,	1700:12046,	1800:12384,	1900:12665,	2000:12945},
		1000 : {900:9822,	1000:10117,	1100:10412,	1200:10713,	1300:11009,	1400:11855,	1500:12151,	1600:12446,	1700:12619,	1800:12971,	1900:13266,	2000:13562},
		1100 : {900:10159,	1000:10469,	1100:10779,	1200:11095,	1300:11404,	1400:12266,	1500:12575,	1600:12885,	1700:13073,	1800:13439,	1900:13749,	2000:14059},
		1200 : {900:10576,	1000:10901,	1100:11225,	1200:11555,	1300:11879,	1400:12755,	1500:13079,	1600:13404,	1700:13606,	1800:13987,	1900:14311,	2000:14635},
		1300 : {900:10957,	1000:11296,	1100:11635,	1200:11979,	1300:12318,	1400:13208,	1500:13547,	1600:13886,	1700:14103,	1800:14498,	1900:14837,	2000:15176},
		1400 : {900:11338,	1000:11691,	1100:12044,	1200:12403,	1300:12757,	1400:13661,	1500:14015,	1600:14368,	1700:14599,	1800:15009,	1900:15363,	2000:15716},
		1500 : {900:11738,	1000:12106,	1100:12474,	1200:12848,	1300:13215,	1400:14135,	1500:14502,	1600:14870,	1700:15116,	1800:15540,	1900:15908,	2000:16276},
		1600 : {900:12339,	1000:12722,	1100:13104,	1200:13492,	1300:13875,	1400:14808,	1500:15191,	1600:15573,	1700:15833,	1800:16272,	1900:16654,	2000:17037},
		1700 : {900:12795,	1000:13192,	1100:13589,	1200:13992,	1300:14389,	1400:15337,	1500:15734,	1600:16131,	1700:16405,	1800:16859,	1900:17256,	2000:17652},
		1800 : {900:13252,	1000:13663,	1100:14075,	1200:14492,	1300:14903,	1400:15866,	1500:16277,	1600:16689,	1700:16978,	1800:17446,	1900:17857,	2000:18269},
		1900 : {900:13633,	1000:14059,	1100:14484,	1200:14916,	1300:15342,	1400:16319,	1500:16745,	1600:17171,	1700:17475,	1800:17957,	1900:18383,	2000:18809},
		2000 : {900:14222,	1000:14662,	1100:15103,	1200:15549,	1300:15989,	1400:16981,	1500:17422,	1600:17862,	1700:18180,	1800:18677,	1900:19118,	2000:19558}
	},
	'25-1' : {
		500 : {900:6594,	1000:6825,	1100:6999,	1200:7179,	1300:7354,	1400:7751,	1500:7925,	1600:8102,	1700:8235,	1800:8466,	1900:8640,	2000:8814},
		600 : {900:6906,	1000:7150,	1100:7337,	1200:7530,	1300:7718,	1400:8128,	1500:8315,	1600:8505,	1700:8651,	1800:8895,	1900:9082,	2000:9269},
		700 : {900:7230,	1000:7487,	1100:7687,	1200:7893,	1300:8093,	1400:8517,	1500:8717,	1600:8919,	1700:9078,	1800:9335,	1900:9536,	2000:9736},
		800 : {900:7817,	1000:8087,	1100:8300,	1200:8519,	1300:8732,	1400:9497,	1500:9710,	1600:9925,	1700:10016,	1800:10285,	1900:10499,	2000:10712},
		900 : {900:8252,	1000:8535,	1100:8761,	1200:8993,	1300:9220,	1400:9997,	1500:10223,	1600:10452,	1700:10555,	1800:10838,	1900:11065,	2000:11291},
		1000 : {900:8642,	1000:8938,	1100:9176,	1200:9421,	1300:9661,	1400:10451,	1500:10690,	1600:10932,	1700:11048,	1800:11344,	1900:11584,	2000:11823},
		1100 : {900:8913,	1000:9222,	1100:9474,	1200:9732,	1300:9984,	1400:10787,	1500:11039,	1600:11294,	1700:11424,	1800:11732,	1900:11985,	2000:12237},
		1200 : {900:9257,	1000:9579,	1100:9844,	1200:10114,	1300:10380,	1400:11196,	1500:11461,	1600:11729,	1700:11871,	1800:12193,	1900:12458,	2000:12723},
		1300 : {900:9570,	1000:9905,	1100:10183,	1200:10466,	1300:10745,	1400:11574,	1500:11852,	1600:12133,	1700:12288,	1800:12623,	1900:12901,	2000:13179},
		1400 : {900:9884,	1000:10232,	1100:10523,	1200:10820,	1300:11111,	1400:11953,	1500:12244,	1600:12538,	1700:12706,	1800:13054,	1900:13346,	2000:13636},
		1500 : {900:10221,	1000:10582,	1100:10886,	1200:11195,	1300:11500,	1400:12355,	1500:12659,	1600:12966,	1700:13147,	1800:13508,	1900:13812,	2000:14116},
		1600 : {900:10465,	1000:10839,	1100:11156,	1200:11479,	1300:11796,	1400:12664,	1500:12981,	1600:13301,	1700:13495,	1800:13869,	1900:14186,	2000:14503},
		1700 : {900:10855,	1000:11242,	1100:11572,	1200:11907,	1300:12238,	1400:13119,	1500:13449,	1600:13781,	1700:13989,	1800:14375,	1900:14706,	2000:15036},
		1800 : {900:11243,	1000:11643,	1100:11986,	1200:12335,	1300:12678,	1400:13572,	1500:13915,	1600:14261,	1700:14481,	1800:14880,	1900:15224,	2000:15567},
		1900 : {900:11557,	1000:11969,	1100:12325,	1200:12687,	1300:13043,	1400:13950,	1500:14306,	1600:14664,	1700:14898,	1800:15310,	1900:15667,	2000:16023},
		2000 : {900:12369,	1000:12795,	1100:13163,	1200:13538,	1300:13907,	1400:14827,	1500:15196,	1600:15568,	1700:15814,	1800:16239,	1900:16609,	2000:16978}
	},
	'25-2' : {
		500 : {900:7118,	1000:7260,	1100:7398,	1200:7543,	1300:7683,	1400:8373,	1500:8511,	1600:8653,	1700:8689,	1800:8924,	1900:9103,	2000:9282},
		600 : {900:7364,	1000:7505,	1100:7644,	1200:7789,	1300:7928,	1400:8656,	1500:8847,	1600:9041,	1700:9111,	1800:9359,	1900:9551,	2000:9743},
		700 : {900:7703,	1000:7844,	1100:7983,	1200:8171,	1300:8376,	1400:9132,	1500:9336,	1600:9543,	1700:9626,	1800:9887,	1900:10092,	2000:10296},
		800 : {900:8053,	1000:8194,	1100:8409,	1200:8632,	1300:8850,	1400:9619,	1500:9836,	1600:10056,	1700:10152,	1800:10426,	1900:10644,	2000:10861},
		900 : {900:8422,	1000:8646,	1100:8876,	1200:9112,	1300:9343,	1400:10125,	1500:10356,	1600:10589,	1700:10697,	1800:10984,	1900:11215,	2000:11446},
		1000 : {900:8807,	1000:9053,	1100:9297,	1200:9546,	1300:9790,	1400:10585,	1500:10828,	1600:11074,	1700:11196,	1800:11496,	1900:11740,	2000:11983},
		1100 : {900:9085,	1000:9344,	1100:9600,	1200:9862,	1300:10119,	1400:10927,	1500:11183,	1600:11443,	1700:11577,	1800:11890,	1900:12147,	2000:12403},
		1200 : {900:9439,	1000:9711,	1100:9980,	1200:10255,	1300:10526,	1400:11346,	1500:11616,	1600:11888,	1700:12035,	1800:12361,	1900:12631,	2000:12900},
		1300 : {900:9758,	1000:10043,	1100:10325,	1200:10613,	1300:10897,	1400:11730,	1500:12012,	1600:12297,	1700:12458,	1800:12797,	1900:13080,	2000:13362},
		1400 : {900:10078,	1000:10376,	1100:10671,	1200:10972,	1300:11269,	1400:12115,	1500:12411,	1600:12709,	1700:12882,	1800:13234,	1900:13530,	2000:13825},
		1500 : {900:10416,	1000:10727,	1100:11035,	1200:11349,	1300:11659,	1400:12518,	1500:12826,	1600:13137,	1700:13324,	1800:13688,	1900:13998,	2000:14306},
		1600 : {900:10955,	1000:11279,	1100:11600,	1200:11928,	1300:12250,	1400:13122,	1500:13444,	1600:13768,	1700:13967,	1800:14345,	1900:14667,	2000:14988},
		1700 : {900:11351,	1000:11688,	1100:12022,	1200:12362,	1300:12697,	1400:13583,	1500:13917,	1600:14254,	1700:14466,	1800:14857,	1900:15192,	2000:15526},
		1800 : {900:11745,	1000:12095,	1100:12442,	1200:12795,	1300:13143,	1400:14042,	1500:14389,	1600:14739,	1700:14964,	1800:15368,	1900:15716,	2000:16063},
		1900 : {900:12064,	1000:12427,	1100:12787,	1200:13153,	1300:13514,	1400:14426,	1500:14786,	1600:15149,	1700:15387,	1800:15804,	1900:16165,	2000:16525},
		2000 : {900:12593,	1000:12968,	1100:13342,	1200:13721,	1300:14095,	1400:15019,	1500:15393,	1600:15768,	1700:16019,	1800:16449,	1900:16823,	2000:17197}
	},
	'25-3' : {
		500 : {900:7874,	1000:8054,	1100:8234,	1200:8420,	1300:8599,	1400:9331,	1500:9510,	1600:9690,	1700:9748,	1800:10021,	1900:10244,	2000:10467},
		600 : {900:8177,	1000:8357,	1100:8537,	1200:8722,	1300:8902,	1400:9649,	1500:9886,	1600:10123,	1700:10239,	1800:10532,	1900:10770,	2000:11007},
		700 : {900:8572,	1000:8752,	1100:8932,	1200:9139,	1300:9391,	1400:10194,	1500:10446,	1600:10698,	1700:10827,	1800:11136,	1900:11388,	2000:11639},
		800 : {900:8977,	1000:9157,	1100:9393,	1200:9666,	1300:9932,	1400:10749,	1500:11016,	1600:11282,	1700:11426,	1800:11749,	1900:12015,	2000:12282},
		900 : {900:9403,	1000:9646,	1100:9926,	1200:10213,	1300:10494,	1400:11326,	1500:11607,	1600:11888,	1700:12046,	1800:12384,	1900:12665,	2000:12945},
		1000 : {900:9822,	1000:10117,	1100:10412,	1200:10713,	1300:11009,	1400:11855,	1500:12151,	1600:12446,	1700:12619,	1800:12971,	1900:13266,	2000:13562},
		1100 : {900:10159,	1000:10469,	1100:10779,	1200:11095,	1300:11404,	1400:12266,	1500:12575,	1600:12885,	1700:13073,	1800:13439,	1900:13749,	2000:14059},
		1200 : {900:10576,	1000:10901,	1100:11225,	1200:11555,	1300:11879,	1400:12755,	1500:13079,	1600:13404,	1700:13606,	1800:13987,	1900:14311,	2000:14635},
		1300 : {900:10957,	1000:11296,	1100:11635,	1200:11979,	1300:12318,	1400:13208,	1500:13547,	1600:13886,	1700:14103,	1800:14498,	1900:14837,	2000:15176},
		1400 : {900:11338,	1000:11691,	1100:12044,	1200:12403,	1300:12757,	1400:13661,	1500:14015,	1600:14368,	1700:14599,	1800:15009,	1900:15363,	2000:15716},
		1500 : {900:11738,	1000:12106,	1100:12474,	1200:12848,	1300:13215,	1400:14135,	1500:14502,	1600:14870,	1700:15116,	1800:15540,	1900:15908,	2000:16276},
		1600 : {900:12339,	1000:12722,	1100:13104,	1200:13492,	1300:13875,	1400:14808,	1500:15191,	1600:15573,	1700:15833,	1800:16272,	1900:16654,	2000:17037},
		1700 : {900:12795,	1000:13192,	1100:13589,	1200:13992,	1300:14389,	1400:15337,	1500:15734,	1600:16131,	1700:16405,	1800:16859,	1900:17256,	2000:17652},
		1800 : {900:13252,	1000:13663,	1100:14075,	1200:14492,	1300:14903,	1400:15866,	1500:16277,	1600:16689,	1700:16978,	1800:17446,	1900:17857,	2000:18269},
		1900 : {900:13633,	1000:14059,	1100:14484,	1200:14916,	1300:15342,	1400:16319,	1500:16745,	1600:17171,	1700:17475,	1800:17957,	1900:18383,	2000:18809},
		2000 : {900:14222,	1000:14662,	1100:15103,	1200:15549,	1300:15989,	1400:16981,	1500:17422,	1600:17862,	1700:18180,	1800:18677,	1900:19118,	2000:19558}
	},
	'26-1' : {
		500 : {900:5147,	1000:5324,	1100:5472,	1200:5622,	1300:5771,	1400:5918,	1500:6066,	1600:6216,	1700:6363,	1800:6513,	1900:6662,	2000:6810},
		600 : {900:5407,	1000:5597,	1100:5758,	1200:5921,	1300:6082,	1400:6243,	1500:6404,	1600:6566,	1700:6727,	1800:6890,	1900:7052,	2000:7212},
		700 : {900:5667,	1000:5870,	1100:6043,	1200:6219,	1300:6394,	1400:6568,	1500:6742,	1600:6917,	1700:7091,	1800:7267,	1900:7441,	2000:7615},
		800 : {900:6150,	1000:6365,	1100:6552,	1200:6741,	1300:6929,	1400:7443,	1500:7630,	1600:7819,	1700:7924,	1800:8113,	1900:8301,	2000:8487},
		900 : {900:6409,	1000:6638,	1100:6838,	1200:7040,	1300:7240,	1400:7768,	1500:7968,	1600:8169,	1700:8288,	1800:8490,	1900:8690,	2000:8890},
		1000 : {900:6746,	1000:6988,	1100:7200,	1200:7415,	1300:7629,	1400:8170,	1500:8382,	1600:8597,	1700:8728,	1800:8943,	1900:9157,	2000:9369},
		1100 : {900:6986,	1000:7240,	1100:7466,	1200:7694,	1300:7921,	1400:8474,	1500:8700,	1600:8927,	1700:9072,	1800:9300,	1900:9526,	2000:9752},
		1200 : {900:7245,	1000:7513,	1100:7752,	1200:7993,	1300:8232,	1400:8799,	1500:9038,	1600:9278,	1700:9435,	1800:9676,	1900:9916,	2000:10154},
		1300 : {900:7506,	1000:7787,	1100:8038,	1200:8292,	1300:8545,	1400:9124,	1500:9376,	1600:9630,	1700:9800,	1800:10054,	1900:10306,	2000:10558},
		1400 : {900:7767,	1000:8061,	1100:8325,	1200:8592,	1300:8858,	1400:9450,	1500:9715,	1600:9981,	1700:10165,	1800:10432,	1900:10697,	2000:10962},
		1500 : {900:8027,	1000:8334,	1100:8611,	1200:8891,	1300:9170,	1400:9775,	1500:10053,	1600:10332,	1700:10528,	1800:10808,	1900:11087,	2000:11364},
		1600 : {900:8110,	1000:8429,	1100:8720,	1200:9013,	1300:9304,	1400:9923,	1500:10213,	1600:10506,	1700:10715,	1800:11008,	1900:11299,	2000:11590},
		1700 : {900:8371,	1000:8703,	1100:9007,	1200:9313,	1300:9617,	1400:10249,	1500:10552,	1600:10858,	1700:11080,	1800:11386,	1900:11690,	2000:11994},
		1800 : {900:8707,	1000:9052,	1100:9369,	1200:9687,	1300:10005,	1400:10649,	1500:10966,	1600:11284,	1700:11519,	1800:11838,	1900:12156,	2000:12472},
		1900 : {900:8967,	1000:9326,	1100:9655,	1200:9987,	1300:10317,	1400:10975,	1500:11305,	1600:11636,	1700:11884,	1800:12216,	1900:12546,	2000:12876},
		2000 : {900:9621,	1000:9992,	1100:10335,	1200:10680,	1300:11023,	1400:11694,	1500:12036,	1600:12380,	1700:12641,	1800:12986,	1900:13330,	2000:13672}
	},
	'26-2' : {
		500 : {900:5548,	1000:5655,	1100:5766,	1200:5901,	1300:6035,	1400:6496,	1500:6628,	1600:6763,	1700:6824,	1800:6979,	1900:7133,	2000:7285},
		600 : {900:5728,	1000:5869,	1100:6008,	1200:6150,	1300:6290,	1400:6776,	1500:6942,	1600:7109,	1700:7193,	1800:7361,	1900:7528,	2000:7693},
		700 : {900:6039,	1000:6186,	1100:6332,	1200:6502,	1300:6681,	1400:7188,	1500:7366,	1600:7547,	1700:7644,	1800:7825,	1900:8004,	2000:8183},
		800 : {900:6320,	1000:6474,	1100:6664,	1200:6858,	1300:7051,	1400:7570,	1500:7762,	1600:7955,	1700:8065,	1800:8259,	1900:8452,	2000:8643},
		900 : {900:6549,	1000:6751,	1100:6955,	1200:7162,	1300:7368,	1400:7900,	1500:8105,	1600:8311,	1700:8434,	1800:8641,	1900:8847,	2000:9051},
		1000 : {900:6887,	1000:7106,	1100:7323,	1200:7543,	1300:7762,	1400:8307,	1500:8525,	1600:8744,	1700:8880,	1800:9100,	1900:9319,	2000:9536},
		1100 : {900:7132,	1000:7364,	1100:7594,	1200:7827,	1300:8059,	1400:8617,	1500:8848,	1600:9080,	1700:9229,	1800:9462,	1900:9693,	2000:9924},
		1200 : {900:7397,	1000:7642,	1100:7886,	1200:8131,	1300:8376,	1400:8947,	1500:9191,	1600:9436,	1700:9598,	1800:9844,	1900:10088,	2000:10332},
		1300 : {900:7663,	1000:7921,	1100:8178,	1200:8436,	1300:8694,	1400:9278,	1500:9535,	1600:9793,	1700:9968,	1800:10227,	1900:10484,	2000:10741},
		1400 : {900:7929,	1000:8201,	1100:8470,	1200:8742,	1300:9012,	1400:9610,	1500:9879,	1600:10150,	1700:10339,	1800:10610,	1900:10881,	2000:11150},
		1500 : {900:8194,	1000:8479,	1100:8761,	1200:9046,	1300:9329,	1400:9940,	1500:10222,	1600:10507,	1700:10708,	1800:10992,	1900:11276,	2000:11558},
		1600 : {900:8571,	1000:8868,	1100:9163,	1200:9461,	1300:9757,	1400:10381,	1500:10676,	1600:10974,	1700:11188,	1800:11485,	1900:11782,	2000:12077},
		1700 : {900:8837,	1000:9147,	1100:9456,	1200:9767,	1300:10076,	1400:10712,	1500:11021,	1600:11331,	1700:11558,	1800:11869,	1900:12178,	2000:12486},
		1800 : {900:9178,	1000:9502,	1100:9823,	1200:10147,	1300:10469,	1400:11119,	1500:11440,	1600:11763,	1700:12003,	1800:12327,	1900:12649,	2000:12971},
		1900 : {900:9445,	1000:9781,	1100:10115,	1200:10452,	1300:10787,	1400:11449,	1500:11784,	1600:12120,	1700:12373,	1800:12710,	1900:13045,	2000:13379},
		2000 : {900:9815,	1000:10164,	1100:10512,	1200:10862,	1300:11210,	1400:11885,	1500:12233,	1600:12582,	1700:12848,	1800:13197,	1900:13546,	2000:13893}
	},
	'26-3' : {
		500 : {900:6146,	1000:6287,	1100:6429,	1200:6602,	1300:6773,	1400:7272,	1500:7442,	1600:7613,	1700:7702,	1800:7894,	1900:8086,	2000:8278},
		600 : {900:6370,	1000:6546,	1100:6724,	1200:6905,	1300:7083,	1400:7596,	1500:7803,	1600:8010,	1700:8135,	1800:8344,	1900:8551,	2000:8757},
		700 : {900:6730,	1000:6915,	1100:7100,	1200:7299,	1300:7520,	1400:8069,	1500:8290,	1600:8512,	1700:8651,	1800:8875,	1900:9096,	2000:9317},
		800 : {900:7061,	1000:7254,	1100:7475,	1200:7713,	1300:7948,	1400:8512,	1500:8748,	1600:8984,	1700:9138,	1800:9376,	1900:9612,	2000:9847},
		900 : {900:7342,	1000:7573,	1100:7823,	1200:8076,	1300:8326,	1400:8904,	1500:9154,	1600:9405,	1700:9573,	1800:9826,	1900:10076,	2000:10326},
		1000 : {900:7718,	1000:7983,	1100:8248,	1200:8515,	1300:8780,	1400:9372,	1500:9637,	1600:9902,	1700:10085,	1800:10352,	1900:10617,	2000:10881},
		1100 : {900:8016,	1000:8296,	1100:8575,	1200:8856,	1300:9136,	1400:9743,	1500:10022,	1600:10301,	1700:10499,	1800:10781,	1900:11060,	2000:11339},
		1200 : {900:8336,	1000:8630,	1100:8923,	1200:9219,	1300:9513,	1400:10135,	1500:10429,	1600:10722,	1700:10935,	1800:11231,	1900:11524,	2000:11818},
		1300 : {900:8655,	1000:8964,	1100:9272,	1200:9582,	1300:9891,	1400:10527,	1500:10835,	1600:11143,	1700:11370,	1800:11681,	1900:11989,	2000:12297},
		1400 : {900:8975,	1000:9297,	1100:9620,	1200:9945,	1300:10268,	1400:10919,	1500:11242,	1600:11564,	1700:11806,	1800:12131,	1900:12453,	2000:12776},
		1500 : {900:9294,	1000:9631,	1100:9969,	1200:10308,	1300:10646,	1400:11311,	1500:11648,	1600:11985,	1700:12241,	1800:12581,	1900:12918,	2000:13255},
		1600 : {900:9724,	1000:10076,	1100:10427,	1200:10781,	1300:11133,	1400:11813,	1500:12165,	1600:12517,	1700:12787,	1800:13141,	1900:13493,	2000:13845},
		1700 : {900:10043,	1000:10410,	1100:10776,	1200:11144,	1300:11511,	1400:12205,	1500:12571,	1600:12938,	1700:13222,	1800:13591,	1900:13957,	2000:14324},
		1800 : {900:10439,	1000:10820,	1100:11200,	1200:11584,	1300:11964,	1400:12673,	1500:13054,	1600:13435,	1700:13734,	1800:14117,	1900:14498,	2000:14879},
		1900 : {900:10758,	1000:11154,	1100:11549,	1200:11947,	1300:12342,	1400:13065,	1500:13460,	1600:13856,	1700:14170,	1800:14567,	1900:14962,	2000:15358},
		2000 : {900:11182,	1000:11592,	1100:12002,	1200:12414,	1300:12824,	1400:13561,	1500:13971,	1600:14381,	1700:14709,	1800:15122,	1900:15531,	2000:15941}
	},
	'27-1' : {
		500 : {900:5147,	1000:5324,	1100:5472,	1200:5622,	1300:5771,	1400:5918,	1500:6066,	1600:6216,	1700:6363,	1800:6513,	1900:6662,	2000:6810},
		600 : {900:5407,	1000:5597,	1100:5758,	1200:5921,	1300:6082,	1400:6243,	1500:6404,	1600:6566,	1700:6727,	1800:6890,	1900:7052,	2000:7212},
		700 : {900:5667,	1000:5870,	1100:6043,	1200:6219,	1300:6394,	1400:6568,	1500:6742,	1600:6917,	1700:7091,	1800:7267,	1900:7441,	2000:7615},
		800 : {900:6150,	1000:6365,	1100:6552,	1200:6741,	1300:6929,	1400:7443,	1500:7630,	1600:7819,	1700:7924,	1800:8113,	1900:8301,	2000:8487},
		900 : {900:6409,	1000:6638,	1100:6838,	1200:7040,	1300:7240,	1400:7768,	1500:7968,	1600:8169,	1700:8288,	1800:8490,	1900:8690,	2000:8890},
		1000 : {900:6746,	1000:6988,	1100:7200,	1200:7415,	1300:7629,	1400:8170,	1500:8382,	1600:8597,	1700:8728,	1800:8943,	1900:9157,	2000:9369},
		1100 : {900:6986,	1000:7240,	1100:7466,	1200:7694,	1300:7921,	1400:8474,	1500:8700,	1600:8927,	1700:9072,	1800:9300,	1900:9526,	2000:9752},
		1200 : {900:7245,	1000:7513,	1100:7752,	1200:7993,	1300:8232,	1400:8799,	1500:9038,	1600:9278,	1700:9435,	1800:9676,	1900:9916,	2000:10154},
		1300 : {900:7506,	1000:7787,	1100:8038,	1200:8292,	1300:8545,	1400:9124,	1500:9376,	1600:9630,	1700:9800,	1800:10054,	1900:10306,	2000:10558},
		1400 : {900:7767,	1000:8061,	1100:8325,	1200:8592,	1300:8858,	1400:9450,	1500:9715,	1600:9981,	1700:10165,	1800:10432,	1900:10697,	2000:10962},
		1500 : {900:8027,	1000:8334,	1100:8611,	1200:8891,	1300:9170,	1400:9775,	1500:10053,	1600:10332,	1700:10528,	1800:10808,	1900:11087,	2000:11364},
		1600 : {900:8110,	1000:8429,	1100:8720,	1200:9013,	1300:9304,	1400:9923,	1500:10213,	1600:10506,	1700:10715,	1800:11008,	1900:11299,	2000:11590},
		1700 : {900:8371,	1000:8703,	1100:9007,	1200:9313,	1300:9617,	1400:10249,	1500:10552,	1600:10858,	1700:11080,	1800:11386,	1900:11690,	2000:11994},
		1800 : {900:8707,	1000:9052,	1100:9369,	1200:9687,	1300:10005,	1400:10649,	1500:10966,	1600:11284,	1700:11519,	1800:11838,	1900:12156,	2000:12472},
		1900 : {900:8967,	1000:9326,	1100:9655,	1200:9987,	1300:10317,	1400:10975,	1500:11305,	1600:11636,	1700:11884,	1800:12216,	1900:12546,	2000:12876},
		2000 : {900:9621,	1000:9992,	1100:10335,	1200:10680,	1300:11023,	1400:11694,	1500:12036,	1600:12380,	1700:12641,	1800:12986,	1900:13330,	2000:13672}
	},
	'27-2' : {
		500 : {900:5548,	1000:5655,	1100:5766,	1200:5901,	1300:6035,	1400:6496,	1500:6628,	1600:6763,	1700:6824,	1800:6979,	1900:7133,	2000:7285},
		600 : {900:5728,	1000:5869,	1100:6008,	1200:6150,	1300:6290,	1400:6776,	1500:6942,	1600:7109,	1700:7193,	1800:7361,	1900:7528,	2000:7693},
		700 : {900:6039,	1000:6186,	1100:6332,	1200:6502,	1300:6681,	1400:7188,	1500:7366,	1600:7547,	1700:7644,	1800:7825,	1900:8004,	2000:8183},
		800 : {900:6320,	1000:6474,	1100:6664,	1200:6858,	1300:7051,	1400:7570,	1500:7762,	1600:7955,	1700:8065,	1800:8259,	1900:8452,	2000:8643},
		900 : {900:6549,	1000:6751,	1100:6955,	1200:7162,	1300:7368,	1400:7900,	1500:8105,	1600:8311,	1700:8434,	1800:8641,	1900:8847,	2000:9051},
		1000 : {900:6887,	1000:7106,	1100:7323,	1200:7543,	1300:7762,	1400:8307,	1500:8525,	1600:8744,	1700:8880,	1800:9100,	1900:9319,	2000:9536},
		1100 : {900:7132,	1000:7364,	1100:7594,	1200:7827,	1300:8059,	1400:8617,	1500:8848,	1600:9080,	1700:9229,	1800:9462,	1900:9693,	2000:9924},
		1200 : {900:7397,	1000:7642,	1100:7886,	1200:8131,	1300:8376,	1400:8947,	1500:9191,	1600:9436,	1700:9598,	1800:9844,	1900:10088,	2000:10332},
		1300 : {900:7663,	1000:7921,	1100:8178,	1200:8436,	1300:8694,	1400:9278,	1500:9535,	1600:9793,	1700:9968,	1800:10227,	1900:10484,	2000:10741},
		1400 : {900:7929,	1000:8201,	1100:8470,	1200:8742,	1300:9012,	1400:9610,	1500:9879,	1600:10150,	1700:10339,	1800:10610,	1900:10881,	2000:11150},
		1500 : {900:8194,	1000:8479,	1100:8761,	1200:9046,	1300:9329,	1400:9940,	1500:10222,	1600:10507,	1700:10708,	1800:10992,	1900:11276,	2000:11558},
		1600 : {900:8571,	1000:8868,	1100:9163,	1200:9461,	1300:9757,	1400:10381,	1500:10676,	1600:10974,	1700:11188,	1800:11485,	1900:11782,	2000:12077},
		1700 : {900:8837,	1000:9147,	1100:9456,	1200:9767,	1300:10076,	1400:10712,	1500:11021,	1600:11331,	1700:11558,	1800:11869,	1900:12178,	2000:12486},
		1800 : {900:9178,	1000:9502,	1100:9823,	1200:10147,	1300:10469,	1400:11119,	1500:11440,	1600:11763,	1700:12003,	1800:12327,	1900:12649,	2000:12971},
		1900 : {900:9445,	1000:9781,	1100:10115,	1200:10452,	1300:10787,	1400:11449,	1500:11784,	1600:12120,	1700:12373,	1800:12710,	1900:13045,	2000:13379},
		2000 : {900:9815,	1000:10164,	1100:10512,	1200:10862,	1300:11210,	1400:11885,	1500:12233,	1600:12582,	1700:12848,	1800:13197,	1900:13546,	2000:13893}
	},
	'27-3' : {
		500 : {900:6146,	1000:6287,	1100:6429,	1200:6602,	1300:6773,	1400:7272,	1500:7442,	1600:7613,	1700:7702,	1800:7894,	1900:8086,	2000:8278},
		600 : {900:6370,	1000:6546,	1100:6724,	1200:6905,	1300:7083,	1400:7596,	1500:7803,	1600:8010,	1700:8135,	1800:8344,	1900:8551,	2000:8757},
		700 : {900:6730,	1000:6915,	1100:7100,	1200:7299,	1300:7520,	1400:8069,	1500:8290,	1600:8512,	1700:8651,	1800:8875,	1900:9096,	2000:9317},
		800 : {900:7061,	1000:7254,	1100:7475,	1200:7713,	1300:7948,	1400:8512,	1500:8748,	1600:8984,	1700:9138,	1800:9376,	1900:9612,	2000:9847},
		900 : {900:7342,	1000:7573,	1100:7823,	1200:8076,	1300:8326,	1400:8904,	1500:9154,	1600:9405,	1700:9573,	1800:9826,	1900:10076,	2000:10326},
		1000 : {900:7718,	1000:7983,	1100:8248,	1200:8515,	1300:8780,	1400:9372,	1500:9637,	1600:9902,	1700:10085,	1800:10352,	1900:10617,	2000:10881},
		1100 : {900:8016,	1000:8296,	1100:8575,	1200:8856,	1300:9136,	1400:9743,	1500:10022,	1600:10301,	1700:10499,	1800:10781,	1900:11060,	2000:11339},
		1200 : {900:8336,	1000:8630,	1100:8923,	1200:9219,	1300:9513,	1400:10135,	1500:10429,	1600:10722,	1700:10935,	1800:11231,	1900:11524,	2000:11818},
		1300 : {900:8655,	1000:8964,	1100:9272,	1200:9582,	1300:9891,	1400:10527,	1500:10835,	1600:11143,	1700:11370,	1800:11681,	1900:11989,	2000:12297},
		1400 : {900:8975,	1000:9297,	1100:9620,	1200:9945,	1300:10268,	1400:10919,	1500:11242,	1600:11564,	1700:11806,	1800:12131,	1900:12453,	2000:12776},
		1500 : {900:9294,	1000:9631,	1100:9969,	1200:10308,	1300:10646,	1400:11311,	1500:11648,	1600:11985,	1700:12241,	1800:12581,	1900:12918,	2000:13255},
		1600 : {900:9724,	1000:10076,	1100:10427,	1200:10781,	1300:11133,	1400:11813,	1500:12165,	1600:12517,	1700:12787,	1800:13141,	1900:13493,	2000:13845},
		1700 : {900:10043,	1000:10410,	1100:10776,	1200:11144,	1300:11511,	1400:12205,	1500:12571,	1600:12938,	1700:13222,	1800:13591,	1900:13957,	2000:14324},
		1800 : {900:10439,	1000:10820,	1100:11200,	1200:11584,	1300:11964,	1400:12673,	1500:13054,	1600:13435,	1700:13734,	1800:14117,	1900:14498,	2000:14879},
		1900 : {900:10758,	1000:11154,	1100:11549,	1200:11947,	1300:12342,	1400:13065,	1500:13460,	1600:13856,	1700:14170,	1800:14567,	1900:14962,	2000:15358},
		2000 : {900:11182,	1000:11592,	1100:12002,	1200:12414,	1300:12824,	1400:13561,	1500:13971,	1600:14381,	1700:14709,	1800:15122,	1900:15531,	2000:15941}
	},
	'28-1' : {
		500 : {900:7026,	1000:7257,	1100:7431,	1200:7614,	1300:7789,	1400:8409,	1500:8583,	1600:8760,	1700:8853,	1800:9137,	1900:9312,	2000:9486},
		600 : {900:7338,	1000:7582,	1100:7769,	1200:7965,	1300:8153,	1400:8786,	1500:8973,	1600:9163,	1700:9269,	1800:9566,	1900:9754,	2000:9941},
		700 : {900:7673,	1000:7930,	1100:8130,	1200:8340,	1300:8540,	1400:9187,	1500:9387,	1600:9589,	1700:9708,	1800:10019,	1900:10220,	2000:10420},
		800 : {900:8090,	1000:8360,	1100:8573,	1200:8795,	1300:9009,	1400:9668,	1500:9881,	1600:10097,	1700:10228,	1800:10552,	1900:10766,	2000:10979},
		900 : {900:8649,	1000:8932,	1100:9158,	1200:9393,	1300:9620,	1400:10292,	1500:10518,	1600:10746,	1700:10891,	1800:11228,	1900:11455,	2000:11680},
		1000 : {900:8962,	1000:9258,	1100:9497,	1200:9745,	1300:9985,	1400:10670,	1500:10909,	1600:11150,	1700:11308,	1800:11658,	1900:11897,	2000:12136},
		1100 : {900:9233,	1000:9542,	1100:9794,	1200:10055,	1300:10308,	1400:11006,	1500:11258,	1600:11513,	1700:11683,	1800:12046,	1900:12299,	2000:12551},
		1200 : {900:9608,	1000:9930,	1100:10195,	1200:10469,	1300:10735,	1400:11446,	1500:11711,	1600:11979,	1700:12162,	1800:12538,	1900:12804,	2000:13069},
		1300 : {900:9922,	1000:10256,	1100:10534,	1200:10821,	1300:11100,	1400:11825,	1500:12102,	1600:12383,	1700:12579,	1800:12968,	1900:13247,	2000:13525},
		1400 : {900:10236,	1000:10584,	1100:10875,	1200:11175,	1300:11467,	1400:12204,	1500:12495,	1600:12788,	1700:12998,	1800:13399,	1900:13691,	2000:13982},
		1500 : {900:10597,	1000:10958,	1100:11262,	1200:11575,	1300:11880,	1400:12630,	1500:12934,	1600:13241,	1700:13463,	1800:13878,	1900:14182,	2000:14486},
		1600 : {900:11129,	1000:11503,	1100:11820,	1200:12146,	1300:12463,	1400:13227,	1500:13543,	1600:13863,	1700:14098,	1800:14526,	1900:14844,	2000:15160},
		1700 : {900:11594,	1000:11981,	1100:12311,	1200:12650,	1300:12980,	1400:13757,	1500:14086,	1600:14419,	1700:14667,	1800:15108,	1900:15439,	2000:15768},
		1800 : {900:11906,	1000:12306,	1100:12649,	1200:13001,	1300:13345,	1400:14134,	1500:14477,	1600:14822,	1700:15083,	1800:15537,	1900:15881,	2000:16223},
		1900 : {900:12219,	1000:12632,	1100:12988,	1200:13353,	1300:13710,	1400:14512,	1500:14868,	1600:15226,	1700:15500,	1800:15967,	1900:16324,	2000:16679},
		2000 : {900:12744,	1000:13170,	1100:13539,	1200:13917,	1300:14287,	1400:15102,	1500:15470,	1600:15842,	1700:16129,	1800:16609,	1900:16978,	2000:17347}
	},
	'28-2' : {
		500 : {900:7461,	1000:7602,	1100:7741,	1200:7889,	1300:8029,	1400:8614,	1500:8753,	1600:8894,	1700:8971,	1800:9260,	1900:9440,	2000:9618},
		600 : {900:7707,	1000:7848,	1100:7987,	1200:8135,	1300:8275,	1400:8897,	1500:9089,	1600:9283,	1700:9393,	1800:9695,	1900:9887,	2000:10079},
		700 : {900:7976,	1000:8117,	1100:8256,	1200:8447,	1300:8652,	1400:9303,	1500:9508,	1600:9715,	1700:9838,	1800:10153,	1900:10358,	2000:10563},
		800 : {900:8326,	1000:8467,	1100:8682,	1200:8908,	1300:9127,	1400:9790,	1500:10008,	1600:10228,	1700:10364,	1800:10692,	1900:10911,	2000:11128},
		900 : {900:8818,	1000:9042,	1100:9272,	1200:9512,	1300:9743,	1400:10420,	1500:10650,	1600:10883,	1700:11032,	1800:11374,	1900:11605,	2000:11835},
		1000 : {900:9128,	1000:9374,	1100:9617,	1200:9870,	1300:10114,	1400:10804,	1500:11047,	1600:11293,	1700:11455,	1800:11809,	1900:12054,	2000:12297},
		1100 : {900:9405,	1000:9664,	1100:9920,	1200:10186,	1300:10443,	1400:11146,	1500:11402,	1600:11661,	1700:11836,	1800:12204,	1900:12461,	2000:12717},
		1200 : {900:9795,	1000:10067,	1100:10337,	1200:10615,	1300:10886,	1400:11601,	1500:11871,	1600:12143,	1700:12331,	1800:12711,	1900:12981,	2000:13251},
		1300 : {900:10114,	1000:10399,	1100:10682,	1200:10973,	1300:11256,	1400:11985,	1500:12268,	1600:12553,	1700:12753,	1800:13147,	1900:13430,	2000:13712},
		1400 : {900:10435,	1000:10732,	1100:11028,	1200:11332,	1300:11629,	1400:12370,	1500:12666,	1600:12964,	1700:13178,	1800:13584,	1900:13880,	2000:14175},
		1500 : {900:10792,	1000:11103,	1100:11412,	1200:11729,	1300:12038,	1400:12793,	1500:13101,	1600:13412,	1700:13639,	1800:14058,	1900:14368,	2000:14676},
		1600 : {900:11332,	1000:11656,	1100:11977,	1200:12307,	1300:12630,	1400:13397,	1500:13719,	1600:14042,	1700:14282,	1800:14714,	1900:15037,	2000:15358},
		1700 : {900:11802,	1000:12139,	1100:12474,	1200:12817,	1300:13152,	1400:13933,	1500:14267,	1600:14604,	1700:14857,	1800:15302,	1900:15637,	2000:15972},
		1800 : {900:12120,	1000:12470,	1100:12818,	1200:13174,	1300:13522,	1400:14316,	1500:14663,	1600:15013,	1700:15279,	1800:15737,	1900:16085,	2000:16432},
		1900 : {900:12439,	1000:12802,	1100:13162,	1200:13532,	1300:13893,	1400:14700,	1500:15060,	1600:15423,	1700:15702,	1800:16173,	1900:16534,	2000:16894},
		2000 : {900:12968,	1000:13344,	1100:13717,	1200:14100,	1300:14474,	1400:15294,	1500:15667,	1600:16043,	1700:16334,	1800:16818,	1900:17193,	2000:17566}
	},
	'28-3' : {
		500 : {900:8217,	1000:8397,	1100:8577,	1200:8766,	1300:8946,	1400:9572,	1500:9752,	1600:9932,	1700:10030,	1800:10358,	1900:10580,	2000:10803},
		600 : {900:8520,	1000:8700,	1100:8879,	1200:9069,	1300:9248,	1400:9890,	1500:10128,	1600:10365,	1700:10521,	1800:10869,	1900:11106,	2000:11343},
		700 : {900:8845,	1000:9025,	1100:9205,	1200:9416,	1300:9668,	1400:10366,	1500:10618,	1600:10869,	1700:11040,	1800:11402,	1900:11654,	2000:11906},
		800 : {900:9250,	1000:9430,	1100:9666,	1200:9942,	1300:10208,	1400:10921,	1500:11187,	1600:11454,	1700:11639,	1800:12016,	1900:12282,	2000:12548},
		900 : {900:9799,	1000:10042,	1100:10323,	1200:10613,	1300:10894,	1400:11621,	1500:11902,	1600:12183,	1700:12382,	1800:12774,	1900:13054,	2000:13335},
		1000 : {900:10142,	1000:10437,	1100:10732,	1200:11037,	1300:11332,	1400:12074,	1500:12369,	1600:12665,	1700:12879,	1800:13285,	1900:13580,	2000:13876},
		1100 : {900:10479,	1000:10789,	1100:11099,	1200:11418,	1300:11728,	1400:12484,	1500:12794,	1600:13104,	1700:13332,	1800:13753,	1900:14063,	2000:14373},
		1200 : {900:10933,	1000:11257,	1100:11581,	1200:11915,	1300:12239,	1400:13010,	1500:13334,	1600:13659,	1700:13902,	1800:14337,	1900:14661,	2000:14986},
		1300 : {900:11313,	1000:11652,	1100:11991,	1200:12339,	1300:12678,	1400:13463,	1500:13802,	1600:14141,	1700:14398,	1800:14848,	1900:15187,	2000:15526},
		1400 : {900:11694,	1000:12047,	1100:12401,	1200:12763,	1300:13117,	1400:13917,	1500:14270,	1600:14623,	1700:14895,	1800:15359,	1900:15713,	2000:16066},
		1500 : {900:12114,	1000:12482,	1100:12850,	1200:13227,	1300:13595,	1400:14410,	1500:14777,	1600:15145,	1700:15432,	1800:15910,	1900:16278,	2000:16646},
		1600 : {900:12716,	1000:13098,	1100:13480,	1200:13872,	1300:14254,	1400:15083,	1500:15466,	1600:15848,	1700:16149,	1800:16642,	1900:17024,	2000:17407},
		1700 : {900:13247,	1000:13644,	1100:14041,	1200:14447,	1300:14844,	1400:15687,	1500:16084,	1600:16481,	1700:16796,	1800:17304,	1900:17701,	2000:18098},
		1800 : {900:13628,	1000:14039,	1100:14450,	1200:14871,	1300:15282,	1400:16140,	1500:16552,	1600:16963,	1700:17293,	1800:17815,	1900:18227,	2000:18638},
		1900 : {900:14008,	1000:14434,	1100:14860,	1200:15295,	1300:15721,	1400:16594,	1500:17019,	1600:17445,	1700:17790,	1800:18327,	1900:18752,	2000:19178},
		2000 : {900:14598,	1000:15038,	1100:15478,	1200:15928,	1300:16369,	1400:17255,	1500:17696,	1600:18136,	1700:18495,	1800:19046,	1900:19487,	2000:19927}
	},
	'29-1' : {
		500 : {900:6163,	1000:6394,	1100:6568,	1200:6744,	1300:6919,	1400:7093,	1500:7267,	1600:7443,	1700:7617,	1800:7794,	1900:7969,	2000:8143},
		600 : {900:6475,	1000:6719,	1100:6906,	1200:7095,	1300:7283,	1400:7470,	1500:7657,	1600:7847,	1700:8033,	1800:8223,	1900:8411,	2000:8598},
		700 : {900:6786,	1000:7043,	1100:7243,	1200:7446,	1300:7646,	1400:7846,	1500:8046,	1600:8249,	1700:8449,	1800:8651,	1900:8852,	2000:9052},
		800 : {900:7544,	1000:7814,	1100:8027,	1200:8242,	1300:8456,	1400:9325,	1500:9538,	1600:9754,	1700:9804,	1800:10019,	1900:10233,	2000:10446},
		900 : {900:7856,	1000:8139,	1100:8365,	1200:8593,	1300:8820,	1400:9702,	1500:9928,	1600:10157,	1700:10220,	1800:10448,	1900:10675,	2000:10901},
		1000 : {900:8321,	1000:8617,	1100:8856,	1200:9097,	1300:9337,	1400:10232,	1500:10471,	1600:10713,	1700:10789,	1800:11030,	1900:11270,	2000:11509},
		1100 : {900:8593,	1000:8902,	1100:9154,	1200:9408,	1300:9661,	1400:10569,	1500:10821,	1600:11075,	1700:11164,	1800:11418,	1900:11671,	2000:11923},
		1200 : {900:8905,	1000:9227,	1100:9492,	1200:9759,	1300:10025,	1400:10946,	1500:11211,	1600:11478,	1700:11580,	1800:11847,	1900:12113,	2000:12378},
		1300 : {900:9218,	1000:9553,	1100:9831,	1200:10111,	1300:10390,	1400:11324,	1500:11602,	1600:11882,	1700:11997,	1800:12277,	1900:12556,	2000:12834},
		1400 : {900:9533,	1000:9880,	1100:10171,	1200:10464,	1300:10756,	1400:11703,	1500:11994,	1600:12287,	1700:12415,	1800:12709,	1900:13000,	2000:13291},
		1500 : {900:9845,	1000:10206,	1100:10509,	1200:10816,	1300:11120,	1400:12080,	1500:12384,	1600:12691,	1700:12831,	1800:13138,	1900:13442,	2000:13746},
		1600 : {900:9802,	1000:10176,	1100:10493,	1200:10812,	1300:11129,	1400:12102,	1500:12419,	1600:12739,	1700:12892,	1800:13212,	1900:13529,	2000:13846},
		1700 : {900:10116,	1000:10503,	1100:10833,	1200:11165,	1300:11496,	1400:12482,	1500:12811,	1600:13144,	1700:13311,	1800:13643,	1900:13974,	2000:14303},
		1800 : {900:10581,	1000:10980,	1100:11323,	1200:11668,	1300:12012,	1400:13011,	1500:13354,	1600:13699,	1700:13879,	1800:14224,	1900:14568,	2000:14910},
		1900 : {900:10894,	1000:11307,	1100:11662,	1200:12020,	1300:12377,	1400:13389,	1500:13745,	1600:14103,	1700:14296,	1800:14654,	1900:15011,	2000:15366},
		2000 : {900:11993,	1000:12419,	1100:12788,	1200:13159,	1300:13528,	1400:14553,	1500:14922,	1600:15293,	1700:15499,	1800:15870,	1900:16240,	2000:16609}
	},
	'29-2' : {
		500 : {900:6776,	1000:6917,	1100:7056,	1200:7197,	1300:7336,	1400:8131,	1500:8270,	1600:8411,	1700:8407,	1800:8588,	1900:8767,	2000:8945},
		600 : {900:7021,	1000:7163,	1100:7302,	1200:7443,	1300:7582,	1400:8414,	1500:8606,	1600:8800,	1700:8829,	1800:9022,	1900:9215,	2000:9406},
		700 : {900:7430,	1000:7571,	1100:7710,	1200:7894,	1300:8100,	1400:8960,	1500:9165,	1600:9372,	1700:9413,	1800:9620,	1900:9825,	2000:10030},
		800 : {900:7780,	1000:7921,	1100:8136,	1200:8355,	1300:8574,	1400:9447,	1500:9665,	1600:9885,	1700:9939,	1800:10159,	1900:10377,	2000:10595},
		900 : {900:8026,	1000:8249,	1100:8480,	1200:8712,	1300:8944,	1400:9830,	1500:10061,	1600:10294,	1700:10361,	1800:10594,	1900:10825,	2000:11056},
		1000 : {900:8487,	1000:8733,	1100:8977,	1200:9222,	1300:9467,	1400:10366,	1500:10610,	1600:10856,	1700:10936,	1800:11182,	1900:11426,	2000:11669},
		1100 : {900:8764,	1000:9023,	1100:9280,	1200:9539,	1300:9796,	1400:10708,	1500:10965,	1600:11224,	1700:11317,	1800:11576,	1900:11833,	2000:12089},
		1200 : {900:9082,	1000:9354,	1100:9624,	1200:9896,	1300:10166,	1400:11091,	1500:11361,	1600:11633,	1700:11739,	1800:12011,	1900:12281,	2000:12550},
		1300 : {900:9401,	1000:9686,	1100:9969,	1200:10253,	1300:10537,	1400:11475,	1500:11757,	1600:12042,	1700:12162,	1800:12446,	1900:12730,	2000:13012},
		1400 : {900:9722,	1000:10020,	1100:10315,	1200:10613,	1300:10909,	1400:11860,	1500:12156,	1600:12453,	1700:12586,	1800:12884,	1900:13180,	2000:13475},
		1500 : {900:10040,	1000:10351,	1100:10659,	1200:10970,	1300:11279,	1400:12243,	1500:12551,	1600:12862,	1700:13008,	1800:13318,	1900:13628,	2000:13936},
		1600 : {900:10579,	1000:10903,	1100:11224,	1200:11548,	1300:11870,	1400:12847,	1500:13169,	1600:13493,	1700:13651,	1800:13975,	1900:14297,	2000:14618},
		1700 : {900:10899,	1000:11236,	1100:11570,	1200:11907,	1300:12242,	1400:13232,	1500:13567,	1600:13904,	1700:14075,	1800:14412,	1900:14747,	2000:15081},
		1800 : {900:11369,	1000:11719,	1100:12066,	1200:12416,	1300:12764,	1400:13767,	1500:14115,	1600:14465,	1700:14649,	1800:14999,	1900:15347,	2000:15694},
		1900 : {900:11688,	1000:12051,	1100:12411,	1200:12774,	1300:13135,	1400:14151,	1500:14512,	1600:14874,	1700:15072,	1800:15434,	1900:15795,	2000:16156},
		2000 : {900:12217,	1000:12593,	1100:12966,	1200:13342,	1300:13716,	1400:14745,	1500:15118,	1600:15494,	1700:15704,	1800:16080,	1900:16454,	2000:16827}
	},
	'29-3' : {
		500 : {900:7532,	1000:7711,	1100:7891,	1200:8073,	1300:8253,	1400:9089,	1500:9269,	1600:9449,	1700:9466,	1800:9685,	1900:9908,	2000:10130},
		600 : {900:7834,	1000:8014,	1100:8194,	1200:8376,	1300:8556,	1400:9408,	1500:9645,	1600:9882,	1700:9957,	1800:10196,	1900:10433,	2000:10671},
		700 : {900:8299,	1000:8479,	1100:8659,	1200:8863,	1300:9115,	1400:10023,	1500:10274,	1600:10526,	1700:10615,	1800:10869,	1900:11121,	2000:11373},
		800 : {900:8704,	1000:8884,	1100:9120,	1200:9389,	1300:9655,	1400:10578,	1500:10844,	1600:11110,	1700:11214,	1800:11483,	1900:11749,	2000:12015},
		900 : {900:9007,	1000:9249,	1100:9530,	1200:9813,	1300:10094,	1400:11031,	1500:11312,	1600:11593,	1700:11711,	1800:11994,	1900:12275,	2000:12555},
		1000 : {900:9501,	1000:9797,	1100:10092,	1200:10390,	1300:10685,	1400:11636,	1500:11932,	1600:12227,	1700:12360,	1800:12657,	1900:12953,	2000:13248},
		1100 : {900:9839,	1000:10149,	1100:10459,	1200:10771,	1300:11081,	1400:12047,	1500:12357,	1600:12666,	1700:12813,	1800:13125,	1900:13435,	2000:13745},
		1200 : {900:10220,	1000:10544,	1100:10868,	1200:11195,	1300:11519,	1400:12500,	1500:12824,	1600:13149,	1700:13310,	1800:13637,	1900:13961,	2000:14285},
		1300 : {900:10600,	1000:10939,	1100:11278,	1200:11619,	1300:11958,	1400:12953,	1500:13292,	1600:13631,	1700:13807,	1800:14148,	1900:14487,	2000:14826},
		1400 : {900:10981,	1000:11335,	1100:11688,	1200:12044,	1300:12397,	1400:13406,	1500:13760,	1600:14113,	1700:14304,	1800:14659,	1900:15013,	2000:15366},
		1500 : {900:11362,	1000:11730,	1100:12098,	1200:12468,	1300:12836,	1400:13860,	1500:14227,	1600:14595,	1700:14800,	1800:15171,	1900:15538,	2000:15906},
		1600 : {900:11963,	1000:12345,	1100:12728,	1200:13112,	1300:13495,	1400:14533,	1500:14916,	1600:15298,	1700:15517,	1800:15902,	1900:16285,	2000:16667},
		1700 : {900:12344,	1000:12740,	1100:13137,	1200:13537,	1300:13933,	1400:14986,	1500:15383,	1600:15780,	1700:16014,	1800:16413,	1900:16810,	2000:17207},
		1800 : {900:12876,	1000:13288,	1100:13699,	1200:14113,	1300:14524,	1400:15592,	1500:16003,	1600:16415,	1700:16663,	1800:17077,	1900:17488,	2000:17900},
		1900 : {900:13257,	1000:13683,	1100:14109,	1200:14537,	1300:14963,	1400:16045,	1500:16471,	1600:16897,	1700:17160,	1800:17588,	1900:18014,	2000:18440},
		2000 : {900:13846,	1000:14287,	1100:14727,	1200:15170,	1300:15610,	1400:16707,	1500:17147,	1600:17588,	1700:17865,	1800:18308,	1900:18748,	2000:19189}
	},
	'210-1' : {
		500 : {900:6163,	1000:6394,	1100:6568,	1200:6744,	1300:6919,	1400:7093,	1500:7267,	1600:7443,	1700:7617,	1800:7794,	1900:7969,	2000:8143},
		600 : {900:6475,	1000:6719,	1100:6906,	1200:7095,	1300:7283,	1400:7470,	1500:7657,	1600:7847,	1700:8033,	1800:8223,	1900:8411,	2000:8598},
		700 : {900:6786,	1000:7043,	1100:7243,	1200:7446,	1300:7646,	1400:7846,	1500:8046,	1600:8249,	1700:8449,	1800:8651,	1900:8852,	2000:9052},
		800 : {900:7544,	1000:7814,	1100:8027,	1200:8242,	1300:8456,	1400:9325,	1500:9538,	1600:9754,	1700:9804,	1800:10019,	1900:10233,	2000:10446},
		900 : {900:7856,	1000:8139,	1100:8365,	1200:8593,	1300:8820,	1400:9702,	1500:9928,	1600:10157,	1700:10220,	1800:10448,	1900:10675,	2000:10901},
		1000 : {900:8321,	1000:8617,	1100:8856,	1200:9097,	1300:9337,	1400:10232,	1500:10471,	1600:10713,	1700:10789,	1800:11030,	1900:11270,	2000:11509},
		1100 : {900:8593,	1000:8902,	1100:9154,	1200:9408,	1300:9661,	1400:10569,	1500:10821,	1600:11075,	1700:11164,	1800:11418,	1900:11671,	2000:11923},
		1200 : {900:8905,	1000:9227,	1100:9492,	1200:9759,	1300:10025,	1400:10946,	1500:11211,	1600:11478,	1700:11580,	1800:11847,	1900:12113,	2000:12378},
		1300 : {900:9218,	1000:9553,	1100:9831,	1200:10111,	1300:10390,	1400:11324,	1500:11602,	1600:11882,	1700:11997,	1800:12277,	1900:12556,	2000:12834},
		1400 : {900:9533,	1000:9880,	1100:10171,	1200:10464,	1300:10756,	1400:11703,	1500:11994,	1600:12287,	1700:12415,	1800:12709,	1900:13000,	2000:13291},
		1500 : {900:9845,	1000:10206,	1100:10509,	1200:10816,	1300:11120,	1400:12080,	1500:12384,	1600:12691,	1700:12831,	1800:13138,	1900:13442,	2000:13746},
		1600 : {900:9802,	1000:10176,	1100:10493,	1200:10812,	1300:11129,	1400:12102,	1500:12419,	1600:12739,	1700:12892,	1800:13212,	1900:13529,	2000:13846},
		1700 : {900:10116,	1000:10503,	1100:10833,	1200:11165,	1300:11496,	1400:12482,	1500:12811,	1600:13144,	1700:13311,	1800:13643,	1900:13974,	2000:14303},
		1800 : {900:10581,	1000:10980,	1100:11323,	1200:11668,	1300:12012,	1400:13011,	1500:13354,	1600:13699,	1700:13879,	1800:14224,	1900:14568,	2000:14910},
		1900 : {900:10894,	1000:11307,	1100:11662,	1200:12020,	1300:12377,	1400:13389,	1500:13745,	1600:14103,	1700:14296,	1800:14654,	1900:15011,	2000:15366},
		2000 : {900:11993,	1000:12419,	1100:12788,	1200:13159,	1300:13528,	1400:14553,	1500:14922,	1600:15293,	1700:15499,	1800:15870,	1900:16240,	2000:16609}
	},
	'210-2' : {
		500 : {900:6776,	1000:6917,	1100:7056,	1200:7197,	1300:7336,	1400:8131,	1500:8270,	1600:8411,	1700:8407,	1800:8588,	1900:8767,	2000:8945},
		600 : {900:7021,	1000:7163,	1100:7302,	1200:7443,	1300:7582,	1400:8414,	1500:8606,	1600:8800,	1700:8829,	1800:9022,	1900:9215,	2000:9406},
		700 : {900:7430,	1000:7571,	1100:7710,	1200:7894,	1300:8100,	1400:8960,	1500:9165,	1600:9372,	1700:9413,	1800:9620,	1900:9825,	2000:10030},
		800 : {900:7780,	1000:7921,	1100:8136,	1200:8355,	1300:8574,	1400:9447,	1500:9665,	1600:9885,	1700:9939,	1800:10159,	1900:10377,	2000:10595},
		900 : {900:8026,	1000:8249,	1100:8480,	1200:8712,	1300:8944,	1400:9830,	1500:10061,	1600:10294,	1700:10361,	1800:10594,	1900:10825,	2000:11056},
		1000 : {900:8487,	1000:8733,	1100:8977,	1200:9222,	1300:9467,	1400:10366,	1500:10610,	1600:10856,	1700:10936,	1800:11182,	1900:11426,	2000:11669},
		1100 : {900:8764,	1000:9023,	1100:9280,	1200:9539,	1300:9796,	1400:10708,	1500:10965,	1600:11224,	1700:11317,	1800:11576,	1900:11833,	2000:12089},
		1200 : {900:9082,	1000:9354,	1100:9624,	1200:9896,	1300:10166,	1400:11091,	1500:11361,	1600:11633,	1700:11739,	1800:12011,	1900:12281,	2000:12550},
		1300 : {900:9401,	1000:9686,	1100:9969,	1200:10253,	1300:10537,	1400:11475,	1500:11757,	1600:12042,	1700:12162,	1800:12446,	1900:12730,	2000:13012},
		1400 : {900:9722,	1000:10020,	1100:10315,	1200:10613,	1300:10909,	1400:11860,	1500:12156,	1600:12453,	1700:12586,	1800:12884,	1900:13180,	2000:13475},
		1500 : {900:10040,	1000:10351,	1100:10659,	1200:10970,	1300:11279,	1400:12243,	1500:12551,	1600:12862,	1700:13008,	1800:13318,	1900:13628,	2000:13936},
		1600 : {900:10579,	1000:10903,	1100:11224,	1200:11548,	1300:11870,	1400:12847,	1500:13169,	1600:13493,	1700:13651,	1800:13975,	1900:14297,	2000:14618},
		1700 : {900:10899,	1000:11236,	1100:11570,	1200:11907,	1300:12242,	1400:13232,	1500:13567,	1600:13904,	1700:14075,	1800:14412,	1900:14747,	2000:15081},
		1800 : {900:11369,	1000:11719,	1100:12066,	1200:12416,	1300:12764,	1400:13767,	1500:14115,	1600:14465,	1700:14649,	1800:14999,	1900:15347,	2000:15694},
		1900 : {900:11688,	1000:12051,	1100:12411,	1200:12774,	1300:13135,	1400:14151,	1500:14512,	1600:14874,	1700:15072,	1800:15434,	1900:15795,	2000:16156},
		2000 : {900:12217,	1000:12593,	1100:12966,	1200:13342,	1300:13716,	1400:14745,	1500:15118,	1600:15494,	1700:15704,	1800:16080,	1900:16454,	2000:16827}
	},
	'210-3' : {
		500 : {900:7532,	1000:7711,	1100:7891,	1200:8073,	1300:8253,	1400:9089,	1500:9269,	1600:9449,	1700:9466,	1800:9685,	1900:9908,	2000:10130},
		600 : {900:7834,	1000:8014,	1100:8194,	1200:8376,	1300:8556,	1400:9408,	1500:9645,	1600:9882,	1700:9957,	1800:10196,	1900:10433,	2000:10671},
		700 : {900:8299,	1000:8479,	1100:8659,	1200:8863,	1300:9115,	1400:10023,	1500:10274,	1600:10526,	1700:10615,	1800:10869,	1900:11121,	2000:11373},
		800 : {900:8704,	1000:8884,	1100:9120,	1200:9389,	1300:9655,	1400:10578,	1500:10844,	1600:11110,	1700:11214,	1800:11483,	1900:11749,	2000:12015},
		900 : {900:9007,	1000:9249,	1100:9530,	1200:9813,	1300:10094,	1400:11031,	1500:11312,	1600:11593,	1700:11711,	1800:11994,	1900:12275,	2000:12555},
		1000 : {900:9501,	1000:9797,	1100:10092,	1200:10390,	1300:10685,	1400:11636,	1500:11932,	1600:12227,	1700:12360,	1800:12657,	1900:12953,	2000:13248},
		1100 : {900:9839,	1000:10149,	1100:10459,	1200:10771,	1300:11081,	1400:12047,	1500:12357,	1600:12666,	1700:12813,	1800:13125,	1900:13435,	2000:13745},
		1200 : {900:10220,	1000:10544,	1100:10868,	1200:11195,	1300:11519,	1400:12500,	1500:12824,	1600:13149,	1700:13310,	1800:13637,	1900:13961,	2000:14285},
		1300 : {900:10600,	1000:10939,	1100:11278,	1200:11619,	1300:11958,	1400:12953,	1500:13292,	1600:13631,	1700:13807,	1800:14148,	1900:14487,	2000:14826},
		1400 : {900:10981,	1000:11335,	1100:11688,	1200:12044,	1300:12397,	1400:13406,	1500:13760,	1600:14113,	1700:14304,	1800:14659,	1900:15013,	2000:15366},
		1500 : {900:11362,	1000:11730,	1100:12098,	1200:12468,	1300:12836,	1400:13860,	1500:14227,	1600:14595,	1700:14800,	1800:15171,	1900:15538,	2000:15906},
		1600 : {900:11963,	1000:12345,	1100:12728,	1200:13112,	1300:13495,	1400:14533,	1500:14916,	1600:15298,	1700:15517,	1800:15902,	1900:16285,	2000:16667},
		1700 : {900:12344,	1000:12740,	1100:13137,	1200:13537,	1300:13933,	1400:14986,	1500:15383,	1600:15780,	1700:16014,	1800:16413,	1900:16810,	2000:17207},
		1800 : {900:12876,	1000:13288,	1100:13699,	1200:14113,	1300:14524,	1400:15592,	1500:16003,	1600:16415,	1700:16663,	1800:17077,	1900:17488,	2000:17900},
		1900 : {900:13257,	1000:13683,	1100:14109,	1200:14537,	1300:14963,	1400:16045,	1500:16471,	1600:16897,	1700:17160,	1800:17588,	1900:18014,	2000:18440},
		2000 : {900:13846,	1000:14287,	1100:14727,	1200:15170,	1300:15610,	1400:16707,	1500:17147,	1600:17588,	1700:17865,	1800:18308,	1900:18748,	2000:19189}
	},
	'211-1' : {
		500 : {900:6163,	1000:6394,	1100:6568,	1200:6744,	1300:6919,	1400:7093,	1500:7267,	1600:7443,	1700:7617,	1800:7794,	1900:7969,	2000:8143},
		600 : {900:6475,	1000:6719,	1100:6906,	1200:7095,	1300:7283,	1400:7470,	1500:7657,	1600:7847,	1700:8033,	1800:8223,	1900:8411,	2000:8598},
		700 : {900:6786,	1000:7043,	1100:7243,	1200:7446,	1300:7646,	1400:7846,	1500:8046,	1600:8249,	1700:8449,	1800:8651,	1900:8852,	2000:9052},
		800 : {900:7544,	1000:7814,	1100:8027,	1200:8242,	1300:8456,	1400:9325,	1500:9538,	1600:9754,	1700:9804,	1800:10019,	1900:10233,	2000:10446},
		900 : {900:7856,	1000:8139,	1100:8365,	1200:8593,	1300:8820,	1400:9702,	1500:9928,	1600:10157,	1700:10220,	1800:10448,	1900:10675,	2000:10901},
		1000 : {900:8321,	1000:8617,	1100:8856,	1200:9097,	1300:9337,	1400:10232,	1500:10471,	1600:10713,	1700:10789,	1800:11030,	1900:11270,	2000:11509},
		1100 : {900:8593,	1000:8902,	1100:9154,	1200:9408,	1300:9661,	1400:10569,	1500:10821,	1600:11075,	1700:11164,	1800:11418,	1900:11671,	2000:11923},
		1200 : {900:8905,	1000:9227,	1100:9492,	1200:9759,	1300:10025,	1400:10946,	1500:11211,	1600:11478,	1700:11580,	1800:11847,	1900:12113,	2000:12378},
		1300 : {900:9218,	1000:9553,	1100:9831,	1200:10111,	1300:10390,	1400:11324,	1500:11602,	1600:11882,	1700:11997,	1800:12277,	1900:12556,	2000:12834},
		1400 : {900:9533,	1000:9880,	1100:10171,	1200:10464,	1300:10756,	1400:11703,	1500:11994,	1600:12287,	1700:12415,	1800:12709,	1900:13000,	2000:13291},
		1500 : {900:9845,	1000:10206,	1100:10509,	1200:10816,	1300:11120,	1400:12080,	1500:12384,	1600:12691,	1700:12831,	1800:13138,	1900:13442,	2000:13746},
		1600 : {900:9802,	1000:10176,	1100:10493,	1200:10812,	1300:11129,	1400:12102,	1500:12419,	1600:12739,	1700:12892,	1800:13212,	1900:13529,	2000:13846},
		1700 : {900:10116,	1000:10503,	1100:10833,	1200:11165,	1300:11496,	1400:12482,	1500:12811,	1600:13144,	1700:13311,	1800:13643,	1900:13974,	2000:14303},
		1800 : {900:10581,	1000:10980,	1100:11323,	1200:11668,	1300:12012,	1400:13011,	1500:13354,	1600:13699,	1700:13879,	1800:14224,	1900:14568,	2000:14910},
		1900 : {900:10894,	1000:11307,	1100:11662,	1200:12020,	1300:12377,	1400:13389,	1500:13745,	1600:14103,	1700:14296,	1800:14654,	1900:15011,	2000:15366},
		2000 : {900:11993,	1000:12419,	1100:12788,	1200:13159,	1300:13528,	1400:14553,	1500:14922,	1600:15293,	1700:15499,	1800:15870,	1900:16240,	2000:16609}
	},
	'211-2' : {
		500 : {900:6776,	1000:6917,	1100:7056,	1200:7197,	1300:7336,	1400:8131,	1500:8270,	1600:8411,	1700:8407,	1800:8588,	1900:8767,	2000:8945},
		600 : {900:7021,	1000:7163,	1100:7302,	1200:7443,	1300:7582,	1400:8414,	1500:8606,	1600:8800,	1700:8829,	1800:9022,	1900:9215,	2000:9406},
		700 : {900:7430,	1000:7571,	1100:7710,	1200:7894,	1300:8100,	1400:8960,	1500:9165,	1600:9372,	1700:9413,	1800:9620,	1900:9825,	2000:10030},
		800 : {900:7780,	1000:7921,	1100:8136,	1200:8355,	1300:8574,	1400:9447,	1500:9665,	1600:9885,	1700:9939,	1800:10159,	1900:10377,	2000:10595},
		900 : {900:8026,	1000:8249,	1100:8480,	1200:8712,	1300:8944,	1400:9830,	1500:10061,	1600:10294,	1700:10361,	1800:10594,	1900:10825,	2000:11056},
		1000 : {900:8487,	1000:8733,	1100:8977,	1200:9222,	1300:9467,	1400:10366,	1500:10610,	1600:10856,	1700:10936,	1800:11182,	1900:11426,	2000:11669},
		1100 : {900:8764,	1000:9023,	1100:9280,	1200:9539,	1300:9796,	1400:10708,	1500:10965,	1600:11224,	1700:11317,	1800:11576,	1900:11833,	2000:12089},
		1200 : {900:9082,	1000:9354,	1100:9624,	1200:9896,	1300:10166,	1400:11091,	1500:11361,	1600:11633,	1700:11739,	1800:12011,	1900:12281,	2000:12550},
		1300 : {900:9401,	1000:9686,	1100:9969,	1200:10253,	1300:10537,	1400:11475,	1500:11757,	1600:12042,	1700:12162,	1800:12446,	1900:12730,	2000:13012},
		1400 : {900:9722,	1000:10020,	1100:10315,	1200:10613,	1300:10909,	1400:11860,	1500:12156,	1600:12453,	1700:12586,	1800:12884,	1900:13180,	2000:13475},
		1500 : {900:10040,	1000:10351,	1100:10659,	1200:10970,	1300:11279,	1400:12243,	1500:12551,	1600:12862,	1700:13008,	1800:13318,	1900:13628,	2000:13936},
		1600 : {900:10579,	1000:10903,	1100:11224,	1200:11548,	1300:11870,	1400:12847,	1500:13169,	1600:13493,	1700:13651,	1800:13975,	1900:14297,	2000:14618},
		1700 : {900:10899,	1000:11236,	1100:11570,	1200:11907,	1300:12242,	1400:13232,	1500:13567,	1600:13904,	1700:14075,	1800:14412,	1900:14747,	2000:15081},
		1800 : {900:11369,	1000:11719,	1100:12066,	1200:12416,	1300:12764,	1400:13767,	1500:14115,	1600:14465,	1700:14649,	1800:14999,	1900:15347,	2000:15694},
		1900 : {900:11688,	1000:12051,	1100:12411,	1200:12774,	1300:13135,	1400:14151,	1500:14512,	1600:14874,	1700:15072,	1800:15434,	1900:15795,	2000:16156},
		2000 : {900:12217,	1000:12593,	1100:12966,	1200:13342,	1300:13716,	1400:14745,	1500:15118,	1600:15494,	1700:15704,	1800:16080,	1900:16454,	2000:16827}
	},
	'211-3' : {
		500 : {900:7532,	1000:7711,	1100:7891,	1200:8073,	1300:8253,	1400:9089,	1500:9269,	1600:9449,	1700:9466,	1800:9685,	1900:9908,	2000:10130},
		600 : {900:7834,	1000:8014,	1100:8194,	1200:8376,	1300:8556,	1400:9408,	1500:9645,	1600:9882,	1700:9957,	1800:10196,	1900:10433,	2000:10671},
		700 : {900:8299,	1000:8479,	1100:8659,	1200:8863,	1300:9115,	1400:10023,	1500:10274,	1600:10526,	1700:10615,	1800:10869,	1900:11121,	2000:11373},
		800 : {900:8704,	1000:8884,	1100:9120,	1200:9389,	1300:9655,	1400:10578,	1500:10844,	1600:11110,	1700:11214,	1800:11483,	1900:11749,	2000:12015},
		900 : {900:9007,	1000:9249,	1100:9530,	1200:9813,	1300:10094,	1400:11031,	1500:11312,	1600:11593,	1700:11711,	1800:11994,	1900:12275,	2000:12555},
		1000 : {900:9501,	1000:9797,	1100:10092,	1200:10390,	1300:10685,	1400:11636,	1500:11932,	1600:12227,	1700:12360,	1800:12657,	1900:12953,	2000:13248},
		1100 : {900:9839,	1000:10149,	1100:10459,	1200:10771,	1300:11081,	1400:12047,	1500:12357,	1600:12666,	1700:12813,	1800:13125,	1900:13435,	2000:13745},
		1200 : {900:10220,	1000:10544,	1100:10868,	1200:11195,	1300:11519,	1400:12500,	1500:12824,	1600:13149,	1700:13310,	1800:13637,	1900:13961,	2000:14285},
		1300 : {900:10600,	1000:10939,	1100:11278,	1200:11619,	1300:11958,	1400:12953,	1500:13292,	1600:13631,	1700:13807,	1800:14148,	1900:14487,	2000:14826},
		1400 : {900:10981,	1000:11335,	1100:11688,	1200:12044,	1300:12397,	1400:13406,	1500:13760,	1600:14113,	1700:14304,	1800:14659,	1900:15013,	2000:15366},
		1500 : {900:11362,	1000:11730,	1100:12098,	1200:12468,	1300:12836,	1400:13860,	1500:14227,	1600:14595,	1700:14800,	1800:15171,	1900:15538,	2000:15906},
		1600 : {900:11963,	1000:12345,	1100:12728,	1200:13112,	1300:13495,	1400:14533,	1500:14916,	1600:15298,	1700:15517,	1800:15902,	1900:16285,	2000:16667},
		1700 : {900:12344,	1000:12740,	1100:13137,	1200:13537,	1300:13933,	1400:14986,	1500:15383,	1600:15780,	1700:16014,	1800:16413,	1900:16810,	2000:17207},
		1800 : {900:12876,	1000:13288,	1100:13699,	1200:14113,	1300:14524,	1400:15592,	1500:16003,	1600:16415,	1700:16663,	1800:17077,	1900:17488,	2000:17900},
		1900 : {900:13257,	1000:13683,	1100:14109,	1200:14537,	1300:14963,	1400:16045,	1500:16471,	1600:16897,	1700:17160,	1800:17588,	1900:18014,	2000:18440},
		2000 : {900:13846,	1000:14287,	1100:14727,	1200:15170,	1300:15610,	1400:16707,	1500:17147,	1600:17588,	1700:17865,	1800:18308,	1900:18748,	2000:19189}
	},
	'212-1' : {
		500 : {900:6163,	1000:6394,	1100:6568,	1200:6744,	1300:6919,	1400:7093,	1500:7267,	1600:7443,	1700:7617,	1800:7794,	1900:7969,	2000:8143},
		600 : {900:6475,	1000:6719,	1100:6906,	1200:7095,	1300:7283,	1400:7470,	1500:7657,	1600:7847,	1700:8033,	1800:8223,	1900:8411,	2000:8598},
		700 : {900:6786,	1000:7043,	1100:7243,	1200:7446,	1300:7646,	1400:7846,	1500:8046,	1600:8249,	1700:8449,	1800:8651,	1900:8852,	2000:9052},
		800 : {900:7544,	1000:7814,	1100:8027,	1200:8242,	1300:8456,	1400:9325,	1500:9538,	1600:9754,	1700:9804,	1800:10019,	1900:10233,	2000:10446},
		900 : {900:7856,	1000:8139,	1100:8365,	1200:8593,	1300:8820,	1400:9702,	1500:9928,	1600:10157,	1700:10220,	1800:10448,	1900:10675,	2000:10901},
		1000 : {900:8321,	1000:8617,	1100:8856,	1200:9097,	1300:9337,	1400:10232,	1500:10471,	1600:10713,	1700:10789,	1800:11030,	1900:11270,	2000:11509},
		1100 : {900:8593,	1000:8902,	1100:9154,	1200:9408,	1300:9661,	1400:10569,	1500:10821,	1600:11075,	1700:11164,	1800:11418,	1900:11671,	2000:11923},
		1200 : {900:8905,	1000:9227,	1100:9492,	1200:9759,	1300:10025,	1400:10946,	1500:11211,	1600:11478,	1700:11580,	1800:11847,	1900:12113,	2000:12378},
		1300 : {900:9218,	1000:9553,	1100:9831,	1200:10111,	1300:10390,	1400:11324,	1500:11602,	1600:11882,	1700:11997,	1800:12277,	1900:12556,	2000:12834},
		1400 : {900:9533,	1000:9880,	1100:10171,	1200:10464,	1300:10756,	1400:11703,	1500:11994,	1600:12287,	1700:12415,	1800:12709,	1900:13000,	2000:13291},
		1500 : {900:9845,	1000:10206,	1100:10509,	1200:10816,	1300:11120,	1400:12080,	1500:12384,	1600:12691,	1700:12831,	1800:13138,	1900:13442,	2000:13746},
		1600 : {900:9802,	1000:10176,	1100:10493,	1200:10812,	1300:11129,	1400:12102,	1500:12419,	1600:12739,	1700:12892,	1800:13212,	1900:13529,	2000:13846},
		1700 : {900:10116,	1000:10503,	1100:10833,	1200:11165,	1300:11496,	1400:12482,	1500:12811,	1600:13144,	1700:13311,	1800:13643,	1900:13974,	2000:14303},
		1800 : {900:10581,	1000:10980,	1100:11323,	1200:11668,	1300:12012,	1400:13011,	1500:13354,	1600:13699,	1700:13879,	1800:14224,	1900:14568,	2000:14910},
		1900 : {900:10894,	1000:11307,	1100:11662,	1200:12020,	1300:12377,	1400:13389,	1500:13745,	1600:14103,	1700:14296,	1800:14654,	1900:15011,	2000:15366},
		2000 : {900:11993,	1000:12419,	1100:12788,	1200:13159,	1300:13528,	1400:14553,	1500:14922,	1600:15293,	1700:15499,	1800:15870,	1900:16240,	2000:16609}
	},
	'212-2' : {
		500 : {900:6776,	1000:6917,	1100:7056,	1200:7197,	1300:7336,	1400:8131,	1500:8270,	1600:8411,	1700:8407,	1800:8588,	1900:8767,	2000:8945},
		600 : {900:7021,	1000:7163,	1100:7302,	1200:7443,	1300:7582,	1400:8414,	1500:8606,	1600:8800,	1700:8829,	1800:9022,	1900:9215,	2000:9406},
		700 : {900:7430,	1000:7571,	1100:7710,	1200:7894,	1300:8100,	1400:8960,	1500:9165,	1600:9372,	1700:9413,	1800:9620,	1900:9825,	2000:10030},
		800 : {900:7780,	1000:7921,	1100:8136,	1200:8355,	1300:8574,	1400:9447,	1500:9665,	1600:9885,	1700:9939,	1800:10159,	1900:10377,	2000:10595},
		900 : {900:8026,	1000:8249,	1100:8480,	1200:8712,	1300:8944,	1400:9830,	1500:10061,	1600:10294,	1700:10361,	1800:10594,	1900:10825,	2000:11056},
		1000 : {900:8487,	1000:8733,	1100:8977,	1200:9222,	1300:9467,	1400:10366,	1500:10610,	1600:10856,	1700:10936,	1800:11182,	1900:11426,	2000:11669},
		1100 : {900:8764,	1000:9023,	1100:9280,	1200:9539,	1300:9796,	1400:10708,	1500:10965,	1600:11224,	1700:11317,	1800:11576,	1900:11833,	2000:12089},
		1200 : {900:9082,	1000:9354,	1100:9624,	1200:9896,	1300:10166,	1400:11091,	1500:11361,	1600:11633,	1700:11739,	1800:12011,	1900:12281,	2000:12550},
		1300 : {900:9401,	1000:9686,	1100:9969,	1200:10253,	1300:10537,	1400:11475,	1500:11757,	1600:12042,	1700:12162,	1800:12446,	1900:12730,	2000:13012},
		1400 : {900:9722,	1000:10020,	1100:10315,	1200:10613,	1300:10909,	1400:11860,	1500:12156,	1600:12453,	1700:12586,	1800:12884,	1900:13180,	2000:13475},
		1500 : {900:10040,	1000:10351,	1100:10659,	1200:10970,	1300:11279,	1400:12243,	1500:12551,	1600:12862,	1700:13008,	1800:13318,	1900:13628,	2000:13936},
		1600 : {900:10579,	1000:10903,	1100:11224,	1200:11548,	1300:11870,	1400:12847,	1500:13169,	1600:13493,	1700:13651,	1800:13975,	1900:14297,	2000:14618},
		1700 : {900:10899,	1000:11236,	1100:11570,	1200:11907,	1300:12242,	1400:13232,	1500:13567,	1600:13904,	1700:14075,	1800:14412,	1900:14747,	2000:15081},
		1800 : {900:11369,	1000:11719,	1100:12066,	1200:12416,	1300:12764,	1400:13767,	1500:14115,	1600:14465,	1700:14649,	1800:14999,	1900:15347,	2000:15694},
		1900 : {900:11688,	1000:12051,	1100:12411,	1200:12774,	1300:13135,	1400:14151,	1500:14512,	1600:14874,	1700:15072,	1800:15434,	1900:15795,	2000:16156},
		2000 : {900:12217,	1000:12593,	1100:12966,	1200:13342,	1300:13716,	1400:14745,	1500:15118,	1600:15494,	1700:15704,	1800:16080,	1900:16454,	2000:16827}
	},
	'212-3' : {
		500 : {900:7532,	1000:7711,	1100:7891,	1200:8073,	1300:8253,	1400:9089,	1500:9269,	1600:9449,	1700:9466,	1800:9685,	1900:9908,	2000:10130},
		600 : {900:7834,	1000:8014,	1100:8194,	1200:8376,	1300:8556,	1400:9408,	1500:9645,	1600:9882,	1700:9957,	1800:10196,	1900:10433,	2000:10671},
		700 : {900:8299,	1000:8479,	1100:8659,	1200:8863,	1300:9115,	1400:10023,	1500:10274,	1600:10526,	1700:10615,	1800:10869,	1900:11121,	2000:11373},
		800 : {900:8704,	1000:8884,	1100:9120,	1200:9389,	1300:9655,	1400:10578,	1500:10844,	1600:11110,	1700:11214,	1800:11483,	1900:11749,	2000:12015},
		900 : {900:9007,	1000:9249,	1100:9530,	1200:9813,	1300:10094,	1400:11031,	1500:11312,	1600:11593,	1700:11711,	1800:11994,	1900:12275,	2000:12555},
		1000 : {900:9501,	1000:9797,	1100:10092,	1200:10390,	1300:10685,	1400:11636,	1500:11932,	1600:12227,	1700:12360,	1800:12657,	1900:12953,	2000:13248},
		1100 : {900:9839,	1000:10149,	1100:10459,	1200:10771,	1300:11081,	1400:12047,	1500:12357,	1600:12666,	1700:12813,	1800:13125,	1900:13435,	2000:13745},
		1200 : {900:10220,	1000:10544,	1100:10868,	1200:11195,	1300:11519,	1400:12500,	1500:12824,	1600:13149,	1700:13310,	1800:13637,	1900:13961,	2000:14285},
		1300 : {900:10600,	1000:10939,	1100:11278,	1200:11619,	1300:11958,	1400:12953,	1500:13292,	1600:13631,	1700:13807,	1800:14148,	1900:14487,	2000:14826},
		1400 : {900:10981,	1000:11335,	1100:11688,	1200:12044,	1300:12397,	1400:13406,	1500:13760,	1600:14113,	1700:14304,	1800:14659,	1900:15013,	2000:15366},
		1500 : {900:11362,	1000:11730,	1100:12098,	1200:12468,	1300:12836,	1400:13860,	1500:14227,	1600:14595,	1700:14800,	1800:15171,	1900:15538,	2000:15906},
		1600 : {900:11963,	1000:12345,	1100:12728,	1200:13112,	1300:13495,	1400:14533,	1500:14916,	1600:15298,	1700:15517,	1800:15902,	1900:16285,	2000:16667},
		1700 : {900:12344,	1000:12740,	1100:13137,	1200:13537,	1300:13933,	1400:14986,	1500:15383,	1600:15780,	1700:16014,	1800:16413,	1900:16810,	2000:17207},
		1800 : {900:12876,	1000:13288,	1100:13699,	1200:14113,	1300:14524,	1400:15592,	1500:16003,	1600:16415,	1700:16663,	1800:17077,	1900:17488,	2000:17900},
		1900 : {900:13257,	1000:13683,	1100:14109,	1200:14537,	1300:14963,	1400:16045,	1500:16471,	1600:16897,	1700:17160,	1800:17588,	1900:18014,	2000:18440},
		2000 : {900:13846,	1000:14287,	1100:14727,	1200:15170,	1300:15610,	1400:16707,	1500:17147,	1600:17588,	1700:17865,	1800:18308,	1900:18748,	2000:19189}
	},
	'213-1' : {
		500 : {900:6163,	1000:6394,	1100:6568,	1200:6744,	1300:6919,	1400:7093,	1500:7267,	1600:7443,	1700:7617,	1800:7794,	1900:7969,	2000:8143},
		600 : {900:6475,	1000:6719,	1100:6906,	1200:7095,	1300:7283,	1400:7470,	1500:7657,	1600:7847,	1700:8033,	1800:8223,	1900:8411,	2000:8598},
		700 : {900:6786,	1000:7043,	1100:7243,	1200:7446,	1300:7646,	1400:7846,	1500:8046,	1600:8249,	1700:8449,	1800:8651,	1900:8852,	2000:9052},
		800 : {900:7544,	1000:7814,	1100:8027,	1200:8242,	1300:8456,	1400:9325,	1500:9538,	1600:9754,	1700:9804,	1800:10019,	1900:10233,	2000:10446},
		900 : {900:7856,	1000:8139,	1100:8365,	1200:8593,	1300:8820,	1400:9702,	1500:9928,	1600:10157,	1700:10220,	1800:10448,	1900:10675,	2000:10901},
		1000 : {900:8321,	1000:8617,	1100:8856,	1200:9097,	1300:9337,	1400:10232,	1500:10471,	1600:10713,	1700:10789,	1800:11030,	1900:11270,	2000:11509},
		1100 : {900:8593,	1000:8902,	1100:9154,	1200:9408,	1300:9661,	1400:10569,	1500:10821,	1600:11075,	1700:11164,	1800:11418,	1900:11671,	2000:11923},
		1200 : {900:8905,	1000:9227,	1100:9492,	1200:9759,	1300:10025,	1400:10946,	1500:11211,	1600:11478,	1700:11580,	1800:11847,	1900:12113,	2000:12378},
		1300 : {900:9218,	1000:9553,	1100:9831,	1200:10111,	1300:10390,	1400:11324,	1500:11602,	1600:11882,	1700:11997,	1800:12277,	1900:12556,	2000:12834},
		1400 : {900:9533,	1000:9880,	1100:10171,	1200:10464,	1300:10756,	1400:11703,	1500:11994,	1600:12287,	1700:12415,	1800:12709,	1900:13000,	2000:13291},
		1500 : {900:9845,	1000:10206,	1100:10509,	1200:10816,	1300:11120,	1400:12080,	1500:12384,	1600:12691,	1700:12831,	1800:13138,	1900:13442,	2000:13746},
		1600 : {900:9802,	1000:10176,	1100:10493,	1200:10812,	1300:11129,	1400:12102,	1500:12419,	1600:12739,	1700:12892,	1800:13212,	1900:13529,	2000:13846},
		1700 : {900:10116,	1000:10503,	1100:10833,	1200:11165,	1300:11496,	1400:12482,	1500:12811,	1600:13144,	1700:13311,	1800:13643,	1900:13974,	2000:14303},
		1800 : {900:10581,	1000:10980,	1100:11323,	1200:11668,	1300:12012,	1400:13011,	1500:13354,	1600:13699,	1700:13879,	1800:14224,	1900:14568,	2000:14910},
		1900 : {900:10894,	1000:11307,	1100:11662,	1200:12020,	1300:12377,	1400:13389,	1500:13745,	1600:14103,	1700:14296,	1800:14654,	1900:15011,	2000:15366},
		2000 : {900:11993,	1000:12419,	1100:12788,	1200:13159,	1300:13528,	1400:14553,	1500:14922,	1600:15293,	1700:15499,	1800:15870,	1900:16240,	2000:16609}
	},
	'213-2' : {
		500 : {900:6776,	1000:6917,	1100:7056,	1200:7197,	1300:7336,	1400:8131,	1500:8270,	1600:8411,	1700:8407,	1800:8588,	1900:8767,	2000:8945},
		600 : {900:7021,	1000:7163,	1100:7302,	1200:7443,	1300:7582,	1400:8414,	1500:8606,	1600:8800,	1700:8829,	1800:9022,	1900:9215,	2000:9406},
		700 : {900:7430,	1000:7571,	1100:7710,	1200:7894,	1300:8100,	1400:8960,	1500:9165,	1600:9372,	1700:9413,	1800:9620,	1900:9825,	2000:10030},
		800 : {900:7780,	1000:7921,	1100:8136,	1200:8355,	1300:8574,	1400:9447,	1500:9665,	1600:9885,	1700:9939,	1800:10159,	1900:10377,	2000:10595},
		900 : {900:8026,	1000:8249,	1100:8480,	1200:8712,	1300:8944,	1400:9830,	1500:10061,	1600:10294,	1700:10361,	1800:10594,	1900:10825,	2000:11056},
		1000 : {900:8487,	1000:8733,	1100:8977,	1200:9222,	1300:9467,	1400:10366,	1500:10610,	1600:10856,	1700:10936,	1800:11182,	1900:11426,	2000:11669},
		1100 : {900:8764,	1000:9023,	1100:9280,	1200:9539,	1300:9796,	1400:10708,	1500:10965,	1600:11224,	1700:11317,	1800:11576,	1900:11833,	2000:12089},
		1200 : {900:9082,	1000:9354,	1100:9624,	1200:9896,	1300:10166,	1400:11091,	1500:11361,	1600:11633,	1700:11739,	1800:12011,	1900:12281,	2000:12550},
		1300 : {900:9401,	1000:9686,	1100:9969,	1200:10253,	1300:10537,	1400:11475,	1500:11757,	1600:12042,	1700:12162,	1800:12446,	1900:12730,	2000:13012},
		1400 : {900:9722,	1000:10020,	1100:10315,	1200:10613,	1300:10909,	1400:11860,	1500:12156,	1600:12453,	1700:12586,	1800:12884,	1900:13180,	2000:13475},
		1500 : {900:10040,	1000:10351,	1100:10659,	1200:10970,	1300:11279,	1400:12243,	1500:12551,	1600:12862,	1700:13008,	1800:13318,	1900:13628,	2000:13936},
		1600 : {900:10579,	1000:10903,	1100:11224,	1200:11548,	1300:11870,	1400:12847,	1500:13169,	1600:13493,	1700:13651,	1800:13975,	1900:14297,	2000:14618},
		1700 : {900:10899,	1000:11236,	1100:11570,	1200:11907,	1300:12242,	1400:13232,	1500:13567,	1600:13904,	1700:14075,	1800:14412,	1900:14747,	2000:15081},
		1800 : {900:11369,	1000:11719,	1100:12066,	1200:12416,	1300:12764,	1400:13767,	1500:14115,	1600:14465,	1700:14649,	1800:14999,	1900:15347,	2000:15694},
		1900 : {900:11688,	1000:12051,	1100:12411,	1200:12774,	1300:13135,	1400:14151,	1500:14512,	1600:14874,	1700:15072,	1800:15434,	1900:15795,	2000:16156},
		2000 : {900:12217,	1000:12593,	1100:12966,	1200:13342,	1300:13716,	1400:14745,	1500:15118,	1600:15494,	1700:15704,	1800:16080,	1900:16454,	2000:16827}
	},
	'213-3' : {
		500 : {900:7532,	1000:7711,	1100:7891,	1200:8073,	1300:8253,	1400:9089,	1500:9269,	1600:9449,	1700:9466,	1800:9685,	1900:9908,	2000:10130},
		600 : {900:7834,	1000:8014,	1100:8194,	1200:8376,	1300:8556,	1400:9408,	1500:9645,	1600:9882,	1700:9957,	1800:10196,	1900:10433,	2000:10671},
		700 : {900:8299,	1000:8479,	1100:8659,	1200:8863,	1300:9115,	1400:10023,	1500:10274,	1600:10526,	1700:10615,	1800:10869,	1900:11121,	2000:11373},
		800 : {900:8704,	1000:8884,	1100:9120,	1200:9389,	1300:9655,	1400:10578,	1500:10844,	1600:11110,	1700:11214,	1800:11483,	1900:11749,	2000:12015},
		900 : {900:9007,	1000:9249,	1100:9530,	1200:9813,	1300:10094,	1400:11031,	1500:11312,	1600:11593,	1700:11711,	1800:11994,	1900:12275,	2000:12555},
		1000 : {900:9501,	1000:9797,	1100:10092,	1200:10390,	1300:10685,	1400:11636,	1500:11932,	1600:12227,	1700:12360,	1800:12657,	1900:12953,	2000:13248},
		1100 : {900:9839,	1000:10149,	1100:10459,	1200:10771,	1300:11081,	1400:12047,	1500:12357,	1600:12666,	1700:12813,	1800:13125,	1900:13435,	2000:13745},
		1200 : {900:10220,	1000:10544,	1100:10868,	1200:11195,	1300:11519,	1400:12500,	1500:12824,	1600:13149,	1700:13310,	1800:13637,	1900:13961,	2000:14285},
		1300 : {900:10600,	1000:10939,	1100:11278,	1200:11619,	1300:11958,	1400:12953,	1500:13292,	1600:13631,	1700:13807,	1800:14148,	1900:14487,	2000:14826},
		1400 : {900:10981,	1000:11335,	1100:11688,	1200:12044,	1300:12397,	1400:13406,	1500:13760,	1600:14113,	1700:14304,	1800:14659,	1900:15013,	2000:15366},
		1500 : {900:11362,	1000:11730,	1100:12098,	1200:12468,	1300:12836,	1400:13860,	1500:14227,	1600:14595,	1700:14800,	1800:15171,	1900:15538,	2000:15906},
		1600 : {900:11963,	1000:12345,	1100:12728,	1200:13112,	1300:13495,	1400:14533,	1500:14916,	1600:15298,	1700:15517,	1800:15902,	1900:16285,	2000:16667},
		1700 : {900:12344,	1000:12740,	1100:13137,	1200:13537,	1300:13933,	1400:14986,	1500:15383,	1600:15780,	1700:16014,	1800:16413,	1900:16810,	2000:17207},
		1800 : {900:12876,	1000:13288,	1100:13699,	1200:14113,	1300:14524,	1400:15592,	1500:16003,	1600:16415,	1700:16663,	1800:17077,	1900:17488,	2000:17900},
		1900 : {900:13257,	1000:13683,	1100:14109,	1200:14537,	1300:14963,	1400:16045,	1500:16471,	1600:16897,	1700:17160,	1800:17588,	1900:18014,	2000:18440},
		2000 : {900:13846,	1000:14287,	1100:14727,	1200:15170,	1300:15610,	1400:16707,	1500:17147,	1600:17588,	1700:17865,	1800:18308,	1900:18748,	2000:19189}
	},
	'214-1' : {
		500 : {900:6163,	1000:6394,	1100:6568,	1200:6744,	1300:6919,	1400:7093,	1500:7267,	1600:7443,	1700:7617,	1800:7794,	1900:7969,	2000:8143},
		600 : {900:6475,	1000:6719,	1100:6906,	1200:7095,	1300:7283,	1400:7470,	1500:7657,	1600:7847,	1700:8033,	1800:8223,	1900:8411,	2000:8598},
		700 : {900:6786,	1000:7043,	1100:7243,	1200:7446,	1300:7646,	1400:7846,	1500:8046,	1600:8249,	1700:8449,	1800:8651,	1900:8852,	2000:9052},
		800 : {900:7544,	1000:7814,	1100:8027,	1200:8242,	1300:8456,	1400:9325,	1500:9538,	1600:9754,	1700:9804,	1800:10019,	1900:10233,	2000:10446},
		900 : {900:7856,	1000:8139,	1100:8365,	1200:8593,	1300:8820,	1400:9702,	1500:9928,	1600:10157,	1700:10220,	1800:10448,	1900:10675,	2000:10901},
		1000 : {900:8321,	1000:8617,	1100:8856,	1200:9097,	1300:9337,	1400:10232,	1500:10471,	1600:10713,	1700:10789,	1800:11030,	1900:11270,	2000:11509},
		1100 : {900:8593,	1000:8902,	1100:9154,	1200:9408,	1300:9661,	1400:10569,	1500:10821,	1600:11075,	1700:11164,	1800:11418,	1900:11671,	2000:11923},
		1200 : {900:8905,	1000:9227,	1100:9492,	1200:9759,	1300:10025,	1400:10946,	1500:11211,	1600:11478,	1700:11580,	1800:11847,	1900:12113,	2000:12378},
		1300 : {900:9218,	1000:9553,	1100:9831,	1200:10111,	1300:10390,	1400:11324,	1500:11602,	1600:11882,	1700:11997,	1800:12277,	1900:12556,	2000:12834},
		1400 : {900:9533,	1000:9880,	1100:10171,	1200:10464,	1300:10756,	1400:11703,	1500:11994,	1600:12287,	1700:12415,	1800:12709,	1900:13000,	2000:13291},
		1500 : {900:9845,	1000:10206,	1100:10509,	1200:10816,	1300:11120,	1400:12080,	1500:12384,	1600:12691,	1700:12831,	1800:13138,	1900:13442,	2000:13746},
		1600 : {900:9802,	1000:10176,	1100:10493,	1200:10812,	1300:11129,	1400:12102,	1500:12419,	1600:12739,	1700:12892,	1800:13212,	1900:13529,	2000:13846},
		1700 : {900:10116,	1000:10503,	1100:10833,	1200:11165,	1300:11496,	1400:12482,	1500:12811,	1600:13144,	1700:13311,	1800:13643,	1900:13974,	2000:14303},
		1800 : {900:10581,	1000:10980,	1100:11323,	1200:11668,	1300:12012,	1400:13011,	1500:13354,	1600:13699,	1700:13879,	1800:14224,	1900:14568,	2000:14910},
		1900 : {900:10894,	1000:11307,	1100:11662,	1200:12020,	1300:12377,	1400:13389,	1500:13745,	1600:14103,	1700:14296,	1800:14654,	1900:15011,	2000:15366},
		2000 : {900:11993,	1000:12419,	1100:12788,	1200:13159,	1300:13528,	1400:14553,	1500:14922,	1600:15293,	1700:15499,	1800:15870,	1900:16240,	2000:16609}
	},
	'214-2' : {
		500 : {900:6776,	1000:6917,	1100:7056,	1200:7197,	1300:7336,	1400:8131,	1500:8270,	1600:8411,	1700:8407,	1800:8588,	1900:8767,	2000:8945},
		600 : {900:7021,	1000:7163,	1100:7302,	1200:7443,	1300:7582,	1400:8414,	1500:8606,	1600:8800,	1700:8829,	1800:9022,	1900:9215,	2000:9406},
		700 : {900:7430,	1000:7571,	1100:7710,	1200:7894,	1300:8100,	1400:8960,	1500:9165,	1600:9372,	1700:9413,	1800:9620,	1900:9825,	2000:10030},
		800 : {900:7780,	1000:7921,	1100:8136,	1200:8355,	1300:8574,	1400:9447,	1500:9665,	1600:9885,	1700:9939,	1800:10159,	1900:10377,	2000:10595},
		900 : {900:8026,	1000:8249,	1100:8480,	1200:8712,	1300:8944,	1400:9830,	1500:10061,	1600:10294,	1700:10361,	1800:10594,	1900:10825,	2000:11056},
		1000 : {900:8487,	1000:8733,	1100:8977,	1200:9222,	1300:9467,	1400:10366,	1500:10610,	1600:10856,	1700:10936,	1800:11182,	1900:11426,	2000:11669},
		1100 : {900:8764,	1000:9023,	1100:9280,	1200:9539,	1300:9796,	1400:10708,	1500:10965,	1600:11224,	1700:11317,	1800:11576,	1900:11833,	2000:12089},
		1200 : {900:9082,	1000:9354,	1100:9624,	1200:9896,	1300:10166,	1400:11091,	1500:11361,	1600:11633,	1700:11739,	1800:12011,	1900:12281,	2000:12550},
		1300 : {900:9401,	1000:9686,	1100:9969,	1200:10253,	1300:10537,	1400:11475,	1500:11757,	1600:12042,	1700:12162,	1800:12446,	1900:12730,	2000:13012},
		1400 : {900:9722,	1000:10020,	1100:10315,	1200:10613,	1300:10909,	1400:11860,	1500:12156,	1600:12453,	1700:12586,	1800:12884,	1900:13180,	2000:13475},
		1500 : {900:10040,	1000:10351,	1100:10659,	1200:10970,	1300:11279,	1400:12243,	1500:12551,	1600:12862,	1700:13008,	1800:13318,	1900:13628,	2000:13936},
		1600 : {900:10579,	1000:10903,	1100:11224,	1200:11548,	1300:11870,	1400:12847,	1500:13169,	1600:13493,	1700:13651,	1800:13975,	1900:14297,	2000:14618},
		1700 : {900:10899,	1000:11236,	1100:11570,	1200:11907,	1300:12242,	1400:13232,	1500:13567,	1600:13904,	1700:14075,	1800:14412,	1900:14747,	2000:15081},
		1800 : {900:11369,	1000:11719,	1100:12066,	1200:12416,	1300:12764,	1400:13767,	1500:14115,	1600:14465,	1700:14649,	1800:14999,	1900:15347,	2000:15694},
		1900 : {900:11688,	1000:12051,	1100:12411,	1200:12774,	1300:13135,	1400:14151,	1500:14512,	1600:14874,	1700:15072,	1800:15434,	1900:15795,	2000:16156},
		2000 : {900:12217,	1000:12593,	1100:12966,	1200:13342,	1300:13716,	1400:14745,	1500:15118,	1600:15494,	1700:15704,	1800:16080,	1900:16454,	2000:16827}
	},
	'214-3' : {
		500 : {900:7532,	1000:7711,	1100:7891,	1200:8073,	1300:8253,	1400:9089,	1500:9269,	1600:9449,	1700:9466,	1800:9685,	1900:9908,	2000:10130},
		600 : {900:7834,	1000:8014,	1100:8194,	1200:8376,	1300:8556,	1400:9408,	1500:9645,	1600:9882,	1700:9957,	1800:10196,	1900:10433,	2000:10671},
		700 : {900:8299,	1000:8479,	1100:8659,	1200:8863,	1300:9115,	1400:10023,	1500:10274,	1600:10526,	1700:10615,	1800:10869,	1900:11121,	2000:11373},
		800 : {900:8704,	1000:8884,	1100:9120,	1200:9389,	1300:9655,	1400:10578,	1500:10844,	1600:11110,	1700:11214,	1800:11483,	1900:11749,	2000:12015},
		900 : {900:9007,	1000:9249,	1100:9530,	1200:9813,	1300:10094,	1400:11031,	1500:11312,	1600:11593,	1700:11711,	1800:11994,	1900:12275,	2000:12555},
		1000 : {900:9501,	1000:9797,	1100:10092,	1200:10390,	1300:10685,	1400:11636,	1500:11932,	1600:12227,	1700:12360,	1800:12657,	1900:12953,	2000:13248},
		1100 : {900:9839,	1000:10149,	1100:10459,	1200:10771,	1300:11081,	1400:12047,	1500:12357,	1600:12666,	1700:12813,	1800:13125,	1900:13435,	2000:13745},
		1200 : {900:10220,	1000:10544,	1100:10868,	1200:11195,	1300:11519,	1400:12500,	1500:12824,	1600:13149,	1700:13310,	1800:13637,	1900:13961,	2000:14285},
		1300 : {900:10600,	1000:10939,	1100:11278,	1200:11619,	1300:11958,	1400:12953,	1500:13292,	1600:13631,	1700:13807,	1800:14148,	1900:14487,	2000:14826},
		1400 : {900:10981,	1000:11335,	1100:11688,	1200:12044,	1300:12397,	1400:13406,	1500:13760,	1600:14113,	1700:14304,	1800:14659,	1900:15013,	2000:15366},
		1500 : {900:11362,	1000:11730,	1100:12098,	1200:12468,	1300:12836,	1400:13860,	1500:14227,	1600:14595,	1700:14800,	1800:15171,	1900:15538,	2000:15906},
		1600 : {900:11963,	1000:12345,	1100:12728,	1200:13112,	1300:13495,	1400:14533,	1500:14916,	1600:15298,	1700:15517,	1800:15902,	1900:16285,	2000:16667},
		1700 : {900:12344,	1000:12740,	1100:13137,	1200:13537,	1300:13933,	1400:14986,	1500:15383,	1600:15780,	1700:16014,	1800:16413,	1900:16810,	2000:17207},
		1800 : {900:12876,	1000:13288,	1100:13699,	1200:14113,	1300:14524,	1400:15592,	1500:16003,	1600:16415,	1700:16663,	1800:17077,	1900:17488,	2000:17900},
		1900 : {900:13257,	1000:13683,	1100:14109,	1200:14537,	1300:14963,	1400:16045,	1500:16471,	1600:16897,	1700:17160,	1800:17588,	1900:18014,	2000:18440},
		2000 : {900:13846,	1000:14287,	1100:14727,	1200:15170,	1300:15610,	1400:16707,	1500:17147,	1600:17588,	1700:17865,	1800:18308,	1900:18748,	2000:19189}
	},
	'31-1' : {
		600 : {1400:6569,	1500:6751,	1600:6935,	1700:7117,	1800:7301,	1900:7485,	2000:7667,	2100:7849,	2200:8032,	2300:8214,	2400:8399,	2500:8582,	2600:8764,	2700:8947,	2800:9130,	2900:9312,	3000:9497},
		700 : {1400:6987,	1500:7182,	1600:7378,	1700:7573,	1800:7771,	1900:7967,	2000:8162,	2100:8358,	2200:8554,	2300:8749,	2400:8946,	2500:9143,	2600:9338,	2700:9533,	2800:9729,	2900:9924,	3000:10122},
		800 : {1400:7404,	1500:7613,	1600:7822,	1700:8030,	1800:8240,	1900:8450,	2000:8658,	2100:8866,	2200:9075,	2300:9283,	2400:9494,	2500:9703,	2600:9911,	2700:10119,	2800:10329,	2900:10537,	3000:10747},
		900 : {1400:7821,	1500:8042,	1600:8264,	1700:8486,	1800:8709,	1900:8931,	2000:9152,	2100:9374,	2200:9596,	2300:9817,	2400:10040,	2500:10263,	2600:10484,	2700:10705,	2800:10927,	2900:11148,	3000:11372},
		1000 : {1400:8239,	1500:8473,	1600:8708,	1700:8942,	1800:9179,	1900:9414,	2000:9648,	2100:9882,	2200:10117,	2300:10351,	2400:10588,	2500:10823,	2600:11057,	2700:11291,	2800:11526,	2900:11761,	3000:11997},
		1100 : {1400:8656,	1500:8903,	1600:9151,	1700:9399,	1800:9648,	1900:9896,	2000:10143,	2100:10391,	2200:10639,	2300:10886,	2400:11135,	2500:11383,	2600:11631,	2700:11878,	2800:12126,	2900:12373,	3000:12622},
		1200 : {1400:9073,	1500:9333,	1600:9594,	1700:9854,	1800:10117,	1900:10378,	2000:10638,	2100:10898,	2200:11159,	2300:11419,	2400:11682,	2500:11943,	2600:12203,	2700:12463,	2800:12724,	2900:12984,	3000:13247},
		1300 : {1400:9491,	1500:9764,	1600:10038,	1700:10311,	1800:10586,	1900:10860,	2000:11133,	2100:11407,	2200:11681,	2300:11954,	2400:12229,	2500:12503,	2600:12776,	2700:13050,	2800:13324,	2900:13597,	3000:13872},
		1400 : {1400:9908,	1500:10194,	1600:10481,	1700:10767,	1800:11056,	1900:11343,	2000:11629,	2100:11915,	2200:12202,	2300:12488,	2400:12777,	2500:13064,	2600:13350,	2700:13636,	2800:13923,	2900:14209,	3000:14497},
		1500 : {1400:10325,	1500:10624,	1600:10924,	1700:11223,	1800:11524,	1900:11824,	2000:12124,	2100:12423,	2200:12723,	2300:13022,	2400:13323,	2500:13623,	2600:13922,	2700:14221,	2800:14521,	2900:14820,	3000:15122},
		1600 : {1400:10742,	1500:11055,	1600:11368,	1700:11680,	1800:11994,	1900:12307,	2000:12619,	2100:12931,	2200:13244,	2300:13556,	2400:13871,	2500:14184,	2600:14496,	2700:14808,	2800:15121,	2900:15433,	3000:15747},
		1700 : {1400:11160,	1500:11485,	1600:11811,	1700:12136,	1800:12464,	1900:12789,	2000:13115,	2100:13440,	2200:13766,	2300:14091,	2400:14418,	2500:14744,	2600:15069,	2700:15394,	2800:15720,	2900:16045,	3000:16372},
		1800 : {1400:11577,	1500:11915,	1600:12254,	1700:12592,	1800:12932,	1900:13271,	2000:13609,	2100:13947,	2200:14286,	2300:14624,	2400:14965,	2500:15303,	2600:15642,	2700:15980,	2800:16319,	2900:16657,	3000:16997},
		1900 : {1400:11994,	1500:12345,	1600:12697,	1700:13048,	1800:13402,	1900:13754,	2000:14105,	2100:14456,	2200:14808,	2300:15159,	2400:15512,	2500:15864,	2600:16215,	2700:16566,	2800:16918,	2900:17269,	3000:17622},
		2000 : {1400:12412,	1500:12776,	1600:13141,	1700:13505,	1800:13871,	1900:14236,	2000:14600,	2100:14964,	2200:15329,	2300:15693,	2400:16059,	2500:16424,	2600:16788,	2700:17152,	2800:17517,	2900:17881,	3000:18248}
	},
	'31-2' : {
		600 : {1400:6763,	1500:6951,	1600:7141,	1700:7329,	1800:7520,	1900:7710,	2000:7898,	2100:8087,	2200:8277,	2300:8465,	2400:8656,	2500:8846,	2600:9034,	2700:9223,	2800:9412,	2900:9601,	3000:9792},
		700 : {1400:7192,	1500:7393,	1600:7596,	1700:7797,	1800:8001,	1900:8204,	2000:8405,	2100:8607,	2200:8809,	2300:9011,	2400:9215,	2500:9417,	2600:9619,	2700:9821,	2800:10023,	2900:10225,	3000:10429},
		800 : {1400:7621,	1500:7835,	1600:8051,	1700:8265,	1800:8482,	1900:8698,	2000:8912,	2100:9127,	2200:9342,	2300:9557,	2400:9774,	2500:9989,	2600:10204,	2700:10418,	2800:10634,	2900:10849,	3000:11065},
		900 : {1400:8049,	1500:8276,	1600:8505,	1700:8732,	1800:8962,	1900:9191,	2000:9418,	2100:9646,	2200:9874,	2300:10102,	2400:10332,	2500:10560,	2600:10788,	2700:11015,	2800:11244,	2900:11471,	3000:11701},
		1000 : {1400:8478,	1500:8718,	1600:8960,	1700:9200,	1800:9443,	1900:9685,	2000:9925,	2100:10166,	2200:10407,	2300:10648,	2400:10891,	2500:11132,	2600:11373,	2700:11613,	2800:11855,	2900:12095,	3000:12338},
		1100 : {1400:8907,	1500:9160,	1600:9415,	1700:9668,	1800:9924,	1900:10178,	2000:10432,	2100:10686,	2200:10940,	2300:11194,	2400:11449,	2500:11704,	2600:11957,	2700:12211,	2800:12465,	2900:12719,	3000:12975},
		1200 : {1400:9335,	1500:9601,	1600:9869,	1700:10135,	1800:10404,	1900:10672,	2000:10938,	2100:11205,	2200:11472,	2300:11739,	2400:12007,	2500:12275,	2600:12541,	2700:12808,	2800:13075,	2900:13342,	3000:13610},
		1300 : {1400:9764,	1500:10043,	1600:10324,	1700:10603,	1800:10885,	1900:11165,	2000:11445,	2100:11724,	2200:12005,	2300:12284,	2400:12566,	2500:12847,	2600:13126,	2700:13406,	2800:13686,	2900:13965,	3000:14247},
		1400 : {1400:10193,	1500:10485,	1600:10779,	1700:11071,	1800:11366,	1900:11659,	2000:11952,	2100:12244,	2200:12538,	2300:12830,	2400:13125,	2500:13418,	2600:13711,	2700:14003,	2800:14297,	2900:14589,	3000:14884},
		1500 : {1400:10621,	1500:10926,	1600:11233,	1700:11538,	1800:11846,	1900:12152,	2000:12458,	2100:12763,	2200:13070,	2300:13375,	2400:13683,	2500:13989,	2600:14295,	2700:14600,	2800:14907,	2900:15212,	3000:15520},
		1600 : {1400:11050,	1500:11368,	1600:11688,	1700:12006,	1800:12327,	1900:12646,	2000:12965,	2100:13283,	2200:13603,	2300:13921,	2400:14242,	2500:14561,	2600:14880,	2700:15198,	2800:15517,	2900:15836,	3000:16156},
		1700 : {1400:11479,	1500:11810,	1600:12143,	1700:12474,	1800:12808,	1900:13140,	2000:13472,	2100:13803,	2200:14135,	2300:14467,	2400:14801,	2500:15133,	2600:15464,	2700:15796,	2800:16128,	2900:16459,	3000:16793},
		1800 : {1400:11907,	1500:12252,	1600:12597,	1700:12941,	1800:13288,	1900:13633,	2000:13978,	2100:14322,	2200:14667,	2300:15012,	2400:15358,	2500:15704,	2600:16048,	2700:16393,	2800:16738,	2900:17082,	3000:17429},
		1900 : {1400:12336,	1500:12694,	1600:13052,	1700:13409,	1800:13769,	1900:14127,	2000:14485,	2100:14842,	2200:15200,	2300:15558,	2400:15917,	2500:16276,	2600:16633,	2700:16990,	2800:17349,	2900:17706,	3000:18066},
		2000 : {1400:12765,	1500:13136,	1600:13507,	1700:13877,	1800:14250,	1900:14621,	2000:14991,	2100:15362,	2200:15733,	2300:16103,	2400:16476,	2500:16847,	2600:17218,	2700:17588,	2800:17959,	2900:18330,	3000:18702}
	},
	'31-3' : {
		600 : {1400:8135,	1500:8385,	1600:8634,	1700:8884,	1800:9136,	1900:9385,	2000:9635,	2100:9884,	2200:10134,	2300:10383,	2400:10635,	2500:10885,	2600:11134,	2700:11384,	2800:11634,	2900:11883,	3000:12135},
		700 : {1400:8699,	1500:8963,	1600:9227,	1700:9491,	1800:9757,	1900:10021,	2000:10285,	2100:10549,	2200:10813,	2300:11077,	2400:11344,	2500:11608,	2600:11872,	2700:12136,	2800:12400,	2900:12664,	3000:12931},
		800 : {1400:9262,	1500:9540,	1600:9819,	1700:10098,	1800:10378,	1900:10657,	2000:10936,	2100:11214,	2200:11493,	2300:11771,	2400:12052,	2500:12331,	2600:12609,	2700:12888,	2800:13167,	2900:13445,	3000:13726},
		900 : {1400:9825,	1500:10118,	1600:10411,	1700:10705,	1800:11000,	1900:11293,	2000:11586,	2100:11879,	2200:12172,	2300:12465,	2400:12761,	2500:13054,	2600:13347,	2700:13640,	2800:13933,	2900:14226,	3000:14522},
		1000 : {1400:10389,	1500:10696,	1600:11004,	1700:11311,	1800:11621,	1900:11929,	2000:12236,	2100:12544,	2200:12852,	2300:13159,	2400:13469,	2500:13777,	2600:14084,	2700:14392,	2800:14699,	2900:15007,	3000:15317},
		1100 : {1400:10952,	1500:11274,	1600:11596,	1700:11918,	1800:12243,	1900:12565,	2000:12887,	2100:13209,	2200:13531,	2300:13853,	2400:14178,	2500:14500,	2600:14822,	2700:15144,	2800:15466,	2900:15788,	3000:16112},
		1200 : {1400:11515,	1500:11852,	1600:12189,	1700:12525,	1800:12864,	1900:13201,	2000:13537,	2100:13874,	2200:14211,	2300:14547,	2400:14886,	2500:15223,	2600:15559,	2700:15896,	2800:16232,	2900:16569,	3000:16908},
		1300 : {1400:12079,	1500:12430,	1600:12781,	1700:13132,	1800:13486,	1900:13837,	2000:14188,	2100:14539,	2200:14890,	2300:15241,	2400:15594,	2500:15946,	2600:16297,	2700:16648,	2800:16999,	2900:17350,	3000:17703},
		1400 : {1400:12642,	1500:13008,	1600:13373,	1700:13739,	1800:14107,	1900:14473,	2000:14838,	2100:15204,	2200:15569,	2300:15935,	2400:16303,	2500:16669,	2600:17034,	2700:17400,	2800:17765,	2900:18131,	3000:18499},
		1500 : {1400:13206,	1500:13586,	1600:13966,	1700:14346,	1800:14728,	1900:15108,	2000:15489,	2100:15869,	2200:16249,	2300:16629,	2400:17011,	2500:17391,	2600:17772,	2700:18152,	2800:18532,	2900:18912,	3000:19294},
		1600 : {1400:13769,	1500:14164,	1600:14558,	1700:14953,	1800:15350,	1900:15744,	2000:16139,	2100:16534,	2200:16928,	2300:17323,	2400:17720,	2500:18114,	2600:18509,	2700:18904,	2800:19298,	2900:19693,	3000:20090},
		1700 : {1400:14332,	1500:14741,	1600:15151,	1700:15560,	1800:15971,	1900:16380,	2000:16789,	2100:17199,	2200:17608,	2300:18017,	2400:18428,	2500:18837,	2600:19247,	2700:19656,	2800:20065,	2900:20474,	3000:20885},
		1800 : {1400:14896,	1500:15319,	1600:15743,	1700:16167,	1800:16593,	1900:17016,	2000:17440,	2100:17863,	2200:18287,	2300:18711,	2400:19137,	2500:19560,	2600:19984,	2700:20408,	2800:20831,	2900:21255,	3000:21681},
		1900 : {1400:15459,	1500:15897,	1600:16335,	1700:16774,	1800:17214,	1900:17652,	2000:18090,	2100:18528,	2200:18967,	2300:19405,	2400:19845,	2500:20283,	2600:20722,	2700:21160,	2800:21598,	2900:22036,	3000:22476},
		2000 : {1400:16022,	1500:16475,	1600:16928,	1700:17380,	1800:17835,	1900:18288,	2000:18741,	2100:19193,	2200:19646,	2300:20099,	2400:20554,	2500:21006,	2600:21459,	2700:21912,	2800:22364,	2900:22817,	3000:23272}
	},
	'32-1' : {
		600 : {1400:6709,	1500:6858,	1600:7012,	1700:7166,	1800:7321,	1900:7475,	2000:7629,	2100:8001,	2200:8155,	2300:8310,	2400:8461,	2500:8575,	2600:8728,	2700:8931,	2800:9086,	2900:9240,	3000:9391},
		700 : {1400:7084,	1500:7246,	1600:7413,	1700:7580,	1800:7747,	1900:7915,	2000:8082,	2100:8466,	2200:8634,	2300:8802,	2400:8965,	2500:9092,	2600:9259,	2700:9475,	2800:9642,	2900:9809,	3000:9973},
		800 : {1400:7499,	1500:7674,	1600:7855,	1700:8034,	1800:8215,	1900:8395,	2000:8575,	2100:8973,	2200:9153,	2300:9334,	2400:9511,	2500:9651,	2600:9830,	2700:10059,	2800:10240,	2900:10419,	3000:10596},
		900 : {1400:7985,	1500:8173,	1600:8367,	1700:8559,	1800:8753,	1900:8946,	2000:9139,	2100:9550,	2200:9743,	2300:9937,	2400:10127,	2500:10279,	2600:10472,	2700:10714,	2800:10907,	2900:11100,	3000:11290},
		1000 : {1400:8349,	1500:8550,	1600:8756,	1700:8962,	1800:9168,	1900:9375,	2000:9580,	2100:10004,	2200:10211,	2300:10417,	2400:10620,	2500:10786,	2600:10991,	2700:11246,	2800:11453,	2900:11658,	3000:11861},
		1100 : {1400:8692,	1500:8906,	1600:9125,	1700:9344,	1800:9563,	1900:9783,	2000:10001,	2100:10438,	2200:10657,	2300:10877,	2400:11093,	2500:11272,	2600:11490,	2700:11758,	2800:11977,	2900:12196,	3000:12412},
		1200 : {1400:9086,	1500:9313,	1600:9545,	1700:9777,	1800:10009,	1900:10242,	2000:10473,	2100:10923,	2200:11155,	2300:11388,	2400:11617,	2500:11809,	2600:12040,	2700:12321,	2800:12553,	2900:12785,	3000:13014},
		1300 : {1400:9450,	1500:9689,	1600:9935,	1700:10179,	1800:10425,	1900:10670,	2000:10915,	2100:11377,	2200:11623,	2300:11868,	2400:12110,	2500:12315,	2600:12560,	2700:12853,	2800:13099,	2900:13343,	3000:13585},
		1400 : {1400:9814,	1500:10067,	1600:10325,	1700:10583,	1800:10841,	1900:11100,	2000:11357,	2100:11833,	2200:12091,	2300:12350,	2400:12604,	2500:12822,	2600:13080,	2700:13387,	2800:13645,	2900:13903,	3000:14157},
		1500 : {1400:10202,	1500:10467,	1600:10738,	1700:11009,	1800:11280,	1900:11552,	2000:11822,	2100:12311,	2200:12582,	2300:12854,	2400:13122,	2500:13352,	2600:13623,	2700:13943,	2800:14214,	2900:14485,	3000:14752},
		1600 : {1400:10674,	1500:10953,	1600:11237,	1700:11521,	1800:11805,	1900:12089,	2000:12373,	2100:12875,	2200:13159,	2300:13444,	2400:13724,	2500:13968,	2600:14251,	2700:14584,	2800:14869,	2900:15152,	3000:15433},
		1700 : {1400:11114,	1500:11406,	1600:11703,	1700:12000,	1800:12297,	1900:12594,	2000:12891,	2100:13405,	2200:13703,	2300:14000,	2400:14294,	2500:14551,	2600:14847,	2700:15193,	2800:15490,	2900:15787,	3000:16080},
		1800 : {1400:11477,	1500:11781,	1600:12092,	1700:12401,	1800:12711,	1900:13022,	2000:13331,	2100:13859,	2200:14169,	2300:14480,	2400:14786,	2500:15056,	2600:15366,	2700:15724,	2800:16035,	2900:16344,	3000:16651},
		1900 : {1400:11841,	1500:12158,	1600:12481,	1700:12804,	1800:13127,	1900:13450,	2000:13773,	2100:14313,	2200:14637,	2300:14960,	2400:15280,	2500:15562,	2600:15885,	2700:16257,	2800:16580,	2900:16902,	3000:17222},
		2000 : {1400:12310,	1500:12641,	1600:12977,	1700:13312,	1800:13649,	1900:13985,	2000:14320,	2100:14874,	2200:15210,	2300:15547,	2400:15879,	2500:16175,	2600:16510,	2700:16895,	2800:17231,	2900:17567,	3000:17900}
	},
	'32-2' : {
		600 : {1400:6959,	1500:7100,	1600:7237,	1700:7256,	1800:7525,	1900:7662,	2000:7693,	2100:8198,	2200:8353,	2300:8512,	2400:8673,	2500:8787,	2600:8600,	2700:9159,	2800:9313,	2900:9472,	3000:9633},
		700 : {1400:7301,	1500:7451,	1600:7597,	1700:7638,	1800:7938,	1900:8106,	2000:8155,	2100:8672,	2200:8840,	2300:9012,	2400:9186,	2500:9313,	2600:9139,	2700:9711,	2800:9878,	2900:10050,	3000:10224},
		800 : {1400:7684,	1500:7858,	1600:8039,	1700:8101,	1800:8414,	1900:8595,	2000:8657,	2100:9187,	2200:9368,	2300:9553,	2400:9740,	2500:9880,	2600:9719,	2700:10303,	2800:10484,	2900:10669,	3000:10856},
		900 : {1400:8168,	1500:8366,	1600:8559,	1700:8635,	1800:8961,	1900:9154,	2000:9229,	2100:9773,	2200:9966,	2300:10165,	2400:10364,	2500:10517,	2600:10369,	2700:10967,	2800:11160,	2900:11358,	3000:11558},
		1000 : {1400:8540,	1500:8751,	1600:8957,	1700:9046,	1800:9385,	1900:9591,	2000:9679,	2100:10235,	2200:10442,	2300:10653,	2400:10866,	2500:11032,	2600:10897,	2700:11508,	2800:11714,	2900:11925,	3000:12138},
		1100 : {1400:8892,	1500:9115,	1600:9335,	1700:9436,	1800:9788,	1900:10007,	2000:10108,	2100:10678,	2200:10897,	2300:11122,	2400:11348,	2500:11526,	2600:11404,	2700:12028,	2800:12247,	2900:12471,	3000:12697},
		1200 : {1400:9299,	1500:9536,	1600:9768,	1700:9883,	1800:10247,	1900:10480,	2000:10594,	2100:11176,	2200:11409,	2300:11646,	2400:11885,	2500:12077,	2600:11967,	2700:12604,	2800:12836,	2900:13073,	3000:13312},
		1300 : {1400:9671,	1500:9921,	1600:10166,	1700:10294,	1800:10671,	1900:10917,	2000:11044,	2100:11639,	2200:11884,	2300:12135,	2400:12387,	2500:12592,	2600:12495,	2700:13145,	2800:13390,	2900:13640,	3000:13892},
		1400 : {1400:10044,	1500:10307,	1600:10565,	1700:10706,	1800:11096,	1900:11355,	2000:11494,	2100:12103,	2200:12361,	2300:12625,	2400:12890,	2500:13107,	2600:13024,	2700:13687,	2800:13945,	2900:14208,	3000:14472},
		1500 : {1400:10436,	1500:10711,	1600:10982,	1700:11136,	1800:11539,	1900:11811,	2000:11963,	2100:12585,	2200:12856,	2300:13133,	2400:13411,	2500:13641,	2600:13571,	2700:14247,	2800:14518,	2900:14793,	3000:15071},
		1600 : {1400:10918,	1500:11206,	1600:11491,	1700:11657,	1800:12073,	1900:12358,	2000:12524,	2100:13158,	2200:13442,	2300:13732,	2400:14023,	2500:14266,	2600:14209,	2700:14898,	2800:15182,	2900:15470,	3000:15761},
		1700 : {1400:11366,	1500:11668,	1600:11965,	1700:12144,	1800:12574,	1900:12871,	2000:13050,	2100:13697,	2200:13995,	2300:14297,	2400:14601,	2500:14857,	2600:14813,	2700:15515,	2800:15812,	2900:16114,	3000:16417},
		1800 : {1400:11737,	1500:12052,	1600:12362,	1700:12554,	1800:12997,	1900:13307,	2000:13499,	2100:14159,	2200:14470,	2300:14785,	2400:15102,	2500:15371,	2600:15340,	2700:16055,	2800:16365,	2900:16679,	3000:16996},
		1900 : {1400:12109,	1500:12437,	1600:12760,	1700:12965,	1800:13421,	1900:13744,	2000:13949,	2100:14622,	2200:14946,	2300:15274,	2400:15604,	2500:15886,	2600:15868,	2700:16595,	2800:16919,	2900:17246,	3000:17576},
		2000 : {1400:12587,	1500:12927,	1600:13263,	1700:13481,	1800:13950,	1900:14286,	2000:14504,	2100:15190,	2200:15527,	2300:15868,	2400:16211,	2500:16506,	2600:16501,	2700:17242,	2800:17578,	2900:17918,	3000:18261}
	},
	'32-3' : {
		600 : {1400:7779,	1500:7957,	1600:8134,	1700:8311,	1800:8495,	1900:8672,	2000:8851,	2100:9270,	2200:9467,	2300:9663,	2400:9862,	2500:10018,	2600:10214,	2700:10465,	2800:10662,	2900:10858,	3000:11057},
		700 : {1400:8195,	1500:8382,	1600:8569,	1700:8759,	1800:8976,	1900:9187,	2000:9398,	2100:9832,	2200:10043,	2300:10254,	2400:10467,	2500:10638,	2600:10849,	2700:11114,	2800:11325,	2900:11536,	3000:11749},
		800 : {1400:8650,	1500:8851,	1600:9077,	1700:9302,	1800:9534,	1900:9759,	2000:9985,	2100:10433,	2200:10659,	2300:10884,	2400:11112,	2500:11297,	2600:11523,	2700:11802,	2800:12028,	2900:12253,	3000:12481},
		900 : {1400:9198,	1500:9438,	1600:9678,	1700:9918,	1800:10164,	1900:10404,	2000:10644,	2100:11107,	2200:11347,	2300:11587,	2400:11829,	2500:12029,	2600:12269,	2700:12563,	2800:12803,	2900:13043,	3000:13285},
		1000 : {1400:9647,	1500:9901,	1600:10156,	1700:10410,	1800:10671,	1900:10925,	2000:11180,	2100:11658,	2200:11912,	2300:12167,	2400:12423,	2500:12637,	2600:12892,	2700:13201,	2800:13455,	2900:13710,	3000:13966},
		1100 : {1400:10074,	1500:10343,	1600:10612,	1700:10881,	1800:11156,	1900:11425,	2000:11694,	2100:12186,	2200:12455,	2300:12725,	2400:12996,	2500:13224,	2600:13493,	2700:13816,	2800:14085,	2900:14355,	3000:14626},
		1200 : {1400:10559,	1500:10843,	1600:11126,	1700:11410,	1800:11699,	1900:11983,	2000:12266,	2100:12773,	2200:13057,	2300:13340,	2400:13626,	2500:13869,	2600:14152,	2700:14490,	2800:14774,	2900:15057,	3000:15343},
		1300 : {1400:11008,	1500:11306,	1600:11604,	1700:11902,	1800:12206,	1900:12504,	2000:12802,	2100:13324,	2200:13622,	2300:13920,	2400:14220,	2500:14477,	2600:14775,	2700:15128,	2800:15426,	2900:15724,	3000:16024},
		1400 : {1400:11457,	1500:11770,	1600:12082,	1700:12395,	1800:12713,	1900:13026,	2000:13338,	2100:13874,	2200:14187,	2300:14499,	2400:14814,	2500:15086,	2600:15398,	2700:15765,	2800:16078,	2900:16390,	3000:16705},
		1500 : {1400:11926,	1500:12253,	1600:12580,	1700:12907,	1800:13240,	1900:13567,	2000:13894,	2100:14444,	2200:14771,	2300:15098,	2400:15428,	2500:15714,	2600:16041,	2700:16422,	2800:16750,	2900:17077,	3000:17406},
		1600 : {1400:12485,	1500:12827,	1600:13168,	1700:13510,	1800:13857,	1900:14199,	2000:14540,	2100:15105,	2200:15446,	2300:15788,	2400:16132,	2500:16433,	2600:16774,	2700:17170,	2800:17512,	2900:17853,	3000:18197},
		1700 : {1400:13009,	1500:13365,	1600:13721,	1700:14077,	1800:14439,	1900:14795,	2000:15151,	2100:15731,	2200:16087,	2300:16443,	2400:16801,	2500:17116,	2600:17473,	2700:17883,	2800:18239,	2900:18595,	3000:18953},
		1800 : {1400:13458,	1500:13829,	1600:14199,	1700:14570,	1800:14946,	1900:15317,	2000:15687,	2100:16281,	2200:16652,	2300:17022,	2400:17395,	2500:17725,	2600:18096,	2700:18520,	2800:18891,	2900:19262,	3000:19634},
		1900 : {1400:13907,	1500:14292,	1600:14677,	1700:15062,	1800:15453,	1900:15838,	2000:16223,	2100:16831,	2200:17217,	2300:17602,	2400:17989,	2500:18333,	2600:18718,	2700:19158,	2800:19543,	2900:19928,	3000:20315},
		2000 : {1400:14460,	1500:14860,	1600:15259,	1700:15659,	1800:16064,	1900:16464,	2000:16863,	2100:17486,	2200:17886,	2300:18285,	2400:18687,	2500:19046,	2600:19446,	2700:19900,	2800:20299,	2900:20699,	3000:21101}
	},
	'33-1' : {
		600 : {1400:6278,	1500:6426,	1600:6581,	1700:6735,	1800:6886,	1900:7040,	2000:7194,	2100:7342,	2200:7497,	2300:7652,	2400:7803,	2500:7957,	2600:8111,	2700:8259,	2800:8414,	2900:8568,	3000:8719},
		700 : {1400:6641,	1500:6802,	1600:6970,	1700:7136,	1800:7300,	1900:7468,	2000:7635,	2100:7796,	2200:7964,	2300:8131,	2400:8295,	2500:8463,	2600:8630,	2700:8791,	2800:8959,	2900:9125,	3000:9289},
		800 : {1400:7227,	1500:7401,	1600:7582,	1700:7761,	1800:7938,	1900:8119,	2000:8299,	2100:8801,	2200:8982,	2300:9162,	2400:9339,	2500:9438,	2600:9618,	2700:9793,	2800:9973,	2900:10153,	3000:10330},
		900 : {1400:7589,	1500:7777,	1600:7970,	1700:8163,	1800:8353,	1900:8546,	2000:8739,	2100:9255,	2200:9448,	2300:9642,	2400:9832,	2500:9944,	2600:10136,	2700:10324,	2800:10518,	2900:10710,	3000:10900},
		1000 : {1400:8029,	1500:8229,	1600:8436,	1700:8642,	1800:8844,	1900:9051,	2000:9257,	2100:9785,	2200:9992,	2300:10198,	2400:10401,	2500:10526,	2600:10732,	2700:10932,	2800:11139,	2900:11345,	3000:11547},
		1100 : {1400:8372,	1500:8585,	1600:8805,	1700:9024,	1800:9239,	1900:9459,	2000:9677,	2100:10219,	2200:10439,	2300:10658,	2400:10874,	2500:11012,	2600:11231,	2700:11444,	2800:11664,	2900:11882,	3000:12098},
		1200 : {1400:8735,	1500:8961,	1600:9194,	1700:9425,	1800:9654,	1900:9886,	2000:10118,	2100:10673,	2200:10905,	2300:11138,	2400:11366,	2500:11517,	2600:11749,	2700:11976,	2800:12208,	2900:12440,	3000:12668},
		1300 : {1400:9098,	1500:9338,	1600:9583,	1700:9828,	1800:10069,	1900:10315,	2000:10560,	2100:11127,	2200:11373,	2300:11618,	2400:11860,	2500:12024,	2600:12268,	2700:12508,	2800:12753,	2900:12998,	3000:13240},
		1400 : {1400:9463,	1500:9715,	1600:9974,	1700:10231,	1800:10486,	1900:10744,	2000:11002,	2100:11582,	2200:11841,	2300:12099,	2400:12354,	2500:12531,	2600:12789,	2700:13041,	2800:13300,	2900:13557,	3000:13812},
		1500 : {1400:9825,	1500:10091,	1600:10362,	1700:10633,	1800:10900,	1900:11172,	2000:11442,	2100:12036,	2200:12307,	2300:12579,	2400:12847,	2500:13037,	2600:13307,	2700:13573,	2800:13844,	2900:14115,	3000:14382},
		1600 : {1400:10011,	1500:10289,	1600:10574,	1700:10857,	1800:11138,	1900:11422,	2000:11706,	2100:12312,	2200:12597,	2300:12881,	2400:13162,	2500:13365,	2600:13649,	2700:13927,	2800:14211,	2900:14495,	3000:14776},
		1700 : {1400:10375,	1500:10667,	1600:10964,	1700:11261,	1800:11554,	1900:11852,	2000:12148,	2100:12768,	2200:13065,	2300:13363,	2400:13656,	2500:13872,	2600:14169,	2700:14460,	2800:14758,	2900:15054,	3000:15348},
		1800 : {1400:10814,	1500:11119,	1600:11429,	1700:11738,	1800:12045,	1900:12355,	2000:12665,	2100:13297,	2200:13608,	2300:13918,	2400:14225,	2500:14454,	2600:14763,	2700:15068,	2800:15378,	2900:15688,	3000:15994},
		1900 : {1400:11178,	1500:11495,	1600:11818,	1700:12141,	1800:12461,	1900:12784,	2000:13106,	2100:13752,	2200:14075,	2300:14399,	2400:14718,	2500:14960,	2600:15283,	2700:15600,	2800:15923,	2900:16246,	3000:16566},
		2000 : {1400:11935,	1500:12265,	1600:12601,	1700:12937,	1800:13269,	1900:13606,	2000:13941,	2100:14600,	2200:14936,	2300:15272,	2400:15605,	2500:15860,	2600:16195,	2700:16526,	2800:16862,	2900:17198,	3000:17530}
	},
	'33-2' : {
		600 : {1400:6617,	1500:6758,	1600:6895,	1700:7036,	1800:7179,	1900:7316,	2000:7798,	2100:7957,	2200:8111,	2300:8271,	2400:8432,	2500:8505,	2600:8664,	2700:8822,	2800:8977,	2900:9136,	3000:9297},
		700 : {1400:7029,	1500:7178,	1600:7324,	1700:7488,	1800:7662,	1900:7829,	2000:8329,	2100:8501,	2200:8668,	2300:8841,	2400:9015,	2500:9101,	2600:9273,	2700:9444,	2800:9612,	2900:9783,	3000:9957},
		800 : {1400:7411,	1500:7586,	1600:7766,	1700:7951,	1800:8138,	1900:8318,	2000:8831,	2100:9016,	2200:9196,	2300:9382,	2400:9569,	2500:9668,	2600:9852,	2700:10037,	2800:10217,	2900:10402,	3000:10589},
		900 : {1400:7772,	1500:7970,	1600:8163,	1700:8361,	1800:8561,	1900:8754,	2000:9280,	2100:9478,	2200:9671,	2300:9870,	2400:10070,	2500:10182,	2600:10379,	2700:10577,	2800:10770,	2900:10968,	3000:11168},
		1000 : {1400:8220,	1500:8431,	1600:8637,	1700:8848,	1800:9061,	1900:9267,	2000:9806,	2100:10017,	2200:10223,	2300:10435,	2400:10648,	2500:10773,	2600:10983,	2700:11194,	2800:11400,	2900:11611,	3000:11824},
		1100 : {1400:8572,	1500:8795,	1600:9015,	1700:9238,	1800:9464,	1900:9684,	2000:10235,	2100:10459,	2200:10678,	2300:10903,	2400:11129,	2500:11267,	2600:11490,	2700:11714,	2800:11933,	2900:12157,	3000:12383},
		1200 : {1400:8943,	1500:9180,	1600:9412,	1700:9649,	1800:9887,	1900:10120,	2000:10684,	2100:10921,	2200:11153,	2300:11391,	2400:11630,	2500:11781,	2600:12017,	2700:12254,	2800:12486,	2900:12723,	3000:12962},
		1300 : {1400:9315,	1500:9565,	1600:9810,	1700:10060,	1800:10311,	1900:10557,	2000:11134,	2100:11384,	2200:11629,	2300:11880,	2400:12132,	2500:12296,	2600:12545,	2700:12795,	2800:13040,	2900:13290,	3000:13542},
		1400 : {1400:9688,	1500:9951,	1600:10209,	1700:10471,	1800:10736,	1900:10995,	2000:11585,	2100:11848,	2200:12106,	2300:12370,	2400:12635,	2500:12811,	2600:13074,	2700:13337,	2800:13595,	2900:13858,	3000:14122},
		1500 : {1400:10059,	1500:10335,	1600:10606,	1700:10882,	1800:11159,	1900:11431,	2000:12034,	2100:12310,	2200:12581,	2300:12858,	2400:13136,	2500:13325,	2600:13601,	2700:13877,	2800:14148,	2900:14423,	3000:14701},
		1600 : {1400:10541,	1500:10830,	1600:11114,	1700:11403,	1800:11694,	1900:11978,	2000:12595,	2100:12883,	2200:13167,	2300:13457,	2400:13748,	2500:13951,	2600:14239,	2700:14528,	2800:14812,	2900:15100,	3000:15391},
		1700 : {1400:10914,	1500:11216,	1600:11513,	1700:11815,	1800:12119,	1900:12416,	2000:13045,	2100:13347,	2200:13644,	2300:13947,	2400:14250,	2500:14466,	2600:14768,	2700:15069,	2800:15367,	2900:15668,	3000:15972},
		1800 : {1400:11362,	1500:11676,	1600:11986,	1700:12301,	1800:12618,	1900:12928,	2000:13571,	2100:13885,	2200:14195,	2300:14511,	2400:14828,	2500:15056,	2600:15371,	2700:15685,	2800:15996,	2900:16310,	3000:16627},
		1900 : {1400:11734,	1500:12061,	1600:12384,	1700:12712,	1800:13042,	1900:13365,	2000:14021,	2100:14348,	2200:14671,	2300:15000,	2400:15329,	2500:15571,	2600:15899,	2700:16226,	2800:16549,	2900:16877,	3000:17207},
		2000 : {1400:12211,	1500:12552,	1600:12888,	1700:13228,	1800:13571,	1900:13907,	2000:14576,	2100:14916,	2200:15252,	2300:15594,	2400:15937,	2500:16191,	2600:16532,	2700:16872,	2800:17209,	2900:17549,	3000:17892}
	},
	'33-3' : {
		600 : {1400:7437,	1500:7614,	1600:7791,	1700:7969,	1800:8148,	1900:8326,	2000:8505,	2100:9029,	2200:9226,	2300:9422,	2400:9621,	2500:9736,	2600:9932,	2700:10129,	2800:10325,	2900:10522,	3000:10721},
		700 : {1400:7922,	1500:8109,	1600:8296,	1700:8486,	1800:8699,	1900:8910,	2000:9121,	2100:9660,	2200:9871,	2300:10082,	2400:10296,	2500:10425,	2600:10636,	2700:10847,	2800:11058,	2900:11269,	3000:11483},
		800 : {1400:8377,	1500:8578,	1600:8804,	1700:9029,	1800:9257,	1900:9483,	2000:9708,	2100:10262,	2200:10487,	2300:10713,	2400:10941,	2500:11085,	2600:11310,	2700:11536,	2800:11761,	2900:11987,	3000:12215},
		900 : {1400:8802,	1500:9042,	1600:9282,	1700:9522,	1800:9764,	1900:10004,	2000:10244,	2100:10812,	2200:11052,	2300:11292,	2400:11535,	2500:11693,	2600:11933,	2700:12173,	2800:12413,	2900:12653,	3000:12896},
		1000 : {1400:9327,	1500:9581,	1600:9836,	1700:10090,	1800:10347,	1900:10602,	2000:10856,	2100:11439,	2200:11693,	2300:11948,	2400:12205,	2500:12378,	2600:12632,	2700:12887,	2800:13141,	2900:13396,	3000:13653},
		1100 : {1400:9754,	1500:10023,	1600:10292,	1700:10561,	1800:10833,	1900:11102,	2000:11371,	2100:11968,	2200:12237,	2300:12506,	2400:12777,	2500:12965,	2600:13234,	2700:13503,	2800:13772,	2900:14041,	3000:14312},
		1200 : {1400:10203,	1500:10487,	1600:10770,	1700:11054,	1800:11339,	1900:11623,	2000:11906,	2100:12518,	2200:12802,	2300:13085,	2400:13371,	2500:13573,	2600:13857,	2700:14140,	2800:14424,	2900:14707,	3000:14993},
		1300 : {1400:10652,	1500:10950,	1600:11248,	1700:11546,	1800:11846,	1900:12144,	2000:12442,	2100:13068,	2200:13366,	2300:13665,	2400:13965,	2500:14181,	2600:14480,	2700:14778,	2800:15076,	2900:15374,	3000:15674},
		1400 : {1400:11101,	1500:11413,	1600:11726,	1700:12038,	1800:12353,	1900:12666,	2000:12978,	2100:13619,	2200:13931,	2300:14244,	2400:14559,	2500:14790,	2600:15103,	2700:15415,	2800:15728,	2900:16040,	3000:16355},
		1500 : {1400:11550,	1500:11877,	1600:12204,	1700:12531,	1800:12860,	1900:13187,	2000:13514,	2100:14169,	2200:14496,	2300:14823,	2400:15153,	2500:15398,	2600:15725,	2700:16052,	2800:16380,	2900:16707,	3000:17036},
		1600 : {1400:12109,	1500:12450,	1600:12792,	1700:13133,	1800:13477,	1900:13819,	2000:14160,	2100:14830,	2200:15171,	2300:15513,	2400:15857,	2500:16117,	2600:16459,	2700:16800,	2800:17142,	2900:17483,	3000:17827},
		1700 : {1400:12558,	1500:12914,	1600:13270,	1700:13626,	1800:13984,	1900:14340,	2000:14696,	2100:15380,	2200:15736,	2300:16092,	2400:16451,	2500:16725,	2600:17082,	2700:17438,	2800:17794,	2900:18150,	3000:18508},
		1800 : {1400:13082,	1500:13453,	1600:13824,	1700:14194,	1800:14567,	1900:14938,	2000:15308,	2100:16007,	2200:16377,	2300:16748,	2400:17121,	2500:17410,	2600:17781,	2700:18151,	2800:18522,	2900:18892,	3000:19265},
		1900 : {1400:13531,	1500:13916,	1600:14301,	1700:14687,	1800:15074,	1900:15459,	2000:15844,	2100:16557,	2200:16942,	2300:17327,	2400:17715,	2500:18018,	2600:18404,	2700:18789,	2800:19174,	2900:19559,	3000:19946},
		2000 : {1400:14084,	1500:14484,	1600:14884,	1700:15283,	1800:15685,	1900:16085,	2000:16484,	2100:17212,	2200:17612,	2300:18011,	2400:18413,	2500:18731,	2600:19131,	2700:19530,	2800:19930,	2900:20330,	3000:20731}
	},
	'34-1' : {
		600 : {1400:9918,	1500:10107,	1600:10300,	1700:10482,	1800:10681,	1900:10874,	2000:11056,	2100:11913,	2200:12106,	2300:12289,	2400:12480,	2500:12632,	2600:12732,	2700:13082,	2800:13275,	2900:13457,	3000:13646},
		700 : {1400:10420,	1500:10622,	1600:10828,	1700:11023,	1800:11235,	1900:11441,	2000:11636,	2100:12506,	2200:12712,	2300:12907,	2400:13111,	2500:13277,	2600:13390,	2700:13753,	2800:13959,	2900:14154,	3000:14356},
		800 : {1400:11044,	1500:11259,	1600:11478,	1700:11686,	1800:11911,	1900:12130,	2000:12338,	2100:13221,	2200:13440,	2300:13648,	2400:13865,	2500:14044,	2600:14170,	2700:14546,	2800:14765,	2900:14973,	3000:15188},
		900 : {1400:11882,	1500:12109,	1600:12341,	1700:12562,	1800:12801,	1900:13033,	2000:13254,	2100:14149,	2200:14381,	2300:14603,	2400:14833,	2500:15024,	2600:15163,	2700:15552,	2800:15784,	2900:16005,	3000:16233},
		1000 : {1400:12350,	1500:12591,	1600:12836,	1700:13070,	1800:13321,	1900:13566,	2000:13800,	2100:14709,	2200:14953,	2300:15188,	2400:15431,	2500:15635,	2600:15788,	2700:16189,	2800:16434,	2900:16668,	3000:16909},
		1100 : {1400:12757,	1500:13010,	1600:13268,	1700:13515,	1800:13780,	1900:14038,	2000:14285,	2100:15206,	2200:15464,	2300:15712,	2400:15968,	2500:16185,	2600:16350,	2700:16765,	2800:17023,	2900:17269,	3000:17524},
		1200 : {1400:13319,	1500:13586,	1600:13856,	1700:14116,	1800:14394,	1900:14665,	2000:14925,	2100:15859,	2200:16130,	2300:16391,	2400:16660,	2500:16890,	2600:17068,	2700:17496,	2800:17767,	2900:18026,	3000:18294},
		1300 : {1400:13788,	1500:14067,	1600:14351,	1700:14624,	1800:14914,	1900:15198,	2000:15471,	2100:16418,	2200:16702,	2300:16976,	2400:17258,	2500:17501,	2600:17692,	2700:18133,	2800:18417,	2900:18690,	3000:18970},
		1400 : {1400:14259,	1500:14551,	1600:14848,	1700:15134,	1800:15437,	1900:15734,	2000:16020,	2100:16981,	2200:17277,	2300:17564,	2400:17859,	2500:18115,	2600:18319,	2700:18773,	2800:19070,	2900:19356,	3000:19649},
		1500 : {1400:14800,	1500:15106,	1600:15415,	1700:15714,	1800:16031,	1900:16341,	2000:16639,	2100:17613,	2200:17923,	2300:18222,	2400:18530,	2500:18799,	2600:19017,	2700:19483,	2800:19793,	2900:20092,	3000:20398},
		1600 : {1400:15596,	1500:15915,	1600:16238,	1700:16549,	1800:16879,	1900:17202,	2000:17513,	2100:18500,	2200:18823,	2300:19135,	2400:19456,	2500:19738,	2600:19969,	2700:20448,	2800:20771,	2900:21083,	3000:21402},
		1700 : {1400:16293,	1500:16625,	1600:16961,	1700:17285,	1800:17628,	1900:17964,	2000:18288,	2100:19288,	2200:19624,	2300:19949,	2400:20283,	2500:20578,	2600:20821,	2700:21314,	2800:21650,	2900:21974,	3000:22307},
		1800 : {1400:16761,	1500:17106,	1600:17454,	1700:17792,	1800:18148,	1900:18496,	2000:18834,	2100:19846,	2200:20195,	2300:20534,	2400:20880,	2500:21188,	2600:21445,	2700:21950,	2800:22299,	2900:22637,	3000:22982},
		1900 : {1400:17229,	1500:17587,	1600:17949,	1700:18299,	1800:18668,	1900:19030,	2000:19380,	2100:20406,	2200:20767,	2300:21119,	2400:21479,	2500:21800,	2600:22069,	2700:22588,	2800:22949,	2900:23300,	3000:23658},
		2000 : {1400:18016,	1500:18387,	1600:18762,	1700:19125,	1800:19507,	1900:19881,	2000:20245,	2100:21283,	2200:21658,	2300:22023,	2400:22396,	2500:22729,	2600:23012,	2700:23543,	2800:23918,	2900:24282,	3000:24653}
	},
	'34-2' : {
		600 : {1400:10370,	1500:10515,	1600:10655,	1700:10666,	1800:10945,	1900:11085,	2000:11111,	2100:12100,	2200:12292,	2300:12479,	2400:12680,	2500:12831,	2600:12591,	2700:13296,	2800:13488,	2900:13675,	3000:13873},
		700 : {1400:10763,	1500:10909,	1600:11049,	1700:11074,	1800:11418,	1900:11623,	2000:11700,	2100:12702,	2200:12907,	2300:13107,	2400:13321,	2500:13486,	2600:13258,	2700:13976,	2800:14181,	2900:14381,	3000:14592},
		800 : {1400:11279,	1500:11441,	1600:11656,	1700:11746,	1800:12103,	1900:12322,	2000:12411,	2100:13426,	2200:13644,	2300:13858,	2400:14084,	2500:14262,	2600:14047,	2700:14778,	2800:14996,	2900:15209,	3000:15434},
		900 : {1400:12060,	1500:12297,	1600:12528,	1700:12631,	1800:13002,	1900:13233,	2000:13336,	2100:14364,	2200:14595,	2300:14821,	2400:15061,	2500:15251,	2600:15049,	2700:15794,	2800:16025,	2900:16250,	3000:16488},
		1000 : {1400:12538,	1500:12788,	1600:13032,	1700:13148,	1800:13532,	1900:13776,	2000:13892,	2100:14932,	2200:15177,	2300:15416,	2400:15669,	2500:15872,	2600:15683,	2700:16440,	2800:16685,	2900:16923,	3000:17174},
		1100 : {1400:12954,	1500:13217,	1600:13474,	1700:13603,	1800:14000,	1900:14257,	2000:14385,	2100:15439,	2200:15697,	2300:15949,	2400:16214,	2500:16431,	2600:16255,	2700:17025,	2800:17282,	2900:17534,	3000:17797},
		1200 : {1400:13539,	1500:13815,	1600:14086,	1700:14228,	1800:14637,	1900:14907,	2000:15049,	2100:16116,	2200:16386,	2300:16651,	2400:16930,	2500:17159,	2600:16996,	2700:17779,	2800:18050,	2900:18314,	3000:18591},
		1300 : {1400:14017,	1500:14306,	1600:14589,	1700:14744,	1800:15167,	1900:15450,	2000:15605,	2100:16685,	2200:16968,	2300:17246,	2400:17537,	2500:17780,	2600:17630,	2700:18426,	2800:18709,	2900:18986,	3000:19276},
		1400 : {1400:14498,	1500:14800,	1600:15096,	1700:15264,	1800:15699,	1900:15996,	2000:16163,	2100:17256,	2200:17552,	2300:17843,	2400:18148,	2500:18403,	2600:18266,	2700:19075,	2800:19371,	2900:19662,	3000:19964},
		1500 : {1400:15034,	1500:15349,	1600:15658,	1700:15839,	1800:16288,	1900:16597,	2000:16778,	2100:17883,	2200:18192,	2300:18497,	2400:18814,	2500:19082,	2600:18958,	2700:19780,	2800:20090,	2900:20393,	3000:20709},
		1600 : {1400:15842,	1500:16171,	1600:16493,	1700:16687,	1800:17148,	1900:17470,	2000:17664,	2100:18782,	2200:19105,	2300:19422,	2400:19752,	2500:20034,	2600:19922,	2700:20758,	2800:21080,	2900:21396,	3000:21725},
		1700 : {1400:16549,	1500:16890,	1600:17225,	1700:17432,	1800:17906,	1900:18242,	2000:18448,	2100:19580,	2200:19915,	2300:20245,	2400:20588,	2500:20883,	2600:20785,	2700:21633,	2800:21968,	2900:22297,	3000:22639},
		1800 : {1400:17026,	1500:17380,	1600:17728,	1700:17948,	1800:18435,	1900:18783,	2000:19003,	2100:20147,	2200:20496,	2300:20839,	2400:21195,	2500:21502,	2600:21417,	2700:22278,	2800:22626,	2900:22969,	3000:23323},
		1900 : {1400:17503,	1500:17871,	1600:18232,	1700:18464,	1800:18965,	1900:19326,	2000:19558,	2100:20716,	2200:21077,	2300:21433,	2400:21803,	2500:22123,	2600:22051,	2700:22925,	2800:23286,	2900:23641,	3000:24009},
		2000 : {1400:18297,	1500:18677,	1600:19051,	1700:19297,	1800:19810,	1900:20184,	2000:20430,	2100:21600,	2200:21974,	2300:22344,	2400:22726,	2500:23059,	2600:23000,	2700:23887,	2800:24261,	2900:24629,	3000:25010}
	},
	'34-3' : {
		600 : {1400:11556,	1500:11736,	1600:11916,	1700:12095,	1800:12288,	1900:12468,	2000:12649,	2100:13533,	2200:13771,	2300:14008,	2400:14248,	2500:14444,	2600:14600,	2700:15000,	2800:15238,	2900:15475,	3000:15714},
		700 : {1400:12033,	1500:12213,	1600:12393,	1700:12576,	1800:12815,	1900:13067,	2000:13318,	2100:14240,	2200:14492,	2300:14744,	2400:14998,	2500:15209,	2600:15379,	2700:15794,	2800:16045,	2900:16297,	3000:16551},
		800 : {1400:12630,	1500:12815,	1600:13052,	1700:13318,	1800:13597,	1900:13863,	2000:14130,	2100:15066,	2200:15332,	2300:15598,	2400:15867,	2500:16093,	2600:16277,	2700:16707,	2800:16973,	2900:17239,	3000:17508},
		900 : {1400:13465,	1500:13741,	1600:14022,	1700:14303,	1800:14596,	1900:14877,	2000:15158,	2100:16109,	2200:16389,	2300:16670,	2400:16953,	2500:17193,	2600:17393,	2700:17836,	2800:18117,	2900:18398,	3000:18681},
		1000 : {1400:14032,	1500:14327,	1600:14622,	1700:14918,	1800:15226,	1900:15521,	2000:15816,	2100:16781,	2200:17077,	2300:17372,	2400:17670,	2500:17924,	2600:18138,	2700:18596,	2800:18892,	2900:19187,	3000:19485},
		1100 : {1400:14538,	1500:14848,	1600:15158,	1700:15468,	1800:15791,	1900:16100,	2000:16410,	2100:17390,	2200:17700,	2300:18009,	2400:18322,	2500:18591,	2600:18819,	2700:19292,	2800:19602,	2900:19911,	3000:20224},
		1200 : {1400:15219,	1500:15543,	1600:15867,	1700:16192,	1800:16529,	1900:16853,	2000:17177,	2100:18171,	2200:18496,	2300:18820,	2400:19147,	2500:19430,	2600:19673,	2700:20160,	2800:20485,	2900:20809,	3000:21136},
		1300 : {1400:15790,	1500:16129,	1600:16467,	1700:16806,	1800:17158,	1900:17497,	2000:17836,	2100:18844,	2200:19183,	2300:19522,	2400:19863,	2500:20161,	2600:20419,	2700:20920,	2800:21259,	2900:21598,	3000:21939},
		1400 : {1400:16361,	1500:16714,	1600:17068,	1700:17421,	1800:17787,	1900:18141,	2000:18494,	2100:19517,	2200:19870,	2300:20224,	2400:20579,	2500:20892,	2600:21164,	2700:21680,	2800:22034,	2900:22387,	3000:22743},
		1500 : {1400:16992,	1500:17360,	1600:17728,	1700:18096,	1800:18476,	1900:18844,	2000:19212,	2100:20250,	2200:20617,	2300:20985,	2400:21356,	2500:21683,	2600:21969,	2700:22500,	2800:22868,	2900:23236,	3000:23606},
		1600 : {1400:17894,	1500:18276,	1600:18659,	1700:19041,	1800:19436,	1900:19819,	2000:20201,	2100:21253,	2200:21635,	2300:22018,	2400:22402,	2500:22744,	2600:23045,	2700:23590,	2800:23973,	2900:24355,	3000:24740},
		1700 : {1400:18691,	1500:19088,	1600:19485,	1700:19882,	1800:20292,	1900:20688,	2000:21085,	2100:22152,	2200:22549,	2300:22946,	2400:23345,	2500:23701,	2600:24016,	2700:24576,	2800:24973,	2900:25370,	3000:25769},
		1800 : {1400:19263,	1500:19674,	1600:20085,	1700:20497,	1800:20921,	1900:21332,	2000:21744,	2100:22825,	2200:23236,	2300:23648,	2400:24061,	2500:24432,	2600:24762,	2700:25336,	2800:25747,	2900:26159,	3000:26572},
		1900 : {1400:19834,	1500:20260,	1600:20686,	1700:21112,	1800:21550,	1900:21976,	2000:22402,	2100:23498,	2200:23923,	2300:24349,	2400:24778,	2500:25163,	2600:25507,	2700:26096,	2800:26522,	2900:26948,	3000:27376},
		2000 : {1400:20718,	1500:21158,	1600:21599,	1700:22039,	1800:22492,	1900:22933,	2000:23373,	2100:24483,	2200:24924,	2300:25364,	2400:25807,	2500:26207,	2600:26566,	2700:27169,	2800:27609,	2900:28050,	3000:28492}
	},
	'35-1' : {
		600 : {1400:9486,	1500:9675,	1600:9868,	1700:10050,	1800:10246,	1900:10439,	2000:10621,	2100:11255,	2200:11448,	2300:11630,	2400:11821,	2500:12014,	2600:12115,	2700:12410,	2800:12603,	2900:12785,	3000:12974},
		700 : {1400:9977,	1500:10178,	1600:10384,	1700:10579,	1800:10788,	1900:10994,	2000:11189,	2100:11836,	2200:12041,	2300:12237,	2400:12441,	2500:12647,	2600:12761,	2700:13069,	2800:13275,	2900:13470,	3000:13672},
		800 : {1400:10771,	1500:10986,	1600:11205,	1700:11413,	1800:11635,	1900:11854,	2000:12062,	2100:13049,	2200:13268,	2300:13477,	2400:13694,	2500:13831,	2600:13958,	2700:14279,	2800:14498,	2900:14706,	3000:14921},
		900 : {1400:11485,	1500:11713,	1600:11945,	1700:12166,	1800:12401,	1900:12633,	2000:12854,	2100:13854,	2200:14086,	2300:14308,	2400:14538,	2500:14688,	2600:14828,	2700:15162,	2800:15394,	2900:15615,	3000:15843},
		1000 : {1400:12030,	1500:12271,	1600:12516,	1700:12749,	1800:12998,	1900:13242,	2000:13476,	2100:14490,	2200:14735,	2300:14969,	2400:15212,	2500:15376,	2600:15528,	2700:15876,	2800:16120,	2900:16354,	3000:16595},
		1100 : {1400:12437,	1500:12690,	1600:12948,	1700:13195,	1800:13456,	1900:13714,	2000:13961,	2100:14987,	2200:15245,	2300:15493,	2400:15749,	2500:15925,	2600:16091,	2700:16451,	2800:16709,	2900:16956,	3000:17210},
		1200 : {1400:12967,	1500:13234,	1600:13505,	1700:13765,	1800:14039,	1900:14310,	2000:14569,	2100:15609,	2200:15880,	2300:16140,	2400:16409,	2500:16599,	2600:16777,	2700:17150,	2800:17421,	2900:17681,	3000:17948},
		1300 : {1400:13436,	1500:13715,	1600:13999,	1700:14272,	1800:14559,	1900:14843,	2000:15116,	2100:16168,	2200:16452,	2300:16726,	2400:17008,	2500:17210,	2600:17401,	2700:17788,	2800:18071,	2900:18344,	3000:18624},
		1400 : {1400:13907,	1500:14200,	1600:14496,	1700:14782,	1800:15082,	1900:15379,	2000:15665,	2100:16730,	2200:17027,	2300:17314,	2400:17608,	2500:17824,	2600:18028,	2700:18428,	2800:18724,	2900:19010,	3000:19303},
		1500 : {1400:14424,	1500:14729,	1600:15039,	1700:15338,	1800:15651,	1900:15961,	2000:16260,	2100:17338,	2200:17648,	2300:17947,	2400:18255,	2500:18483,	2600:18701,	2700:19113,	2800:19423,	2900:19722,	3000:20028},
		1600 : {1400:14933,	1500:15251,	1600:15574,	1700:15886,	1800:16212,	1900:16535,	2000:16846,	2100:17938,	2200:18260,	2300:18573,	2400:18894,	2500:19135,	2600:19366,	2700:19791,	2800:20114,	2900:20425,	3000:20745},
		1700 : {1400:15555,	1500:15886,	1600:16222,	1700:16547,	1800:16886,	1900:17221,	2000:17546,	2100:18650,	2200:18986,	2300:19312,	2400:19646,	2500:19900,	2600:20143,	2700:20581,	2800:20917,	2900:21242,	3000:21574},
		1800 : {1400:16098,	1500:16443,	1600:16791,	1700:17129,	1800:17481,	1900:17830,	2000:18168,	2100:19285,	2200:19634,	2300:19972,	2400:20319,	2500:20586,	2600:20843,	2700:21294,	2800:21643,	2900:21980,	3000:22325},
		1900 : {1400:16567,	1500:16924,	1600:17286,	1700:17637,	1800:18002,	1900:18363,	2000:18714,	2100:19844,	2200:20206,	2300:20558,	2400:20917,	2500:21198,	2600:21467,	2700:21931,	2800:22293,	2900:22644,	3000:23002},
		2000 : {1400:17641,	1500:18011,	1600:18386,	1700:18750,	1800:19128,	1900:19502,	2000:19866,	2100:21009,	2200:21384,	2300:21748,	2400:22121,	2500:22415,	2600:22697,	2700:23174,	2800:23549,	2900:23912,	3000:24283}
	},
	'35-2' : {
		600 : {1400:10027,	1500:10173,	1600:10312,	1700:10446,	1800:10599,	1900:10739,	2000:11215,	2100:11858,	2200:12051,	2300:12238,	2400:12439,	2500:12549,	2600:12654,	2700:12959,	2800:13152,	2900:13338,	3000:13537},
		700 : {1400:10491,	1500:10636,	1600:10776,	1700:10923,	1800:11142,	1900:11347,	2000:11874,	2100:12530,	2200:12736,	2300:12936,	2400:13149,	2500:13273,	2600:13391,	2700:13709,	2800:13915,	2900:14114,	3000:14326},
		800 : {1400:11006,	1500:11168,	1600:11383,	1700:11595,	1800:11827,	1900:12045,	2000:12586,	2100:13255,	2200:13473,	2300:13686,	2400:13913,	2500:14050,	2600:14180,	2700:14512,	2800:14730,	2900:14942,	3000:15167},
		900 : {1400:11664,	1500:11901,	1600:12132,	1700:12358,	1800:12602,	1900:12834,	2000:13387,	2100:14069,	2200:14300,	2300:14526,	2400:14766,	2500:14916,	2600:15060,	2700:15404,	2800:15635,	2900:15860,	3000:16098},
		1000 : {1400:12218,	1500:12468,	1600:12712,	1700:12950,	1800:13208,	1900:13452,	2000:14019,	2100:14714,	2200:14958,	2300:15197,	2400:15450,	2500:15612,	2600:15769,	2700:16126,	2800:16371,	2900:16609,	3000:16860},
		1100 : {1400:12633,	1500:12897,	1600:13154,	1700:13405,	1800:13676,	1900:13933,	2000:14513,	2100:15220,	2200:15478,	2300:15730,	2400:15995,	2500:16171,	2600:16341,	2700:16711,	2800:16968,	2900:17220,	3000:17483},
		1200 : {1400:13183,	1500:13459,	1600:13729,	1700:13994,	1800:14277,	1900:14548,	2000:15140,	2100:15861,	2200:16131,	2300:16396,	2400:16675,	2500:16863,	2600:17046,	2700:17429,	2800:17700,	2900:17964,	3000:18241},
		1300 : {1400:13661,	1500:13950,	1600:14233,	1700:14510,	1800:14807,	1900:15090,	2000:15696,	2100:16429,	2200:16713,	2300:16991,	2400:17282,	2500:17484,	2600:17680,	2700:18076,	2800:18359,	2900:18636,	3000:18926},
		1400 : {1400:14141,	1500:14443,	1600:14739,	1700:15030,	1800:15339,	1900:15636,	2000:16254,	2100:17001,	2200:17297,	2300:17588,	2400:17893,	2500:18107,	2600:18316,	2700:18725,	2800:19021,	2900:19312,	3000:19614},
		1500 : {1400:14658,	1500:14973,	1600:15282,	1700:15585,	1800:15908,	1900:16217,	2000:16848,	2100:17608,	2200:17917,	2300:18222,	2400:18539,	2500:18767,	2600:18989,	2700:19410,	2800:19720,	2900:20023,	3000:20339},
		1600 : {1400:15466,	1500:15794,	1600:16116,	1700:16433,	1800:16768,	1900:17090,	2000:17735,	2100:18507,	2200:18830,	2300:19147,	2400:19477,	2500:19718,	2600:19953,	2700:20388,	2800:20710,	2900:21026,	3000:21355},
		1700 : {1400:16097,	1500:16438,	1600:16773,	1700:17103,	1800:17451,	1900:17786,	2000:18444,	2100:19229,	2200:19565,	2300:19895,	2400:20238,	2500:20492,	2600:20740,	2700:21187,	2800:21523,	2900:21852,	3000:22193},
		1800 : {1400:16650,	1500:17004,	1600:17352,	1700:17694,	1800:18056,	1900:18404,	2000:19075,	2100:19873,	2200:20221,	2300:20564,	2400:20921,	2500:21187,	2600:21448,	2700:21909,	2800:22257,	2900:22599,	3000:22954},
		1900 : {1400:17128,	1500:17495,	1600:17856,	1700:18211,	1800:18586,	1900:18947,	2000:19630,	2100:20442,	2200:20803,	2300:21159,	2400:21528,	2500:21808,	2600:22082,	2700:22556,	2800:22917,	2900:23272,	3000:23640},
		2000 : {1400:17921,	1500:18301,	1600:18675,	1700:19044,	1800:19431,	1900:19805,	2000:20501,	2100:21326,	2200:21700,	2300:22069,	2400:22452,	2500:22744,	2600:23031,	2700:23518,	2800:23892,	2900:24260,	3000:24641}
	},
	'35-3' : {
		600 : {1400:11213,	1500:11393,	1600:11573,	1700:11753,	1800:11942,	1900:12122,	2000:12303,	2100:13292,	2200:13529,	2300:13767,	2400:14006,	2500:14162,	2600:14318,	2700:14664,	2800:14901,	2900:15139,	3000:15378},
		700 : {1400:11760,	1500:11940,	1600:12120,	1700:12303,	1800:12538,	1900:12790,	2000:13042,	2100:14068,	2200:14320,	2300:14572,	2400:14826,	2500:14996,	2600:15167,	2700:15527,	2800:15779,	2900:16031,	3000:16285},
		800 : {1400:12357,	1500:12542,	1600:12779,	1700:13045,	1800:13321,	1900:13587,	2000:13853,	2100:14894,	2200:15160,	2300:15427,	2400:15695,	2500:15880,	2600:16065,	2700:16440,	2800:16706,	2900:16973,	3000:17241},
		900 : {1400:13068,	1500:13345,	1600:13626,	1700:13907,	1800:14197,	1900:14477,	2000:14758,	2100:15814,	2200:16094,	2300:16375,	2400:16658,	2500:16858,	2600:17057,	2700:17447,	2800:17727,	2900:18008,	3000:18291},
		1000 : {1400:13711,	1500:14007,	1600:14302,	1700:14597,	1800:14902,	1900:15197,	2000:15493,	2100:16563,	2200:16858,	2300:17153,	2400:17451,	2500:17665,	2600:17879,	2700:18282,	2800:18578,	2900:18873,	3000:19171},
		1100 : {1400:14218,	1500:14528,	1600:14838,	1700:15148,	1800:15467,	1900:15777,	2000:16087,	2100:17171,	2200:17481,	2300:17791,	2400:18103,	2500:18331,	2600:18560,	2700:18978,	2800:19288,	2900:19598,	3000:19910},
		1200 : {1400:14862,	1500:15186,	1600:15511,	1700:15835,	1800:16169,	1900:16493,	2000:16817,	2100:17916,	2200:18241,	2300:18565,	2400:18892,	2500:19134,	2600:19377,	2700:19810,	2800:20135,	2900:20459,	3000:20786},
		1300 : {1400:15433,	1500:15772,	1600:16111,	1700:16450,	1800:16798,	1900:17137,	2000:17476,	2100:18589,	2200:18928,	2300:19267,	2400:19608,	2500:19865,	2600:20123,	2700:20570,	2800:20909,	2900:21248,	3000:21589},
		1400 : {1400:16005,	1500:16358,	1600:16711,	1700:17065,	1800:17427,	1900:17781,	2000:18134,	2100:19262,	2200:19615,	2300:19969,	2400:20324,	2500:20596,	2600:20868,	2700:21330,	2800:21683,	2900:22037,	3000:22393},
		1500 : {1400:16616,	1500:16984,	1600:17351,	1700:17719,	1800:18097,	1900:18464,	2000:18832,	2100:19975,	2200:20342,	2300:20710,	2400:21081,	2500:21367,	2600:21653,	2700:22130,	2800:22498,	2900:22866,	3000:23236},
		1600 : {1400:17518,	1500:17900,	1600:18282,	1700:18665,	1800:19056,	1900:19439,	2000:19821,	2100:20978,	2200:21360,	2300:21743,	2400:22127,	2500:22428,	2600:22729,	2700:23220,	2800:23603,	2900:23985,	3000:24370},
		1700 : {1400:18240,	1500:18636,	1600:19033,	1700:19430,	1800:19836,	1900:20233,	2000:20630,	2100:21802,	2200:22198,	2300:22595,	2400:22994,	2500:23310,	2600:23625,	2700:24131,	2800:24528,	2900:24925,	3000:25324},
		1800 : {1400:18887,	1500:19298,	1600:19710,	1700:20121,	1800:20542,	1900:20953,	2000:21365,	2100:22550,	2200:22962,	2300:23373,	2400:23787,	2500:24117,	2600:24447,	2700:24967,	2800:25378,	2900:25790,	3000:26203},
		1900 : {1400:19458,	1500:19884,	1600:20310,	1700:20736,	1800:21171,	1900:21597,	2000:22023,	2100:23223,	2200:23649,	2300:24075,	2400:24503,	2500:24848,	2600:25192,	2700:25727,	2800:26153,	2900:26578,	3000:27007},
		2000 : {1400:20342,	1500:20783,	1600:21223,	1700:21664,	1800:22113,	1900:22554,	2000:22994,	2100:24209,	2200:24649,	2300:25090,	2400:25533,	2500:25892,	2600:26251,	2700:26799,	2800:27240,	2900:27680,	3000:28123}
	},
	'36-1' : {
		600 : {1400:7939,	1500:8113,	1600:8287,	1700:8450,	1800:8629,	1900:8802,	2000:8965,	2100:9361,	2200:9535,	2300:9698,	2400:9875,	2500:10048,	2600:10170,	2700:10398,	2800:10571,	2900:10734,	3000:10909},
		700 : {1400:8365,	1500:8553,	1600:8740,	1700:8915,	1800:9107,	1900:9294,	2000:9469,	2100:9878,	2200:10065,	2300:10241,	2400:10431,	2500:10618,	2600:10753,	2700:10993,	2800:11180,	2900:11355,	3000:11543},
		800 : {1400:9056,	1500:9256,	1600:9456,	1700:9645,	1800:9849,	1900:10049,	2000:10238,	2100:10988,	2200:11188,	2300:11376,	2400:11579,	2500:11779,	2600:11845,	2700:12099,	2800:12298,	2900:12487,	3000:12688},
		900 : {1400:9594,	1500:9808,	1600:10020,	1700:10222,	1800:10440,	1900:10652,	2000:10854,	2100:11617,	2200:11830,	2300:12032,	2400:12247,	2500:12460,	2600:12540,	2700:12806,	2800:13018,	2900:13220,	3000:13434},
		1000 : {1400:10086,	1500:10313,	1600:10538,	1700:10753,	1800:10984,	1900:11209,	2000:11424,	2100:12200,	2200:12426,	2300:12640,	2400:12869,	2500:13095,	2600:13188,	2700:13467,	2800:13692,	2900:13907,	3000:14134},
		1100 : {1400:10461,	1500:10700,	1600:10939,	1700:11167,	1800:11410,	1900:11649,	2000:11877,	2100:12666,	2200:12904,	2300:13132,	2400:13374,	2500:13613,	2600:13718,	2700:14010,	2800:14249,	2900:14476,	3000:14717},
		1200 : {1400:10908,	1500:11160,	1600:11412,	1700:11652,	1800:11909,	1900:12161,	2000:12401,	2100:13203,	2200:13455,	2300:13696,	2400:13950,	2500:14202,	2600:14321,	2700:14626,	2800:14877,	2900:15118,	3000:15371},
		1300 : {1400:11324,	1500:11589,	1600:11854,	1700:12107,	1800:12377,	1900:12642,	2000:12895,	2100:13710,	2200:13975,	2300:14228,	2400:14496,	2500:14761,	2600:14892,	2700:15210,	2800:15475,	2900:15729,	3000:15995},
		1400 : {1400:11741,	1500:12020,	1600:12298,	1700:12564,	1800:12847,	1900:13124,	2000:13391,	2100:14219,	2200:14497,	2300:14763,	2400:15044,	2500:15322,	2600:15466,	2700:15797,	2800:16075,	2900:16341,	3000:16620},
		1500 : {1400:12181,	1500:12473,	1600:12763,	1700:13043,	1800:13338,	1900:13629,	2000:13909,	2100:14750,	2200:15040,	2300:15320,	2400:15614,	2500:15904,	2600:16062,	2700:16406,	2800:16696,	2900:16976,	3000:17268},
		1600 : {1400:12528,	1500:12833,	1600:13137,	1700:13429,	1800:13738,	1900:14041,	2000:14334,	2100:15188,	2200:15491,	2300:15784,	2400:16091,	2500:16394,	2600:16565,	2700:16922,	2800:17225,	2900:17518,	3000:17823},
		1700 : {1400:13022,	1500:13339,	1600:13656,	1700:13961,	1800:14283,	1900:14599,	2000:14905,	2100:15772,	2200:16088,	2300:16394,	2400:16714,	2500:17030,	2600:17214,	2700:17583,	2800:17900,	2900:18206,	3000:18524},
		1800 : {1400:13513,	1500:13843,	1600:14173,	1700:14491,	1800:14826,	1900:15155,	2000:15474,	2100:16354,	2200:16683,	2300:17002,	2400:17335,	2500:17664,	2600:17861,	2700:18243,	2800:18573,	2900:18892,	3000:19222},
		1900 : {1400:13929,	1500:14272,	1600:14615,	1700:14946,	1800:15294,	1900:15636,	2000:15968,	2100:16861,	2200:17203,	2300:17535,	2400:17880,	2500:18223,	2600:18432,	2700:18828,	2800:19171,	2900:19502,	3000:19846},
		2000 : {1400:14844,	1500:15201,	1600:15556,	1700:15901,	1800:16261,	1900:16617,	2000:16961,	2100:17867,	2200:18223,	2300:18567,	2400:18926,	2500:19281,	2600:19504,	2700:19913,	2800:20268,	2900:20613,	3000:20969}
	},
	'36-2' : {
		600 : {1400:8383,	1500:8527,	1600:8671,	1700:8803,	1800:8951,	1900:9095,	2000:9229,	2100:9958,	2200:10137,	2300:10304,	2400:10486,	2500:10664,	2600:10710,	2700:10941,	2800:11120,	2900:11287,	3000:11467},
		700 : {1400:8822,	1500:8971,	1600:9119,	1700:9255,	1800:9451,	1900:9643,	2000:9823,	2100:10565,	2200:10756,	2300:10937,	2400:11131,	2500:11323,	2600:11381,	2700:11626,	2800:11818,	2900:11998,	3000:12191},
		800 : {1400:9274,	1500:9426,	1600:9628,	1700:9821,	1800:10031,	1900:10235,	2000:10428,	2100:11183,	2200:11388,	2300:11581,	2400:11789,	2500:11993,	2600:12065,	2700:12322,	2800:12527,	2900:12720,	3000:12926},
		900 : {1400:9764,	1500:9982,	1600:10200,	1700:10406,	1800:10629,	1900:10846,	2000:11053,	2100:11820,	2200:12038,	2300:12244,	2400:12465,	2500:12682,	2600:12767,	2700:13037,	2800:13255,	2900:13461,	3000:13680},
		1000 : {1400:10264,	1500:10495,	1600:10726,	1700:10945,	1800:11180,	1900:11411,	2000:11630,	2100:12411,	2200:12641,	2300:12861,	2400:13094,	2500:13325,	2600:13422,	2700:13706,	2800:13936,	2900:14156,	3000:14388},
		1100 : {1400:10646,	1500:10891,	1600:11134,	1700:11367,	1800:11615,	1900:11858,	2000:12091,	2100:12884,	2200:13128,	2300:13360,	2400:13607,	2500:13850,	2600:13960,	2700:14257,	2800:14501,	2900:14733,	3000:14978},
		1200 : {1400:11106,	1500:11363,	1600:11619,	1700:11865,	1800:12126,	1900:12382,	2000:12628,	2100:13434,	2200:13691,	2300:13936,	2400:14196,	2500:14452,	2600:14575,	2700:14885,	2800:15142,	2900:15387,	3000:15645},
		1300 : {1400:11529,	1500:11800,	1600:12069,	1700:12327,	1800:12602,	1900:12871,	2000:13129,	2100:13949,	2200:14218,	2300:14477,	2400:14749,	2500:15019,	2600:15155,	2700:15478,	2800:15747,	2900:16005,	3000:16276},
		1400 : {1400:11955,	1500:12238,	1600:12520,	1700:12792,	1800:13079,	1900:13361,	2000:13633,	2100:14466,	2200:14748,	2300:15019,	2400:15305,	2500:15587,	2600:15736,	2700:16072,	2800:16354,	2900:16626,	3000:16910},
		1500 : {1400:12398,	1500:12694,	1600:12989,	1700:13274,	1800:13574,	1900:13869,	2000:14153,	2100:14999,	2200:15294,	2300:15579,	2400:15877,	2500:16173,	2600:16335,	2700:16684,	2800:16979,	2900:17263,	3000:17560},
		1600 : {1400:13042,	1500:13351,	1600:13659,	1700:13957,	1800:14270,	1900:14578,	2000:14875,	2100:15734,	2200:16042,	2300:16340,	2400:16651,	2500:16960,	2600:17135,	2700:17496,	2800:17805,	2900:18102,	3000:18412},
		1700 : {1400:13543,	1500:13865,	1600:14186,	1700:14496,	1800:14823,	1900:15144,	2000:15454,	2100:16326,	2200:16647,	2300:16957,	2400:17282,	2500:17603,	2600:17791,	2700:18166,	2800:18487,	2900:18798,	3000:19120},
		1800 : {1400:14042,	1500:14377,	1600:14711,	1700:15034,	1800:15373,	1900:15708,	2000:16031,	2100:16916,	2200:17250,	2300:17573,	2400:17911,	2500:18245,	2600:18446,	2700:18834,	2800:19168,	2900:19491,	3000:19827},
		1900 : {1400:14465,	1500:14813,	1600:15161,	1700:15497,	1800:15849,	1900:16196,	2000:16533,	2100:17430,	2200:17778,	2300:18114,	2400:18464,	2500:18812,	2600:19026,	2700:19426,	2800:19774,	2900:20110,	3000:20459},
		2000 : {1400:15099,	1500:15461,	1600:15821,	1700:16170,	1800:16535,	1900:16895,	2000:17245,	2100:18155,	2200:18516,	2300:18865,	2400:19228,	2500:19589,	2600:19816,	2700:20229,	2800:20589,	2900:20939,	3000:21300}
	},
	'36-3' : {
		600 : {1400:9403,	1500:9582,	1600:9760,	1700:9939,	1800:10123,	1900:10302,	2000:10480,	2100:11226,	2200:11443,	2300:11660,	2400:11879,	2500:12096,	2600:12190,	2700:12462,	2800:12678,	2900:12895,	3000:13115},
		700 : {1400:9923,	1500:10106,	1600:10289,	1700:10473,	1800:10684,	1900:10915,	2000:11147,	2100:11930,	2200:12161,	2300:12392,	2400:12626,	2500:12857,	2600:12967,	2700:13252,	2800:13484,	2900:13715,	3000:13949},
		800 : {1400:10452,	1500:10640,	1600:10856,	1700:11102,	1800:11354,	1900:11600,	2000:11846,	2100:12643,	2200:12889,	2300:13135,	2400:13383,	2500:13629,	2600:13753,	2700:14053,	2800:14299,	2900:14545,	3000:14793},
		900 : {1400:11003,	1500:11259,	1600:11519,	1700:11779,	1800:12046,	1900:12306,	2000:12566,	2100:13378,	2200:13638,	2300:13899,	2400:14162,	2500:14422,	2600:14560,	2700:14875,	2800:15135,	2900:15396,	3000:15659},
		1000 : {1400:11584,	1500:11859,	1600:12134,	1700:12409,	1800:12690,	1900:12965,	2000:13240,	2100:14066,	2200:14341,	2300:14616,	2400:14893,	2500:15168,	2600:15321,	2700:15650,	2800:15925,	2900:16200,	3000:16477},
		1100 : {1400:12051,	1500:12341,	1600:12630,	1700:12920,	1800:13215,	1900:13504,	2000:13794,	2100:14634,	2200:14924,	2300:15213,	2400:15505,	2500:15794,	2600:15962,	2700:16305,	2800:16595,	2900:16884,	3000:17176},
		1200 : {1400:12598,	1500:12902,	1600:13206,	1700:13510,	1800:13819,	1900:14123,	2000:14427,	2100:15282,	2200:15586,	2300:15890,	2400:16196,	2500:16500,	2600:16682,	2700:17040,	2800:17344,	2900:17648,	3000:17954},
		1300 : {1400:13108,	1500:13426,	1600:13745,	1700:14063,	1800:14387,	1900:14706,	2000:15024,	2100:15894,	2200:16212,	2300:16531,	2400:16852,	2500:17170,	2600:17366,	2700:17739,	2800:18057,	2900:18376,	3000:18697},
		1400 : {1400:13618,	1500:13951,	1600:14284,	1700:14617,	1800:14955,	1900:15288,	2000:15621,	2100:16506,	2200:16839,	2300:17172,	2400:17507,	2500:17840,	2600:18051,	2700:18438,	2800:18771,	2900:19104,	3000:19439},
		1500 : {1400:14148,	1500:14495,	1600:14843,	1700:15190,	1800:15543,	1900:15891,	2000:16238,	2100:17137,	2200:17485,	2300:17832,	2400:18182,	2500:18529,	2600:18755,	2700:19156,	2800:19504,	2900:19851,	3000:20201},
		1600 : {1400:14878,	1500:15240,	1600:15602,	1700:15964,	1800:16332,	1900:16694,	2000:17056,	2100:17969,	2200:18331,	2300:18693,	2400:19057,	2500:19419,	2600:19659,	2700:20075,	2800:20437,	2900:20799,	3000:21164},
		1700 : {1400:15464,	1500:15840,	1600:16217,	1700:16593,	1800:16975,	1900:17352,	2000:17728,	2100:18656,	2200:19033,	2300:19409,	2400:19788,	2500:20164,	2600:20419,	2700:20849,	2800:21226,	2900:21602,	3000:21981},
		1800 : {1400:16050,	1500:16441,	1600:16832,	1700:17223,	1800:17620,	1900:18011,	2000:18402,	2100:19344,	2200:19735,	2300:20126,	2400:20519,	2500:20910,	2600:21179,	2700:21624,	2800:22015,	2900:22406,	3000:22799},
		1900 : {1400:16560,	1500:16965,	1600:17371,	1700:17776,	1800:18188,	1900:18593,	2000:18999,	2100:19955,	2200:20361,	2300:20766,	2400:21174,	2500:21580,	2600:21863,	2700:22323,	2800:22728,	2900:23134,	3000:23542},
		2000 : {1400:17279,	1500:17699,	1600:18119,	1700:18539,	1800:18964,	1900:19384,	2000:19804,	2100:20776,	2200:21196,	2300:21616,	2400:22038,	2500:22458,	2600:22756,	2700:23230,	2800:23650,	2900:24070,	3000:24492}
	},
	'37-1' : {
		600 : {1400:9055,	1500:9244,	1600:9437,	1700:9618,	1800:9811,	1900:10004,	2000:10186,	2100:10596,	2200:10789,	2300:10972,	2400:11163,	2500:11356,	2600:11497,	2700:11738,	2800:11931,	2900:12113,	3000:12303},
		700 : {1400:9533,	1500:9735,	1600:9941,	1700:10136,	1800:10341,	1900:10547,	2000:10742,	2100:11165,	2200:11371,	2300:11567,	2400:11771,	2500:11977,	2600:12131,	2700:12385,	2800:12591,	2900:12786,	3000:12988},
		800 : {1400:10498,	1500:10713,	1600:10932,	1700:11140,	1800:11359,	1900:11577,	2000:11785,	2100:12878,	2200:13097,	2300:13305,	2400:13522,	2500:13660,	2600:13745,	2700:14013,	2800:14232,	2900:14439,	3000:14655},
		900 : {1400:11089,	1500:11317,	1600:11549,	1700:11770,	1800:12001,	1900:12233,	2000:12454,	2100:13559,	2200:13791,	2300:14013,	2400:14243,	2500:14393,	2600:14492,	2700:14772,	2800:15004,	2900:15225,	3000:15453},
		1000 : {1400:11710,	1500:11951,	1600:12195,	1700:12429,	1800:12674,	1900:12919,	2000:13153,	2100:14271,	2200:14516,	2300:14750,	2400:14993,	2500:15157,	2600:15269,	2700:15562,	2800:15807,	2900:16040,	3000:16282},
		1100 : {1400:12116,	1500:12370,	1600:12628,	1700:12875,	1800:13132,	1900:13390,	2000:13637,	2100:14768,	2200:15026,	2300:15274,	2400:15530,	2500:15706,	2600:15831,	2700:16137,	2800:16395,	2900:16642,	3000:16896},
		1200 : {1400:12616,	1500:12882,	1600:13153,	1700:13413,	1800:13684,	1900:13954,	2000:14214,	2100:15358,	2200:15629,	2300:15890,	2400:16159,	2500:16348,	2600:16486,	2700:16805,	2800:17076,	2900:17336,	3000:17603},
		1300 : {1400:13084,	1500:13364,	1600:13648,	1700:13920,	1800:14204,	1900:14488,	2000:14761,	2100:15918,	2200:16202,	2300:16475,	2400:16757,	2500:16960,	2600:17110,	2700:17442,	2800:17726,	2900:17999,	3000:18279},
		1400 : {1400:13555,	1500:13848,	1600:14145,	1700:14430,	1800:14727,	1900:15024,	2000:15310,	2100:16480,	2200:16777,	2300:17063,	2400:17358,	2500:17573,	2600:17737,	2700:18082,	2800:18379,	2900:18665,	3000:18958},
		1500 : {1400:14047,	1500:14353,	1600:14663,	1700:14962,	1800:15271,	1900:15581,	2000:15880,	2100:17063,	2200:17373,	2300:17672,	2400:17980,	2500:18208,	2600:18385,	2700:18743,	2800:19053,	2900:19352,	3000:19658},
		1600 : {1400:14269,	1500:14588,	1600:14911,	1700:15222,	1800:15545,	1900:15868,	2000:16179,	2100:17375,	2200:17698,	2300:18011,	2400:18332,	2500:18573,	2600:18763,	2700:19134,	2800:19456,	2900:19768,	3000:20087},
		1700 : {1400:14816,	1500:15147,	1600:15483,	1700:15808,	1800:16143,	1900:16479,	2000:16804,	2100:18013,	2200:18349,	2300:18674,	2400:19008,	2500:19262,	2600:19465,	2700:19849,	2800:20185,	2900:20509,	3000:20841},
		1800 : {1400:15435,	1500:15780,	1600:16129,	1700:16466,	1800:16815,	1900:17164,	2000:17501,	2100:18723,	2200:19072,	2300:19411,	2400:19758,	2500:20025,	2600:20240,	2700:20637,	2800:20986,	2900:21324,	3000:21669},
		1900 : {1400:15904,	1500:16261,	1600:16623,	1700:16974,	1800:17335,	1900:17697,	2000:18048,	2100:19283,	2200:19644,	2300:19996,	2400:20356,	2500:20636,	2600:20865,	2700:21275,	2800:21636,	2900:21987,	3000:22345},
		2000 : {1400:17265,	1500:17636,	1600:18010,	1700:18374,	1800:18749,	1900:19123,	2000:19487,	2100:20735,	2200:21110,	2300:21474,	2400:21847,	2500:22140,	2600:22382,	2700:22805,	2800:23179,	2900:23543,	3000:23914}
	},
	'37-2' : {
		600 : {1400:9684,	1500:9830,	1600:9970,	1700:10103,	1800:10253,	1900:10393,	2000:10869,	2100:11617,	2200:11809,	2300:11997,	2400:12197,	2500:12308,	2600:12372,	2700:12623,	2800:12815,	2900:13002,	3000:13201},
		700 : {1400:10218,	1500:10363,	1600:10503,	1700:10651,	1800:10865,	1900:11070,	2000:11598,	2100:12359,	2200:12564,	2300:12764,	2400:12978,	2500:13102,	2600:13179,	2700:13443,	2800:13648,	2900:13847,	3000:14059},
		800 : {1400:10733,	1500:10895,	1600:11110,	1700:11322,	1800:11550,	1900:11769,	2000:12309,	2100:13083,	2200:13301,	2300:13515,	2400:13741,	2500:13878,	2600:13968,	2700:14245,	2800:14463,	2900:14676,	3000:14900},
		900 : {1400:11267,	1500:11505,	1600:11736,	1700:11961,	1800:12203,	1900:12434,	2000:12987,	2100:13774,	2200:14005,	2300:14232,	2400:14471,	2500:14621,	2600:14724,	2700:15014,	2800:15245,	2900:15471,	3000:15708},
		1000 : {1400:11897,	1500:12148,	1600:12392,	1700:12630,	1800:12884,	1900:13129,	2000:13695,	2100:14495,	2200:14739,	2300:14978,	2400:15231,	2500:15394,	2600:15510,	2700:15813,	2800:16057,	2900:16295,	3000:16546},
		1100 : {1400:12313,	1500:12576,	1600:12834,	1700:13085,	1800:13352,	1900:13610,	2000:14189,	2100:15002,	2200:15259,	2300:15511,	2400:15777,	2500:15952,	2600:16082,	2700:16397,	2800:16655,	2900:16906,	3000:17170},
		1200 : {1400:12826,	1500:13103,	1600:13373,	1700:13637,	1800:13917,	1900:14188,	2000:14780,	2100:15606,	2200:15876,	2300:16141,	2400:16420,	2500:16608,	2600:16751,	2700:17079,	2800:17349,	2900:17614,	3000:17890},
		1300 : {1400:13304,	1500:13593,	1600:13877,	1700:14154,	1800:14447,	1900:14730,	2000:15336,	2100:16174,	2200:16458,	2300:16736,	2400:17027,	2500:17229,	2600:17384,	2700:17726,	2800:18009,	2900:18286,	3000:18576},
		1400 : {1400:13785,	1500:14087,	1600:14383,	1700:14673,	1800:14979,	1900:15276,	2000:15894,	2100:16746,	2200:17042,	2300:17333,	2400:17637,	2500:17852,	2600:18020,	2700:18375,	2800:18671,	2900:18961,	3000:19264},
		1500 : {1400:14281,	1500:14597,	1600:14906,	1700:15209,	1800:15528,	1900:15837,	2000:16469,	2100:17333,	2200:17642,	2300:17947,	2400:18264,	2500:18492,	2600:18673,	2700:19041,	2800:19350,	2900:19653,	3000:19969},
		1600 : {1400:15090,	1500:15418,	1600:15740,	1700:16056,	1800:16388,	1900:16711,	2000:17355,	2100:18232,	2200:18555,	2300:18872,	2400:19202,	2500:19443,	2600:19637,	2700:20018,	2800:20340,	2900:20656,	3000:20985},
		1700 : {1400:15646,	1500:15987,	1600:16322,	1700:16651,	1800:16996,	1900:17331,	2000:17989,	2100:18879,	2200:19214,	2300:19544,	2400:19888,	2500:20141,	2600:20349,	2700:20742,	2800:21077,	2900:21406,	3000:21748},
		1800 : {1400:16275,	1500:16629,	1600:16977,	1700:17319,	1800:17677,	1900:18025,	2000:18695,	2100:19599,	2200:19947,	2300:20290,	2400:20647,	2500:20913,	2600:21133,	2700:21540,	2800:21888,	2900:22230,	3000:22585},
		1900 : {1400:16752,	1500:17119,	1600:17480,	1700:17836,	1800:18207,	1900:18568,	2000:19251,	2100:20168,	2200:20529,	2300:20885,	2400:21254,	2500:21534,	2600:21767,	2700:22186,	2800:22548,	2900:22903,	3000:23270},
		2000 : {1400:17546,	1500:17926,	1600:18300,	1700:18668,	1800:19052,	1900:19426,	2000:20122,	2100:21052,	2200:21426,	2300:21795,	2400:22177,	2500:22470,	2600:22716,	2700:23149,	2800:23523,	2900:23891,	3000:24271}
	},
	'37-3' : {
		600 : {1400:10871,	1500:11050,	1600:11230,	1700:11410,	1800:11596,	1900:11776,	2000:11957,	2100:13051,	2200:13288,	2300:13525,	2400:13765,	2500:13921,	2600:14036,	2700:14328,	2800:14565,	2900:14802,	3000:15042},
		700 : {1400:11488,	1500:11667,	1600:11847,	1700:12030,	1800:12262,	1900:12514,	2000:12766,	2100:13897,	2200:14149,	2300:14400,	2400:14654,	2500:14825,	2600:14954,	2700:15261,	2800:15512,	2900:15764,	3000:16018},
		800 : {1400:12084,	1500:12269,	1600:12506,	1700:12772,	1800:13044,	1900:13311,	2000:13577,	2100:14723,	2200:14989,	2300:15255,	2400:15524,	2500:15709,	2600:15853,	2700:16173,	2800:16440,	2900:16706,	3000:16975},
		900 : {1400:12672,	1500:12949,	1600:13229,	1700:13510,	1800:13797,	1900:14078,	2000:14359,	2100:15519,	2200:15800,	2300:16080,	2400:16364,	2500:16563,	2600:16722,	2700:17057,	2800:17337,	2900:17618,	3000:17901},
		1000 : {1400:13391,	1500:13687,	1600:13982,	1700:14277,	1800:14578,	1900:14874,	2000:15169,	2100:16344,	2200:16639,	2300:16934,	2400:17232,	2500:17446,	2600:17619,	2700:17969,	2800:18264,	2900:18559,	3000:18857},
		1100 : {1400:13898,	1500:14208,	1600:14518,	1700:14828,	1800:15143,	1900:15453,	2000:15763,	2100:16952,	2200:17262,	2300:17572,	2400:17884,	2500:18112,	2600:18300,	2700:18664,	2800:18974,	2900:19284,	3000:19596},
		1200 : {1400:14506,	1500:14830,	1600:15154,	1700:15479,	1800:15809,	1900:16133,	2000:16458,	2100:17661,	2200:17985,	2300:18310,	2400:18637,	2500:18879,	2600:19082,	2700:19460,	2800:19785,	2900:20109,	3000:20436},
		1300 : {1400:15077,	1500:15416,	1600:15755,	1700:16094,	1800:16438,	1900:16777,	2000:17116,	2100:18334,	2200:18673,	2300:19012,	2400:19353,	2500:19610,	2600:19827,	2700:20220,	2800:20559,	2900:20898,	3000:21239},
		1400 : {1400:15648,	1500:16002,	1600:16355,	1700:16708,	1800:17067,	1900:17421,	2000:17774,	2100:19007,	2200:19360,	2300:19714,	2400:20069,	2500:20341,	2600:20572,	2700:20980,	2800:21333,	2900:21687,	3000:22042},
		1500 : {1400:16239,	1500:16607,	1600:16975,	1700:17343,	1800:17717,	1900:18085,	2000:18452,	2100:19700,	2200:20067,	2300:20435,	2400:20806,	2500:21092,	2600:21338,	2700:21760,	2800:22128,	2900:22496,	3000:22866},
		1600 : {1400:17141,	1500:17524,	1600:17906,	1700:18288,	1800:18677,	1900:19059,	2000:19441,	2100:20703,	2200:21085,	2300:21468,	2400:21852,	2500:22153,	2600:22414,	2700:22850,	2800:23233,	2900:23615,	3000:24000},
		1700 : {1400:17788,	1500:18185,	1600:18582,	1700:18979,	1800:19381,	1900:19778,	2000:20175,	2100:21451,	2200:21848,	2300:22245,	2400:22644,	2500:22960,	2600:23234,	2700:23685,	2800:24082,	2900:24479,	3000:24878},
		1800 : {1400:18511,	1500:18923,	1600:19334,	1700:19746,	1800:20163,	1900:20574,	2000:20985,	2100:22276,	2200:22688,	2300:23099,	2400:23513,	2500:23843,	2600:24132,	2700:24598,	2800:25009,	2900:25420,	3000:25834},
		1900 : {1400:19083,	1500:19509,	1600:19934,	1700:20360,	1800:20792,	1900:21218,	2000:21644,	2100:22949,	2200:23375,	2300:23801,	2400:24229,	2500:24573,	2600:24877,	2700:25357,	2800:25783,	2900:26209,	3000:26637},
		2000 : {1400:19967,	1500:20407,	1600:20848,	1700:21288,	1800:21734,	1900:22175,	2000:22615,	2100:23935,	2200:24375,	2300:24816,	2400:25258,	2500:25617,	2600:25936,	2700:26430,	2800:26871,	2900:27311,	3000:27754}
	},
	'38-1' : {
		600 : {1400:9055,	1500:9244,	1600:9437,	1700:9618,	1800:9811,	1900:10004,	2000:10186,	2100:10596,	2200:10789,	2300:10972,	2400:11163,	2500:11356,	2600:11497,	2700:11738,	2800:11931,	2900:12113,	3000:12303},
		700 : {1400:9533,	1500:9735,	1600:9941,	1700:10136,	1800:10341,	1900:10547,	2000:10742,	2100:11165,	2200:11371,	2300:11567,	2400:11771,	2500:11977,	2600:12131,	2700:12385,	2800:12591,	2900:12786,	3000:12988},
		800 : {1400:10498,	1500:10713,	1600:10932,	1700:11140,	1800:11359,	1900:11577,	2000:11785,	2100:12878,	2200:13097,	2300:13305,	2400:13522,	2500:13660,	2600:13745,	2700:14013,	2800:14232,	2900:14439,	3000:14655},
		900 : {1400:11089,	1500:11317,	1600:11549,	1700:11770,	1800:12001,	1900:12233,	2000:12454,	2100:13559,	2200:13791,	2300:14013,	2400:14243,	2500:14393,	2600:14492,	2700:14772,	2800:15004,	2900:15225,	3000:15453},
		1000 : {1400:11710,	1500:11951,	1600:12195,	1700:12429,	1800:12674,	1900:12919,	2000:13153,	2100:14271,	2200:14516,	2300:14750,	2400:14993,	2500:15157,	2600:15269,	2700:15562,	2800:15807,	2900:16040,	3000:16282},
		1100 : {1400:12116,	1500:12370,	1600:12628,	1700:12875,	1800:13132,	1900:13390,	2000:13637,	2100:14768,	2200:15026,	2300:15274,	2400:15530,	2500:15706,	2600:15831,	2700:16137,	2800:16395,	2900:16642,	3000:16896},
		1200 : {1400:12616,	1500:12882,	1600:13153,	1700:13413,	1800:13684,	1900:13954,	2000:14214,	2100:15358,	2200:15629,	2300:15890,	2400:16159,	2500:16348,	2600:16486,	2700:16805,	2800:17076,	2900:17336,	3000:17603},
		1300 : {1400:13084,	1500:13364,	1600:13648,	1700:13920,	1800:14204,	1900:14488,	2000:14761,	2100:15918,	2200:16202,	2300:16475,	2400:16757,	2500:16960,	2600:17110,	2700:17442,	2800:17726,	2900:17999,	3000:18279},
		1400 : {1400:13555,	1500:13848,	1600:14145,	1700:14430,	1800:14727,	1900:15024,	2000:15310,	2100:16480,	2200:16777,	2300:17063,	2400:17358,	2500:17573,	2600:17737,	2700:18082,	2800:18379,	2900:18665,	3000:18958},
		1500 : {1400:14047,	1500:14353,	1600:14663,	1700:14962,	1800:15271,	1900:15581,	2000:15880,	2100:17063,	2200:17373,	2300:17672,	2400:17980,	2500:18208,	2600:18385,	2700:18743,	2800:19053,	2900:19352,	3000:19658},
		1600 : {1400:14269,	1500:14588,	1600:14911,	1700:15222,	1800:15545,	1900:15868,	2000:16179,	2100:17375,	2200:17698,	2300:18011,	2400:18332,	2500:18573,	2600:18763,	2700:19134,	2800:19456,	2900:19768,	3000:20087},
		1700 : {1400:14816,	1500:15147,	1600:15483,	1700:15808,	1800:16143,	1900:16479,	2000:16804,	2100:18013,	2200:18349,	2300:18674,	2400:19008,	2500:19262,	2600:19465,	2700:19849,	2800:20185,	2900:20509,	3000:20841},
		1800 : {1400:15435,	1500:15780,	1600:16129,	1700:16466,	1800:16815,	1900:17164,	2000:17501,	2100:18723,	2200:19072,	2300:19411,	2400:19758,	2500:20025,	2600:20240,	2700:20637,	2800:20986,	2900:21324,	3000:21669},
		1900 : {1400:15904,	1500:16261,	1600:16623,	1700:16974,	1800:17335,	1900:17697,	2000:18048,	2100:19283,	2200:19644,	2300:19996,	2400:20356,	2500:20636,	2600:20865,	2700:21275,	2800:21636,	2900:21987,	3000:22345},
		2000 : {1400:17265,	1500:17636,	1600:18010,	1700:18374,	1800:18749,	1900:19123,	2000:19487,	2100:20735,	2200:21110,	2300:21474,	2400:21847,	2500:22140,	2600:22382,	2700:22805,	2800:23179,	2900:23543,	3000:23914}
	},
	'38-2' : {
		600 : {1400:9684,	1500:9830,	1600:9970,	1700:10103,	1800:10253,	1900:10393,	2000:10869,	2100:11617,	2200:11809,	2300:11997,	2400:12197,	2500:12308,	2600:12372,	2700:12623,	2800:12815,	2900:13002,	3000:13201},
		700 : {1400:10218,	1500:10363,	1600:10503,	1700:10651,	1800:10865,	1900:11070,	2000:11598,	2100:12359,	2200:12564,	2300:12764,	2400:12978,	2500:13102,	2600:13179,	2700:13443,	2800:13648,	2900:13847,	3000:14059},
		800 : {1400:10733,	1500:10895,	1600:11110,	1700:11322,	1800:11550,	1900:11769,	2000:12309,	2100:13083,	2200:13301,	2300:13515,	2400:13741,	2500:13878,	2600:13968,	2700:14245,	2800:14463,	2900:14676,	3000:14900},
		900 : {1400:11267,	1500:11505,	1600:11736,	1700:11961,	1800:12203,	1900:12434,	2000:12987,	2100:13774,	2200:14005,	2300:14232,	2400:14471,	2500:14621,	2600:14724,	2700:15014,	2800:15245,	2900:15471,	3000:15708},
		1000 : {1400:11897,	1500:12148,	1600:12392,	1700:12630,	1800:12884,	1900:13129,	2000:13695,	2100:14495,	2200:14739,	2300:14978,	2400:15231,	2500:15394,	2600:15510,	2700:15813,	2800:16057,	2900:16295,	3000:16546},
		1100 : {1400:12313,	1500:12576,	1600:12834,	1700:13085,	1800:13352,	1900:13610,	2000:14189,	2100:15002,	2200:15259,	2300:15511,	2400:15777,	2500:15952,	2600:16082,	2700:16397,	2800:16655,	2900:16906,	3000:17170},
		1200 : {1400:12826,	1500:13103,	1600:13373,	1700:13637,	1800:13917,	1900:14188,	2000:14780,	2100:15606,	2200:15876,	2300:16141,	2400:16420,	2500:16608,	2600:16751,	2700:17079,	2800:17349,	2900:17614,	3000:17890},
		1300 : {1400:13304,	1500:13593,	1600:13877,	1700:14154,	1800:14447,	1900:14730,	2000:15336,	2100:16174,	2200:16458,	2300:16736,	2400:17027,	2500:17229,	2600:17384,	2700:17726,	2800:18009,	2900:18286,	3000:18576},
		1400 : {1400:13785,	1500:14087,	1600:14383,	1700:14673,	1800:14979,	1900:15276,	2000:15894,	2100:16746,	2200:17042,	2300:17333,	2400:17637,	2500:17852,	2600:18020,	2700:18375,	2800:18671,	2900:18961,	3000:19264},
		1500 : {1400:14281,	1500:14597,	1600:14906,	1700:15209,	1800:15528,	1900:15837,	2000:16469,	2100:17333,	2200:17642,	2300:17947,	2400:18264,	2500:18492,	2600:18673,	2700:19041,	2800:19350,	2900:19653,	3000:19969},
		1600 : {1400:15090,	1500:15418,	1600:15740,	1700:16056,	1800:16388,	1900:16711,	2000:17355,	2100:18232,	2200:18555,	2300:18872,	2400:19202,	2500:19443,	2600:19637,	2700:20018,	2800:20340,	2900:20656,	3000:20985},
		1700 : {1400:15646,	1500:15987,	1600:16322,	1700:16651,	1800:16996,	1900:17331,	2000:17989,	2100:18879,	2200:19214,	2300:19544,	2400:19888,	2500:20141,	2600:20349,	2700:20742,	2800:21077,	2900:21406,	3000:21748},
		1800 : {1400:16275,	1500:16629,	1600:16977,	1700:17319,	1800:17677,	1900:18025,	2000:18695,	2100:19599,	2200:19947,	2300:20290,	2400:20647,	2500:20913,	2600:21133,	2700:21540,	2800:21888,	2900:22230,	3000:22585},
		1900 : {1400:16752,	1500:17119,	1600:17480,	1700:17836,	1800:18207,	1900:18568,	2000:19251,	2100:20168,	2200:20529,	2300:20885,	2400:21254,	2500:21534,	2600:21767,	2700:22186,	2800:22548,	2900:22903,	3000:23270},
		2000 : {1400:17546,	1500:17926,	1600:18300,	1700:18668,	1800:19052,	1900:19426,	2000:20122,	2100:21052,	2200:21426,	2300:21795,	2400:22177,	2500:22470,	2600:22716,	2700:23149,	2800:23523,	2900:23891,	3000:24271}
	},
	'38-3' : {
		600 : {1400:10871,	1500:11050,	1600:11230,	1700:11410,	1800:11596,	1900:11776,	2000:11957,	2100:13051,	2200:13288,	2300:13525,	2400:13765,	2500:13921,	2600:14036,	2700:14328,	2800:14565,	2900:14802,	3000:15042},
		700 : {1400:11488,	1500:11667,	1600:11847,	1700:12030,	1800:12262,	1900:12514,	2000:12766,	2100:13897,	2200:14149,	2300:14400,	2400:14654,	2500:14825,	2600:14954,	2700:15261,	2800:15512,	2900:15764,	3000:16018},
		800 : {1400:12084,	1500:12269,	1600:12506,	1700:12772,	1800:13044,	1900:13311,	2000:13577,	2100:14723,	2200:14989,	2300:15255,	2400:15524,	2500:15709,	2600:15853,	2700:16173,	2800:16440,	2900:16706,	3000:16975},
		900 : {1400:12672,	1500:12949,	1600:13229,	1700:13510,	1800:13797,	1900:14078,	2000:14359,	2100:15519,	2200:15800,	2300:16080,	2400:16364,	2500:16563,	2600:16722,	2700:17057,	2800:17337,	2900:17618,	3000:17901},
		1000 : {1400:13391,	1500:13687,	1600:13982,	1700:14277,	1800:14578,	1900:14874,	2000:15169,	2100:16344,	2200:16639,	2300:16934,	2400:17232,	2500:17446,	2600:17619,	2700:17969,	2800:18264,	2900:18559,	3000:18857},
		1100 : {1400:13898,	1500:14208,	1600:14518,	1700:14828,	1800:15143,	1900:15453,	2000:15763,	2100:16952,	2200:17262,	2300:17572,	2400:17884,	2500:18112,	2600:18300,	2700:18664,	2800:18974,	2900:19284,	3000:19596},
		1200 : {1400:14506,	1500:14830,	1600:15154,	1700:15479,	1800:15809,	1900:16133,	2000:16458,	2100:17661,	2200:17985,	2300:18310,	2400:18637,	2500:18879,	2600:19082,	2700:19460,	2800:19785,	2900:20109,	3000:20436},
		1300 : {1400:15077,	1500:15416,	1600:15755,	1700:16094,	1800:16438,	1900:16777,	2000:17116,	2100:18334,	2200:18673,	2300:19012,	2400:19353,	2500:19610,	2600:19827,	2700:20220,	2800:20559,	2900:20898,	3000:21239},
		1400 : {1400:15648,	1500:16002,	1600:16355,	1700:16708,	1800:17067,	1900:17421,	2000:17774,	2100:19007,	2200:19360,	2300:19714,	2400:20069,	2500:20341,	2600:20572,	2700:20980,	2800:21333,	2900:21687,	3000:22042},
		1500 : {1400:16239,	1500:16607,	1600:16975,	1700:17343,	1800:17717,	1900:18085,	2000:18452,	2100:19700,	2200:20067,	2300:20435,	2400:20806,	2500:21092,	2600:21338,	2700:21760,	2800:22128,	2900:22496,	3000:22866},
		1600 : {1400:17141,	1500:17524,	1600:17906,	1700:18288,	1800:18677,	1900:19059,	2000:19441,	2100:20703,	2200:21085,	2300:21468,	2400:21852,	2500:22153,	2600:22414,	2700:22850,	2800:23233,	2900:23615,	3000:24000},
		1700 : {1400:17788,	1500:18185,	1600:18582,	1700:18979,	1800:19381,	1900:19778,	2000:20175,	2100:21451,	2200:21848,	2300:22245,	2400:22644,	2500:22960,	2600:23234,	2700:23685,	2800:24082,	2900:24479,	3000:24878},
		1800 : {1400:18511,	1500:18923,	1600:19334,	1700:19746,	1800:20163,	1900:20574,	2000:20985,	2100:22276,	2200:22688,	2300:23099,	2400:23513,	2500:23843,	2600:24132,	2700:24598,	2800:25009,	2900:25420,	3000:25834},
		1900 : {1400:19083,	1500:19509,	1600:19934,	1700:20360,	1800:20792,	1900:21218,	2000:21644,	2100:22949,	2200:23375,	2300:23801,	2400:24229,	2500:24573,	2600:24877,	2700:25357,	2800:25783,	2900:26209,	3000:26637},
		2000 : {1400:19967,	1500:20407,	1600:20848,	1700:21288,	1800:21734,	1900:22175,	2000:22615,	2100:23935,	2200:24375,	2300:24816,	2400:25258,	2500:25617,	2600:25936,	2700:26430,	2800:26871,	2900:27311,	3000:27754}
	},
	'39-1' : {
		600 : {1400:9055,	1500:9244,	1600:9437,	1700:9618,	1800:9811,	1900:10004,	2000:10186,	2100:10596,	2200:10789,	2300:10972,	2400:11163,	2500:11356,	2600:11497,	2700:11738,	2800:11931,	2900:12113,	3000:12303},
		700 : {1400:9533,	1500:9735,	1600:9941,	1700:10136,	1800:10341,	1900:10547,	2000:10742,	2100:11165,	2200:11371,	2300:11567,	2400:11771,	2500:11977,	2600:12131,	2700:12385,	2800:12591,	2900:12786,	3000:12988},
		800 : {1400:10498,	1500:10713,	1600:10932,	1700:11140,	1800:11359,	1900:11577,	2000:11785,	2100:12878,	2200:13097,	2300:13305,	2400:13522,	2500:13660,	2600:13745,	2700:14013,	2800:14232,	2900:14439,	3000:14655},
		900 : {1400:11089,	1500:11317,	1600:11549,	1700:11770,	1800:12001,	1900:12233,	2000:12454,	2100:13559,	2200:13791,	2300:14013,	2400:14243,	2500:14393,	2600:14492,	2700:14772,	2800:15004,	2900:15225,	3000:15453},
		1000 : {1400:11710,	1500:11951,	1600:12195,	1700:12429,	1800:12674,	1900:12919,	2000:13153,	2100:14271,	2200:14516,	2300:14750,	2400:14993,	2500:15157,	2600:15269,	2700:15562,	2800:15807,	2900:16040,	3000:16282},
		1100 : {1400:12116,	1500:12370,	1600:12628,	1700:12875,	1800:13132,	1900:13390,	2000:13637,	2100:14768,	2200:15026,	2300:15274,	2400:15530,	2500:15706,	2600:15831,	2700:16137,	2800:16395,	2900:16642,	3000:16896},
		1200 : {1400:12616,	1500:12882,	1600:13153,	1700:13413,	1800:13684,	1900:13954,	2000:14214,	2100:15358,	2200:15629,	2300:15890,	2400:16159,	2500:16348,	2600:16486,	2700:16805,	2800:17076,	2900:17336,	3000:17603},
		1300 : {1400:13084,	1500:13364,	1600:13648,	1700:13920,	1800:14204,	1900:14488,	2000:14761,	2100:15918,	2200:16202,	2300:16475,	2400:16757,	2500:16960,	2600:17110,	2700:17442,	2800:17726,	2900:17999,	3000:18279},
		1400 : {1400:13555,	1500:13848,	1600:14145,	1700:14430,	1800:14727,	1900:15024,	2000:15310,	2100:16480,	2200:16777,	2300:17063,	2400:17358,	2500:17573,	2600:17737,	2700:18082,	2800:18379,	2900:18665,	3000:18958},
		1500 : {1400:14047,	1500:14353,	1600:14663,	1700:14962,	1800:15271,	1900:15581,	2000:15880,	2100:17063,	2200:17373,	2300:17672,	2400:17980,	2500:18208,	2600:18385,	2700:18743,	2800:19053,	2900:19352,	3000:19658},
		1600 : {1400:14269,	1500:14588,	1600:14911,	1700:15222,	1800:15545,	1900:15868,	2000:16179,	2100:17375,	2200:17698,	2300:18011,	2400:18332,	2500:18573,	2600:18763,	2700:19134,	2800:19456,	2900:19768,	3000:20087},
		1700 : {1400:14816,	1500:15147,	1600:15483,	1700:15808,	1800:16143,	1900:16479,	2000:16804,	2100:18013,	2200:18349,	2300:18674,	2400:19008,	2500:19262,	2600:19465,	2700:19849,	2800:20185,	2900:20509,	3000:20841},
		1800 : {1400:15435,	1500:15780,	1600:16129,	1700:16466,	1800:16815,	1900:17164,	2000:17501,	2100:18723,	2200:19072,	2300:19411,	2400:19758,	2500:20025,	2600:20240,	2700:20637,	2800:20986,	2900:21324,	3000:21669},
		1900 : {1400:15904,	1500:16261,	1600:16623,	1700:16974,	1800:17335,	1900:17697,	2000:18048,	2100:19283,	2200:19644,	2300:19996,	2400:20356,	2500:20636,	2600:20865,	2700:21275,	2800:21636,	2900:21987,	3000:22345},
		2000 : {1400:17265,	1500:17636,	1600:18010,	1700:18374,	1800:18749,	1900:19123,	2000:19487,	2100:20735,	2200:21110,	2300:21474,	2400:21847,	2500:22140,	2600:22382,	2700:22805,	2800:23179,	2900:23543,	3000:23914}
	},
	'39-2' : {
		600 : {1400:9684,	1500:9830,	1600:9970,	1700:10103,	1800:10253,	1900:10393,	2000:10869,	2100:11617,	2200:11809,	2300:11997,	2400:12197,	2500:12308,	2600:12372,	2700:12623,	2800:12815,	2900:13002,	3000:13201},
		700 : {1400:10218,	1500:10363,	1600:10503,	1700:10651,	1800:10865,	1900:11070,	2000:11598,	2100:12359,	2200:12564,	2300:12764,	2400:12978,	2500:13102,	2600:13179,	2700:13443,	2800:13648,	2900:13847,	3000:14059},
		800 : {1400:10733,	1500:10895,	1600:11110,	1700:11322,	1800:11550,	1900:11769,	2000:12309,	2100:13083,	2200:13301,	2300:13515,	2400:13741,	2500:13878,	2600:13968,	2700:14245,	2800:14463,	2900:14676,	3000:14900},
		900 : {1400:11267,	1500:11505,	1600:11736,	1700:11961,	1800:12203,	1900:12434,	2000:12987,	2100:13774,	2200:14005,	2300:14232,	2400:14471,	2500:14621,	2600:14724,	2700:15014,	2800:15245,	2900:15471,	3000:15708},
		1000 : {1400:11897,	1500:12148,	1600:12392,	1700:12630,	1800:12884,	1900:13129,	2000:13695,	2100:14495,	2200:14739,	2300:14978,	2400:15231,	2500:15394,	2600:15510,	2700:15813,	2800:16057,	2900:16295,	3000:16546},
		1100 : {1400:12313,	1500:12576,	1600:12834,	1700:13085,	1800:13352,	1900:13610,	2000:14189,	2100:15002,	2200:15259,	2300:15511,	2400:15777,	2500:15952,	2600:16082,	2700:16397,	2800:16655,	2900:16906,	3000:17170},
		1200 : {1400:12826,	1500:13103,	1600:13373,	1700:13637,	1800:13917,	1900:14188,	2000:14780,	2100:15606,	2200:15876,	2300:16141,	2400:16420,	2500:16608,	2600:16751,	2700:17079,	2800:17349,	2900:17614,	3000:17890},
		1300 : {1400:13304,	1500:13593,	1600:13877,	1700:14154,	1800:14447,	1900:14730,	2000:15336,	2100:16174,	2200:16458,	2300:16736,	2400:17027,	2500:17229,	2600:17384,	2700:17726,	2800:18009,	2900:18286,	3000:18576},
		1400 : {1400:13785,	1500:14087,	1600:14383,	1700:14673,	1800:14979,	1900:15276,	2000:15894,	2100:16746,	2200:17042,	2300:17333,	2400:17637,	2500:17852,	2600:18020,	2700:18375,	2800:18671,	2900:18961,	3000:19264},
		1500 : {1400:14281,	1500:14597,	1600:14906,	1700:15209,	1800:15528,	1900:15837,	2000:16469,	2100:17333,	2200:17642,	2300:17947,	2400:18264,	2500:18492,	2600:18673,	2700:19041,	2800:19350,	2900:19653,	3000:19969},
		1600 : {1400:15090,	1500:15418,	1600:15740,	1700:16056,	1800:16388,	1900:16711,	2000:17355,	2100:18232,	2200:18555,	2300:18872,	2400:19202,	2500:19443,	2600:19637,	2700:20018,	2800:20340,	2900:20656,	3000:20985},
		1700 : {1400:15646,	1500:15987,	1600:16322,	1700:16651,	1800:16996,	1900:17331,	2000:17989,	2100:18879,	2200:19214,	2300:19544,	2400:19888,	2500:20141,	2600:20349,	2700:20742,	2800:21077,	2900:21406,	3000:21748},
		1800 : {1400:16275,	1500:16629,	1600:16977,	1700:17319,	1800:17677,	1900:18025,	2000:18695,	2100:19599,	2200:19947,	2300:20290,	2400:20647,	2500:20913,	2600:21133,	2700:21540,	2800:21888,	2900:22230,	3000:22585},
		1900 : {1400:16752,	1500:17119,	1600:17480,	1700:17836,	1800:18207,	1900:18568,	2000:19251,	2100:20168,	2200:20529,	2300:20885,	2400:21254,	2500:21534,	2600:21767,	2700:22186,	2800:22548,	2900:22903,	3000:23270},
		2000 : {1400:17546,	1500:17926,	1600:18300,	1700:18668,	1800:19052,	1900:19426,	2000:20122,	2100:21052,	2200:21426,	2300:21795,	2400:22177,	2500:22470,	2600:22716,	2700:23149,	2800:23523,	2900:23891,	3000:24271}
	},
	'39-3' : {
		600 : {1400:10871,	1500:11050,	1600:11230,	1700:11410,	1800:11596,	1900:11776,	2000:11957,	2100:13051,	2200:13288,	2300:13525,	2400:13765,	2500:13921,	2600:14036,	2700:14328,	2800:14565,	2900:14802,	3000:15042},
		700 : {1400:11488,	1500:11667,	1600:11847,	1700:12030,	1800:12262,	1900:12514,	2000:12766,	2100:13897,	2200:14149,	2300:14400,	2400:14654,	2500:14825,	2600:14954,	2700:15261,	2800:15512,	2900:15764,	3000:16018},
		800 : {1400:12084,	1500:12269,	1600:12506,	1700:12772,	1800:13044,	1900:13311,	2000:13577,	2100:14723,	2200:14989,	2300:15255,	2400:15524,	2500:15709,	2600:15853,	2700:16173,	2800:16440,	2900:16706,	3000:16975},
		900 : {1400:12672,	1500:12949,	1600:13229,	1700:13510,	1800:13797,	1900:14078,	2000:14359,	2100:15519,	2200:15800,	2300:16080,	2400:16364,	2500:16563,	2600:16722,	2700:17057,	2800:17337,	2900:17618,	3000:17901},
		1000 : {1400:13391,	1500:13687,	1600:13982,	1700:14277,	1800:14578,	1900:14874,	2000:15169,	2100:16344,	2200:16639,	2300:16934,	2400:17232,	2500:17446,	2600:17619,	2700:17969,	2800:18264,	2900:18559,	3000:18857},
		1100 : {1400:13898,	1500:14208,	1600:14518,	1700:14828,	1800:15143,	1900:15453,	2000:15763,	2100:16952,	2200:17262,	2300:17572,	2400:17884,	2500:18112,	2600:18300,	2700:18664,	2800:18974,	2900:19284,	3000:19596},
		1200 : {1400:14506,	1500:14830,	1600:15154,	1700:15479,	1800:15809,	1900:16133,	2000:16458,	2100:17661,	2200:17985,	2300:18310,	2400:18637,	2500:18879,	2600:19082,	2700:19460,	2800:19785,	2900:20109,	3000:20436},
		1300 : {1400:15077,	1500:15416,	1600:15755,	1700:16094,	1800:16438,	1900:16777,	2000:17116,	2100:18334,	2200:18673,	2300:19012,	2400:19353,	2500:19610,	2600:19827,	2700:20220,	2800:20559,	2900:20898,	3000:21239},
		1400 : {1400:15648,	1500:16002,	1600:16355,	1700:16708,	1800:17067,	1900:17421,	2000:17774,	2100:19007,	2200:19360,	2300:19714,	2400:20069,	2500:20341,	2600:20572,	2700:20980,	2800:21333,	2900:21687,	3000:22042},
		1500 : {1400:16239,	1500:16607,	1600:16975,	1700:17343,	1800:17717,	1900:18085,	2000:18452,	2100:19700,	2200:20067,	2300:20435,	2400:20806,	2500:21092,	2600:21338,	2700:21760,	2800:22128,	2900:22496,	3000:22866},
		1600 : {1400:17141,	1500:17524,	1600:17906,	1700:18288,	1800:18677,	1900:19059,	2000:19441,	2100:20703,	2200:21085,	2300:21468,	2400:21852,	2500:22153,	2600:22414,	2700:22850,	2800:23233,	2900:23615,	3000:24000},
		1700 : {1400:17788,	1500:18185,	1600:18582,	1700:18979,	1800:19381,	1900:19778,	2000:20175,	2100:21451,	2200:21848,	2300:22245,	2400:22644,	2500:22960,	2600:23234,	2700:23685,	2800:24082,	2900:24479,	3000:24878},
		1800 : {1400:18511,	1500:18923,	1600:19334,	1700:19746,	1800:20163,	1900:20574,	2000:20985,	2100:22276,	2200:22688,	2300:23099,	2400:23513,	2500:23843,	2600:24132,	2700:24598,	2800:25009,	2900:25420,	3000:25834},
		1900 : {1400:19083,	1500:19509,	1600:19934,	1700:20360,	1800:20792,	1900:21218,	2000:21644,	2100:22949,	2200:23375,	2300:23801,	2400:24229,	2500:24573,	2600:24877,	2700:25357,	2800:25783,	2900:26209,	3000:26637},
		2000 : {1400:19967,	1500:20407,	1600:20848,	1700:21288,	1800:21734,	1900:22175,	2000:22615,	2100:23935,	2200:24375,	2300:24816,	2400:25258,	2500:25617,	2600:25936,	2700:26430,	2800:26871,	2900:27311,	3000:27754}
	},
	'310-1' : {
		600 : {1400:9055,	1500:9244,	1600:9437,	1700:9618,	1800:9811,	1900:10004,	2000:10186,	2100:10596,	2200:10789,	2300:10972,	2400:11163,	2500:11356,	2600:11497,	2700:11738,	2800:11931,	2900:12113,	3000:12303},
		700 : {1400:9533,	1500:9735,	1600:9941,	1700:10136,	1800:10341,	1900:10547,	2000:10742,	2100:11165,	2200:11371,	2300:11567,	2400:11771,	2500:11977,	2600:12131,	2700:12385,	2800:12591,	2900:12786,	3000:12988},
		800 : {1400:10498,	1500:10713,	1600:10932,	1700:11140,	1800:11359,	1900:11577,	2000:11785,	2100:12878,	2200:13097,	2300:13305,	2400:13522,	2500:13660,	2600:13745,	2700:14013,	2800:14232,	2900:14439,	3000:14655},
		900 : {1400:11089,	1500:11317,	1600:11549,	1700:11770,	1800:12001,	1900:12233,	2000:12454,	2100:13559,	2200:13791,	2300:14013,	2400:14243,	2500:14393,	2600:14492,	2700:14772,	2800:15004,	2900:15225,	3000:15453},
		1000 : {1400:11710,	1500:11951,	1600:12195,	1700:12429,	1800:12674,	1900:12919,	2000:13153,	2100:14271,	2200:14516,	2300:14750,	2400:14993,	2500:15157,	2600:15269,	2700:15562,	2800:15807,	2900:16040,	3000:16282},
		1100 : {1400:12116,	1500:12370,	1600:12628,	1700:12875,	1800:13132,	1900:13390,	2000:13637,	2100:14768,	2200:15026,	2300:15274,	2400:15530,	2500:15706,	2600:15831,	2700:16137,	2800:16395,	2900:16642,	3000:16896},
		1200 : {1400:12616,	1500:12882,	1600:13153,	1700:13413,	1800:13684,	1900:13954,	2000:14214,	2100:15358,	2200:15629,	2300:15890,	2400:16159,	2500:16348,	2600:16486,	2700:16805,	2800:17076,	2900:17336,	3000:17603},
		1300 : {1400:13084,	1500:13364,	1600:13648,	1700:13920,	1800:14204,	1900:14488,	2000:14761,	2100:15918,	2200:16202,	2300:16475,	2400:16757,	2500:16960,	2600:17110,	2700:17442,	2800:17726,	2900:17999,	3000:18279},
		1400 : {1400:13555,	1500:13848,	1600:14145,	1700:14430,	1800:14727,	1900:15024,	2000:15310,	2100:16480,	2200:16777,	2300:17063,	2400:17358,	2500:17573,	2600:17737,	2700:18082,	2800:18379,	2900:18665,	3000:18958},
		1500 : {1400:14047,	1500:14353,	1600:14663,	1700:14962,	1800:15271,	1900:15581,	2000:15880,	2100:17063,	2200:17373,	2300:17672,	2400:17980,	2500:18208,	2600:18385,	2700:18743,	2800:19053,	2900:19352,	3000:19658},
		1600 : {1400:14269,	1500:14588,	1600:14911,	1700:15222,	1800:15545,	1900:15868,	2000:16179,	2100:17375,	2200:17698,	2300:18011,	2400:18332,	2500:18573,	2600:18763,	2700:19134,	2800:19456,	2900:19768,	3000:20087},
		1700 : {1400:14816,	1500:15147,	1600:15483,	1700:15808,	1800:16143,	1900:16479,	2000:16804,	2100:18013,	2200:18349,	2300:18674,	2400:19008,	2500:19262,	2600:19465,	2700:19849,	2800:20185,	2900:20509,	3000:20841},
		1800 : {1400:15435,	1500:15780,	1600:16129,	1700:16466,	1800:16815,	1900:17164,	2000:17501,	2100:18723,	2200:19072,	2300:19411,	2400:19758,	2500:20025,	2600:20240,	2700:20637,	2800:20986,	2900:21324,	3000:21669},
		1900 : {1400:15904,	1500:16261,	1600:16623,	1700:16974,	1800:17335,	1900:17697,	2000:18048,	2100:19283,	2200:19644,	2300:19996,	2400:20356,	2500:20636,	2600:20865,	2700:21275,	2800:21636,	2900:21987,	3000:22345},
		2000 : {1400:17265,	1500:17636,	1600:18010,	1700:18374,	1800:18749,	1900:19123,	2000:19487,	2100:20735,	2200:21110,	2300:21474,	2400:21847,	2500:22140,	2600:22382,	2700:22805,	2800:23179,	2900:23543,	3000:23914}
	},
	'310-2' : {
		600 : {1400:9684,	1500:9830,	1600:9970,	1700:10103,	1800:10253,	1900:10393,	2000:10869,	2100:11617,	2200:11809,	2300:11997,	2400:12197,	2500:12308,	2600:12372,	2700:12623,	2800:12815,	2900:13002,	3000:13201},
		700 : {1400:10218,	1500:10363,	1600:10503,	1700:10651,	1800:10865,	1900:11070,	2000:11598,	2100:12359,	2200:12564,	2300:12764,	2400:12978,	2500:13102,	2600:13179,	2700:13443,	2800:13648,	2900:13847,	3000:14059},
		800 : {1400:10733,	1500:10895,	1600:11110,	1700:11322,	1800:11550,	1900:11769,	2000:12309,	2100:13083,	2200:13301,	2300:13515,	2400:13741,	2500:13878,	2600:13968,	2700:14245,	2800:14463,	2900:14676,	3000:14900},
		900 : {1400:11267,	1500:11505,	1600:11736,	1700:11961,	1800:12203,	1900:12434,	2000:12987,	2100:13774,	2200:14005,	2300:14232,	2400:14471,	2500:14621,	2600:14724,	2700:15014,	2800:15245,	2900:15471,	3000:15708},
		1000 : {1400:11897,	1500:12148,	1600:12392,	1700:12630,	1800:12884,	1900:13129,	2000:13695,	2100:14495,	2200:14739,	2300:14978,	2400:15231,	2500:15394,	2600:15510,	2700:15813,	2800:16057,	2900:16295,	3000:16546},
		1100 : {1400:12313,	1500:12576,	1600:12834,	1700:13085,	1800:13352,	1900:13610,	2000:14189,	2100:15002,	2200:15259,	2300:15511,	2400:15777,	2500:15952,	2600:16082,	2700:16397,	2800:16655,	2900:16906,	3000:17170},
		1200 : {1400:12826,	1500:13103,	1600:13373,	1700:13637,	1800:13917,	1900:14188,	2000:14780,	2100:15606,	2200:15876,	2300:16141,	2400:16420,	2500:16608,	2600:16751,	2700:17079,	2800:17349,	2900:17614,	3000:17890},
		1300 : {1400:13304,	1500:13593,	1600:13877,	1700:14154,	1800:14447,	1900:14730,	2000:15336,	2100:16174,	2200:16458,	2300:16736,	2400:17027,	2500:17229,	2600:17384,	2700:17726,	2800:18009,	2900:18286,	3000:18576},
		1400 : {1400:13785,	1500:14087,	1600:14383,	1700:14673,	1800:14979,	1900:15276,	2000:15894,	2100:16746,	2200:17042,	2300:17333,	2400:17637,	2500:17852,	2600:18020,	2700:18375,	2800:18671,	2900:18961,	3000:19264},
		1500 : {1400:14281,	1500:14597,	1600:14906,	1700:15209,	1800:15528,	1900:15837,	2000:16469,	2100:17333,	2200:17642,	2300:17947,	2400:18264,	2500:18492,	2600:18673,	2700:19041,	2800:19350,	2900:19653,	3000:19969},
		1600 : {1400:15090,	1500:15418,	1600:15740,	1700:16056,	1800:16388,	1900:16711,	2000:17355,	2100:18232,	2200:18555,	2300:18872,	2400:19202,	2500:19443,	2600:19637,	2700:20018,	2800:20340,	2900:20656,	3000:20985},
		1700 : {1400:15646,	1500:15987,	1600:16322,	1700:16651,	1800:16996,	1900:17331,	2000:17989,	2100:18879,	2200:19214,	2300:19544,	2400:19888,	2500:20141,	2600:20349,	2700:20742,	2800:21077,	2900:21406,	3000:21748},
		1800 : {1400:16275,	1500:16629,	1600:16977,	1700:17319,	1800:17677,	1900:18025,	2000:18695,	2100:19599,	2200:19947,	2300:20290,	2400:20647,	2500:20913,	2600:21133,	2700:21540,	2800:21888,	2900:22230,	3000:22585},
		1900 : {1400:16752,	1500:17119,	1600:17480,	1700:17836,	1800:18207,	1900:18568,	2000:19251,	2100:20168,	2200:20529,	2300:20885,	2400:21254,	2500:21534,	2600:21767,	2700:22186,	2800:22548,	2900:22903,	3000:23270},
		2000 : {1400:17546,	1500:17926,	1600:18300,	1700:18668,	1800:19052,	1900:19426,	2000:20122,	2100:21052,	2200:21426,	2300:21795,	2400:22177,	2500:22470,	2600:22716,	2700:23149,	2800:23523,	2900:23891,	3000:24271}
	},
	'310-3' : {
		600 : {1400:10871,	1500:11050,	1600:11230,	1700:11410,	1800:11596,	1900:11776,	2000:11957,	2100:13051,	2200:13288,	2300:13525,	2400:13765,	2500:13921,	2600:14036,	2700:14328,	2800:14565,	2900:14802,	3000:15042},
		700 : {1400:11488,	1500:11667,	1600:11847,	1700:12030,	1800:12262,	1900:12514,	2000:12766,	2100:13897,	2200:14149,	2300:14400,	2400:14654,	2500:14825,	2600:14954,	2700:15261,	2800:15512,	2900:15764,	3000:16018},
		800 : {1400:12084,	1500:12269,	1600:12506,	1700:12772,	1800:13044,	1900:13311,	2000:13577,	2100:14723,	2200:14989,	2300:15255,	2400:15524,	2500:15709,	2600:15853,	2700:16173,	2800:16440,	2900:16706,	3000:16975},
		900 : {1400:12672,	1500:12949,	1600:13229,	1700:13510,	1800:13797,	1900:14078,	2000:14359,	2100:15519,	2200:15800,	2300:16080,	2400:16364,	2500:16563,	2600:16722,	2700:17057,	2800:17337,	2900:17618,	3000:17901},
		1000 : {1400:13391,	1500:13687,	1600:13982,	1700:14277,	1800:14578,	1900:14874,	2000:15169,	2100:16344,	2200:16639,	2300:16934,	2400:17232,	2500:17446,	2600:17619,	2700:17969,	2800:18264,	2900:18559,	3000:18857},
		1100 : {1400:13898,	1500:14208,	1600:14518,	1700:14828,	1800:15143,	1900:15453,	2000:15763,	2100:16952,	2200:17262,	2300:17572,	2400:17884,	2500:18112,	2600:18300,	2700:18664,	2800:18974,	2900:19284,	3000:19596},
		1200 : {1400:14506,	1500:14830,	1600:15154,	1700:15479,	1800:15809,	1900:16133,	2000:16458,	2100:17661,	2200:17985,	2300:18310,	2400:18637,	2500:18879,	2600:19082,	2700:19460,	2800:19785,	2900:20109,	3000:20436},
		1300 : {1400:15077,	1500:15416,	1600:15755,	1700:16094,	1800:16438,	1900:16777,	2000:17116,	2100:18334,	2200:18673,	2300:19012,	2400:19353,	2500:19610,	2600:19827,	2700:20220,	2800:20559,	2900:20898,	3000:21239},
		1400 : {1400:15648,	1500:16002,	1600:16355,	1700:16708,	1800:17067,	1900:17421,	2000:17774,	2100:19007,	2200:19360,	2300:19714,	2400:20069,	2500:20341,	2600:20572,	2700:20980,	2800:21333,	2900:21687,	3000:22042},
		1500 : {1400:16239,	1500:16607,	1600:16975,	1700:17343,	1800:17717,	1900:18085,	2000:18452,	2100:19700,	2200:20067,	2300:20435,	2400:20806,	2500:21092,	2600:21338,	2700:21760,	2800:22128,	2900:22496,	3000:22866},
		1600 : {1400:17141,	1500:17524,	1600:17906,	1700:18288,	1800:18677,	1900:19059,	2000:19441,	2100:20703,	2200:21085,	2300:21468,	2400:21852,	2500:22153,	2600:22414,	2700:22850,	2800:23233,	2900:23615,	3000:24000},
		1700 : {1400:17788,	1500:18185,	1600:18582,	1700:18979,	1800:19381,	1900:19778,	2000:20175,	2100:21451,	2200:21848,	2300:22245,	2400:22644,	2500:22960,	2600:23234,	2700:23685,	2800:24082,	2900:24479,	3000:24878},
		1800 : {1400:18511,	1500:18923,	1600:19334,	1700:19746,	1800:20163,	1900:20574,	2000:20985,	2100:22276,	2200:22688,	2300:23099,	2400:23513,	2500:23843,	2600:24132,	2700:24598,	2800:25009,	2900:25420,	3000:25834},
		1900 : {1400:19083,	1500:19509,	1600:19934,	1700:20360,	1800:20792,	1900:21218,	2000:21644,	2100:22949,	2200:23375,	2300:23801,	2400:24229,	2500:24573,	2600:24877,	2700:25357,	2800:25783,	2900:26209,	3000:26637},
		2000 : {1400:19967,	1500:20407,	1600:20848,	1700:21288,	1800:21734,	1900:22175,	2000:22615,	2100:23935,	2200:24375,	2300:24816,	2400:25258,	2500:25617,	2600:25936,	2700:26430,	2800:26871,	2900:27311,	3000:27754}
	},
	'311-1' : {
		600 : {1400:9055,	1500:9244,	1600:9437,	1700:9618,	1800:9811,	1900:10004,	2000:10186,	2100:10596,	2200:10789,	2300:10972,	2400:11163,	2500:11356,	2600:11497,	2700:11738,	2800:11931,	2900:12113,	3000:12303},
		700 : {1400:9533,	1500:9735,	1600:9941,	1700:10136,	1800:10341,	1900:10547,	2000:10742,	2100:11165,	2200:11371,	2300:11567,	2400:11771,	2500:11977,	2600:12131,	2700:12385,	2800:12591,	2900:12786,	3000:12988},
		800 : {1400:10498,	1500:10713,	1600:10932,	1700:11140,	1800:11359,	1900:11577,	2000:11785,	2100:12878,	2200:13097,	2300:13305,	2400:13522,	2500:13660,	2600:13745,	2700:14013,	2800:14232,	2900:14439,	3000:14655},
		900 : {1400:11089,	1500:11317,	1600:11549,	1700:11770,	1800:12001,	1900:12233,	2000:12454,	2100:13559,	2200:13791,	2300:14013,	2400:14243,	2500:14393,	2600:14492,	2700:14772,	2800:15004,	2900:15225,	3000:15453},
		1000 : {1400:11710,	1500:11951,	1600:12195,	1700:12429,	1800:12674,	1900:12919,	2000:13153,	2100:14271,	2200:14516,	2300:14750,	2400:14993,	2500:15157,	2600:15269,	2700:15562,	2800:15807,	2900:16040,	3000:16282},
		1100 : {1400:12116,	1500:12370,	1600:12628,	1700:12875,	1800:13132,	1900:13390,	2000:13637,	2100:14768,	2200:15026,	2300:15274,	2400:15530,	2500:15706,	2600:15831,	2700:16137,	2800:16395,	2900:16642,	3000:16896},
		1200 : {1400:12616,	1500:12882,	1600:13153,	1700:13413,	1800:13684,	1900:13954,	2000:14214,	2100:15358,	2200:15629,	2300:15890,	2400:16159,	2500:16348,	2600:16486,	2700:16805,	2800:17076,	2900:17336,	3000:17603},
		1300 : {1400:13084,	1500:13364,	1600:13648,	1700:13920,	1800:14204,	1900:14488,	2000:14761,	2100:15918,	2200:16202,	2300:16475,	2400:16757,	2500:16960,	2600:17110,	2700:17442,	2800:17726,	2900:17999,	3000:18279},
		1400 : {1400:13555,	1500:13848,	1600:14145,	1700:14430,	1800:14727,	1900:15024,	2000:15310,	2100:16480,	2200:16777,	2300:17063,	2400:17358,	2500:17573,	2600:17737,	2700:18082,	2800:18379,	2900:18665,	3000:18958},
		1500 : {1400:14047,	1500:14353,	1600:14663,	1700:14962,	1800:15271,	1900:15581,	2000:15880,	2100:17063,	2200:17373,	2300:17672,	2400:17980,	2500:18208,	2600:18385,	2700:18743,	2800:19053,	2900:19352,	3000:19658},
		1600 : {1400:14269,	1500:14588,	1600:14911,	1700:15222,	1800:15545,	1900:15868,	2000:16179,	2100:17375,	2200:17698,	2300:18011,	2400:18332,	2500:18573,	2600:18763,	2700:19134,	2800:19456,	2900:19768,	3000:20087},
		1700 : {1400:14816,	1500:15147,	1600:15483,	1700:15808,	1800:16143,	1900:16479,	2000:16804,	2100:18013,	2200:18349,	2300:18674,	2400:19008,	2500:19262,	2600:19465,	2700:19849,	2800:20185,	2900:20509,	3000:20841},
		1800 : {1400:15435,	1500:15780,	1600:16129,	1700:16466,	1800:16815,	1900:17164,	2000:17501,	2100:18723,	2200:19072,	2300:19411,	2400:19758,	2500:20025,	2600:20240,	2700:20637,	2800:20986,	2900:21324,	3000:21669},
		1900 : {1400:15904,	1500:16261,	1600:16623,	1700:16974,	1800:17335,	1900:17697,	2000:18048,	2100:19283,	2200:19644,	2300:19996,	2400:20356,	2500:20636,	2600:20865,	2700:21275,	2800:21636,	2900:21987,	3000:22345},
		2000 : {1400:17265,	1500:17636,	1600:18010,	1700:18374,	1800:18749,	1900:19123,	2000:19487,	2100:20735,	2200:21110,	2300:21474,	2400:21847,	2500:22140,	2600:22382,	2700:22805,	2800:23179,	2900:23543,	3000:23914}
	},
	'311-2' : {
		600 : {1400:9684,	1500:9830,	1600:9970,	1700:10103,	1800:10253,	1900:10393,	2000:10869,	2100:11617,	2200:11809,	2300:11997,	2400:12197,	2500:12308,	2600:12372,	2700:12623,	2800:12815,	2900:13002,	3000:13201},
		700 : {1400:10218,	1500:10363,	1600:10503,	1700:10651,	1800:10865,	1900:11070,	2000:11598,	2100:12359,	2200:12564,	2300:12764,	2400:12978,	2500:13102,	2600:13179,	2700:13443,	2800:13648,	2900:13847,	3000:14059},
		800 : {1400:10733,	1500:10895,	1600:11110,	1700:11322,	1800:11550,	1900:11769,	2000:12309,	2100:13083,	2200:13301,	2300:13515,	2400:13741,	2500:13878,	2600:13968,	2700:14245,	2800:14463,	2900:14676,	3000:14900},
		900 : {1400:11267,	1500:11505,	1600:11736,	1700:11961,	1800:12203,	1900:12434,	2000:12987,	2100:13774,	2200:14005,	2300:14232,	2400:14471,	2500:14621,	2600:14724,	2700:15014,	2800:15245,	2900:15471,	3000:15708},
		1000 : {1400:11897,	1500:12148,	1600:12392,	1700:12630,	1800:12884,	1900:13129,	2000:13695,	2100:14495,	2200:14739,	2300:14978,	2400:15231,	2500:15394,	2600:15510,	2700:15813,	2800:16057,	2900:16295,	3000:16546},
		1100 : {1400:12313,	1500:12576,	1600:12834,	1700:13085,	1800:13352,	1900:13610,	2000:14189,	2100:15002,	2200:15259,	2300:15511,	2400:15777,	2500:15952,	2600:16082,	2700:16397,	2800:16655,	2900:16906,	3000:17170},
		1200 : {1400:12826,	1500:13103,	1600:13373,	1700:13637,	1800:13917,	1900:14188,	2000:14780,	2100:15606,	2200:15876,	2300:16141,	2400:16420,	2500:16608,	2600:16751,	2700:17079,	2800:17349,	2900:17614,	3000:17890},
		1300 : {1400:13304,	1500:13593,	1600:13877,	1700:14154,	1800:14447,	1900:14730,	2000:15336,	2100:16174,	2200:16458,	2300:16736,	2400:17027,	2500:17229,	2600:17384,	2700:17726,	2800:18009,	2900:18286,	3000:18576},
		1400 : {1400:13785,	1500:14087,	1600:14383,	1700:14673,	1800:14979,	1900:15276,	2000:15894,	2100:16746,	2200:17042,	2300:17333,	2400:17637,	2500:17852,	2600:18020,	2700:18375,	2800:18671,	2900:18961,	3000:19264},
		1500 : {1400:14281,	1500:14597,	1600:14906,	1700:15209,	1800:15528,	1900:15837,	2000:16469,	2100:17333,	2200:17642,	2300:17947,	2400:18264,	2500:18492,	2600:18673,	2700:19041,	2800:19350,	2900:19653,	3000:19969},
		1600 : {1400:15090,	1500:15418,	1600:15740,	1700:16056,	1800:16388,	1900:16711,	2000:17355,	2100:18232,	2200:18555,	2300:18872,	2400:19202,	2500:19443,	2600:19637,	2700:20018,	2800:20340,	2900:20656,	3000:20985},
		1700 : {1400:15646,	1500:15987,	1600:16322,	1700:16651,	1800:16996,	1900:17331,	2000:17989,	2100:18879,	2200:19214,	2300:19544,	2400:19888,	2500:20141,	2600:20349,	2700:20742,	2800:21077,	2900:21406,	3000:21748},
		1800 : {1400:16275,	1500:16629,	1600:16977,	1700:17319,	1800:17677,	1900:18025,	2000:18695,	2100:19599,	2200:19947,	2300:20290,	2400:20647,	2500:20913,	2600:21133,	2700:21540,	2800:21888,	2900:22230,	3000:22585},
		1900 : {1400:16752,	1500:17119,	1600:17480,	1700:17836,	1800:18207,	1900:18568,	2000:19251,	2100:20168,	2200:20529,	2300:20885,	2400:21254,	2500:21534,	2600:21767,	2700:22186,	2800:22548,	2900:22903,	3000:23270},
		2000 : {1400:17546,	1500:17926,	1600:18300,	1700:18668,	1800:19052,	1900:19426,	2000:20122,	2100:21052,	2200:21426,	2300:21795,	2400:22177,	2500:22470,	2600:22716,	2700:23149,	2800:23523,	2900:23891,	3000:24271}
	},
	'311-3' : {
		600 : {1400:10871,	1500:11050,	1600:11230,	1700:11410,	1800:11596,	1900:11776,	2000:11957,	2100:13051,	2200:13288,	2300:13525,	2400:13765,	2500:13921,	2600:14036,	2700:14328,	2800:14565,	2900:14802,	3000:15042},
		700 : {1400:11488,	1500:11667,	1600:11847,	1700:12030,	1800:12262,	1900:12514,	2000:12766,	2100:13897,	2200:14149,	2300:14400,	2400:14654,	2500:14825,	2600:14954,	2700:15261,	2800:15512,	2900:15764,	3000:16018},
		800 : {1400:12084,	1500:12269,	1600:12506,	1700:12772,	1800:13044,	1900:13311,	2000:13577,	2100:14723,	2200:14989,	2300:15255,	2400:15524,	2500:15709,	2600:15853,	2700:16173,	2800:16440,	2900:16706,	3000:16975},
		900 : {1400:12672,	1500:12949,	1600:13229,	1700:13510,	1800:13797,	1900:14078,	2000:14359,	2100:15519,	2200:15800,	2300:16080,	2400:16364,	2500:16563,	2600:16722,	2700:17057,	2800:17337,	2900:17618,	3000:17901},
		1000 : {1400:13391,	1500:13687,	1600:13982,	1700:14277,	1800:14578,	1900:14874,	2000:15169,	2100:16344,	2200:16639,	2300:16934,	2400:17232,	2500:17446,	2600:17619,	2700:17969,	2800:18264,	2900:18559,	3000:18857},
		1100 : {1400:13898,	1500:14208,	1600:14518,	1700:14828,	1800:15143,	1900:15453,	2000:15763,	2100:16952,	2200:17262,	2300:17572,	2400:17884,	2500:18112,	2600:18300,	2700:18664,	2800:18974,	2900:19284,	3000:19596},
		1200 : {1400:14506,	1500:14830,	1600:15154,	1700:15479,	1800:15809,	1900:16133,	2000:16458,	2100:17661,	2200:17985,	2300:18310,	2400:18637,	2500:18879,	2600:19082,	2700:19460,	2800:19785,	2900:20109,	3000:20436},
		1300 : {1400:15077,	1500:15416,	1600:15755,	1700:16094,	1800:16438,	1900:16777,	2000:17116,	2100:18334,	2200:18673,	2300:19012,	2400:19353,	2500:19610,	2600:19827,	2700:20220,	2800:20559,	2900:20898,	3000:21239},
		1400 : {1400:15648,	1500:16002,	1600:16355,	1700:16708,	1800:17067,	1900:17421,	2000:17774,	2100:19007,	2200:19360,	2300:19714,	2400:20069,	2500:20341,	2600:20572,	2700:20980,	2800:21333,	2900:21687,	3000:22042},
		1500 : {1400:16239,	1500:16607,	1600:16975,	1700:17343,	1800:17717,	1900:18085,	2000:18452,	2100:19700,	2200:20067,	2300:20435,	2400:20806,	2500:21092,	2600:21338,	2700:21760,	2800:22128,	2900:22496,	3000:22866},
		1600 : {1400:17141,	1500:17524,	1600:17906,	1700:18288,	1800:18677,	1900:19059,	2000:19441,	2100:20703,	2200:21085,	2300:21468,	2400:21852,	2500:22153,	2600:22414,	2700:22850,	2800:23233,	2900:23615,	3000:24000},
		1700 : {1400:17788,	1500:18185,	1600:18582,	1700:18979,	1800:19381,	1900:19778,	2000:20175,	2100:21451,	2200:21848,	2300:22245,	2400:22644,	2500:22960,	2600:23234,	2700:23685,	2800:24082,	2900:24479,	3000:24878},
		1800 : {1400:18511,	1500:18923,	1600:19334,	1700:19746,	1800:20163,	1900:20574,	2000:20985,	2100:22276,	2200:22688,	2300:23099,	2400:23513,	2500:23843,	2600:24132,	2700:24598,	2800:25009,	2900:25420,	3000:25834},
		1900 : {1400:19083,	1500:19509,	1600:19934,	1700:20360,	1800:20792,	1900:21218,	2000:21644,	2100:22949,	2200:23375,	2300:23801,	2400:24229,	2500:24573,	2600:24877,	2700:25357,	2800:25783,	2900:26209,	3000:26637},
		2000 : {1400:19967,	1500:20407,	1600:20848,	1700:21288,	1800:21734,	1900:22175,	2000:22615,	2100:23935,	2200:24375,	2300:24816,	2400:25258,	2500:25617,	2600:25936,	2700:26430,	2800:26871,	2900:27311,	3000:27754}
	},
	'41-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'41-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'41-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'42-1' : {
		1600 : {1300:11413,	1400:11657,	1500:11901,	1600:12487,	1700:12744,	1800:13002,	1900:13260,	2000:13430},
		1700 : {1300:11677,	1400:11930,	1500:12195,	1600:12791,	1700:13057,	1800:13325,	1900:13593,	2000:13773},
		1800 : {1300:12022,	1400:12293,	1500:12569,	1600:13175,	1700:13451,	1800:13729,	1900:14007,	2000:14197},
		1900 : {1300:12289,	1400:12577,	1500:12863,	1600:13479,	1700:13765,	1800:14052,	1900:14340,	2000:14540},
		2000 : {1300:12956,	1400:13255,	1500:13551,	1600:14176,	1700:14472,	1800:14769,	1900:15066,	2000:15276},
		2100 : {1300:13235,	1400:13543,	1500:13849,	1600:14484,	1700:14790,	1800:15097,	1900:15404,	2000:15623},
		2200 : {1300:13509,	1400:13827,	1500:14143,	1600:14788,	1700:15103,	1800:15420,	1900:15737,	2000:15966}
	},
	'42-2' : {
		1600 : {1300:11879,	1400:12129,	1500:12380,	1600:12974,	1700:13238,	1800:13509,	1900:13774,	2000:13947},
		1700 : {1300:12148,	1400:12407,	1500:12681,	1600:13284,	1700:13558,	1800:13839,	1900:14114,	2000:14297},
		1800 : {1300:12498,	1400:12777,	1500:13061,	1600:13674,	1700:13959,	1800:14250,	1900:14535,	2000:14727},
		1900 : {1300:12770,	1400:13067,	1500:13361,	1600:13984,	1700:14279,	1800:14580,	1900:14875,	2000:15077},
		2000 : {1300:13156,	1400:13462,	1500:13767,	1600:14400,	1700:14704,	1800:15015,	1900:15320,	2000:15533},
		2100 : {1300:13440,	1400:13757,	1500:14071,	1600:14714,	1700:15028,	1800:15350,	1900:15664,	2000:15887},
		2200 : {1300:13721,	1400:14047,	1500:14371,	1600:15024,	1700:15349,	1800:15680,	1900:16004,	2000:16237}
	},
	'42-3' : {
		1600 : {1300:13160,	1400:13465,	1500:13768,	1600:14091,	1700:14741,	1800:15063,	1900:15386,	2000:15627},
		1700 : {1300:13475,	1400:13789,	1500:14118,	1600:14451,	1700:15113,	1800:15447,	1900:15780,	2000:16032},
		1800 : {1300:13865,	1400:14199,	1500:14544,	1600:14888,	1700:15561,	1800:15906,	1900:16251,	2000:16514},
		1900 : {1300:14180,	1400:14537,	1500:14893,	1600:15249,	1700:15933,	1800:16289,	1900:16645,	2000:16920},
		2000 : {1300:14611,	1400:14980,	1500:15347,	1600:15715,	1700:16410,	1800:16777,	1900:17144,	2000:17430},
		2100 : {1300:14938,	1400:15319,	1500:15697,	1600:16075,	1700:16782,	1800:17160,	1900:17538,	2000:17835},
		2200 : {1300:15266,	1400:15657,	1500:16047,	1600:16436,	1700:17154,	1800:17543,	1900:17933,	2000:18241}
	},
	'43-1' : {
		1600 : {1300:12077,	1400:12324,	1500:12568,	1600:13049,	1700:13306,	1800:13564,	1900:13822,	2000:14033},
		1700 : {1300:12416,	1400:12673,	1500:12938,	1600:13428,	1700:13695,	1800:13963,	1900:14231,	2000:14451},
		1800 : {1300:12685,	1400:12959,	1500:13236,	1600:13736,	1700:14013,	1800:14290,	1900:14568,	2000:14799},
		1900 : {1300:12951,	1400:13243,	1500:13530,	1600:14040,	1700:14326,	1800:14614,	1900:14901,	2000:15142},
		2000 : {1300:13332,	1400:13634,	1500:13930,	1600:14450,	1700:14746,	1800:15043,	1900:15341,	2000:15591},
		2100 : {1300:13784,	1400:14096,	1500:14401,	1600:14932,	1700:15237,	1800:15544,	1900:15852,	2000:16112},
		2200 : {1300:14058,	1400:14380,	1500:14695,	1600:15235,	1700:15551,	1800:15868,	1900:16185,	2000:16455}
	},
	'43-2' : {
		1600 : {1300:12256,	1400:12509,	1500:12760,	1600:13249,	1700:13513,	1800:13784,	1900:14049,	2000:14263},
		1700 : {1300:12600,	1400:12862,	1500:13136,	1600:13634,	1700:13909,	1800:14190,	1900:14465,	2000:14688},
		1800 : {1300:12873,	1400:13156,	1500:13440,	1600:13949,	1700:14233,	1800:14524,	1900:14809,	2000:15042},
		1900 : {1300:13146,	1400:13446,	1500:13740,	1600:14259,	1700:14553,	1800:14854,	1900:15149,	2000:15392},
		2000 : {1300:13531,	1400:13841,	1500:14146,	1600:14674,	1700:14978,	1800:15289,	1900:15594,	2000:15848},
		2100 : {1300:13989,	1400:14309,	1500:14624,	1600:15162,	1700:15476,	1800:15797,	1900:16112,	2000:16375},
		2200 : {1300:14270,	1400:14600,	1500:14924,	1600:15472,	1700:15796,	1800:16127,	1900:16452,	2000:16725}
	},
	'43-3' : {
		1600 : {1300:13536,	1400:13845,	1500:14148,	1600:14470,	1700:15016,	1800:15338,	1900:15661,	2000:15942},
		1700 : {1300:13926,	1400:14244,	1500:14573,	1600:14907,	1700:15463,	1800:15797,	1900:16131,	2000:16423},
		1800 : {1300:14241,	1400:14578,	1500:14923,	1600:15268,	1700:15835,	1800:16180,	1900:16525,	2000:16829},
		1900 : {1300:14555,	1400:14917,	1500:15273,	1600:15628,	1700:16208,	1800:16564,	1900:16919,	2000:17235},
		2000 : {1300:14986,	1400:15359,	1500:15727,	1600:16094,	1700:16684,	1800:17051,	1900:17418,	2000:17745},
		2100 : {1300:15487,	1400:15871,	1500:16250,	1600:16628,	1700:17230,	1800:17608,	1900:17986,	2000:18324},
		2200 : {1300:15815,	1400:16210,	1500:16599,	1600:16989,	1700:17602,	1800:17991,	1900:18381,	2000:18729}
	},
	'44-1' : {
		1600 : {2000:15820,	2100:16084,	2200:16265,	2300:16532,	2400:16798,	2500:17065,	2600:17322,	2700:17590,	2800:18076,	2900:18343,	3000:18679},
		1700 : {2000:16220,	2100:16494,	2200:16685,	2300:16962,	2400:17237,	2500:17514,	2600:17780,	2700:18058,	2800:18554,	2900:18830,	3000:19177},
		1800 : {2000:16736,	2100:17020,	2200:17221,	2300:17507,	2400:17792,	2500:18079,	2600:18355,	2700:18642,	2800:19148,	2900:19434,	3000:19790},
		1900 : {2000:17136,	2100:17429,	2200:17639,	2300:17935,	2400:18230,	2500:18527,	2600:18812,	2700:19109,	2800:19625,	2900:19921,	3000:20286},
		2000 : {2000:17929,	2100:18232,	2200:18452,	2300:18758,	2400:19062,	2500:19368,	2600:19664,	2700:19970,	2800:20495,	2900:20801,	3000:21176},
		2100 : {2000:18338,	2100:18651,	2200:18881,	2300:19196,	2400:19510,	2500:19826,	2600:20132,	2700:20448,	2800:20983,	2900:21298,	3000:21683},
		2200 : {2000:18762,	2100:19085,	2200:19324,	2300:19649,	2400:19973,	2500:20299,	2600:20614,	2700:20940,	2800:21484,	2900:21809,	3000:22204}
	},
	'44-2' : {
		1600 : {2000:16377,	2100:16654,	2200:16832,	2300:17106,	2400:17378,	2500:17658,	2600:17927,	2700:18192,	2800:18685,	2900:18959,	3000:19308},
		1700 : {2000:16785,	2100:17072,	2200:17260,	2300:17544,	2400:17826,	2500:18116,	2600:18394,	2700:18669,	2800:19172,	2900:19456,	3000:19815},
		1800 : {2000:17314,	2100:17611,	2200:17809,	2300:18102,	2400:18394,	2500:18694,	2600:18982,	2700:19267,	2800:19780,	2900:20074,	3000:20442},
		1900 : {2000:17722,	2100:18028,	2200:18236,	2300:18539,	2400:18841,	2500:19151,	2600:19449,	2700:19743,	2800:20266,	2900:20570,	3000:20948},
		2000 : {2000:18235,	2100:18551,	2200:18769,	2300:19082,	2400:19394,	2500:19713,	2600:20021,	2700:20325,	2800:20858,	2900:21171,	3000:21559},
		2100 : {2000:18653,	2100:18979,	2200:19206,	2300:19529,	2400:19851,	2500:20180,	2600:20498,	2700:20812,	2800:21354,	2900:21678,	3000:22075},
		2200 : {2000:19080,	2100:19416,	2200:19653,	2300:19986,	2400:20318,	2500:20657,	2600:20984,	2700:21308,	2800:21860,	2900:22193,	3000:22601}
	},
	'44-3' : {
		1600 : {2000:18311,	2100:18644,	2200:18892,	2300:19222,	2400:19555,	2500:19885,	2600:20215,	2700:20545,	2800:21098,	2900:21427,	3000:21832},
		1700 : {2000:18793,	2100:19136,	2200:19395,	2300:19736,	2400:20081,	2500:20421,	2600:20762,	2700:21103,	2800:21667,	2900:22008,	3000:22424},
		1800 : {2000:19386,	2100:19741,	2200:20011,	2300:20363,	2400:20718,	2500:21070,	2600:21422,	2700:21774,	2800:22349,	2900:22701,	3000:23128},
		1900 : {2000:19868,	2100:20233,	2200:20514,	2300:20877,	2400:21244,	2500:21607,	2600:21970,	2700:22333,	2800:22919,	2900:23282,	3000:23719},
		2000 : {2000:20453,	2100:20830,	2200:21122,	2300:21496,	2400:21874,	2500:22248,	2600:22622,	2700:22996,	2800:23593,	2900:23967,	3000:24415},
		2100 : {2000:20935,	2100:21322,	2200:21626,	2300:22011,	2400:22399,	2500:22784,	2600:23169,	2700:23554,	2800:24162,	2900:24547,	3000:25007},
		2200 : {2000:21436,	2100:21834,	2200:22149,	2300:22545,	2400:22945,	2500:23341,	2600:23737,	2700:24133,	2800:24752,	2900:25148,	3000:25619}
	},
	'45-1' : {
		1600 : {2000:15820,	2100:16084,	2200:16265,	2300:16532,	2400:16798,	2500:17065,	2600:17322,	2700:17590,	2800:18076,	2900:18343,	3000:18679},
		1700 : {2000:16220,	2100:16494,	2200:16685,	2300:16962,	2400:17237,	2500:17514,	2600:17780,	2700:18058,	2800:18554,	2900:18830,	3000:19177},
		1800 : {2000:16736,	2100:17020,	2200:17221,	2300:17507,	2400:17792,	2500:18079,	2600:18355,	2700:18642,	2800:19148,	2900:19434,	3000:19790},
		1900 : {2000:17136,	2100:17429,	2200:17639,	2300:17935,	2400:18230,	2500:18527,	2600:18812,	2700:19109,	2800:19625,	2900:19921,	3000:20286},
		2000 : {2000:17929,	2100:18232,	2200:18452,	2300:18758,	2400:19062,	2500:19368,	2600:19664,	2700:19970,	2800:20495,	2900:20801,	3000:21176},
		2100 : {2000:18338,	2100:18651,	2200:18881,	2300:19196,	2400:19510,	2500:19826,	2600:20132,	2700:20448,	2800:20983,	2900:21298,	3000:21683},
		2200 : {2000:18762,	2100:19085,	2200:19324,	2300:19649,	2400:19973,	2500:20299,	2600:20614,	2700:20940,	2800:21484,	2900:21809,	3000:22204}
	},
	'45-2' : {
		1600 : {2000:16377,	2100:16654,	2200:16832,	2300:17106,	2400:17378,	2500:17658,	2600:17927,	2700:18192,	2800:18685,	2900:18959,	3000:19308},
		1700 : {2000:16785,	2100:17072,	2200:17260,	2300:17544,	2400:17826,	2500:18116,	2600:18394,	2700:18669,	2800:19172,	2900:19456,	3000:19815},
		1800 : {2000:17314,	2100:17611,	2200:17809,	2300:18102,	2400:18394,	2500:18694,	2600:18982,	2700:19267,	2800:19780,	2900:20074,	3000:20442},
		1900 : {2000:17722,	2100:18028,	2200:18236,	2300:18539,	2400:18841,	2500:19151,	2600:19449,	2700:19743,	2800:20266,	2900:20570,	3000:20948},
		2000 : {2000:18235,	2100:18551,	2200:18769,	2300:19082,	2400:19394,	2500:19713,	2600:20021,	2700:20325,	2800:20858,	2900:21171,	3000:21559},
		2100 : {2000:18653,	2100:18979,	2200:19206,	2300:19529,	2400:19851,	2500:20180,	2600:20498,	2700:20812,	2800:21354,	2900:21678,	3000:22075},
		2200 : {2000:19080,	2100:19416,	2200:19653,	2300:19986,	2400:20318,	2500:20657,	2600:20984,	2700:21308,	2800:21860,	2900:22193,	3000:22601}
	},
	'45-3' : {
		1600 : {2000:18311,	2100:18644,	2200:18892,	2300:19222,	2400:19555,	2500:19885,	2600:20215,	2700:20545,	2800:21098,	2900:21427,	3000:21832},
		1700 : {2000:18793,	2100:19136,	2200:19395,	2300:19736,	2400:20081,	2500:20421,	2600:20762,	2700:21103,	2800:21667,	2900:22008,	3000:22424},
		1800 : {2000:19386,	2100:19741,	2200:20011,	2300:20363,	2400:20718,	2500:21070,	2600:21422,	2700:21774,	2800:22349,	2900:22701,	3000:23128},
		1900 : {2000:19868,	2100:20233,	2200:20514,	2300:20877,	2400:21244,	2500:21607,	2600:21970,	2700:22333,	2800:22919,	2900:23282,	3000:23719},
		2000 : {2000:20453,	2100:20830,	2200:21122,	2300:21496,	2400:21874,	2500:22248,	2600:22622,	2700:22996,	2800:23593,	2900:23967,	3000:24415},
		2100 : {2000:20935,	2100:21322,	2200:21626,	2300:22011,	2400:22399,	2500:22784,	2600:23169,	2700:23554,	2800:24162,	2900:24547,	3000:25007},
		2200 : {2000:21436,	2100:21834,	2200:22149,	2300:22545,	2400:22945,	2500:23341,	2600:23737,	2700:24133,	2800:24752,	2900:25148,	3000:25619}
	},
	'46-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'46-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'46-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'47-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'47-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'47-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'48-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'48-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'48-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'49-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'49-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'49-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'410-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'410-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'410-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'411-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'411-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'411-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'412-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'412-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'412-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'413-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'413-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'413-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'414-1' : {
		1600 : {1300:13681,	1400:13954,	1500:14239,	1600:14812,	1700:15151,	1800:15441,	1900:15726,	2000:15925},
		1700 : {1300:13979,	1400:14273,	1500:14568,	1600:15150,	1700:15498,	1800:15798,	1900:16094,	2000:16302},
		1800 : {1300:14401,	1400:14707,	1500:15012,	1600:15604,	1700:15962,	1800:16272,	1900:16577,	2000:16796},
		1900 : {1300:14708,	1400:15024,	1500:15339,	1600:15941,	1700:16309,	1800:16629,	1900:16944,	2000:17172},
		2000 : {1300:15409,	1400:15735,	1500:16060,	1600:16672,	1700:17049,	1800:17379,	1900:17704,	2000:17942},
		2100 : {1300:15727,	1400:16063,	1500:16397,	1600:17019,	1700:17406,	1800:17746,	1900:18080,	2000:18328},
		2200 : {1300:16059,	1400:16405,	1500:16749,	1600:17380,	1700:17778,	1800:18127,	1900:18472,	2000:18729}
	},
	'414-2' : {
		1600 : {1300:14131,	1400:14411,	1500:14704,	1600:15284,	1700:15630,	1800:15933,	1900:16225,	2000:16426},
		1700 : {1300:14434,	1400:14735,	1500:15038,	1600:15628,	1700:15984,	1800:16297,	1900:16599,	2000:16810},
		1800 : {1300:14866,	1400:15180,	1500:15492,	1600:16092,	1700:16458,	1800:16782,	1900:17094,	2000:17314},
		1900 : {1300:15179,	1400:15503,	1500:15825,	1600:16435,	1700:16811,	1800:17144,	1900:17466,	2000:17697},
		2000 : {1300:15597,	1400:15931,	1500:16264,	1600:16883,	1700:17269,	1800:17612,	1900:17944,	2000:18185},
		2100 : {1300:15921,	1400:16264,	1500:16607,	1600:17236,	1700:17632,	1800:17986,	1900:18327,	2000:18578},
		2200 : {1300:16254,	1400:16607,	1500:16960,	1600:17599,	1700:18005,	1800:18368,	1900:18720,	2000:18981}
	},
	'414-3' : {
		1600 : {1300:15633,	1400:15971,	1500:16327,	1600:16642,	1700:17379,	1800:17735,	1900:18090,	2000:18364},
		1700 : {1300:15989,	1400:16351,	1500:16717,	1600:17043,	1700:17792,	1800:18159,	1900:18525,	2000:18811},
		1800 : {1300:16462,	1400:16842,	1500:17220,	1600:17557,	1700:18317,	1800:18695,	1900:19073,	2000:19369},
		1900 : {1300:16830,	1400:17222,	1500:17611,	1600:17959,	1700:18730,	1800:19119,	1900:19508,	2000:19816},
		2000 : {1300:17303,	1400:17705,	1500:18106,	1600:18465,	1700:19248,	1800:19648,	1900:20048,	2000:20367},
		2100 : {1300:17671,	1400:18085,	1500:18496,	1600:18867,	1700:19661,	1800:20072,	1900:20483,	2000:20813},
		2200 : {1300:18059,	1400:18484,	1500:18907,	1600:19288,	1700:20093,	1800:20516,	1900:20938,	2000:21280}
	},
	'51-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'51-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'51-3' : {
		1600 : {1000:10220,	1100:10629,	1200:11043,	1300:11452,	1400:12084,	1500:12493,	1600:12901,	1700:13269,	1800:13734,	1900:14143,	2000:14551},
		1700 : {1000:10513,	1100:10936,	1200:11365,	1300:11788,	1400:12435,	1500:12858,	1600:13281,	1700:13663,	1800:14143,	1900:14566,	2000:14989},
		1800 : {1000:10842,	1100:11280,	1200:11723,	1300:12161,	1400:12822,	1500:13259,	1600:13697,	1700:14094,	1800:14588,	1900:15026,	2000:15463},
		1900 : {1000:11135,	1100:11587,	1200:12045,	1300:12497,	1400:13172,	1500:13624,	1600:14077,	1700:14488,	1800:14997,	1900:15449,	2000:15901},
		2000 : {1000:11427,	1100:11894,	1200:12366,	1300:12833,	1400:13523,	1500:13990,	1600:14456,	1700:14882,	1800:15405,	1900:15872,	2000:16339},
		2100 : {1000:11720,	1100:12201,	1200:12688,	1300:13169,	1400:13874,	1500:14355,	1600:14836,	1700:15276,	1800:15814,	1900:16295,	2000:16776},
		2200 : {1000:12033,	1100:12528,	1200:13030,	1300:13525,	1400:14244,	1500:14740,	1600:15236,	1700:15690,	1800:16243,	1900:16738,	2000:17234},
		2300 : {1000:12325,	1100:12835,	1200:13351,	1300:13861,	1400:14595,	1500:15105,	1600:15615,	1700:16085,	1800:16651,	1900:17162,	2000:17672},
		2400 : {1000:12728,	1100:13253,	1200:13783,	1300:14308,	1400:15056,	1500:15580,	1600:16105,	1700:16589,	1800:17170,	1900:17695,	2000:18220},
		2500 : {1000:13096,	1100:13635,	1200:14180,	1300:14719,	1400:15482,	1500:16021,	1600:16560,	1700:17059,	1800:17654,	1900:18194,	2000:18733},
		2600 : {1000:13389,	1100:13942,	1200:14502,	1300:15056,	1400:15832,	1500:16386,	1600:16940,	1700:17453,	1800:18063,	1900:18617,	2000:19170},
		2700 : {1000:13681,	1100:14250,	1200:14824,	1300:15392,	1400:16183,	1500:16751,	1600:17320,	1700:17847,	1800:18472,	1900:19040,	2000:19608},
		2800 : {1000:13974,	1100:14557,	1200:15145,	1300:15728,	1400:16534,	1500:17117,	1600:17699,	1700:18241,	1800:18880,	1900:19463,	2000:20046},
		2900 : {1000:14267,	1100:14864,	1200:15467,	1300:16064,	1400:16885,	1500:17482,	1600:18079,	1700:18635,	1800:19289,	1900:19886,	2000:20484},
		3000 : {1000:14664,	1100:15275,	1200:15893,	1300:16505,	1400:17340,	1500:17951,	1600:18563,	1700:19134,	1800:19802,	1900:20414,	2000:21026}
	},
	'52-1' : {
		1600 : {1000:10513,	1100:10868,	1200:11229,	1300:11585,	1400:12491,	1500:12846,	1600:13204,	1700:13437,	1800:13848,	1900:14204,	2000:14559},
		1700 : {1000:10787,	1100:11155,	1200:11529,	1300:11898,	1400:12817,	1500:13185,	1600:13555,	1700:13801,	1800:14226,	1900:14595,	2000:14963},
		1800 : {1000:11091,	1100:11472,	1200:11859,	1300:12240,	1400:13173,	1500:13554,	1600:13937,	1700:14196,	1800:14633,	1900:15015,	2000:15396},
		1900 : {1000:11374,	1100:11768,	1200:12168,	1300:12562,	1400:13508,	1500:13902,	1600:14298,	1700:14570,	1800:15020,	1900:15415,	2000:15809},
		2000 : {1000:11646,	1100:12054,	1200:12466,	1300:12874,	1400:13832,	1500:14239,	1600:14648,	1700:14934,	1800:15397,	1900:15804,	2000:16212},
		2100 : {1000:11919,	1100:12339,	1200:12764,	1300:13185,	1400:14156,	1500:14576,	1600:14999,	1700:15297,	1800:15773,	1900:16193,	2000:16614},
		2200 : {1000:12228,	1100:12661,	1200:13100,	1300:13533,	1400:14518,	1500:14951,	1600:15386,	1700:15697,	1800:16186,	1900:16620,	2000:17053},
		2300 : {1000:12500,	1100:12946,	1200:13398,	1300:13845,	1400:14842,	1500:15288,	1600:15736,	1700:16060,	1800:16562,	1900:17009,	2000:17455},
		2400 : {1000:12704,	1100:13163,	1200:13627,	1300:14087,	1400:15097,	1500:15556,	1600:16017,	1700:16354,	1800:16869,	1900:17329,	2000:17788},
		2500 : {1000:13063,	1100:13535,	1200:14012,	1300:14485,	1400:15508,	1500:15980,	1600:16454,	1700:16804,	1800:17332,	1900:17805,	2000:18277},
		2600 : {1000:13337,	1100:13822,	1200:14312,	1300:14798,	1400:15834,	1500:16319,	1600:16806,	1700:17169,	1800:17710,	1900:18196,	2000:18681},
		2700 : {1000:13685,	1100:14183,	1200:14686,	1300:15185,	1400:16234,	1500:16732,	1600:17232,	1700:17608,	1800:18162,	1900:18661,	2000:19159},
		2800 : {1000:13958,	1100:14469,	1200:14985,	1300:15497,	1400:16559,	1500:17070,	1600:17583,	1700:17972,	1800:18539,	1900:19050,	2000:19561},
		2900 : {1000:14240,	1100:14764,	1200:15293,	1300:15818,	1400:16893,	1500:17417,	1600:17943,	1700:18345,	1800:18925,	1900:19450,	2000:19974},
		3000 : {1000:15010,	1100:15547,	1200:16090,	1300:16627,	1400:17715,	1500:18252,	1600:18791,	1700:19206,	1800:19799,	1900:20337,	2000:20874}
	},
	'52-2' : {
		1600 : {1000:10703,	1100:11066,	1200:11435,	1300:11798,	1400:12712,	1500:13074,	1600:13439,	1700:13680,	1800:14099,	1900:14462,	2000:14825},
		1700 : {1000:10982,	1100:11358,	1200:11739,	1300:12115,	1400:13043,	1500:13418,	1600:13796,	1700:14050,	1800:14482,	1900:14858,	2000:15234},
		1800 : {1000:11306,	1100:11694,	1200:12089,	1300:12478,	1400:13418,	1500:13806,	1600:14197,	1700:14464,	1800:14909,	1900:15298,	2000:15687},
		1900 : {1000:11583,	1100:11985,	1200:12392,	1300:12795,	1400:13748,	1500:14149,	1600:14553,	1700:14833,	1800:15291,	1900:15693,	2000:16095},
		2000 : {1000:11861,	1100:12276,	1200:12696,	1300:13111,	1400:14077,	1500:14491,	1600:14908,	1700:15201,	1800:15672,	1900:16087,	2000:16502},
		2100 : {1000:12138,	1100:12566,	1200:12999,	1300:13427,	1400:14406,	1500:14833,	1600:15263,	1700:15569,	1800:16053,	1900:16481,	2000:16909},
		2200 : {1000:12448,	1100:12888,	1200:13334,	1300:13776,	1400:14768,	1500:15208,	1600:15651,	1700:15969,	1800:16466,	1900:16907,	2000:17348},
		2300 : {1000:12725,	1100:13178,	1200:13637,	1300:14092,	1400:15097,	1500:15550,	1600:16006,	1700:16337,	1800:16847,	1900:17301,	2000:17755},
		2400 : {1000:13222,	1100:13689,	1200:14161,	1300:14628,	1400:15646,	1500:16112,	1600:16581,	1700:16925,	1800:17448,	1900:17915,	2000:18382},
		2500 : {1000:13586,	1100:14065,	1200:14550,	1300:15031,	1400:16062,	1500:16541,	1600:17023,	1700:17380,	1800:17916,	1900:18396,	2000:18876},
		2600 : {1000:13940,	1100:14433,	1200:14931,	1300:15424,	1400:16468,	1500:16960,	1600:17455,	1700:17826,	1800:18375,	1900:18868,	2000:19360},
		2700 : {1000:14217,	1100:14723,	1200:15234,	1300:15740,	1400:16797,	1500:17302,	1600:17810,	1700:18194,	1800:18755,	1900:19262,	2000:19767},
		2800 : {1000:14506,	1100:15024,	1200:15548,	1300:16067,	1400:17137,	1500:17655,	1600:18176,	1700:18573,	1800:19147,	1900:19666,	2000:20185},
		2900 : {1000:14783,	1100:15315,	1200:15852,	1300:16384,	1400:17466,	1500:17998,	1600:18531,	1700:18941,	1800:19529,	1900:20061,	2000:20592},
		3000 : {1000:15269,	1100:15813,	1200:16363,	1300:16908,	1400:18004,	1500:18548,	1600:19095,	1700:19517,	1800:20118,	1900:20663,	2000:21208}
	},
	'52-3' : {
		1600 : {1000:12051,	1100:12490,	1200:12935,	1300:13374,	1400:14365,	1500:14804,	1600:15243,	1700:15560,	1800:16056,	1900:16495,	2000:16935},
		1700 : {1000:12383,	1100:12837,	1200:13297,	1300:13750,	1400:14755,	1500:15209,	1600:15663,	1700:15994,	1800:16505,	1900:16958,	2000:17412},
		1800 : {1000:12752,	1100:13220,	1200:13694,	1300:14163,	1400:15182,	1500:15650,	1600:16119,	1700:16465,	1800:16989,	1900:17458,	2000:17926},
		1900 : {1000:13084,	1100:13567,	1200:14056,	1300:14538,	1400:15573,	1500:16055,	1600:16538,	1700:16899,	1800:17438,	1900:17921,	2000:18403},
		2000 : {1000:13417,	1100:13914,	1200:14417,	1300:14914,	1400:15963,	1500:16460,	1600:16958,	1700:17333,	1800:17886,	1900:18384,	2000:18881},
		2100 : {1000:13749,	1100:14261,	1200:14779,	1300:15290,	1400:16353,	1500:16865,	1600:17377,	1700:17767,	1800:18335,	1900:18847,	2000:19358},
		2200 : {1000:14102,	1100:14628,	1200:15160,	1300:15686,	1400:16764,	1500:17290,	1600:17816,	1700:18221,	1800:18803,	1900:19330,	2000:19856},
		2300 : {1000:14434,	1100:14975,	1200:15521,	1300:16062,	1400:17154,	1500:17695,	1600:18236,	1700:18655,	1800:19252,	1900:19793,	2000:20333},
		2400 : {1000:14987,	1100:15542,	1200:16103,	1300:16659,	1400:17765,	1500:18320,	1600:18876,	1700:19309,	1800:19921,	1900:20476,	2000:21031},
		2500 : {1000:15395,	1100:15965,	1200:16540,	1300:17110,	1400:18231,	1500:18801,	1600:19371,	1700:19818,	1800:20445,	1900:21014,	2000:21584},
		2600 : {1000:15727,	1100:16311,	1200:16902,	1300:17486,	1400:18621,	1500:19206,	1600:19790,	1700:20252,	1800:20893,	1900:21477,	2000:22062},
		2700 : {1000:16136,	1100:16734,	1200:17339,	1300:17938,	1400:19088,	1500:19687,	1600:20286,	1700:20762,	1800:21418,	1900:22016,	2000:22615},
		2800 : {1000:16468,	1100:17081,	1200:17701,	1300:18314,	1400:19478,	1500:20092,	1600:20705,	1700:21196,	1800:21866,	1900:22479,	2000:23093},
		2900 : {1000:16801,	1100:17428,	1200:18062,	1300:18690,	1400:19869,	1500:20497,	1600:21125,	1700:21630,	1800:22315,	1900:22942,	2000:23570},
		3000 : {1000:17342,	1100:17984,	1200:18632,	1300:19274,	1400:20468,	1500:21110,	1600:21753,	1700:22273,	1800:22972,	1900:23614,	2000:24256}
	},
	'53-1' : {
		1600 : {1000:12014,	1100:12423,	1200:12897,	1300:13306,	1400:14266,	1500:14673,	1600:15158,	1700:15444,	1800:16031,	1900:16439,	2000:16848},
		1700 : {1000:12308,	1100:12729,	1200:13217,	1300:13638,	1400:14611,	1500:15031,	1600:15529,	1700:15829,	1800:16428,	1900:16850,	2000:17271},
		1800 : {1000:12631,	1100:13066,	1200:13567,	1300:14001,	1400:14987,	1500:15420,	1600:15931,	1700:16243,	1800:16856,	1900:17290,	2000:17724},
		1900 : {1000:12929,	1100:13377,	1200:13891,	1300:14338,	1400:15337,	1500:15783,	1600:16307,	1700:16632,	1800:17258,	1900:17705,	2000:18152},
		2000 : {1000:13222,	1100:13682,	1200:14209,	1300:14669,	1400:15681,	1500:16140,	1600:16677,	1700:17016,	1800:17654,	1900:18114,	2000:18575},
		2100 : {1000:13514,	1100:13987,	1200:14527,	1300:15000,	1400:16025,	1500:16497,	1600:17047,	1700:17398,	1800:18050,	1900:18523,	2000:18996},
		2200 : {1000:14141,	1100:14628,	1200:15119,	1300:15605,	1400:16880,	1500:17365,	1600:17853,	1700:18217,	1800:18683,	1900:19169,	2000:19655},
		2300 : {1000:14434,	1100:14934,	1200:15438,	1300:15937,	1400:17225,	1500:17723,	1600:18224,	1700:18601,	1800:19080,	1900:19579,	2000:20078},
		2400 : {1000:14904,	1100:15416,	1200:15933,	1300:16445,	1400:17746,	1500:18258,	1600:18771,	1700:19162,	1800:19653,	1900:20165,	2000:20678},
		2500 : {1000:15283,	1100:15808,	1200:16338,	1300:16863,	1400:18177,	1500:18701,	1600:19228,	1700:19631,	1800:20136,	1900:20661,	2000:21186},
		2600 : {1000:15571,	1100:16110,	1200:16653,	1300:17191,	1400:18518,	1500:19055,	1600:19595,	1700:20011,	1800:20529,	1900:21067,	2000:21605},
		2700 : {1000:15940,	1100:16491,	1200:17047,	1300:17598,	1400:18938,	1500:19488,	1600:20041,	1700:20470,	1800:21000,	1900:21551,	2000:22103},
		2800 : {1000:16232,	1100:16797,	1200:17366,	1300:17930,	1400:19283,	1500:19846,	1600:20411,	1700:20854,	1800:21397,	1900:21961,	2000:22526},
		2900 : {1000:16530,	1100:17107,	1200:17689,	1300:18266,	1400:19632,	1500:20208,	1600:20786,	1700:21242,	1800:21798,	1900:22375,	2000:22952},
		3000 : {1000:17320,	1100:17910,	1200:18505,	1300:19095,	1400:20474,	1500:21063,	1600:21654,	1700:22123,	1800:22692,	1900:23282,	2000:23872}
	},
	'53-2' : {
		1600 : {1000:12204,	1100:12621,	1200:13104,	1300:13520,	1400:14488,	1500:14903,	1600:15396,	1700:15691,	1800:16506,	1900:16923,	2000:17014},
		1700 : {1000:12503,	1100:12932,	1200:13428,	1300:13857,	1400:14838,	1500:15266,	1600:15772,	1700:16080,	1800:16909,	1900:17338,	2000:17443},
		1800 : {1000:12846,	1100:13288,	1200:13797,	1300:14239,	1400:15233,	1500:15674,	1600:16193,	1700:16514,	1800:17356,	1900:17798,	2000:17915},
		1900 : {1000:13138,	1100:13594,	1200:14116,	1300:14571,	1400:15577,	1500:16032,	1600:16564,	1700:16897,	1800:17752,	1900:18207,	2000:18338},
		2000 : {1000:13435,	1100:13904,	1200:14439,	1300:14907,	1400:15926,	1500:16394,	1600:16938,	1700:17285,	1800:18153,	1900:18621,	2000:18765},
		2100 : {1000:13732,	1100:14213,	1200:14761,	1300:15242,	1400:16275,	1500:16755,	1600:17313,	1700:17672,	1800:18553,	1900:19034,	2000:19191},
		2200 : {1000:14369,	1100:14863,	1200:15362,	1300:15856,	1400:17149,	1500:17642,	1600:18138,	1700:18510,	1800:18984,	1900:19478,	2000:19972},
		2300 : {1000:14660,	1100:15168,	1200:15679,	1300:16186,	1400:17493,	1500:17999,	1600:18507,	1700:18893,	1800:19379,	1900:19886,	2000:20394},
		2400 : {1000:15424,	1100:15944,	1200:16469,	1300:16989,	1400:18308,	1500:18827,	1600:19349,	1700:19747,	1800:20247,	1900:20767,	2000:21287},
		2500 : {1000:15807,	1100:16340,	1200:16878,	1300:17411,	1400:18743,	1500:19275,	1600:19810,	1700:20221,	1800:20734,	1900:21267,	2000:21800},
		2600 : {1000:16176,	1100:16723,	1200:17274,	1300:17820,	1400:19165,	1500:19710,	1600:20257,	1700:20682,	1800:21207,	1900:21753,	2000:22300},
		2700 : {1000:16473,	1100:17032,	1200:17596,	1300:18155,	1400:19513,	1500:20071,	1600:20632,	1700:21069,	1800:21608,	1900:22167,	2000:22726},
		2800 : {1000:16781,	1100:17353,	1200:17930,	1300:18502,	1400:19873,	1500:20444,	1600:21017,	1700:21468,	1800:22019,	1900:22591,	2000:23163},
		2900 : {1000:17073,	1100:17658,	1200:18248,	1300:18833,	1400:20217,	1500:20801,	1600:21387,	1700:21850,	1800:22415,	1900:23000,	2000:23585},
		3000 : {1000:17578,	1100:18176,	1200:18779,	1300:19377,	1400:20774,	1500:21371,	1600:21970,	1700:22447,	1800:23024,	1900:23622,	2000:24220}
	},
	'53-3' : {
		1600 : {1000:13703,	1100:14203,	1200:14771,	1300:15272,	1400:16323,	1500:16824,	1600:17399,	1700:17778,	1800:18457,	1900:18958,	2000:19133},
		1700 : {1000:14057,	1100:14572,	1200:15154,	1300:15669,	1400:16735,	1500:17250,	1600:17840,	1700:18233,	1800:18927,	1900:19442,	2000:19632},
		1800 : {1000:14447,	1100:14976,	1200:15573,	1300:16103,	1400:17183,	1500:17713,	1600:18317,	1700:18725,	1800:19433,	1900:19963,	2000:20168},
		1900 : {1000:14801,	1100:15345,	1200:15956,	1300:16500,	1400:17595,	1500:18139,	1600:18758,	1700:19180,	1800:19903,	1900:20447,	2000:20667},
		2000 : {1000:15154,	1100:15713,	1200:16339,	1300:16897,	1400:18007,	1500:18566,	1600:19199,	1700:19636,	1800:20373,	1900:20932,	2000:21166},
		2100 : {1000:15508,	1100:16081,	1200:16722,	1300:17295,	1400:18419,	1500:18992,	1600:19640,	1700:20091,	1800:20843,	1900:21416,	2000:21664},
		2200 : {1000:15856,	1100:16422,	1200:17015,	1300:17602,	1400:18741,	1500:19329,	1600:20025,	1700:20491,	1800:21139,	1900:21726,	2000:22426},
		2300 : {1000:16210,	1100:16790,	1200:17398,	1300:18000,	1400:19153,	1500:19755,	1600:20466,	1700:20946,	1800:21609,	1900:22211,	2000:22925},
		2400 : {1000:16784,	1100:17379,	1200:18001,	1300:18618,	1400:19785,	1500:20402,	1600:21128,	1700:21622,	1800:22299,	1900:22915,	2000:23644},
		2500 : {1000:17336,	1100:17946,	1200:18583,	1300:19214,	1400:20396,	1500:21027,	1600:21767,	1700:22276,	1800:22967,	1900:23598,	2000:24342},
		2600 : {1000:17690,	1100:18314,	1200:18966,	1300:19611,	1400:20808,	1500:21453,	1600:22208,	1700:22732,	1800:23437,	1900:24083,	2000:24841},
		2700 : {1000:18120,	1100:18759,	1200:19425,	1300:20085,	1400:21296,	1500:21956,	1600:22725,	1700:23263,	1800:23983,	1900:24643,	2000:25416},
		2800 : {1000:18474,	1100:19127,	1200:19807,	1300:20482,	1400:21708,	1500:22382,	1600:23166,	1700:23718,	1800:24453,	1900:25128,	2000:25915},
		2900 : {1000:18828,	1100:19495,	1200:20190,	1300:20879,	1400:22120,	1500:22809,	1600:23607,	1700:24174,	1800:24923,	1900:25612,	2000:26414},
		3000 : {1000:19390,	1100:20072,	1200:20782,	1300:21485,	1400:22740,	1500:23444,	1600:24257,	1700:24838,	1800:25602,	1900:26305,	2000:27121}
	},
	'54-1' : {
		1600 : {1500:14459,	1600:14819,	1700:15170,	1800:15534,	1900:15894,	2000:16245,	2100:17374,	2200:17735,	2300:18086,	2400:18445,	2500:18765,	2600:18993,	2700:19456,	2800:19817,	2900:20167,	3000:20524},
		1700 : {1500:14856,	1600:15229,	1700:15593,	1800:15970,	1900:16343,	2000:16707,	2100:17849,	2200:18223,	2300:18587,	2400:18959,	2500:19292,	2600:19533,	2700:20009,	2800:20383,	2900:20746,	3000:21116},
		1800 : {1500:15313,	1600:15700,	1700:16076,	1800:16466,	1900:16853,	2000:17229,	2100:18384,	2200:18771,	2300:19148,	2400:19533,	2500:19879,	2600:20133,	2700:20622,	2800:21009,	2900:21385,	3000:21768},
		1900 : {1500:15723,	1600:16123,	1700:16512,	1800:16915,	1900:17315,	2000:17704,	2100:18872,	2200:19272,	2300:19662,	2400:20060,	2500:20419,	2600:20686,	2700:21188,	2800:21588,	2900:21977,	3000:22373},
		2000 : {1500:16119,	1600:16531,	1700:16933,	1800:17350,	1900:17762,	2000:18164,	2100:19346,	2200:19758,	2300:20161,	2400:20572,	2500:20944,	2600:21224,	2700:21739,	2800:22152,	2900:22554,	3000:22963},
		2100 : {1500:16513,	1600:16939,	1700:17354,	1800:17783,	1900:18208,	2000:18624,	2100:19818,	2200:20243,	2300:20659,	2400:21083,	2500:21468,	2600:21761,	2700:22289,	2800:22715,	2900:23130,	3000:23552},
		2200 : {1500:16975,	1600:17414,	1700:17842,	1800:18284,	1900:18723,	2000:19151,	2100:20358,	2200:20797,	2300:21226,	2400:21662,	2500:22060,	2600:22366,	2700:22908,	2800:23346,	2900:23774,	3000:24209},
		2300 : {1500:17370,	1600:17821,	1700:18262,	1800:18717,	1900:19169,	2000:19610,	2100:20830,	2200:21282,	2300:21724,	2400:22174,	2500:22585,	2600:22903,	2700:23458,	2800:23909,	2900:24350,	3000:24798},
		2400 : {1500:17804,	1600:18269,	1700:18723,	1800:19191,	1900:19656,	2000:20110,	2100:21343,	2200:21808,	2300:22263,	2400:22725,	2500:23149,	2600:23481,	2700:24048,	2800:24513,	2900:24967,	3000:25428},
		2500 : {1500:18366,	1600:18844,	1700:19311,	1800:19792,	1900:20270,	2000:20737,	2100:21983,	2200:22460,	2300:22928,	2400:23404,	2500:23841,	2600:24186,	2700:24766,	2800:25244,	2900:25711,	3000:26185},
		2600 : {1500:18763,	1600:19254,	1700:19734,	1800:20228,	1900:20719,	2000:21199,	2100:22458,	2200:22948,	2300:23429,	2400:23918,	2500:24368,	2600:24726,	2700:25319,	2800:25809,	2900:26289,	3000:26776},
		2700 : {1500:19234,	1600:19737,	1700:20230,	1800:20737,	1900:21241,	2000:21734,	2100:23006,	2200:23509,	2300:24003,	2400:24505,	2500:24968,	2600:25339,	2700:25945,	2800:26449,	2900:26942,	3000:27441},
		2800 : {1500:19629,	1600:20145,	1700:20651,	1800:21171,	1900:21688,	2000:22194,	2100:23479,	2200:23996,	2300:24502,	2400:25017,	2500:25493,	2600:25877,	2700:26496,	2800:27013,	2900:27519,	3000:28031},
		2900 : {1500:20038,	1600:20568,	1700:21087,	1800:21620,	1900:22149,	2000:22668,	2100:23966,	2200:24496,	2300:25016,	2400:25544,	2500:26032,	2600:26429,	2700:27061,	2800:27591,	2900:28110,	3000:28636},
		3000 : {1500:21037,	1600:21579,	1700:22111,	1800:22657,	1900:23200,	2000:23732,	2100:25043,	2200:25585,	2300:26118,	2400:26659,	2500:27160,	2600:27570,	2700:28215,	2800:28758,	2900:29290,	3000:29829}
	},
	'54-2' : {
		1600 : {1500:14750,	1600:15113,	1700:15348,	1800:15847,	1900:16211,	2000:16446,	2100:17711,	2200:18074,	2300:18432,	2400:18804,	2500:19127,	2600:19016,	2700:19838,	2800:20201,	2900:20559,	3000:20929},
		1700 : {1500:15154,	1600:15530,	1700:15778,	1800:16291,	1900:16667,	2000:16915,	2100:18192,	2200:18569,	2300:18940,	2400:19325,	2500:19660,	2600:19563,	2700:20398,	2800:20774,	2900:21145,	3000:21528},
		1800 : {1500:15643,	1600:16032,	1700:16294,	1800:16819,	1900:17208,	2000:17469,	2100:18760,	2200:19149,	2300:19533,	2400:19931,	2500:20280,	2600:20195,	2700:21043,	2800:21432,	2900:21816,	3000:22212},
		1900 : {1500:16045,	1600:16448,	1700:16722,	1800:17260,	1900:17662,	2000:17936,	2100:19240,	2200:19642,	2300:20040,	2400:20450,	2500:20812,	2600:20740,	2700:21601,	2800:22003,	2900:22400,	3000:22809},
		2000 : {1500:16448,	1600:16863,	1700:17150,	1800:17701,	1900:18116,	2000:18403,	2100:19720,	2200:20135,	2300:20546,	2400:20969,	2500:21344,	2600:21285,	2700:22159,	2800:22575,	2900:22984,	3000:23406},
		2100 : {1500:16849,	1600:17277,	1700:17578,	1800:18142,	1900:18570,	2000:18870,	2100:20199,	2200:20628,	2300:21051,	2400:21488,	2500:21875,	2600:21830,	2700:22717,	2800:23145,	2900:23567,	3000:24002},
		2200 : {1500:17309,	1600:17750,	1700:18064,	1800:18641,	1900:19082,	2000:19395,	2100:20737,	2200:21178,	2300:21615,	2400:22064,	2500:22465,	2600:22432,	2700:23332,	2800:23773,	2900:24209,	3000:24657},
		2300 : {1500:17711,	1600:18165,	1700:18491,	1800:19081,	1900:19535,	2000:19861,	2100:21217,	2200:21671,	2300:22120,	2400:22583,	2500:22996,	2600:22977,	2700:23890,	2800:24344,	2900:24792,	3000:25253},
		2400 : {1500:18442,	1600:18910,	1700:19249,	1800:19852,	1900:20319,	2000:20658,	2100:22026,	2200:22494,	2300:22956,	2400:23432,	2500:23858,	2600:23852,	2700:24777,	2800:25244,	2900:25706,	3000:26180},
		2500 : {1500:19012,	1600:19492,	1700:19844,	1800:20460,	1900:20940,	2000:21292,	2100:22673,	2200:23154,	2300:23629,	2400:24117,	2500:24557,	2600:24563,	2700:25502,	2800:25982,	2900:26457,	3000:26944},
		2600 : {1500:19492,	1600:19985,	1700:20350,	1800:20979,	1900:21472,	2000:21837,	2100:23232,	2200:23725,	2300:24213,	2400:24714,	2500:25167,	2600:25186,	2700:26138,	2800:26631,	2900:27119,	3000:27618},
		2700 : {1500:19893,	1600:20399,	1700:20777,	1800:21419,	1900:21926,	2000:22303,	2100:23711,	2200:24217,	2300:24718,	2400:25233,	2500:25698,	2600:25731,	2700:26695,	2800:27201,	2900:27702,	3000:28215},
		2800 : {1500:20311,	1600:20830,	1700:21221,	1800:21876,	1900:22395,	2000:22786,	2100:24206,	2200:24725,	2300:25240,	2400:25767,	2500:26246,	2600:26291,	2700:27269,	2800:27788,	2900:28301,	3000:28827},
		2900 : {1500:20713,	1600:21245,	1700:21649,	1800:22317,	1900:22849,	2000:23253,	2100:24687,	2200:25219,	2300:25746,	2400:26286,	2500:26778,	2600:26836,	2700:27827,	2800:28359,	2900:28885,	3000:29424},
		3000 : {1500:21427,	1600:21972,	1700:22390,	1800:23071,	1900:23616,	2000:24032,	2100:25479,	2200:26024,	2300:26564,	2400:27118,	2500:27622,	2600:27693,	2700:28697,	2800:29242,	2900:29782,	3000:30333}
	},
	'54-3' : {
		1600 : {1500:16712,	1600:17152,	1700:17591,	1800:18039,	1900:18479,	2000:18918,	2100:20132,	2200:20571,	2300:21010,	2400:21452,	2500:21850,	2600:22167,	2700:22715,	2800:23154,	2900:23593,	3000:24035},
		1700 : {1500:17194,	1600:17648,	1700:18102,	1800:18565,	1900:19018,	2000:19472,	2100:20700,	2200:21154,	2300:21608,	2400:22064,	2500:22477,	2600:22809,	2700:23371,	2800:23825,	2900:24278,	3000:24734},
		1800 : {1500:17748,	1600:18217,	1700:18685,	1800:19163,	1900:19631,	2000:20099,	2100:21342,	2200:21810,	2300:22278,	2400:22749,	2500:23176,	2600:23522,	2700:24099,	2800:24567,	2900:25036,	3000:25506},
		1900 : {1500:18230,	1600:18713,	1700:19196,	1800:19688,	1900:20171,	2000:20653,	2100:21911,	2200:22393,	2300:22876,	2400:23361,	2500:23803,	2600:24164,	2700:24755,	2800:25238,	2900:25721,	3000:26206},
		2000 : {1500:18712,	1600:19209,	1700:19706,	1800:20213,	1900:20710,	2000:21208,	2100:22479,	2200:22977,	2300:23474,	2400:23973,	2500:24430,	2600:24805,	2700:25411,	2800:25908,	2900:26405,	3000:26905},
		2100 : {1500:19194,	1600:19705,	1700:20217,	1800:20738,	1900:21250,	2000:21762,	2100:23048,	2200:23560,	2300:24072,	2400:24586,	2500:25057,	2600:25446,	2700:26067,	2800:26578,	2900:27090,	3000:27604},
		2200 : {1500:19715,	1600:20241,	1700:20768,	1800:21303,	1900:21830,	2000:22356,	2100:23657,	2200:24183,	2300:24709,	2400:25238,	2500:25723,	2600:26127,	2700:26762,	2800:27288,	2900:27815,	3000:28343},
		2300 : {1500:20197,	1600:20738,	1700:21279,	1800:21829,	1900:22369,	2000:22910,	2100:24225,	2200:24766,	2300:25307,	2400:25850,	2500:26350,	2600:26769,	2700:27418,	2800:27959,	2900:28500,	3000:29043},
		2400 : {1500:21009,	1600:21564,	1700:22120,	1800:22684,	1900:23240,	2000:23795,	2100:25125,	2200:25680,	2300:26235,	2400:26793,	2500:27307,	2600:27741,	2700:28404,	2800:28960,	2900:29515,	3000:30073},
		2500 : {1500:21642,	1600:22211,	1700:22781,	1800:23360,	1900:23930,	2000:24500,	2100:25844,	2200:26414,	2300:26984,	2400:27556,	2500:28085,	2600:28533,	2700:29211,	2800:29781,	2900:30351,	3000:30923},
		2600 : {1500:22123,	1600:22708,	1700:23292,	1800:23886,	1900:24470,	2000:25054,	2100:26413,	2200:26997,	2300:27582,	2400:28168,	2500:28712,	2600:29174,	2700:29867,	2800:30451,	2900:31035,	3000:31622},
		2700 : {1500:22681,	1600:23280,	1700:23879,	1800:24487,	1900:25086,	2000:25684,	2100:27058,	2200:27657,	2300:28255,	2400:28856,	2500:29415,	2600:29891,	2700:30599,	2800:31197,	2900:31796,	3000:32397},
		2800 : {1500:23163,	1600:23776,	1700:24390,	1800:25012,	1900:25625,	2000:26239,	2100:27627,	2200:28240,	2300:28853,	2400:29469,	2500:30041,	2600:30533,	2700:31254,	2800:31868,	2900:32481,	3000:33097},
		2900 : {1500:23645,	1600:24272,	1700:24900,	1800:25537,	1900:26165,	2000:26793,	2100:28195,	2200:28823,	2300:29451,	2400:30081,	2500:30668,	2600:31174,	2700:31910,	2800:32538,	2900:33166,	3000:33796},
		3000 : {1500:24439,	1600:25082,	1700:25724,	1800:26376,	1900:27018,	2000:27660,	2100:29077,	2200:29719,	2300:30362,	2400:31006,	2500:31608,	2600:32128,	2700:32879,	2800:33521,	2900:34164,	3000:34808}
	},
	'55-1' : {
		1600 : {1500:12492,	1600:12833,	1700:13164,	1800:13511,	1900:13853,	2000:14184,	2100:15076,	2200:15417,	2300:15748,	2400:16093,	2500:16435,	2600:16644,	2700:17038,	2800:17380,	2900:17711,	3000:18054},
		1700 : {1500:12855,	1600:13210,	1700:13554,	1800:13913,	1900:14268,	2000:14612,	2100:15517,	2200:15872,	2300:16216,	2400:16573,	2500:16928,	2600:17150,	2700:17558,	2800:17912,	2900:18256,	3000:18612},
		1800 : {1500:13249,	1600:13616,	1700:13973,	1800:14346,	1900:14713,	2000:15070,	2100:15988,	2200:16356,	2300:16713,	2400:17084,	2500:17451,	2600:17686,	2700:18107,	2800:18474,	2900:18831,	3000:19200},
		1900 : {1500:13621,	1600:14002,	1700:14372,	1800:14757,	1900:15138,	2000:15508,	2100:16439,	2200:16819,	2300:17189,	2400:17573,	2500:17954,	2600:18202,	2700:18635,	2800:19016,	2900:19386,	3000:19768},
		2000 : {1500:13984,	1600:14378,	1700:14761,	1800:15159,	1900:15553,	2000:15936,	2100:16879,	2200:17273,	2300:17656,	2400:18053,	2500:18446,	2600:18707,	2700:19154,	2800:19547,	2900:19930,	3000:20325},
		2100 : {1500:14346,	1600:14752,	1700:15148,	1800:15560,	1900:15966,	2000:16362,	2100:17319,	2200:17726,	2300:18122,	2400:18531,	2500:18938,	2600:19212,	2700:19671,	2800:20078,	2900:20474,	3000:20882},
		2200 : {1500:14745,	1600:15165,	1700:15573,	1800:15998,	1900:16417,	2000:16826,	2100:17796,	2200:18216,	2300:18625,	2400:19047,	2500:19467,	2600:19754,	2700:20226,	2800:20646,	2900:21055,	3000:21476},
		2300 : {1500:15107,	1600:15539,	1700:15961,	1800:16399,	1900:16831,	2000:17253,	2100:18236,	2200:18668,	2300:19090,	2400:19526,	2500:19958,	2600:20258,	2700:20744,	2800:21176,	2900:21598,	3000:22032},
		2400 : {1500:15400,	1600:15845,	1700:16280,	1800:16730,	1900:17176,	2000:17611,	2100:18607,	2200:19052,	2300:19487,	2400:19936,	2500:20381,	2600:20694,	2700:21193,	2800:21638,	2900:22073,	3000:22520},
		2500 : {1500:15849,	1600:16307,	1700:16755,	1800:17218,	1900:17677,	2000:18125,	2100:19134,	2200:19592,	2300:20040,	2400:20502,	2500:20960,	2600:21286,	2700:21797,	2800:22256,	2900:22704,	3000:23164},
		2600 : {1500:16212,	1600:16684,	1700:17145,	1800:17621,	1900:18092,	2000:18553,	2100:19575,	2200:20046,	2300:20507,	2400:20982,	2500:21453,	2600:21792,	2700:22317,	2800:22788,	2900:23249,	3000:23722},
		2700 : {1500:16650,	1600:17134,	1700:17608,	1800:18098,	1900:18582,	2000:19056,	2100:20091,	2200:20575,	2300:21049,	2400:21537,	2500:22021,	2600:22373,	2700:22910,	2800:23395,	2900:23869,	3000:24354},
		2800 : {1500:17013,	1600:17510,	1700:17997,	1800:18499,	1900:18997,	2000:19483,	2100:20531,	2200:21029,	2300:21515,	2400:22016,	2500:22513,	2600:22878,	2700:23429,	2800:23926,	2900:24413,	3000:24912},
		2900 : {1500:17385,	1600:17895,	1700:18395,	1800:18910,	1900:19420,	2000:19920,	2100:20981,	2200:21491,	2300:21991,	2400:22505,	2500:23015,	2600:23393,	2700:23957,	2800:24467,	2900:24967,	3000:25478},
		3000 : {1500:18245,	1600:18768,	1700:19281,	1800:19809,	1900:20333,	2000:20846,	2100:21919,	2200:22443,	2300:22955,	2400:23482,	2500:24005,	2600:24396,	2700:24973,	2800:25496,	2900:26009,	3000:26534}
	},
	'55-2' : {
		1600 : {1500:12761,	1600:13110,	1700:13449,	1800:13803,	1900:14152,	2000:14490,	2100:15390,	2200:15739,	2300:16077,	2400:16429,	2500:16778,	2600:16995,	2700:17397,	2800:17746,	2900:18085,	3000:18435},
		1700 : {1500:13131,	1600:13493,	1700:13844,	1800:14211,	1900:14573,	2000:14925,	2100:15837,	2200:16199,	2300:16551,	2400:16916,	2500:17278,	2600:17507,	2700:17923,	2800:18285,	2900:18636,	3000:18999},
		1800 : {1500:13545,	1600:13920,	1700:14284,	1800:14664,	1900:15039,	2000:15404,	2100:16329,	2200:16704,	2300:17069,	2400:17447,	2500:17822,	2600:18064,	2700:18493,	2800:18868,	2900:19232,	3000:19608},
		1900 : {1500:13914,	1600:14302,	1700:14679,	1800:15072,	1900:15460,	2000:15838,	2100:16776,	2200:17164,	2300:17541,	2400:17932,	2500:18320,	2600:18576,	2700:19017,	2800:19405,	2900:19783,	3000:20172},
		2000 : {1500:14282,	1600:14683,	1700:15074,	1800:15480,	1900:15881,	2000:16271,	2100:17223,	2200:17623,	2300:18014,	2400:18418,	2500:18819,	2600:19087,	2700:19542,	2800:19943,	2900:20333,	3000:20735},
		2100 : {1500:14650,	1600:15064,	1700:15468,	1800:15887,	1900:16301,	2000:16704,	2100:17668,	2200:18082,	2300:18486,	2400:18903,	2500:19317,	2600:19598,	2700:20065,	2800:20479,	2900:20883,	3000:21298},
		2200 : {1500:15051,	1600:15478,	1700:15894,	1800:16326,	1900:16753,	2000:17169,	2100:18147,	2200:18574,	2300:18990,	2400:19420,	2500:19847,	2600:20141,	2700:20622,	2800:21049,	2900:21465,	3000:21893},
		2300 : {1500:15419,	1600:15859,	1700:16288,	1800:16733,	1900:17173,	2000:17602,	2100:18592,	2200:19032,	2300:19462,	2400:19905,	2500:20345,	2600:20652,	2700:21145,	2800:21585,	2900:22015,	3000:22456},
		2400 : {1500:16007,	1600:16460,	1700:16902,	1800:17360,	1900:17813,	2000:18255,	2100:19259,	2200:19711,	2300:20154,	2400:20610,	2500:21063,	2600:21383,	2700:21889,	2800:22342,	2900:22785,	3000:23239},
		2500 : {1500:16462,	1600:16928,	1700:17383,	1800:17854,	1900:18320,	2000:18775,	2100:19792,	2200:20257,	2300:20713,	2400:21182,	2500:21648,	2600:21981,	2700:22500,	2800:22966,	2900:23421,	3000:23889},
		2600 : {1500:16908,	1600:17387,	1700:17855,	1800:18339,	1900:18818,	2000:19286,	2100:20315,	2200:20794,	2300:21262,	2400:21744,	2500:22223,	2600:22569,	2700:23102,	2800:23581,	2900:24049,	3000:24529},
		2700 : {1500:17276,	1600:17767,	1700:18249,	1800:18746,	1900:19237,	2000:19719,	2100:20761,	2200:21253,	2300:21734,	2400:22229,	2500:22721,	2600:23080,	2700:23625,	2800:24117,	2900:24598,	3000:25092},
		2800 : {1500:17655,	1600:18159,	1700:18654,	1800:19163,	1900:19668,	2000:20163,	2100:21218,	2200:21723,	2300:22217,	2400:22725,	2500:23230,	2600:23602,	2700:24160,	2800:24665,	2900:25159,	3000:25665},
		2900 : {1500:18023,	1600:18541,	1700:19048,	1800:19571,	1900:20089,	2000:20596,	2100:21664,	2200:22182,	2300:22689,	2400:23210,	2500:23728,	2600:24113,	2700:24685,	2800:25202,	2900:25710,	3000:26229},
		3000 : {1500:18600,	1600:19131,	1700:19651,	1800:20187,	1900:20717,	2000:21238,	2100:22319,	2200:22850,	2300:23370,	2400:23904,	2500:24435,	2600:24833,	2700:25417,	2800:25948,	2900:26468,	3000:27000}
	},
	'55-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
     '56-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'56-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'56-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	}, 
	'57-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'57-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'57-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
	'58-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'58-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'58-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
	'59-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'59-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'59-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
	'510-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'510-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'510-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '61-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'61-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'61-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '62-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'62-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'62-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '63-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'63-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'63-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '64-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'64-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'64-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '65-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'65-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'65-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '66-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'66-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'66-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '67-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'67-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'67-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '68-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'68-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'68-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	},
    '69-1' : {
		1600 : {1000:8875,	1100:9204,	1200:9538,	1300:9868,	1400:10420,	1500:10749,	1600:11079,	1700:11367,	1800:11752,	1900:12082,	2000:12411},
		1700 : {1000:9115,	1100:9457,	1200:9805,	1300:10147,	1400:10712,	1500:11054,	1600:11397,	1700:11699,	1800:12097,	1900:12439,	2000:12781},
		1800 : {1000:9386,	1100:9741,	1200:10102,	1300:10457,	1400:11035,	1500:11390,	1600:11746,	1700:12061,	1800:12472,	1900:12827,	2000:13182},
		1900 : {1000:9632,	1100:10000,	1200:10373,	1300:10742,	1400:11333,	1500:11700,	1600:12070,	1700:12397,	1800:12821,	1900:13190,	2000:13558},
		2000 : {1000:9872,	1100:10253,	1200:10639,	1300:11021,	1400:11625,	1500:12005,	1600:12388,	1700:12728,	1800:13165,	1900:13546,	2000:13927},
		2100 : {1000:10111,	1100:10505,	1200:10905,	1300:11299,	1400:11916,	1500:12310,	1600:12705,	1700:13058,	1800:13508,	1900:13903,	2000:14297},
		2200 : {1000:10382,	1100:10789,	1200:11202,	1300:11609,	1400:12239,	1500:12646,	1600:13054,	1700:13420,	1800:13883,	1900:14291,	2000:14698},
		2300 : {1000:10622,	1100:11042,	1200:11467,	1300:11888,	1400:12531,	1500:12950,	1600:13371,	1700:13751,	1800:14227,	1900:14647,	2000:15067},
		2400 : {1000:10971,	1100:11404,	1200:11842,	1300:12275,	1400:12931,	1500:13364,	1600:13798,	1700:14190,	1800:14679,	1900:15113,	2000:15546},
		2500 : {1000:11292,	1100:11738,	1200:12189,	1300:12636,	1400:13305,	1500:13750,	1600:14197,	1700:14602,	1800:15104,	1900:15551,	2000:15997},
		2600 : {1000:11533,	1100:11991,	1200:12456,	1300:12915,	1400:13597,	1500:14055,	1600:14516,	1700:14934,	1800:15449,	1900:15908,	2000:16367},
		2700 : {1000:11772,	1100:12244,	1200:12721,	1300:13193,	1400:13889,	1500:14360,	1600:14833,	1700:15264,	1800:15792,	1900:16264,	2000:16736},
		2800 : {1000:12013,	1100:12497,	1200:12988,	1300:13473,	1400:14181,	1500:14665,	1600:15151,	1700:15596,	1800:16136,	1900:16622,	2000:17107},
		2900 : {1000:12257,	1100:12755,	1200:13258,	1300:13756,	1400:14477,	1500:14975,	1600:15474,	1700:15931,	1800:16485,	1900:16983,	2000:17481},
		3000 : {1000:12602,	1100:13113,	1200:13629,	1300:14141,	1400:14875,	1500:15385,	1600:15897,	1700:16367,	1800:16934,	1900:17445,	2000:17956}
	},
	'69-2' : {
		1600 : {1000:9061,	1100:9397,	1200:9739,	1300:10076,	1400:10636,	1500:10972,	1600:11309,	1700:11605,	1800:11998,	1900:12334,	2000:12671},
		1700 : {1000:9306,	1100:9655,	1200:10010,	1300:10360,	1400:10933,	1500:11282,	1600:11632,	1700:11941,	1800:12347,	1900:12696,	2000:13046},
		1800 : {1000:9591,	1100:9954,	1200:10322,	1300:10684,	1400:11270,	1500:11632,	1600:11996,	1700:12317,	1800:12736,	1900:13099,	2000:13461},
		1900 : {1000:9837,	1100:10212,	1200:10593,	1300:10968,	1400:11567,	1500:11942,	1600:12319,	1700:12653,	1800:13085,	1900:13461,	2000:13836},
		2000 : {1000:10081,	1100:10469,	1200:10863,	1300:11252,	1400:11864,	1500:12251,	1600:12641,	1700:12989,	1800:13433,	1900:13822,	2000:14210},
		2100 : {1000:10325,	1100:10727,	1200:11133,	1300:11535,	1400:12160,	1500:12561,	1600:12963,	1700:13324,	1800:13781,	1900:14183,	2000:14584},
		2200 : {1000:10596,	1100:11010,	1200:11430,	1300:11845,	1400:12482,	1500:12896,	1600:13312,	1700:13686,	1800:14156,	1900:14571,	2000:14985},
		2300 : {1000:10840,	1100:11268,	1200:11700,	1300:12128,	1400:12779,	1500:13205,	1600:13634,	1700:14021,	1800:14504,	1900:14932,	2000:15359},
		2400 : {1000:11195,	1100:11635,	1200:12081,	1300:12521,	1400:13185,	1500:13625,	1600:14066,	1700:14466,	1800:14962,	1900:15403,	2000:15843},
		2500 : {1000:11521,	1100:11974,	1200:12432,	1300:12886,	1400:13563,	1500:14015,	1600:14470,	1700:14883,	1800:15392,	1900:15846,	2000:16299},
		2600 : {1000:11766,	1100:12232,	1200:12703,	1300:13170,	1400:13860,	1500:14325,	1600:14793,	1700:15218,	1800:15741,	1900:16208,	2000:16674},
		2700 : {1000:12010,	1100:12489,	1200:12974,	1300:13453,	1400:14156,	1500:14634,	1600:15115,	1700:15554,	1800:16089,	1900:16569,	2000:17048},
		2800 : {1000:12260,	1100:12752,	1200:13250,	1300:13742,	1400:14458,	1500:14949,	1600:15443,	1700:15895,	1800:16443,	1900:16935,	2000:17428},
		2900 : {1000:12504,	1100:13010,	1200:13520,	1300:14026,	1400:14754,	1500:15259,	1600:15766,	1700:16230,	1800:16791,	1900:17297,	2000:17802},
		3000 : {1000:12853,	1100:13371,	1200:13895,	1300:14413,	1400:15155,	1500:15672,	1600:16192,	1700:16669,	1800:17244,	1900:17762,	2000:18280}
	},
	'69-3' : {
		1600 : {1500:14548,	1600:14967,	1700:15386,	1800:15810,	1900:16229,	2000:16648,	2100:17618,	2200:18037,	2300:18456,	2400:18877,	2500:19296,	2600:19592,	2700:20065,	2800:20484,	2900:20903,	3000:21324},
		1700 : {1500:14990,	1600:15423,	1700:15857,	1800:16296,	1900:16729,	2000:17163,	2100:18147,	2200:18580,	2300:19014,	2400:19449,	2500:19883,	2600:20194,	2700:20682,	2800:21115,	2900:21548,	3000:21984},
		1800 : {1500:15468,	1600:15916,	1700:16364,	1800:16818,	1900:17265,	2000:17713,	2100:18712,	2200:19160,	2300:19608,	2400:20058,	2500:20506,	2600:20832,	2700:21334,	2800:21782,	2900:22230,	3000:22680},
		1900 : {1500:15910,	1600:16373,	1700:16835,	1800:17303,	1900:17765,	2000:18228,	2100:19241,	2200:19704,	2300:20166,	2400:20631,	2500:21093,	2600:21433,	2700:21950,	2800:22412,	2900:22875,	3000:23339},
		2000 : {1500:16352,	1600:16829,	1700:17306,	1800:17789,	1900:18265,	2000:18742,	2100:19770,	2200:20247,	2300:20724,	2400:21203,	2500:21680,	2600:22035,	2700:22566,	2800:23043,	2900:23520,	3000:23999},
		2100 : {1500:16794,	1600:17285,	1700:17777,	1800:18274,	1900:18765,	2000:19257,	2100:20299,	2200:20791,	2300:21282,	2400:21776,	2500:22267,	2600:22636,	2700:23182,	2800:23673,	2900:24165,	3000:24658},
		2200 : {1500:17256,	1600:17762,	1700:18268,	1800:18779,	1900:19285,	2000:19791,	2100:20848,	2200:21354,	2300:21860,	2400:22368,	2500:22874,	2600:23258,	2700:23818,	2800:24324,	2900:24830,	3000:25338},
		2300 : {1500:17698,	1600:18218,	1700:18739,	1800:19265,	1900:19785,	2000:20306,	2100:21377,	2200:21898,	2300:22418,	2400:22941,	2500:23461,	2600:23859,	2700:24434,	2800:24954,	2900:25475,	3000:25997},
		2400 : {1500:18360,	1600:18895,	1700:19430,	1800:19971,	1900:20505,	2000:21040,	2100:22127,	2200:22661,	2300:23196,	2400:23733,	2500:24268,	2600:24681,	2700:25270,	2800:25805,	2900:26340,	3000:26877},
		2500 : {1500:18877,	1600:19427,	1700:19976,	1800:20531,	1900:21081,	2000:21630,	2100:22731,	2200:23280,	2300:23830,	2400:24381,	2500:24931,	2600:25358,	2700:25962,	2800:26511,	2900:27060,	3000:27612},
		2600 : {1500:19319,	1600:19883,	1700:20447,	1800:21017,	1900:21581,	2000:22145,	2100:23260,	2200:23824,	2300:24388,	2400:24954,	2500:25518,	2600:25959,	2700:26578,	2800:27141,	2900:27705,	3000:28272},
		2700 : {1500:19837,	1600:20416,	1700:20994,	1800:21578,	1900:22157,	2000:22735,	2100:23865,	2200:24443,	2300:25022,	2400:25602,	2500:26181,	2600:26637,	2700:27270,	2800:27848,	2900:28427,	3000:29007},
		2800 : {1500:20279,	1600:20872,	1700:21465,	1800:22064,	1900:22657,	2000:23250,	2100:24394,	2200:24987,	2300:25580,	2400:26175,	2500:26768,	2600:27239,	2700:27886,	2800:28479,	2900:29072,	3000:29667},
		2900 : {1500:20721,	1600:21329,	1700:21936,	1800:22549,	1900:23157,	2000:23764,	2100:24923,	2200:25530,	2300:26138,	2400:26747,	2500:27355,	2600:27840,	2700:28502,	2800:29109,	2900:29717,	3000:30326},
		3000 : {1500:21372,	1600:21994,	1700:22616,	1800:23243,	1900:23865,	2000:24487,	2100:25660,	2200:26282,	2300:26904,	2400:27529,	2500:28150,	2600:28650,	2700:29326,	2800:29948,	2900:30570,	3000:31194}
	}
},

// Описания для слоёв (не из Excel)
sandwichLayersDescriptions : {
	'4 Top N+'		: 'Энергосберегающее стекло Top N+<sup>®</sup>',
	'6 Top N+'		: 'Энергосберегающее стекло Top N+<sup>®</sup>',
	'33.2 Stratophone Top N+'		: 'Шумоизолирующее, энергосберегающее стекло Stratophone<sup>®</sup> Top N+<sup>®</sup>',
	'6 Stopray Neo'		: 'Солнцезащитное стекло Stopray Neo<sup>®</sup>',
	'4 Stopray Neo'		: 'Солнцезащитное стекло Stopray Neo<sup>®</sup>',
	'33.2 Stratophone'		: 'Шумоизолирующее стекло Stratophone<sup>®</sup>',
	'33.2 Stratophone Stopray Neo'		: 'Шумоизолирующее и солнцезащитное стекло Stratophone<sup>®</sup> Stopray Neo<sup>®</sup>',
	'34.4'		: 'Ударопрочное стекло Stratobel<sup>®</sup>',
	'33.2'		: 'Ударопрочное стекло Stratobel<sup>®</sup>',
	'33.2 Top N+'		: 'Ударопрочное и энергосберегающее стекло Stratobel<sup>®</sup> Top N+<sup>®</sup>',
	'34.4 Top N+'		: 'Ударопрочное и энергосберегающее стекло Stratobel<sup>®</sup> Top N+<sup>®</sup>',
	'33.2 Stopray Neo'		: 'Ударопрочное и солнцезащитное стекло Stratobel<sup>®</sup> Stopray Neo<sup>®</sup>',
	'43.4 Stopray Neo'		: 'Ударопрочное и солнцезащитное стекло Stratobel<sup>®</sup> Stopray Neo<sup>®</sup>',
	'6'		: 'Planibel<sup>®</sup> 6 мм',
	'4'		: 'Planibel<sup>®</sup> 4 мм',
	'12'		: 'Дистанционная рамка 12 мм, заполнение аргоном',
	'14'		: 'Дистанционная рамка 14 мм, заполнение аргоном',
	'16'		: 'Дистанционная рамка 16 мм, заполнение аргоном',
	'18'		: 'Дистанционная рамка 18 мм, заполнение аргоном'
},


// Свойства матриц
matrixProps : {
	11: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0},
	12: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	13: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	14: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	15: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	16: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	17: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	18: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	19: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	110: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	111: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	112: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':1},
	21: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0},
	22: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	23: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	24: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	25: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	26: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	27: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	28: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	29: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	210: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	211: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	212: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	213: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	214: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.5},
	31: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0},
	32: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	33: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	34: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	35: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	36: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	37: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	38: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	39: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	310: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	311: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	41: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	42: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	43: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	44: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	45: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	46: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	47: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	48: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	49: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	410: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	411: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	412: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	413: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	414: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	51: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0.33},
	52: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0},
	53: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0},
	54: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0.2},
	55: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0.2},
	56: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0.2},
	57: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0.2},
	58: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0.2},
	59: {'sglasscoefficientbaseh':0.66,		'smncoefficientbaseh':0.2},
	510: {'sglasscoefficientbaseh':0.66,	'smncoefficientbaseh':0.2},
	61: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	62: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	63: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	64: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	65: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	66: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	67: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	68: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33},
	69: {'sglasscoefficientbaseh':1,		'smncoefficientbaseh':0.33}
},


// Описание всех пакетов
allPkgs : {
	'TWIG-1114'	: {fullPrice : 10063,	glassPrice : 1312,	profileId : 1,	composition : '6 - 16 Ar - 34.4 Top N+',	texts : {desc	: '<p>Однокамерный стеклопакет со стеклом <em>Stratobel&reg;</em>, с несколькими слоями защитной пленки, соответствует высоким стандартам безопасности. А молекулярное покрытие <em>Top N+&reg;</em> обеспечивает эффективную теплоизоляцию, надежно удерживая тепло внутри дома.</p>',		tech	: '<p>Формула: 6 - 16 Ar - 34.4 Top N+<br/><br/>Энергосбережение: 0,6<br>Солнцезащита: -58<br>Шумоизоляция: 34<br>Безопасность: A<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-security\">Требуется максимальная безопасность дома снаружи и изнутри.</li>  <li class=\"i-warm\">Бывает холодно зимой, используются обогреватели.</li>  <li class=\"i-sun\">Солнечная сторона, бывает жарко.</li>  <li class=\"i-noise\">Иногда беспокоит шум за окном.</li>  </ul>'}},
	'TWIG-1314'	: {fullPrice : 10377,	glassPrice : 1626,	profileId : 1,	composition : '6 Stopray Neo - 16 Ar - 34.4',	texts : {desc	: '<p>Однокамерный стеклопакет, изготовленный по технологии <em>Stratobel&reg;</em>, с двумя слоями защитной пленки, включает в себя стекло с магнетронным покрытием <em>Stopray Neo&reg;</em>. Это сочетание стекол обеспечивает максимальный уровень безопасности, надежно сохраняя тепло и прохладу в доме</p>',		tech	: '<p>Формула: 6 Stopray Neo - 16 Ar - 34.4<br/><br/>Энергосбережение: 0,6<br>Солнцезащита: -40<br>Шумоизоляция: 34<br>Безопасность: A<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-security\">Требуется максимальная безопасность дома снаружи и изнутри.</li>  <li class=\"i-sun\">Солнце бьет в окна, рабочее место напротив окна, приходится использовать жалюзи и шторы.</li>  <li class=\"i-warm\">Бывает холодно зимой, используются обогреватели.</li>  <li class=\"i-noise\">Иногда беспокоит шум за окном.</li>  </ul>'}},
	'TWIG-1143'	: {fullPrice : 11225,	glassPrice : 2474,	profileId : 2,	composition : '33.2 Stratophone  - 12 Ar - 4 - 12 Ar - 33.2 Stratophone',	texts : {desc	: '<p>Шумозащитный двухкамерный стеклопакет включает в себя два стекла <em>Sratophone&reg;</em>, с несколькими слоями звукоизолирующей пленки. Максимальная шумоизоляция сочетается с надежной защитой дома снаружи и изнутри и эффективной теплоизоляцией.</p>',		tech	: '<p>Формула: 33.2 Stratophone  - 12 Ar - 4 - 12 Ar - 33.2 Stratophone<br/><br/>Энергосбережение: 0,55<br>Солнцезащита: -62<br>Шумоизоляция: 42<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-noise\">Необходим максимальный уровень шумозащиты.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, используются обогреватели.</li>  <li class=\"i-sun\">Солнечная сторона, бывает жарко.</li>  </ul>'}},
	'TWIG-1333'	: {fullPrice : 10097,	glassPrice : 1346,	profileId : 1,	composition : '4 Stopray Neo- 14 Ar - 33.2 Stratophone',	texts : {desc	: '<p>Специальная пленка <em>Stratophone&reg;</em> и магнетронное покрытие <em>Stopray Neo&reg;</em> воднокамерном стеклопакете дают уникальное сочетание всех четырех составляющих комфорта: теплозащиты, солнцезащиты, шумоизоляции и безопасности.</p>',		tech	: '<p>Формула: 4 Stopray Neo- 14 Ar - 33.2 Stratophone<br/><br/>Энергосбережение: 0,65<br>Солнцезащита: -41<br>Шумоизоляция: 37<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Солнце бьет в окна, рабочее место напротив окна, приходится использовать жалюзи и шторы.</li>  <li class=\"i-noise\">За окном шумно: автострада, стройка, кафе.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, используются обогреватели.</li>  </ul>'}},
	'TWIG-1111'	: {fullPrice : 8895,	glassPrice : 143,	profileId : 1,	composition : '6 - 14 Ar - 4 Top N+',	texts : {desc	: '<p>Однокамерный стеклопакет со специальным низкоэмиссионным стеклом <em>Top N+&reg;</em> и заполнением инертным газом. Обеспечивает эффективную теплоизоляцию, надежно удерживая тепло внутри дома.</p>',		tech	: '<p>Формула: 6 - 14 Ar - 4 Top N+<br/><br/>Энергосбережение: 0,65<br>Солнцезащита: -59<br>Шумоизоляция: 34<br>Безопасность: D<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">Бывает холодно зимой, используются обогреватели.</li>  <li class=\"i-sun\">Солнечная сторона, бывает жарко.</li>  <li class=\"i-noise\">Иногда беспокоит шум за окном.</li>  <li class=\"i-security\">Базовые требования к безопасности.</li>  </ul>'}},
	'TWIG-1311'	: {fullPrice : 9254,	glassPrice : 502,	profileId : 1,	composition : '6 Stopray Neo - 14 Ar - 4',	texts : {desc	: '<p>Благодаря специальному прозрачному покрытию <em>Stopray Neo&reg;</em> этот однокамерный стеклопакет эффективно задерживает невидимое солнечное излучение, не допуская нагревания помещения солнечными лучами и позволяя поддерживать комфортную температуру в любое время года.</p>',		tech	: '<p>Формула: 6 Stopray Neo - 14 Ar - 4<br/><br/>Энергосбережение: 0,65<br>Солнцезащита: -41<br>Шумоизоляция: 34<br>Безопасность: D<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Солнце бьет в окна, рабочее место напротив окна, приходится использовать жалюзи и шторы.</li>  <li class=\"i-warm\">Бывает холодно зимой, используются обогреватели.</li>  <li class=\"i-noise\">Иногда беспокоит шум за окном.</li>  <li class=\"i-security\">Базовые требования к безопасности.</li>  </ul>'}},
	'TWIG-2123'	: {fullPrice : 9514,	glassPrice : 763,	profileId : 1,	composition : '6 - 18 Ar - 33.2 Top N+',	texts : {desc	: '<p>Благодаря специальному прозрачному покрытию <em>Top N+&reg;</em> однокамерный стеклопакет обеспечивает эффективную теплоизоляцию окна, надежно удерживая тепло внутри дома. Использование изготовленного по технологии <em>Stratobel&reg;</em> стекла, из нескольких слоев стекла и пленки, обеспечивает высокий уровень безопасности, а увеличенное межстекольное расстояние повышает теплоизолирующие свойства.</p>',		tech	: '<p>Формула: 6 - 18 Ar - 33.2 Top N+<br/><br/>Энергосбережение: 0,68<br>Солнцезащита: -60<br>Шумоизоляция: 35<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, активно используются обогреватели, большая площадь остекления.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  <li class=\"i-sun\">Солнечная сторона, бывает жарко.</li>  </ul>'}},
	'TWIG-2133'	: {fullPrice : 10112,	glassPrice : 1361,	profileId : 1,	composition : '6 - 18 Ar - 33.2 Stratophone Top N+',	texts : {desc	: '<p>Комбинация в однокамерном стеклопакете технологии <em>Stratophone&reg;</em>, заключающейся в соединении нескольких слоев стекла и звукоизолирующей пленки, и покрытия <em>Top N+&reg;</em> с высокими теплоизолирующими характеристиками обеспечивает прекрасные шумозащитные свойства и высокий уровень безопасности, а также надежно удерживает тепло в доме.</p>',		tech	: '<p>Формула: 6 - 18 Ar - 33.2 Stratophone Top N+<br/><br/>Энергосбережение: 0,68<br>Солнцезащита: -58<br>Шумоизоляция: 38<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-noise\">За окном шумно: автострада, стройка, кафе.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, активно используются обогреватели, большая площадь остекления.</li>  <li class=\"i-sun\">Солнечная сторона, бывает жарко.</li>  </ul>'}},
	'TWIG-2243'	: {fullPrice : 11139,	glassPrice : 2388,	profileId : 1,	composition : '33.2 Stratophone - 18 Ar - 33.2 Stratophone Top N+',	texts : {desc	: '<p>Два изготовленных по технологии <em>Stratophone&reg;</em> стекла, с соединением нескольких слоев стекла и звукоизолирующей пленки в однокамерном стеклопакете, обеспечивают максимальную шумоизоляцию и высокий уровень безопасности, а специальное покрытие <em>Top N+&reg;</em> с эффективной теплоизоляцией и увеличенным межстекольным расстоянием надежно удерживает тепло внутри дома.</p>',		tech	: '<p>Формула: 33.2 Stratophone - 18 Ar - 33.2 Stratophone Top N+<br/><br/>Энергосбережение: 0,68<br>Солнцезащита: -55<br>Шумоизоляция: 42<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-noise\">Необходим максимальный уровень шумозащиты.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, активно используются обогреватели, большая площадь остекления.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  </ul>'}},
	'TWIG-2313'	: {fullPrice : 9771,	glassPrice : 1020,	profileId : 1,	composition : '6 Stopray Neo - 18 Ar - 33.2',	texts : {desc	: '<p>Благодаря комбинации технологии <em>Stratobel&reg;</em>, т. е. соединения нескольких слоев стекла и пленки, и специального покрытия <em>Stopray Neo&reg;</em>, задерживающего инфракрасное и ультрафиолетовое излучение солнца, однокамерный стеклопакет с увеличенным межстекольным расстоянием обеспечивает окну высокий уровень безопасности и помогает поддерживать температурный комфорт в любое время года.</p>',		tech	: '<p>Формула: 6 Stopray Neo - 18 Ar - 33.2<br/><br/>Энергосбережение: 0,68<br>Солнцезащита: -40<br>Шумоизоляция: 34<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Солнце бьет в окна, рабочее место напротив окна, приходится использовать жалюзи и шторы.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, активно используются обогреватели, большая площадь остекления.</li>  <li class=\"i-noise\">Иногда беспокоит шум за окном.</li>  </ul>'}},
	'TWIG-2333'	: {fullPrice : 10265,	glassPrice : 1514,	profileId : 1,	composition : '6 Stopray Neo - 18 Ar - 33.2 Stratophone',	texts : {desc	: '<p>Комбинация в однокамерном стеклопакете TWIG технологии <em>Stratophone&reg;</em>, при которой соединяются несколько слоев стекла и звукоизолирующей пленки, и покрытия <em>Stopray Neo&reg;</em> с высокими теплоизолирующими характеристиками обеспечивает прекрасные шумопоглощающие свойства, придает окну высокий уровень безопасности и помогает поддерживать температурный комфорт в любое время года.</p>',		tech	: '<p>Формула: 6 Stopray Neo - 18 Ar - 33.2 Stratophone<br/><br/>Энергосбережение: 0,68<br>Солнцезащита: -40<br>Шумоизоляция: 38<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Солнце бьет в окна, рабочее место напротив окна, приходится использовать жалюзи и шторы.</li>  <li class=\"i-noise\">За окном шумно: автострада, стройка, кафе.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, активно используются обогреватели, большая площадь остекления.</li>  </ul>'}},
	'TWIG-2443'	: {fullPrice : 10661,	glassPrice : 1909,	profileId : 1,	composition : '33.2 Stratophone Stopray Neo - 18 Ar - 33.2 Stratophone',	texts : {desc	: '<p>Удвоенная шумоизоляция, высокий уровень безопасности и максимальная солнцезащита обеспечиваются в окне благодаря использованию изготовленных по технологии <em>Stratophone&reg;</em> стекол &ndash; с внешней и внутренней сторон двухкамерного стеклопакета, а также инновационному покрытию <em>Stopray Neo&reg;</em>, которое задерживает инфракрасное излучение солнца и не допускает перегрева помещения солнечными лучами.</p>',		tech	: '<p>Формула: 33.2 Stratophone Stopray Neo - 18 Ar - 33.2 Stratophone<br/><br/>Энергосбережение: 0,68<br>Солнцезащита: -39<br>Шумоизоляция: 42<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-noise\">Необходим максимальный уровень шумозащиты.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-warm\">Бывает холодно зимой, активно используются обогреватели, большая площадь остекления.</li>  </ul>'}},
	'TWIG-3224'	: {fullPrice : 10184,	glassPrice : 1433,	profileId : 2,	composition : '34.4 - 12 Ar - 4 - 14 Ar - 4 Top N+',	texts : {desc	: '<p>Двухкамерный стеклопакет с межстекольными промежутками разной толщины, с изготовленным по технологии <em>Stratobel&reg;</em> усиленным стеклом из нескольких слоев стекла и пленки, с применением специального покрытия <em>Top N+&reg;</em>, обладает очень высокими теплоизоляционными свойствами, обеспечивает хорошую шумоизоляцию и максимальную безопасность.</p>',		tech	: '<p>Формула: 34.4 - 12 Ar - 4 - 14 Ar - 4 Top N+<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -49<br>Шумоизоляция: 36<br>Безопасность: A<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-security\">Требуется максимальная безопасность дома снаружи и изнутри.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  </ul>'}},
	'TWIG-3424'	: {fullPrice : 10125,	glassPrice : 1374,	profileId : 2,	composition : '43.4 Stopray Neo - 14 Ar - 4 - 12 Ar - 4',	texts : {desc	: '<p>Благодаря комбинации технологии <em>Stratobel&reg;</em>, с соединением нескольких слоев стекла и пленки двойной толщины, и специального покрытия <em>Stopray Neo&reg;</em>, не допускающего перегревания комнаты солнечными лучами, окно обеспечивает высочайший уровень солнцезащиты и безопасности, а двойной стеклопакет с камерами разной толщины обладает шумозащитными и теплоизолирующими свойствами.</p>',		tech	: '<p>Формула: 43.4 Stopray Neo - 14 Ar - 4 - 12 Ar - 4<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -35<br>Шумоизоляция: 36<br>Безопасность: A<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-security\">Требуется максимальная безопасность дома снаружи и изнутри.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  </ul>'}},
	'TWIG-3233'	: {fullPrice : 10298,	glassPrice : 1546,	profileId : 2,	composition : '4  - 12 Ar - 4 - 14 Ar - 33.2 Stratophone Top N+',	texts : {desc	: '<p>Благодаря технологии <em>Stratophone&reg;</em>, с комбинацией нескольких слоев стекла и звукоизолирующей пленки, это окно с двухкамерным стеклопакетом обладает высоким уровнем шумоизоляции и безопасности, а специальное покрытие <em>Top N+&reg;</em> надежно удерживает тепло внутри дома.</p>',		tech	: '<p>Формула: 4  - 12 Ar - 4 - 14 Ar - 33.2 Stratophone Top N+<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -55<br>Шумоизоляция: 37<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-noise\">За окном шумно: автострада, стройка, кафе.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  </ul>'}},
	'TWIG-3243'	: {fullPrice : 11410,	glassPrice : 2658,	profileId : 2,	composition : '33.2 Stratophone  - 12 Ar - 4 - 12 Ar - 33.2 Stratophone Top N+',	texts : {desc	: '<p>Удвоенная шумоизоляция и высокий уровень безопасности достигается благодаря использованию изготовленных по технологии Stratophone&reg; стекол &ndash; с внешней и внутренней сторон двухкамерного стеклопакета, а специальное покрытие Top N+&reg; обеспечивает эффективную теплоизоляцию, надежно удерживая тепло внутри дома.</p>',		tech	: '<p>Формула: 33.2 Stratophone  - 12 Ar - 4 - 12 Ar - 33.2 Stratophone Top N+<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -50<br>Шумоизоляция: 42<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-noise\">Необходим максимальный уровень шумозащиты.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  </ul>'}},
	'TWIG-3323'	: {fullPrice : 9503,	glassPrice : 752,	profileId : 1,	composition : '4 Stopray Neo- 14 Ar - 33.2',	texts : {desc	: '<p>Благодаря комбинации технологии <em>Stratobel&reg;</em>, с соединением нескольких слоев стекла и пленки, и специального покрытия <em>Stopray Neo&reg;</em>, не допускающего перегревания комнаты солнечными лучами, окно с однокамерным стеклопакетом обеспечивает высокий уровень безопасности, теплоизоляции и помогает поддерживать температурный комфорт в любое время года.</p>',		tech	: '<p>Формула: 4 Stopray Neo- 14 Ar - 33.2<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -41<br>Шумоизоляция: 35<br>Безопасность: B<br>Профиль: Класс А, 3 камеры, ширина 58 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-noise\">За окном шумно: автострада, стройка, кафе.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  </ul>'}},
	'TWIG-3433'	: {fullPrice : 10368,	glassPrice : 1616,	profileId : 2,	composition : '4 Stopray Neo - 14 Ar - 4 - 12 Ar - 33.2 Stratophone',	texts : {desc	: '<p>Благодаря технологии <em>Stratophone&reg;</em>, с комбинацией нескольких слоев стекла и пленки, это окно с двойным стеклопакетом обладает высоким уровнем шумоизоляции, теплоизоляции и безопасности, а специальное покрытие <em>Stopray Neo&reg;</em> задерживает инфракрасное излучение солнца и не допускает перегревания помещения, хорошо пропуская при этом видимый свет.</p>',		tech	: '<p>Формула: 4 Stopray Neo - 14 Ar - 4 - 12 Ar - 33.2 Stratophone<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -38<br>Шумоизоляция: 37<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-noise\">За окном шумно: автострада, стройка, кафе.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  </ul>'}},
	'TWIG-3443'	: {fullPrice : 11425,	glassPrice : 2674,	profileId : 2,	composition : '33.2 Stratophone Stopray Neo - 12 Ar - 4 - 12 Ar - 33.2 Stratophone',	texts : {desc	: '<p>Элитный стеклопакет. Удвоенная шумоизоляция и высокий уровень безопасности достигаются благодаря использованию изготовленных по технологии <em>Stratophone&reg;</em> стекол &ndash; с внешней и внутренней сторон двухкамерного стеклопакета, а специальное покрытие Stopray Neo&reg; задерживает инфракрасное излучение солнца и не допускает нагревания помещения.</p>',		tech	: '<p>Формула: 33.2 Stratophone Stopray Neo - 12 Ar - 4 - 12 Ar - 33.2 Stratophone<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -36<br>Шумоизоляция: 42<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-noise\">Необходим максимальный уровень шумозащиты.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  </ul>'}},
	'TWIG-3222'	: {fullPrice : 9578,	glassPrice : 827,	profileId : 2,	composition : '33.2 - 12 Ar - 4 - 14 Ar - 4 Top N+',	texts : {desc	: '<p>Двухкамерный стеклопакет с комбинацией технологии <em>Stratobel&reg;</em>, обеспечивающей соединение несколько слоев стекла и пленки, со специальным покрытием <em>Top N+&reg;</em> обладает очень высокими теплоизоляционными свойствами и гарантирует безопасность и шумоизоляцию.</p>',		tech	: '<p>Формула: 33.2 - 12 Ar - 4 - 14 Ar - 4 Top N+<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -50<br>Шумоизоляция: 36<br>Безопасность: C<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  <li class=\"i-security\">Окна на первом и верхних этажах: повышенная безопасность.</li>  </ul>'}},
	'TWIG-3422'	: {fullPrice : 9944,	glassPrice : 1193,	profileId : 2,	composition : '33.2 Stopray Neo - 14 Ar - 4 - 12 Ar - 4',	texts : {desc	: '<p>Благодаря комбинации технологии <em>Stratobel&reg;</em>, с соединением нескольких слоев стекла и пленки, и специального покрытия <em>Stopray Neo&reg;</em>, не допускающего перегревания помещения солнечными лучами, окно обеспечивает хороший уровень безопасности, звукоизоляции и позволяет поддерживать температурный комфорт, а двойной стеклопакет с камерами разной толщины великолепно удерживает тепло внутри дома.</p>',		tech	: '<p>Формула: 33.2 Stopray Neo - 14 Ar - 4 - 12 Ar - 4<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -36<br>Шумоизоляция: 36<br>Безопасность: C<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  <li class=\"i-security\">Окна на первом и верхних этажах: повышенная безопасность.</li>  </ul>'}},
	'TWIG-3411'	: {fullPrice : 9256,	glassPrice : 504,	profileId : 2,	composition : '4 Stopray Neo - 14 Ar - 4 - 14 Ar - 4',	texts : {desc	: '<p>В двухкамерном стеклопакете используется стекло со специальным прозрачным покрытием <em>Stopray Neo&reg;</em>, благодаря которому окно задерживает излучение солнца и не допускает перегревания помещения, пропуская при этом видимый свет. Окно также обладает высокими теплоизолирующими свойствами</p>',		tech	: '<p>Формула: 4 Stopray Neo - 14 Ar - 4 - 14 Ar - 4<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -38<br>Шумоизоляция: 32<br>Безопасность: D<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-noise\">Иногда беспокоит шум за окном.</li>  <li class=\"i-security\">Базовые требования к безопасности.</li>  </ul>'}},
	'TWIG-3421'	: {fullPrice : 9424,	glassPrice : 673,	profileId : 2,	composition : '6 Stopray Neo - 12 Ar - 4 - 14 Ar - 4',	texts : {desc	: '<p>В двухкамерном стеклопакете используется утолщенное стекло со специальным прозрачным покрытием <em>Stopray Neo&reg;</em>, благодаря которому окно задерживает излучение солнца и не допускает перегревания помещения, пропуская при этом видимый свет. Окно также обладает высокими теплоизолирующими свойствами</p>',		tech	: '<p>Формула: 6 Stopray Neo - 12 Ar - 4 - 14 Ar - 4<br/><br/>Энергосбережение: 0,76<br>Солнцезащита: -37<br>Шумоизоляция: 36<br>Безопасность: D<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-warm\">Холодные комнаты, высокие расходы на отопление, панорамное остекление.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  <li class=\"i-security\">Базовые требования к безопасности.</li>  </ul>'}},
	'TWIG-4243'	: {fullPrice : 11594,	glassPrice : 2842,	profileId : 2,	composition : '33.2 Stratophone Top N+ - 14 Ar - 4 - 12 Ar - 33.2 Stratophone Top N+',	texts : {desc	: '<p>Элитный стеклопакет. Удвоенная шумоизоляция и высокий уровень безопасности достигаются благодаря использованию изготовленных по технологии <em>Stratophone&reg;</em> стекол, с внешней и внутренней сторон. Эффект специального покрытия <em>Top N+&reg;</em> обеспечивает максимальную теплоизоляцию, а двухкамерный стеклопакет с камерами разной толщины гарантирует солнцезащиту.</p>',		tech	: '<p>Формула: 33.2 Stratophone Top N+ - 14 Ar - 4 - 12 Ar - 33.2 Stratophone Top N+<br/><br/>Энергосбережение: 1,2<br>Солнцезащита: -44<br>Шумоизоляция: 42<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">В доме холодно, требуется максимальная теплоизоляция.</li>  <li class=\"i-noise\">Необходим максимальный уровень шумозащиты.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  </ul>'}},
	'TWIG-4423'	: {fullPrice : 9954,	glassPrice : 1203,	profileId : 2,	composition : '4 Stopray Neo - 12 Ar - 4 - 14 Ar - 33.2 Top N+',	texts : {desc	: '<p>Благодаря технологии <em>Stratobel&reg;</em>, с комбинацией нескольких слоев стекла и пленки, это окно с двухкамерным стеклопакетом обладает высоким уровнем безопасности. Специальные покрытия Stopray <em>Neo&reg;</em> и <em>Top N+&reg;</em> обеспечивают максимальную теплоизоляцию и солнцезащиту.</p>',		tech	: '<p>Формула: 4 Stopray Neo - 12 Ar - 4 - 14 Ar - 33.2 Top N+<br/><br/>Энергосбережение: 1,2<br>Солнцезащита: -36<br>Шумоизоляция: 36<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">В доме холодно, требуется максимальная теплоизоляция.</li>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  </ul>'}},
	'TWIG-4433'	: {fullPrice : 10552,	glassPrice : 1801,	profileId : 3,	composition : '4 Stopray Neo - 14 Ar - 4 - 14 Ar - 33.2 Stratophone Top N+ ',	texts : {desc	: '<p>Элитный стеклопакет. Благодаря технологии <em>Stratophone&reg;</em>, с комбинацией нескольких слоев стекла и звукоизолирующей пленки, это окно с двухкамерным стеклопакетом обладает высоким уровнем шумоизоляции и безопасности. Специальное покрытие <em>Stopray Neo&reg;</em> не допускает нагревания помещения, а низкоэмиссионное покрытие Top N+&reg; обеспечивает отличную теплоизоляцию.</p>',		tech	: '<p>Формула: 4 Stopray Neo - 14 Ar - 4 - 14 Ar - 33.2 Stratophone Top N+ <br/><br/>Энергосбережение: 1,21<br>Солнцезащита: -36<br>Шумоизоляция: 37<br>Безопасность: B<br>Профиль: Класс А, 5 камер, ширина 88 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">В доме холодно, требуется максимальная теплоизоляция.</li>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-noise\">За окном шумно: автострада, стройка, кафе.</li>  <li class=\"i-security\">Окна на первом и верхних этажах, низкие подоконники, балконные двери, в семье дети: двойная безопасность.</li>  </ul>'}},
	'TWIG-4211'	: {fullPrice : 9119,	glassPrice : 368,	profileId : 2,	composition : '4 Top N+ - 14 Ar - 4 - 14 Ar - 4 Top N+',	texts : {desc	: '<p>Применение двух стёкол с низкоэмиссионным покрытием <em>Top N+&reg;</em> в двухкамерном стеклопакете обеспечивает максимальную теплоизоляцию в соответствии с европейскими стандартами энергосбережения.</p>',		tech	: '<p>Формула: 4 Top N+ - 14 Ar - 4 - 14 Ar - 4 Top N+<br/><br/>Энергосбережение: 1,21<br>Солнцезащита: -47<br>Шумоизоляция: 32<br>Безопасность: D<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">В доме холодно, требуется максимальная теплоизоляция.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  <li class=\"i-noise\">Иногда беспокоит шум за окном.</li>  <li class=\"i-security\">Базовые требования к безопасности.</li>  </ul>'}},
	'TWIG-4221'	: {fullPrice : 9104,	glassPrice : 353,	profileId : 2,	composition : '6 Top N+ - 12 Ar - 4 - 14 Ar - 4 Top N+',	texts : {desc	: '<p>Применение двух стёкол с низкоэмиссионным покрытием <em>Top N+&reg;</em> в двухкамерном стеклопакете обеспечивает максимальную теплоизоляцию в соответствии с европейскими стандартами энергосбережения. Утолщенные стекла и камеры разной толщины обеспечивают звукоизоляцию и солнцезащиту</p>',		tech	: '<p>Формула: 6 Top N+ - 12 Ar - 4 - 14 Ar - 4 Top N+<br/><br/>Энергосбережение: 1,2<br>Солнцезащита: -46<br>Шумоизоляция: 36<br>Безопасность: D<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">В доме холодно, требуется максимальная теплоизоляция.</li>  <li class=\"i-sun\">Солнечная сторона, жарко, летом активно используются кондиционеры.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  <li class=\"i-security\">Базовые требования к безопасности.</li>  </ul>'}},
	'TWIG-4421'	: {fullPrice : 9483,	glassPrice : 732,	profileId : 2,	composition : '6 Stopray Neo - 12 Ar - 4 - 14 Ar - 4 Top N+',	texts : {desc	: '<p>Благодаря комбинации специального покрытия <em>Stopray Neo&reg;</em>, не допускающего нагревания помещения солнечными лучами, и специального покрытия <em>Top N+&reg;</em>, обладающего прекрасными теплоизоляционными свойствами, это окно с двухкамерным стеклопакетом и камерами разной толщины обеспечивает повышенный уровень звукоизоляции и отлично поддерживает температурный комфорт.</p>',		tech	: '<p>Формула: 6 Stopray Neo - 12 Ar - 4 - 14 Ar - 4 Top N+<br/><br/>Энергосбережение: 1,2<br>Солнцезащита: -35<br>Шумоизоляция: 36<br>Безопасность: D<br>Профиль: Класс А, 5 камер, ширина 70 мм<br>Заполнение: инертный газ Аргон, 90%</p>',		usage	: '<p>Окно наиболее удачно подходит, когда:</p>  <ul>  <li class=\"i-warm\">В доме холодно, требуется максимальная теплоизоляция.</li>  <li class=\"i-sun\">Нужна максимальная солнцезащита.</li>  <li class=\"i-noise\">В спальнях, детских комнатах из-за шума бывает трудно заснуть.</li>  <li class=\"i-security\">Базовые требования к безопасности.</li>  </ul>'}}
}
};

// =============

/**
 * Калькуляция
 * @example:
 *
 * var calc		= new Calc($('#my-form'), price);
 * var result	= calc.recalc();
 *
 * console.log(result.pkg);							// Массив описывающий текущий пакет
 * console.log(result.pkg[0]);						// название "TWIG-1413"
 * console.log(result.pkg[1]);						// Строка для сендвича: "6 - 14 - 4 Top N"
 * console.log(result.sandwich);					// Распарсенная строка для сендвича. Это уже массив.
 * console.log(result.matrix.getWidthRange());		// Получает диапазон возможных значения для ползунов с размерами для текущей рамы (для разных типов рамы разные ограничения)
 * console.log(result.matrix.getHeightRange());		// то же самое
 * console.log(result.glassPrice);					// Стоимость кв. метра стекла
 * console.log(result.sumPrice);					// Сумарная стоимость. Может быть null если указаны не допустимые размеры
 *
 *
 * // Есть метод calc.displayResult(result), который выводит результат.
 * // Его можно кастомайзить или использовать свою функцию для отображения результата
 *
 *
 * // На простые элементы я забиндил калькулятор так:
 * $('#my-form').find('input[type="text"]')				.bind('keyup',		function(){ calc.displayResult(calc.recalc()); });
 * $('#my-form').find('input[type="checkbox"], select')	.bind('change',		function(){ calc.displayResult(calc.recalc()); });
 *
 *
 *
 * @param form			Форма
 * @param price			Большой массив из файла /tmp/calc-price/calc-price.js
 * @constructor
 */

Calc = function(form, price) {

	this._form	= $(form);
	this._price	= price;
	this._constructor();

};

Calc.prototype = {

	/**
	 *
	 */
	_form : null

	/**
	 * Справочник с ценами
	 */
	,_price : {}

	/**
	 * Опции
	 */
	,_options : {

		// Селектор описывающий объект в который необходимо вывести результаты.
		selectorGlassPrice		: '.glass-price-result',	// стоимость м2 стекло-пакета
		selectorGlassPkg		: '.glass-pkg-result',		// Название стеклопакета
		selectorSumPrice		: '.sum-price-result'		// Название стеклопакета
	}

	/**
	 * Вместо конструктора
	 */
	,_constructor : function() {

		// Нормализую все названия всех слоёв в справочнике
		var tmp = {};
		for (var i in this._price.sandwichLayersDescriptions) {
			var layerName = this._normalizeLayerName(i);
			tmp[layerName] = this._price.sandwichLayersDescriptions[i];
		}
		this._price.sandwichLayersDescriptions = tmp;

	}


	,recalc : function() {

		var sum					= null;
		var vals				= this.getValues();
		var pkg					= vals.calced.pkg;
		var glassPrice			= pkg.glassPrice;
		//var fullPkgPrice		= pkg.fullPrice;

		try {
			var frameCost	= this._getFrameCost(vals);
			sum			= Math.round(
				this._getGlassCost(vals, glassPrice) +
				this._getInstallCost(vals) +
				this._getInnerSillCost(vals) +
				this._getOuterSillCost(vals) +
				this._getJambHeadCost(vals) +
				this._getColorCost(vals, frameCost) +
				this._getMosquitoNetsCost(vals) +
				frameCost
			);
		} catch (e) {
			if (e.message !== 'Not found matrix position for this sizes') {	// Не моё
				throw e;
			}
			sum = null;
		}

		var result = {
			'pkg'				: pkg
			,'glassPrice'		: glassPrice
			,'fullPkgPrice'		: Math.round(sum / vals.calced.area)
			,'sumPrice'			: sum
			,'matrix'			: vals.calced.matrix
			,sandwich			: this._parseSendwich(pkg[1])
			,needMosquitoNets	: (vals.calced.matrixProps.smncoefficientbaseh > 0)
		};
		result.sandwichLabels = this._getSandwichLabels(result.sandwich);

		pr('calc.recalc() возвращает: ', result);
		return result;

	}

	/**
	 * Собирает всю инфу из формы и возвращает в виде абстрактного массива
	 *
	 */
	,getValues : function(){

		var data = {
			sliders : {
				warm :			parseInt(this._form.find('[name="energy_save"]').val()),
				sun :			parseInt(this._form.find('[name="sun_guard"]').val()),
				noise :			parseInt(this._form.find('[name="sound_isolation"]').val()),
				safety :		parseInt(this._form.find('[name="safety"]').val())
			},
			frame : {
				type :			parseInt(this._form.find('[name="type"]').val()),
				color :			parseInt(this._form.find('[name="laminat"]').val()),
				width :			parseInt(this._form.find('[name="width"]').val()),
				height :		parseInt(this._form.find('[name="height"]').val())
			},
			options : {
				houseType :		this._form.find('[name="house_type"]').val(),
				innserSill :	this._form.find('[name="podokonnik"]').attr('checked')? true : false,
				outerSill :		this._form.find('[name="otliv"]').attr('checked')? true : false,
				jambHead :		this._form.find('[name="otkosy"]').attr('checked')? true : false,
				mosquitoNets :	this._form.find('[name="moskitnaya_setka"]').attr('checked')? true : false
			},
			calced : {}
		};


		data.calced.area = data.frame.width * data.frame.height / 1000000;

		if ( ! data.options.houseType) {
			data.calced.houseType = 'panel';
		} else if (data.options.houseType === 'cottage') {
			data.calced.houseType = 'brick';
		} else {
			data.calced.houseType = data.options.houseType;
		}

		data.calced.house			= this._price.houseTypes[data.calced.houseType];
		data.calced.pkg				= this._getPkg(data);
		data.calced.matrixId		= data.frame.type +'-'+ data.calced.pkg.profileId;
		data.calced.matrix			= new CalcMatrix(this._price.matrixSubTypes[data.calced.matrixId]);
		data.calced.matrixProps		= this._price.matrixProps[data.frame.type];

		pr(data.calced.matrixId, 'Используемая матрица: ');

		return data;

	}



	/**
	 * По справочнику определяет выбранный пакет
	 */
	,_getPkg : function(vals) {

		var pkgId = parseInt(vals.sliders.warm +''+ vals.sliders.sun +''+ vals.sliders.noise +''+ vals.sliders.safety);
		var pkgName = this._price.sliders2glass[pkgId];
		var pkg = this._price.allPkgs[pkgName];
		var tmp = {
			0				: pkgName				// Эти две записи для совместисмости с предыдущей версией скрипта
			,1				: pkg.composition		// Эти две записи для совместисмости с предыдущей версией скрипта
			,fullPrice		: pkg.fullPrice
			,glassPrice		: pkg.glassPrice
			,profileId		: pkg.profileId
			,texts			: pkg.texts
		};
		return tmp;
	}

	/**
	 * Отображает результат
	 */
	,displayResult : function(result) {

		if (this._options.selectorGlassPrice) {
			$(this._options.selectorGlassPrice).text(result.glassPrice);
		}

		if (this._options.selectorGlassPkg) {
			$(this._options.selectorGlassPkg).text(result.pkg[0]);
		}

		if (this._options.selectorSumPrice) {

			if (result.sumPrice === null) {
				result.sumPrice = 'Указаны не допустимые размеры';
			}

			$(this._options.selectorSumPrice).text(result.sumPrice);
		}

	}


	/**
	 * Считает стоимость стёкол
	 */
	,_getGlassCost : function(vals, glassPrice) {
		var cost = vals.calced.area * glassPrice * vals.calced.matrixProps.sglasscoefficientbaseh;
		pr('Стоимость стёкол: ', cost);
		return cost;
	}




	/**
	 * Стоимость установки
	 *
	 */
	,_getInstallCost : function(vals) {
		var installPrice = vals.calced.house.installpricem2;
		var cost = vals.calced.area * installPrice * vals.calced.matrixProps.sglasscoefficientbaseh;
		pr('Стоимость инсталляции: ', cost);
		return cost;

	}

	/**
	 *
	 */
	,_getInnerSillCost : function(vals) {

		var cost;
		if (vals.options.innserSill) {
			cost = (vals.frame.width + vals.calced.house.isaddtionalbase * 1000) / 1000 * vals.calced.house.innersillpricem;
		} else {
			cost = 0;
		}

		pr('Стоимость подоконника: ', cost);
		return cost;

	}

	/**
	 *
	 */
	,_getOuterSillCost : function(vals) {

		var cost;
		if (vals.options.outerSill) {
			cost = (vals.frame.width + vals.calced.house.osadditionalbase * 1000) / 1000 * vals.calced.house.outersillpricem;
		} else {
			cost = 0;
		}

		pr('Стоимость отлива: ', cost);
		return cost;

	}

	/**
	 *
	 */
	,_getJambHeadCost : function(vals) {

		var cost;
		if (vals.options.jambHead) {
			var len = vals.frame.height + 2 * vals.frame.width + vals.calced.house.jhadditionalh2base * 1000;
			cost = len / 1000 * vals.calced.house.jambheadpricem;
		} else {
			cost = 0;
		}

		pr('Стоимость откоса: ', cost);
		return cost;

	}

	/**
	 *
	 */
	,_getColorCost : function(vals, frameCost) {

		var cost;
		if (vals.frame.color) {
			cost = frameCost * .2;
		} else {
			cost = 0;
		}

		pr('Стоимость ламината: ', cost);
		return cost;

	}

	/**
	 *
	 */
	,_getMosquitoNetsCost : function(vals) {

		var cost;
		if (vals.options.mosquitoNets) {
			cost = vals.calced.area * vals.calced.house['mosquito net'] * vals.calced.matrixProps.smncoefficientbaseh;
		} else {
			cost = 0;
		}

		pr('Стоимость москитной сетки: ', cost);
		return cost;

	}

	/**
	 *
	 */
	,_getFrameCost : function(vals) {

		var cost = vals.calced.matrix.getPrice(vals.frame.width, vals.frame.height);
		pr('Стоимость профиля: ', cost);
		return cost;

	}


	/**
	 * Парсит строку и получает список слоёв для сендвича
	 *
	 * @param	string
	 * @return	array
	 */
	,_parseSendwich : function(layersStr) {

		var ar = [];
		var arLayers = layersStr.split('-');

		for (var i in arLayers) {
			if (typeof(arLayers[i]) === 'string') {	// IE7, IE8.
				ar.push(
					trim(arLayers[i])
					.replace('N+', 'N')// Они зачем то переименовали названия пакетов, когда у нас всё готово
					.replace(/^([0-9]+) Ar/, '$1')// Они зачем то переименовали названия пакетов, когда у нас всё готово
					.replace(/[ \.]/g, '-')
				);
			}
		}

		pr('parseSandwich:', ar);

		return ar;

	}


	/**
	 * Находит описание для слоёв
	 *
	 * @param	array		layers
	 * @return	array
	 */
	,_getSandwichLabels : function(layers)
	{

		var ar = {};
		for (var i in layers) {
			var v = layers[i];
			if (this._price.sandwichLayersDescriptions[v]) {
				ar[v] = this._price.sandwichLayersDescriptions[v];
			} else {
				ar[v] = '';
			}

		}

		return ar;

	}


	/**
	 * Нормализует название слоя
	 *
	 */
	,_normalizeLayerName : function(str) {
		return trim(str)
			.replace('N+', 'N')				// Они зачем то переименовали названия пакетов, когда у нас всё готово
			.replace(/^([0-9]+) Ar/, '$1')	// Они зачем то переименовали названия пакетов, когда у нас всё готово
			.replace(/[ \.]/g, '-')
		;
	}

}

/**
 * Класс для работы с матрицей
 * @param	array	matrix		Двухмерный хэш-массив
 * @constructor
 */
CalcMatrix = function(matrix) {
	this._matrix = matrix;
}

CalcMatrix.prototype = {

	/**
	 * Возвращает либо всю матрицу, либо строку из матрицы, либо ячекйку матрицы.
	 *
	 * @param	height		Если указан только этот аргумент, то вернёт одну строку матрицы
	 * @param	width		Если указаны оба элемента, то вернёт значение ячейки
	 * @return	mixed		Если ни один из аргументов не указан, то вернёт всю матрицу
	 */
	get : function(height, width) {

		if ( ! height) {
			return this._matrix;
		} else if ( ! width) {
			return this._matrix[height];
		} else {
			return this._matrix[height][width];
		}

	}


	/**
	 * Получает диапазон возможных высот
	 *
	 */
	,getHeightRange : function() {
		return this._getMinMaxKeys(this._matrix);
	}


	/**
	 * Получает диапазон возможных высот
	 *
	 */
	,getWidthRange : function()
	{

		for (var first in this._matrix) {
			break;
		}

		return this._getMinMaxKeys(this._matrix[first]);

	}


	/**
	 * Из ключей массива выбирает мин-макс
	 *
	 * @return object		{min:100, max:200}
	 */
	,_getMinMaxKeys : function(arr) {

		var result = {min:null, max:null};

		for (var i in arr) {
			i = parseInt(i);
			if (result.min === null || result.min > i) {
				result.min = i;
			}
			if (result.max === null || result.max < i) {
				result.max = i;
			}
		}

		return result;

	}


	/**
	 * Получает стоимость кв. метра
	 *
	 */
	,getPrice : function(width, height) {

		// Переменные с префиксом "bi" - обозначают соседние элем элементы. Т.е. если чел указал 1555, то bi*** будет содержать [1500, 1600]. Если чел укажет 1500, то вернёт [1500, 1500]
		var biHeight = this._getNeighbour(this._matrix, height);

		if ( ! biHeight) {
			throw new Error('Not found matrix position for this sizes');
		}
		var biWidth1 = this._getNeighbour(this._matrix[biHeight[0]], width);
		var biWidth2 = this._getNeighbour(this._matrix[biHeight[1]], width);

		if ( ! biWidth1 || ! biWidth2) {
			throw new Error('Not found matrix position for this sizes');
		}

		return this._bilinearInterpolation(
			{	// Координаты квадрата
				left	: biWidth1[0],
				right	: biWidth1[1],
				top		: biHeight[0],
				bottom	: biHeight[1]
			},
			{	// Значения в вершинах квадрата
				x0y0 	: this._matrix[biHeight[0]][biWidth1[0]]
				,x1y0	: this._matrix[biHeight[0]][biWidth1[1]]
				,x0y1	: this._matrix[biHeight[1]][biWidth1[0]]
				,x1y1	: this._matrix[biHeight[1]][biWidth1[1]]
			},
			[width, height]	// Текущая позиция
		);

	}

	/**
	 * Получает соседние точки
	 *
	 */
	,_getNeighbour : function(matrix, pos){


		pos	= parseInt(pos);
		var keys	= [];
		for (var i in matrix) {
			keys.push(parseInt(i));
		}

		for (var i in keys) {

			i = parseInt(i);
			var cur = keys[i];
			var next = keys[i+1];
			// pr(i, ': ', cur, next);

			if (cur == pos) {
				return [cur, cur];
			} else if (next && cur < pos && pos < next) {
				return [cur, next];
			}
		}

		return null;

	}


	/**
	 * Билинейная интерполяция
	 *
	 */
	,_bilinearInterpolation : function(squareDiapasons, cornerValues, positions)
	{

		var x = (positions[0] - squareDiapasons.left) / (squareDiapasons.right - squareDiapasons.left) || 0;
		var y = (positions[1] - squareDiapasons.top) / (squareDiapasons.bottom - squareDiapasons.top) || 0;

		// см http://ru.wikipedia.org/wiki/%C1%E8%EB%E8%ED%E5%E9%ED%E0%FF_%E8%ED%F2%E5%F0%EF%EE%EB%FF%F6%E8%FF
		// и там начиная со слов: "В особом случае, когда известные точки находятся на вершинах единичного квадрата, то есть имеют координаты (0, 0), (0, 1), (1, 0), и (1, 1), формула билинейной интерполяции упрощается до"
		var price =
			cornerValues.x0y0 * (1-x) * (1-y) +
			cornerValues.x1y0 * x * (1-y) +
			cornerValues.x0y1 * (1-x) * y +
			cornerValues.x1y1 * x * y
		;

		pr('Результат билинейной интерполяции: ', price);

		return price;


	}



}


/**
 * Используется для получения сендвича
 *
 * @param	str
 * @param	charlist
 * @return	string
 */
function trim(str, charlist) {    // Strip whitespace (or other characters) from the beginning and end of a string
	//
	// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
	// +   improved by: mdsjack (http://www.mdsjack.bo.it)
	// +   improved by: Alexander Ermolaev (http://snippets.dzone.com/user/AlexanderErmolaev)
	// +      input by: Erkekjetter
	// +   improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

	charlist = !charlist ? ' \s\xA0' : charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\$1');
	var re = new RegExp('^[' + charlist + ']+|[' + charlist + ']+$', 'g');
	return str.replace(re, '');
}






// =============

/*	
 *	jQuery carouFredSel 5.6.0
 *	Demo's and documentation:
 *	caroufredsel.frebsite.nl
 *	
 *	Copyright (c) 2012 Fred Heusschen
 *	www.frebsite.nl
 *
 *	Dual licensed under the MIT and GPL licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(H($){8($.1P.1J)J;$.1P.1J=H(y,z){8(1g.V==0){1e(M,\'5s 4q 6u 1m "\'+1g.3U+\'".\');J 1g}8(1g.V>1){J 1g.1K(H(){$(1g).1J(y,z)})}F A=1g,$19=1g[0];8(A.1r(\'4r\')){F B=A.1D(\'34\',\'3v\');A.X(\'34\',[\'5t\',M])}Q{F B=O}A.3V=H(o,b,c){o=3W($19,o);F e=[\'G\',\'1n\',\'T\',\'17\',\'1a\',\'1b\'];1m(F a=0,l=e.V;a<l;a++){o[e[a]]=3W($19,o[e[a]])}8(K o.1n==\'13\'){8(o.1n<=50)o.1n={\'G\':o.1n};Q o.1n={\'1j\':o.1n}}Q{8(K o.1n==\'1k\')o.1n={\'1G\':o.1n}}8(K o.G==\'13\')o.G={\'P\':o.G};Q 8(o.G==\'1d\')o.G={\'P\':o.G,\'S\':o.G,\'1l\':o.G};8(K o.G!=\'1o\')o.G={};8(b)2u=$.25(M,{},$.1P.1J.4s,o);7=$.25(M,{},$.1P.1J.4s,o);8(K 7.G.12!=\'1o\')7.G.12={};8(7.G.2I==0&&K c==\'13\'){7.G.2I=c}C.4t=(7.2J);C.2k=(7.2k==\'4u\'||7.2k==\'1t\')?\'1a\':\'17\';F f=[[\'S\',\'35\',\'26\',\'1l\',\'5u\',\'2K\',\'1t\',\'2L\',\'1E\',0,1,2,3],[\'1l\',\'5u\',\'2K\',\'S\',\'35\',\'26\',\'2L\',\'1t\',\'3X\',3,2,1,0]];F g=f[0].V,5v=(7.2k==\'2M\'||7.2k==\'1t\')?0:1;7.d={};1m(F d=0;d<g;d++){7.d[f[0][d]]=f[5v][d]}F h=A.Z();1x(K 7.G.P){W\'1o\':7.G.12.2N=7.G.P.2N;7.G.12.27=7.G.P.27;7.G.P=O;18;W\'1k\':8(7.G.P==\'1d\'){7.G.12.1d=M}Q{7.G.12.2l=7.G.P}7.G.P=O;18;W\'H\':7.G.12.2l=7.G.P;7.G.P=O;18}8(K 7.G.1v==\'1y\'){7.G.1v=(h.1v(\':2O\').V>0)?\':P\':\'*\'}8(7[7.d[\'S\']]==\'T\'){7[7.d[\'S\']]=3w(h,7,\'26\')}8(3Y(7[7.d[\'S\']])&&!7.2J){7[7.d[\'S\']]=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);C.4t=M}8(7[7.d[\'1l\']]==\'T\'){7[7.d[\'1l\']]=3w(h,7,\'2K\')}8(!7.G[7.d[\'S\']]){8(7.2J){1e(M,\'5w a \'+7.d[\'S\']+\' 1m 6v G!\');7.G[7.d[\'S\']]=3w(h,7,\'26\')}Q{7.G[7.d[\'S\']]=(4v(h,7,\'26\'))?\'1d\':h[7.d[\'26\']](M)}}8(!7.G[7.d[\'1l\']]){7.G[7.d[\'1l\']]=(4v(h,7,\'2K\'))?\'1d\':h[7.d[\'2K\']](M)}8(!7[7.d[\'1l\']]){7[7.d[\'1l\']]=7.G[7.d[\'1l\']]}8(!7.G.P&&!7.2J){8(7.G[7.d[\'S\']]==\'1d\'){7.G.12.1d=M}8(!7.G.12.1d){8(K 7[7.d[\'S\']]==\'13\'){7.G.P=1L.3x(7[7.d[\'S\']]/7.G[7.d[\'S\']])}Q{F i=36($1A.3a(),7,\'35\');7.G.P=1L.3x(i/7.G[7.d[\'S\']]);7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];8(!7.G.12.2l)7.1B=O}8(7.G.P==\'6w\'||7.G.P<1){1e(M,\'28 a 4w 13 3y P G: 5w 41 "1d".\');7.G.12.1d=M}}}8(!7[7.d[\'S\']]){7[7.d[\'S\']]=\'1d\';8(!7.2J&&7.G.1v==\'*\'&&!7.G.12.1d&&7.G[7.d[\'S\']]!=\'1d\'){7[7.d[\'S\']]=7.G.P*7.G[7.d[\'S\']];7.1B=O}}8(7.G.12.1d){7.3z=(7[7.d[\'S\']]==\'1d\')?36($1A.3a(),7,\'35\'):7[7.d[\'S\']];8(7.1B===O){7[7.d[\'S\']]=\'1d\'}7.G.P=2P(h,7,0)}Q 8(7.G.1v!=\'*\'){7.G.12.42=7.G.P;7.G.P=3A(h,7,0)}8(K 7.1B==\'1y\'){7.1B=(7[7.d[\'S\']]==\'1d\')?O:\'4x\'}7.G.P=2Q(7.G.P,7,7.G.12.2l,$19);7.G.12.2m=7.G.P;7.1u=O;8(7.2J){8(!7.G.12.2N)7.G.12.2N=7.G.P;8(!7.G.12.27)7.G.12.27=7.G.P;7.1B=O;7.1i=[0,0,0,0];F j=$1A.1W(\':P\');8(j)$1A.3b();F k=3Z(36($1A.3a(),7,\'35\'),7[7.d[\'S\']]);8(K 7[7.d[\'S\']]==\'13\'&&k<7[7.d[\'S\']]){k=7[7.d[\'S\']]}8(j)$1A.3c();F m=4y(1L.2v(k/7.G[7.d[\'S\']]),7.G.12);8(m>h.V){m=h.V}F n=1L.3x(k/m),4z=7[7.d[\'1l\']],5x=3Y(4z);h.1K(H(){F a=$(1g),4A=n-5y(a,7,\'6x\');a[7.d[\'S\']](4A);8(5x){a[7.d[\'1l\']](3Z(4A,4z))}});7.G.P=m;7.G[7.d[\'S\']]=n;7[7.d[\'S\']]=m*n}Q{7.1i=5z(7.1i);8(7.1B==\'2L\')7.1B=\'1t\';8(7.1B==\'4B\')7.1B=\'2M\';1x(7.1B){W\'4x\':W\'1t\':W\'2M\':8(7[7.d[\'S\']]!=\'1d\'){F p=43(3d(h,7),7);7.1u=M;7.1i[7.d[1]]=p[1];7.1i[7.d[3]]=p[0]}18;2w:7.1B=O;7.1u=(7.1i[0]==0&&7.1i[1]==0&&7.1i[2]==0&&7.1i[3]==0)?O:M;18}}8(K 7.2n==\'1s\'&&7.2n)7.2n=\'6y\'+A.6z(\'6A\');8(K 7.G.3e!=\'13\')7.G.3e=7.G.P;8(K 7.1n.1j!=\'13\')7.1n.1j=5A;8(K 7.1n.G==\'1y\')7.1n.G=(7.G.12.1d||7.G.1v!=\'*\')?\'P\':7.G.P;7.T=3B($19,7.T,\'T\');7.17=3B($19,7.17);7.1a=3B($19,7.1a);7.1b=3B($19,7.1b,\'1b\');7.T=$.25(M,{},7.1n,7.T);7.17=$.25(M,{},7.1n,7.17);7.1a=$.25(M,{},7.1n,7.1a);7.1b=$.25(M,{},7.1n,7.1b);8(K 7.1b.44!=\'1s\')7.1b.44=O;8(K 7.1b.3f!=\'H\'&&7.1b.3f!==O)7.1b.3f=$.1P.1J.5B;8(K 7.T.1H!=\'1s\')7.T.1H=M;8(K 7.T.4C!=\'13\')7.T.4C=0;8(K 7.T.45==\'1y\')7.T.45=M;8(K 7.T.4D!=\'1s\')7.T.4D=M;8(K 7.T.3g!=\'13\')7.T.3g=(7.T.1j<10)?6B:7.T.1j*5;8(7.29){7.29=4E(7.29)}8(I.1e){1e(I,\'3h S: \'+7.S);1e(I,\'3h 1l: \'+7.1l);8(7.3z)1e(I,\'6C \'+7.d[\'S\']+\': \'+7.3z);1e(I,\'5C 6D: \'+7.G.S);1e(I,\'5C 6E: \'+7.G.1l);1e(I,\'46 3y G P: \'+7.G.P);8(7.T.1H)1e(I,\'46 3y G 4F 6F: \'+7.T.G);8(7.17.Y)1e(I,\'46 3y G 4F 4G: \'+7.17.G);8(7.1a.Y)1e(I,\'46 3y G 4F 5D: \'+7.1a.G)}};A.5E=H(){A.1r(\'4r\',M);F a={\'4H\':A.16(\'4H\'),\'4I\':A.16(\'4I\'),\'3C\':A.16(\'3C\'),\'2L\':A.16(\'2L\'),\'2M\':A.16(\'2M\'),\'4B\':A.16(\'4B\'),\'1t\':A.16(\'1t\'),\'S\':A.16(\'S\'),\'1l\':A.16(\'1l\'),\'4J\':A.16(\'4J\'),\'1E\':A.16(\'1E\'),\'3X\':A.16(\'3X\'),\'4K\':A.16(\'4K\')};1x(a.3C){W\'4L\':F b=\'4L\';18;W\'5F\':F b=\'5F\';18;2w:F b=\'6G\'}$1A.16(a).16({\'6H\':\'2O\',\'3C\':b});A.1r(\'5G\',a).16({\'4H\':\'1t\',\'4I\':\'47\',\'3C\':\'4L\',\'2L\':0,\'1t\':0,\'4J\':0,\'1E\':0,\'3X\':0,\'4K\':0});8(7.1u){A.Z().1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}};A.5H=H(){A.4M();A.14(L(\'4N\',I),H(e,a){e.1h();8(!C.1Z){8(7.T.Y){7.T.Y.2R(2q(\'48\',I))}}C.1Z=M;8(7.T.1H){7.T.1H=O;A.X(L(\'2S\',I),a)}J M});A.14(L(\'4O\',I),H(e){e.1h();8(C.1S){3D(R)}J M});A.14(L(\'2S\',I),H(e,a,b){e.1h();1F=3i(1F);8(a&&C.1S){R.1Z=M;F c=2x()-R.2T;R.1j-=c;8(R.1p)R.1p.1j-=c;8(R.1Q)R.1Q.1j-=c;3D(R,O)}8(!C.1X&&!C.1S){8(b)1F.3E+=2x()-1F.2T}8(!C.1X){8(7.T.Y){7.T.Y.2R(2q(\'5I\',I))}}C.1X=M;8(7.T.5J){F d=7.T.3g-1F.3E,3F=3G-1L.2v(d*3G/7.T.3g);7.T.5J.1z($19,3F,d)}J M});A.14(L(\'1H\',I),H(e,b,c,d){e.1h();1F=3i(1F);F v=[b,c,d],t=[\'1k\',\'13\',\'1s\'],a=2U(v,t);F b=a[0],c=a[1],d=a[2];8(b!=\'17\'&&b!=\'1a\')b=C.2k;8(K c!=\'13\')c=0;8(K d!=\'1s\')d=O;8(d){C.1Z=O;7.T.1H=M}8(!7.T.1H){e.20();J 1e(I,\'3h 48: 28 2V.\')}8(C.1X){8(7.T.Y){7.T.Y.2y(2q(\'48\',I));7.T.Y.2y(2q(\'5I\',I))}}C.1X=O;1F.2T=2x();F f=7.T.3g+c;3H=f-1F.3E;3F=3G-1L.2v(3H*3G/f);1F.T=6I(H(){8(7.T.5K){7.T.5K.1z($19,3F,3H)}8(C.1S){A.X(L(\'1H\',I),b)}Q{A.X(L(b,I),7.T)}},3H);8(7.T.5L){7.T.5L.1z($19,3F,3H)}J M});A.14(L(\'2W\',I),H(e){e.1h();8(R.1Z){R.1Z=O;C.1X=O;C.1S=M;R.2T=2x();2a(R)}Q{A.X(L(\'1H\',I))}J M});A.14(L(\'17\',I)+\' \'+L(\'1a\',I),H(e,b,f,g){e.1h();8(C.1Z||A.1W(\':2O\')){e.20();J 1e(I,\'3h 48 6J 2O: 28 2V.\')}8(7.G.3e>=N.U){e.20();J 1e(I,\'28 5M G (\'+N.U+\', \'+7.G.3e+\' 5N): 28 2V.\')}F v=[b,f,g],t=[\'1o\',\'13/1k\',\'H\'],a=2U(v,t);F b=a[0],f=a[1],g=a[2];F h=e.4P.1c(I.3j.3I.V);8(K b!=\'1o\'||b==2b)b=7[h];8(K g==\'H\')b.21=g;8(K f!=\'13\'){8(7.G.1v!=\'*\'){f=\'P\'}Q{F i=[f,b.G,7[h].G];1m(F a=0,l=i.V;a<l;a++){8(K i[a]==\'13\'||i[a]==\'5O\'||i[a]==\'P\'){f=i[a];18}}}1x(f){W\'5O\':e.20();J A.1D(h+\'6K\',[b,g]);18;W\'P\':8(!7.G.12.1d&&7.G.1v==\'*\'){f=7.G.P}18}}8(R.1Z){A.X(L(\'2W\',I));A.X(L(\'3k\',I),[h,[b,f,g]]);e.20();J 1e(I,\'3h 6L 2V.\')}8(b.1j>0){8(C.1S){8(b.3k)A.X(L(\'3k\',I),[h,[b,f,g]]);e.20();J 1e(I,\'3h 6M 2V.\')}}8(b.4Q&&!b.4Q.1z($19)){e.20();J 1e(I,\'6N "4Q" 6O O.\')}1F.3E=0;A.X(\'34\',[\'5P\'+h,[b,f]]);8(7.29){F s=7.29,c=[b,f];1m(F j=0,l=s.V;j<l;j++){F d=h;8(!s[j][1])c[0]=s[j][0].1D(\'34\',[\'5Q\',d]);8(!s[j][2])d=(d==\'17\')?\'1a\':\'17\';c[1]=f+s[j][3];s[j][0].X(\'34\',[\'5P\'+d,c])}}J M});A.14(L(\'6P\',I),H(e,f,g){e.1h();F h=A.Z();8(!7.1M){8(N.11==0){8(7.3l){A.X(L(\'1a\',I),N.U-1)}J e.20()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.12.1d){g=4a(h,7,N.U-1)}Q 8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5R(h,7,N.U-1,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}8(!7.1M){8(N.U-g<N.11){g=N.U-N.11}}7.G.12.2m=7.G.P;8(7.G.12.1d){F j=2P(h,7,N.U-g);8(7.G.P+g<=j&&g<N.U){g++;j=2P(h,7,N.U-g)}7.G.P=2Q(j,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F j=3A(h,7,N.U-g);7.G.P=2Q(j,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,M);8(g==0){e.20();J 1e(I,\'0 G 41 1n: 28 2V.\')}1e(I,\'5S \'+g+\' G 4G.\');N.11+=g;22(N.11>=N.U){N.11-=N.U}8(!7.1M){8(N.11==0&&f.4c)f.4c.1z($19);8(!7.3l)2X(7,N.11,I)}A.Z().1c(N.U-g,N.U).6Q(A);8(N.U<7.G.P+g){A.Z().1c(0,(7.G.P+g)-N.U).4d(M).3J(A)}F h=A.Z(),2r=5T(h,7,g),1T=5U(h,7),2c=h.1O(g-1),2d=2r.2Y(),2z=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),k=p[0],2s=p[1]}Q{F k=0,2s=0}F l=(k<0)?7.1i[7.d[3]]:0;8(f.1I==\'5V\'&&7.G.P<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2O\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2A(1T,7,M),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1u){1N(h,7,M);8(2s>=0){1N(2d,7,7.1i[7.d[1]])}1N(2c,7,7.1i[7.d[3]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=k}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=23(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=7.1i[7.d[3]];8(2z.4S(2c).V){F r={};r[7.d[\'1E\']]=2c.1r(\'1R\');8(k<0)2c.16(r);Q R.1f.1q([2c,r])}8(2z.4S(2d).V){F s={};s[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,s])}8(2s>=0){F t={};t[7.d[\'1E\']]=2z.1r(\'1R\')+7.1i[7.d[1]];R.1f.1q([2z,t])}}Q{F q=0}o[7.d[\'1t\']]=q;F u=[2r,1T,2e,1w];8(f.2f)f.2f.3K($19,u);1Y.2f=3L(1Y.2f,$19,u);1x(f.1I){W\'2B\':W\'2g\':W\'2C\':W\'2h\':R.1p=23(R.1j,R.1G);R.1Q=23(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2C\':W\'2h\':F v=A.4d().3J($1A);18}1x(f.1I){W\'2h\':v.Z().1c(0,g).1U();W\'2g\':W\'2C\':v.Z().1c(7.G.P).1U();18}1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2C\':R=4T(R,A,v,7,M);18;W\'2h\':R=4U(R,A,v,7,M,g);18}F w=H(){F b=7.G.P+g-N.U;8(b>0){A.Z().1c(N.U).1U();2r=$(A.Z().1c(N.U-(7.G.P-b)).4h().5W(A.Z().1c(0,b).4h()))}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){F c=A.Z().1O(7.G.P+g-1);c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=23(R.4V,R.1G);F d=H(){1x(f.1I){W\'2B\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=23(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.21)f.21.3K($19,a);1Y.21=3L(1Y.21,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':1},d]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},d]);2a(R.1p);18;2w:d();18}};R.1f.1q([A,o,w]);C.1S=M;A.16(7.d[\'1t\'],-(n-l));1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3v\',I)));A.X(L(\'2D\',I),[O,2e]);J M});A.14(L(\'6R\',I),H(e,f,g){e.1h();F h=A.Z();8(!7.1M){8(N.11==7.G.P){8(7.3l){A.X(L(\'17\',I),N.U-1)}J e.20()}}8(7.1u)1N(h,7);8(K g!=\'13\'){8(7.G.1v!=\'*\'){F i=(K f.G==\'13\')?f.G:4R(A,7);g=5Y(h,7,0,i)}Q{g=7.G.P}g=4b(g,7,f.G,$19)}F j=(N.11==0)?N.U:N.11;8(!7.1M){8(7.G.12.1d){F k=2P(h,7,g),i=4a(h,7,j-1)}Q{F k=7.G.P,i=7.G.P}8(g+k>j){g=j-i}}7.G.12.2m=7.G.P;8(7.G.12.1d){F k=4X(h,7,g,j);22(7.G.P-g>=k&&g<N.U){g++;k=4X(h,7,g,j)}7.G.P=2Q(k,7,7.G.12.2l,$19)}Q 8(7.G.1v!=\'*\'){F k=3A(h,7,g);7.G.P=2Q(k,7,7.G.12.2l,$19)}8(7.1u)1N(h,7,M);8(g==0){e.20();J 1e(I,\'0 G 41 1n: 28 2V.\')}1e(I,\'5S \'+g+\' G 5D.\');N.11-=g;22(N.11<0){N.11+=N.U}8(!7.1M){8(N.11==7.G.P&&f.4c)f.4c.1z($19);8(!7.3l)2X(7,N.11,I)}8(N.U<7.G.P+g){A.Z().1c(0,(7.G.P+g)-N.U).4d(M).3J(A)}F h=A.Z(),2r=4Y(h,7),1T=4Z(h,7,g),2c=h.1O(g-1),2d=2r.2Y(),2z=1T.2Y();8(7.1u)1N(h,7);8(7.1B){F p=43(1T,7),l=p[0],2s=p[1]}Q{F l=0,2s=0}8(f.1I==\'5V\'&&7.G.12.2m<g){F m=h.1c(7.G.12.2m,g),4e=7.G[7.d[\'S\']];m.1K(H(){F a=$(1g);a.1r(\'4f\',a.1W(\':2O\')).3b()});7.G[7.d[\'S\']]=\'1d\'}Q{F m=O}F n=3m(h.1c(0,g),7,\'S\'),2e=4g(2A(1T,7,M),7,!7.1u);8(m)7.G[7.d[\'S\']]=4e;8(7.1B){8(7.1i[7.d[1]]<0){7.1i[7.d[1]]=0}}8(7.1u){1N(h,7,M);1N(2d,7,7.1i[7.d[1]])}8(7.1B){7.1i[7.d[1]]=2s;7.1i[7.d[3]]=l}F o={},1w=f.1j;8(f.1I==\'47\')1w=0;Q 8(1w==\'T\')1w=7.1n.1j/7.1n.G*g;Q 8(1w<=0)1w=0;Q 8(1w<10)1w=n/1w;R=23(1w,f.1G);8(7[7.d[\'S\']]==\'1d\'||7[7.d[\'1l\']]==\'1d\'){R.1f.1q([$1A,2e])}8(7.1u){F q=2z.1r(\'1R\');8(2s>=0){q+=7.1i[7.d[1]]}2z.16(7.d[\'1E\'],q);8(2c.4S(2d).V){F r={};r[7.d[\'1E\']]=2d.1r(\'1R\');R.1f.1q([2d,r])}F s=2c.1r(\'1R\');8(l>=0){s+=7.1i[7.d[3]]}F t={};t[7.d[\'1E\']]=s;R.1f.1q([2c,t])}o[7.d[\'1t\']]=-n;8(l<0){o[7.d[\'1t\']]+=l}F u=[2r,1T,2e,1w];8(f.2f)f.2f.3K($19,u);1Y.2f=3L(1Y.2f,$19,u);1x(f.1I){W\'2B\':W\'2g\':W\'2C\':W\'2h\':R.1p=23(R.1j,R.1G);R.1Q=23(R.1j,R.1G);R.1j=0;18}1x(f.1I){W\'2g\':W\'2C\':W\'2h\':F v=A.4d().3J($1A);18}1x(f.1I){W\'2h\':v.Z().1c(7.G.12.2m).1U();18;W\'2g\':W\'2C\':v.Z().1c(0,g).1U();v.Z().1c(7.G.P).1U();18}1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':0}]);18;W\'2g\':v.16({\'2i\':0});R.1p.1f.1q([A,{\'S\':\'+=0\'},H(){v.1U()}]);R.1Q.1f.1q([v,{\'2i\':1}]);18;W\'2C\':R=4T(R,A,v,7,O);18;W\'2h\':R=4U(R,A,v,7,O,g);18}F w=H(){F b=7.G.P+g-N.U,5Z=(7.1u)?7.1i[7.d[3]]:0;A.16(7.d[\'1t\'],5Z);8(b>0){A.Z().1c(N.U).1U()}F c=A.Z().1c(0,g).3J(A).2Y();8(b>0){1T=3d(h,7)}8(m){m.1K(H(){F a=$(1g);8(!a.1r(\'4f\'))a.3c()})}8(7.1u){8(N.U<7.G.P+g){F d=A.Z().1O(7.G.P-1);d.16(7.d[\'1E\'],d.1r(\'1R\')+7.1i[7.d[3]])}c.16(7.d[\'1E\'],c.1r(\'1R\'))}R.1f=[];8(R.1p)R.1p=23(R.4V,R.1G);F e=H(){1x(f.1I){W\'2B\':W\'2g\':A.16(\'1v\',\'\');18}R.1Q=23(0,2b);C.1S=O;F a=[2r,1T,2e];8(f.21)f.21.3K($19,a);1Y.21=3L(1Y.21,$19,a);8(1V.V){A.X(L(1V[0][0],I),1V[0][1]);1V.5X()}8(!C.1X)A.X(L(\'1H\',I))};1x(f.1I){W\'2B\':R.1p.1f.1q([A,{\'2i\':1},e]);2a(R.1p);18;W\'2h\':R.1p.1f.1q([A,{\'S\':\'+=0\'},e]);2a(R.1p);18;2w:e();18}};R.1f.1q([A,o,w]);C.1S=M;1F=3i(1F);2a(R);4W(7.2n,A.1D(L(\'3v\',I)));A.X(L(\'2D\',I),[O,2e]);J M});A.14(L(\'2Z\',I),H(e,b,c,d,f,g,h){e.1h();F v=[b,c,d,f,g,h],t=[\'1k/13/1o\',\'13\',\'1s\',\'1o\',\'1k\',\'H\'],a=2U(v,t);F f=a[3],g=a[4],h=a[5];b=3n(a[0],a[1],a[2],N,A);8(b==0)J;8(K f!=\'1o\')f=O;8(C.1S){8(K f!=\'1o\'||f.1j>0)J O}8(g!=\'17\'&&g!=\'1a\'){8(7.1M){8(b<=N.U/2)g=\'1a\';Q g=\'17\'}Q{8(N.11==0||N.11>b)g=\'1a\';Q g=\'17\'}}8(g==\'17\')b=N.U-b;A.X(L(g,I),[f,b,h]);J M});A.14(L(\'6S\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3M\',I));J A.1D(L(\'51\',I),[c-1,a,\'17\',b])});A.14(L(\'6T\',I),H(e,a,b){e.1h();F c=A.1D(L(\'3M\',I));J A.1D(L(\'51\',I),[c+1,a,\'1a\',b])});A.14(L(\'51\',I),H(e,a,b,c,d){e.1h();8(K a!=\'13\')a=A.1D(L(\'3M\',I));F f=7.1b.G||7.G.P,27=1L.2v(N.U/f)-1;8(a<0)a=27;8(a>27)a=0;J A.1D(L(\'2Z\',I),[a*f,0,M,b,c,d])});A.14(L(\'60\',I),H(e,s){e.1h();8(s)s=3n(s,0,M,N,A);Q s=0;s+=N.11;8(s!=0){22(s>N.U)s-=N.U;A.6U(A.Z().1c(s,N.U))}J M});A.14(L(\'29\',I),H(e,s){e.1h();8(s)s=4E(s);Q 8(7.29)s=7.29;Q J 1e(I,\'5s 6V 41 29.\');F n=A.1D(L(\'3v\',I)),x=M;1m(F j=0,l=s.V;j<l;j++){8(!s[j][0].1D(L(\'2Z\',I),[n,s[j][3],M])){x=O}}J x});A.14(L(\'3k\',I),H(e,a,b){e.1h();8(K a==\'H\'){a.1z($19,1V)}Q 8(31(a)){1V=a}Q 8(K a!=\'1y\'){1V.1q([a,b])}J 1V});A.14(L(\'6W\',I),H(e,b,c,d,f){e.1h();F v=[b,c,d,f],t=[\'1k/1o\',\'1k/13/1o\',\'1s\',\'13\'],a=2U(v,t);F b=a[0],c=a[1],d=a[2],f=a[3];8(K b==\'1o\'&&K b.3o==\'1y\')b=$(b);8(K b==\'1k\')b=$(b);8(K b!=\'1o\'||K b.3o==\'1y\'||b.V==0)J 1e(I,\'28 a 4w 1o.\');8(K c==\'1y\')c=\'4i\';8(7.1u){b.1K(H(){F m=2o($(1g).16(7.d[\'1E\']));8(2p(m))m=0;$(1g).1r(\'1R\',m)})}F g=c,3N=\'3N\';8(c==\'4i\'){8(d){8(N.11==0){c=N.U-1;3N=\'61\'}Q{c=N.11;N.11+=b.V}8(c<0)c=0}Q{c=N.U-1;3N=\'61\'}}Q{c=3n(c,f,d,N,A)}8(g!=\'4i\'&&!d){8(c<N.11)N.11+=b.V}8(N.11>=N.U)N.11-=N.U;F h=A.Z().1O(c);8(h.V){h[3N](b)}Q{A.62(b)}N.U=A.Z().V;F i=A.1D(\'52\');3O(7,N.U,I);2X(7,N.11,I);A.X(L(\'53\',I));A.X(L(\'2D\',I),[M,i]);J M});A.14(L(\'63\',I),H(e,c,d,f){e.1h();F v=[c,d,f],t=[\'1k/13/1o\',\'1s\',\'13\'],a=2U(v,t);c=a[0];d=a[1];f=a[2];F g=O;8(c 64 $&&c.V>1){h=$();c.1K(H(i,a){F b=A.X(L(\'63\',I),[$(1g),d,f]);8(b)h=h.6X(b)});J h}8(K c==\'1y\'||c==\'4i\'){h=A.Z().2Y()}Q{c=3n(c,f,d,N,A);F h=A.Z().1O(c);8(h.V){8(c<N.11)N.11-=h.V}}8(h&&h.V){h.6Y();N.U=A.Z().V;F j=A.1D(\'52\');3O(7,N.U,I);2X(7,N.11,I);A.X(L(\'2D\',I),[M,j])}J h});A.14(L(\'2f\',I)+\' \'+L(\'21\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3I.V);8(31(a))1Y[b]=a;8(K a==\'H\')1Y[b].1q(a);J 1Y[b]});A.14(L(\'3v\',I),H(e,a){e.1h();8(N.11==0)F b=0;Q F b=N.U-N.11;8(K a==\'H\')a.1z($19,b);J b});A.14(L(\'3M\',I),H(e,a){e.1h();F b=7.1b.G||7.G.P;F c=1L.2v(N.U/b-1);8(N.11==0)F d=0;Q 8(N.11<N.U%b)F d=0;Q 8(N.11==b&&!7.1M)F d=c;Q F d=1L.6Z((N.U-N.11)/b);8(d<0)d=0;8(d>c)d=c;8(K a==\'H\')a.1z($19,d);J d});A.14(L(\'70\',I),H(e,a){e.1h();$i=3d(A.Z(),7);8(K a==\'H\')a.1z($19,$i);J $i});A.14(L(\'1c\',I),H(e,f,l,b){e.1h();8(N.U==0)J O;F v=[f,l,b],t=[\'13\',\'13\',\'H\'],a=2U(v,t);f=(K a[0]==\'13\')?a[0]:0;l=(K a[1]==\'13\')?a[1]:N.U;b=a[2];f+=N.11;l+=N.11;22(f>N.U){f-=N.U}22(l>N.U){l-=N.U}22(f<0){f+=N.U}22(l<0){l+=N.U}F c=A.Z();8(l>f){F d=c.1c(f,l)}Q{F d=$(c.1c(f,N.U).4h().5W(c.1c(0,l).4h()))}8(K b==\'H\')b.1z($19,d);J d});A.14(L(\'1X\',I)+\' \'+L(\'1Z\',I)+\' \'+L(\'1S\',I),H(e,a){e.1h();F b=e.4P.1c(I.3j.3I.V);8(K a==\'H\')a.1z($19,C[b]);J C[b]});A.14(L(\'5Q\',I),H(e,a,b,c){e.1h();F d=O;8(K a==\'H\'){a.1z($19,7)}Q 8(K a==\'1o\'){2u=$.25(M,{},2u,a);8(b!==O)d=M;Q 7=$.25(M,{},7,a)}Q 8(K a!=\'1y\'){8(K b==\'H\'){F f=4j(\'7.\'+a);8(K f==\'1y\')f=\'\';b.1z($19,f)}Q 8(K b!=\'1y\'){8(K c!==\'1s\')c=M;4j(\'2u.\'+a+\' = b\');8(c!==O)d=M;Q 4j(\'7.\'+a+\' = b\')}Q{J 4j(\'7.\'+a)}}8(d){1N(A.Z(),7);A.3V(2u);A.54();F g=3P(A,7,O);A.X(L(\'2D\',I),[M,g])}J 7});A.14(L(\'53\',I),H(e,a,b){e.1h();8(K a==\'1y\'||a.V==0)a=$(\'71\');Q 8(K a==\'1k\')a=$(a);8(K a!=\'1o\')J 1e(I,\'28 a 4w 1o.\');8(K b!=\'1k\'||b.V==0)b=\'a.65\';a.72(b).1K(H(){F h=1g.66||\'\';8(h.V>0&&A.Z().68($(h))!=-1){$(1g).24(\'55\').55(H(e){e.2j();A.X(L(\'2Z\',I),h)})}});J M});A.14(L(\'2D\',I),H(e,b,c){e.1h();8(!7.1b.1C)J;8(b){F d=7.1b.G||7.G.P,l=1L.2v(N.U/d);8(7.1b.3f){7.1b.1C.Z().1U();7.1b.1C.1K(H(){1m(F a=0;a<l;a++){F i=A.Z().1O(3n(a*d,0,M,N,A));$(1g).62(7.1b.3f(a+1,i))}})}7.1b.1C.1K(H(){$(1g).Z().24(7.1b.3p).1K(H(a){$(1g).14(7.1b.3p,H(e){e.2j();A.X(L(\'2Z\',I),[a*d,0,M,7.1b])})})})}7.1b.1C.1K(H(){$(1g).Z().2y(2q(\'69\',I)).1O(A.1D(L(\'3M\',I))).2R(2q(\'69\',I))});J M});A.14(L(\'52\',I),H(e){F a=A.Z(),3Q=7.G.P;8(7.G.12.1d)3Q=2P(a,7,0);Q 8(7.G.1v!=\'*\')3Q=3A(a,7,0);8(!7.1M&&N.11!=0&&3Q>N.11){8(7.G.12.1d){F b=4a(a,7,N.11)-N.11}Q 8(7.G.1v!=\'*\'){F b=6a(a,7,N.11)-N.11}Q{b=7.G.P-N.11}1e(I,\'73 74-1M: 75 \'+b+\' G 4G.\');A.X(\'17\',b)}7.G.P=2Q(3Q,7,7.G.12.2l,$19);J 3P(A,7)});A.14(L(\'5t\',I),H(e,a){e.1h();1F=3i(1F);A.1r(\'4r\',O);A.X(L(\'4O\',I));8(a){A.X(L(\'60\',I))}8(7.1u){1N(A.Z(),7)}A.16(A.1r(\'5G\'));A.4M();A.56();$1A.76(A);J M});A.14(\'34\',H(e,n,o){e.1h();J A.1D(L(n,I),o)})};A.4M=H(){A.24(L(\'\',I));A.24(L(\'\',I,O))};A.54=H(){A.56();3O(7,N.U,I);2X(7,N.11,I);8(7.T.2t){F c=3q(7.T.2t);$1A.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}8(7.T.Y){7.T.Y.14(L(7.T.3p,I,O),H(e){e.2j();F a=O,c=2b;8(C.1X){a=\'1H\'}Q 8(7.T.45){a=\'2S\';c=3q(7.T.45)}8(a){A.X(L(a,I),c)}})}8(7.17.Y){7.17.Y.14(L(7.17.3p,I,O),H(e){e.2j();A.X(L(\'17\',I))});8(7.17.2t){F c=3q(7.17.2t);7.17.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}}8(7.1a.Y){7.1a.Y.14(L(7.1a.3p,I,O),H(e){e.2j();A.X(L(\'1a\',I))});8(7.1a.2t){F c=3q(7.1a.2t);7.1a.Y.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}}8($.1P.2E){8(7.17.2E){8(!C.57){C.57=M;$1A.2E(H(e,a){8(a>0){e.2j();F b=59(7.17.2E);A.X(L(\'17\',I),b)}})}}8(7.1a.2E){8(!C.5a){C.5a=M;$1A.2E(H(e,a){8(a<0){e.2j();F b=59(7.1a.2E);A.X(L(\'1a\',I),b)}})}}}8($.1P.3R){F d=(7.17.5b)?H(){A.X(L(\'17\',I))}:2b,3S=(7.1a.5b)?H(){A.X(L(\'1a\',I))}:2b;8(3S||3S){8(!C.3R){C.3R=M;F f={\'77\':30,\'78\':30,\'79\':M};1x(7.2k){W\'4u\':W\'6b\':f.7a=d;f.7b=3S;18;2w:f.7c=3S;f.7d=d}$1A.3R(f)}}}8(7.1b.1C){8(7.1b.2t){F c=3q(7.1b.2t);7.1b.1C.14(L(\'4k\',I,O),H(){A.X(L(\'2S\',I),c)}).14(L(\'4l\',I,O),H(){A.X(L(\'2W\',I))})}}8(7.17.2F||7.1a.2F){$(3T).14(L(\'6c\',I,O,M,M),H(e){F k=e.6d;8(k==7.1a.2F){e.2j();A.X(L(\'1a\',I))}8(k==7.17.2F){e.2j();A.X(L(\'17\',I))}})}8(7.1b.44){$(3T).14(L(\'6c\',I,O,M,M),H(e){F k=e.6d;8(k>=49&&k<58){k=(k-49)*7.G.P;8(k<=N.U){e.2j();A.X(L(\'2Z\',I),[k,0,M,7.1b])}}})}8(7.T.1H){A.X(L(\'1H\',I),7.T.4C)}8(C.4t){F g=$(3r),5c=g.S(),5d=g.1l();g.14(L(\'7e\',I,O,M,M),H(e){8(g.S()!=5c||g.1l()!=5d){A.X(L(\'4O\',I));8(7.T.4D&&!C.1X){A.X(L(\'1H\',I))}1N(A.Z(),7);A.3V(2u);F a=3P(A,7,O);A.X(L(\'2D\',I),[M,a]);5c=g.S();5d=g.1l()}})}};A.56=H(){F a=L(\'\',I),3s=L(\'\',I,O);5e=L(\'\',I,O,M,M);$(3T).24(5e);$(3r).24(5e);$1A.24(3s);8(7.T.Y)7.T.Y.24(3s);8(7.17.Y)7.17.Y.24(3s);8(7.1a.Y)7.1a.Y.24(3s);8(7.1b.1C){7.1b.1C.24(3s);8(7.1b.3f){7.1b.1C.Z().1U()}}3O(7,\'3b\',I);2X(7,\'2y\',I)};F C={\'2k\':\'1a\',\'1X\':M,\'1S\':O,\'1Z\':O,\'5a\':O,\'57\':O,\'3R\':O},N={\'U\':A.Z().V,\'11\':0},1F={\'7f\':2b,\'T\':2b,\'3k\':2b,\'2T\':2x(),\'3E\':0},R={\'1Z\':O,\'1j\':0,\'2T\':0,\'1G\':\'\',\'1f\':[]},1Y={\'2f\':[],\'21\':[]},1V=[],I=$.25(M,{},$.1P.1J.6e,z),7={},2u=y,$1A=A.7g(\'<\'+I.5f.4q+\' 7h="\'+I.5f.6f+\'" />\').3a();I.3U=A.3U;I.4m=$.1P.1J.4m++;A.3V(2u,M,B);A.5E();A.5H();A.54();8(31(7.G.2I)){F D=7.G.2I}Q{F D=[];8(7.G.2I!=0){D.1q(7.G.2I)}}8(7.2n){D.7i(6g(7.2n))}8(D.V>0){1m(F a=0,l=D.V;a<l;a++){F s=D[a];8(s==0){5g}8(s===M){s=3r.7j.66;8(s.V<1){5g}}Q 8(s===\'6h\'){s=1L.3x(1L.6h()*N.U)}8(A.1D(L(\'2Z\',I),[s,0,M,{1I:\'47\'}])){18}}}F E=3P(A,7,O),6i=3d(A.Z(),7);8(7.6j){7.6j.1z($19,6i,E)}A.X(L(\'2D\',I),[M,E]);A.X(L(\'53\',I));J A};$.1P.1J.4m=1;$.1P.1J.4s={\'29\':O,\'3l\':M,\'1M\':M,\'2J\':O,\'2k\':\'1t\',\'G\':{\'2I\':0},\'1n\':{\'1G\':\'7k\',\'1j\':5A,\'2t\':O,\'2E\':O,\'5b\':O,\'3p\':\'55\',\'3k\':O}};$.1P.1J.6e={\'1e\':O,\'3j\':{\'3I\':\'\',\'6k\':\'7l\'},\'5f\':{\'4q\':\'7m\',\'6f\':\'7n\'},\'5h\':{}};$.1P.1J.5B=H(a,b){J\'<a 7o="#"><6l>\'+a+\'</6l></a>\'};H 23(d,e){J{1f:[],1j:d,4V:d,1G:e,2T:2x()}}H 2a(s){8(K s.1p==\'1o\'){2a(s.1p)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];8(!b)5g;8(b[3])b[0].4N();b[0].6m(b[1],{6n:b[2],1j:s.1j,1G:s.1G})}8(K s.1Q==\'1o\'){2a(s.1Q)}}H 3D(s,c){8(K c!=\'1s\')c=M;8(K s.1p==\'1o\'){3D(s.1p,c)}1m(F a=0,l=s.1f.V;a<l;a++){F b=s.1f[a];b[0].4N(M);8(c){b[0].16(b[1]);8(K b[2]==\'H\')b[2]()}}8(K s.1Q==\'1o\'){3D(s.1Q,c)}}H 3i(t){8(t.T)7p(t.T);J t}H 3L(b,t,c){8(b.V){1m(F a=0,l=b.V;a<l;a++){b[a].3K(t,c)}}J[]}H 7q(a,c,x,d,f){F o={\'1j\':d,\'1G\':a.1G};8(K f==\'H\')o.6n=f;c.6m({2i:x},o)}H 4T(a,b,c,o,d){F e=2A(4Y(b.Z(),o),o,M)[0],5i=2A(c.Z(),o,M)[0],4n=(d)?-5i:e,2G={},3t={};2G[o.d[\'S\']]=5i;2G[o.d[\'1t\']]=4n;3t[o.d[\'1t\']]=0;a.1p.1f.1q([b,{\'2i\':1}]);a.1Q.1f.1q([c,3t,H(){$(1g).1U()}]);c.16(2G);J a}H 4U(a,b,c,o,d,n){F e=2A(4Z(b.Z(),o,n),o,M)[0],5j=2A(c.Z(),o,M)[0],4n=(d)?-5j:e,2G={},3t={};2G[o.d[\'S\']]=5j;2G[o.d[\'1t\']]=0;3t[o.d[\'1t\']]=4n;a.1Q.1f.1q([c,3t,H(){$(1g).1U()}]);c.16(2G);J a}H 3O(o,t,c){8(t==\'3c\'||t==\'3b\'){F f=t}Q 8(o.G.3e>=t){1e(c,\'28 5M G: 7r 7s (\'+t+\' G, \'+o.G.3e+\' 5N).\');F f=\'3b\'}Q{F f=\'3c\'}F s=(f==\'3c\')?\'2y\':\'2R\',h=2q(\'2O\',c);8(o.T.Y)o.T.Y[f]()[s](h);8(o.17.Y)o.17.Y[f]()[s](h);8(o.1a.Y)o.1a.Y[f]()[s](h);8(o.1b.1C)o.1b.1C[f]()[s](h)}H 2X(o,f,c){8(o.1M||o.3l)J;F a=(f==\'2y\'||f==\'2R\')?f:O,4o=2q(\'7t\',c);8(o.T.Y&&a){o.T.Y[a](4o)}8(o.17.Y){F b=a||(f==0)?\'2R\':\'2y\';o.17.Y[b](4o)}8(o.1a.Y){F b=a||(f==o.G.P)?\'2R\':\'2y\';o.1a.Y[b](4o)}}H 3W(a,b){8(K b==\'H\')b=b.1z(a);8(K b==\'1y\')b={};J b}H 3B(a,b,c){8(K c!=\'1k\')c=\'\';b=3W(a,b);8(K b==\'1k\'){F d=5k(b);8(d==-1)b=$(b);Q b=d}8(c==\'1b\'){8(K b==\'1s\')b={\'44\':b};8(K b.3o!=\'1y\')b={\'1C\':b};8(K b.1C==\'H\')b.1C=b.1C.1z(a);8(K b.1C==\'1k\')b.1C=$(b.1C);8(K b.G!=\'13\')b.G=O}Q 8(c==\'T\'){8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'1s\')b={\'1H\':b};8(K b==\'13\')b={\'3g\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y)}Q{8(K b.3o!=\'1y\')b={\'Y\':b};8(K b==\'13\')b={\'2F\':b};8(K b.Y==\'H\')b.Y=b.Y.1z(a);8(K b.Y==\'1k\')b.Y=$(b.Y);8(K b.2F==\'1k\')b.2F=5k(b.2F)}J b}H 3n(a,b,c,d,e){8(K a==\'1k\'){8(2p(a))a=$(a);Q a=2o(a)}8(K a==\'1o\'){8(K a.3o==\'1y\')a=$(a);a=e.Z().68(a);8(a==-1)a=0;8(K c!=\'1s\')c=O}Q{8(K c!=\'1s\')c=M}8(2p(a))a=0;Q a=2o(a);8(2p(b))b=0;Q b=2o(b);8(c){a+=d.11}a+=b;8(d.U>0){22(a>=d.U){a-=d.U}22(a<0){a+=d.U}}J a}H 4a(i,o,s){F t=0,x=0;1m(F a=s;a>=0;a--){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](M):0;8(t>o.3z)J x;8(a==0)a=i.V;x++}}H 6a(i,o,s){J 5l(i,o.G.1v,o.G.12.42,s)}H 5R(i,o,s,m){J 5l(i,o.G.1v,m,s)}H 5l(i,f,m,s){F t=0,x=0;1m(F a=s,l=i.V-1;a>=0;a--){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==0)a=i.V}}H 4R(a,o){J o.G.12.42||a.Z().1c(0,o.G.P).1v(o.G.1v).V}H 2P(i,o,s){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){F j=i.1O(a);t+=(j.1W(\':P\'))?j[o.d[\'26\']](M):0;8(t>o.3z)J x;x++;8(x==l)J x;8(a==l)a=-1}}H 4X(i,o,s,l){F v=2P(i,o,s);8(!o.1M){8(s+v>l)v=l-s}J v}H 3A(i,o,s){J 5m(i,o.G.1v,o.G.12.42,s,o.1M)}H 5Y(i,o,s,m){J 5m(i,o.G.1v,m+1,s,o.1M)-1}H 5m(i,f,m,s,c){F t=0,x=0;1m(F a=s,l=i.V-1;a<=l;a++){x++;8(x==l)J x;F j=i.1O(a);8(j.1W(f)){t++;8(t==m)J x}8(a==l)a=-1}}H 3d(i,o){J i.1c(0,o.G.P)}H 5T(i,o,n){J i.1c(n,o.G.12.2m+n)}H 5U(i,o){J i.1c(0,o.G.P)}H 4Y(i,o){J i.1c(0,o.G.12.2m)}H 4Z(i,o,n){J i.1c(n,o.G.P+n)}H 1N(i,o,m){F x=(K m==\'1s\')?m:O;8(K m!=\'13\')m=0;i.1K(H(){F j=$(1g);F t=2o(j.16(o.d[\'1E\']));8(2p(t))t=0;j.1r(\'6o\',t);j.16(o.d[\'1E\'],((x)?j.1r(\'6o\'):m+j.1r(\'1R\')))})}H 3P(a,o,p){F b=a.3a(),$i=a.Z(),$v=3d($i,o),4p=4g(2A($v,o,M),o,p);b.16(4p);8(o.1u){F p=o.1i,r=p[o.d[1]];8(o.1B){8(r<0)r=0}F c=$v.2Y();c.16(o.d[\'1E\'],c.1r(\'1R\')+r);a.16(o.d[\'2L\'],p[o.d[0]]);a.16(o.d[\'1t\'],p[o.d[3]])}a.16(o.d[\'S\'],4p[o.d[\'S\']]+(3m($i,o,\'S\')*2));a.16(o.d[\'1l\'],5n($i,o,\'1l\'));J 4p}H 2A(i,o,a){F b=3m(i,o,\'S\',a),6p=5n(i,o,\'1l\',a);J[b,6p]}H 5n(i,o,a,b){8(K b!=\'1s\')b=O;8(K o[o.d[a]]==\'13\'&&b)J o[o.d[a]];8(K o.G[o.d[a]]==\'13\')J o.G[o.d[a]];F c=(a.5o().32(\'S\')>-1)?\'26\':\'2K\';J 3w(i,o,c)}H 3w(i,o,b){F s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F m=(j.1W(\':P\'))?j[o.d[b]](M):0;8(s<m)s=m}J s}H 36(b,o,c){8(!b.1W(\':P\'))J 0;F d=b[o.d[c]](),5p=(o.d[c].5o().32(\'S\')>-1)?[\'7u\',\'7v\']:[\'7w\',\'7x\'];1m(F a=0,l=5p.V;a<l;a++){F m=2o(b.16(5p[a]));d-=(2p(m))?0:m}J d}H 3m(i,o,b,c){8(K c!=\'1s\')c=O;8(K o[o.d[b]]==\'13\'&&c)J o[o.d[b]];8(K o.G[o.d[b]]==\'13\')J o.G[o.d[b]]*i.V;F d=(b.5o().32(\'S\')>-1)?\'26\':\'2K\',s=0;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);s+=(j.1W(\':P\'))?j[o.d[d]](M):0}J s}H 4v(i,o,b){F s=O,v=O;1m(F a=0,l=i.V;a<l;a++){F j=i.1O(a);F c=(j.1W(\':P\'))?j[o.d[b]](M):0;8(s===O)s=c;Q 8(s!=c)v=M;8(s==0)v=M}J v}H 5y(i,o,d){J i[o.d[\'7y\'+d]](M)-36(i,o,\'7z\'+d)}H 3Y(x){J(K x==\'1k\'&&x.1c(-1)==\'%\')}H 3Z(s,o){8(3Y(o)){o=o.1c(0,-1);8(2p(o))J s;s*=o/3G}J s}H L(n,c,a,b,d){8(K a!=\'1s\')a=M;8(K b!=\'1s\')b=M;8(K d!=\'1s\')d=O;8(a)n=c.3j.3I+n;8(b)n=n+\'.\'+c.3j.6k;8(b&&d)n+=c.4m;J n}H 2q(n,c){J(K c.5h[n]==\'1k\')?c.5h[n]:n}H 4g(a,o,p){8(K p!=\'1s\')p=M;F b=(o.1u&&p)?o.1i:[0,0,0,0];F c={};c[o.d[\'S\']]=a[0]+b[1]+b[3];c[o.d[\'1l\']]=a[1]+b[0]+b[2];J c}H 2U(c,d){F e=[];1m(F a=0,6q=c.V;a<6q;a++){1m(F b=0,6r=d.V;b<6r;b++){8(d[b].32(K c[a])>-1&&K e[b]==\'1y\'){e[b]=c[a];18}}}J e}H 5z(p){8(K p==\'1y\')J[0,0,0,0];8(K p==\'13\')J[p,p,p,p];Q 8(K p==\'1k\')p=p.3u(\'7A\').6s(\'\').3u(\'7B\').6s(\'\').3u(\' \');8(!31(p)){J[0,0,0,0]}1m(F i=0;i<4;i++){p[i]=2o(p[i])}1x(p.V){W 0:J[0,0,0,0];W 1:J[p[0],p[0],p[0],p[0]];W 2:J[p[0],p[1],p[0],p[1]];W 3:J[p[0],p[1],p[2],p[1]];2w:J[p[0],p[1],p[2],p[3]]}}H 43(a,o){F x=(K o[o.d[\'S\']]==\'13\')?1L.2v(o[o.d[\'S\']]-3m(a,o,\'S\')):0;1x(o.1B){W\'1t\':J[0,x];W\'2M\':J[x,0];W\'4x\':2w:J[1L.2v(x/2),1L.3x(x/2)]}}H 4b(x,o,a,b){F v=x;8(K a==\'H\'){v=a.1z(b,v)}Q 8(K a==\'1k\'){F p=a.3u(\'+\'),m=a.3u(\'-\');8(m.V>p.V){F c=M,5q=m[0],2H=m[1]}Q{F c=O,5q=p[0],2H=p[1]}1x(5q){W\'7C\':v=(x%2==1)?x-1:x;18;W\'7D\':v=(x%2==0)?x-1:x;18;2w:v=x;18}2H=2o(2H);8(!2p(2H)){8(c)2H=-2H;v+=2H}}8(K v!=\'13\')v=1;8(v<1)v=1;J v}H 2Q(x,o,a,b){J 4y(4b(x,o,a,b),o.G.12)}H 4y(v,i){8(K i.2N==\'13\'&&v<i.2N)v=i.2N;8(K i.27==\'13\'&&v>i.27)v=i.27;8(v<1)v=1;J v}H 4E(s){8(!31(s))s=[[s]];8(!31(s[0]))s=[s];1m(F j=0,l=s.V;j<l;j++){8(K s[j][0]==\'1k\')s[j][0]=$(s[j][0]);8(K s[j][1]!=\'1s\')s[j][1]=M;8(K s[j][2]!=\'1s\')s[j][2]=M;8(K s[j][3]!=\'13\')s[j][3]=0}J s}H 5k(k){8(k==\'2M\')J 39;8(k==\'1t\')J 37;8(k==\'4u\')J 38;8(k==\'6b\')J 40;J-1}H 4W(n,v){8(n)3T.2n=n+\'=\'+v+\'; 7E=/\'}H 6g(n){n+=\'=\';F b=3T.2n.3u(\';\');1m(F a=0,l=b.V;a<l;a++){F c=b[a];22(c.7F(0)==\' \'){c=c.1c(1)}8(c.32(n)==0){J c.1c(n.V)}}J 0}H 3q(p){8(p&&K p==\'1k\'){F i=(p.32(\'7G\')>-1)?M:O,r=(p.32(\'2W\')>-1)?M:O}Q{F i=r=O}J[i,r]}H 59(a){J(K a==\'13\')?a:2b}H 31(a){J K(a)==\'1o\'&&(a 64 7H)}H 2x(){J 7I 7J().2x()}H 1e(d,m){8(K d==\'1o\'){F s=\' (\'+d.3U+\')\';d=d.1e}Q{F s=\'\'}8(!d)J O;8(K m==\'1k\')m=\'1J\'+s+\': \'+m;Q m=[\'1J\'+s+\':\',m];8(3r.5r&&3r.5r.6t)3r.5r.6t(m);J O}$.1P.65=H(o,c){J 1g.1J(o,c)};$.25($.1G,{\'7K\':H(t){F a=t*t;J t*(-a*t+4*a-6*t+4)},\'7L\':H(t){J t*(4*t*t-9*t+6)},\'7M\':H(t){F a=t*t;J t*(33*a*a-7N*a*t+7O*a-67*t+15)}})})(7P);',62,486,'|||||||opts|if|||||||||||||||||||||||||||||||||var|items|function|conf|return|typeof|cf_e|true|itms|false|visible|else|scrl|width|auto|total|length|case|trigger|button|children||first|visibleConf|number|bind||css|prev|break|tt0|next|pagination|slice|variable|debug|anims|this|stopPropagation|padding|duration|string|height|for|scroll|object|pre|push|data|boolean|left|usePadding|filter|a_dur|switch|undefined|call|wrp|align|container|triggerHandler|marginRight|tmrs|easing|play|fx|carouFredSel|each|Math|circular|sz_resetMargin|eq|fn|post|cfs_origCssMargin|isScrolling|c_new|remove|queu|is|isPaused|clbk|isStopped|stopImmediatePropagation|onAfter|while|sc_setScroll|unbind|extend|outerWidth|max|Not|synchronise|sc_startScroll|null|l_cur|l_old|w_siz|onBefore|crossfade|uncover|opacity|preventDefault|direction|adjust|old|cookie|parseInt|isNaN|cf_c|c_old|pR|pauseOnHover|opts_orig|ceil|default|getTime|removeClass|l_new|ms_getSizes|fade|cover|updatePageStatus|mousewheel|key|css_o|adj|start|responsive|outerHeight|top|right|min|hidden|gn_getVisibleItemsNext|cf_getItemsAdjust|addClass|pause|startTime|cf_sortParams|scrolling|resume|nv_enableNavi|last|slideTo||is_array|indexOf||_cfs_triggerEvent|innerWidth|ms_getTrueInnerSize||||parent|hide|show|gi_getCurrentItems|minimum|anchorBuilder|pauseDuration|Carousel|sc_clearTimers|events|queue|infinite|ms_getTotalSize|gn_getItemIndex|jquery|event|bt_pauseOnHoverConfig|window|ns2|ani_o|split|currentPosition|ms_getTrueLargestSize|floor|of|maxDimention|gn_getVisibleItemsNextFilter|go_getNaviObject|position|sc_stopScroll|timePassed|perc|100|dur2|prefix|appendTo|apply|sc_callCallbacks|currentPage|before|nv_showNavi|sz_setSizes|vI|touchwipe|wN|document|selector|_cfs_init|go_getObject|marginBottom|ms_isPercentage|ms_getPercentage||to|org|cf_getAlignPadding|keys|pauseOnEvent|Number|none|stopped||gn_getVisibleItemsPrev|cf_getAdjust|onEnd|clone|orgW|isHidden|cf_mapWrapperSizes|get|end|eval|mouseenter|mouseleave|serialNumber|cur_l|di|sz|element|cfs_isCarousel|defaults|upDateOnWindowResize|up|ms_hasVariableSizes|valid|center|cf_getItemAdjustMinMax|seco|nw|bottom|delay|pauseOnResize|cf_getSynchArr|scrolled|backward|textAlign|float|marginTop|marginLeft|absolute|_cfs_unbind_events|stop|finish|type|conditions|gn_getVisibleOrg|not|fx_cover|fx_uncover|orgDuration|cf_setCookie|gn_getVisibleItemsNextTestCircular|gi_getOldItemsNext|gi_getNewItemsNext||slideToPage|updateSizes|linkAnchors|_cfs_bind_buttons|click|_cfs_unbind_buttons|mousewheelPrev||bt_mousesheelNumber|mousewheelNext|wipe|_windowWidth|_windowHeight|ns3|wrapper|continue|classnames|new_w|old_w|cf_getKeyCode|gn_getItemsPrevFilter|gn_getItemsNextFilter|ms_getLargestSize|toLowerCase|arr|sta|console|No|destroy|innerHeight|dx|Set|secp|ms_getPaddingBorderMargin|cf_getPadding|500|pageAnchorBuilder|Item|forward|_cfs_build|fixed|cfs_origCss|_cfs_bind_events|paused|onPausePause|onPauseEnd|onPauseStart|enough|needed|page|slide_|configuration|gn_getScrollItemsPrevFilter|Scrolling|gi_getOldItemsPrev|gi_getNewItemsPrev|directscroll|concat|shift|gn_getScrollItemsNextFilter|new_m|jumpToStart|after|append|removeItem|instanceof|caroufredsel|hash||index|selected|gn_getVisibleItemsPrevFilter|down|keyup|keyCode|configs|classname|cf_readCookie|random|itm|onCreate|namespace|span|animate|complete|cfs_tempCssMargin|s2|l1|l2|join|log|found|the|Infinity|Width|caroufredsel_cookie_|attr|id|2500|Available|widths|heights|automatically|relative|overflow|setTimeout|or|Page|resumed|currently|Callback|returned|slide_prev|prependTo|slide_next|prevPage|nextPage|prepend|carousel|insertItem|add|detach|round|currentVisible|body|find|Preventing|non|sliding|replaceWith|min_move_x|min_move_y|preventDefaultEvents|wipeUp|wipeDown|wipeLeft|wipeRight|resize|timer|wrap|class|unshift|location|swing|cfs|div|caroufredsel_wrapper|href|clearTimeout|fx_fade|hiding|navigation|disabled|paddingLeft|paddingRight|paddingTop|paddingBottom|outer|inner|px|em|even|odd|path|charAt|immediate|Array|new|Date|quadratic|cubic|elastic|106|126|jQuery'.split('|'),0,{}))

// =============

var hoverOut;
var showSub = 0;

/* Второй уровень навигации */
var topMenuAnimator = {
	submenu:function(){
		var $this;
		if($("header menu > li").hasClass("active") && $("header menu > li.active ul").length){
			showSub = 1;
			$("header .submenu").show();
		}
		$('header menu > li').mouseenter(function(){
			$this  = $(this);
			clearTimeout(hoverOut);
			var submenu = $(this).find("ul");
			$('header menu > li ul:visible').not($(this).find('ul')).hide();
			if (whatScroll()>0 || showSub == 0){
				$("header .submenu").slideDown(100);
			}
			submenu.fadeIn(100)
		});
		$('header menu > li').mouseleave(function(){
			$this  = $(this);

			hoverOut = setTimeout(function(){
				if(whatScroll()>0 || showSub == 0){
					$("header .submenu").slideUp(100);
					$('header menu > li ul:visible').hide();
				} else {
					if(!$this.hasClass("active")){
						$('header menu > li ul:visible').hide(10, function(){
							$('header menu > li.active ul').fadeIn(100);
						});
					}
				}
			},500)
		});
	}
};
$(window).scroll(function(){

	if(whatScroll()==0 && showSub == 1)
	{
		$('header menu > li.active ul').fadeIn(100);
		$("header .submenu").slideDown(100);
	} else {
		$('header menu > li ul:visible').fadeOut(100);
		$("header .submenu").slideUp(100);
	}
});
$(function(){
	if ($('input[placeholder], textarea[placeholder]').length != 0) {
		$('input[placeholder], textarea[placeholder]').placeholder();
	}
	topMenuAnimator.submenu();
	var els = $('.spyobj');
	if (document.getElementById('menu2line') && ($('#menu2line > ul.nav').length>0 || els.length>0)) {$('header').addClass('normal2lines');};
	if (els.length){
		var s = '<ul id="spyul" class="nav">';
		for (var i=0,l=els.length;i<l;i++){
			s+= '<li><a href="#'+els[i].id+'">'+$(els[i]).data('blocktitle')+'</a></li>'
		}
		s+='</ul>';
		$('#navspybar').html(s);
		$('#navspybar ul').find('a').click(function(e){
			e.preventDefault();
			var scrollToId = $(this).attr('href');
			var reg = /^.*#(.*)$/i;
			var regArr = reg.exec(scrollToId);
			var newTop = $('#'+regArr[1]).offset().top-100;
			if (document.getElementById('fourcolbar')) newTop-=40;
			if (newTop<0) newTop=0;
			$(document).scrollTo(newTop,500,{easing:'easeInOutCubic'});
			return false;

		});
	}
});

/* Убираем фокус */
$(function(){
	setTimeout(f_setblur, 100);
});

function f_setblur()
{
	if ($('html').hasClass('lt-ie9')){
		$('.ui-slider-handle, .button a')
		.focus(function(){this.blur()});
	};
}

/* Кнопки */
$(function(){
	$('.button a')
	.mouseenter(function(){$(this).closest('.button').addClass('hovered')})
	.mouseleave(function(){$(this).closest('.button').removeClass('hovered pressed')})
	.mousedown(function(){$(this).closest('.button').addClass('pressed')})
	.mouseup(function(){$(this).closest('.button').removeClass('pressed')});
});

/* Селекторы */
$(function(){
	var els = $('.select');
	if (els.length>0) $(els).ikSelect();
});

/* Прокручивающие ссылки */
$(function(){
	$('a.scrollto').click(function(e){
		e.preventDefault();
		var scrollToId = $(this).attr('href');
		var reg = /^.*#(.*)$/i;
		var regArr = reg.exec(scrollToId);
		var newTop = $('#'+regArr[1]).offset().top-100;
		//if (document.getElementById('fourcolbar')) newTop-=40;
		if (newTop<0) newTop=0;
		$(document).scrollTo(newTop,500,{easing:'easeInOutCubic'});
		return false;
	});
});

/* Слайдеры */
var g_slidertooltip_h;
$(function(){
	var el = document.getElementById('fourcolbar');
	if (el){
		f_fourcolbar_fix();
		$(window).scroll(function(e){
			f_fourcolbar_fix();
			$('.b-slider-wrap2 .ui-slider-handle').tooltip('hide');
		});
	};
	$(".b-slider-wrap2 .b-slider").each(function(){
		$(this).mouseenter(function(){
			$('#fourcolbar').data('selsldnum', String(this.id).substr(String(this.id).length-1));
			f_glassArr_set();
		});
		var v = Number($(this).find('input').val());
		$(this).slider({
			range: "min",
			value: v,
			min: 0,
			max: 4,
			change: function(e,ui){
				if (ui.value<1){
					$('.b-slider-wrap2 .ui-slider-handle').tooltip('hide');
					setTimeout("$('#"+this.id+"').slider('value',1);", 50);
					setTimeout("$('#"+this.id+" .ui-slider-handle').tooltip('show');", 100);
					clearTimeout(g_slidertooltip_h);
					g_slidertooltip_h = setTimeout("$('#"+this.id+" .ui-slider-handle').tooltip('hide');", 3000);
				}
				else{
					$(this).find('.ui-slider-handle').tooltip('hide');
					$(this).find('input').val(ui.value);
					$('#fourcolbar').data('selsldnum', String(this.id).substr(String(this.id).length-1));
					f_glass_rebuild();
				};
			}
		});
		var t = $(this).data('original-title');
		if (t) $(this).find('.ui-slider-handle').attr('data-original-title',t).tooltip({'trigger':'manual'});
	});
});

function f_fourcolbar_fix()
{
	if (document.documentElement) var top = document.documentElement.scrollTop;
	if (document.body && document.body.scrollTop>document.documentElement.scrollTop) var top = document.body.scrollTop;
	var el = document.getElementById('fourcolbar');
	if (top>140) $(el).addClass('fixed');
	else $(el).removeClass('fixed');
}

/* Стёкла */
var g_calc;
var g_calc_res;
$(function(){
	if (typeof Calc !== 'undefined' && $('#confform').length > 0){
		g_calc = new Calc($('#confform'), price);
		g_calc_res = g_calc.recalc();
		f_glass_set();
		f_glassArr_set();
	}
});

var g_glass_rebuild_h = 0;
function f_glass_rebuild()
{
	clearTimeout(g_glass_rebuild_h);
	g_glass_rebuild_h = setTimeout(f_glass_rebuildGo, 100);
}

var g_glass_inanim = false;
function f_glass_rebuildGo()
{
	g_calc_res = g_calc.recalc();
	if ($('#lconname').data('lcon-name') != g_calc_res.pkg[0])
	{
		f_glassInf_set();
		$('#lsandArr').hide();
		var t = 500;
		g_glass_inanim = true;
		for (var i=1,l=6;i<l;i++){
			var v = (l/2-i)/l*2;
			v = Math.round(v*200);
			$('#lsand'+i)
			.stop(true,true)
			.animate({opacity:0.0,marginLeft:'-='+v+'px'},t,
				function(){
					if (this.id=='lsand1') f_glass_set();
					$(this).stop(true,true).animate({opacity:1.0,marginLeft:0},t,
						function(i){
							if (this.id=='lsand1')
							{
								g_glass_inanim = false;
								f_glassArr_set();
							}
						}
					);
				}
			);
		}
	}
	else f_glassArr_set();
}

function f_glass_set()
{
	f_glassInf_set();
	var arr = g_calc_res.sandwich;
	var n_s = 0;
	var n_lr = Math.round(arr.length/2);
	for (var i=1;i<6;i++){
		var el = document.getElementById('lsand'+i);
		if (arr[i-1])
		{
			el.style.display='';
			var s_cl = 'layer l-'+arr[i-1];
			if (i>n_lr) {s_cl+='-left';}
			else {s_cl+='-right';}
			el.className = s_cl;
			$(el).css('left',String(n_s)+'px');
			n_s += $(el).width() - 119;
			$(el).find('.lsand_h')
			.css({marginTop:String($(el).height()-5)+'px', marginLeft:String(Math.round(($(el).width()-119)/2)+19)+'px'})
			.attr('data-original-title', g_calc_res.sandwichLabels[arr[i-1]]);
		}
		else el.style.display='none';
	}
	$('#lsandbar').data('lsandwdt', n_s);
	$('#lsandbar .lsand_h').tooltip();
}

function f_glassInf_set(doesnot_wnd_finprice)
{
	// alert('f_glassInf_set');
	$('#lconname').html(g_calc_res.pkg[0]).data('lcon-name',g_calc_res.pkg[0]);
	$('#lconprice').html(priceFormat(g_calc_res.fullPkgPrice));
	$('#lcon1').html(g_calc_res.pkg.texts.desc);
	$('#lcon2').html(g_calc_res.pkg.texts.tech);
	$('#lcon3').html(g_calc_res.pkg.texts.usage);
	if ( ! doesnot_wnd_finprice) {
		/* f_wnd_finprice(); */
	}
}

function f_glassArr_set()
{
	if (!g_glass_inanim)
	{
		var r_post = ['warm','sun','noise','sec'];
		var n_idx = Number($('#fourcolbar').data('selsldnum'));
		if (isNaN(n_idx)) n_idx=1;
		var s = g_calc_res.pkg[0];
		var s_cl = 'arr '+'ar-'+String(s).substr(5)+'-'+r_post[n_idx-1];
		var el = document.getElementById('lsandArr');
		if (s_cl !== el.className)
		{
			$(el).hide();
			el.className = s_cl;
			el.style.left = String(parseInt((Number($('#lsandbar').data('lsandwdt'))-484+100.5)/2))+'px';
			$(el).fadeIn(100);
		}
		else el.style.left = String(parseInt((Number($('#lsandbar').data('lsandwdt'))-484+100.5)/2))+'px';
	};
}

/* Подсказки по клику */
$(function(){
	var els = $('div.tooltip2');
	if (els.length>0)
	{
		$('body').click(function(){
			$(els).fadeOut();
		});
		$(els).click(function(e){
			e.stopPropagation();
		});
		$('span.tooltip_x').click(function()
		{
			$(els).fadeOut();
		});
		$('.openEngPopup').click(function(){
			els.fadeIn();
			els.find(".form_form").css({"display":"block"});
			els.find(".message").hide();
			els.find("input[type='text']").attr("value","");
			els.find('.button').show();
			els.find('.loading').hide();
			return false;
		});
	}
	var popup = $('.recallpopup');
	if (popup.length>0)
	{
		$('body').click(function(){
			$(popup).fadeOut();
		});
		$(popup).click(function(e){
			e.stopPropagation();
		});
		$('span.tooltip_x').click(function(){
			$(popup).fadeOut();
		});
	}
	$('.online-btn').click(function(){
		$(".popup").css({"position":"fixed"});
		popup.fadeIn();
		popup.css({"top":"","left":""});
		popup.find(".form_form").css({"display":"block"});
		popup.find(".message").hide();

		popup.find('.button').show();
		popup.find('.loading').hide();
		if (!$("html.lt-ie9").length){
			popup.find('input[type="text"]').attr("value","");
		} else {
			popup.find('input[placeholder], textarea[placeholder]').placeholder();
		}
		return false;
	});

	$('.openPopupReCall').click(function(){
		$('.online-btn').click();
		popup.css({"top": "530px", "left": "508px"});
		$(".popup").css({"position":"absolute"});
		return false;
	});
	$('.openPopupReCall2').click(function(){
		$('.online-btn').click();
		popup.css({"top": "530px", "left": "30px"});
		$(".popup").css({"position":"absolute"});
		return false;
	});
});

/* Выбор типа окна */
$(function(){
	if (document.getElementById('wndtypeinp')){
		/* $('#wndopt_houseType, #wndopt_innserSill, #wndopt_outerSill, #wndopt_jambHead, #wndopt_mosquitoNets').change(function(){f_wnd_finprice();}).click(function(){f_wnd_finprice();}); */
		$('#wndtypebar .wndtype').each(function(i0){
			var sel = $(this).find('.wndtype_sel')[0];
			$(sel).click(function(e){
				e.stopPropagation();
				$('div.tooltip2').fadeOut();
				$(this).closest('.wndtype').find('div.tooltip2').fadeIn();
			});
			var w = $(sel).width();
			var s_bgpY = String($(sel).css('background-position')).split(' ')[1];
			if (!s_bgpY) {var s_bgpY=$(sel).css('backgroundPositionY')};
			$(this).find('.tooltip-inner span').each(function(i){
				this.className = 'wndtype_i'+String(i0+1)+' wndtype_i'+String(i0+1)+String(i+1);
				$(this).css('background-position','-'+String((w+5)*i)+'px '+s_bgpY)
				.click(function(){
					f_wndtype_set(String(i0+1)+String(i+1));
					$('div.tooltip2').fadeOut();
				});
			});
		});
		f_wndtype_set();
	};
});

function f_wndtype_set(val)
{
	var el_inp = document.getElementById('wndtypeinp');
	if (val) {el_inp.value = val}
	else {var val = el_inp.value}
	g_calc_res = g_calc.recalc();

	var n_1 = Number(String(val).substr(0,1));
	var n_2 = Number(String(val).substr(1,2));
	var el_sel0 = $('#wndtypebar .wndtype_selO').removeClass('active')[n_1-1];
	$('#wndtypebar .tooltip-inner span').removeClass('active');
	var el_sel = $(el_sel0).closest('.wndtype').find('.tooltip-inner span').eq(n_2-1);
	$(el_sel).addClass('active')
	$(el_sel0).addClass('active')
	.find('.wndtype_sel').css({
		'background-position':$(el_sel).css('background-position'),
		'width':$(el_sel).width()+'px'
	});
	var el_wi = document.getElementById('wndtw');
	el_wi.className = 'wndtw'+n_1+' wndtw'+n_1+'-'+n_2;
	var n_mb = 0;
	var n_mr = 0;
	var n_l = 0;
	var n_w = $(el_wi).width();
	var n_h = $(el_wi).height();
	if (n_1==1) {n_l=81; n_w-=161; n_h-=59;};
	if (n_1==2) {n_l=17; n_w-=31; n_h-=59; n_mr=-30;};
	if (n_1==3) {n_l=13; n_w-=23; n_h-=59; n_mr=-30;};
	if (n_1==5) {n_w-=11; n_mb=-30; n_mr=-30;};
	if (n_1==6) {n_l=14; n_w-=26; n_h-=59; n_mr=-30;};
	$("#wndtw_b")
	.css({marginBottom:n_mb+'px'});
	$("#wndtw_r")
	.css({marginRight:n_mr+'px'});

	var maxW = g_calc_res.matrix.getWidthRange().max;
	var minW = g_calc_res.matrix.getWidthRange().min;
	var valW = Number(document.getElementById('wndsize1').value) || 0;
	if (valW > maxW) valW = maxW;
	if (valW < minW) valW = minW;
	var maxH = g_calc_res.matrix.getHeightRange().max;
	var minH = g_calc_res.matrix.getHeightRange().min;
	var valH = Number(document.getElementById('wndsize2').value) || 0;
	if (valH > maxH) valH = maxH;
	if (valH < minH) valH = minH;

	$("#wndtw_bIn")
	.css({left:n_l+'px',width:n_w+'px'})
	.slider({
		min:minW,
		max:maxW,
		value:valW,
		step: 50,
		slide: function(e, ui){
			var el = document.getElementById('wndtw_bT');
			if (el.innerText) {el.innerText = ui.value+' мм';}
			else {el.textContent = ui.value+' мм';}
			document.getElementById('wndsize1').value = ui.value;
			/* f_wnd_finprice(); */
		}
	});

	$("#wndtw_rIn")
	.css({height:n_h+'px'})
	.slider({
		orientation:'vertical',
		min:minH,
		max:maxH,
		value:valH,
		step:10,
		slide: function(e, ui){
			var el = document.getElementById('wndtw_rT');
			if (el.innerText) {el.innerText = ui.value+' мм';}
			else {el.textContent = ui.value+' мм';}
			document.getElementById('wndsize2').value = ui.value;
			/* f_wnd_finprice(); */
		}
	});

	$("#wndtw_bIn .ui-slider-handle").html('<span id="wndtw_bT">0 мм</span>');
	$("#wndtw_rIn .ui-slider-handle").html('<span id="wndtw_rT">0 мм</span>');
	$('#wndtw_bIn .ui-slider-handle span').html(valW+' мм');
	document.getElementById('wndsize1').value = valW;
	$('#wndtw_rIn .ui-slider-handle span').html(valH+' мм');
	document.getElementById('wndsize2').value = valH;

	/* f_wnd_finprice(); */
}

/* Общая стоимость */
var g_wnd_finprice_h = 0;
function f_wnd_finprice()
{
	clearTimeout(g_wnd_finprice_h);
	g_wnd_finprice_h = setTimeout(f_wnd_finpriceGo, 50);
}

function f_wnd_finpriceGo()
{
	g_calc_res = g_calc.recalc();
	f_glassInf_set(true);
	var pr = g_calc_res.sumPrice;
	if (!pr)
	{
		if (!$('#typebar').hasClass('sizeerr'))
		{
			$('#lconprice2add').hide();
			$('#lconprice2').html('--------------');
			$('#typebar').addClass('sizeerr');
		};
	}
	else
	{
		if ($('#typebar').hasClass('sizeerr'))
		{
			$('#lconprice2add').show();
			$('#typebar').removeClass('sizeerr');
		};
		$('#lconprice2').html(priceFormat(pr));
	};
	document.getElementById('wndopt_mosquitoNets').disabled = !g_calc_res.needMosquitoNets;
}

/* Выбор profile */
$(function(){
	var bar = document.getElementById('frameProfileBar');
	if (bar){
		$('#frameProfile, #frameProfile_lbl').click(function(e){
			e.stopPropagation();
			$('div.tooltip2').fadeOut();
			$('#frameProfileBar').fadeIn();
		});
		var n_act = Number(document.getElementById('wndopt_frameProfile').value);
		var n_c = Number($(bar).data('framescnt'));
		var s = '';
		for (var i=0;i<n_c;i++){
			s+='<span style="background-position:-'+(i*110)+'px 0;"></span>';
		}
		var barIn = $(bar).find('.tooltip-inner')[0];
		$(barIn).html(s);
		var els = $(barIn).find('span');
		els.eq(n_act).addClass('active').end().click(function(){
			var idx = els.removeClass('active').index(this);
			document.getElementById('wndopt_frameProfile').value = idx;
			$(this).addClass('active');
			f_wndprof_sel(idx);
			$('div.tooltip2').fadeOut();
			/* f_wnd_finprice(); */
		});
		f_wndprof_sel(n_act);
	}
});

function f_wndprof_sel(idx)
{
	var bar = document.getElementById('frameProfile');
	$(bar).find('span').css({backgroundPosition: (-2-idx*110)+'px -2px'});
	if (idx>=0) {$(bar).addClass('active');}
	else {$(bar).removeClass('active');}
}
/* Выбор подоконника*/

$(function(){
	var bar = document.getElementById('framePodokonnikBar');
	if (bar){
		$('#framePodokonnik, #framePodokonnik_lbl').click(function(e){
			e.stopPropagation();
			$('div.tooltip2').fadeOut();
			$('#framePodokonnikBar').fadeIn();
		});
		var n_act = Number(document.getElementById('wndopt_framePodokonnik').value);
		var n_c = Number($(bar).data('framescnt'));
		var s = '';
		for (var i=0;i<n_c;i++){
			s+='<span style="background-position:-'+(i*110)+'px 0;"></span>';
		}
		var barIn = $(bar).find('.tooltip-inner')[0];
		$(barIn).html(s);
		var els = $(barIn).find('span');
		els.eq(n_act).addClass('active').end().click(function(){
			var idx = els.removeClass('active').index(this);
			document.getElementById('wndopt_framePodokonnik').value = idx;
			$(this).addClass('active');
			f_wndPodokonnik_sel(idx);
			$('div.tooltip2').fadeOut();
			/* f_wnd_finprice(); */
		});
		f_wndPodokonnik_sel(n_act);
	}
});

function f_wndPodokonnik_sel(idx)
{
	var bar = document.getElementById('framePodokonnik');
	$(bar).find('span').css({backgroundPosition: (-2-idx*110)+'px -2px'});
	if (idx>=0) {$(bar).addClass('active');}
	else {$(bar).removeClass('active');}
}
/* Выбор отлива  */

$(function(){
	var bar = document.getElementById('frameOtlivBar');
	if (bar){
		$('#frameOtliv, #frameOtliv_lbl').click(function(e){
			e.stopPropagation();
			$('div.tooltip2').fadeOut();
			$('#frameOtlivBar').fadeIn();
		});
		var n_act = Number(document.getElementById('wndopt_frameOtliv').value);
		var n_c = Number($(bar).data('framescnt'));
		var s = '';
		for (var i=0;i<n_c;i++){
			s+='<span style="background-position:-'+(i*110)+'px 0;"></span>';
		}
		var barIn = $(bar).find('.tooltip-inner')[0];
		$(barIn).html(s);
		var els = $(barIn).find('span');
		els.eq(n_act).addClass('active').end().click(function(){
			var idx = els.removeClass('active').index(this);
			document.getElementById('wndopt_frameOtliv').value = idx;
			$(this).addClass('active');
			f_wndOtliv_sel(idx);
			$('div.tooltip2').fadeOut();
			/* f_wnd_finprice(); */
		});
		f_wndOtliv_sel(n_act);
	}
});

function f_wndOtliv_sel(idx)
{
	var bar = document.getElementById('frameOtliv');
	$(bar).find('span').css({backgroundPosition: (-2-idx*110)+'px -2px'});
	if (idx>=0) {$(bar).addClass('active');}
	else {$(bar).removeClass('active');}
}
/*выбор москитной сетки  */

$(function(){
	var bar = document.getElementById('frameMoskitkaBar');
	if (bar){
		$('#frameMoskitka, #frameMoskitka_lbl').click(function(e){
			e.stopPropagation();
			$('div.tooltip2').fadeOut();
			$('#frameMoskitkaBar').fadeIn();
		});
		var n_act = Number(document.getElementById('wndopt_frameMoskitka').value);
		var n_c = Number($(bar).data('framescnt'));
		var s = '';
		for (var i=0;i<n_c;i++){
			s+='<span style="background-position:-'+(i*110)+'px 0;"></span>';
		}
		var barIn = $(bar).find('.tooltip-inner')[0];
		$(barIn).html(s);
		var els = $(barIn).find('span');
		els.eq(n_act).addClass('active').end().click(function(){
			var idx = els.removeClass('active').index(this);
			document.getElementById('wndopt_frameMoskitka').value = idx;
			$(this).addClass('active');
			f_wndMoskitka_sel(idx);
			$('div.tooltip2').fadeOut();
			/* f_wnd_finprice(); */
		});
		f_wndMoskitka_sel(n_act);
	}
});

function f_wndMoskitka_sel(idx)
{
	var bar = document.getElementById('frameMoskitka');
	$(bar).find('span').css({backgroundPosition: (-2-idx*110)+'px -2px'});
	if (idx>=0) {$(bar).addClass('active');}
	else {$(bar).removeClass('active');}
}

/* Выбор ламината */
$(function(){
	var bar = document.getElementById('frameColorBar');
	if (bar){
		$('#frameColorM, #frameColorM_lbl').click(function(e){
			e.stopPropagation();
			$('div.tooltip2').fadeOut();
			$('#frameColorBar').fadeIn();
		});
		var n_act = Number(document.getElementById('wndopt_frameColor').value);
		var n_c = Number($(bar).data('framescnt'));
		var s = '';
		for (var i=0;i<n_c;i++){
			s+='<span style="background-position:-'+(i*110)+'px 0;"></span>';
		}
		var barIn = $(bar).find('.tooltip-inner')[0];
		$(barIn).html(s);
		var els = $(barIn).find('span');
		els.eq(n_act).addClass('active').end().click(function(){
			var idx = els.removeClass('active').index(this);
			document.getElementById('wndopt_frameColor').value = idx;
			$(this).addClass('active');
			f_wndlam_sel(idx);
			$('div.tooltip2').fadeOut();
			/* f_wnd_finprice(); */
		});
		f_wndlam_sel(n_act);
	}
});

function f_wndlam_sel(idx)
{
	var bar = document.getElementById('frameColorM');
	$(bar).find('span').css({backgroundPosition: (-2-idx*110)+'px -2px'});
	if (idx>0) {$(bar).addClass('active');}
	else {$(bar).removeClass('active');}
}

/* Вызов инженера */
function f_getprof_show(e, el, val)
{
	if (e.stopPropagation) {e.stopPropagation();}
	else {e.cancelBubble = true;}
	if (document.getElementById('getprof').style.display!='block') {$('div.tooltip2').fadeOut();};
	document.getElementById('getprof_num').value = val;
	$('#getprof').css({left:($(el).offset().left-200)+'px', top:($(el).offset().top-250)+'px'}).fadeIn();

	$('form.form-ajax .form_form').show();
	if (!$("html.lt-ie9").length){
		$('form.form-ajax .form_form input[type="text"]').attr("value","");
	} else {
		$('input[placeholder], textarea[placeholder]').placeholder();
	}
	$('form.form-ajax .button').show();
	$('form.form-ajax .loading').hide();
	$('form.form-ajax .message').hide();


	return false;
}
$('form.form_callback').ajaxForm({
	//,url:			url				// override for form's 'action' attribute
	type:			'post'			// 'get' or 'post', override for form's 'method' attribute
	,dataType:		'json'			// 'xml', 'script', or 'json' (expected server response type)
	,success:		function(data, statusText, xhr, $form) {

		if (typeof(data.errors) !== 'object') {	// Не может такого быть
			return;
		}

		$form.find('.error').removeClass('error');
		if (data.errors.length <= 0) {	// Всё окей. Ошибок нет
			$form.find('.message').show();
			$form.find(".form_form").slideUp();

			if ( typeof wf_counter_event === 'function' ) {
				wf_counter_event('Visit_req');
			}

			//$form.find('.btn[type=submit]').removeAttr('disabled');

		} else {	// Форма заполнена с ошибками

			for (i in data.errors) {	// Каждому ошибочному полю показывает сообщение об ошибке.
				$form.find('[name="'+ i +'"]').addClass('error');
			}
			$form.find('.button').show();
			$form.find('.loading').hide();
		}

	},
	beforeSubmit: function (data, $form) {
		$form.find('.button').hide();
		$form.find('.loading').show();
	}
});
/* заказ звонка */
function f_call_reqest_show(e, el)
{
	if (e.stopPropagation) {e.stopPropagation();}
	else {e.cancelBubble = true;}
	if (document.getElementById('call_request').style.display!='block') {$('div.tooltip2').fadeOut();}
	$('#call_request').css({left:($(el).offset().left-200)+'px', top:($(el).offset().top-350)+'px'}).fadeIn();
/*
	$('form.form-ajax .form_form').show();
	$('form.form-ajax .form_form input[type="text"]').attr("value","");
	$('form.form-ajax .button').show();
	$('form.form-ajax .loading').hide();
	$('form.form-ajax .message').hide();*/

	return false;
}

/* Второй уровень навигации */
$(function(){
	var els = $('.spyobj');
	if (document.getElementById('menu2line') && ($('#menu2line > ul.nav').length>0 || els.length>0)) {$('header').addClass('normal2lines');};
	if (els.length>0){
		var s = '<ul id="spyul" class="nav">';
		for (var i=0,l=els.length;i<l;i++){
			s+= '<li><a href="#'+els[i].id+'">'+$(els[i]).data('blocktitle')+'</a></li>'
		}
		s+='</ul>';
		$('#navspybar').html(s);
		$('#navspybar ul')
		.find('a').click(function(e){
			e.preventDefault();
			var scrollToId = $(this).attr('href');
			var reg = /^.*#(.*)$/i;
			var regArr = reg.exec(scrollToId);
			var newTop = $('#'+regArr[1]).offset().top-100;
			if (document.getElementById('fourcolbar')) newTop-=40;
			if (newTop<0) newTop=0;
			$(document).scrollTo(newTop,500,{easing:'easeInOutCubic'});
			return false;
		});
		$("header").addClass("normal2lines");
		if ($("#navspybar ul").length) {
			$('#navspybar ul').scrollspy();
			setTimeout(f_secnav_refr, 200);
		}
	}
});

function f_secnav_refr()
{
	$('body').scrollspy('refresh');
}


function priceFormat(str) {
	if ( ! (str instanceof Number)) {
		str = str.toString();
	}

	return str.replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}


/* on mainpage */
/* click on button "Как это работает" */
$('#mp-how-its-work').click(function(){
	$.scrollTo($('.screen2'),800, {easing:"easeInOutCubic"});
	return false;
});

// =============

var isGtIe8 = !($.browser.msie && parseInt($.browser.version) <= 8);
var snows,
	winHeight,
	blockGlobal = 0,
	whatmove = $.browser.webkit? $('body') : $('html');
var whatScroll = function(){
	return f_filterResults (
		window.pageYOffset ? window.pageYOffset : 0,
		document.documentElement ? document.documentElement.scrollTop : 0,
		document.body ? document.body.scrollTop : 0
	);
	function f_filterResults(n_win, n_docel, n_body) {
		var n_result = n_win ? n_win : 0;
		if (n_docel && (!n_result || (n_result > n_docel)))
			n_result = n_docel;
		return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
	}
};
function anchors (){
	var newloc;
	if (!window.location.hash) {newloc = 0}
	else {newloc = window.location.hash.replace("#tab","");}
	var oldloc = $("footer").attr("rel");
	if (oldloc != newloc) {
		$("footer").attr("rel", newloc);
		$(".tabs-header li:eq("+newloc+")").find("a").click();
	}
}
function resizeSiteSection () {
	winHeight = $(window).height()> 650 ? $(window).height():650    ;
	/*$(".site-section.part1").css({"height":winHeight+'px'});
	$(".site-section.part2").css({"height":winHeight/2+'px'});
	$(".main-btns-wrapper").css({"height":winHeight/2+'px'});*/
	$(".site-section.b-promo").css({"height":winHeight-112+'px'});



}


function recolorSlidesLogo (){
	var activeSlide	= $(".nav").find(".active a"),
		activeClass	= activeSlide.attr("class"),
		activeColor	= $(".b-"+activeClass).css("backgroundColor"),
		offsets		= $(".main-btns-wrapper").offset();
	if (offsets && whatScroll() > offsets.top) {
		$(".logo").css({"backgroundColor":activeColor});
	}

}
function windowAssemble(){
	$(".b-window .window div").each(function(){
		if ($(this).is(".action")){
			// console.log('alert!');
			$(this).stop(true,true).removeClass("start",1000,"easeInOutCubic").removeClass("action");
		} else if ($(this).is(".start")){
			if ( ! $(this).is('.in-action')) {
				// console.log('show');
				$(this).addClass('in-action').removeClass("start",1000,"easeInOutCubic", function(){
					$(this).removeClass("in-action");
				});
			}
		}
	});
}

function  windowDisAssemble(){
	$(".b-window .window div").each(function(){
		if (!$(this).is(".start") && !$(this).is(".action")){
			// console.log('hide');
			$(this).addClass('action');
			$(this).addClass("start",1000,"easeInOutCubic",function(){
				$(this).removeClass("action");
			});
		}
	});
}
function googleMap() {

	$('.google-map').each(function(){

		var $this = $(this);
		var options = $this.data('options');

		var latlng = new google.maps.LatLng(options.pos[0], options.pos[1]);
		var myOptions = {
			zoom: options.zoom,
			center: latlng,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			disableDefaultUI: true
		};
		var map = new google.maps.Map(
			this,
			myOptions
		);
        var image = 'templates/img/ico-map.png';
        //var myLatLng = new google.maps.LatLng(options.pos[0], options.pos[1]);
        var beachMarker = new google.maps.Marker({
            position: latlng,
            map: map,
            icon: image
        });


	});


}
var paralax = new Object({
	arr:[],
	left:[-90,-60,-20,0,30,50,80,90,100,110,120,150,220],
	add:function(id,level){
		if(id.length) paralax.arr[paralax.arr.length]=[id,level,parseInt(id.css('left')),parseInt(id.css('top'))];
	},
	clear:function(){
		paralax.arr=[];
	}
});

function paralaxDo (){
	paralax.add($('.b-lights .l1'),1);
	paralax.add($('.b-lights .l2'),2);
	paralax.add($('.b-lights .l3'),3);
	paralax.add($('.b-lights .l4'),4);
	paralax.add($('.b-lights .l5'),5);
	paralax.add($('.b-lights .l6'),6);
	paralax.add($('.b-lights .l7'),7);
	paralax.add($('.b-lights .l8'),8);
	paralax.add($('.b-lights .l9'),9);
	paralax.add($('.b-lights .l10'),10);
	paralax.add($('.b-lights .l11'),11);
}

if ($("#sunprotection").length){

	$(document).bind('mousemove.parallax',function(e){

			var offsets	= $(".b-lights").offset();
			var lightX	= offsets.left;
			var lightY	= offsets.top;

			var x = e.pageX - lightX,y=e.pageY - lightY;

			for( var i in paralax.arr){
				var obj=paralax.arr[i];
				$(obj[0]).css({left:obj[2]+paralax.left[obj[1]]*x*0.01,top:obj[3]+paralax.left[obj[1]]*y*0.01});
			}
	});

	// для уйстройств с акселерометром
	(function(){

		var body = $('body'),
			width = body.width(),
			height = body.height(),
		    max_coof = 10, // чувствительность от 1(min) до 10(max). (в теории возможны меньшие и большие значения для min и max)
			iAmFree = true,
			start_position = null;


		window.addEventListener("devicemotion", handleMotionEvent, true);

		setInterval(function(){
			iAmFree = true;
		}, 100);


		function handleMotionEvent( e ) {

			if ( !iAmFree )
				return;

			iAmFree = false;

			var x = e.accelerationIncludingGravity.x;
			var y = e.accelerationIncludingGravity.y;
			var top;
			var left;

			if ( start_position === null ) {
				start_position = {x: x, y: y};
				$(document).unbind('mousemove.parallax');
			}

			// портретная
			if ( width > height ) {
				top = -(x - start_position.x);
				left = y - start_position.y;
			} else {
				top = y - start_position.y;
				left = x - start_position.x;
			}

			top = top * height / max_coof + height /2;
			left = -left * width / max_coof + width / 2;

			// округляем до 50 пикселей
			top = Math.round( top / 50 ) * 50;
			left = Math.round( left / 50 ) * 50;

			if ( Math.abs( top ) > height )
				top = top < 0 ? -height : height;

			if ( Math.abs( left ) > width )
				left = left < 0 ? -width : width;

			// $('menu').html('left: '+left+', top:'+top);

			var offsets	= $(".b-lights").offset();
			var lightX	= offsets.left;
			var lightY	= offsets.top;

			x = left - lightX;
			y = top - lightY;


			for( var i in paralax.arr){
				var obj=paralax.arr[i];
				$(obj[0]).stop().animate({left:obj[2]+paralax.left[obj[1]]*x*0.01,top:obj[3]+paralax.left[obj[1]]*y*0.01});
			}
		}

		$(window).resize(function(){
			width = body.width();
			height = body.height();
			start_position = null;
		})

	})();
}


var floatMenuGenerator = {
	init:function(){
		$(".l-inner").prepend("<aside class='b-sidemenu'><div class='l-fixed'><ul class='nav'></ul></div></div>");
		var nav = $(".l-inner").find('.b-sidemenu ul');
		$('.inner-site-section').each(function(){
			var blockTitle = $(this).attr('data-blockTitle');
			var blockLink = $(this).attr('id');
			if (blockTitle) {
				nav.append('<li><a href="#'+blockLink+'">'+blockTitle+'</a></li>')
			}
		});
		$('.b-sidemenu ul').scrollspy();
		nav.find('li a').click(function(e){
			e.preventDefault();
			var scrollToId = $(this).attr('href');
			var reg = /^.*#(.*)$/i;
			var regArr = reg.exec(scrollToId);
			var newTop = $('#'+regArr[1]).offset().top;
			//console.log (newTop-120);
			$(document).scrollTo(newTop-120,500,{easing:'easeInOutCubic'});
			return false;
		});


		$('[data-spy="scroll"]').each(function () {
			var $spy = $(this).scrollspy('refresh');
		});

			$('.b-sidemenu ul li').removeClass("active");
			$('.b-sidemenu ul li:first-child').addClass("active");

	}
};
function snowStart() {
	var obj = $("#conservation");
	var snow ="";
	for (var i = 1; i <= 5; i++) {
		var tmpp = (Math.ceil(Math.random()*obj.height()*2)-obj.height());
		snow=snow+"<div class='snow-wrap id"+i+"' style='top:"+tmpp+"px; left:"+Math.ceil(Math.random()*obj.height())+"px;' >";
		//console.log (tmpp);
		for (var ii = 1; ii <= 10; ii++) {
		snow=snow+"<div class='snow' style='left:"+Math.ceil(Math.random()*$(window).width())+"px; top:"+Math.ceil(Math.random()*obj.height())+"px;'>"+security_.getRandomSymbol()+"</div>";
		}
		snow=snow+"</div>"
	}
	snow=snow+"<div class='bg'><img src='templates/img/bg-conservation.png' /></div>";
	obj.append(snow);
	snows = $("#conservation").find(".snow");

}
function snow() {
	$(".snow-wrap").each(function(i){
		snowSin = new Clef($("#conservation").find(".snow-wrap").get(i), {amplitude:Math.ceil(Math.random()*100), duration:Math.ceil(Math.random()*5000)+3000});
		snowSin.start();
		animateSnow($(this));

	});
}
function animateSnow($this) {
	var snowTop = $("#conservation").height(),
		snowTime = Math.ceil(Math.random()*10000)+10000;
	$this.animate({
		top:snowTop+"px"

	},snowTime, "linear" ,
		function(){
			$this.css({top:-snowTop+"px", left:Math.ceil(Math.random()*$(window).width())+"px"});
			animateSnow($this);
        }
	)
}
function snowGenerate(count) {
	var obj = $("#conservation");

	  for (var i = 1; i <= count; i++) {
		  var iObj = obj.find(".snow-wrap.id"+(i));
		  iObj.show();
		 // console.log('show', i);
	  }
	  for (var i = 6; i >= count+1; i--) {
		  var iObj = obj.find(".snow-wrap.id"+(i));
		  iObj.hide();
		 // console.log('hide', i);
	  }



}
$(document).ready(function(){
	$('[data-spy="scroll"]').each(function () {
		var $spy = $(this).scrollspy('refresh');
		recolorSlidesLogo();
	});

	if ($(".b-tabs").length){
		setInterval('anchors()',500);
	}

	if ($('.menu-static li').length){
		$("header").addClass("normal2lines");
	}
	if ($('input[placeholder], textarea[placeholder]').length != 0) {
		$('input[placeholder], textarea[placeholder]').placeholder();
	}

	/* выстраиваем второе меню по центру выбранного из первого меню пункта */
	(function(){
		var menu2line_width = $('#menu2line ul').outerWidth();

		if ( menu2line_width ) {
			var corn_width = 21,
				corn = $('menu .menu-corn'),
				corn_offset = corn.position().left;

			corn_offset += corn.parent().position().left;

			$('#menu2line ul').css({marginLeft: corn_offset + corn_width - menu2line_width / 2 });
		}
	})();
	//resizeSiteSection(); //ресайзим блоки "на всю высоту"
	if (!$("body").is(".inner")){

		paralaxDo();

		security_.start();

		oMusic1			= new Music($('#soundproofing .title'), {amplitude:30, duration:250,	waveLen:15});
		oMusic2			= new Music($('#soundproofing .page-text p, '), {amplitude:30, duration:400,	waveLen:50});
		oMusic3			= new Music($('#soundproofing .page-text .subtext span'), {amplitude:40, duration:300,	waveLen:50});
		oClef			= new Clef($('#soundproofing .ico').get(0), {amplitude:50, duration:400});
		oClef2			= new Clef($('#soundproofing .big-conf-btn').get(0), {amplitude:60, duration:450});
		oClef3			= new Clef($('#soundproofing .page-text .subtext a').get(0), {amplitude:50, duration:300});
		oMusic1.start();
		oMusic2.start();
		oMusic3.start();
		oClef.start();
		oClef2.start();
		oClef3.start();

		oConservation	= new Clef($('#conservation .ico').get(0), {amplitude:7, duration:100});
		oConservation2	= new Clef($('#conservation .title').get(0), {amplitude:10, duration:120});
		oConservation3	= new Clef($('#conservation .page-text').get(0), {amplitude:15, duration:150});

		oConservation.start();
		oConservation2.start();
		oConservation3.start();

		snowStart();
		snowGenerate(5);
		snow ();

		$('.main-btns').scrollFollow({parentWidth:'100%'});

		//$('.main-btns ul').scrollspy();

		/*$('.main-btns ul li a').click(function(e){
			e.preventDefault();
			var scrollToId = $(this).attr('href');
			var reg = /^.*#(.*)$/i;
			var regArr = reg.exec(scrollToId);
			var newTop = $('#'+regArr[1]).offset().top;

			$(document).scrollTo(newTop-141,500,{easing:'easeInOutCubic'});
		});*/

		$( ".b-sunprotection .b-slider" ).slider({
			range: "min",
			value: 0,
			min: 0,
			max: 1000,
			slide: function( event, ui ) {
				$(".b-lights").css( {"opacity" : 1 - ui.value*0.001});
			}
		});
		$( ".b-security .b-slider" ).slider({
			range: "min",
			value: 0,
			min: 0,
			max: 1000,
			slide : function(event, ui) {
				security_.setAmplitudePercent(1 - ui.value / 1000);
			}
		});
		$( ".b-conservation .b-slider" ).slider({
			range: "min",
			value: 0,
			min: 0,		// 20,
			max: 1000,	// 75,
			slide : function(event, ui) {
				var val = ui.value / 20 + 25;
				$(".b-conservation .ico .scale").css({"height": Math.ceil(val)+'px'});
				oConservation.setAmplitudePercent(1 - ui.value / 1000);
				oConservation2.setAmplitudePercent(1 - ui.value / 1000);
				oConservation3.setAmplitudePercent(1 - ui.value / 1000);
				snowGenerate(Math.ceil((1 - ui.value / 1000)*5));
				$(".b-conservation").find(".bg").css({opacity:1 - ui.value / 1000})

			}
		});
		$( ".b-soundproofing .b-slider" ).slider({
			range: "min",
			value: 0,
			min: 0,
			max: 1000,
			slide : function(event, ui) {
				oMusic1.setAmplitudePercent(1 - ui.value / 1000);
				oMusic2.setAmplitudePercent(1 - ui.value / 1000);
				oMusic3.setAmplitudePercent(1 - ui.value / 1000);
				oClef.setAmplitudePercent(	1 - ui.value / 1000);
				oClef2.setAmplitudePercent(	1 - ui.value / 1000);
				oClef3.setAmplitudePercent(	1 - ui.value / 1000);
			}
		});

		$(".hww .btn").click(function(){
			whatmove.animate({scrollTop: winHeight-32}, 800, "easeInOutCubic" );
			return false;
		});
	}


	/*if(".inner-site-section".length>0){
		floatMenuGenerator.init();
	}*/
	$('.tabs-header li a').click(function(e){
		e.preventDefault();
		if($(this).parent().hasClass("active") || blockGlobal != 0){
			return false;
		}
		else {
			blockGlobal = 1;
			var navBlock = $(this).parents('.b-tabs');
			var wWidth = navBlock.width();

			var cur = $(this).parent().index();
			var navBlockPrev = navBlock.find(".tabs-header li.active");
			var prev = navBlockPrev.index();
			var k = 1;
			if (cur>prev){
				k = -1;
			}
			window.location.hash = 'tab'+cur;
			navBlockPrev.removeClass("active");
			navBlock.find(".tabs-content .tab.active").animate({"left":k*wWidth},800,"easeInOutCubic", function(){$(this).removeClass("active")});

			navBlock.find(".tabs-header li").eq(cur).addClass("active");
			navBlock.find(".tabs-content .tab").eq(cur).css({"left":-k*wWidth,"display":"block"}).animate({"left":0},800,"easeInOutCubic", function(){
				$(this).addClass("active");
				blockGlobal = 0;
			});
			return false;
		}
	});
	if ($(".b-demo-carousel").length){
		$(".b-demo-carousel .carousel-content").carouFredSel({
			circular: true,
			infinite: true,
			auto 	: false,
			prev	: {
				button	: ".b-demo-carousel .l.arr",
				key		: "left"
			},
			next	: {
				button	: ".b-demo-carousel .r.arr",
				key		: "right"
			}
		});

	}
	if ($('.form .input-checkbox').length) {
		$('.form .input-checkbox').checkbox({cls:'jq-checkbox', empty:'templates/img/empty.png'});
	}
	if ($('.contact-map').length){
		googleMap();
		$(".contact-map-switcher a").click(function(){
			$(".contact-map-switcher a").removeClass("active")
			$(this).addClass("active");
			$(".contact-address, .contact-map").removeClass("active");
			var opened = $(this).attr("rel");
			$("."+opened).addClass("active");
			return false;
		});
	}
});

$(document).scroll(function(e){
	if (!$("body").is(".inner")){
		/*if (whatScroll()>0) {
			$("header").addClass("normal");//меняем менюшку с белой на серую
		} else {
			$("header").removeClass("normal");//меняем менюшку с белой на серую
		}*/

		/*if (whatScroll()>$(".b-window").offset().top+50) {
			//анимируем прилёт окошка
			windowAssemble();
		} else {
			windowDisAssemble();
		} */
		recolorSlidesLogo ();
	}
});


$(window).resize(function(){
//		resizeSiteSection ();
});



security_ = {

	/**
	 * Амплитуда (смещение в пикселях в одну сторону)
	 * @var	integer
	 */
	maxAmplitude : 30
	,amplitude : 0


	/**
	 * время земплятресения
	 * @var	integer
	 */
	,maxDuration : 2000
	,duration : 0

	/**
	 * Кол-во дёрганий при одном ударе
	 * @var		integer
	 */
	,maxCntVibration : 15
	,cntVibration : 0

	/**
	 * Частота ударов (от-до мс)
	 * @var	array
	 */
	,freq : [2300, 3000]

	/**
	 *
	 */
	,intervalId : null


	,start : function() {
		this.setAmplitudePercent(1);
		jQuery.easing.securityHor = security_.easingHorizontal;
		jQuery.easing.securityHor2 = security_.easingHorizontal2;
		jQuery.easing.securityHor3 = security_.easingHorizontal3;
		jQuery.easing.securityVert = security_.easingVertical;
		jQuery.easing.securityVert2 = security_.easingVertical2;
		jQuery.easing.securityVert3 = security_.easingVertical3;
		this.intervalId = setInterval(security_.interval, (security_.freq[0] + security_.freq[1]) / 2);	// Вычисляется среднее арифметическое (для 2-10 среднее = 6)
		this.bum();
	}

	,stop : function() { // Не тестил ту ф-цию :)
		clearInterval(this.intervalId);
	}


	/**
	 * Устанавливает величину амплитуды относительно максимального значения
	 *
	 * @param	float		percent		Задаётся от 0 до 1
	 * @return	void
	 */
	,setAmplitudePercent : function(percent) {
		this.amplitude		= this.maxAmplitude * percent;// Math.sqrt(percent);
		this.duration		= Math.round(this.maxDuration * percent);
		this.cntVibration	= Math.max(Math.round(this.maxCntVibration * percent), 1);
		// console.log(this.amplitude, this.duration, this.cntVibration);
	}


	/**
	 * Срабатывает внешний интервал
	 */
	,interval : function() {
		var randTimeOffset = Math.random() * (security_.freq[1] - security_.freq[0]) / 2;
		setTimeout(function(){
			security_.bum();
		}, randTimeOffset);
	}

	/**
	 * Один удар
	 */
	,bum : function() {


		if (security_.amplitude === 0) {
			return;
		}

		security_.symbolsStart();

		$('#security .ico img').stop(true, true)
			.animate({'left':security_.amplitude},{ queue:false, duration:security_.duration, easing:'securityHor3'})
			.animate({'top':security_.amplitude}, security_.duration,'securityVert3',
			function() {
				$(this).css({left:0, top:0});	// Так как после анимации jQuery сама ставит объект в назначенную координату, то надо вернуть его в ноль
			}
		);
		$('#security .title span, #security .page-text').stop(true,true)
			.animate({'left':security_.amplitude},{ queue:false, duration:security_.duration, easing:'securityHor2'})
			.animate({'top':security_.amplitude}, security_.duration,'securityVert2',
			function() {
				$(this).css({left:0, top:0});	// Так как после анимации jQuery сама ставит объект в назначенную координату, то надо вернуть его в ноль
			}
		);

	}


	/**
	 * Запускает анимацию букв разлетающихся в разные стороны
	 */
	,symbolsStart : function()
	{

		var securityDiv			= $('#security');
		var surfaceAreaSize		= [
			securityDiv.width(),
			securityDiv.height()
		];

		var exploisionRadius = Math.max(surfaceAreaSize[0], surfaceAreaSize[1]);
		// var exploisionRadius = 100;

		var startPos = [
			Math.random() * surfaceAreaSize[0] / 2 + surfaceAreaSize[0] / 4,
			Math.random() * surfaceAreaSize[1]
		];

		// Генерит случайные символы
		var txt = [];
		for (var i = 0; i < Math.ceil(security_.amplitude*2); i++) {
			txt.push('<div class="fall">'+ security_.getRandomSymbol() +'</div>');
		}
		securityDiv.append(txt.join(''));


		// Запускает анимацию для каждой буквы
		securityDiv
			.find('.fall')
			.css({left:startPos[0]+'px', top: startPos[1]+'px'})
			.each(function(){

				var angle = Math.random() * 2 * Math.PI;
				var endPos = [
					startPos[0] + Math.sin(angle) * surfaceAreaSize[0] * (Math.random()+2) / 2,
					startPos[1] + Math.cos(angle) * surfaceAreaSize[1] * (Math.random()+2) / 2
				];


				$(this).animate(
					{
						top		: endPos[1] +'px',
						left	: endPos[0] +'px'
					},
					security_.freq[0],
					function(){
						$(this).fadeOut(500, function(){
							$(this).remove();
						})
					}
				);
			}
		);

	}

	/**
	 * Генерирует один случайный символ
	 */
	,getRandomSymbol : function(){
		var x = [[48,57], [65,90], [97,122], [1040,1103]][Math.random() * 4 >> 0];
		return String.fromCharCode((Math.random() * (x[1] - x[0] + 1) >> 0) + x[0]);
	}


	/**
	 * p: current percent
	 * t: current time, b: begInnIng value, c: change In value, d: duration
	 */
	,easingHorizontal : function (x, t, b, c, d) {
		return Math.sin(Math.PI * 2 * security_.cntVibration * x) * (1-x);
	}
	,easingVertical : function (x, t, b, c, d) {
		return Math.sin(Math.PI * 2 * security_.cntVibration * x*2.33) * (1-x);
	}
	,easingHorizontal2 : function (x, t, b, c, d) {
		return Math.sin(Math.PI * 2 * security_.cntVibration * x*1.1) * (1-x);
	}
	,easingVertical2 : function (x, t, b, c, d) {
		return Math.sin(Math.PI * 2 * security_.cntVibration * x *.9) * (1-x);
	}
	,easingHorizontal3 : function (x, t, b, c, d) {
		var y;
		var pos = x;
		x = (x * security_.cntVibration) % 1;
		if (x < .25) {
			y = x * 4;
		} else if (x < .75) {
			y = 1 - (x -.25) * 4;
		} else {
			y = -1 + (x -.75) * 4;
		}
		return y * (1 - pos);
	}
	,easingVertical3 : function (x, t, b, c, d) {
		var y;
		var pos = x;
		x = (x * security_.cntVibration) % 1;
		if (x < .25) {
			y = x * 4;
		} else if (x < .75) {
			y = 1 - (x -.25) * 4;
		} else {
			y = -1 + (x -.75) * 7;
		}
		return y * (1 - pos);
	}

};


/**
 * Конструктора
 *
 * @param	jQuery		word		Один элемент внутри котрого записано слово
 * @param	щиоусе		options		Настройки. См. в коде комменты
 */
Music = function(word_, options) {

	options = options || {};

	this.options = {
		word__		: word_
		,amplitude	: 20		// Максимальная амплитуда
		,duration	: 1000		// Длина волны в миллисекундах
		,waveLen	: 10		// Длина волны (кол-во букв)
	};


	this.spans;
	this.amplitude;


	this.options = $.extend(this.options, options);
	this.setAmplitudePercent(1);
	this.explodeWords();
	this.spans = this.options.word__.find('span');

	jQuery.easing.musicSin = this.sinEasing;

};

Music.prototype = {


	explodeWords : function() {
		var tmp = this.options.word__.html();
		if (tmp)
		{
			if (tmp.indexOf('<BR>') >= 0) {	// Для ИЕ7
				// tmp = tmp.split('<BR>').join('<br> ');	// Вставляем пробел, что бы БР получился отдельным словом.
				tmp = tmp.split('<BR>').join(' ');	// Временное решение из-за того, что между буквами большие пробелы - переносы не правильно работают.
			}
			var words_	= split(tmp, ' ');
			var t= '';
			for (var i in words_) {
				if (typeof(words_[i]) != "function") {
					//pr(typeof(words_[i]), 'type of word');
					if (words_[i].toLowerCase() === '<br>' || words_[i].toLowerCase() === '<br/>') {
						t += '<br/>';
					} else {
						t += '<div class="b-word">';
						var symbols	=split(words_[i],'');
						for (var j in symbols) {
							if (typeof(symbols[j]) != "function") {
								t += '<span class="b-symbol">'+ symbols[j] +'</span>';
							}
						}
						t += '</div>&nbsp;';
					}
				}
			}
			this.options.word__.html(t);
		};
	}

	,start : function() {

		var tmp			= new Date();
		this.startTime = tmp.getTime() + tmp.getMilliseconds() / 1000;
		this.animate();

	}

	,setAmplitudePercent : function(percent) {
		this.amplitude = this.options.amplitude * percent;
	}

	,animate : function() {

		var mus			= this;
		if (this.amplitude > 0) {

			var tmp			= new Date();
			var timeOffset	= (tmp.getTime() + tmp.getMilliseconds() / 1000) - this.startTime;
			var deltaTime	= this.options.duration / this.options.waveLen;


			mus.spans.each(function(i){
				var curTime = timeOffset - deltaTime * i;
				if (curTime < 0) {
					return;
				}
				var progressPosition = (curTime % mus.options.duration) / mus.options.duration;	// progressPosition - значение от 0 до 1
				var pos = mus.amplitude * mus.sinEasing(progressPosition);
				this.style.top = pos + 'px';
			});

		} else {
			mus.spans.css({top:0});
		}

		setTimeout(function(){mus.animate();}, 10);

	}

	,sinEasing : function(x) {
		return Math.sin(2*Math.PI * x);
	}

}


Clef = function(el, options) {

	options = options || {};

	this.options = {
		amplitude	: 20		// Максимальная амплитуда
		,duration	: 1000		// Длина волны в миллисекундах
		,waveLen	: 10		// Длина волны (кол-во букв)
	};


	this.el = el;
	this.amplitude;


	this.options = $.extend(this.options, options);
	this.setAmplitudePercent(1);

};


Clef.prototype.start = function() {

	if (this.el) {
		var tmp			= new Date();
		this.startTime	= tmp.getTime() + tmp.getMilliseconds() / 1000;
		this.animate();
	}

};


/**
 * Выставляет величину амплитуды
 */
Clef.prototype.setAmplitudePercent = function(percent) {
	this.amplitude = this.options.amplitude * percent;
};

/**
 * Цикличная функция, которая смещает каждую букву.
 */
Clef.prototype.animate = function() {

	if (this.amplitude > 0) {

		var tmp			= new Date();
		var timeOffset	= (tmp.getTime() + tmp.getMilliseconds() / 1000) - this.startTime;
		var progressPosition = (timeOffset % this.options.duration) / this.options.duration;	// progressPosition - значение от 0 до 1
		var pos			= this.amplitude * Music.prototype.sinEasing(progressPosition);

		this.el.style.left = pos + 'px';

	} else {
		this.el.style.left = 0;
	}

	var tmp = this;
	setTimeout(function(){tmp.animate();}, 10);

};

$('form.form-ajax-map').ajaxForm({
	//,url:			url				// override for form's 'action' attribute
	type:			'post'			// 'get' or 'post', override for form's 'method' attribute
	,dataType:		'json'			// 'xml', 'script', or 'json' (expected server response type)
	,success:		function(data, statusText, xhr, $form) {

		if (typeof(data.errors) !== 'object') {	// Не может такого быть
			return;
		}

		$form.find('.error').removeClass('error');
		if (data.errors.length <= 0) {	// Всё окей. Ошибок нет
			if ( typeof wf_counter_event === 'function' ) {
				wf_counter_event('Visit_req');
			}
			$form.parent().find('.message').show();
			$form.slideUp();
			//$form.find('.btn[type=submit]').removeAttr('disabled');

		} else {	// Форма заполнена с ошибками

			for (i in data.errors) {	// Каждому ошибочному полю показывает сообщение об ошибке.
				$form.find('[name="'+ i +'"]').addClass('error');
			}
			$form.find('.btn[type=submit]').show();
			$form.find('.loading').hide();
		}

	},
	beforeSubmit: function (data, $form) {
		$form.find('.btn[type=submit]').hide();
		$form.find('.loading').show();
	}
});
$('form.form-ajax').ajaxForm({
	//,url:			url				// override for form's 'action' attribute
	type:			'post'			// 'get' or 'post', override for form's 'method' attribute
	,dataType:		'json'			// 'xml', 'script', or 'json' (expected server response type)
	,success:		function(data, statusText, xhr, $form) {

		if (typeof(data.errors) !== 'object') {	// Не может такого быть
			return;
		}

		$form.find('.error').removeClass('error');
		if (data.errors.length <= 0) {	// Всё окей. Ошибок нет
			if ( typeof wf_counter_event === 'function' ) {
				wf_counter_event('Visit_req');
			}
			$form.find('.message').show();
			$form.find(".form_form").slideUp();
			//$form.find('.btn[type=submit]').removeAttr('disabled');

		} else {	// Форма заполнена с ошибками

			for (i in data.errors) {	// Каждому ошибочному полю показывает сообщение об ошибке.
				$form.find('[name="'+ i +'"]').addClass('error');
			}
			$form.find('.form_form .button').show();
			$form.find('.form_form .loading').hide();
		}

	},
	beforeSubmit: function (data, $form) {
		$form.find('.form_form .button').hide();
		$form.find('.form_form .loading').show();
	}
});


/**
 * Алиас для console.log
 *
 * @param	mixed	variable	Переменная любого типа
 */
function pr(variable, comment, withDeltaTime) {

	if (withDeltaTime) {
		var tmp		= new Date();
		var newTime	= tmp.getTime();
		this.lastDate = this.lastDate || newTime;
		comment = comment || '';
		comment += ' [t=' + (newTime - this.lastDate) + ']';
		this.lastDate = newTime;
	}

	if (typeof console !== 'undefined') {
		if (comment) {
			console.log(comment,variable);
		} else {
			console.log(variable);
		}
	} else {
		// alert(variable);
	}
}

$(function () {
    $('.wrap-photo_text p').each(function() {
        $(this).hover(function() {
                $(this).stop().animate({opacity: '1'}), 100;
        },
        function () {
            $(this).stop().animate({opacity: '0'});
        });
    });

    $('.wrap-photo').find("a[href*='youtube.com/watch']").click(function() {
        $.fancybox({
            'title'			: this.title,
            'width'			: 800,
            'height'		: 450,
            'href'			: this.href.replace(new RegExp("watch\\?v=", "i"), 'v/'),
            'type'			: 'swf',
            'swf'			: {
                'wmode'				: 'transparent',
                'allowfullscreen'	: 'true'
            }
        });

        return false;
    });

});



