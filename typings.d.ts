export type SearchParams = {
    page?: string;
    sortBy: string;
    minPrice?: string;
    maxPrice?: string;
}

export type PageResult = {
    content: ContentConfig;
    created_at: string;
    updated_at: string;
    page: number;
    url: string;
    job_id: string;
    status_code: number;
    parser_type: string;
}

export type Content = {
    url: string;
    page: number;
    result: Results;
    last_visible_page: number;
    parse_status_code: number;
}

export type Results = {
    paid: any[];
    filters: Filter[];
    organic: Organic[];
    search_information: {
        query: string;
        showing_results_for: number; 
    }
}

export type Filter = {
    name: string;
    values: Value[];
}

export type Value = {
    url: string;
    value: string;
}

export type Organic = {
     pos: number;
     url: string;
     type: string;
     price: number;
     title: string;
     currency: string;
     merchant: {
        url: string;
        name: string;
     }
     price_str: string;
     pos_overall: number;
}