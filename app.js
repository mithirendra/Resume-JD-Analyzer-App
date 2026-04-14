let savedJD = '';
let savedResume = '';

function toggleMode(panel, mode) {
  const uploadZone = document.getElementById(panel + '-upload');
  const pasteZone = document.getElementById(panel + '-paste');
  const uploadBtn = document.getElementById(panel + '-upload-btn');
  const pasteBtn = document.getElementById(panel + '-paste-btn');

  uploadZone.style.display = mode === 'upload' ? 'flex' : 'none';
  pasteZone.style.display = mode === 'paste' ? 'block' : 'none';

  uploadBtn.classList.toggle('active', mode === 'upload');
  pasteBtn.classList.toggle('active', mode === 'paste');
}

document.getElementById('jd-upload-btn').addEventListener('click', () => toggleMode('jd', 'upload'));
document.getElementById('jd-paste-btn').addEventListener('click', () => toggleMode('jd', 'paste'));
document.getElementById('resume-upload-btn').addEventListener('click', () => toggleMode('resume', 'upload'));
document.getElementById('resume-paste-btn').addEventListener('click', () => toggleMode('resume', 'paste'));

function getInputText(panel) {
  const uploadBtn = document.getElementById(panel + '-upload-btn');
  if (uploadBtn.classList.contains('active')) {
    const file = document.getElementById(panel + '-file').files[0];
    return file ? file.name : '';
  } else {
    return document.getElementById(panel + '-paste').value;
  }
}

// Analyze button — mock data for demo
document.getElementById('analyze-btn').addEventListener('click', function() {
  document.getElementById('score-num').innerText = '78';
  document.getElementById('matched-keywords').innerHTML =
    ['People Analytics', 'HRBP', 'Tableau', 'OD', 'Succession Planning']
    .map(k => `<span class="ktag green">${k}</span>`).join('');
  document.getElementById('gaps').innerHTML =
    ['Python', 'SHRM-SCP', 'M&A Experience', 'C-Suite Reporting']
    .map(g => `<span class="ktag red">${g}</span>`).join('');
  document.getElementById('suggestions').innerHTML =
    ['Add Python to skills section', 'Quantify OD outcomes with metrics', 'Highlight board-level reporting experience', 'Include change management certifications']
    .map(s => `<li>${s}</li>`).join('');
  document.getElementById('rewrite-summary').innerText = 'Strategic HR leader with 26 years of experience driving people analytics and organisational development across Malaysia and SEA...';
  document.getElementById('rewrite-achievements').innerText = '• Deployed 18-dashboard Tableau People Analytics Suite covering full employee lifecycle\n• Reduced attrition by 18% through predictive modelling...';
  document.getElementById('rewrite-experience').innerText = 'VP, Head of Talent Management & OD | Sample Company\n• Led enterprise-wide people strategy for 2,800+ employees...';
  document.getElementById('rewrite-skills').innerText = 'People Analytics • Tableau • Python • HRBP • Succession Planning • OD • Change Management • Workforce Planning';
  document.getElementById('rewrite-education').innerText = 'MBA, Human Resources | Sample University\nSHRM-SCP Certified | SHRM';

  document.getElementById('results').style.display = 'block';
  document.getElementById('results').scrollIntoView({ behavior: 'smooth' });
});

// Re-analyze button
document.getElementById('reanalyze-btn').addEventListener('click', function() {
  document.getElementById('results').style.display = 'none';
  document.getElementById('outreach-card').style.display = 'none';
  window.scrollTo(0, 0);
});

// Generate Cover Letter & Outreach button — mock data for demo
document.getElementById('outreach-btn').addEventListener('click', function() {
  document.getElementById('cover-letter').innerText = 'Dear Hiring Manager,\n\nI am writing to express my strong interest in this role. With 26 years of progressive HR leadership experience across Malaysia and SEA, I bring a proven track record in people analytics, organisational development, and strategic workforce planning...\n\nSincerely,\n[Your Name]';
  document.getElementById('linkedin-outreach').innerText = 'Hi [Name], I came across your profile and was impressed by your work at [Company]. With my background in HR leadership across Malaysia and SEA, I would love to connect and explore potential synergies.';
  document.getElementById('email-outreach').innerText = 'Subject: HR Leadership Opportunity\n\nDear [Hiring Manager],\n\nI am reaching out regarding the [Position] role at [Company]. With 26 years of HR leadership experience...\n\nBest regards,\n[Your Name]';
  document.getElementById('outreach-card').style.display = 'block';
  document.getElementById('outreach-card').scrollIntoView({ behavior: 'smooth' });
});

