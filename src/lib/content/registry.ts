import { isLivingIndexId } from './ids';

export type IndexedCollection = 'work' | 'research' | 'writing';

export interface LivingIndexEntry {
  id: string;
  collection: IndexedCollection;
  slug: string;
}

export interface LivingIndexRegistry {
  nextNumber: number;
  entries: ReadonlyArray<LivingIndexEntry>;
}

export function validateLivingIndexRegistry(registry: LivingIndexRegistry): void {
  const ids = new Set<string>();
  const coordinates = new Set<string>();
  let maxNumber = 0;

  for (const entry of registry.entries) {
    if (!isLivingIndexId(entry.id)) {
      throw new Error(`Invalid Living Index ID: ${entry.id}`);
    }

    if (ids.has(entry.id)) {
      throw new Error(`Duplicate Living Index ID: ${entry.id}`);
    }
    ids.add(entry.id);

    const coordinate = `${entry.collection}/${entry.slug}`;
    if (coordinates.has(coordinate)) {
      throw new Error(`Duplicate collection/slug coordinate: ${coordinate}`);
    }
    coordinates.add(coordinate);

    maxNumber = Math.max(maxNumber, Number(entry.id.slice(2)));
  }

  if (!Number.isInteger(registry.nextNumber) || registry.nextNumber < 1) {
    throw new Error('nextNumber must be a positive integer.');
  }

  if (registry.nextNumber <= maxNumber) {
    throw new Error('nextNumber must be greater than every assigned Living Index number.');
  }
}
