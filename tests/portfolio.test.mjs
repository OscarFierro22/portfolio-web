import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const read = name => readFileSync(join(root, name), 'utf8');
const html = read('index.html');
const js = read('script.js');
const css = read('styles.css');

test('sitio estático contiene los archivos requeridos', () => {
  for (const filename of ['index.html', 'styles.css', 'script.js', 'README.md', '.gitignore']) {
    assert.ok(existsSync(join(root, filename)), `Falta ${filename}`);
  }
  assert.match(html, /<html lang="es">/);
  assert.match(html, /<main id="contenidoPrincipal">/);
});

test('existen las anclas principales y no hay enlaces internos rotos', () => {
  for (const id of ['inicio', 'sobre-mi', 'habilidades', 'proyectos', 'contacto']) {
    assert.ok(html.includes(`id="${id}"`), `Falta sección ${id}`);
  }
  const ids = new Set([...html.matchAll(/\bid="([a-zA-Z0-9_-]+)"/g)].map(m => m[1]));
  for (const [, target] of html.matchAll(/href="#([a-zA-Z0-9_-]+)"/g)) {
    assert.ok(ids.has(target), `Ancla #${target} sin destino`);
  }
});

test('referencias a recursos locales válidas', () => {
  assert.match(html, /href="styles\.css"/);
  assert.match(html, /src="script\.js" defer/);
  assert.ok(!html.includes('oscar@example.com'));
  assert.ok(!html.includes('href="https://github.com/"'));
});

test('interacciones principales tienen controles accesibles', () => {
  assert.match(html, /id="botonMenu"[\s\S]*?aria-expanded="false"/);
  assert.match(html, /role="dialog" aria-modal="true"/);
  assert.match(html, /id="respuestaFormulario"[\s\S]*?aria-live="polite"/);
  assert.match(css, /prefers-reduced-motion/);
});

test('el formulario no finge que se han enviado correos', () => {
  assert.match(js, /mailto:oscarfierro2222@gmail\.com/);
  assert.match(js, /aún no se ha enviado/);
  assert.ok(!js.includes('Tu mensaje fue enviado correctamente'));
});

test('enlaces externos de los dos proyectos enlazados', () => {
  assert.match(html, /github\.com\/OscarFierro22\/Smart-Parking-EPN/);
  assert.match(html, /github\.com\/OscarFierro22\/Cinta-Transportadora-Industria-4\.0/);
  for (const link of html.matchAll(/<a\b[^>]*target="_blank"[^>]*>/g)) {
    assert.match(link[0], /rel="noopener noreferrer"/);
  }
});


test('documentación y capturas aportadas están presentes en el proyecto', () => {
  for (const filename of [
    'docs/CAPTURAS.md', 'docs/ARQUITECTURA.md', 'docs/GUIA_USO.md', 'docs/MEJORAS.md',
    'docs/capturas/inicio.png', 'docs/capturas/habilidades.png', 'docs/capturas/contacto.png',
    'README.md'
  ]) {
    assert.ok(existsSync(join(root, filename)), `Falta ${filename}`);
  }
  const pngSignature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  for (const image of ['inicio.png', 'habilidades.png', 'contacto.png']) {
    const bytes = readFileSync(join(root, 'docs', 'capturas', image));
    assert.ok(bytes.length > 1000, `Imagen vacía o incompleta: ${image}`);
    assert.deepEqual(bytes.subarray(0, 8), pngSignature, `Formato PNG no válido: ${image}`);
  }
});

test('las imágenes referenciadas en el README y la galería existen', () => {
  for (const markdown of ['README.md', 'docs/CAPTURAS.md', 'docs/GUIA_USO.md']) {
    const content = read(markdown);
    const base = dirname(join(root, markdown));
    const imageLinks = [...content.matchAll(/!\[[^\]]*\]\(([^)]+)\)/g)];
    assert.ok(imageLinks.length, `Documento sin capturas: ${markdown}`);
    for (const [, localPath] of imageLinks) {
      if (/^https?:\/\//.test(localPath)) continue;
      assert.ok(!localPath.includes('..\\'), `Ruta inesperada: ${localPath}`);
      assert.ok(existsSync(resolve(base, localPath)), `Imagen rota en ${markdown}: ${localPath}`);
    }
  }
});