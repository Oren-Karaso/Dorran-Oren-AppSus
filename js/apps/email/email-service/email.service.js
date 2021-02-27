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
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: true,
            timestamp: new Date()
        },
        folder: 'inbox',
        content: {
            to: 'Me',
            from: 'U.S. Bank',
            cc: null,
            bss: null,
            subject: 'Tips on tackling debt and boosting your credit score',
            msgBody: 'If you enjoyed this newsletter, you can now subscribe to future Financial IQ emails. Financial IQ offers wisdom through inspirational, educational and thought leadership resources. Choose what you’d like to receive¹ – personal, business and/or student – and select topics that interest you.'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: true,
            timestamp: new Date()
        },
        folder: 'inbox',
        content: {
            to: 'Me',
            from: 'Booking.com',
            cc: null,
            bss: null,
            subject: 'From glaciers to gelato',
            msgBody: 'Dreaming of Europe We\'ve been reminiscing about our European adventures while watching Audrey Hepburn tour France in \'Two for the Road\'. These are some of the places we plan to visit again.'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: true,
            timestamp: new Date()
        },
        folder: 'inbox',
        content: {
            to: 'Me',
            from: 'Roots',
            cc: null,
            bss: null,
            subject: 'Roots Run for Reconciliation, Crowd-funding Campaign and Online Presentations',
            msgBody: 'Four years ago we began to quietly expand our work to the southern Jordan Valley, and partnered there with local Israelis and Palestinians, who both love and care for the same beautiful strip of land, to found the first Roots satellite. Our Jordan Valley branch has grown by leaps and bounds, and it is time to let the world know that a new reality is being created there. We have ignited a small revolution in the way Israelis and Palestinians relate to each other in the Jordan Valley. Walls of ignorance, alienation and fear are falling and being replaced by mutual recognition, cooperation and a vision for a joint future together.'
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



