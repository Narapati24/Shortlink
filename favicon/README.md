# Favicon Generator Instructions

To properly generate all the necessary favicon files for your website, follow these steps:

1. Go to [RealFaviconGenerator](https://realfavicongenerator.net/)
2. Upload your original logo file (`src/img/logo/RainyDeepLogo.png`)
3. Customize the favicon appearance for different platforms
4. Download the favicon package
5. Extract the contents to the `favicon` folder in your project

## Required Files

The following files should be placed in your `favicon` folder:

- `favicon.ico` - Main favicon file for browsers
- `favicon-16x16.png` - Small icon for browsers
- `favicon-32x32.png` - Medium icon for browsers
- `apple-touch-icon.png` - Icon for iOS devices
- `android-chrome-192x192.png` - Icon for Android devices
- `android-chrome-512x512.png` - Larger icon for Android devices
- `safari-pinned-tab.svg` - Vector icon for Safari pinned tabs
- `site.webmanifest` - Web app manifest file

## Alternative Method

If you prefer to create these files yourself:

1. Install ImageMagick: https://imagemagick.org/
2. Run the following commands to generate the required files:

```powershell
# Install ImageMagick with Chocolatey (if not installed)
# choco install imagemagick

# Convert your logo to various sizes
magick convert "src/img/logo/RainyDeepLogo.png" -resize 16x16 "favicon/favicon-16x16.png"
magick convert "src/img/logo/RainyDeepLogo.png" -resize 32x32 "favicon/favicon-32x32.png"
magick convert "src/img/logo/RainyDeepLogo.png" -resize 180x180 "favicon/apple-touch-icon.png"
magick convert "src/img/logo/RainyDeepLogo.png" -resize 192x192 "favicon/android-chrome-192x192.png"
magick convert "src/img/logo/RainyDeepLogo.png" -resize 512x512 "favicon/android-chrome-512x512.png"

# Create favicon.ico (contains multiple sizes)
magick convert "favicon/favicon-16x16.png" "favicon/favicon-32x32.png" "favicon/favicon.ico"
```
