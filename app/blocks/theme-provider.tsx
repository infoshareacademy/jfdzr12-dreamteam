import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light" | "system"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = initialState.theme,
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  )

  useEffect(() => {
    console.log("useEffect called with theme:", theme);
    const root = window.document.documentElement
    console.log("root:", root, root.className);

    root.classList.remove("light", "dark")

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light"

      root.classList.add(systemTheme)
      console.log("System theme:", systemTheme);
      return
    }

    root.classList.add(theme)
    console.log("Added theme:", theme);
  }, [theme])

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      console.log("Setting theme to:", theme);
      localStorage.setItem(storageKey, theme)
      setTheme(theme)
      console.log("Setting theme END");
    },
  }

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  console.log("useTheme called. Theme context:", context);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider")

  return context
}
