import { EIcon } from '../components/icon/types';
import { EntityType } from './types';

export const EntityIcons: Record<EntityType, EIcon> = {
  [EntityType.Folder]: EIcon.Folder,
  [EntityType.File]: EIcon.File,
  [EntityType.Car]: EIcon.Car,
};

export const DefaultNameByType: Record<EntityType, string> = {
  [EntityType.Folder]: 'папка',
  [EntityType.File]: 'файл',
  [EntityType.Car]: 'машина',
};
