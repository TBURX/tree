import * as _ from 'lodash';
import { nanoid } from 'nanoid';
import { DefaultNameByType } from './constants';
import { Entity, EntityType } from './types';

export const getEntities = async (): Promise<Entity[]> => {
  const entityCount = _.random(1, 100);
  const entities: Entity[] = [];
  for (let i = 0; i < entityCount; i++) {
    const type = _.random(0, Object.keys(EntityType).length / 2 - 1);
    const id = nanoid();
    const entity: Entity = {
      id,
      type,
      name: `${DefaultNameByType[type as EntityType]} ${id}`,
    };
    entities.push(entity);
  }
  const result: Entity[] = [];
  entities.forEach((entity) => {
    const parentIndex = _.random(0, result.length);
    if (result[parentIndex]) {
      entity.parent = result[parentIndex].id;
    }
    result.push(entity);
  });
  return entities;
};
