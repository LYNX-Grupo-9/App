jest.mock('expo-localization', () => ({
    getLocales: jest.fn(() => [{ languageCode: 'pt' }]),
  }));