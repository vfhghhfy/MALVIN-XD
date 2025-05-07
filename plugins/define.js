// Kode disesuaikan oleh Z4cK ⚡
const handler = async (Z4cKmsg, { text: ZackText, command: Z4cKcmd, conn: ZackConn, args: Z4cKargs }) => {
  if (!ZackText) return ZackConn.reply(Z4cKmsg.chat, `*❐『🎭』*\n*Contoh ╿↶*\n*┇↞『 .${Z4cKcmd} Tautan channel + Teks reaksi 』*\n\n> By Z4cK ⚡`, Z4cKmsg);

  console.log(`Perintah diterima: ${Z4cKcmd}, teks: ${ZackText}`);

  await ZackConn.sendMessage(Z4cKmsg.chat, { react: { text: '🕒', key: Z4cKmsg.key } });

  const Z4cKstyledMap = {
    a: '🄰', b: '🄱', c: '🄲', d: '🄳', e: '🄴', f: '🄵', g: '🄶',
    h: '🄷', i: '🄸', j: '🄹', k: '🄺', l: '🄻', m: '🄼', n: '🄽',
    o: '🄾', p: '🄿', q: '🅀', r: '🅁', s: '🅂', t: '🅃', u: '🅄',
    v: '🅅', w: '🅆', x: '➖', y: '🅈', z: '🅉',
    '0': '⓿', '1': '➊', '2': '➋', '3': '➌', '4': '➍',
    '5': '➎', '6': '➏', '7': '➐', '8': '➑', '9': '➒'
  };

  const [ZackMainText, Z4cKoffsetStr] = ZackText.split('|');
  const ZackLink = ZackMainText.trim().split(" ")[0];

  if (!ZackLink.includes("https://whatsapp.com/channel/")) {
    return ZackConn.reply(Z4cKmsg.chat, "❌ Tautan tidak valid!\nContoh: .reactch https://whatsapp.com/channel/xxx/id Pesan ❤️|5\n\n> By Z4cK ⚡", Z4cKmsg);
  }

  const Z4cKchannelID = ZackLink.split('/')[4];
  const ZackRawMsgID = parseInt(ZackLink.split('/')[5]);
  if (!Z4cKchannelID || isNaN(ZackRawMsgID)) return ZackConn.reply(Z4cKmsg.chat, "❌ Tautan tidak lengkap!\n\n> By Z4cK ⚡", Z4cKmsg);

  const ZackOffset = parseInt(Z4cKoffsetStr?.trim()) || 1;
  const Z4cKcleanText = ZackMainText.trim().split(" ").slice(1).join(' ');
  const ZackTextOnly = Z4cKcleanText.replace(ZackLink, '').trim();
  if (!ZackTextOnly) return ZackConn.reply(Z4cKmsg.chat, "❌ Masukkan teks atau emoji untuk bereaksi.\n\n> By Z4cK ⚡", Z4cKmsg);

  const ZackEmoji = ZackTextOnly.toLowerCase().split('').map(char => {
    if (char === ' ') return '―';
    return Z4cKstyledMap[char] || char;
  }).join('');

  try {
    const Z4cKmeta = await ZackConn.newsletterMetadata("invite", Z4cKchannelID);
    let ZackSuccess = 0, Z4cKfail = 0;

    for (let i = 0; i < ZackOffset; i++) {
      const ZackMsgId = (ZackRawMsgID - i).toString();
      try {
        await ZackConn.newsletterReactMessage(Z4cKmeta.id, ZackMsgId, ZackEmoji);
        ZackSuccess++;
      } catch (e) {
        Z4cKfail++;
      }
    }

    await ZackConn.reply(
      Z4cKmsg.chat, 
      `✅ Berhasil bereaksi dengan *${ZackEmoji}* ke ${ZackSuccess} pesan di channel *${Z4cKmeta.name}*\n❌ Gagal bereaksi ke ${Z4cKfail} pesan.\n\n> By Z4cK ⚡`, 
      Z4cKmsg
    );
    await ZackConn.sendMessage(Z4cKmsg.chat, { react: { text: '✅', key: Z4cKmsg.key } });
  } catch (err) {
    console.error(err);
    await ZackConn.reply(Z4cKmsg.chat, "❌ Terjadi kesalahan saat bereaksi!\n\n> By Z4cK ⚡", Z4cKmsg);
    await ZackConn.sendMessage(Z4cKmsg.chat, { react: { text: '❌', key: Z4cKmsg.key } });
  }
};

// Perintah oleh Z4cK ⚡
handler.command = ["reactch3", "react"];

export default handler;
