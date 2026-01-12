// Optional: pnpm configuration file
// This allows customizing package installation if using pnpm

function readPackage(pkg, context) {
  // You can modify package.json here if needed
  return pkg;
}

module.exports = {
  hooks: {
    readPackage,
  },
};
