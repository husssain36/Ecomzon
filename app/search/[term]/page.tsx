import ResultsList from '@/components/ResultsList';
import { getFetchUrl } from '@/lib/getFetchUrl';
import { PageResult, SearchParams } from '@/typings';
import { redirect } from 'next/navigation';
import React from 'react'

type Props = {
    searchParams: SearchParams;
    params: {
        term: string;
    }
}
async function SearchPage({searchParams, params: {term}}: Props) {
    console.log(term)
    if(!term) {
        redirect('/')
    }

    const response = await fetch(getFetchUrl('api/search'), 
        {
            method: "POST",
            body: JSON.stringify({searchTerm: term, ...searchParams})
        }
    )
    const results = (await response.json()) as PageResult[];
  return (
    <div>
      <ResultsList results={results} term={term}/>
    </div>
  )
}

export default SearchPage
