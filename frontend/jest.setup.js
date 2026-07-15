// Mock browser APIs not available in JSDOM
Object.defineProperty(window, 'performance', {
  value: {
    mark: () => {},
    measure: () => {},
    getEntriesByName: () => [],
    getEntriesByType: () => [],
    clearMarks: () => {},
    clearMeasures: () => {},
  },
  writable: true,
  configurable: true,
});
