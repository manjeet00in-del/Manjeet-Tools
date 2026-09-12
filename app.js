/* =========================================================
   MANJEET DIGITAL HUB
   COMPLETE APP.JS
   Smart Digital Tools. Simple Solutions.
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     BASIC HELPERS
     ======================================================= */

  const $ = (id) => document.getElementById(id);

  function escapeHTML(value) {
    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatNumber(num) {
    if (!isFinite(num)) return "0";
    return Number(num).toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
  }

  function formatKB(bytes) {
    return Math.round(bytes / 1024) + " KB";
  }

  function downloadBlob(blob, filename) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();

    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadCanvas(canvas, filename, type = "image/png", quality = 0.95) {
    canvas.toBlob(function (blob) {
      if (blob) downloadBlob(blob, filename);
    }, type, quality);
  }

  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();

      img.onload = () => resolve(img);
      img.onerror = reject;

      img.src = src;
    });
  }

  function canvasToBlob(canvas, type = "image/jpeg", quality = 0.9) {
    return new Promise(resolve => {
      canvas.toBlob(resolve, type, quality);
    });
  }

  function toolCSS() {
    return `
      <style>
        .mdh-box{
          background:#fff;
          border:1px solid #e5e7eb;
          border-radius:14px;
          padding:14px;
          margin-bottom:12px;
        }

        .mdh-box h3{
          margin:0 0 10px;
          font-size:15px;
        }

        .mdh-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:9px;
        }

        .mdh-field{
          display:flex;
          flex-direction:column;
          gap:5px;
        }

        .mdh-field.full{
          grid-column:1/-1;
        }

        .mdh-field label{
          font-size:12px;
          font-weight:700;
          color:#374151;
        }

        .mdh-field input,
        .mdh-field select,
        .mdh-field textarea{
          width:100%;
          box-sizing:border-box;
          padding:9px 10px;
          border:1px solid #d1d5db;
          border-radius:9px;
          background:#fff;
          font-size:13px;
          outline:none;
        }

        .mdh-field textarea{
          min-height:70px;
          resize:vertical;
        }

        .mdh-field input:focus,
        .mdh-field select:focus,
        .mdh-field textarea:focus{
          border-color:#2563eb;
        }

        .mdh-btn{
          border:0;
          border-radius:9px;
          padding:10px 12px;
          cursor:pointer;
          font-weight:800;
          font-size:12px;
        }

        .mdh-primary{
          background:#2563eb;
          color:#fff;
        }

        .mdh-dark{
          background:#111827;
          color:#fff;
        }

        .mdh-light{
          background:#e5e7eb;
          color:#111827;
        }

        .mdh-green{
          background:#059669;
          color:#fff;
        }

        .mdh-result{
          background:#eff6ff;
          border:1px solid #bfdbfe;
          border-radius:10px;
          padding:12px;
          margin-top:10px;
          font-size:14px;
        }

        .mdh-file{
          border:2px dashed #cbd5e1;
          border-radius:10px;
          padding:13px;
          text-align:center;
          cursor:pointer;
          background:#f8fafc;
          font-size:12px;
          font-weight:700;
        }

        .mdh-file input{
          display:none;
        }

        .mdh-actions{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:8px;
          margin-top:10px;
        }

        @media(max-width:500px){
          .mdh-grid{
            grid-template-columns:1fr;
          }

          .mdh-field.full{
            grid-column:auto;
          }
        }
      </style>
    `;
  }


  /* =======================================================
     TOOL DATA
     ======================================================= */

  const toolData = {

    compressor: {
      title: "Image Compressor",
      icon: "🗜️"
    },

    resizer: {
      title: "Image Resizer",
      icon: "📐"
    },

    converter: {
      title: "Image Converter",
      icon: "🔄"
    },

    reducer: {
      title: "Photo Size Reducer",
      icon: "📉"
    },

    social: {
      title: "Social Media Resizer",
      icon: "📱"
    },

    passport: {
      title: "Passport Photo Maker",
      icon: "🪪"
    },

    jpgpdf: {
      title: "JPG → PDF",
      icon: "📄"
    },

    pdf: {
      title: "Images → PDF",
      icon: "📑"
    },

    mergepdf: {
      title: "Merge PDF",
      icon: "🔗"
    },

    splitpdf: {
      title: "Split PDF",
      icon: "✂️"
    },

    pdfjpg: {
      title: "PDF → JPG",
      icon: "🖼️"
    },

    pdfpng: {
      title: "PDF → PNG",
      icon: "🖼️"
    },

    pdfcompressor: {
      title: "PDF Compressor",
      icon: "🗜️"
    },

    pdfextractor: {
      title: "PDF Page Extractor",
      icon: "📃"
    },

    pdfreorder: {
      title: "PDF Page Reorder",
      icon: "↕️"
    },

    pdfrotate: {
      title: "PDF Rotate",
      icon: "🔄"
    },

    pdfprint: {
      title: "PDF Print Sheet",
      icon: "🖨️"
    },

    schoolid: {
      title: "School ID Card Maker",
      icon: "🎓"
    },

    employeeid: {
      title: "Employee ID Card Maker",
      icon: "👨‍💼"
    },

    photosheet: {
      title: "A4 Photo Sheet Maker",
      icon: "🖨️"
    },

    document: {
      title: "Document Photo Maker",
      icon: "📋"
    },

    visiting: {
      title: "Visiting Card Maker",
      icon: "💼"
    },

    resume: {
      title: "Resume Maker",
      icon: "📄"
    },

    certificate: {
      title: "Certificate Maker",
      icon: "🏆"
    },

    signature: {
      title: "Signature Maker",
      icon: "✍️"
    },

    idprint: {
      title: "ID Card Print Sheet",
      icon: "🪪"
    },

    photolayout: {
      title: "Photo Print Layout",
      icon: "🖼️"
    },

    label: {
      title: "Label / Sticker Maker",
      icon: "🏷️"
    },

    emi: {
      title: "EMI Calculator",
      icon: "💰"
    },

    gst: {
      title: "GST Calculator",
      icon: "🧾"
    },

    percentage: {
      title: "Percentage Calculator",
      icon: "%"
    },

    sip: {
      title: "SIP Calculator",
      icon: "📈"
    },

    fd: {
      title: "FD Calculator",
      icon: "🏦"
    },

    rd: {
      title: "RD Calculator",
      icon: "💵"
    },

    loaninterest: {
      title: "Loan Interest Calculator",
      icon: "💳"
    },

    interest: {
      title: "Simple Interest Calculator",
      icon: "➕"
    },

    compound: {
      title: "Compound Interest Calculator",
      icon: "📊"
    },

    discount: {
      title: "Discount Calculator",
      icon: "🏷️"
    },

    profit: {
      title: "Profit & Loss Calculator",
      icon: "📈"
    },

    age: {
      title: "Age Calculator",
      icon: "🎂"
    },

    insurance: {
      title: "Insurance Policy Return Calculator",
      icon: "🛡️"
    },

    cgpa: {
      title: "CGPA → Percentage",
      icon: "🎓"
    },

    gpa: {
      title: "GPA Calculator",
      icon: "📚"
    },

    marks: {
      title: "Marks Required Calculator",
      icon: "📝"
    },

    grade: {
      title: "Grade Calculator",
      icon: "🏅"
    },

    studytime: {
      title: "Study Time Calculator",
      icon: "⏱️"
    },

    mocktest: {
      title: "Mock Test",
      icon: "📋"
    }
  };


  /* =======================================================
     MODAL
     ======================================================= */

  const modal = $("toolModal");
  const overlay = $("modalOverlay");
  const closeTool = $("closeTool");

  function openTool(id) {

    if (!toolData[id]) return;

    const data = toolData[id];

    if ($("modalIcon")) $("modalIcon").textContent = data.icon;
    if ($("modalTitle")) $("modalTitle").textContent = data.title;

    if ($("toolContent")) {
      $("toolContent").innerHTML = "";
    }

    if (modal) modal.classList.add("active");

    switch (id) {

      /* IMAGE */

      case "compressor":
        loadImageCompressor();
        break;

      case "resizer":
        loadImageResizer();
        break;

      case "converter":
        loadImageConverter();
        break;

      case "reducer":
        loadImageReducer();
        break;

      case "social":
        loadSocialResizer();
        break;

      case "passport":
        loadPassportMaker();
        break;


      /* PDF */

      case "jpgpdf":
      case "pdf":
        loadImagesPDF();
        break;

      case "pdfprint":
        loadImagesPDF();
        break;


      /* SCHOOL */

      case "schoolid":
        loadSchoolID();
        break;


      /* PHOTO SHEET */

      case "photosheet":
        loadPhotoSheet();
        break;


      /* FINANCE */

      case "emi":
        loadEMI();
        break;

      case "gst":
        loadGST();
        break;

      case "percentage":
        loadPercentage();
        break;

      case "sip":
        loadSIP();
        break;

      case "fd":
        loadFD();
        break;

      case "rd":
        loadRD();
        break;

      case "loaninterest":
        loadLoanInterest();
        break;

      case "interest":
        loadSimpleInterest();
        break;

      case "compound":
        loadCompoundInterest();
        break;

      case "discount":
        loadDiscount();
        break;

      case "profit":
        loadProfitLoss();
        break;

      case "age":
        loadAge();
        break;

      case "insurance":
        loadInsurance();
        break;


      /* STUDENT */

      case "cgpa":
        loadCGPA();
        break;

      case "gpa":
        loadGPA();
        break;

      case "marks":
        loadMarksRequired();
        break;

      case "grade":
        loadGrade();
        break;

      case "studytime":
        loadStudyTime();
        break;

      case "mocktest":
        loadMockTest();
        break;


      /* COMING SOON */

      default:
        loadComingSoon(data.title);
        break;
    }
  }


  function closeModal() {
    if (modal) modal.classList.remove("active");
  }

  if (closeTool) closeTool.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", function (e) {

    if (e.key === "Escape") {
      closeModal();
    }

    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {

      e.preventDefault();

      const search = $("toolSearch");

      if (search) {
        search.focus();
      }
    }
  });


  /* =======================================================
     CARD CLICK
     ======================================================= */

  document.querySelectorAll("[data-tool]").forEach(function(card) {

    card.addEventListener("click", function() {

      const id = card.dataset.tool;

      if (id) openTool(id);

    });

  });


  /* =======================================================
     SEARCH
     ======================================================= */

  const searchInput = $("toolSearch");

  if (searchInput) {

    searchInput.addEventListener("input", function() {

      const query =
        this.value.trim().toLowerCase();

      document.querySelectorAll("[data-tool]").forEach(function(card) {

        const id = card.dataset.tool;

        const title =
          toolData[id]?.title?.toLowerCase() || "";

        const text =
          card.textContent.toLowerCase();

        const match =
          !query ||
          title.includes(query) ||
          text.includes(query);

        card.style.display =
          match ? "" : "none";

      });

    });

  }


  /* =======================================================
     IMAGE COMPRESSOR
     ======================================================= */

  function loadImageCompressor() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🗜️ Compress Image</h3>

        <label class="mdh-file">
          📷 Select Image
          <input id="icFile" type="file" accept="image/*">
        </label>

        <div class="mdh-grid" style="margin-top:10px">

          <div class="mdh-field">
            <label>Quality</label>
            <input id="icQuality"
                   type="range"
                   min="10"
                   max="100"
                   value="70">
          </div>

          <div class="mdh-field">
            <label>Max Width</label>
            <input id="icWidth"
                   type="number"
                   value="2000">
          </div>

        </div>

        <div id="icResult"></div>

      </div>
    `;

    $("icFile").addEventListener("change", async function() {

      const file = this.files[0];

      if (!file) return;

      const img =
        await loadImage(
          URL.createObjectURL(file)
        );

      let width = img.width;
      let height = img.height;

      const maxWidth =
        Number($("icWidth").value) || width;

      if (width > maxWidth) {

        const ratio =
          maxWidth / width;

        width = maxWidth;
        height *= ratio;

      }

      const canvas =
        document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      const ctx =
        canvas.getContext("2d");

      ctx.drawImage(
        img,
        0,
        0,
        width,
        height
      );

      const quality =
        Number($("icQuality").value) / 100;

      const blob =
        await canvasToBlob(
          canvas,
          "image/jpeg",
          quality
        );

      $("icResult").innerHTML = `
        <div class="mdh-result">
          Original: ${formatKB(file.size)}<br>
          Compressed: ${formatKB(blob.size)}
          <br><br>
          <button class="mdh-btn mdh-primary" id="icDownload">
            📥 Download
          </button>
        </div>
      `;

      $("icDownload").onclick =
        () => downloadBlob(blob, "compressed-image.jpg");

    });

  }


  /* =======================================================
     IMAGE RESIZER
     ======================================================= */

  function loadImageResizer() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📐 Resize Image</h3>

        <label class="mdh-file">
          📷 Select Image
          <input id="irFile" type="file" accept="image/*">
        </label>

        <div class="mdh-grid" style="margin-top:10px">

          <div class="mdh-field">
            <label>Width</label>
            <input id="irWidth" type="number">
          </div>

          <div class="mdh-field">
            <label>Height</label>
            <input id="irHeight" type="number">
          </div>

        </div>

        <button id="irResize"
                class="mdh-btn mdh-primary"
                style="margin-top:10px;width:100%">
          Resize & Download
        </button>

      </div>
    `;

    let img = null;

    $("irFile").addEventListener("change", async function() {

      const file = this.files[0];

      if (!file) return;

      img =
        await loadImage(
          URL.createObjectURL(file)
        );

      $("irWidth").value = img.width;
      $("irHeight").value = img.height;

    });

    $("irResize").onclick = function() {

      if (!img) {
        alert("Please select an image.");
        return;
      }

      const width =
        Number($("irWidth").value);

      const height =
        Number($("irHeight").value);

      if (!width || !height) return;

      const canvas =
        document.createElement("canvas");

      canvas.width = width;
      canvas.height = height;

      canvas.getContext("2d")
        .drawImage(img, 0, 0, width, height);

      downloadCanvas(
        canvas,
        "resized-image.jpg",
        "image/jpeg"
      );

    };

  }


  /* =======================================================
     IMAGE CONVERTER
     ======================================================= */

  function loadImageConverter() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🔄 Image Converter</h3>

        <label class="mdh-file">
          📷 Select Image
          <input id="convFile" type="file" accept="image/*">
        </label>

        <div class="mdh-field" style="margin-top:10px">
          <label>Convert To</label>

          <select id="convType">
            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WEBP</option>
          </select>
        </div>

        <button id="convBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Convert & Download
        </button>

      </div>
    `;

    let img = null;

    $("convFile").onchange = async function() {

      const file = this.files[0];

      if (!file) return;

      img =
        await loadImage(
          URL.createObjectURL(file)
        );
    };

    $("convBtn").onclick = function() {

      if (!img) {
        alert("Please select an image.");
        return;
      }

      const type =
        $("convType").value;

      const ext =
        type === "image/png"
          ? "png"
          : type === "image/webp"
            ? "webp"
            : "jpg";

      const canvas =
        document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      canvas.getContext("2d")
        .drawImage(img,0,0);

      downloadCanvas(
        canvas,
        "converted-image." + ext,
        type
      );

    };

  }


  /* =======================================================
     PHOTO SIZE REDUCER
     ======================================================= */

  function loadImageReducer() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📉 Photo Size Reducer</h3>

        <label class="mdh-file">
          📷 Select Photo
          <input id="prFile" type="file" accept="image/*">
        </label>

        <div class="mdh-field" style="margin-top:10px">

          <label>Target Size (KB)</label>

          <input id="prTarget"
                 type="number"
                 value="100">

        </div>

        <button id="prBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Reduce Size
        </button>

        <div id="prResult"></div>

      </div>
    `;

    $("prBtn").onclick = async function() {

      const file =
        $("prFile").files[0];

      if (!file) {
        alert("Please select a photo.");
        return;
      }

      const target =
        Number($("prTarget").value) * 1024;

      const img =
        await loadImage(
          URL.createObjectURL(file)
        );

      const canvas =
        document.createElement("canvas");

      canvas.width = img.width;
      canvas.height = img.height;

      canvas.getContext("2d")
        .drawImage(img,0,0);

      let quality = 0.9;
      let blob = null;

      for(let i=0;i<10;i++){

        blob =
          await canvasToBlob(
            canvas,
            "image/jpeg",
            quality
          );

        if(blob.size <= target) break;

        quality -= 0.08;
      }

      $("prResult").innerHTML = `
        <div class="mdh-result">
          Original: ${formatKB(file.size)}<br>
          New: ${formatKB(blob.size)}
          <br><br>

          <button class="mdh-btn mdh-primary"
                  id="prDownload">
            📥 Download
          </button>
        </div>
      `;

      $("prDownload").onclick =
        () => downloadBlob(blob,"reduced-photo.jpg");

    };

  }


  /* =======================================================
     SOCIAL MEDIA RESIZER
     ======================================================= */

  function loadSocialResizer() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📱 Social Media Resizer</h3>

        <label class="mdh-file">
          📷 Select Image
          <input id="srFile" type="file" accept="image/*">
        </label>

        <div class="mdh-field" style="margin-top:10px">

          <label>Preset</label>

          <select id="srPreset">

            <option value="1080,1080">
              Instagram Square – 1080×1080
            </option>

            <option value="1080,1350">
              Instagram Portrait – 1080×1350
            </option>

            <option value="1080,1920">
              Story / Reel – 1080×1920
            </option>

            <option value="1200,630">
              Facebook Post – 1200×630
            </option>

            <option value="1280,720">
              YouTube Thumbnail – 1280×720
            </option>

          </select>

        </div>

        <button id="srBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Resize & Download
        </button>

      </div>
    `;

    let img = null;

    $("srFile").onchange = async function() {

      const file = this.files[0];

      if (!file) return;

      img =
        await loadImage(
          URL.createObjectURL(file)
        );
    };

    $("srBtn").onclick = function() {

      if (!img) {
        alert("Please select an image.");
        return;
      }

      const [w,h] =
        $("srPreset").value.split(",").map(Number);

      const canvas =
        document.createElement("canvas");

      canvas.width = w;
      canvas.height = h;

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0,0,w,h);

      const ratio =
        Math.max(
          w/img.width,
          h/img.height
        );

      const nw = img.width * ratio;
      const nh = img.height * ratio;

      ctx.drawImage(
        img,
        (w-nw)/2,
        (h-nh)/2,
        nw,
        nh
      );

      downloadCanvas(
        canvas,
        "social-media-image.jpg",
        "image/jpeg"
      );

    };

  }


  /* =======================================================
     PASSPORT PHOTO MAKER
     ======================================================= */

  function loadPassportMaker() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🪪 Passport Photo Maker</h3>

        <label class="mdh-file">

          📷 Upload Photo

          <input id="passFile"
                 type="file"
                 accept="image/*">

        </label>

        <div class="mdh-grid" style="margin-top:10px">

          <div class="mdh-field">

            <label>Background</label>

            <select id="passBg">

              <option value="#ffffff">White</option>
              <option value="#f1f5f9">Light Grey</option>
              <option value="#e0f2fe">Light Blue</option>

            </select>

          </div>

          <div class="mdh-field">

            <label>Copies</label>

            <input id="passCopies"
                   type="number"
                   value="8"
                   min="1"
                   max="30">

          </div>

        </div>

        <button id="passBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">

          Create Passport Sheet

        </button>

      </div>
    `;

    let img = null;

    $("passFile").onchange = async function() {

      const file = this.files[0];

      if (!file) return;

      img =
        await loadImage(
          URL.createObjectURL(file)
        );

    };

    $("passBtn").onclick = function() {

      if (!img) {
        alert("Please upload photo.");
        return;
      }

      const bg =
        $("passBg").value;

      const copies =
        Number($("passCopies").value) || 8;

      const photoW = 413;
      const photoH = 531;

      const canvas =
        document.createElement("canvas");

      canvas.width = 2480;
      canvas.height = 3508;

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle = "#fff";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );

      const cols = 4;
      const gap = 70;

      const startX = 170;
      const startY = 180;

      for(let i=0;i<copies;i++){

        const col = i % cols;
        const row = Math.floor(i / cols);

        const x =
          startX +
          col*(photoW+gap);

        const y =
          startY +
          row*(photoH+gap);

        ctx.fillStyle = bg;

        ctx.fillRect(
          x,
          y,
          photoW,
          photoH
        );

        const ratio =
          Math.max(
            photoW/img.width,
            photoH/img.height
          );

        const nw =
          img.width*ratio;

        const nh =
          img.height*ratio;

        ctx.save();

        ctx.beginPath();

        ctx.rect(
          x,
          y,
          photoW,
          photoH
        );

        ctx.clip();

        ctx.drawImage(
          img,
          x+(photoW-nw)/2,
          y+(photoH-nh)/2,
          nw,
          nh
        );

        ctx.restore();

      }

      downloadCanvas(
        canvas,
        "passport-photo-sheet.png"
      );

    };

  }


  /* =======================================================
     SCHOOL ID CARD MAKER
     ======================================================= */

  function loadSchoolID() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <style>

        .sid-wrap{
          display:grid;
          gap:12px;
        }

        .sid-section{
          background:#fff;
          border:1px solid #e5e7eb;
          border-radius:14px;
          padding:14px;
        }

        .sid-section h3{
          margin:0 0 11px;
          font-size:15px;
        }

        .sid-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:9px;
        }

        .sid-field{
          display:flex;
          flex-direction:column;
          gap:5px;
        }

        .sid-field.full{
          grid-column:1/-1;
        }

        .sid-field label{
          font-size:12px;
          font-weight:700;
        }

        .sid-field input,
        .sid-field textarea{
          width:100%;
          box-sizing:border-box;
          padding:9px;
          border:1px solid #d1d5db;
          border-radius:9px;
          font-size:13px;
          outline:none;
        }

        .sid-field textarea{
          min-height:65px;
          resize:vertical;
        }

        .sid-templates{
          display:grid;
          grid-template-columns:repeat(3,1fr);
          gap:7px;
        }

        .sid-template{
          border:2px solid #e5e7eb;
          border-radius:10px;
          padding:7px;
          text-align:center;
          cursor:pointer;
          font-size:10px;
          font-weight:800;
          background:#fff;
        }

        .sid-template.active{
          border-color:#2563eb;
          background:#eff6ff;
        }

        .sid-swatch{
          height:28px;
          border-radius:6px;
          margin-bottom:5px;
        }

        .sid-upload{
          border:2px dashed #cbd5e1;
          border-radius:10px;
          padding:12px;
          text-align:center;
          cursor:pointer;
          background:#f8fafc;
          font-size:12px;
          font-weight:700;
        }

        .sid-upload input{
          display:none;
        }

        .sid-custom{
          display:none;
        }

        .sid-custom.show{
          display:block;
        }

        .sid-color-grid{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:8px;
        }

        .sid-color-grid input{
          width:100%;
          height:40px;
          padding:3px;
        }

        .sid-preview{
          background:#f1f5f9;
          border-radius:12px;
          padding:12px;
          overflow:auto;
        }

        .sid-cards{
          display:flex;
          gap:12px;
          justify-content:center;
          min-width:max-content;
        }

        .sid-card{
          width:360px;
          height:225px;
          flex:none;
          position:relative;
          overflow:hidden;
          border-radius:12px;
          box-shadow:0 6px 20px rgba(0,0,0,.16);
          background:#fff;
          font-family:Arial,sans-serif;
        }

        .sid-header{
          height:64px;
          color:#fff;
          padding:9px;
          box-sizing:border-box;
          display:flex;
          align-items:center;
          gap:9px;
        }

        .sid-logo{
          width:43px;
          height:43px;
          border-radius:50%;
          object-fit:cover;
          background:#fff;
          padding:2px;
          box-sizing:border-box;
        }

        .sid-school{
          font-size:14px;
          font-weight:900;
          line-height:1.1;
        }

        .sid-session{
          font-size:9px;
          margin-top:3px;
        }

        .sid-body{
          display:flex;
          gap:11px;
          padding:12px;
        }

        .sid-photo{
          width:80px;
          height:98px;
          object-fit:cover;
          border-radius:7px;
          background:#e5e7eb;
        }

        .sid-info{
          flex:1;
          font-size:9px;
          line-height:1.65;
        }

        .sid-name{
          font-size:14px;
          font-weight:900;
          margin-bottom:4px;
        }

        .sid-row b{
          display:inline-block;
          width:58px;
        }

        .sid-footer{
          position:absolute;
          bottom:0;
          left:0;
          right:0;
          height:24px;
          color:#fff;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:9px;
          font-weight:800;
        }

        .sid-back-content{
          padding:14px;
        }

        .sid-back-title{
          font-size:15px;
          font-weight:900;
          margin-bottom:10px;
        }

        .sid-back-content p{
          font-size:9px;
          line-height:1.5;
          margin:6px 0;
        }

        .sid-signatures{
          position:absolute;
          left:15px;
          right:15px;
          bottom:17px;
          display:flex;
          justify-content:space-between;
          font-size:8px;
          text-align:center;
        }

        .sid-sign{
          width:85px;
          border-top:1px solid #333;
          padding-top:3px;
        }

        .sid-actions{
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:8px;
        }

        .sid-btn{
          border:0;
          border-radius:9px;
          padding:10px 7px;
          cursor:pointer;
          font-size:11px;
          font-weight:800;
        }

        .sid-blue{
          background:#2563eb;
          color:#fff;
        }

        .sid-dark{
          background:#111827;
          color:#fff;
        }

        .sid-light{
          background:#e5e7eb;
          color:#111827;
        }

        @media(max-width:600px){

          .sid-card{
            width:300px;
            height:188px;
          }

          .sid-header{
            height:54px;
          }

          .sid-logo{
            width:35px;
            height:35px;
          }

          .sid-school{
            font-size:11px;
          }

          .sid-photo{
            width:67px;
            height:83px;
          }

          .sid-body{
            padding:9px;
            gap:8px;
          }

          .sid-name{
            font-size:11px;
          }

          .sid-info{
            font-size:7px;
          }

          .sid-footer{
            height:20px;
            font-size:7px;
          }

        }

        @media(max-width:400px){

          .sid-grid{
            grid-template-columns:1fr;
          }

          .sid-field.full{
            grid-column:auto;
          }

        }

      </style>


      <div class="sid-wrap">


        <!-- TEMPLATES -->

        <div class="sid-section">

          <h3>🎨 Choose Ready-Made Template</h3>

          <div class="sid-templates">

            <div class="sid-template active"
                 data-template="blue">

              <div class="sid-swatch"
                   style="background:#2563eb"></div>

              Classic Blue

            </div>


            <div class="sid-template"
                 data-template="purple">

              <div class="sid-swatch"
                   style="background:#7c3aed"></div>

              Modern Purple

            </div>


            <div class="sid-template"
                 data-template="green">

              <div class="sid-swatch"
                   style="background:#059669"></div>

              Green School

            </div>


            <div class="sid-template"
                 data-template="red">

              <div class="sid-swatch"
                   style="background:#dc2626"></div>

              Red Premium

            </div>


            <div class="sid-template"
                 data-template="navy">

              <div class="sid-swatch"
                   style="background:#0f172a"></div>

              Corporate

            </div>


            <div class="sid-template"
                 data-template="custom">

              <div class="sid-swatch"
                   style="background:linear-gradient(135deg,#f97316,#ec4899)"></div>

              🎨 Custom

            </div>

          </div>

        </div>


        <!-- SCHOOL -->

        <div class="sid-section">

          <h3>🏫 School Details</h3>

          <div class="sid-grid">

            <div class="sid-field full">

              <label>School Name</label>

              <input id="sidSchool"
                     value="ABC PUBLIC SCHOOL">

            </div>


            <div class="sid-field">

              <label>Session</label>

              <input id="sidSession"
                     value="2026 - 2027">

            </div>


            <div class="sid-field">

              <label>School Contact</label>

              <input id="sidSchoolPhone"
                     value="9876543210">

            </div>


            <div class="sid-field full">

              <label>School Address</label>

              <textarea id="sidSchoolAddress">Lucknow, Uttar Pradesh</textarea>

            </div>

          </div>

        </div>


        <!-- STUDENT -->

        <div class="sid-section">

          <h3>👨‍🎓 Student Details</h3>

          <div class="sid-grid">

            <div class="sid-field full">

              <label>Student Name</label>

              <input id="sidName"
                     value="Rahul Sharma">

            </div>


            <div class="sid-field">

              <label>Class</label>

              <input id="sidClass"
                     value="10">

            </div>


            <div class="sid-field">

              <label>Section</label>

              <input id="sidSection"
                     value="A">

            </div>


            <div class="sid-field">

              <label>Roll No.</label>

              <input id="sidRoll"
                     value="101">

            </div>


            <div class="sid-field">

              <label>DOB</label>

              <input id="sidDOB"
                     type="date">

            </div>


            <div class="sid-field">

              <label>Blood Group</label>

              <input id="sidBlood"
                     value="O+">

            </div>


            <div class="sid-field">

              <label>Student Contact</label>

              <input id="sidContact"
                     value="9876543210">

            </div>


            <div class="sid-field full">

              <label>Student Address</label>

              <textarea id="sidAddress">Lucknow, Uttar Pradesh</textarea>

            </div>

          </div>

        </div>


        <!-- UPLOAD -->

        <div class="sid-section">

          <h3>📷 Photos & Logo</h3>

          <div class="sid-grid">

            <label class="sid-upload">

              🏫 Upload School Logo

              <input id="sidLogoInput"
                     type="file"
                     accept="image/*">

            </label>


            <label class="sid-upload">

              👨‍🎓 Upload Student Photo

              <input id="sidPhotoInput"
                     type="file"
                     accept="image/*">

            </label>

          </div>

        </div>


        <!-- CUSTOM -->

        <div id="sidCustomBox"
             class="sid-section sid-custom">

          <h3>🎨 Custom Design</h3>

          <div class="sid-color-grid">

            <div class="sid-field">

              <label>Header Color</label>

              <input id="sidHeaderColor"
                     type="color"
                     value="#2563eb">

            </div>


            <div class="sid-field">

              <label>Footer Color</label>

              <input id="sidFooterColor"
                     type="color"
                     value="#1d4ed8">

            </div>


            <div class="sid-field">

              <label>Background</label>

              <input id="sidBgColor"
                     type="color"
                     value="#ffffff">

            </div>


            <div class="sid-field">

              <label>Accent Color</label>

              <input id="sidAccentColor"
                     type="color"
                     value="#2563eb">

            </div>

          </div>

        </div>


        <!-- PREVIEW -->

        <div class="sid-section">

          <h3>👀 Front + Back Preview</h3>

          <div class="sid-preview">

            <div class="sid-cards">


              <!-- FRONT -->

              <div id="sidFront"
                   class="sid-card">

                <div id="sidFrontHeader"
                     class="sid-header">

                  <img id="sidLogoPreview"
                       class="sid-logo"
                       alt="Logo">

                  <div>

                    <div id="sidSchoolPreview"
                         class="sid-school">
                      ABC PUBLIC SCHOOL
                    </div>

                    <div id="sidSessionPreview"
                         class="sid-session">
                      Session 2026 - 2027
                    </div>

                  </div>

                </div>


                <div class="sid-body">

                  <img id="sidPhotoPreview"
                       class="sid-photo"
                       alt="Student">


                  <div class="sid-info">

                    <div id="sidNamePreview"
                         class="sid-name">
                      Rahul Sharma
                    </div>


                    <div class="sid-row">
                      <b>Class</b>
                      <span id="sidClassPreview">
                        10 - A
                      </span>
                    </div>


                    <div class="sid-row">
                      <b>Roll</b>
                      <span id="sidRollPreview">
                        101
                      </span>
                    </div>


                    <div class="sid-row">
                      <b>DOB</b>
                      <span id="sidDOBPreview">
                        --
                      </span>
                    </div>


                    <div class="sid-row">
                      <b>Blood</b>
                      <span id="sidBloodPreview">
                        O+
                      </span>
                    </div>


                    <div class="sid-row">
                      <b>Contact</b>
                      <span id="sidContactPreview">
                        9876543210
                      </span>
                    </div>

                  </div>

                </div>


                <div id="sidFrontFooter"
                     class="sid-footer">
                  STUDENT ID CARD
                </div>

              </div>


              <!-- BACK -->

              <div id="sidBack"
                   class="sid-card">

                <div class="sid-back-content">

                  <div id="sidBackTitle"
                       class="sid-back-title">
                    ABC PUBLIC SCHOOL
                  </div>


                  <p>
                    <b>School Address:</b><br>
                    <span id="sidAddressPreview">
                      Lucknow, Uttar Pradesh
                    </span>
                  </p>


                  <p>
                    <b>School Contact:</b>
                    <span id="sidSchoolPhonePreview">
                      9876543210
                    </span>
                  </p>


                  <p>
                    <b>Student Address:</b><br>
                    <span id="sidStudentAddressPreview">
                      Lucknow, Uttar Pradesh
                    </span>
                  </p>


                  <p>
                    This identity card is the property of the
                    school. If found, please return it to the
                    school office.
                  </p>


                  <div class="sid-signatures">

                    <div class="sid-sign">
                      Student
                    </div>

                    <div class="sid-sign">
                      Principal
                    </div>

                  </div>

                </div>

              </div>


            </div>

          </div>

        </div>


        <!-- DOWNLOAD -->

        <div class="sid-section">

          <h3>📥 Download / Print</h3>

          <div class="sid-actions">

            <button id="sidDownloadFront"
                    class="sid-btn sid-blue">
              📥 Front PNG
            </button>


            <button id="sidDownloadBack"
                    class="sid-btn sid-dark">
              📥 Back PNG
            </button>


            <button id="sidA4Front"
                    class="sid-btn sid-light">
              🖨️ A4 Front Sheet
            </button>


            <button id="sidA4Back"
                    class="sid-btn sid-light">
              🖨️ A4 Back Sheet
            </button>

          </div>

        </div>

      </div>
    `;


    /* -----------------------------------------------------
       STATE
       ----------------------------------------------------- */

    let currentTemplate = "blue";

    let logoImage = null;
    let studentImage = null;


    const templates = {

      blue: {
        header:"#2563eb",
        footer:"#1d4ed8",
        bg:"#ffffff",
        accent:"#2563eb"
      },

      purple: {
        header:"#7c3aed",
        footer:"#5b21b6",
        bg:"#ffffff",
        accent:"#7c3aed"
      },

      green: {
        header:"#059669",
        footer:"#047857",
        bg:"#ffffff",
        accent:"#059669"
      },

      red: {
        header:"#dc2626",
        footer:"#991b1b",
        bg:"#ffffff",
        accent:"#dc2626"
      },

      navy: {
        header:"#0f172a",
        footer:"#020617",
        bg:"#ffffff",
        accent:"#334155"
      }

    };


    function val(id) {

      const el = $(id);

      return el ? el.value : "";

    }


    function placeholder(text) {

      const svg = `
        <svg xmlns="http://www.w3.org/2000/svg"
             width="300"
             height="350">

          <rect width="300"
                height="350"
                fill="#e5e7eb"/>

          <circle cx="150"
                  cy="120"
                  r="55"
                  fill="#cbd5e1"/>

          <rect x="70"
                y="195"
                width="160"
                height="105"
                rx="50"
                fill="#cbd5e1"/>

          <text x="150"
                y="330"
                text-anchor="middle"
                font-family="Arial"
                font-size="17"
                fill="#64748b">
            ${text}
          </text>

        </svg>
      `;

      return "data:image/svg+xml;charset=UTF-8," +
        encodeURIComponent(svg);

    }


    $("sidLogoPreview").src =
      placeholder("SCHOOL LOGO");

    $("sidPhotoPreview").src =
      placeholder("STUDENT PHOTO");


    /* -----------------------------------------------------
       TEMPLATE COLORS
       ----------------------------------------------------- */

    function applyTheme(theme) {

      $("sidFrontHeader").style.background =
        theme.header;

      $("sidFrontFooter").style.background =
        theme.footer;

      $("sidFront").style.background =
        theme.bg;

      $("sidBack").style.background =
        theme.bg;

      $("sidNamePreview").style.color =
        theme.accent;

      $("sidBackTitle").style.color =
        theme.accent;

    }


    function customTheme() {

      return {

        header: val("sidHeaderColor"),

        footer: val("sidFooterColor"),

        bg: val("sidBgColor"),

        accent: val("sidAccentColor")

      };

    }


    /* -----------------------------------------------------
       TEMPLATE SELECT
       ----------------------------------------------------- */

    document.querySelectorAll(".sid-template")
      .forEach(function(template){

        template.addEventListener("click", function(){

          document.querySelectorAll(".sid-template")
            .forEach(x =>
              x.classList.remove("active")
            );

          template.classList.add("active");

          currentTemplate =
            template.dataset.template;

          if(currentTemplate === "custom"){

            $("sidCustomBox")
              .classList.add("show");

            applyTheme(customTheme());

          }else{

            $("sidCustomBox")
              .classList.remove("show");

            applyTheme(
              templates[currentTemplate]
            );

          }

          updatePreview();

        });

      });


    /* -----------------------------------------------------
       PREVIEW UPDATE
       ----------------------------------------------------- */

    function formatDate(value) {

      if (!value) return "--";

      const d = new Date(value);

      if (isNaN(d.getTime())) return value;

      return String(d.getDate()).padStart(2,"0") +
        "/" +
        String(d.getMonth()+1).padStart(2,"0") +
        "/" +
        d.getFullYear();

    }


    function updatePreview() {

      if(currentTemplate === "custom") {

        applyTheme(customTheme());

      }

      $("sidSchoolPreview").textContent =
        val("sidSchool") || "SCHOOL NAME";

      $("sidSessionPreview").textContent =
        "Session " +
        (val("sidSession") || "2026 - 2027");

      $("sidNamePreview").textContent =
        val("sidName") || "STUDENT NAME";

      $("sidClassPreview").textContent =
        (val("sidClass") || "--") +
        " - " +
        (val("sidSection") || "--");

      $("sidRollPreview").textContent =
        val("sidRoll") || "--";

      $("sidDOBPreview").textContent =
        formatDate(val("sidDOB"));

      $("sidBloodPreview").textContent =
        val("sidBlood") || "--";

      $("sidContactPreview").textContent =
        val("sidContact") || "--";

      $("sidBackTitle").textContent =
        val("sidSchool") || "SCHOOL NAME";

      $("sidAddressPreview").textContent =
        val("sidSchoolAddress") || "--";

      $("sidSchoolPhonePreview").textContent =
        val("sidSchoolPhone") || "--";

      $("sidStudentAddressPreview").textContent =
        val("sidAddress") || "--";

    }


    [
      "sidSchool",
      "sidSession",
      "sidSchoolPhone",
      "sidSchoolAddress",
      "sidName",
      "sidClass",
      "sidSection",
      "sidRoll",
      "sidDOB",
      "sidBlood",
      "sidContact",
      "sidAddress"
    ].forEach(function(id){

      $(id).addEventListener(
        "input",
        updatePreview
      );

    });


    [
      "sidHeaderColor",
      "sidFooterColor",
      "sidBgColor",
      "sidAccentColor"
    ].forEach(function(id){

      $(id).addEventListener(
        "input",
        function(){

          currentTemplate = "custom";

          document.querySelectorAll(".sid-template")
            .forEach(x =>
              x.classList.remove("active")
            );

          document.querySelector(
            '[data-template="custom"]'
          ).classList.add("active");

          $("sidCustomBox")
            .classList.add("show");

          updatePreview();

        }
      );

    });


    /* -----------------------------------------------------
       LOGO
       ----------------------------------------------------- */

    $("sidLogoInput").addEventListener(
      "change",
      function(){

        const file =
          this.files[0];

        if(!file) return;

        const reader =
          new FileReader();

        reader.onload =
          function(e){

            logoImage =
              new Image();

            logoImage.onload =
              function(){

                $("sidLogoPreview").src =
                  e.target.result;

              };

            logoImage.src =
              e.target.result;

          };

        reader.readAsDataURL(file);

      }
    );


    /* -----------------------------------------------------
       STUDENT PHOTO
       ----------------------------------------------------- */

    $("sidPhotoInput").addEventListener(
      "change",
      function(){

        const file =
          this.files[0];

        if(!file) return;

        const reader =
          new FileReader();

        reader.onload =
          function(e){

            studentImage =
              new Image();

            studentImage.onload =
              function(){

                $("sidPhotoPreview").src =
                  e.target.result;

              };

            studentImage.src =
              e.target.result;

          };

        reader.readAsDataURL(file);

      }
    );


    /* -----------------------------------------------------
       CANVAS HELPERS
       ----------------------------------------------------- */

    function drawCover(
      ctx,
      img,
      x,
      y,
      w,
      h
    ){

      const ratio =
        Math.max(
          w/img.width,
          h/img.height
        );

      const nw =
        img.width * ratio;

      const nh =
        img.height * ratio;

      ctx.save();

      ctx.beginPath();

      ctx.roundRect(
        x,
        y,
        w,
        h,
        15
      );

      ctx.clip();

      ctx.drawImage(
        img,
        x+(w-nw)/2,
        y+(h-nh)/2,
        nw,
        nh
      );

      ctx.restore();

    }


    function drawContain(
      ctx,
      img,
      x,
      y,
      w,
      h
    ){

      const ratio =
        Math.min(
          w/img.width,
          h/img.height
        );

      const nw =
        img.width * ratio;

      const nh =
        img.height * ratio;

      ctx.drawImage(
        img,
        x+(w-nw)/2,
        y+(h-nh)/2,
        nw,
        nh
      );

    }


    function wrapText(
      ctx,
      text,
      maxWidth
    ){

      const words =
        String(text).split(" ");

      const lines = [];

      let line = "";

      words.forEach(function(word){

        const test =
          line
            ? line + " " + word
            : word;

        if(
          ctx.measureText(test).width >
          maxWidth
        ){

          if(line)
            lines.push(line);

          line = word;

        }else{

          line = test;

        }

      });

      if(line)
        lines.push(line);

      return lines;

    }


    /* -----------------------------------------------------
       CREATE FRONT / BACK CANVAS
       ----------------------------------------------------- */

    function createSchoolCard(side){

      const canvas =
        document.createElement("canvas");

      canvas.width = 1011;
      canvas.height = 638;

      const ctx =
        canvas.getContext("2d");

      const theme =
        currentTemplate === "custom"
          ? customTheme()
          : templates[currentTemplate];


      ctx.fillStyle =
        theme.bg;

      ctx.fillRect(
        0,
        0,
        1011,
        638
      );


      /* FRONT */

      if(side === "front"){

        ctx.fillStyle =
          theme.header;

        ctx.fillRect(
          0,
          0,
          1011,
          185
        );


        /* LOGO */

        if(logoImage){

          ctx.save();

          ctx.beginPath();

          ctx.arc(
            100,
            92,
            58,
            0,
            Math.PI*2
          );

          ctx.clip();

          drawContain(
            ctx,
            logoImage,
            42,
            34,
            116,
            116
          );

          ctx.restore();

        }else{

          ctx.fillStyle =
            "#ffffff";

          ctx.beginPath();

          ctx.arc(
            100,
            92,
            58,
            0,
            Math.PI*2
          );

          ctx.fill();

          ctx.fillStyle =
            theme.header;

          ctx.textAlign =
            "center";

          ctx.font =
            "bold 20px Arial";

          ctx.fillText(
            "LOGO",
            100,
            99
          );

        }


        /* SCHOOL NAME */

        ctx.fillStyle =
          "#ffffff";

        ctx.textAlign =
          "left";

        ctx.font =
          "bold 38px Arial";

        ctx.fillText(
          val("sidSchool") ||
          "SCHOOL NAME",
          180,
          78
        );

        ctx.font =
          "22px Arial";

        ctx.fillText(
          "Session " +
          (val("sidSession") ||
           "2026 - 2027"),
          180,
          116
        );


        /* PHOTO */

        if(studentImage){

          drawCover(
            ctx,
            studentImage,
            55,
            225,
            220,
            285
          );

        }else{

          ctx.fillStyle =
            "#e5e7eb";

          ctx.fillRect(
            55,
            225,
            220,
            285
          );

          ctx.fillStyle =
            "#64748b";

          ctx.textAlign =
            "center";

          ctx.font =
            "bold 25px Arial";

          ctx.fillText(
            "STUDENT PHOTO",
            165,
            375
          );

        }


        /* NAME */

        ctx.textAlign =
          "left";

        ctx.fillStyle =
          theme.accent;

        ctx.font =
          "bold 42px Arial";

        ctx.fillText(
          val("sidName") ||
          "STUDENT NAME",
          315,
          270
        );


        const rows = [

          [
            "Class",
            (val("sidClass") || "--") +
            " - " +
            (val("sidSection") || "--")
          ],

          [
            "Roll No.",
            val("sidRoll") || "--"
          ],

          [
            "DOB",
            formatDate(val("sidDOB"))
          ],

          [
            "Blood",
            val("sidBlood") || "--"
          ],

          [
            "Contact",
            val("sidContact") || "--"
          ]

        ];


        let y = 330;

        rows.forEach(function(row){

          ctx.fillStyle =
            "#222";

          ctx.font =
            "bold 23px Arial";

          ctx.fillText(
            row[0],
            315,
            y
          );

          ctx.font =
            "23px Arial";

          ctx.fillText(
            ": " + row[1],
            455,
            y
          );

          y += 45;

        });


        /* FOOTER */

        ctx.fillStyle =
          theme.footer;

        ctx.fillRect(
          0,
          590,
          1011,
          48
        );

        ctx.fillStyle =
          "#fff";

        ctx.textAlign =
          "center";

        ctx.font =
          "bold 21px Arial";

        ctx.fillText(
          "STUDENT ID CARD",
          505,
          621
        );


      }else{


        /* BACK HEADER */

        ctx.fillStyle =
          theme.header;

        ctx.fillRect(
          0,
          0,
          1011,
          120
        );


        ctx.fillStyle =
          "#fff";

        ctx.textAlign =
          "center";

        ctx.font =
          "bold 38px Arial";

        ctx.fillText(
          val("sidSchool") ||
          "SCHOOL NAME",
          505,
          70
        );


        /* BACK CONTENT */

        ctx.textAlign =
          "left";

        ctx.fillStyle =
          theme.accent;

        ctx.font =
          "bold 28px Arial";

        ctx.fillText(
          "School Information",
          70,
          180
        );


        ctx.fillStyle =
          "#222";

        ctx.font =
          "22px Arial";

        let y = 225;


        const information = [

          "Address: " +
          (val("sidSchoolAddress") || "--"),

          "School Contact: " +
          (val("sidSchoolPhone") || "--"),

          "Student Address: " +
          (val("sidAddress") || "--")

        ];


        information.forEach(function(text){

          const lines =
            wrapText(
              ctx,
              text,
              870
            );

          lines.forEach(function(line){

            ctx.fillText(
              line,
              70,
              y
            );

            y += 34;

          });

          y += 8;

        });


        ctx.font =
          "21px Arial";


        const note =
          "This identity card is the property of the school. " +
          "If found, please return it to the school office.";


        wrapText(
          ctx,
          note,
          870
        ).forEach(function(line){

          ctx.fillText(
            line,
            70,
            y
          );

          y += 30;

        });


        /* SIGNATURES */

        ctx.strokeStyle =
          "#333";

        ctx.lineWidth = 2;

        ctx.beginPath();

        ctx.moveTo(
          120,
          550
        );

        ctx.lineTo(
          330,
          550
        );

        ctx.stroke();


        ctx.beginPath();

        ctx.moveTo(
          680,
          550
        );

        ctx.lineTo(
          890,
          550
        );

        ctx.stroke();


        ctx.textAlign =
          "center";

        ctx.font =
          "18px Arial";

        ctx.fillText(
          "Student",
          225,
          580
        );

        ctx.fillText(
          "Principal",
          785,
          580
        );

      }


      return canvas;

    }


    /* -----------------------------------------------------
       A4 SHEET
       ----------------------------------------------------- */

    function createA4Sheet(side){

      const canvas =
        document.createElement("canvas");

      canvas.width = 2480;
      canvas.height = 3508;

      const ctx =
        canvas.getContext("2d");


      ctx.fillStyle =
        "#ffffff";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      const card =
        createSchoolCard(side);


      const cardW = 1011;
      const cardH = 638;

      const gapX = 130;
      const gapY = 120;

      const startX = 164;
      const startY = 130;


      for(let row=0;row<4;row++){

        for(let col=0;col<2;col++){

          const x =
            startX +
            col*(cardW+gapX);

          const y =
            startY +
            row*(cardH+gapY);

          ctx.drawImage(
            card,
            x,
            y,
            cardW,
            cardH
          );

        }

      }


      return canvas;

    }


    /* -----------------------------------------------------
       DOWNLOAD BUTTONS
       ----------------------------------------------------- */

    $("sidDownloadFront")
      .addEventListener(
        "click",
        function(){

          downloadCanvas(
            createSchoolCard("front"),
            "school-id-front.png"
          );

        }
      );


    $("sidDownloadBack")
      .addEventListener(
        "click",
        function(){

          downloadCanvas(
            createSchoolCard("back"),
            "school-id-back.png"
          );

        }
      );


    $("sidA4Front")
      .addEventListener(
        "click",
        function(){

          downloadCanvas(
            createA4Sheet("front"),
            "school-id-a4-front-sheet.png"
          );

        }
      );


    $("sidA4Back")
      .addEventListener(
        "click",
        function(){

          downloadCanvas(
            createA4Sheet("back"),
            "school-id-a4-back-sheet.png"
          );

        }
      );


    /* INITIAL */

    applyTheme(
      templates.blue
    );

    updatePreview();

  }


  /* =======================================================
     A4 PHOTO SHEET
     ======================================================= */

  function loadPhotoSheet() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🖨️ A4 Photo Sheet Maker</h3>

        <label class="mdh-file">
          📷 Select Photo
          <input id="psFile" type="file" accept="image/*">
        </label>

        <div class="mdh-grid" style="margin-top:10px">

          <div class="mdh-field">

            <label>Photo Width</label>

            <input id="psW"
                   type="number"
                   value="413">

          </div>

          <div class="mdh-field">

            <label>Photo Height</label>

            <input id="psH"
                   type="number"
                   value="531">

          </div>

        </div>

        <button id="psBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">

          Create A4 Sheet

        </button>

      </div>
    `;

    let img = null;

    $("psFile").onchange = async function() {

      const file = this.files[0];

      if (!file) return;

      img =
        await loadImage(
          URL.createObjectURL(file)
        );

    };


    $("psBtn").onclick = function() {

      if (!img) {
        alert("Please select a photo.");
        return;
      }

      const w =
        Number($("psW").value) || 413;

      const h =
        Number($("psH").value) || 531;


      const canvas =
        document.createElement("canvas");

      canvas.width = 2480;
      canvas.height = 3508;

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle =
        "#fff";

      ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
      );


      const gap = 70;
      const cols = 4;

      const startX = 120;
      const startY = 120;


      for(let row=0;row<6;row++){

        for(let col=0;col<4;col++){

          const x =
            startX +
            col*(w+gap);

          const y =
            startY +
            row*(h+gap);

          if(
            x+w > canvas.width ||
            y+h > canvas.height
          ) continue;


          const ratio =
            Math.max(
              w/img.width,
              h/img.height
            );

          const nw =
            img.width*ratio;

          const nh =
            img.height*ratio;


          ctx.save();

          ctx.beginPath();

          ctx.rect(
            x,
            y,
            w,
            h
          );

          ctx.clip();

          ctx.drawImage(
            img,
            x+(w-nw)/2,
            y+(h-nh)/2,
            nw,
            nh
          );

          ctx.restore();

        }

      }


      downloadCanvas(
        canvas,
        "a4-photo-sheet.png"
      );

    };

  }


  /* =======================================================
     EMI
     ======================================================= */

  function loadEMI() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>💰 EMI Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Loan Amount ₹</label>
            <input id="emiP" type="number" value="500000">
          </div>

          <div class="mdh-field">
            <label>Interest %</label>
            <input id="emiR" type="number" value="9">
          </div>

          <div class="mdh-field">
            <label>Tenure Years</label>
            <input id="emiY" type="number" value="5">
          </div>

        </div>

        <button id="emiBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate EMI
        </button>

        <div id="emiResult"></div>

      </div>
    `;

    $("emiBtn").onclick = function() {

      const P = Number($("emiP").value);
      const annual = Number($("emiR").value);
      const years = Number($("emiY").value);

      const r = annual / 12 / 100;
      const n = years * 12;

      const emi =
        r === 0
          ? P/n
          : P*r*Math.pow(1+r,n) /
            (Math.pow(1+r,n)-1);

      const total =
        emi*n;

      const interest =
        total-P;

      $("emiResult").innerHTML = `
        <div class="mdh-result">

          Monthly EMI:
          <b>₹${formatNumber(emi)}</b>
          <br>

          Total Interest:
          <b>₹${formatNumber(interest)}</b>
          <br>

          Total Payment:
          <b>₹${formatNumber(total)}</b>

        </div>
      `;

    };

  }


  /* =======================================================
     GST
     ======================================================= */

  function loadGST() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🧾 GST Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Amount ₹</label>
            <input id="gstAmount"
                   type="number"
                   value="10000">
          </div>

          <div class="mdh-field">
            <label>GST %</label>
            <input id="gstRate"
                   type="number"
                   value="18">
          </div>

        </div>

        <button id="gstBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="gstResult"></div>

      </div>
    `;

    $("gstBtn").onclick = function() {

      const amount =
        Number($("gstAmount").value);

      const rate =
        Number($("gstRate").value);

      const gst =
        amount*rate/100;

      $("gstResult").innerHTML = `
        <div class="mdh-result">

          GST:
          <b>₹${formatNumber(gst)}</b>
          <br>

          Total:
          <b>₹${formatNumber(amount+gst)}</b>

        </div>
      `;

    };

  }


  /* =======================================================
     PERCENTAGE
     ======================================================= */

  function loadPercentage() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>% Percentage Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Obtained</label>
            <input id="pctObt" type="number">
          </div>

          <div class="mdh-field">
            <label>Total</label>
            <input id="pctTotal" type="number">
          </div>

        </div>

        <button id="pctBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="pctResult"></div>

      </div>
    `;

    $("pctBtn").onclick = function() {

      const a =
        Number($("pctObt").value);

      const b =
        Number($("pctTotal").value);

      const result =
        b ? a/b*100 : 0;

      $("pctResult").innerHTML =
        `<div class="mdh-result">
          Percentage:
          <b>${formatNumber(result)}%</b>
        </div>`;

    };

  }


  /* =======================================================
     SIP
     ======================================================= */

  function loadSIP() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📈 SIP Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Monthly SIP ₹</label>
            <input id="sipP"
                   type="number"
                   value="5000">
          </div>

          <div class="mdh-field">
            <label>Return %</label>
            <input id="sipR"
                   type="number"
                   value="12">
          </div>

          <div class="mdh-field">
            <label>Years</label>
            <input id="sipY"
                   type="number"
                   value="10">
          </div>

        </div>

        <button id="sipBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate SIP
        </button>

        <div id="sipResult"></div>

      </div>
    `;

    $("sipBtn").onclick = function() {

      const p =
        Number($("sipP").value);

      const annual =
        Number($("sipR").value);

      const years =
        Number($("sipY").value);

      const r =
        annual/12/100;

      const n =
        years*12;

      const value =
        p *
        ((Math.pow(1+r,n)-1)/r) *
        (1+r);

      const invested =
        p*n;

      $("sipResult").innerHTML = `
        <div class="mdh-result">

          Invested:
          <b>₹${formatNumber(invested)}</b>
          <br>

          Estimated Value:
          <b>₹${formatNumber(value)}</b>
          <br>

          Estimated Gain:
          <b>₹${formatNumber(value-invested)}</b>

        </div>
      `;

    };

  }


  /* =======================================================
     FD
     ======================================================= */

  function loadFD() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🏦 FD Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Principal ₹</label>
            <input id="fdP" type="number" value="100000">
          </div>

          <div class="mdh-field">
            <label>Rate %</label>
            <input id="fdR" type="number" value="7">
          </div>

          <div class="mdh-field">
            <label>Years</label>
            <input id="fdY" type="number" value="5">
          </div>

          <div class="mdh-field">
            <label>Compounds / Year</label>
            <input id="fdN" type="number" value="4">
          </div>

        </div>

        <button id="fdBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate FD
        </button>

        <div id="fdResult"></div>

      </div>
    `;

    $("fdBtn").onclick = function() {

      const P = Number($("fdP").value);
      const r = Number($("fdR").value)/100;
      const t = Number($("fdY").value);
      const n = Number($("fdN").value);

      const maturity =
        P*Math.pow(1+r/n,n*t);

      $("fdResult").innerHTML = `
        <div class="mdh-result">

          Maturity Amount:
          <b>₹${formatNumber(maturity)}</b>
          <br>

          Interest:
          <b>₹${formatNumber(maturity-P)}</b>

        </div>
      `;

    };

  }


  /* =======================================================
     RD
     ======================================================= */

  function loadRD() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>💵 RD Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Monthly Deposit ₹</label>
            <input id="rdP" type="number" value="5000">
          </div>

          <div class="mdh-field">
            <label>Rate %</label>
            <input id="rdR" type="number" value="7">
          </div>

          <div class="mdh-field">
            <label>Years</label>
            <input id="rdY" type="number" value="5">
          </div>

        </div>

        <button id="rdBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate RD
        </button>

        <div id="rdResult"></div>

      </div>
    `;

    $("rdBtn").onclick = function() {

      const P =
        Number($("rdP").value);

      const annual =
        Number($("rdR").value);

      const years =
        Number($("rdY").value);

      const months =
        years*12;

      const r =
        annual/400;

      const maturity =
        P *
        months *
        (1 + r);

      $("rdResult").innerHTML = `
        <div class="mdh-result">

          Total Deposited:
          <b>₹${formatNumber(P*months)}</b>
          <br>

          Approx. Maturity:
          <b>₹${formatNumber(maturity)}</b>

          <br><small>
          Approximate calculation.
          </small>

        </div>
      `;

    };

  }


  /* =======================================================
     LOAN INTEREST
     ======================================================= */

  function loadLoanInterest() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>💳 Loan Interest Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Loan ₹</label>
            <input id="liP" type="number" value="500000">
          </div>

          <div class="mdh-field">
            <label>Rate %</label>
            <input id="liR" type="number" value="10">
          </div>

          <div class="mdh-field">
            <label>Years</label>
            <input id="liY" type="number" value="5">
          </div>

        </div>

        <button id="liBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="liResult"></div>

      </div>
    `;

    $("liBtn").onclick = function() {

      const P =
        Number($("liP").value);

      const r =
        Number($("liR").value)/100;

      const t =
        Number($("liY").value);

      const interest =
        P*r*t;

      $("liResult").innerHTML = `
        <div class="mdh-result">

          Interest:
          <b>₹${formatNumber(interest)}</b>
          <br>

          Total:
          <b>₹${formatNumber(P+interest)}</b>

        </div>
      `;

    };

  }


  /* =======================================================
     SIMPLE INTEREST
     ======================================================= */

  function loadSimpleInterest() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>➕ Simple Interest</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Principal ₹</label>
            <input id="siP" type="number">
          </div>

          <div class="mdh-field">
            <label>Rate %</label>
            <input id="siR" type="number">
          </div>

          <div class="mdh-field">
            <label>Time Years</label>
            <input id="siT" type="number">
          </div>

        </div>

        <button id="siBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="siResult"></div>

      </div>
    `;

    $("siBtn").onclick = function() {

      const P =
        Number($("siP").value);

      const R =
        Number($("siR").value);

      const T =
        Number($("siT").value);

      const SI =
        P*R*T/100;

      $("siResult").innerHTML =
        `<div class="mdh-result">
          Simple Interest:
          <b>₹${formatNumber(SI)}</b>
          <br>
          Amount:
          <b>₹${formatNumber(P+SI)}</b>
        </div>`;

    };

  }


  /* =======================================================
     COMPOUND INTEREST
     ======================================================= */

  function loadCompoundInterest() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📊 Compound Interest</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Principal ₹</label>
            <input id="ciP"
                   type="number"
                   value="100000">
          </div>

          <div class="mdh-field">
            <label>Rate %</label>
            <input id="ciR"
                   type="number"
                   value="8">
          </div>

          <div class="mdh-field">
            <label>Years</label>
            <input id="ciT"
                   type="number"
                   value="5">
          </div>

        </div>

        <button id="ciBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="ciResult"></div>

      </div>
    `;

    $("ciBtn").onclick = function() {

      const P =
        Number($("ciP").value);

      const R =
        Number($("ciR").value)/100;

      const T =
        Number($("ciT").value);

      const amount =
        P*Math.pow(1+R,T);

      $("ciResult").innerHTML =
        `<div class="mdh-result">
          Amount:
          <b>₹${formatNumber(amount)}</b>
          <br>
          Compound Interest:
          <b>₹${formatNumber(amount-P)}</b>
        </div>`;

    };

  }


  /* =======================================================
     DISCOUNT
     ======================================================= */

  function loadDiscount() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🏷️ Discount Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Original Price ₹</label>
            <input id="dcP"
                   type="number"
                   value="1000">
          </div>

          <div class="mdh-field">
            <label>Discount %</label>
            <input id="dcR"
                   type="number"
                   value="20">
          </div>

        </div>

        <button id="dcBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="dcResult"></div>

      </div>
    `;

    $("dcBtn").onclick = function() {

      const price =
        Number($("dcP").value);

      const rate =
        Number($("dcR").value);

      const discount =
        price*rate/100;

      $("dcResult").innerHTML =
        `<div class="mdh-result">
          Discount:
          <b>₹${formatNumber(discount)}</b>
          <br>
          Final Price:
          <b>₹${formatNumber(price-discount)}</b>
        </div>`;

    };

  }


  /* =======================================================
     PROFIT LOSS
     ======================================================= */

  function loadProfitLoss() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📈 Profit & Loss</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Cost Price ₹</label>
            <input id="plC"
                   type="number"
                   value="1000">
          </div>

          <div class="mdh-field">
            <label>Selling Price ₹</label>
            <input id="plS"
                   type="number"
                   value="1200">
          </div>

        </div>

        <button id="plBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="plResult"></div>

      </div>
    `;

    $("plBtn").onclick = function() {

      const cost =
        Number($("plC").value);

      const sell =
        Number($("plS").value);

      const diff =
        sell-cost;

      const percent =
        cost ? Math.abs(diff)/cost*100 : 0;

      $("plResult").innerHTML =
        `<div class="mdh-result">
          ${
            diff >= 0
              ? "Profit"
              : "Loss"
          }:
          <b>₹${formatNumber(Math.abs(diff))}</b>
          <br>
          Percentage:
          <b>${formatNumber(percent)}%</b>
        </div>`;

    };

  }


  /* =======================================================
     AGE
     ======================================================= */

  function loadAge() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🎂 Age Calculator</h3>

        <div class="mdh-field">

          <label>Date of Birth</label>

          <input id="ageDOB"
                 type="date">

        </div>

        <button id="ageBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate Age
        </button>

        <div id="ageResult"></div>

      </div>
    `;

    $("ageBtn").onclick = function() {

      const value =
        $("ageDOB").value;

      if(!value) {
        alert("Select date of birth.");
        return;
      }

      const dob =
        new Date(value);

      const today =
        new Date();

      let years =
        today.getFullYear() -
        dob.getFullYear();

      let months =
        today.getMonth() -
        dob.getMonth();

      let days =
        today.getDate() -
        dob.getDate();

      if(days < 0){

        months--;

        const previousMonth =
          new Date(
            today.getFullYear(),
            today.getMonth(),
            0
          );

        days +=
          previousMonth.getDate();

      }

      if(months < 0){

        years--;
        months += 12;

      }

      $("ageResult").innerHTML =
        `<div class="mdh-result">
          Age:
          <b>${years} Years ${months} Months ${days} Days</b>
        </div>`;

    };

  }


  /* =======================================================
     INSURANCE RETURN
     ======================================================= */

  function loadInsurance() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🛡️ Insurance Policy Return Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Annual Premium ₹</label>
            <input id="insP"
                   type="number"
                   value="50000">
          </div>

          <div class="mdh-field">
            <label>Policy Term Years</label>
            <input id="insY"
                   type="number"
                   value="20">
          </div>

          <div class="mdh-field">
            <label>Expected Maturity ₹</label>
            <input id="insM"
                   type="number"
                   value="1500000">
          </div>

        </div>

        <button id="insBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="insResult"></div>

      </div>
    `;

    $("insBtn").onclick = function() {

      const premium =
        Number($("insP").value);

      const years =
        Number($("insY").value);

      const maturity =
        Number($("insM").value);

      const invested =
        premium*years;

      const gain =
        maturity-invested;

      $("insResult").innerHTML =
        `<div class="mdh-result">
          Total Premium:
          <b>₹${formatNumber(invested)}</b>
          <br>
          Maturity:
          <b>₹${formatNumber(maturity)}</b>
          <br>
          Gain:
          <b>₹${formatNumber(gain)}</b>
        </div>`;

    };

  }


  /* =======================================================
     CGPA
     ======================================================= */

  function loadCGPA() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🎓 CGPA → Percentage</h3>

        <div class="mdh-field">

          <label>CGPA</label>

          <input id="cgpaValue"
                 type="number"
                 step="0.01"
                 value="8">

        </div>

        <button id="cgpaBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Convert
        </button>

        <div id="cgpaResult"></div>

      </div>
    `;

    $("cgpaBtn").onclick = function() {

      const cgpa =
        Number($("cgpaValue").value);

      const percentage =
        cgpa*9.5;

      $("cgpaResult").innerHTML =
        `<div class="mdh-result">
          Percentage:
          <b>${formatNumber(percentage)}%</b>
        </div>`;

    };

  }


  /* =======================================================
     GPA
     ======================================================= */

  function loadGPA() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📚 GPA Calculator</h3>

        <div class="mdh-field">

          <label>Grade Points</label>

          <input id="gpaValues"
                 placeholder="8, 9, 7, 8.5">

        </div>

        <button id="gpaBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate GPA
        </button>

        <div id="gpaResult"></div>

      </div>
    `;

    $("gpaBtn").onclick = function() {

      const values =
        $("gpaValues").value
          .split(",")
          .map(Number)
          .filter(x => !isNaN(x));

      if(!values.length) return;

      const avg =
        values.reduce(
          (a,b)=>a+b,
          0
        ) / values.length;

      $("gpaResult").innerHTML =
        `<div class="mdh-result">
          GPA:
          <b>${formatNumber(avg)}</b>
        </div>`;

    };

  }


  /* =======================================================
     MARKS REQUIRED
     ======================================================= */

  function loadMarksRequired() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📝 Marks Required Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Total Marks</label>
            <input id="mrTotal"
                   type="number"
                   value="500">
          </div>

          <div class="mdh-field">
            <label>Target %</label>
            <input id="mrTarget"
                   type="number"
                   value="75">
          </div>

          <div class="mdh-field">
            <label>Marks Already Obtained</label>
            <input id="mrObt"
                   type="number"
                   value="250">
          </div>

          <div class="mdh-field">
            <label>Subjects Remaining</label>
            <input id="mrRemain"
                   type="number"
                   value="2">
          </div>

        </div>

        <button id="mrBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="mrResult"></div>

      </div>
    `;

    $("mrBtn").onclick = function() {

      const total =
        Number($("mrTotal").value);

      const target =
        Number($("mrTarget").value);

      const obtained =
        Number($("mrObt").value);

      const remaining =
        Number($("mrRemain").value);

      const requiredTotal =
        total*target/100;

      const required =
        requiredTotal-obtained;

      $("mrResult").innerHTML =
        `<div class="mdh-result">
          Total marks required:
          <b>${formatNumber(requiredTotal)}</b>
          <br>
          Additional marks required:
          <b>${formatNumber(Math.max(0,required))}</b>
          <br>
          Approx. per remaining subject:
          <b>${formatNumber(
            remaining ? required/remaining : 0
          )}</b>
        </div>`;

    };

  }


  /* =======================================================
     GRADE
     ======================================================= */

  function loadGrade() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>🏅 Grade Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Obtained Marks</label>
            <input id="gradeObt"
                   type="number"
                   value="80">
          </div>

          <div class="mdh-field">
            <label>Total Marks</label>
            <input id="gradeTotal"
                   type="number"
                   value="100">
          </div>

        </div>

        <button id="gradeBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate Grade
        </button>

        <div id="gradeResult"></div>

      </div>
    `;

    $("gradeBtn").onclick = function() {

      const obt =
        Number($("gradeObt").value);

      const total =
        Number($("gradeTotal").value);

      const pct =
        total ? obt/total*100 : 0;

      let grade = "F";

      if(pct >= 90) grade="A+";
      else if(pct >= 80) grade="A";
      else if(pct >= 70) grade="B";
      else if(pct >= 60) grade="C";
      else if(pct >= 50) grade="D";

      $("gradeResult").innerHTML =
        `<div class="mdh-result">
          Percentage:
          <b>${formatNumber(pct)}%</b>
          <br>
          Grade:
          <b>${grade}</b>
        </div>`;

    };

  }


  /* =======================================================
     STUDY TIME
     ======================================================= */

  function loadStudyTime() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>⏱️ Study Time Calculator</h3>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Total Study Hours</label>
            <input id="stHours"
                   type="number"
                   value="6">
          </div>

          <div class="mdh-field">
            <label>Subjects</label>
            <input id="stSubjects"
                   type="number"
                   value="3">
          </div>

        </div>

        <button id="stBtn"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">
          Calculate
        </button>

        <div id="stResult"></div>

      </div>
    `;

    $("stBtn").onclick = function() {

      const hours =
        Number($("stHours").value);

      const subjects =
        Number($("stSubjects").value);

      const per =
        subjects ? hours/subjects : 0;

      $("stResult").innerHTML =
        `<div class="mdh-result">
          Recommended time per subject:
          <b>${formatNumber(per)} hours</b>
        </div>`;

    };

  }


  /* =======================================================
     MOCK TEST
     ======================================================= */

  function loadMockTest() {

    const box = $("toolContent");

    const questions = [

      {
        q:"What is 15 × 4?",
        options:["45","50","60","75"],
        answer:2
      },

      {
        q:"Capital of India?",
        options:["Mumbai","Delhi","Kolkata","Lucknow"],
        answer:1
      },

      {
        q:"12 + 18 = ?",
        options:["20","25","30","35"],
        answer:2
      },

      {
        q:"Which planet is known as the Red Planet?",
        options:["Earth","Mars","Venus","Jupiter"],
        answer:1
      },

      {
        q:"100 ÷ 10 = ?",
        options:["5","10","20","25"],
        answer:1
      }

    ];


    let html = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📋 Quick Mock Test</h3>

    `;


    questions.forEach(function(q,i){

      html += `
        <div style="
          padding:10px 0;
          border-bottom:1px solid #e5e7eb;
        ">

          <b>${i+1}. ${q.q}</b>

          <div style="
            display:grid;
            gap:5px;
            margin-top:7px;
          ">

      `;

      q.options.forEach(function(option,j){

        html += `
          <label style="font-size:13px">
            <input
              type="radio"
              name="mock${i}"
              value="${j}">
            ${option}
          </label>
        `;

      });

      html += `
          </div>
        </div>
      `;

    });


    html += `

        <button id="mockSubmit"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:12px">
          Submit Test
        </button>

        <div id="mockResult"></div>

      </div>
    `;


    box.innerHTML = html;


    $("mockSubmit").onclick = function(){

      let score = 0;

      questions.forEach(function(q,i){

        const selected =
          document.querySelector(
            `input[name="mock${i}"]:checked`
          );

        if(
          selected &&
          Number(selected.value) === q.answer
        ){
          score++;
        }

      });


      const percent =
        score/questions.length*100;


      $("mockResult").innerHTML = `
        <div class="mdh-result">

          Score:
          <b>${score}/${questions.length}</b>

          <br>

          Percentage:
          <b>${formatNumber(percent)}%</b>

        </div>
      `;

    };

  }


  /* =======================================================
     IMAGES → PDF
     Browser Print Method
     ======================================================= */

  function loadImagesPDF() {

    const box = $("toolContent");

    box.innerHTML = `
      ${toolCSS()}

      <div class="mdh-box">

        <h3>📄 Images → PDF</h3>

        <label class="mdh-file">

          📷 Select Images

          <input id="pdfImages"
                 type="file"
                 accept="image/*"
                 multiple>

        </label>

        <button id="pdfCreate"
                class="mdh-btn mdh-primary"
                style="width:100%;margin-top:10px">

          🖨️ Create PDF

        </button>

        <p style="
          font-size:11px;
          color:#64748b;
          margin-top:9px;
        ">
          Your browser's print dialog will open.
          Select "Save as PDF".
        </p>

      </div>
    `;


    $("pdfCreate").onclick =
      async function(){

        const files =
          Array.from(
            $("pdfImages").files
          );

        if(!files.length){

          alert("Please select images.");

          return;
        }


        let pages = "";

        for(const file of files){

          const url =
            URL.createObjectURL(file);

          pages += `
            <div class="pdf-page">
              <img src="${url}">
            </div>
          `;

        }


        const printWindow =
          window.open(
            "",
            "_blank"
          );


        if(!printWindow){

          alert(
            "Please allow popups for this website."
          );

          return;
        }


        printWindow.document.write(`

          <html>

          <head>

            <title>Manjeet Digital Hub PDF</title>

            <style>

              @page{
                size:A4;
                margin:0;
              }

              html,body{
                margin:0;
                padding:0;
              }

              .pdf-page{
                width:210mm;
                height:297mm;
                display:flex;
                align-items:center;
                justify-content:center;
                page-break-after:always;
                overflow:hidden;
              }

              .pdf-page img{
                max-width:190mm;
                max-height:277mm;
                object-fit:contain;
              }

            </style>

          </head>

          <body>

            ${pages}

            <script>

              window.onload=function(){
                setTimeout(
                  function(){
                    window.print();
                  },
                  500
                );
              };

            <\/script>

          </body>

          </html>

        `);


        printWindow.document.close();

      };

  }


  /* =======================================================
     COMING SOON
     ======================================================= */

  function loadComingSoon(title) {

    const box =
      $("toolContent");

    box.innerHTML = `

      ${toolCSS()}

      <div class="mdh-box"
           style="text-align:center;padding:30px 15px">

        <div style="
          font-size:45px;
          margin-bottom:10px;
        ">
          🚀
        </div>

        <h3>
          ${escapeHTML(title)}
        </h3>

        <p style="
          color:#64748b;
          font-size:13px;
          line-height:1.6;
        ">
          This tool is currently under development.
          <br>
          It will be available in a future update.
        </p>

      </div>

    `;

  }


  /* =======================================================
     YEAR
     ======================================================= */

  const yearElements =
    document.querySelectorAll(
      "#year,.current-year"
    );

  yearElements.forEach(function(el){

    el.textContent =
      new Date().getFullYear();

  });


  /* =======================================================
     SERVICE WORKER
     ======================================================= */

  if(
    "serviceWorker" in navigator
  ){

    window.addEventListener(
      "load",
      function(){

        navigator.serviceWorker
          .register("service-worker.js")
          .then(function(){

            console.log(
              "Manjeet Digital Hub service worker registered."
            );

          })
          .catch(function(error){

            console.log(
              "Service worker registration failed:",
              error
            );

          });

      }
    );

  }


  /* =======================================================
     GLOBAL FUNCTION
     ======================================================= */

  window.openTool = openTool;


  console.log(
    "Manjeet Digital Hub loaded successfully."
  );

});
