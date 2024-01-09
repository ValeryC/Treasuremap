const fs = require('fs');
const readInput = require('../readInput');

describe('readInput', () => {
  const mockReadFileSync = jest.spyOn(fs, 'readFileSync');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should read and parse the input file correctly', () => {
    const mockData = 'C - 3 - 4\nM - 1 - 1\nT - 0 - 2 - 3\nA - Bob - 1 - 0 - N - AAAGGA';
    mockReadFileSync.mockReturnValueOnce(mockData);

    const filename = 'input.txt';
    const result = readInput(filename);

    expect(mockReadFileSync).toHaveBeenCalledWith(filename, 'utf-8');
    expect(result).toEqual(['C - 3 - 4', 'M - 1 - 1', 'T - 0 - 2 - 3', 'A - Bob - 1 - 0 - N - AAAGGA']);
  });

  it('should handle comments correctly', () => {
    const mockData = '# This is a comment\nC - 3 - 4\n# Another comment\nA - Alice - 2 - 2 - S - AAAGG';
    mockReadFileSync.mockReturnValueOnce(mockData);

    const filename = 'input.txt';
    const result = readInput(filename);

    expect(mockReadFileSync).toHaveBeenCalledWith(filename, 'utf-8');
    expect(result).toEqual(['C - 3 - 4', 'A - Alice - 2 - 2 - S - AAAGG']);
  });

  it('should handle file read error', () => {
    const mockErrorMessage = 'File not found';
    mockReadFileSync.mockImplementationOnce(() => {
      throw new Error(mockErrorMessage);
    });

    const filename = 'nonexistent.txt';

    // Redirect console.error to a mock function for testing error messages
    const consoleErrorMock = jest.spyOn(console, 'error').mockImplementation(() => {});
    const exitMock = jest.spyOn(process, 'exit').mockImplementation(() => {});

    // Execute the function that should log the error and exit the process
    readInput(filename);

    expect(mockReadFileSync).toHaveBeenCalledWith(filename, 'utf-8');
    expect(consoleErrorMock).toHaveBeenCalledWith(`Erreur de lecture du fichier d'entrée: ${mockErrorMessage}`);
    expect(exitMock).toHaveBeenCalledWith(1);

    // Restore the original console.error and process.exit functions
    consoleErrorMock.mockRestore();
    exitMock.mockRestore();
  });
});
