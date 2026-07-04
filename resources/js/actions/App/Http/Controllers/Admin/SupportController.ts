import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\SupportController::index
 * @see app/Http/Controllers/Admin/SupportController.php:15
 * @route '/admin/support'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/support',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SupportController::index
 * @see app/Http/Controllers/Admin/SupportController.php:15
 * @route '/admin/support'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupportController::index
 * @see app/Http/Controllers/Admin/SupportController.php:15
 * @route '/admin/support'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SupportController::index
 * @see app/Http/Controllers/Admin/SupportController.php:15
 * @route '/admin/support'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SupportController::show
 * @see app/Http/Controllers/Admin/SupportController.php:85
 * @route '/admin/support/tickets/{ticket}'
 */
export const show = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/support/tickets/{ticket}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\SupportController::show
 * @see app/Http/Controllers/Admin/SupportController.php:85
 * @route '/admin/support/tickets/{ticket}'
 */
show.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return show.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupportController::show
 * @see app/Http/Controllers/Admin/SupportController.php:85
 * @route '/admin/support/tickets/{ticket}'
 */
show.get = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\SupportController::show
 * @see app/Http/Controllers/Admin/SupportController.php:85
 * @route '/admin/support/tickets/{ticket}'
 */
show.head = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\SupportController::reply
 * @see app/Http/Controllers/Admin/SupportController.php:102
 * @route '/admin/support/tickets/{ticket}/reply'
 */
export const reply = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/admin/support/tickets/{ticket}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SupportController::reply
 * @see app/Http/Controllers/Admin/SupportController.php:102
 * @route '/admin/support/tickets/{ticket}/reply'
 */
reply.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return reply.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupportController::reply
 * @see app/Http/Controllers/Admin/SupportController.php:102
 * @route '/admin/support/tickets/{ticket}/reply'
 */
reply.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SupportController::close
 * @see app/Http/Controllers/Admin/SupportController.php:126
 * @route '/admin/support/tickets/{ticket}/close'
 */
export const close = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

close.definition = {
    methods: ["post"],
    url: '/admin/support/tickets/{ticket}/close',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\SupportController::close
 * @see app/Http/Controllers/Admin/SupportController.php:126
 * @route '/admin/support/tickets/{ticket}/close'
 */
close.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return close.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupportController::close
 * @see app/Http/Controllers/Admin/SupportController.php:126
 * @route '/admin/support/tickets/{ticket}/close'
 */
close.post = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: close.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\SupportController::destroy
 * @see app/Http/Controllers/Admin/SupportController.php:135
 * @route '/admin/support/tickets/{ticket}'
 */
export const destroy = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/support/tickets/{ticket}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\SupportController::destroy
 * @see app/Http/Controllers/Admin/SupportController.php:135
 * @route '/admin/support/tickets/{ticket}'
 */
destroy.url = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { ticket: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { ticket: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    ticket: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        ticket: typeof args.ticket === 'object'
                ? args.ticket.id
                : args.ticket,
                }

    return destroy.definition.url
            .replace('{ticket}', parsedArgs.ticket.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\SupportController::destroy
 * @see app/Http/Controllers/Admin/SupportController.php:135
 * @route '/admin/support/tickets/{ticket}'
 */
destroy.delete = (args: { ticket: number | { id: number } } | [ticket: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const SupportController = { index, show, reply, close, destroy }

export default SupportController