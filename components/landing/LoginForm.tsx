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
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (!email || !password) {
        addToast("Please fill in all fields", "error", 3000);
        setIsLoading(false);
        return;
      }

      if (!email.includes("@")) {
        addToast("Please enter a valid email", "error", 3000);
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
      addToast("Login failed. Please try again.", "error", 3000);
      setIsLoading(false);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, x: 30, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.45 }}
      className="
      relative
      flex flex-col md:flex-row
      w-full
      max-w-[95vw] sm:max-w-2xl lg:max-w-5xl
      max-h-[90vh]
      overflow-y-auto
      rounded-3xl
      border border-black/10 dark:border-white/10
      bg-white/80 dark:bg-black/70
      backdrop-blur-2xl
      shadow-[0_20px_60px_rgba(0,0,0,0.12)]
      dark:shadow-[0_20px_60px_rgba(255,255,255,0.06)]
    "
    >
      <button
        onClick={onClose}
        className="
        absolute top-3 right-3 sm:top-4 sm:right-4 z-20
        p-2 rounded-full
        bg-black/5 dark:bg-white/10
        hover:bg-black/10 dark:hover:bg-white/20
        text-black dark:text-white
        transition-all duration-300
      "
      >
        <X size={18} className="sm:w-5 sm:h-5" />
      </button>

      <div
        className="
        hidden md:block
        md:w-1/2
        min-h-[500px]
        bg-cover bg-center
      "
        style={{ backgroundImage: "url(/login.jpg)" }}
      />

      <div
        className="
        w-full md:w-1/2
        p-5 sm:p-6 md:p-8
        flex items-center justify-center
      "
      >
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md space-y-5 sm:space-y-6"
        >
          {/* Heading */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-black dark:text-white">
              Sign in
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
              Welcome back! Please sign in to continue.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm text-gray-600 dark:text-gray-300">
              Email address
            </label>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800 dark:text-gray-300" />

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
                w-full rounded-2xl
                border border-black/10 dark:border-white/10
                bg-black/[0.03] dark:bg-white/[0.04]
                pl-12 pr-4 py-3
                text-sm sm:text-base
                text-black dark:text-white
                focus:outline-none
              "
              />
            </div>
          </div>
          <div>
            <label className="mb-2 block text-sm text-gray-600 dark:text-gray-300">
              Password
            </label>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-800 dark:text-gray-300" />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                w-full rounded-2xl
                border border-black/10 dark:border-white/10
                bg-black/[0.03] dark:bg-white/[0.04]
                pl-12 pr-12 py-3
                text-sm sm:text-base
                text-black dark:text-white
                focus:outline-none
              "
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="
                absolute right-4 top-1/2 -translate-y-1/2
                text-gray-400 hover:text-black
                dark:hover:text-white
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

          <div>
            <label className="mb-3 block text-sm font-medium text-gray-600 dark:text-gray-300">
              Select Role
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                  className={`py-3 rounded-2xl text-sm sm:text-base border transition-all duration-300 ${
                    selectedRole === role
                      ? "bg-black text-white dark:bg-white dark:text-black"
                      : "bg-black/[0.03] dark:bg-white/[0.04]"
                  }`}
                >
                  {role === "viewer" ? "👁 Viewer" : "🛡 Admin"}
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="
            w-full rounded-2xl
            px-6 py-3
            text-sm sm:text-base
            bg-black text-white
            dark:bg-white dark:text-black
            font-semibold
            hover:scale-[1.02]
            transition-all duration-300
          "
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
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
