import * as sinon from 'sinon';
import { expect } from 'chai';
import mapStatusHTTP from '../utils/mapStatusHTTP';
import JWT from '../utils/tokenValidation';

describe('mapStatusHTTP', () => {
  it('should return 200 for SUCCESSFUL', () => {
    const result = mapStatusHTTP('SUCCESSFUL');
    expect(result).to.equal(200);
  });

  it('should return 400 for BAD_REQUEST', () => {
    const result = mapStatusHTTP('BAD_REQUEST');
    expect(result).to.equal(400);
  });
  
  it('should return 404 for NOT_FOUND', () => {
    const result = mapStatusHTTP('NOT_FOUND');
    expect(result).to.equal(404);
  });
  
  it('should return 401 for UNAUTHORIZED', () => {
    const result = mapStatusHTTP('UNAUTHORIZED');
    expect(result).to.equal(401);
  });

  it('should return 500 for unknown status', () => {
    const result = mapStatusHTTP('UNKNOWN_STATUS');
    expect(result).to.equal(500);
  });
});

describe('JWT', () => {
  describe('sign', () => {
    it('should return a string', () => {
      const payload = { userId: '123', role: 'admin' };
      const token = JWT.sign(payload);

      expect(token).to.be.a('string');
    });

    it('should use the provided payload in the token', () => {
      const payload = { userId: '123', role: 'admin' };
      const signSpy = sinon.spy(JWT, 'sign');

      JWT.sign(payload);

      sinon.assert.calledWithExactly(signSpy, payload);
      signSpy.restore();
    });
  });

  describe('verify', () => {
    it('should return JwtPayload if the token is valid', () => {
      type ResultType = {
        payload: string,
        iat: number,
        exp: number
      }
      const payload = 'admin';
      const token = JWT.sign({ payload });

      const result = JWT.verify(token) as ResultType;

      expect(result.payload).to.equal(payload);
    });

    it('should return an error message if the token is invalid', () => {
      type ResultType = {
        payload: string,
        iat: number,
        exp: number
      }
      const payload = 'admin';
      const token = JWT.sign({ payload });

      const result = JWT.verify('invalid') as ResultType;
      
      expect(result.payload).not.to.equal(payload);
    });
  });
});
