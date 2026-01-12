# 📱 Expo Go Setup - View App on iPhone

## ✅ Expo Dev Server Started!

The Expo dev server is now running. Here's how to view your app:

## 📲 Steps to View in Expo Go

### 1. Install Expo Go on Your iPhone
- Open the **App Store** on your iPhone
- Search for **"Expo Go"**
- Install the app (it's free)

### 2. Connect to Dev Server

**Option A: Scan QR Code (Easiest)**
- Look at your terminal where Expo is running
- You should see a **QR code** displayed
- Open the **Camera app** on your iPhone
- Point it at the QR code
- Tap the notification that appears
- This will open Expo Go and load your app

**Option B: Manual Connection**
- Open **Expo Go** app on your iPhone
- Make sure your iPhone and computer are on the **same WiFi network**
- In Expo Go, tap **"Enter URL manually"**
- Enter: `exp://YOUR_COMPUTER_IP:8081`
  - Replace `YOUR_COMPUTER_IP` with your computer's local IP address
  - You can find it by running: `ipconfig getifaddr en0` (Mac) or `ipconfig` (Windows)

### 3. View Your App
Once connected, your app will load in Expo Go and you can:
- ✅ See all responsive UI (phone, tablet sizes)
- ✅ Test all features (Prayer Times, Qibla, Quran, etc.)
- ✅ See real-time updates when you save changes
- ✅ Test notifications and audio features

## 🔗 Dev Server URL

The Expo dev server is running at:
- **Local**: `http://localhost:8081`
- **Network**: `exp://YOUR_IP:8081`

## 📝 Notes

- **Same WiFi**: Your iPhone and computer must be on the same network
- **Hot Reload**: Changes will automatically reload in Expo Go
- **Native Features**: All native features work in Expo Go (location, notifications, audio, etc.)
- **No Xcode Needed**: Expo Go works without installing Xcode!

## 🎉 You're Ready!

The server is running. Just:
1. Install Expo Go on your iPhone
2. Scan the QR code from the terminal
3. Your app will load!
