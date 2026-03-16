/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "ent-primary": "#7C6CF5",
        "ent-bg": "#0E1324",
        "ent-surface": "#141A2E",
        "ent-border": "rgba(255, 255, 255, 0.06)",
        "ent-text-main": "#E5E7EB",
        "ent-text-muted": "#9CA3AF",
        "ent-text-light": "#6B7280",
        "ent-success": "#10B981",
        "ent-error": "#EF4444",
        "ent-warning": "#F59E0B",
        "ent-info": "#3B82F6",
        "ent-purple": "#7C6CF5",
        "accent-purple": "#7C6CF5",
        "accent-green": "#10B981",
        "accent-pink": "#EF4444",
        "accent-cyan": "#00B8D9",
        "premium-muted": "#6B7280",
        "premium-border": "rgba(255, 255, 255, 0.06)",
        "premium-header": "#E5E7EB",
      },
      backgroundImage: {
        "glass-gradient":
          "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)",
        "active-glow":
          "radial-gradient(circle at center, var(--accent-purple-glow) 0%, transparent 70%)",
      },
      boxShadow: {
        "premium-glow": "0 0 20px -5px var(--accent-purple-glow)",
      },
    },
  },
  plugins: [],
};
