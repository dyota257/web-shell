export type Entry = {
    name: string,
    start: string,
    notes?: Array<string>,
    end?: string
}


export type APIMethods =
    | 'binsCreate'
    | 'binsRead'
    | 'binsUpdate'
    | 'binsDelete'
    | 'collectionsBins';

export type APIOptions = {
    method: string, 
    url: string,
    headers: {
        'Content-Type': string,
        'X-Master-Key': string,
        'X-Collection-Id'?: string
    },
    data?: Entry
}