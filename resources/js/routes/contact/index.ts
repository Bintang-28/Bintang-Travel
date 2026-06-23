import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
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
const contact = {
    guestContact: Object.assign(guestContact, guestContact),
}

export default contact