import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Client\PaymentController::store
 * @see app/Http/Controllers/Client/PaymentController.php:17
 * @route '/client/reservations/{reservation}/payment'
 */
export const store = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/client/reservations/{reservation}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\PaymentController::store
 * @see app/Http/Controllers/Client/PaymentController.php:17
 * @route '/client/reservations/{reservation}/payment'
 */
store.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reservation: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reservation: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reservation: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reservation: typeof args.reservation === 'object'
                ? args.reservation.id
                : args.reservation,
                }

    return store.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\PaymentController::store
 * @see app/Http/Controllers/Client/PaymentController.php:17
 * @route '/client/reservations/{reservation}/payment'
 */
store.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})
const PaymentController = { store }

export default PaymentController