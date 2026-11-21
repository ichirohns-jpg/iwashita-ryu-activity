"use strict";
(function(){
 const list=document.getElementById("homeActivityList");
 if(!list)return;
 const endpoint="https://script.google.com/macros/s/AKfycbw09g-SkmsCmsEJiG0VJrhypLbCZVBIw7TOiD5FYwNo2PhGYQz1nYsDfVbWzzff1ZUWXw/exec";
 const name="homeActivities_"+Date.now();
 const script=document.createElement("script");
 let finished=false;
 function pick(record,keys){for(const key of keys){if(record[key]!==undefined&&record[key]!==null&&String(record[key]).trim())return String(record[key]).trim();}return "";}
 function fallback(){if(finished)return;finished=true;list.replaceChildren();const p=document.createElement("p");p.className="dxMuted";p.textContent="活動の写真と詳しい内容は、活動報告からご覧ください。";const a=document.createElement("a");a.href="activity.html";a.textContent="活動報告を見る";list.append(p,a);}
 const timer=setTimeout(fallback,15000);
 window[name]=function(data){
  if(finished)return;clearTimeout(timer);finished=true;
  const records=Array.isArray(data)?data:(data&&(data.records||data.activities||data.data||data.items))||[];
  if(!Array.isArray(records)||!records.length){finished=false;fallback();cleanup();return;}
  list.replaceChildren();
  records.slice(0,3).forEach(function(record,index){
   const title=pick(record,["タイトル","title"])||"活動報告";
   const id=pick(record,["ID","id","activityId"])||String(index+1);
   const photo=pick(record,["画像URL1","imageUrl1"]);
   const card=document.createElement("a");card.className="activityPreview";card.href="activity.html#activity-"+encodeURIComponent(id);
   const figure=document.createElement("figure");
   if(/^https:\/\//i.test(photo)||/^data:image\/(?:jpeg|png|webp|gif);base64,/i.test(photo)){
    const image=document.createElement("img");image.src=photo;image.alt=title;image.loading="lazy";
    image.addEventListener("error",function(){image.remove();figure.textContent="活動報告";figure.className="previewNoPhoto";},{once:true});figure.append(image);
   }else{figure.className="previewNoPhoto";figure.textContent="活動報告";}
   const body=document.createElement("div");body.className="activityPreviewBody";
   const date=pick(record,["日付","日時","date","createdAt"]);if(date){const time=document.createElement("time");time.textContent=date.split(/[T ]/)[0];body.append(time);}
   const h3=document.createElement("h3");h3.textContent=title;body.append(h3);
   const open=document.createElement("span");open.className="activityPreviewOpen";open.textContent="写真と内容を見る";body.append(open);card.append(figure,body);list.append(card);
  });cleanup();
 };
 function cleanup(){script.remove();delete window[name];}
 script.src=endpoint+"?mode=getActivities&callback="+encodeURIComponent(name);
 script.onerror=function(){clearTimeout(timer);fallback();cleanup();};document.body.append(script);
})();
