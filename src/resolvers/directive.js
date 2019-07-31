const { SchemaDirectiveVisitor } = require('graphql-tools');
const { defaultFieldResolver } = require('graphql');

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function (...args) {
            const [, , context] = args; // [root,args,context]
            if(context.user){
                return await resolve.apply(this.args);
            }else{
                throw new Error('Necesitas estar logueado');
            }
        };
    }
}

module.exports = { AuthDirective };