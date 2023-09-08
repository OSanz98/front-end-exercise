"use client"
import React, { useState, KeyboardEvent, useRef } from 'react';

type Props = {
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

/**
 * This is a react component which returns and displays an input field allowing user to create sensor id tags in forms.
 * @param tags, setTags - tags is a variable used to hold the tags entered by a user, setTags is a function that updates the list of tags entered by a user.
 * @returns A React Component
 */
export default function TagInput({ tags, setTags }: Props) {
  // variables used for component
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * When user clicks enter it updates the tags list
   * @param e html input element
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if(inputValue) {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    }
  };

  /**
   * Removes a tag from the list using the index of the tag the user wishes to remove.
   * @param index number of tag
   */
  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);

    inputRef.current?.focus();
  };

  // Returns an input field to allow user to enter tags
  return (
    <div className="flex space-x-2 items-center ">
        {tags.map((tag, index) => (
            <div key={index} className="bg-gray-200 rounded-full p-1">
            {tag}
            <span 
                className="ml-2 text-sm cursor-pointer"
                onClick={() => removeTag(index)}
            >
                ×
            </span>
            </div>
        ))}
        <input 
            ref={inputRef}
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 p-2 rounded-lg"
        />
    </div>
  );
}