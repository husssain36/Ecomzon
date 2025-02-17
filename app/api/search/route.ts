import { PageResult, SearchParams } from "@/typings";
import { NextResponse } from "next/server";
import fetch from 'node-fetch';

export async function POST(request: Request) {
    const {searchTerm, pages, ...params} = await request.json();
    const SearchParams: SearchParams = params;
    const username = "its_me_buddy";
    const password = "its_me_buddY69"
    if(!searchTerm){
        return NextResponse.next(
            new Response("Missing search term", {
                status: 400,
            })
        );
    }

    const filters: any = [];

    Object.entries(SearchParams).forEach(([key, value]) => {
        if(value){
            if(key == 'max_price'){
                if((value = "1000+")) return;
            }
            filters.push({
                key,
                value: key === "sort_by" ? value : Number(value)            
            })
        }
    });

const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
  method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + Buffer.from(`${username}:${password}`).toString('base64'),
    // 'Authorization': `Basic  ${Buffer.from(process.env.OXYLABS_USERNAME + ':' + process.env.OXYLABS_PASSWORD).toString("base64")}`,
  },
//   cache: 'no-store',

  body: JSON.stringify({
        source: 'google_shopping_search',
        domain: 'com',
        query: searchTerm,
        pages: Number(pages) || 1,
        parse: true,
        context: filters,
  })
});



const data: any = await response.json();
const pageResults: PageResult[] = data.results;
return NextResponse.json(pageResults)
}