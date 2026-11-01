
(function(){
  var K='vz-cookie-ok',el=document.getElementById('ck');
  try{if(localStorage.getItem(K))return;}catch(e){}
  el.hidden=false;
  var shown=0,show=function(){if(shown++)return;setTimeout(function(){requestAnimationFrame(function(){el.classList.add('on')})},1200)};
  var ld=document.getElementById('loader');
  if(!ld||ld.hidden)show();else{addEventListener('vasnev:ready',show,{once:true});setTimeout(show,9000)}
  document.getElementById('ckOk').addEventListener('click',function(){
    try{localStorage.setItem(K,String(Date.now()))}catch(e){}
    el.classList.remove('on');
    setTimeout(function(){el.hidden=true},560);
  });
})();
