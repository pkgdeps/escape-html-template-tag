# @pkgdeps/escape-html-template-tag

Construct string literals that have their substitutions escaped automatically.

Fork of [Janpot/escape-html-template-tag](https://github.com/Janpot/escape-html-template-tag):

- Distributes cjs, umd, modern.js, and es5(IE 11 supports)
- Use named exports `import { escapeHtml } from "@pkgdeps/escape-html-template-tag"`

[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)


## Usage

### Basic example

```js
import { escapeHtml } from "@pkgdeps/escape-html-template-tag";

const title = 'All about < & >'
const h1 = escapeHtml`
  <h1>${title}</h1>
`
// <h1>All about &lt; &amp; &gt;</h1>
```

### Nesting templates

Escaped template literals can be nested and won't be interpollated again.

```js
import { escapeHtml } from "@pkgdeps/escape-html-template-tag";
const h1 = escapeHtml`<h1>Hello World</h1>`;
const article = escapeHtml`
  ${h1}
  I'ts me!
`;
// <h1>Hello World</h1>
// I'ts me!
```

### Automatically flatten arrays

In case a value is an Array, the items will be individually escaped and concatenated.

```js
import { escapeHtml } from "@pkgdeps/escape-html-template-tag";
const listOfSymbols = escapeHtml`
  <ul>
    ${['<', '&', '>'].map(item => escapeHtml`<li>symbol: ${item}</li>`)}
  </ul>
`
// <ul>
//   <li>symbol: &lt;</li>
//   <li>symbol: &amp;</li>
//   <li>symbol: &gt;</li>
// </ul>
```

### Don't interpollate html from trusted sources with `safe()`

If you have html strings that already contain markup you can prevent it from being escaped with `escapeHtml.safe()`.

```js
import { escapeHtml, safe } from "@pkgdeps/escape-html-template-tag";
const trustedString = '<a href="https://www.google.com">Google</a>'
const navigation = escapeHtml`
  <div>
    ${safe(trustedString)}
  </div>
`
// <div>
//   <a href="https://www.google.com">Google</a>
// </div>
```

### Join fragments together with `join`

```js
import { escapeHtml, join } from "@pkgdeps/escape-html-template-tag";
const navigation = escapeHtml`
  <div>
    ${join(
      ['home', 'about', 'blog'].map(page => escapeHtml`<a href="/${page}">${page}</div>a>`),
      ' | '
    )}
  </div>
`
// <div>
//   <a href="/home">home</div>a> | <a href="/about">about</div>a> | <a href="/blog">blog</div>a>
// </div>
```

### Compose templates easily with functions

```js
import { escapeHtml } from "@pkgdeps/escape-html-template-tag";

const anchor = (text, href) => escapeHtml`<a href="${href}">${text}</a>`

const list = items => escapeHtml`
  <ul>
    ${items.map(item => html`<li>${item}</li>`)}
  </ul>
`

const navigation = list(
  anchor('Home', '/home'),
  anchor('About', '/about'),
  anchor('Blog', '/blog')
);
// <ul>
//   <li><a href="&#x2F;home">Home</a></li>
//   <li><a href="&#x2F;about">About</a></li>
//   <li><a href="&#x2F;blog">Blog</a></li>
// </ul>
```
