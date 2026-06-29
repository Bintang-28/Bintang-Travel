import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
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
* @see \App\Http\Controllers\BookingController::show
 * @see app/Http/Controllers/BookingController.php:21
 * @route '/fleet/{car}'
 */
    const showForm = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\BookingController::show
 * @see app/Http/Controllers/BookingController.php:21
 * @route '/fleet/{car}'
 */
        showForm.get = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\BookingController::show
 * @see app/Http/Controllers/BookingController.php:21
 * @route '/fleet/{car}'
 */
        showForm.head = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
* @see \App\Http\Controllers\BookingController::book
 * @see app/Http/Controllers/BookingController.php:50
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
 * @see app/Http/Controllers/BookingController.php:50
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
 * @see app/Http/Controllers/BookingController.php:50
 * @route '/fleet/{car}'
 */
book.post = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: book.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\BookingController::book
 * @see app/Http/Controllers/BookingController.php:50
 * @route '/fleet/{car}'
 */
    const bookForm = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: book.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\BookingController::book
 * @see app/Http/Controllers/BookingController.php:50
 * @route '/fleet/{car}'
 */
        bookForm.post = (args: { car: number | { id: number } } | [car: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: book.url(args, options),
            method: 'post',
        })
    
    book.form = bookForm
const fleet = {
    show: Object.assign(show, show),
book: Object.assign(book, book),
}

export default fleet