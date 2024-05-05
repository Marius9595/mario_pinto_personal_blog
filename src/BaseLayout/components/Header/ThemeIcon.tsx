import {useState} from "react";

import s from "./ThemeIcon.module.css";

type Theme = "light" | "dark";
export default function ThemeIcon(
    {themeRepository = localStorage}: {themeRepository?:Storage}
) {

  const [theme, setTheme] = useState(themeRepository.getItem('theme') as Theme || 'light');
  const [icon, setIcon] = useState(theme === 'light' ? '🌞' : '🌜');

  const handleClick = () => {
    document.documentElement.classList.remove(theme);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    themeRepository.setItem('theme', newTheme)
    document.documentElement.classList.add(newTheme);
    setIcon(newTheme === 'light' ? '🌞' : '🌜');
  }

  return (
      <button id="themeToggle" className={s.themeToggle} onClick={handleClick}>{icon}</button>
  )
}