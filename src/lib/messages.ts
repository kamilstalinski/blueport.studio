import messages from "@/messages/pl.json";
import type { ClientTranslationFn, ServerTranslationFn } from "@/types";

export type { ClientTranslationFn, ServerTranslationFn } from "@/types";

function getNested(obj: unknown, path: string): unknown {
  const parts = path.split(".");
  let current: unknown = obj;
  for (const part of parts) {
    if (current === null || current === undefined) return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return current;
}

/**
 * Client hook: returns t(key) for namespace.key (string for JSX). Use t.raw(key) for arrays/objects.
 */
export function useTranslations(namespace: string): ClientTranslationFn {
  const translate = (key: string): string => {
    const value = getNested(messages, `${namespace}.${key}`);
    if (typeof value === "string") return value;
    return "";
  };
  translate.raw = (key: string): unknown => getNested(messages, `${namespace}.${key}`);
  return translate;
}

/**
 * Server: returns t(key) that looks up namespace.key in messages (string for JSX). Use t.raw(key) for arrays/objects.
 */
export function getTranslations(namespace: string): ServerTranslationFn {
  const serverTranslate = (key: string): string => {
    const value = getNested(messages, `${namespace}.${key}`);
    if (typeof value === "string") return value;
    return "";
  };
  serverTranslate.raw = (key: string): unknown => getNested(messages, `${namespace}.${key}`);
  return serverTranslate;
}
