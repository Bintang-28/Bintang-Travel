import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../wayfinder'
/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::upload
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:21
 * @route '/filepond/upload'
 */
export const upload = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

upload.definition = {
    methods: ["post"],
    url: '/filepond/upload',
} satisfies RouteDefinition<["post"]>

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::upload
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:21
 * @route '/filepond/upload'
 */
upload.url = (options?: RouteQueryOptions) => {
    return upload.definition.url + queryParams(options)
}

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::upload
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:21
 * @route '/filepond/upload'
 */
upload.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: upload.url(options),
    method: 'post',
})

    /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::upload
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:21
 * @route '/filepond/upload'
 */
    const uploadForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: upload.url(options),
        method: 'post',
    })

            /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::upload
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:21
 * @route '/filepond/upload'
 */
        uploadForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: upload.url(options),
            method: 'post',
        })
    
    upload.form = uploadForm
/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::patch
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:42
 * @route '/filepond/patch'
 */
export const patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(options),
    method: 'patch',
})

patch.definition = {
    methods: ["patch"],
    url: '/filepond/patch',
} satisfies RouteDefinition<["patch"]>

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::patch
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:42
 * @route '/filepond/patch'
 */
patch.url = (options?: RouteQueryOptions) => {
    return patch.definition.url + queryParams(options)
}

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::patch
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:42
 * @route '/filepond/patch'
 */
patch.patch = (options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: patch.url(options),
    method: 'patch',
})

    /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::patch
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:42
 * @route '/filepond/patch'
 */
    const patchForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: patch.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PATCH',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::patch
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:42
 * @route '/filepond/patch'
 */
        patchForm.patch = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: patch.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    patch.form = patchForm
/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::restore
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:51
 * @route '/filepond/restore'
 */
export const restore = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: restore.url(options),
    method: 'head',
})

restore.definition = {
    methods: ["head","get"],
    url: '/filepond/restore',
} satisfies RouteDefinition<["head","get"]>

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::restore
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:51
 * @route '/filepond/restore'
 */
restore.url = (options?: RouteQueryOptions) => {
    return restore.definition.url + queryParams(options)
}

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::restore
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:51
 * @route '/filepond/restore'
 */
restore.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: restore.url(options),
    method: 'head',
})
/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::restore
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:51
 * @route '/filepond/restore'
 */
restore.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: restore.url(options),
    method: 'get',
})

    /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::restore
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:51
 * @route '/filepond/restore'
 */
    const restoreForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: restore.url({
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'HEAD',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'get',
    })

            /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::restore
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:51
 * @route '/filepond/restore'
 */
        restoreForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restore.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
            /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::restore
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:51
 * @route '/filepond/restore'
 */
        restoreForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: restore.url(options),
            method: 'get',
        })
    
    restore.form = restoreForm
/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::revert
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:69
 * @route '/filepond/revert/{folder}'
 */
export const revert = (args: { folder: string | number } | [folder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revert.url(args, options),
    method: 'delete',
})

revert.definition = {
    methods: ["delete"],
    url: '/filepond/revert/{folder}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::revert
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:69
 * @route '/filepond/revert/{folder}'
 */
revert.url = (args: { folder: string | number } | [folder: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { folder: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    folder: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        folder: args.folder,
                }

    return revert.definition.url
            .replace('{folder}', parsedArgs.folder.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::revert
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:69
 * @route '/filepond/revert/{folder}'
 */
revert.delete = (args: { folder: string | number } | [folder: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: revert.url(args, options),
    method: 'delete',
})

    /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::revert
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:69
 * @route '/filepond/revert/{folder}'
 */
    const revertForm = (args: { folder: string | number } | [folder: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: revert.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::revert
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:69
 * @route '/filepond/revert/{folder}'
 */
        revertForm.delete = (args: { folder: string | number } | [folder: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: revert.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    revert.form = revertForm
/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::load
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:0
 * @route '/filepond/load/{fileId}'
 */
export const load = (args: { fileId: string | number } | [fileId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: load.url(args, options),
    method: 'get',
})

load.definition = {
    methods: ["get","head"],
    url: '/filepond/load/{fileId}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::load
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:0
 * @route '/filepond/load/{fileId}'
 */
load.url = (args: { fileId: string | number } | [fileId: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { fileId: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    fileId: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        fileId: args.fileId,
                }

    return load.definition.url
            .replace('{fileId}', parsedArgs.fileId.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::load
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:0
 * @route '/filepond/load/{fileId}'
 */
load.get = (args: { fileId: string | number } | [fileId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: load.url(args, options),
    method: 'get',
})
/**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::load
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:0
 * @route '/filepond/load/{fileId}'
 */
load.head = (args: { fileId: string | number } | [fileId: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: load.url(args, options),
    method: 'head',
})

    /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::load
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:0
 * @route '/filepond/load/{fileId}'
 */
    const loadForm = (args: { fileId: string | number } | [fileId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: load.url(args, options),
        method: 'get',
    })

            /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::load
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:0
 * @route '/filepond/load/{fileId}'
 */
        loadForm.get = (args: { fileId: string | number } | [fileId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: load.url(args, options),
            method: 'get',
        })
            /**
* @see \MohamedGaldi\ViltFilepond\Http\Controllers\FilePondController::load
 * @see vendor/mohamedgaldi/vilt-filepond/src/Http/Controllers/FilePondController.php:0
 * @route '/filepond/load/{fileId}'
 */
        loadForm.head = (args: { fileId: string | number } | [fileId: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: load.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    load.form = loadForm
const filepond = {
    upload: Object.assign(upload, upload),
patch: Object.assign(patch, patch),
restore: Object.assign(restore, restore),
revert: Object.assign(revert, revert),
load: Object.assign(load, load),
}

export default filepond