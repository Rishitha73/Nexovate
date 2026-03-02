import { useState, useEffect } from "react";

const style = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: 'Poppins', sans-serif;
    background: #FFFBF1;
    color: #1a1a2e;
  }

  .font-display { font-family: 'Poppins', sans-serif; }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(30px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-8px); }
  }

  @keyframes pulse-glow {
    0%, 100% { box-shadow: 0 0 20px rgba(227, 106, 106, 0.3); }
    50% { box-shadow: 0 0 40px rgba(227, 106, 106, 0.6); }
  }

  @keyframes shimmer {
    0% { background-position: -200% center; }
    100% { background-position: 200% center; }
  }

  @keyframes slide-in {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes progress-fill {
    from { width: 0%; }
    to { width: var(--target-width); }
  }

  .fade-up { animation: fadeUp 0.7s ease forwards; }
  .float { animation: float 3s ease-in-out infinite; }
  .pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }

  .gradient-text {
    background: linear-gradient(135deg, #FFB2B2, #E36A6A);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-bg {
    background: radial-gradient(ellipse 80% 60% at 50% -10%, rgba(255, 178, 178, 0.15) 0%, transparent 70%),
                radial-gradient(ellipse 60% 40% at 80% 50%, rgba(227, 106, 106, 0.08) 0%, transparent 60%),
                #FFFBF1;
  }

  .card-hover {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  .card-hover:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(227, 106, 106, 0.15);
  }

  .job-card-active {
    border: 1.5px solid #FFB2B2;
    background: linear-gradient(135deg, #FFF2D0, #fff);
  }

  .progress-bar {
    height: 6px;
    border-radius: 99px;
    background: #e5e7eb;
    overflow: hidden;
  }

  .progress-fill {
    height: 100%;
    border-radius: 99px;
    animation: progress-fill 1.5s ease forwards;
  }

  .btn-primary {
    background: linear-gradient(135deg, #E36A6A, #FFB2B2);
    color: white;
    border: none;
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(227, 106, 106, 0.4);
  }

  .kanban-col {
    background: white;
    border-radius: 16px;
    padding: 20px;
    border: 1px solid #FFF2D0;
  }

  .tag {
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 99px;
    letter-spacing: 0.02em;
  }

  .nav-link {
    color: #6b7280;
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s;
    font-family: 'Poppins', sans-serif;
    position: relative;
    padding-bottom: 4px;
  }

  .nav-link.active {
    color: #1a1a2e;
  }

  .nav-link.active::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, #FFB2B2, #E36A6A);
    border-radius: 2px;
  }

  .section-label {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    color: #E36A6A;
    text-transform: uppercase;
    background: #FFF2D0;
    padding: 6px 14px;
    border-radius: 99px;
    border: 1px solid #FFB2B2;
    display: inline-block;
  }

  .feature-icon {
    width: 48px;
    height: 48px;
    border-radius: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
  }

  .workflow-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .workflow-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
  }

  .dashed-line {
    flex: 1;
    height: 2px;
    border-top: 2px dashed #FFB2B2;
    margin: 0 8px;
    margin-bottom: 28px;
  }

  .resume-card {
    border-radius: 16px;
    padding: 24px;
    border: 1.5px solid;
  }

  .resume-line {
    height: 8px;
    border-radius: 99px;
    margin-bottom: 8px;
  }

  .check-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 14px;
  }

  .cross-item {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
    font-size: 14px;
    color: #9ca3af;
  }
