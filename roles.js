// const {AccessControl} = require('accesscontrol')

// let grantRole = [
//     {role: 'guest', resource: 'recipe', action: 'read:any', attributes: '*, !id'},
//     {role: 'user', resource: 'recipe', action: 'create:own', attributes: '*'},
//     {role: 'user', resource: 'recipe', action: 'update:own', attributes: '*'},
//     {role: 'user', resource: 'recipe', action: 'delete:own', attributes: '*'},
//     {role: 'user', resource: 'recipe', action: 'ready:any', attributes: '*'},
//     {role: 'admin', resource: 'recipe', action: 'create:own', attributes: '*'},
//     {role: 'admin', resource: 'recipe', action: 'update:any', attributes: '*'},
//     {role: 'admin', resource: 'recipe', action: 'delete:any', attributes: '*'},
//     {role: 'admin', resource: 'recipe', action: 'read:any', attributes: '*'},
// ]

// const ac = new AccessControl(grantRole);
// ac.grant('guest')
//     .readAny('recipe')
//     .grant('user')
//         .createOwn('recipe')
//         .updateOwn('recipe')
//         .deleteOwn('recipe')
//         .readAny('recipe')
//     .grant('admin')
//         .extend('user')
//         .updateAny('recipe')
//         .deleteAny('recipe');

// module.exports = ac;