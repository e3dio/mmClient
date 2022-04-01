import WebSocket from 'ws';
import LRU from 'lru-cache';

export const connectMaxmind = ({ port, cacheSize = 200, host = 'localhost', protocol = 'ws' }) => {

	const sendMap = new Map();
	const cache = new LRU({ max: cacheSize });
	const ws = new WebSocket(`${protocol}://${host}:${port}`, { generateMask: buf => {} });

	ws.on('message', (data) => {
	   const d = JSON.parse(data);
	   const promise = sendMap.get(d.ip);
	   if (!promise) return;
	   cache.set(d.ip, d);
	   sendMap.delete(d.ip);
	   promise.resolve(d);
	});

	return (ip) => new Promise((resolve, reject) => {
		const val = cache.get(ip);
		if (val) return resolve(val);
		sendMap.set(ip, { resolve, reject });
		ws.send(ip);
	}).finally(() => sendMap.delete(ip));

};
