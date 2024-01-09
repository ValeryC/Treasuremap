const turn = require('../turn');

describe('turn', () => {
  it('should turn left from North', () => {
    const result = turn('N', 'G');
    expect(result).toBe('W');
  });

  it('should turn right from North', () => {
    const result = turn('N', 'D');
    expect(result).toBe('E');
  });

  it('should turn left from West', () => {
    const result = turn('W', 'G');
    expect(result).toBe('S');
  });

  it('should turn right from West', () => {
    const result = turn('W', 'D');
    expect(result).toBe('N');
  });

  it('should turn left from South', () => {
    const result = turn('S', 'G');
    expect(result).toBe('E');
  });

  it('should turn right from South', () => {
    const result = turn('S', 'D');
    expect(result).toBe('W');
  });

  it('should turn left from East', () => {
    const result = turn('E', 'G');
    expect(result).toBe('N');
  });

  it('should turn right from East', () => {
    const result = turn('E', 'D');
    expect(result).toBe('S');
  });
  
  it('should handle lowercase direction', () => {
    const result = turn('E', 'g');
    expect(result).toBe('N');
  });
});
