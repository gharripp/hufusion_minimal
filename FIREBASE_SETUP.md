# Firebase Setup Instructions

This guide will help you set up Firebase for the news article management system.

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" and follow the setup wizard
3. Once created, click on "Web" (</>) to add a web app
4. Register your app and copy the Firebase configuration

## 2. Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your Firebase configuration values in `.env.local` with the values from Firebase Console

## 3. Enable Firebase Services

### Enable Authentication

1. In Firebase Console, go to **Authentication** > **Sign-in method**
2. Enable **Email/Password** authentication
3. Create your first admin user:
   - Go to **Authentication** > **Users**
   - Click "Add user"
   - Enter email and password for your admin account

### Enable Firestore Database

1. Go to **Firestore Database** in the Firebase Console
2. Click "Create database"
3. Start in **production mode** (we'll add security rules next)
4. Choose a location close to your users

### Set Up Firestore Security Rules

1. Go to **Firestore Database** > **Rules**
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // News collection - read public, write only for authenticated users
    match /news/{document} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }

    // Publications collection - read public, write only for authenticated users
    match /publications/{document} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

### Enable Firebase Storage

1. Go to **Storage** in the Firebase Console
2. Click "Get started"
3. Start in **production mode**
4. Choose the same location as your Firestore database

### Set Up Storage Security Rules

1. Go to **Storage** > **Rules**
2. Replace the default rules with:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // News images - read public, write only for authenticated users
    match /news/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }

    // Publication PDFs - read public, write only for authenticated users
    match /publications/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. Click "Publish"

## 4. Deploy to GitHub Pages

Since GitHub Pages only serves static files, the Firebase SDK will handle all backend operations from the client side. The security rules you set up protect your data.

### Update Firebase Configuration for Production

If you're using environment variables locally but need to deploy to GitHub Pages:

**Option 1: Use GitHub Secrets (Recommended)**
1. Go to your GitHub repository > Settings > Secrets and variables > Actions
2. Add each Firebase config value as a secret (VITE_FIREBASE_API_KEY, etc.)
3. Update your GitHub Actions workflow to inject these during build

**Option 2: Commit Config Directly**
The Firebase config values are safe to commit publicly - they're meant for client-side use. Security is enforced by Firebase Security Rules. You can update `src/lib/firebase.ts` with your actual values.

## 5. Using the Admin Interface

1. Navigate to `/admin/news` on your site
2. Log in with the email/password you created in Firebase Authentication
3. You can now:
   - Create new news articles
   - Upload images for articles
   - Edit existing articles
   - Delete articles

## 6. How It Works

- **Public Access**: Anyone can view news articles on your site
- **Admin Access**: Only authenticated users can add/edit/delete news via `/admin/news`
- **Data Storage**: News articles are stored in Firestore (database)
- **Image Storage**: Images are uploaded to Firebase Storage
- **Fallback**: If Firebase isn't configured or fails, the site falls back to static news data from `src/data/news.ts`

## Troubleshooting

- **Can't log in**: Check that Email/Password auth is enabled and user exists in Firebase Authentication
- **Can't create news**: Check Firestore security rules allow writes for authenticated users
- **Can't upload images**: Check Storage security rules allow writes for authenticated users
- **News not appearing**: Check browser console for errors; data may still be loading

## Cost

Firebase has a generous free tier that should be sufficient for a university website:
- **Firestore**: 50K reads, 20K writes, 20K deletes per day
- **Storage**: 5GB storage, 1GB download per day
- **Authentication**: Unlimited

Monitor your usage in the Firebase Console.
