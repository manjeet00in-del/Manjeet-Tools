/* =========================================================
   MANJEET DIGITAL HUB
   COMPLETE APP.JS
   Version 3.0
   ========================================================= */

"use strict";

document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     ELEMENTS
     ===================================================== */

  const modal = document.getElementById("toolModal");
  const modalOverlay = document.getElementById("modalOverlay");
  const closeTool = document.getElementById("closeTool");
  const modalTitle = document.getElementById("modalTitle");
  const modalIcon = document.getElementById("modalIcon");
  const toolContent = document.getElementById("toolContent");
  const searchInput = document.getElementById("toolSearch");
  const noResults = document.getElementById("noResults");
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }


  /* =====================================================
     TOOL DATABASE
     ===================================================== */

  const toolData = {

    /* IMAGE */

    compressor: { title:"Image Compressor", icon:"🗜️", active:true },
    resizer: { title:"Image Resizer", icon:"↔️", active:true },
    converter: { title:"Image Converter", icon:"🔄", active:true },
    reducer: { title:"Photo Size Reducer", icon:"📉", active:true },
    social: { title:"Social Media Resizer", icon:"📱", active:true },
    passport: { title:"Passport Photo Maker", icon:"📷", active:true },

    /* PDF */

    jpgpdf: { title:"JPG → PDF", icon:"📄", active:true },
    pdf: { title:"Images → PDF", icon:"📑", active:true },
    mergepdf: { title:"Merge PDF", icon:"📚", active:false },
    splitpdf: { title:"Split PDF", icon:"✂️", active:false },
    pdfjpg: { title:"PDF → JPG", icon:"🖼️", active:false },
    pdfpng: { title:"PDF → PNG", icon:"🖼️", active:false },
    pdfcompressor: { title:"PDF Compressor", icon:"🗜️", active:false },
    pdfextractor: { title:"PDF Page Extractor", icon:"📑", active:false },
    pdfreorder: { title:"PDF Page Reorder", icon:"↕️", active:false },
    pdfrotate: { title:"PDF Rotate", icon:"🔄", active:false },
    pdfprint: { title:"PDF Print Sheet", icon:"🖨️", active:false },

    /* ID & PRINT */

    schoolid: { title:"School ID Card Maker", icon:"🎓", active:false },
    employeeid: { title:"Employee ID Card Maker", icon:"👨‍💼", active:false },
    photosheet: { title:"A4 Photo Sheet Maker", icon:"🖨️", active:true },
    document: { title:"Document Photo Maker", icon:"📃", active:false },
    visiting: { title:"Visiting Card Maker", icon:"💼", active:false },
    resume: { title:"Resume Maker", icon:"📄", active:false },
    certificate: { title:"Certificate Maker", icon:"🏆", active:false },
    signature: { title:"Signature Maker", icon:"✍️", active:false },
    idprint: { title:"ID Card Print Sheet", icon:"🪪", active:false },
    photolayout: { title:"Photo Print Layout", icon:"🖨️", active:false },
    label: { title:"Label / Sticker Maker", icon:"🏷️", active:false },

    /* FINANCE */

    emi: { title:"EMI Calculator", icon:"₹", active:true },
    gst: { title:"GST Calculator", icon:"%", active:true },
    percentage: { title:"Percentage Calculator", icon:"%", active:true },
    sip: { title:"SIP Calculator", icon:"📈", active:true },
    fd: { title:"FD Calculator", icon:"🏦", active:true },
    rd: { title:"RD Calculator", icon:"💰", active:true },
    loaninterest: { title:"Loan Interest Calculator", icon:"💳", active:false },
    interest: { title:"Simple Interest Calculator", icon:"₹", active:true },
    compound: { title:"Compound Interest Calculator", icon:"📈", active:true },
    discount: { title:"Discount Calculator", icon:"🏷️", active:true },
    profit: { title:"Profit & Loss Calculator", icon:"📊", active:true },
    age: { title:"Age Calculator", icon:"🎂", active:true },
    insurance: { title:"Insurance Policy Return Calculator", icon:"🛡️", active:false },

    /* STUDENT */

    cgpa: { title:"CGPA → Percentage", icon:"🎓", active:true },
    gpa: { title:"GPA Calculator", icon:"🎓", active:true },
    marks: { title:"Marks Required Calculator", icon:"📝", active:true },
    grade: { title:"Grade Calculator", icon:"🏆", active:true },
    studytime: { title:"Study Time Calculator", icon:"⏱️", active:true },
    mocktest: { title:"Mock Test", icon:"📋", active:true },

    /* LEGACY / EXTRA */

    qr: { title:"QR Generator", icon:"▦", active:true },
    invoice: { title:"Invoice Generator", icon:"🧾", active:true },
    words: { title:"Word Counter", icon:"Aa", active:true },
    case: { title:"Case Converter", icon:"Aa", active:true }

  };


  /* =====================================================
     HELPERS
     ===================================================== */

  function escapeHTML(value) {
    return String(value)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
  }


  function formatNumber(value) {
    const n = Number(value);

    if (!Number.isFinite(n)) return "0";

    return n.toLocaleString("en-IN", {
      maximumFractionDigits: 2
    });
  }


  function money(value) {
    return "₹" + formatNumber(value);
  }


  function downloadBlob(blob, filename) {

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

    return new Promise((resolve,reject) => {

      const img = new Image();

      const url = URL.createObjectURL(file);

      img.onload = () => {
        URL.revokeObjectURL(url);
        resolve(img);
      };

      img.onerror = () => {
        URL.revokeObjectURL(url);
        reject(new Error("Image could not be loaded"));
      };

      img.src = url;
    });
  }


  function canvasToBlob(
    canvas,
    type="image/jpeg",
    quality=0.9
  ) {

    return new Promise((resolve,reject) => {

      canvas.toBlob(blob => {

        if (!blob) {
          reject(new Error("Could not create image"));
          return;
        }

        resolve(blob);

      },type,quality);
    });
  }


  function createFileDrop(
    accept="image/*",
    multiple=false
  ) {

    const wrapper = document.createElement("div");

    wrapper.innerHTML = `

      <div class="file-drop">

        <div class="file-drop-icon">📁</div>

        <h4>
          ${multiple ? "Select files" : "Select an image"}
        </h4>

        <p>
          Click here or drag and drop
        </p>

        <label class="file-select-button">

          Choose File

          <input
            type="file"
            accept="${accept}"
            ${multiple ? "multiple" : ""}
          >

        </label>

      </div>

    `;

    const drop = wrapper.querySelector(".file-drop");
    const input = wrapper.querySelector("input");

    drop.addEventListener("dragover", e => {
      e.preventDefault();
      drop.classList.add("dragover");
    });

    drop.addEventListener("dragleave", () => {
      drop.classList.remove("dragover");
    });

    drop.addEventListener("drop", e => {

      e.preventDefault();

      drop.classList.remove("dragover");

      if (
        e.dataTransfer &&
        e.dataTransfer.files.length
      ) {

        try {

          const dt = new DataTransfer();

          Array.from(e.dataTransfer.files).forEach(file => {
            dt.items.add(file);
          });

          input.files = dt.files;

          input.dispatchEvent(
            new Event("change")
          );

        } catch(err) {
          console.warn(err);
        }
      }
    });

    return {
      wrapper,
      input,
      drop
    };
  }


  /* =====================================================
     MODAL
     ===================================================== */

  function openModal() {

    if (!modal) return;

    modal.classList.add("active");

    modal.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.classList.add("modal-open");
  }


  function closeModal() {

    if (modal) {

      modal.classList.remove("active");

      modal.setAttribute(
        "aria-hidden",
        "true"
      );
    }

    document.body.classList.remove(
      "modal-open"
    );

    if (toolContent) {
      toolContent.innerHTML = "";
    }
  }


  function showComingSoon(title) {

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalIcon) {
      modalIcon.textContent = "🚀";
    }

    openModal();

    if (!toolContent) return;

    toolContent.innerHTML = `

      <div class="coming-soon">

        <div class="coming-icon">
          🚀
        </div>

        <h2>
          Coming Soon
        </h2>

        <p>
          <strong>${escapeHTML(title)}</strong>
          is being developed for Manjeet Digital Hub.
        </p>

        <div class="coming-features">

          <div>⚡ Fast</div>
          <div>🔒 Secure</div>
          <div>🆓 Free</div>

        </div>

        <p class="coming-note">
          This tool will be available in a future update.
        </p>

      </div>

    `;
  }


  function openTool(toolName) {

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

    openModal();

    loadTool(toolName);

    setTimeout(() => {

      const firstInput =
        toolContent?.querySelector(
          "input:not([type='file']), textarea, select"
        );

      if (firstInput) {
        firstInput.focus();
      }

    },150);
  }


  /* =====================================================
     CARD CLICK
     ===================================================== */

  document.querySelectorAll(".tool-card")
    .forEach(card => {

      card.setAttribute("tabindex","0");
      card.setAttribute("role","button");

      card.addEventListener("click",() => {

        const tool =
          card.getAttribute("data-tool");

        if (tool) {
          openTool(tool);
        }
      });

      card.addEventListener("keydown",e => {

        if (
          e.key === "Enter" ||
          e.key === " "
        ) {

          e.preventDefault();

          card.click();
        }
      });
    });


  /* =====================================================
     MODAL CLOSE
     ===================================================== */

  closeTool?.addEventListener(
    "click",
    closeModal
  );

  modalOverlay?.addEventListener(
    "click",
    closeModal
  );

  document.addEventListener("keydown",e => {

    if (e.key === "Escape") {
      closeModal();
    }
  });


  /* =====================================================
     SEARCH
     ===================================================== */

  searchInput?.addEventListener(
    "input",
    () => {

      const query =
        searchInput.value
          .trim()
          .toLowerCase();

      const cards =
        document.querySelectorAll(
          ".tool-card"
        );

      let visible = 0;

      cards.forEach(card => {

        const name =
          (
            card.getAttribute("data-name") ||
            card.textContent ||
            ""
          ).toLowerCase();

        const match =
          !query ||
          name.includes(query);

        card.style.display =
          match ? "" : "none";

        if (match) {
          visible++;
        }
      });

      if (noResults) {

        noResults.classList.toggle(
          "show",
          visible === 0
        );
      }
    }
  );


  /* =====================================================
     CTRL + K
     ===================================================== */

  document.addEventListener("keydown",e => {

    const mac =
      navigator.platform
        .toUpperCase()
        .includes("MAC");

    if (
      (mac && e.metaKey && e.key.toLowerCase()==="k") ||
      (!mac && e.ctrlKey && e.key.toLowerCase()==="k")
    ) {

      e.preventDefault();

      searchInput?.focus();
    }
  });


  /* =====================================================
     TOOL LOADER
     ===================================================== */

  function loadTool(tool) {

    if (!toolContent) return;

    toolContent.innerHTML = "";

    switch(tool) {

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

      case "jpgpdf":
      case "pdf":
        loadImagesPDF();
        break;

      case "photosheet":
        loadPhotoSheet();
        break;

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

      case "qr":
        loadQR();
        break;

      case "invoice":
        loadInvoice();
        break;

      case "words":
        loadWordCounter();
        break;

      case "case":
        loadCaseConverter();
        break;

      default:
        showComingSoon(
          toolData[tool]?.title || "This Tool"
        );
    }
  }


  /* =====================================================
     IMAGE COMPRESSOR
     ===================================================== */

  function loadCompressor() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="compressFile"></div>

        <div class="form-group">

          <label>Image Quality</label>

          <input
            id="compressQuality"
            type="range"
            min="10"
            max="100"
            value="80"
          >

          <strong id="qualityValue">
            80%
          </strong>

        </div>

        <button
          class="primary-button"
          id="compressBtn"
        >
          Compress Image
        </button>

        <div id="compressResult"></div>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );

    document
      .getElementById("compressFile")
      .appendChild(drop.wrapper);

    const range =
      document.getElementById("compressQuality");

    range.addEventListener("input",() => {

      document.getElementById(
        "qualityValue"
      ).textContent =
        range.value + "%";
    });

    document
      .getElementById("compressBtn")
      .addEventListener("click",async()=>{

        const file =
          drop.input.files[0];

        if (!file) {
          alert("Please select an image first.");
          return;
        }

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
            .drawImage(img,0,0);

          const blob =
            await canvasToBlob(
              canvas,
              "image/jpeg",
              Number(range.value)/100
            );

          const saved =
            Math.max(
              0,
              ((file.size-blob.size)/file.size)*100
            );

          document
            .getElementById("compressResult")
            .innerHTML = `

              <div class="result-box">

                <h4>
                  Compression Complete
                </h4>

                <div class="result-grid">

                  <div class="result-item">
                    <span>Original</span>
                    <strong>${(file.size/1024).toFixed(1)} KB</strong>
                  </div>

                  <div class="result-item">
                    <span>New Size</span>
                    <strong>${(blob.size/1024).toFixed(1)} KB</strong>
                  </div>

                  <div class="result-item">
                    <span>Saved</span>
                    <strong>${saved.toFixed(1)}%</strong>
                  </div>

                </div>

                <br>

                <button
                  class="download-button"
                  id="downloadCompressed"
                >
                  ⬇ Download
                </button>

              </div>
            `;

          document
            .getElementById("downloadCompressed")
            .onclick = () =>
              downloadBlob(
                blob,
                "manjeet-compressed.jpg"
              );

        } catch(e) {

          console.error(e);
          alert("Unable to compress image.");

        }
      });
  }


  /* =====================================================
     IMAGE RESIZER
     ===================================================== */

  function loadResizer() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="resizeFile"></div>

        <div class="form-row">

          <div class="form-group">
            <label>Width</label>
            <input id="resizeWidth" type="number">
          </div>

          <div class="form-group">
            <label>Height</label>
            <input id="resizeHeight" type="number">
          </div>

        </div>

        <label class="check-row">
          <input id="keepRatio" type="checkbox" checked>
          Keep aspect ratio
        </label>

        <button
          id="resizeBtn"
          class="primary-button"
        >
          Resize Image
        </button>

        <div id="resizeResult"></div>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );

    document
      .getElementById("resizeFile")
      .appendChild(drop.wrapper);

    let img = null;

    drop.input.addEventListener(
      "change",
      async()=>{
        if (!drop.input.files[0]) return;

        img =
          await loadImage(
            drop.input.files[0]
          );

        document.getElementById(
          "resizeWidth"
        ).value = img.naturalWidth;

        document.getElementById(
          "resizeHeight"
        ).value = img.naturalHeight;
      }
    );

    document.getElementById(
      "resizeWidth"
    ).addEventListener("input",()=>{

      if (
        img &&
        document.getElementById("keepRatio").checked
      ) {

        document.getElementById(
          "resizeHeight"
        ).value =
          Math.round(
            Number(
              document.getElementById("resizeWidth").value
            ) *
            img.naturalHeight /
            img.naturalWidth
          );
      }
    });

    document.getElementById(
      "resizeBtn"
    ).onclick = async()=>{

      if (!img) {
        alert("Please select an image first.");
        return;
      }

      const w =
        Math.max(
          1,
          Number(
            document.getElementById("resizeWidth").value
          )
        );

      const h =
        Math.max(
          1,
          Number(
            document.getElementById("resizeHeight").value
          )
        );

      const canvas =
        document.createElement("canvas");

      canvas.width = w;
      canvas.height = h;

      canvas
        .getContext("2d")
        .drawImage(img,0,0,w,h);

      const blob =
        await canvasToBlob(
          canvas,
          "image/jpeg",
          .92
        );

      const url =
        URL.createObjectURL(blob);

      document.getElementById(
        "resizeResult"
      ).innerHTML = `

        <div class="result-box">

          <div class="preview-area">

            <div class="preview-card">

              <span>${w} × ${h}</span>

              <img
                src="${url}"
                alt="Resized image"
              >

            </div>

          </div>

          <br>

          <button
            class="download-button"
            id="downloadResize"
          >
            ⬇ Download
          </button>

        </div>
      `;

      document.getElementById(
        "downloadResize"
      ).onclick = () =>
        downloadBlob(
          blob,
          "manjeet-resized.jpg"
        );
    };
  }


  /* =====================================================
     IMAGE CONVERTER
     ===================================================== */

  function loadConverter() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="convertFile"></div>

        <div class="form-group">

          <label>Convert To</label>

          <select id="convertType">

            <option value="image/jpeg">JPG</option>
            <option value="image/png">PNG</option>
            <option value="image/webp">WebP</option>

          </select>

        </div>

        <button
          id="convertBtn"
          class="primary-button"
        >
          Convert Image
        </button>

        <div id="convertResult"></div>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );

    document
      .getElementById("convertFile")
      .appendChild(drop.wrapper);

    document.getElementById(
      "convertBtn"
    ).onclick = async()=>{

      const file =
        drop.input.files[0];

      if (!file) {
        alert("Please select an image first.");
        return;
      }

      const img =
        await loadImage(file);

      const canvas =
        document.createElement("canvas");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      canvas
        .getContext("2d")
        .drawImage(img,0,0);

      const type =
        document.getElementById(
          "convertType"
        ).value;

      const blob =
        await canvasToBlob(
          canvas,
          type,
          .92
        );

      const ext =
        type === "image/png"
          ? "png"
          : type === "image/webp"
            ? "webp"
            : "jpg";

      document.getElementById(
        "convertResult"
      ).innerHTML = `

        <div class="result-box">

          <h4>
            Conversion Complete
          </h4>

          <button
            class="download-button"
            id="downloadConvert"
          >
            ⬇ Download ${ext.toUpperCase()}
          </button>

        </div>
      `;

      document.getElementById(
        "downloadConvert"
      ).onclick = () =>
        downloadBlob(
          blob,
          "manjeet-converted."+ext
        );
    };
  }


  /* =====================================================
     PHOTO SIZE REDUCER
     ===================================================== */

  function loadReducer() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="reduceFile"></div>

        <div class="form-group">

          <label>
            Target Size (KB)
          </label>

          <input
            id="targetKB"
            type="number"
            value="100"
            min="5"
          >

        </div>

        <button
          id="reduceBtn"
          class="primary-button"
        >
          Reduce Photo Size
        </button>

        <div id="reduceResult"></div>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );

    document
      .getElementById("reduceFile")
      .appendChild(drop.wrapper);

    document.getElementById(
      "reduceBtn"
    ).onclick = async()=>{

      const file =
        drop.input.files[0];

      if (!file) {
        alert("Please select an image.");
        return;
      }

      const target =
        Number(
          document.getElementById("targetKB").value
        ) * 1024;

      const img =
        await loadImage(file);

      const canvas =
        document.createElement("canvas");

      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;

      canvas
        .getContext("2d")
        .drawImage(img,0,0);

      let low = .05;
      let high = .95;
      let best = null;

      for(let i=0;i<10;i++){

        const q =
          (low+high)/2;

        const blob =
          await canvasToBlob(
            canvas,
            "image/jpeg",
            q
          );

        if(blob.size <= target){

          best = blob;
          low = q;

        }else{

          high = q;
        }
      }

      if(!best){

        best =
          await canvasToBlob(
            canvas,
            "image/jpeg",
            .05
          );
      }

      document.getElementById(
        "reduceResult"
      ).innerHTML = `

        <div class="result-box">

          <h4>
            Photo Size Reduced
          </h4>

          <div class="result-grid">

            <div class="result-item">
              <span>Original</span>
              <strong>${(file.size/1024).toFixed(1)} KB</strong>
            </div>

            <div class="result-item">
              <span>New Size</span>
              <strong>${(best.size/1024).toFixed(1)} KB</strong>
            </div>

          </div>

          <br>

          <button
            id="downloadReduced"
            class="download-button"
          >
            ⬇ Download
          </button>

        </div>
      `;

      document.getElementById(
        "downloadReduced"
      ).onclick = () =>
        downloadBlob(
          best,
          "manjeet-reduced.jpg"
        );
    };
  }


  /* =====================================================
     SOCIAL MEDIA RESIZER
     ===================================================== */

  function loadSocial() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="socialFile"></div>

        <div class="form-group">

          <label>
            Select Size
          </label>

          <select id="socialSize">

            <option value="1080,1080">
              Instagram Square — 1080×1080
            </option>

            <option value="1080,1350">
              Instagram Portrait — 1080×1350
            </option>

            <option value="1080,1920">
              Story — 1080×1920
            </option>

            <option value="1280,720">
              YouTube Thumbnail — 1280×720
            </option>

            <option value="1200,630">
              Facebook Post — 1200×630
            </option>

          </select>

        </div>

        <button
          id="socialBtn"
          class="primary-button"
        >
          Resize
        </button>

        <div id="socialResult"></div>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );

    document
      .getElementById("socialFile")
      .appendChild(drop.wrapper);

    document.getElementById(
      "socialBtn"
    ).onclick = async()=>{

      const file =
        drop.input.files[0];

      if (!file) {
        alert("Please select an image.");
        return;
      }

      const img =
        await loadImage(file);

      const [w,h] =
        document.getElementById(
          "socialSize"
        ).value
        .split(",")
        .map(Number);

      const canvas =
        document.createElement("canvas");

      canvas.width = w;
      canvas.height = h;

      const ctx =
        canvas.getContext("2d");

      const sourceRatio =
        img.naturalWidth /
        img.naturalHeight;

      const targetRatio =
        w/h;

      let dw,dh,x,y;

      if(sourceRatio > targetRatio){

        dh = h;
        dw = h*sourceRatio;
        x = (w-dw)/2;
        y = 0;

      }else{

        dw = w;
        dh = w/sourceRatio;
        x = 0;
        y = (h-dh)/2;
      }

      ctx.drawImage(
        img,
        x,y,dw,dh
      );

      const blob =
        await canvasToBlob(
          canvas,
          "image/jpeg",
          .92
        );

      const url =
        URL.createObjectURL(blob);

      document.getElementById(
        "socialResult"
      ).innerHTML = `

        <div class="result-box">

          <div class="preview-area">

            <div class="preview-card">

              <span>${w} × ${h}</span>

              <img
                src="${url}"
                alt="Social image"
              >

            </div>

          </div>

          <br>

          <button
            id="downloadSocial"
            class="download-button"
          >
            ⬇ Download
          </button>

        </div>
      `;

      document.getElementById(
        "downloadSocial"
      ).onclick = () =>
        downloadBlob(
          blob,
          "manjeet-social-image.jpg"
        );
    };
  }


  /* =====================================================
     PASSPORT PHOTO MAKER
     ===================================================== */

  function loadPassport() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="passportFile"></div>

        <div class="form-row">

          <div class="form-group">

            <label>
              Width (px)
            </label>

            <input
              id="passportWidth"
              type="number"
              value="413"
              min="50"
            >

          </div>

          <div class="form-group">

            <label>
              Height (px)
            </label>

            <input
              id="passportHeight"
              type="number"
              value="531"
              min="50"
            >

          </div>

        </div>

        <div class="form-group">

          <label>
            Background
          </label>

          <select id="passportBG">

            <option value="white">
              White
            </option>

            <option value="#f5f5f5">
              Light Grey
            </option>

            <option value="#dbeafe">
              Light Blue
            </option>

          </select>

        </div>

        <button
          id="passportBtn"
          class="primary-button"
        >
          Create Passport Photo
        </button>

        <div id="passportResult"></div>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );

    document
      .getElementById("passportFile")
      .appendChild(drop.wrapper);

    document.getElementById(
      "passportBtn"
    ).onclick = async()=>{

      const file =
        drop.input.files[0];

      if (!file) {
        alert("Please select your photo.");
        return;
      }

      const img =
        await loadImage(file);

      const w =
        Number(
          document.getElementById(
            "passportWidth"
          ).value
        );

      const h =
        Number(
          document.getElementById(
            "passportHeight"
          ).value
        );

      const bg =
        document.getElementById(
          "passportBG"
        ).value;

      const canvas =
        document.createElement("canvas");

      canvas.width = w;
      canvas.height = h;

      const ctx =
        canvas.getContext("2d");

      ctx.fillStyle = bg;
      ctx.fillRect(0,0,w,h);

      const sourceRatio =
        img.naturalWidth /
        img.naturalHeight;

      const targetRatio =
        w/h;

      let dw,dh,x,y;

      if(sourceRatio > targetRatio){

        dh = h;
        dw = h*sourceRatio;
        x = (w-dw)/2;
        y = 0;

      }else{

        dw = w;
        dh = w/sourceRatio;
        x = 0;
        y = (h-dh)/2;
      }

      ctx.drawImage(
        img,
        x,y,dw,dh
      );

      const blob =
        await canvasToBlob(
          canvas,
          "image/jpeg",
          .95
        );

      const url =
        URL.createObjectURL(blob);

      document.getElementById(
        "passportResult"
      ).innerHTML = `

        <div class="result-box">

          <h4>
            Passport Photo Ready
          </h4>

          <div class="preview-area">

            <div class="preview-card">

              <img
                src="${url}"
                alt="Passport photo"
              >

            </div>

          </div>

          <br>

          <button
            id="downloadPassport"
            class="download-button"
          >
            ⬇ Download Passport Photo
          </button>

        </div>
      `;

      document.getElementById(
        "downloadPassport"
      ).onclick = () =>
        downloadBlob(
          blob,
          "manjeet-passport-photo.jpg"
        );
    };
  }


  /* =====================================================
     A4 PHOTO SHEET MAKER
     ===================================================== */

  function loadPhotoSheet() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="sheetFile"></div>

        <div class="form-row">

          <div class="form-group">

            <label>Photo Width (mm)</label>

            <input
              id="sheetW"
              type="number"
              value="35"
            >

          </div>

          <div class="form-group">

            <label>Photo Height (mm)</label>

            <input
              id="sheetH"
              type="number"
              value="45"
            >

          </div>

        </div>

        <button
          id="sheetBtn"
          class="primary-button"
        >
          Create A4 Photo Sheet
        </button>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );

    document
      .getElementById("sheetFile")
      .appendChild(drop.wrapper);

    document.getElementById(
      "sheetBtn"
    ).onclick = async()=>{

      const file =
        drop.input.files[0];

      if (!file) {
        alert("Please select a photo.");
        return;
      }

      const img =
        await loadImage(file);

      const widthMM =
        Number(
          document.getElementById("sheetW").value
        );

      const heightMM =
        Number(
          document.getElementById("sheetH").value
        );

      const printWindow =
        window.open("","_blank");

      if(!printWindow){

        alert(
          "Please allow pop-ups for this website."
        );

        return;
      }

      const dataURL =
        await imageToDataURL(img);

      printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

          <title>
            Manjeet Digital Hub - Photo Sheet
          </title>

          <style>

            @page {
              size: A4;
              margin: 10mm;
            }

            body {
              margin:0;
              font-family:Arial,sans-serif;
            }

            .sheet {
              width:190mm;
              min-height:277mm;
              display:flex;
              flex-wrap:wrap;
              align-content:flex-start;
              gap:3mm;
            }

            .photo {
              width:${widthMM}mm;
              height:${heightMM}mm;
              object-fit:cover;
              border:0.2mm solid #ddd;
            }

          </style>

        </head>

        <body>

          <div class="sheet">
      `);

      const cols =
        Math.floor(
          190 /
          (widthMM+3)
        );

      const rows =
        Math.floor(
          277 /
          (heightMM+3)
        );

      const count =
        Math.max(
          1,
          cols*rows
        );

      for(let i=0;i<count;i++){

        printWindow.document.write(`

          <img
            class="photo"
            src="${dataURL}"
          >

        `);
      }

      printWindow.document.write(`

          </div>

        </body>

        </html>
      `);

      printWindow.document.close();

      setTimeout(()=>{
        printWindow.focus();
        printWindow.print();
      },500);
    };
  }


  function imageToDataURL(img){

    return new Promise(resolve=>{

      const canvas =
        document.createElement("canvas");

      canvas.width =
        img.naturalWidth;

      canvas.height =
        img.naturalHeight;

      canvas
        .getContext("2d")
        .drawImage(img,0,0);

      resolve(
        canvas.toDataURL(
          "image/jpeg",
          .95
        )
      );
    });
  }


  /* =====================================================
     IMAGES TO PDF / JPG TO PDF
     ===================================================== */

  function loadImagesPDF() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="pdfFiles"></div>

        <div class="result-box">

          <h4>
            Images → PDF
          </h4>

          <p>
            Select one or multiple images.
            Your browser print window will create
            a PDF without uploading your files.
          </p>

        </div>

        <button
          id="makePDF"
          class="primary-button"
        >
          Create PDF
        </button>

      </div>
    `;

    const drop =
      createFileDrop(
        "image/jpeg,image/png,image/webp",
        true
      );

    document
      .getElementById("pdfFiles")
      .appendChild(drop.wrapper);

    document.getElementById(
      "makePDF"
    ).onclick = async()=>{

      const files =
        Array.from(
          drop.input.files
        );

      if(!files.length){

        alert(
          "Please select at least one image."
        );

        return;
      }

      const win =
        window.open("","_blank");

      if(!win){

        alert(
          "Please allow pop-ups."
        );

        return;
      }

      win.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

          <title>
            Manjeet Digital Hub - Images to PDF
          </title>

          <style>

            @page {
              size:A4;
              margin:0;
            }

            body {
              margin:0;
            }

            .page {
              width:210mm;
              height:297mm;
              display:flex;
              align-items:center;
              justify-content:center;
              page-break-after:always;
            }

            img {
              max-width:190mm;
              max-height:277mm;
              object-fit:contain;
            }

          </style>

        </head>

        <body>
      `);

      for(const file of files){

        const img =
          await loadImage(file);

        const src =
          await imageToDataURL(img);

        win.document.write(`

          <div class="page">

            <img src="${src}">

          </div>

        `);
      }

      win.document.write(`
        </body>
        </html>
      `);

      win.document.close();

      setTimeout(()=>{
        win.focus();
        win.print();
      },500);
    };
  }


  /* =====================================================
     EMI
     ===================================================== */

  function loadEMI() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Loan Amount (₹)</label>
          <input id="emiPrincipal" type="number" value="1000000">
        </div>

        <div class="form-group">
          <label>Interest Rate (% p.a.)</label>
          <input id="emiRate" type="number" value="8.5" step="0.01">
        </div>

        <div class="form-group">
          <label>Tenure (Years)</label>
          <input id="emiYears" type="number" value="20">
        </div>

        <button
          id="emiBtn"
          class="primary-button"
        >
          Calculate EMI
        </button>

        <div id="emiResult"></div>

      </div>
    `;

    document.getElementById(
      "emiBtn"
    ).onclick = ()=>{

      const P =
        Number(
          document.getElementById("emiPrincipal").value
        );

      const annual =
        Number(
          document.getElementById("emiRate").value
        );

      const years =
        Number(
          document.getElementById("emiYears").value
        );

      if(P<=0 || years<=0 || annual<0){

        alert("Please enter valid values.");
        return;
      }

      const n =
        years*12;

      const r =
        annual/12/100;

      const emi =
        r===0
          ? P/n
          : P*r*Math.pow(1+r,n)/
            (Math.pow(1+r,n)-1);

      const total =
        emi*n;

      const interest =
        total-P;

      document.getElementById(
        "emiResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Monthly EMI
          </div>

          <div class="main-value">
            ${money(emi)}
          </div>

        </div>

        <div class="result-grid">

          <div class="result-item">
            <span>Principal</span>
            <strong>${money(P)}</strong>
          </div>

          <div class="result-item">
            <span>Total Interest</span>
            <strong>${money(interest)}</strong>
          </div>

          <div class="result-item">
            <span>Total Payment</span>
            <strong>${money(total)}</strong>
          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     GST
     ===================================================== */

  function loadGST() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Amount (₹)</label>
          <input id="gstAmount" type="number" value="10000">
        </div>

        <div class="form-group">
          <label>GST Rate</label>

          <select id="gstRate">

            <option value="0">0%</option>
            <option value="5">5%</option>
            <option value="12">12%</option>
            <option value="18" selected>18%</option>
            <option value="28">28%</option>

          </select>
        </div>

        <button
          id="gstBtn"
          class="primary-button"
        >
          Calculate GST
        </button>

        <div id="gstResult"></div>

      </div>
    `;

    document.getElementById(
      "gstBtn"
    ).onclick = ()=>{

      const amount =
        Number(
          document.getElementById("gstAmount").value
        );

      const rate =
        Number(
          document.getElementById("gstRate").value
        );

      const gst =
        amount*rate/100;

      document.getElementById(
        "gstResult"
      ).innerHTML = `

        <div class="result-box">

          <div class="result-grid">

            <div class="result-item">
              <span>Amount</span>
              <strong>${money(amount)}</strong>
            </div>

            <div class="result-item">
              <span>GST</span>
              <strong>${money(gst)}</strong>
            </div>

            <div class="result-item">
              <span>Total</span>
              <strong>${money(amount+gst)}</strong>
            </div>

          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     PERCENTAGE
     ===================================================== */

  function loadPercentage() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Percentage (%)</label>
          <input id="percentValue" type="number" value="10">
        </div>

        <div class="form-group">
          <label>Number</label>
          <input id="percentNumber" type="number" value="1000">
        </div>

        <button
          id="percentBtn"
          class="primary-button"
        >
          Calculate
        </button>

        <div id="percentResult"></div>

      </div>
    `;

    document.getElementById(
      "percentBtn"
    ).onclick = ()=>{

      const p =
        Number(
          document.getElementById("percentValue").value
        );

      const n =
        Number(
          document.getElementById("percentNumber").value
        );

      const result =
        p*n/100;

      document.getElementById(
        "percentResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Result
          </div>

          <div class="main-value">
            ${formatNumber(result)}
          </div>

          <p>
            ${p}% of ${formatNumber(n)}
          </p>

        </div>
      `;
    };
  }


  /* =====================================================
     SIP
     ===================================================== */

  function loadSIP() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Monthly Investment (₹)</label>
          <input id="sipMonthly" type="number" value="5000">
        </div>

        <div class="form-group">
          <label>Expected Return (% p.a.)</label>
          <input id="sipRate" type="number" value="12" step="0.1">
        </div>

        <div class="form-group">
          <label>Investment Period (Years)</label>
          <input id="sipYears" type="number" value="10">
        </div>

        <button
          id="sipBtn"
          class="primary-button"
        >
          Calculate SIP
        </button>

        <div id="sipResult"></div>

      </div>
    `;

    document.getElementById(
      "sipBtn"
    ).onclick = ()=>{

      const monthly =
        Number(
          document.getElementById("sipMonthly").value
        );

      const annual =
        Number(
          document.getElementById("sipRate").value
        );

      const years =
        Number(
          document.getElementById("sipYears").value
        );

      const months =
        years*12;

      const r =
        annual/12/100;

      const maturity =
        r===0
          ? monthly*months
          : monthly*
            (
              (Math.pow(1+r,months)-1)/r
            )*
            (1+r);

      const invested =
        monthly*months;

      document.getElementById(
        "sipResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Estimated Value
          </div>

          <div class="main-value">
            ${money(maturity)}
          </div>

        </div>

        <div class="result-grid">

          <div class="result-item">
            <span>Invested</span>
            <strong>${money(invested)}</strong>
          </div>

          <div class="result-item">
            <span>Estimated Gain</span>
            <strong>${money(maturity-invested)}</strong>
          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     FD
     ===================================================== */

  function loadFD() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Deposit Amount (₹)</label>
          <input id="fdAmount" type="number" value="100000">
        </div>

        <div class="form-group">
          <label>Interest Rate (% p.a.)</label>
          <input id="fdRate" type="number" value="7" step="0.01">
        </div>

        <div class="form-group">
          <label>Tenure (Years)</label>
          <input id="fdYears" type="number" value="5">
        </div>

        <div class="form-group">
          <label>Compounding</label>

          <select id="fdCompound">
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="2">Half Yearly</option>
            <option value="1">Yearly</option>
          </select>

        </div>

        <button
          id="fdBtn"
          class="primary-button"
        >
          Calculate FD
        </button>

        <div id="fdResult"></div>

      </div>
    `;

    document.getElementById(
      "fdBtn"
    ).onclick = ()=>{

      const P =
        Number(
          document.getElementById("fdAmount").value
        );

      const r =
        Number(
          document.getElementById("fdRate").value
        )/100;

      const t =
        Number(
          document.getElementById("fdYears").value
        );

      const n =
        Number(
          document.getElementById("fdCompound").value
        );

      const maturity =
        P*Math.pow(
          1+r/n,
          n*t
        );

      document.getElementById(
        "fdResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Maturity Amount
          </div>

          <div class="main-value">
            ${money(maturity)}
          </div>

          <p>
            Interest Earned:
            ${money(maturity-P)}
          </p>

        </div>
      `;
    };
  }


  /* =====================================================
     RD
     ===================================================== */

  function loadRD() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Monthly Deposit (₹)</label>
          <input id="rdMonthly" type="number" value="5000">
        </div>

        <div class="form-group">
          <label>Interest Rate (% p.a.)</label>
          <input id="rdRate" type="number" value="7" step="0.01">
        </div>

        <div class="form-group">
          <label>Tenure (Years)</label>
          <input id="rdYears" type="number" value="5">
        </div>

        <button
          id="rdBtn"
          class="primary-button"
        >
          Calculate RD
        </button>

        <div id="rdResult"></div>

      </div>
    `;

    document.getElementById(
      "rdBtn"
    ).onclick = ()=>{

      const P =
        Number(
          document.getElementById("rdMonthly").value
        );

      const annual =
        Number(
          document.getElementById("rdRate").value
        );

      const years =
        Number(
          document.getElementById("rdYears").value
        );

      const months =
        years*12;

      const r =
        annual/400;

      const maturity =
        P*(
          (
            Math.pow(
              1+r,
              months
            )-1
          )/r
        );

      const invested =
        P*months;

      document.getElementById(
        "rdResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Maturity Amount
          </div>

          <div class="main-value">
            ${money(maturity)}
          </div>

          <p>
            Interest:
            ${money(maturity-invested)}
          </p>

        </div>
      `;
    };
  }


  /* =====================================================
     SIMPLE INTEREST
     ===================================================== */

  function loadSimpleInterest() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Principal (₹)</label>
          <input id="siP" type="number" value="100000">
        </div>

        <div class="form-group">
          <label>Rate (% p.a.)</label>
          <input id="siR" type="number" value="8">
        </div>

        <div class="form-group">
          <label>Time (Years)</label>
          <input id="siT" type="number" value="5">
        </div>

        <button
          id="siBtn"
          class="primary-button"
        >
          Calculate
        </button>

        <div id="siResult"></div>

      </div>
    `;

    document.getElementById(
      "siBtn"
    ).onclick = ()=>{

      const P =
        Number(
          document.getElementById("siP").value
        );

      const R =
        Number(
          document.getElementById("siR").value
        );

      const T =
        Number(
          document.getElementById("siT").value
        );

      const interest =
        P*R*T/100;

      document.getElementById(
        "siResult"
      ).innerHTML = `

        <div class="result-box">

          <div class="result-grid">

            <div class="result-item">
              <span>Interest</span>
              <strong>${money(interest)}</strong>
            </div>

            <div class="result-item">
              <span>Total Amount</span>
              <strong>${money(P+interest)}</strong>
            </div>

          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     COMPOUND INTEREST
     ===================================================== */

  function loadCompoundInterest() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Principal (₹)</label>
          <input id="ciP" type="number" value="100000">
        </div>

        <div class="form-group">
          <label>Rate (% p.a.)</label>
          <input id="ciR" type="number" value="8">
        </div>

        <div class="form-group">
          <label>Time (Years)</label>
          <input id="ciT" type="number" value="5">
        </div>

        <div class="form-group">
          <label>Compounds / Year</label>
          <input id="ciN" type="number" value="4">
        </div>

        <button
          id="ciBtn"
          class="primary-button"
        >
          Calculate
        </button>

        <div id="ciResult"></div>

      </div>
    `;

    document.getElementById(
      "ciBtn"
    ).onclick = ()=>{

      const P =
        Number(
          document.getElementById("ciP").value
        );

      const R =
        Number(
          document.getElementById("ciR").value
        )/100;

      const T =
        Number(
          document.getElementById("ciT").value
        );

      const N =
        Number(
          document.getElementById("ciN").value
        );

      const amount =
        P*Math.pow(
          1+R/N,
          N*T
        );

      document.getElementById(
        "ciResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Final Amount
          </div>

          <div class="main-value">
            ${money(amount)}
          </div>

          <p>
            Compound Interest:
            ${money(amount-P)}
          </p>

        </div>
      `;
    };
  }


  /* =====================================================
     DISCOUNT
     ===================================================== */

  function loadDiscount() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Original Price (₹)</label>
          <input id="discountPrice" type="number" value="1000">
        </div>

        <div class="form-group">
          <label>Discount (%)</label>
          <input id="discountRate" type="number" value="10">
        </div>

        <button
          id="discountBtn"
          class="primary-button"
        >
          Calculate Discount
        </button>

        <div id="discountResult"></div>

      </div>
    `;

    document.getElementById(
      "discountBtn"
    ).onclick = ()=>{

      const price =
        Number(
          document.getElementById("discountPrice").value
        );

      const rate =
        Number(
          document.getElementById("discountRate").value
        );

      const discount =
        price*rate/100;

      document.getElementById(
        "discountResult"
      ).innerHTML = `

        <div class="result-box">

          <div class="result-grid">

            <div class="result-item">
              <span>Discount</span>
              <strong>${money(discount)}</strong>
            </div>

            <div class="result-item">
              <span>Final Price</span>
              <strong>${money(price-discount)}</strong>
            </div>

          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     PROFIT & LOSS
     ===================================================== */

  function loadProfitLoss() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Cost Price (₹)</label>
          <input id="plCost" type="number" value="1000">
        </div>

        <div class="form-group">
          <label>Selling Price (₹)</label>
          <input id="plSell" type="number" value="1200">
        </div>

        <button
          id="plBtn"
          class="primary-button"
        >
          Calculate
        </button>

        <div id="plResult"></div>

      </div>
    `;

    document.getElementById(
      "plBtn"
    ).onclick = ()=>{

      const cost =
        Number(
          document.getElementById("plCost").value
        );

      const sell =
        Number(
          document.getElementById("plSell").value
        );

      const difference =
        sell-cost;

      const percent =
        cost
          ? Math.abs(difference)/cost*100
          : 0;

      const type =
        difference >= 0
          ? "Profit"
          : "Loss";

      document.getElementById(
        "plResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            ${type}
          </div>

          <div class="main-value">
            ${money(Math.abs(difference))}
          </div>

          <p>
            ${percent.toFixed(2)}%
          </p>

        </div>
      `;
    };
  }


  /* =====================================================
     AGE
     ===================================================== */

  function loadAge() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            Date of Birth
          </label>

          <input
            id="ageDOB"
            type="date"
          >

        </div>

        <button
          id="ageBtn"
          class="primary-button"
        >
          Calculate Age
        </button>

        <div id="ageResult"></div>

      </div>
    `;

    const dob =
      document.getElementById("ageDOB");

    dob.max =
      new Date()
        .toISOString()
        .split("T")[0];

    document.getElementById(
      "ageBtn"
    ).onclick = ()=>{

      if(!dob.value){

        alert("Please select date of birth.");
        return;
      }

      const birth =
        new Date(
          dob.value+"T00:00:00"
        );

      const now =
        new Date();

      if(birth>now){

        alert(
          "Date of birth cannot be in the future."
        );

        return;
      }

      let years =
        now.getFullYear() -
        birth.getFullYear();

      let months =
        now.getMonth() -
        birth.getMonth();

      let days =
        now.getDate() -
        birth.getDate();

      if(days<0){

        months--;

        const prev =
          new Date(
            now.getFullYear(),
            now.getMonth(),
            0
          );

        days +=
          prev.getDate();
      }

      if(months<0){

        years--;
        months+=12;
      }

      document.getElementById(
        "ageResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Exact Age
          </div>

          <div class="main-value">
            ${years} Years
          </div>

          <p>
            ${months} Months
            ${days} Days
          </p>

        </div>
      `;
    };
  }


  /* =====================================================
     CGPA → PERCENTAGE
     ===================================================== */

  function loadCGPA() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            CGPA
          </label>

          <input
            id="cgpaValue"
            type="number"
            step="0.01"
            min="0"
            max="10"
            value="8"
          >

        </div>

        <button
          id="cgpaBtn"
          class="primary-button"
        >
          Convert
        </button>

        <div id="cgpaResult"></div>

      </div>
    `;

    document.getElementById(
      "cgpaBtn"
    ).onclick = ()=>{

      const cgpa =
        Number(
          document.getElementById("cgpaValue").value
        );

      const percentage =
        cgpa*9.5;

      document.getElementById(
        "cgpaResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Percentage
          </div>

          <div class="main-value">
            ${percentage.toFixed(2)}%
          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     GPA CALCULATOR
     ===================================================== */

  function loadGPA() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            Enter GPA values separated by comma
          </label>

          <input
            id="gpaValues"
            placeholder="8, 7.5, 9, 8.5"
          >

        </div>

        <button
          id="gpaBtn"
          class="primary-button"
        >
          Calculate GPA
        </button>

        <div id="gpaResult"></div>

      </div>
    `;

    document.getElementById(
      "gpaBtn"
    ).onclick = ()=>{

      const values =
        document.getElementById(
          "gpaValues"
        ).value
        .split(",")
        .map(Number)
        .filter(Number.isFinite);

      if(!values.length){

        alert("Please enter GPA values.");
        return;
      }

      const avg =
        values.reduce(
          (a,b)=>a+b,
          0
        )/values.length;

      document.getElementById(
        "gpaResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Average GPA
          </div>

          <div class="main-value">
            ${avg.toFixed(2)}
          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     MARKS REQUIRED
     ===================================================== */

  function loadMarksRequired() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Total Marks</label>
          <input id="marksTotal" type="number" value="500">
        </div>

        <div class="form-group">
          <label>Target Percentage (%)</label>
          <input id="marksTarget" type="number" value="75">
        </div>

        <div class="form-group">
          <label>Marks Already Obtained</label>
          <input id="marksObtained" type="number" value="300">
        </div>

        <button
          id="marksBtn"
          class="primary-button"
        >
          Calculate
        </button>

        <div id="marksResult"></div>

      </div>
    `;

    document.getElementById(
      "marksBtn"
    ).onclick = ()=>{

      const total =
        Number(
          document.getElementById("marksTotal").value
        );

      const target =
        Number(
          document.getElementById("marksTarget").value
        );

      const obtained =
        Number(
          document.getElementById("marksObtained").value
        );

      const required =
        total*target/100-obtained;

      document.getElementById(
        "marksResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Marks Required
          </div>

          <div class="main-value">
            ${formatNumber(Math.max(0,required))}
          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     GRADE CALCULATOR
     ===================================================== */

  function loadGrade() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Marks (%)</label>
          <input
            id="gradeMarks"
            type="number"
            value="75"
            min="0"
            max="100"
          >
        </div>

        <button
          id="gradeBtn"
          class="primary-button"
        >
          Calculate Grade
        </button>

        <div id="gradeResult"></div>

      </div>
    `;

    document.getElementById(
      "gradeBtn"
    ).onclick = ()=>{

      const m =
        Number(
          document.getElementById("gradeMarks").value
        );

      let grade;

      if(m>=90) grade="A+";
      else if(m>=80) grade="A";
      else if(m>=70) grade="B+";
      else if(m>=60) grade="B";
      else if(m>=50) grade="C";
      else if(m>=40) grade="D";
      else grade="F";

      document.getElementById(
        "gradeResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Grade
          </div>

          <div class="main-value">
            ${grade}
          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     STUDY TIME
     ===================================================== */

  function loadStudyTime() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Total Study Hours</label>
          <input id="studyHours" type="number" value="6">
        </div>

        <div class="form-group">
          <label>Number of Subjects</label>
          <input id="studySubjects" type="number" value="3">
        </div>

        <button
          id="studyBtn"
          class="primary-button"
        >
          Calculate
        </button>

        <div id="studyResult"></div>

      </div>
    `;

    document.getElementById(
      "studyBtn"
    ).onclick = ()=>{

      const hours =
        Number(
          document.getElementById("studyHours").value
        );

      const subjects =
        Number(
          document.getElementById("studySubjects").value
        );

      const each =
        subjects>0
          ? hours/subjects
          : 0;

      document.getElementById(
        "studyResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Suggested Time / Subject
          </div>

          <div class="main-value">
            ${each.toFixed(2)} Hours
          </div>

        </div>
      `;
    };
  }


  /* =====================================================
     MOCK TEST
     ===================================================== */

  function loadMockTest() {

    const questions = [

      {
        q:"HTML का पूरा नाम क्या है?",
        options:[
          "Hyper Text Markup Language",
          "High Text Machine Language",
          "Hyperlink Text Management Language",
          "Home Tool Markup Language"
        ],
        answer:0
      },

      {
        q:"CSS किसके लिए इस्तेमाल होती है?",
        options:[
          "Database",
          "Web page styling",
          "Server hosting",
          "Email"
        ],
        answer:1
      },

      {
        q:"JavaScript मुख्य रूप से किसके लिए उपयोग होती है?",
        options:[
          "Web interactivity",
          "Image printing",
          "Operating system",
          "Hardware repair"
        ],
        answer:0
      },

      {
        q:"PDF का पूरा नाम क्या है?",
        options:[
          "Portable Document Format",
          "Public Data File",
          "Print Document File",
          "Personal Document Format"
        ],
        answer:0
      },

      {
        q:"भारत की currency क्या है?",
        options:[
          "Dollar",
          "Pound",
          "Rupee",
          "Euro"
        ],
        answer:2
      }

    ];

    let html = `

      <div class="tool-form">

        <h3>
          Quick Digital Skills Mock Test
        </h3>

        <p>
          सभी questions का answer select करें।
        </p>
    `;

    questions.forEach((item,index)=>{

      html += `

        <div class="form-group">

          <strong>
            ${index+1}. ${item.q}
          </strong>

          <div style="margin-top:10px">

      `;

      item.options.forEach((option,i)=>{

        html += `

          <label class="check-row">

            <input
              type="radio"
              name="q${index}"
              value="${i}"
            >

            ${escapeHTML(option)}

          </label>

        `;
      });

      html += `
          </div>
        </div>
      `;
    });

    html += `

        <button
          id="mockSubmit"
          class="primary-button"
        >
          Submit Test
        </button>

        <div id="mockResult"></div>

      </div>
    `;

    toolContent.innerHTML = html;

    document.getElementById(
      "mockSubmit"
    ).onclick = ()=>{

      let score = 0;

      questions.forEach((q,index)=>{

        const selected =
          document.querySelector(
            `input[name="q${index}"]:checked`
          );

        if(
          selected &&
          Number(selected.value)===q.answer
        ){

          score++;
        }
      });

      const percent =
        score/questions.length*100;

      document.getElementById(
        "mockResult"
      ).innerHTML = `

        <div class="calculator-result">

          <div class="result-label">
            Your Score
          </div>

          <div class="main-value">
            ${score}/${questions.length}
          </div>

          <p>
            ${percent.toFixed(0)}%
          </p>

        </div>
      `;
    };
  }


  /* =====================================================
     QR GENERATOR
     ===================================================== */

  function loadQR() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            Text or URL
          </label>

          <textarea
            id="qrText"
            placeholder="https://example.com"
          ></textarea>

        </div>

        <button
          id="qrBtn"
          class="primary-button"
        >
          Generate QR
        </button>

        <div id="qrResult"></div>

      </div>
    `;

    document.getElementById(
      "qrBtn"
    ).onclick = ()=>{

      const text =
        document.getElementById(
          "qrText"
        ).value
        .trim();

      if(!text){

        alert("Please enter text or URL.");
        return;
      }

      const url =
        "https://api.qrserver.com/v1/create-qr-code/?" +
        "size=500x500&data=" +
        encodeURIComponent(text);

      document.getElementById(
        "qrResult"
      ).innerHTML = `

        <div class="result-box">

          <img
            src="${url}"
            alt="QR Code"
            style="max-width:300px;width:100%"
          >

          <br><br>

          <a
            href="${url}"
            target="_blank"
            rel="noopener"
            class="download-button"
          >
            Open QR Image
          </a>

        </div>
      `;
    };
  }


  /* =====================================================
     WORD COUNTER
     ===================================================== */

  function loadWordCounter() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <textarea
          id="wordText"
          placeholder="Type or paste text..."
        ></textarea>

        <div
          id="wordResult"
          class="result-box"
        >
          Words: 0<br>
          Characters: 0
        </div>

      </div>
    `;

    document.getElementById(
      "wordText"
    ).addEventListener("input",e=>{

      const text =
        e.target.value;

      const words =
        text.trim()
          ? text.trim().split(/\s+/).length
          : 0;

      document.getElementById(
        "wordResult"
      ).innerHTML = `

        <strong>
          Words:
        </strong>
        ${words}

        <br>

        <strong>
          Characters:
        </strong>
        ${text.length}

        <br>

        <strong>
          Characters without spaces:
        </strong>
        ${text.replace(/\s/g,"").length}

      `;
    });
  }


  /* =====================================================
     CASE CONVERTER
     ===================================================== */

  function loadCaseConverter() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <textarea
          id="caseText"
          placeholder="Type or paste text..."
        ></textarea>

        <div class="form-row">

          <button
            id="upper"
            class="primary-button"
          >
            UPPERCASE
          </button>

          <button
            id="lower"
            class="primary-button"
          >
            lowercase
          </button>

        </div>

        <div class="form-row">

          <button
            id="title"
            class="primary-button"
          >
            Title Case
          </button>

          <button
            id="sentence"
            class="primary-button"
          >
            Sentence Case
          </button>

        </div>

      </div>
    `;

    const text =
      document.getElementById("caseText");

    document.getElementById(
      "upper"
    ).onclick =
      () => text.value =
        text.value.toUpperCase();

    document.getElementById(
      "lower"
    ).onclick =
      () => text.value =
        text.value.toLowerCase();

    document.getElementById(
      "title"
    ).onclick =
      () => text.value =
        text.value
          .toLowerCase()
          .replace(
            /\b\w/g,
            x => x.toUpperCase()
          );

    document.getElementById(
      "sentence"
    ).onclick =
      () => text.value =
        text.value
          .toLowerCase()
          .replace(
            /(^\s*\w|[.!?]\s*\w)/g,
            x => x.toUpperCase()
          );
  }


  /* =====================================================
     INVOICE
     ===================================================== */

  function loadInvoice() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">
          <label>Business Name</label>
          <input id="invBusiness" placeholder="Your Business">
        </div>

        <div class="form-group">
          <label>Customer Name</label>
          <input id="invCustomer" placeholder="Customer">
        </div>

        <div class="form-group">
          <label>Item / Service</label>
          <input id="invItem" placeholder="Service">
        </div>

        <div class="form-group">
          <label>Amount (₹)</label>
          <input id="invAmount" type="number" value="1000">
        </div>

        <button
          id="invoiceBtn"
          class="primary-button"
        >
          Generate Invoice
        </button>

        <div id="invoiceResult"></div>

      </div>
    `;

    document.getElementById(
      "invoiceBtn"
    ).onclick = ()=>{

      const business =
        document.getElementById(
          "invBusiness"
        ).value || "Your Business";

      const customer =
        document.getElementById(
          "invCustomer"
        ).value || "Customer";

      const item =
        document.getElementById(
          "invItem"
        ).value || "Service";

      const amount =
        Number(
          document.getElementById(
            "invAmount"
          ).value
        ) || 0;

      document.getElementById(
        "invoiceResult"
      ).innerHTML = `

        <div class="invoice-preview">

          <h2>INVOICE</h2>

          <p>
            <strong>
              ${escapeHTML(business)}
            </strong>
          </p>

          <p>
            Bill To:
            ${escapeHTML(customer)}
          </p>

          <hr>

          <p>
            ${escapeHTML(item)}
          </p>

          <h3>
            Total: ${money(amount)}
          </h3>

          <button
            id="printInvoice"
            class="primary-button"
          >
            🖨️ Print / Save PDF
          </button>

        </div>
      `;

      document.getElementById(
        "printInvoice"
      ).onclick = ()=>{

        const content =
          document.querySelector(
            ".invoice-preview"
          ).innerHTML;

        const win =
          window.open("","_blank");

        if(!win){

          alert("Please allow pop-ups.");
          return;
        }

        win.document.write(`

          <html>

          <head>

            <title>Invoice</title>

            <style>

              body {
                font-family:Arial;
                padding:30px;
              }

              button {
                display:none;
              }

            </style>

          </head>

          <body>

            ${content}

          </body>

          </html>
        `);

        win.document.close();

        setTimeout(()=>{
          win.print();
        },300);
      };
    };
  }


  /* =====================================================
     SERVICE WORKER
     ===================================================== */

  if("serviceWorker" in navigator){

    // Registered by index.html.
    // Keeping this file free from duplicate registration.
  }


  /* =====================================================
     READY
     ===================================================== */

  console.log(
    "Manjeet Digital Hub v3.0 loaded successfully."
  );

});
