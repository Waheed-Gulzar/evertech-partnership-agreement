(function () {
  "use strict";

  const statusList = document.getElementById("statusList");
  const partnerSelect = document.getElementById("partnerSelect");
  const identityPicker = document.getElementById("identityPicker");
  const signSection = document.getElementById("signSection");
  const alreadySignedSection = document.getElementById("alreadySignedSection");
  const alreadySignedText = document.getElementById("alreadySignedText");
  const downloadSection = document.getElementById("downloadSection");
  const effectiveDateBanner = document.getElementById("effectiveDateBanner");
  const contractTextEl = document.getElementById("contractText");
  const formStatus = document.getElementById("formStatus");
  const cnicInput = document.getElementById("cnicInput");
  const addressInput = document.getElementById("addressInput");
  const saveBtn = document.getElementById("saveBtn");
  const downloadBtn = document.getElementById("downloadBtn");

  let signaturesCache = {}; // partnerId -> data
  let selectedPartnerId = localStorage.getItem("evertech_selected_partner") || "";

  // ---------- Populate partner dropdown ----------
  PARTNERS.forEach((p) => {
    const opt = document.createElement("option");
    opt.value = p.id;
    opt.textContent = p.name;
    partnerSelect.appendChild(opt);
  });
  if (selectedPartnerId) partnerSelect.value = selectedPartnerId;

  // ---------- Render contract text on page ----------
  function renderContractText() {
    contractTextEl.innerHTML = "";
    CONTRACT_ARTICLES.forEach((article) => {
      const h = document.createElement("h3");
      h.textContent = article.title;
      contractTextEl.appendChild(h);
      article.body.forEach((line) => {
        const p = document.createElement("p");
        p.textContent = line;
        contractTextEl.appendChild(p);
      });
    });
  }
  renderContractText();

  // ---------- Signature canvas ----------
  const canvas = document.getElementById("pad");
  const ctx = canvas.getContext("2d");
  let drawing = false, hasDrawn = false;

  function resizeCanvas() {
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * ratio;
    canvas.height = rect.height * ratio;
    ctx.scale(ratio, ratio);
    ctx.lineWidth = 2.2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#0E1626";
  }
  resizeCanvas();
  window.addEventListener("resize", () => {
    const data = hasDrawn ? canvas.toDataURL() : null;
    resizeCanvas();
    if (data) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0, canvas.getBoundingClientRect().width, canvas.getBoundingClientRect().height);
      img.src = data;
    }
  });

  function pos(e) {
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches[0]) return { x: e.touches[0].clientX - rect.left, y: e.touches[0].clientY - rect.top };
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  function start(e) { e.preventDefault(); drawing = true; hasDrawn = true; const p = pos(e); ctx.beginPath(); ctx.moveTo(p.x, p.y); }
  function move(e) { if (!drawing) return; e.preventDefault(); const p = pos(e); ctx.lineTo(p.x, p.y); ctx.stroke(); }
  function end() { drawing = false; }

  canvas.addEventListener("mousedown", start);
  canvas.addEventListener("mousemove", move);
  window.addEventListener("mouseup", end);
  canvas.addEventListener("touchstart", start, { passive: false });
  canvas.addEventListener("touchmove", move, { passive: false });
  canvas.addEventListener("touchend", end);

  document.getElementById("clearBtn").addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasDrawn = false;
    setFormStatus("", "");
  });

  function setFormStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = "status" + (type ? " " + type : "");
  }

  // ---------- Firestore real-time sync ----------
  db.collection("signatures").onSnapshot(
    (snap) => {
      signaturesCache = {};
      snap.forEach((doc) => { signaturesCache[doc.id] = doc.data(); });
      renderStatusBoard();
      renderSelectedPartnerView();
      checkAllSigned();
    },
    (err) => {
      statusList.innerHTML = '<div class="loading">Could not load signing status. Check your Firebase config.</div>';
      console.error(err);
    }
  );

  function fmtDate(ts) {
    if (!ts) return "";
    const d = ts.toDate ? ts.toDate() : new Date(ts);
    return d.toLocaleString();
  }

  function renderStatusBoard() {
    statusList.innerHTML = "";
    PARTNERS.forEach((p) => {
      const signed = !!signaturesCache[p.id];
      const row = document.createElement("div");
      row.className = "status-row";
      row.innerHTML = `
        <span class="pname">${p.name}</span>
        <span class="pstate ${signed ? "signed" : "pending"}">
          ${signed ? "Signed — " + fmtDate(signaturesCache[p.id].signedAt) : "Pending signature"}
        </span>`;
      statusList.appendChild(row);
    });
  }

  // ---------- Identity selection ----------
  partnerSelect.addEventListener("change", () => {
    selectedPartnerId = partnerSelect.value;
    localStorage.setItem("evertech_selected_partner", selectedPartnerId);
    renderSelectedPartnerView();
  });

  function renderSelectedPartnerView() {
    signSection.style.display = "none";
    alreadySignedSection.style.display = "none";

    if (!selectedPartnerId) return;

    const existing = signaturesCache[selectedPartnerId];
    if (existing) {
      alreadySignedSection.style.display = "block";
      alreadySignedText.textContent =
        `You signed this agreement on ${fmtDate(existing.signedAt)}. Your details are locked and cannot be changed.`;
    } else {
      signSection.style.display = "block";
    }
  }

  // ---------- Submit signature ----------
  saveBtn.addEventListener("click", async () => {
    if (!selectedPartnerId) {
      setFormStatus("Please select your name first.", "err");
      return;
    }
    const cnic = cnicInput.value.trim();
    const address = addressInput.value.trim();
    if (!cnic || !address) {
      setFormStatus("Please enter your CNIC and address.", "err");
      return;
    }
    if (!hasDrawn) {
      setFormStatus("Please draw your signature before submitting.", "err");
      return;
    }

    const partner = PARTNERS.find((p) => p.id === selectedPartnerId);
    saveBtn.disabled = true;
    setFormStatus("Submitting…", "");

    try {
      const dataUrl = canvas.toDataURL("image/png");
      await db.collection("signatures").doc(selectedPartnerId).set({
        name: partner.name,
        cnic: cnic,
        address: address,
        signatureDataUrl: dataUrl,
        signedAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setFormStatus("Signed successfully.", "ok");
    } catch (e) {
      console.error(e);
      if (e.code === "permission-denied") {
        setFormStatus("This name has already signed, or the submission was rejected. Refresh and check status above.", "err");
      } else {
        setFormStatus("Submission failed — please try again.", "err");
      }
    } finally {
      saveBtn.disabled = false;
    }
  });

  // ---------- Check completion ----------
  function checkAllSigned() {
    const allSigned = PARTNERS.every((p) => !!signaturesCache[p.id]);
    if (allSigned) {
      const dates = PARTNERS.map((p) => signaturesCache[p.id].signedAt.toDate());
      const effectiveDate = new Date(Math.max(...dates.map((d) => d.getTime())));
      effectiveDateBanner.style.display = "block";
      effectiveDateBanner.innerHTML =
        `<strong>All 4 partners have signed.</strong> Effective Date: ${effectiveDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}`;
      downloadSection.style.display = "block";
      identityPicker.style.display = "none";
      signSection.style.display = "none";
      alreadySignedSection.style.display = "none";
    } else {
      effectiveDateBanner.style.display = "none";
      downloadSection.style.display = "none";
      identityPicker.style.display = "block";
    }
  }

  // ---------- PDF generation ----------
  downloadBtn.addEventListener("click", generatePdf);

  function generatePdf() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit: "pt", format: "a4" });
    const marginLeft = 56, marginRight = 56, pageWidth = 595.28, pageHeight = 841.89;
    const usableWidth = pageWidth - marginLeft - marginRight;
    let y = 70;

    const dates = PARTNERS.map((p) => signaturesCache[p.id].signedAt.toDate());
    const effectiveDate = new Date(Math.max(...dates.map((d) => d.getTime())));
    const effectiveDateStr = effectiveDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" });

    function ensureSpace(neededHeight) {
      if (y + neededHeight > pageHeight - 60) {
        doc.addPage();
        y = 60;
      }
    }
    function addHeading(text, size) {
      ensureSpace(30);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(size);
      doc.setTextColor(20, 30, 45);
      doc.text(text, marginLeft, y);
      y += size * 0.9;
    }
    function addParagraph(text, opts) {
      opts = opts || {};
      doc.setFont("helvetica", opts.bold ? "bold" : "normal");
      doc.setFontSize(opts.size || 10.5);
      doc.setTextColor(40, 40, 40);
      const lines = doc.splitTextToSize(text, usableWidth);
      lines.forEach((line) => {
        ensureSpace(16);
        doc.text(line, marginLeft, y);
        y += 14;
      });
      y += opts.spacingAfter != null ? opts.spacingAfter : 6;
    }

    // Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(90, 100, 115);
    doc.text("EVERTECH", marginLeft, y);
    y += 20;
    doc.setFontSize(20);
    doc.setTextColor(14, 22, 38);
    doc.text("Partnership & Profit-Sharing Agreement", marginLeft, y);
    y += 30;

    addParagraph(
      `This Partnership & Profit-Sharing Agreement ("Agreement") became effective on ${effectiveDateStr} (the "Effective Date"), the date on which the last of the four Partners named below completed their electronic signature, by and among the following individuals (each a "Partner" and collectively the "Partners"), in relation to the business operating under the name EverTech, including its website evertech.live (the "Company"):`,
      { spacingAfter: 12 }
    );

    // Partner table
    PARTNERS.forEach((p) => {
      const sig = signaturesCache[p.id];
      addParagraph(`${p.name}  —  CNIC: ${sig.cnic}  —  Address: ${sig.address}`, { bold: true, size: 10, spacingAfter: 4 });
    });
    y += 10;

    addParagraph(
      "WHEREAS, the Partners have jointly established and intend to grow the Company through their combined skills, labor, and financial contributions; and the Partners intend for this Agreement, and the Company's operations generally, to be conducted in a manner consistent with Islamic commercial principles (Shariah);",
      { spacingAfter: 4 }
    );
    addParagraph("NOW, THEREFORE, in consideration of the mutual covenants contained herein, the Partners agree as follows:", { spacingAfter: 14 });

    // Articles
    CONTRACT_ARTICLES.forEach((article) => {
      addHeading(article.title, 12.5);
      y += 2;
      article.body.forEach((line) => addParagraph(line, { spacingAfter: 6 }));
      y += 6;
    });

    // Schedule A
    doc.addPage(); y = 60;
    addHeading("Schedule A — Initial Capital Contributions", 14);
    addParagraph(
      "As of the Effective Date, no Partner has contributed any Initial Investment toward the Company. Should any Partner contribute capital in the future, this Schedule shall be updated in writing and signed by all Partners, in accordance with Article 3.2.",
      { spacingAfter: 20 }
    );

    // Signatures page
    doc.addPage(); y = 60;
    addHeading("Signatures", 14);
    addParagraph("Each Partner below executed this Agreement electronically. Signing dates were recorded automatically by the system at the time of signing and cannot be altered.", { spacingAfter: 20 });

    PARTNERS.forEach((p) => {
      const sig = signaturesCache[p.id];
      ensureSpace(120);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(14, 22, 38);
      doc.text(p.name, marginLeft, y);
      y += 6;

      try {
        doc.addImage(sig.signatureDataUrl, "PNG", marginLeft, y, 160, 60);
      } catch (e) {
        console.warn("Could not embed signature image for", p.name, e);
      }
      y += 68;

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9.5);
      doc.setTextColor(90, 100, 115);
      doc.text(`Signed: ${fmtDate(sig.signedAt)}`, marginLeft, y);
      y += 12;
      doc.text(`CNIC: ${sig.cnic}`, marginLeft, y);
      y += 12;
      doc.text(`Address: ${sig.address}`, marginLeft, y);
      y += 28;
    });

    doc.save("EverTech-Partnership-Agreement-Signed.pdf");
  }
})();
