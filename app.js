/* =========================================================
   MANJEET DIGITAL HUB - COMPLETE APP.JS
   Version: 3.5
   Smart Digital Tools. Simple Solutions.
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

  const modal = document.getElementById("toolModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeTool = document.getElementById("closeTool");
  const modalTitle = document.getElementById("modalTitle");
  const modalIcon = document.getElementById("modalIcon");
  const toolContent = document.getElementById("toolContent");
  const searchInput = document.getElementById("toolSearch");
  const noResults = document.getElementById("noResults");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const toolData = {
    aienhancer:{title:"Smart Photo Enhancer",icon:"✨"},
    idprint:{title:"ID Card Print Sheet",icon:"🪪"},
    pvcautocrop:{title:"PVC Auto Crop",icon:"✂️"},
    passport:{title:"Passport Photo Maker",icon:"🪪"},
    photocropresize:{title:"Photo Crop And Resize",icon:"📐"},
    resume:{title:"Resume Maker",icon:"📄"},
    bgremover:{title:"BG Remover",icon:"🪄"},
    compressor:{title:"Image Compressor",icon:"🗜️"}, resizer:{title:"Image Resizer",icon:"↔️"},
    converter:{title:"Image Converter",icon:"🔄"}, reducer:{title:"Photo Size Reducer",icon:"📉"},
    social:{title:"Social Media Resizer",icon:"📱"},
    jpgpdf:{title:"JPG → PDF",icon:"🖼️"}, pngpdf:{title:"PNG → PDF",icon:"📄"},
    pdf:{title:"Images → PDF",icon:"📄"}, mergepdf:{title:"Merge PDF",icon:"📚"},
    splitpdf:{title:"Split PDF",icon:"✂️"}, pdfjpg:{title:"PDF → JPG",icon:"🖼️"},
    pdfpng:{title:"PDF → PNG",icon:"🖼️"}, pdfcompressor:{title:"PDF Compressor",icon:"🗜️"},
    pdfextractor:{title:"PDF Page Extractor",icon:"📤"}, pdfreorder:{title:"PDF Page Reorder",icon:"🔀"},
    pdfrotate:{title:"PDF Rotate",icon:"🔄"}, pdfprint:{title:"PDF Print Sheet",icon:"🖨️"},
    schoolid:{title:"School ID Card Maker",icon:"🎓"}, employeeid:{title:"Employee ID Card Maker",icon:"💼"},
    marriagebio:{title:"Marriage Biodata Maker",icon:"💍"},
    photosheet:{title:"A4 Photo Sheet Maker",icon:"🖨️"}, document:{title:"Document Photo Maker",icon:"📑"},
    visiting:{title:"Visiting Card Maker",icon:"💳"}, certificate:{title:"Certificate Maker",icon:"🏆"},
    signature:{title:"Signature Maker",icon:"✍️"}, photolayout:{title:"Photo Print Layout",icon:"📐"},
    label:{title:"Label / Sticker Maker",icon:"🏷️"},
    emi:{title:"EMI Calculator",icon:"₹"}, gst:{title:"GST Calculator",icon:"%"},
    percentage:{title:"Percentage Calculator",icon:"%"}, sip:{title:"SIP Calculator",icon:"📈"},
    fd:{title:"FD Calculator",icon:"🏦"}, rd:{title:"RD Calculator",icon:"🏦"},
    loaninterest:{title:"Loan Interest Calculator",icon:"💰"}, interest:{title:"Simple Interest Calculator",icon:"➕"},
    compound:{title:"Compound Interest Calculator",icon:"📊"}, discount:{title:"Discount Calculator",icon:"🏷️"},
    profit:{title:"Profit & Loss Calculator",icon:"📈"}, age:{title:"Age Calculator",icon:"🎂"},
    insurance:{title:"Insurance Policy Return Calculator",icon:"🛡️"},
    cgpa:{title:"CGPA → Percentage",icon:"🎓"}, gpa:{title:"GPA Calculator",icon:"🎓"},
    marks:{title:"Marks Required Calculator",icon:"📝"}, grade:{title:"Grade Calculator",icon:"🏅"},
    studytime:{title:"Study Time Calculator",icon:"⏱️"}, mocktest:{title:"Mock Test",icon:"🧠"}
  };

  function escapeHTML(value){return String(value??"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");}
  function formatNumber(value,decimals=2){const n=Number(value);return Number.isFinite(n)?n.toLocaleString("en-IN",{maximumFractionDigits:decimals}):"0";}
  function formatKB(bytes){return(bytes/1024).toFixed(1)+" KB";}
  function downloadBlob(blob,filename){if(!blob){alert("Unable to create file.");return;}const u=URL.createObjectURL(blob),a=document.createElement("a");a.href=u;a.download=filename;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(u),1000);}
  function loadImage(file){return new Promise((resolve,reject)=>{if(!file)return reject(new Error("No file selected"));const u=URL.createObjectURL(file),img=new Image();img.onload=()=>{URL.revokeObjectURL(u);resolve(img)};img.onerror=()=>{URL.revokeObjectURL(u);reject(new Error("Image load failed"))};img.src=u;});}
  function canvasToBlob(canvas,type="image/jpeg",quality=.9){return new Promise((resolve,reject)=>canvas.toBlob(b=>b?resolve(b):reject(new Error("Unable to create image")),type,quality));}
  function createButton(text,className=""){return `<button type="button" class="mdh-action ${className}">${escapeHTML(text)}</button>`;}
  function createFileInput(accept="image/*",multiple=false){return `<label class="mdh-upload-box"><input type="file" class="mdh-file-input" accept="${escapeHTML(accept)}" ${multiple?"multiple":""}><div class="mdh-upload-icon">📁</div><strong>Choose File${multiple?"s":""}</strong><small>Tap here to select from your device</small></label>`;}

  function toolCSS(){return `<style>
  .mdh-tool{display:flex;flex-direction:column;gap:10px}.mdh-tool h3{margin:0;font-size:16px}.mdh-tool p{margin:0;color:#64748b;font-size:12px}
  .mdh-field{display:flex;flex-direction:column;gap:4px}.mdh-field label{font-size:11px;font-weight:600}.mdh-field input,.mdh-field select,.mdh-field textarea{width:100%;box-sizing:border-box;border:1px solid #dbe3ef;border-radius:8px;padding:7px 9px;font-size:12px;background:#fff}
  .mdh-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.mdh-grid-3{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}
  .mdh-upload-box{position:relative;display:block;width:100%;box-sizing:border-box;border:2px dashed #bfdbfe;border-radius:12px;padding:15px 10px;text-align:center;background:#f8fbff;cursor:pointer;touch-action:manipulation}.mdh-upload-box input{position:absolute!important;width:1px!important;height:1px!important;opacity:0!important}.mdh-upload-icon{font-size:25px;margin-bottom:5px}.mdh-upload-box strong{display:block;font-size:12px}.mdh-upload-box small{display:block;margin-top:4px;color:#64748b;font-size:10px}
  .mdh-action{border:0;border-radius:8px;padding:8px 10px;background:#2563eb;color:#fff;font-size:12px;font-weight:600;cursor:pointer;min-height:36px}.mdh-action.secondary{background:#eef4ff;color:#1d4ed8}
  .mdh-result{background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:10px}.mdh-stat{padding:8px;border-radius:8px;background:#eff6ff;text-align:center}.mdh-stat span{display:block;color:#64748b;font-size:10px}.mdh-stat strong{display:block;margin-top:3px;font-size:13px}.mdh-preview{max-width:100%;max-height:350px;border-radius:8px;border:1px solid #e2e8f0;display:block;margin:auto}.mdh-note{font-size:10px;color:#64748b;background:#f8fafc;padding:8px;border-radius:8px}.mdh-coming{text-align:center;padding:15px 8px}.mdh-coming .big{font-size:35px}.mdh-error{color:#dc2626;background:#fef2f2;border-radius:8px;padding:8px;font-size:11px}
  </style>`;}

  function openTool(toolName){
    if(toolName==="aienhancer"){window.location.href="tools/smart-photo-enhancer.html";return;}
    if(toolName==="pvcautocrop"){window.location.href="tools/pvc-auto-crop.html";return;}
    if(toolName==="schoolid"){window.location.href="tools/school-id-card-maker.html";return;}
    if(toolName==="passport"){window.location.href="tools/passport-photo-maker.html";return;}
    if(toolName==="employeeid"){window.location.href="tools/employee-id-card-maker.html";return;}
    if(toolName==="marriagebio"){window.location.href="tools/marriage-biodata-maker.html";return;}
    if(toolName==="document"){window.location.href="tools/document-scanner.html";return;}
    if(toolName==="visiting"){window.location.href="tools/visiting-card-maker.html";return;}
    if(toolName==="resume"){window.location.href="tools/resume-maker.html";return;}
    if(toolName==="certificate"){window.location.href="tools/certificate-maker.html";return;}
    if(toolName==="signature"){window.location.href="tools/signature-maker.html";return;}
    if(toolName==="idprint"){window.location.href="tools/id-card-print-sheet.html";return;}
    if(toolName==="label"){window.location.href="tools/label-sticker-maker.html";return;}

    const data=toolData[toolName]; if(!data){showComingSoon("Digital Tool");return;}
    if(modalTitle)modalTitle.textContent=data.title;if(modalIcon)modalIcon.textContent=data.icon;
    if(modal){modal.classList.add("active");modal.setAttribute("aria-hidden","false");}
    document.body.classList.add("modal-open");loadTool(toolName);
  }

  function closeModal(){if(modal){modal.classList.remove("active");modal.setAttribute("aria-hidden","true");}document.body.classList.remove("modal-open");if(toolContent)toolContent.innerHTML="";}
  if(closeTool)closeTool.addEventListener("click",closeModal);if(modalOverlay)modalOverlay.addEventListener("click",closeModal);
  document.addEventListener("keydown",e=>{if(e.key==="Escape")closeModal();});
  document.querySelectorAll(".tool-card").forEach(card=>card.addEventListener("click",()=>{const t=card.getAttribute("data-tool");if(t)openTool(t);}));

  if(searchInput)searchInput.addEventListener("input",function(){const q=this.value.trim().toLowerCase();let visible=0;document.querySelectorAll(".tool-card").forEach(card=>{const name=(card.getAttribute("data-name")||card.textContent||"").toLowerCase();if(!q||name.includes(q)){card.style.display="";visible++;}else card.style.display="none";});if(noResults)noResults.classList.toggle("show",q.length>0&&visible===0);});

  function showComingSoon(title){if(!toolContent)return;toolContent.innerHTML=toolCSS()+`<div class="mdh-coming"><div class="big">🚀</div><h3>${escapeHTML(title)}</h3><p>This tool is coming soon to Manjeet Digital Hub.</p><div class="mdh-note"><strong>Coming in next updates</strong><br>More free digital tools will be added soon.</div></div>`;}

  function loadCompressor(){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>🗜️ Image Compressor</h3><p>Reduce image file size while keeping good quality.</p>${createFileInput()}<div class="mdh-field"><label>Quality: <span id="qualityValue">80</span>%</label><input type="range" id="compressQuality" min="10" max="100" value="80"></div><div id="compressResult"></div></div>`;
    const input=toolContent.querySelector(".mdh-file-input"),quality=document.getElementById("compressQuality"),qv=document.getElementById("qualityValue"),result=document.getElementById("compressResult");quality.oninput=function(){qv.textContent=this.value};input.onchange=async function(){const file=this.files[0];if(!file)return;try{const img=await loadImage(file),c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext("2d").drawImage(img,0,0);const blob=await canvasToBlob(c,"image/jpeg",Number(quality.value)/100),saved=Math.max(0,Math.round((1-blob.size/file.size)*100));result.innerHTML=`<div class="mdh-grid-3"><div class="mdh-stat"><span>Original</span><strong>${formatKB(file.size)}</strong></div><div class="mdh-stat"><span>New Size</span><strong>${formatKB(blob.size)}</strong></div><div class="mdh-stat"><span>Saved</span><strong>${saved}%</strong></div></div><br>${createButton("⬇ Download Compressed Image")}`;result.querySelector("button").onclick=()=>downloadBlob(blob,"manjeet-compressed.jpg");}catch(e){result.innerHTML='<div class="mdh-error">Unable to process this image.</div>';}};}

  function loadResizer(){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>↔️ Image Resizer</h3><p>Resize your image to any custom dimensions.</p>${createFileInput()}<div class="mdh-grid"><div class="mdh-field"><label>Width</label><input type="number" id="resizeWidth"></div><div class="mdh-field"><label>Height</label><input type="number" id="resizeHeight"></div></div><label style="font-size:12px"><input type="checkbox" id="keepRatio" checked> Keep aspect ratio</label><div id="resizeResult"></div></div>`;
    const input=toolContent.querySelector(".mdh-file-input"),w=document.getElementById("resizeWidth"),h=document.getElementById("resizeHeight"),keep=document.getElementById("keepRatio"),r=document.getElementById("resizeResult");let image=null,ratio=1;input.onchange=async function(){try{if(!this.files[0])return;image=await loadImage(this.files[0]);w.value=image.naturalWidth;h.value=image.naturalHeight;ratio=image.naturalWidth/image.naturalHeight;}catch(e){r.innerHTML='<div class="mdh-error">Unable to load image.</div>';}};w.oninput=function(){if(keep.checked&&image&&this.value)h.value=Math.round(Number(this.value)/ratio)};h.oninput=function(){if(keep.checked&&image&&this.value)w.value=Math.round(Number(this.value)*ratio)};const b=document.createElement("button");b.className="mdh-action";b.textContent="Resize & Download";r.appendChild(b);b.onclick=async()=>{if(!image)return alert("Please select an image first.");const W=Number(w.value),H=Number(h.value);if(!W||!H)return alert("Enter valid size.");const c=document.createElement("canvas");c.width=W;c.height=H;c.getContext("2d").drawImage(image,0,0,W,H);downloadBlob(await canvasToBlob(c,"image/jpeg",.9),"manjeet-resized.jpg");};}

  function loadConverter(){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>🔄 Image Converter</h3><p>Convert JPG, PNG and WebP images.</p>${createFileInput()}<div class="mdh-field"><label>Output Format</label><select id="convertFormat"><option value="image/jpeg">JPG</option><option value="image/png">PNG</option><option value="image/webp">WebP</option></select></div><div id="convertResult"></div></div>`;const input=toolContent.querySelector(".mdh-file-input"),format=document.getElementById("convertFormat"),r=document.getElementById("convertResult");input.onchange=async function(){if(!this.files[0])return;try{const img=await loadImage(this.files[0]),c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;const ctx=c.getContext("2d");if(format.value==="image/jpeg"){ctx.fillStyle="#fff";ctx.fillRect(0,0,c.width,c.height)}ctx.drawImage(img,0,0);const blob=await canvasToBlob(c,format.value,.92),ext=format.value==="image/png"?"png":format.value==="image/webp"?"webp":"jpg";r.innerHTML=createButton("⬇ Download Converted Image");r.querySelector("button").onclick=()=>downloadBlob(blob,`manjeet-converted.${ext}`);}catch(e){r.innerHTML='<div class="mdh-error">Unable to convert image.</div>';}};}

  function loadReducer(){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>📉 Photo Size Reducer</h3><p>Reduce photo to approximately your target KB.</p>${createFileInput()}<div class="mdh-field"><label>Target Size (KB)</label><input type="number" id="targetKB" value="100" min="10"></div><div id="reduceResult"></div></div>`;const input=toolContent.querySelector(".mdh-file-input"),target=document.getElementById("targetKB"),r=document.getElementById("reduceResult");input.onchange=async function(){const file=this.files[0];if(!file)return;try{const img=await loadImage(file),c=document.createElement("canvas");c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext("2d").drawImage(img,0,0);const tb=Number(target.value)*1024;let low=.05,high=1,best=null;for(let i=0;i<10;i++){let q=(low+high)/2,b=await canvasToBlob(c,"image/jpeg",q);if(b.size<=tb){best=b;low=q}else high=q}if(!best)best=await canvasToBlob(c,"image/jpeg",.05);r.innerHTML=`<div class="mdh-grid"><div class="mdh-stat"><span>Original</span><strong>${formatKB(file.size)}</strong></div><div class="mdh-stat"><span>Reduced</span><strong>${formatKB(best.size)}</strong></div></div><br>${createButton("⬇ Download Reduced Photo")}`;r.querySelector("button").onclick=()=>downloadBlob(best,"manjeet-reduced.jpg");}catch(e){r.innerHTML='<div class="mdh-error">Unable to reduce image.</div>';}};}

  function loadSocial(){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>📱 Social Media Resizer</h3><p>Create images in popular social media sizes.</p>${createFileInput()}<div class="mdh-field"><label>Choose Size</label><select id="socialSize"><option value="1080x1080">Instagram Square — 1080×1080</option><option value="1080x1350">Instagram Portrait — 1080×1350</option><option value="1080x1920">Story / Status — 1080×1920</option><option value="1280x720">YouTube Thumbnail — 1280×720</option><option value="1200x630">Facebook Post — 1200×630</option></select></div><div id="socialResult"></div></div>`;const input=toolContent.querySelector(".mdh-file-input"),sel=document.getElementById("socialSize"),r=document.getElementById("socialResult");input.onchange=async function(){if(!this.files[0])return;try{const img=await loadImage(this.files[0]),[W,H]=sel.value.split("x").map(Number),c=document.createElement("canvas");c.width=W;c.height=H;const ctx=c.getContext("2d"),ir=img.naturalWidth/img.naturalHeight,tr=W/H;let sw=img.naturalWidth,sh=img.naturalHeight,sx=0,sy=0;if(ir>tr){sw=img.naturalHeight*tr;sx=(img.naturalWidth-sw)/2}else{sh=img.naturalWidth/tr;sy=(img.naturalHeight-sh)/2}ctx.drawImage(img,sx,sy,sw,sh,0,0,W,H);const blob=await canvasToBlob(c,"image/jpeg",.92);r.innerHTML=createButton("⬇ Download Social Image");r.querySelector("button").onclick=()=>downloadBlob(blob,"manjeet-social-image.jpg");}catch(e){r.innerHTML='<div class="mdh-error">Unable to create social image.</div>';}};}

  function loadImagesToPDF(){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>📄 Images → PDF</h3><p>Select one or more images and save them as PDF.</p>${createFileInput("image/*",true)}<div id="pdfResult"></div></div>`;const input=toolContent.querySelector(".mdh-file-input"),r=document.getElementById("pdfResult");input.onchange=function(){const files=Array.from(this.files);if(!files.length)return;r.innerHTML=`<div class="mdh-result"><strong>${files.length} image${files.length>1?"s":""} selected</strong><br><br>${createButton("🖨️ Create / Save PDF")}</div>`;r.querySelector("button").onclick=()=>printImagesAsPDF(files);};}
  function printImagesAsPDF(files){const w=window.open("","_blank","width=900,height=700");if(!w)return alert("Please allow pop-ups to create PDF.");let html=`<!doctype html><html><head><title>Manjeet Digital Hub - PDF</title><style>@page{size:A4;margin:0}body{margin:0}.page{width:210mm;height:297mm;display:flex;align-items:center;justify-content:center;page-break-after:always;overflow:hidden}.page img{max-width:190mm;max-height:277mm;object-fit:contain}</style></head><body>`;files.forEach(f=>html+=`<div class="page"><img src="${URL.createObjectURL(f)}"></div>`);html+="</body></html>";w.document.write(html);w.document.close();w.onload=()=>setTimeout(()=>w.print(),700);}

  function simpleCalc(title,html,handler){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>${title}</h3>${html}${createButton("Calculate")}<div id="calcResult"></div></div>`;toolContent.querySelector("button").onclick=handler;}
  function val(id){return Number(document.getElementById(id).value)}

  function loadEMI(){simpleCalc("₹ EMI Calculator",`<div class="mdh-field"><label>Loan Amount (₹)</label><input type="number" id="p" value="500000"></div><div class="mdh-field"><label>Annual Interest Rate (%)</label><input type="number" id="r" value="10"></div><div class="mdh-field"><label>Loan Tenure (Years)</label><input type="number" id="t" value="5"></div>`,()=>{let P=val("p"),n=val("t")*12,r=val("r")/1200,emi=r?P*r*Math.pow(1+r,n)/(Math.pow(1+r,n)-1):P/n,total=emi*n;document.getElementById("calcResult").innerHTML=`<div class="mdh-grid-3"><div class="mdh-stat"><span>Monthly EMI</span><strong>₹${formatNumber(emi)}</strong></div><div class="mdh-stat"><span>Total Interest</span><strong>₹${formatNumber(total-P)}</strong></div><div class="mdh-stat"><span>Total Payment</span><strong>₹${formatNumber(total)}</strong></div></div>`;});}
  function loadGST(){simpleCalc("% GST Calculator",`<div class="mdh-field"><label>Amount (₹)</label><input type="number" id="p" value="10000"></div><div class="mdh-field"><label>GST Rate</label><select id="r"><option>5</option><option>12</option><option selected>18</option><option>28</option></select></div>`,()=>{let a=val("p"),g=a*val("r")/100;document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>GST ₹${formatNumber(g)} | Total ₹${formatNumber(a+g)}</strong></div>`;});}
  function loadPercentage(){simpleCalc("% Percentage Calculator",`<div class="mdh-field"><label>Percentage (%)</label><input type="number" id="r" value="20"></div><div class="mdh-field"><label>Number</label><input type="number" id="p" value="500"></div>`,()=>document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>${val("r")}% of ${formatNumber(val("p"))} = ${formatNumber(val("r")*val("p")/100)}</strong></div>`);}
  function loadSimpleInterest(){simpleCalc("➕ Simple Interest Calculator",`<div class="mdh-field"><label>Principal (₹)</label><input type="number" id="p" value="100000"></div><div class="mdh-field"><label>Rate (%)</label><input type="number" id="r" value="8"></div><div class="mdh-field"><label>Time (Years)</label><input type="number" id="t" value="5"></div>`,()=>{let i=val("p")*val("r")*val("t")/100;document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>Interest ₹${formatNumber(i)} | Total ₹${formatNumber(val("p")+i)}</strong></div>`;});}
  function loadCompound(){simpleCalc("📊 Compound Interest Calculator",`<div class="mdh-field"><label>Principal (₹)</label><input type="number" id="p" value="100000"></div><div class="mdh-field"><label>Rate (%)</label><input type="number" id="r" value="8"></div><div class="mdh-field"><label>Time (Years)</label><input type="number" id="t" value="5"></div>`,()=>{let P=val("p"),A=P*Math.pow(1+val("r")/400,4*val("t"));document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>Interest ₹${formatNumber(A-P)} | Total ₹${formatNumber(A)}</strong></div>`;});}
  function loadDiscount(){simpleCalc("🏷️ Discount Calculator",`<div class="mdh-field"><label>Original Price (₹)</label><input type="number" id="p" value="1000"></div><div class="mdh-field"><label>Discount (%)</label><input type="number" id="r" value="20"></div>`,()=>{let d=val("p")*val("r")/100;document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>Discount ₹${formatNumber(d)} | Final ₹${formatNumber(val("p")-d)}</strong></div>`;});}
  function loadProfit(){simpleCalc("📈 Profit & Loss Calculator",`<div class="mdh-field"><label>Cost Price</label><input type="number" id="p" value="1000"></div><div class="mdh-field"><label>Selling Price</label><input type="number" id="r" value="1200"></div>`,()=>{let d=val("r")-val("p"),type=d>=0?"Profit":"Loss";document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>${type}: ₹${formatNumber(Math.abs(d))}</strong></div>`;});}
  function loadLoanInterest(){loadSimpleInterest();}
  function loadAge(){toolContent.innerHTML=toolCSS()+`<div class="mdh-tool"><h3>🎂 Age Calculator</h3><div class="mdh-field"><label>Date of Birth</label><input type="date" id="dob"></div>${createButton("Calculate Age")}<div id="ageResult"></div></div>`;toolContent.querySelector("button").onclick=()=>{let v=document.getElementById("dob").value;if(!v)return;let d=new Date(v+"T00:00:00"),t=new Date(),y=t.getFullYear()-d.getFullYear(),m=t.getMonth()-d.getMonth(),day=t.getDate()-d.getDate();if(day<0){m--;day+=new Date(t.getFullYear(),t.getMonth(),0).getDate()}if(m<0){y--;m+=12}document.getElementById("ageResult").innerHTML=`<div class="mdh-result"><strong>${y} Years, ${m} Months, ${day} Days</strong></div>`;};}
  function loadCGPA(){simpleCalc("🎓 CGPA → Percentage",`<div class="mdh-field"><label>CGPA</label><input type="number" id="p" value="8.5" step=".01"></div>`,()=>document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>Approx. Percentage: ${formatNumber(val("p")*9.5)}%</strong></div>`);}
  function loadGrade(){simpleCalc("🏅 Grade Calculator",`<div class="mdh-field"><label>Percentage</label><input type="number" id="p" value="85"></div>`,()=>{let p=val("p"),g=p>=90?"A+":p>=80?"A":p>=70?"B":p>=60?"C":p>=50?"D":"F";document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>Grade: ${g}</strong></div>`;});}
  function loadStudyTime(){simpleCalc("⏱️ Study Time Calculator",`<div class="mdh-field"><label>Total Study Hours</label><input type="number" id="p" value="6"></div><div class="mdh-field"><label>Number of Subjects</label><input type="number" id="r" value="4"></div>`,()=>document.getElementById("calcResult").innerHTML=`<div class="mdh-result"><strong>${formatNumber(val("r")?val("p")/val("r"):0)} hours per subject</strong></div>`);}

  function loadTool(tool){switch(tool){
    case"compressor":loadCompressor();break;case"resizer":case"photocropresize":loadResizer();break;case"converter":loadConverter();break;case"reducer":loadReducer();break;case"social":loadSocial();break;
    case"jpgpdf":case"pngpdf":case"pdf":case"pdfprint":loadImagesToPDF();break;
    case"emi":loadEMI();break;case"gst":loadGST();break;case"percentage":loadPercentage();break;case"loaninterest":loadLoanInterest();break;case"interest":loadSimpleInterest();break;case"compound":loadCompound();break;case"discount":loadDiscount();break;case"profit":loadProfit();break;case"age":loadAge();break;case"cgpa":loadCGPA();break;case"grade":loadGrade();break;case"studytime":loadStudyTime();break;
    default:showComingSoon(toolData[tool]?toolData[tool].title:"Digital Tool");
  }}

  document.addEventListener("keydown",function(event){const modifier=navigator.platform.toUpperCase().indexOf("MAC")>=0?event.metaKey:event.ctrlKey;if(modifier&&event.key.toLowerCase()==="k"){event.preventDefault();if(searchInput){searchInput.focus();searchInput.select();}}});
  if("serviceWorker"in navigator)window.addEventListener("load",()=>navigator.serviceWorker.register("./service-worker.js").catch(()=>{}));
  console.log("Manjeet Digital Hub v3.5 loaded successfully.");
});
