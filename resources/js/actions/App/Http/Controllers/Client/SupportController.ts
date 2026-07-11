import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../../wayfinder'
/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/client/support',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Client\SupportController::index
 * @see app/Http/Controllers/Client/SupportController.php:12
 * @route '/client/support'
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
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/client/support/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Client\SupportController::create
 * @see app/Http/Controllers/Client/SupportController.php:26
 * @route '/client/support/create'
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
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/client/support',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::store
 * @see app/Http/Controllers/Client/SupportController.php:31
 * @route '/client/support'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
export const show = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/client/support/{id}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
show.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return show.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
show.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
show.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
    const showForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
        showForm.get = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Client\SupportController::show
 * @see app/Http/Controllers/Client/SupportController.php:17
 * @route '/client/support/{id}'
 */
        showForm.head = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
export const reply = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

reply.definition = {
    methods: ["post"],
    url: '/client/support/{id}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
reply.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return reply.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
reply.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: reply.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
    const replyForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: reply.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::reply
 * @see app/Http/Controllers/Client/SupportController.php:49
 * @route '/client/support/{id}/reply'
 */
        replyForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: reply.url(args, options),
            method: 'post',
        })
    
    reply.form = replyForm
/**
* @see \App\Http\Controllers\Client\SupportController::getActiveChat
 * @see app/Http/Controllers/Client/SupportController.php:59
 * @route '/client/support-chat/active'
 */
export const getActiveChat = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getActiveChat.url(options),
    method: 'get',
})

getActiveChat.definition = {
    methods: ["get","head"],
    url: '/client/support-chat/active',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\Client\SupportController::getActiveChat
 * @see app/Http/Controllers/Client/SupportController.php:59
 * @route '/client/support-chat/active'
 */
getActiveChat.url = (options?: RouteQueryOptions) => {
    return getActiveChat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::getActiveChat
 * @see app/Http/Controllers/Client/SupportController.php:59
 * @route '/client/support-chat/active'
 */
getActiveChat.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: getActiveChat.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\Client\SupportController::getActiveChat
 * @see app/Http/Controllers/Client/SupportController.php:59
 * @route '/client/support-chat/active'
 */
getActiveChat.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: getActiveChat.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::getActiveChat
 * @see app/Http/Controllers/Client/SupportController.php:59
 * @route '/client/support-chat/active'
 */
    const getActiveChatForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: getActiveChat.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::getActiveChat
 * @see app/Http/Controllers/Client/SupportController.php:59
 * @route '/client/support-chat/active'
 */
        getActiveChatForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getActiveChat.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\Client\SupportController::getActiveChat
 * @see app/Http/Controllers/Client/SupportController.php:59
 * @route '/client/support-chat/active'
 */
        getActiveChatForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: getActiveChat.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    getActiveChat.form = getActiveChatForm
/**
* @see \App\Http\Controllers\Client\SupportController::startChat
 * @see app/Http/Controllers/Client/SupportController.php:75
 * @route '/client/support-chat/create'
 */
export const startChat = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startChat.url(options),
    method: 'post',
})

startChat.definition = {
    methods: ["post"],
    url: '/client/support-chat/create',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\SupportController::startChat
 * @see app/Http/Controllers/Client/SupportController.php:75
 * @route '/client/support-chat/create'
 */
startChat.url = (options?: RouteQueryOptions) => {
    return startChat.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::startChat
 * @see app/Http/Controllers/Client/SupportController.php:75
 * @route '/client/support-chat/create'
 */
startChat.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: startChat.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::startChat
 * @see app/Http/Controllers/Client/SupportController.php:75
 * @route '/client/support-chat/create'
 */
    const startChatForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: startChat.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::startChat
 * @see app/Http/Controllers/Client/SupportController.php:75
 * @route '/client/support-chat/create'
 */
        startChatForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: startChat.url(options),
            method: 'post',
        })
    
    startChat.form = startChatForm
/**
* @see \App\Http\Controllers\Client\SupportController::replyJson
 * @see app/Http/Controllers/Client/SupportController.php:97
 * @route '/client/support-chat/{id}/reply'
 */
export const replyJson = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replyJson.url(args, options),
    method: 'post',
})

replyJson.definition = {
    methods: ["post"],
    url: '/client/support-chat/{id}/reply',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\Client\SupportController::replyJson
 * @see app/Http/Controllers/Client/SupportController.php:97
 * @route '/client/support-chat/{id}/reply'
 */
replyJson.url = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { id: args }
    }

    
    if (Array.isArray(args)) {
        args = {
                    id: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        id: args.id,
                }

    return replyJson.definition.url
            .replace('{id}', parsedArgs.id.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\Client\SupportController::replyJson
 * @see app/Http/Controllers/Client/SupportController.php:97
 * @route '/client/support-chat/{id}/reply'
 */
replyJson.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: replyJson.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\Client\SupportController::replyJson
 * @see app/Http/Controllers/Client/SupportController.php:97
 * @route '/client/support-chat/{id}/reply'
 */
    const replyJsonForm = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: replyJson.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\Client\SupportController::replyJson
 * @see app/Http/Controllers/Client/SupportController.php:97
 * @route '/client/support-chat/{id}/reply'
 */
        replyJsonForm.post = (args: { id: string | number } | [id: string | number ] | string | number, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: replyJson.url(args, options),
            method: 'post',
        })
    
    replyJson.form = replyJsonForm
const SupportController = { index, create, store, show, reply, getActiveChat, startChat, replyJson }

export default SupportController