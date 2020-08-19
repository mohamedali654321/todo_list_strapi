'use strict';

/**
 * Read the documentation (https://strapi.io/documentation/v3.x/concepts/controllers.html#core-controllers)
 * to customize this controller
 */

module.exports = {
    async find(ctx){
        const {user}=ctx.state;
       // console.log(user);
        const entities=await strapi.query('todo').find({user:user.id});
        
        return entities;
    }


};
