import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::index
 * @see app/Http/Controllers/Admin/MaintenanceController.php:14
 * @route '/admin/maintenance'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/maintenance',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::index
 * @see app/Http/Controllers/Admin/MaintenanceController.php:14
 * @route '/admin/maintenance'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::index
 * @see app/Http/Controllers/Admin/MaintenanceController.php:14
 * @route '/admin/maintenance'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::index
 * @see app/Http/Controllers/Admin/MaintenanceController.php:14
 * @route '/admin/maintenance'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MaintenanceController::index
 * @see app/Http/Controllers/Admin/MaintenanceController.php:14
 * @route '/admin/maintenance'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::index
 * @see app/Http/Controllers/Admin/MaintenanceController.php:14
 * @route '/admin/maintenance'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::index
 * @see app/Http/Controllers/Admin/MaintenanceController.php:14
 * @route '/admin/maintenance'
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
* @see \App\Http\Controllers\Admin\MaintenanceController::create
 * @see app/Http/Controllers/Admin/MaintenanceController.php:25
 * @route '/admin/maintenance/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/maintenance/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::create
 * @see app/Http/Controllers/Admin/MaintenanceController.php:25
 * @route '/admin/maintenance/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::create
 * @see app/Http/Controllers/Admin/MaintenanceController.php:25
 * @route '/admin/maintenance/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::create
 * @see app/Http/Controllers/Admin/MaintenanceController.php:25
 * @route '/admin/maintenance/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MaintenanceController::create
 * @see app/Http/Controllers/Admin/MaintenanceController.php:25
 * @route '/admin/maintenance/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::create
 * @see app/Http/Controllers/Admin/MaintenanceController.php:25
 * @route '/admin/maintenance/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::create
 * @see app/Http/Controllers/Admin/MaintenanceController.php:25
 * @route '/admin/maintenance/create'
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
* @see \App\Http\Controllers\Admin\MaintenanceController::store
 * @see app/Http/Controllers/Admin/MaintenanceController.php:34
 * @route '/admin/maintenance'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/maintenance',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::store
 * @see app/Http/Controllers/Admin/MaintenanceController.php:34
 * @route '/admin/maintenance'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::store
 * @see app/Http/Controllers/Admin/MaintenanceController.php:34
 * @route '/admin/maintenance'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Admin\MaintenanceController::store
 * @see app/Http/Controllers/Admin/MaintenanceController.php:34
 * @route '/admin/maintenance'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::store
 * @see app/Http/Controllers/Admin/MaintenanceController.php:34
 * @route '/admin/maintenance'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::show
 * @see app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/maintenance/{maintenance}'
 */
export const show = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/admin/maintenance/{maintenance}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::show
 * @see app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/maintenance/{maintenance}'
 */
show.url = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: args.maintenance,
                }

    return show.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::show
 * @see app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/maintenance/{maintenance}'
 */
show.get = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::show
 * @see app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/maintenance/{maintenance}'
 */
show.head = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MaintenanceController::show
 * @see app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/maintenance/{maintenance}'
 */
    const showForm = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::show
 * @see app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/maintenance/{maintenance}'
 */
        showForm.get = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::show
 * @see app/Http/Controllers/Admin/MaintenanceController.php:0
 * @route '/admin/maintenance/{maintenance}'
 */
        showForm.head = (args: { maintenance: string | number } | [maintenance: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:61
 * @route '/admin/maintenance/{maintenance}/edit'
 */
export const edit = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/maintenance/{maintenance}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:61
 * @route '/admin/maintenance/{maintenance}/edit'
 */
edit.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { maintenance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: typeof args.maintenance === 'object'
                ? args.maintenance.id
                : args.maintenance,
                }

    return edit.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:61
 * @route '/admin/maintenance/{maintenance}/edit'
 */
edit.get = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:61
 * @route '/admin/maintenance/{maintenance}/edit'
 */
edit.head = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:61
 * @route '/admin/maintenance/{maintenance}/edit'
 */
    const editForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:61
 * @route '/admin/maintenance/{maintenance}/edit'
 */
        editForm.get = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:61
 * @route '/admin/maintenance/{maintenance}/edit'
 */
        editForm.head = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:71
 * @route '/admin/maintenance/{maintenance}'
 */
export const update = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/maintenance/{maintenance}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:71
 * @route '/admin/maintenance/{maintenance}'
 */
update.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { maintenance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: typeof args.maintenance === 'object'
                ? args.maintenance.id
                : args.maintenance,
                }

    return update.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:71
 * @route '/admin/maintenance/{maintenance}'
 */
update.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:71
 * @route '/admin/maintenance/{maintenance}'
 */
update.patch = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:71
 * @route '/admin/maintenance/{maintenance}'
 */
    const updateForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:71
 * @route '/admin/maintenance/{maintenance}'
 */
        updateForm.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:71
 * @route '/admin/maintenance/{maintenance}'
 */
        updateForm.patch = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\Admin\MaintenanceController::destroy
 * @see app/Http/Controllers/Admin/MaintenanceController.php:116
 * @route '/admin/maintenance/{maintenance}'
 */
export const destroy = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/maintenance/{maintenance}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::destroy
 * @see app/Http/Controllers/Admin/MaintenanceController.php:116
 * @route '/admin/maintenance/{maintenance}'
 */
destroy.url = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { maintenance: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { maintenance: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    maintenance: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        maintenance: typeof args.maintenance === 'object'
                ? args.maintenance.id
                : args.maintenance,
                }

    return destroy.definition.url
            .replace('{maintenance}', parsedArgs.maintenance.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::destroy
 * @see app/Http/Controllers/Admin/MaintenanceController.php:116
 * @route '/admin/maintenance/{maintenance}'
 */
destroy.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\Admin\MaintenanceController::destroy
 * @see app/Http/Controllers/Admin/MaintenanceController.php:116
 * @route '/admin/maintenance/{maintenance}'
 */
    const destroyForm = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Admin\MaintenanceController::destroy
 * @see app/Http/Controllers/Admin/MaintenanceController.php:116
 * @route '/admin/maintenance/{maintenance}'
 */
        destroyForm.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const maintenance = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
show: Object.assign(show, show),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default maintenance