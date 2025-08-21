import "./index.css";
import { a } from 'virtual-module-a.js';

console.log('a', a);
document.querySelector("#root")!.innerHTML = `
<div class="content">
  <h1>Vanilla Rspack</h1>
  <p>a: ${a}</p>
  <p>Start building amazing things with Rspack.</p>
</div>
`;
