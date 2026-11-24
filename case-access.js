// This browser preference gates the portfolio demo. All published files are public.
window.caseAccess = (() => {
  const key = 'va-case-demo';
  let unlocked = false;

  return {
    isUnlocked() {
      try { return unlocked || localStorage.getItem(key) === '1'; }
      catch { return unlocked; }
    },
    unlock(code) {
      if (code !== '000000') return false;
      unlocked = true;
      try { localStorage.setItem(key, '1'); } catch {}
      return true;
    }
  };
})();