`;

const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#FFB2B2" opacity="0.15"/>
    <path d="M5 9l3 3 5-5" stroke="#E36A6A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CrossIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
    <circle cx="9" cy="9" r="9" fill="#ef4444" opacity="0.15"/>
    <path d="M6 6l6 6M12 6l-6 6" stroke="#ef4444" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <circle cx="7" cy="7" r="6" stroke="#9ca3af" strokeWidth="1.2"/>
    <path d="M7 4v3.5l2 2" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
  </svg>
);

export default function LeecoDashboard() {
  const [activeNav, setActiveNav] = useState("Job Opportunities");
  const [animateCards, setAnimateCards] = useState(false);

  useEffect(() => {
    setTimeout(() => setAnimateCards(true), 300);
  }, []);

  const kanbanData = [
    {
      col: "Sourced (Auto)",
      count: 2,
      color: "#E36A6A",
      bg: "#FFF2D0",
      jobs: [
        { title: "Product Manager", company: "Google", time: "2m ago", active: true },
        { title: "Sr. Designer", company: "Razorpay", time: "15m ago", active: false },
      ],
    },
    {
      col: "Applied (Smart)",
      count: 1,
      color: "#FFB2B2",
      bg: "#FFFBF1",
      jobs: [
        { title: "Product Lead", company: "Swiggy", time: "1h ago", active: false },
      ],
    },
    {
      col: "Referral Pending",
      count: 2,
      color: "#f59e0b",
      bg: "#fffbeb",
      jobs: [
        { title: "SDE II", company: "Flipkart", time: "3h ago", active: false },
        { title: "Frontend Dev", company: "Zerodha", time: "1d ago", active: false },
      ],
    },
    {
      col: "Interview",
      count: 1,
      color: "#10b981",
      bg: "#ecfdf5",
      jobs: [
        { title: "UX Lead", company: "Notion", time: "2d ago", active: false },
      ],
    },
  ];

  return (
    <>
      <style>{style}</style>
      <div style={{ minHeight: "100vh" }}>

        {/* Navbar */}
        <nav style={{
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(255, 251, 241, 0.9)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(227, 106, 106, 0.1)",
          padding: "0 40px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          height: "68px"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              background: "linear-gradient(135deg, #E36A6A, #FFB2B2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18, color: "white", fontWeight: 700,
              fontFamily: "Poppins, sans-serif"
            }}>L</div>
            <span className="font-display" style={{ fontSize: 22, fontWeight: 700, color: "#1a1a2e" }}>Leeco</span>
          </div>

          <div style={{ display: "flex", gap: "36px", alignItems: "center" }}>
            {["Home", "Learning", "Job Opportunities"].map(nav => (
              <span
                key={nav}
                className={`nav-link ${activeNav === nav ? "active" : ""}`}
                onClick={() => setActiveNav(nav)}
                style={{ fontSize: 15 }}
              >
                {nav}
              </span>
            ))}
          </div>

          <button className="btn-primary" style={{
            padding: "10px 22px", borderRadius: "10px", fontSize: 14
          }}>
            Go To Dashboard →
          </button>
        </nav>

        {/* Hero Section */}
        <section className="hero-bg" style={{ padding: "100px 60px 80px", textAlign: "center" }}>
          <div className="fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="section-label" style={{ marginBottom: "32px" }}>
              ✦ AI-Powered Job Hunting
            </div>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.2s" }}>
            <h1 className="font-display" style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.05,
              color: "#1a1a2e",
              marginBottom: "12px"
            }}>
              Put Your Job Hunting
            </h1>
            <h1 className="font-display gradient-text" style={{
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 800,
              lineHeight: 1.05,
              marginBottom: "32px"
            }}>
              on Autopilot.
            </h1>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.35s" }}>
            <p style={{ fontSize: 18, color: "#6b7280", maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.6 }}>
              Leeco is the AI agent that searches, optimizes, and networks for you 24/7.
              <br />You just check WhatsApp and say <strong style={{ color: "#1a1a2e" }}>"Yes."</strong>
            </p>
          </div>

          <div className="fade-up" style={{ animationDelay: "0.5s" }}>
            <button className="btn-primary float" style={{
              padding: "16px 36px", borderRadius: "14px", fontSize: 16,
              display: "inline-flex", alignItems: "center", gap: 10
            }}>
              Start Now →
            </button>
          </div>
        </section>

        {/* Workflow Diagram */}
        <section style={{ background: "white", padding: "80px 60px", borderTop: "1px solid #FFF2D0" }}>
          <div style={{ maxWidth: 800, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>

              <div className="workflow-step">
                <div className="workflow-icon" style={{ background: "#FFF2D0", border: "2px solid #FFB2B2" }}>
                  👤
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>You</span>
              </div>

              <div className="dashed-line" />

              <div className="workflow-step" style={{ position: "relative" }}>
                <div className="pulse-glow" style={{
                  background: "white",
                  border: "2px solid #FFB2B2",
                  borderRadius: "20px",
                  padding: "20px 28px",
                  textAlign: "center",
                  minWidth: 200
                }}>
                  <div style={{
                    width: 72, height: 72, borderRadius: "50%",
                    background: "linear-gradient(135deg, #E36A6A, #FFB2B2)",
                    margin: "0 auto 12px",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 32
                  }}>🤖</div>
                  <div style={{ color: "#E36A6A", fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Leeco Agent</div>
                  <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                    {["🔍 Search", "📄 Apply", "🤝 Referrals"].map(item => (
                      <div key={item} style={{
                        background: "#f9fafb",
                        border: "1px solid #e5e7eb",
                        borderRadius: 10,
                        padding: "8px 12px",
                        fontSize: 12,
                        fontWeight: 600,
                        color: "#374151",
                        cursor: "pointer",
                        transition: "all 0.2s"
                      }}>{item}</div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="dashed-line" />

              <div className="workflow-step">
                <div className="workflow-icon" style={{ background: "#f0fdf4", border: "2px solid #bbf7d0" }}>
                  📞
                </div>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#6b7280" }}>Interview</span>
              </div>

              <div className="dashed-line" />

              <div className="workflow-step">
                <div className="workflow-icon pulse-glow" style={{ background: "#E36A6A", border: "2px solid #FFB2B2" }}>
                  🏆
                </div>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#E36A6A" }}>Placed!</span>
              </div>

            </div>
          </div>
        </section>

        {/* Resume Comparison — "The Application" Section */}
        <section style={{ padding: "100px 60px", background: "#FFFBF1" }}>
          <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", gap: 80, alignItems: "center" }}>

            {/* Left — Cards */}
            <div style={{ flex: 1.2, position: "relative" }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>

                {/* Standard Resume */}
                <div className="resume-card card-hover" style={{
                  borderColor: "#fee2e2", background: "#fff",
                  flex: 1, opacity: 0.85
                }}>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: "#ef4444",
                    background: "#fee2e2", padding: "4px 12px", borderRadius: 99,
                    display: "inline-block", marginBottom: 20
                  }}>Standard Resume</div>

                  {[80, 65, 50].map((w, i) => (
                    <div key={i} className="resume-line" style={{ width: `${w}%`, background: "#e5e7eb" }} />
                  ))}

                  <div style={{ marginTop: 20 }}>
                    <div className="cross-item"><CrossIcon /> Generic keywords</div>
                    <div className="cross-item"><CrossIcon /> No ATS optimization</div>
                    <div className="cross-item"><CrossIcon /> Standard format</div>
                  </div>

                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #f3f4f6" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>ATS Score</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#ef4444" }}>47%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ "--target-width": "47%", width: "47%", background: "#ef4444" }} />
                    </div>
                  </div>
                </div>

                {/* Leeco Optimized */}
                <div className="resume-card card-hover" style={{
                  borderColor: "#FFB2B2",
                  background: "linear-gradient(135deg, #FFF2D0, #fff)",
                  flex: 1, transform: "translateY(-8px)"
                }}>
                  <div style={{
                    fontSize: 12, fontWeight: 700, color: "#E36A6A",
                    background: "#FFF2D0", padding: "4px 12px", borderRadius: 99,
                    display: "inline-block", marginBottom: 20
                  }}>✨ Leeco Optimized</div>

                  {[90, 75, 60].map((w, i) => (
                    <div key={i} className="resume-line" style={{
                      width: `${w}%`,
                      background: "linear-gradient(90deg, #E36A6A, #FFB2B2)"
                    }} />
                  ))}

                  <div style={{ marginTop: 20 }}>
                    <div className="check-item"><CheckIcon /> Role-specific keywords</div>
                    <div className="check-item"><CheckIcon /> ATS optimized</div>
                    <div className="check-item"><CheckIcon /> Proven format</div>
                  </div>

                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #FFB2B2" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                      <span style={{ fontSize: 12, color: "#9ca3af" }}>ATS Score</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#E36A6A" }}>95%</span>
                    </div>
                    <div className="progress-bar">
                      <div className="progress-fill" style={{ "--target-width": "95%", width: "95%", background: "linear-gradient(90deg, #E36A6A, #FFB2B2)" }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Approve button */}
              <div style={{ marginTop: 24 }}>
                <button className="btn-primary" style={{
                  padding: "14px 28px", borderRadius: "12px", fontSize: 15,
                  display: "flex", alignItems: "center", gap: 10
                }}>
                  👍 Approve & Apply
                </button>
              </div>
            </div>

            {/* Right — Text */}
            <div style={{ flex: 1 }}>
              <div className="section-label" style={{ marginBottom: 20 }}>02 — The Application</div>
              <h2 className="font-display" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.1, color: "#1a1a2e", marginBottom: 8 }}>
                One-Click
              </h2>
              <h2 className="font-display gradient-text" style={{ fontSize: "clamp(32px, 4vw, 48px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 28 }}>
                Intelligent Apply.
              </h2>
              <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.7, marginBottom: 20 }}>
                Never send a generic resume again. Our AI analyzes the resumes of candidates who <strong style={{ color: "#1a1a2e" }}>actually got the interview</strong> and optimizes yours to match.
              </p>
              <p style={{ color: "#6b7280", fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                We show you the company's hiring/firing trends and culture flags instantly. We tweak your CV for the specific role and ask for your confirmation via WhatsApp.
              </p>
              {["Analyzes successful candidate profiles", "Real-time company culture insights", "WhatsApp approval flow"].map(item => (
                <div key={item} className="check-item" style={{ fontSize: 15, color: "#374151" }}>
                  <CheckIcon /> {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Career Command Center / Kanban */}
        <section style={{ padding: "100px 60px", background: "white" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", gap: 80, alignItems: "flex-start" }}>

            {/* Left — Text */}
            <div style={{ flex: 1, paddingTop: 20 }}>
              <h2 className="font-display" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 800, lineHeight: 1.05, color: "#1a1a2e", marginBottom: 8 }}>
                Your Career
              </h2>
              <h2 className="font-display gradient-text" style={{ fontSize: "clamp(36px, 4vw, 56px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 28 }}>
                Command Center.
              </h2>
              <p style={{ color: "#6b7280", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>
                No more spreadsheets. No more "Wait, did I apply there?" Track your background searches, pending approvals, active applications, and referral statuses in one unified view.
              </p>
              <p style={{ fontWeight: 700, fontSize: 17, color: "#1a1a2e", marginBottom: 32 }}>
                Leeco manages the chaos; you manage the offers.
              </p>
              <div style={{
                background: "#FFFBF1",
                border: "1px solid #FFF2D0",
                borderRadius: 16,
                padding: "20px 24px",
                display: "flex", alignItems: "center", gap: 16
              }}>
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  background: "linear-gradient(135deg, #FFF2D0, #FFB2B2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22
                }}>⚡</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>Real-time sync</div>
                  <div style={{ color: "#9ca3af", fontSize: 13, marginTop: 2 }}>Everything updates as it happens</div>
                </div>
              </div>
            </div>

            {/* Right — Kanban Board */}
            <div style={{ flex: 1.5 }}>
              {/* Browser chrome */}
              <div style={{
                background: "#f3f4f6",
                borderRadius: "16px 16px 0 0",
                padding: "10px 16px",
                display: "flex", alignItems: "center", gap: 12,
                borderBottom: "1px solid #e5e7eb"
              }}>
                <div style={{ display: "flex", gap: 6 }}>
                  {["#ef4444", "#f59e0b", "#10b981"].map(c => (
                    <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
                  ))}
                </div>
                <div style={{
                  flex: 1, background: "white", borderRadius: 8,
                  padding: "4px 14px", fontSize: 12, color: "#9ca3af",
                  fontFamily: "monospace"
                }}>app.leeco.ai/dashboard</div>
              </div>

              <div style={{
                background: "white",
                border: "1px solid #FFF2D0",
                borderTop: "none",
                borderRadius: "0 0 16px 16px",
                padding: "20px",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 12
              }}>
                {kanbanData.map((col, ci) => (
                  <div key={col.col} className="kanban-col" style={{ padding: "14px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                      <span style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>{col.col}</span>
                      <span style={{
                        background: col.bg, color: col.color,
                        width: 22, height: 22, borderRadius: "50%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: 11, fontWeight: 700
                      }}>{col.count}</span>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      {col.jobs.map((job, ji) => (
                        <div key={ji} className="card-hover" style={{
                          padding: "12px",
                          borderRadius: 12,
                          border: job.active ? `1.5px solid ${col.color}` : "1.5px solid #f3f4f6",
                          background: job.active ? col.bg : "white",
                          animation: animateCards ? `slide-in 0.5s ease forwards` : "none",
                          animationDelay: `${(ci * 0.15) + (ji * 0.1)}s`,
                          opacity: animateCards ? 1 : 0
                        }}>
                          <div style={{ fontWeight: 700, fontSize: 12, color: "#1a1a2e", marginBottom: 2 }}>{job.title}</div>
                          <div style={{ fontSize: 11, color: "#9ca3af", marginBottom: 8 }}>{job.company}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <ClockIcon />
                            <span style={{ fontSize: 10, color: "#9ca3af" }}>{job.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Auto-moving tag */}
              <div style={{ textAlign: "right", marginTop: 12 }}>
                <span style={{
                  background: "#FFF2D0", color: "#E36A6A",
                  fontSize: 13, fontWeight: 600,
                  padding: "8px 18px", borderRadius: 99,
                  border: "1px solid #FFB2B2",
                  cursor: "pointer",
                  display: "inline-block",
                  transition: "all 0.2s"
                }}>→ Auto-moving to Applied...</span>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: "linear-gradient(135deg, #1a1a2e 0%, #2d1b69 50%, #1a1a2e 100%)",
          padding: "100px 60px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden"
        }}>
          {/* Background decoration */}
          <div style={{
            position: "absolute", top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600, height: 600,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(227, 106, 106, 0.2) 0%, transparent 70%)",
            pointerEvents: "none"
          }} />

          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 className="font-display" style={{
              fontSize: "clamp(40px, 6vw, 70px)", fontWeight: 800,
              color: "white", lineHeight: 1.05, marginBottom: 12
            }}>
              Ready to land your
            </h2>
            <h2 className="font-display gradient-text" style={{
              fontSize: "clamp(40px, 6vw, 70px)", fontWeight: 800, lineHeight: 1.05, marginBottom: 24
            }}>
              dream job?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: 17, marginBottom: 40 }}>
              Setup in less than 2 minutes
            </p>
            <button className="btn-primary" style={{
              padding: "18px 44px", borderRadius: "14px", fontSize: 17,
              background: "linear-gradient(135deg, #E36A6A, #FFB2B2)",
              marginBottom: 12
            }}>
              Get Started Free →
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer style={{ background: "#0d0d1a", padding: "60px", color: "white" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 60 }}>
            <span className="font-display" style={{ fontSize: 28, fontWeight: 800 }}>Leeco</span>
            <div style={{ display: "flex", gap: 32, color: "rgba(255,255,255,0.5)", fontSize: 14 }}>
              {["Home", "Learning", "Job Opportunities"].map(item => (
                <span key={item} style={{ cursor: "pointer", transition: "color 0.2s" }}>{item}</span>
              ))}
            </div>
            <div style={{
              width: 40, height: 40, borderRadius: "50%",
              border: "1.5px solid rgba(255,255,255,0.2)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.6)", fontSize: 18
            }}>📸</div>
          </div>

          <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 40, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13 }}>Copyright ©2025 Leeco</span>
            <div style={{ display: "flex", gap: 24 }}>
              {["Refund Policy", "T & C"].map(item => (
                <span key={item} style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, cursor: "pointer" }}>{item}</span>
              ))}
            </div>
          </div>

          {/* Watermark */}
          <div style={{
            textAlign: "center",
            marginTop: 40,
            fontFamily: "Poppins, sans-serif",
            fontSize: "clamp(60px, 12vw, 140px)",
            fontWeight: 800,
            color: "rgba(255,255,255,0.03)",
            letterSpacing: "0.05em",
            userSelect: "none"
          }}>LEECO</div>
        </footer>
      </div>
    </>
  );
}