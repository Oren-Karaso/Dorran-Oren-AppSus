import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'email10';
const gEmails = [
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: false,
            timestamp: new Date()
        },
        folder: 'inbox',
        content: {
            to: 'Ima',
            from: 'Aba',
            cc: null,
            bss: null,
            subject: 'I love you',
            msgBody: 'Can you please stop by the grocery store and bring some potatos?'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: true,
            isRead: true,
            timestamp: new Date()
        },
        folder: 'sent',
        content: {
            to: 'Aba',
            from: 'Ima',
            cc: null,
            bss: null,
            subject: 'The dog',
            msgBody: 'I will bring the potatos, can you take the dog for a walk?'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: true,
            isRead: false,
            timestamp: new Date()
        },
        folder: 'trash',
        content: {
            to: 'Saba',
            from: 'Savta',
            cc: null,
            bss: null,
            subject: 'I am no technophob',
            msgBody: 'Aren\'t you impressed by me sending emails like a pro?'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: true,
            timestamp: new Date()
        },
        folder: 'sent',
        content: {
            to: 'Savta',
            from: 'Saba',
            cc: null,
            bss: null,
            subject: 'I am impressed indeed',
            msgBody: 'Now the only thing left for you is to learn using ZOOM!'
        }
    }
]
// console.log('gEmails hardcoded data:', gEmails);

export const emailService = {
    query,
    getById,
    sendEmail,
    getEmptyEmail,
    removeEmail,
    getEmailsByFolder,
    searchByContent,
    filterBykey,
    updateStatus
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

function sendEmail(email) {
    return storageService.post(EMAIL_KEY, email);
}

function updateStatus(email) {
    return storageService.put(EMAIL_KEY, email);
}

function getById(id) {
    return storageService.get(EMAIL_KEY, id);
}

function getEmptyEmail() {
    return {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: false,
            timestamp: new Date()
        },
        folder: 'draft',
        content: {
            to: '',
            from: '',
            cc: null,
            bss: null,
            subject: '',
            msgBody: ''
        }
    }
}

function removeEmail(emailId) {
    return storageService.remove(EMAIL_KEY, emailId);
}

function getEmailsByFolder(folder) {
    return storageService.query(EMAIL_KEY)
        .then(emails => emails.find(email => email.folder === folder))
}

function searchByContent(emails, searchStr) {
    return emails.filter(email => {
        return (
            email.content.msgBody.toLowerCase().includes(searchStr) ||
            email.content.from.toLowerCase().includes(searchStr) ||
            email.content.subject.toLowerCase().includes(searchStr) ||
            email.content.to.toLowerCase().includes(searchStr));
    });
}

function filterBykey(emails, key) {
    if (typeof key === 'boolean') {
        return emails.filter(email => {
            return (email.status.isRead === key);
        });
    }

    switch (key) {

        case 'inbox': return emails.filter(email => {
            return (email.folder === 'inbox' || email.folder === 'sent');
        });
        case 'sent': return emails.filter(email => {
            return (email.folder === 'sent' || email.folder === 'inbox');
        });
        case 'drafts': return emails.filter(email => {
            return (email.folder === 'drafts');
        });
        case 'trash': return emails.filter(email => {
            return (email.folder === 'trash');
        });
    }
}



