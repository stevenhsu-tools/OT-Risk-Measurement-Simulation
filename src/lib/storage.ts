/**
 * localStorage persistence layer for RiskProfile
 * Single key holds the entire dataset (all 5 tables) wrapped in a versioned envelope
 */

import { RiskProfile, StoredDataset } from './types';
import { DEFAULT_RISK_PROFILE, DEFAULT_DATA_VERSION } from '../data/defaultData';

const STORAGE_KEY = 'ot-risk-sim:dataset:v1';
const CURRENT_SCHEMA_VERSION = 1;

function readEnvelope(): StoredDataset | null {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored) as StoredDataset;
  } catch {
    return null;
  }
}

/**
 * Load dataset from localStorage, with fallback to defaults and migration support.
 *
 * Auto-heal: if this browser's saved data was never modified by the user (still just a copy of
 * some earlier default dataset) and the app's built-in defaults have since changed — e.g. a
 * formula correction — transparently upgrade to the new defaults instead of showing stale data
 * forever. Data the user has actually edited or imported (`userModified: true`) is never touched.
 */
export function loadDataset(): RiskProfile {
  try {
    const parsed = readEnvelope();
    if (!parsed) {
      return structuredClone(DEFAULT_RISK_PROFILE);
    }

    if (parsed.schemaVersion && parsed.schemaVersion < CURRENT_SCHEMA_VERSION) {
      // No migration chain exists yet. Discarding is only safe for data that isn't the user's own
      // (unmodified copies of an old default) — a genuine user-edited dataset must never be wiped
      // just because we don't yet know how to migrate its schema.
      if (parsed.userModified && parsed.profile) {
        console.warn(
          `Dataset schema v${parsed.schemaVersion} is older than current v${CURRENT_SCHEMA_VERSION}; ` +
          `no migration available yet — keeping your existing data as-is.`
        );
        return parsed.profile;
      }
      console.warn(`Dataset schema v${parsed.schemaVersion} is older than current v${CURRENT_SCHEMA_VERSION}`);
      // In the future: run migrations[old→new] chain here
      return structuredClone(DEFAULT_RISK_PROFILE);
    }

    if (!parsed.profile) {
      console.warn('Stored dataset missing profile field, loading defaults');
      return structuredClone(DEFAULT_RISK_PROFILE);
    }

    if (!parsed.userModified && parsed.defaultDataVersion !== DEFAULT_DATA_VERSION) {
      console.log('Built-in default dataset has been updated — refreshing unmodified local copy');
      const fresh = structuredClone(DEFAULT_RISK_PROFILE);
      saveDataset(fresh, false);
      return fresh;
    }

    return parsed.profile;
  } catch (err) {
    console.error('Error loading dataset from localStorage, using defaults:', err);
    return structuredClone(DEFAULT_RISK_PROFILE);
  }
}

/**
 * Save dataset to localStorage.
 * @param userModified Marks whether this save represents a genuine user edit/import (default) or
 *   a save that still exactly matches the built-in defaults (e.g. a full reset) — see loadDataset.
 */
export function saveDataset(profile: RiskProfile, userModified: boolean = true): void {
  try {
    const dataset: StoredDataset = {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      savedAt: new Date().toISOString(),
      defaultDataVersion: DEFAULT_DATA_VERSION,
      userModified,
      profile,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataset));
    console.log('Dataset saved to localStorage');
  } catch (err) {
    if (err instanceof DOMException && err.code === 22) {
      // QuotaExceededError
      console.error('localStorage quota exceeded, unable to save');
    } else {
      console.error('Error saving dataset to localStorage:', err);
    }
  }
}

/**
 * Reset a single table to its default. Preserves the existing userModified flag — resetting one
 * table doesn't guarantee the rest of the profile still matches defaults exactly, so it would be
 * wrong to mark the whole dataset "unmodified" here.
 */
export function resetTable<K extends keyof RiskProfile>(table: K): RiskProfile {
  const envelope = readEnvelope();
  const current = envelope?.profile ? { ...envelope.profile } : structuredClone(DEFAULT_RISK_PROFILE);
  current[table] = structuredClone(DEFAULT_RISK_PROFILE[table]);
  saveDataset(current, envelope?.userModified ?? false);
  return current;
}

/**
 * Reset entire dataset to defaults — the result now exactly matches DEFAULT_RISK_PROFILE, so this
 * is the one operation that clears the userModified flag.
 */
export function resetAll(): RiskProfile {
  const defaults = structuredClone(DEFAULT_RISK_PROFILE);
  saveDataset(defaults, false);
  return defaults;
}

/**
 * Clear all saved data (for testing / fresh start)
 */
export function clearStorage(): void {
  localStorage.removeItem(STORAGE_KEY);
  console.log('Cleared saved dataset from localStorage');
}
