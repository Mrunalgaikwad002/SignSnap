# SnapSign

SnapSign is a web application that allows users to upload PDF files, add digital signatures, and download the signed documents. The app features a modern, user-friendly interface with drag-and-drop support, signature style selection, and local storage for signed PDFs.

---

## Features

- **User Authentication**: Register and log in to manage your signed documents securely.
- **PDF Upload**: Easily upload PDF files for signing.
- **Drag and Drop**: Intuitive drag-and-drop interface for file selection.
- **Signature Panel**: Draw or type your signature with multiple style options.
- **Signature Placement**: Place your signature anywhere on the PDF.
- **Download Signed PDF**: Download the signed PDF directly to your device.
- **Signature Details Modal**: View details about your signature before finalizing.
- **Local Storage**: Signed PDFs are saved in your browser for quick access.
- **Responsive Design**: Works seamlessly on desktop and mobile devices.

---

## Component Design

### 1. `FileUpload`
- Handles file selection and drag-and-drop upload.
- Validates file type and size.
- Provides visual feedback for drag-and-drop actions.

### 2. `SignaturePanel`
- Allows users to draw or type their signature.
- Offers multiple signature styles.
- Provides a clear button to reset the signature.

### 3. `SignButton`
- Triggers the signing process.
- Disabled until a valid signature and PDF are selected.

### 4. `DownloadButton`
- Enables users to download the signed PDF.
- Provides feedback on download status.

### 5. `SignatureDetailsModal`
- Displays signature metadata (date, style, etc.).
- Confirms signature before applying to the PDF.

---

## Pages

### - `Home`
- Main dashboard for uploading and signing PDFs.

### - `Login`
- User authentication page.

### - `Register`
- New user registration page.

---

## Screenshots

| Feature | Screenshot |
|---------|------------|
| File Selection | ![File Selection](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20file%20selection.png?raw=true) |
| Dashboard | ![Dashboard](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20dashboard.png?raw=true) |
| Drag and Drop | ![Drag and Drop](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20drag%20and%20drop%20feature.png?raw=true) |
| PDF Preview | ![PDF Preview](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20pdf%20.png?raw=true) |
| PDF Download | ![PDF Download](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20pdf%20download.png?raw=true) |
| Signature Styles | ![Signature Styles](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20signature%20styles.png?raw=true) |
| Signed PDF in Local Storage | ![Signed PDF Local](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20signed%20pdf%20in%20local%20storage.png?raw=true) |
| Signed PDF | ![Signed PDF](https://github.com/Mrunalgaikwad002/SignSnap/blob/main/SnapSign%20signed%20pdf.png?raw=true) |

---

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Open your browser at `http://localhost:3000`.

---

## Technologies Used

- React
- Tailwind CSS
- JavaScript
- HTML5 & CSS3

---

## License

This project is licensed under the MIT License.

