// Toggle between Upload and Paste mode for each panel
function toggleMode(panel, mode) {

  // Get the upload zone and textarea for the specified panel
  const uploadZone = document.getElementById(panel + '-upload');
  const pasteZone = document.getElementById(panel + '-paste');
  
  // Get the Upload and Paste buttons for the specified panel
  const uploadBtn = document.getElementById(panel + '-upload-btn');
  const pasteBtn = document.getElementById(panel + '-paste-btn');

  // Show upload zone if mode is 'upload', hide if 'paste'
  uploadZone.style.display = mode === 'upload' ? 'flex' : 'none';
  
  // Show textarea if mode is 'paste', hide if 'upload'
  pasteZone.style.display = mode === 'paste' ? 'block' : 'none';

  // Add 'active' class to upload button if mode is 'upload', remove if not
  uploadBtn.classList.toggle('active', mode === 'upload');
  
  // Add 'active' class to paste button if mode is 'paste', remove if not
  pasteBtn.classList.toggle('active', mode === 'paste');
}


// When JD Upload button is clicked, show upload zone for JD panel
document.getElementById('jd-upload-btn').addEventListener('click', () => toggleMode('jd', 'upload'));

// When JD Paste button is clicked, show textarea for JD panel
document.getElementById('jd-paste-btn').addEventListener('click', () => toggleMode('jd', 'paste'));

// When Resume Upload button is clicked, show upload zone for Resume panel
document.getElementById('resume-upload-btn').addEventListener('click', () => toggleMode('resume', 'upload'));

// When Resume Paste button is clicked, show textarea for Resume panel
document.getElementById('resume-paste-btn').addEventListener('click', () => toggleMode('resume', 'paste'));


// Show results section when Click Analyze
document.getElementById('analyze-btn').addEventListener('click', function() {
  document.getElementById('results').style.display = 'block';
});


// Download results as PDF
document.getElementById('download-pdf').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  let y = 20; // start 20mm from top of doc

  // Title
  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Resume / JD Analyzer Report', 20, y); // draw Start 20mm from the left, y mm from the top, A standard PDF page is 210mm wide. Starting at 20mm gives you a left margin.
  y += 15;                                        // move down 15mm

  // Match Score
  doc.setFontSize(14);
  doc.text('Match Score: ' + document.getElementById('score-num').innerText + '%', 20, y);
  y += 20;

  // Matched Keywords
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('a. Matched Keywords', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const keywords = [...document.querySelectorAll('#matched-keywords .ktag')].map(el => el.innerText).join(', ');
  doc.text(keywords || 'None', 20, y);
  y += 12;

  // Gaps
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('b. Gaps', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const gaps = [...document.querySelectorAll('#gaps .ktag')].map(el => el.innerText).join(', ');
  doc.text(gaps || 'None', 20, y);
  y += 12;

  // Suggestions
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('c. Suggestions', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const suggestions = [...document.querySelectorAll('#suggestions li')].map(el => el.innerText).join('\n');
  const suggText = doc.splitTextToSize(suggestions || 'None', 170);
  doc.text(suggText, 20, y);
  y += suggText.length * 6 + 12;

  // Cover Letter
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Cover Letter', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const coverText = doc.splitTextToSize(document.getElementById('cover-letter').innerText, 170);
  doc.text(coverText, 20, y);
  y += coverText.length * 6 + 15;


// Helper function to add new page if needed
  function checkPageBreak(doc, y, lineHeight) {
    if (y + lineHeight > 280) {
      doc.addPage();
      return 20;
    }
    return y;
  }

  // Resume Rewriter - Main Header
  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Resume Rewriter', 20, y);
  y += 12;

  // Professional Summary
  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('1. Professional Summary', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const summaryText = doc.splitTextToSize(document.getElementById('rewrite-summary').innerText, 170);
  doc.text(summaryText, 20, y);
  y += summaryText.length * 6 + 10;

  // Key Achievements
  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('2. Key Achievements', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const achieveText = doc.splitTextToSize(document.getElementById('rewrite-achievements').innerText, 170);
  doc.text(achieveText, 20, y);
  y += achieveText.length * 6 + 10;

  // Work Experience
  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('3. Work Experience', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const experienceText = doc.splitTextToSize(document.getElementById('rewrite-experience').innerText, 170);
  doc.text(experienceText, 20, y);
  y += experienceText.length * 6 + 10;

  // Skills
  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('4. Skills', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const skillsText = doc.splitTextToSize(document.getElementById('rewrite-skills').innerText, 170);
  doc.text(skillsText, 20, y);
  y += skillsText.length * 6 + 10;

  // Education
  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('5. Education', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const educationText = doc.splitTextToSize(document.getElementById('rewrite-education').innerText, 170);
  doc.text(educationText, 20, y);

  // Save
  doc.save('resume-jd-analysis.pdf');
});


// Copy Cover Letter
document.getElementById('copy-cover').addEventListener('click', function() {
  const text = document.getElementById('cover-letter').innerText;
  navigator.clipboard.writeText(text);
  this.innerText = 'Copied!';
  setTimeout(() => this.innerText = 'Copy', 2000);
});

// Copy Resume Rewriter
document.getElementById('copy-resume').addEventListener('click', function() {
  const sections = [
    'Professional Summary\n' + document.getElementById('rewrite-summary').innerText,
    'Key Achievements\n' + document.getElementById('rewrite-achievements').innerText,
    'Work Experience\n' + document.getElementById('rewrite-experience').innerText,
    'Skills\n' + document.getElementById('rewrite-skills').innerText,
    'Education\n' + document.getElementById('rewrite-education').innerText
  ].join('\n\n');
  navigator.clipboard.writeText(sections);
  this.innerText = 'Copied!';
  setTimeout(() => this.innerText = 'Copy All', 2000);
});


// Re-analyze button
document.getElementById('reanalyze-btn').addEventListener('click', function() {
  document.getElementById('results').style.display = 'none';
  window.scrollTo(0, 0);
});

