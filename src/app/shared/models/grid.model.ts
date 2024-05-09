export interface Column {
  name: string;
  key: string;
  type?: 'string' | 'image' | 'date';
}

export interface Item {
  [key: string]: any;
}
