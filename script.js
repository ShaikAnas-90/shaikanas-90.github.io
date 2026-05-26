/* â”€â”€ CURSOR â”€â”€ */
const cur=document.getElementById('cur'),ring=document.getElementById('cur-ring');
let mx=0,my=0,rx=0,ry=0;
document.addEventListener('mousemove',e=>{
  mx=e.clientX;my=e.clientY;
  cur.style.left=mx-4+'px';cur.style.top=my-4+'px';
});
setInterval(()=>{
  rx+=(mx-rx)*0.12;ry+=(my-ry)*0.12;
  ring.style.left=Math.round(rx-16)+'px';ring.style.top=Math.round(ry-16)+'px';
},16);

/* â”€â”€ PAGE SWITCHING â”€â”€ */
function showPage(name){
  // hide all
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a=>a.classList.remove('active'));

  // show target
  const page=document.getElementById('page-'+name);
  if(page){
    page.classList.add('active');
    page.scrollTop=0;
  }

  // mark nav
  const link=document.querySelector('nav a[data-page="'+name+'"]');
  if(link)link.classList.add('active');

  // animate skill bars when skills page opens
  if(name==='skills'){
    setTimeout(()=>{
      document.querySelectorAll('.sb-fill').forEach(bar=>{
        const w=parseFloat(bar.style.getPropertyValue('--w')||bar.style.cssText.match(/--w:([\d.]+)/)?.[1]||0);
        bar.style.transform='scaleX('+w+')';
      });
    },80);
  } else {
    // reset bars when leaving skills
    document.querySelectorAll('.sb-fill').forEach(bar=>bar.style.transform='scaleX(0)');
  }
}

// nav clicks
document.querySelectorAll('nav a[data-page]').forEach(a=>{
  a.addEventListener('click',()=>showPage(a.dataset.page));
});

// button clicks inside pages (hero btns etc)
document.querySelectorAll('a[data-page]:not(nav a)').forEach(a=>{
  a.addEventListener('click',e=>{
    e.preventDefault();
    showPage(a.dataset.page);
  });
});

// init
showPage('home');
