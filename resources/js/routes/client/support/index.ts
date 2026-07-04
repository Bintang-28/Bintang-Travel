import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
import chat from './chat'
/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/client/support',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/client/support/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/client/support',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/client/support/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
export const reply = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/client/support/{id}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
reply.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return reply.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
reply.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})
const support = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
reply: Object.assign(reply, reply),
chat: Object.assign(chat, chat),
}

export default support