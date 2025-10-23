import { useMemo, useState, useEffect } from 'react'

function Card({ title, description, badge, downloadHref, flexBasis = 320 }) {

  const cardStyle = {
    background: 'linear-gradient(135deg, rgba(255,255,255,0.75), rgba(255,255,255,0.75))',
    borderRadius: 18,
    padding: 24,
    boxShadow: '0 20px 35px rgba(0,0,0,0.1)',
    minHeight: 100, 
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
    flex: `1 1 ${flexBasis}px`,
    maxWidth: '100%',
  }

  const badgeStyle = {
    alignSelf: 'flex-start',
    background: '#fcf3c0ff',
    color: '#e5a546ff',
    borderRadius: 9999,
    padding: '6px 12px',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: 0.4,
    textTransform: 'uppercase',
  }

  const titleStyle = { margin: 0, fontSize: 22, color: '#111827' }
  const descStyle = { margin: 0, color: '#4b5563', lineHeight: 1.5 }

  const buttonBarStyle = { display: 'flex', gap: 12, marginTop: 12 }
  const buttonStyle = {
  background: 'linear-gradient(270deg, #c02410, #f6a65c, #f1dc63)',
  backgroundSize: '400% 400%',
  color: 'white',
  border: 'none',
  borderRadius: 10,
  padding: '10px 14px',
  cursor: 'pointer',
  fontWeight: 600,
  transition: 'transform 0.2s ease-in-out, box-shadow 0.3s ease-in-out',
  animation: 'gradientMove 6s ease infinite',
  boxShadow: '0 0 10px rgba(241, 175, 99, 0.4)',
  }
  
  const secondaryButtonStyle = {
    background: 'linear-gradient(135deg, #f1dc63ff, #f6a65cff)',
    color: 'white',
    border: 'none',
    borderRadius: 10,
    padding: '10px 14px',
    cursor: 'pointer',
    fontWeight: 600,
  }

  const detailsStyle = {
    background: 'rgba(241, 175, 99, 0.34)',
    border: '1px solid rgba(241, 156, 99, 0.86)',
    borderRadius: 12,
    padding: 12,
  }

  const preStyle = {
    width: '100%',
    maxHeight: 240,
    overflow: 'auto',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
    padding: 12,
    background: 'white',
    color: '#743610ff',
    whiteSpace: 'pre-wrap',
    wordBreak: 'break-word',
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    margin: 0
  }

useEffect(() => {
  const css = `
    @keyframes waveMove {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .wave-button {
      background: linear-gradient(270deg, #c02410, #f6a65c, #f1dc63);
      background-size: 400% 400%;
      color: white;
      border: none;
      border-radius: 10px;
      padding: 10px 14px;
      cursor: pointer;
      font-weight: 600;
      animation: waveMove 6s ease infinite;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 0 10px rgba(241, 227, 99, 0.84);
    }

    .wave-button:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(241, 227, 99, 0.84);
    }

    @keyframes borderFlow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    .glow-badge {
      position: relative;
      display: inline-block;
      align-self: flex-start;
      padding: 6px 14px;
      border-radius: 20px;
      font-weight: 700;
      text-transform: uppercase;
      font-size: 12px;
      letter-spacing: 0.4px;
      background: linear-gradient(#fff, #fff) padding-box,
                  linear-gradient(270deg, #f1dc63, #f6a65c, #c02410, #f1dc63) border-box;
      border: 2px solid transparent;
      background-size: 400% 400%;
      animation: borderFlow 8s ease infinite;
      color: #c02410;
      box-shadow: 0 0 8px rgba(246, 110, 92, 0.4);
    }

    .glow-badge:hover {
      box-shadow: 0 0 14px rgba(246, 110, 92, 0.4);
    }
  `
  const styleTag = document.createElement("style")
  styleTag.textContent = css
  document.head.appendChild(styleTag)
  return () => document.head.removeChild(styleTag)
}, [])

  return (
    <div style={cardStyle}>
      {badge ? <span className="glow-badge">{badge}</span> : null} 
      <h3 style={titleStyle}>{title}</h3>
      <p style={descStyle}>{description}</p>
      <div style={buttonBarStyle}>
        {downloadHref ? (
          <a href={downloadHref} download target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
            <button className="wave-button">Download APK</button>
          </a>
        ) : null}
      </div>
      <span className="glow-badge" style={{ marginTop: '10px' }}>
        FOR ANDROID ONLY
      </span>
    </div>
  )
}
function App() {
  // Auto-load markdown files from src/manuals at build/dev time
  const loadedManuals = useMemo(() => {
    const files = import.meta.glob('./manuals/*.md', { as: 'raw', eager: true })
    const map = {}
    Object.entries(files).forEach(([path, content]) => {
      const base = path.split('/').pop().replace(/\.md$/i, '').toLowerCase()
      map[base] = content
    })
    return map
  }, [])

  const [empManual, setEmpManual] = useState(loadedManuals['employee-monitoring-board'] || '')
  const [bmiManual, setBmiManual] = useState(loadedManuals['bmi-calculator'] || '')
  const [prcManual, setPrcManual] = useState(loadedManuals['payroll-calculator-prc'] || '')

  const pageStyle = {
    minHeight: '100vh',
    width: '100%',
    background: '#e4be85ff',
    display: 'flex',
    flexDirection: 'column',
  }

  const shellStyle = {
    maxWidth: 1600,
    width: '100%',
    margin: '0 auto',
    padding: '32px 24px 24px 24px',
    boxSizing: 'border-box',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  }

  const headerStyle = {
    background: 'linear-gradient(135deg, #f8fafcff, #eef2ff)',
    borderRadius: 24,
    boxShadow: '0 30px 60px rgba(0,0,0,0.25)',
    padding: 28,
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minHeight: 0,
  }

  const titleRow = { display: 'flex', alignItems: 'center', gap: 12 }
  const titleStyle = { fontSize: 36, margin: 0, color: '#000000ff' }
  const subtitleStyle = { marginTop: 8, color: '#6b7280' }

  const cardsWrapStyle = {
    marginTop: 24,
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
    alignItems: 'stretch',
  }

  const footerStyle = {
    marginTop: 24,
    textAlign: 'center',
    color: '#6b7280',
    opacity: 0.9,
    paddingTop: 8,
  }

  return (
    <div style={pageStyle}>
      <div style={shellStyle}>
        <div style={headerStyle}>
          <div style={titleRow}>
            <div style={{
              width: 42,
              height: 42,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #e4c954ff, #fa7f60ff)',
              display: 'grid',
              placeItems: 'center',
              color: 'white',
              fontWeight: 900
            }}>✴︎</div>
            <h1 style={titleStyle}>CREOTEC: 26F App Hub</h1>
          </div>
          <p style={subtitleStyle}>The 26F App Hub is a centralized platform where users can explore and download applications, each featuring clear descriptions and instructions for every project developed by Batch 26F under Creotec. For any inquiries or concerns regarding the applications, please contact the IT Department. </p>
          <div style={{ ...cardsWrapStyle, flex: 1 }}>
            <Card
              title="Payroll Calculator"
              description={
              <>
               An easy-to-use tool that automates salary computations based on days, rates, and deductions, ensuring accuracy and saving time for the accounting department.
                <br />
                <br />
                <strong>HOW TO USE?</strong>
                <br />
                1. Download the APK file.
                <br />
                2. Enter the full name of the employee whose payroll will be computed.
                <br />
                3. Select the employee's department from the drop-down menu.
                <br />
                4. Input the Monthly Rate (employee's basic salary).
                <br />
                5. Indicate the Standard Working Days for the period.
                <br />
                6. Specify the number of days the employee was absent.
                <br />
                7. Provide the Total Deductions (including tax, SSS, PhilHealth, Pag-IBIG, and other applicable deductions).
                <br />
                8. Click Calculate to generate the Net Pay.
                <br />
                9. Click Save to record the data in Google Sheets.
                <br />
                10. Click Clear to reset the fields and input information for another employee.
                <br />
              </>
            }
              downloadHref="/Payroll04_copy2_1.apk"
              badge="Read Instructions First!"
            />
            <Card
              title="BMI Calculator"
              description={
              <>
                A simple and reliable application that calculates Body Mass Index based on height and weight, helping users monitor health and maintain wellness.                 <br />
                <br />
                <strong>HOW TO USE?</strong>
                <br />
                1. Download the APK file.
                <br />
                2. Open the application and select the gender.
                <br />
                3. Enter their weight in kilograms (kg).
                <br />
                4. Enter their height in centimeters (cm).
                <br />
                5. Tap the Check BMI button to calculate the Body Mass Index.
                <br />
                6. The BMI result will appear, indicating whether they are Underweight, Normal, Overweight, or Obese.
                <br />
                7. A corresponding health suggestion will also be displayed based on the result.
                <br />
                8. To perform another calculation, tap the Clear button.
                <br />
                9. Click the Back button if you wish to choose another gender.
                <br />
                10. Review the results and suggestions carefully, then close the application when finished.
              </>
            }              
              badge="Read Instructions First!"
              downloadHref="/BMI_Final_copy.apk"
            />
            <Card
              title="Employee Monitoring Board System"
              description={
              <>
               A digital platform that tracks and manages employee attendance, performance, and productivity, providing organized data and easing workplace supervision.
                <br />
                <br />
                <strong>HOW TO USE?</strong>
                <br />
                1. Download the APK file.
                <br />
                2. Open the application and click “Next” to proceed to the main dashboard.
                <br />
                3. For Attendance Tracking, input the Days Present for each department and press Calculate. The system will automatically compute:
                <br />
                       - Days Absent
                <br />
                       - Attendance Rate (%)
                <br />
                       - Absent Rate (%)
                <br />
                4. For Illness Tracking, input the Number of Sick Employees for each department and press Calculate. The system will automatically compute the Sick Leave Rate (%) for each department.
                <br />
                5. Tap Clear if you wish to reset all fields and enter new data.
              </>            
            }
              downloadHref="/Employee_Monitoring2_3_copy_copy.apk"
              badge="Read Instructions First!"
            />
          </div>
          <div style={footerStyle}>© {new Date().getFullYear()} Creotec Philippines</div>
        </div>
      </div>
    </div>
  )
}

export default App
