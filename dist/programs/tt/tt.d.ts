import { Entry } from './types';
export declare function tt(commands: string): Promise<string>;
export declare function ttStart(args: Array<string>): Promise<string>;
export declare function addNoteToEntry(oldEntry: Entry, newNote: string): Entry;
export declare function ttDownload(): Promise<string>;
