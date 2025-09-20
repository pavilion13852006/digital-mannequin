
export enum Language {
  EN = 'en',
  FA = 'fa',
}

export interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}
