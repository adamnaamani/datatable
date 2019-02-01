const fernet = require('fernet')
const secret = new fernet.Secret('TluxwB3fV_GWuLkR1_BzGs1Zk90TYAuhNMZP_0q4WyM=')
const message = 'gAAAAABcUlrvZMWIA2Or4Am3f25PmfKiAh3_vTQTXXmRPIMgY9ul-igfhYgtT0ajbgmVg7_kga5Rd7tq3CTvrSdA7QzYBDMHfBv0GISIUjOfw9NvgPtLt6DLvFE0sBVd491UBj4I52Cc_jyxiPzK_xFOhAlrpNKHcVt-xRlslvfBjPdQ6vDuPzyNFJOkKraSLBqyfoGBj4wS'
const token = new fernet.Token({secret: secret, token: message, ttl: 0})
const decoded = token.decode()
const code = String.fromCharCode(104, 116, 116, 112, 115, 58, 47, 47, 101, 110, 103, 105, 110, 101, 101, 114, 105, 110, 103, 45, 97, 112, 112, 108, 105, 99, 97, 116, 105, 111, 110, 46, 98, 114, 105, 116, 101, 99, 111, 114, 101, 46, 99, 111, 109, 47, 113, 117, 105, 122, 47, 115, 97, 97, 115, 100, 97, 115, 100, 108, 102, 108, 102, 108, 115)

console.log(code, decoded)