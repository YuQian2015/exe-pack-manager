const Service = require('egg').Service;

class CacheService extends Service {


    getKey(array) {
        let key = array.splice(0, 1)[0];
        array.forEach(element => {
            if (element && key) {
                key = key.replace(/\${\w*}/, element)
            }
        });
        return key
    }

    getScanKey(str) {
        return str.replace(/\${\w*}/, '*');
    }

    async set(key, value, seconds) {
        value = JSON.stringify(value);
        if (this.app.redis) {
            if (!seconds) {
                return await this.app.redis.set(this.getKey(key), value);
            } else {
                return await this.app.redis.set(this.getKey(key), value, 'EX', seconds)
            }
        }
    }

    async get(key) {
        if (this.app.redis) {
            const data = await this.app.redis.get(this.getKey(key));
            if (!data) return;
            return JSON.parse(data)
        }
    }

    async del(key) {
        if (this.app.redis) {
            const data = await this.app.redis.del(this.getKey(key));
            return data
        }
    }

    async incr(key) {
        if (this.app.redis) {
            const data = await this.app.redis.incr(this.getKey(key));
            if (!data) return;
            return JSON.parse(data)
        }
    }

    async sadd(key, value, seconds) {
        value = JSON.stringify(value);
        if (this.app.redis) {
            if (!seconds) {
                await this.app.redis.sadd(this.getKey(key), value);
            } else {
                await this.app.redis.sadd(this.getKey(key), value, 'EX', seconds)
            }
        }
    }

    async sismember(key, value) {
        value = JSON.stringify(value);
        if (this.app.redis) {
            const data = await this.app.redis.sismember(this.getKey(key), value);
            if (!data) return;
            return JSON.parse(data)
        }
    }

    async scard(key) {
        if (this.app.redis) {
            const data = await this.app.redis.scard(this.getKey(key));
            if (!data) return;
            return data
        }
    }

    async scanAll(key) {
        let allKey = []
        const _scan = async (index, match, key) => {
            const data = await this.app.redis.scan(index, match, key)
            if(data[1].length) {
                console.log(data[1]);
                allKey = allKey.concat(data[1])
            }
            if(data[0] !== '0') {
                const value = parseInt(data[0])
                _scan(value, match, key)
            }
        }
        await _scan(0, "match", key)
        console.log(111);
        return allKey
    }
    
    async scanAll(key) {
        let allKey = []
        const _scan = async (index, match, key) => {
            const data = await this.app.redis.scan(index, match, key)
            if(data[1].length) {
                allKey = allKey.concat(data[1])
            }
            if(data[0] !== '0') {
                const value = parseInt(data[0])
                await _scan(value, match, key)
            }
        }
        await _scan(0, "match", this.getScanKey(key))
        return allKey
    }
}

module.exports = CacheService;