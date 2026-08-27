import { NextResponse } from 'next/server';

/**
 * Structured JSON error envelope shared by the public API.
 *
 * Shape (also documented as `Error` in public/openapi.json):
 *   { error, code, message, hint?, details?, links? }
 *
 * `error` is kept for backwards compatibility with the desktop clients that
 * only read that field; `code` is the machine-readable discriminator agents
 * should branch on; `hint` says what to do about it.
 */
export type JsonErrorCode =
  | 'bad_request'
  | 'not_found'
  | 'rate_limited'
  | 'service_unavailable'
  | 'server_error';

export interface JsonErrorBody {
  error: string;
  code: JsonErrorCode;
  message: string;
  hint?: string;
  details?: unknown[];
  links?: Record<string, string>;
}

export interface JsonErrorInit extends Omit<JsonErrorBody, 'error' | 'message'> {
  status: number;
  message: string;
  /** Defaults to `message`. */
  error?: string;
  headers?: Record<string, string>;
}

export function jsonErrorBody(init: JsonErrorInit): JsonErrorBody {
  const body: JsonErrorBody = {
    error: init.error ?? init.message,
    code: init.code,
    message: init.message
  };
  if (init.hint) body.hint = init.hint;
  if (init.details) body.details = init.details;
  if (init.links) body.links = init.links;
  return body;
}

export function jsonError(init: JsonErrorInit): NextResponse<JsonErrorBody> {
  return NextResponse.json(jsonErrorBody(init), {
    status: init.status,
    headers: {
      'Cache-Control': 'no-store',
      'X-Robots-Tag': 'noindex',
      ...init.headers
    }
  });
}
