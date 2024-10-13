import { PageResult } from '@/typings'
import Link from 'next/link'
import React from 'react'
type Props = {
    results: PageResult[],
    term: string
}
function ResultsList({results, term} : Props) {


  {results.map((pageResult) => {
    {pageResult.content.results.filters.map((filter: any) =>{
      {filter.values.map((value: any) => {
        console.log(value)
      })}
    })}
  })}
  return (
    <div className='flex md:px-5'>
      {/*Sidebar */}
      <div>
        {results.map((pageResult) => (
          <div key={pageResult.job_id} className='space-y-2'>
            {pageResult.content.results.filters?.map((filter: any, i: any) => (
              <div key={i} className='rounded-r-lg border-[#00A69C] border md:rounded-lg p-5 '>
                <p className='font-bold'>{filter.name}</p>
                  <div className='flex flex-col'>
                    {filter.values.map((value: any) => (
                      <Link prefetch={false} href={`https://www.google.com/${value.url}`}>
                        {value.value}
                      </Link>
                    ))}
                  </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      {/*Main Body*/}
      <div>
        {results.map((pageResult, i) =>(
          <div key={pageResult.job_id} className='grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
            { i !== 0 && <hr className="w-full col-span-full" />}
            <div className='md:col-span-2 lg:col-span-3 xl:col-span-4 py-5'>
              <div className='flex space-x-2 items-center divide-x-2'>
                <h1>Shop on Google</h1>
                <h2 className='text-xl font-semibold pl-2'>
                  Search Results for Page { i + 1};
                </h2>
              </div>

              <h3 className='font-extralight'>
                Showing Results for "{decodeURIComponent(term)}"
              </h3>
            </div>

            {pageResult.content?.results.organic?.map((item: any, i: any) => (
              <Link href={
                item.url.includes("url?url=")
                ? item.url.split("url?url=")?.[1]
                : item.url.split("?")?.[0]
              } 
                key={item.pos} prefetch={false} className='border border-[#00A69C] rounded-2xl flex flex-col hover:shadow-lg transition duration-200 ease-in-out'>
                <div>
                  <p>{item.title}</p>
                </div>

                <div>
                  <p>{item.price_str} {item.currency}</p>
                  <p>{item.merchant?.name}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default ResultsList
