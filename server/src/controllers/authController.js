const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");

// ======================
// REGISTER USER
// ======================
exports.register = async (req, res) => {
  try {
    const { fullName, username, email, password, role } = req.body;

    const existingEmail = await User.findOne({
      where: { email },
    });

    if (existingEmail) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    const existingUsername = await User.findOne({
      where: { username },
    });

    if (existingUsername) {
      return res.status(400).json({
        message: "Username already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      username,
      email,
      password: hashedPassword,
      role: role || "user",
    });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================
// LOGIN USER
// ======================
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const validPassword = await bcrypt.compare(
      password,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        role: user.role,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
      },
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================
// CHANGE PASSWORD
// ======================
exports.changePassword = async (req, res) => {
  try {

    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        message: "Current password and new password are required.",
      });
    }

    const user = await User.findByPk(req.user.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found.",
      });
    }

    const validPassword = await bcrypt.compare(
      currentPassword,
      user.password
    );

    if (!validPassword) {
      return res.status(400).json({
        message: "Current password is incorrect.",
      });
    }

    const samePassword = await bcrypt.compare(
      newPassword,
      user.password
    );

    if (samePassword) {
      return res.status(400).json({
        message:
          "New password must be different from the current password.",
      });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        message:
          "New password must be at least 8 characters long.",
      });
    }

    user.password = await bcrypt.hash(
      newPassword,
      10
    );

    await user.save();

    res.json({
      message: "Password changed successfully.",
    });

  } catch (error) {

    console.error(
      "CHANGE PASSWORD ERROR:",
      error
    );

    res.status(500).json({
      message: "Server error",
    });
  }
};

// ======================
// FORGOT PASSWORD
// ======================
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        message: "No account found with that email.",
      });
    }

    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    user.passwordResetToken = resetToken;

    user.passwordResetExpires = new Date(
      Date.now() + 30 * 60 * 1000
    );

    await user.save();

    // 👇 ADD THESE LINES
    console.log("================================");
    console.log("Saved reset token:", user.passwordResetToken);
    console.log("Saved expiry:", user.passwordResetExpires);
    console.log("================================");

    const resetURL =
      `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "MHC Password Reset",
      html: `
        <h2>Password Reset</h2>

        <p>Hello ${user.fullName},</p>

        <p>You requested to reset your password.</p>

        <p>
          <a href="${resetURL}">
            Reset Password
          </a>
        </p>

        <p>This link expires in 30 minutes.</p>

        <p>If you didn't request this email,
        simply ignore it.</p>
      `,
    });

    res.json({
      message: "Password reset email sent successfully.",
    });

  } catch (error) {
    console.error("FORGOT PASSWORD ERROR:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};
// ======================
// RESET PASSWORD
// ======================
exports.resetPassword = async (req, res) => {
  try {
    console.log("Token from URL:", req.params.token);

    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      where: {
        passwordResetToken: token,
      },
    });

    console.log("User found:", !!user);

    if (!user) {
      return res.status(400).json({
        message: "Invalid reset token.",
      });
    }

    console.log("Expiry:", user.passwordResetExpires);
    console.log("Current:", new Date());

    if (
      !user.passwordResetExpires ||
      user.passwordResetExpires < new Date()
    ) {
      return res.status(400).json({
        message: "Reset token has expired.",
      });
    }

    user.password = await bcrypt.hash(password, 10);

    user.passwordResetToken = null;
    user.passwordResetExpires = null;

    await user.save();

    res.json({
      message: "Password reset successfully.",
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Server error",
    });
  }
};