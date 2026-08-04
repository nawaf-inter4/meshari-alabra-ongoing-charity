/** @type {import('@commitlint/types').UserConfig} */
module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // Allow longer Release Please / sync subjects and promote PR messages.
    "header-max-length": [2, "always", 120],
    "subject-case": [2, "never", ["start-case", "pascal-case", "upper-case"]],
  },
};
