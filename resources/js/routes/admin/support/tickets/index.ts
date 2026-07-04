import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
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
const tickets = {
    destroy: Object.assign(destroy, destroy),
}

export default tickets