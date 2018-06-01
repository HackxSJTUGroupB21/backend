import randomstring from 'randomstring';

export function calculateToken() {
  return `${randomstring.generate(20)}${Date.now()}${randomstring.generate(20)}`;
}
