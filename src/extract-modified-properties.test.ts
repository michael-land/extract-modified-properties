import { describe, expect, it } from 'vitest';
import { extractModifiedProperties } from './extract-modified-properties.js';

describe('diff function', () => {
  it('should return null when comparing two equal objects', () => {
    const prev = {
      id: '152550cd-32ad-4757-8d77-64864530d46b',
      createdAt: '2024-01-26T03:04:43.404Z',
      updatedAt: '2024-01-26T03:04:43.404Z',
      invoicedAt: '2024-01-25T14:00:29.553Z',
      archivedAt: null,
      archivedReason: null,
      tenantId: 'org_2bL6glTOpGt57zD21o0th8Xfhks',
      accountId: '5735ce3b-d017-4d27-8539-40b07a0d84e4',
      marketplaceId: '2c1e196c-9b9d-462c-bcb1-9407bafa07ed',
      currencyId: 'USD',
      externalId: '16-11093-85251',
      externalUrl: 'https://www.ebay.com/mesh/ord/details?orderid=16-11093-85251',
      externalReference: '7909',
      externalCreatedAt: '2024-01-25T14:00:30.000Z',
      externalUpdatedAt: '2024-01-25T17:54:59.000Z',
      type: 'RETAIL',
      status: 'FULFILLED',
      channel: 'WEB',
      traderId: '94a09818-8884-4f80-a7fe-ade4380da981',
      traderCompanyId: null,
      traderName: 'Jason Moore',
      traderNote: 'Need it as fast as you can get it to me… Thanks!',
      traderEmail: '6a5113db4e5dc4f9f949@members.ebay.com',
      traderPhone: '5072620930',
      traderOrderNumber: null,
      paymentTerm: 'NONE',
      paymentStatus: 'FULLY_PAID',
      paymentMethod: 'PLATFORM',
      paymentPaidAt: '2024-01-25T14:00:29.553Z',
      paymentTaxRemitter: 'PLATFORM',
      amountItemsPrice: 2299,
      amountItemsTax: 170,
      amountItemsDiscount: 0,
      amountItemsShippingPrice: 0,
      amountItemsShippingTax: 0,
      amountItemsShippingDiscount: 0,
      amountItemsHandlingPrice: 0,
      amountItemsHandlingTax: 0,
      amountItemsHandlingDiscount: 0,
      amountOrderShippingPrice: 0,
      amountOrderShippingTax: 0,
      amountOrderShippingDiscount: 0,
      amountOrderHandlingPrice: 0,
      amountOrderHandlingTax: 0,
      amountOrderHandlingDiscount: 0,
      amountOrderTax: 0,
      amountOrderDiscount: 0,
      amountOrderTotal: 2469,
      isPremium: false,
      isBusiness: false,
      isGlobalProgram: false,
    };
    const next = {
      id: '152550cd-32ad-4757-8d77-64864530d46b',
      tenantId: 'org_2bL6glTOpGt57zD21o0th8Xfhks',
      accountId: '5735ce3b-d017-4d27-8539-40b07a0d84e4',
      createdAt: undefined,
      updatedAt: undefined,
      externalId: '16-11093-85251',
      externalCreatedAt: '2024-01-25T14:00:30.000Z',
      externalUpdatedAt: '2024-01-25T17:54:59.000Z',
      externalUrl: 'https://www.ebay.com/mesh/ord/details?orderid=16-11093-85251',
      externalReference: '7909',
      marketplaceId: '2c1e196c-9b9d-462c-bcb1-9407bafa07ed',
      amountItemsDiscount: 0,
      amountItemsHandlingDiscount: 0,
      amountItemsHandlingPrice: 0,
      amountItemsHandlingTax: 0,
      amountItemsPrice: 2299,
      amountItemsShippingDiscount: 0,
      amountItemsShippingPrice: 0,
      amountItemsShippingTax: 0,
      amountItemsTax: 170,
      amountOrderDiscount: 0,
      amountOrderHandlingDiscount: 0,
      amountOrderHandlingPrice: 0,
      amountOrderHandlingTax: 0,
      amountOrderShippingDiscount: 0,
      amountOrderShippingPrice: 0,
      amountOrderShippingTax: 0,
      amountOrderTax: 0,
      amountOrderTotal: 2469,
      archivedAt: null,
      archivedReason: null,
      channel: 'WEB',
      currencyId: 'USD',
      invoicedAt: '2024-01-25T14:00:29.553Z',
      isBusiness: false,
      isGlobalProgram: false,
      isPremium: false,
      paymentMethod: 'PLATFORM',
      paymentPaidAt: '2024-01-25T14:00:29.553Z',
      paymentStatus: 'FULLY_PAID',
      paymentTaxRemitter: 'PLATFORM',
      paymentTerm: 'NONE',
      status: 'FULFILLED',
      traderCompanyId: null,
      traderEmail: '6a5113db4e5dc4f9f949@members.ebay.com',
      traderId: '94a09818-8884-4f80-a7fe-ade4380da981',
      traderName: 'Jason Moore',
      traderNote: 'Need it as fast as you can get it to me… Thanks!',
      traderOrderNumber: null,
      traderPhone: '5072620930',
      type: 'RETAIL',
    };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal objects', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'John', age: 30 };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal boolean values', () => {
    const prev = { flag: true };
    const next = { flag: true };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two null values', () => {
    const prev = { value: null };
    const next = { value: null };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal dates', () => {
    const prev = { date: new Date('2022-01-01') };
    const next = { date: new Date('2022-01-01') };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal dates (date and ISOString)', () => {
    const prev = { date: new Date('2022-01-01') };
    const next = { date: new Date('2022-01-01').toISOString() };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal array', () => {
    const prev = { array: [1, 2, 3] };
    const next = { array: [1, 2, 3] };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal integer', () => {
    const prev = { integer: 1 };
    const next = { integer: 1 };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return null when comparing two equal decimal', () => {
    const prev = { decimal: 1.1 };
    const next = { decimal: 1.1 };
    expect(extractModifiedProperties({ prev, next })).toBeNull();
  });

  it('should return the changed integer value', () => {
    const prev = { integer: 1 };
    const next = { integer: 2 };
    const expected = { integer: 2 };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed string value', () => {
    const prev = { string: 'John' };
    const next = { string: 'Jane' };
    const expected = { string: 'Jane' };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed boolean value', () => {
    const prev = { flag: true };
    const next = { flag: false };
    const expected = { flag: false };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed date value', () => {
    const prev = { date: new Date('2022-01-01') };
    const next = { date: new Date('2023-01-01') };
    const expected = { date: new Date('2023-01-01') };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the changed value only', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'Jane', age: 30 };
    const expected = { name: 'Jane' };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire array when changed', () => {
    const prev = { items: [1, 2, 3] };
    const next = { items: [1, 2, 4] };
    const expected = { items: [1, 2, 4] };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire array when added', () => {
    const prev = { items: [1, 2, 3] };
    const next = { items: [1, 2, 3, 4] };
    const expected = { items: [1, 2, 3, 4] };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire array when removed', () => {
    const prev = { items: [1, 2, 3, 4] };
    const next = { items: [1, 2, 3] };
    const expected = { items: [1, 2, 3] };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the entire object when nested objects are different', () => {
    const prev = { person: { name: 'John', age: 30 } };
    const next = { person: { name: 'Jane', age: 30 } };
    const expected = { person: { name: 'Jane', age: 30 } };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  it('should return the new value when the next value is null', () => {
    const prev = { value: 'old value' };
    const next = { value: null };
    const expected = { value: null };
    expect(extractModifiedProperties({ prev, next })).toEqual(expected);
  });

  // Add more test cases as needed to cover different scenarios
});

describe('diff function with keys parameter', () => {
  it('should only compare specified key and return changes', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'Jane', age: 30 };
    const keys = ['name'] as const;
    const expected = { name: 'Jane' };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  it('should return null if specified key has no change', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'John', age: 31 };
    const keys = ['name'] as const;
    expect(extractModifiedProperties({ prev, next, keys })).toBeNull();
  });

  it('should return changes for multiple specified keys', () => {
    const prev = { name: 'John', age: 30, location: 'City A' };
    const next = { name: 'Jane', age: 30, location: 'City B' };
    const keys = ['name', 'location'] as const;
    const expected = { name: 'Jane', location: 'City B' };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  it('should return null for a removed key specified in keys', () => {
    const prev = { name: 'John', age: 30 };
    const next = { age: 30 };
    const keys = ['name'] as const;

    expect(extractModifiedProperties({ prev, next, keys })).toBeNull();
  });

  it('should handle a key specified in keys not existing in both objects', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'John', age: 31 };
    const keys = ['gender'] as const;
    // @ts-expect-error key not existing in both objects
    expect(extractModifiedProperties({ prev, next, keys })).toBeNull();
  });

  it('should return changes for nested objects specified in keys', () => {
    const prev = { person: { name: 'John', age: 30 } };
    const next = { person: { name: 'Jane', age: 30 } };
    const keys = ['person'] as const;
    const expected = { person: { name: 'Jane', age: 30 } };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  it('should not return changes for keys not specified in keys array', () => {
    const prev = { name: 'John', age: 30 };
    const next = { name: 'Jane', age: 31 };
    const keys = ['age'] as const;
    const expected = { age: 31 };
    expect(extractModifiedProperties({ prev, next, keys })).toEqual(expected);
  });

  // Add more test cases as needed to cover different scenarios
});
