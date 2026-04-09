import { describe, expect, test } from '@jest/globals';
import { ensureHostHttpPrefix } from '~/internal/utils';

describe('test ensureHostHttpPrefix', () => {
  test("when the host starts with 'http://', it returns the original host", () => {
    const host = 'http://my-domain.com';
    const expectedHostResult = 'http://my-domain.com';

    expect(ensureHostHttpPrefix(host)).toBe(expectedHostResult);
  });

  test("when the host starts with 'https://', it returns the original host", () => {
    const host = 'https://my-domain.com';
    const expectedHostResult = 'https://my-domain.com';

    expect(ensureHostHttpPrefix(host)).toBe(expectedHostResult);
  });

  test("when the host does not start with 'http://' or 'https://', it returns the original host with the 'https://' prefix", () => {
    const host = 'my-domain.com';
    const expectedHostResult = 'https://my-domain.com';

    expect(ensureHostHttpPrefix(host)).toBe(expectedHostResult);
  });
});
