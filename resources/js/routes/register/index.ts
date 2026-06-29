import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::store
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:32
 * @route '/register'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/register',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::store
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:32
 * @route '/register'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::store
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:32
 * @route '/register'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::store
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:32
 * @route '/register'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::store
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:32
 * @route '/register'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verify_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
export const verify_otp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify_otp.url(options),
    method: 'get',
})

verify_otp.definition = {
    methods: ["get","head"],
    url: '/register/verify-otp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verify_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
verify_otp.url = (options?: RouteQueryOptions) => {
    return verify_otp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verify_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
verify_otp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: verify_otp.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verify_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
verify_otp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: verify_otp.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verify_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
    const verify_otpForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: verify_otp.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verify_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
        verify_otpForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify_otp.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verify_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
        verify_otpForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: verify_otp.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    verify_otp.form = verify_otpForm
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resend_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
export const resend_otp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend_otp.url(options),
    method: 'post',
})

resend_otp.definition = {
    methods: ["post"],
    url: '/register/resend-otp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resend_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
resend_otp.url = (options?: RouteQueryOptions) => {
    return resend_otp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resend_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
resend_otp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resend_otp.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resend_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
    const resend_otpForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: resend_otp.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resend_otp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
        resend_otpForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: resend_otp.url(options),
            method: 'post',
        })
    
    resend_otp.form = resend_otpForm
const register = {
    store: Object.assign(store, store),
verify_otp: Object.assign(verify_otp, verify_otp),
resend_otp: Object.assign(resend_otp, resend_otp),
}

export default register