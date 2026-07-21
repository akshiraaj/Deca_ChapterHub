# DECA Chapter Hub

A plain HTML/CSS/JS site (no build step) for the chapter: live leaderboard,
cluster points, attendance, info hub, spotlights, and a feedback form —
with member accounts and a code-gated exec dashboard.

Because it's plain HTML/CSS/JS, you can open any file in `/pages` or the
root `index.html` and edit the text or styling directly — no npm, no build
step, no framework to learn.

---

## 1. Set up Firebase (free)

1. Go to https://console.firebase.google.com → **Add project** → name it
   (e.g. `deca-chapter-hub`) → finish the wizard (you can skip Google
   Analytics).
2. In the left sidebar: **Build → Authentication → Get started**.
   Click the **Email/Password** provider → enable it → Save.
   Also enable the **Anonymous** provider (execs use this to unlock the
   dashboard — see below).
3. In the left sidebar: **Build → Firestore Database → Create database**.
   Choose **Production mode**, pick a region close to you, click Enable.
4. Once created, click the **Rules** tab and replace everything with the
   contents of `firestore.rules` from this project. Click **Publish**.
5. Set your exec code: in Firestore, click **Start collection** →
   collection ID `config` → document ID `execCode` → add a field named
   `value` (type: string) → set it to whatever code you want execs to use
   (e.g. `deca2026`). Save. This is the code execs will type into the
   exec login screen.
6. Get your web app config: **Project settings** (gear icon, top left) →
   scroll to **Your apps** → click the `</>` (web) icon → register an app
   (nickname anything) → you'll see a `firebaseConfig` object.
7. Open `js/firebase-config.js` in this project and paste your values in,
   replacing the placeholders. Also edit the `CLUSTERS` array to match
   your chapter's actual clusters/teams.

That's it for Firebase — no backend server, no credit card needed at this
scale (the free Spark plan easily covers a school chapter).

---

## 2. Push to GitHub

From a terminal, inside this project folder:

```bash
git init
git add .
git commit -m "Initial DECA chapter hub"
```

Then on GitHub: **New repository** (github.com/new) → name it
(e.g. `deca-chapter-hub`) → **do not** initialize with a README (you
already have one) → Create.

GitHub will show you commands like:

```bash
git remote add origin https://github.com/YOUR_USERNAME/deca-chapter-hub.git
git branch -M main
git push -u origin main
```

Run those in your terminal.

---

## 3. Deploy on Vercel (free)

1. Go to https://vercel.com → sign in with GitHub.
2. **Add New → Project** → select your `deca-chapter-hub` repo → Import.
3. Framework preset: choose **Other** (it's a static site, no build
   command needed). Leave build/output settings blank.
4. Click **Deploy**.
5. When it finishes, Vercel gives you a free URL like
   `deca-chapter-hub.vercel.app` — that's your live site. Every time you
   push to GitHub's `main` branch, Vercel redeploys automatically.

If you later want a custom domain (e.g. `yourchapter.org`), buy it from
any registrar, then in Vercel: **Project → Settings → Domains → Add**,
and follow the DNS instructions Vercel gives you.

---

## 4. Try it out

- Go to `/pages/signup.html` and create a member account.
- Go to `/pages/exec.html`, pick your cluster, and enter the exec code
  you set in step 1.5 to unlock the exec dashboard.
- Award points, log attendance, or post a spotlight — then check the
  homepage leaderboard update live.

---

## Project structure

```
index.html              → leaderboard (homepage)
pages/signup.html        → member signup
pages/login.html         → member login
pages/exec.html          → exec dashboard (code-gated)
pages/attendance.html    → member's own attendance record
pages/info.html          → static DECA info hub (edit freely)
pages/spotlights.html    → member spotlights
pages/feedback.html      → feedback/suggestion form
css/style.css            → all styling (one file, shared design tokens at top)
js/firebase-config.js    → YOUR Firebase project keys + cluster list
js/app.js                → shared Firebase setup, nav bar, auth helpers
firestore.rules          → security rules (paste into Firebase console)
```

## Notes on the exec code system

Execs don't get individual accounts — they share one code. When an exec
enters it, the site signs them in anonymously and, if the code matches,
marks that anonymous session as an exec (tied to the cluster they
selected). This is intentionally simple for a school chapter; if you ever
want individual exec accounts with audit logs, that's a bigger change
(happy to help later).

## Things left for a "phase 2"

- AI feedback on judged case studies
- Badges / streaks / gamification rewards
- Digital judging forms for execs

The current site is built so these can be added later without a rewrite —
just new pages plus new Firestore collections.
