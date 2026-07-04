import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ReservationsController::index
 * @see app/Http/Controllers/Admin/ReservationsController.php:23
 * @route '/admin/reservations'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reservations',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReservationsController::index
 * @see app/Http/Controllers/Admin/ReservationsController.php:23
 * @route '/admin/reservations'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReservationsController::index
 * @see app/Http/Controllers/Admin/ReservationsController.php:23
 * @route '/admin/reservations'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReservationsController::index
 * @see app/Http/Controllers/Admin/ReservationsController.php:23
 * @route '/admin/reservations'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReservationsController::show
 * @see app/Http/Controllers/Admin/ReservationsController.php:81
 * @route '/admin/reservations/{reservation}'
 */
export const show = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/reservations/{reservation}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReservationsController::show
 * @see app/Http/Controllers/Admin/ReservationsController.php:81
 * @route '/admin/reservations/{reservation}'
 */
show.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReservationsController::show
 * @see app/Http/Controllers/Admin/ReservationsController.php:81
 * @route '/admin/reservations/{reservation}'
 */
show.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReservationsController::show
 * @see app/Http/Controllers/Admin/ReservationsController.php:81
 * @route '/admin/reservations/{reservation}'
 */
show.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReservationsController::edit
 * @see app/Http/Controllers/Admin/ReservationsController.php:92
 * @route '/admin/reservations/{reservation}/edit'
 */
export const edit = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/reservations/{reservation}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReservationsController::edit
 * @see app/Http/Controllers/Admin/ReservationsController.php:92
 * @route '/admin/reservations/{reservation}/edit'
 */
edit.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReservationsController::edit
 * @see app/Http/Controllers/Admin/ReservationsController.php:92
 * @route '/admin/reservations/{reservation}/edit'
 */
edit.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReservationsController::edit
 * @see app/Http/Controllers/Admin/ReservationsController.php:92
 * @route '/admin/reservations/{reservation}/edit'
 */
edit.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReservationsController::update
 * @see app/Http/Controllers/Admin/ReservationsController.php:109
 * @route '/admin/reservations/{reservation}'
 */
export const update = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/reservations/{reservation}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ReservationsController::update
 * @see app/Http/Controllers/Admin/ReservationsController.php:109
 * @route '/admin/reservations/{reservation}'
 */
update.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReservationsController::update
 * @see app/Http/Controllers/Admin/ReservationsController.php:109
 * @route '/admin/reservations/{reservation}'
 */
update.put = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ReservationsController::update
 * @see app/Http/Controllers/Admin/ReservationsController.php:109
 * @route '/admin/reservations/{reservation}'
 */
update.patch = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\ReservationsController::print
 * @see app/Http/Controllers/Admin/ReservationsController.php:281
 * @route '/admin/reservations/{reservation}/print'
 */
export const print = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})

print.definition = {
    methods: ["get","head"],
    url: '/admin/reservations/{reservation}/print',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReservationsController::print
 * @see app/Http/Controllers/Admin/ReservationsController.php:281
 * @route '/admin/reservations/{reservation}/print'
 */
print.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return print.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReservationsController::print
 * @see app/Http/Controllers/Admin/ReservationsController.php:281
 * @route '/admin/reservations/{reservation}/print'
 */
print.get = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: print.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReservationsController::print
 * @see app/Http/Controllers/Admin/ReservationsController.php:281
 * @route '/admin/reservations/{reservation}/print'
 */
print.head = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: print.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\ReservationsController::destroy
 * @see app/Http/Controllers/Admin/ReservationsController.php:295
 * @route '/admin/reservations/{reservation}'
 */
export const destroy = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/reservations/{reservation}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ReservationsController::destroy
 * @see app/Http/Controllers/Admin/ReservationsController.php:295
 * @route '/admin/reservations/{reservation}'
 */
destroy.url = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{reservation}', parsedArgs.reservation.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReservationsController::destroy
 * @see app/Http/Controllers/Admin/ReservationsController.php:295
 * @route '/admin/reservations/{reservation}'
 */
destroy.delete = (args: { reservation: number | { id: number } } | [reservation: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const ReservationsController = { index, show, edit, update, print, destroy }

export default ReservationsController