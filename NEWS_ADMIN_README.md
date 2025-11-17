# News Article Management System

## What Was Implemented

I've created a complete news management system that allows you and other authorized users to create, edit, and delete news articles with images directly from a web interface.

### Features

✅ **Admin Interface** at `/admin/news` for managing news articles
✅ **Image Upload** - Upload images with each article (stored in Firebase Storage)
✅ **Authentication** - Secure login system using Firebase Authentication
✅ **CRUD Operations** - Create, Read, Update, Delete news articles
✅ **Fallback Support** - Site continues to work with static data if Firebase isn't configured
✅ **Real-time Updates** - Articles appear immediately on the public site after creation

## Quick Start

### 1. Set Up Firebase (One-time setup)

Follow the detailed instructions in `FIREBASE_SETUP.md` to:
- Create a Firebase project
- Enable Authentication, Firestore, and Storage
- Configure security rules
- Set up your environment variables

### 2. Create Your Admin Account

In the Firebase Console:
1. Go to **Authentication** > **Users**
2. Click "Add user"
3. Enter your email and password
4. This will be your admin login

### 3. Access the Admin Panel

1. Navigate to `https://your-site.github.io/admin/news` (or `http://localhost:5173/admin/news` during development)
2. Log in with the email/password you created
3. Click "Add News" to create your first article

## Using the Admin Interface

### Creating a News Article

1. Click the **"Add News"** button
2. Fill in the form:
   - **Title**: Headline of the article
   - **Excerpt**: Short summary (shown on cards)
   - **Content**: Full article text
   - **Author**: Who wrote the article
   - **Category**: Choose from research, awards, outreach, or collaboration
   - **Image**: Upload an image (optional)
3. Click **"Create Article"**

The article will immediately appear on:
- Home page (latest 3 articles)
- `/news/latest` page (all articles)

### Editing an Article

1. Find the article in the admin panel
2. Click the blue **edit** icon
3. Make your changes
4. Click **"Update Article"**

### Deleting an Article

1. Find the article in the admin panel
2. Click the red **trash** icon
3. Confirm deletion

The associated image will also be deleted from storage.

## How It Works

### Architecture

```
Public Site (Anyone)
├── Home page shows latest 3 news articles
└── /news/latest shows all articles

Admin Panel (/admin/news)
├── Login required (Firebase Auth)
├── Create/Edit/Delete articles
└── Upload images to Firebase Storage

Data Storage
├── Firestore Database: Article text, metadata
├── Firebase Storage: Article images
└── Fallback: src/data/news.ts (if Firebase fails)
```

### Security

- **Public Read**: Anyone can view news articles on the site
- **Authenticated Write**: Only logged-in users can create/edit/delete
- **Firebase Security Rules**: Enforce these permissions server-side
- **No Backend Needed**: Works entirely from GitHub Pages (static hosting)

## Files Created/Modified

### New Files
- `src/lib/firebase.ts` - Firebase configuration
- `src/services/newsService.ts` - News CRUD operations
- `src/pages/admin/NewsAdmin.tsx` - Admin interface
- `.env.example` - Environment variable template
- `FIREBASE_SETUP.md` - Detailed setup instructions

### Modified Files
- `src/stores/authStore.ts` - Added Firebase Authentication
- `src/components/news/LatestNews.tsx` - Fetch from Firestore
- `src/pages/news/Latest.tsx` - Fetch from Firestore
- `src/App.tsx` - Added admin route and auth initialization
- `CLAUDE.md` - Updated documentation

## Deployment to GitHub Pages

### Option 1: Use GitHub Secrets (Recommended)

1. Go to your GitHub repo > Settings > Secrets and variables > Actions
2. Add each Firebase config as a secret:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - etc.

### Option 2: Commit Config Directly

Firebase config values are safe to commit (they're meant for client-side use). Edit `src/lib/firebase.ts` and replace the placeholder values with your actual Firebase config.

Security is enforced by Firebase Security Rules, not by hiding the config.

## Adding More Admins

To give someone else admin access:
1. Go to Firebase Console > Authentication > Users
2. Click "Add user"
3. Provide them with the email/password
4. They can log in at `/admin/news`

## Troubleshooting

**Can't see new articles on the site?**
- Check browser console for errors
- Verify Firebase config is correct in `.env.local` or `src/lib/firebase.ts`
- Make sure Firestore and Storage are enabled in Firebase Console

**Can't log in?**
- Verify Email/Password auth is enabled in Firebase Console
- Check that user exists in Authentication > Users

**Images not uploading?**
- Check Firebase Storage rules allow authenticated writes
- Check browser console for Storage errors
- Verify Storage is enabled in Firebase Console

**Still seeing old static news?**
- This is the fallback behavior (intentional)
- Once you add articles via admin panel, those will display instead
- Clear browser cache if needed

## Cost

Firebase's free tier is very generous and should be more than sufficient:
- Firestore: 50K reads, 20K writes per day (free)
- Storage: 5GB storage, 1GB downloads per day (free)
- Authentication: Unlimited (free)

Monitor usage in Firebase Console to stay within limits.

## Next Steps

1. Complete the Firebase setup (see `FIREBASE_SETUP.md`)
2. Create your admin account
3. Start adding news articles!

For questions or issues, check the troubleshooting section in `FIREBASE_SETUP.md`.
