# CS2 Password Generator 🔐

A secure, client-side password generator that converts CS2 skin inspect links into strong, deterministic passwords. Built with React, TypeScript, and Tailwind CSS.

![CS2 Password Generator](public/screenshot.png)

## ✨ Features

- 🔒 **100% Client-Side**: All operations happen in your browser
- 🔐 **Zero Data Storage**: No data is stored or transmitted
- 🛡️ **High Entropy**: Generates strong, secure passwords
- 🔄 **Deterministic**: Same input always produces the same output
- 🎨 **Modern UI**: Clean, responsive interface built with Tailwind CSS
- 📱 **Mobile-Friendly**: Works seamlessly on all devices

## 🚀 Quick Start

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/skin-pass.git
   cd skin-pass
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 🛠️ Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build
- `npm audit` - Check for security vulnerabilities
- `npm audit fix` - Fix security vulnerabilities

### Tech Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Headless UI
- Framer Motion

## 🚀 Deployment

This project is configured for deployment on Cloudflare Pages. The deployment process is automated and includes:

1. **Build Process**:
   - TypeScript compilation
   - Vite production build
   - Asset optimization and compression

2. **Deployment Steps**:
   - Automatic build on push to main branch
   - Asset upload to Cloudflare's global network
   - Zero-downtime deployment

3. **Build Output**:
   - Optimized JavaScript bundle
   - Minified CSS
   - Compressed assets with gzip

### Local Deployment

To deploy locally:

```bash
npm run build
```

The build output will be in the `dist` directory, ready for deployment to any static hosting service.

## 🔒 Security Features

- **Cryptographic Hashing**: Secure password generation using salted hashes
- **Key Stretching**: Multiple rounds of hashing for enhanced security
- **Input Validation**: Strict validation of CS2 inspect links
- **XSS Prevention**: Sanitized input handling
- **CSRF Protection**: Built-in protection against cross-site request forgery
- **CSP**: Content Security Policy implementation
- **Secure Headers**: Additional security headers
- **Memory Sanitization**: Secure memory handling

### Security Updates

To maintain security:

1. **Regular Updates**:
   ```bash
   npm update
   ```

2. **Security Audits**:
   ```bash
   npm audit
   npm audit fix
   ```

3. **Dependency Management**:
   - Regular dependency updates
   - Security vulnerability monitoring
   - Automated security patches

## 📝 Usage Guide

1. **Copy a CS2 skin inspect link** from your Steam inventory
2. **Paste the link** into the input field
3. **Click "Generate Password"**
4. **Copy the generated password** to your clipboard

### Example Input
```
steam://rungame/730/76561202255233023/+csgo_econ_action_preview%20S76561198123456789A1234567890D1234567890123456789
```

## ⚠️ Security Notes

- All processing occurs in your browser
- No data is stored or transmitted to any server
- Passwords are generated deterministically
- High entropy is maintained throughout the process
- The tool is open-source and can be audited

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [Vite](https://vitejs.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Heroicons](https://heroicons.com/)
