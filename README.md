# 🗞️ Trump Timeline

A self-updating news timeline about Donald Trump, powered by Claude AI. Automatically fetches and analyzes news every week, with color-coded sentiment ratings and detailed analysis for each story.

**Live at:** `https://YOUR-USERNAME.github.io/trump-timeline`

---

## 📁 What's in this project?

```
trump-timeline/
├── index.html                     ← The website (open this in a browser)
├── data/
│   └── news.json                  ← All the news data (auto-updated weekly)
├── scripts/
│   └── fetch-news.js              ← The script that fetches new news via Claude AI
├── .github/
│   └── workflows/
│       └── weekly-update.yml      ← Automated weekly update schedule
└── package.json                   ← Node.js config for the script
```

---

## 🚀 Step-by-Step Setup Guide (Beginner Friendly)

### Step 1 — Create a GitHub account
If you don't have one, go to [github.com](https://github.com) and sign up for free.

---

### Step 2 — Create a new repository

1. Go to [github.com/new](https://github.com/new)
2. Name it exactly: `trump-timeline`
3. Make sure it is set to **Public** (required for free GitHub Pages)
4. Do **not** check "Initialize with README" — we'll upload our own files
5. Click **Create repository**

---

### Step 3 — Upload the project files

1. On your new empty repository page, click **"uploading an existing file"**
2. Upload all the files from this project, maintaining the folder structure:
   - `index.html`
   - `data/news.json`
   - `scripts/fetch-news.js`
   - `.github/workflows/weekly-update.yml`
   - `package.json`
   - `README.md`
3. At the bottom, click **Commit changes**

> ⚠️ **Important:** The `.github` folder starts with a dot. Make sure it gets uploaded — on some systems hidden folders may be harder to see. You can also create the file directly on GitHub by clicking "Create new file" and typing `.github/workflows/weekly-update.yml` as the filename.

---

### Step 4 — Enable GitHub Pages

1. In your repository, click **Settings** (top menu)
2. Scroll down and click **Pages** (in the left sidebar)
3. Under "Source", select **Deploy from a branch**
4. Under "Branch", select **main** and **/ (root)**
5. Click **Save**

After a minute, your site will be live at:
`https://YOUR-GITHUB-USERNAME.github.io/trump-timeline`

---

### Step 5 — Get a Claude API Key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in or create an account
3. Click **API Keys** in the left sidebar
4. Click **Create Key**, give it a name like `trump-timeline`
5. **Copy the key** — you won't be able to see it again!

---

### Step 6 — Add your API key to GitHub (as a Secret)

1. In your GitHub repository, click **Settings**
2. In the left sidebar, click **Secrets and variables → Actions**
3. Click **New repository secret**
4. Name: `ANTHROPIC_API_KEY`
5. Value: paste your Claude API key
6. Click **Add secret**

---

### Step 7 — Test the news update manually

1. In your repository, click the **Actions** tab
2. Click **Weekly Trump News Update** in the left sidebar
3. Click **Run workflow → Run workflow**
4. Wait about 30–60 seconds, then refresh the page
5. You should see a new commit appear with updated news!

---

### Step 8 — You're done! 🎉

Your timeline is now:
- ✅ Live on GitHub Pages
- ✅ Automatically updates every Monday at 8:00 AM UTC
- ✅ Analyzes sentiment of each news item using Claude AI

---

## 🎨 How it works

| Feature | How |
|---|---|
| News collection | Claude AI generates factual news summaries |
| Sentiment analysis | Claude rates each story from -10 to +10 |
| Color coding | 🟢 Green = positive, 🔴 Red = negative, ⚪ Grey = neutral |
| Weekly updates | GitHub Actions runs every Monday automatically |
| Data storage | All news stored in `data/news.json` in your repo |

---

## 🛠️ Troubleshooting

**The Actions workflow failed**
- Check that you added the `ANTHROPIC_API_KEY` secret correctly (Step 6)
- Click on the failed run in the Actions tab to see the error message

**The site shows "Could not load news data"**
- Make sure `data/news.json` exists in your repository
- Check that GitHub Pages is enabled (Step 4)

**I don't see my `.github` folder**
- On Mac/Linux, folders starting with `.` are hidden. Press `Cmd+Shift+.` (Mac) to show hidden files
- Or create the workflow file directly on GitHub (click "Create new file" and type the full path)

---

## 📝 Notes

- Sentiment analysis reflects how mainstream media framed the story, not a personal opinion
- The timeline is seeded with key historical events going back to January 2017
- All data is stored publicly in your GitHub repository
