export interface FavoriteInterface {
    name: string;
    country: string;
    dateAdded: string;
    remark: {
        text:string
    }[]
}

export interface RemarkInterface {
    text: string
}

export interface UniversityItemResponseInterface {
    alpha_two_code: string;
    country: string;
    ["state-province"]?: string;
    domains: string[];
    name: string;
    web_pages: string[]
}