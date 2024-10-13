"use client"
import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom';

function SearchButton() {
    const {pending} = useFormStatus();
  return (
    <button className='bg-default hover:bg-default/50 disabled:opacity-5 disabled:cursor-not-allowed text-gray-800 px-4 py-4 font-bold rounded-full'>
        {pending && 'Searching...'}
            {!pending && 'Search'}
    </button>
  )
}

export default SearchButton
