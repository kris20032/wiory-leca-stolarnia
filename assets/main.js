// Wióry Lecą — wspólny JS
(function(){
  // Mobilne menu
  var burger=document.querySelector('.burger'), links=document.querySelector('.links');
  if(burger&&links){
    burger.addEventListener('click',function(){links.classList.toggle('open');});
    links.addEventListener('click',function(e){if(e.target.tagName==='A')links.classList.remove('open');});
  }
  // Galeria realizacji (g00..g38) — wstawiana tam, gdzie jest #gal
  var gal=document.getElementById('gal');
  if(gal){
    var count=parseInt(gal.getAttribute('data-count')||'39',10);
    for(var i=0;i<count;i++){
      var n=('0'+i).slice(-2);
      var a=document.createElement('a');
      a.href='img/g'+n+'.jpg';
      a.innerHTML='<img loading="lazy" src="img/g'+n+'.jpg" alt="Realizacja Wióry Lecą — drewniana stolarka ogrodowa">';
      gal.appendChild(a);
    }
  }
  // Lightbox (działa dla każdej .gallery na stronie)
  var lb=document.getElementById('lb');
  if(lb){
    var lbimg=lb.querySelector('img');
    document.querySelectorAll('.gallery').forEach(function(g){
      g.addEventListener('click',function(e){
        var a=e.target.closest('a'); if(!a)return; e.preventDefault();
        lbimg.src=a.href; lb.hidden=false; document.body.style.overflow='hidden';
      });
    });
    lb.addEventListener('click',function(){lb.hidden=true; lbimg.src=''; document.body.style.overflow='';});
    document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!lb.hidden){lb.hidden=true;lbimg.src='';document.body.style.overflow='';}});
  }
  // Reveal przy scrollu
  var io=new IntersectionObserver(function(es){es.forEach(function(en){if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}})},{threshold:.12});
  document.querySelectorAll('.reveal').forEach(function(el){io.observe(el)});
})();
