/**
 * типы сущностей
 */
export enum EntityType {
  Folder,
  File,
  Car,
  Crow,
}

/**
 * интерфейс сущности
 */
export interface Entity {
  id: string;
  type: EntityType;
  name: string;
  parent?: string;
}
