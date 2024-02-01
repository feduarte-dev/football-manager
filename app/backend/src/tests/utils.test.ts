import { expect } from 'chai';
import mapStatusHTTP from '../utils/mapStatusHTTP';

describe('mapStatusHTTP', () => {
  it('should return 200 for SUCCESSFUL', () => {
    const result = mapStatusHTTP('SUCCESSFUL');
    expect(result).to.equal(200);
  });

  it('should return 201 for CREATED', () => {
    const result = mapStatusHTTP('CREATED');
    expect(result).to.equal(201);
  });

  it('should return 401 for BAD_REQUEST', () => {
    const result = mapStatusHTTP('BAD_REQUEST');
    expect(result).to.equal(400);
  });
  
  it('should return 401 for UNAUTHORIZED', () => {
    const result = mapStatusHTTP('UNAUTHORIZED');
    expect(result).to.equal(401);
  });

  it('should return 404 for NOT_FOUND', () => {
    const result = mapStatusHTTP('NOT_FOUND');
    expect(result).to.equal(404);
  });

  it('should return 422 for UNPROCESSABLE_ENTITY', () => {
    const result = mapStatusHTTP('UNPROCESSABLE_ENTITY');
    expect(result).to.equal(422);
  });
  
  it('should return 500 for unknown status', () => {
    const result = mapStatusHTTP('UNKNOWN_STATUS');
    expect(result).to.equal(500);
  });
});
