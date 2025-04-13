# CS2 Password Generator

A secure, client-side password generator that converts CS2 skin inspect links into strong passwords.

## Features

- 🔒 100% client-side operation
- 🔐 No data storage or transmission
- 🛡️ High entropy password generation
- 🔄 Deterministic output (same input = same output)
- 🎨 Clean, modern interface
- 📱 Responsive design

## Security Features

- Cryptographic hashing with salt
- Key stretching
- Input validation and sanitization
- XSS prevention
- CSRF protection
- Content Security Policy
- Secure headers
- Memory sanitization

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/skin-pass.git
cd skin-pass
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

## Usage

1. Copy a CS2 skin inspect link
2. Paste it into the input field
3. Click "Generate Password"
4. Copy the generated password

## Security Notes

- This tool runs entirely in your browser
- No data is stored or transmitted
- All processing is done client-side
- Passwords are generated deterministically
- High entropy is maintained throughout the process

## License

MIT License
