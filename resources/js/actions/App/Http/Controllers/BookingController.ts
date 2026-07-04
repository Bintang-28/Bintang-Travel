import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\BookingController::show
 * @see app/Http/Controllers/BookingController.php:21
 * @route '/fleet/{car}'
 */
export const show = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/fleet/{car}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BookingController::show
 * @see app/Http/Controllers/BookingController.php:21
 * @route '/fleet/{car}'
 */
show.url = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { car: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    car: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        car: typeof args.car === 'object'
                ? args.car.id
                : args.car,
                }

    return show.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::show
 * @see app/Http/Controllers/BookingController.php:21
 * @route '/fleet/{car}'
 */
show.get = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BookingController::show
 * @see app/Http/Controllers/BookingController.php:21
 * @route '/fleet/{car}'
 */
show.head = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\BookingController::book
 * @see app/Http/Controllers/BookingController.php:77
 * @route '/fleet/{car}'
 */
export const book = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: book.url(args, options),
    method: 'post',
})

book.definition = {
    methods: ["post"],
    url: '/fleet/{car}',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\BookingController::book
 * @see app/Http/Controllers/BookingController.php:77
 * @route '/fleet/{car}'
 */
book.url = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { car: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { car: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    car: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        car: typeof args.car === 'object'
                ? args.car.id
                : args.car,
                }

    return book.definition.url
            .replace('{car}', parsedArgs.car.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::book
 * @see app/Http/Controllers/BookingController.php:77
 * @route '/fleet/{car}'
 */
book.post = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: book.url(args, options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\BookingController::confirmation
 * @see app/Http/Controllers/BookingController.php:217
 * @route '/booking/{reservation}'
 */
export const confirmation = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(args, options),
    method: 'get',
})

confirmation.definition = {
    methods: ["get","head"],
    url: '/booking/{reservation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\BookingController::confirmation
 * @see app/Http/Controllers/BookingController.php:217
 * @route '/booking/{reservation}'
 */
confirmation.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return confirmation.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\BookingController::confirmation
 * @see app/Http/Controllers/BookingController.php:217
 * @route '/booking/{reservation}'
 */
confirmation.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: confirmation.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\BookingController::confirmation
 * @see app/Http/Controllers/BookingController.php:217
 * @route '/booking/{reservation}'
 */
confirmation.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: confirmation.url(args, options),
    method: 'head',
})
const BookingController = { show, book, confirmation }

export default BookingController