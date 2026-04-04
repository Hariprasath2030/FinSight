import { useState } from "react";
import { useStore } from "@/store";
import { Mail, Lock, X, LogIn, EyeOff, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { UserRole } from "@/types";

interface LoginFormProps {
  onClose: () => void;
}

export function LoginForm({ onClose }: LoginFormProps) {
  const login = useStore((state) => state.login);

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("password");
  const [selectedRole, setSelectedRole] = useState<UserRole>("viewer");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const roleCredentials: Record<UserRole, { email: string; password: string }> =
    {
      viewer: {
        email: "demo@example.com",
        password: "pass123",
      },
      admin: {
        email: "admin@example.com",
        password: "admin123",
      },
    };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!email || !password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        setError("Please enter a valid email");
        setIsLoading(false);
        return;
      }

      login(email, password, selectedRole);
    } catch (err) {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex min-h-[500px] bg-black backdrop-blur-xl rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
      >
        <X size={20} />
      </button>
      <div
        className="flex-1 bg-cover bg-center"
        style={{ backgroundImage: "url(/login.jpg)" }}
      ></div>

      {/* Right Form */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-white">Sign in</h2>
            <p className="text-gray-400 text-sm">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          {error && (
            <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl p-3">
              {error}
            </div>
          )}

          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-300 mb-2 block">Password</label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
        w-full bg-white/5 border border-white/10 rounded-xl
        pl-12 pr-12 py-3 text-white
        focus:outline-none focus:ring-2 focus:ring-blue-500/50
        transition-all duration-300
      "
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
        absolute right-4 top-1/2 -translate-y-1/2
        text-gray-400 hover:text-white
        transition-colors duration-200
      "
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              Select Role
            </label>
            <div className="grid grid-cols-2 gap-3">
              {["viewer", "admin"].map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => {
                    const newRole = role as UserRole;
                    setSelectedRole(newRole);
                    setEmail(roleCredentials[newRole].email);
                    setPassword(roleCredentials[newRole].password);
                  }}
                  className={`py-3 rounded-xl border transition ${
                    selectedRole === role
                      ? "bg-blue-600 border-blue-500 text-white"
                      : "bg-white/5 border-white/10 text-gray-300"
                  }`}
                >
                  {role === "viewer" ? "👁 Viewer" : "🛡 Admin"}
                </button>
              ))}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {selectedRole === "viewer"
                ? "View-only access to dashboards and reports"
                : "Full control including add/edit/delete transactions"}
            </p>
          </div>

          <button
            disabled={isLoading}
            onClick={handleSubmit}
            className={`
    group relative w-full overflow-hidden
    rounded-xl px-6 py-3
    bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600
    text-white font-semibold tracking-wide
    border border-white/10
    shadow-[0_8px_30px_rgba(37,99,235,0.35)]
    hover:shadow-[0_12px_40px_rgba(37,99,235,0.5)]
    hover:scale-[1.02]
    active:scale-[0.98]
    disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
    transition-all duration-300 ease-out
  `}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 ease-out" />

            <div className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white/80 border-t-transparent animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5" />
                  <span>Sign In</span>
                </>
              )}
            </div>
          </button>
        </form>
      </div>
    </motion.div>
  );
}
