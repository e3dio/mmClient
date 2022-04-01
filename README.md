# mmClient

Creates a client to connect to Maxmind [mmServer](https://github.com/e3dio/mmServer)

## Install

`npm i e3dio/mmClient`

## Usage

```javascript
import { connectMaxmind } from 'mmClient';

const getIPinfo = connectMaxmind(port, cacheSize);

const ipInfo = await getIPinfo(ip);
```
Example returned data object:
```javascript
{
	ip: '35.87.116.61',
	asn: 'AMAZON-02',
	city: 'Boardman',
	state: 'Oregon',
	country: 'United States',
	stateISO: 'OR',
	countryISO: 'US',
	lat: 45.8234,
	lon: -119.7257
}
```
