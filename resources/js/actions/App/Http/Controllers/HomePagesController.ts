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
 * @see app/Http/Controllers/HomePagesController.php:34
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
 * @see app/Http/Controllers/HomePagesController.php:34
 * @route '/fleet'
 */
fleet.url = (options?: RouteQueryOptions) => {
    return fleet.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:34
 * @route '/fleet'
 */
fleet.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: fleet.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:34
 * @route '/fleet'
 */
fleet.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: fleet.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:34
 * @route '/fleet'
 */
    const fleetForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: fleet.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:34
 * @route '/fleet'
 */
        fleetForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: fleet.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomePagesController::fleet
 * @see app/Http/Controllers/HomePagesController.php:34
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
 * @see app/Http/Controllers/HomePagesController.php:90
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
 * @see app/Http/Controllers/HomePagesController.php:90
 * @route '/about'
 */
about.url = (options?: RouteQueryOptions) => {
    return about.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:90
 * @route '/about'
 */
about.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: about.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:90
 * @route '/about'
 */
about.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: about.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:90
 * @route '/about'
 */
    const aboutForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: about.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:90
 * @route '/about'
 */
        aboutForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: about.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomePagesController::about
 * @see app/Http/Controllers/HomePagesController.php:90
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
/**
* @see \App\Http\Controllers\HomePagesController::contact
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/contact'
 */
export const contact = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})

contact.definition = {
    methods: ["get","head"],
    url: '/contact',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\HomePagesController::contact
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/contact'
 */
contact.url = (options?: RouteQueryOptions) => {
    return contact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomePagesController::contact
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/contact'
 */
contact.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: contact.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\HomePagesController::contact
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/contact'
 */
contact.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: contact.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\HomePagesController::contact
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/contact'
 */
    const contactForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: contact.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\HomePagesController::contact
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/contact'
 */
        contactForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\HomePagesController::contact
 * @see app/Http/Controllers/HomePagesController.php:95
 * @route '/contact'
 */
        contactForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: contact.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    contact.form = contactForm
/**
* @see \App\Http\Controllers\HomePagesController::guestContact
 * @see app/Http/Controllers/HomePagesController.php:100
 * @route '/contact/guestContact'
 */
export const guestContact = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guestContact.url(options),
    method: 'post',
})

guestContact.definition = {
    methods: ["post"],
    url: '/contact/guestContact',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\HomePagesController::guestContact
 * @see app/Http/Controllers/HomePagesController.php:100
 * @route '/contact/guestContact'
 */
guestContact.url = (options?: RouteQueryOptions) => {
    return guestContact.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\HomePagesController::guestContact
 * @see app/Http/Controllers/HomePagesController.php:100
 * @route '/contact/guestContact'
 */
guestContact.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: guestContact.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\HomePagesController::guestContact
 * @see app/Http/Controllers/HomePagesController.php:100
 * @route '/contact/guestContact'
 */
    const guestContactForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: guestContact.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\HomePagesController::guestContact
 * @see app/Http/Controllers/HomePagesController.php:100
 * @route '/contact/guestContact'
 */
        guestContactForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: guestContact.url(options),
            method: 'post',
        })
    
    guestContact.form = guestContactForm
const HomePagesController = { index, fleet, about, contact, guestContact }

export default HomePagesController