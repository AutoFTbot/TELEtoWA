# Contributing to TELEtoWA

Thank you for your interest in contributing to TELEtoWA! 🚀

## How to Contribute

### 🐛 Reporting Bugs
- Use the GitHub issue tracker
- Include detailed steps to reproduce the bug
- Provide error messages and logs
- Mention your operating system and Node.js version

### 💡 Suggesting Features
- Open a new issue with the "enhancement" label
- Describe the feature and its benefits
- Include use cases and examples

### 🔧 Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m 'Add amazing feature'`
6. Push to your branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/TELEtoWA.git
cd TELEtoWA

# Install dependencies
npm install

# Setup environment
cp config.example.js config.js
# Edit config.js with your API keys

# Run in development mode
npm start
```

## Code Style

- Use meaningful variable and function names
- Add comments for complex logic
- Follow existing code formatting
- Keep functions small and focused
- Handle errors gracefully

## Testing

Before submitting a PR:
- Test all functionality manually
- Ensure no console errors
- Verify media forwarding works
- Test reply functionality
- Check offline mode behavior

## Security

- Never commit API keys or sensitive data
- Use environment variables for secrets
- Follow security best practices
- Report security issues privately

## Questions?

Feel free to open an issue for any questions about contributing! 