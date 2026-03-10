import { useState } from "react";

// ── Google Fonts loaded via @import in the style block below ──
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:   #f5f0e8;
    --ink:     #1a1612;
    --warm:    #c8a96e;
    --rust:    #b85c38;
    --muted:   #7a7068;
    --card:    #fdfaf4;
    --border:  #e2d9c8;
  }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'DM Sans', sans-serif;
    font-weight: 300;
    line-height: 1.75;
    min-height: 100vh;
  }

  /* ── NAV ── */
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--ink);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    height: 60px;
    border-bottom: 2px solid var(--warm);
  }

  nav .logo {
    font-family: 'Playfair Display', serif;
    font-size: 1.15rem;
    color: var(--warm);
    letter-spacing: 0.03em;
  }

  nav ul {
    list-style: none;
    display: flex;
    gap: 2rem;
  }

  nav ul li button {
    background: none;
    border: none;
    color: #ccc;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 4px 0;
    border-bottom: 1px solid transparent;
    transition: color 0.2s, border-color 0.2s;
  }

  nav ul li button:hover,
  nav ul li button.active {
    color: var(--warm);
    border-color: var(--warm);
  }

  /* ── HERO ── */
  .hero {
    background: var(--ink);
    color: var(--cream);
    padding: 6rem 2.5rem 5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 60% 40%, rgba(200,169,110,0.12) 0%, transparent 70%);
    pointer-events: none;
  }

  .hero .eyebrow {
    font-size: 0.78rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--warm);
    margin-bottom: 1.2rem;
  }

  .hero h1 {
    font-family: 'Playfair Display', serif;
    font-size: clamp(2.4rem, 6vw, 4.2rem);
    line-height: 1.15;
    margin-bottom: 1.2rem;
  }

  .hero h1 em {
    font-style: italic;
    color: var(--warm);
  }

  .hero p {
    max-width: 520px;
    margin: 0 auto;
    color: #b0a898;
    font-size: 1rem;
  }

  /* ── LAYOUT ── */
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* ── PAGE TRANSITION ── */
  .page {
    max-width: 820px;
    margin: 0 auto;
    padding: 4rem 2rem 6rem;
    animation: pageEnter 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  @keyframes pageEnter {
    from {
      opacity: 0;
      transform: translateY(30px) scale(0.98);
      filter: blur(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
      filter: blur(0);
    }
  }

  /* ── SECTION TITLE ── */
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 2.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .section-title::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* ── POST CARD ── */
  .post-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 2px;
    margin-bottom: 2.5rem;
    overflow: hidden;
    transition: box-shadow 0.25s;
  }

  .post-card:hover { box-shadow: 0 6px 28px rgba(26,22,18,0.08); }

  .post-header {
    padding: 2rem 2.2rem 1.4rem;
    border-bottom: 1px solid var(--border);
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;
  }

  .post-header:hover .post-num { color: var(--rust); }

  .post-meta { flex: 1; }

  .post-num {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: var(--warm);
    margin-bottom: 0.5rem;
    transition: color 0.2s;
  }

  .post-title {
    font-family: 'Playfair Display', serif;
    font-size: 1.45rem;
    line-height: 1.3;
    margin-bottom: 0.5rem;
  }

  .post-date {
    font-size: 0.8rem;
    color: var(--muted);
  }

  .toggle-icon {
    font-size: 1.4rem;
    color: var(--warm);
    line-height: 1;
    flex-shrink: 0;
    margin-top: 0.25rem;
    transition: transform 0.3s;
  }

  .toggle-icon.open { transform: rotate(45deg); }

  .post-body {
    padding: 2rem 2.2rem 2.4rem;
    display: none;
    animation: fadeIn 0.3s ease;
  }

  .post-body.open { display: block; }

  .post-body p { margin-bottom: 1.1rem; color: #3a3530; }
  .post-body p:last-child { margin-bottom: 0; }

  .post-body h3 {
    font-family: 'Playfair Display', serif;
    font-size: 1.05rem;
    margin: 1.6rem 0 0.6rem;
    color: var(--ink);
  }

  /* quote block */
  .pull-quote {
    border-left: 3px solid var(--warm);
    margin: 1.4rem 0;
    padding: 0.8rem 1.3rem;
    background: rgba(200,169,110,0.07);
    font-family: 'Playfair Display', serif;
    font-style: italic;
    font-size: 1.05rem;
    color: var(--ink);
  }

  /* placeholder link */
  .placeholder-link {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    margin: 0.4rem 0;
    padding: 0.45rem 0.9rem;
    border: 1px dashed var(--warm);
    border-radius: 2px;
    font-size: 0.82rem;
    color: var(--warm);
    background: rgba(200,169,110,0.06);
    font-family: 'DM Sans', sans-serif;
    letter-spacing: 0.04em;
  }

  /* ── ABOUT ── */
  .about-card {
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 2px;
    padding: 2.5rem 2.2rem;
  }

  .about-card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    margin-bottom: 0.3rem;
  }

  .about-card .tagline {
    font-size: 0.85rem;
    color: var(--muted);
    margin-bottom: 1.6rem;
    letter-spacing: 0.04em;
  }

  .about-card p { margin-bottom: 1rem; color: #3a3530; }

  .video-container {
    margin-top: 2.5rem;
    border: 1px solid var(--border);
    border-radius: 4px;
    overflow: hidden;
    background: var(--ink);
    aspect-ratio: 9 / 16;
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 10px 30px rgba(0,0,0,0.15);
  }

  .video-container video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
  }

  /* ── FOOTER ── */
  footer {
    background: var(--ink);
    color: var(--muted);
    text-align: center;
    padding: 2rem;
    font-size: 0.82rem;
    border-top: 1px solid #2d2824;
  }

  footer span { color: var(--warm); }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    nav {
      padding: 0 1.5rem;
    }
    nav ul {
      gap: 1.25rem;
    }
    nav ul li button {
      font-size: 0.75rem;
    }
    .hero {
      padding: 4.5rem 1.5rem 3.5rem;
    }
    .hero h1 {
      font-size: clamp(2rem, 8vw, 3rem);
    }
    .page {
      padding: 2.5rem 1.25rem 4rem;
    }
    .post-header, .post-body, .about-card {
      padding: 1.5rem 1.25rem;
    }
    .post-title {
      font-size: 1.3rem;
    }
    .section-title {
      margin-bottom: 2rem;
    }
  }

  @media (max-width: 480px) {
    nav {
      flex-direction: column;
      height: auto;
      padding: 1.25rem;
      gap: 0.75rem;
    }
    nav .logo {
      font-size: 1rem;
    }
    nav ul {
      gap: 1.5rem;
    }
    .hero h1 {
      font-size: 2.2rem;
    }
    .about-card h2 {
      font-size: 1.5rem;
    }
    .footer {
      padding: 1.5rem;
    }
  }

  /* ── PASSCODE SCREEN ── */
  .passcode-overlay {
    position: fixed;
    inset: 0;
    background: var(--ink);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .passcode-card {
    background: var(--card);
    border: 1px solid var(--border);
    padding: 3rem 2.5rem;
    width: 100%;
    max-width: 400px;
    text-align: center;
    animation: pageEnter 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
  }

  .passcode-card h2 {
    font-family: 'Playfair Display', serif;
    font-size: 1.8rem;
    margin-bottom: 0.8rem;
    color: var(--ink);
  }

  .passcode-card p {
    font-size: 0.9rem;
    color: var(--muted);
    margin-bottom: 2rem;
  }

  .passcode-input-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .passcode-input {
    background: var(--cream);
    border: 1px solid var(--border);
    padding: 1rem;
    font-family: 'DM Sans', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    letter-spacing: 0.5em;
    color: var(--ink);
    border-radius: 2px;
  }

  .passcode-input:focus {
    outline: none;
    border-color: var(--warm);
  }

  .passcode-btn {
    background: var(--warm);
    color: white;
    border: none;
    padding: 1rem;
    font-family: 'DM Sans', sans-serif;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    cursor: pointer;
    transition: background 0.2s;
    border-radius: 2px;
  }

  .passcode-btn:hover {
    background: var(--rust);
  }

  .passcode-error {
    color: var(--rust);
    font-size: 0.85rem;
    margin-top: 1rem;
    font-weight: 500;
  }

  .lockout-msg {
    color: var(--rust);
    font-weight: 500;
    margin-top: 1rem;
  }
`;

// ── DATA ──────────────────────────────────────────────────────────────────────

const posts = [
  {
    id: 1,
    num: "Entry 01",
    title: "Management vs. Leadership",
    date: "March 2025",
    content: (
      <>
        <p>
          Peter Drucker's quote, "Management is doing things right. Leadership is doing the right
          things," really captures the difference between the two. Management is about getting tasks
          done efficiently. Leadership is about making thoughtful decisions that take people and
          values into account. To me, leadership means caring for others and guiding them in the
          right direction, even when it takes extra effort.
        </p>
        <p>
          I experienced this during a group project in my geography class. At first, everyone
          thought one group member was slacking off and not contributing. Instead of getting
          frustrated and complaining about it, I chose to talk to him privately. I learned he was
          struggling to keep up in his other classes and had fallen behind. I helped him organize
          his work and catch up. Over time he improved and became a strong contributor to the
          group, and we eventually became good friends.
        </p>
        <div className="pull-quote">
          "Empathy is a crucial element in modern workplace settings, as it contributes to building
          a trusting work environment and supporting employee mental health." — Harvard Business
        </div>
        <p>
          This experience showed me that real leadership is about understanding others and taking
          action to support them, not simply making sure the project gets finished on time.
        </p>
      </>
    ),
  },
  {
    id: 2,
    num: "Entry 02",
    title: "Failure Is Feedback",
    date: "March 2025",
    content: (
      <>
        <p>
          Failure is feedback, and after sitting with the ideas from the three videos we watched,
          I genuinely believe that now more than I ever have before.
        </p>
        <p>
          In Will Smith's video, what really struck me was when he talked about the gym and muscle
          failure. He said that you actually want to experience muscle failure because that is where
          the growth really happens. I had never thought about it that way before. Failure is not
          the opposite of success. Failure is actually part of the process.
        </p>
        <p>
          In Brene Brown's video about shame and vulnerability, what caught my attention was her
          point that vulnerability is really a form of courage. After her TED Talk went viral, she
          wanted to hide and pull back from the world. But that openness is exactly what connected
          her to people. That really stuck with me.
        </p>
        <p>
          In the Failure is Necessary video, the speaker shared that he went skydiving to face his
          fear head on. As a young entrepreneur, he said he failed more times than he could count.
          The key was not whether he failed but what he did after failing that defined him.
        </p>
        <div className="pull-quote">
          "It's not whether you fail. It's what you do after you fail that defines you."
        </div>
        <p>
          My biggest failure was not making the volleyball team in Grade 9. I had put in my best
          effort and still did not get the outcome I wanted. But reframing it the way these videos
          taught me to, that experience was actually showing me exactly where I needed to grow. It
          pushed me to keep playing on my own and with my brother, and I got better because of it.
          If I had not failed, I would not have gotten that.
        </p>
        <p>
          What I am taking away from this is simple. Stop being afraid of failure. Be afraid of
          not trying. Because failure is just feedback, and feedback is how we grow.
        </p>
        <p>
          <em>
            📎 Video reflection attached below:
          </em>
        </p>
        <div className="placeholder-link">▶ [INSERT FAILURE VIDEO RECORDING HERE]</div>
      </>
    ),
  },
  {
    id: 3,
    num: "Entry 03",
    title: "The Magic of Thinking Big — Chapter 1",
    date: "March 2025",
    content: (
      <>
        <h3>Messages That Stood Out</h3>
        <p>
          The biggest thing that hit me in the first chapter of The Magic of Thinking Big is how
          much our beliefs actually shape our outcomes. Schwartz makes the case that it is not
          talent, luck, or intelligence that separates successful people from everyone else. It is
          the size of their thinking. The people who achieve the most are not necessarily the
          smartest people in the room. They are the ones who believe that what they want is
          actually possible for them. That idea felt both simple and completely powerful at the
          same time.
        </p>
        <p>
          Another thing that stood out was the idea that most people underestimate themselves not
          because they lack ability but because they have convinced themselves of their own
          limitations. Schwartz calls this "excusitis," which is basically the habit of leaning on
          excuses like not being smart enough, not having enough experience, or being too young or
          too old. These excuses feel real but they are mostly mental blocks we build for ourselves.
        </p>
        <h3>What Gets in the Way of Positive Thinking?</h3>
        <p>
          Honestly, I think the biggest obstacle to positive thinking is comparison. The second
          you start measuring yourself against someone else, it becomes very easy to convince
          yourself that you are behind or not good enough. Social media makes this worse because
          you are only ever seeing the highlight reel of other people's lives, not the full picture.
        </p>
        <p>
          Self doubt also feeds into negative thinking in a big way. Once you start questioning
          your own abilities, it can spiral quickly. And once you are in that spiral, it affects
          everything you do. Schwartz argues that positive thinking is not about ignoring reality
          but about refusing to let fear and doubt make decisions for you. I think that is a
          really important distinction. Positive thinking is not pretending problems do not exist.
          It is choosing to focus on what you can do rather than what you cannot.
        </p>
        <p>
          In my opinion, the way you think absolutely determines how successful you are. Not
          because thinking positively magically creates good results, but because when you believe
          something is possible, you take actions that move toward it. When you believe something
          is impossible, you stop trying before you even start. That difference in action is what
          actually creates different outcomes.
        </p>
        <h3>Mr. Triumph vs. Mr. Defeat</h3>
        <p>
          Honestly, when I wake up in the morning for school, the voice I hear depends almost
          entirely on how the week is going. On a day after I've done well on something or had a
          good practice, Mr. Triumph shows up pretty easily. He tells me I can handle the day,
          that things will work out, and that putting in effort is worth it.
        </p>
        <p>
          But on a rough week, especially if I'm tired or stressed about assignments, Mr. Defeat
          is a lot louder. He sounds like: "Just get through it. It doesn't really matter. Nobody
          will notice either way." That voice does not push me to do anything extra. It just tries
          to convince me to do the bare minimum and move on.
        </p>
        <p>
          The voice definitely shifts throughout the day. If something goes well early on, like a
          good conversation with a friend or a class I actually enjoy, Mr. Triumph tends to take
          over. But if something frustrating happens first thing, that sets a tone that is harder
          to shake. Reading this chapter actually made me more aware of that. I think the biggest
          takeaway is that I can choose to be more deliberate about which voice I listen to,
          instead of just going along with wherever my mood takes me.
        </p>
      </>
    ),
  },
  {
    id: 4,
    num: "Entry 04",
    title: "Organizations in the New Workplace",
    date: "March 2025",
    content: (
      <>
        <p>
          <em>Resources referenced: Women Only Workspaces, Pixar Spark Shorts, 20 Incredible
            Perks, 5 Unreal Employee Perks, 10 Companies with the Best Perks, 4 Day Workweek,
            Leadership Lessons from Dancing Guy.</em>
        </p>

        <h3>Women Only Workspaces</h3>
        <p>
          My honest reaction to women only workspaces is that I understand why they exist, even if
          they feel complicated. From a societal standpoint, there are still real barriers that
          women face in many professional environments, things like being talked over, having ideas
          credited to someone else, or feeling unsafe in certain spaces. A women only workspace
          removes some of those barriers by creating an environment where people do not have to
          spend energy navigating them.
        </p>
        <p>
          From a leadership and management perspective though, the best workplaces are ones where
          inclusion works for everyone. The goal should be building cultures where any person, no
          matter their gender, feels heard and respected without needing a separate space to
          experience that. So while I see women only spaces as a practical response to a real
          problem, the deeper work is about changing workplace culture from the inside.
        </p>
        <p>
          The Pixar Spark Short connects to this really well. The short films from Pixar often
          center characters who are underestimated or who feel like they do not belong in the
          spaces they are trying to enter. That theme is directly relevant here. Real inclusion
          means creating environments where people do not have to fight just to be seen as capable
          of doing the work. When a workplace gets that right, separate spaces become less
          necessary.
        </p>

        <h3>Employee Perks I Would Actually Value</h3>
        <p>
          Out of all the perks mentioned across the resources, the ones that stood out to me the
          most were flexible hours and remote work options. The idea that I could structure my
          workday in a way that fits how I actually function, rather than just showing up from 9
          to 5 because that is tradition, feels genuinely motivating. I am more productive at
          certain times of day than others, and having the flexibility to work with that rather
          than against it would make a real difference.
        </p>
        <p>
          Mental health support and wellness benefits came in a close second. After everything
          discussed in our unit on failure and resilience, it is clear that performance at work
          is closely tied to how a person is doing mentally. Companies that invest in that are
          signaling that they see employees as people, not just producers.
        </p>

        <h3>Leadership Lessons from Dancing Guy</h3>
        <p>
          The Dancing Guy video is one of those things that is funny on the surface but actually
          holds a really interesting leadership lesson underneath. The first person dancing alone
          looks ridiculous. The second person who joins is arguably the most important person in
          the whole scenario. That is the moment it shifts from one person being weird to a
          movement starting.
        </p>
        <p>
          The lesson I take from it is that leadership is not always about being the loudest or
          the most visible person in the room. Sometimes leadership is being the first person
          willing to follow someone who has a good idea, giving them the credibility they need for
          others to join in. In my own life, I think about how often I have held back from showing
          genuine enthusiasm about something because I was worried about how it would look. This
          video is a good reminder that momentum starts with someone being willing to go first,
          and that being that person, the first follower, is just as important as leading.
        </p>

        <h3>The 4 Day Workweek</h3>
        <p>
          I am genuinely in favour of a 4 day workweek, and the research seems to support the
          idea that it works. The studies I have seen show that productivity does not drop and
          in many cases actually improves when people work fewer days. When you know you have one
          less day, you tend to be more focused and less likely to stretch tasks out to fill the
          time.
        </p>
        <p>
          That said, it clearly does not work for every profession. First responders, nurses, and
          essential workers cannot simply close up for a 3 day weekend. For those roles, a 4 day
          week would need to be structured differently, like rotating schedules, which is more
          complex to manage but not impossible.
        </p>
        <p>
          For teaching, it is a really interesting question. Some schools in rural areas have
          already tried it and it has helped with teacher retention. But for families, especially
          those with young children, an extra day off school creates a childcare problem that does
          not have an easy answer.
        </p>
        <p>
          For students in elementary school specifically, I think the routine and structure of 5
          days actually benefits younger kids more than the extra day off would. Development and
          learning at that age relies on consistency. Overall I think the 4 day workweek is a
          great direction to move toward where it makes sense, but it needs to be implemented
          thoughtfully and not applied as a blanket rule across every sector.
        </p>
      </>
    ),
  },
];

// ── COMPONENT ─────────────────────────────────────────────────────────────────

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [attempts, setAttempts] = useState(() => {
    return parseInt(localStorage.getItem("passcode_attempts") || "0");
  });
  const [lockoutUntil, setLockoutUntil] = useState(() => {
    return parseInt(localStorage.getItem("passcode_lockout") || "0");
  });
  const [error, setError] = useState("");

  const [view, setView] = useState("blog"); // "blog" | "about"
  const [openPost, setOpenPost] = useState<number | null>(null);

  const toggle = (id: number) => setOpenPost(openPost === id ? null : id);

  const handlePasscodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();

    if (now < lockoutUntil) {
      setError(`Locked out. Try again in ${Math.ceil((lockoutUntil - now) / 60000)} minutes.`);
      return;
    }

    if (passcode === "456") {
      setIsAuthenticated(true);
      setAttempts(0);
      localStorage.setItem("passcode_attempts", "0");
      localStorage.setItem("passcode_lockout", "0");
      setError("");
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      localStorage.setItem("passcode_attempts", newAttempts.toString());

      if (newAttempts >= 3) {
        const lockoutTime = now + 3600000; // 1 hour
        setLockoutUntil(lockoutTime);
        localStorage.setItem("passcode_lockout", lockoutTime.toString());
        setError("Too many failed attempts. Locked out for 1 hour.");
      } else {
        setError(`Incorrect passcode. ${3 - newAttempts} attempts remaining.`);
      }
    }
  };

  if (!isAuthenticated) {
    const isLocked = Date.now() < lockoutUntil;
    return (
      <div className="passcode-overlay">
        <style>{styles}</style>
        <div className="passcode-card">
          <h2>Private Journal</h2>
          <p>{isLocked ? "Access temporarily disabled." : "Enter the passcode to view this site."}</p>

          {!isLocked ? (
            <form onSubmit={handlePasscodeSubmit} className="passcode-input-container">
              <input
                type="password"
                className="passcode-input"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="•••"
                maxLength={3}
                autoFocus
              />
              <button type="submit" className="passcode-btn">Enter</button>
            </form>
          ) : (
            <div className="lockout-msg">
              Locked out until {new Date(lockoutUntil).toLocaleTimeString()}
            </div>
          )}

          {error && <div className="passcode-error">{error}</div>}
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{styles}</style>

      {/* NAV */}
      <nav>
        <div className="logo">Luminary</div>
        <ul>
          <li>
            <button
              className={view === "blog" ? "active" : ""}
              onClick={() => setView("blog")}
            >
              Blog
            </button>
          </li>
          <li>
            <button
              className={view === "about" ? "active" : ""}
              onClick={() => setView("about")}
            >
              About Me
            </button>
          </li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero">
        <p className="eyebrow">BOH4MO-05 · Course Blog</p>
        <h1>
          Luminary
        </h1>
        <p>
          A personal journal of leadership reflections, honest failures, and the
          slow but real work of thinking bigger.
        </p>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="page" key={view}>
        {view === "blog" && (
          <>
            <div className="section-title">Blog Entries</div>
            {posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-header" onClick={() => toggle(post.id)}>
                  <div className="post-meta">
                    <div className="post-num">{post.num}</div>
                    <div className="post-title">{post.title}</div>
                    <div className="post-date">{post.date}</div>
                  </div>
                  <div className={`toggle-icon${openPost === post.id ? " open" : ""}`}>+</div>
                </div>
                <div className={`post-body${openPost === post.id ? " open" : ""}`}>
                  {post.content}
                </div>
              </div>
            ))}
          </>
        )}

        {view === "about" && (
          <>
            <div className="section-title">About Me</div>
            <div className="about-card">
              <h2>Hey, I'm Naman 👋</h2>
              <p className="tagline">Leadership Student · Abbey Park High School · Grade 12</p>

              <p>
                Welcome to Luminary, my personal leadership blog for my Business Leadership
                course. This space is where I work through ideas, reflect on experiences, and
                figure out what leadership actually looks like in real life, not just in textbooks.
              </p>
              <p>
                Outside of school, I spend a lot of time playing volleyball, playing music, and
                working on creative projects. Leadership for me is not some far off concept. I
                think it shows up every day in how you treat people, how you handle setbacks, and
                whether you are willing to show up even when it is uncomfortable.
              </p>
              <p>
                I am taking this course because I want to understand what it actually means to lead,
                not just manage. My goal by the end of the semester is to walk away with a clearer
                sense of who I am as a leader and what I want to do with that.
              </p>
              <p>
                Thanks for being here. I hope something you read in this blog is useful or
                at least honest enough to be interesting.
              </p>

              <div className="video-container">
                <video
                  src="/vid.mp4"
                  controls
                  playsInline
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </>
        )}
      </div>

      {/* FOOTER */}
      <footer>
        <p>
          <span>Luminary</span> · BOH4MO-05 Blog by Naman · {new Date().getFullYear()}
        </p>
      </footer>
    </>
  );
}