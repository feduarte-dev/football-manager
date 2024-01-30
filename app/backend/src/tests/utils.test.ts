import { expect } from 'chai';
import mapStatusHTTP from '../utils/mapStatusHTTP';

describe('mapStatusHTTP', () => {
  it('should return 200 for SUCCESSFUL', () => {
    const result = mapStatusHTTP('SUCCESSFUL');
    expect(result).to.equal(200);
  });

  it('should return 400 for INVALID_DATA', () => {
    const result = mapStatusHTTP('INVALID_DATA');
    expect(result).to.equal(400);
  });

  it('should return 404 for NOT_FOUND', () => {
    const result = mapStatusHTTP('NOT_FOUND');
    expect(result).to.equal(404);
  });

  it('should return 409 for CONFLICT', () => {
    const result = mapStatusHTTP('CONFLICT');
    expect(result).to.equal(409);
  });

  it('should return 500 for unknown status', () => {
    const result = mapStatusHTTP('UNKNOWN_STATUS');
    expect(result).to.equal(500);
  });
});
