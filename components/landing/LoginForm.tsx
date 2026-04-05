import { useState } from "react";
import { useStore } from "@/store";
import { Mail, Lock, X, LogIn, EyeOff, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { UserRole } from "@/types";
import { useRouter } from "next/navigation";

interface LoginFormProps {
  onClose: () => void;
}

export function LoginForm({ onClose }: LoginFormProps) {
  const login = useStore((state) => state.login);
  const addToast = useStore((state) => state.addToast);
  const router = useRouter();

  const [email, setEmail] = useState("demo@example.com");
  const [password, setPassword] = useState("pass123");
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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

      const roleLabel =
        selectedRole.charAt(0).toUpperCase() + selectedRole.slice(1);
      addToast(
        `Welcome ${email.split("@")[0]}! Logged in as ${roleLabel}`,
        "success",
        3000,
      );
      onClose();
      setTimeout(() => {
        router.push("/dashboard");
      }, 500);
    } catch {
      setError("Login failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="
        relative flex min-h-[560px]
        rounded-[2rem]
        overflow-hidden
        border border-black/10 dark:border-white/10
        bg-white/80 dark:bg-black/70
        backdrop-blur-2xl
        shadow-[0_20px_60px_rgba(0,0,0,0.12)]
        dark:shadow-[0_20px_60px_rgba(255,255,255,0.06)]
      "
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="
          absolute top-4 right-4 z-20 p-2 rounded-full
          bg-black/5 dark:bg-white/10
          hover:bg-black/10 dark:hover:bg-white/20
          text-black dark:text-white
          transition-all duration-300
        "
      >
        <X size={20} />
      </button>

      {/* Left Image */}
      <div
        className="flex-1 bg-cover bg-center hidden md:block"
        style={{ backgroundImage: "url(/login.jpg)" }}
      />

      {/* Right Form */}
      <div className="flex-1 p-8 flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <h2 className="text-4xl font-bold text-black dark:text-white">
              Sign in
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </div>
          )}

          {/* Email */}
          <div>
            <label className="mb-2 block text-sm text-gray-600 dark:text-gray-300">
              Email address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-4 h-5 w-5 text-gray-400" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                  w-full rounded-2xl
                  border border-black/10 dark:border-white/10
                  bg-black/[0.03] dark:bg-white/[0.04]
                  backdrop-blur-xl
                  pl-12 pr-4 py-3
                  text-black dark:text-white
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/10 dark:focus:ring-white/20
                  transition-all duration-300
                "
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="mb-2 block text-sm text-gray-600 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="
                  w-full rounded-2xl
                  border border-black/10 dark:border-white/10
                  bg-black/[0.03] dark:bg-white/[0.04]
                  backdrop-blur-xl
                  pl-12 pr-12 py-3
                  text-black dark:text-white
                  placeholder:text-gray-400
                  focus:outline-none
                  focus:ring-2
                  focus:ring-black/10 dark:focus:ring-white/20
                  transition-all duration-300
                "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                  absolute right-4 top-1/2 -translate-y-1/2
                  text-gray-400 hover:text-black
                  dark:hover:text-white
                  transition-colors duration-200
                "
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Role Selector */}
          <div>
            <label className="mb-3 block text-sm font-medium text-gray-600 dark:text-gray-300">
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
                  className={`py-3 rounded-2xl border backdrop-blur-xl transition-all duration-300 ${
                    selectedRole === role
                      ? "bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-lg"
                      : "bg-black/[0.03] dark:bg-white/[0.04] border-black/10 dark:border-white/10 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {role === "viewer" ? "👁 Viewer" : "🛡 Admin"}
                </button>
              ))}
            </div>

            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {selectedRole === "viewer"
                ? "View-only access to dashboards and reports"
                : "Full control including add/edit/delete transactions"}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="
              group relative w-full overflow-hidden
              rounded-2xl px-6 py-3
              bg-black text-white
              dark:bg-white dark:text-black
              font-semibold tracking-wide
              border border-black/10 dark:border-white/10
              shadow-[0_10px_30px_rgba(0,0,0,0.12)]
              dark:shadow-[0_10px_30px_rgba(255,255,255,0.06)]
              hover:scale-[1.02]
              active:scale-[0.98]
              disabled:opacity-60
              transition-all duration-300
            "
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 dark:via-black/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

            <div className="relative z-10 flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-0.5" />
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
