import {
  it,
  inject,
  beforeEach
} from 'angular2/testing';
import {EmailCheckResult} from './EmailCheckResult';

describe('EmailCheckResult', () => {
  describe('error()', () => {
    let result:EmailCheckResult;
    beforeEach(() => {
      result = EmailCheckResult.error();
    });
    it('should return available as false', () => {
      expect(result.available).toBeFalsy();
    });
    it('should return error as true', () => {
      expect(result.error).toBeTruthy();
    });
  });

  describe('taken()', () => {
    let result:EmailCheckResult;
    beforeEach(() => {
      result = EmailCheckResult.taken();
    });
    it('should return available as false', () => {
      expect(result.available).toBeFalsy();
    });
    it('should return error as false', () => {
      expect(result.error).toBeFalsy();
    });
  });

  describe('available()', () => {
    let result:EmailCheckResult;
    beforeEach(() => {
      result = EmailCheckResult.available();
    });
    it('should return available as true', () => {
      expect(result.available).toBeTruthy();
    });
    it('should return error as false', () => {
      expect(result.error).toBeFalsy();
    });
  });


});
