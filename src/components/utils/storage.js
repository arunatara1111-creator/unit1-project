export function todayStr() {
    return new Date().toISOString().slice(0, 10);
  }
  
  export async function storageGet(key) {
    try {
      const res = await window.storage.get(key, true);
      return res ? res.value : null;
    } catch (error) {
      console.error("Storage get error:", error);
      return null;
    }
  }
  
  export async function storageSet(key, value) {
    try {
      await window.storage.set(key, JSON.stringify(value), true);
      return true;
    } catch (error) {
      console.error("Storage set error:", error);
      return false;
    }
  }