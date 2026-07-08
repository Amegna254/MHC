import { useEffect, useState } from "react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";
import { useAuth } from "../hooks/useAuth";
import { changePassword } from "../services/authService";
import { toast } from "sonner";
import {
  getProfile,
  updateProfile,
  uploadAvatar,
} from "../services/userService";

function Profile() {
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const profile = await getProfile();

        setFullName(profile.fullName);
        setUsername(profile.username);
        setEmail(profile.email);
        setProfileImage(profile.profileImage || "");
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateProfile({
        fullName,
        username,
        email,
      });

      if (user) {
        updateUser({
          ...user,
          fullName,
          username,
          email,
        });
      }

      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    }
  };

  const handleAvatarUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!e.target.files?.length) return;

    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    try {
      const data = await uploadAvatar(formData);

      setProfileImage(data.profileImage);

      if (user) {
        updateUser({
          ...user,
          profileImage: data.profileImage,
        });
      }

      toast.success("Avatar updated successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Avatar upload failed");
    }
  };
  const handleChangePassword = async (
  e: React.FormEvent
) => {
  e.preventDefault();

  if (
    !currentPassword ||
    !newPassword ||
    !confirmPassword
  ) {
    return toast.error("Please fill in all password fields.");
  }

  if (newPassword !== confirmPassword) {
    return toast.error("New passwords do not match.");
  }

  if (newPassword.length < 8) {
    return toast.error("Password must be at least 8 characters.");
  }

  try {
    setChangingPassword(true);

    await changePassword({
      currentPassword,
      newPassword,
    });

    toast.success("Password changed successfully!");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

  } catch (error: any) {
    toast.error(
      error.response?.data?.message ||
        "Failed to change password."
    );
  } finally {
    setChangingPassword(false);
  }
};

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
        Loading Profile...
      </div>
    );
  }

  return (
  <div className="flex min-h-screen bg-slate-950 text-white">
    <Sidebar />

    <main className="flex-1 p-8 overflow-y-auto">
      <Topbar />

      <div className="max-w-3xl mx-auto mt-10">
        <div className="bg-slate-900 rounded-2xl p-8 shadow-lg">
          {/* Profile Header */}
          <div className="flex flex-col items-center">
            <img
              src={
                profileImage
                  ? `http://localhost:5000/uploads/avatars/${profileImage}`
                  : "/default-avatar.png"
              }
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-cyan-500 object-cover"
              onError={(e) => {
                e.currentTarget.src = "/default-avatar.png";
              }}
            />

            <label className="mt-5 cursor-pointer bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg transition">
              Change Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleAvatarUpload}
                className="hidden"
              />
            </label>

            <h2 className="text-3xl font-bold mt-6">
              {fullName}
            </h2>

            <p className="text-slate-400">
              @{username}
            </p>
          </div>

          {/* Profile Form */}
          <form
            onSubmit={handleSubmit}
            className="mt-10 space-y-6"
          >
            <div>
              <label className="block mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={fullName}
                onChange={(e) =>
                  setFullName(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>

            <div>
              <label className="block mb-2">
                Username
              </label>

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>

            <div>
              <label className="block mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-lg font-semibold transition"
            >
              Save Changes
            </button>
          </form>

          {/* Security Section */}
          <div className="mt-10 border-t border-slate-700 pt-8">
            <h2 className="text-2xl font-bold mb-6">
              Change Password
            </h2>

            <form
              onSubmit={handleChangePassword}
              className="space-y-5"
            >
              <input
                type="password"
                placeholder="Current Password"
                value={currentPassword}
                onChange={(e) =>
                  setCurrentPassword(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              />

              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) =>
                  setNewPassword(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              />

              <input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              />

              <button
                type="submit"
                disabled={changingPassword}
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg font-semibold transition disabled:opacity-50"
              >
                {changingPassword
                  ? "Changing Password..."
                  : "Change Password"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
);
}

export default Profile;