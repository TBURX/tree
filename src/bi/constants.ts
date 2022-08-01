import { EIcon } from '../components/icon/types';
import { EntityType } from './types';

/**
 * иконки, соответствующие типу сущности
 */
export const EntityIcons: Record<EntityType, EIcon> = {
  [EntityType.Folder]: EIcon.Folder,
  [EntityType.File]: EIcon.File,
  [EntityType.Car]: EIcon.Car,
  [EntityType.Crow]: EIcon.Crow,
};

/**
 * дефолтные названия сущностей по типу
 */
export const DefaultNameByType: Record<EntityType, string> = {
  [EntityType.Folder]: 'папка',
  [EntityType.File]: 'файл',
  [EntityType.Car]: 'машина',
  [EntityType.Crow]: 'ворон',
};
