import { describe, it, expect } from 'vitest';
import {vi} from 'vitest';
import { SearchBar, type  SearchBarProps} from "./SearchBar.tsx";
import {fireEvent, render, waitFor} from "@testing-library/react";

describe('<SearchBar/>', () => {
  const searchBarFn: SearchBarProps ={
    onSearch: vi.fn(),
    onReset: vi.fn()
  }

  it('should render search bar', () => {
    const result = render(
        <SearchBar onSearch={searchBarFn.onSearch} onReset={searchBarFn.onReset}/>
    );

    result.getByPlaceholderText("Me gustaría leer sobre...");
  })

  it('should allow type in search bar', () => {
    const text = "prueba";
    const result = render(
        <SearchBar onSearch={searchBarFn.onSearch} onReset={searchBarFn.onReset}/>
    );

    const searchBar = result.getByPlaceholderText("Me gustaría leer sobre...");
    fireEvent.change(searchBar, {target: {value: text}});

    expect(searchBar).toHaveValue(text);
  })

    it('should should initiate a search when user types in the search bar', () => {
        const text = "prueba";
        const result = render(
            <SearchBar onSearch={searchBarFn.onSearch} onReset={searchBarFn.onReset}/>
        );

        const searchBar = result.getByPlaceholderText("Me gustaría leer sobre...");
        fireEvent.change(searchBar, {target: {value: text}});

        const delayInMsToTriggerSearch = 500;
        waitFor(() => {
            expect(searchBarFn.onSearch).toHaveBeenCalledWith(text);
        }, {timeout: delayInMsToTriggerSearch});
    })

    it('should clean filter by search when user deletes the text typed', () => {
        const text = "prueba";
        const result = render(
            <SearchBar onSearch={searchBarFn.onSearch} onReset={searchBarFn.onReset}/>
        );

        const searchBar = result.getByPlaceholderText("Me gustaría leer sobre...");
        fireEvent.change(searchBar, {target: {value: text}});
        fireEvent.change(searchBar, {target: {value: ""}});

        const delayInMsToTriggerSearch = 500;
        waitFor(() => {
            expect(searchBarFn.onReset).toHaveBeenCalled();
        }, {timeout: delayInMsToTriggerSearch});
    })
})