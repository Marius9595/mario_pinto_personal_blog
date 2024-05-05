import {describe, expect, it, vi} from "vitest";
import ThemeIcon from "./ThemeIcon.tsx";
import {fireEvent, render, type RenderResult} from "@testing-library/react";

describe('<ThemeIcon/>', () => {
  const themeRepositoryMock: Storage = {
    length: 1,
    clear: vi.fn(),
    key: vi.fn(),
    removeItem: vi.fn(),
    getItem: vi.fn(),
    setItem: vi.fn()
  }

  it('should render theme icon with correct theme', () => {
    themeRepositoryMock.getItem = vi.fn().mockReturnValue('light');

    const themeICon = render(<ThemeIcon themeRepository={themeRepositoryMock}/>)

    themeICon.getByText('🌞');
    expect(themeRepositoryMock.getItem).toHaveBeenCalled();
  })

  it('should change light to dark when it is clicked', () => {
    themeRepositoryMock.getItem = vi.fn().mockReturnValue('light');
    const themeICon = render(<ThemeIcon themeRepository={themeRepositoryMock}/>)

    fireEvent.click(themeICon.getByText('🌞'))

    assertHasChangedToLightThemeAfterClickOn(themeICon)
  })

  it('should change dark to light when it is clicked', () => {
    themeRepositoryMock.getItem = vi.fn().mockReturnValue('dark');
    const themeICon = render(<ThemeIcon themeRepository={themeRepositoryMock}/>)

    fireEvent.click(themeICon.getByText('🌜'))

    assertHasChangedToDarkThemeAfterClickOn(themeICon)
  })

  function assertHasChangedToLightThemeAfterClickOn(themeICon: RenderResult) {
    themeICon.getByText('🌞');
    expect(document.documentElement.classList).toContain('light');
    expect(document.documentElement.classList).not.toContain('dark');
    expect(themeRepositoryMock.setItem).toHaveBeenCalledWith('theme', 'light');
    expect(themeRepositoryMock.getItem).toHaveBeenCalledWith('theme');
  }

  function assertHasChangedToDarkThemeAfterClickOn(themeICon: RenderResult) {
    themeICon.getByText('🌜');
    expect(document.documentElement.classList).toContain('dark');
    expect(document.documentElement.classList).not.toContain('light');
    expect(themeRepositoryMock.setItem).toHaveBeenCalledWith('theme', 'dark');
    expect(themeRepositoryMock.getItem).toHaveBeenCalledWith('theme');
  }

  // It is no possible to test styles due to style components. More info here: https://github.com/testing-library/jest-dom/issues/295
})