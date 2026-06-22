/**
 * Wayfinder Route Helpers
 * Generated type definitions and utilities for type-safe routes
 */

export type RouteMethod = 'get' | 'post' | 'put' | 'patch' | 'delete' | 'head' | 'options';

export interface RouteDefinition<T extends RouteMethod | RouteMethod[] = RouteMethod> {
    url: string;
    method: T extends RouteMethod[] ? T[number] : T;
}

export interface RouteFormDefinition<T extends RouteMethod = RouteMethod> {
    action: string;
    method: T;
}

export interface RouteQueryOptions {
    query?: Record<string, any>;
    mergeQuery?: Record<string, any>;
    [key: string]: any;
}

/**
 * Convert query options object to URL query string
 */
export const queryParams = (options?: RouteQueryOptions): string => {
    if (!options || (!options.query && !options.mergeQuery)) {
        return '';
    }

    const params = new URLSearchParams();
    const queryObj = options.query || options.mergeQuery || {};

    Object.entries(queryObj).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
            if (Array.isArray(value)) {
                value.forEach((v) => params.append(key, String(v)));
            } else {
                params.append(key, String(value));
            }
        }
    });

    const queryString = params.toString();
    return queryString ? '?' + queryString : '';
};

/**
 * Apply URL defaults to route definition
 */
export const applyUrlDefaults = (url: string, defaults?: Record<string, any>): string => {
    if (!defaults) return url;

    let finalUrl = url;
    Object.entries(defaults).forEach(([key, value]) => {
        finalUrl = finalUrl.replace(`:${key}`, String(value));
    });

    return finalUrl;
};
