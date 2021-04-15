const assert = require('assert')
const { escapeHtml, safe, join } = require('.')

assert.strictEqual(String(escapeHtml`<a>`), '<a>')
assert.strictEqual(String(escapeHtml`${'<a>'}`), '&lt;a&gt;')
assert.strictEqual(String(escapeHtml`${1}`), '1')

// nesting
assert.strictEqual(String(escapeHtml`${escapeHtml`<a>`}`), '<a>')
assert.strictEqual(String(escapeHtml`${escapeHtml`${'<a>'}`}`), '&lt;a&gt;')

// escape characters
assert.strictEqual(String(escapeHtml`${'&'}`), '&amp;')
assert.strictEqual(String(escapeHtml`${'<'}`), '&lt;')
assert.strictEqual(String(escapeHtml`${'>'}`), '&gt;')
assert.strictEqual(String(escapeHtml`${'"'}`), '&quot;')
assert.strictEqual(String(escapeHtml`${"'"}`), '&#39;')
assert.strictEqual(String(escapeHtml`${'/'}`), '&#x2F;')
assert.strictEqual(String(escapeHtml`${'`'}`), '&#x60;')
assert.strictEqual(String(escapeHtml`${'='}`), '&#x3D;')

// flattening arrays
assert.strictEqual(String(escapeHtml`${['a', 1, '<']}`), 'a1&lt;')
assert.strictEqual(String(escapeHtml`${['a', escapeHtml`<`]}`), 'a<')
assert.strictEqual(String(escapeHtml`${[]}`), '')

// safe
assert.strictEqual(String(escapeHtml`${safe('<a>')}`), '<a>')
assert.strictEqual(String(escapeHtml`${safe(1)}`), '1')
assert.strictEqual(String(escapeHtml`${safe([1, 2, 3])}`), '1,2,3')
assert.strictEqual(String(escapeHtml`${safe(escapeHtml`<a>`)}`), '<a>')

// .join
assert.strictEqual(String(join([escapeHtml`a`, escapeHtml`b`, escapeHtml`c`], ' ')), 'a b c')
assert.strictEqual(String(join([escapeHtml`a`, escapeHtml`b`, escapeHtml`c`])), 'a,b,c')
assert.strictEqual(String(join([escapeHtml`a`, escapeHtml`b`, escapeHtml`c`], null)), 'a,b,c')
assert.strictEqual(String(join([escapeHtml`<`, escapeHtml`>`], escapeHtml`${'&'}`)), '<&amp;>')
assert.strictEqual(String(join([escapeHtml`${'<'}`, escapeHtml`${'>'}`], escapeHtml`&`)), '&lt;&&gt;')
