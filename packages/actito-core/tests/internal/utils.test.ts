import { describe, expect, test } from '@jest/globals';
import { ensureHostHttpPrefix } from '~/internal/utils';

describe('test ensureHostHttpPrefix', () => {
  test("when the host starts with 'http://', it returns the original host", () => {
    const input = 'http://my-domain.com';
    const expectedOutput = 'http://my-domain.com';

    expect(ensureHostHttpPrefix(input)).toBe(expectedOutput);
  });

  test("when the host starts with 'https://', it returns the original host", () => {
    const input = 'https://my-domain.com';
    const expectedOutput = 'https://my-domain.com';

    expect(ensureHostHttpPrefix(input)).toBe(expectedOutput);
  });

  test("when the host does not start with 'http://' or 'https://', it adds the 'https://' prefix to the host", () => {
    const input = 'my-domain.com';
    const expectedOutput = 'https://my-domain.com';

    expect(ensureHostHttpPrefix(input)).toBe(expectedOutput);
  });
});
