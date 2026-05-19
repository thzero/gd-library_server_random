import crypto from 'crypto';

import LibraryCommonUtility from '@thzero/library_common/utility/index.js';

import NotImplementedError from '@thzero/library_common/errors/notImplemented.js';

import Service from '@thzero/library_common_service/service/index.js';

class DiceService extends Service {
	constructor() {
		super();

		this._random = null;
	}

	async init(injector) {
		await super.init(injector);

		const response = await this.initialize(LibraryCommonUtility.generateId());
		if (this._hasFailed(response))
			throw new Error(response);

		this._random = response.results;
	}

	async initialize(correlationId, seed) {
		throw new NotImplementedError();
	}

	roll(correlationId, sides, random) {
		this._enforceNotNull('DiceService', 'roll', sides, 'sides', correlationId);

		random = random ? random : this._random;
		number = number ? number : 1;

		return random.die(sides);
	}

	rolls(correlationId, sides, number, random) {
		this._enforceNotNull('DiceService', 'rolls', sides, 'sides', correlationId);
		this._enforceNotNull('DiceService', 'rolls', number, 'number', correlationId);

		random = random ? random : this._random;

		return random.dice(sides, number);
	}

	async _initializeSeed(correlationId, seed) {
		if (!seed) {
			const { err, buf } = await crypto.randomBytes(256);
			if (err)
				throw err;
			seed = buf;
		}

		return seed;
	}
}

export default DiceService;
