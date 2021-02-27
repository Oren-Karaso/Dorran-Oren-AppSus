import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const KEEP_KEY = 'keeps';

export const keepService = {
    query,
    getById,
    createKeep,
    // addKeep,
    // saveKeep,
    removeKeep,
    updateKeep,
    searchKeep


}

function query() {
    return storageService.query(KEEP_KEY)
        .then(notes => {
            if (!notes.length) {
                notes = [{
                        id: utilService.makeId(),
                        type: "keepTxt",
                        isPinned: true,
                        info: {
                            txt: "Fullstack Me Baby!"
                        },
                        style: { backgroundColor: '#eeff00ea' }

                    },
                    {
                        id: utilService.makeId(),
                        type: "keepImg",
                        info: {
                            url: "https://memegenerator.net/img/instances/69508134/i-know-vuejs.jpg",
                            title: "Me playing Mi"
                        },
                        style: {
                            backgroundColor: "#00d"
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "keepTodos",
                        info: {
                            label: "How was it:",
                            todolist: [
                                { txt: "Do that", doneAt: null },
                                { txt: "Do this", doneAt: 187111111 }
                            ]
                        },
                        style: { backgroundColor: '#eeff00ea' }

                    }
                ]

                return storageService.postMany(KEEP_KEY, notes);
            }
            console.log(notes);
            return notes;
        })
}

function getById(id) {
    return storageService.get(KEEP_KEY, id);
}


// function saveReview(review, note) {
//     return storageService.query(KEEP_KEY)
//         .then(notes => { return notes })
//         .then(notes => {
//             let updatedBook = notes.find(item => item.id === note.id);
//             console.log('updatednote: ', updatedBook);
//             if (!updatedBook.reviews) {
//                 updatedBook.reviews = [];
//                 updatedBook.reviews.unshift(review);
//             } else {
//                 updatedBook.reviews.unshift(review);
//             }
//             console.log('review: ', review);
//             storageService.put(KEEP_KEY, updatedBook);
//         })
// }



function removeKeep(note) {
    // return storageService.query(KEEP_KEY)
    //     .then(notes => { return notes })
    //     .then(notes => {
    //         // let removedNote = notes.find(item => item.id === noteId);
    //         // notes.splice(idx, 1);
    //         storageService.remove(KEEP_KEY, noteId)
    //             .then(storageService.query(KEEP_KEY))
    //     })
    console.log('id:', note.id)

    return storageService.remove(KEEP_KEY, note.id);

}

function searchKeep(searchTerm, notes) {
    console.log('search notes notes:', notes)
    return notes.filter(note => {
        return ((note.info.title && note.info.title.toLowerCase().includes(searchTerm)) ||
            (note.info.txt && note.info.txt.toLowerCase().includes(searchTerm)))
    })
}


function createKeep(keepType, content) {
    var note = {
        id: utilService.makeId(),
        type: keepType,
        isPinned: false,
        style: { backgroundColor: '#eeff00ea' }
    }

    if (keepType === 'keepVideo' || keepType === 'keepImg') {
        note.info = {
            url: content,
            title: null,
        }

    }
    if (keepType === 'keepTodos') {
        note.info = {
            title: null,
            todolist: content

        }


    }
    if (keepType === 'keepTxt') {
        note.info = {
            title: null,
            txt: content
        }
    }
    storageService.post(KEEP_KEY, note);
    return note;
}

function updateKeep(note) {
    return storageService.put(KEEP_KEY, note);
}

// if note.type TODOS: note.info.todo ==>
//   todo: {
//     lable: null,
//     todos: [{
//         txt: null,
//         doneAt: new Date()
//     }]
// },
//   url: null,
// title: null,
// txt: null,