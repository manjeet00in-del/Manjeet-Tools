/* =========================================================
   MANJEET DIGITAL HUB - COMPLETE APP.JS
   Version: 2.0
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

    /* ---------- IMAGE TOOLS ---------- */

    compressor: {
      title: "Image Compressor",
      icon: "🗜️",
      active: true
    },

    resizer: {
      title: "Image Resizer",
      icon: "↔️",
      active: true
    },

    cropper: {
      title: "Image Cropper",
      icon: "✂️",
      active: true
    },

    converter: {
      title: "Image Converter",
      icon: "🔄",
      active: true
    },

    reducer: {
      title: "Photo Size Reducer",
      icon: "📉",
      active: true
    },

    social: {
      title: "Social Media Resizer",
      icon: "📱",
      active: true
    },

    pdf: {
      title: "Images to PDF",
      icon: "📄",
      active: true
    },

    watermark: {
      title: "Image Watermark",
      icon: "💧",
      active: false
    },

    rotate: {
      title: "Image Rotate",
      icon: "🔄",
      active: false
    },

    flip: {
      title: "Image Flip",
      icon: "↔️",
      active: false
    },

    blur: {
      title: "Image Blur",
      icon: "🌫️",
      active: false
    },

    textimage: {
      title: "Text to Image",
      icon: "📝",
      active: false
    },


    /* ---------- PDF TOOLS ---------- */

    mergepdf: {
      title: "Merge PDF",
      icon: "📑",
      active: false
    },

    splitpdf: {
      title: "Split PDF",
      icon: "✂️",
      active: false
    },

    compresspdf: {
      title: "Compress PDF",
      icon: "🗜️",
      active: false
    },

    pdfjpg: {
      title: "PDF to JPG",
      icon: "🖼️",
      active: false
    },

    jpgpdf: {
      title: "JPG to PDF",
      icon: "📄",
      active: false
    },

    pdfword: {
      title: "PDF to Word",
      icon: "📝",
      active: false
    },

    wordpdf: {
      title: "Word to PDF",
      icon: "📄",
      active: false
    },

    pdfprotect: {
      title: "Protect PDF",
      icon: "🔐",
      active: false
    },

    pdfunlock: {
      title: "Unlock PDF",
      icon: "🔓",
      active: false
    },

    pdfrotate: {
      title: "Rotate PDF",
      icon: "🔄",
      active: false
    },

    pdfwatermark: {
      title: "PDF Watermark",
      icon: "💧",
      active: false
    },

    pdfsign: {
      title: "Sign PDF",
      icon: "✍️",
      active: false
    },


    /* ---------- ID & PRINT ---------- */

    idcard: {
      title: "ID Card Maker",
      icon: "🪪",
      active: false
    },

    schoolid: {
      title: "School ID Card",
      icon: "🎓",
      active: false
    },

    employeeid: {
      title: "Employee ID Card",
      icon: "👨‍💼",
      active: false
    },

    passport: {
      title: "Passport Photo Maker",
      icon: "📷",
      active: false
    },

    photosheet: {
      title: "Passport Photo Sheet",
      icon: "🖨️",
      active: false
    },

    signature: {
      title: "Signature Resizer",
      icon: "✍️",
      active: false
    },

    a4photo: {
      title: "A4 Photo Sheet",
      icon: "📄",
      active: false
    },

    document: {
      title: "Document Photo",
      icon: "📃",
      active: false
    },

    resume: {
      title: "Resume Maker",
      icon: "📄",
      active: false
    },

    visiting: {
      title: "Visiting Card Maker",
      icon: "💼",
      active: false
    },

    certificate: {
      title: "Certificate Maker",
      icon: "🏆",
      active: false
    },

    printsheet: {
      title: "Print Sheet Maker",
      icon: "🖨️",
      active: false
    },


    /* ---------- TEXT TOOLS ---------- */

    words: {
      title: "Word Counter",
      icon: "Aa",
      active: true
    },

    case: {
      title: "Case Converter",
      icon: "Aa",
      active: true
    },

    duplicate: {
      title: "Duplicate Line Remover",
      icon: "🧹",
      active: false
    },

    spaces: {
      title: "Remove Extra Spaces",
      icon: "␠",
      active: false
    },

    sorter: {
      title: "Text Sorter",
      icon: "↕️",
      active: false
    },

    formatter: {
      title: "Text Formatter",
      icon: "📝",
      active: false
    },

    json: {
      title: "JSON Formatter",
      icon: "{}",
      active: false
    },

    urlencode: {
      title: "URL Encoder",
      icon: "🔗",
      active: false
    },

    urldecode: {
      title: "URL Decoder",
      icon: "🔓",
      active: false
    },

    slug: {
      title: "Slug Generator",
      icon: "🔗",
      active: false
    },

    lorem: {
      title: "Lorem Ipsum Generator",
      icon: "📃",
      active: false
    },

    frequency: {
      title: "Word Frequency",
      icon: "📊",
      active: false
    },


    /* ---------- FINANCE ---------- */

    emi: {
      title: "EMI Calculator",
      icon: "₹",
      active: true
    },

    gst: {
      title: "GST Calculator",
      icon: "%",
      active: true
    },

    percentage: {
      title: "Percentage Calculator",
      icon: "%",
      active: true
    },

    age: {
      title: "Age Calculator",
      icon: "🎂",
      active: true
    },

    sip: {
      title: "SIP Calculator",
      icon: "📈",
      active: false
    },

    fd: {
      title: "FD Calculator",
      icon: "🏦",
      active: false
    },

    rd: {
      title: "RD Calculator",
      icon: "💰",
      active: false
    },

    interest: {
      title: "Simple Interest",
      icon: "₹",
      active: false
    },

    compound: {
      title: "Compound Interest",
      icon: "📈",
      active: false
    },

    discount: {
      title: "Discount Calculator",
      icon: "🏷️",
      active: false
    },

    profit: {
      title: "Profit & Loss",
      icon: "📊",
      active: false
    },

    salary: {
      title: "Salary Calculator",
      icon: "💼",
      active: false
    },


    /* ---------- STUDENT ---------- */

    cgpa: {
      title: "CGPA Calculator",
      icon: "🎓",
      active: false
    },

    marks: {
      title: "Marks Calculator",
      icon: "📝",
      active: false
    },

    attendance: {
      title: "Attendance Calculator",
      icon: "📅",
      active: false
    },

    date: {
      title: "Date Calculator",
      icon: "📆",
      active: false
    },

    study: {
      title: "Study Timer",
      icon: "⏱️",
      active: false
    },

    gpa: {
      title: "GPA Calculator",
      icon: "🎓",
      active: false
    },

    countdown: {
      title: "Exam Countdown",
      icon: "⏳",
      active: false
    },

    notes: {
      title: "Student Notes",
      icon: "📒",
      active: false
    },

    timetable: {
      title: "Timetable Maker",
      icon: "🗓️",
      active: false
    },


    /* ---------- EXTRA ---------- */

    qr: {
      title: "QR Generator",
      icon: "▦",
      active: true
    },

    invoice: {
      title: "Invoice Generator",
      icon: "🧾",
      active: true
    }

  };


  /* =======================================================
     OPEN TOOL
     ======================================================= */

  function openTool(toolName, cardTitle) {

    const data = toolData[toolName];

    if (!data) {
      showComingSoon("Digital Tool");
      return;
    }


    /*
      PDF category mein kai cards currently same
      data-tool="pdf" use kar rahe hain.
      Sirf "Images to PDF" existing functional tool hai.
    */

    if (
      toolName === "pdf" &&
      cardTitle &&
      cardTitle.toLowerCase() !== "images to pdf"
    ) {

      showComingSoon(cardTitle);

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

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

    }


    document.body.classList.add(
      "modal-open"
    );


    loadTool(toolName);


    setTimeout(function () {

      if (!toolContent) {
        return;
      }

      const firstInput =
        toolContent.querySelector(
          "input:not([type='file']), textarea, select"
        );

      if (firstInput) {
        firstInput.focus();
      }

    }, 150);

  }


  /* =======================================================
     COMING SOON
     ======================================================= */

  function showComingSoon(title) {

    if (modalTitle) {
      modalTitle.textContent = title;
    }

    if (modalIcon) {
      modalIcon.textContent = "🚀";
    }


    if (modal) {

      modal.classList.add("active");

      modal.setAttribute(
        "aria-hidden",
        "false"
      );

    }


    document.body.classList.add(
      "modal-open"
    );


    if (toolContent) {

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

            <div>
              ⚡ Fast
            </div>

            <div>
              🔒 Secure
            </div>

            <div>
              🆓 Free
            </div>

          </div>

          <p class="coming-note">
            This tool will be available in a future update.
          </p>

        </div>

      `;

    }

  }


  /* =======================================================
     CLOSE MODAL
     ======================================================= */

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


  /* =======================================================
     CARD CLICK
     ======================================================= */

  document
    .querySelectorAll(".tool-card")
    .forEach(function (card) {

      card.setAttribute(
        "tabindex",
        "0"
      );


      card.setAttribute(
        "role",
        "button"
      );


      card.addEventListener(
        "click",
        function () {

          const tool =
            card.getAttribute(
              "data-tool"
            );


          if (!tool) {
            return;
          }


          const titleElement =
            card.querySelector(
              "h3, h4, .tool-name"
            );


          const cardTitle =
            titleElement
              ? titleElement.textContent.trim()
              : "";


          openTool(
            tool,
            cardTitle
          );

        }
      );


      card.addEventListener(
        "keydown",
        function (event) {

          if (
            event.key === "Enter" ||
            event.key === " "
          ) {

            event.preventDefault();

            card.click();

          }

        }
      );

    });


  /* =======================================================
     MODAL CLOSE
     ======================================================= */

  if (closeTool) {

    closeTool.addEventListener(
      "click",
      closeModal
    );

  }


  if (modalOverlay) {

    modalOverlay.addEventListener(
      "click",
      closeModal
    );

  }


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {
        closeModal();
      }

    }
  );


  /* =======================================================
     SEARCH
     ======================================================= */

  if (searchInput) {

    searchInput.addEventListener(
      "input",
      function () {

        const query =
          searchInput.value
            .trim()
            .toLowerCase();


        const cards =
          document.querySelectorAll(
            ".tool-card"
          );


        let visible =
          0;


        cards.forEach(
          function (card) {

            const name =
              (
                card.getAttribute(
                  "data-name"
                ) ||
                card.textContent ||
                ""
              ).toLowerCase();


            if (
              !query ||
              name.includes(query)
            ) {

              card.style.display =
                "";

              visible++;

            } else {

              card.style.display =
                "none";

            }

          }
        );


        if (noResults) {

          if (visible === 0) {

            noResults.classList.add(
              "show"
            );

          } else {

            noResults.classList.remove(
              "show"
            );

          }

        }

      }
    );

  }


  /* =======================================================
     KEYBOARD SEARCH SHORTCUT
     ======================================================= */

  document.addEventListener(
    "keydown",
    function (event) {

      const isMac =
        navigator.platform
          .toUpperCase()
          .indexOf("MAC") >= 0;


      if (
        (isMac && event.metaKey && event.key === "k") ||
        (!isMac && event.ctrlKey && event.key === "k")
      ) {

        event.preventDefault();

        if (searchInput) {
          searchInput.focus();
        }

      }

    }
  );


  /* =======================================================
     HELPER FUNCTIONS
     ======================================================= */

  function escapeHTML(value) {

    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

  }


  function formatNumber(value) {

    const number =
      Number(value);


    if (!Number.isFinite(number)) {
      return "0";
    }


    return number.toLocaleString(
      "en-IN",
      {
        maximumFractionDigits: 2
      }
    );

  }


  function formatKB(bytes) {

    return (
      bytes / 1024
    ).toFixed(2) + " KB";

  }


  function downloadBlob(
    blob,
    filename
  ) {

    const url =
      URL.createObjectURL(blob);


    const a =
      document.createElement(
        "a"
      );


    a.href = url;

    a.download = filename;


    document.body.appendChild(a);

    a.click();

    a.remove();


    setTimeout(
      function () {

        URL.revokeObjectURL(
          url
        );

      },
      1000
    );

  }


  function loadImage(file) {

    return new Promise(
      function (resolve, reject) {

        const img =
          new Image();


        const url =
          URL.createObjectURL(
            file
          );


        img.onload =
          function () {

            URL.revokeObjectURL(
              url
            );

            resolve(img);

          };


        img.onerror =
          function () {

            URL.revokeObjectURL(
              url
            );

            reject(
              new Error(
                "Image could not be loaded."
              )
            );

          };


        img.src = url;

      }
    );

  }


  function canvasToBlob(
    canvas,
    type = "image/jpeg",
    quality = 0.85
  ) {

    return new Promise(
      function (resolve, reject) {

        canvas.toBlob(
          function (blob) {

            if (!blob) {

              reject(
                new Error(
                  "Could not create image."
                )
              );

              return;

            }


            resolve(blob);

          },
          type,
          quality
        );

      }
    );

  }


  /* =======================================================
     FILE DROP
     ======================================================= */

  function createFileDrop(
    accept,
    multiple = false
  ) {

    const wrapper =
      document.createElement(
        "div"
      );


    wrapper.innerHTML = `

      <div class="file-drop">

        <div class="file-drop-icon">
          📁
        </div>

        <h4>
          Select ${multiple ? "images" : "an image"}
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


    const drop =
      wrapper.querySelector(
        ".file-drop"
      );


    const input =
      wrapper.querySelector(
        "input"
      );


    drop.addEventListener(
      "dragover",
      function (event) {

        event.preventDefault();

        drop.classList.add(
          "dragover"
        );

      }
    );


    drop.addEventListener(
      "dragleave",
      function () {

        drop.classList.remove(
          "dragover"
        );

      }
    );


    drop.addEventListener(
      "drop",
      function (event) {

        event.preventDefault();

        drop.classList.remove(
          "dragover"
        );


        if (
          event.dataTransfer &&
          event.dataTransfer.files.length
        ) {

          try {

            const dataTransfer =
              new DataTransfer();


            Array.from(
              event.dataTransfer.files
            ).forEach(
              function (file) {

                dataTransfer.items.add(
                  file
                );

              }
            );


            input.files =
              dataTransfer.files;


            input.dispatchEvent(
              new Event(
                "change"
              )
            );

          } catch (error) {

            console.warn(
              "Drag/drop file assignment unavailable.",
              error
            );

          }

        }

      }
    );


    return {
      wrapper,
      drop,
      input
    };

  }


  /* =======================================================
     LOAD TOOL
     ======================================================= */

  function loadTool(tool) {

    if (!toolContent) {
      return;
    }


    toolContent.innerHTML = "";


    switch (tool) {

      case "compressor":
        loadCompressor();
        break;

      case "resizer":
        loadResizer();
        break;

      case "cropper":
        loadCropper();
        break;

      case "converter":
        loadConverter();
        break;

      case "reducer":
        loadReducer();
        break;

      case "social":
        loadSocialResizer();
        break;

      case "pdf":
        loadImagesPDF();
        break;

      case "qr":
        loadQR();
        break;

      case "words":
        loadWordCounter();
        break;

      case "case":
        loadCaseConverter();
        break;

      case "invoice":
        loadInvoice();
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

      case "age":
        loadAge();
        break;

      default:
        showComingSoon(
          toolData[tool]
            ? toolData[tool].title
            : "This Tool"
        );

    }

  }


  /* =======================================================
     1. IMAGE COMPRESSOR
     ======================================================= */

  function loadCompressor() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="compressorFile"></div>

        <div class="form-group">

          <label>
            Image Quality
          </label>

          <div class="range-row">

            <input
              id="compressQuality"
              type="range"
              min="10"
              max="100"
              value="80"
            >

            <span
              id="compressQualityValue"
              class="range-value"
            >
              80%
            </span>

          </div>

        </div>

        <button
          id="compressButton"
          class="primary-button"
        >
          Compress Image
        </button>

        <div id="compressResult"></div>

      </div>

    `;


    const dropData =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );


    document
      .getElementById(
        "compressorFile"
      )
      .appendChild(
        dropData.wrapper
      );


    const quality =
      document.getElementById(
        "compressQuality"
      );


    const qualityValue =
      document.getElementById(
        "compressQualityValue"
      );


    quality.addEventListener(
      "input",
      function () {

        qualityValue.textContent =
          quality.value + "%";

      }
    );


    document
      .getElementById(
        "compressButton"
      )
      .addEventListener(
        "click",
        async function () {

          const file =
            dropData.input.files[0];


          if (!file) {

            alert(
              "Please select an image first."
            );

            return;

          }


          try {

            const img =
              await loadImage(
                file
              );


            const canvas =
              document.createElement(
                "canvas"
              );


            canvas.width =
              img.naturalWidth;

            canvas.height =
              img.naturalHeight;


            const ctx =
              canvas.getContext(
                "2d"
              );


            ctx.drawImage(
              img,
              0,
              0
            );


            const blob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                Number(
                  quality.value
                ) / 100
              );


            const originalSize =
              file.size;


            const newSize =
              blob.size;


            const saved =
              Math.max(
                0,
                (
                  (
                    originalSize -
                    newSize
                  ) /
                  originalSize
                ) * 100
              );


            document
              .getElementById(
                "compressResult"
              )
              .innerHTML = `

                <div class="result-box">

                  <h4>
                    Compression Complete
                  </h4>

                  <div class="result-grid">

                    <div class="result-item">
                      <span>Original Size</span>
                      <strong>
                        ${formatKB(originalSize)}
                      </strong>
                    </div>

                    <div class="result-item">
                      <span>New Size</span>
                      <strong>
                        ${formatKB(newSize)}
                      </strong>
                    </div>

                    <div class="result-item">
                      <span>Saved</span>
                      <strong>
                        ${saved.toFixed(1)}%
                      </strong>
                    </div>

                    <div class="result-item">
                      <span>Quality</span>
                      <strong>
                        ${quality.value}%
                      </strong>
                    </div>

                  </div>

                  <br>

                  <button
                    id="downloadCompressed"
                    class="download-button"
                  >
                    ⬇ Download Compressed Image
                  </button>

                </div>

              `;


            document
              .getElementById(
                "downloadCompressed"
              )
              .addEventListener(
                "click",
                function () {

                  downloadBlob(
                    blob,
                    "manjeet-compressed.jpg"
                  );

                }
              );

          } catch (error) {

            console.error(
              error
            );

            alert(
              "Unable to compress this image."
            );

          }

        }
      );

  }


  /* =======================================================
     2. IMAGE RESIZER
     ======================================================= */

  function loadResizer() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="resizerFile"></div>

        <div class="form-row">

          <div class="form-group">

            <label>
              Width (px)
            </label>

            <input
              id="resizeWidth"
              type="number"
              min="1"
              placeholder="Width"
            >

          </div>

          <div class="form-group">

            <label>
              Height (px)
            </label>

            <input
              id="resizeHeight"
              type="number"
              min="1"
              placeholder="Height"
            >

          </div>

        </div>

        <label class="check-row">

          <input
            id="keepRatio"
            type="checkbox"
            checked
          >

          Keep aspect ratio

        </label>

        <button
          id="resizeButton"
          class="primary-button"
        >
          Resize Image
        </button>

        <div id="resizeResult"></div>

      </div>

    `;


    const dropData =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );


    document
      .getElementById(
        "resizerFile"
      )
      .appendChild(
        dropData.wrapper
      );


    let image = null;


    dropData.input.addEventListener(
      "change",
      async function () {

        const file =
          dropData.input.files[0];


        if (!file) {
          return;
        }


        try {

          image =
            await loadImage(
              file
            );


          document.getElementById(
            "resizeWidth"
          ).value =
            image.naturalWidth;


          document.getElementById(
            "resizeHeight"
          ).value =
            image.naturalHeight;

        } catch (error) {

          alert(
            "Unable to load image."
          );

        }

      }
    );


    const widthInput =
      document.getElementById(
        "resizeWidth"
      );


    const heightInput =
      document.getElementById(
        "resizeHeight"
      );


    const keepRatio =
      document.getElementById(
        "keepRatio"
      );


    widthInput.addEventListener(
      "input",
      function () {

        if (
          keepRatio.checked &&
          image
        ) {

          const ratio =
            image.naturalHeight /
            image.naturalWidth;


          heightInput.value =
            Math.round(
              Number(
                widthInput.value
              ) * ratio
            );

        }

      }
    );


    document
      .getElementById(
        "resizeButton"
      )
      .addEventListener(
        "click",
        async function () {

          if (!image) {

            alert(
              "Please select an image first."
            );

            return;

          }


          const width =
            Math.max(
              1,
              Number(
                widthInput.value
              )
            );


          const height =
            Math.max(
              1,
              Number(
                heightInput.value
              )
            );


          const canvas =
            document.createElement(
              "canvas"
            );


          canvas.width =
            width;

          canvas.height =
            height;


          const ctx =
            canvas.getContext(
              "2d"
            );


          ctx.drawImage(
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
              0.90
            );


          const url =
            URL.createObjectURL(
              blob
            );


          document
            .getElementById(
              "resizeResult"
            )
            .innerHTML = `

              <div class="result-box">

                <h4>
                  Image Resized
                </h4>

                <div class="preview-area">

                  <div class="preview-card">

                    <span>
                      Preview
                    </span>

                    <img
                      src="${url}"
                      alt="Resized image"
                    >

                  </div>

                </div>

                <br>

                <button
                  id="downloadResized"
                  class="download-button"
                >
                  ⬇ Download Resized Image
                </button>

              </div>

            `;


          document
            .getElementById(
              "downloadResized"
            )
            .addEventListener(
              "click",
              function () {

                downloadBlob(
                  blob,
                  "manjeet-resized.jpg"
                );

              }
            );

        }
      );

  }


  /* =======================================================
     3. IMAGE CROPPER
     ======================================================= */

  function loadCropper() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="cropFile"></div>

        <div class="form-row">

          <div class="form-group">
            <label>X</label>
            <input
              id="cropX"
              type="number"
              min="0"
              value="0"
            >
          </div>

          <div class="form-group">
            <label>Y</label>
            <input
              id="cropY"
              type="number"
              min="0"
              value="0"
            >
          </div>

        </div>

        <div class="form-row">

          <div class="form-group">
            <label>Width</label>
            <input
              id="cropW"
              type="number"
              min="1"
            >
          </div>

          <div class="form-group">
            <label>Height</label>
            <input
              id="cropH"
              type="number"
              min="1"
            >
          </div>

        </div>

        <button
          id="cropButton"
          class="primary-button"
        >
          Crop Image
        </button>

        <div id="cropResult"></div>

      </div>

    `;


    const dropData =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );


    document
      .getElementById(
        "cropFile"
      )
      .appendChild(
        dropData.wrapper
      );


    let image = null;


    dropData.input.addEventListener(
      "change",
      async function () {

        const file =
          dropData.input.files[0];


        if (!file) {
          return;
        }


        try {

          image =
            await loadImage(
              file
            );


          document.getElementById(
            "cropW"
          ).value =
            image.naturalWidth;


          document.getElementById(
            "cropH"
          ).value =
            image.naturalHeight;

        } catch (error) {

          alert(
            "Unable to load image."
          );

        }

      }
    );


    document
      .getElementById(
        "cropButton"
      )
      .addEventListener(
        "click",
        async function () {

          if (!image) {

            alert(
              "Please select an image first."
            );

            return;

          }


          let x =
            Math.max(
              0,
              Number(
                document.getElementById(
                  "cropX"
                ).value
              )
            );


          let y =
            Math.max(
              0,
              Number(
                document.getElementById(
                  "cropY"
                ).value
              )
            );


          let w =
            Math.max(
              1,
              Number(
                document.getElementById(
                  "cropW"
                ).value
              )
            );


          let h =
            Math.max(
              1,
              Number(
                document.getElementById(
                  "cropH"
                ).value
              )
            );


          x =
            Math.min(
              x,
              image.naturalWidth - 1
            );


          y =
            Math.min(
              y,
              image.naturalHeight - 1
            );


          w =
            Math.min(
              w,
              image.naturalWidth - x
            );


          h =
            Math.min(
              h,
              image.naturalHeight - y
            );


          const canvas =
            document.createElement(
              "canvas"
            );


          canvas.width =
            w;

          canvas.height =
            h;


          const ctx =
            canvas.getContext(
              "2d"
            );


          ctx.drawImage(
            image,
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
              0.90
            );


          const url =
            URL.createObjectURL(
              blob
            );


          document
            .getElementById(
              "cropResult"
            )
            .innerHTML = `

              <div class="result-box">

                <h4>
                  Crop Complete
                </h4>

                <div class="preview-area">

                  <div class="preview-card">

                    <span>
                      Cropped Image
                    </span>

                    <img
                      src="${url}"
                      alt="Cropped image"
                    >

                  </div>

                </div>

                <br>

                <button
                  id="downloadCrop"
                  class="download-button"
                >
                  ⬇ Download Cropped Image
                </button>

              </div>

            `;


          document
            .getElementById(
              "downloadCrop"
            )
            .addEventListener(
              "click",
              function () {

                downloadBlob(
                  blob,
                  "manjeet-cropped.jpg"
                );

              }
            );

        }
      );

  }


  /* =======================================================
     4. IMAGE CONVERTER
     ======================================================= */

  function loadConverter() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="converterFile"></div>

        <div class="form-group">

          <label>
            Convert To
          </label>

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

        <button
          id="convertButton"
          class="primary-button"
        >
          Convert Image
        </button>

        <div id="convertResult"></div>

      </div>

    `;


    const dropData =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );


    document
      .getElementById(
        "converterFile"
      )
      .appendChild(
        dropData.wrapper
      );


    document
      .getElementById(
        "convertButton"
      )
      .addEventListener(
        "click",
        async function () {

          const file =
            dropData.input.files[0];


          if (!file) {

            alert(
              "Please select an image first."
            );

            return;

          }


          try {

            const image =
              await loadImage(
                file
              );


            const canvas =
              document.createElement(
                "canvas"
              );


            canvas.width =
              image.naturalWidth;

            canvas.height =
              image.naturalHeight;


            const ctx =
              canvas.getContext(
                "2d"
              );


            ctx.drawImage(
              image,
              0,
              0
            );


            const type =
              document.getElementById(
                "convertType"
              ).value;


            const blob =
              await canvasToBlob(
                canvas,
                type,
                0.92
              );


            let extension =
              "jpg";


            if (
              type ===
              "image/png"
            ) {
              extension = "png";
            }


            if (
              type ===
              "image/webp"
            ) {
              extension = "webp";
            }


            document
              .getElementById(
                "convertResult"
              )
              .innerHTML = `

                <div class="result-box">

                  <h4>
                    Conversion Complete
                  </h4>

                  <p>
                    Format:
                    ${extension.toUpperCase()}
                  </p>

                  <br>

                  <button
                    id="downloadConverted"
                    class="download-button"
                  >
                    ⬇ Download
                    ${extension.toUpperCase()}
                  </button>

                </div>

              `;


            document
              .getElementById(
                "downloadConverted"
              )
              .addEventListener(
                "click",
                function () {

                  downloadBlob(
                    blob,
                    "manjeet-converted." +
                    extension
                  );

                }
              );

          } catch (error) {

            alert(
              "Unable to convert image."
            );

          }

        }
      );

  }


  /* =======================================================
     5. PHOTO SIZE REDUCER
     ======================================================= */

  function loadReducer() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="reducerFile"></div>

        <div class="form-group">

          <label>
            Target Size (KB)
          </label>

          <input
            id="targetKB"
            type="number"
            min="5"
            value="100"
          >

        </div>

        <button
          id="reduceButton"
          class="primary-button"
        >
          Reduce Photo Size
        </button>

        <div id="reduceResult"></div>

      </div>

    `;


    const dropData =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );


    document
      .getElementById(
        "reducerFile"
      )
      .appendChild(
        dropData.wrapper
      );


    document
      .getElementById(
        "reduceButton"
      )
      .addEventListener(
        "click",
        async function () {

          const file =
            dropData.input.files[0];


          if (!file) {

            alert(
              "Please select an image first."
            );

            return;

          }


          try {

            const target =
              Math.max(
                5,
                Number(
                  document.getElementById(
                    "targetKB"
                  ).value
                )
              ) * 1024;


            const image =
              await loadImage(
                file
              );


            const canvas =
              document.createElement(
                "canvas"
              );


            canvas.width =
              image.naturalWidth;

            canvas.height =
              image.naturalHeight;


            const ctx =
              canvas.getContext(
                "2d"
              );


            ctx.drawImage(
              image,
              0,
              0
            );


            let low = 0.05;

            let high = 0.95;

            let bestBlob = null;


            for (
              let i = 0;
              i < 10;
              i++
            ) {

              const quality =
                (
                  low +
                  high
                ) / 2;


              const blob =
                await canvasToBlob(
                  canvas,
                  "image/jpeg",
                  quality
                );


              if (
                blob.size <=
                target
              ) {

                bestBlob =
                  blob;

                low =
                  quality;

              } else {

                high =
                  quality;

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


            document
              .getElementById(
                "reduceResult"
              )
              .innerHTML = `

                <div class="result-box">

                  <h4>
                    Photo Size Reduced
                  </h4>

                  <div class="result-grid">

                    <div class="result-item">

                      <span>
                        Original
                      </span>

                      <strong>
                        ${formatKB(file.size)}
                      </strong>

                    </div>

                    <div class="result-item">

                      <span>
                        New Size
                      </span>

                      <strong>
                        ${formatKB(bestBlob.size)}
                      </strong>

                    </div>

                  </div>

                  <br>

                  <button
                    id="downloadReduced"
                    class="download-button"
                  >
                    ⬇ Download Reduced Photo
                  </button>

                </div>

              `;


            document
              .getElementById(
                "downloadReduced"
              )
              .addEventListener(
                "click",
                function () {

                  downloadBlob(
                    bestBlob,
                    "manjeet-reduced.jpg"
                  );

                }
              );

          } catch (error) {

            alert(
              "Unable to reduce image size."
            );

          }

        }
      );

  }


  /* =======================================================
     6. SOCIAL MEDIA RESIZER
     ======================================================= */

  function loadSocialResizer() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="socialFile"></div>

        <div class="form-group">

          <label>
            Select Platform Size
          </label>

          <select id="socialSize">

            <option value="1080,1080">
              Instagram Square — 1080 × 1080
            </option>

            <option value="1080,1350">
              Instagram Portrait — 1080 × 1350
            </option>

            <option value="1080,1920">
              Instagram / Facebook Story — 1080 × 1920
            </option>

            <option value="1280,720">
              YouTube Thumbnail — 1280 × 720
            </option>

            <option value="1200,630">
              Facebook Post — 1200 × 630
            </option>

          </select>

        </div>

        <button
          id="socialButton"
          class="primary-button"
        >
          Resize for Social Media
        </button>

        <div id="socialResult"></div>

      </div>

    `;


    const dropData =
      createFileDrop(
        "image/jpeg,image/png,image/webp"
      );


    document
      .getElementById(
        "socialFile"
      )
      .appendChild(
        dropData.wrapper
      );


    document
      .getElementById(
        "socialButton"
      )
      .addEventListener(
        "click",
        async function () {

          const file =
            dropData.input.files[0];


          if (!file) {

            alert(
              "Please select an image first."
            );

            return;

          }


          try {

            const image =
              await loadImage(
                file
              );


            const parts =
              document
                .getElementById(
                  "socialSize"
                )
                .value
                .split(",");


            const targetW =
              Number(parts[0]);


            const targetH =
              Number(parts[1]);


            const canvas =
              document.createElement(
                "canvas"
              );


            canvas.width =
              targetW;

            canvas.height =
              targetH;


            const ctx =
              canvas.getContext(
                "2d"
              );


            const sourceRatio =
              image.naturalWidth /
              image.naturalHeight;


            const targetRatio =
              targetW /
              targetH;


            let drawW;

            let drawH;

            let offsetX;

            let offsetY;


            if (
              sourceRatio >
              targetRatio
            ) {

              drawH =
                targetH;


              drawW =
                targetH *
                sourceRatio;


              offsetX =
                (
                  targetW -
                  drawW
                ) / 2;


              offsetY = 0;

            } else {

              drawW =
                targetW;


              drawH =
                targetW /
                sourceRatio;


              offsetX = 0;


              offsetY =
                (
                  targetH -
                  drawH
                ) / 2;

            }


            ctx.drawImage(
              image,
              offsetX,
              offsetY,
              drawW,
              drawH
            );


            const blob =
              await canvasToBlob(
                canvas,
                "image/jpeg",
                0.92
              );


            const url =
              URL.createObjectURL(
                blob
              );


            document
              .getElementById(
                "socialResult"
              )
              .innerHTML = `

                <div class="result-box">

                  <h4>
                    Social Media Image Ready
                  </h4>

                  <div class="preview-area">

                    <div class="preview-card">

                      <span>
                        ${targetW} × ${targetH}
                      </span>

                      <img
                        src="${url}"
                        alt="Social media image"
                      >

                    </div>

                  </div>

                  <br>

                  <button
                    id="downloadSocial"
                    class="download-button"
                  >
                    ⬇ Download Image
                  </button>

                </div>

              `;


            document
              .getElementById(
                "downloadSocial"
              )
              .addEventListener(
                "click",
                function () {

                  downloadBlob(
                    blob,
                    "manjeet-social-image.jpg"
                  );

                }
              );

          } catch (error) {

            alert(
              "Unable to resize image."
            );

          }

        }
      );

  }


  /* =======================================================
     7. IMAGES TO PDF
     ======================================================= */

  function loadImagesPDF() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div id="pdfFile"></div>

        <div class="result-box">

          <h4>
            How it works
          </h4>

          <p>
            Select multiple images.
            A print-ready PDF window will open.
            Choose "Save as PDF".
          </p>

        </div>

        <button
          id="pdfButton"
          class="primary-button"
        >
          Create PDF
        </button>

        <div id="pdfResult"></div>

      </div>

    `;


    const dropData =
      createFileDrop(
        "image/jpeg,image/png,image/webp",
        true
      );


    document
      .getElementById(
        "pdfFile"
      )
      .appendChild(
        dropData.wrapper
      );


    document
      .getElementById(
        "pdfButton"
      )
      .addEventListener(
        "click",
        async function () {

          const files =
            Array.from(
              dropData.input.files
            );


          if (!files.length) {

            alert(
              "Please select at least one image."
            );

            return;

          }


          const printWindow =
            window.open(
              "",
              "_blank"
            );


          if (!printWindow) {

            alert(
              "Please allow pop-ups for this website."
            );

            return;

          }


          printWindow.document.write(`

            <!DOCTYPE html>

            <html>

            <head>

              <title>
                Manjeet Digital Hub - Images to PDF
              </title>

              <style>

                * {
                  box-sizing: border-box;
                }

                body {
                  margin: 0;
                  background: #ddd;
                  font-family: Arial, sans-serif;
                }

                .page {
                  width: 210mm;
                  min-height: 297mm;
                  margin: 10mm auto;
                  padding: 10mm;
                  background: white;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  page-break-after: always;
                }

                .page img {
                  max-width: 100%;
                  max-height: 277mm;
                  object-fit: contain;
                }

                @media print {

                  body {
                    background: white;
                  }

                  .page {
                    margin: 0;
                    width: 210mm;
                    min-height: 297mm;
                  }

                }

              </style>

            </head>

            <body>

          `);


          for (
            const file of files
          ) {

            const image =
              await loadImage(
                file
              );


            const canvas =
              document.createElement(
                "canvas"
              );


            canvas.width =
              image.naturalWidth;

            canvas.height =
              image.naturalHeight;


            const ctx =
              canvas.getContext(
                "2d"
              );


            ctx.drawImage(
              image,
              0,
              0
            );


            const dataURL =
              canvas.toDataURL(
                "image/jpeg",
                0.92
              );


            printWindow.document.write(`

              <div class="page">

                <img
                  src="${dataURL}"
                  alt="PDF page"
                >

              </div>

            `);

          }


          printWindow.document.write(`

            </body>

            </html>

          `);


          printWindow.document.close();


          printWindow.onload =
            function () {

              setTimeout(
                function () {

                  printWindow.focus();

                  printWindow.print();

                },
                500
              );

            };


          document
            .getElementById(
              "pdfResult"
            )
            .innerHTML = `

              <div class="result-box">

                <p>
                  PDF print window opened.
                  Select <strong>Save as PDF</strong>.
                </p>

              </div>

            `;

        }
      );

  }


  /* =======================================================
     8. QR GENERATOR
     ======================================================= */

  function loadQR() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            Enter Text or URL
          </label>

          <textarea
            id="qrText"
            placeholder="https://example.com"
          ></textarea>

        </div>

        <button
          id="qrButton"
          class="primary-button"
        >
          Generate QR Code
        </button>

        <div
          id="qrResult"
          class="qr-result"
        ></div>

      </div>

    `;


    document
      .getElementById(
        "qrButton"
      )
      .addEventListener(
        "click",
        function () {

          const text =
            document
              .getElementById(
                "qrText"
              )
              .value
              .trim();


          if (!text) {

            alert(
              "Please enter text or a URL."
            );

            return;

          }


          const qrURL =
            "https://api.qrserver.com/v1/create-qr-code/?" +
            "size=500x500&data=" +
            encodeURIComponent(
              text
            );


          document
            .getElementById(
              "qrResult"
            )
            .innerHTML = `

              <img
                src="${qrURL}"
                alt="Generated QR Code"
              >

              <a
                class="download-button"
                href="${qrURL}"
                target="_blank"
                rel="noopener"
              >
                Open QR Image
              </a>

            `;

        }
      );

  }


  /* =======================================================
     9. WORD COUNTER
     ======================================================= */

  function loadWordCounter() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            Enter or paste your text
          </label>

          <textarea
            id="wordText"
            placeholder="Start typing here..."
          ></textarea>

        </div>

        <div
          id="wordStats"
          class="result-box"
        >

          <div class="result-grid">

            <div class="result-item">

              <span>
                Words
              </span>

              <strong
                id="wordCount"
              >
                0
              </strong>

            </div>

            <div class="result-item">

              <span>
                Characters
              </span>

              <strong
                id="charCount"
              >
                0
              </strong>

            </div>

            <div class="result-item">

              <span>
                No Spaces
              </span>

              <strong
                id="charNoSpace"
              >
                0
              </strong>

            </div>

            <div class="result-item">

              <span>
                Sentences
              </span>

              <strong
                id="sentenceCount"
              >
                0
              </strong>

            </div>

          </div>

        </div>

      </div>

    `;


    const textarea =
      document.getElementById(
        "wordText"
      );


    textarea.addEventListener(
      "input",
      function () {

        const text =
          textarea.value;


        const words =
          text.trim()
            ? text.trim().split(/\s+/).length
            : 0;


        const characters =
          text.length;


        const noSpaces =
          text.replace(
            /\s/g,
            ""
          ).length;


        const sentences =
          text.trim()
            ? (
                text.match(
                  /[.!?]+(?=\s|$)/g
                ) || []
              ).length
            : 0;


        document.getElementById(
          "wordCount"
        ).textContent =
          words;


        document.getElementById(
          "charCount"
        ).textContent =
          characters;


        document.getElementById(
          "charNoSpace"
        ).textContent =
          noSpaces;


        document.getElementById(
          "sentenceCount"
        ).textContent =
          sentences;

      }
    );

  }


  /* =======================================================
     10. CASE CONVERTER
     ======================================================= */

  function loadCaseConverter() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            Enter Text
          </label>

          <textarea
            id="caseText"
            placeholder="Type or paste your text..."
          ></textarea>

        </div>

        <div class="form-row">

          <button
            id="upperCase"
            class="primary-button"
          >
            UPPERCASE
          </button>

          <button
            id="lowerCase"
            class="primary-button"
          >
            lowercase
          </button>

        </div>

        <div class="form-row">

          <button
            id="titleCase"
            class="primary-button"
          >
            Title Case
          </button>

          <button
            id="sentenceCase"
            class="primary-button"
          >
            Sentence case
          </button>

        </div>

        <button
          id="copyCase"
          class="secondary-button"
        >
          📋 Copy Text
        </button>

      </div>

    `;


    const textarea =
      document.getElementById(
        "caseText"
      );


    document
      .getElementById(
        "upperCase"
      )
      .addEventListener(
        "click",
        function () {

          textarea.value =
            textarea.value.toUpperCase();

        }
      );


    document
      .getElementById(
        "lowerCase"
      )
      .addEventListener(
        "click",
        function () {

          textarea.value =
            textarea.value.toLowerCase();

        }
      );


    document
      .getElementById(
        "titleCase"
      )
      .addEventListener(
        "click",
        function () {

          textarea.value =
            textarea.value
              .toLowerCase()
              .replace(
                /\b\w/g,
                function (letter) {

                  return letter.toUpperCase();

                }
              );

        }
      );


    document
      .getElementById(
        "sentenceCase"
      )
      .addEventListener(
        "click",
        function () {

          textarea.value =
            textarea.value
              .toLowerCase()
              .replace(
                /(^\s*\w|[.!?]\s*\w)/g,
                function (match) {

                  return match.toUpperCase();

                }
              );

        }
      );


    document
      .getElementById(
        "copyCase"
      )
      .addEventListener(
        "click",
        async function () {

          try {

            await navigator.clipboard.writeText(
              textarea.value
            );


            this.textContent =
              "✓ Copied";


            setTimeout(
              () => {

                this.textContent =
                  "📋 Copy Text";

              },
              1500
            );

          } catch (error) {

            textarea.select();

            document.execCommand(
              "copy"
            );

          }

        }
      );

  }


  /* =======================================================
     11. INVOICE GENERATOR
     ======================================================= */

  function loadInvoice() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-row">

          <div class="form-group">

            <label>
              Business Name
            </label>

            <input
              id="businessName"
              placeholder="Your Business"
            >

          </div>

          <div class="form-group">

            <label>
              Customer Name
            </label>

            <input
              id="customerName"
              placeholder="Customer Name"
            >

          </div>

        </div>

        <div class="form-row">

          <div class="form-group">

            <label>
              Item / Service
            </label>

            <input
              id="invoiceItem"
              placeholder="Product or Service"
            >

          </div>

          <div class="form-group">

            <label>
              Amount (₹)
            </label>

            <input
              id="invoiceAmount"
              type="number"
              min="0"
              placeholder="0"
            >

          </div>

        </div>

        <button
          id="generateInvoice"
          class="primary-button"
        >
          Generate Invoice
        </button>

        <div id="invoiceResult"></div>

      </div>

    `;


    document
      .getElementById(
        "generateInvoice"
      )
      .addEventListener(
        "click",
        function () {

          const business =
            document.getElementById(
              "businessName"
            ).value.trim() ||
            "Your Business";


          const customer =
            document.getElementById(
              "customerName"
            ).value.trim() ||
            "Customer";


          const item =
            document.getElementById(
              "invoiceItem"
            ).value.trim() ||
            "Service";


          const amount =
            Number(
              document.getElementById(
                "invoiceAmount"
              ).value
            ) || 0;


          document
            .getElementById(
              "invoiceResult"
            )
            .innerHTML = `

              <div class="invoice-preview">

                <div class="invoice-head">

                  <div>

                    <h2>
                      INVOICE
                    </h2>

                    <p>
                      ${escapeHTML(
                        business
                      )}
                    </p>

                  </div>

                  <div>

                    <p>
                      Date:
                      ${new Date().toLocaleDateString(
                        "en-IN"
                      )}
                    </p>

                  </div>

                </div>

                <br>

                <p>

                  <strong>
                    Bill To:
                  </strong>

                  ${escapeHTML(
                    customer
                  )}

                </p>

                <table class="invoice-items">

                  <thead>

                    <tr>

                      <th>
                        Description
                      </th>

                      <th>
                        Amount
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    <tr>

                      <td>
                        ${escapeHTML(
                          item
                        )}
                      </td>

                      <td>
                        ₹${formatNumber(
                          amount
                        )}
                      </td>

                    </tr>

                  </tbody>

                </table>

                <div class="invoice-total">

                  <div class="invoice-total-row final">

                    <span>
                      Total
                    </span>

                    <strong>
                      ₹${formatNumber(
                        amount
                      )}
                    </strong>

                  </div>

                </div>

                <br>

                <button
                  id="printInvoice"
                  class="primary-button"
                >
                  🖨️ Print / Save PDF
                </button>

              </div>

            `;


          document
            .getElementById(
              "printInvoice"
            )
            .addEventListener(
              "click",
              function () {

                printInvoice();

              }
            );

        }
      );

  }


  function printInvoice() {

    const invoice =
      document.querySelector(
        ".invoice-preview"
      );


    if (!invoice) {
      return;
    }


    const printWindow =
      window.open(
        "",
        "_blank"
      );


    if (!printWindow) {

      alert(
        "Please allow pop-ups for printing."
      );

      return;

    }


    printWindow.document.write(`

      <!DOCTYPE html>

      <html>

      <head>

        <title>
          Manjeet Digital Hub - Invoice
        </title>

        <style>

          body {
            font-family: Arial, sans-serif;
            padding: 30px;
          }

          button {
            display: none;
          }

          .invoice-head {
            display: flex;
            justify-content: space-between;
            border-bottom: 2px solid #111;
            padding-bottom: 15px;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
          }

          th,
          td {
            border-bottom: 1px solid #ddd;
            padding: 10px;
            text-align: left;
          }

          .invoice-total {
            margin-left: auto;
            width: 250px;
          }

          .invoice-total-row {
            display: flex;
            justify-content: space-between;
            padding: 10px;
            font-size: 18px;
            font-weight: bold;
          }

        </style>

      </head>

      <body>

        ${invoice.innerHTML}

      </body>

      </html>

    `);


    printWindow.document.close();

    printWindow.focus();


    setTimeout(
      function () {

        printWindow.print();

      },
      400
    );

  }


  /* =======================================================
     12. EMI CALCULATOR
     ======================================================= */

  function loadEMI() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-row">

          <div class="form-group">

            <label>
              Loan Amount (₹)
            </label>

            <input
              id="loanAmount"
              type="number"
              min="1"
              value="1000000"
            >

          </div>

          <div class="form-group">

            <label>
              Interest Rate (% per year)
            </label>

            <input
              id="interestRate"
              type="number"
              min="0"
              step="0.01"
              value="8.5"
            >

          </div>

        </div>

        <div class="form-group">

          <label>
            Loan Tenure (Years)
          </label>

          <input
            id="loanYears"
            type="number"
            min="1"
            value="20"
          >

        </div>

        <button
          id="emiButton"
          class="primary-button"
        >
          Calculate EMI
        </button>

        <div id="emiResult"></div>

      </div>

    `;


    document
      .getElementById(
        "emiButton"
      )
      .addEventListener(
        "click",
        function () {

          const principal =
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


          if (
            principal <= 0 ||
            years <= 0 ||
            annualRate < 0
          ) {

            alert(
              "Please enter valid values."
            );

            return;

          }


          const months =
            years * 12;


          const monthlyRate =
            annualRate /
            12 /
            100;


          let emi;


          if (
            monthlyRate === 0
          ) {

            emi =
              principal /
              months;

          } else {

            emi =
              principal *
              monthlyRate *
              Math.pow(
                1 + monthlyRate,
                months
              ) /
              (
                Math.pow(
                  1 + monthlyRate,
                  months
                ) - 1
              );

          }


          const totalPayment =
            emi * months;


          const totalInterest =
            totalPayment -
            principal;


          document
            .getElementById(
              "emiResult"
            )
            .innerHTML = `

              <div class="calculator-result">

                <div class="result-label">
                  Monthly EMI
                </div>

                <div class="main-value">
                  ₹${formatNumber(
                    emi
                  )}
                </div>

              </div>

              <div class="result-grid">

                <div class="result-item">

                  <span>
                    Principal
                  </span>

                  <strong>
                    ₹${formatNumber(
                      principal
                    )}
                  </strong>

                </div>

                <div class="result-item">

                  <span>
                    Total Interest
                  </span>

                  <strong>
                    ₹${formatNumber(
                      totalInterest
                    )}
                  </strong>

                </div>

                <div class="result-item">

                  <span>
                    Total Payment
                  </span>

                  <strong>
                    ₹${formatNumber(
                      totalPayment
                    )}
                  </strong>

                </div>

                <div class="result-item">

                  <span>
                    Tenure
                  </span>

                  <strong>
                    ${years} Years
                  </strong>

                </div>

              </div>

            `;

        }
      );

  }


  /* =======================================================
     13. GST CALCULATOR
     ======================================================= */

  function loadGST() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-row">

          <div class="form-group">

            <label>
              Amount (₹)
            </label>

            <input
              id="gstAmount"
              type="number"
              min="0"
              value="10000"
            >

          </div>

          <div class="form-group">

            <label>
              GST Rate (%)
            </label>

            <select id="gstRate">

              <option value="0">
                0%
              </option>

              <option value="5">
                5%
              </option>

              <option value="12">
                12%
              </option>

              <option
                value="18"
                selected
              >
                18%
              </option>

              <option value="28">
                28%
              </option>

            </select>

          </div>

        </div>

        <button
          id="gstButton"
          class="primary-button"
        >
          Calculate GST
        </button>

        <div id="gstResult"></div>

      </div>

    `;


    document
      .getElementById(
        "gstButton"
      )
      .addEventListener(
        "click",
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


          if (amount < 0) {

            alert(
              "Please enter a valid amount."
            );

            return;

          }


          const gst =
            amount *
            rate /
            100;


          const total =
            amount +
            gst;


          document
            .getElementById(
              "gstResult"
            )
            .innerHTML = `

              <div class="result-box">

                <h4>
                  GST Calculation
                </h4>

                <div class="result-grid">

                  <div class="result-item">

                    <span>
                      Amount
                    </span>

                    <strong>
                      ₹${formatNumber(
                        amount
                      )}
                    </strong>

                  </div>

                  <div class="result-item">

                    <span>
                      GST (${rate}%)
                    </span>

                    <strong>
                      ₹${formatNumber(
                        gst
                      )}
                    </strong>

                  </div>

                  <div class="result-item">

                    <span>
                      Final Total
                    </span>

                    <strong>
                      ₹${formatNumber(
                        total
                      )}
                    </strong>

                  </div>

                </div>

              </div>

            `;

        }
      );

  }


  /* =======================================================
     14. PERCENTAGE CALCULATOR
     ======================================================= */

  function loadPercentage() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-row">

          <div class="form-group">

            <label>
              Percentage (%)
            </label>

            <input
              id="percentValue"
              type="number"
              value="10"
            >

          </div>

          <div class="form-group">

            <label>
              Number
            </label>

            <input
              id="percentNumber"
              type="number"
              value="1000"
            >

          </div>

        </div>

        <button
          id="percentageButton"
          class="primary-button"
        >
          Calculate
        </button>

        <div id="percentageResult"></div>

      </div>

    `;


    document
      .getElementById(
        "percentageButton"
      )
      .addEventListener(
        "click",
        function () {

          const percent =
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
            percent *
            number /
            100;


          document
            .getElementById(
              "percentageResult"
            )
            .innerHTML = `

              <div class="calculator-result">

                <div class="result-label">
                  Result
                </div>

                <div class="main-value">
                  ${formatNumber(
                    result
                  )}
                </div>

                <p>
                  ${percent}% of
                  ${formatNumber(
                    number
                  )}
                </p>

              </div>

            `;

        }
      );

  }


  /* =======================================================
     15. AGE CALCULATOR
     ======================================================= */

  function loadAge() {

    toolContent.innerHTML = `

      <div class="tool-form">

        <div class="form-group">

          <label>
            Date of Birth
          </label>

          <input
            id="dob"
            type="date"
          >

        </div>

        <button
          id="ageButton"
          class="primary-button"
        >
          Calculate Age
        </button>

        <div id="ageResult"></div>

      </div>

    `;


    const dobInput =
      document.getElementById(
        "dob"
      );


    const today =
      new Date();


    dobInput.max =
      today
        .toISOString()
        .split("T")[0];


    document
      .getElementById(
        "ageButton"
      )
      .addEventListener(
        "click",
        function () {

          if (!dobInput.value) {

            alert(
              "Please select your date of birth."
            );

            return;

          }


          const dob =
            new Date(
              dobInput.value +
              "T00:00:00"
            );


          const now =
            new Date();


          if (dob > now) {

            alert(
              "Date of birth cannot be in the future."
            );

            return;

          }


          let years =
            now.getFullYear() -
            dob.getFullYear();


          let months =
            now.getMonth() -
            dob.getMonth();


          let days =
            now.getDate() -
            dob.getDate();


          if (days < 0) {

            months--;


            const previousMonth =
              new Date(
                now.getFullYear(),
                now.getMonth(),
                0
              );


            days +=
              previousMonth.getDate();

          }


          if (months < 0) {

            years--;

            months += 12;

          }


          document
            .getElementById(
              "ageResult"
            )
            .innerHTML = `

              <div class="calculator-result">

                <div class="result-label">
                  Your Exact Age
                </div>

                <div class="main-value">
                  ${years} Years
                </div>

                <p>
                  ${months} Months
                  and
                  ${days} Days
                </p>

              </div>

            `;

        }
      );

  }


  /* =======================================================
     SERVICE WORKER
     ======================================================= */

  if (
    "serviceWorker" in navigator
  ) {

    /*
      index.html already registers the
      service worker, so we don't register
      it again here.
    */

  }


  /* =======================================================
     CONSOLE
     ======================================================= */

  console.log(
    "Manjeet Digital Hub loaded successfully."
  );

});
