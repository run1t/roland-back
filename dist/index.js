"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitlab_deploy_1 = require("./gitlab-deploy");
/**
 * user: '279F9AB6573A2AE2AFB7',
 * pass: 'fVC5XGhQ2b5hyXLhxiriwKf23v7f9ULp8yuwLieX'
 */
const options = {
    user: '279F9AB6573A2AE2AFB7',
    pass: 'fVC5XGhQ2b5hyXLhxiriwKf23v7f9ULp8yuwLieX'
};
const gitlab = gitlab_deploy_1.GitlabDeploy.getInstance(options);
gitlab.update()
    .subscribe((next) => {
    console.log(next);
}, (error) => {
    console.log(error);
});
//# sourceMappingURL=index.js.map