"use client"
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import SearchButton from './SearchButton'
import { SearchSelect, SearchSelectItem, Select, SelectItem } from '@tremor/react'
import Avatar from 'react-avatar'
import { useRouter } from 'next/navigation'

const SORT_BY_MAP = {
  r: "DEFAULT",
  rv: "By Review",
  p: "By Price (low to high)",
  pd: "By Price (high to low)",
};

function Header() {
  const [pages, setPages] = useState("");
  const [sortBy, setSortBy] = useState(SORT_BY_MAP.r);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const router = useRouter()

  async function doSomething() {}
  return (
    <header className='flex flex-col items-center md:flex-row md:items-start md-space-x-4 px-2 pt-5 pb-5 md:p-10 md:pb-5'>
      <Link href="/">
        <Image src="https://links.papareact.com/208"
          height={150}
          width={150}
          alt="logo"
          className='object-contain mr-10 ml-5 mt-5'
          />
      </Link>
      <div className='w-full md:max-w-2xl mt-3'>
        <form action={formData => {
          const searchTerm = formData.get("searchTerm");
          if(!formData.get("searchTerm")) return;

          const params = new URLSearchParams;
          if(pages) params.set("pages", pages.toString())
          if(sortBy) params.set("sortBy", sortBy.toString())
          if(minPrice) params.set("minPrice", minPrice.toString())
          if(maxPrice) params.set("maxPrice", maxPrice.toString())

          router.push(`/search/${searchTerm}?${params.toString()})`)
        }}>
          <div className='flex items-center w-full gap-2' >
            <div className='flex items-center space-x-2 mx-4 flex-1 bg-gray-800 rounded-full border-0 px-6 py-4 md:max-w-5xl'>
              <MagnifyingGlassIcon className='h-5 w-5'/>
              <input type="text" name="searchTerm" placeholder='Search...' 
              className='outline-none flex-1 bg-gray-800'/>
            </div>
            <SearchButton/>
          </div>

          <div className='grid grid-cols-2 gap-2 p-4 md:grid-cols-4 max-w-lg md:max-w-none mx-auto items-center'>
            <SearchSelect className='min-w-4' placeholder='# of pages'
              onValueChange={(value )=> setPages(value)}
            >
              {[...Array(100)].map((_, i) => (
                  <SearchSelectItem key={i} value={(i+1).toString()}>
                    {(i+1).toString()} Pages
                  </SearchSelectItem>
              ))}
            </SearchSelect>

            <Select placeholder='Sort'
             onValueChange={(value )=> setSortBy(value)}>
              {Object.entries(SORT_BY_MAP).map(([key, value]) => (
                <SelectItem key={value} value={value}>
                  {value}
                </SelectItem>
              ))}
            </Select>

            <SearchSelect placeholder='Min Price..'
             onValueChange={(value )=> setMinPrice(value)}>
              {["", "100", "250", "500", "750", "900", "1000+"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i == 0 ? "No Min" : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>

            <SearchSelect placeholder='Max Price...'
             onValueChange={(value )=> setMaxPrice(value)}>
              {["", "100", "250", "500", "750", "900", "1000+"].map((_, i) => (
                <SearchSelectItem key={i} value={_.toString()}>
                  {i == 0 ? "No Max" : `$${_.toString()}`}
                </SearchSelectItem>
              ))}
            </SearchSelect>
          </div>
        </form>
      </div>  
      {/* <div>
        <Avatar name="Sonny Sangha" round size="50"/>
      </div> */}
    </header>
  )
}

export default Header
