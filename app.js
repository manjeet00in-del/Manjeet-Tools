/* =========================================================
   MANJEET DIGITAL HUB - COMPLETE APP.JS
   Version: 3.1
   Smart Digital Tools. Simple Solutions.
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", function () {

  /* =======================================================
     ELEMENTS
     ======================================================= */

  const modal = document.getElementById("toolModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeTool = document.getElementById("closeTool");
  const modalTitle = document.getElementById("modalTitle");
  const modalIcon = document.getElementById("modalIcon");
  const toolContent = document.getElementById("toolContent");
  const searchInput = document.getElementById("toolSearch");
  const noResults = document.getElementById("noResults");
  const currentYear = document.getElementById("currentYear");


  /* =======================================================
     YEAR
     ======================================================= */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =======================================================
     TOOL DATA
     ======================================================= */

  const toolData = {

    /* IMAGE */

    compressor: {
      title: "Image Compressor",
      icon: "🗜️"
    },

    resizer: {
      title: "Image Resizer",
      icon: "↔️"
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


    /* PDF */

    jpgpdf: {
      title: "JPG → PDF",
      icon: "🖼️"
    },

    pdf: {
      title: "Images → PDF",
      icon: "📄"
    },

    mergepdf: {
      title: "Merge PDF",
      icon: "📚"
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
      icon: "📤"
    },

    pdfreorder: {
      title: "PDF Page Reorder",
      icon: "🔀"
    },

    pdfrotate: {
      title: "PDF Rotate",
      icon: "🔄"
    },

    pdfprint: {
      title: "PDF Print Sheet",
      icon: "🖨️"
    },


    /* ID & PRINT */

    schoolid: {
      title: "School ID Card Maker",
      icon: "🎓"
    },

    employeeid: {
      title: "Employee ID Card Maker",
      icon: "💼"
    },

    photosheet: {
      title: "A4 Photo Sheet Maker",
      icon: "🖨️"
    },

    document: {
      title: "Document Photo Maker",
      icon: "📑"
    },

    visiting: {
      title: "Visiting Card Maker",
      icon: "💳"
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
      icon: "📐"
    },

    label: {
      title: "Label / Sticker Maker",
      icon: "🏷️"
    },


    /* FINANCE */

    emi: {
      title: "EMI Calculator",
      icon: "₹"
    },

    gst: {
      title: "GST Calculator",
      icon: "%"
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
      icon: "🏦"
    },

    loaninterest: {
      title: "Loan Interest Calculator",
      icon: "💰"
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


    /* STUDENT */

    cgpa: {
      title: "CGPA → Percentage",
      icon: "🎓"
    },

    gpa: {
      title: "GPA Calculator",
      icon: "🎓"
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
      icon: "🧠"
    }
  };


  /* =======================================================
     BASIC HELPERS
     ======================================================= */

  function escapeHTML(value) {

    return String(value ?? "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function formatNumber(value, decimals = 2) {

    const number = Number(value);

    if (!Number.isFinite(number)) {
      return "0";
    }

    return number.toLocaleString("en-IN", {
      maximumFractionDigits: decimals
    });

  }


  function formatKB(bytes) {

    return (bytes / 1024).toFixed(1) + " KB";

  }


  function downloadBlob(blob, filename) {

    if (!blob) {
      alert("Unable to create file.");
      return;
    }

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = filename;

    document.body.appendChild(a);

    a.click();

    a.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

  }


  function loadImage(file) {

    return new Promise(function (resolve, reject) {

      if (!file) {
        reject(new Error("No file selected"));
        return;
      }

      const url = URL.createObjectURL(file);

      const img = new Image();

      img.onload = function () {

        URL.revokeObjectURL(url);

        resolve(img);

      };

      img.onerror = function () {

        URL.revokeObjectURL(url);

        reject(new Error("Image load failed"));

      };

      img.src = url;

    });

  }


  function canvasToBlob(
    canvas,
    type = "image/jpeg",
    quality = 0.9
  ) {

    return new Promise(function (resolve, reject) {

      canvas.toBlob(function (blob) {

        if (blob) {
          resolve(blob);
        } else {
          reject(new Error("Unable to create image"));
        }

      }, type, quality);

    });

  }


  function createButton(text, className = "") {

    return `
      <button type="button" class="mdh-action ${className}">
        ${escapeHTML(text)}
      </button>
    `;

  }


  /* =======================================================
     FIXED FILE INPUT
     iPhone / Android friendly
     ======================================================= */

  function createFileInput(
    accept = "image/*",
    multiple = false
  ) {

    return `
      <label class="mdh-upload-box">

        <input
          type="file"
          class="mdh-file-input"
          accept="${escapeHTML(accept)}"
          ${multiple ? "multiple" : ""}
        >

        <div class="mdh-upload-icon">📁</div>

        <strong>
          Choose File${multiple ? "s" : ""}
        </strong>

        <small>
          Tap here to select from your device
        </small>

      </label>
    `;

  }


  /* =======================================================
     TOOL CSS
     COMPACT + MOBILE FRIENDLY
     ======================================================= */

  function toolCSS() {

    return `
      <style>

        .mdh-tool {
          display:flex;
          flex-direction:column;
          gap:10px;
        }

        .mdh-tool h3 {
          margin:0;
          font-size:16px;
          line-height:1.25;
        }

        .mdh-tool p {
          margin:0;
          color:#64748b;
          font-size:12px;
          line-height:1.4;
        }

        .mdh-field {
          display:flex;
          flex-direction:column;
          gap:4px;
        }

        .mdh-field label {
          font-size:11px;
          font-weight:600;
        }

        .mdh-field input,
        .mdh-field select,
        .mdh-field textarea {
          width:100%;
          box-sizing:border-box;
          border:1px solid #dbe3ef;
          border-radius:8px;
          padding:7px 9px;
          font-size:12px;
          background:#fff;
          outline:none;
        }

        .mdh-field input:focus,
        .mdh-field select:focus,
        .mdh-field textarea:focus {
          border-color:#2563eb;
          box-shadow:0 0 0 2px rgba(37,99,235,.08);
        }

        .mdh-field textarea {
          min-height:100px;
          resize:vertical;
        }

        .mdh-grid {
          display:grid;
          grid-template-columns:repeat(2,minmax(0,1fr));
          gap:8px;
        }

        .mdh-grid-3 {
          display:grid;
          grid-template-columns:repeat(3,minmax(0,1fr));
          gap:7px;
        }


        /* IMPORTANT:
           Label makes the whole upload box clickable.
           Input is visually hidden but still usable
           by iPhone / Android file picker.
        */

        .mdh-upload-box {
          position:relative;
          display:block;
          width:100%;
          box-sizing:border-box;

          border:2px dashed #bfdbfe;
          border-radius:12px;

          padding:15px 10px;

          text-align:center;

          background:#f8fbff;

          cursor:pointer;

          user-select:none;
          -webkit-user-select:none;

          -webkit-tap-highlight-color:transparent;

          touch-action:manipulation;
        }

        .mdh-upload-box:active {
          transform:scale(.99);
          background:#f1f7ff;
        }

        .mdh-upload-box input {
          position:absolute !important;

          width:1px !important;
          height:1px !important;

          padding:0 !important;
          margin:-1px !important;

          overflow:hidden !important;

          clip:rect(0,0,0,0) !important;
          clip-path:inset(50%) !important;

          white-space:nowrap !important;

          border:0 !important;
          opacity:0 !important;
        }

        .mdh-upload-icon {
          font-size:25px;
          margin-bottom:5px;
          pointer-events:none;
        }

        .mdh-upload-box strong {
          display:block;
          font-size:12px;
          line-height:1.3;
          pointer-events:none;
        }

        .mdh-upload-box small {
          display:block;
          margin-top:4px;
          color:#64748b;
          font-size:10px;
          line-height:1.3;
          pointer-events:none;
        }


        .mdh-action {
          border:0;
          border-radius:8px;

          padding:8px 10px;

          background:#2563eb;
          color:white;

          font-size:12px;
          font-weight:600;

          cursor:pointer;

          min-height:36px;

          -webkit-tap-highlight-color:transparent;
          touch-action:manipulation;
        }

        .mdh-action:active {
          transform:scale(.98);
        }

        .mdh-action.secondary {
          background:#eef4ff;
          color:#1d4ed8;
        }


        .mdh-result {
          background:#f8fafc;
          border:1px solid #e2e8f0;
          border-radius:10px;
          padding:10px;
        }

        .mdh-result strong {
          font-size:15px;
        }


        .mdh-stat {
          padding:8px;
          border-radius:8px;
          background:#eff6ff;
          text-align:center;
          min-width:0;
        }

        .mdh-stat span {
          display:block;
          color:#64748b;
          font-size:10px;
        }

        .mdh-stat strong {
          display:block;
          margin-top:3px;
          font-size:13px;
          word-break:break-word;
        }


        .mdh-preview {
          max-width:100%;
          max-height:350px;
          border-radius:8px;
          border:1px solid #e2e8f0;
          display:block;
          margin:auto;
        }


        .mdh-note {
          font-size:10px;
          color:#64748b;
          background:#f8fafc;
          padding:8px;
          border-radius:8px;
          line-height:1.4;
        }


        .mdh-coming {
          text-align:center;
          padding:15px 8px;
        }

        .mdh-coming .big {
          font-size:35px;
          margin-bottom:6px;
        }

        .mdh-coming h3 {
          margin-bottom:5px;
        }

        .mdh-coming p {
          margin-bottom:10px;
        }


        .mdh-error {
          color:#dc2626;
          background:#fef2f2;
          border-radius:8px;
          padding:8px;
          font-size:11px;
        }


        @media(max-width:520px) {

          .mdh-tool {
            gap:9px;
          }

          .mdh-tool h3 {
            font-size:15px;
          }

          .mdh-tool p {
            font-size:11px;
          }

          .mdh-field {
            gap:3px;
          }

          .mdh-field label {
            font-size:11px;
          }

          .mdh-field input,
          .mdh-field select,
          .mdh-field textarea {
            padding:7px 9px;
            font-size:12px;
          }

          .mdh-action {
            padding:8px 10px;
            font-size:12px;
          }

          .mdh-upload-box {
            padding:13px 8px;
          }

        }

      </style>
    `;

  }


  /* =======================================================
     MODAL
     ======================================================= */

  function openTool(toolName) {

    // School ID Card Maker has its own complete dedicated page.
    if (toolName === "schoolid") {
      window.location.href = "tools/school-id-card-maker.html";
      return;
    }

    const data = toolData[toolName];

    if (!data) {

      showComingSoon("Digital Tool");

      return;

    }

    if (modalTitle) {
      modalTitle.textContent = data.title;
    }

    if (modalIcon) {
      modalIcon.textContent = data.icon;
    }

    if (modal) {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
    }

    document.body.classList.add("modal-open");

    loadTool(toolName);

  }


  function closeModal() {

    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
    }

    document.body.classList.remove("modal-open");

    if (toolContent) {
      toolContent.innerHTML = "";
    }

  }


  if (closeTool) {
    closeTool.addEventListener("click", closeModal);
  }


  if (modalOverlay) {
    modalOverlay.addEventListener("click", closeModal);
  }


  document.addEventListener("keydown", function (event) {

    if (event.key === "Escape") {
      closeModal();
    }

  });


  /* =======================================================
     TOOL CARD CLICK
     ======================================================= */

  document.querySelectorAll(".tool-card").forEach(function (card) {

    card.addEventListener("click", function () {

      const tool = card.getAttribute("data-tool");

      if (tool) {
        openTool(tool);
      }

    });

  });


  /* =======================================================
     SEARCH
     ======================================================= */

  if (searchInput) {

    searchInput.addEventListener("input", function () {

      const query =
        this.value.trim().toLowerCase();

      let visible = 0;

      document.querySelectorAll(".tool-card").forEach(function (card) {

        const name =
          (
            card.getAttribute("data-name") ||
            card.textContent ||
            ""
          ).toLowerCase();

        if (!query || name.includes(query)) {

          card.style.display = "";

          visible++;

        } else {

          card.style.display = "none";

        }

      });


      if (noResults) {

        noResults.classList.toggle(
          "show",
          query.length > 0 && visible === 0
        );

      }

    });

  }


  /* =======================================================
     COMING SOON
     ======================================================= */

  function showComingSoon(title) {

    if (!toolContent) return;

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-coming">

        <div class="big">🚀</div>

        <h3>${escapeHTML(title)}</h3>

        <p>
          This tool is coming soon to Manjeet Digital Hub.
          We are working on a fast and mobile-friendly version.
        </p>

        <div class="mdh-note">
          <strong>Coming in next updates</strong><br>
          More free digital tools will be added soon.
        </div>

      </div>

    `;

  }


  /* =======================================================
     IMAGE COMPRESSOR
     ======================================================= */

  function loadCompressor() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🗜️ Image Compressor</h3>

        <p>
          Reduce image file size while keeping good quality.
        </p>

        ${createFileInput()}

        <div class="mdh-field">

          <label>
            Quality:
            <span id="qualityValue">80</span>%
          </label>

          <input
            type="range"
            id="compressQuality"
            min="10"
            max="100"
            value="80"
          >

        </div>

        <div id="compressResult"></div>

      </div>

    `;

    const input =
      toolContent.querySelector(".mdh-file-input");

    const quality =
      document.getElementById("compressQuality");

    const qualityValue =
      document.getElementById("qualityValue");

    const result =
      document.getElementById("compressResult");

    quality.addEventListener("input", function () {

      qualityValue.textContent = this.value;

    });


    input.addEventListener("change", async function () {

      const file = this.files[0];

      if (!file) return;

      try {

        const img =
          await loadImage(file);

        const canvas =
          document.createElement("canvas");

        canvas.width =
          img.naturalWidth;

        canvas.height =
          img.naturalHeight;

        const ctx =
          canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

        const blob =
          await canvasToBlob(
            canvas,
            "image/jpeg",
            Number(quality.value) / 100
          );

        const saved =
          Math.max(
            0,
            Math.round(
              (1 - blob.size / file.size) * 100
            )
          );

        result.innerHTML = `

          <div class="mdh-grid-3">

            <div class="mdh-stat">
              <span>Original</span>
              <strong>${formatKB(file.size)}</strong>
            </div>

            <div class="mdh-stat">
              <span>New Size</span>
              <strong>${formatKB(blob.size)}</strong>
            </div>

            <div class="mdh-stat">
              <span>Saved</span>
              <strong>${saved}%</strong>
            </div>

          </div>

          <br>

          ${createButton(
            "⬇ Download Compressed Image"
          )}

        `;

        result.querySelector("button").addEventListener(
          "click",
          function () {

            downloadBlob(
              blob,
              "manjeet-compressed.jpg"
            );

          }
        );

      } catch (error) {

        result.innerHTML =
          `<div class="mdh-error">
            Unable to process this image.
          </div>`;

      }

    });

  }


  /* =======================================================
     IMAGE RESIZER
     ======================================================= */

  function loadResizer() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>↔️ Image Resizer</h3>

        <p>
          Resize your image to any custom dimensions.
        </p>

        ${createFileInput()}

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Width</label>
            <input
              type="number"
              id="resizeWidth"
              placeholder="Width"
            >
          </div>

          <div class="mdh-field">
            <label>Height</label>
            <input
              type="number"
              id="resizeHeight"
              placeholder="Height"
            >
          </div>

        </div>

        <label style="font-size:12px">
          <input
            type="checkbox"
            id="keepRatio"
            checked
          >
          Keep aspect ratio
        </label>

        <div id="resizeResult"></div>

      </div>

    `;

    const input =
      toolContent.querySelector(".mdh-file-input");

    const widthInput =
      document.getElementById("resizeWidth");

    const heightInput =
      document.getElementById("resizeHeight");

    const keepRatio =
      document.getElementById("keepRatio");

    const result =
      document.getElementById("resizeResult");

    let image = null;
    let ratio = 1;


    input.addEventListener("change", async function () {

      try {

        if (!this.files[0]) return;

        image =
          await loadImage(this.files[0]);

        widthInput.value =
          image.naturalWidth;

        heightInput.value =
          image.naturalHeight;

        ratio =
          image.naturalWidth /
          image.naturalHeight;

      } catch (error) {

        result.innerHTML =
          `<div class="mdh-error">
            Unable to load image.
          </div>`;

      }

    });


    widthInput.addEventListener("input", function () {

      if (
        keepRatio.checked &&
        image &&
        this.value
      ) {

        heightInput.value =
          Math.round(
            Number(this.value) / ratio
          );

      }

    });


    heightInput.addEventListener("input", function () {

      if (
        keepRatio.checked &&
        image &&
        this.value
      ) {

        widthInput.value =
          Math.round(
            Number(this.value) * ratio
          );

      }

    });


    const button =
      document.createElement("button");

    button.type = "button";
    button.className = "mdh-action";
    button.textContent = "Resize & Download";

    result.appendChild(button);


    button.addEventListener(
      "click",
      async function () {

        if (!image) {

          result.insertAdjacentHTML(
            "beforeend",
            `<div class="mdh-error">
              Please select an image first.
            </div>`
          );

          return;

        }

        const width =
          Number(widthInput.value);

        const height =
          Number(heightInput.value);

        if (!width || !height) {

          result.insertAdjacentHTML(
            "beforeend",
            `<div class="mdh-error">
              Please enter valid width and height.
            </div>`
          );

          return;

        }

        const canvas =
          document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        canvas
          .getContext("2d")
          .drawImage(
            image,
            0,
            0,
            width,
            height
          );

        const blob =
          await canvasToBlob(
            canvas,
            "image/jpeg",
            0.9
          );

        downloadBlob(
          blob,
          "manjeet-resized.jpg"
        );

      }
    );

  }


  /* =======================================================
     IMAGE CONVERTER
     ======================================================= */

  function loadConverter() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🔄 Image Converter</h3>

        <p>
          Convert JPG, PNG and WebP images.
        </p>

        ${createFileInput()}

        <div class="mdh-field">

          <label>Output Format</label>

          <select id="convertFormat">

            <option value="image/jpeg">JPG</option>

            <option value="image/png">PNG</option>

            <option value="image/webp">WebP</option>

          </select>

        </div>

        <div id="convertResult"></div>

      </div>

    `;

    const input =
      toolContent.querySelector(".mdh-file-input");

    const format =
      document.getElementById("convertFormat");

    const result =
      document.getElementById("convertResult");


    input.addEventListener(
      "change",
      async function () {

        const file =
          this.files[0];

        if (!file) return;

        try {

          const img =
            await loadImage(file);

          const canvas =
            document.createElement("canvas");

          canvas.width =
            img.naturalWidth;

          canvas.height =
            img.naturalHeight;

          const ctx =
            canvas.getContext("2d");


          if (
            format.value === "image/jpeg"
          ) {

            ctx.fillStyle = "#ffffff";

            ctx.fillRect(
              0,
              0,
              canvas.width,
              canvas.height
            );

          }


          ctx.drawImage(
            img,
            0,
            0
          );


          const blob =
            await canvasToBlob(
              canvas,
              format.value,
              0.92
            );


          const ext =
            format.value === "image/png"
              ? "png"
              : format.value === "image/webp"
                ? "webp"
                : "jpg";


          result.innerHTML =
            `${createButton(
              "⬇ Download Converted Image"
            )}`;


          result.querySelector("button").onclick =
            function () {

              downloadBlob(
                blob,
                `manjeet-converted.${ext}`
              );

            };

        } catch (error) {

          result.innerHTML =
            `<div class="mdh-error">
              Unable to convert image.
            </div>`;

        }

      }
    );

  }


  /* =======================================================
     PHOTO SIZE REDUCER
     ======================================================= */

  function loadReducer() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>📉 Photo Size Reducer</h3>

        <p>
          Reduce photo to approximately your target KB.
        </p>

        ${createFileInput()}

        <div class="mdh-field">

          <label>Target Size (KB)</label>

          <input
            type="number"
            id="targetKB"
            value="100"
            min="10"
          >

        </div>

        <div id="reduceResult"></div>

      </div>

    `;

    const input =
      toolContent.querySelector(".mdh-file-input");

    const target =
      document.getElementById("targetKB");

    const result =
      document.getElementById("reduceResult");


    input.addEventListener(
      "change",
      async function () {

        const file =
          this.files[0];

        if (!file) return;

        try {

          const img =
            await loadImage(file);

          const canvas =
            document.createElement("canvas");

          canvas.width =
            img.naturalWidth;

          canvas.height =
            img.naturalHeight;

          canvas
            .getContext("2d")
            .drawImage(
              img,
              0,
              0
            );


          const targetBytes =
            Number(target.value) * 1024;


          let low = 0.05;
          let high = 1;
          let bestBlob = null;


          for (
            let i = 0;
            i < 10;
            i++
          ) {

            const quality =
              (low + high) / 2;

            const blob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                quality
              );


            if (
              blob.size <= targetBytes
            ) {

              bestBlob = blob;
              low = quality;

            } else {

              high = quality;

            }

          }


          if (!bestBlob) {

            bestBlob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                0.05
              );

          }


          result.innerHTML = `

            <div class="mdh-grid">

              <div class="mdh-stat">
                <span>Original</span>
                <strong>${formatKB(file.size)}</strong>
              </div>

              <div class="mdh-stat">
                <span>Reduced</span>
                <strong>${formatKB(bestBlob.size)}</strong>
              </div>

            </div>

            <br>

            ${createButton(
              "⬇ Download Reduced Photo"
            )}

          `;


          result.querySelector("button").onclick =
            function () {

              downloadBlob(
                bestBlob,
                "manjeet-reduced.jpg"
              );

            };

        } catch (error) {

          result.innerHTML =
            `<div class="mdh-error">
              Unable to reduce image.
            </div>`;

        }

      }
    );

  }


  /* =======================================================
     SOCIAL MEDIA RESIZER
     ======================================================= */

  function loadSocial() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>📱 Social Media Resizer</h3>

        <p>
          Create images in popular social media sizes.
        </p>

        ${createFileInput()}

        <div class="mdh-field">

          <label>Choose Size</label>

          <select id="socialSize">

            <option value="1080x1080">
              Instagram Square — 1080×1080
            </option>

            <option value="1080x1350">
              Instagram Portrait — 1080×1350
            </option>

            <option value="1080x1920">
              Story / Status — 1080×1920
            </option>

            <option value="1280x720">
              YouTube Thumbnail — 1280×720
            </option>

            <option value="1200x630">
              Facebook Post — 1200×630
            </option>

          </select>

        </div>

        <div id="socialResult"></div>

      </div>

    `;


    const input =
      toolContent.querySelector(".mdh-file-input");

    const select =
      document.getElementById("socialSize");

    const result =
      document.getElementById("socialResult");


    input.addEventListener(
      "change",
      async function () {

        const file =
          this.files[0];

        if (!file) return;

        try {

          const img =
            await loadImage(file);


          const [width, height] =
            select.value
              .split("x")
              .map(Number);


          const canvas =
            document.createElement("canvas");

          canvas.width = width;
          canvas.height = height;


          const ctx =
            canvas.getContext("2d");


          const imageRatio =
            img.naturalWidth /
            img.naturalHeight;

          const targetRatio =
            width / height;


          let sourceWidth =
            img.naturalWidth;

          let sourceHeight =
            img.naturalHeight;

          let sourceX = 0;
          let sourceY = 0;


          if (
            imageRatio > targetRatio
          ) {

            sourceWidth =
              img.naturalHeight *
              targetRatio;

            sourceX =
              (
                img.naturalWidth -
                sourceWidth
              ) / 2;

          } else {

            sourceHeight =
              img.naturalWidth /
              targetRatio;

            sourceY =
              (
                img.naturalHeight -
                sourceHeight
              ) / 2;

          }


          ctx.drawImage(
            img,
            sourceX,
            sourceY,
            sourceWidth,
            sourceHeight,
            0,
            0,
            width,
            height
          );


          const blob =
            await canvasToBlob(
              canvas,
              "image/jpeg",
              0.92
            );


          result.innerHTML =
            `${createButton(
              "⬇ Download Social Image"
            )}`;


          result.querySelector("button").onclick =
            function () {

              downloadBlob(
                blob,
                "manjeet-social-image.jpg"
              );

            };

        } catch (error) {

          result.innerHTML =
            `<div class="mdh-error">
              Unable to create social image.
            </div>`;

        }

      }
    );

  }


  /* =======================================================
     PASSPORT PHOTO MAKER
     ======================================================= */

  function loadPassport() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🪪 Passport Photo Maker</h3>

        <p>
          Create a standard 35×45 mm passport-style photo.
        </p>

        ${createFileInput()}

        <div class="mdh-grid">

          <div class="mdh-field">

            <label>Background</label>

            <select id="passportBg">

              <option value="#ffffff">
                White
              </option>

              <option value="#f1f5f9">
                Light Grey
              </option>

              <option value="#e0f2fe">
                Light Blue
              </option>

            </select>

          </div>


          <div class="mdh-field">

            <label>Output</label>

            <select id="passportOutput">

              <option value="single">
                Single Photo
              </option>

              <option value="a4">
                A4 Sheet
              </option>

            </select>

          </div>

        </div>

        <div id="passportResult"></div>

      </div>

    `;


    const input =
      toolContent.querySelector(".mdh-file-input");

    const bg =
      document.getElementById("passportBg");

    const output =
      document.getElementById("passportOutput");

    const result =
      document.getElementById("passportResult");


    input.addEventListener(
      "change",
      async function () {

        const file =
          this.files[0];

        if (!file) return;

        try {

          const img =
            await loadImage(file);


          const photoWidth = 413;
          const photoHeight = 531;


          const canvas =
            document.createElement("canvas");

          canvas.width =
            photoWidth;

          canvas.height =
            photoHeight;


          const ctx =
            canvas.getContext("2d");


          ctx.fillStyle =
            bg.value;

          ctx.fillRect(
            0,
            0,
            photoWidth,
            photoHeight
          );


          const targetRatio =
            photoWidth /
            photoHeight;

          const imageRatio =
            img.naturalWidth /
            img.naturalHeight;


          let sw =
            img.naturalWidth;

          let sh =
            img.naturalHeight;

          let sx = 0;
          let sy = 0;


          if (
            imageRatio > targetRatio
          ) {

            sw =
              img.naturalHeight *
              targetRatio;

            sx =
              (
                img.naturalWidth -
                sw
              ) / 2;

          } else {

            sh =
              img.naturalWidth /
              targetRatio;

            sy =
              (
                img.naturalHeight -
                sh
              ) / 2;

          }


          ctx.drawImage(
            img,
            sx,
            sy,
            sw,
            sh,
            0,
            0,
            photoWidth,
            photoHeight
          );


          if (
            output.value === "single"
          ) {

            const blob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                0.95
              );


            const url =
              URL.createObjectURL(blob);


            result.innerHTML = `

              <img
                class="mdh-preview"
                src="${url}"
                alt="Passport Photo"
              >

              <br>

              ${createButton(
                "⬇ Download Passport Photo"
              )}

              <div class="mdh-note">
                Size: 35 × 45 mm equivalent at 300 DPI.
              </div>

            `;


            result.querySelector("button").onclick =
              function () {

                downloadBlob(
                  blob,
                  "manjeet-passport-photo.jpg"
                );

              };

          } else {

            const sheet =
              createA4PhotoSheet(
                canvas,
                8
              );


            const blob =
              await canvasToBlob(
                sheet,
                "image/jpeg",
                0.92
              );


            const url =
              URL.createObjectURL(blob);


            result.innerHTML = `

              <img
                class="mdh-preview"
                src="${url}"
                alt="A4 Photo Sheet"
              >

              <br>

              ${createButton(
                "⬇ Download A4 Photo Sheet"
              )}

            `;


            result.querySelector("button").onclick =
              function () {

                downloadBlob(
                  blob,
                  "manjeet-passport-a4-sheet.jpg"
                );

              };

          }

        } catch (error) {

          result.innerHTML =
            `<div class="mdh-error">
              Unable to create passport photo.
            </div>`;

        }

      }
    );

  }


  /* =======================================================
     A4 PHOTO SHEET
     ======================================================= */

  function createA4PhotoSheet(
    photoCanvas,
    copies = 8
  ) {

    const A4_WIDTH = 2480;
    const A4_HEIGHT = 3508;


    const sheet =
      document.createElement("canvas");

    sheet.width =
      A4_WIDTH;

    sheet.height =
      A4_HEIGHT;


    const ctx =
      sheet.getContext("2d");


    ctx.fillStyle =
      "#ffffff";

    ctx.fillRect(
      0,
      0,
      A4_WIDTH,
      A4_HEIGHT
    );


    const margin = 100;
    const gap = 40;

    const cols = 2;

    const rows =
      Math.ceil(
        copies / cols
      );


    const photoW =
      Math.floor(
        (
          A4_WIDTH -
          margin * 2 -
          gap
        ) / cols
      );


    const photoH =
      Math.floor(
        (
          A4_HEIGHT -
          margin * 2 -
          gap * (rows - 1)
        ) / rows
      );


    const targetRatio =
      photoCanvas.width /
      photoCanvas.height;


    let drawW = photoW;

    let drawH =
      drawW /
      targetRatio;


    if (
      drawH > photoH
    ) {

      drawH =
        photoH;

      drawW =
        drawH *
        targetRatio;

    }


    for (
      let i = 0;
      i < copies;
      i++
    ) {

      const col =
        i % cols;

      const row =
        Math.floor(
          i / cols
        );


      const x =
        margin +
        col *
          (photoW + gap) +
        (
          photoW -
          drawW
        ) / 2;


      const y =
        margin +
        row *
          (photoH + gap) +
        (
          photoH -
          drawH
        ) / 2;


      ctx.drawImage(
        photoCanvas,
        x,
        y,
        drawW,
        drawH
      );

    }


    return sheet;

  }


  function loadPhotoSheet() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🖨️ A4 Photo Sheet Maker</h3>

        <p>
          Put multiple copies of one photo on an A4 sheet.
        </p>

        ${createFileInput()}

        <div class="mdh-field">

          <label>Number of Photos</label>

          <select id="sheetCopies">

            <option value="4">
              4 Photos
            </option>

            <option value="8" selected>
              8 Photos
            </option>

            <option value="12">
              12 Photos
            </option>

            <option value="16">
              16 Photos
            </option>

            <option value="20">
              20 Photos
            </option>

            <option value="24">
              24 Photos
            </option>

          </select>

        </div>

        <div id="sheetResult"></div>

      </div>

    `;


    const input =
      toolContent.querySelector(
        ".mdh-file-input"
      );

    const copies =
      document.getElementById(
        "sheetCopies"
      );

    const result =
      document.getElementById(
        "sheetResult"
      );


    input.addEventListener(
      "change",
      async function () {

        const file =
          this.files[0];

        if (!file) return;

        try {

          const img =
            await loadImage(file);


          const photoCanvas =
            document.createElement(
              "canvas"
            );


          photoCanvas.width =
            413;

          photoCanvas.height =
            531;


          const ctx =
            photoCanvas.getContext(
              "2d"
            );


          ctx.fillStyle =
            "#ffffff";


          ctx.fillRect(
            0,
            0,
            413,
            531
          );


          const targetRatio =
            413 / 531;


          const imageRatio =
            img.naturalWidth /
            img.naturalHeight;


          let sw =
            img.naturalWidth;

          let sh =
            img.naturalHeight;

          let sx = 0;
          let sy = 0;


          if (
            imageRatio > targetRatio
          ) {

            sw =
              img.naturalHeight *
              targetRatio;

            sx =
              (
                img.naturalWidth -
                sw
              ) / 2;

          } else {

            sh =
              img.naturalWidth /
              targetRatio;

            sy =
              (
                img.naturalHeight -
                sh
              ) / 2;

          }


          ctx.drawImage(
            img,
            sx,
            sy,
            sw,
            sh,
            0,
            0,
            413,
            531
          );


          const sheet =
            createA4PhotoSheet(
              photoCanvas,
              Number(
                copies.value
              )
            );


          const blob =
            await canvasToBlob(
              sheet,
              "image/jpeg",
              0.92
            );


          const url =
            URL.createObjectURL(blob);


          result.innerHTML = `

            <img
              class="mdh-preview"
              src="${url}"
              alt="A4 Photo Sheet"
            >

            <br>

            ${createButton(
              "⬇ Download A4 Sheet"
            )}

            <div class="mdh-note">
              A4 size: 2480 × 3508 pixels.
            </div>

          `;


          result.querySelector("button").onclick =
            function () {

              downloadBlob(
                blob,
                "manjeet-a4-photo-sheet.jpg"
              );

            };

        } catch (error) {

          result.innerHTML =
            `<div class="mdh-error">
              Unable to create A4 sheet.
            </div>`;

        }

      }
    );

  }


  /* =======================================================
     IMAGES TO PDF / JPG TO PDF
     Browser Print Method
     ======================================================= */

  function loadImagesToPDF() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>📄 Images → PDF</h3>

        <p>
          Select one or more images and save them as PDF.
        </p>

        ${createFileInput(
          "image/*",
          true
        )}

        <div id="pdfResult"></div>

      </div>

    `;


    const input =
      toolContent.querySelector(
        ".mdh-file-input"
      );

    const result =
      document.getElementById(
        "pdfResult"
      );


    input.addEventListener(
      "change",
      function () {

        const files =
          Array.from(
            this.files
          );


        if (!files.length) return;


        result.innerHTML = `

          <div class="mdh-result">

            <strong>
              ${files.length}
              image${files.length > 1 ? "s" : ""}
              selected
            </strong>

            <br><br>

            ${createButton(
              "🖨️ Create / Save PDF"
            )}

          </div>

        `;


        result.querySelector(
          "button"
        ).onclick =
          function () {

            printImagesAsPDF(
              files
            );

          };

      }
    );

  }


  function printImagesAsPDF(files) {

    const printWindow =
      window.open(
        "",
        "_blank",
        "width=900,height=700"
      );


    if (!printWindow) {

      alert(
        "Please allow pop-ups to create PDF."
      );

      return;

    }


    let html = `

      <!DOCTYPE html>

      <html>

      <head>

        <title>
          Manjeet Digital Hub - PDF
        </title>

        <style>

          @page {
            size:A4;
            margin:0;
          }

          body {
            margin:0;
            background:#eee;
          }

          .page {
            width:210mm;
            height:297mm;
            background:#fff;
            display:flex;
            align-items:center;
            justify-content:center;
            page-break-after:always;
            overflow:hidden;
          }

          .page img {
            max-width:190mm;
            max-height:277mm;
            object-fit:contain;
          }

        </style>

      </head>

      <body>
    `;


    files.forEach(
      function (file) {

        const url =
          URL.createObjectURL(
            file
          );


        html += `

          <div class="page">

            <img src="${url}">

          </div>

        `;

      }
    );


    html += `

      </body>
      </html>

    `;


    printWindow.document.open();

    printWindow.document.write(
      html
    );

    printWindow.document.close();


    printWindow.onload =
      function () {

        setTimeout(
          function () {

            printWindow.focus();

            printWindow.print();

          },
          700
        );

      };

  }


  /* =======================================================
     EMI CALCULATOR
     ======================================================= */

  function loadEMI() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>₹ EMI Calculator</h3>

        <p>
          Calculate monthly EMI, interest and total payment.
        </p>

        <div class="mdh-field">

          <label>
            Loan Amount (₹)
          </label>

          <input
            type="number"
            id="emiPrincipal"
            value="500000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Annual Interest Rate (%)
          </label>

          <input
            type="number"
            id="emiRate"
            value="10"
            step="0.01"
          >

        </div>


        <div class="mdh-field">

          <label>
            Loan Tenure (Years)
          </label>

          <input
            type="number"
            id="emiYears"
            value="5"
          >

        </div>


        ${createButton(
          "Calculate EMI"
        )}


        <div id="emiResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .addEventListener(
        "click",
        function () {

          const P =
            Number(
              document.getElementById(
                "emiPrincipal"
              ).value
            );


          const annual =
            Number(
              document.getElementById(
                "emiRate"
              ).value
            );


          const years =
            Number(
              document.getElementById(
                "emiYears"
              ).value
            );


          const n =
            years * 12;


          const r =
            annual / 12 / 100;


          if (
            P <= 0 ||
            years <= 0
          ) {

            document.getElementById(
              "emiResult"
            ).innerHTML =
              `<div class="mdh-error">
                Please enter valid values.
              </div>`;

            return;

          }


          let emi;


          if (r === 0) {

            emi =
              P / n;

          } else {

            emi =
              P *
              r *
              Math.pow(
                1 + r,
                n
              ) /
              (
                Math.pow(
                  1 + r,
                  n
                ) - 1
              );

          }


          const total =
            emi * n;


          const interest =
            total - P;


          document.getElementById(
            "emiResult"
          ).innerHTML = `

            <div class="mdh-grid-3">

              <div class="mdh-stat">
                <span>Monthly EMI</span>
                <strong>
                  ₹${formatNumber(emi)}
                </strong>
              </div>

              <div class="mdh-stat">
                <span>Total Interest</span>
                <strong>
                  ₹${formatNumber(interest)}
                </strong>
              </div>

              <div class="mdh-stat">
                <span>Total Payment</span>
                <strong>
                  ₹${formatNumber(total)}
                </strong>
              </div>

            </div>

          `;

        }
      );

  }


  /* =======================================================
     GST
     ======================================================= */

  function loadGST() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>% GST Calculator</h3>

        <div class="mdh-field">

          <label>
            Amount (₹)
          </label>

          <input
            type="number"
            id="gstAmount"
            value="10000"
          >

        </div>


        <div class="mdh-field">

          <label>
            GST Rate
          </label>

          <select id="gstRate">

            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18" selected>18%</option>
            <option value="28">28%</option>

          </select>

        </div>


        ${createButton(
          "Calculate GST"
        )}


        <div id="gstResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const amount =
          Number(
            document.getElementById(
              "gstAmount"
            ).value
          );


        const rate =
          Number(
            document.getElementById(
              "gstRate"
            ).value
          );


        const gst =
          amount * rate / 100;


        const total =
          amount + gst;


        document.getElementById(
          "gstResult"
        ).innerHTML = `

          <div class="mdh-grid">

            <div class="mdh-stat">
              <span>GST Amount</span>
              <strong>
                ₹${formatNumber(gst)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Total Amount</span>
              <strong>
                ₹${formatNumber(total)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     PERCENTAGE
     ======================================================= */

  function loadPercentage() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>% Percentage Calculator</h3>

        <div class="mdh-field">

          <label>
            Percentage (%)
          </label>

          <input
            type="number"
            id="percentValue"
            value="20"
          >

        </div>


        <div class="mdh-field">

          <label>
            Number
          </label>

          <input
            type="number"
            id="percentNumber"
            value="500"
          >

        </div>


        ${createButton(
          "Calculate"
        )}


        <div id="percentResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const percentage =
          Number(
            document.getElementById(
              "percentValue"
            ).value
          );


        const number =
          Number(
            document.getElementById(
              "percentNumber"
            ).value
          );


        const result =
          percentage *
          number /
          100;


        document.getElementById(
          "percentResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              ${percentage}% of
              ${formatNumber(number)}
              =
              ${formatNumber(result)}
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     SIP
     ======================================================= */

  function loadSIP() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>📈 SIP Calculator</h3>

        <div class="mdh-field">

          <label>
            Monthly Investment (₹)
          </label>

          <input
            type="number"
            id="sipAmount"
            value="5000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Expected Annual Return (%)
          </label>

          <input
            type="number"
            id="sipRate"
            value="12"
            step="0.1"
          >

        </div>


        <div class="mdh-field">

          <label>
            Investment Period (Years)
          </label>

          <input
            type="number"
            id="sipYears"
            value="10"
          >

        </div>


        ${createButton(
          "Calculate SIP"
        )}


        <div id="sipResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const p =
          Number(
            document.getElementById(
              "sipAmount"
            ).value
          );


        const annual =
          Number(
            document.getElementById(
              "sipRate"
            ).value
          );


        const years =
          Number(
            document.getElementById(
              "sipYears"
            ).value
          );


        const n =
          years * 12;


        const r =
          annual / 12 / 100;


        const invested =
          p * n;


        let value;


        if (r === 0) {

          value =
            invested;

        } else {

          value =
            p *
            (
              (
                Math.pow(
                  1 + r,
                  n
                ) - 1
              ) / r
            ) *
            (1 + r);

        }


        const gain =
          value -
          invested;


        document.getElementById(
          "sipResult"
        ).innerHTML = `

          <div class="mdh-grid-3">

            <div class="mdh-stat">
              <span>Invested</span>
              <strong>
                ₹${formatNumber(invested)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Estimated Gain</span>
              <strong>
                ₹${formatNumber(gain)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Future Value</span>
              <strong>
                ₹${formatNumber(value)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     FD
     ======================================================= */

  function loadFD() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🏦 FD Calculator</h3>

        <div class="mdh-field">

          <label>
            Deposit Amount (₹)
          </label>

          <input
            type="number"
            id="fdPrincipal"
            value="100000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Annual Interest (%)
          </label>

          <input
            type="number"
            id="fdRate"
            value="7"
            step="0.01"
          >

        </div>


        <div class="mdh-field">

          <label>
            Tenure (Years)
          </label>

          <input
            type="number"
            id="fdYears"
            value="5"
          >

        </div>


        ${createButton(
          "Calculate FD"
        )}


        <div id="fdResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const P =
          Number(
            document.getElementById(
              "fdPrincipal"
            ).value
          );


        const r =
          Number(
            document.getElementById(
              "fdRate"
            ).value
          ) / 100;


        const years =
          Number(
            document.getElementById(
              "fdYears"
            ).value
          );


        const n = 4;


        const maturity =
          P *
          Math.pow(
            1 + r / n,
            n * years
          );


        const interest =
          maturity -
          P;


        document.getElementById(
          "fdResult"
        ).innerHTML = `

          <div class="mdh-grid">

            <div class="mdh-stat">
              <span>Interest</span>
              <strong>
                ₹${formatNumber(interest)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Maturity</span>
              <strong>
                ₹${formatNumber(maturity)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     RD
     ======================================================= */

  function loadRD() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🏦 RD Calculator</h3>

        <div class="mdh-field">

          <label>
            Monthly Deposit (₹)
          </label>

          <input
            type="number"
            id="rdDeposit"
            value="5000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Annual Interest (%)
          </label>

          <input
            type="number"
            id="rdRate"
            value="7"
            step="0.01"
          >

        </div>


        <div class="mdh-field">

          <label>
            Tenure (Months)
          </label>

          <input
            type="number"
            id="rdMonths"
            value="60"
          >

        </div>


        ${createButton(
          "Calculate RD"
        )}


        <div id="rdResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const monthly =
          Number(
            document.getElementById(
              "rdDeposit"
            ).value
          );


        const annual =
          Number(
            document.getElementById(
              "rdRate"
            ).value
          );


        const months =
          Number(
            document.getElementById(
              "rdMonths"
            ).value
          );


        const r =
          annual / 400;


        let maturity = 0;


        for (
          let i = 1;
          i <= months;
          i++
        ) {

          maturity +=
            monthly *
            Math.pow(
              1 + r,
              months - i + 1
            );

        }


        const invested =
          monthly *
          months;


        const interest =
          maturity -
          invested;


        document.getElementById(
          "rdResult"
        ).innerHTML = `

          <div class="mdh-grid">

            <div class="mdh-stat">
              <span>Invested</span>
              <strong>
                ₹${formatNumber(invested)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Maturity</span>
              <strong>
                ₹${formatNumber(maturity)}
              </strong>
            </div>

          </div>

          <br>

          <div class="mdh-result">

            Interest:
            <strong>
              ₹${formatNumber(interest)}
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     SIMPLE INTEREST
     ======================================================= */

  function loadSimpleInterest() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>➕ Simple Interest Calculator</h3>

        <div class="mdh-field">

          <label>
            Principal (₹)
          </label>

          <input
            type="number"
            id="siP"
            value="100000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Rate (%)
          </label>

          <input
            type="number"
            id="siR"
            value="8"
          >

        </div>


        <div class="mdh-field">

          <label>
            Time (Years)
          </label>

          <input
            type="number"
            id="siT"
            value="5"
          >

        </div>


        ${createButton(
          "Calculate"
        )}


        <div id="siResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const P =
          Number(
            document.getElementById(
              "siP"
            ).value
          );


        const R =
          Number(
            document.getElementById(
              "siR"
            ).value
          );


        const T =
          Number(
            document.getElementById(
              "siT"
            ).value
          );


        const interest =
          P *
          R *
          T /
          100;


        const total =
          P +
          interest;


        document.getElementById(
          "siResult"
        ).innerHTML = `

          <div class="mdh-grid">

            <div class="mdh-stat">
              <span>Interest</span>
              <strong>
                ₹${formatNumber(interest)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Total</span>
              <strong>
                ₹${formatNumber(total)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     COMPOUND INTEREST
     ======================================================= */

  function loadCompound() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          📊 Compound Interest Calculator
        </h3>

        <div class="mdh-field">

          <label>
            Principal (₹)
          </label>

          <input
            type="number"
            id="ciP"
            value="100000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Rate (%)
          </label>

          <input
            type="number"
            id="ciR"
            value="8"
          >

        </div>


        <div class="mdh-field">

          <label>
            Time (Years)
          </label>

          <input
            type="number"
            id="ciT"
            value="5"
          >

        </div>


        <div class="mdh-field">

          <label>
            Compounding
          </label>

          <select id="ciN">

            <option value="1">
              Yearly
            </option>

            <option value="2">
              Half-Yearly
            </option>

            <option
              value="4"
              selected
            >
              Quarterly
            </option>

            <option value="12">
              Monthly
            </option>

          </select>

        </div>


        ${createButton(
          "Calculate"
        )}


        <div id="ciResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const P =
          Number(
            document.getElementById(
              "ciP"
            ).value
          );


        const R =
          Number(
            document.getElementById(
              "ciR"
            ).value
          ) / 100;


        const T =
          Number(
            document.getElementById(
              "ciT"
            ).value
          );


        const n =
          Number(
            document.getElementById(
              "ciN"
            ).value
          );


        const amount =
          P *
          Math.pow(
            1 + R / n,
            n * T
          );


        const interest =
          amount -
          P;


        document.getElementById(
          "ciResult"
        ).innerHTML = `

          <div class="mdh-grid">

            <div class="mdh-stat">
              <span>Interest</span>
              <strong>
                ₹${formatNumber(interest)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Total Amount</span>
              <strong>
                ₹${formatNumber(amount)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     DISCOUNT
     ======================================================= */

  function loadDiscount() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🏷️ Discount Calculator</h3>

        <div class="mdh-field">

          <label>
            Original Price (₹)
          </label>

          <input
            type="number"
            id="discountPrice"
            value="1000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Discount (%)
          </label>

          <input
            type="number"
            id="discountRate"
            value="20"
          >

        </div>


        ${createButton(
          "Calculate Discount"
        )}


        <div id="discountResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const price =
          Number(
            document.getElementById(
              "discountPrice"
            ).value
          );


        const rate =
          Number(
            document.getElementById(
              "discountRate"
            ).value
          );


        const discount =
          price *
          rate /
          100;


        const finalPrice =
          price -
          discount;


        document.getElementById(
          "discountResult"
        ).innerHTML = `

          <div class="mdh-grid">

            <div class="mdh-stat">
              <span>Discount</span>
              <strong>
                ₹${formatNumber(discount)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Final Price</span>
              <strong>
                ₹${formatNumber(finalPrice)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     PROFIT & LOSS
     ======================================================= */

  function loadProfit() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          📈 Profit & Loss Calculator
        </h3>

        <div class="mdh-field">

          <label>
            Cost Price (₹)
          </label>

          <input
            type="number"
            id="profitCP"
            value="1000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Selling Price (₹)
          </label>

          <input
            type="number"
            id="profitSP"
            value="1200"
          >

        </div>


        ${createButton(
          "Calculate"
        )}


        <div id="profitResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const cp =
          Number(
            document.getElementById(
              "profitCP"
            ).value
          );


        const sp =
          Number(
            document.getElementById(
              "profitSP"
            ).value
          );


        const difference =
          sp -
          cp;


        const percentage =
          cp
            ? Math.abs(difference) /
              cp *
              100
            : 0;


        const type =
          difference >= 0
            ? "Profit"
            : "Loss";


        document.getElementById(
          "profitResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              ${type}:
              ₹${formatNumber(
                Math.abs(difference)
              )}
            </strong>

            <br><br>

            ${type} Percentage:
            ${formatNumber(
              percentage
            )}%

          </div>

        `;

      };

  }


  /* =======================================================
     LOAN INTEREST
     ======================================================= */

  function loadLoanInterest() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          💰 Loan Interest Calculator
        </h3>

        <div class="mdh-field">

          <label>
            Loan Amount (₹)
          </label>

          <input
            type="number"
            id="liP"
            value="500000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Annual Interest (%)
          </label>

          <input
            type="number"
            id="liR"
            value="10"
          >

        </div>


        <div class="mdh-field">

          <label>
            Tenure (Years)
          </label>

          <input
            type="number"
            id="liT"
            value="5"
          >

        </div>


        ${createButton(
          "Calculate"
        )}


        <div id="liResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const P =
          Number(
            document.getElementById(
              "liP"
            ).value
          );


        const R =
          Number(
            document.getElementById(
              "liR"
            ).value
          );


        const T =
          Number(
            document.getElementById(
              "liT"
            ).value
          );


        const interest =
          P *
          R *
          T /
          100;


        const total =
          P +
          interest;


        document.getElementById(
          "liResult"
        ).innerHTML = `

          <div class="mdh-grid">

            <div class="mdh-stat">
              <span>Total Interest</span>
              <strong>
                ₹${formatNumber(interest)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Total Payable</span>
              <strong>
                ₹${formatNumber(total)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     AGE CALCULATOR
     ======================================================= */

  function loadAge() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🎂 Age Calculator</h3>

        <div class="mdh-field">

          <label>
            Date of Birth
          </label>

          <input
            type="date"
            id="dob"
          >

        </div>


        ${createButton(
          "Calculate Age"
        )}


        <div id="ageResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const value =
          document.getElementById(
            "dob"
          ).value;


        if (!value) {

          document.getElementById(
            "ageResult"
          ).innerHTML =
            `<div class="mdh-error">
              Please select your date of birth.
            </div>`;

          return;

        }


        const dob =
          new Date(
            value +
            "T00:00:00"
          );


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


        if (days < 0) {

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


        if (months < 0) {

          years--;

          months += 12;

        }


        document.getElementById(
          "ageResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              ${years} Years,
              ${months} Months,
              ${days} Days
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     INSURANCE POLICY RETURN
     ======================================================= */

  function loadInsurance() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          🛡️ Insurance Policy Return Calculator
        </h3>

        <p>
          Estimate maturity value and return on total premiums.
        </p>

        <div class="mdh-field">

          <label>
            Annual Premium (₹)
          </label>

          <input
            type="number"
            id="insPremium"
            value="50000"
          >

        </div>


        <div class="mdh-field">

          <label>
            Policy Term (Years)
          </label>

          <input
            type="number"
            id="insYears"
            value="20"
          >

        </div>


        <div class="mdh-field">

          <label>
            Expected Annual Return (%)
          </label>

          <input
            type="number"
            id="insRate"
            value="6.5"
            step="0.1"
          >

        </div>


        ${createButton(
          "Calculate Return"
        )}


        <div id="insResult"></div>


        <div class="mdh-note">

          This is only an illustrative calculator.
          Actual insurance policy benefits depend on the
          specific policy, bonuses, charges and terms.

        </div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const premium =
          Number(
            document.getElementById(
              "insPremium"
            ).value
          );


        const years =
          Number(
            document.getElementById(
              "insYears"
            ).value
          );


        const rate =
          Number(
            document.getElementById(
              "insRate"
            ).value
          ) / 100;


        const invested =
          premium *
          years;


        let maturity;


        if (rate === 0) {

          maturity =
            invested;

        } else {

          maturity =
            premium *
            (
              (
                Math.pow(
                  1 + rate,
                  years
                ) - 1
              ) / rate
            ) *
            (1 + rate);

        }


        const gain =
          maturity -
          invested;


        document.getElementById(
          "insResult"
        ).innerHTML = `

          <div class="mdh-grid-3">

            <div class="mdh-stat">
              <span>Total Premium</span>
              <strong>
                ₹${formatNumber(invested)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Estimated Gain</span>
              <strong>
                ₹${formatNumber(gain)}
              </strong>
            </div>

            <div class="mdh-stat">
              <span>Estimated Value</span>
              <strong>
                ₹${formatNumber(maturity)}
              </strong>
            </div>

          </div>

        `;

      };

  }


  /* =======================================================
     CGPA
     ======================================================= */

  function loadCGPA() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          🎓 CGPA → Percentage
        </h3>

        <div class="mdh-field">

          <label>
            CGPA
          </label>

          <input
            type="number"
            id="cgpaValue"
            value="8.5"
            step="0.01"
          >

        </div>


        ${createButton(
          "Convert"
        )}


        <div id="cgpaResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const cgpa =
          Number(
            document.getElementById(
              "cgpaValue"
            ).value
          );


        const percentage =
          cgpa *
          9.5;


        document.getElementById(
          "cgpaResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              Approx. Percentage:
              ${formatNumber(
                percentage
              )}%
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     GPA
     ======================================================= */

  function loadGPA() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>🎓 GPA Calculator</h3>

        <p>
          Enter grade points and credits for subjects.
        </p>

        <div class="mdh-grid">

          <div class="mdh-field">
            <label>Grade Point 1</label>
            <input
              type="number"
              class="gp"
              value="8"
            >
          </div>

          <div class="mdh-field">
            <label>Credit 1</label>
            <input
              type="number"
              class="credit"
              value="3"
            >
          </div>

          <div class="mdh-field">
            <label>Grade Point 2</label>
            <input
              type="number"
              class="gp"
              value="9"
            >
          </div>

          <div class="mdh-field">
            <label>Credit 2</label>
            <input
              type="number"
              class="credit"
              value="3"
            >
          </div>

          <div class="mdh-field">
            <label>Grade Point 3</label>
            <input
              type="number"
              class="gp"
              value="7"
            >
          </div>

          <div class="mdh-field">
            <label>Credit 3</label>
            <input
              type="number"
              class="credit"
              value="4"
            >
          </div>

        </div>


        ${createButton(
          "Calculate GPA"
        )}


        <div id="gpaResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const gp =
          Array.from(
            toolContent.querySelectorAll(
              ".gp"
            )
          ).map(Number);


        const credits =
          Array.from(
            toolContent.querySelectorAll(
              ".credit"
            )
          ).map(Number);


        let weighted = 0;
        let totalCredits = 0;


        for (
          let i = 0;
          i < gp.length;
          i++
        ) {

          weighted +=
            gp[i] *
            credits[i];

          totalCredits +=
            credits[i];

        }


        const gpa =
          totalCredits
            ? weighted /
              totalCredits
            : 0;


        document.getElementById(
          "gpaResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              GPA:
              ${formatNumber(
                gpa,
                2
              )}
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     MARKS REQUIRED
     ======================================================= */

  function loadMarksRequired() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          📝 Marks Required Calculator
        </h3>

        <div class="mdh-field">

          <label>
            Total Marks
          </label>

          <input
            type="number"
            id="marksTotal"
            value="100"
          >

        </div>


        <div class="mdh-field">

          <label>
            Target Percentage
          </label>

          <input
            type="number"
            id="marksTarget"
            value="60"
          >

        </div>


        <div class="mdh-field">

          <label>
            Marks Already Obtained
          </label>

          <input
            type="number"
            id="marksObtained"
            value="40"
          >

        </div>


        ${createButton(
          "Calculate Required Marks"
        )}


        <div id="marksResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const total =
          Number(
            document.getElementById(
              "marksTotal"
            ).value
          );


        const target =
          Number(
            document.getElementById(
              "marksTarget"
            ).value
          );


        const obtained =
          Number(
            document.getElementById(
              "marksObtained"
            ).value
          );


        const required =
          total *
          target /
          100 -
          obtained;


        document.getElementById(
          "marksResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              Required Marks:
              ${formatNumber(
                Math.max(
                  0,
                  required
                )
              )}
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     GRADE CALCULATOR
     ======================================================= */

  function loadGrade() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          🏅 Grade Calculator
        </h3>

        <div class="mdh-field">

          <label>
            Percentage
          </label>

          <input
            type="number"
            id="gradePercentage"
            value="85"
          >

        </div>


        ${createButton(
          "Calculate Grade"
        )}


        <div id="gradeResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const p =
          Number(
            document.getElementById(
              "gradePercentage"
            ).value
          );


        let grade;


        if (p >= 90)
          grade = "A+";

        else if (p >= 80)
          grade = "A";

        else if (p >= 70)
          grade = "B";

        else if (p >= 60)
          grade = "C";

        else if (p >= 50)
          grade = "D";

        else
          grade = "F";


        document.getElementById(
          "gradeResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              Grade:
              ${grade}
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     STUDY TIME
     ======================================================= */

  function loadStudyTime() {

    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          ⏱️ Study Time Calculator
        </h3>

        <div class="mdh-field">

          <label>
            Total Study Hours
          </label>

          <input
            type="number"
            id="studyHours"
            value="6"
          >

        </div>


        <div class="mdh-field">

          <label>
            Number of Subjects
          </label>

          <input
            type="number"
            id="studySubjects"
            value="4"
          >

        </div>


        ${createButton(
          "Calculate"
        )}


        <div id="studyResult"></div>

      </div>

    `;


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        const hours =
          Number(
            document.getElementById(
              "studyHours"
            ).value
          );


        const subjects =
          Number(
            document.getElementById(
              "studySubjects"
            ).value
          );


        const perSubject =
          subjects
            ? hours /
              subjects
            : 0;


        document.getElementById(
          "studyResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              Suggested Time:
              ${formatNumber(
                perSubject,
                2
              )}
              hours per subject
            </strong>

          </div>

        `;

      };

  }


  /* =======================================================
     MOCK TEST
     ======================================================= */

  function loadMockTest() {

    const questions = [

      {
        q: "What is 25% of 200?",
        options: [
          "25",
          "40",
          "50",
          "75"
        ],
        answer: 2
      },

      {
        q: "What is 12 × 8?",
        options: [
          "86",
          "96",
          "108",
          "112"
        ],
        answer: 1
      },

      {
        q: "Which is the largest planet?",
        options: [
          "Earth",
          "Mars",
          "Jupiter",
          "Venus"
        ],
        answer: 2
      },

      {
        q: "1000 metres equals?",
        options: [
          "1 km",
          "10 km",
          "100 km",
          "0.1 km"
        ],
        answer: 0
      },

      {
        q: "What is 15 + 27?",
        options: [
          "32",
          "40",
          "42",
          "45"
        ],
        answer: 2
      }

    ];


    toolContent.innerHTML = toolCSS() + `

      <div class="mdh-tool">

        <h3>
          🧠 Mini Mock Test
        </h3>

        <p>
          Answer all questions and check your score.
        </p>

        <div id="mockQuestions"></div>

        ${createButton(
          "Submit Test"
        )}

        <div id="mockResult"></div>

      </div>

    `;


    const box =
      document.getElementById(
        "mockQuestions"
      );


    questions.forEach(
      function (
        item,
        index
      ) {

        let html = `

          <div
            class="mdh-result"
            style="margin-bottom:10px"
          >

            <strong>
              ${index + 1}.
              ${escapeHTML(item.q)}
            </strong>

            <br><br>

        `;


        item.options.forEach(
          function (
            option,
            optionIndex
          ) {

            html += `

              <label
                style="
                  display:block;
                  margin:7px 0;
                  font-size:12px;
                "
              >

                <input
                  type="radio"
                  name="question${index}"
                  value="${optionIndex}"
                >

                ${escapeHTML(
                  option
                )}

              </label>

            `;

          }
        );


        html += `</div>`;


        box.insertAdjacentHTML(
          "beforeend",
          html
        );

      }
    );


    toolContent
      .querySelector("button")
      .onclick =
      function () {

        let score = 0;


        questions.forEach(
          function (
            item,
            index
          ) {

            const selected =
              toolContent.querySelector(
                `input[name="question${index}"]:checked`
              );


            if (
              selected &&
              Number(
                selected.value
              ) === item.answer
            ) {

              score++;

            }

          }
        );


        document.getElementById(
          "mockResult"
        ).innerHTML = `

          <div class="mdh-result">

            <strong>
              Your Score:
              ${score}/${questions.length}
            </strong>

            <br><br>

            ${
              score === questions.length
                ? "🎉 Excellent!"
                : score >= 3
                  ? "👍 Good job!"
                  : "📚 Keep practicing!"
            }

          </div>

        `;

      };

  }


  /* =======================================================
     LOAD TOOL
     ======================================================= */

  function loadTool(tool) {

    if (!toolContent) return;


    switch (tool) {

      /* ===================================================
         IMAGE
         =================================================== */

      case "compressor":
        loadCompressor();
        break;

      case "resizer":
        loadResizer();
        break;

      case "converter":
        loadConverter();
        break;

      case "reducer":
        loadReducer();
        break;

      case "social":
        loadSocial();
        break;

      case "passport":
        loadPassport();
        break;


      /* ===================================================
         PDF
         =================================================== */

      case "jpgpdf":
      case "pdf":
        loadImagesToPDF();
        break;

      case "pdfprint":
        loadImagesToPDF();
        break;


      /* ===================================================
         FINANCE
         =================================================== */

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
        loadCompound();
        break;

      case "discount":
        loadDiscount();
        break;

      case "profit":
        loadProfit();
        break;

      case "age":
        loadAge();
        break;

      case "insurance":
        loadInsurance();
        break;


      /* ===================================================
         STUDENT
         =================================================== */

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


      /* ===================================================
         NOT YET IMPLEMENTED
         =================================================== */

      case "mergepdf":
      case "splitpdf":
      case "pdfjpg":
      case "pdfpng":
      case "pdfcompressor":
      case "pdfextractor":
      case "pdfreorder":
      case "pdfrotate":

      case "schoolid":
      case "employeeid":
      case "photosheet":
      case "document":
      case "visiting":
      case "resume":
      case "certificate":
      case "signature":
      case "idprint":
      case "photolayout":
      case "label":

        if (tool === "photosheet") {

          loadPhotoSheet();

        } else {

          showComingSoon(
            toolData[tool]
              ? toolData[tool].title
              : "Digital Tool"
          );

        }

        break;


      default:

        showComingSoon(
          toolData[tool]
            ? toolData[tool].title
            : "Digital Tool"
        );

    }

  }


  /* =======================================================
     KEYBOARD SHORTCUT
     ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      const isMac =
        navigator.platform
          .toUpperCase()
          .indexOf("MAC") >= 0;


      const modifier =
        isMac
          ? event.metaKey
          : event.ctrlKey;


      if (
        modifier &&
        event.key.toLowerCase() === "k"
      ) {

        event.preventDefault();


        if (searchInput) {

          searchInput.focus();

          searchInput.select();

        }

      }

    }
  );


  /* =======================================================
     SERVICE WORKER
     ======================================================= */

  if (
    "serviceWorker" in navigator
  ) {

    window.addEventListener(
      "load",
      function () {

        navigator.serviceWorker
          .register(
            "./service-worker.js"
          )
          .catch(
            function () {

              /* Silent failure */

            }
          );

      }
    );

  }


  /* =======================================================
     CONSOLE
     ======================================================= */

  console.log(
    "Manjeet Digital Hub v3.1 loaded successfully."
  );

});
