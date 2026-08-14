export function parseJsonSequence(text, subject) {
  const values = [];
  let index = 0;
  while (index < text.length) {
    while (/\s/u.test(text[index] ?? "")) index += 1;
    if (index === text.length) break;
    if (text[index] !== "{") {
      throw new Error(`${subject} contains non-object JSON`);
    }
    const start = index;
    let depth = 0;
    let string = false;
    let escaped = false;
    for (; index < text.length; index += 1) {
      const character = text[index];
      if (string) {
        if (escaped) escaped = false;
        else if (character === "\\") escaped = true;
        else if (character === "\"") string = false;
        continue;
      }
      if (character === "\"") string = true;
      else if (character === "{") depth += 1;
      else if (character === "}") {
        depth -= 1;
        if (depth === 0) {
          index += 1;
          values.push(JSON.parse(text.slice(start, index)));
          break;
        }
      }
    }
    if (depth !== 0 || string) {
      throw new Error(`${subject} contains incomplete JSON`);
    }
  }
  return values;
}
