import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../../../wayfinder'
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
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:60
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
 * @see app/Http/Controllers/Admin/MaintenanceController.php:60
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
 * @see app/Http/Controllers/Admin/MaintenanceController.php:60
 * @route '/admin/maintenance/{maintenance}/edit'
 */
edit.get = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::edit
 * @see app/Http/Controllers/Admin/MaintenanceController.php:60
 * @route '/admin/maintenance/{maintenance}/edit'
 */
edit.head = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:70
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
 * @see app/Http/Controllers/Admin/MaintenanceController.php:70
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
 * @see app/Http/Controllers/Admin/MaintenanceController.php:70
 * @route '/admin/maintenance/{maintenance}'
 */
update.put = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\MaintenanceController::update
 * @see app/Http/Controllers/Admin/MaintenanceController.php:70
 * @route '/admin/maintenance/{maintenance}'
 */
update.patch = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\MaintenanceController::destroy
 * @see app/Http/Controllers/Admin/MaintenanceController.php:111
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
 * @see app/Http/Controllers/Admin/MaintenanceController.php:111
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
 * @see app/Http/Controllers/Admin/MaintenanceController.php:111
 * @route '/admin/maintenance/{maintenance}'
 */
destroy.delete = (args: { maintenance: number | { id: number } } | [maintenance: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const MaintenanceController = { index, create, store, show, edit, update, destroy }

export default MaintenanceController