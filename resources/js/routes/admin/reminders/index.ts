import { queryParams, type RouteQueryOptions, type RouteDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::index
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:13
 * @route '/admin/reminders'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/admin/reminders',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::index
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:13
 * @route '/admin/reminders'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::index
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:13
 * @route '/admin/reminders'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::index
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:13
 * @route '/admin/reminders'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::create
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:24
 * @route '/admin/reminders/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/admin/reminders/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::create
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:24
 * @route '/admin/reminders/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::create
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:24
 * @route '/admin/reminders/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::create
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:24
 * @route '/admin/reminders/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::store
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:33
 * @route '/admin/reminders'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/admin/reminders',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::store
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:33
 * @route '/admin/reminders'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::store
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:33
 * @route '/admin/reminders'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::edit
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:48
 * @route '/admin/reminders/{reminder}/edit'
 */
export const edit = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/admin/reminders/{reminder}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::edit
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:48
 * @route '/admin/reminders/{reminder}/edit'
 */
edit.url = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reminder: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reminder: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reminder: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reminder: typeof args.reminder === 'object'
                ? args.reminder.id
                : args.reminder,
                }

    return edit.definition.url
            .replace('{reminder}', parsedArgs.reminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::edit
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:48
 * @route '/admin/reminders/{reminder}/edit'
 */
edit.get = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::edit
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:48
 * @route '/admin/reminders/{reminder}/edit'
 */
edit.head = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::update
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:58
 * @route '/admin/reminders/{reminder}'
 */
export const update = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/admin/reminders/{reminder}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::update
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:58
 * @route '/admin/reminders/{reminder}'
 */
update.url = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reminder: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reminder: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reminder: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reminder: typeof args.reminder === 'object'
                ? args.reminder.id
                : args.reminder,
                }

    return update.definition.url
            .replace('{reminder}', parsedArgs.reminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::update
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:58
 * @route '/admin/reminders/{reminder}'
 */
update.put = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::update
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:58
 * @route '/admin/reminders/{reminder}'
 */
update.patch = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::destroy
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:74
 * @route '/admin/reminders/{reminder}'
 */
export const destroy = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/admin/reminders/{reminder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::destroy
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:74
 * @route '/admin/reminders/{reminder}'
 */
destroy.url = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { reminder: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { reminder: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    reminder: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        reminder: typeof args.reminder === 'object'
                ? args.reminder.id
                : args.reminder,
                }

    return destroy.definition.url
            .replace('{reminder}', parsedArgs.reminder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Admin\VehicleReminderController::destroy
 * @see app/Http/Controllers/Admin/VehicleReminderController.php:74
 * @route '/admin/reminders/{reminder}'
 */
destroy.delete = (args: { reminder: number | { id: number } } | [reminder: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})
const reminders = {
    index: Object.assign(index, index),
create: Object.assign(create, create),
store: Object.assign(store, store),
edit: Object.assign(edit, edit),
update: Object.assign(update, update),
destroy: Object.assign(destroy, destroy),
}

export default reminders