(function(){function a(a){function k(){if(e&&c<a){var b=e,i=b[0],j=Array.prototype.slice.call(b,1),m=b.index;e===f?e=f=null:e=e.next,++c,j.push(function(a,b){--c;if(g!=null)return;a!=null?(g=a,d=h=e=f=null,l()):(h[m]=b,--d?k():l())}),i.apply(null,j)}}function l(){i.forEach(function(a){g!=null?a(g):a.apply(null,[null].concat(h))}),j.forEach(function(a){g!=null?a(g):a(null,h)})}var b={},c=0,d=0,e,f,g=null,h=[],i=[],j=[];return arguments.length<1&&(a=Infinity),b.defer=function(){if(!g){var a=arguments;a.index=h.push(undefined)-1,f?(f.next=a,f=f.next):e=f=a,++d,k()}return b},b.await=function(a){return i.push(a),d||l(),b},b.awaitAll=function(a){return j.push(a),d||l(),b},b}function b(){}typeof module=="undefined"?self.queue=a:module.exports=a,a.version="1.0.0"})();