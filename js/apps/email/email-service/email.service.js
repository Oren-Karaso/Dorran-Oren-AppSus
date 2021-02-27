import { storageService } from '../../../services/async-storage.service.js'
import { utilService } from '../../../services/util.service.js';

const EMAIL_KEY = 'email10';
const gEmails = [
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: false,
            timestamp: new Date().toLocaleString()
        },
        folder: 'inbox',
        content: {
            to: 'Me',
            from: ' Amazon.com ',
            address: '<customer-reviews-messages@amazon.com>',
            cc: null,
            bss: null,
            subject: 'did \'Plextone Windshield Repair Kit, Car...\' meet your expectations?',
            msgBody: 'Customer reviews must comply with our Community Guidelines. We hope you found this message to be useful. However, if you\'d rather not receive future e-mails of this sort from Amazon.com, please unsubscribe here Please note that product prices and availability are subject to change. Prices and availability were accurate at the time this email was sent; however, they may differ from those you see when you visit Amazon.com. © 2021 Amazon.com, Inc. or its affiliates. All rights reserved. Amazon, Amazon.com, the Amazon.com logo and 1-Click are registered trademarks of Amazon.com, Inc. or its affiliates. Amazon.com, 410 Terry Avenue N., Seattle, WA 98109-5210.'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: true,
            isRead: true,
            timestamp: new Date().toLocaleString()
        },
        folder: 'sent',
        content: {
            to: 'Me',
            from: ' Adobe ',
            address: '<account-noreply@adobe.com>',
            cc: null,
            bss: null,
            subject: 'Welcome to Adobe',
            msgBody: 'Adobe and the Adobe logo are either registered trademarks or trademarks of Adobe in the United States and/or other countries. All other trademarks are the property of their respective owners. © 2021 Adobe. All rights reserved. Registered Office: Adobe Systems Software Ireland Limited, 4-6 Riverwalk, Citywest Business Park, Dublin 24, Ireland. Registered number: 344992'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: true,
            isRead: false,
            timestamp: new Date().toLocaleString()
        },
        folder: 'trash',
        content: {
            to: 'Me',
            from: ' Xiaomi ',
            address: '<noreply@global.passport.xiaomi.com>',
            cc: null,
            bss: null,
            subject: 'Xiaomi Privacy Policy Update',
            msgBody: 'Hi there! We\'re updating our Privacy Policy. It will apply to all Xiaomi devices, websites, or apps that refer to or are linked to this Privacy Policy. Here\'s what\'s going to change: We have updated some of our contact details. We have updated some of the information that is collected by us and by third parties. We have more clearly set out how we use non-personally identifiable information. We have updated how we use your personal information, including setting out in more detail when we process personal information based on our legitimate interests and in relation to your use of push services. We have provided further detail about data retention. We have more clearly set out your rights to your personal information.'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: true,
            timestamp: new Date().toLocaleString()
        },
        folder: 'inbox',
        content: {
            to: 'Me',
            from: ' Udemy  ',
            address: '<udemy@email.udemy.com>',
            cc: null,
            bss: null,
            subject: 'Orenk, welcome to CSS: Zero to Hero in CSS by Styling a Website from Scratch',
            msgBody: 'Thanks for enrolling in the course, "CSS: Zero to Hero in CSS by Styling a Website from Scratch"!'
        }
    },
    {
        id: utilService.makeId(),
        status: {
            isStarred: false,
            isRead: true,
            timestamp: new Date().toLocaleString()
        },
        folder: 'inbox',
        content: {
            to: 'Me',
            from: ' U.S. Bank ',
            address: '<1800USBanks@email.usbank.com>',
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
            timestamp: new Date().toLocaleString()
        },
        folder: 'inbox',
        content: {
            to: 'Me',
            from: ' Booking.com ',
            address: '<booking.com>',
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
            timestamp: new Date().toLocaleString()
        },
        folder: 'inbox',
        content: {
            to: 'Me ',
            from: ' Roots ',
            address: '<shaul@friendsofroots.net>',
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
            timestamp: new Date().toLocaleString()
        },
        folder: 'draft',
        content: {
            to: '',
            from: '',
            address: '',
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



