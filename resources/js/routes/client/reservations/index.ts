import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Client\ReservationsController::index
 * @see app/Http/Controllers/Client/ReservationsController.php:14
 * @route '/client/reservations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/client/reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\ReservationsController::index
 * @see app/Http/Controllers/Client/ReservationsController.php:14
 * @route '/client/reservations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\ReservationsController::index
 * @see app/Http/Controllers/Client/ReservationsController.php:14
 * @route '/client/reservations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\ReservationsController::index
 * @see app/Http/Controllers/Client/ReservationsController.php:14
 * @route '/client/reservations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Client\ReservationsController::show
 * @see app/Http/Controllers/Client/ReservationsController.php:28
 * @route '/client/reservations/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/client/reservations/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\ReservationsController::show
 * @see app/Http/Controllers/Client/ReservationsController.php:28
 * @route '/client/reservations/{id}'
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
* @see \App\Http\Controllers\Client\ReservationsController::show
 * @see app/Http/Controllers/Client/ReservationsController.php:28
 * @route '/client/reservations/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\ReservationsController::show
 * @see app/Http/Controllers/Client/ReservationsController.php:28
 * @route '/client/reservations/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Client\ReservationsController::print
 * @see app/Http/Controllers/Client/ReservationsController.php:41
 * @route '/client/reservations/{id}/print'
 */
export const print = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/client/reservations/{id}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\ReservationsController::print
 * @see app/Http/Controllers/Client/ReservationsController.php:41
 * @route '/client/reservations/{id}/print'
 */
print.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
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

    return print.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\ReservationsController::print
 * @see app/Http/Controllers/Client/ReservationsController.php:41
 * @route '/client/reservations/{id}/print'
 */
print.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\ReservationsController::print
 * @see app/Http/Controllers/Client/ReservationsController.php:41
 * @route '/client/reservations/{id}/print'
 */
print.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Client\PaymentController::payment
 * @see app/Http/Controllers/Client/PaymentController.php:17
 * @route '/client/reservations/{reservation}/payment'
 */
export const payment = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(args, options),
    method: 'post',
})

payment.definition = {
    methods: ["post"],
    url: '/client/reservations/{reservation}/payment',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\PaymentController::payment
 * @see app/Http/Controllers/Client/PaymentController.php:17
 * @route '/client/reservations/{reservation}/payment'
 */
payment.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return payment.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\PaymentController::payment
 * @see app/Http/Controllers/Client/PaymentController.php:17
 * @route '/client/reservations/{reservation}/payment'
 */
payment.post = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: payment.url(args, options),
    method: 'post',
})
const reservations = {
    index: Object.assign(index, index),
show: Object.assign(show, show),
print: Object.assign(print, print),
payment: Object.assign(payment, payment),
}

export default reservations