// Copy Cover Letter
document.getElementById('copy-cover').addEventListener('click', function() {
  const el = document.createElement('textarea');
  el.value = document.getElementById('cover-letter').innerText;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
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
  const el = document.createElement('textarea');
  el.value = sections;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
  this.innerText = 'Copied!';
  setTimeout(() => this.innerText = 'Copy All', 2000);
});

// Download PDF
document.getElementById('download-pdf').addEventListener('click', function() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  let y = 20;

  function checkPageBreak(doc, y, lineHeight) {
    if (y + lineHeight > 270) {
      doc.addPage();
      return 20;
    }
    return y;
  }

  function addDivider() {
    y = checkPageBreak(doc, y, 10);
    doc.setDrawColor(200);
    doc.line(20, y, 190, y);
    y += 10;
  }

  doc.setFontSize(16);
  doc.setFont('helvetica', 'bold');
  doc.text('Resume / JD Analyzer Report', 20, y);
  y += 12;

  addDivider();

  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Match Score: ' + document.getElementById('score-num').innerText + '%', 20, y);
  y += 12;

  addDivider();

  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Matched Keywords', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const keywords = [...document.querySelectorAll('#matched-keywords .ktag')].map(el => el.innerText).join(', ');
  const keywordsWrapped = doc.splitTextToSize(keywords || 'None', 170);
  doc.text(keywordsWrapped, 20, y);
  y += keywordsWrapped.length * 6 + 8;

  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Gaps', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const gaps = [...document.querySelectorAll('#gaps .ktag')].map(el => el.innerText).join(', ');
  const gapsWrapped = doc.splitTextToSize(gaps || 'None', 170);
  doc.text(gapsWrapped, 20, y);
  y += gapsWrapped.length * 6 + 8;

  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Suggestions', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const suggestions = [...document.querySelectorAll('#suggestions li')].map(el => el.innerText).join('\n');
  const suggText = doc.splitTextToSize(suggestions || 'None', 170);
  doc.text(suggText, 20, y);
  y += suggText.length * 6 + 8;

  addDivider();

  y = checkPageBreak(doc, y, 20);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('Resume Rewriter', 20, y);
  y += 12;

  y = checkPageBreak(doc, y, 40);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Professional Summary', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const summaryText = doc.splitTextToSize(document.getElementById('rewrite-summary').innerText, 170);
  doc.text(summaryText, 20, y);
  y += summaryText.length * 6 + 8;

  y = checkPageBreak(doc, y, 40);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Key Achievements', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const achieveText = doc.splitTextToSize(document.getElementById('rewrite-achievements').innerText, 170);
  doc.text(achieveText, 20, y);
  y += achieveText.length * 6 + 8;

  y = checkPageBreak(doc, y, 40);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Work Experience', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const experienceText = doc.splitTextToSize(document.getElementById('rewrite-experience').innerText, 170);
  doc.text(experienceText, 20, y);
  y += experienceText.length * 6 + 8;

  y = checkPageBreak(doc, y, 40);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Skills', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const skillsText = doc.splitTextToSize(document.getElementById('rewrite-skills').innerText, 170);
  doc.text(skillsText, 20, y);
  y += skillsText.length * 6 + 8;

  y = checkPageBreak(doc, y, 40);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.text('Education', 20, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const educationText = doc.splitTextToSize(document.getElementById('rewrite-education').innerText, 170);
  doc.text(educationText, 20, y);
  y += educationText.length * 6 + 8;

  const coverLetter = document.getElementById('cover-letter').innerText;
  if (coverLetter && !coverLetter.includes('will appear here')) {
    addDivider();
    y = checkPageBreak(doc, y, 40);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Cover Letter', 20, y);
    y += 12;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const coverText = doc.splitTextToSize(coverLetter, 170);
    doc.text(coverText, 20, y);
    y += coverText.length * 6 + 8;

    y = checkPageBreak(doc, y, 40);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('LinkedIn Outreach', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const linkedinText = doc.splitTextToSize(document.getElementById('linkedin-outreach').innerText, 170);
    doc.text(linkedinText, 20, y);
    y += linkedinText.length * 6 + 8;

    y = checkPageBreak(doc, y, 40);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('Email Outreach', 20, y);
    y += 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const emailText = doc.splitTextToSize(document.getElementById('email-outreach').innerText, 170);
    doc.text(emailText, 20, y);
  }

  doc.save('resume-jd-analysis.pdf');
});