let WhatsAlexa = require('../events');
let {MessageType} = require('@adiwajshing/baileys');
let exec = require('child_process').exec;
let os = require("os");
let Language = require('../language');
let Lang = Language.getString('evaluators');

WhatsAlexa.addCommand({pattern: 'termux ?(.*)', fromMe: true, desc: Lang.TERM_DESC}, (async (message, match) => {    
    var user = os.userInfo().username;
    if (match[1] === '') return await message.client.sendMessage(message.jid,Lang.GIVE_ME_CODE,MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }})

    exec(match[1], async (err, stdout, stderr) => {
        if (err) {
            return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + err + '```',MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }})
        }
        
        return await message.client.sendMessage(message.jid,'```' + user + ':~# ' + match[1] + '\n' + stdout + '```',MessageType.text, {contextInfo: { forwardingScore: 1000, isForwarded: true }})
      });
}));
