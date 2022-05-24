# mmClient

Creates a client to connect to Maxmind [mmServer](https://github.com/e3dio/mmServer)

## Install

`npm i e3dio/mmClient`

## Usage

```javascript
import { connectMaxmind } from 'mmClient';

const getIPinfo = await connectMaxmind(port);

const ipInfo = await getIPinfo(ip);
```
Example ipInfo data object:
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
