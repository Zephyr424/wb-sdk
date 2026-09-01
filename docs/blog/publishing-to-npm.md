# How I Published to npm

Publishing my first npm package was harder than writing the code itself.

## The challenges

1. **2FA setup**: npm requires two-factor authentication, and I had to generate tokens properly.
2. **Scoped package name**: wb-sdk was too similar to ws-sdk, so I had to use @zephyr424/wb-sdk.
3. **GitHub integration**: Configuring the repository link and GitHub Pages deployment.

## Step-by-step guide

\\\ash
# 1. Login to npm
npm login

# 2. Build and test locally
npm run test

# 3. Bump version
npm version patch

# 4. Publish to npm
npm publish --access public
\\\

## Lessons learned

- **Read the error messages**: npm tells you exactly what's wrong.
- **Test before publishing**: Always test with 
pm link first.
- **Use a .npmignore file**: Control which files get published.

---

*Written on August 31, 2026*
