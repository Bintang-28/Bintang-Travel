import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
 * @route '/login'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/login',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
 * @route '/login'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
 * @route '/login'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
 * @route '/login'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
 * @route '/login'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
 * @route '/login'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::create
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:21
 * @route '/login'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:32
 * @route '/login'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/login',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:32
 * @route '/login'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:32
 * @route '/login'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:32
 * @route '/login'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::store
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:32
 * @route '/login'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:57
 * @route '/logout'
 */
export const destroy = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

destroy.definition = {
    methods: ["post"],
    url: '/logout',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:57
 * @route '/logout'
 */
destroy.url = (options?: RouteQueryOptions) => {
    return destroy.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:57
 * @route '/logout'
 */
destroy.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: destroy.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:57
 * @route '/logout'
 */
    const destroyForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::destroy
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:57
 * @route '/logout'
 */
        destroyForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(options),
            method: 'post',
        })
    
    destroy.form = destroyForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::adminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
export const adminLogin = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminLogin.url(options),
    method: 'get',
})

adminLogin.definition = {
    methods: ["get","head"],
    url: '/admin-secret-url',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::adminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
adminLogin.url = (options?: RouteQueryOptions) => {
    return adminLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::adminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
adminLogin.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: adminLogin.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::adminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
adminLogin.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: adminLogin.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::adminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
    const adminLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: adminLogin.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::adminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
        adminLoginForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminLogin.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::adminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
        adminLoginForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: adminLogin.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    adminLogin.form = adminLoginForm
/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::storeAdminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
export const storeAdminLogin = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAdminLogin.url(options),
    method: 'post',
})

storeAdminLogin.definition = {
    methods: ["post"],
    url: '/admin-secret-url',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::storeAdminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
storeAdminLogin.url = (options?: RouteQueryOptions) => {
    return storeAdminLogin.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::storeAdminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
storeAdminLogin.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: storeAdminLogin.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::storeAdminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
    const storeAdminLoginForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: storeAdminLogin.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Auth\AuthenticatedSessionController::storeAdminLogin
 * @see app/Http/Controllers/Auth/AuthenticatedSessionController.php:0
 * @route '/admin-secret-url'
 */
        storeAdminLoginForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: storeAdminLogin.url(options),
            method: 'post',
        })
    
    storeAdminLogin.form = storeAdminLoginForm
const AuthenticatedSessionController = { create, store, destroy, adminLogin, storeAdminLogin }

export default AuthenticatedSessionController