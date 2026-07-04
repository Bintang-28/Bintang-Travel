import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
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
const reports = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default reports