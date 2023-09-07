"use client"
import React, { useState, KeyboardEvent, useRef } from 'react';

type Props = {
    tags: string[],
    setTags: React.Dispatch<React.SetStateAction<string[]>>
}

export default function TagInput({ tags, setTags }: Props) {
//   const [tags, setTags] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    
    if (e.key === 'Enter') {
        e.preventDefault();
        if(inputValue) {
            setTags([...tags, inputValue]);
            setInputValue('');
        }
    }
  };

  const removeTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);

    inputRef.current?.focus();
  };

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