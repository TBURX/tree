import * as _ from 'lodash';
import { nanoid } from 'nanoid';
import { DefaultNameByType } from './constants';
import { Entity, EntityType } from './types';

export const getEntities = async (): Promise<Entity[]> => {
  const entityCount = _.random(1, 100);
  const result: Entity[] = [];
  for (let i = 0; i < entityCount; i++) {
    const type = _.random(0, Object.keys(EntityType).length / 2 - 1);
    const id = nanoid();
    const entity: Entity = {
      id,
      type,
      name: `${DefaultNameByType[type as EntityType]} ${id}`,
    };
    result.push(entity);
  }
  result.forEach((entity, index) => {
    const parentIndex = _.random(0, result.length);
    if (parentIndex !== index && parentIndex !== result.length) {
      entity.parent = result[parentIndex].id;
    }
  });
  const noParent = result.filter((entity) => !entity.parent);
  if (!noParent.length) {
    delete result[0].parent;
  }
  return result;
};
