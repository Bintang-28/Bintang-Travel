import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\ReportsController::index
 * @see app/Http/Controllers/Admin/ReportsController.php:22
 * @route '/admin/reports'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reports',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportsController::index
 * @see app/Http/Controllers/Admin/ReportsController.php:22
 * @route '/admin/reports'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportsController::index
 * @see app/Http/Controllers/Admin/ReportsController.php:22
 * @route '/admin/reports'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReportsController::index
 * @see app/Http/Controllers/Admin/ReportsController.php:22
 * @route '/admin/reports'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReportsController::index
 * @see app/Http/Controllers/Admin/ReportsController.php:22
 * @route '/admin/reports'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportsController::index
 * @see app/Http/Controllers/Admin/ReportsController.php:22
 * @route '/admin/reports'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportsController::index
 * @see app/Http/Controllers/Admin/ReportsController.php:22
 * @route '/admin/reports'
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
* @see \App\Http\Controllers\Admin\ReportsController::create
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/reports/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportsController::create
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportsController::create
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReportsController::create
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReportsController::create
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportsController::create
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportsController::create
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/create'
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
* @see \App\Http\Controllers\Admin\ReportsController::store
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/reports',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\ReportsController::store
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportsController::store
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\ReportsController::store
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportsController::store
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\ReportsController::edit
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}/edit'
 */
export const edit = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/reports/{report}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\ReportsController::edit
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}/edit'
 */
edit.url = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        report: args.report,
                }

    return edit.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportsController::edit
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}/edit'
 */
edit.get = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\ReportsController::edit
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}/edit'
 */
edit.head = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\ReportsController::edit
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}/edit'
 */
    const editForm = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportsController::edit
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}/edit'
 */
        editForm.get = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportsController::edit
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}/edit'
 */
        editForm.head = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\Admin\ReportsController::update
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
export const update = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/reports/{report}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\ReportsController::update
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
update.url = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        report: args.report,
                }

    return update.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportsController::update
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
update.put = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\ReportsController::update
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
update.patch = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\ReportsController::update
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
    const updateForm = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportsController::update
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
        updateForm.put = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\ReportsController::update
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
        updateForm.patch = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\Admin\ReportsController::destroy
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
export const destroy = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/reports/{report}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\ReportsController::destroy
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
destroy.url = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { report: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    report: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        report: args.report,
                }

    return destroy.definition.url
            .replace('{report}', parsedArgs.report.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\ReportsController::destroy
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
destroy.delete = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\ReportsController::destroy
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
    const destroyForm = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\ReportsController::destroy
 * @see app/Http/Controllers/Admin/ReportsController.php:0
 * @route '/admin/reports/{report}'
 */
        destroyForm.delete = (args: { report: string | number } | [report: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const ReportsController = { index, create, store, edit, update, destroy }

export default ReportsController