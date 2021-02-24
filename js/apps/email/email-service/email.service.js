import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'email10';
const gEmails = [
    {
        id: utilService.makeId(),
        status: {
            starred: false,
            isRead: false,
            timestamp: new Date()
        },
        folder: 'draft',
        content: {
            to: 'Ima',
            from: 'Aba',
            subject: 'I love you',
            msgBody: 'Can you please stop by the grocery store and bring some potatos?'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            starred: true,
            isRead: true,
            timestamp: new Date()
        },
        folder: 'sent',
        content: {
            to: 'Aba',
            from: 'Ima',
            subject: 'The dog',
            msgBody: 'I will bring the potatos, can you take the dog for a walk?'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            starred: true,
            isRead: false,
            timestamp: new Date()
        },
        folder: 'inbox',
        content: {
            to: 'Saba',
            from: 'Savta',
            subject: 'I am no technophob',
            msgBody: 'Aren\'t you impressed by me sending emails like a pro?'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            starred: false,
            isRead: true,
            timestamp: new Date()
        },
        folder: 'trash',
        content: {
            to: 'Savta',
            from: 'Saba',
            subject: 'I am impressed indeed',
            msgBody: 'Now the only thing left for you is to learn using ZOOM!'
        }
    }
]
console.log('gEmails hardcoded data:', gEmails);

export const emailService = {
    query,
    getById,
    saveEmail,
    getEmptyEmail,
    removeEmail,
    getEmailToEdit
}

function query() {
    return storageService.query(EMAIL_KEY)
        .then(emails => {
            if (!emails.length) {
                emails = storageService.postMany(EMAIL_KEY, gEmails);
            }
            return emails;
        });
}

function saveEmail(email) {
    if (email.id) return storageService.put(EMAIL_KEY, email);
    else return storageService.post(EMAIL_KEY, email);
}

function getById(id) {
    return storageService.get(EMAIL_KEY, id);
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        status: {
            starred: false,
            isRead: false,
            timestamp: new Date()
        },
        folder: 'draft',
        content: {
            to: '',
            from: '',
            subject: '',
            msgBody: ''
        }
    }
}

function removeEmail(emailId) {
    return storageService.remove(EMAIL_KEY, emailId);
}

function getEmailToEdit() {
    return storageService.query(EMAIL_KEY)
        .then(books => books.find(book => book.folder === 'draft'))
}



