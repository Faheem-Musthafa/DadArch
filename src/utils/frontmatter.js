import YAML from 'yaml';

export const parseFrontmatter = (raw) => {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };
  let data = {};
  try {
    data = YAML.parse(match[1]) || {};
  } catch {
    data = {};
  }
  return { data, content: match[2] };
};
