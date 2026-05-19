import { Random, MersenneTwister19937 } from 'random-js';

import DiceService from '@thzero/gd-library_server_random/service/random/dice/index.js';

class MtDiceService extends DiceService {
	async initialize(correlationId, seed) {
		seed = await this._initializeSeed(correlationId, seed);

		const random = new Random(MersenneTwister19937.seed(seed));
		return this._successResponse(random, correlationId);
	}
}

export default MtDiceService;
