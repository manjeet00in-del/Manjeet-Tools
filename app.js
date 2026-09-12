/* =========================================================
   MANJEET TOOLS - APP.JS
   Browser based tools - No backend/API required
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     BASIC ELEMENTS
  ======================================================= */

  const modal = document.getElementById("toolModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalIcon = document.getElementById("modalIcon");
  const toolContent = document.getElementById("toolContent");
  const closeTool = document.getElementById("closeTool");
  const modalOverlay = document.querySelector(".modal-overlay");
  const searchInput = document.getElementById("toolSearch");
  const noResults = document.getElementById("noResults");
  const year = document.getElementById("year");

  if (year) {
    year.textContent = new Date().getFullYear();
  }


  /* =======================================================
     TOOL DATA
  ======================================================= */

  const toolData = {

    compressor: {
      title: "Image Compressor",
      icon: "🗜️"
    },

    resize: {
      title: "Image Resizer",
      icon: "📐"
    },

    crop: {
      title: "Image Cropper",
      icon: "✂️"
    },

    convert: {
      title: "Image Converter",
      icon: "🔄"
    },

    "photo-size": {
      title: "Photo Size Reducer",
      icon: "📦"
    },

    social: {
      title: "Social Media Resizer",
      icon: "📱"
    },

    "image-pdf": {
      title: "Images to PDF",
      icon: "📑"
    },

    qr: {
      title: "QR Code Generator",
      icon: "🔳"
    },

    "word-counter": {
      title: "Word Counter",
      icon: "🔢"
    },

    case: {
      title: "Case Converter",
      icon: "🔤"
    },

    invoice: {
      title: "Invoice Generator",
      icon: "🧾"
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

    age: {
      title: "Age Calculator",
      icon: "🎂"
    }

  };


  /* =======================================================
     OPEN TOOL
  ======================================================= */

  document.querySelectorAll(".tool-card").forEach(card => {

    card.addEventListener("click", () => {

      const tool = card.dataset.tool;

      openTool(tool);

    });

  });


  function openTool(tool) {

    const data = toolData[tool];

    if (!data) return;

    modalTitle.textContent = data.title;
    modalIcon.textContent = data.icon;

    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    loadTool(tool);

  }


  /* =======================================================
     CLOSE TOOL
  ======================================================= */

  function closeModal() {

    modal.classList.remove("active");

    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

    toolContent.innerHTML = "";

  }


  closeTool.addEventListener("click", closeModal);

  modalOverlay.addEventListener("click", closeModal);


  document.addEventListener("keydown", e => {

    if (e.key === "Escape") {
      closeModal();
    }

  });


  /* =======================================================
     LOAD TOOL
  ======================================================= */

  function loadTool(tool) {

    switch (tool) {

      case "compressor":
        imageCompressor();
        break;

      case "resize":
        imageResizer();
        break;

      case "crop":
        imageCropper();
        break;

      case "convert":
        imageConverter();
        break;

      case "photo-size":
        photoSizeReducer();
        break;

      case "social":
        socialResizer();
        break;

      case "image-pdf":
        imageToPDF();
        break;

      case "qr":
        qrGenerator();
        break;

      case "word-counter":
        wordCounter();
        break;

      case "case":
        caseConverter();
        break;

      case "invoice":
        invoiceGenerator();
        break;

      case "emi":
        emiCalculator();
        break;

      case "gst":
        gstCalculator();
        break;

      case "percentage":
        percentageCalculator();
        break;

      case "age":
        ageCalculator();
        break;

    }

  }


  /* =======================================================
     COMMON FILE READER
  ======================================================= */

  function readImage(file, callback) {

    if (!file) return;

    if (!file.type.startsWith("image/")) {

      alert("Please select a valid image.");

      return;
    }

    const reader = new FileReader();

    reader.onload = function(e) {

      const img = new Image();

      img.onload = function() {

        callback(img, e.target.result);

      };

      img.src = e.target.result;

    };

    reader.readAsDataURL(file);

  }


  /* =======================================================
     DOWNLOAD HELPER
  ======================================================= */

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


  function canvasToBlob(canvas, type, quality = 0.9) {

    return new Promise(resolve => {

      canvas.toBlob(
        blob => resolve(blob),
        type,
        quality
      );

    });

  }


  /* =======================================================
     1. IMAGE COMPRESSOR
  ======================================================= */

  function imageCompressor() {

    toolContent.innerHTML = `

      <div class="file-drop" id="compressDrop">

        <div class="file-drop-icon">🗜️</div>

        <h3>Select Image</h3>

        <p>JPG, PNG or WebP</p>

        <input
          type="file"
          id="compressFile"
          accept="image/*"
          hidden
        >

      </div>

      <div style="margin-top:20px">

        <label>
          Compression Quality:
          <strong id="qualityValue">80%</strong>
        </label>

        <input
          type="range"
          id="quality"
          min="10"
          max="100"
          value="80"
          style="margin-top:10px"
        >

      </div>

      <div
        id="compressResult"
        style="margin-top:20px"
      ></div>

    `;


    const drop = document.getElementById("compressDrop");
    const input = document.getElementById("compressFile");
    const quality = document.getElementById("quality");
    const qualityValue = document.getElementById("qualityValue");

    drop.onclick = () => input.click();

    quality.oninput = () => {

      qualityValue.textContent =
        quality.value + "%";

    };


    input.onchange = () => {

      const file = input.files[0];

      if (!file) return;

      readImage(file, async (img) => {

        const canvas = document.createElement("canvas");

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");

        ctx.drawImage(img, 0, 0);

        const blob = await canvasToBlob(
          canvas,
          "image/jpeg",
          Number(quality.value) / 100
        );

        const oldKB =
          (file.size / 1024).toFixed(1);

        const newKB =
          (blob.size / 1024).toFixed(1);

        const result =
          document.getElementById("compressResult");

        result.innerHTML = `

          <div class="result-box">

            <h3>Compression Complete</h3>

            <p>
              Original:
              <strong>${oldKB} KB</strong>
            </p>

            <p>
              New:
              <strong>${newKB} KB</strong>
            </p>

            <br>

            <button
              class="primary-btn"
              id="downloadCompressed"
            >
              ⬇️ Download Compressed Image
            </button>

          </div>

        `;

        document
          .getElementById("downloadCompressed")
          .onclick = () => {

            downloadBlob(
              blob,
              "compressed-image.jpg"
            );

          };

      });

    };

  }


  /* =======================================================
     2. IMAGE RESIZER
  ======================================================= */

  function imageResizer() {

    toolContent.innerHTML = `

      <div class="file-drop" id="resizeDrop">

        <div class="file-drop-icon">📐</div>

        <h3>Select Image</h3>

        <p>Choose an image to resize</p>

        <input
          type="file"
          id="resizeFile"
          accept="image/*"
          hidden
        >

      </div>

      <div id="resizeForm"></div>

    `;


    const drop = document.getElementById("resizeDrop");
    const input = document.getElementById("resizeFile");

    drop.onclick = () => input.click();


    input.onchange = () => {

      const file = input.files[0];

      if (!file) return;

      readImage(file, img => {

        document.getElementById("resizeForm").innerHTML = `

          <div class="form-grid" style="margin-top:20px">

            <div class="form-group">

              <label>Width (px)</label>

              <input
                type="number"
                id="resizeWidth"
                value="${img.width}"
              >

            </div>

            <div class="form-group">

              <label>Height (px)</label>

              <input
                type="number"
                id="resizeHeight"
                value="${img.height}"
              >

            </div>

          </div>

          <div style="margin-top:20px">

            <label>
              <input
                type="checkbox"
                id="keepRatio"
                checked
              >
              Keep aspect ratio
            </label>

          </div>

          <div style="margin-top:20px">

            <button
              class="primary-btn"
              id="resizeBtn"
            >
              Resize & Download
            </button>

          </div>

          <div
            class="image-preview"
            id="resizePreview"
          ></div>

        `;


        const width =
          document.getElementById("resizeWidth");

        const height =
          document.getElementById("resizeHeight");

        width.addEventListener("input", () => {

          if (
            document.getElementById("keepRatio").checked
          ) {

            height.value =
              Math.round(
                width.value *
                img.height /
                img.width
              );

          }

        });


        document.getElementById("resizeBtn").onclick =
          async () => {

            const canvas =
              document.createElement("canvas");

            canvas.width =
              Number(width.value);

            canvas.height =
              Number(height.value);

            const ctx =
              canvas.getContext("2d");

            ctx.drawImage(
              img,
              0,
              0,
              canvas.width,
              canvas.height
            );

            const blob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                0.92
              );

            document.getElementById(
              "resizePreview"
            ).innerHTML = `

              <img src="${URL.createObjectURL(blob)}">

              <br><br>

              <button
                class="primary-btn"
                id="downloadResize"
              >
                ⬇️ Download
              </button>

            `;

            document.getElementById(
              "downloadResize"
            ).onclick = () => {

              downloadBlob(
                blob,
                "resized-image.jpg"
              );

            };

          };

      });

    };

  }


  /* =======================================================
     3. IMAGE CROPPER
  ======================================================= */

  function imageCropper() {

    toolContent.innerHTML = `

      <div class="file-drop" id="cropDrop">

        <div class="file-drop-icon">✂️</div>

        <h3>Select Image</h3>

        <p>Choose an image to crop</p>

        <input
          type="file"
          id="cropFile"
          accept="image/*"
          hidden
        >

      </div>

      <div id="cropArea"></div>

    `;


    const drop =
      document.getElementById("cropDrop");

    const input =
      document.getElementById("cropFile");

    drop.onclick = () => input.click();


    input.onchange = () => {

      const file = input.files[0];

      if (!file) return;

      readImage(file, img => {

        document.getElementById("cropArea").innerHTML = `

          <div class="form-grid" style="margin-top:20px">

            <div class="form-group">

              <label>Crop X</label>

              <input
                type="number"
                id="cropX"
                value="0"
              >

            </div>

            <div class="form-group">

              <label>Crop Y</label>

              <input
                type="number"
                id="cropY"
                value="0"
              >

            </div>

            <div class="form-group">

              <label>Crop Width</label>

              <input
                type="number"
                id="cropWidth"
                value="${Math.round(img.width * 0.8)}"
              >

            </div>

            <div class="form-group">

              <label>Crop Height</label>

              <input
                type="number"
                id="cropHeight"
                value="${Math.round(img.height * 0.8)}"
              >

            </div>

          </div>

          <div style="margin-top:20px">

            <button
              class="primary-btn"
              id="cropBtn"
            >
              ✂️ Crop & Download
            </button>

          </div>

          <div
            class="image-preview"
            id="cropPreview"
          ></div>

        `;


        document.getElementById("cropBtn").onclick =
          async () => {

            const x =
              Number(document.getElementById("cropX").value);

            const y =
              Number(document.getElementById("cropY").value);

            const w =
              Number(document.getElementById("cropWidth").value);

            const h =
              Number(document.getElementById("cropHeight").value);

            const canvas =
              document.createElement("canvas");

            canvas.width = w;
            canvas.height = h;

            const ctx =
              canvas.getContext("2d");

            ctx.drawImage(
              img,
              x,
              y,
              w,
              h,
              0,
              0,
              w,
              h
            );

            const blob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                0.92
              );

            document.getElementById(
              "cropPreview"
            ).innerHTML = `

              <img src="${URL.createObjectURL(blob)}">

              <br><br>

              <button
                class="primary-btn"
                id="downloadCrop"
              >
                ⬇️ Download Cropped Image
              </button>

            `;

            document.getElementById(
              "downloadCrop"
            ).onclick = () => {

              downloadBlob(
                blob,
                "cropped-image.jpg"
              );

            };

          };

      });

    };

  }


  /* =======================================================
     4. IMAGE CONVERTER
  ======================================================= */

  function imageConverter() {

    toolContent.innerHTML = `

      <div class="file-drop" id="convertDrop">

        <div class="file-drop-icon">🔄</div>

        <h3>Select Image</h3>

        <p>Convert JPG, PNG or WebP</p>

        <input
          type="file"
          id="convertFile"
          accept="image/*"
          hidden
        >

      </div>

      <div id="convertArea"></div>

    `;


    const drop =
      document.getElementById("convertDrop");

    const input =
      document.getElementById("convertFile");

    drop.onclick = () => input.click();


    input.onchange = () => {

      const file = input.files[0];

      if (!file) return;

      readImage(file, img => {

        document.getElementById(
          "convertArea"
        ).innerHTML = `

          <div class="form-group" style="margin-top:20px">

            <label>Convert To</label>

            <select id="convertType">

              <option value="image/jpeg">
                JPG
              </option>

              <option value="image/png">
                PNG
              </option>

              <option value="image/webp">
                WebP
              </option>

            </select>

          </div>

          <div style="margin-top:20px">

            <button
              class="primary-btn"
              id="convertBtn"
            >
              🔄 Convert & Download
            </button>

          </div>

        `;


        document.getElementById("convertBtn").onclick =
          async () => {

            const type =
              document.getElementById(
                "convertType"
              ).value;

            const canvas =
              document.createElement("canvas");

            canvas.width = img.width;
            canvas.height = img.height;

            canvas
              .getContext("2d")
              .drawImage(img, 0, 0);

            const blob =
              await canvasToBlob(
                canvas,
                type,
                0.92
              );

            let extension = "jpg";

            if (type === "image/png") {
              extension = "png";
            }

            if (type === "image/webp") {
              extension = "webp";
            }

            downloadBlob(
              blob,
              `converted-image.${extension}`
            );

          };

      });

    };

  }


  /* =======================================================
     5. PHOTO SIZE REDUCER
  ======================================================= */

  function photoSizeReducer() {

    toolContent.innerHTML = `

      <div class="file-drop" id="smallDrop">

        <div class="file-drop-icon">📦</div>

        <h3>Select Photo</h3>

        <p>Reduce photo to a target size</p>

        <input
          type="file"
          id="smallFile"
          accept="image/*"
          hidden
        >

      </div>

      <div id="smallArea"></div>

    `;


    const drop =
      document.getElementById("smallDrop");

    const input =
      document.getElementById("smallFile");

    drop.onclick = () => input.click();


    input.onchange = () => {

      const file = input.files[0];

      if (!file) return;

      readImage(file, img => {

        document.getElementById(
          "smallArea"
        ).innerHTML = `

          <div class="form-group" style="margin-top:20px">

            <label>
              Target size (KB)
            </label>

            <input
              type="number"
              id="targetKB"
              value="100"
              min="5"
            >

          </div>

          <div style="margin-top:20px">

            <button
              class="primary-btn"
              id="reduceBtn"
            >
              📦 Reduce Photo Size
            </button>

          </div>

          <div id="smallResult"></div>

        `;


        document.getElementById(
          "reduceBtn"
        ).onclick = async () => {

          const target =
            Number(
              document.getElementById(
                "targetKB"
              ).value
            ) * 1024;

          const canvas =
            document.createElement("canvas");

          canvas.width = img.width;
          canvas.height = img.height;

          canvas
            .getContext("2d")
            .drawImage(img, 0, 0);


          let low = 0.05;
          let high = 0.95;
          let bestBlob = null;


          for (let i = 0; i < 8; i++) {

            const quality =
              (low + high) / 2;

            const blob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                quality
              );

            bestBlob = blob;

            if (blob.size > target) {
              high = quality;
            } else {
              low = quality;
            }

          }


          document.getElementById(
            "smallResult"
          ).innerHTML = `

            <div class="result-box">

              <h3>Done</h3>

              <p>
                Original:
                ${(file.size / 1024).toFixed(1)} KB
              </p>

              <p>
                New:
                ${(bestBlob.size / 1024).toFixed(1)} KB
              </p>

              <br>

              <button
                class="primary-btn"
                id="downloadSmall"
              >
                ⬇️ Download Photo
              </button>

            </div>

          `;


          document.getElementById(
            "downloadSmall"
          ).onclick = () => {

            downloadBlob(
              bestBlob,
              "reduced-photo.jpg"
            );

          };

        };

      });

    };

  }


  /* =======================================================
     6. SOCIAL MEDIA RESIZER
  ======================================================= */

  function socialResizer() {

    toolContent.innerHTML = `

      <div class="file-drop" id="socialDrop">

        <div class="file-drop-icon">📱</div>

        <h3>Select Image</h3>

        <p>Resize for social media</p>

        <input
          type="file"
          id="socialFile"
          accept="image/*"
          hidden
        >

      </div>

      <div id="socialArea"></div>

    `;


    const drop =
      document.getElementById("socialDrop");

    const input =
      document.getElementById("socialFile");

    drop.onclick = () => input.click();


    input.onchange = () => {

      const file = input.files[0];

      if (!file) return;

      readImage(file, img => {

        document.getElementById(
          "socialArea"
        ).innerHTML = `

          <div class="form-group" style="margin-top:20px">

            <label>Choose Platform / Size</label>

            <select id="socialSize">

              <option value="1080,1080">
                Instagram Square - 1080 × 1080
              </option>

              <option value="1080,1350">
                Instagram Portrait - 1080 × 1350
              </option>

              <option value="1080,1920">
                Instagram / Facebook Story - 1080 × 1920
              </option>

              <option value="1280,720">
                YouTube Thumbnail - 1280 × 720
              </option>

              <option value="1200,630">
                Facebook Post - 1200 × 630
              </option>

            </select>

          </div>

          <div style="margin-top:20px">

            <button
              class="primary-btn"
              id="socialBtn"
            >
              📱 Resize & Download
            </button>

          </div>

        `;


        document.getElementById(
          "socialBtn"
        ).onclick = async () => {

          const values =
            document.getElementById(
              "socialSize"
            ).value
            .split(",");

          const width =
            Number(values[0]);

          const height =
            Number(values[1]);


          const canvas =
            document.createElement("canvas");

          canvas.width = width;
          canvas.height = height;

          const ctx =
            canvas.getContext("2d");


          /* Cover crop */

          const scale =
            Math.max(
              width / img.width,
              height / img.height
            );

          const newWidth =
            img.width * scale;

          const newHeight =
            img.height * scale;

          const x =
            (width - newWidth) / 2;

          const y =
            (height - newHeight) / 2;


          ctx.drawImage(
            img,
            x,
            y,
            newWidth,
            newHeight
          );


          const blob =
            await canvasToBlob(
              canvas,
              "image/jpeg",
              0.92
            );


          downloadBlob(
            blob,
            "social-media-image.jpg"
          );

        };

      });

    };

  }


  /* =======================================================
     7. IMAGE TO PDF
  ======================================================= */

  function imageToPDF() {

    toolContent.innerHTML = `

      <div class="file-drop" id="pdfDrop">

        <div class="file-drop-icon">📑</div>

        <h3>Select Images</h3>

        <p>
          Select one or multiple images
        </p>

        <input
          type="file"
          id="pdfFiles"
          accept="image/*"
          multiple
          hidden
        >

      </div>

      <div id="pdfArea"></div>

    `;


    const drop =
      document.getElementById("pdfDrop");

    const input =
      document.getElementById("pdfFiles");

    drop.onclick = () => input.click();


    input.onchange = () => {

      const files =
        Array.from(input.files);

      if (!files.length) return;


      document.getElementById(
        "pdfArea"
      ).innerHTML = `

        <div class="result-box">

          <h3>
            ${files.length} image(s) selected
          </h3>

          <p>
            Browser print dialog will be used
            to save the images as PDF.
          </p>

          <br>

          <button
            class="primary-btn"
            id="makePDF"
          >
            📄 Create PDF
          </button>

        </div>

      `;


      document.getElementById(
        "makePDF"
      ).onclick = async () => {

        let images = "";


        for (const file of files) {

          const data =
            await fileToDataURL(file);

          images += `

            <div
              style="
                page-break-after:always;
                text-align:center;
              "
            >

              <img
                src="${data}"
                style="
                  max-width:100%;
                  max-height:95vh;
                "
              >

            </div>

          `;

        }


        const printWindow =
          window.open("", "_blank");


        printWindow.document.write(`

          <!DOCTYPE html>

          <html>

          <head>

            <title>Manjeet Tools PDF</title>

            <style>

              body {
                margin: 0;
                padding: 10px;
              }

              @media print {
                body {
                  padding: 0;
                }
              }

            </style>

          </head>

          <body>

            ${images}

          </body>

          </html>

        `);


        printWindow.document.close();

        setTimeout(() => {

          printWindow.focus();

          printWindow.print();

        }, 700);

      };

    };

  }


  function fileToDataURL(file) {

    return new Promise(resolve => {

      const reader = new FileReader();

      reader.onload = e => {
        resolve(e.target.result);
      };

      reader.readAsDataURL(file);

    });

  }


  /* =======================================================
     8. QR GENERATOR
  ======================================================= */

  function qrGenerator() {

    toolContent.innerHTML = `

      <div class="form-group">

        <label>
          Enter text or website URL
        </label>

        <textarea
          id="qrText"
          placeholder="https://example.com"
        ></textarea>

      </div>

      <div style="margin-top:20px">

        <button
          class="primary-btn"
          id="qrBtn"
        >
          🔳 Generate QR
        </button>

      </div>

      <div
        id="qrResult"
        class="image-preview"
      ></div>

    `;


    document.getElementById("qrBtn").onclick = () => {

      const text =
        document.getElementById(
          "qrText"
        ).value.trim();


      if (!text) {

        alert("Please enter text or URL.");

        return;

      }


      const qrURL =
        "https://api.qrserver.com/v1/create-qr-code/?" +
        "size=500x500&data=" +
        encodeURIComponent(text);


      document.getElementById(
        "qrResult"
      ).innerHTML = `

        <img
          id="qrImage"
          src="${qrURL}"
          alt="QR Code"
          style="width:300px;height:300px"
        >

        <br><br>

        <a
          class="primary-btn"
          href="${qrURL}"
          download="qr-code.png"
          target="_blank"
          style="
            display:inline-block;
            text-decoration:none;
          "
        >
          ⬇️ Download QR
        </a>

      `;

    };

  }


  /* =======================================================
     9. WORD COUNTER
  ======================================================= */

  function wordCounter() {

    toolContent.innerHTML = `

      <div class="form-group">

        <label>Enter / Paste Text</label>

        <textarea
          id="counterText"
          placeholder="Type or paste your text here..."
          style="min-height:250px"
        ></textarea>

      </div>

      <div
        class="form-grid"
        style="margin-top:20px"
      >

        <div class="result-box">

          <h3>Words</h3>

          <div
            class="result-value"
            id="wordCount"
          >
            0
          </div>

        </div>

        <div class="result-box">

          <h3>Characters</h3>

          <div
            class="result-value"
            id="charCount"
          >
            0
          </div>

        </div>

        <div class="result-box">

          <h3>Characters Without Spaces</h3>

          <div
            class="result-value"
            id="charNoSpace"
          >
            0
          </div>

        </div>

        <div class="result-box">

          <h3>Sentences</h3>

          <div
            class="result-value"
            id="sentenceCount"
          >
            0
          </div>

        </div>

      </div>

    `;


    const textarea =
      document.getElementById(
        "counterText"
      );


    textarea.addEventListener(
      "input",
      () => {

        const text =
          textarea.value;

        const words =
          text.trim()
            ? text.trim().split(/\s+/).length
            : 0;

        const chars =
          text.length;

        const charsNoSpace =
          text.replace(/\s/g, "").length;

        const sentences =
          text.trim()
            ? text
                .split(/[.!?]+/)
                .filter(s => s.trim()).length
            : 0;


        document.getElementById(
          "wordCount"
        ).textContent = words;

        document.getElementById(
          "charCount"
        ).textContent = chars;

        document.getElementById(
          "charNoSpace"
        ).textContent = charsNoSpace;

        document.getElementById(
          "sentenceCount"
        ).textContent = sentences;

      }
    );

  }


  /* =======================================================
     10. CASE CONVERTER
  ======================================================= */

  function caseConverter() {

    toolContent.innerHTML = `

      <div class="form-group">

        <label>Enter Text</label>

        <textarea
          id="caseText"
          style="min-height:220px"
          placeholder="Enter your text..."
        ></textarea>

      </div>

      <div
        style="
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          margin-top:15px;
        "
      >

        <button
          class="primary-btn"
          id="upperCase"
        >
          UPPERCASE
        </button>

        <button
          class="secondary-btn"
          id="lowerCase"
        >
          lowercase
        </button>

        <button
          class="secondary-btn"
          id="titleCase"
        >
          Title Case
        </button>

        <button
          class="secondary-btn"
          id="sentenceCase"
        >
          Sentence case
        </button>

        <button
          class="secondary-btn"
          id="copyCase"
        >
          📋 Copy
        </button>

      </div>

    `;


    const textarea =
      document.getElementById("caseText");


    document.getElementById(
      "upperCase"
    ).onclick = () => {

      textarea.value =
        textarea.value.toUpperCase();

    };


    document.getElementById(
      "lowerCase"
    ).onclick = () => {

      textarea.value =
        textarea.value.toLowerCase();

    };


    document.getElementById(
      "titleCase"
    ).onclick = () => {

      textarea.value =
        textarea.value
          .toLowerCase()
          .replace(
            /\b\w/g,
            c => c.toUpperCase()
          );

    };


    document.getElementById(
      "sentenceCase"
    ).onclick = () => {

      textarea.value =
        textarea.value
          .toLowerCase()
          .replace(
            /(^\s*\w|[.!?]\s*\w)/g,
            c => c.toUpperCase()
          );

    };


    document.getElementById(
      "copyCase"
    ).onclick = async () => {

      await navigator.clipboard.writeText(
        textarea.value
      );

      alert("Text copied!");

    };

  }


  /* =======================================================
     11. INVOICE GENERATOR
  ======================================================= */

  function invoiceGenerator() {

    toolContent.innerHTML = `

      <div class="form-grid">

        <div class="form-group">

          <label>Business Name</label>

          <input
            id="businessName"
            placeholder="Your Business"
          >

        </div>

        <div class="form-group">

          <label>Customer Name</label>

          <input
            id="customerName"
            placeholder="Customer Name"
          >

        </div>

      </div>

      <div class="form-grid" style="margin-top:15px">

        <div class="form-group">

          <label>Item / Service</label>

          <input
            id="invoiceItem"
            placeholder="Product / Service"
          >

        </div>

        <div class="form-group">

          <label>Amount (₹)</label>

          <input
            id="invoiceAmount"
            type="number"
            placeholder="1000"
          >

        </div>

      </div>

      <div style="margin-top:20px">

        <button
          class="primary-btn"
          id="invoiceBtn"
        >
          🧾 Generate Invoice
        </button>

      </div>

      <div id="invoicePreview"></div>

    `;


    document.getElementById(
      "invoiceBtn"
    ).onclick = () => {

      const business =
        document.getElementById(
          "businessName"
        ).value || "My Business";

      const customer =
        document.getElementById(
          "customerName"
        ).value || "Customer";

      const item =
        document.getElementById(
          "invoiceItem"
        ).value || "Service";

      const amount =
        Number(
          document.getElementById(
            "invoiceAmount"
          ).value
        ) || 0;


      document.getElementById(
        "invoicePreview"
      ).innerHTML = `

        <div
          id="invoicePrint"
          style="
            margin-top:25px;
            padding:25px;
            border:1px solid #ddd;
            border-radius:12px;
            background:white;
          "
        >

          <h2>${escapeHTML(business)}</h2>

          <p>
            Invoice Date:
            ${new Date().toLocaleDateString("en-IN")}
          </p>

          <hr style="margin:15px 0">

          <p>
            <strong>Bill To:</strong>
            ${escapeHTML(customer)}
          </p>

          <br>

          <table
            style="
              width:100%;
              border-collapse:collapse;
            "
          >

            <tr>

              <th
                style="
                  text-align:left;
                  padding:10px;
                  border-bottom:1px solid #ddd;
                "
              >
                Item
              </th>

              <th
                style="
                  text-align:right;
                  padding:10px;
                  border-bottom:1px solid #ddd;
                "
              >
                Amount
              </th>

            </tr>

            <tr>

              <td style="padding:10px">
                ${escapeHTML(item)}
              </td>

              <td
                style="
                  padding:10px;
                  text-align:right;
                "
              >
                ₹${amount.toFixed(2)}
              </td>

            </tr>

          </table>

          <hr style="margin:15px 0">

          <h3 style="text-align:right">
            Total: ₹${amount.toFixed(2)}
          </h3>

        </div>

        <br>

        <button
          class="primary-btn"
          id="printInvoice"
        >
          🖨️ Print / Save PDF
        </button>

      `;


      document.getElementById(
        "printInvoice"
      ).onclick = () => {

        const invoice =
          document.getElementById(
            "invoicePrint"
          ).innerHTML;


        const win =
          window.open("", "_blank");


        win.document.write(`

          <html>

          <head>

            <title>Invoice</title>

            <style>

              body {
                font-family:Arial,sans-serif;
                padding:30px;
              }

              table {
                width:100%;
              }

            </style>

          </head>

          <body>

            ${invoice}

          </body>

          </html>

        `);


        win.document.close();

        setTimeout(() => {

          win.print();

        }, 500);

      };

    };

  }


  function escapeHTML(text) {

    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  /* =======================================================
     12. EMI CALCULATOR
  ======================================================= */

  function emiCalculator() {

    toolContent.innerHTML = `

      <div class="form-grid">

        <div class="form-group">

          <label>Loan Amount (₹)</label>

          <input
            type="number"
            id="loanAmount"
            value="500000"
          >

        </div>

        <div class="form-group">

          <label>Interest Rate (% per year)</label>

          <input
            type="number"
            id="interestRate"
            value="8.5"
            step="0.01"
          >

        </div>

        <div class="form-group">

          <label>Loan Tenure (Years)</label>

          <input
            type="number"
            id="loanYears"
            value="10"
          >

        </div>

      </div>

      <div style="margin-top:20px">

        <button
          class="primary-btn"
          id="emiBtn"
        >
          Calculate EMI
        </button>

      </div>

      <div id="emiResult"></div>

    `;


    document.getElementById(
      "emiBtn"
    ).onclick = () => {

      const P =
        Number(
          document.getElementById(
            "loanAmount"
          ).value
        );

      const annualRate =
        Number(
          document.getElementById(
            "interestRate"
          ).value
        );

      const years =
        Number(
          document.getElementById(
            "loanYears"
          ).value
        );


      const r =
        annualRate / 12 / 100;

      const n =
        years * 12;


      let emi;


      if (r === 0) {

        emi = P / n;

      } else {

        emi =
          P *
          r *
          Math.pow(1 + r, n) /
          (Math.pow(1 + r, n) - 1);

      }


      const total =
        emi * n;

      const interest =
        total - P;


      document.getElementById(
        "emiResult"
      ).innerHTML = `

        <div class="form-grid">

          <div class="result-box">

            <h3>Monthly EMI</h3>

            <div class="result-value">
              ₹${formatNumber(emi)}
            </div>

          </div>

          <div class="result-box">

            <h3>Total Interest</h3>

            <div class="result-value">
              ₹${formatNumber(interest)}
            </div>

          </div>

          <div class="result-box">

            <h3>Total Payment</h3>

            <div class="result-value">
              ₹${formatNumber(total)}
            </div>

          </div>

        </div>

      `;

    };

  }


  /* =======================================================
     13. GST CALCULATOR
  ======================================================= */

  function gstCalculator() {

    toolContent.innerHTML = `

      <div class="form-grid">

        <div class="form-group">

          <label>Amount (₹)</label>

          <input
            type="number"
            id="gstAmount"
            value="1000"
          >

        </div>

        <div class="form-group">

          <label>GST Rate</label>

          <select id="gstRate">

            <option value="5">5%</option>

            <option value="12">12%</option>

            <option value="18" selected>18%</option>

            <option value="28">28%</option>

          </select>

        </div>

      </div>

      <div style="margin-top:20px">

        <button
          class="primary-btn"
          id="gstBtn"
        >
          Calculate GST
        </button>

      </div>

      <div id="gstResult"></div>

    `;


    document.getElementById(
      "gstBtn"
    ).onclick = () => {

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

        <div class="form-grid">

          <div class="result-box">

            <h3>GST Amount</h3>

            <div class="result-value">
              ₹${formatNumber(gst)}
            </div>

          </div>

          <div class="result-box">

            <h3>Total Amount</h3>

            <div class="result-value">
              ₹${formatNumber(total)}
            </div>

          </div>

        </div>

      `;

    };

  }


  /* =======================================================
     14. PERCENTAGE CALCULATOR
  ======================================================= */

  function percentageCalculator() {

    toolContent.innerHTML = `

      <div class="form-group">

        <label>
          What is X% of Y?
        </label>

        <div class="form-grid">

          <input
            type="number"
            id="percentX"
            placeholder="X"
          >

          <input
            type="number"
            id="percentY"
            placeholder="Y"
          >

        </div>

      </div>

      <div style="margin-top:20px">

        <button
          class="primary-btn"
          id="percentBtn"
        >
          Calculate
        </button>

      </div>

      <div id="percentResult"></div>

    `;


    document.getElementById(
      "percentBtn"
    ).onclick = () => {

      const x =
        Number(
          document.getElementById(
            "percentX"
          ).value
        );

      const y =
        Number(
          document.getElementById(
            "percentY"
          ).value
        );


      const result =
        x * y / 100;


      document.getElementById(
        "percentResult"
      ).innerHTML = `

        <div class="result-box">

          <h3>Result</h3>

          <div class="result-value">
            ${formatNumber(result)}
          </div>

          <p>
            ${x}% of ${y} =
            ${formatNumber(result)}
          </p>

        </div>

      `;

    };

  }


  /* =======================================================
     15. AGE CALCULATOR
  ======================================================= */

  function ageCalculator() {

    toolContent.innerHTML = `

      <div class="form-group">

        <label>Date of Birth</label>

        <input
          type="date"
          id="dob"
        >

      </div>

      <div style="margin-top:20px">

        <button
          class="primary-btn"
          id="ageBtn"
        >
          🎂 Calculate Age
        </button>

      </div>

      <div id="ageResult"></div>

    `;


    document.getElementById(
      "ageBtn"
    ).onclick = () => {

      const dobValue =
        document.getElementById(
          "dob"
        ).value;


      if (!dobValue) {

        alert("Please select date of birth.");

        return;

      }


      const dob =
        new Date(dobValue);

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

        <div class="result-box">

          <h3>Your Age</h3>

          <div class="result-value">

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


  /* =======================================================
     NUMBER FORMATTER
  ======================================================= */

  function formatNumber(number) {

    return Number(number)
      .toLocaleString("en-IN", {
        maximumFractionDigits: 2
      });

  }


  /* =======================================================
     TOOL SEARCH
  ======================================================= */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      () => {

        const query =
          searchInput.value
            .toLowerCase()
            .trim();


        const cards =
          document.querySelectorAll(
            ".tool-card"
          );


        let visible = 0;


        cards.forEach(card => {

          const name =
            (
              card.dataset.name ||
              card.textContent
            ).toLowerCase();


          if (
            name.includes(query)
          ) {

            card.style.display = "";

            visible++;

          } else {

            card.style.display = "none";

          }

        });


        if (visible === 0) {

          noResults.style.display =
            "block";

        } else {

          noResults.style.display =
            "none";

        }

      }
    );

  }


  /* =======================================================
     FINISH
  ======================================================= */

  console.log(
    "Manjeet Tools loaded successfully 🚀"
  );

});
