// .prettierrc.js
module.exports = {
  // Use semicolons at the ends of statements
  semi: true,

  // Prefer single quotes over double quotes in strings
  singleQuote: true,

  // Use 2 spaces per indentation level
  tabWidth: 2,

  // Wrap lines that exceed 80 characters
  printWidth: 80,

  // Include trailing commas wherever possible (ES5+),
  // helps with cleaner diffs and easier array/object editing
  trailingComma: 'all',

  // Add spaces between brackets in object literals: { foo: bar }
  bracketSpacing: true,

  // Put the `>` of a multi-line JSX element on a new line
  jsxBracketSameLine: false,

  // Always include parentheses around arrow function parameters
  // Helps prevent bugs and improves clarity
  arrowParens: 'always',

  // Format only those files that have a Prettier config present (e.g., in monorepos)
  requirePragma: false,

  // Automatically format embedded languages (HTML, CSS, JS inside Markdown, etc.)
  embeddedLanguageFormatting: 'auto',
};
