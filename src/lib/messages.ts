import messages from "@/messages/pl.json";

type Messages = typeof messages;

function getNested(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

export type ClientTranslationFn = ((key: string) => string) & {
  raw: (key: string) => unknown;
};

/**
 * Client hook: returns t(key) for namespace.key (string for JSX). Use t.raw(key) for arrays/objects.
 */
export function useTranslations(namespace: string): ClientTranslationFn {
  const t = (key: string): string => {
    const value = getNested(messages, `${namespace}.${key}`);
    if (typeof value === "string") return value;
    return "";
  };
  t.raw = (key: string): unknown => getNested(messages, `${namespace}.${key}`);
  return t;
}

type ServerTranslationFn = ((key: string) => string) & {
  raw: (key: string) => unknown;
};

/**
 * Server: returns t(key) that looks up namespace.key in messages (string for JSX). Use t.raw(key) for arrays/objects.
 */
export function getTranslations(namespace: string): ServerTranslationFn {
  const fn = (key: string): string => {
    const value = getNested(messages, `${namespace}.${key}`);
    if (typeof value === "string") return value;
    return "";
  };
  fn.raw = (key: string): unknown => getNested(messages, `${namespace}.${key}`);
  return fn;
}
