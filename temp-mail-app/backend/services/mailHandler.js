const inboxes = {};

function generateEmail() {
    const email = \`\${Math.random().toString(36).substring(2, 8)}@tempmail.io\`;
    inboxes[email] = [];
    return email;
}

async function getInbox(email) {
    return inboxes[email] || [];
}

// Simulate receiving mail
setInterval(() => {
    const emails = Object.keys(inboxes);
    if (emails.length > 0) {
        const target = emails[Math.floor(Math.random() * emails.length)];
        inboxes[target].push({
            sender: 'noreply@demo.com',
            subject: 'Welcome to TempMail!',
            content: 'This is a simulated email.',
            time: new Date().toISOString()
        });
    }
}, 10000);

module.exports = { generateEmail, getInbox };