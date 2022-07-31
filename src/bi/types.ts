export enum EntityType {
  Folder,
  File,
  Car,
}
export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  parent?: string;
}
