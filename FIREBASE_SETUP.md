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

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Helper function to check if user is admin
    function isAdmin() {
      return request.auth != null && (
        // Hardcoded super admin
        request.auth.token.email == 'fusion@hamptonu.edu' || 
        // Check if user is in allowed_users collection
        exists(/databases/$(database)/documents/allowed_users/$(request.auth.token.email))
      );
    }

    // News collection
    match /news/{document} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Publications collection
    match /publications/{document} {
      allow read: if true;
      allow create, update, delete: if isAdmin();
    }

    // Account Requests - public create, admin read/update
    match /account_requests/{document} {
      allow create: if true;
      allow read, update: if isAdmin();
    }

    // Allowed Users - admin only
    match /allowed_users/{document} {
      allow read, write: if isAdmin();
    }
  }
}

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

## 4. Deploy to Production

### Option 1: Firebase Hosting (Recommended)

Since you are using Firebase Hosting:

1.  Build the project:
    ```bash
    npm run build
    ```

2.  Deploy to Firebase:
    ```bash
    firebase deploy
    ```

### Option 2: GitHub Pages

If you prefer GitHub Pages, you can configure it, but Firebase Hosting is easier since you are already using Firebase services.

### Update Firebase Configuration

Ensure your `src/lib/firebase.ts` or `.env` files have the correct production configuration.
The Firebase config values are safe to commit publicly - they're meant for client-side use. Security is enforced by Firebase Security Rules.

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
