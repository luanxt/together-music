/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {
	"*": "is-user",
	"app/index": true,
	"user/loginUser": true,

	/* FOR TEST */
	"user/getAll": true,
	"app/getAll": true,
};
