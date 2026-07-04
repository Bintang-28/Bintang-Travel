import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\PaymentsController::index
 * @see app/Http/Controllers/Admin/PaymentsController.php:14
 * @route '/admin/payments'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/payments',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\PaymentsController::index
 * @see app/Http/Controllers/Admin/PaymentsController.php:14
 * @route '/admin/payments'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentsController::index
 * @see app/Http/Controllers/Admin/PaymentsController.php:14
 * @route '/admin/payments'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\PaymentsController::index
 * @see app/Http/Controllers/Admin/PaymentsController.php:14
 * @route '/admin/payments'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\PaymentsController::destroy
 * @see app/Http/Controllers/Admin/PaymentsController.php:40
 * @route '/admin/payments/{payment}'
 */
export const destroy = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/payments/{payment}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\PaymentsController::destroy
 * @see app/Http/Controllers/Admin/PaymentsController.php:40
 * @route '/admin/payments/{payment}'
 */
destroy.url = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { payment: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { payment: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    payment: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        payment: typeof args.payment === 'object'
                ? args.payment.id
                : args.payment,
                }

    return destroy.definition.url
            .replace('{payment}', parsedArgs.payment.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\PaymentsController::destroy
 * @see app/Http/Controllers/Admin/PaymentsController.php:40
 * @route '/admin/payments/{payment}'
 */
destroy.delete = (args: { payment: number | { id: number } } | [payment: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const payments = {
    index: Object.assign(index, index),
destroy: Object.assign(destroy, destroy),
}

export default payments