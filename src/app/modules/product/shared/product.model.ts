import { Item } from '@shared/models';

export interface Product extends Item {
  id?: string;
  name: string;
  description: string;
  logo: string;
  date_release: Date;
  date_revision: Date;
}
