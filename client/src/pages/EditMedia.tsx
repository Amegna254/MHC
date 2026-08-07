import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

import {
  getMediaById,
  updateMedia,
} from "../services/mediaService";

import {
  FaArrowLeft,
  FaSave,
} from "react-icons/fa";

interface Media {

  id: number;

  title: string;

  description: string;

  category: string;

  visibility: string;

  fileType: string;

  image: string;

  fileName: string;

  mimeType: string;

}

export default function EditMedia() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({

    title: "",

    description: "",

    category: "",

    visibility: "public",

  });

  useEffect(() => {

    const loadMedia = async () => {

      try {

        const media = await getMediaById(id!);

        setForm({

          title: media.title || "",

          description: media.description || "",

          category: media.category || "General",

          visibility: media.visibility || "public",

        });

      } catch (err) {

        console.error(err);

      } finally {

        setLoading(false);

      }

    };

    loadMedia();

  }, [id]);
    const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {

    setForm({

      ...form,

      [e.target.name]: e.target.value,

    });

  };

  const handleSubmit = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setSaving(true);

      await updateMedia(id!, form);

      alert("Media updated successfully.");

      navigate("/dashboard");

    } catch (err) {

      console.error(err);

      alert("Failed to update media.");

    } finally {

      setSaving(false);

    }

  };

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">

        Loading media...

      </div>

    );

  }

  return (

    <div className="flex min-h-screen bg-slate-950 text-white">

      <Sidebar />

      <main className="flex-1 p-8">

        <Topbar />

        <div className="max-w-5xl mx-auto">

          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
          >

            <FaArrowLeft />

            Back to Dashboard

          </Link>

          <div className="mt-8 rounded-3xl bg-slate-900 border border-slate-800 p-8">

            <h1 className="text-4xl font-bold">

              Edit Upload

            </h1>

            <p className="mt-2 text-slate-400">

              Update your media information.

            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-8 space-y-6"
            >
                    {/* Title */}

              <div>

                <label className="block mb-2 text-slate-300 font-medium">

                  Title

                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 focus:outline-none focus:border-cyan-500"
                  required
                />

              </div>

              {/* Description */}

              <div>

                <label className="block mb-2 text-slate-300 font-medium">

                  Description

                </label>

                <textarea
                  name="description"
                  rows={6}
                  value={form.description}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 resize-none focus:outline-none focus:border-cyan-500"
                />

              </div>

              {/* Category */}

              <div>

                <label className="block mb-2 text-slate-300 font-medium">

                  Category

                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 focus:outline-none focus:border-cyan-500"
                >

                  <option value="General">General</option>

                  <option value="Digital Art">
                    Digital Art
                  </option>

                  <option value="Photography">
                    Photography
                  </option>

                  <option value="Videos">
                    Videos
                  </option>

                  <option value="Music">
                    Music
                  </option>

                  <option value="Documents">
                    Documents
                  </option>

                </select>

              </div>

              {/* Visibility */}

              <div>

                <label className="block mb-2 text-slate-300 font-medium">

                  Visibility

                </label>

                <select
                  name="visibility"
                  value={form.visibility}
                  onChange={handleChange}
                  className="w-full rounded-2xl bg-slate-950 border border-slate-700 px-5 py-4 focus:outline-none focus:border-cyan-500"
                >

                  <option value="public">

                    Public

                  </option>

                  <option value="private">

                    Private

                  </option>

                </select>

              </div>

              {/* Buttons */}

              <div className="flex gap-4 pt-4">

                <button
                  type="submit"
                  disabled={saving}
                  className="rounded-2xl bg-cyan-500 hover:bg-cyan-400 transition px-8 py-4 text-black font-bold flex items-center gap-3 disabled:opacity-50"
                >

                  <FaSave />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  className="rounded-2xl bg-slate-800 hover:bg-slate-700 transition px-8 py-4"
                >

                  Cancel

                </button>

              </div>

            </form>

          </div>

        </div>

      </main>

    </div>

  );

}      