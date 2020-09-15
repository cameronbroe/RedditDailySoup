import { hello } from '../src/hello';

test('hello greets the world', () => {
    expect(hello('world')).toBe('Hello, world!');
})
