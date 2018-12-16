const fernet = require('fernet')
const secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
const message = 'gAAAAABcEzERTpO1-GH3xtfnc-dokBjQMUiF1LFDB6Hgv1Etc44b8BZaqB_MhIrq6f4UczYMMLzUCS9zeqkpJ0wySP1A6477yPBly8JPVcwtQSkTI67vC7OOiPvJQGowRJU6yDYsCNPBc9bLfbXeDOqmDKArbhmpc_aWEUS1VW9Y1ti3hUwmGP5NWSplzRe9O1xsskcUA3T6'
const token = new fernet.Token({secret: secret, token: message, ttl:0})
const decoded = token.decode()
const code = String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115)

console.log(code, decoded)