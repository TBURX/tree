export enum EntityType {
  Folder,
  File,
  Car,
  Crow,
}
export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  parent?: string;
}
