"use strict";
(function(){
 const url="https://ichirohns-jpg.github.io/iwashita-ryu-activity/";
 const result=document.getElementById("shareResult");
 document.getElementById("copySite").addEventListener("click",async function(){
  try{await navigator.clipboard.writeText(url);result.textContent="リンクをコピーしました。";}
  catch(e){result.textContent="リンクを長押ししてコピーしてください："+url;}
 });
 const button=document.getElementById("shareSite");
 if(navigator.share){button.hidden=false;button.addEventListener("click",async function(){
  try{await navigator.share({title:"岩下りゅう 市民の声DX",url:url});result.textContent="共有操作を終了しました。";}
  catch(e){if(e.name!=="AbortError")result.textContent="リンクのコピー、LINE、Facebookのボタンをご利用ください。";}
 });}
})();
