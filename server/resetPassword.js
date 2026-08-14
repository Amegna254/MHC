const bcrypt = require("bcrypt");

async function generateHash() {
  const password = "Password123"; // Change this to your new password

  const hash = await bcrypt.hash(password, 10);

  console.log("\nNew Password:", password);
  console.log("\nHash:\n");
  console.log(hash);
}

generateHash();