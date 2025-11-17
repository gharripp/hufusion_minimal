# Quick Start Checklist

## ✅ Setup Checklist

### 1. Environment Variables
- [x] Created `.env.local` with Firebase config
- [x] Dev server restarted after adding `.env.local`

### 2. Firebase Console Setup
Go to: https://console.firebase.google.com/project/hufusionsite

#### Enable Authentication
- [ ] Navigate to: **Authentication** → **Sign-in method**
- [ ] Click on **Email/Password**
- [ ] Toggle **Enable** and save

#### Create Admin User
- [ ] Navigate to: **Authentication** → **Users**
- [ ] Click **Add user**
- [ ] Enter your email (e.g., your-email@example.com)
- [ ] Enter a password (remember this!)
- [ ] Click **Add user**

#### Enable Firestore Database
- [ ] Navigate to: **Firestore Database**
- [ ] Click **Create database**
- [ ] Select **Start in production mode**
- [ ] Choose a location (e.g., us-central)
- [ ] Click **Enable**

#### Set Firestore Rules
- [ ] In Firestore Database, go to **Rules** tab
- [ ] Replace with:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /news/{document} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
  }
}
```
- [ ] Click **Publish**

#### Enable Storage
- [ ] Navigate to: **Storage**
- [ ] Click **Get started**
- [ ] Start in **production mode**
- [ ] Use same location as Firestore
- [ ] Click **Done**

#### Set Storage Rules
- [ ] In Storage, go to **Rules** tab
- [ ] Replace with:
```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /news/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```
- [ ] Click **Publish**

### 3. Test the Admin Interface

- [ ] Open browser to: http://localhost:5173/admin/news
- [ ] You should see a login form (black background)
- [ ] Enter the email/password you created
- [ ] Click **Login**
- [ ] You should see the admin dashboard with "Add News" button

### 4. Create Your First Article

- [ ] Click **Add News** button
- [ ] Fill in the form:
  - Title: "Test Article"
  - Excerpt: "This is a test"
  - Content: "Testing the news system"
  - Author: "Your Name"
  - Category: "research"
  - Image: (optional - upload a test image)
- [ ] Click **Create Article**
- [ ] Article should appear in the list below

### 5. Verify Article Appears on Site

- [ ] Open http://localhost:5173/ (home page)
- [ ] Scroll down to "Latest News" section
- [ ] Your test article should appear there
- [ ] Open http://localhost:5173/news/latest
- [ ] Your article should appear here too

## 🐛 Troubleshooting

### Can't see login form at /admin/news?
- Check browser console for errors (F12 → Console tab)
- Make sure dev server is running
- Try refreshing the page

### Login fails?
- Verify Email/Password auth is enabled in Firebase Console
- Verify user exists in Authentication → Users
- Check browser console for error messages

### Can't create articles?
- Check browser console for errors
- Verify Firestore is enabled
- Verify Firestore rules are published
- Verify Storage is enabled (if uploading images)

### Articles not showing on site?
- Check browser console for errors
- Verify articles were created (check in admin panel)
- Try refreshing the page
- Check Firestore Database → Data tab to see if articles exist

## 🎯 Current Status

Dev server running at: http://localhost:5173/
Admin panel at: http://localhost:5173/admin/news

Next step: Complete the Firebase setup checklist above!
