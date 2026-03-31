import { useState, useEffect, useRef, useCallback } from "react";

/* ── BOOT LINES ── */
const BOOT_LINES = [
  "> Initializing SHREYANK ENGINE v2.0...",
  "> Loading NIT Jalandhar modules............. OK",
  "> Mounting C standard library............... OK",
  "> Calibrating chess evaluator (1600 ELO).... OK",
  "> Loading personality core.................. OK",
  "> All systems nominal. Launching portfolio.",
];

/* ── CHESS GAME (Famous Immortal Game moves) ── */
const MOVES = [
  { w: "e4",  b: "e5"  },
  { w: "f4",  b: "exf4" },
  { w: "Bc4", b: "Qh4+" },
  { w: "Kf1", b: "b5"  },
  { w: "Bxb5",b: "Nf6" },
  { w: "Nf3", b: "Qh6" },
  { w: "d3",  b: "Nh5" },
  { w: "Nh4", b: "Qg5" },
  { w: "Nf5", b: "c6"  },
  { w: "g4",  b: "Nf6" },
];

/* ── SKILLS ── */
const SKILLS = [
  { name: "C / C++",               pct: 92, color: "#e8b84b" },
  { name: "Data Structures",       pct: 88, color: "#4ade80" },
  { name: "Algorithms",            pct: 85, color: "#60a5fa" },
  { name: "Systems Programming",   pct: 80, color: "#f472b6" },
  { name: "Competitive Prog.",     pct: 75, color: "#a78bfa" },
  { name: "Chess (1600 ELO)",      pct: 70, color: "#fb923c" },
];

/* ── PROJECTS ── */
const PROJECTS = [
  {
    id: "01", title: "Chess Engine in C",
    tag: "FEATURED",
    desc: "Bitboard representation, alpha-beta minimax, opening book. A 2000-line pure C program that plays legal chess and fights back.",
    tech: ["C","Bitboards","Minimax","Alpha-Beta"],
    icon: "♚",
  },
  {
    id: "02", title: "Custom malloc()",
    tag: "SYSTEMS",
    desc: "Reimplemented heap memory management using sbrk() — boundary tags, coalescing, best-fit policy.",
    tech: ["C","sbrk","Memory","OS"],
    icon: "⚙",
  },
  {
    id: "03", title: "Unix Shell",
    tag: "OS",
    desc: "fork/exec/pipe shell with I/O redirection, job control, and built-ins. Walks like bash, talks like bash.",
    tech: ["C","fork","pipe","Unix"],
    icon: "$",
  },
  {
    id: "04", title: "DSA Library",
    tag: "LIBRARY",
    desc: "Generic container library in C — AVL trees, open-address hash maps, binary heaps, doubly-linked lists.",
    tech: ["C","AVL","HashMap","Heap"],
    icon: "⬡",
  },
];

/* ── EVAL BAR ── */
function EvalBar({ pct }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:"#4a5568", textTransform:"uppercase" }}>
        Profile Eval
      </div>
      <div style={{ background:"#0d1117", border:"1px solid #1e2530", borderRadius:3, overflow:"hidden", height:8, width:"100%" }}>
        <div style={{
          width:`${pct}%`, height:"100%",
          background:"linear-gradient(90deg,#2d5a27,#4ade80)",
          transition:"width 2s ease",
          borderRadius:3,
        }} />
      </div>
      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#4ade80" }}>
        +{((pct - 50) * 0.3).toFixed(1)}
      </div>
    </div>
  );
}

/* ── MINI BOARD (sidebar) ── */
const PIECES = {
  0:"♜",1:"♞",2:"♝",3:"♛",4:"♚",5:"♝",6:"♞",7:"♜",
  8:"♟",9:"♟",10:"♟",11:"♟",12:"♟",13:"♟",14:"♟",15:"♟",
  48:"♙",49:"♙",50:"♙",51:"♙",52:"♙",53:"♙",54:"♙",55:"♙",
  56:"♖",57:"♘",58:"♗",59:"♕",60:"♔",61:"♗",62:"♘",63:"♖",
};

