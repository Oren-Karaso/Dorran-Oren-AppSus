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
                        style: { backgroundColor: '#ecb390' }

                    },
                    {
                        id: utilService.makeId(),
                        type: "keepVideo",
                        info: {
                            url: "https://www.youtube.com/embed/VugasBUoBdI",
                            title: "Dynamic Components"
                        },
                        style: {
                            backgroundColor: "#f7dad9"
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "keepTodos",
                        info: {
                            title: "How was it:",
                            todolist: [
                                { txt: "Do that", doneAt: null },
                                { txt: "Do this", doneAt: 187111111 }
                            ]
                        },
                        style: { backgroundColor: '#df7861' }

                    },
                    {
                        id: utilService.makeId(),
                        type: "keepImg",
                        info: {
                            url: "https://img.freepik.com/free-vector/character-illustration-people-with-creative-ideas-icons_53876-59888.jpg?size=626&ext=jpg",
                            title: "REMEMBER TO VECTOR"
                        },
                        style: {
                            backgroundColor: "#d4e2d4"
                        }
                    }, {
                        id: utilService.makeId(),
                        type: "keepTodos",
                        info: {
                            title: "Groceries",
                            todolist: [
                                { txt: "🍅 x 6", doneAt: null },
                                { txt: "🥒 x 4", doneAt: null },
                                { txt: "🥑 x 2", doneAt: null },
                                { txt: "🍞 WHITE BREAD", doneAt: null },
                                { txt: "🥚", doneAt: null },
                                { txt: "🧅 x 1kg", doneAt: null },
                                { txt: "🥕 x 5", doneAt: null },
                                { txt: "🍏 x 4", doneAt: null },
                            ]
                        },
                        style: { backgroundColor: '#c663ff' },

                    },

                    {
                        id: utilService.makeId(),
                        type: "keepTxt",
                        isPinned: true,
                        info: {
                            title: 'This is all i know:',
                            txt: "I know about individuals and their slippery conscience."
                        },
                        style: { backgroundColor: '#fcf8e8' }

                    },
                    {
                        id: utilService.makeId(),
                        type: "keepVideo",
                        info: {
                            url: "https://www.youtube.com/embed/qvUWA45GOMg",
                            title: "C H I L L"
                        },
                        style: {
                            backgroundColor: "#b3b8ff"
                        }
                    },
                    {
                        id: utilService.makeId(),
                        type: "keepTodos",
                        info: {
                            title: "To Do TODAY!",
                            todolist: [
                                { txt: "Clean Room", doneAt: null },
                                { txt: "JS Assignment", doneAt: null },
                                { txt: "Read", doneAt: null },
                                { txt: "Laundry", doneAt: 187111111 },
                                { txt: "Feed Mico", doneAt: null },
                            ]
                        },
                        style: { backgroundColor: '#ffa7d2' }

                    },
                    { id: "oTvnX", type: "keepTxt", isPinned: false, style: { backgroundColor: "#c4ceed" }, info: { title: null, txt: "LETS DO TISH!" } }, { id: "P72HT", type: "keepTxt", isPinned: false, style: { backgroundColor: "#80ffbd" }, info: { title: null, txt: "YO!" } }, { id: "fhb2S", type: "keepTxt", isPinned: false, style: { backgroundColor: "#ffa18c" }, info: { title: null, txt: "HEY!" } }, { id: "iQMzN", type: "keepTxt", isPinned: false, style: { backgroundColor: "#ff7a7a" }, info: { title: "I wanna", txt: "Heyyyyy, sup?" } }, { id: "JBm7Z", type: "keepTxt", isPinned: true, info: { txt: "Fullstack Me Baby!", title: "SCHOOL IS COOL:" }, style: { backgroundColor: "#c799ff" } }, { id: "LEinV", type: "keepImg", info: { url: "https://memegenerator.net/img/instances/69508134/i-know-vuejs.jpg", title: "Me playing Mi" }, style: { backgroundColor: "#94c8ff" } }, { id: "qMvTa", type: "keepTodos", info: { title: "How was it:", todolist: [{ txt: "Do that", doneAt: null }, { txt: "Do this", doneAt: 187111111 }] }, style: { backgroundColor: "#7d7aff" } }
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
        style: { backgroundColor: '#f7f7e8' }
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