import { storageService } from '../../../services/async-storage.service.js';
import { utilService } from '../../../services/util.service.js';

const KEEP_KEY = 'keeps';

export const keepService = {
    query,
    getById,
    createKeep
    // saveKeep,
    // removeKeep

}

function query() {
    return storageService.query(KEEP_KEY)
        .then(notes => {
            if (!notes.length) {
                notes = [{
                        id: utilService.makeId(),
                        type: "NoteTxt",
                        isPinned: true,
                        info: {
                            txt: "Fullstack Me Baby!"
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "NoteImg",
                        info: {
                            url: "http://some-img/me",
                            title: "Me playing Mi"
                        },
                        style: {
                            backgroundColor: "#00d"
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "NoteTodos",
                        info: {
                            label: "How was it:",
                            todos: [
                                { txt: "Do that", doneAt: null },
                                { txt: "Do this", doneAt: 187111111 }
                            ]
                        }
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

// function removeReview(noteId, idx) {
//     return storageService.query(KEEP_KEY)
//         .then(notes => { return notes })
//         .then(notes => {
//             let updatedBook = notes.find(item => item.id === noteId);
//             updatedBook.reviews.splice(idx, 1);
//             storageService.put(KEEP_KEY, updatedBook);
//         })

// }

// function createKeeps() {
//     var notes = [];
//     for (let index = 0; index < 20; index++) {
//         var note = createBook();
//         notes.push(note);

//     }
//     return notes;
// }

function createKeep() {
    var note = {

    }
    return note;
}