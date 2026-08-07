import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";
import Profile from "./pages/Profile";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Portfolio from "./pages/Portfolio";
import Marketplace from "./pages/Marketplace";
import Settings from "./pages/Settings";
import MediaLibrary from "./pages/MediaLibrary";
import CreatorProfile from "./pages/CreatorProfile";
import ListingDetail from "./pages/ListingDetail";
import MediaDetails from "./pages/MediaDetails";
import EditMedia from "./pages/EditMedia";
import Performance from "./pages/Performance";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./pages/Checkout";
import NotFound from "./pages/Notfound";
import MyPurchases from "./pages/MyPurchases";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/about" element={<About />} />

      <Route
  path="/my-purchases"
  element={
    <ProtectedRoute>
      <MyPurchases />
    </ProtectedRoute>
  }
/>

      <Route path="/contact" element={<Contact />} />

      <Route path="/portfolio" element={<Portfolio />} />

      <Route path="/settings" element={<Settings />} />

      <Route path="/library" element={<MediaLibrary />} />

      <Route path="/media/:id" element={<MediaDetails />} />

      <Route path="/creator/:creatorSlug" element={<CreatorProfile />} />

      {/* Forgot Password */}
      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />

      {/* Reset Password */}
      <Route
        path="/reset-password/:token"
        element={<ResetPassword />}
      />

      {/* Marketplace */}
      <Route
        path="/marketplace"
        element={<Marketplace />}
      />

      <Route
        path="/marketplace/item/:itemId"
        element={<ListingDetail />}
      />

      <Route
        path="/checkout/:listingId"
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        }
      />

      {/* Protected Routes */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/upload"
        element={
          <ProtectedRoute>
            <Upload />
          </ProtectedRoute>
        }
      />

      <Route
        path="/gallery"
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/performance"
        element={
          <ProtectedRoute>
            <Performance />
          </ProtectedRoute>
        }
      />

      <Route
        path="/media/edit/:id"
        element={
          <ProtectedRoute>
            <EditMedia />
          </ProtectedRoute>
        }
      />

      {/* 404 */}
      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default App;