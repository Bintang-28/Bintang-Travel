import { queryParams, type RouteQueryOptions, type RouteDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::create
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:22
 * @route '/register'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/register',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::create
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:22
 * @route '/register'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::create
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:22
 * @route '/register'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::create
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:22
 * @route '/register'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

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
* @see \App\Http\Controllers\Auth\RegisteredUserController::showVerifyOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
export const showVerifyOtp = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showVerifyOtp.url(options),
    method: 'get',
})

showVerifyOtp.definition = {
    methods: ["get","head"],
    url: '/register/verify-otp',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::showVerifyOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
showVerifyOtp.url = (options?: RouteQueryOptions) => {
    return showVerifyOtp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::showVerifyOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
showVerifyOtp.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: showVerifyOtp.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::showVerifyOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:63
 * @route '/register/verify-otp'
 */
showVerifyOtp.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: showVerifyOtp.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verifyOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:80
 * @route '/register/verify-otp'
 */
export const verifyOtp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyOtp.url(options),
    method: 'post',
})

verifyOtp.definition = {
    methods: ["post"],
    url: '/register/verify-otp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verifyOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:80
 * @route '/register/verify-otp'
 */
verifyOtp.url = (options?: RouteQueryOptions) => {
    return verifyOtp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::verifyOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:80
 * @route '/register/verify-otp'
 */
verifyOtp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: verifyOtp.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resendOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
export const resendOtp = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendOtp.url(options),
    method: 'post',
})

resendOtp.definition = {
    methods: ["post"],
    url: '/register/resend-otp',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resendOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
resendOtp.url = (options?: RouteQueryOptions) => {
    return resendOtp.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\RegisteredUserController::resendOtp
 * @see app/Http/Controllers/Auth/RegisteredUserController.php:125
 * @route '/register/resend-otp'
 */
resendOtp.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: resendOtp.url(options),
    method: 'post',
})
const RegisteredUserController = { create, store, showVerifyOtp, verifyOtp, resendOtp }

export default RegisteredUserController