import { useState } from "react";

// ── Google Fonts loaded via @import in the style block below ──
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --cream:   #f7f3ed;
    --ink:     #1a1612;
    --warm:    #c8a96e;
    --rust:    #b85c38;
    --muted:   #8a827a;
    --card:    #ffffff;
    --border:  #eadeca;
    --accent:  #d4b17a;
  }

  body {
    background: var(--cream);
    color: var(--ink);
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 400;
    line-height: 1.6;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }

  body::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: url("https://www.transparenttextures.com/patterns/natural-paper.png"),
                radial-gradient(circle at 20% 30%, rgba(200, 169, 110, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 80% 70%, rgba(184, 92, 56, 0.05) 0%, transparent 50%);
    opacity: 0.6;
    pointer-events: none;
    z-index: 1000;
  }

  /* Grain overlay */
  body::after {
    content: "";
    position: fixed;
    inset: 0;
    width: 100%;
    height: 100%;
    background-image: url("https://grainy-gradients.vercel.app/noise.svg");
    opacity: 0.07;
    pointer-events: none;
    z-index: 1001;
    filter: contrast(150%) brightness(100%);
  }

  /* ── NAV ── */
  nav {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(26, 22, 18, 0.85); /* Semi-transparent ink */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.5rem;
    height: 60px;
    border-bottom: 2px solid var(--warm);
    overflow: hidden;
  }

  /* Abstract accent in nav */
  nav::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 200%;
    height: 2px;
    background: linear-gradient(90deg, transparent, var(--warm), var(--rust), var(--warm), transparent);
    animation: flowLine 8s linear infinite;
  }

  @keyframes flowLine {
    0% { transform: translateX(-50%); }
    100% { transform: translateX(0%); }
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
    font-family: 'Instrument Sans', sans-serif;
    font-size: 0.85rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    cursor: pointer;
    padding: 4px 0;
    border-bottom: 2px solid transparent;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  nav ul li button:hover,
  nav ul li button.active {
    color: var(--warm);
    border-color: var(--warm);
  }

  /* ── HERO ── */
  .hero {
    background: var(--ink) url('./assets/hero-bg.png') no-repeat center center;
    background-size: cover;
    color: var(--cream);
    padding: 10rem 2.5rem 8rem; /* Increased padding */
    text-align: center;
    position: relative;
    overflow: hidden;
    min-height: 50vh; /* Ensure more of the image is visible */
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(26, 22, 18, 0.4), rgba(26, 22, 18, 0.8)); /* Lightened overlay */
    z-index: 1;
  }

  /* ... rest of hero styles ... */

  .post-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 4px;
    margin: 1.5rem 0;
    border: 1px solid var(--border);
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  }

  .video-link {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 1.5rem;
    background: var(--ink);
    color: var(--warm);
    text-decoration: none;
    border-radius: 4px;
    font-size: 0.9rem;
    font-weight: 500;
    margin-top: 1rem;
    transition: all 0.2s;
    border: 1px solid var(--warm);
  }

  .video-link:hover {
    background: var(--warm);
    color: var(--ink);
  }

  /* Abstract floating blobs */
  .hero::after {
    content: '';
    position: absolute;
    width: 40vw;
    height: 40vw;
    background: radial-gradient(circle, var(--warm) 0%, transparent 70%);
    opacity: 0.15;
    filter: blur(60px);
    top: -10%;
    right: -10%;
    border-radius: 50%;
    animation: floatBlob 20s infinite alternate ease-in-out;
    z-index: 0;
  }

  .hero-blob-2 {
    content: '';
    position: absolute;
    width: 30vw;
    height: 30vw;
    background: radial-gradient(circle, var(--rust) 0%, transparent 70%);
    opacity: 0.1;
    filter: blur(50px);
    bottom: -5%;
    left: -5%;
    border-radius: 50%;
    animation: floatBlob 15s infinite alternate-reverse ease-in-out;
    z-index: 0;
  }

  @keyframes floatBlob {
    0% { transform: translate(0, 0) scale(1); }
    100% { transform: translate(-50px, 30px) scale(1.1); }
  }

  .hero > * {
    position: relative;
    z-index: 2;
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

  /* ── DECORATIVE BOBBING VISUALS ── */
  .post-card-wrapper {
    position: relative;
    margin-bottom: 8rem;
  }

  .bob-visual {
    position: absolute;
    z-index: -1;
    pointer-events: auto;
    opacity: 0.2;
    transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
  }
  
  .bob-visual:hover {
    opacity: 0.9;
    transform: scale(1.5) !important;
    filter: drop-shadow(0 0 15px rgba(200, 169, 110, 0.3));
    z-index: 10;
  }

  .bob-visual svg {
    width: 100%;
    height: 100%;
    fill: none;
    stroke: var(--warm);
    stroke-width: 1.2;
    stroke-linecap: round;
    transition: fill 0.3s;
  }

  .bob-visual.filled svg {
    fill: rgba(200, 169, 110, 0.25); /* More solid warm tint */
  }

  .bob-visual.filled.rust svg {
    fill: rgba(184, 92, 56, 0.25); /* More solid rust tint */
    stroke: var(--rust);
  }

  /* Push to screen edges and move MORE */
  .bob-visual-1 { 
    top: -60px; 
    left: min(-150px, calc(-50vw + 300px)); 
    animation: spin-bob-1 15s linear infinite; 
  }
  
  .bob-visual-2 { 
    bottom: -60px; 
    right: min(-150px, calc(-50vw + 300px)); 
    animation: spin-bob-2 18s linear infinite reverse; 
  }

  @keyframes spin-bob-1 {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(-40px, -60px) rotate(90deg); }
    50% { transform: translate(20px, -110px) rotate(180deg); }
    75% { transform: translate(50px, -50px) rotate(270deg); }
    100% { transform: translate(0, 0) rotate(360deg); }
  }

  @keyframes spin-bob-2 {
    0% { transform: translate(0, 0) rotate(0deg); }
    25% { transform: translate(50px, 80px) rotate(-90deg); }
    50% { transform: translate(-30px, 140px) rotate(-180deg); }
    75% { transform: translate(-60px, 70px) rotate(-270deg); }
    100% { transform: translate(0, 0) rotate(-360deg); }
  }

  @media (max-width: 950px) {
    .bob-visual { display: none; }
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
      transform: translateY(20px);
      filter: blur(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0);
    }
  }

  /* ── PERSONAL TOUCHES ── */
  .handwritten {
    font-family: 'Playfair Display', serif;
    font-style: italic;
    color: var(--accent);
    position: relative;
    display: inline-block;
  }
  
  .handwritten::after {
    content: "";
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: var(--accent);
    transform: scaleX(0);
    transform-origin: right;
    transition: transform 0.6s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .handwritten:hover::after {
    transform: scaleX(1);
    transform-origin: left;
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
    border-radius: 8px;
    margin-bottom: 2rem;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 4px 20px rgba(0,0,0,0.03);
    position: relative;
  }

  .post-card::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 4px;
    height: 100%;
    background: var(--warm);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .post-card:hover { 
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(26,22,18,0.08); 
  }

  .post-card:hover::before {
    opacity: 1;
  }

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
    font-size: 0.9rem;
    color: var(--muted);
    margin-bottom: 2rem;
    letter-spacing: 0.02em;
    font-style: italic;
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
    font-family: 'Instrument Sans', sans-serif;
    font-size: 1.2rem;
    text-align: center;
    letter-spacing: 0.5em;
    color: var(--ink);
    border-radius: 6px;
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
    font-family: 'Instrument Sans', sans-serif;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.3s;
    border-radius: 6px;
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
        <img src="/class.png" alt="Classroom setting" className="post-image" />
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
        <a
          href="https://drive.google.com/file/d/1pAYfJ0pYYYw2u-nOTjfXNcaZ8W16QYIY/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="video-link"
        >
          <span>▶</span> Watch Video Reflection
        </a>
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
          The one thing that really struck me in the first chapter of "The Magic of Thinking Big" by
          Schwartz was the extent to which our beliefs play in shaping the outcomes of our lives.
          What he's saying that it's not the talent, the luck, or the intelligence of the individual
          that sets the successful apart from the unsuccessful. It's the magnitude of their thinking.
          It's not the smartest people in the room who are the ones achieving the most, it's the ones
          who believe what they want to believe is achievable for them. This, in my mind, seems like
          such a simple yet insanely powerful idea at the same time.
        </p>
        <p>
          Another thing that struck me in the book, and one which seems to be the overarching theme,
          is the idea that the majority of us tend to underestimate ourselves not because of any
          lack of ability, but because of the extent to which we've managed to convince ourselves of
          our own limitations. This, he calls "Excusitis," which means the tendency to use excuses
          such as "I'm not smart enough," or "I don't have enough experience," or "I'm too young or too old."
        </p>
        <img src="/plant.png" alt="Growth and potential" className="post-image" />
        <h3>What Gets in the Way of Positive Thinking?</h3>
        <p>
          To be honest, I think what gets in my way of positive thinking is comparison. Once you
          compare yourself to anyone else, it is very easy to talk yourself out of thinking that
          you're not good enough or that you're behind. It is especially difficult with social media
          because all you're seeing is what other people want to portray to you. You're not seeing
          the whole picture.
        </p>
        <p>
          Self doubt is also a huge contributor to negative thinking. Once you doubt yourself and
          your abilities, it is very easy to get caught up in that. Once you get caught up in that
          cycle of negative thinking, it affects everything that you do. "Schwartz explains that
          positive thinking is not about ignoring reality, it is about not allowing fear and doubt to
          dictate your decisions." I think that is a very important distinction. Positive thinking is
          not about ignoring what is going on or pretending that problems don't exist. It is about
          choosing to think about what you can do rather than what you cannot do.
        </p>
        <p>
          How you think is what determines how successful you are. Not because thinking good thoughts
          somehow magically makes good things happen to you, but because when you think something is
          possible, you do things to make it happen. When you think it is impossible, you stop trying
          before you even begin. That is what makes all the difference.
        </p>
        <h3>Mr. Triumph vs. Mr. Defeat</h3>
        <p>
          When I wake up in the morning to go to school, the voice inside my head is almost entirely
          determined by how well the week has been going so far. If it has been going well and I've
          done well on something or at practice, Mr. Triumph is pretty easy to find. He tells me that
          I can get through the day, that things will be okay, and that it is all worth it to try.
        </p>
        <p>
          However, on a not-so-good day, especially when I am tired or stressed out about my
          assignments, Mr. Defeat is definitely louder. He is saying things like: "Just get through
          it. It doesn’t really matter. Nobody will even notice either way." Again, this voice is not
          going to motivate me to do anything out of the ordinary. It is just going to try to talk me
          into doing what is absolutely necessary and then going on with my day.
        </p>
        <p>
          It is definitely not consistent throughout the day. If good things happen at the beginning
          of my day, like a good conversation with a friend or a class that is one of my favorites,
          Mr. Triumph is definitely at work. But if not-so-good things happen at the beginning of my
          day, it is harder to shake that. Reading this chapter has definitely made me more aware of
          this. I think the biggest thing that I learned from this is that I have a choice to be more
          mindful of what voice to listen to rather than going with my moods.
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
        <h3>Women Only Workspaces</h3>
        <p>
          My response to women only workspaces is that, while they are complicated, I understand
          their place. If we look at it from a broader social context, there are still barriers
          and barriers to women in many professional settings. For example, there are women who have
          had their thoughts talked over, women who have had their ideas stolen, and women who have
          had to deal with unsafe spaces. The women only workspaces remove those barriers and allow
          women to not have to deal with those issues.
        </p>
        <p>
          If we look at it from a leadership and management level, the best workplaces are those
          where inclusion is working for everyone. The work is about building cultures where anyone,
          regardless of gender, can feel heard and respected without needing to be in a women-only
          space to do so.
        </p>
        <img src="/workplace.jpeg" alt="Modern Workplace" className="post-image" />
        <p>
          The Pixar Spark Short relates to this really well. There are many short films done by
          Pixar, and many of them tend to focus on characters who are not really understood or feel
          like they do not belong in the place they are attempting to enter. This is very applicable
          to this topic. True inclusion is about creating a space where people do not have to fight
          to be seen as capable of getting the job done. When this is done correctly in a work
          environment, there is no need for these spaces.
        </p>

        <h3>Employee Perks I Would Actually Value</h3>
        <p>
          Out of all the perks discussed in the different resources, the ones that I found to be the
          most applicable to me would have to be flexible hours and remote work. The idea of being
          able to structure my day to function in a manner that works for me, rather than just
          showing up to work between 9 and 5 like everyone else, is really motivating to me. I am
          definitely more productive at some times of the day than I am at others, and having the
          flexibility to work with this rather than against it would really make a difference.
        </p>
        <p>
          Mental health support and wellness benefits was close behind. As can be seen after all of
          the above discussed in our unit on the topic of failure and resilience, it is quite
          evident that performance at work is related to how well one is doing in terms of mental
          well-being. Companies that offer such benefits are essentially saying that they see people
          as more than just producers.
        </p>

        <h3>Leadership Lessons from Dancing Guy</h3>
        <p>
          Dancing Guy is one of those videos that is really funny but actually provides an
          interesting leadership lesson. The first person dancing by themselves is really silly. The
          second person who joins in is arguably the most important person in the entire scenario.
          That is when it stops being one person being silly and becomes something more.
        </p>
        <p>
          The lesson I take away from it is that leadership isn’t always about being the loudest or
          the most prominent person in the room. Leadership can be being the first person willing to
          follow someone with a good idea, giving them the credibility they need to encourage others
          to join in. For my own life, I think of how many times I’ve been reluctant to express real
          enthusiasm for something because of how it might be perceived. This video reminds me well
          that sometimes, the key to creating momentum is someone being willing to be the one to go
          first, and being the first follower is just as important as being the leader.
        </p>

        <h3>The 4 Day Work Week</h3>
        <p>
          I am in favour of the 4 day work week, and the data seems to indicate that the idea has
          merit because productivity levels don’t fall, and in many cases, they rise when the work
          week is cut down to 4 days. Because you know you only have one more day, you’re more
          inclined to be more focused and not stretch things out to meet the deadline.
        </p>
        <p>
          With that said, it is obviously not going to work well with every profession. For first
          responders, nurses, and other essential workers, it is not an option to just close up shop
          and have a 3-day weekend. For those individuals, a 4-day work week would have to be
          implemented differently, such as rotating shifts. While this is obviously more difficult
          to manage, it is not impossible.
        </p>
        <p>
          With regard to teachers, it is a very interesting question. There have already been
          schools in rural areas that have implemented this with great success to improve teacher
          retention. With regard to families with young children attending school, it is obviously
          an added day off from school that creates a problem without an obvious solution.
        </p>
        <p>
          With regard to elementary school-aged children, I think it would be beneficial to have 5
          days of work to provide a structured environment for younger kids. While it would be an
          added day off from school, I think it would be more beneficial to have 5 days of work.
        </p>
      </>
    ),
  },
  {
    id: 5,
    num: "Entry 05",
    title: "Excusitis",
    date: "April 2025",
    content: (
      <>
        <p>
          The recent reading on Excusitis made me realize how commonly people make excuses without
          knowing it. However, the idea that is the most impressive for me is the one concerning the
          development of such habits as a subconscious process. For instance, during a class
          presentation, one of my group members had to make a slideshow, but they constantly kept
          complaining that they were busy because of sports practice, sometimes had guests coming
          over, and other times they were out. Every single time it was a new excuse, and it occurred
          to me that they were simply making up reasons not to work on a collaborative assignment.
          After I started on the assignment and started making progress, they also started helping me
          alongside. It made me realize that sometimes we have to be the one to take action first as
          a leader, and then others will stop giving unfair excuses.
        </p>
        <p>
          As a habit, there is one that I made up and used quite frequently in the past. Namely,
          whenever I was asked if I wanted to hang out with friends or even help my family with
          their home tasks, I always claimed that I was too busy with work and school. However,
          after a while, I started analyzing why I said that I had no time to do something. The
          main reason behind this was simply that I didn’t want to do it. This was very detrimental
          to my personal relationships, as I was spending less time than I should on making stronger
          connections with my close ones. As a consequence, I started making different plans,
          rearranged my schedules, and managed my time more effectively, and therefore I changed my
          mindset completely.
        </p>
        <p>
          Additionally, I suffered from intelligence excusitis. On one of my French unit tests back
          in Grade 9, I kept on convincing myself that I was not good at remembering things and did
          not have adequate intelligence to perform well. As a result, I ended up studying without
          proper confidence and performing poorly initially. I believe that I’ve gotten
          significantly better on self-consciousness throughout the past years, and learnt to analyze
          my past behavior. Eventually, I realized my poor performance might be due to my lack of
          confidence. With time, practice, and more repetitions, I managed to understand the concepts
          and scored well on the next tests. In essence, believing that I was not smart enough became
          an impediment to success more than the course itself.
        </p>
        <p>
          According to the readings, success or failure in anything does not rely on luck. Usually,
          people tend to compare themselves with other individuals and conclude that they are simply
          lucky. However, this line of thinking makes us give up easily. By assuming that luck is
          what defines success, we take the blame off ourselves hence becoming lazy and avoiding
          improvement. We tend to limit our potential since we consider luck a factor that cannot be
          controlled by us.
        </p>
        <img 
          src="https://substackcdn.com/image/fetch/$s_!j7xv!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F83ad3335-983c-4d44-82b8-d31d0704ee73_4320x3200.png" 
          alt="Excusitis Mindset Illustration" 
          className="post-image" 
        />
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
        <div className="logo handwritten">Luminary</div>
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
        <div className="hero-blob-2"></div>
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
            {posts.map((post, idx) => {
              // Even wider variety of sizes and shapes
              const sizes = ["140px", "280px", "90px", "320px", "110px", "240px"];
              const sizeL = sizes[idx % sizes.length];
              const sizeR = sizes[(idx + 3) % sizes.length];

              // Determine if it should be filled based on index
              const isFilledL = idx % 2 === 0;
              const isFilledR = idx % 2 !== 0;

              const ShapeLeft = idx % 3 === 0 ? (
                <svg viewBox="0 0 100 100"><path d="M20,50 Q20,20 50,20 T80,50 50,80 T20,50" /></svg>
              ) : idx % 3 === 1 ? (
                <svg viewBox="0 0 100 100"><rect x="20" y="20" width="60" height="60" rx="15" transform="rotate(15, 50, 50)" /></svg>
              ) : (
                <svg viewBox="0 0 100 100"><path d="M50,10 L90,90 L10,90 Z" /></svg>
              );
              
              const ShapeRight = idx % 3 === 0 ? (
                <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="35" strokeDasharray="8,4" /></svg>
              ) : idx % 3 === 1 ? (
                <svg viewBox="0 0 100 100"><path d="M10,50 L50,10 L90,50 L50,90 Z" /></svg>
              ) : (
                <svg viewBox="0 0 100 100"><path d="M20,20 C40,40 60,0 80,20 S100,60 80,80 S40,100 20,80 S0,40 20,20" /></svg>
              );

              return (
                <div className="post-card-wrapper" key={post.id}>
                  <div 
                    className={`bob-visual bob-visual-1 ${isFilledL ? 'filled' : ''}`} 
                    style={{ width: sizeL, height: sizeL }}
                  >
                    {ShapeLeft}
                  </div>
                  <div 
                    className={`bob-visual bob-visual-2 ${isFilledR ? 'filled' : ''} ${idx % 2 === 1 ? 'rust' : ''}`} 
                    style={{ 
                      width: sizeR, 
                      height: sizeR,
                    }}
                  >
                    {ShapeRight}
                  </div>
                  
                  <div className="post-card">
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
                </div>
              );
            })}
          </>
        )}

        {view === "about" && (
          <>
            <div className="section-title">A Bit About Me</div>
            <div className="about-card">
              <h2>Hey, I'm <span className="handwritten">Naman</span> 👋</h2>
              <p className="tagline">Leadership Student · Abbey Park High School · Grade 12</p>

              <p>
                Welcome to my digital garden. This space, which I call <em>Luminary</em>, is where I 
                document my journey through the Business Leadership course. It's a collection of 
                raw reflections, honest failures, and the slow but steady work of thinking bigger.
              </p>
              <p>
                Beyond these assignments, you'll usually find me on the volleyball court, 
                experimenting with music, or diving into new creative projects. For me, 
                leadership isn't a title—it's the way we choose to show up for others every single day.
              </p>
              <p>
                I hope that by sharing my process here, I can look back and see how much 
                my perspective has shifted. Thanks for stopping by.
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