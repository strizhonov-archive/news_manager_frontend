import {
    backendAuthorsPath,
    backendNewsPath,
    backendNewsSearchPath,
    backendTagsPath,
    jsonHeaders, newsPath
} from "./consts";

export const loadAuthors = () => {
    return fetch(backendAuthorsPath).then(r => {
        return r.json()
    });
};

export const loadAuthor = (id) => {
    return fetch(backendAuthorsPath + id).then(r => {
        return r.json()
    });
};

export const deleteAuthor = (id) => {
    return fetch(backendAuthorsPath + id, {
        method: 'DELETE',
        headers: jsonHeaders
    });
};

export const updateAuthor = (authorToUpdate) => {
    return fetch(backendAuthorsPath, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify({
            id: authorToUpdate.id,
            name: authorToUpdate.name,
            surname: authorToUpdate.surname
        })
    })
};

export const saveAuthor = (authorToSave) => {
    return fetch(backendAuthorsPath, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({
            id: authorToSave.id,
            name: authorToSave.name,
            surname: authorToSave.surname
        })
    })
};

export const deleteTag = (id) => {
    return fetch(backendTagsPath + id, {
        method: 'DELETE',
        headers: jsonHeaders
    })
};

export const updateTag = (tagToUpdate) => {
    return fetch(backendTagsPath, {
        method: 'PUT',
        headers: jsonHeaders,
        body: JSON.stringify({
            id: tagToUpdate.id,
            name: tagToUpdate.name
        })
    })
};

export const saveTag = (tagToSave) => {
    return fetch(backendTagsPath, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify({
            id: tagToSave.id,
            name: tagToSave.name
        })
    })
};

export const loadTags = () => {
    return fetch(backendTagsPath).then(r => {
        return r.json()
    });
};

export const saveNewsItem = (newsCreationBody) => {
    return fetch(backendNewsPath, {
        method: 'POST',
        headers: jsonHeaders,
        body: newsCreationBody
    })
};

export const findNewsItem = async (id) => {
    return fetch(backendNewsPath + id).then(r => {
        return r.json();
    })
};

export const updateNewsItem = (newsItemToUpdate) => {
    return fetch(backendNewsPath, {
        method: 'PUT',
        headers: jsonHeaders,
        body: newsItemToUpdate
    })
};

export const deleteNewsItem = (id) => {
    return fetch(backendNewsPath + id, {
        method: 'DELETE',
        headers: jsonHeaders
    })
};

export const searchNews = (searchBody) => {
    return fetch(backendNewsSearchPath, {
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(searchBody)
    }).then(r => {
        return r.json();
    })
};

export const loadNewsItem = (id) => {
    return fetch(backendNewsPath + id).then(r => {
        return r.json()
    });
};

export const loadNews = () => {
    return fetch(backendNewsPath).then(r => {
        return r.json()
    });
};