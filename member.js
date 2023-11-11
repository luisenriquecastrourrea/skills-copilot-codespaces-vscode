function skillsMember() {
    var member = require('../models/member');
    var skills = require('../models/skills');

    member.hasMany(skills, {
        foreignKey: 'member_id'
    });

    skills.belongsTo(member, {
        foreignKey: 'member_id'
    });
}