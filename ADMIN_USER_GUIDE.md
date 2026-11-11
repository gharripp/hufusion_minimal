# HU Fusion Website — Content Manager's Guide

*For administrative staff and colleagues who add news articles, publications, and presentations to the HU Fusion website.*

The website address is **https://hufusionsite.web.app** (all links below start from there).

---

## 1. What you can manage

The website has two kinds of content that staff can update themselves — no programming needed:

| Content | Where visitors see it | Where you manage it |
|---|---|---|
| **News articles** | Homepage ("Latest News" — the 3 most recent, newest shown large) and the News page (`/news/latest`) | `/admin/news` |
| **Publications & presentations** | Research → Publications page (`/research/publications`) | `/admin/publications` |

Everything else on the site (faculty bios, research pages, photos) is edited by the web developer.

---

## 2. Getting access (one-time setup)

You need an approved admin account before you can sign in. This takes three steps:

### Step 1 — Request access
1. Go to **`/request-access`**.
2. Enter your **name** and **email address** (use the email you'll log in with).
3. Optionally add a short reason (e.g., "Department admin, posting news").
4. Click **Submit Request**. You'll see "Request submitted successfully!"

> If you see *"A request for this email already exists"*, a request was already sent — check with an admin whether it's been approved.

### Step 2 — Wait for approval
An existing administrator reviews requests at `/admin/requests` and approves yours. There is no automatic email notification — ask your admin to tell you once you're approved.

### Step 3 — Create your account
1. After approval, go to **`/signup`**.
2. Enter the **same email address** you used in the request.
3. Choose a password (**at least 6 characters**) and confirm it.
4. Click **Sign Up**. You'll be taken straight to the News admin page.

> If you see *"This email is not authorized"*, your request hasn't been approved yet (or you typed a different email than the one you requested with).

---

## 3. Signing in and out

- Go to **`/admin/news`** (news) or **`/admin/publications`** (publications). If you're not signed in, a login form appears — enter your email and password.
- There are no links to the admin pages in the site menu. **Bookmark the two admin addresses.**
- Click **Logout** / **Sign Out** (top right) when you're done, especially on shared computers.

**"Access Denied"?** Your account exists but isn't on the approved list — contact an administrator.

---

## 4. News articles

Manage at **`/admin/news`**.

### Adding an article

1. Click the blue **Add News** button (top right).
2. Fill in the form:

| Field | What it's for |
|---|---|
| **Title** | The headline. Shown on the homepage card and at the top of the article. |
| **Excerpt** | A 1–2 sentence summary. This is what appears on the news cards — keep it short and enticing. |
| **Content** | The full article text. Plain text only (no bold/links). Blank lines separate paragraphs. |
| **Author** | Who wrote it or who it's about, e.g. "Dr. Calvin Lowe". |
| **Category** | Pick one: **Research**, **Awards**, **Outreach**, or **Collaboration**. Shown as a label on the article. |
| **Image** (optional) | A photo for the article card. Landscape orientation works best (roughly 1600 × 900 px). Please keep files under ~2 MB so pages load fast. |

3. Click **Create Article**. A green success message confirms it saved.
4. The **publication date is set automatically** to today — you don't enter it.

Your article immediately appears at the top of the homepage "Latest News" section and on the News page.

### Editing an article

1. Find the article in the list and click the **blue pencil** button.
2. The form opens pre-filled. Make your changes.
3. To swap the photo, choose a new image file — it replaces the old one. Leaving it empty keeps the current photo.
4. Click **Update Article**. (The original publication date is kept.)

### Deleting an article

Click the **red trash** button next to the article and confirm. **This is permanent** — the article and its photo are removed and cannot be recovered.

### Batch import (advanced)

The green **Batch Import** button (`/admin/import`) lets you paste many articles at once in JSON format. This is intended for technically inclined users — most staff won't need it.

---

## 5. Publications & presentations

Manage at **`/admin/publications`**.

### Adding an entry

1. Click **Add New**.
2. Choose the **Type** first — the form changes accordingly:
   - **Publication** (journal article): fill in **Journal** name and **DOI** (e.g. `10.1234/abcd`, without the `https://doi.org/` part — the site turns it into a link automatically).
   - **Presentation** (conference talk or poster): fill in **Venue** (conference name and location) and choose **Poster** or **Oral**.
3. Fill in the shared fields:

| Field | What it's for |
|---|---|
| **Title** | Title of the paper or talk. |
| **Authors** | Format: `Last, First; Last, First; …` — separate authors with semicolons. |
| **Year** | Publication or presentation year. |
| **PDF** (optional) | Upload the paper, poster, or slides as a PDF. A "View PDF" link appears on the site. |

4. Click **Create**.

The entry appears on the public Publications page immediately.

### Editing and deleting

- **Edit** (pencil button): the form opens pre-filled. Uploading a new PDF replaces the old one; leaving it empty keeps the current PDF.
- **Delete** (trash button): permanent — removes the entry and its PDF after you confirm.

---

## 6. Approving access requests (administrators)

When a colleague requests access, an existing admin approves it:

1. Sign in, then go to **`/admin/requests`**.
2. Each pending request shows the person's name, email, reason, and date.
3. Click the **green check** to approve or the **red X** to reject, and confirm.
4. Tell the person they're approved so they can finish signing up at `/signup` (there's no automatic notification).

Only approve people you know should have access — approved users can add, edit, and **delete** all news and publications.

---

## 7. Troubleshooting

| Problem | Likely cause & fix |
|---|---|
| "Login failed" | Wrong email or password. Passwords are case-sensitive. |
| "Access Denied" after logging in | Your account isn't approved yet — contact an admin. |
| "This email is not authorized" at sign-up | Your access request hasn't been approved, or you used a different email. |
| "A request for this email already exists" | Your request is already in the queue — no need to resubmit. |
| New article doesn't appear on the site | Refresh the page (Ctrl+R / Cmd+R). If you still don't see it, check it saved in the admin list. |
| Image won't upload / form hangs | Try a smaller image (under 2 MB, JPG or PNG). Check your internet connection. |
| Accidentally deleted something | Deletions are permanent. Re-create the article, or contact the web developer. |

---

## Quick reference

| Page | Address |
|---|---|
| Request admin access | `https://hufusionsite.web.app/request-access` |
| Create account (after approval) | `https://hufusionsite.web.app/signup` |
| Manage news | `https://hufusionsite.web.app/admin/news` |
| Manage publications | `https://hufusionsite.web.app/admin/publications` |
| Approve access requests | `https://hufusionsite.web.app/admin/requests` |
| Public news page | `https://hufusionsite.web.app/news/latest` |
| Public publications page | `https://hufusionsite.web.app/research/publications` |