function MiniBoard() {
  return (
    <div style={{
      display:"grid", gridTemplateColumns:"repeat(8,1fr)",
      width:"100%", aspectRatio:1,
      border:"1px solid rgba(232,184,75,0.25)",
    }}>
      {Array.from({length:64},(_,i)=>{
        const r=Math.floor(i/8), c=i%8;
        const light=(r+c)%2===0;
        const piece=PIECES[i];
        const isBlack=i<16;
        return (
          <div key={i} style={{
            background: light?"#1e1a10":"#110e08",
            display:"flex", alignItems:"center", justifyContent:"center",
            aspectRatio:1,
            fontSize:"clamp(6px,1.5vw,11px)",
            color: isBlack?"rgba(255,255,255,0.5)":"rgba(255,255,255,0.9)",
            userSelect:"none",
          }}>
            {piece||""}
          </div>
        );
      })}
    </div>
  );
}

/* ── TYPEWRITER ── */
function Typewriter({ text, speed=28, style={} }) {
  const [display, setDisplay] = useState("");
  const [done, setDone] = useState(false);
  const iRef = useRef(0);
  useEffect(()=>{
    setDisplay(""); iRef.current=0; setDone(false);
    const iv = setInterval(()=>{
      if(iRef.current>=text.length){ setDone(true); clearInterval(iv); return; }
      setDisplay(text.slice(0,iRef.current+1));
      iRef.current++;
    }, speed);
    return ()=>clearInterval(iv);
  },[text,speed]);
  return <span style={style}>{display}{!done&&<span style={{animation:"blink 1s infinite",fontWeight:100}}>|</span>}</span>;
}

/* ── SECTION WRAPPER ── */
function Section({ id, children }) {
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ el.style.opacity="1"; el.style.transform="translateY(0)"; obs.unobserve(el); }
    },{threshold:0.08});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[]);
  return (
    <div id={id} ref={ref} style={{ opacity:0, transform:"translateY(32px)", transition:"opacity 0.7s ease, transform 0.7s ease" }}>
      {children}
    </div>
  );
}

/* ── PROGRESS BAR ── */
function SkillBar({ name, pct, color, delay }) {
  const [w, setW] = useState(0);
  const ref = useRef(null);
  useEffect(()=>{
    const el=ref.current; if(!el) return;
    const obs=new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setTimeout(()=>setW(pct), delay); obs.unobserve(el); }
    },{threshold:0.5});
    obs.observe(el);
    return ()=>obs.disconnect();
  },[pct,delay]);
  return (
    <div ref={ref} style={{ marginBottom:18 }}>
      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color:"#7a8899", letterSpacing:"0.1em" }}>
          {name}
        </span>
        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:11, color }}>
          {pct}%
        </span>
      </div>
      <div style={{ background:"#0d1117", borderRadius:2, height:6, overflow:"hidden" }}>
        <div style={{
          width:`${w}%`, height:"100%", background:color,
          borderRadius:2, transition:"width 1.2s cubic-bezier(0.4,0,0.2,1)",
          boxShadow:`0 0 8px ${color}55`,
        }}/>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════ */
