import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\HomePagesController::index
 * @see app/Http/Controllers/HomePagesController.php:13
 * @route '/'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomePagesController::index
 * @see app/Http/Controllers/HomePagesController.php:13
 * @route '/'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomePagesController::index
 * @see app/Http/Controllers/HomePagesController.php:13
 * @route '/'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomePagesController::index
 * @see app/Http/Controllers/HomePagesController.php:13
 * @route '/'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomePagesController::index
 * @see app/Http/Controllers/HomePagesController.php:13
 * @route '/'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomePagesController::index
 * @see app/Http/Controllers/HomePagesController.php:13
 * @route '/'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomePagesController::index
 * @see app/Http/Controllers/HomePagesController.php:13
 * @route '/'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:39
 * @route '/fleet'
 */
export const fleet = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fleet.url(options),
    method: 'get',
})

fleet.definition = {
    methods: ["get","head"],
    url: '/fleet',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:39
 * @route '/fleet'
 */
fleet.url = (options?: RouteQueryOptions) => {
    return fleet.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:39
 * @route '/fleet'
 */
fleet.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fleet.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:39
 * @route '/fleet'
 */
fleet.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fleet.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:39
 * @route '/fleet'
 */
    const fleetForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fleet.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:39
 * @route '/fleet'
 */
        fleetForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fleet.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:39
 * @route '/fleet'
 */
        fleetForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fleet.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    fleet.form = fleetForm
/**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/about'
 */
export const about = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})

about.definition = {
    methods: ["get","head"],
    url: '/about',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/about'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/about'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/about'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/about'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/about'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/about'
 */
        aboutForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    about.form = aboutForm
const HomePagesController = { index, fleet, about }

export default HomePagesController