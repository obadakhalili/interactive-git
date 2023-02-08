const { execSync } = require("child_process");

// Get the last commit message
const commitMessage = execSync("git log -1 --pretty=%B").toString().trim();

// Check if the last commit message is "Change 'like' to 'love' in commits.md"
if (commitMessage !== "replace like with love") {
  console.error("Invalid commit message, expected: 'replace like with love'");
  process.exit(1);
}

// Get the list of files changed in the last commit
const filesChanged = execSync(
  "git diff-tree --no-commit-id --name-only -r HEAD"
)
  .toString()
  .trim()
  .split("\n");

// Check if the only file changed was commits.md
if (filesChanged.length !== 1 || filesChanged[0] !== "commits.md") {
  console.error("Invalid files changed, expected only: './commits.md'");
  process.exit(1);
}

// Get the changes made to commits.md in the last commit
const fileChanges = execSync("git diff HEAD^ HEAD -- ./commits.md")
  .toString()
  .trim();

// Check if the only change was to replace "like" with "love" in the last line
if (!fileChanges.endsWith("+=> I love programming.")) {
  console.error("Invalid change, expected: '- I love programming.'");
  process.exit(1);
}

console.log("Commit is valid.");
