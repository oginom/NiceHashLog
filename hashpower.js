import config from './config'
import Api from './api'

var log = function () {
	return console.log(...arguments);
}

async function getRigInfo() {

    var rigId;
    
    var results = {
    	balance: null,
    	speed: null,
    };
    
    const api = new Api(config);
    
    // get server time - required
    await api.getTime()
    	.then(() => {
    		log('server time', api.time)
    		log('--')
    	})
    
    	// get algo settings
    	//.then(() => api.get('/main/api/v2/mining/algorithms'))
    	//.then(res => {
    	//	algo = res.miningAlgorithms[0]; // SCRYPT
    	//	log('algorithms', res);
    	//	log('--')
    	//})
    
    	// get balance
    	.then(() => api.get('/main/api/v2/accounting/accounts2'))
    	.then(res => {
    		log('accounts', res.total);
    		results.balance = res.total.totalBalance;
    		log('--')
    	})
    
    	// get mining stats
    	.then(() => api.get('/main/api/v2/mining/groups/list'))
    	.then(res => {
    		log('groups', res);
    		log('rigs', res.groups['']);
    		log('rig', res.groups[''].rigs[0]);
    		rigId = res.groups[''].rigs[0].rigId;
    		log('--')
    	})
    
    	//a
    	.then(() => api.get('/main/api/v2/mining/rig2/' + rigId))
    	.then(res => {
    		log('res', res);
    		results.speed = res.stats[0].speedAccepted;
    		log('--')
    	})

	return results;
}

export { getRigInfo };

