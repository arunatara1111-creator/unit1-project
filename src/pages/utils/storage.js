
export function todayStr(offset = 0) {
  const date = new Date();

  date.setDate(date.getDate() + offset);

  return date.toISOString().slice(0, 10);
}
export function niceDay(dateStr) {
    const d = new Date(dateStr + "T00:00:00");
  
    return d.toLocaleDateString(undefined, {
      weekday: "short",
    });
  }
  

export async function storageGet(key) {
  try {
    const value = localStorage.getItem(key);

    return value;
  } catch (error) {
    console.error("Storage get error:", error);
    return null;
  }
}

export async function storageSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));

    // Notify other components in the same application
    window.dispatchEvent(
      new CustomEvent("brightsteps-storage", {
        detail: {
          key,
          value,
        },
      })
    );

    return true;
  } catch (error) {
    console.error("Storage set error:", error);
    return false;
  }
}

export function storageRemove(key) {
  try {
    localStorage.removeItem(key);

    window.dispatchEvent(
      new CustomEvent("brightsteps-storage", {
        detail: {
          key,
          value: null,
        },
      })
    );

    return true;
  } catch (error) {
    console.error("Storage remove error:", error);
    return false;
  }
}
