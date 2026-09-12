/* =========================================================
   SCHOOL ID CARD MAKER
   Ready-Made Templates + Custom Design
   ========================================================= */

function loadSchoolID() {

  const box = document.getElementById("toolContent");

  box.innerHTML = `
    ${toolCSS()}

    <style>
      .sid-wrap{
        display:grid;
        gap:14px;
      }

      .sid-section{
        background:#fff;
        border:1px solid #e5e7eb;
        border-radius:14px;
        padding:14px;
      }

      .sid-section h3{
        margin:0 0 12px;
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
        color:#374151;
      }

      .sid-field input,
      .sid-field textarea,
      .sid-field select{
        width:100%;
        box-sizing:border-box;
        border:1px solid #d1d5db;
        border-radius:9px;
        padding:9px 10px;
        font-size:13px;
        outline:none;
        background:#fff;
      }

      .sid-field textarea{
        min-height:65px;
        resize:vertical;
      }

      .sid-field input:focus,
      .sid-field textarea:focus,
      .sid-field select:focus{
        border-color:#2563eb;
      }

      .sid-templates{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:7px;
      }

      .sid-template{
        border:2px solid #e5e7eb;
        border-radius:10px;
        padding:8px 5px;
        background:#fff;
        cursor:pointer;
        text-align:center;
        font-size:11px;
        font-weight:700;
      }

      .sid-template.active{
        border-color:#2563eb;
        background:#eff6ff;
      }

      .sid-swatch{
        height:30px;
        border-radius:6px;
        margin-bottom:5px;
      }

      .sid-upload{
        border:1.5px dashed #cbd5e1;
        border-radius:10px;
        padding:10px;
        text-align:center;
        cursor:pointer;
        background:#f8fafc;
        font-size:12px;
      }

      .sid-upload input{
        display:none;
      }

      .sid-preview{
        background:#f1f5f9;
        border-radius:14px;
        padding:12px;
        overflow:auto;
      }

      .sid-preview-title{
        font-size:12px;
        font-weight:800;
        margin-bottom:8px;
      }

      .sid-cards{
        display:flex;
        gap:12px;
        min-width:max-content;
        justify-content:center;
      }

      .sid-card{
        width:360px;
        height:225px;
        flex:none;
        position:relative;
        overflow:hidden;
        border-radius:12px;
        box-shadow:0 5px 18px rgba(0,0,0,.16);
        background:#fff;
        font-family:Arial,sans-serif;
      }

      .sid-front-header{
        height:65px;
        color:#fff;
        padding:9px 12px;
        box-sizing:border-box;
        display:flex;
        align-items:center;
        gap:9px;
      }

      .sid-logo{
        width:43px;
        height:43px;
        object-fit:cover;
        border-radius:50%;
        background:#fff;
        padding:2px;
        box-sizing:border-box;
      }

      .sid-school{
        font-size:15px;
        font-weight:900;
        line-height:1.05;
      }

      .sid-sub{
        font-size:9px;
        margin-top:3px;
        opacity:.9;
      }

      .sid-front-body{
        display:flex;
        gap:12px;
        padding:13px;
      }

      .sid-photo{
        width:82px;
        height:100px;
        object-fit:cover;
        border-radius:7px;
        border:3px solid #fff;
        box-shadow:0 1px 5px rgba(0,0,0,.2);
        background:#e5e7eb;
      }

      .sid-details{
        flex:1;
        font-size:10px;
        line-height:1.55;
      }

      .sid-name{
        font-size:15px;
        font-weight:900;
        margin-bottom:5px;
      }

      .sid-row b{
        display:inline-block;
        width:65px;
      }

      .sid-footer{
        position:absolute;
        bottom:0;
        left:0;
        right:0;
        height:25px;
        color:#fff;
        font-size:9px;
        display:flex;
        align-items:center;
        justify-content:center;
        font-weight:700;
      }

      .sid-back{
        padding:15px;
        box-sizing:border-box;
      }

      .sid-back h2{
        margin:0 0 12px;
        font-size:15px;
      }

      .sid-back p{
        font-size:10px;
        line-height:1.5;
        margin:6px 0;
      }

      .sid-sign{
        display:flex;
        justify-content:space-between;
        margin-top:35px;
        font-size:9px;
        text-align:center;
      }

      .sid-sign div{
        width:90px;
        border-top:1px solid #333;
        padding-top:4px;
      }

      .sid-custom{
        display:none;
      }

      .sid-custom.show{
        display:block;
      }

      .sid-color-row{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:9px;
      }

      .sid-color-row input{
        height:42px;
        padding:3px;
      }

      .sid-buttons{
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:8px;
      }

      .sid-btn{
        border:0;
        border-radius:10px;
        padding:11px 8px;
        font-size:12px;
        font-weight:800;
        cursor:pointer;
      }

      .sid-primary{
        background:#2563eb;
        color:#fff;
      }

      .sid-secondary{
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

        .sid-front-header{
          height:54px;
        }

        .sid-logo{
          width:35px;
          height:35px;
        }

        .sid-school{
          font-size:12px;
        }

        .sid-photo{
          width:68px;
          height:84px;
        }

        .sid-name{
          font-size:12px;
        }

        .sid-details{
          font-size:8px;
        }

        .sid-front-body{
          padding:10px;
          gap:8px;
        }

        .sid-footer{
          height:21px;
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

        .sid-templates{
          grid-template-columns:repeat(3,1fr);
        }
      }
    </style>

    <div class="sid-wrap">

      <!-- TEMPLATE -->
      <div class="sid-section">

        <h3>🎨 Choose ID Card Template</h3>

        <div class="sid-templates">

          <div class="sid-template active" data-template="blue">
            <div class="sid-swatch" style="background:#2563eb"></div>
            Classic Blue
          </div>

          <div class="sid-template" data-template="purple">
            <div class="sid-swatch" style="background:#7c3aed"></div>
            Modern Purple
          </div>

          <div class="sid-template" data-template="green">
            <div class="sid-swatch" style="background:#059669"></div>
            Green School
          </div>

          <div class="sid-template" data-template="red">
            <div class="sid-swatch" style="background:#dc2626"></div>
            Red Premium
          </div>

          <div class="sid-template" data-template="navy">
            <div class="sid-swatch" style="background:#0f172a"></div>
            Corporate
          </div>

          <div class="sid-template" data-template="custom">
            <div class="sid-swatch" style="background:linear-gradient(135deg,#f97316,#ec4899)"></div>
            🎨 Custom
          </div>

        </div>

      </div>


      <!-- SCHOOL DETAILS -->

      <div class="sid-section">

        <h3>🏫 School Details</h3>

        <div class="sid-grid">

          <div class="sid-field full">
            <label>School Name</label>
            <input id="sidSchool" value="ABC PUBLIC SCHOOL">
          </div>

          <div class="sid-field">
            <label>Session</label>
            <input id="sidSession" value="2026 - 2027">
          </div>

          <div class="sid-field">
            <label>School Contact</label>
            <input id="sidSchoolPhone" value="9876543210">
          </div>

          <div class="sid-field full">
            <label>School Address</label>
            <textarea id="sidSchoolAddress">Lucknow, Uttar Pradesh</textarea>
          </div>

        </div>

      </div>


      <!-- STUDENT DETAILS -->

      <div class="sid-section">

        <h3>👨‍🎓 Student Details</h3>

        <div class="sid-grid">

          <div class="sid-field full">
            <label>Student Name</label>
            <input id="sidName" value="Rahul Sharma">
          </div>

          <div class="sid-field">
            <label>Class</label>
            <input id="sidClass" value="10">
          </div>

          <div class="sid-field">
            <label>Section</label>
            <input id="sidSection" value="A">
          </div>

          <div class="sid-field">
            <label>Roll No.</label>
            <input id="sidRoll" value="101">
          </div>

          <div class="sid-field">
            <label>DOB</label>
            <input id="sidDOB" type="date">
          </div>

          <div class="sid-field">
            <label>Blood Group</label>
            <input id="sidBlood" value="O+">
          </div>

          <div class="sid-field">
            <label>Contact</label>
            <input id="sidContact" value="9876543210">
          </div>

          <div class="sid-field full">
            <label>Student Address</label>
            <textarea id="sidAddress">Lucknow, Uttar Pradesh</textarea>
          </div>

        </div>

      </div>


      <!-- UPLOADS -->

      <div class="sid-section">

        <h3>📷 Photos & Logo</h3>

        <div class="sid-grid">

          <label class="sid-upload">
            🏫 Upload School Logo
            <input id="sidLogoInput" type="file" accept="image/*">
          </label>

          <label class="sid-upload">
            👨‍🎓 Upload Student Photo
            <input id="sidPhotoInput" type="file" accept="image/*">
          </label>

        </div>

      </div>


      <!-- CUSTOM -->

      <div id="sidCustomBox" class="sid-section sid-custom">

        <h3>🎨 Custom Design</h3>

        <div class="sid-color-row">

          <div class="sid-field">
            <label>Header Color</label>
            <input id="sidHeaderColor" type="color" value="#2563eb">
          </div>

          <div class="sid-field">
            <label>Footer Color</label>
            <input id="sidFooterColor" type="color" value="#1d4ed8">
          </div>

          <div class="sid-field">
            <label>Card Background</label>
            <input id="sidBgColor" type="color" value="#ffffff">
          </div>

          <div class="sid-field">
            <label>Accent Color</label>
            <input id="sidAccentColor" type="color" value="#2563eb">
          </div>

        </div>

      </div>


      <!-- PREVIEW -->

      <div class="sid-section">

        <h3>👀 ID Card Preview</h3>

        <div class="sid-preview">

          <div class="sid-preview-title">
            Front + Back
          </div>

          <div class="sid-cards">

            <!-- FRONT -->

            <div id="sidFront" class="sid-card">

              <div id="sidFrontHeader" class="sid-front-header">

                <img id="sidLogoPreview"
                     class="sid-logo"
                     src=""
                     alt="Logo">

                <div>
                  <div id="sidSchoolPreview" class="sid-school">
                    ABC PUBLIC SCHOOL
                  </div>

                  <div id="sidSessionPreview" class="sid-sub">
                    Session 2026 - 2027
                  </div>
                </div>

              </div>

              <div class="sid-front-body">

                <img id="sidPhotoPreview"
                     class="sid-photo"
                     src=""
                     alt="Student">

                <div class="sid-details">

                  <div id="sidNamePreview" class="sid-name">
                    Rahul Sharma
                  </div>

                  <div class="sid-row">
                    <b>Class</b>
                    <span id="sidClassPreview">10 - A</span>
                  </div>

                  <div class="sid-row">
                    <b>Roll No.</b>
                    <span id="sidRollPreview">101</span>
                  </div>

                  <div class="sid-row">
                    <b>DOB</b>
                    <span id="sidDOBPreview">--</span>
                  </div>

                  <div class="sid-row">
                    <b>Blood</b>
                    <span id="sidBloodPreview">O+</span>
                  </div>

                  <div class="sid-row">
                    <b>Contact</b>
                    <span id="sidContactPreview">9876543210</span>
                  </div>

                </div>

              </div>

              <div id="sidFrontFooter"
                   class="sid-footer">
                STUDENT ID CARD
              </div>

            </div>


            <!-- BACK -->

            <div id="sidBack" class="sid-card">

              <div class="sid-back">

                <h2 id="sidBackTitle">
                  ABC PUBLIC SCHOOL
                </h2>

                <p>
                  <b>Address:</b>
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
                  <b>Student Address:</b>
                  <span id="sidStudentAddressPreview">
                    Lucknow, Uttar Pradesh
                  </span>
                </p>

                <p>
                  This identity card is the property of the school.
                  If found, please return it to the school office.
                </p>

                <div class="sid-sign">

                  <div>
                    Student
                  </div>

                  <div>
                    Principal
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>


      <!-- BUTTONS -->

      <div class="sid-section">

        <div class="sid-buttons">

          <button id="sidDownloadFront"
                  class="sid-btn sid-primary">
            📥 Front PNG
          </button>

          <button id="sidDownloadBack"
                  class="sid-btn sid-secondary">
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


  /* ---------------------------------------------------------
     STATE
     --------------------------------------------------------- */

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


  /* ---------------------------------------------------------
     HELPERS
     --------------------------------------------------------- */

  function get(id){
    return document.getElementById(id);
  }


  function val(id){
    return get(id).value || "";
  }


  function formatDate(date){

    if(!date) return "--";

    const d = new Date(date);

    if(isNaN(d.getTime())) return date;

    return String(d.getDate()).padStart(2,"0") +
      "/" +
      String(d.getMonth()+1).padStart(2,"0") +
      "/" +
      d.getFullYear();

  }


  function placeholderSVG(text){

    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg"
           width="300"
           height="350">

        <rect width="100%"
              height="100%"
              fill="#e5e7eb"/>

        <circle cx="150"
                cy="125"
                r="55"
                fill="#cbd5e1"/>

        <rect x="70"
              y="205"
              width="160"
              height="95"
              rx="50"
              fill="#cbd5e1"/>

        <text x="150"
              y="330"
              text-anchor="middle"
              font-family="Arial"
              font-size="18"
              fill="#64748b">
          ${text}
        </text>

      </svg>
    `;

    return "data:image/svg+xml;charset=UTF-8," +
      encodeURIComponent(svg);
  }


  get("sidLogoPreview").src = placeholderSVG("SCHOOL LOGO");
  get("sidPhotoPreview").src = placeholderSVG("PHOTO");


  /* ---------------------------------------------------------
     TEMPLATE SELECT
     --------------------------------------------------------- */

  document.querySelectorAll(".sid-template").forEach(function(card){

    card.addEventListener("click", function(){

      document.querySelectorAll(".sid-template")
        .forEach(x => x.classList.remove("active"));

      card.classList.add("active");

      currentTemplate = card.dataset.template;

      if(currentTemplate === "custom"){

        get("sidCustomBox").classList.add("show");

      }else{

        get("sidCustomBox").classList.remove("show");

        applyTemplate(templates[currentTemplate]);

      }

      updatePreview();

    });

  });


  function applyTemplate(t){

    get("sidFrontHeader").style.background = t.header;
    get("sidFrontFooter").style.background = t.footer;

    get("sidFront").style.background = t.bg;
    get("sidBack").style.background = t.bg;

    get("sidNamePreview").style.color = t.accent;
    get("sidBackTitle").style.color = t.accent;

  }


  function applyCustom(){

    applyTemplate({

      header:val("sidHeaderColor"),
      footer:val("sidFooterColor"),
      bg:val("sidBgColor"),
      accent:val("sidAccentColor")

    });

  }


  /* ---------------------------------------------------------
     UPDATE PREVIEW
     --------------------------------------------------------- */

  function updatePreview(){

    if(currentTemplate === "custom"){
      applyCustom();
    }

    get("sidSchoolPreview").textContent =
      val("sidSchool") || "SCHOOL NAME";

    get("sidSessionPreview").textContent =
      "Session " + (val("sidSession") || "2026 - 2027");

    get("sidNamePreview").textContent =
      val("sidName") || "Student Name";

    get("sidClassPreview").textContent =
      (val("sidClass") || "--") +
      " - " +
      (val("sidSection") || "--");

    get("sidRollPreview").textContent =
      val("sidRoll") || "--";

    get("sidDOBPreview").textContent =
      formatDate(val("sidDOB"));

    get("sidBloodPreview").textContent =
      val("sidBlood") || "--";

    get("sidContactPreview").textContent =
      val("sidContact") || "--";

    get("sidBackTitle").textContent =
      val("sidSchool") || "SCHOOL NAME";

    get("sidAddressPreview").textContent =
      val("sidSchoolAddress") || "--";

    get("sidSchoolPhonePreview").textContent =
      val("sidSchoolPhone") || "--";

    get("sidStudentAddressPreview").textContent =
      val("sidAddress") || "--";

  }


  /* ---------------------------------------------------------
     INPUT EVENTS
     --------------------------------------------------------- */

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

    get(id).addEventListener("input", updatePreview);

  });


  [
    "sidHeaderColor",
    "sidFooterColor",
    "sidBgColor",
    "sidAccentColor"
  ].forEach(function(id){

    get(id).addEventListener("input", function(){

      currentTemplate = "custom";

      document.querySelectorAll(".sid-template")
        .forEach(x => x.classList.remove("active"));

      document.querySelector(
        '.sid-template[data-template="custom"]'
      ).classList.add("active");

      get("sidCustomBox").classList.add("show");

      updatePreview();

    });

  });


  /* ---------------------------------------------------------
     IMAGE UPLOAD
     --------------------------------------------------------- */

  get("sidLogoInput").addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

      logoImage = new Image();

      logoImage.onload = function(){

        get("sidLogoPreview").src =
          event.target.result;

      };

      logoImage.src =
        event.target.result;

    };

    reader.readAsDataURL(file);

  });


  get("sidPhotoInput").addEventListener("change", function(e){

    const file = e.target.files[0];

    if(!file) return;

    const reader = new FileReader();

    reader.onload = function(event){

      studentImage = new Image();

      studentImage.onload = function(){

        get("sidPhotoPreview").src =
          event.target.result;

      };

      studentImage.src =
        event.target.result;

    };

    reader.readAsDataURL(file);

  });


  /* ---------------------------------------------------------
     CANVAS CARD RENDERER
     --------------------------------------------------------- */

  function createCardCanvas(side){

    const canvas =
      document.createElement("canvas");

    canvas.width = 1011;
    canvas.height = 638;

    const ctx =
      canvas.getContext("2d");

    let theme;

    if(currentTemplate === "custom"){

      theme = {
        header:val("sidHeaderColor"),
        footer:val("sidFooterColor"),
        bg:val("sidBgColor"),
        accent:val("sidAccentColor")
      };

    }else{

      theme = templates[currentTemplate];

    }


    /* BACKGROUND */

    ctx.fillStyle = theme.bg;
    ctx.fillRect(0,0,1011,638);


    /* FRONT */

    if(side === "front"){

      ctx.fillStyle = theme.header;
      ctx.fillRect(0,0,1011,185);


      /* LOGO */

      if(logoImage){

        ctx.save();

        ctx.beginPath();
        ctx.arc(95,92,58,0,Math.PI*2);
        ctx.clip();

        drawContain(
          ctx,
          logoImage,
          37,
          34,
          116,
          116
        );

        ctx.restore();

      }else{

        ctx.fillStyle="#fff";
        ctx.beginPath();
        ctx.arc(95,92,58,0,Math.PI*2);
        ctx.fill();

        ctx.fillStyle=theme.header;
        ctx.font="bold 22px Arial";
        ctx.textAlign="center";
        ctx.fillText("LOGO",95,100);

      }


      /* SCHOOL */

      ctx.fillStyle="#fff";
      ctx.textAlign="left";
      ctx.font="bold 38px Arial";

      ctx.fillText(
        val("sidSchool") || "SCHOOL NAME",
        180,
        78
      );

      ctx.font="22px Arial";

      ctx.fillText(
        "Session " +
        (val("sidSession") || "2026 - 2027"),
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

        ctx.fillStyle="#e5e7eb";
        ctx.fillRect(
          55,225,220,285
        );

        ctx.fillStyle="#64748b";
        ctx.textAlign="center";
        ctx.font="bold 28px Arial";

        ctx.fillText(
          "STUDENT PHOTO",
          165,
          375
        );

      }


      /* STUDENT NAME */

      ctx.textAlign="left";
      ctx.fillStyle=theme.accent;
      ctx.font="bold 42px Arial";

      ctx.fillText(
        val("sidName") || "STUDENT NAME",
        315,
        270
      );


      ctx.fillStyle="#222";
      ctx.font="24px Arial";

      const rows = [

        ["Class", val("sidClass") + " - " + val("sidSection")],
        ["Roll No.", val("sidRoll")],
        ["DOB", formatDate(val("sidDOB"))],
        ["Blood", val("sidBlood")],
        ["Contact", val("sidContact")]

      ];

      let y = 330;

      rows.forEach(function(row){

        ctx.font="bold 23px Arial";
        ctx.fillText(row[0],315,y);

        ctx.font="23px Arial";
        ctx.fillText(
          ": " + (row[1] || "--"),
          455,
          y
        );

        y += 45;

      });


      /* FOOTER */

      ctx.fillStyle=theme.footer;
      ctx.fillRect(
        0,
        590,
        1011,
        48
      );

      ctx.fillStyle="#fff";
      ctx.textAlign="center";
      ctx.font="bold 21px Arial";

      ctx.fillText(
        "STUDENT ID CARD",
        505,
        621
      );


    }else{

      /* BACK */

      ctx.fillStyle=theme.header;
      ctx.fillRect(
        0,
        0,
        1011,
        120
      );

      ctx.fillStyle="#fff";
      ctx.textAlign="center";
      ctx.font="bold 38px Arial";

      ctx.fillText(
        val("sidSchool") || "SCHOOL NAME",
        505,
        70
      );

      ctx.fillStyle=theme.accent;
      ctx.textAlign="left";
      ctx.font="bold 28px Arial";

      ctx.fillText(
        "School Information",
        70,
        180
      );

      ctx.fillStyle="#222";
      ctx.font="23px Arial";

      let y = 230;

      const lines = [

        "Address: " +
          (val("sidSchoolAddress") || "--"),

        "School Contact: " +
          (val("sidSchoolPhone") || "--"),

        "Student Address: " +
          (val("sidAddress") || "--")

      ];

      lines.forEach(function(text){

        const wrapped =
          wrapText(ctx,text,70,1011-70,24);

        wrapped.forEach(function(line){

          ctx.fillText(
            line,
            70,
            y
          );

          y += 34;

        });

        y += 10;

      });


      ctx.font="21px Arial";

      const note =
        "This identity card is the property of the school. " +
        "If found, please return it to the school office.";

      wrapText(
        ctx,
        note,
        70,
        900,
        21
      ).forEach(function(line){

        ctx.fillText(
          line,
          70,
          y
        );

        y += 30;

      });


      ctx.strokeStyle="#333";

      ctx.beginPath();
      ctx.moveTo(120,550);
      ctx.lineTo(330,550);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(680,550);
      ctx.lineTo(890,550);
      ctx.stroke();

      ctx.textAlign="center";
      ctx.font="18px Arial";

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


  function drawContain(ctx,img,x,y,w,h){

    const ratio =
      Math.min(
        w/img.width,
        h/img.height
      );

    const nw = img.width * ratio;
    const nh = img.height * ratio;

    ctx.drawImage(
      img,
      x+(w-nw)/2,
      y+(h-nh)/2,
      nw,
      nh
    );

  }


  function drawCover(ctx,img,x,y,w,h){

    const ratio =
      Math.max(
        w/img.width,
        h/img.height
      );

    const nw = img.width * ratio;
    const nh = img.height * ratio;

    const dx =
      x+(w-nw)/2;

    const dy =
      y+(h-nh)/2;

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
      dx,
      dy,
      nw,
      nh
    );

    ctx.restore();

  }


  function wrapText(ctx,text,x,maxWidth,lineHeight){

    const words =
      String(text).split(" ");

    const lines = [];
    let line = "";

    words.forEach(function(word){

      const test =
        line ? line + " " + word : word;

      if(
        ctx.measureText(test).width >
        maxWidth - x
      ){

        lines.push(line);
        line = word;

      }else{

        line = test;

      }

    });

    if(line) lines.push(line);

    return lines;

  }


  /* ---------------------------------------------------------
     DOWNLOAD
     --------------------------------------------------------- */

  function downloadCanvas(canvas,name){

    canvas.toBlob(function(blob){

      if(!blob) return;

      downloadBlob(
        blob,
        name
      );

    },"image/png");

  }


  get("sidDownloadFront")
    .addEventListener("click",function(){

      downloadCanvas(
        createCardCanvas("front"),
        "school-id-front.png"
      );

    });


  get("sidDownloadBack")
    .addEventListener("click",function(){

      downloadCanvas(
        createCardCanvas("back"),
        "school-id-back.png"
      );

    });


  /* ---------------------------------------------------------
     A4 SHEET
     8 CARDS = 2 x 4
     --------------------------------------------------------- */

  function createA4Sheet(side){

    const canvas =
      document.createElement("canvas");

    canvas.width = 2480;
    canvas.height = 3508;

    const ctx =
      canvas.getContext("2d");

    ctx.fillStyle="#ffffff";
    ctx.fillRect(
      0,
      0,
      canvas.width,
      canvas.height
    );

    const card =
      createCardCanvas(side);

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


  get("sidA4Front")
    .addEventListener("click",function(){

      downloadCanvas(
        createA4Sheet("front"),
        "school-id-a4-front-sheet.png"
      );

    });


  get("sidA4Back")
    .addEventListener("click",function(){

      downloadCanvas(
        createA4Sheet("back"),
        "school-id-a4-back-sheet.png"
      );

    });


  /* INITIAL */

  applyTemplate(templates.blue);
  updatePreview();

}
