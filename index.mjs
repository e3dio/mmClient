import WebSocket from 'ws';
import LRU from 'lru-cache';

export const connectMaxmind = (portOrUrl, cacheSize = 100) => {

	const port = Number(portOrUrl);
	const ws = new WebSocket(port ? `ws://localhost:${port}` : portOrUrl, { generateMask: buf => {} });
	const cache = new LRU({ max: cacheSize });
	const sendMap = new Map();

	ws.on('message', (data) => {
		data = JSON.parse(data);
		cache.set(data.ip, data);
		sendMap.get(data.ip).forEach(sent => sent.resolve(data));
	});

	const getIPinfo = (ip) => new Promise((resolve, reject) => {
		const val = cache.get(ip);
		if (val) return resolve(val);
		const sent = sendMap.get(ip);
		if (sent) sent.push({ resolve, reject });
		else sendMap.set(ip, [ { resolve, reject } ]);
		ws.send(ip);
	}).finally(() => !sendMap.get(ip).length && sendMap.delete(ip));

	return new Promise((resolve, reject) => {
		ws.onopen = () => resolve(getIPinfo);
		ws.onerror = () => reject('ws connection error');
	});

	// todo: send queue with auto-reconnect
};