export default function Portfolio() {
  const [booted, setBooted] = useState(false);
  const [bootLines, setBootLines] = useState([]);
  const [activeSection, setActiveSection] = useState("about");
  const [moveIdx, setMoveIdx] = useState(0);
  const [evalPct, setEvalPct] = useState(0);
  const [hoveredProject, setHoveredProject] = useState(null);

  /* boot sequence */
  useEffect(()=>{
    let i=0;
    const iv=setInterval(()=>{
      if(i<BOOT_LINES.length){ setBootLines(l=>[...l, BOOT_LINES[i]]); i++; }
      else{ clearInterval(iv); setTimeout(()=>setBooted(true),500); }
    },320);
    return ()=>clearInterval(iv);
  },[]);

  /* chess move ticker */
  useEffect(()=>{
    if(!booted) return;
    const iv=setInterval(()=>setMoveIdx(m=>(m+1)%MOVES.length),2200);
    return ()=>clearInterval(iv);
  },[booted]);

  /* eval bar animation on load */
  useEffect(()=>{ if(booted) setTimeout(()=>setEvalPct(78),600); },[booted]);

  /* active section tracking */
  useEffect(()=>{
    if(!booted) return;
    const ids=["about","skills","projects","chess","contact"];
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting) setActiveSection(e.target.id); });
    },{rootMargin:"-40% 0px -40% 0px"});
    ids.forEach(id=>{ const el=document.getElementById(id); if(el) obs.observe(el); });
    return ()=>obs.disconnect();
  },[booted]);

  const scrollTo = id => document.getElementById(id)?.scrollIntoView({behavior:"smooth"});

  /* ── BOOT SCREEN ── */
  if(!booted) return (
    <div style={{
      minHeight:"100vh", background:"#04060a", display:"flex", flexDirection:"column",
      justifyContent:"center", alignItems:"flex-start", padding:"4rem",
      fontFamily:"'JetBrains Mono',monospace",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes scanline{0%{transform:translateY(-100%)}100%{transform:translateY(100vh)}}
      `}</style>
      <div style={{ fontSize:11, color:"rgba(232,184,75,0.5)", letterSpacing:"0.3em", marginBottom:"2rem", textTransform:"uppercase" }}>
        ♚ SHREYANK ENGINE
      </div>
      {bootLines.map((l,i)=>(
        <div key={i} style={{
          fontSize:12, color: i===bootLines.length-1?"#4ade80":"#4a5568",
          marginBottom:6, letterSpacing:"0.05em",
          animation: i===bootLines.length-1?"none":"none",
        }}>
          {l}
        </div>
      ))}
      {bootLines.length>0 && <span style={{color:"#4ade80", fontSize:12, animation:"blink 1s infinite"}}>█</span>}
    </div>
  );

  /* ── MAIN PORTFOLIO ── */
  const NAV = [
    {id:"about",   icon:"♙", label:"About"},
    {id:"skills",  icon:"♘", label:"Skills"},
    {id:"projects",icon:"♖", label:"Projects"},
    {id:"chess",   icon:"♚", label:"Chess"},
    {id:"contact", icon:"♛", label:"Contact"},
  ];

  return (
    <div style={{ background:"#04060a", color:"#c8d6e5", minHeight:"100vh", display:"flex", fontFamily:"'Crimson Pro',serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600&family=Bebas+Neue&family=Crimson+Pro:ital,wght@0,300;0,400;0,600;1,300;1,400&display=swap');
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
        @keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
        @keyframes glow{0%,100%{text-shadow:0 0 10px #e8b84b55}50%{text-shadow:0 0 24px #e8b84baa}}
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar{width:3px}
        ::-webkit-scrollbar-track{background:#04060a}
        ::-webkit-scrollbar-thumb{background:#1e2530}
        html{scroll-behavior:smooth}
        .pc:hover{background:#0d1117!important;border-color:rgba(232,184,75,0.4)!important}
        .nl:hover{color:#e8b84b!important}
        .sk:hover{transform:translateY(-3px)}
        a{text-decoration:none;color:inherit}
      `}</style>

      {/* ── SIDEBAR ── */}
      <aside style={{
        width:240, flexShrink:0, position:"sticky", top:0, height:"100vh",
        borderRight:"1px solid #0d1117", display:"flex", flexDirection:"column",
        background:"#040709", overflow:"hidden",
      }}>
        {/* Logo */}
        <div style={{ padding:"1.5rem 1.2rem 1rem", borderBottom:"1px solid #0d1117" }}>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#e8b84b", letterSpacing:"0.08em", lineHeight:1 }}>
            SHREYANK
          </div>
          <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:22, color:"#e8b84b", letterSpacing:"0.08em", lineHeight:1 }}>
            THAKUR
          </div>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#2d3748", letterSpacing:"0.2em", marginTop:6, textTransform:"uppercase" }}>
            B.Tech CSE · NIT Jalandhar
          </div>
        </div>

        {/* Eval bar */}
        <div style={{ padding:"1rem 1.2rem", borderBottom:"1px solid #0d1117" }}>
          <EvalBar pct={evalPct} />
        </div>

        {/* Nav */}
        <nav style={{ padding:"0.5rem 0", borderBottom:"1px solid #0d1117" }}>
          {NAV.map(({id,icon,label})=>(
            <button key={id} className="nl" onClick={()=>scrollTo(id)} style={{
              display:"flex", alignItems:"center", gap:10, width:"100%",
              padding:"0.6rem 1.2rem", background:"none", border:"none", cursor:"pointer",
              color: activeSection===id ? "#e8b84b" : "#4a5568",
              fontFamily:"'JetBrains Mono',monospace", fontSize:11, letterSpacing:"0.15em",
              textTransform:"uppercase", textAlign:"left",
              borderLeft: activeSection===id ? "2px solid #e8b84b" : "2px solid transparent",
              transition:"all 0.2s",
            }}>
              <span style={{ fontSize:14 }}>{icon}</span>
              {label}
            </button>
          ))}
        </nav>

        {/* Mini chess board */}
        <div style={{ padding:"1rem 1.2rem 0", flex:1, display:"flex", flexDirection:"column", gap:8 }}>
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#2d3748", letterSpacing:"0.2em", textTransform:"uppercase" }}>
            Live Analysis
          </div>
          <MiniBoard />

          {/* Move list */}
          <div style={{ marginTop:4, fontFamily:"'JetBrains Mono',monospace", fontSize:10 }}>
            {MOVES.slice(0,moveIdx+1).slice(-5).map((m,i,a)=>{
              const absIdx = moveIdx - a.length + i + 1;
              return (
                <div key={absIdx} style={{ display:"flex", gap:8, padding:"1px 0",
                  color: i===a.length-1?"#e8b84b":"#2d3748",
                  fontWeight: i===a.length-1?"500":"300",
                }}>
                  <span style={{ width:18, textAlign:"right" }}>{absIdx+1}.</span>
                  <span style={{ width:36 }}>{m.w}</span>
                  <span>{m.b}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom status */}
        <div style={{ padding:"0.8rem 1.2rem", borderTop:"1px solid #0d1117", display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:"50%", background:"#4ade80", animation:"blink 2s infinite" }} />
          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#2d3748", letterSpacing:"0.15em", textTransform:"uppercase" }}>
            Open to work
          </span>
        </div>
      </aside>

      {/* ── MAIN CONTENT ── */}
      <main style={{ flex:1, overflowY:"auto", height:"100vh" }}>

        {/* ═══ HERO ═══ */}
        <div style={{
          minHeight:"100vh", display:"flex", flexDirection:"column", justifyContent:"center",
          padding:"4rem 4rem 3rem", position:"relative", overflow:"hidden",
          borderBottom:"1px solid #0d1117",
        }}>
          {/* Background floating pieces */}
          {["♜","♞","♝","♟","♙","♗","♘","♖"].map((p,i)=>(
            <div key={i} style={{
              position:"absolute",
              top: `${10+i*11}%`, right: `${5+i*8}%`,
              fontSize: `${2+i*0.4}rem`,
              color:"rgba(232,184,75,0.03)",
              animation:`float ${3+i*0.5}s ease-in-out infinite`,
              animationDelay:`${i*0.4}s`,
              userSelect:"none", pointerEvents:"none",
            }}>{p}</div>
          ))}

          {/* Tag */}
          <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.3em", color:"#e8b84b", marginBottom:"2.5rem", textTransform:"uppercase", display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ display:"inline-block", width:24, height:1, background:"#e8b84b" }} />
            C Programmer · Chess Strategist · NIT Jalandhar
          </div>

          {/* Name */}
          <h1 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(4rem,8vw,8rem)", letterSpacing:"0.04em", lineHeight:0.9, color:"#f0ece4", marginBottom:"1.5rem" }}>
            Shreyank<br />
            <span style={{ color:"#e8b84b", animation:"glow 3s ease-in-out infinite" }}>Thakur</span>
          </h1>

          {/* Subtitle */}
          <p style={{ fontSize:"1.3rem", fontWeight:300, fontStyle:"italic", color:"#4a5568", maxWidth:560, lineHeight:1.8, marginBottom:"3rem" }}>
            Writing code with the precision of an endgame and the{" "}
            <span style={{ color:"#e8b84b88", fontStyle:"normal" }}>aggression of a King's Gambit</span>.
            Systems programmer. Chess player rated <strong style={{ color:"#c8d6e5", fontStyle:"normal" }}>1600</strong>.
          </p>

          {/* CTA row */}
          <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
            <button onClick={()=>scrollTo("projects")} style={{
              fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.18em",
              textTransform:"uppercase", padding:"0.8rem 1.8rem",
              background:"#e8b84b", color:"#04060a", border:"none", cursor:"pointer", fontWeight:600,
              transition:"all 0.2s",
            }}>
              View Projects
            </button>
            <button onClick={()=>scrollTo("contact")} style={{
              fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.18em",
              textTransform:"uppercase", padding:"0.8rem 1.8rem",
              background:"transparent", color:"#4a5568", border:"1px solid #1e2530",
              cursor:"pointer", transition:"all 0.2s",
            }}>
              Get in Touch
            </button>
          </div>

          {/* Bottom terminal line */}
          <div style={{
            position:"absolute", bottom:"2rem", left:"4rem", right:"4rem",
            fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#1e2530",
            display:"flex", justifyContent:"space-between",
          }}>
            <span>shreyank@nitj:~$ ./portfolio --mode=interactive</span>
            <span style={{ color:"#4ade8033" }}>ELO: 1600 | LANG: C | GPA: ██.█</span>
          </div>
        </div>

        {/* ═══ ABOUT ═══ */}
        <Section id="about">
          <div style={{ padding:"4rem", borderBottom:"1px solid #0d1117" }}>
            <SectionLabel num="01" title="About" />
            <div style={{ display:"grid", gridTemplateColumns:"1.2fr 0.8fr", gap:"4rem", marginTop:"2.5rem", alignItems:"start" }}>
              <div>
                <p style={{ fontSize:"1.2rem", lineHeight:1.95, color:"#7a8899", fontWeight:300, marginBottom:"1.2rem" }}>
                  I am <strong style={{ color:"#c8d6e5", fontWeight:600 }}>Shreyank Thakur</strong>, a Computer Science student at the
                  National Institute of Technology, Jalandhar. My obsession? The{" "}
                  <em style={{ color:"#e8b84b" }}>art of systems programming</em> — building things close to the metal,
                  where every byte counts and every pointer tells a story.
                </p>
                <blockquote style={{
                  borderLeft:"2px solid #e8b84b", paddingLeft:"1.5rem", margin:"2rem 0",
                  fontStyle:"italic", fontSize:"1.2rem", color:"#e8b84b88", lineHeight:1.8,
                }}>
                  "The best code, like the best chess move, is the one you almost didn't see."
                </blockquote>
                <p style={{ fontSize:"1.1rem", lineHeight:1.95, color:"#7a8899", fontWeight:300 }}>
                  My <strong style={{ color:"#c8d6e5", fontWeight:600 }}>1600 chess rating</strong> isn't a side stat — it's
                  a window into how I think. Every bug is a tactical puzzle. Every architecture decision
                  is a positional game. I am driven by curiosity, sharpened by competition, and addicted
                  to building software that is not just functional but{" "}
                  <strong style={{ color:"#c8d6e5", fontWeight:600 }}>elegant in its construction</strong>.
                </p>
              </div>
              <div>
                {/* Terminal card */}
                <div style={{ background:"#0d1117", border:"1px solid #1e2530", borderRadius:6, overflow:"hidden" }}>
                  <div style={{ background:"#0a0c10", padding:"0.5rem 1rem", display:"flex", alignItems:"center", gap:6, borderBottom:"1px solid #1e2530" }}>
                    <div style={{ width:8, height:8, borderRadius:"50%", background:"#ff5f57" }} />
                    <div style={{ width:8, height:8, borderRadius:"50%", background:"#febc2e" }} />
                    <div style={{ width:8, height:8, borderRadius:"50%", background:"#28c840" }} />
                    <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#2d3748", marginLeft:"auto", letterSpacing:"0.1em" }}>
                      whoami.c
                    </span>
                  </div>
                  <div style={{ padding:"1.2rem", fontFamily:"'JetBrains Mono',monospace", fontSize:10.5, lineHeight:2, color:"#4a5568" }}>
                    <div><span style={{ color:"#7c3aed" }}>struct</span> <span style={{ color:"#60a5fa" }}>Developer</span> {"{"}</div>
                    <div style={{ paddingLeft:16 }}>
                      <div><span style={{ color:"#e8b84b" }}>name</span>: <span style={{ color:"#4ade80" }}>"Shreyank Thakur"</span>;</div>
                      <div><span style={{ color:"#e8b84b" }}>college</span>: <span style={{ color:"#4ade80" }}>"NIT Jalandhar"</span>;</div>
                      <div><span style={{ color:"#e8b84b" }}>degree</span>: <span style={{ color:"#4ade80" }}>"B.Tech CSE"</span>;</div>
                      <div><span style={{ color:"#e8b84b" }}>lang</span>: <span style={{ color:"#4ade80" }}>"C / C++"</span>;</div>
                      <div><span style={{ color:"#e8b84b" }}>chess_elo</span>: <span style={{ color:"#fb923c" }}>1600</span>;</div>
                      <div><span style={{ color:"#e8b84b" }}>status</span>: <span style={{ color:"#4ade80" }}>"open_to_work"</span>;</div>
                    </div>
                    <div>{"}"} <span style={{ color:"#c8d6e5" }}>shreyank</span>;</div>
                    <div style={{ marginTop:8, color:"#1e2530" }}>—————————————————</div>
                    <div><span style={{ color:"#2d3748" }}>$</span> <Typewriter text='printf("Hello, World!\n");' speed={55} style={{ color:"#4ade80" }} /></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ SKILLS ═══ */}
        <Section id="skills">
          <div style={{ padding:"4rem", background:"#040709", borderBottom:"1px solid #0d1117" }}>
            <SectionLabel num="02" title="Skills" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", marginTop:"2.5rem" }}>
              <div>
                {SKILLS.map((sk,i)=>(
                  <SkillBar key={sk.name} {...sk} delay={i*100} />
                ))}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, alignContent:"start" }}>
                {[
                  { icon:"⚙️", name:"Low-level Systems", sub:"OS, memory, I/O" },
                  { icon:"🌳", name:"Tree Structures", sub:"AVL, Red-Black, BST" },
                  { icon:"🔗", name:"Linked Lists", sub:"singly, doubly, circular" },
                  { icon:"🧩", name:"Graph Algorithms", sub:"BFS, DFS, Dijkstra" },
                  { icon:"📦", name:"Memory Management", sub:"malloc, free, GC concepts" },
                  { icon:"💻", name:"Dev Tools", sub:"GCC, GDB, Git, Valgrind" },
                ].map(({icon,name,sub})=>(
                  <div key={name} className="sk" style={{
                    background:"#0d1117", border:"1px solid #1e2530", borderRadius:6,
                    padding:"1rem", transition:"transform 0.2s", cursor:"default",
                  }}>
                    <div style={{ fontSize:20, marginBottom:6 }}>{icon}</div>
                    <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#c8d6e5", letterSpacing:"0.05em", marginBottom:3 }}>{name}</div>
                    <div style={{ fontSize:11, color:"#2d3748", fontStyle:"italic" }}>{sub}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ PROJECTS ═══ */}
        <Section id="projects">
          <div style={{ padding:"4rem", borderBottom:"1px solid #0d1117" }}>
            <SectionLabel num="03" title="Projects" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginTop:"2.5rem" }}>
              {PROJECTS.map((p,i)=>(
                <div key={p.id} className="pc" onMouseEnter={()=>setHoveredProject(p.id)} onMouseLeave={()=>setHoveredProject(null)} style={{
                  background: p.tag==="FEATURED"?"#0a0e15":"#0d1117",
                  border: p.tag==="FEATURED"?"1px solid rgba(232,184,75,0.25)":"1px solid #1e2530",
                  borderRadius:6, padding:"1.8rem",
                  gridColumn: p.tag==="FEATURED"?"1/-1":"auto",
                  display: p.tag==="FEATURED"?"grid":"block",
                  gridTemplateColumns: p.tag==="FEATURED"?"1fr auto":"none",
                  gap:"3rem", alignItems:"center",
                  transition:"all 0.25s", cursor:"default",
                }}>
                  {p.tag==="FEATURED" ? (
                    <>
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:"1rem" }}>
                          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:"#e8b84b", border:"1px solid rgba(232,184,75,0.3)", padding:"2px 8px", borderRadius:2 }}>
                            ★ {p.tag}
                          </span>
                          <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#2d3748", letterSpacing:"0.1em" }}>{p.id}</span>
                        </div>
                        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:32, color:"#f0ece4", letterSpacing:"0.05em", marginBottom:"0.8rem" }}>{p.title}</div>
                        <p style={{ fontSize:"1rem", color:"#4a5568", lineHeight:1.8, fontWeight:300, marginBottom:"1.2rem" }}>{p.desc}</p>
                        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                          {p.tech.map(t=>(
                            <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.12em", padding:"3px 8px", border:"1px solid rgba(232,184,75,0.2)", color:"#e8b84b", borderRadius:2 }}>{t}</span>
                          ))}
                        </div>
                      </div>
                      <div style={{ fontSize:"7rem", color:"rgba(232,184,75,0.12)", lineHeight:1, userSelect:"none", textAlign:"center", minWidth:120 }}>
                        {p.icon}
                      </div>
                    </>
                  ) : (
                    <>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:"0.8rem" }}>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.2em", color:"#4a5568", border:"1px solid #1e2530", padding:"2px 8px", borderRadius:2 }}>{p.tag}</span>
                        <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#1e2530" }}>{p.id}</span>
                        <span style={{ marginLeft:"auto", fontSize:"1.2rem", color:"rgba(232,184,75,0.2)" }}>{p.icon}</span>
                      </div>
                      <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:24, color:"#c8d6e5", letterSpacing:"0.05em", marginBottom:"0.6rem" }}>{p.title}</div>
                      <p style={{ fontSize:"0.95rem", color:"#4a5568", lineHeight:1.8, fontWeight:300, marginBottom:"1rem" }}>{p.desc}</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:5 }}>
                        {p.tech.map(t=>(
                          <span key={t} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, letterSpacing:"0.1em", padding:"2px 7px", border:"1px solid #1e2530", color:"#2d3748", borderRadius:2 }}>{t}</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* ═══ CHESS ═══ */}
        <Section id="chess">
          <div style={{ padding:"4rem", background:"#040709", borderBottom:"1px solid #0d1117" }}>
            <SectionLabel num="04" title="The Chess Mind" />
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"4rem", marginTop:"2.5rem", alignItems:"center" }}>
              {/* Big rating display */}
              <div style={{ textAlign:"center" }}>
                <div style={{
                  fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(5rem,12vw,9rem)",
                  color:"#e8b84b", lineHeight:1, letterSpacing:"0.04em",
                  animation:"glow 3s ease-in-out infinite",
                }}>
                  1600
                </div>
                <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.3em", color:"#2d3748", textTransform:"uppercase", marginTop:4 }}>
                  Chess ELO · Classical
                </div>
                <div style={{ margin:"2rem auto 0", width:180, height:1, background:"linear-gradient(90deg,transparent,#e8b84b33,transparent)" }} />
                <div style={{ marginTop:"1.5rem", display:"flex", gap:20, justifyContent:"center" }}>
                  {["♚ King's Indian","♞ Sicilian","♙ King's Gambit"].map(o=>(
                    <div key={o} style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#2d3748", letterSpacing:"0.1em" }}>{o}</div>
                  ))}
                </div>
              </div>
              {/* Traits */}
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { icon:"♟", heading:"Pattern Recognition", body:"Spotting mating nets in chess = spotting memory bugs in C. Same neural path." },
                  { icon:"⏱", heading:"Clock Pressure", body:"Blitz chess and ICPC contests both punish indecision. I've learned to act fast and precisely." },
                  { icon:"📘", heading:"Theory Depth", body:"Opening prep mirrors CS fundamentals — the deeper your theory, the faster you improvise." },
                  { icon:"♜", heading:"Endgame Precision", body:"K+R vs K takes technique, not creativity. So does debugging a segfault at 3 AM." },
                ].map(({icon,heading,body})=>(
                  <div key={heading} className="pc" style={{
                    background:"#0d1117", border:"1px solid #1e2530", borderRadius:6,
                    padding:"1rem 1.2rem", display:"flex", gap:14, alignItems:"flex-start",
                    transition:"all 0.2s",
                  }}>
                    <span style={{ fontSize:18, color:"#e8b84b", marginTop:2, flexShrink:0 }}>{icon}</span>
                    <div>
                      <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#c8d6e5", letterSpacing:"0.1em", marginBottom:4 }}>{heading}</div>
                      <div style={{ fontSize:"0.9rem", color:"#4a5568", lineHeight:1.7, fontWeight:300 }}>{body}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ═══ CONTACT ═══ */}
        <Section id="contact">
          <div style={{ padding:"5rem 4rem", borderBottom:"1px solid #0d1117", textAlign:"center", position:"relative", overflow:"hidden" }}>
            {/* bg king */}
            <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", pointerEvents:"none" }}>
              <div style={{ fontSize:"25rem", color:"rgba(232,184,75,0.02)", userSelect:"none", lineHeight:1 }}>♚</div>
            </div>
            <div style={{ position:"relative", zIndex:2 }}>
              <div style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.3em", color:"#e8b84b", marginBottom:"1.5rem", textTransform:"uppercase" }}>
                — Your Move —
              </div>
              <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(3rem,6vw,6rem)", color:"#f0ece4", letterSpacing:"0.05em", lineHeight:1, marginBottom:"1rem" }}>
                Let's Build<br /><span style={{ color:"#e8b84b" }}>Something Great</span>
              </h2>
              <p style={{ fontSize:"1.1rem", color:"#4a5568", fontWeight:300, maxWidth:460, margin:"0 auto 3rem", lineHeight:1.9 }}>
                Open to internships, research, open-source, and any sufficiently interesting engineering problem.
              </p>
              <div style={{ display:"flex", gap:1, justifyContent:"center", flexWrap:"wrap", background:"#0d1117", border:"1px solid #1e2530", maxWidth:620, margin:"0 auto", borderRadius:6, overflow:"hidden" }}>
                {[
                  { label:"Email",    href:"mailto:shreyankthakur@nitj.ac.in", icon:"✉" },
                  { label:"GitHub",   href:"https://github.com/shreyankthakur",    icon:"⌥" },
                  { label:"LinkedIn", href:"https://linkedin.com/in/shreyankthakur", icon:"◈" },
                  { label:"Lichess",  href:"https://lichess.org/@/shreyankthakur", icon:"♟" },
                ].map(({label,href,icon})=>(
                  <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                    flex:1, minWidth:120, padding:"1.1rem 1rem",
                    fontFamily:"'JetBrains Mono',monospace", fontSize:10, letterSpacing:"0.15em",
                    textTransform:"uppercase", color:"#4a5568", background:"#0d1117",
                    border:"none", display:"flex", flexDirection:"column", alignItems:"center", gap:6,
                    cursor:"pointer", transition:"all 0.2s", textDecoration:"none",
                  }}
                  onMouseEnter={e=>{e.currentTarget.style.background="#131920";e.currentTarget.style.color="#e8b84b";}}
                  onMouseLeave={e=>{e.currentTarget.style.background="#0d1117";e.currentTarget.style.color="#4a5568";}}
                  >
                    <span style={{ fontSize:18 }}>{icon}</span>
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* FOOTER */}
        <footer style={{
          padding:"1.5rem 4rem", borderTop:"1px solid #0d1117",
          display:"flex", justifyContent:"space-between", alignItems:"center",
          fontFamily:"'JetBrains Mono',monospace", fontSize:9, color:"#1e2530",
          letterSpacing:"0.15em", textTransform:"uppercase",
        }}>
          <span>Shreyank Thakur · B.Tech CSE · NIT Jalandhar</span>
          <span>♚ 1600 ELO · C Programmer · Built with precision</span>
        </footer>
      </main>
    </div>
  );
}

/* ── SECTION LABEL ── */
function SectionLabel({num, title}) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
      <span style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:10, color:"#e8b84b", letterSpacing:"0.2em" }}>
        {num}
      </span>
      <h2 style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(1.8rem,3vw,2.5rem)", color:"#f0ece4", letterSpacing:"0.06em" }}>
        {title}
      </h2>
      <div style={{ flex:1, height:1, background:"#1e2530" }} />
    </div>
  );
}