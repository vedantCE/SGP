# 🎨 Trace & Learn - React Native Expo App

A simple, child-friendly tracing learning app built with React Native and Expo. Children can practice tracing letters and numbers with positive feedback and encouragement.

## 📱 Features

- **Home Screen**: Choose between tracing letters or numbers
- **Interactive Tracing**: Draw on screen with finger (mobile) or mouse (laptop)
- **Dotted Templates**: Clear dotted outlines to guide tracing
- **Positive Feedback**: Success animations, stars, and encouraging messages
- **Simple Success Logic**: Detects when child has traced enough (no complex accuracy checking)
- **Child-Friendly UI**: Large buttons, bright colors, playful design
- **Sound Effects**: Success sound plays when tracing is complete

## 🚀 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 16 or higher)
  - Check with: `node --version`
  - Download from: https://nodejs.org/

- **npm** (comes with Node.js)
  - Check with: `npm --version`

- **Expo Go App** (for testing on physical device)
  - Download from App Store (iOS) or Google Play (Android)

## 📦 Installation

### Step 1: Install Dependencies

Open terminal in the project folder and run:

```bash
npm install
```

This will install all required packages including:
- Expo SDK
- React Navigation
- react-native-svg (for drawing)
- expo-av (for sound)

### Step 2: Add Sound Asset (Optional)

The app expects a success sound file but will work without it:

1. Download a short success sound (MP3 format) from:
   - https://pixabay.com/sound-effects/ (free, no attribution required)
   - https://freesound.org (free with attribution)

2. Save the file as `success.mp3` in the `assets` folder

3. If you skip this step, the app will still work but won't play sound (visual feedback still works)

## 🏃 Running the App

### Method 1: Start Development Server

Run the following command:

```bash
npm start
```

This will start the Expo development server and show a QR code in the terminal.

### Method 2: Open on Physical Phone (Recommended for Testing)

1. Make sure your phone and computer are on the **same Wi-Fi network**

2. Open the **Expo Go** app on your phone

3. Scan the QR code shown in the terminal:
   - **iOS**: Use Camera app to scan QR code
   - **Android**: Use Expo Go app to scan QR code

4. The app will load on your phone!

### Method 3: Run on Android Emulator

If you have Android Studio installed:

```bash
npm run android
```

### Method 4: Run on iOS Simulator (Mac only)

If you have Xcode installed:

```bash
npm run ios
```

### Method 5: Run in Web Browser

For quick testing (touch drawing will work with mouse):

```bash
npm run web
```

## 🎮 How to Use the App

1. **Launch the app** - You'll see the home screen with "Trace & Learn"

2. **Choose an option**:
   - Tap "Trace Letters" to practice letters (A, B, C)
   - Tap "Trace Numbers" to practice numbers (1, 2, 3)

3. **Start Tracing**:
   - You'll see a large dotted letter or number
   - Use your finger (on phone) or mouse (on computer) to trace over the dots
   - Draw freely on the white canvas area

4. **Get Feedback**:
   - After drawing a few strokes, a success animation appears
   - You'll see stars, "Good Job!" message
   - A cheerful sound plays (if you added the sound file)

5. **Continue Learning**:
   - Tap "Clear" to try again
   - Tap "Next Letter/Number" to practice the next one
   - Go back to home screen to switch between letters and numbers

## 📁 Project Structure

```
Saarthi_SGP/
├── App.js                 # Main app with navigation
├── screens/
│   ├── HomeScreen.js      # Home screen with buttons
│   └── TracingScreen.js   # Tracing canvas and logic
├── assets/
│   ├── success.mp3        # Success sound (add manually)
│   ├── icon.png           # App icon (Expo generates default)
│   ├── splash.png         # Splash screen (Expo generates default)
│   └── ...
├── package.json           # Dependencies
├── app.json              # Expo configuration
├── babel.config.js       # Babel config
└── README.md             # This file
```

## 🛠️ Troubleshooting

### Issue: "npm install" fails

**Solution**: Make sure you have Node.js version 16+ installed

```bash
node --version
npm --version
```

### Issue: QR code doesn't work on phone

**Solutions**:
1. Ensure phone and computer are on the same Wi-Fi network
2. Try running: `npm start --tunnel`
3. Check if Expo Go app is updated to latest version

### Issue: "Cannot find module" errors

**Solution**: Delete node_modules and reinstall:

```bash
rm -rf node_modules
npm install
```

### Issue: Sound doesn't play

**Solutions**:
1. Check if `assets/success.mp3` exists
2. Verify the sound file is a valid MP3
3. The app works fine without sound - only visual feedback is affected

### Issue: App crashes on startup

**Solutions**:
1. Clear the cache: `npm start -- --clear`
2. Restart the Expo server
3. Check the terminal for error messages

## 🎯 App Design Choices

### Simple Success Detection
The app uses a very simple success logic: after the child draws 5 strokes (any strokes), success feedback is triggered. This is intentionally simple and encourages children rather than frustrating them with accuracy requirements.

### No Negative Feedback
Following child psychology best practices:
- No red errors or "wrong" messages
- Only positive, encouraging feedback
- Every attempt is celebrated

### Large UI Elements
All buttons and text are oversized to make it easy for small fingers to tap and for children to read.

### Bright Colors
Uses a cheerful color palette to make learning fun and engaging.

## 🔧 Customization Ideas

Want to extend the app? Here are some ideas:

1. **Add More Letters/Numbers**: Edit the `LETTERS` and `NUMBERS` objects in `TracingScreen.js`
2. **Change Colors**: Modify the StyleSheet colors in any component
3. **Add More Sounds**: Add different sounds for different letters/numbers
4. **Add Shapes**: Create a new category for tracing shapes (circle, square, triangle)
5. **Progress Tracking**: Add a simple counter to show how many items traced

## 📄 License

This is a prototype/demo app. Use freely for learning purposes.

## 🤝 Support

If you encounter issues:
1. Check the Troubleshooting section above
2. Ensure all dependencies are installed correctly
3. Make sure you're using compatible versions of Node.js and Expo

## 🎉 Enjoy!

Have fun tracing and learning! This app is designed to make learning letters and numbers an enjoyable experience for children.

---

**Built with ❤️ using React Native + Expo**
